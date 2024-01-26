interface Allowed_scheme_applied_to_attr_Params {
    schemeAppliedToAttr?: string[];
    attrName?: string;
    schemeName?: string;
    sanitizeResult?: string;
    controller?: TextInputController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "allowed_scheme_applied_to_attr_" + ++__generate__Id;
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
import sanitizeHtml from 'sanitize-html';
import prompt from '@ohos.prompt';
class Allowed_scheme_applied_to_attr extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.schemeAppliedToAttr = sanitizeHtml.defaults.allowedSchemesAppliedToAttributes;
        this.__attrName = new ObservedPropertySimple('', this, "attrName");
        this.__schemeName = new ObservedPropertySimple('', this, "schemeName");
        this.__sanitizeResult = new ObservedPropertySimple('sanitizeResult: ', this, "sanitizeResult");
        this.controller = new TextInputController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Allowed_scheme_applied_to_attr_Params) {
        if (params.schemeAppliedToAttr !== undefined) {
            this.schemeAppliedToAttr = params.schemeAppliedToAttr;
        }
        if (params.attrName !== undefined) {
            this.attrName = params.attrName;
        }
        if (params.schemeName !== undefined) {
            this.schemeName = params.schemeName;
        }
        if (params.sanitizeResult !== undefined) {
            this.sanitizeResult = params.sanitizeResult;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__attrName.aboutToBeDeleted();
        this.__schemeName.aboutToBeDeleted();
        this.__sanitizeResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private schemeAppliedToAttr: string[];
    private __attrName: ObservedPropertySimple<string>;
    get attrName() {
        return this.__attrName.get();
    }
    set attrName(newValue: string) {
        this.__attrName.set(newValue);
    }
    private __schemeName: ObservedPropertySimple<string>;
    get schemeName() {
        return this.__schemeName.get();
    }
    set schemeName(newValue: string) {
        this.__schemeName.set(newValue);
    }
    private __sanitizeResult: ObservedPropertySimple<string>;
    get sanitizeResult() {
        return this.__sanitizeResult.get();
    }
    set sanitizeResult(newValue: string) {
        this.__sanitizeResult.set(newValue);
    }
    private controller: TextInputController;
    render() {
        Row.create();
        Row.height('100%');
        Column.create({ space: 10 });
        Column.width('100%');
        Text.create(this.schemeAppliedToAttr.toString());
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: 'input attribute name.', controller: this.controller });
        TextInput.onChange((value: string) => {
            this.attrName = value;
        });
        TextInput.create({ placeholder: 'input scheme name.', controller: this.controller });
        TextInput.onChange((value: string) => {
            this.schemeName = value;
        });
        Button.createWithLabel('default sanitize html');
        Button.height('5%');
        Button.onClick(() => {
            if (!this.attrName || !this.schemeName) {
                prompt.showToast({ message: 'please input attribute or scheme name' });
                return;
            }
            let html = '<a ' + this.attrName + '="' + this.schemeName + '://www.baidu.com">inner text </a>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitizeHtml(html);
        });
        Button.pop();
        Button.createWithLabel('cover default attributes');
        Button.height('5%');
        Button.onClick(() => {
            if (!this.attrName || !this.schemeName) {
                prompt.showToast({ message: 'please input attribute or scheme name' });
                return;
            }
            sanitizeHtml.defaults.allowedSchemesAppliedToAttributes = [this.attrName];
            let html = '<a ' + this.attrName + '="' + this.schemeName + '://www.baidu.com">inner text </a>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitizeHtml(html, {
                allowedAttributes: {
                    a: [this.attrName]
                }
            });
        });
        Button.pop();
        Button.createWithLabel('cover attr by options');
        Button.height('5%');
        Button.onClick(() => {
            if (!this.attrName || !this.schemeName) {
                prompt.showToast({ message: 'please input attribute or scheme name' });
                return;
            }
            let html = '<a ' + this.attrName + '="' + this.schemeName + '://www.baidu.com">inner text </a>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitizeHtml(html, {
                allowedAttributes: {
                    a: [this.attrName]
                },
                allowedSchemesAppliedToAttributes: [this.attrName]
            });
        });
        Button.pop();
        Button.createWithLabel('add scheme applied for attribute');
        Button.height('5%');
        Button.onClick(() => {
            if (!this.attrName || !this.schemeName) {
                prompt.showToast({ message: 'please input attribute or scheme name' });
                return;
            }
            let attributesArray: any = sanitizeHtml.defaults.allowedSchemesAppliedToAttributes;
            let attrIndex: any = attributesArray.indexOf(this.attrName);
            if (attrIndex === -1) {
                attributesArray.push(this.attrName);
            }
            else {
                prompt.showToast({ message: 'the attribute already exist' });
                return;
            }
            let html = '<a ' + this.attrName + '="' + this.schemeName + '://www.baidu.com">inner text </a>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitizeHtml(html, {
                allowedAttributes: {
                    a: [this.attrName]
                }
            });
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
loadDocument(new Allowed_scheme_applied_to_attr("1", undefined, {}));
