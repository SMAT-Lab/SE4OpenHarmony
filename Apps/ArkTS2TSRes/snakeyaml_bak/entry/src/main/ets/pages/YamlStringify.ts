interface YamlStringify_Params {
    yamlStringifyDataList?: Array<string>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "YamlStringify_" + ++__generate__Id;
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
class YamlStringify extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__yamlStringifyDataList = new ObservedPropertyObject(["", "", ""], this, "yamlStringifyDataList");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: YamlStringify_Params) {
        if (params.yamlStringifyDataList !== undefined) {
            this.yamlStringifyDataList = params.yamlStringifyDataList;
        }
    }
    aboutToBeDeleted() {
        this.__yamlStringifyDataList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __yamlStringifyDataList: ObservedPropertyObject<Array<string>>;
    get yamlStringifyDataList() {
        return this.__yamlStringifyDataList.get();
    }
    set yamlStringifyDataList(newValue: Array<string>) {
        this.__yamlStringifyDataList.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        Flex.width("100%");
        Text.create("YAML Stringify");
        Text.fontSize(25);
        Text.fontColor(Color.Gray);
        Text.padding(20);
        Text.pop();
        Column.create({ space: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Column.width("100%");
        Column.padding({ left: 15, bottom: 25 });
        Text.create("原数据: 3.14159");
        Text.fontSize(15);
        Text.pop();
        Text.create("YAMI.stringify后的数据：" + this.yamlStringifyDataList[0]);
        Text.fontSize(15);
        Text.pop();
        Column.pop();
        Column.create({ space: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Column.width("100%");
        Column.padding({ left: 15, bottom: 25 });
        Text.create("原数据: [true, false, 'maybe', null]");
        Text.fontSize(15);
        Text.pop();
        Text.create("YAMI.stringify后的数据：\n" + this.yamlStringifyDataList[1]);
        Text.fontSize(15);
        Text.pop();
        Column.pop();
        Column.create({ space: 10 });
        Column.alignItems(HorizontalAlign.Start);
        Column.width("100%");
        Column.padding({ left: 15, bottom: 25 });
        Text.create("原数据: { number: 3, plain: 'string', block: 'two\nlines\n' }");
        Text.fontSize(15);
        Text.pop();
        Text.create("YAMI.stringify后的数据：\n" + this.yamlStringifyDataList[2]);
        Text.fontSize(15);
        Text.pop();
        Column.pop();
        Button.createWithLabel("YAML Stringify", { type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.width("50%");
        Button.onClick(() => {
            this.yamlStringifyDataList[0] = YAML.stringify(3.14159);
            this.yamlStringifyDataList[1] = YAML.stringify([true, false, 'maybe', null]);
            this.yamlStringifyDataList[2] = YAML.stringify({ number: 3, plain: 'string', block: 'two\nlines\n' });
            console.info('YAML Stringify---' + JSON.stringify(ObservedObject.GetRawObject(this.yamlStringifyDataList)));
        });
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new YamlStringify("1", undefined, {}));
