interface Sanitize_html_options_Params {
    sanitizeResult?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "sanitize_html_options1_" + ++__generate__Id;
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
class Sanitize_html_options extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__sanitizeResult = new ObservedPropertySimple('sanitizeResult: ', this, "sanitizeResult");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Sanitize_html_options_Params) {
        if (params.sanitizeResult !== undefined) {
            this.sanitizeResult = params.sanitizeResult;
        }
    }
    aboutToBeDeleted() {
        this.__sanitizeResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
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
        Button.createWithLabel('add allowed tag:img');
        Button.height('5%');
        Button.onClick(() => {
            let html = '<img src="http://www.baidu.com">';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                allowedTags: sanitize.defaults.allowedTags.concat(['img'])
            });
        });
        Button.pop();
        Button.createWithLabel('set allowed attribute:id');
        Button.height('5%');
        Button.onClick(() => {
            let html = '<a href="http://www.baidu.com" id="alink">';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                allowedAttributes: {
                    a: ['href', 'id']
                }
            });
        });
        Button.pop();
        Button.createWithLabel('set allowed scheme');
        Button.height('5%');
        Button.onClick(() => {
            let html = '<img href="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==">';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                allowedTags: false,
                allowedAttributes: false,
                allowedSchemes: ['sms', 'data']
            });
        });
        Button.pop();
        Button.createWithLabel('set allowed scheme by tag');
        Button.height('5%');
        Button.onClick(() => {
            let html = '<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==">';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                allowedTags: false,
                allowedAttributes: false,
                allowedSchemesByTag: {
                    img: ['data']
                }
            });
        });
        Button.pop();
        Button.createWithLabel('set allowed scheme applied to attr');
        Button.height('5%');
        Button.onClick(() => {
            let html = '<img custom="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==">';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                allowedTags: false,
                allowedAttributes: false,
                allowedSchemes: ['sms', 'data'],
                allowedSchemesAppliedToAttributes: ['custom']
            });
        });
        Button.pop();
        Button.createWithLabel('set selfClosing tag');
        Button.height('5%');
        Button.onClick(() => {
            let html = '<a href="https://www.baidu.com"></a><p>drop text and tags between the disallowed tag</p>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                selfClosing: ['a']
            });
        });
        Button.pop();
        Button.createWithLabel('disallowedTagsMode default:discard');
        Button.onClick(() => {
            let html = '<div>drop disallowed tag and its all child tag <sss src="http://www.baidu.com">sss tag inner text<p> allowed tag</p></sss></div>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                disallowedTagsMode: 'discard'
            });
        });
        Button.pop();
        Button.createWithLabel('disallowedTagsMode escape');
        Button.height('5%');
        Button.onClick(() => {
            let html = '<div>escape disallowed tag not its child tag <sss src="http://www.baidu.com">sss tag inner text<sss>ssssssss</sss><p> allowed tag</p></sss></div>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                disallowedTagsMode: 'escape'
            });
        });
        Button.pop();
        Button.createWithLabel('disallowedTagsMode recursiveEscape');
        Button.onClick(() => {
            let html = '<div>escape disallowed tag and its all child tag <sss src="http://www.baidu.com">sss tag inner text<p> allowed tag</p></sss></div>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                disallowedTagsMode: 'recursiveEscape'
            });
        });
        Button.pop();
        Text.create(this.sanitizeResult);
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Sanitize_html_options("1", undefined, {}));
