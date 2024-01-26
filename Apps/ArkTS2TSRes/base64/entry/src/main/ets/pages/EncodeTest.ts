interface EncodeTest_Params {
    encodeTest?: string;
    decodeTest?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "EncodeTest_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { Base64 } from '@ohos/base64';
class EncodeTest extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__encodeTest = new ObservedPropertySimple('', this, "encodeTest");
        this.__decodeTest = new ObservedPropertySimple('', this, "decodeTest");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: EncodeTest_Params) {
        if (params.encodeTest !== undefined) {
            this.encodeTest = params.encodeTest;
        }
        if (params.decodeTest !== undefined) {
            this.decodeTest = params.decodeTest;
        }
    }
    aboutToBeDeleted() {
        this.__encodeTest.aboutToBeDeleted();
        this.__decodeTest.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __encodeTest: ObservedPropertySimple<string>;
    get encodeTest() {
        return this.__encodeTest.get();
    }
    set encodeTest(newValue: string) {
        this.__encodeTest.set(newValue);
    }
    private __decodeTest: ObservedPropertySimple<string>;
    get decodeTest() {
        return this.__decodeTest.get();
    }
    set decodeTest(newValue: string) {
        this.__decodeTest.set(newValue);
    }
    onPageShow() {
        let test: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let encode = Base64.encode(new Uint8Array(test));
        console.info("base64 escape onPageShow encode:" + Base64.bytesToString(encode));
        console.info("base64 escape onPageShow decode:" + Base64.bytesToString(Base64.decode(encode)));
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        TextInput.create({ placeholder: 'input encode content' });
        TextInput.type(InputType.Normal);
        TextInput.placeholderColor(Color.Gray);
        TextInput.placeholderFont({ size: 15, weight: FontWeight.Normal, family: "sans-serif", style: FontStyle.Normal });
        TextInput.enterKeyType(EnterKeyType.Done);
        TextInput.height(60);
        TextInput.fontSize(15);
        TextInput.fontStyle(FontStyle.Italic);
        TextInput.fontColor(Color.Black);
        TextInput.onChange((value: string) => {
            if (value !== "") {
                this.encodeTest = Base64.encodeToString(Base64.stringToBytes(value));
                this.decodeTest = Base64.bytesToString(Base64.decode(this.encodeTest));
            }
            else {
                this.encodeTest = "";
                this.decodeTest = "";
            }
        });
        Text.create('加密后的数据 ：' + this.encodeTest);
        Text.fontSize(15);
        Text.margin({ left: 10, top: 10 });
        Text.width('100%');
        Text.pop();
        Text.create('解密加密后的数据 ：' + this.decodeTest);
        Text.fontSize(15);
        Text.margin({ left: 10, top: 10 });
        Text.width('100%');
        Text.pop();
        Column.pop();
    }
}
loadDocument(new EncodeTest("1", undefined, {}));
