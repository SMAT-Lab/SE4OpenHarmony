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
import {pinyin,customPinyin,convert,match  } from 'pinyin-pro';
@Entry
@Component
struct Index {
  @State v1: string= '娜娜';
  @State v1t: string= '娜娜';
  @State v2: string= '娜娜';
  @State v2t: string= '娜娜';
  @State v3: string= '冲着看着着火长大长短';
  @State v3t: string= '冲着看着着火长大长短';
  @State v4: string= '赵钱孙李额';
  @State v4t: string= '赵钱孙李额';
  @State v5: string= '赵钱孙李额';
  @State v5t: string= '赵钱孙李额';
  @State v6: string= '我叫曾小贤';
  @State v6t: string= '我叫曾小贤';
  @State v7: string= '我叫曾小贤';
  @State v7t: string= '我叫曾小贤';
  @State v8: string= 'pin1 yin1';
  @State v8t: string= 'pin1 yin1';
  @State v9: string= 'pīn yīn';
  @State v9t: string= 'pīn yīn';
  @State va: string= 'pīn yīn';
  @State vat: string= 'pīn yīn';
  @State vbt: string= '汉语拼音';
  @State vct: string= 'hanpin';
  @State vb: string= '';
  @State vd: string= '';
  @State ve: string= '';
  @State vf: string= '他叫张会';
  @State vft: string= '他叫张会';
  @State vg: string= '他叫张会';
  @State vgt: string= '他叫张会';

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {

      Row() {
        TextInput({ placeholder: '获取带音调拼音', text: this.v1t })
          .onChange((value: string) => {
            this.v1t = value;
          })
          .width(150)
          .margin(10)

        Text(this.v1)
          .fontSize(15)
          .fontWeight(FontWeight.Normal)
      }

      Row() {
        TextInput({ placeholder: '获取不带声调的拼音', text: this.v2t })
          .onChange((value: string) => {
            this.v2t = value;
          })
          .width(150)
          .margin(10)

        Text(this.v2)
          .fontSize(15)
          .fontWeight(FontWeight.Normal)
      }

      Column() {
        TextInput({ placeholder: '获取声调转换为数字后缀的拼音', text: this.v3t })
          .onChange((value: string) => {
            this.v3t = value;
          })
          .alignSelf(ItemAlign.Center)
          .placeholderFont({ size: 15, weight: FontWeight.Medium })
          .margin({ left: 10, right: 10 })

        Text(this.v3)
          .fontSize(15)
          .fontWeight(FontWeight.Normal)
          .textAlign(TextAlign.Start)
          .margin({ left: 10, right: 10 })
      }

      Row() {
        TextInput({ placeholder: '首字母风格一', text: this.v4t })
          .onChange((value: string) => {
            this.v4t = value;
          })
          .width(150)
          .margin(10)

        Text(this.v4)
          .fontSize(15)
          .fontWeight(FontWeight.Normal)
      }

      Row() {
        TextInput({ placeholder: '首字母风格二', text: this.v5t })
          .onChange((value: string) => {
            this.v5t = value;
          })
          .width(150)
          .margin(10)

        Text(this.v5)
          .fontSize(15)
          .fontWeight(FontWeight.Normal)
      }

      Row() {
        TextInput({ placeholder: '不开启姓氏模式', text: this.v6t })
          .onChange((value: string) => {
            this.v6t = value;
          })
          .width(150)
          .margin(10)

        Text(this.v6)
          .fontSize(15)
          .fontWeight(FontWeight.Normal)
      }

      Row() {
        TextInput({ placeholder: '开启姓氏模式', text: this.v7t })
          .onChange((value: string) => {
            this.v7t = value;
          })
          .width(150)
          .margin(10)

        Text(this.v7)
          .fontSize(15)
          .fontWeight(FontWeight.Normal)

      }
      Row() {
        TextInput({ placeholder: '数组转符号', text: this.v8t })
          .onChange((value: string) => {
            this.v8t = value;
          })
          .width(150)
          .margin(10)

        Text(this.v8)
          .fontSize(15)
          .fontWeight(FontWeight.Normal)

      }

      Row() {
        TextInput({ placeholder: '符号转数字', text: this.v9t })
          .onChange((value: string) => {
            this.v9t = value;
          })
          .width(150)
          .margin(10)

        Text(this.v9)
          .fontSize(15)
          .fontWeight(FontWeight.Normal)

      }

      Row() {
        TextInput({ placeholder: '消除符号', text: this.vat })
          .onChange((value: string) => {
            this.vat = value;
          })
          .width(150)
          .margin(10)

        Text(this.va)
          .fontSize(15)
          .fontWeight(FontWeight.Normal)


      }

      Row() {
        TextInput({ placeholder: '文字', text: this.vbt })
          .onChange((value: string) => {
            this.vbt = value;
          })
          .width(150)
          .margin(10)
        TextInput({ placeholder: '拼音', text: this.vct })
          .onChange((value: string) => {
            this.vct = value;
          })
          .width(150)
          .margin(10)


      }
      Row(){
        Text('普通匹配:'+this.vb)
          .fontSize(15)
          .fontWeight(FontWeight.Normal)
          .margin(2)
        Text('连续匹配:'+this.vd)
          .fontSize(15)
          .fontWeight(FontWeight.Normal)
          .margin(2)
        Text('空格参与匹配:'+this.ve)
          .fontSize(15)
          .fontWeight(FontWeight.Normal)
          .margin(2)
      }
      Row() {
        TextInput({ placeholder: '不使用自定义拼音', text: this.vft })
          .onChange((value: string) => {
            this.vft = value;
          })
          .width(150)
          .margin(10)

        Text(this.vf)
          .fontSize(15)
          .fontWeight(FontWeight.Normal)
      }

      Row() {
        TextInput({ placeholder: '使用自定义拼音', text: this.vgt })
          .onChange((value: string) => {
            this.vgt = value;
          })
          .width(150)
          .margin(10)

        Text(this.vg)
          .fontSize(15)
          .fontWeight(FontWeight.Normal)
      }

      Button('conversion', { type: ButtonType.Capsule, stateEffect: true }).backgroundColor(0x317aff).width(190)
        .onClick(() => {

          // 通过 options.type 参数设置，可以获得数组和字符串不同的返回格式，也可以通过 options.toneType 参数控制音调在拼音中的显示格式
          if (!!this.v1t) {
            this.v1 = pinyin(this.v1t);     // 获取带音调拼音
          }
          if (!!this.v2t) {
            this.v2 = pinyin(this.v2t,  { toneType: 'none' }); // 获取不带声调的拼音
          }
          if (!!this.v3t) {
            this.v3 = pinyin(this.v3t,{ toneType: 'num' }); // 获取声调转换为数字后缀的拼音
          }

          // 设置 options.pattern 为 first 时，返回的结果将为拼音的首字母。
          if (!!this.v4t) {
            this.v4 = pinyin(this.v4t, { pattern: 'first' });// 'z q s l é'
          }
          if (!!this.v5t) {
            this.v5 = pinyin(this.v5t,{ pattern: 'first', toneType: 'none' });// 'z q s l e'
          }

          // 设置 options.mode 为 surname 可以开启姓氏模式，匹配到百家姓中的姓氏相关的字符将优先输出姓氏拼音。
          // 不开启姓氏模式
          if (!!this.v6t) {
            this.v6 = pinyin(this.v6t);// 'wǒ jiào céng xiǎo xián'
          }
          // 开启姓氏模式
          if (!!this.v7t) {
            this.v7 =  pinyin(this.v7t, { mode: 'surname' });// 'wǒ jiào zēng xiǎo xián'
          }

          // 格式转化支持 numToSymbol、symbolToNum、toneNone 等转换形式:
          // 数组转符号(numToSymbol)
          if (!!this.v8t) {
            this.v8 = convert(this.v8t);  // 'pīn yīn'
          }
          // 符号转数字(symbolToNum)
          if (!!this.v9t) {
            this.v9 = convert(this.v9t,  { format: 'symbolToNum' }); // 'pin1 yin1'
          }
          // 消除符号(toneNone)
          if (!!this.vat) {
            this.va = convert(this.vat, { format: 'toneNone' }); // 'pin yin'
          }

          // match 函数，可以进行文字和拼音匹配，并返回匹配的文字在字符串中的下标
          // 若拼音和文本匹配，返回匹配的文本下标
          if (!!this.vbt) {
            this.vb =  match(this.vbt, this.vct); // [0, 2]
          }
          // 使用 continuous 属性指定匹配的汉字下标是否为连续的才算匹配成功(默认值为 false，即不需要为连续的匹配)：
          if (!!this.vbt) {
            this.vd =  match(this.vbt, this.vct,{ continuous: true }); // null
          }
          // 使用 space 属性控制匹配时空格是否不参与匹配(默认不参与匹配)
          if (!!this.vbt) {
            this.ve =  match(this.vbt, this.vct, { space: 'preserve' }); // null
          }

          // customPinyin方法支持用户自定义设置词句拼音，当中文中匹配用户自己定义的词句拼音时，优先使用用户自定义的拼音。
          // 不使用自定义拼音
          if (!!this.vft) {
            this.vf = pinyin(this.vft);  // 'tā jiào zhāng huì'
          }
          // 使用自定义拼音
          if (!!this.vgt) {
            customPinyin({
              '张会': 'zhāng kuài'
            })
            this.vg = pinyin(this.vgt); // 'tā jiào zhāng kuài'
          }
        }).margin(20)
    }
    .width('100%')
    .height('100%')
  }
}