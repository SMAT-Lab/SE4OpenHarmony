interface YamlDocument_Params {
    documentList?: Array<ESObject>;
    yamlDocumentList?: Array<ESObject>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "YamlDocument_" + ++__generate__Id;
}
/*
* Copyright (c) 2022 Huawei Device Co., Ltd.

* Permission to use, copy, modify, and/or distribute this software for any purpose
* with or without fee is hereby granted, provided that the above copyright notice
* and this permission notice appear in all copies.

* THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
* REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
* FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
* INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
* OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
* TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
* THIS SOFTWARE.
*/
import YAML, { Document } from 'yaml';
import { Scalar, YAMLMap, YAMLSeq } from 'yaml/types';
class YamlDocument extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__documentList = new ObservedPropertyObject(["", "", ""], this, "documentList");
        this.__yamlDocumentList = new ObservedPropertyObject(["", "", ""], this, "yamlDocumentList");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: YamlDocument_Params) {
        if (params.documentList !== undefined) {
            this.documentList = params.documentList;
        }
        if (params.yamlDocumentList !== undefined) {
            this.yamlDocumentList = params.yamlDocumentList;
        }
    }
    aboutToBeDeleted() {
        this.__documentList.aboutToBeDeleted();
        this.__yamlDocumentList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __documentList: ObservedPropertyObject<Array<any>>;
    get documentList() {
        return this.__documentList.get();
    }
    set documentList(newValue: Array<any>) {
        this.__documentList.set(newValue);
    }
    private __yamlDocumentList: ObservedPropertyObject<Array<any>>;
    get yamlDocumentList() {
        return this.__yamlDocumentList.get();
    }
    set yamlDocumentList(newValue: Array<any>) {
        this.__yamlDocumentList.set(newValue);
    }
    document() {
        const doc = new YAML.Document();
        doc.version = "true";
        doc.commentBefore = ' A commented document';
        doc.contents = ['some', 'values', { balloons: 99 }];
        this.yamlDocumentList[0] = String(doc);
    }
    parseDocument() {
        const src = '[{ a: A }, { b: B }]';
        const doc = YAML.parseDocument(src);
        const anchors: Document.Anchors = doc.anchors;
        const contents: Scalar | YAMLMap | YAMLSeq | null = doc.contents;
        const a: any = contents == null ? null : contents["items"][0];
        const b: any = contents == null ? null : contents["items"][1];
        this.yamlDocumentList[1] = String(doc);
        const alias = anchors.createAlias(a, 'AA');
        if (contents)
            contents["items"].push(alias);
        doc.toJSON();
        this.yamlDocumentList[2] = String(doc);
    }
    aboutToAppear() {
        this.document();
        this.parseDocument();
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        Flex.width("100%");
        Text.create("YAML Document");
        Text.fontSize(25);
        Text.fontColor(Color.Gray);
        Text.padding(20);
        Text.pop();
        Column.create({ space: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Column.width("100%");
        Column.padding({ left: 15, bottom: 25 });
        Text.create("原数据: \n' A commented document'\n['some', 'values', { balloons: 99 }]");
        Text.fontSize(15);
        Text.pop();
        Text.create("YAMI.document后的数据：\n" + this.documentList[0]);
        Text.fontSize(15);
        Text.pop();
        Column.pop();
        Column.create({ space: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Column.width("100%");
        Column.padding({ left: 15, bottom: 25 });
        Text.create("原数据: [{ a: A }, { b: B }]");
        Text.fontSize(15);
        Text.pop();
        Text.create("YAMI.parseDocument后的数据：\n" + this.documentList[1]);
        Text.fontSize(15);
        Text.pop();
        Text.create("anchors.createAlias：\n" + this.documentList[2]);
        Text.fontSize(15);
        Text.pop();
        Column.pop();
        Button.createWithLabel("YAML Document", { type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.width("50%");
        Button.onClick(() => {
            this.documentList[0] = this.yamlDocumentList[0];
            this.documentList[1] = this.yamlDocumentList[1];
            this.documentList[2] = this.yamlDocumentList[2];
        });
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new YamlDocument("1", undefined, {}));
