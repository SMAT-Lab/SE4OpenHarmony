interface Base64Helper_Params {
    resultEncode?: string;
    resultDecode?: string;
    input?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Base64Helper_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import util from '@ohos.util';
export class Base64Helper extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__resultEncode = new ObservedPropertySimple('', this, "resultEncode");
        this.__resultDecode = new ObservedPropertySimple('', this, "resultDecode");
        this.__input = new ObservedPropertySimple('harmony', this, "input");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Base64Helper_Params) {
        if (params.resultEncode !== undefined) {
            this.resultEncode = params.resultEncode;
        }
        if (params.resultDecode !== undefined) {
            this.resultDecode = params.resultDecode;
        }
        if (params.input !== undefined) {
            this.input = params.input;
        }
    }
    aboutToBeDeleted() {
        this.__resultEncode.aboutToBeDeleted();
        this.__resultDecode.aboutToBeDeleted();
        this.__input.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __resultEncode: ObservedPropertySimple<string>;
    get resultEncode() {
        return this.__resultEncode.get();
    }
    set resultEncode(newValue: string) {
        this.__resultEncode.set(newValue);
    }
    private __resultDecode: ObservedPropertySimple<string>;
    get resultDecode() {
        return this.__resultDecode.get();
    }
    set resultDecode(newValue: string) {
        this.__resultDecode.set(newValue);
    }
    private __input: ObservedPropertySimple<string>;
    get input() {
        return this.__input.get();
    }
    set input(newValue: string) {
        this.__input.set(newValue);
    }
    render() {
        Scroll.create();
        Scroll.scrollBar(BarState.Off);
        Scroll.align(Alignment.Start);
        Column.create({ space: 12 });
        Column.width('100%');
        Column.padding(16);
        Row.create();
        Row.width('100%');
        Row.height('10%');
        Text.create($r('app.string.change_str'));
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.End);
        Text.pop();
        Text.create(this.input);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Row.pop();
        Text.create(this.resultEncode);
        Text.width('100%');
        Text.height('10%');
        Text.padding({ left: 10 });
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.border({ width: 2, radius: 10, color: Color.Black });
        Text.pop();
        Button.createWithChild();
        Button.key('encodeBtn');
        Button.width('100%');
        Button.height(50);
        Button.type(ButtonType.Capsule);
        Button.onClick(() => {
            this.encode();
        });
        Text.create($r("app.string.encode"));
        Text.fontSize(25);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Text.create(this.resultDecode);
        Text.width('100%');
        Text.height('10%');
        Text.fontSize(20);
        Text.padding({ left: 10 });
        Text.fontWeight(FontWeight.Bold);
        Text.border({ width: 2, radius: 10, color: Color.Black });
        Text.margin({ top: 50 });
        Text.pop();
        Button.createWithChild();
        Button.key('decodeBtn');
        Button.width('100%');
        Button.height(50);
        Button.type(ButtonType.Capsule);
        Button.onClick(() => {
            this.decode();
        });
        Text.create($r("app.string.decode"));
        Text.fontSize(25);
        Text.fontColor(Color.White);
        Text.pop();
        Button.pop();
        Column.pop();
        Scroll.pop();
    }
    encode() {
        let strToAscii: number[] = [];
        for (let i = 0; i < this.input.length; i++) {
            strToAscii.push(this.input.charCodeAt(i));
        }
        let that = new util.Base64Helper();
        let encodeNum = new Uint8Array(strToAscii);
        this.resultEncode = that.encodeToStringSync(encodeNum);
    }
    decode() {
        let that = new util.Base64Helper();
        if (this.resultEncode === undefined || this.resultEncode === '') {
            return;
        }
        let decodeNum = that.decodeSync(this.resultEncode);
        this.resultDecode = '';
        for (let i = 0; i < decodeNum.length; i++) {
            this.resultDecode += String.fromCharCode(decodeNum[i]);
        }
    }
}
