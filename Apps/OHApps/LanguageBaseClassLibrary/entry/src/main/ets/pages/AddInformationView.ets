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

import router from '@ohos.router';
import emitter from '@ohos.events.emitter';
import { Constant, Information } from '@ohos/capabilities';
import { getString } from '@ohos/common';

const MIN_AGE = 1;
const AGE_RANGE = 9;
const AGE_DEFAULT = 0;

const arr = Array(AGE_RANGE)
  .fill(0)
  .map<string>((_: number, i: number) => `${i + MIN_AGE}${getString($r('app.string.old'))}`);

@CustomDialog
struct AgePickDialog {
  private controller?: CustomDialogController;
  private sure: (age: number) => void = () => {};
  @State select: number = AGE_DEFAULT;

  build() {
    Column() {
      Text($r('app.string.age'))
        .margin({ left: 24, top: 14 })
        .width('100%')
        .fontColor($r('app.color.text_color_primary'))
        .fontSize(20)
        .textAlign(TextAlign.Start)

      Column() {
        TextPicker({ range: arr, selected: this.select })
          .onChange((value: string | string[], index: number | number[]) => {
            if (typeof index === 'number') {
              this.select = index;
            }
          })
      }
      .width('100%')
      .height(238)

      Row() {
        Text($r('app.string.cancel'))
          .height('100%')
          .width('50%')
          .textAlign(TextAlign.Center)
          .fontSize(16)
          .fontColor($r('app.color.text_color_accent'))
          .onClick(() => {
            this.controller?.close();
          })
        Divider()
          .vertical(true)
          .height('100%')
        Text($r('app.string.sure'))
          .id('add_sure')
          .height('100%')
          .width('50%')
          .textAlign(TextAlign.Center)
          .fontSize(16)
          .fontColor($r('app.color.text_color_accent'))
          .onClick(() => {
            this.sure(this.select + MIN_AGE)
            this.controller?.close();
          })
      }
      .height(40)
    }
    .height(328)
    .margin({ left: 12, right: 12, bottom: 16 })
    .borderRadius(24)
    .backgroundColor($r('app.color.bg_white'))
  }
}

@Entry
@Component
export struct AddInformationView {
  @State information: Information = new Information('', 0, '', true)
  private dialogController: CustomDialogController = new CustomDialogController({
    builder: AgePickDialog({ sure: (age: number) => {
      this.information.age = age;
    } }),
    customStyle: true,
    alignment: DialogAlignment.Bottom
  })
  @State flag: string = '';

  aboutToAppear() {
    let tem: string = (router.getParams() as Record<string, Object>)['title'] as string;
    if (!tem) {
      return;
    }
    this.flag = tem;
  }

  build() {
    Column() {
      Row() {
        Row() {
          Image($r("app.media.ic_public_back"))
            .height(24)
            .aspectRatio(1)
            .objectFit(ImageFit.Contain)
        }
        .height('100%')
        .aspectRatio(1)
        .padding({ left: 24 })
        .onClick(() => {
          router.back();
        })

        Text($r('app.string.add_new_contact'))
          .fontColor($r('app.color.text_color_primary'))
          .fontSize(20)
          .margin({ left: 24 })

        Blank()

        Row() {
          Image($r('app.media.ic_public_confirm'))
            .height(24)
            .aspectRatio(1)
            .objectFit(ImageFit.Contain)
        }
        .id('add_confirm')
        .height('100%')
        .aspectRatio(1)
        .padding({ right: 24 })
        .onClick(() => {
          let eventId = Constant.EMITTER_ID_DEFAULT;
          switch (this.flag) {
            case getString($r('app.string.deque')):
              eventId = Constant.EMITTER_ID_DEQUE;
              break;
            case getString($r('app.string.linked_list')):
              eventId = Constant.EMITTER_ID_LINKED_LIST;
              break;
            case getString($r('app.string.list')):
              eventId = Constant.EMITTER_ID_LIST;
              break;
            case getString($r('app.string.array_list')):
              eventId = Constant.EMITTER_ID_ARRAY_LIST;
              break;
            case getString($r('app.string.queue')):
              eventId = Constant.EMITTER_ID_QUEUE;
              break;
            case getString($r('app.string.stack')):
              eventId = Constant.EMITTER_ID_STACK;
              break;
            case getString($r('app.string.vector')):
              eventId = Constant.EMITTER_ID_VECTOR;
              break;
            default:
              eventId = Constant.EMITTER_ID_DEFAULT;
              break;
          }

          let event: emitter.InnerEvent = {
            eventId: eventId,
            priority: emitter.EventPriority.HIGH
          };

          let eventData: emitter.EventData = {
            data: this.information
          };

          emitter.emit(event, eventData);
          router.back();
        })

      }
      .width('100%')
      .height(56)

      Row() {
        Image($r('app.media.ic_public_user'))
          .margin({ left: 19 })
          .width(19)
          .aspectRatio(1)
        Text($r('app.string.names'))
          .margin({ left: 19 })
          .fontSize(16)
          .fontColor($r('app.color.text_color_primary'))
        Column() {
          TextInput({ placeholder: $r('app.string.input_name') })
            .id('add_name')
            .height(48)
            .fontSize(16)
            .backgroundColor($r('sys.color.ohos_id_color_background_transparent'))
            .onChange((value: string) => {
              this.information.name = value;
            })
        }
        .layoutWeight(1)
        .margin({ left: 52, right: 16 })
      }
      .height(64)
      .width('100%')
      .borderRadius(16)
      .backgroundColor($r('app.color.bg_white'))
      .margin({ top: 12 })

      Row() {
        Image($r('app.media.ic_age'))
          .margin({ left: 19 })
          .width(19)
          .aspectRatio(1)
        Text($r('app.string.age'))
          .margin({ left: 19 })
          .fontSize(16)
          .fontColor($r('app.color.text_color_primary'))
        Column() {
          Image($r('app.media.ic_public_spinner_down'))
            .height(24)
            .width(12)
        }
        .id('add_age')
        .justifyContent(FlexAlign.Center)
        .width(54)
        .height('100%')
        .onClick(() => {
          this.dialogController.open();
        })

        Column() {
          TextInput({
            text: this.information.age === 0 ? '' : `${this.information.age}`,
            placeholder: $r('app.string.please_choose')
          })
            .height(48)
            .fontSize(16)
            .focusable(false)
            .backgroundColor($r('sys.color.ohos_id_color_background_transparent'))
            .onClick(() => {
              this.dialogController.open();
            })
        }
        .layoutWeight(1)
        .margin({ right: 16 })
      }
      .height(64)
      .width('100%')
      .borderRadius(16)
      .backgroundColor($r('app.color.bg_white'))
      .margin({ top: 12 })

      Row() {
        Image($r('app.media.ic_public_phone'))
          .margin({ left: 19 })
          .width(19)
          .aspectRatio(1)
        Text($r('app.string.contact_phone'))
          .margin({ left: 19 })
          .fontSize(16)
          .fontColor($r('app.color.text_color_primary'))
        Column() {
          TextInput({ placeholder: $r('app.string.input_phone') })
            .id('add_phone')
            .height(48)
            .fontSize(16)
            .backgroundColor($r('sys.color.ohos_id_color_background_transparent'))
            .onChange((value: string) => {
              this.information.phone = value;
            })
        }
        .layoutWeight(1)
        .margin({ left: 52, right: 16 })
      }
      .height(64)
      .width('100%')
      .borderRadius(16)
      .backgroundColor($r('app.color.bg_white'))
      .margin({ top: 12 })
    }
    .height('100%')
    .backgroundColor($r('sys.color.ohos_id_color_sub_background'))
    .padding({ left: 12, right: 12 })
  }
}