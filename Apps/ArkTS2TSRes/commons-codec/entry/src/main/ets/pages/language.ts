interface Language_Params {
    mCaverPhoneInput?: string;
    mCaverPhoneResult?: string;
    mSoundexInput?: string;
    mSoundexResult?: string;
    mMetaphoneInput?: string;
    mMetaphoneResult?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "language_" + ++__generate__Id;
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
import jsCaverPhone from 'caverphone';
import { soundex } from 'soundex-code';
import { metaphone } from 'metaphone';
function __Divider__dividerFancy(): void {
    Divider.strokeWidth(1);
    Divider.color(Color.Blue);
    Divider.margin(5);
    Divider.lineCap(LineCapStyle.Butt);
}
function __Text__textFancy(fontSize: number, textColor: Color, isBold: Boolean): void {
    Text.fontSize(fontSize);
    Text.fontColor(textColor);
    Text.fontWeight(isBold ? FontWeight.Bold : FontWeight.Normal);
}
function __Button__buttonFancy(): void {
    Button.type(ButtonType.Capsule);
    Button.width(90);
    Button.height(40);
    Button.align(Alignment.Center);
}
class Language extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__mCaverPhoneInput = new ObservedPropertySimple('word', this, "mCaverPhoneInput");
        this.__mCaverPhoneResult = new ObservedPropertySimple(''
        //=====================================
        , this, "mCaverPhoneResult");
        this.__mSoundexInput = new ObservedPropertySimple('phonetics', this, "mSoundexInput");
        this.__mSoundexResult = new ObservedPropertySimple(''
        //=====================================
        , this, "mSoundexResult");
        this.__mMetaphoneInput = new ObservedPropertySimple('michael', this, "mMetaphoneInput");
        this.__mMetaphoneResult = new ObservedPropertySimple('', this, "mMetaphoneResult");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Language_Params) {
        if (params.mCaverPhoneInput !== undefined) {
            this.mCaverPhoneInput = params.mCaverPhoneInput;
        }
        if (params.mCaverPhoneResult !== undefined) {
            this.mCaverPhoneResult = params.mCaverPhoneResult;
        }
        if (params.mSoundexInput !== undefined) {
            this.mSoundexInput = params.mSoundexInput;
        }
        if (params.mSoundexResult !== undefined) {
            this.mSoundexResult = params.mSoundexResult;
        }
        if (params.mMetaphoneInput !== undefined) {
            this.mMetaphoneInput = params.mMetaphoneInput;
        }
        if (params.mMetaphoneResult !== undefined) {
            this.mMetaphoneResult = params.mMetaphoneResult;
        }
    }
    aboutToBeDeleted() {
        this.__mCaverPhoneInput.aboutToBeDeleted();
        this.__mCaverPhoneResult.aboutToBeDeleted();
        this.__mSoundexInput.aboutToBeDeleted();
        this.__mSoundexResult.aboutToBeDeleted();
        this.__mMetaphoneInput.aboutToBeDeleted();
        this.__mMetaphoneResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __mCaverPhoneInput: ObservedPropertySimple<string>;
    get mCaverPhoneInput() {
        return this.__mCaverPhoneInput.get();
    }
    set mCaverPhoneInput(newValue: string) {
        this.__mCaverPhoneInput.set(newValue);
    }
    private __mCaverPhoneResult: ObservedPropertySimple<string>;
    get mCaverPhoneResult() {
        return this.__mCaverPhoneResult.get();
    }
    set mCaverPhoneResult(newValue: string) {
        this.__mCaverPhoneResult.set(newValue);
    }
    //=====================================
    private __mSoundexInput: ObservedPropertySimple<string>;
    get mSoundexInput() {
        return this.__mSoundexInput.get();
    }
    set mSoundexInput(newValue: string) {
        this.__mSoundexInput.set(newValue);
    }
    private __mSoundexResult: ObservedPropertySimple<string>;
    get mSoundexResult() {
        return this.__mSoundexResult.get();
    }
    set mSoundexResult(newValue: string) {
        this.__mSoundexResult.set(newValue);
    }
    //=====================================
    private __mMetaphoneInput: ObservedPropertySimple<string>;
    get mMetaphoneInput() {
        return this.__mMetaphoneInput.get();
    }
    set mMetaphoneInput(newValue: string) {
        this.__mMetaphoneInput.set(newValue);
    }
    private __mMetaphoneResult: ObservedPropertySimple<string>;
    get mMetaphoneResult() {
        return this.__mMetaphoneResult.get();
    }
    set mMetaphoneResult(newValue: string) {
        this.__mMetaphoneResult.set(newValue);
    }
    render() {
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.margin(5);
        Text.create('CaverPhone编码内容：word；Log打印结果：WT11111111 \n 只支持字母');
        __Text__textFancy(12, Color.Black, true);
        Text.pop();
        Flex.create({ alignItems: ItemAlign.Center });
        TextInput.create({ placeholder: '', text: this.mCaverPhoneInput });
        TextInput.onChange((value: string) => {
            this.mCaverPhoneInput = value;
        });
        TextInput.width(220);
        TextInput.margin(5);
        Button.createWithChild();
        __Button__buttonFancy();
        Button.onClick(() => {
            // https://github.com/tcort/caverphone
            this.mCaverPhoneResult = jsCaverPhone(this.mCaverPhoneInput);
            console.log("CaverPhone编码 = " + "【" + this.mCaverPhoneResult + "】");
        });
        Text.create('CaverPhone');
        __Text__textFancy(13, Color.White, false);
        Text.pop();
        Button.pop();
        Flex.pop();
        Text.create(this.mCaverPhoneResult);
        __Text__textFancy(12, Color.Black, false);
        Text.pop();
        //======================================================================================
        Divider.create();
        __Divider__dividerFancy();
        //===================================================================================
        Text.create('Soundex编码内容：phonetics；Log打印结果：P532 \n 只支持字母 ');
        __Text__textFancy(12, Color.Black, true);
        //===================================================================================
        Text.pop();
        Flex.create({ alignItems: ItemAlign.Center });
        TextInput.create({ placeholder: '', text: this.mSoundexInput });
        TextInput.onChange((value: string) => {
            this.mSoundexInput = value;
        });
        TextInput.width(220);
        TextInput.margin(5);
        Button.createWithChild();
        __Button__buttonFancy();
        Button.onClick(() => {
            //Soundex 算法 https://github.com/LouisT/node-soundex
            // @ts-ignore
            this.mSoundexResult = soundex(this.mSoundexInput);
            console.log("Soundex编码 = " + "【" + this.mSoundexResult + "】");
        });
        Text.create('Soundex');
        __Text__textFancy(13, Color.White, false);
        Text.pop();
        Button.pop();
        Flex.pop();
        Text.create(this.mSoundexResult);
        __Text__textFancy(12, Color.Black, false);
        Text.pop();
        //======================================================================================
        Divider.create();
        __Divider__dividerFancy();
        //===================================================================================
        Text.create('Metaphone 编码内容：michael；Log打印结果：MXL \n 只支持字母');
        __Text__textFancy(12, Color.Black, true);
        //===================================================================================
        Text.pop();
        Flex.create({ alignItems: ItemAlign.Center });
        TextInput.create({ placeholder: '', text: this.mMetaphoneInput });
        TextInput.onChange((value: string) => {
            this.mMetaphoneInput = value;
        });
        TextInput.width(220);
        TextInput.margin(5);
        Button.createWithChild();
        __Button__buttonFancy();
        Button.onClick(() => {
            //          this.mMetaphoneResult = jsMetaphone.metaphone(this.mMetaphoneInput)
            this.mMetaphoneResult = metaphone(this.mMetaphoneInput);
            console.log("Metaphone编码 = " + "【" + this.mMetaphoneResult + "】");
        });
        Text.create('Metaphone');
        __Text__textFancy(13, Color.White, false);
        Text.pop();
        Button.pop();
        Flex.pop();
        Text.create(this.mMetaphoneResult);
        __Text__textFancy(12, Color.Black, false);
        Text.pop();
        Column.pop();
    }
}
loadDocument(new Language("1", undefined, {}));
