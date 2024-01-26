interface Index_Params {
    text?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/**
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 * */
import { DOMParser, XMLSerializer, DOMImplementation } from '@xmldom/xmldom';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__text = new ObservedPropertySimple('展示结果区', this, "text");
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
    onParseFromString() {
        const XML = '<xml attr="&quot;">&lt; &amp;</xml>';
        const actual: any = new DOMParser().parseFromString(XML).toString();
        this.text = actual;
    }
    onSerializeToString() {
        const str = '<a:foo xmlns:a="AAA"><bar xmlns="AAA"/></a:foo>';
        const doc: any = new DOMParser().parseFromString(str, "text/xml");
        const child: any = doc.createElementNS('AAA', 'child');
        let xmlSerializer = new XMLSerializer();
        let xmlSerializerStr = xmlSerializer.serializeToString(child);
        this.text = xmlSerializerStr;
    }
    onDOMImplementation() {
        const impl: any = new DOMImplementation();
        const doc: any = impl.createDocumentType('qualifiedName', 'publicId', 'systemId');
        this.text = doc.name;
    }
    onErrorHandler() {
        const errors: string[] = [];
        const parser = new DOMParser({
            errorHandler: (msg: any) => {
                errors.push(msg);
            },
        });
        parser.parseFromString('<xml attr=value/>', 'text/xml');
        parser.parseFromString('<doc a1=></doc>', 'text/xml');
        parser.parseFromString('<xml a="1" a="2"></xml>', 'text/xml');
        this.text = errors[0] + '\n' + errors[1] + '\n' + errors[2];
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.height('100%');
        Column.width('100%');
        Column.padding({ top: px2vp(100) });
        Button.createWithLabel('parseFromString');
        Button.margin({ top: px2vp(30) });
        Button.onClick(() => this.onParseFromString());
        Button.pop();
        Button.createWithLabel('serializeToString');
        Button.margin({ top: px2vp(30) });
        Button.onClick(() => this.onSerializeToString());
        Button.pop();
        Button.createWithLabel('DOMImplementation');
        Button.margin({ top: px2vp(30) });
        Button.onClick(() => this.onDOMImplementation());
        Button.pop();
        Button.createWithLabel('errorHandler');
        Button.margin({ top: px2vp(30) });
        Button.onClick(() => this.onErrorHandler());
        Button.pop();
        TextArea.create({ text: this.text });
        TextArea.textAlign(TextAlign.Start);
        TextArea.fontSize(px2fp(35));
        TextArea.margin({ top: px2vp(30) });
        TextArea.width('100%');
        TextArea.backgroundColor(Color.Orange);
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
