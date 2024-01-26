interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
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
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.alignItems(HorizontalAlign.Center);
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.width(100);
        Button.height(50);
        Button.margin(5);
        Button.align(Alignment.Center);
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/binary' });
        });
        Text.create('二进制编码器');
        Text.fontSize(15);
        Text.fontColor('#ffffff');
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.width(100);
        Button.height(50);
        Button.margin(5);
        Button.align(Alignment.Center);
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/digest' });
        });
        Text.create('摘要编码器');
        Text.fontSize(15);
        Text.fontColor('#ffffff');
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.width(100);
        Button.height(50);
        Button.margin(5);
        Button.align(Alignment.Center);
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/language' });
        });
        Text.create('语言编码器');
        Text.fontSize(15);
        Text.fontColor('#ffffff');
        Text.pop();
        Button.pop();
        // URL编码
        Button.createWithChild();
        // URL编码
        Button.type(ButtonType.Capsule);
        // URL编码
        Button.width(100);
        // URL编码
        Button.height(50);
        // URL编码
        Button.margin(5);
        // URL编码
        Button.align(Alignment.Center);
        // URL编码
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/urlEncoding' });
        });
        Text.create('Url编码器');
        Text.fontSize(15);
        Text.fontColor('#ffffff');
        Text.pop();
        // URL编码
        Button.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
