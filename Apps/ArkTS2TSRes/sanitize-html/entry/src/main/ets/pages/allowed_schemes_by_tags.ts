interface Allowed_schemes_by_tag_Params {
    allowedSchemeByTag?: object;
    tagName?: string;
    schemeName?: string;
    sanitizeResult?: string;
    controller?: TextInputController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "allowed_schemes_by_tags_" + ++__generate__Id;
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
class Allowed_schemes_by_tag extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.allowedSchemeByTag = sanitize.defaults.allowedSchemesByTag;
        this.__tagName = new ObservedPropertySimple('', this, "tagName");
        this.__schemeName = new ObservedPropertySimple('', this, "schemeName");
        this.__sanitizeResult = new ObservedPropertySimple('sanitizeResult: ', this, "sanitizeResult");
        this.controller = new TextInputController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Allowed_schemes_by_tag_Params) {
        if (params.allowedSchemeByTag !== undefined) {
            this.allowedSchemeByTag = params.allowedSchemeByTag;
        }
        if (params.tagName !== undefined) {
            this.tagName = params.tagName;
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
        this.__tagName.aboutToBeDeleted();
        this.__schemeName.aboutToBeDeleted();
        this.__sanitizeResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private allowedSchemeByTag: object;
    private __tagName: ObservedPropertySimple<string>;
    get tagName() {
        return this.__tagName.get();
    }
    set tagName(newValue: string) {
        this.__tagName.set(newValue);
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
        Text.create(JSON.stringify(this.allowedSchemeByTag));
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: 'input tag name.', controller: this.controller });
        TextInput.onChange((value: string) => {
            this.tagName = value;
        });
        TextInput.create({ placeholder: 'input scheme name.', controller: this.controller });
        TextInput.onChange((value: string) => {
            this.schemeName = value;
        });
        Button.createWithLabel('default scheme sanitize html');
        Button.height('5%');
        Button.onClick(() => {
            if (!this.tagName || !this.schemeName) {
                prompt.showToast({ message: 'please input scheme name' });
                return;
            }
            let html = '<' + this.tagName + ' href="' + this.schemeName + '://www.baidu.com">inner text </' + this.tagName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html);
        });
        Button.pop();
        Button.createWithLabel('add default scheme for tag');
        Button.height('5%');
        Button.onClick(() => {
            if (!this.tagName || !this.schemeName) {
                prompt.showToast({ message: 'please input tag name' });
                return;
            }
            sanitize.defaults.allowedSchemesByTag['a'] = ['sms', 'data'];
            let html = '<' + this.tagName + ' href="' + this.schemeName + '://www.baidu.com">inner text </' + this.tagName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html);
        });
        Button.pop();
        Button.createWithLabel('cover scheme for tag by options');
        Button.height('5%');
        Button.onClick(() => {
            if (!this.tagName || !this.schemeName) {
                prompt.showToast({ message: 'please input tag name' });
                return;
            }
            let html = '<' + this.tagName + ' href="' + this.schemeName + '://www.baidu.com">inner text </' + this.tagName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                allowedSchemesByTag: {
                    a: ['sms1', 'data1']
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
loadDocument(new Allowed_schemes_by_tag("1", undefined, {}));
