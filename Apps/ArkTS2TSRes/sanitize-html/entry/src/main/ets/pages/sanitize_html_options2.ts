interface Sanitize_html_options2_Params {
    sanitizeResult?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "sanitize_html_options2_" + ++__generate__Id;
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
class Sanitize_html_options2 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__sanitizeResult = new ObservedPropertySimple('sanitizeResult: ', this, "sanitizeResult");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Sanitize_html_options2_Params) {
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
        Button.createWithLabel('set scheme url relative :true');
        Button.height('5%');
        Button.onClick(() => {
            let html = '<a href="//cnn.com/example">test</a>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                allowProtocolRelative: true
            });
        });
        Button.pop();
        Button.createWithLabel('set scheme url relative :false');
        Button.height('5%');
        Button.onClick(() => {
            let html = '<a href="//cnn.com/example">test</a>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                allowProtocolRelative: false
            });
        });
        Button.pop();
        Button.createWithLabel(`enforce Html Boundary: false`);
        Button.height('5%');
        Button.onClick(() => {
            let html = 'Text before html tag<html><div><p>Hello <b>there</b></p></div></html>Text after html tag!P�X��[<p>paragraph after closing html</p>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                enforceHtmlBoundary: false
            });
        });
        Button.pop();
        Button.createWithLabel(`enforce Html Boundary: true`);
        Button.height('5%');
        Button.onClick(() => {
            let html = 'Text before html tag<html><div><p>Hello <b>there</b></p></div></html>Text after html tag!P�X��[<p>paragraph after closing html</p>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                enforceHtmlBoundary: true
            });
        });
        Button.pop();
        Button.createWithLabel('set allowed style');
        Button.height('5%');
        Button.onClick(() => {
            let html = '<a href="http://www.baidu.com" style="color:yellow;text-align:center;font-family:helvetica" id="alink">';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                allowedAttributes: false,
                allowedStyles: {
                    a: {
                        color: [new RegExp('yellow')],
                        text: [new RegExp('center')],
                        font: [new RegExp('helvetica')]
                    }
                }
            });
        });
        Button.pop();
        Button.createWithLabel('set allowed classes');
        Button.height('5%');
        Button.onClick(() => {
            let html = '<a href="http://www.baidu.com" class="nifty simple dippy"></a>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                allowedAttributes: false,
                allowedClasses: {
                    a: ['simple', 'dippy']
                }
            });
        });
        Button.pop();
        Button.createWithLabel(`set iframe tag's hostname`);
        Button.height('5%');
        Button.onClick(() => {
            let html = '<iframe src="https://www.youtube1.com/embed/c2Il7cS7AHxM"></iframe>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                allowedTags: ['h', 'iframe', 'a', 'img', 'h1'],
                allowedAttributes: {
                    iframe: ['src', 'href'],
                    a: ['src', 'href'],
                    img: ['src']
                },
                allowedIframeHostnames: ['www.youtube1.com', 'player2.vimeo.com']
            });
        });
        Button.pop();
        Button.createWithLabel(`set iframe tag's domain`);
        Button.height('5%');
        Button.onClick(() => {
            let html = '<iframe src="https://www.food.us025web.zoom2.us/embed/c2Ilc9S7AHxM"></iframe>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                allowedTags: ['h2', 'iframe', 'a', 'br'],
                allowedAttributes: {
                    iframe: ['src', 'href'],
                    a: ['src', 'href']
                },
                allowedIframeDomains: ['zoom2.us']
            });
        });
        Button.pop();
        Button.createWithLabel(`set iframe tag disallow Relative Url `);
        Button.height('5%');
        Button.onClick(() => {
            let html = '<iframe src="/foo"></iframe>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                allowedTags: ['p', 'iframe', 'a', 'img', 'i'],
                allowedAttributes: {
                    iframe: ['src', 'href'],
                    a: ['src', 'href'],
                    img: ['src']
                },
                allowIframeRelativeUrls: false
            });
        });
        Button.pop();
        Button.createWithLabel(`set iframe tag allow Relative Url `);
        Button.height('5%');
        Button.onClick(() => {
            let html = '<iframe src="/foo"></iframe>';
            this.sanitizeResult = 'sanitizeResult: ' + sanitize(html, {
                allowedTags: ['p', 'iframe', 'a', 'img', 'i'],
                allowedAttributes: {
                    iframe: ['src', 'href'],
                    a: ['src', 'href'],
                    img: ['src']
                },
                allowIframeRelativeUrls: true
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
loadDocument(new Sanitize_html_options2("1", undefined, {}));
