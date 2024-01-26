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

import inputMethod from '@ohos.inputMethod';
import promptAction from '@ohos.promptAction';
import { CustomInputText } from '../components/CustomInputText';
import { inputAttribute } from '../utils/InputAttributeInit';
import { logger } from '../utils/Logger';
import { BusinessError } from '@ohos.base';

const TOAST_BOTTOM_SHOW: number = 700;
const TOAST_BOTTOM_HIDE: number = 100;

@Extend(Button) function buttonStyle() {
  .type(ButtonType.Capsule)
  .backgroundColor($r('app.color.button_color'))
  .fontColor(Color.White)
  .fontSize(16)
  .height(40)
  .fontWeight(500)
  .width('100%')
}

@Extend(Select) function selectStyle() {
  .fontColor($r('app.color.text_color'))
  .font({ size: 16, weight: 500 })
}

@Extend(Text) function textStyle() {
  .fontColor($r('app.color.text_color'))
  .fontSize(16)
  .fontWeight(500)
}

@Extend(TextInput) function inputStyle() {
  .type(InputType.Number)
  .height(40)
  .placeholderFont({ size: 14 })
  .margin({ top: 8, bottom: 8 })
  .maxLength(4)
  .layoutWeight(1)
}

@Styles function cardStyle() {
  .padding(12)
  .width('100%')
  .backgroundColor(Color.White)
  .borderRadius(23)
}

@Entry
@Component
struct Index {
  private inputTypeArray: Array<SelectOption> = [];
  private enterKeyArray: Array<SelectOption> = []
  private inputController: inputMethod.InputMethodController = inputMethod.getController();
  private cursorInfo: inputMethod.CursorInfo = { top: 0, left: 0, width: 0, height: 0 };
  @Provide selectStart: number = 0;
  @Provide selectEnd: number = 0;
  @Provide isAttached: boolean = false;
  @Provide isOn: boolean = false;
  @Provide isShow: boolean = false;
  @Provide isChangeSelection: boolean = false;
  @Provide inputTypeIndex: number = 0;
  @Provide enterKeyIndex: number = 0;

  build() {
    Scroll() {
      Column({ space: 12 }) {
        CustomInputText({ inputController: this.inputController })
        this.OperateView()
        this.UpdateView()
        this.AttributeView()
      }
      .width('100%')
    }
    .padding(12)
    .height('100%')
    .width('100%')
    .align(Alignment.Top)
    .backgroundColor($r('app.color.background'))
  }

  @Builder
  OperateView() {
    GridRow({
      columns: { sm: 2, md: 3, lg: 3 }, gutter: 12 }) {
      GridCol({ span: 1 }) {
        Button(this.isAttached ? $r('app.string.detach') : $r('app.string.attach'))
          .buttonStyle()
          .id('btnAttach')
          .onClick(() => {
            this.isAttached = !this.isAttached;
          })
      }

      GridCol({ span: 1 }) {
        Button(this.isShow ? $r('app.string.hide') : $r('app.string.show'))
          .buttonStyle()
          .id('btnShow')
          .onClick(() => {
            if (!this.isAttached) {
              if(this.isShow){
                promptAction.showToast({ message: $r('app.string.noattach_tips'), bottom: TOAST_BOTTOM_SHOW });
              }else {
                promptAction.showToast({ message: $r('app.string.noattach_tips'), bottom: TOAST_BOTTOM_HIDE });
              }
              return;
            }
            this.isShow = !this.isShow;
          })
      }

      GridCol({ span: { sm: 2, md: 1, lg: 1 } }) {
        Button(this.isOn ? $r('app.string.off') : $r('app.string.on'))
          .buttonStyle()
          .id('btnOn')
          .onClick(() => {
            if (!this.isAttached) {
              if(this.isShow){
                promptAction.showToast({ message: $r('app.string.noattach_tips'), bottom: TOAST_BOTTOM_SHOW });
              }else {
                promptAction.showToast({ message: $r('app.string.noattach_tips'), bottom: TOAST_BOTTOM_HIDE });
              }
              return;
            }
            this.isOn = !this.isOn;
          })
      }
    }
    .cardStyle()
  }

  @Builder
  UpdateView() {
    Column({ space: 12 }) {
      Row({ space: 8 }) {
        TextInput({ placeholder: 'left' })
          .inputStyle()
          .id('cursorLeft')
          .enableKeyboardOnFocus(false)
          .onChange((value: string) => {
            this.cursorInfo.left = Number(value).valueOf();
          })
        TextInput({ placeholder: 'top' })
          .inputStyle()
          .id('cursorTop')
          .enableKeyboardOnFocus(false)
          .onChange((value: string) => {
            this.cursorInfo.top = Number(value).valueOf();
          })
        TextInput({ placeholder: 'width' })
          .inputStyle()
          .id('cursorWidth')
          .enableKeyboardOnFocus(false)
          .onChange((value: string) => {
            this.cursorInfo.width = Number(value).valueOf();
          })

        TextInput({ placeholder: 'height' })
          .inputStyle()
          .id('cursorHeight')
          .enableKeyboardOnFocus(false)
          .onChange((value: string) => {
            this.cursorInfo.height = Number(value).valueOf();
          })
      }
      .width('100%')

      Button($r('app.string.update_cursor'))
        .buttonStyle()
        .id('btnUpdateCursor')
        .onClick(() => {
          this.inputController.updateCursor(this.cursorInfo, (err:BusinessError) =>{
            if(err){
              logger.info(`Index ${err}`)
              return;
            }else{
              if(this.isShow){
                promptAction.showToast({ message: $r('app.string.update_cursor_tips'), bottom: TOAST_BOTTOM_SHOW });
              }else {
                promptAction.showToast({ message: $r('app.string.update_cursor_tips'), bottom: TOAST_BOTTOM_HIDE });
              }
            }
          });
        })
      Row({ space: 8 }) {
        TextInput({ placeholder: 'start' })
          .inputStyle()
          .id('selectStart')
          .enableKeyboardOnFocus(false)
          .onChange((value: string) => {
            this.selectStart = Number(value).valueOf();
          })
        TextInput({ placeholder: 'end' })
          .inputStyle()
          .id('selectEnd')
          .enableKeyboardOnFocus(false)
          .onChange((value: string) => {
            this.selectEnd = Number(value).valueOf();
          })
      }
      .width('100%')

      Button($r('app.string.change_selection'))
        .buttonStyle()
        .id('btnChangeSelection')
        .onClick(() => {
          this.isChangeSelection = true;
        })
    }
    .cardStyle()
  }

  @Builder
  AttributeView() {
    Column({ space: 12 }) {
      Row() {
        Row() {
          Text($r('app.string.text_input_type'))
            .textStyle()
          Select(this.inputTypeArray)
            .value(inputAttribute.getInputTypeValue(this.inputTypeIndex))
            .selectStyle()
            .id('inputTypeSelect')
            .onSelect((index: number) => {
              this.inputTypeIndex = index;
              focusControl.requestFocus('inputTypeSelect')
            })
        }
        .layoutWeight(1)
        .justifyContent(FlexAlign.Center)

        Row() {
          Text($r('app.string.enter_key_type'))
            .textStyle()
          Select(this.enterKeyArray)
            .value(inputAttribute.getEnterTypeValue(this.enterKeyIndex))
            .selectStyle()
            .id('enterKeySelect')
            .onSelect((index: number) => {
              this.enterKeyIndex = index;
              focusControl.requestFocus('enterKeySelect')
            })
        }
        .layoutWeight(1)
        .justifyContent(FlexAlign.Center)
      }

      Button($r('app.string.update_attribute'))
        .buttonStyle()
        .id('btnUpdateAttribute')
        .onClick(() => {
          this.inputController.updateAttribute({
            textInputType: inputAttribute.getInputType(this.inputTypeIndex),
            enterKeyType: inputAttribute.getEnterType(this.enterKeyIndex)
          })
          if(this.isShow){
            promptAction.showToast({ message: $r('app.string.update_attribute'), bottom: TOAST_BOTTOM_SHOW });
          }else {
            promptAction.showToast({ message: $r('app.string.update_attribute'), bottom: TOAST_BOTTOM_HIDE });
          }
        })
    }
    .cardStyle()
  }

  aboutToDisappear() {
    logger.info('Index', 'aboutToDisappear')
    this.inputController.stopInputSession();
  }

  aboutToAppear() {
    logger.info('Index', 'aboutToAppear')
    inputAttribute.getInputTypeSource().forEach((item: Resource) => {
      this.inputTypeArray.push({ value: item });
    })
    inputAttribute.getEnterTypeSource().forEach((item: Resource) => {
      this.enterKeyArray.push({ value: item });
    })
  }
}