interface Allowed_schemes_Params {
    default_allows?: string[];
    schemes?: string;
    sanitizeResult?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "allowed_schemes_" + ++__generate__Id;
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
import sanitize from 'sanitize-html';
import prompt from '@ohos.prompt';
class Allowed_schemes extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.default_allows = sanitize.defaults.allowedSchemes;
        this.__schemes = new ObservedPropertySimple('', this, "schemes");
        this.__sanitizeResult = new ObservedPropertySimple('sanitizeResult: ', this, "sanitizeResult");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Allowed_schemes_Params) {
        if (params.default_allows !== undefined) {
            this.default_allows = params.default_allows;
        }
        if (params.schemes !== undefined) {
            this.schemes = params.schemes;
        }
        if (params.sanitizeResult !== undefined) {
            this.sanitizeResult = params.sanitizeResult;
        }
    }
    aboutToBeDeleted() {
        this.__schemes.aboutToBeDeleted();
        this.__sanitizeResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private default_allows: string[];
    private __schemes: ObservedPropertySimple<string>;
    get schemes() {
        return this.__schemes.get();
    }
    set schemes(newValue: string) {
        this.__schemes.set(newValue);
    }
    private __sanitizeResult: ObservedPropertySimple<string>;
    get sanitizeResult() {
        return this.__sanitizeResult.get();
    }
    set sanitizeResult(newValue: string) {
        this.__sanitizeResult.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create({ space: 10 });
        Column.width('100%');
        Text.create(this.default_allows.toString());
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: 'input schemes name.', controller: new TextInputController() });
        TextInput.onChange((value: string) => {
            this.schemes = value;
        });
        Button.createWithLabel('sanitize html');
        Button.height('5%');
        Button.onClick(() => {
            if (!this.schemes) {
                prompt.showToast({ message: 'please input tag name' });
                return;
            }
            let html = '<a href="' + this.schemes + '://www.baidu.com">inner text </a>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html);
        });
        Button.pop();
        Button.createWithLabel('Cover all default allowed scheme');
        Button.height('5%');
        Button.onClick(() => {
            if (!this.schemes) {
                prompt.showToast({ message: 'please input scheme' });
                return;
            }
            sanitize.defaults.allowedSchemes = ['http1', 'https1', 'sms1'];
            let html = '<a href="' + this.schemes + '://www.baidu.com">inner text </a>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html);
        });
        Button.pop();
        Button.createWithLabel('Cover allowed scheme by options');
        Button.height('5%');
        Button.onClick(() => {
            if (!this.schemes) {
                prompt.showToast({ message: 'please input scheme' });
                return;
            }
            let html = '<a href="' + this.schemes + '://www.baidu.com">inner text </a>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                allowedSchemes: ['http2', 'https2', 'sms2']
            });
        });
        Button.pop();
        Button.createWithLabel('add scheme for default');
        Button.height('5%');
        Button.onClick(() => {
            if (!this.schemes) {
                prompt.showToast({ message: 'please input scheme' });
                return;
            }
            let schemesArray: any = sanitize.defaults.allowedSchemes;
            let index: any = schemesArray.indexOf(this.schemes);
            if (index === -1) {
                schemesArray.push(this.schemes);
            }
            else {
                prompt.showToast({ message: 'the scheme already exist' });
                return;
            }
            let html = '<a href="' + this.schemes + '://www.baidu.com">inner text </a>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html);
        });
        Button.pop();
        Text.create(this.sanitizeResult);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Allowed_schemes("1", undefined, {}));
