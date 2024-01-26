interface Index_Params {
    message?: string;
    arrStr?: string[];
    arrIndex?: number[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import router from '@ohos.router';
import JumpPathConfig from '../JumpPathConfig';
async function routePage(index: number) {
    try {
        let jumpUri = JumpPathConfig.getJumpPath(index);
        let options: router.RouterOptions = {
            url: jumpUri
        };
        await router.pushUrl(options);
    }
    catch (err) {
        // TODO  hilog
    }
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.arrStr = JumpPathConfig.getText();
        this.arrIndex = JumpPathConfig.getIndex();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.arrStr !== undefined) {
            this.arrStr = params.arrStr;
        }
        if (params.arrIndex !== undefined) {
            this.arrIndex = params.arrIndex;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private arrStr: string[];
    private arrIndex: number[];
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Flex.create({ alignItems: ItemAlign.Center, alignContent: FlexAlign.Center, justifyContent: FlexAlign.Center });
        List.create({ space: 20, initialIndex: 0 });
        List.listDirection(Axis.Vertical);
        List.divider({ strokeWidth: 2, startMargin: 20, endMargin: 20 });
        List.edgeEffect(EdgeEffect.None);
        List.chainAnimation(false);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arrIndex), (item: string) => {
            ListItem.create();
            ListItem.onClick((event) => {
                routePage(Number.parseInt(item));
            });
            Text.create(this.arrStr[item]);
            Text.width('100%');
            Text.height(100);
            Text.fontSize(16);
            Text.textAlign(TextAlign.Center);
            Text.borderRadius(10);
            Text.backgroundColor(0xFFFFFF);
            Text.pop();
            ListItem.pop();
        }, (item: string) => item);
        ForEach.pop();
        List.pop();
        Flex.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
