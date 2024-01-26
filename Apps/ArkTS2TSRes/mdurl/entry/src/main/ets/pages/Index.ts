interface Index_Params {
    text?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:

 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
import { encode, decode, format, parse } from 'mdurl';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__text = new ObservedPropertySimple('abc, hello', this, "text");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.text !== undefined) {
            this.text = params.text;
        }
    }
    aboutToBeDeleted() {
        this.__text.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __text: ObservedPropertySimple<string>;
    get text() {
        return this.__text.get();
    }
    set text(newValue: string) {
        this.__text.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.height('80%');
        Column.width('100%');
        Text.create('encode:' + encode(this.text) + '\n');
        Text.fontSize(px2fp(40));
        Text.width('80%');
        Text.pop();
        Text.create('decode:' + decode(encode(this.text)) + '\n');
        Text.fontSize(px2fp(40));
        Text.width('80%');
        Text.pop();
        Text.create('parse:' + JSON.stringify(parse('http://ex.com/fooA100%mBr?abc=the%231?&foo=bar#frag')) + '\n');
        Text.fontSize(px2fp(40));
        Text.width('80%');
        Text.pop();
        Text.create('format:' + format(parse('http://ex.com/fooA100%mBr?abc=the%231?&foo=bar#frag')) + '\n');
        Text.fontSize(px2fp(40));
        Text.width('80%');
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
