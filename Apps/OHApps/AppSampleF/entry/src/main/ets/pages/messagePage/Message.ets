/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import router from '@ohos.router';
import Logger from '../../utils/Logger';

const TAG = '[Message]';

@Entry
@Component
struct Message {
  @State show: boolean = false;
  @State text: string = '';
  scroller: Scroller = new Scroller();

  async aboutToAppear() {
    this.text = AppStorage.get('text')!;
    Logger.info(TAG, `Message===this.text===${this.text}`);
  }

  async aboutToDisappear() {
    Logger.info(TAG, 'Message===aboutToDisappear===');
  }

  async onPageShow() {
    Logger.info(TAG, 'Message===onPageShow===');
  }

  async onPageHide() {
    Logger.info(TAG, 'Message===onPageHide===');
  }

  build() {
    Column() {
      RelativeContainer() {
        Text($r('app.string.message_baby'))
          .fontColor(Color.White)
          .fontSize(22)
          .fontWeight(FontWeight.Regular)
          .alignRules({
            middle: { anchor: '__container__', align: HorizontalAlign.Center },
            center: { anchor: '__container__', align: VerticalAlign.Center }
          })
          .id("test1")
        Image($r("app.media.icon"))
          .width(30)
          .height(30)
          .onClick(() => {
            router.back()
          })
          .alignRules({
            right: { anchor: '__container__', align: HorizontalAlign.End },
            center: { anchor: '__container__', align: VerticalAlign.Center }
          })
          .id("test2")
      }
      .height(30)
      .width('90%')
      .margin({ top: 40, bottom: 20 })

      Row() {
        Image($r('app.media.icon'))
          .width(100)
          .height(100)
          .objectFit(ImageFit.Contain)

        Column() {
          Row() {
            Text(this.text)
              .fontSize(22)
              .fontColor(Color.White)
              .margin({ bottom: 20 })
          }
          .width(400)

          Row() {
            Text($r('app.string.message_text'))
              .fontColor($r('app.color.message_text'))
              .fontSize(18)
          }
          .width(400)
        }
        .justifyContent(FlexAlign.Start)
        .margin({ left: 10 })
      }
      .width('100%')
      .margin({ left: 15, bottom: 10 })

      Scroll(this.scroller) {
        Column() {
          Row() {
            Image($r('app.media.icon'))
              .height(200)
              .width('40%')

            Image($r('app.media.icon'))
              .height(200)
              .width('40%')
          }
          .width('100%')
          .justifyContent(FlexAlign.SpaceAround)

          Row() {
            Image($r('app.media.icon'))
              .height(200)
              .width('40%')

            Image($r('app.media.icon'))
              .height(200)
              .width('40%')
          }
          .margin({ top: 12 })
          .width('100%')
          .justifyContent(FlexAlign.SpaceAround)

          Row() {
            Image($r('app.media.icon'))
              .height(200)
              .width('40%')

            Image($r('app.media.icon'))
              .height(200)
              .width('40%')
          }
          .margin({ top: 12 })
          .width('100%')
          .justifyContent(FlexAlign.SpaceAround)

          Row() {
            Image($r('app.media.icon'))
              .height(200)
              .width('40%')

            Image($r('app.media.icon'))
              .height(200)
              .width('40%')
          }
          .margin({ top: 12 })
          .width('100%')
          .justifyContent(FlexAlign.SpaceAround)

          Row() {
            Image($r('app.media.icon'))
              .height(200)
              .width('40%')

            Image($r('app.media.icon'))
              .height(200)
              .width('40%')
          }
          .margin({ top: 12 })
          .width('100%')
          .justifyContent(FlexAlign.SpaceAround)

          Row() {
            Image($r('app.media.icon'))
              .height(200)
              .width('40%')

            Image($r('app.media.icon'))
              .height(200)
              .width('40%')
          }
          .margin({ top: 12 })
          .width('100%')
          .justifyContent(FlexAlign.SpaceAround)

          Row() {
            Image($r('app.media.icon'))
              .height(200)
              .width('40%')

            Image($r('app.media.icon'))
              .height(200)
              .width('40%')
          }
          .margin({ top: 12 })
          .width('100%')
          .justifyContent(FlexAlign.SpaceAround)
        }
      }
      .width('100%')
      .height('90%')
      .padding(8)
      .margin({ left: 12, right: 12, top: 12, bottom: 150 })
      .backgroundColor(Color.White)
      .borderRadius(8)
      .scrollBar(BarState.Off)
      .borderRadius(24)
      .scrollable(ScrollDirection.Vertical)
    }
    .backgroundColor(Color.Black)
    .width('100%')
    .height('100%')
  }
}