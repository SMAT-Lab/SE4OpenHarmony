/**
 * The MIT License
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
import * as htmlparser2 from '@ohos/htmlparser2';
interface option {
    key: string;
    value: string;
}
export class XMLWriter {
    public static readonly ENCODING = 'encoding';
    public static readonly METHOD = 'method';
    public static readonly DOCTYPE_PUBLIC = 'doctype-public';
    public static readonly DOCTYPE_SYSTEM = 'doctype-system';
    public static readonly VERSION = 'version';
    public static readonly STANDALONE = 'standalone';
    public static readonly OMIT_XML_DECLARATION = 'omit-xml-declaration';
    private version: string = null;
    private standalone: string = null;
    private outputEncoding: string = '';
    private htmlMode: boolean = false;
    private unicodeMode: boolean = false;
    private overridePublic: string = null;
    private forceDTD: boolean = false;
    private overrideSystem = null;
    private xmlDeclaration = 'no';
    private elementLevel: number = 0;
    private hasOutputDTD: boolean = false;
    private cdataElement: boolean = false;
    private html: string = null;
    private uri: string = 'http://www.w3.org/1999/xhtml';
    private booleans = ['checked', 'compact', 'declare', 'defer', 'disabled', 'ismap',
        'multiple', 'nohref', 'noresize', 'noshade', 'nowrap', 'readonly', 'selected'];
    private tags = ['area', 'base', 'basefont', 'br', 'col', 'frame', 'hr', 'img', 'input', 'isindex', 'link', 'meta', 'param'];
    private xmlContent = [];
    public constructor(html: string, property?: Array<option>) {
        this.html = html;
        if (property) {
            for (let i = 0; i < property.length; i++) {
                this.setOutputProperty(property[i].key, property[i].value);
            }
        }
    }
    public convertToXML(callback: (content: string | null, error?: Error) => void) {
        this.xmlContent = [];
        let that = this;
        if (!!!this.html) {
            callback(null, new Error('html error'));
            return;
        }
        const parser = new htmlparser2.Parser({
            onparserinit(parser: htmlparser2.Parser) {
                that.xmlContent.push(that.startDocument());
            },
            onprocessinginstruction(name: string, data: string) {
                if (that.forceDTD) {
                    that.xmlContent.push(that.startDTD(data));
                }
            },
            onopentag(name: string, attribs: {
                [s: string]: string;
            }) {
                that.xmlContent.push(that.startElement(name, attribs));
            },
            ontext(data: string) {
                if (!that.cdataElement) {
                    let chars = data.split('');
                    that.xmlContent.push(that.writeEsc(chars, 0, chars.length, false));
                }
                else {
                    that.xmlContent.push(data);
                }
            },
            onclosetag(name: string) {
                that.xmlContent.push(that.endElement(name));
            },
            onend() {
                that.xmlContent.push(that.endDocument());
                callback && callback(that.xmlContent.join(''));
                that.xmlContent = [];
            },
            onerror(error: Error) {
                that.xmlContent = [];
                callback && callback(null, error);
            }
        });
        parser.write(this.html);
        parser.end();
    }
    private setOutputProperty(key: string, value: string): void {
        if (!key || !value) {
            return;
        }
        if (key === XMLWriter.OMIT_XML_DECLARATION) {
            this.xmlDeclaration = value;
        }
        else if (key === XMLWriter.ENCODING) {
            this.outputEncoding = value;
            this.unicodeMode = value.substring(0, 3).toLowerCase() === 'utf';
        }
        else if (key === XMLWriter.METHOD) {
            this.htmlMode = (value === 'html');
        }
        else if (key === XMLWriter.DOCTYPE_PUBLIC) {
            this.overridePublic = value;
            this.forceDTD = true;
        }
        else if (key === XMLWriter.DOCTYPE_SYSTEM) {
            this.overrideSystem = value;
            this.forceDTD = true;
        }
        else if (key === XMLWriter.VERSION) {
            this.version = value;
        }
        else if (key === XMLWriter.STANDALONE) {
            this.standalone = value;
        }
    }
    private startDocument(): string {
        let start = '';
        if ('yes' != this.xmlDeclaration) {
            start += '<?xml';
            if (this.version == null) {
                start += ` version="1.0"`;
            }
            else {
                start += ` version="${this.version}"`;
            }
            if (this.outputEncoding != null && this.outputEncoding != "") {
                start += ` encoding="${this.outputEncoding}"`;
            }
            if (this.standalone == null) {
                start += ` standalone="yes"?>\n`;
            }
            else {
                start += ` standalone="${this.standalone}"?>\n`;
            }
        }
        return start;
    }
    private endDocument(): string {
        return '\n';
    }
    private startElement(qName: string, atts: {
        [s: string]: string;
    }): string {
        let element = '';
        this.elementLevel++;
        element += `<${qName}`;
        element += this.writeAttributes(atts);
        element += this.writeNSDecls(qName, atts);
        element += '>';
        if (this.htmlMode && (qName === 'script' || qName === 'style')) {
            this.cdataElement = true;
        }
        return element;
    }
    private endElement(qName: string): string {
        let endContent = '';
        if (!(this.htmlMode && this.tags.indexOf(qName) != -1)) {
            endContent += `</${qName}>`;
        }
        if (this.elementLevel == 1) {
            endContent += '\n';
        }
        this.cdataElement = false;
        this.elementLevel--;
        return endContent;
    }
    private startDTD(data: string): string {
        let dtd = '';
        if (data == null || this.hasOutputDTD) {
            return dtd;
        }
        this.hasOutputDTD = true;
        dtd += `<${data}`;
        let systemid = '';
        let publicid = '';
        if (this.overrideSystem != null) {
            systemid = this.overrideSystem;
        }
        let sysquote = (systemid.indexOf(`"`) != -1) ? `'` : `"`;
        if (this.overridePublic != null) {
            publicid = this.overridePublic;
        }
        if ('' != publicid) {
            let pubquote = (publicid.indexOf(`"`) != -1) ? `'` : `"`;
            dtd += ` PUBLIC ${pubquote}${publicid}${pubquote} `;
        }
        else {
            dtd += ' SYSTEM ';
        }
        dtd += sysquote + systemid + sysquote + '>\n';
        return dtd;
    }
    private writeAttributes(atts: {
        [s: string]: string;
    }): string {
        let content = '';
        for (let key in atts) {
            let chars = atts[key].split('');
            content += ' ' + key;
            if (this.htmlMode && this.booleanAttribute(key, atts[key])) {
                break;
            }
            content += `="${this.writeEsc(chars, 0, chars.length, true)}"`;
        }
        return content;
    }
    private writeNSDecls(qName: string, atts: {
        [s: string]: string;
    }): string {
        if (qName === 'html') {
            for (let key in atts) {
                if (key.indexOf('xmlns') != -1) {
                    return '';
                }
            }
            return ` xmlns="${this.uri}"`;
        }
        return '';
    }
    private booleanAttribute(qName: string, value: string): boolean {
        let name = qName;
        let index = qName.indexOf(':');
        if (index != -1) {
            name = qName.substring(index + 1, qName.length);
        }
        if (name != value) {
            return false;
        }
        for (let j = 0; j < this.booleans.length; j++) {
            if (name === this.booleans[j]) {
                return true;
            }
        }
        return false;
    }
    private writeEsc(chars: string[], start: number, length: number, isAttVal: boolean): string {
        let esc = '';
        for (let i = start; i < length; i++) {
            switch (chars[i]) {
                case '&':
                    esc += '&amp;';
                    break;
                case '<':
                    esc += '&lt;';
                    break;
                case '>':
                    esc += '&gt;';
                    break;
                case '"':
                    if (isAttVal) {
                        esc += '&quot;';
                    }
                    else {
                        esc += '"';
                    }
                    break;
                default:
                    if (!this.unicodeMode && chars[i] > '\u00ff') {
                        esc += `&#${chars[i]};`;
                    }
                    else {
                        esc += chars[i];
                    }
                    break;
            }
        }
        return esc;
    }
}
