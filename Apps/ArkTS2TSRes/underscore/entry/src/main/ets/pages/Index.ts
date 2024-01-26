interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * MIT License
 *
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
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
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Button.createWithLabel('Collection Test');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            let path = 'pages/Collections';
            router.pushUrl({
                url: path,
            });
        });
        Button.margin(5);
        Button.width(200);
        Button.pop();
        Button.createWithLabel('Arrays Test');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            let path = 'pages/Arrays';
            router.pushUrl({
                url: path,
            });
        });
        Button.margin(5);
        Button.width(200);
        Button.pop();
        Button.createWithLabel('Functions Test');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            let path = 'pages/Functions';
            router.pushUrl({
                url: path,
            });
        });
        Button.margin(5);
        Button.width(200);
        Button.pop();
        Button.createWithLabel('Objects Test');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            let path = 'pages/Objects';
            router.pushUrl({
                url: path,
            });
        });
        Button.margin(5);
        Button.width(200);
        Button.pop();
        Button.createWithLabel('Utility Test');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            let path = 'pages/Utility';
            router.pushUrl({
                url: path,
            });
        });
        Button.margin(5);
        Button.width(200);
        Button.pop();
        Button.createWithLabel('Chaining Test');
        Button.backgroundColor(0x2788D9);
        Button.onClick((event: ClickEvent) => {
            let path = 'pages/Chaining';
            router.pushUrl({
                url: path,
            });
        });
        Button.margin(5);
        Button.width(200);
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));