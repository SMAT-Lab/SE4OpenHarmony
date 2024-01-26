/*
* Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
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


import TitleBar from '../component/TitleBar';
import ResourceUtil from '../util/ResourceUtil';
import I18n from '@ohos.i18n';
import common from '@ohos.app.ability.common';

const types = ['U_UNASSIGNED', 'U_GENERAL_OTHER_TYPES', 'U_UPPERCASE_LETTER',
  'U_LOWERCASE_LETTER', 'U_TITLECASE_LETTER', 'U_MODIFIER_LETTER',
  'U_OTHER_LETTER', 'U_NON_SPACING_MARK', 'U_ENCLOSING_MARK',
  'U_COMBINING_SPACING_MARK', 'U_DECIMAL_DIGIT_NUMBER', 'U_LETTER_NUMBER',
  'U_OTHER_NUMBER', 'U_SPACE_SEPARATOR', 'U_LINE_SEPARATOR',
  'U_PARAGRAPH_SEPARATOR', 'U_CONTROL_CHAR', 'U_FORMAT_CHAR',
  'U_PRIVATE_USE_CHAR', 'U_SURROGATE', 'U_DASH_PUNCTUATION',
  'U_START_PUNCTUATION', 'U_END_PUNCTUATION', 'U_CONNECTOR_PUNCTUATION',
  'U_OTHER_PUNCTUATION', 'U_MATH_SYMBOL', 'U_CURRENCY_SYMBOL',
  'U_MODIFIER_SYMBOL', 'U_OTHER_SYMBOL', 'U_INITIAL_PUNCTUATION',
  'U_FINAL_PUNCTUATION', 'U_CHAR_CATEGORY_COUNT'];

const LOCALE = I18n.System.getSystemLocale();
const TAG = 'TextProcessing';
const MAX = 60;

@Entry
@Component
struct TextProcessing {
  @State textTypeResult: string = '';
  @State textTypeValue: string = '';
  @State areaTextValue: string = '';
  @State areaTextResult: string[] = [];
  @State textTypes: Array<string> = [];
  private breakIterator = I18n.getLineInstance(LOCALE);
  private context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;

  async aboutToAppear() {
    this.textTypes = await ResourceUtil.getStringArray($r('app.strarray.text_type_arr').id, this.context);
  }

  build() {
    Column() {
      TitleBar({ hasBackPress: true, title: $r('app.string.text_processing') })
      Text($r('app.string.character_type_detection'))
        .padding({ top: 22, left: 24 })
        .width('100%')
      Column() {
        TextInput({ placeholder: $r('app.string.character_type_tip') })
          .id('short_text_input')
          .maxLength(1)
          .placeholderFont({ size: 16 })
          .backgroundColor(Color.Transparent)
          .fontColor(Color.Black)
          .fontSize(16)
          .width('100%')
          .height(50)
          .onChange((value) => {
            this.textTypeValue = value;
          })
        Divider()
          .strokeWidth(1)
          .opacity(0.05)
          .margin({ left: 12, right: 12 })
          .backgroundColor(Color.Black)
        Text(this.textTypeResult)
          .width('100%')
          .textAlign(TextAlign.Start)
          .padding({ top: 12, left: 12 })
          .fontColor(Color.Black)
          .opacity(0.9)
          .fontSize(16)
      }
      .backgroundColor(Color.White)
      .margin({ left: 12, right: 12, top: 8 })
      .border({ radius: 16 })
      .height(106)

      Button($r('app.string.show_character_type'))
        .id('show_character_type')
        .width(180)
        .height(36)
        .margin({ top: 12 })
        .onClick(() => {
          if (!this.textTypeValue) {
            this.textTypeResult = ''
            return;
          }
          let type = I18n.Unicode.getType(this.textTypeValue);
          this.textTypeResult = this.textTypes[types.indexOf(type)];
        })

      Text($r('app.string.text_break'))
        .padding({ top: 22, left: 24 })
        .width('100%')

      Column() {
        Stack({ alignContent: Alignment.BottomEnd }) {
          TextArea({ placeholder: $r('app.string.long_piece_of_text') })
            .id('long_text_input')
            .placeholderFont({ size: 16 })
            .backgroundColor(Color.Transparent)
            .inputFilter(this.areaTextValue.length < MAX ? '' : '^$')
            .fontColor(Color.Black)
            .fontSize(16)
            .width('100%')
            .height(124)
            .onChange((value) => {
              this.areaTextValue = value;
            })
          Text(`${this.areaTextValue.length}`)
            .fontSize(16)
            .opacity(0.4)
            .padding(10)
        }

        Divider()
          .strokeWidth(1)
          .opacity(0.05)
          .margin({ left: 12, right: 12 })
          .backgroundColor(Color.Black)
        Text() {
          ForEach(this.areaTextResult, (str: string, index) => {
            Span(str)
              .fontColor(Color.Black)
              .fontSize(16)
            if (index !== this.areaTextResult.length - 1) {
              Span('/')
                .fontColor(Color.Red)
                .fontSize(16)
            }
          })
        }
        .width('100%')
        .height(84)
        .textAlign(TextAlign.Start)
        .padding({ top: 12, left: 12 })
        .opacity(0.9)
      }
      .backgroundColor(Color.White)
      .margin({ left: 12, right: 12, top: 8 })
      .border({ radius: 16 })
      .height(232)

      Button($r('app.string.text_breakpoint'))
        .width(180)
        .height(36)
        .margin({ top: 12 })
        .onClick(() => {
          let tem: string[] = []
          this.breakIterator.setLineBreakText(this.areaTextValue);
          this.breakIterator.first();
          let pos = this.breakIterator.next();
          let flag = 0
          while (pos !== -1) {
            tem.push(this.areaTextValue.slice(flag, pos));
            flag = pos;
            pos = this.breakIterator.next();
          }
          this.areaTextResult = tem;
        })
    }
    .height('100%')
    .width('100%')
  }
}