/**
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * This software is distributed under a license. The full license
 * agreement can be found in the file LICENSE in this distribution.
 * This software may not be copied, modified, sold or distributed
 * other than expressed in the named license agreement.
 *
 * This software is distributed without any warranty.
 */

import router from '@ohos.router';

@Component
@Preview
export struct Toolbar {
  title: string = 'title'
  isBack: boolean = false
  rightText: string = '';
  rightIcon: Resource | string = ''
  rightClickCallBack: () => void = () => {}

  build() {
    Flex({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
      Flex({ direction: FlexDirection.Row, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start }) {
        Column() {
          Image($r("app.media.back")).width(px2vp(40)).height(px2vp(40))
            .margin({ left: 20 })
        }
        .padding(10)
        .visibility(this.isBack ? Visibility.Visible : Visibility.Hidden)
        .onClick(e => {
          router.back()
        })
      }
      .width('20%')

      Flex({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
        Text(this.title).fontSize(px2fp(35)).fontColor('white')
      }
      .width('60%')

      Flex({ direction: FlexDirection.Row, alignItems: ItemAlign.End, justifyContent: FlexAlign.End }) {
        Stack() {
          Text('').visibility(Visibility.Hidden)
          if (this.rightText != '') {
            Text(this.rightText).fontSize(px2fp(30)).fontColor('white')
          }
          if (this.rightIcon != '') {
            Image(this.rightIcon).width(px2vp(40)).height(px2vp(40))
              .margin({ right: 20 })
          }
        }
        .padding(10)
        .onClick(e => {
          this.rightClickCallBack()
        })
      }
      .width('30%')
    }
    .width('100%')
    .height(px2vp(100))
    .backgroundColor('#ff56ae97')
  }
}