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

@Component
export struct ItemText {
  title: string = ''
  content: string = ''
  clickEvent: () => void = () => {}

  build() {
    Column() {
      Column() {
        Row() {
          Text(this.title)
            .fontSize(15)
            .width(this.content == '' ? '85%' : '60%')
            .height(50)
            .fontColor(Color.Black)
            .onClick(v => {
              this.clickEvent()
            })
          Text(this.content)
            .fontSize(15)
            .width(this.content == '' ? '0' : '30%')
            .padding({ right: 20 })
            .height(50)
            .textAlign(TextAlign.End)
            .alignSelf(ItemAlign.Center)
            .fontColor(Color.Black)
        }

        Line().width('100%').height(1).backgroundColor('#ececec').margin({ left: 20 })
      }
      .padding({ left: 15 }).height(54)
      .width('100%')
    }.height(55).backgroundColor(Color.White).width("100%").margin({ top: 1 })
  }
}

