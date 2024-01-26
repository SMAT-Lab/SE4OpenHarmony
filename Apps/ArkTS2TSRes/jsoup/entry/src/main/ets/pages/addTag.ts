interface Index_Params {
    input?: string;
    result?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "addTag_" + ++__generate__Id;
}
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
import LabelSupplement from '../common/LabelSupplement';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__input = new ObservedPropertySimple('', this, "input");
        this.result = '';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.input !== undefined) {
            this.input = params.input;
        }
        if (params.result !== undefined) {
            this.result = params.result;
        }
    }
    aboutToBeDeleted() {
        this.__input.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __input: ObservedPropertySimple<string>;
    get input() {
        return this.__input.get();
    }
    set input(newValue: string) {
        this.__input.set(newValue);
    }
    private result: string;
    aboutToAppear() {
        this.result = "";
        this.input =
            "html lang:ja\n" +
                "\thead\n" +
                "\t\ttitle :test\n" +
                "\tbody\n" +
                "\t\tdiv\n" +
                "\t\t\tp";
        LabelSupplement.process(this.input);
        this.result = LabelSupplement.getTemplate();
        console.info("jsoup labelSupplements result :" + this.result);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Text.create('源数据:');
        Text.fontSize(30);
        Text.pop();
        Text.create(this.input);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create('模板化后数据:');
        Text.fontSize(30);
        Text.pop();
        Text.create(this.result);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
