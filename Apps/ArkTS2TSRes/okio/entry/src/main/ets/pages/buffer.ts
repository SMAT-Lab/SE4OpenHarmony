interface Buffer_Params {
    areaValue?: string;
    rUtf8Value?: string;
    rIntValue?: string;
    rStringValue?: string;
    rShortValue?: string;
    rIntLeValue?: string;
    rShortLeValue?: string;
    rByteValue?: string;
    rUtf8CodePointValue?: string;
    rUtf8ByteCountValue?: string;
    scroller?: Scroller;
    controller?: TextAreaController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "buffer_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Okio } from '@ohos/okio';
import promptAction from '@ohos.promptAction';
class Buffer extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__areaValue = new ObservedPropertySimple('', this, "areaValue");
        this.__rUtf8Value = new ObservedPropertySimple('', this, "rUtf8Value");
        this.__rIntValue = new ObservedPropertySimple('', this, "rIntValue");
        this.__rStringValue = new ObservedPropertySimple('', this, "rStringValue");
        this.__rShortValue = new ObservedPropertySimple('', this, "rShortValue");
        this.__rIntLeValue = new ObservedPropertySimple('', this, "rIntLeValue");
        this.__rShortLeValue = new ObservedPropertySimple('', this, "rShortLeValue");
        this.__rByteValue = new ObservedPropertySimple('', this, "rByteValue");
        this.__rUtf8CodePointValue = new ObservedPropertySimple('', this, "rUtf8CodePointValue");
        this.__rUtf8ByteCountValue = new ObservedPropertySimple('', this, "rUtf8ByteCountValue");
        this.scroller = new Scroller();
        this.controller = new TextAreaController();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Buffer_Params) {
        if (params.areaValue !== undefined) {
            this.areaValue = params.areaValue;
        }
        if (params.rUtf8Value !== undefined) {
            this.rUtf8Value = params.rUtf8Value;
        }
        if (params.rIntValue !== undefined) {
            this.rIntValue = params.rIntValue;
        }
        if (params.rStringValue !== undefined) {
            this.rStringValue = params.rStringValue;
        }
        if (params.rShortValue !== undefined) {
            this.rShortValue = params.rShortValue;
        }
        if (params.rIntLeValue !== undefined) {
            this.rIntLeValue = params.rIntLeValue;
        }
        if (params.rShortLeValue !== undefined) {
            this.rShortLeValue = params.rShortLeValue;
        }
        if (params.rByteValue !== undefined) {
            this.rByteValue = params.rByteValue;
        }
        if (params.rUtf8CodePointValue !== undefined) {
            this.rUtf8CodePointValue = params.rUtf8CodePointValue;
        }
        if (params.rUtf8ByteCountValue !== undefined) {
            this.rUtf8ByteCountValue = params.rUtf8ByteCountValue;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__areaValue.aboutToBeDeleted();
        this.__rUtf8Value.aboutToBeDeleted();
        this.__rIntValue.aboutToBeDeleted();
        this.__rStringValue.aboutToBeDeleted();
        this.__rShortValue.aboutToBeDeleted();
        this.__rIntLeValue.aboutToBeDeleted();
        this.__rShortLeValue.aboutToBeDeleted();
        this.__rByteValue.aboutToBeDeleted();
        this.__rUtf8CodePointValue.aboutToBeDeleted();
        this.__rUtf8ByteCountValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __areaValue: ObservedPropertySimple<string>;
    get areaValue() {
        return this.__areaValue.get();
    }
    set areaValue(newValue: string) {
        this.__areaValue.set(newValue);
    }
    private __rUtf8Value: ObservedPropertySimple<string>;
    get rUtf8Value() {
        return this.__rUtf8Value.get();
    }
    set rUtf8Value(newValue: string) {
        this.__rUtf8Value.set(newValue);
    }
    private __rIntValue: ObservedPropertySimple<string>;
    get rIntValue() {
        return this.__rIntValue.get();
    }
    set rIntValue(newValue: string) {
        this.__rIntValue.set(newValue);
    }
    private __rStringValue: ObservedPropertySimple<string>;
    get rStringValue() {
        return this.__rStringValue.get();
    }
    set rStringValue(newValue: string) {
        this.__rStringValue.set(newValue);
    }
    private __rShortValue: ObservedPropertySimple<string>;
    get rShortValue() {
        return this.__rShortValue.get();
    }
    set rShortValue(newValue: string) {
        this.__rShortValue.set(newValue);
    }
    private __rIntLeValue: ObservedPropertySimple<string>;
    get rIntLeValue() {
        return this.__rIntLeValue.get();
    }
    set rIntLeValue(newValue: string) {
        this.__rIntLeValue.set(newValue);
    }
    private __rShortLeValue: ObservedPropertySimple<string>;
    get rShortLeValue() {
        return this.__rShortLeValue.get();
    }
    set rShortLeValue(newValue: string) {
        this.__rShortLeValue.set(newValue);
    }
    private __rByteValue: ObservedPropertySimple<string>;
    get rByteValue() {
        return this.__rByteValue.get();
    }
    set rByteValue(newValue: string) {
        this.__rByteValue.set(newValue);
    }
    private __rUtf8CodePointValue: ObservedPropertySimple<string>;
    get rUtf8CodePointValue() {
        return this.__rUtf8CodePointValue.get();
    }
    set rUtf8CodePointValue(newValue: string) {
        this.__rUtf8CodePointValue.set(newValue);
    }
    private __rUtf8ByteCountValue: ObservedPropertySimple<string>;
    get rUtf8ByteCountValue() {
        return this.__rUtf8ByteCountValue.get();
    }
    set rUtf8ByteCountValue(newValue: string) {
        this.__rUtf8ByteCountValue.set(newValue);
    }
    private scroller: Scroller;
    private controller: TextAreaController;
    render() {
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.width('100%');
        Stack.height('100%');
        Stack.backgroundColor(0xDCDCDC);
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.On);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.scrollBarWidth(30);
        Column.create();
        Column.width('100%');
        TextArea.create({ placeholder: '输入对应类型的数据，并点击按钮测试读取', controller: this.controller });
        TextArea.height(50);
        TextArea.width('100%');
        TextArea.margin(5);
        TextArea.onChange((value: string) => {
            this.areaValue = value;
            this.controller.caretPosition(value.length);
        });
        Text.create('测试readUTF8->' + this.rUtf8Value);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            if (this.areaValue != '' && typeof this.areaValue == 'string') {
                new Okio.Buffer().writeUtf8(this.areaValue);
                this.rUtf8Value = new Okio.Buffer().readUtf8();
            }
            else {
                promptAction.showToast({
                    message: 'No Null或者数据类型不对，需要类型string如：ate12fs',
                    bottom: '50%'
                });
            }
        });
        Text.pop();
        Text.create('测试readInt->' + this.rIntValue);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            new Okio.Buffer().writeInt(this.areaValue);
            this.rIntValue = new Okio.Buffer().readInt();
        });
        Text.pop();
        Text.create('测试readString->' + this.rStringValue);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            new Okio.Buffer().writeString(this.areaValue);
            this.rStringValue = new Okio.Buffer().readString();
        });
        Text.pop();
        Text.create('测试readShort->' + this.rShortValue);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            new Okio.Buffer().writeShort(this.areaValue);
            this.rShortValue = new Okio.Buffer().readShort();
        });
        Text.pop();
        Text.create('测试readIntLe->' + this.rIntLeValue);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            new Okio.Buffer().writeIntLe(this.areaValue);
            this.rIntLeValue = new Okio.Buffer().readIntLe();
        });
        Text.pop();
        Text.create('测试readShortLe->' + this.rShortLeValue);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            new Okio.Buffer().writeShortLe(this.areaValue);
            this.rShortLeValue = new Okio.Buffer().readShortLe();
        });
        Text.pop();
        Text.create('测试readByte->' + this.rByteValue);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            new Okio.Buffer().writeByte(this.areaValue);
            this.rByteValue = new Okio.Buffer().readByte();
        });
        Text.pop();
        Text.create('测试readUtf8ByteCodePoint->' + this.rUtf8CodePointValue);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            new Okio.Buffer().writeUtf8CodePoint(this.areaValue);
            this.rUtf8CodePointValue = new Okio.Buffer().readUtf8CodePoint(new Okio.Buffer().size);
        });
        Text.pop();
        Text.create('测试readUtf8ByteCount->' + this.rUtf8ByteCountValue);
        Text.width('90%');
        Text.height(50);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(13);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 10 });
        Text.onClick(() => {
            new Okio.Buffer().writeUtf8(this.areaValue);
            this.rUtf8ByteCountValue = new Okio.Buffer().readUtf8ByteCount(new Okio.Buffer().size);
        });
        Text.pop();
        Column.pop();
        Scroll.pop();
        Button.createWithLabel('全部重置显示', { type: ButtonType.Capsule, stateEffect: true });
        Button.backgroundColor(0x317aff);
        Button.margin({ top: 200, left: 5 });
        Button.width(120);
        Button.onClick(() => {
            this.rUtf8Value = '';
            this.rIntValue = '';
            this.rStringValue = '';
            this.rShortValue = '';
            this.rIntLeValue = '';
            this.rShortLeValue = '';
            this.rByteValue = '';
            this.rUtf8CodePointValue = '';
            this.rUtf8ByteCountValue = '';
        });
        Button.pop();
        Stack.pop();
    }
}
loadDocument(new Buffer("1", undefined, {}));
