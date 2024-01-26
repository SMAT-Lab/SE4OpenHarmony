interface Sanitize_html_options3_Params {
    sanitizeResult?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "sanitize_html_options3_" + ++__generate__Id;
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
class filter {
    tagName: any = 0;
    attribs: any = 0;
    text: string = '';
}
class Sanitize_html_options3 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__sanitizeResult = new ObservedPropertySimple('sanitizeResult: ', this, "sanitizeResult");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Sanitize_html_options3_Params) {
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
        Button.createWithLabel(`set script tag's hostname`);
        Button.height('5%');
        Button.onClick(() => {
            let html = '<script src="https://www.unauthorized.com/lib.js"></script>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                allowedTags: ['script'],
                allowVulnerableTags: true,
                allowedAttributes: {
                    script: ['src']
                },
                allowedScriptHostnames: ['www.unauthorized.com']
            });
        });
        Button.pop();
        Button.createWithLabel(`set script tag's domain`);
        Button.height('5%');
        Button.onClick(() => {
            let html = '<script src="https://www.safe.authorized.com/lib.js"></script>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                allowedTags: ['script'],
                allowedAttributes: {
                    script: ['src']
                },
                allowedScriptDomains: ['authorized.com']
            });
        });
        Button.pop();
        Button.createWithLabel('text filter');
        Button.height('5%');
        Button.onClick(() => {
            this.sanitizeResult = 'sanitizeResult: ' + sanitize('<a href="http://somelink">some text</a>', {
                transformTags: {
                    a: (tagNameParams: any, attribsParams: any): filter => {
                        return {
                            tagName: tagNameParams,
                            attribs: attribsParams,
                            text: 'some text need"to<be>filtered'
                        };
                    }
                },
                textFilter: (text: any, tagName: any): any => {
                    return text.replace(new RegExp('\s', 'g'), '_');
                }
            });
        });
        Button.pop();
        Button.createWithLabel(`exclusive Filter`);
        Button.height('5%');
        Button.onClick(() => {
            let html = '<p>This is <a href="http://www.linux.org"></a><br/>Linux</p>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                exclusiveFilter: (frame: any) => {
                    return frame.tag === 'a' && !frame.text.trim();
                }
            });
        });
        Button.pop();
        Button.createWithLabel('set nonTextTags');
        Button.height('5%');
        Button.onClick(() => {
            let html = '<notty>sssss</notty><p>drop text and tags between the disallowed tag</p>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                nonTextTags: ['notty']
            });
        });
        Button.pop();
        Button.createWithLabel('transform tag without new attr');
        Button.height('5%');
        Button.onClick(() => {
            this.sanitizeResult = 'sanitizeResult: ' + sanitize('<ol><li>Hello world</li></ol>', {
                transformTags: {
                    ol: 'ul'
                }
            });
        });
        Button.pop();
        Button.createWithLabel('transform tag with new attribute');
        Button.height('5%');
        Button.onClick(() => {
            this.sanitizeResult = 'sanitizeResult: ' + sanitize('<ol><li>Hello world</li></ol>', {
                transformTags: {
                    ol: sanitize.simpleTransform('ul', {
                        class: 'foo',
                        name: 'newAttrName'
                    })
                },
                allowedAttributes: {
                    ul: ['class', 'name']
                }
            });
        });
        Button.pop();
        Button.createWithLabel(`recognizeCDATA: true`);
        Button.height('5%');
        Button.onClick(() => {
            let html = '<?doctype/html><script type="text/javascript">var name = "react";</script><div id = "htmlparser2" class="html">abc</div><![CDATA[hello react.js]]>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                parser: {
                    recognizeCDATA: true
                }
            });
        });
        Button.pop();
        Button.createWithLabel(`recognizeCDATA: false`);
        Button.height('5%');
        Button.onClick(() => {
            let html = '<?doctype/html><script type="text/javascript">var name = "react";</script><div id = "htmlparser2" class="html">abc</div><![CDATA[hello react.js]]>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                parser: {
                    recognizeCDATA: false
                }
            });
        });
        Button.pop();
        Text.create(this.sanitizeResult);
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Sanitize_html_options3("1", undefined, {}));
