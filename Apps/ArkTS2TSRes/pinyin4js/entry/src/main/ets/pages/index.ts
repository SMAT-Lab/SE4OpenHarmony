interface Index_Params {
    v1?: string;
    v1t?: string;
    v2?: string;
    v2t?: string;
    v3?: string;
    v3t?: string;
    v4?: string;
    v4t?: string;
    v5?: string;
    v5t?: string;
    v6?: string;
    v6t?: string;
    v7?: string;
    v7t?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
import { pinyin4js } from '@ohos/pinyin4js';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__v1 = new ObservedPropertySimple('校对', this, "v1");
        this.__v1t = new ObservedPropertySimple('校对', this, "v1t");
        this.__v2 = new ObservedPropertySimple('學校', this, "v2");
        this.__v2t = new ObservedPropertySimple('學校', this, "v2t");
        this.__v3 = new ObservedPropertySimple('悬着', this, "v3");
        this.__v3t = new ObservedPropertySimple('悬着冲着看着着火省长拼命挣扎扎破行情荷枪实弹调动调课削弱人参曾孙', this, "v3t");
        this.__v4 = new ObservedPropertySimple('厦门你好大厦厦门', this, "v4");
        this.__v4t = new ObservedPropertySimple('厦门你好大厦厦门', this, "v4t");
        this.__v5 = new ObservedPropertySimple('厦门你好大厦厦门', this, "v5");
        this.__v5t = new ObservedPropertySimple('厦门你好大厦厦门', this, "v5t");
        this.__v6 = new ObservedPropertySimple('歲月時光', this, "v6");
        this.__v6t = new ObservedPropertySimple('歲月時光', this, "v6t");
        this.__v7 = new ObservedPropertySimple('岁月时光', this, "v7");
        this.__v7t = new ObservedPropertySimple('岁月时光', this, "v7t");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.v1 !== undefined) {
            this.v1 = params.v1;
        }
        if (params.v1t !== undefined) {
            this.v1t = params.v1t;
        }
        if (params.v2 !== undefined) {
            this.v2 = params.v2;
        }
        if (params.v2t !== undefined) {
            this.v2t = params.v2t;
        }
        if (params.v3 !== undefined) {
            this.v3 = params.v3;
        }
        if (params.v3t !== undefined) {
            this.v3t = params.v3t;
        }
        if (params.v4 !== undefined) {
            this.v4 = params.v4;
        }
        if (params.v4t !== undefined) {
            this.v4t = params.v4t;
        }
        if (params.v5 !== undefined) {
            this.v5 = params.v5;
        }
        if (params.v5t !== undefined) {
            this.v5t = params.v5t;
        }
        if (params.v6 !== undefined) {
            this.v6 = params.v6;
        }
        if (params.v6t !== undefined) {
            this.v6t = params.v6t;
        }
        if (params.v7 !== undefined) {
            this.v7 = params.v7;
        }
        if (params.v7t !== undefined) {
            this.v7t = params.v7t;
        }
    }
    aboutToBeDeleted() {
        this.__v1.aboutToBeDeleted();
        this.__v1t.aboutToBeDeleted();
        this.__v2.aboutToBeDeleted();
        this.__v2t.aboutToBeDeleted();
        this.__v3.aboutToBeDeleted();
        this.__v3t.aboutToBeDeleted();
        this.__v4.aboutToBeDeleted();
        this.__v4t.aboutToBeDeleted();
        this.__v5.aboutToBeDeleted();
        this.__v5t.aboutToBeDeleted();
        this.__v6.aboutToBeDeleted();
        this.__v6t.aboutToBeDeleted();
        this.__v7.aboutToBeDeleted();
        this.__v7t.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __v1: ObservedPropertySimple<string>;
    get v1() {
        return this.__v1.get();
    }
    set v1(newValue: string) {
        this.__v1.set(newValue);
    }
    private __v1t: ObservedPropertySimple<string>;
    get v1t() {
        return this.__v1t.get();
    }
    set v1t(newValue: string) {
        this.__v1t.set(newValue);
    }
    private __v2: ObservedPropertySimple<string>;
    get v2() {
        return this.__v2.get();
    }
    set v2(newValue: string) {
        this.__v2.set(newValue);
    }
    private __v2t: ObservedPropertySimple<string>;
    get v2t() {
        return this.__v2t.get();
    }
    set v2t(newValue: string) {
        this.__v2t.set(newValue);
    }
    private __v3: ObservedPropertySimple<string>;
    get v3() {
        return this.__v3.get();
    }
    set v3(newValue: string) {
        this.__v3.set(newValue);
    }
    private __v3t: ObservedPropertySimple<string>;
    get v3t() {
        return this.__v3t.get();
    }
    set v3t(newValue: string) {
        this.__v3t.set(newValue);
    }
    private __v4: ObservedPropertySimple<string>;
    get v4() {
        return this.__v4.get();
    }
    set v4(newValue: string) {
        this.__v4.set(newValue);
    }
    private __v4t: ObservedPropertySimple<string>;
    get v4t() {
        return this.__v4t.get();
    }
    set v4t(newValue: string) {
        this.__v4t.set(newValue);
    }
    private __v5: ObservedPropertySimple<string>;
    get v5() {
        return this.__v5.get();
    }
    set v5(newValue: string) {
        this.__v5.set(newValue);
    }
    private __v5t: ObservedPropertySimple<string>;
    get v5t() {
        return this.__v5t.get();
    }
    set v5t(newValue: string) {
        this.__v5t.set(newValue);
    }
    private __v6: ObservedPropertySimple<string>;
    get v6() {
        return this.__v6.get();
    }
    set v6(newValue: string) {
        this.__v6.set(newValue);
    }
    private __v6t: ObservedPropertySimple<string>;
    get v6t() {
        return this.__v6t.get();
    }
    set v6t(newValue: string) {
        this.__v6t.set(newValue);
    }
    private __v7: ObservedPropertySimple<string>;
    get v7() {
        return this.__v7.get();
    }
    set v7(newValue: string) {
        this.__v7.set(newValue);
    }
    private __v7t: ObservedPropertySimple<string>;
    get v7t() {
        return this.__v7t.get();
    }
    set v7t(newValue: string) {
        this.__v7t.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Row.create();
        TextInput.create({ placeholder: '简体字带声调', text: this.v1t });
        TextInput.onChange((value: string) => {
            this.v1t = value;
        });
        TextInput.width(150);
        TextInput.margin(10);
        Text.create(this.v1);
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Normal);
        Text.pop();
        Row.pop();
        Row.create();
        TextInput.create({ placeholder: '繁体字带声调', text: this.v2t });
        TextInput.onChange((value: string) => {
            this.v2t = value;
        });
        TextInput.width(150);
        TextInput.margin(10);
        Text.create(this.v2);
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Normal);
        Text.pop();
        Row.pop();
        Column.create();
        TextInput.create({ placeholder: '不带声调', text: this.v3t });
        TextInput.onChange((value: string) => {
            this.v3t = value;
        });
        TextInput.alignSelf(ItemAlign.Center);
        TextInput.placeholderFont({ size: 15, weight: FontWeight.Medium });
        TextInput.margin({ left: 10, right: 10 });
        Text.create(this.v3);
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Normal);
        Text.textAlign(TextAlign.Start);
        Text.margin({ left: 10, right: 10 });
        Text.pop();
        Column.pop();
        Row.create();
        TextInput.create({ placeholder: '首字母风格方法一', text: this.v4t });
        TextInput.onChange((value: string) => {
            this.v4t = value;
        });
        TextInput.width(150);
        TextInput.margin(10);
        Text.create(this.v4);
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Normal);
        Text.pop();
        Row.pop();
        Row.create();
        TextInput.create({ placeholder: '首字母风格方法二', text: this.v5t });
        TextInput.onChange((value: string) => {
            this.v5t = value;
        });
        TextInput.width(150);
        TextInput.margin(10);
        Text.create(this.v5);
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Normal);
        Text.pop();
        Row.pop();
        Row.create();
        TextInput.create({ placeholder: '繁体转简体', text: this.v6t });
        TextInput.onChange((value: string) => {
            this.v6t = value;
        });
        TextInput.width(150);
        TextInput.margin(10);
        Text.create(this.v6);
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Normal);
        Text.pop();
        Row.pop();
        Row.create();
        TextInput.create({ placeholder: '简体转繁体', text: this.v7t });
        TextInput.onChange((value: string) => {
            this.v7t = value;
        });
        TextInput.width(150);
        TextInput.margin(10);
        Text.create(this.v7);
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Normal);
        Text.pop();
        Row.pop();
        Button.createWithLabel('conversion', { type: ButtonType.Capsule, stateEffect: true });
        Button.backgroundColor(0x317aff);
        Button.width(190);
        Button.onClick(() => {
            // output: xià#mén#nǐ#hǎo#dà#shà#xià#mén WITH_TONE_NUMBER--数字代表声调，WITHOUT_TONE--不带声调，WITH_TONE_MARK--带声调
            if (!!this.v1t) {
                this.v1 = pinyin4js.convertToPinyinString(this.v1t, '#', pinyin4js.WITH_TONE_MARK);
            }
            if (!!this.v2t) {
                this.v2 = pinyin4js.convertToPinyinString(this.v2t, '#', pinyin4js.WITH_TONE_MARK);
            }
            if (!!this.v3t) {
                this.v3 = pinyin4js.convertToPinyinString(this.v3t, '#', pinyin4js.WITHOUT_TONE);
            }
            // output: xmnhdsxm 首字母风格
            if (!!this.v4t) {
                this.v4 = pinyin4js.convertToPinyinString(this.v4t, '', pinyin4js.FIRST_LETTER);
            }
            if (!!this.v5t) {
                this.v5 = pinyin4js.getShortPinyin(this.v5t);
            }
            // 繁体转简体
            if (!!this.v6t) {
                this.v6 = pinyin4js.convertToSimplifiedChinese(this.v6t);
            }
            // 简体转繁体
            if (!!this.v7t) {
                this.v7 = pinyin4js.convertToTraditionalChinese(this.v7t);
            }
        });
        Button.margin(20);
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
