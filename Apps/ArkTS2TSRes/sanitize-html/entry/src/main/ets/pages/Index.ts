interface Index_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/**
 * MIT License
 *
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
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
        Column.create({ space: 10 });
        Column.width('100%');
        Button.createWithLabel('jump to allowed tag');
        Button.height('5%');
        Button.onClick(() => {
            router.push({ url: 'pages/allowed_tags' });
        });
        Button.pop();
        Button.createWithLabel('jump to allowed attributes');
        Button.height('5%');
        Button.onClick(() => {
            router.push({ url: 'pages/allowed_attributes' });
        });
        Button.pop();
        Button.createWithLabel('jump to allowed schemes');
        Button.height('5%');
        Button.onClick(() => {
            router.push({ url: 'pages/allowed_schemes' });
        });
        Button.pop();
        Button.createWithLabel('jump to allowed schemes by tags');
        Button.height('5%');
        Button.onClick(() => {
            router.push({ url: 'pages/allowed_schemes_by_tags' });
        });
        Button.pop();
        Button.createWithLabel('jump to allowed schemes applied to attr');
        Button.height('5%');
        Button.onClick(() => {
            router.push({ url: 'pages/allowed_scheme_applied_to_attr' });
        });
        Button.pop();
        Button.createWithLabel('jump to allowed self closing tags');
        Button.height('5%');
        Button.onClick(() => {
            router.push({ url: 'pages/allowed_self_closing_tags' });
        });
        Button.pop();
        Button.createWithLabel('jump to sanitize html page1');
        Button.height('5%');
        Button.onClick(() => {
            router.push({ url: 'pages/sanitize_html_options1' });
        });
        Button.pop();
        Button.createWithLabel('jump to sanitize html page2');
        Button.height('5%');
        Button.onClick(() => {
            router.push({ url: 'pages/sanitize_html_options2' });
        });
        Button.pop();
        Button.createWithLabel('jump to sanitize html page3');
        Button.height('5%');
        Button.onClick(() => {
            router.push({ url: 'pages/sanitize_html_options3' });
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
