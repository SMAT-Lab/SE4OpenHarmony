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
import { getString } from '@ohos/common';
import { Constant } from '@ohos/capabilities';

@Entry
@Component
export struct AddKeyValueView {
  @State value: string = ''
  @State title: string = '';
  @State flag: string = '';

  aboutToAppear() {
    let tem: string = (router.getParams() as Record<string, Object>)['title'] as string;
    if (!tem) {
      return;
    }
    this.flag = tem;
    let regex: RegExp = new RegExp('.*(?=\\(|（)');
    let matchArr: RegExpMatchArray | null = tem.match(regex);
    if (matchArr !== null) {
      this.title = `${getString($r('app.string.add'))}${matchArr[0]}`;
    }
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

        Text(this.title)
          .fontColor($r('app.color.text_color_primary'))
          .fontSize(20)
          .margin({ left: 24 })

        Blank()

        Row() {
          Image($r("app.media.ic_public_confirm"))
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
            case getString($r('app.string.hash_set')):
              eventId = Constant.EMITTER_ID_HASH_SET;
              break;
            case getString($r('app.string.light_weight_set')):
              eventId = Constant.EMITTER_ID_LIGHT_WEIGHT_SET;
              break;
            case getString($r('app.string.tree_set')):
              eventId = Constant.EMITTER_ID_TREE_SET;
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
            data: { 'value': this.value }
          };

          emitter.emit(event, eventData);
          router.back();
        })
      }
      .width('100%')
      .height(56)

      Row() {
        Text('Value')
          .margin({ left: 19 })
          .fontSize(16)
          .fontColor($r('app.color.text_color_primary'))
        Column() {
          TextInput({ placeholder: $r('app.string.input_value') })
            .id('add_value')
            .height(48)
            .fontSize(16)
            .backgroundColor($r('sys.color.ohos_id_color_background_transparent'))
            .onChange((value: string) => {
              this.value = value;
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