interface AllowedAttributes_Params {
    default_allows?: ESObject;
    attributeName?: string;
    sanitizeResult?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "allowed_attributes_" + ++__generate__Id;
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
class AllowedAttributes extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.default_allows = sanitize.defaults.allowedAttributes;
        this.__attributeName = new ObservedPropertySimple('', this, "attributeName");
        this.__sanitizeResult = new ObservedPropertySimple('sanitizeResult: ', this, "sanitizeResult");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AllowedAttributes_Params) {
        if (params.default_allows !== undefined) {
            this.default_allows = params.default_allows;
        }
        if (params.attributeName !== undefined) {
            this.attributeName = params.attributeName;
        }
        if (params.sanitizeResult !== undefined) {
            this.sanitizeResult = params.sanitizeResult;
        }
    }
    aboutToBeDeleted() {
        this.__attributeName.aboutToBeDeleted();
        this.__sanitizeResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private default_allows: any;
    private __attributeName: ObservedPropertySimple<string>;
    get attributeName() {
        return this.__attributeName.get();
    }
    set attributeName(newValue: string) {
        this.__attributeName.set(newValue);
    }
    private __sanitizeResult: ObservedPropertySimple<string>;
    get sanitizeResult() {
        return this.__sanitizeResult.get();
    }
    set sanitizeResult(newValue: string) {
        this.__sanitizeResult.set(newValue);
    }
    aboutToAppear() {
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create({ space: 10 });
        Column.width('100%');
        Text.create(JSON.stringify(this.default_allows));
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: 'input attribute name.', controller: new TextInputController() });
        TextInput.margin({
            top: 10
        });
        TextInput.onChange((value: string) => {
            this.attributeName = value;
        });
        Button.createWithLabel('default sanitize html');
        Button.height('5%');
        Button.onClick(() => {
            if (!this.attributeName) {
                prompt.showToast({ message: 'please input attribute name' });
                return;
            }
            let html = '<a ' + this.attributeName + '="test">inner text </' + this.attributeName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html);
        });
        Button.pop();
        Button.createWithLabel('cover all default attribute');
        Button.height('5%');
        Button.onClick(() => {
            if (!this.attributeName) {
                prompt.showToast({ message: 'please input attribute name' });
                return;
            }
            sanitize.defaults.allowedAttributes = { a: [this.attributeName], img: [this.attributeName] };
            let html = '<a ' + this.attributeName + '="test">inner text </' + this.attributeName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html);
        });
        Button.pop();
        Button.createWithLabel('cover attributes by options');
        Button.height('5%');
        Button.onClick(() => {
            if (!this.attributeName) {
                prompt.showToast({ message: 'please input attribute name' });
                return;
            }
            let html = '<a ' + this.attributeName + '="test">inner text </' + this.attributeName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                allowedAttributes: { a: ['a', 'b', 'c', 'd'] }
            });
        });
        Button.pop();
        Button.createWithLabel('add allowed attribute for all');
        Button.height('5%');
        Button.onClick(() => {
            if (!this.attributeName) {
                prompt.showToast({ message: 'please input attribute name' });
                return;
            }
            let defaultsCommonValue: any = sanitize.defaults.allowedAttributes['*'];
            if (typeof defaultsCommonValue === 'object' && Array.isArray(defaultsCommonValue)) {
                let attrIndex = defaultsCommonValue.indexOf(this.attributeName);
                if (attrIndex != -1) {
                    prompt.showToast({ message: 'the attribute name already exist' });
                    return;
                }
                defaultsCommonValue.push(this.attributeName);
            }
            else {
                sanitize.defaults.allowedAttributes['*'] = [this.attributeName];
            }
            let html = '<a ' + this.attributeName + '="test">inner text </' + this.attributeName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html);
        });
        Button.pop();
        Button.createWithLabel('not check attribute : false');
        Button.height('5%');
        Button.onClick(() => {
            if (!this.attributeName) {
                prompt.showToast({ message: 'please input attribute name' });
                return;
            }
            let html = '<a ' + this.attributeName + '="test">inner text </' + this.attributeName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, { allowedAttributes: false });
        });
        Button.pop();
        Button.createWithLabel('not check attribute : undefined');
        Button.height('5%');
        Button.onClick(() => {
            if (!this.attributeName) {
                prompt.showToast({ message: 'please input attribute name' });
                return;
            }
            let html = '<a ' + this.attributeName + '="test">inner text </' + this.attributeName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, { allowedAttributes: undefined });
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
loadDocument(new AllowedAttributes("1", undefined, {}));
