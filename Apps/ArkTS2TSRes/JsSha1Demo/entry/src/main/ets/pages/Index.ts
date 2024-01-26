interface Index_Params {
    statement?: string;
    resultText?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import sha1 from 'js-sha1';
function __Text__textFancy(fontSize: number, textColor: Color, isBold: Boolean): void {
    Text.fontSize(fontSize);
    Text.fontColor(textColor);
    Text.fontWeight(isBold ? FontWeight.Bold : FontWeight.Normal);
}
function __Button__buttonFancy(): void {
    Button.type(ButtonType.Capsule);
    Button.width(90);
    Button.height(60);
    Button.align(Alignment.Center);
}
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__statement = new ObservedPropertySimple("", this, "statement");
        this.__resultText = new ObservedPropertySimple("sha1: " + "\n\n\n" + "sha1.hex: " + "\n\n\n" + "sha1.array: " + "\n\n\n" + "sha1.digest: " + "\n\n\n" + "sha1.arrayBuffer: ", this, "resultText");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.statement !== undefined) {
            this.statement = params.statement;
        }
        if (params.resultText !== undefined) {
            this.resultText = params.resultText;
        }
    }
    aboutToBeDeleted() {
        this.__statement.aboutToBeDeleted();
        this.__resultText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __statement: ObservedPropertySimple<string>;
    get statement() {
        return this.__statement.get();
    }
    set statement(newValue: string) {
        this.__statement.set(newValue);
    }
    private __resultText: ObservedPropertySimple<string>;
    get resultText() {
        return this.__resultText.get();
    }
    set resultText(newValue: string) {
        this.__resultText.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Text.create("输入一个需要安全散列算法1的字符串");
        __Text__textFancy(16, Color.Green, true);
        Text.margin(40);
        Text.pop();
        TextInput.create({ placeholder: '请输入字符串', text: this.statement });
        TextInput.onChange((value: string) => {
            this.statement = value;
        });
        TextInput.width('100%');
        TextInput.margin(15);
        Button.createWithChild();
        __Button__buttonFancy();
        Button.onClick(() => {
            let sha1Results = "sha1: " + sha1(this.statement);
            let hexResults = "sha1.hex: " + sha1.hex(this.statement);
            let arrayResults = "sha1.array: " + JSON.stringify(sha1.array(this.statement));
            let digestResults = "sha1.digest: " + JSON.stringify(sha1.digest(this.statement));
            let arrayBuffer: number[] = sha1.arrayBuffer(this.statement);
            let arrayBufferResults: string = "sha1.arrayBuffer: ";
            if (arrayBuffer instanceof ArrayBuffer) {
                arrayBufferResults = arrayBufferResults + JSON.stringify((new Uint8Array(arrayBuffer)).slice());
            }
            let results = sha1Results + "\n\n\n" + hexResults + "\n\n\n" + arrayResults + "\n\n\n" + digestResults + "\n\n\n" + arrayBufferResults;
            this.resultText = results;
        });
        Button.width(200);
        Text.create("执行安全散列算法1");
        __Text__textFancy(16, Color.White, false);
        Text.pop();
        Button.pop();
        Text.create(this.resultText);
        __Text__textFancy(12, Color.Black, true);
        Text.margin(30);
        Text.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
