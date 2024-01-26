interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
async function routePage(index: number) {
    let path: string = '';
    switch (index) {
        case 0:
            path = 'pages/simpleParseXml';
            break;
        case 1:
            path = 'pages/promiseUsage';
            break;
        case 2:
            path = 'pages/xmlBuilder';
            break;
        case 3:
            path = 'pages/processingAttribute';
            break;
    }
    let options: any = {
        url: path
    } as any;
    try {
        await router.push(options);
    }
    catch (err) {
        console.error(`fail callback,code:${err.code},msg:${err.msg}`);
    }
}
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
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Button.createWithLabel("简单解析XML");
        Button.fontSize(30);
        Button.margin(10);
        Button.onClick(() => {
            routePage(0);
        });
        Button.pop();
        Button.createWithLabel("使用PromiseUsage方式解析");
        Button.fontSize(30);
        Button.margin(10);
        Button.onClick(() => {
            routePage(1);
        });
        Button.pop();
        Button.createWithLabel("构建xml");
        Button.fontSize(30);
        Button.margin(10);
        Button.onClick(() => {
            routePage(2);
        });
        Button.pop();
        Button.createWithLabel("处理属性、标签名称和值");
        Button.fontSize(30);
        Button.margin(10);
        Button.onClick(() => {
            routePage(3);
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
