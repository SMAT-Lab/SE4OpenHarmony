interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import router from '@ohos.router';
import { GRAPHIC_TRANSFORMATION, TestButton } from './testData';
import window from '@ohos.window';
import common from '@ohos.app.ability.common';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    itemHead(text: Resource | string, parent = null) {
        Text.create(text);
        Text.fontSize(20);
        Text.height(50);
        Text.backgroundColor('#ffeae9e9');
        Text.width("100%");
        Text.padding(10);
        Text.pop();
    }
    onPageShow() {
        //获取当前窗口
        var FullScreen = true;
        let context = getContext(this) as common.UIAbilityContext;
        let windowClass = null;
        try {
            let promise = window.getLastWindow(context);
            promise.then((data) => {
                windowClass = data;
                console.info('Succeeded in obtaining the top window. Data: ' + JSON.stringify(data));
                //设置全屏状态
                let promise = windowClass.setFullScreen(FullScreen);
                promise.then(() => {
                    console.info('Succeeded in enabling the full-screen mode. ');
                }).catch((err) => {
                    console.error('Failed to enable the full-screen mode. Cause: ' + JSON.stringify(err));
                });
                console.info('Succeeded in obtaining the top window. Data: ' + JSON.stringify(data));
            }).catch((err) => {
                console.error('Failed to obtain the top window. Cause: ' + JSON.stringify(err));
            });
        }
        catch (exception) {
            console.error('Failed to obtain the top window. Cause: ' + JSON.stringify(exception));
        }
    }
    render() {
        Column.create();
        Column.justifyContent(FlexAlign.Center);
        Text.create('yarward测试');
        Text.fontSize(50);
        Text.pop();
        Scroll.create();
        Column.create();
        Column.constraintSize({ minHeight: '100%' });
        List.create({ space: 5 });
        ForEach.create("3", this, ObservedObject.GetRawObject(GRAPHIC_TRANSFORMATION), (item: TestButton, index: number) => {
            ListItemGroup.create({ header: this.itemHead.bind(this, item.title) });
            ListItemGroup.divider({ strokeWidth: 1, color: Color.Black });
            ListItemGroup.onClick(() => {
                console.error('onclick');
                if (item.childNodes == undefined) {
                    console.error('onclick item.childNodes == undefined');
                    router.pushUrl({ url: item.url });
                }
            });
            If.create();
            if (item.childNodes) {
                If.branchId(0);
                ForEach.create("2", this, ObservedObject.GetRawObject(item.childNodes), (childItem: TestButton) => {
                    ListItem.create();
                    Text.create(childItem.title);
                    Text.width("100%");
                    Text.height(50);
                    Text.fontSize(20);
                    Text.padding(10);
                    Text.backgroundColor(Color.White);
                    Text.onClick(() => {
                        router.pushUrl({ url: childItem.url });
                    });
                    Text.pop();
                    ListItem.pop();
                });
                ForEach.pop();
            }
            If.pop();
            ListItemGroup.pop();
        });
        ForEach.pop();
        List.pop();
        Column.create();
        Column.margin({ bottom: 90 });
        Column.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
