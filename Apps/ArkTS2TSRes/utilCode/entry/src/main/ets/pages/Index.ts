interface Index_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
        Column.create();
        Column.padding({ top: 18, bottom: 18 });
        Row.create();
        Button.createWithLabel('缓存测试');
        Button.fontSize(18);
        Button.margin({ left: 18 });
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/CachePage' });
        });
        Button.pop();
        Button.createWithLabel('坐标测试');
        Button.fontSize(18);
        Button.margin({ left: 18 });
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/GcoordPage' });
        });
        Button.pop();
        Button.createWithLabel('颜色测试');
        Button.fontSize(18);
        Button.margin({ left: 18 });
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/ColorDemo' });
        });
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 18 });
        Button.createWithLabel('时间测试');
        Button.fontSize(18);
        Button.margin({ left: 18 });
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/TimePage' });
        });
        Button.pop();
        Button.createWithLabel('图片测试');
        Button.fontSize(18);
        Button.margin({ left: 18 });
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/PicturePage' });
        });
        Button.pop();
        Button.createWithLabel('国家码测试');
        Button.fontSize(18);
        Button.margin({ left: 18 });
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/CountryPage' });
        });
        Button.pop();
        Row.pop();
        Button.createWithLabel('温度测试');
        Button.fontSize(18);
        Button.margin({ left: 18 });
        Button.onClick(() => {
            router.pushUrl({ url: 'pages/TempPage' });
        });
        Button.margin({ top: 18 });
        Button.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
