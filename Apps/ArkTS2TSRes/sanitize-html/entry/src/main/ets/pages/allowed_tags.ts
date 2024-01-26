interface AllowedTags_Params {
    default_allows?: string[];
    tagName?: string;
    sanitizeResult?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "allowed_tags_" + ++__generate__Id;
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
class AllowedTags extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.default_allows = sanitize.defaults.allowedTags;
        this.__tagName = new ObservedPropertySimple('', this, "tagName");
        this.__sanitizeResult = new ObservedPropertySimple('sanitizeResult: ', this, "sanitizeResult");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AllowedTags_Params) {
        if (params.default_allows !== undefined) {
            this.default_allows = params.default_allows;
        }
        if (params.tagName !== undefined) {
            this.tagName = params.tagName;
        }
        if (params.sanitizeResult !== undefined) {
            this.sanitizeResult = params.sanitizeResult;
        }
    }
    aboutToBeDeleted() {
        this.__tagName.aboutToBeDeleted();
        this.__sanitizeResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private default_allows: string[];
    private __tagName: ObservedPropertySimple<string>;
    get tagName() {
        return this.__tagName.get();
    }
    set tagName(newValue: string) {
        this.__tagName.set(newValue);
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
        Text.create(this.default_allows.toString());
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: 'input tag name.', controller: new TextInputController() });
        TextInput.onChange((value: string) => {
            this.tagName = value;
        });
        Button.createWithLabel('default attr sanitize html');
        Button.height('5%');
        Button.onClick(() => {
            if (!this.tagName) {
                prompt.showToast({ message: 'please input tag name' });
                return;
            }
            let html = '<' + this.tagName + '>inner text </' + this.tagName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html);
        });
        Button.pop();
        Button.createWithLabel('Cover all default allowed tags');
        Button.height('5%');
        Button.onClick(() => {
            if (!this.tagName) {
                prompt.showToast({ message: 'please input tag name' });
                return;
            }
            sanitize.defaults.allowedTags = ['img', 'iframe'];
            let html = '<' + this.tagName + '>inner text </' + this.tagName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html);
        });
        Button.pop();
        Button.createWithLabel('Cover allowed tags by options');
        Button.height('5%');
        Button.onClick(() => {
            if (!this.tagName) {
                prompt.showToast({ message: 'please input tag name' });
                return;
            }
            let html = '<' + this.tagName + '>inner text </' + this.tagName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                allowedTags: ['tag1', 'tag2']
            });
        });
        Button.pop();
        Button.createWithLabel('Add default allowed tag');
        Button.height('5%');
        Button.onClick(() => {
            if (!this.tagName) {
                prompt.showToast({ message: 'please input tag name' });
                return;
            }
            let index: any = sanitize.defaults.allowedTags.indexOf(this.tagName);
            if (index != -1) {
                prompt.showToast({ message: 'the tag name already exist' });
                return;
            }
            sanitize.defaults.allowedTags.push(this.tagName);
            let html = '<' + this.tagName + '>inner text </' + this.tagName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html);
        });
        Button.pop();
        Button.createWithLabel('not check tag : false');
        Button.height('5%');
        Button.onClick(() => {
            if (!this.tagName) {
                prompt.showToast({ message: 'please input tag name' });
                return;
            }
            let html = '<' + this.tagName + '>inner text </' + this.tagName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, { allowedTags: false });
        });
        Button.pop();
        Button.createWithLabel('not check tag : undefined');
        Button.height('5%');
        Button.onClick(() => {
            if (!this.tagName) {
                prompt.showToast({ message: 'please input tag name' });
                return;
            }
            let html = '<' + this.tagName + '>inner text </' + this.tagName + '>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, { allowedTags: undefined });
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
loadDocument(new AllowedTags("1", undefined, {}));
