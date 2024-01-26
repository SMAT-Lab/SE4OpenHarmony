interface Index_Params {
    onChangeText?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
import CBOR from 'cbor-js';
import prompt from '@ohos.prompt';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__onChangeText = new ObservedPropertySimple('默认 testWorld', this, "onChangeText");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.onChangeText !== undefined) {
            this.onChangeText = params.onChangeText;
        }
    }
    aboutToBeDeleted() {
        this.__onChangeText.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __onChangeText: ObservedPropertySimple<string>;
    get onChangeText() {
        return this.__onChangeText.get();
    }
    set onChangeText(newValue: string) {
        this.__onChangeText.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        TextInput.create({ placeholder: '请输入', text: '默认 testWorld' });
        TextInput.placeholderColor('rgb(0, 0, 255)');
        TextInput.placeholderFont({ size: 15, weight: 100, family: 'cursive', style: FontStyle.Italic });
        TextInput.caretColor(Color.Blue);
        TextInput.height(50);
        TextInput.width('50%');
        TextInput.fontSize(20);
        TextInput.fontWeight(FontWeight.Bold);
        TextInput.fontFamily("sans-serif");
        TextInput.fontStyle(FontStyle.Normal);
        TextInput.fontColor(Color.Red);
        TextInput.onChange((value: string) => {
            this.onChangeText = value;
        });
        Button.createWithLabel('测试cbor编解码', { type: ButtonType.Normal, stateEffect: true });
        Button.borderRadius(8);
        Button.backgroundColor(0x317aff);
        Button.width('50%');
        Button.margin('10');
        Button.onClick(() => {
            if (this.onChangeText == '') {
                prompt.showToast({ message: '请输入需要编码的值', duration: 200 });
                return;
            }
            else {
                testCbor(this.onChangeText);
            }
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
function testCbor(initial: string) {
    let encoded: ArrayBuffer = CBOR.encode(initial);
    let decoded: ArrayBuffer = CBOR.decode(encoded);
    if (initial.toString() == decoded.toString()) {
        console.log('解码值和原值相同');
        prompt.showToast({ message: '解码值和原值相同', duration: 200 });
    }
    else if (initial === decoded.toString()) {
        console.log('解码值和原值相同');
        prompt.showToast({ message: '解码值和原值相同', duration: 200 });
    }
    else {
        console.log('解码值和原值不同');
        prompt.showToast({ message: '解码值和原值不同', duration: 200 });
    }
}
loadDocument(new Index("1", undefined, {}));
