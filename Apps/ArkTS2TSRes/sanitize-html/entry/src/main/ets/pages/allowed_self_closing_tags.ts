interface Self_closing_tags_Params {
    message?: string;
    tags?: string[];
    tagName?: string;
    sanitizeResult?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "allowed_self_closing_tags_" + ++__generate__Id;
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
class Self_closing_tags extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.tags = sanitize.defaults.selfClosing;
        this.__tagName = new ObservedPropertySimple('', this, "tagName");
        this.__sanitizeResult = new ObservedPropertySimple('sanitizeResult: ', this, "sanitizeResult");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Self_closing_tags_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.tags !== undefined) {
            this.tags = params.tags;
        }
        if (params.tagName !== undefined) {
            this.tagName = params.tagName;
        }
        if (params.sanitizeResult !== undefined) {
            this.sanitizeResult = params.sanitizeResult;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__tagName.aboutToBeDeleted();
        this.__sanitizeResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private tags: string[];
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
    render() {
        Row.create();
        Row.height('100%');
        Column.create({ space: 10 });
        Column.width('100%');
        Text.create(this.tags.toString());
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        TextInput.create({ placeholder: 'input tag name.', controller: new TextInputController() });
        TextInput.onChange((value: string) => {
            this.tagName = value;
        });
        Button.createWithLabel('default self sanitize html');
        Button.height('5%');
        Button.onClick(() => {
            if (!this.tagName) {
                prompt.showToast({ message: 'please input tag name' });
                return;
            }
            let html = '<' + this.tagName + ' name="selfClosingTag">';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                allowedTags: false,
                allowedAttributes: false
            });
        });
        Button.pop();
        Button.createWithLabel('cover default self closing tag');
        Button.height('5%');
        Button.onClick(() => {
            if (!this.tagName) {
                prompt.showToast({ message: 'please input tag name' });
                return;
            }
            sanitize.defaults.selfClosing = [this.tagName];
            let html = '<' + this.tagName + ' name="selfClosingTag">';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                allowedTags: false,
                allowedAttributes: false
            });
        });
        Button.pop();
        Button.createWithLabel('cover self closing tag by options');
        Button.height('5%');
        Button.onClick(() => {
            if (!this.tagName) {
                prompt.showToast({ message: 'please input tag name' });
                return;
            }
            let html = '<' + this.tagName + ' name="selfClosingTag">';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                allowedTags: false,
                allowedAttributes: false,
                selfClosing: [this.tagName]
            });
        });
        Button.pop();
        Button.createWithLabel('add self closing tag');
        Button.height('5%');
        Button.onClick(() => {
            if (!this.tagName) {
                prompt.showToast({ message: 'please input tag name' });
                return;
            }
            let index: any = sanitize.defaults.selfClosing.indexOf(this.tagName);
            if (index != -1) {
                prompt.showToast({ message: 'the tag name already exist' });
                return;
            }
            sanitize.defaults.selfClosing.push(this.tagName);
            let html = '<' + this.tagName + ' name="selfClosingTag">';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                allowedTags: false,
                allowedAttributes: false
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
loadDocument(new Self_closing_tags("1", undefined, {}));
