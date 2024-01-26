interface Index_Params {
    items?: Item[];
    pages?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
import router from '@system.router';
import prompt from '@system.prompt';
class Item {
    title: Resource = $r('app.string.single_download_title');
    desc: Resource = $r('app.string.single_download_title');
}
class ItemEntity {
    i: number = 0;
    data: Item = { title: $r('app.string.single_download_title'), desc: $r('app.string.single_download_title') };
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.items = [{ title: $r('app.string.single_download_title'), desc: $r('app.string.single_download_desc') },
            { title: $r('app.string.each_block_progress_title'), desc: $r('app.string.each_block_progress_desc') },
            { title: $r('app.string.queue_download_title'), desc: $r('app.string.queue_download_desc') },
            { title: $r('app.string.bunch_download_title'), desc: $r('app.string.bunch_download_desc') },
            { title: $r('app.string.content_uri_title'), desc: $r('app.string.content_uri_desc') },
            { title: $r('app.string.notification_title'), desc: $r('app.string.notification_desc') }];
        this.pages = ["pages/Single", "pages/EachBlockProgress", "pages/Queue", "pages/Bunch", "", ""];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.items !== undefined) {
            this.items = params.items;
        }
        if (params.pages !== undefined) {
            this.pages = params.pages;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private items: Item[];
    private pages;
    render() {
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.width('100%');
        Stack.height('100%');
        Stack.backgroundColor(0xDFDFDF);
        List.create();
        List.listDirection(Axis.Vertical);
        List.padding(5);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.items.map((item, index): ItemEntity => {
            return { i: index, data: item };
        })), (item: ItemEntity) => {
            ListItem.create();
            ListItem.onClick(() => {
                if (item.i == 4) {
                    prompt.showToast({
                        message: "暂不支持从文件选择器选择文件",
                        duration: 1000
                    });
                }
                else if (item.i == 5) {
                    prompt.showToast({
                        message: "暂不支持自定义Notification",
                        duration: 1000
                    });
                }
                else if (item.i == 1) {
                    prompt.showToast({
                        message: "暂不支持分块下载",
                        duration: 1000
                    });
                }
                else {
                    router.push({
                        uri: this.pages[item.i]
                    });
                }
            });
            Column.create();
            Column.backgroundColor(0xFFFFFF);
            Column.margin({ top: 20 });
            Column.borderRadius(10);
            Text.create(item.data.title);
            Text.width('100%');
            Text.fontSize(32);
            Text.textAlign(TextAlign.Center);
            Text.padding({ top: 10 });
            Text.pop();
            Text.create(item.data.desc);
            Text.width('100%');
            Text.fontSize(24);
            Text.padding(10);
            Text.fontColor(Color.Grey);
            Text.pop();
            Column.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Stack.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
