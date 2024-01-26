interface Index_Params {
    message?: string;
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
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
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
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.createWithLabel('跳转到 gzip', { type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.margin(20);
        Button.fontSize(15);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 32 });
        Button.padding({ left: 10 });
        Button.width('150');
        Button.height('50');
        Button.onClick((event?: ClickEvent) => {
            router.pushUrl({ url: "pages/Gzip" });
        });
        Button.pop();
        Button.createWithLabel('跳转到 deflateDemo', { type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.margin(20);
        Button.fontSize(15);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 32 });
        Button.padding({ left: 10 });
        Button.width('150');
        Button.height('50');
        Button.onClick((event?: ClickEvent) => {
            router.pushUrl({ url: "pages/DeflateDemo" });
        });
        Button.pop();
        Button.createWithLabel('跳转到 pakoTest', { type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.margin(20);
        Button.fontSize(15);
        Button.fontWeight(FontWeight.Bold);
        Button.margin({ top: 32 });
        Button.padding({ left: 10 });
        Button.width('150');
        Button.height('50');
        Button.onClick((event?: ClickEvent) => {
            router.pushUrl({ url: "pages/PakoTest" });
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
