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
    v8?: string;
    v8t?: string;
    v9?: string;
    v9t?: string;
    va?: string;
    vat?: string;
    vbt?: string;
    vct?: string;
    vb?: string;
    vd?: string;
    ve?: string;
    vf?: string;
    vft?: string;
    vg?: string;
    vgt?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import { pinyin, customPinyin, convert, match } from 'pinyin-pro';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__v1 = new ObservedPropertySimple('娜娜', this, "v1");
        this.__v1t = new ObservedPropertySimple('娜娜', this, "v1t");
        this.__v2 = new ObservedPropertySimple('娜娜', this, "v2");
        this.__v2t = new ObservedPropertySimple('娜娜', this, "v2t");
        this.__v3 = new ObservedPropertySimple('冲着看着着火长大长短', this, "v3");
        this.__v3t = new ObservedPropertySimple('冲着看着着火长大长短', this, "v3t");
        this.__v4 = new ObservedPropertySimple('赵钱孙李额', this, "v4");
        this.__v4t = new ObservedPropertySimple('赵钱孙李额', this, "v4t");
        this.__v5 = new ObservedPropertySimple('赵钱孙李额', this, "v5");
        this.__v5t = new ObservedPropertySimple('赵钱孙李额', this, "v5t");
        this.__v6 = new ObservedPropertySimple('我叫曾小贤', this, "v6");
        this.__v6t = new ObservedPropertySimple('我叫曾小贤', this, "v6t");
        this.__v7 = new ObservedPropertySimple('我叫曾小贤', this, "v7");
        this.__v7t = new ObservedPropertySimple('我叫曾小贤', this, "v7t");
        this.__v8 = new ObservedPropertySimple('pin1 yin1', this, "v8");
        this.__v8t = new ObservedPropertySimple('pin1 yin1', this, "v8t");
        this.__v9 = new ObservedPropertySimple('pīn yīn', this, "v9");
        this.__v9t = new ObservedPropertySimple('pīn yīn', this, "v9t");
        this.__va = new ObservedPropertySimple('pīn yīn', this, "va");
        this.__vat = new ObservedPropertySimple('pīn yīn', this, "vat");
        this.__vbt = new ObservedPropertySimple('汉语拼音', this, "vbt");
        this.__vct = new ObservedPropertySimple('hanpin', this, "vct");
        this.__vb = new ObservedPropertySimple('', this, "vb");
        this.__vd = new ObservedPropertySimple('', this, "vd");
        this.__ve = new ObservedPropertySimple('', this, "ve");
        this.__vf = new ObservedPropertySimple('他叫张会', this, "vf");
        this.__vft = new ObservedPropertySimple('他叫张会', this, "vft");
        this.__vg = new ObservedPropertySimple('他叫张会', this, "vg");
        this.__vgt = new ObservedPropertySimple('他叫张会', this, "vgt");
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
        if (params.v8 !== undefined) {
            this.v8 = params.v8;
        }
        if (params.v8t !== undefined) {
            this.v8t = params.v8t;
        }
        if (params.v9 !== undefined) {
            this.v9 = params.v9;
        }
        if (params.v9t !== undefined) {
            this.v9t = params.v9t;
        }
        if (params.va !== undefined) {
            this.va = params.va;
        }
        if (params.vat !== undefined) {
            this.vat = params.vat;
        }
        if (params.vbt !== undefined) {
            this.vbt = params.vbt;
        }
        if (params.vct !== undefined) {
            this.vct = params.vct;
        }
        if (params.vb !== undefined) {
            this.vb = params.vb;
        }
        if (params.vd !== undefined) {
            this.vd = params.vd;
        }
        if (params.ve !== undefined) {
            this.ve = params.ve;
        }
        if (params.vf !== undefined) {
            this.vf = params.vf;
        }
        if (params.vft !== undefined) {
            this.vft = params.vft;
        }
        if (params.vg !== undefined) {
            this.vg = params.vg;
        }
        if (params.vgt !== undefined) {
            this.vgt = params.vgt;
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
        this.__v8.aboutToBeDeleted();
        this.__v8t.aboutToBeDeleted();
        this.__v9.aboutToBeDeleted();
        this.__v9t.aboutToBeDeleted();
        this.__va.aboutToBeDeleted();
        this.__vat.aboutToBeDeleted();
        this.__vbt.aboutToBeDeleted();
        this.__vct.aboutToBeDeleted();
        this.__vb.aboutToBeDeleted();
        this.__vd.aboutToBeDeleted();
        this.__ve.aboutToBeDeleted();
        this.__vf.aboutToBeDeleted();
        this.__vft.aboutToBeDeleted();
        this.__vg.aboutToBeDeleted();
        this.__vgt.aboutToBeDeleted();
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
    private __v8: ObservedPropertySimple<string>;
    get v8() {
        return this.__v8.get();
    }
    set v8(newValue: string) {
        this.__v8.set(newValue);
    }
    private __v8t: ObservedPropertySimple<string>;
    get v8t() {
        return this.__v8t.get();
    }
    set v8t(newValue: string) {
        this.__v8t.set(newValue);
    }
    private __v9: ObservedPropertySimple<string>;
    get v9() {
        return this.__v9.get();
    }
    set v9(newValue: string) {
        this.__v9.set(newValue);
    }
    private __v9t: ObservedPropertySimple<string>;
    get v9t() {
        return this.__v9t.get();
    }
    set v9t(newValue: string) {
        this.__v9t.set(newValue);
    }
    private __va: ObservedPropertySimple<string>;
    get va() {
        return this.__va.get();
    }
    set va(newValue: string) {
        this.__va.set(newValue);
    }
    private __vat: ObservedPropertySimple<string>;
    get vat() {
        return this.__vat.get();
    }
    set vat(newValue: string) {
        this.__vat.set(newValue);
    }
    private __vbt: ObservedPropertySimple<string>;
    get vbt() {
        return this.__vbt.get();
    }
    set vbt(newValue: string) {
        this.__vbt.set(newValue);
    }
    private __vct: ObservedPropertySimple<string>;
    get vct() {
        return this.__vct.get();
    }
    set vct(newValue: string) {
        this.__vct.set(newValue);
    }
    private __vb: ObservedPropertySimple<string>;
    get vb() {
        return this.__vb.get();
    }
    set vb(newValue: string) {
        this.__vb.set(newValue);
    }
    private __vd: ObservedPropertySimple<string>;
    get vd() {
        return this.__vd.get();
    }
    set vd(newValue: string) {
        this.__vd.set(newValue);
    }
    private __ve: ObservedPropertySimple<string>;
    get ve() {
        return this.__ve.get();
    }
    set ve(newValue: string) {
        this.__ve.set(newValue);
    }
    private __vf: ObservedPropertySimple<string>;
    get vf() {
        return this.__vf.get();
    }
    set vf(newValue: string) {
        this.__vf.set(newValue);
    }
    private __vft: ObservedPropertySimple<string>;
    get vft() {
        return this.__vft.get();
    }
    set vft(newValue: string) {
        this.__vft.set(newValue);
    }
    private __vg: ObservedPropertySimple<string>;
    get vg() {
        return this.__vg.get();
    }
    set vg(newValue: string) {
        this.__vg.set(newValue);
    }
    private __vgt: ObservedPropertySimple<string>;
    get vgt() {
        return this.__vgt.get();
    }
    set vgt(newValue: string) {
        this.__vgt.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width('100%');
        Flex.height('100%');
        Row.create();
        TextInput.create({ placeholder: '获取带音调拼音', text: this.v1t });
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
        TextInput.create({ placeholder: '获取不带声调的拼音', text: this.v2t });
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
        TextInput.create({ placeholder: '获取声调转换为数字后缀的拼音', text: this.v3t });
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
        TextInput.create({ placeholder: '首字母风格一', text: this.v4t });
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
        TextInput.create({ placeholder: '首字母风格二', text: this.v5t });
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
        TextInput.create({ placeholder: '不开启姓氏模式', text: this.v6t });
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
        TextInput.create({ placeholder: '开启姓氏模式', text: this.v7t });
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
        Row.create();
        TextInput.create({ placeholder: '数组转符号', text: this.v8t });
        TextInput.onChange((value: string) => {
            this.v8t = value;
        });
        TextInput.width(150);
        TextInput.margin(10);
        Text.create(this.v8);
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Normal);
        Text.pop();
        Row.pop();
        Row.create();
        TextInput.create({ placeholder: '符号转数字', text: this.v9t });
        TextInput.onChange((value: string) => {
            this.v9t = value;
        });
        TextInput.width(150);
        TextInput.margin(10);
        Text.create(this.v9);
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Normal);
        Text.pop();
        Row.pop();
        Row.create();
        TextInput.create({ placeholder: '消除符号', text: this.vat });
        TextInput.onChange((value: string) => {
            this.vat = value;
        });
        TextInput.width(150);
        TextInput.margin(10);
        Text.create(this.va);
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Normal);
        Text.pop();
        Row.pop();
        Row.create();
        TextInput.create({ placeholder: '文字', text: this.vbt });
        TextInput.onChange((value: string) => {
            this.vbt = value;
        });
        TextInput.width(150);
        TextInput.margin(10);
        TextInput.create({ placeholder: '拼音', text: this.vct });
        TextInput.onChange((value: string) => {
            this.vct = value;
        });
        TextInput.width(150);
        TextInput.margin(10);
        Row.pop();
        Row.create();
        Text.create('普通匹配:' + this.vb);
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Normal);
        Text.margin(2);
        Text.pop();
        Text.create('连续匹配:' + this.vd);
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Normal);
        Text.margin(2);
        Text.pop();
        Text.create('空格参与匹配:' + this.ve);
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Normal);
        Text.margin(2);
        Text.pop();
        Row.pop();
        Row.create();
        TextInput.create({ placeholder: '不使用自定义拼音', text: this.vft });
        TextInput.onChange((value: string) => {
            this.vft = value;
        });
        TextInput.width(150);
        TextInput.margin(10);
        Text.create(this.vf);
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Normal);
        Text.pop();
        Row.pop();
        Row.create();
        TextInput.create({ placeholder: '使用自定义拼音', text: this.vgt });
        TextInput.onChange((value: string) => {
            this.vgt = value;
        });
        TextInput.width(150);
        TextInput.margin(10);
        Text.create(this.vg);
        Text.fontSize(15);
        Text.fontWeight(FontWeight.Normal);
        Text.pop();
        Row.pop();
        Button.createWithLabel('conversion', { type: ButtonType.Capsule, stateEffect: true });
        Button.backgroundColor(0x317aff);
        Button.width(190);
        Button.onClick(() => {
            // 通过 options.type 参数设置，可以获得数组和字符串不同的返回格式，也可以通过 options.toneType 参数控制音调在拼音中的显示格式
            if (!!this.v1t) {
                this.v1 = pinyin(this.v1t); // 获取带音调拼音
            }
            if (!!this.v2t) {
                this.v2 = pinyin(this.v2t, { toneType: 'none' }); // 获取不带声调的拼音
            }
            if (!!this.v3t) {
                this.v3 = pinyin(this.v3t, { toneType: 'num' }); // 获取声调转换为数字后缀的拼音
            }
            // 设置 options.pattern 为 first 时，返回的结果将为拼音的首字母。
            if (!!this.v4t) {
                this.v4 = pinyin(this.v4t, { pattern: 'first' }); // 'z q s l é'
            }
            if (!!this.v5t) {
                this.v5 = pinyin(this.v5t, { pattern: 'first', toneType: 'none' }); // 'z q s l e'
            }
            // 设置 options.mode 为 surname 可以开启姓氏模式，匹配到百家姓中的姓氏相关的字符将优先输出姓氏拼音。
            // 不开启姓氏模式
            if (!!this.v6t) {
                this.v6 = pinyin(this.v6t); // 'wǒ jiào céng xiǎo xián'
            }
            // 开启姓氏模式
            if (!!this.v7t) {
                this.v7 = pinyin(this.v7t, { mode: 'surname' }); // 'wǒ jiào zēng xiǎo xián'
            }
            // 格式转化支持 numToSymbol、symbolToNum、toneNone 等转换形式:
            // 数组转符号(numToSymbol)
            if (!!this.v8t) {
                this.v8 = convert(this.v8t); // 'pīn yīn'
            }
            // 符号转数字(symbolToNum)
            if (!!this.v9t) {
                this.v9 = convert(this.v9t, { format: 'symbolToNum' }); // 'pin1 yin1'
            }
            // 消除符号(toneNone)
            if (!!this.vat) {
                this.va = convert(this.vat, { format: 'toneNone' }); // 'pin yin'
            }
            // match 函数，可以进行文字和拼音匹配，并返回匹配的文字在字符串中的下标
            // 若拼音和文本匹配，返回匹配的文本下标
            if (!!this.vbt) {
                this.vb = match(this.vbt, this.vct); // [0, 2]
            }
            // 使用 continuous 属性指定匹配的汉字下标是否为连续的才算匹配成功(默认值为 false，即不需要为连续的匹配)：
            if (!!this.vbt) {
                this.vd = match(this.vbt, this.vct, { continuous: true }); // null
            }
            // 使用 space 属性控制匹配时空格是否不参与匹配(默认不参与匹配)
            if (!!this.vbt) {
                this.ve = match(this.vbt, this.vct, { space: 'preserve' }); // null
            }
            // customPinyin方法支持用户自定义设置词句拼音，当中文中匹配用户自己定义的词句拼音时，优先使用用户自定义的拼音。
            // 不使用自定义拼音
            if (!!this.vft) {
                this.vf = pinyin(this.vft); // 'tā jiào zhāng huì'
            }
            // 使用自定义拼音
            if (!!this.vgt) {
                customPinyin({
                    '张会': 'zhāng kuài'
                });
                this.vg = pinyin(this.vgt); // 'tā jiào zhāng kuài'
            }
        });
        Button.margin(20);
        Button.pop();
        Flex.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
