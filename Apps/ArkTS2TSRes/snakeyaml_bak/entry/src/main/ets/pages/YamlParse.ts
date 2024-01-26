interface YamlParse_Params {
    yamlParseDataList?: Array<string>;
    fileData?: string;
    yamlParseFileData?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "YamlParse_" + ++__generate__Id;
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
import YAML from 'yaml';
class YamlParse extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__yamlParseDataList = new ObservedPropertyObject(["", ""], this, "yamlParseDataList");
        this.__fileData = new ObservedPropertySimple("", this, "fileData");
        this.__yamlParseFileData = new ObservedPropertySimple("", this, "yamlParseFileData");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: YamlParse_Params) {
        if (params.yamlParseDataList !== undefined) {
            this.yamlParseDataList = params.yamlParseDataList;
        }
        if (params.fileData !== undefined) {
            this.fileData = params.fileData;
        }
        if (params.yamlParseFileData !== undefined) {
            this.yamlParseFileData = params.yamlParseFileData;
        }
    }
    aboutToBeDeleted() {
        this.__yamlParseDataList.aboutToBeDeleted();
        this.__fileData.aboutToBeDeleted();
        this.__yamlParseFileData.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __yamlParseDataList: ObservedPropertyObject<Array<string>>;
    get yamlParseDataList() {
        return this.__yamlParseDataList.get();
    }
    set yamlParseDataList(newValue: Array<string>) {
        this.__yamlParseDataList.set(newValue);
    }
    private __fileData: ObservedPropertySimple<string>;
    get fileData() {
        return this.__fileData.get();
    }
    set fileData(newValue: string) {
        this.__fileData.set(newValue);
    }
    private __yamlParseFileData: ObservedPropertySimple<string>;
    get yamlParseFileData() {
        return this.__yamlParseFileData.get();
    }
    set yamlParseFileData(newValue: string) {
        this.__yamlParseFileData.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        Flex.width("100%");
        Text.create("YAML Parse");
        Text.fontSize(25);
        Text.fontColor(Color.Gray);
        Text.padding(20);
        Text.pop();
        Column.create({ space: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Column.width("100%");
        Column.padding({ left: 15, bottom: 25 });
        Text.create("原数据: '3.14159'");
        Text.fontSize(15);
        Text.pop();
        Text.create("YAMI.parse后的数据：" + this.yamlParseDataList[0]);
        Text.fontSize(15);
        Text.pop();
        Column.pop();
        Column.create({ space: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Column.width("100%");
        Column.padding({ left: 15, bottom: 25 });
        Text.create("原数据: '[ true, false, maybe, null ]\n'");
        Text.fontSize(15);
        Text.pop();
        Text.create("YAMI.parse后的数据：" + this.yamlParseDataList[1]);
        Text.fontSize(15);
        Text.pop();
        Column.pop();
        Button.createWithLabel("YAML Parse", { type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.width("50%");
        Button.onClick(() => {
            this.yamlParseDataList[0] = YAML.parse('3.14159');
            this.yamlParseDataList[1] = YAML.parse('[ true, false, maybe, null ]\n');
            this.yamlParseFileData = YAML.parse(this.fileData);
        });
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new YamlParse("1", undefined, {}));
