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
@Preview
export struct Switches {
  isOn: string = ''
  title: string | Resource = ""
  isEnable: boolean = true
  onToggleChange: (isOn: string) => void = (isOn: string) => {}

  build() {
    Column() {
      Row() {
        Column() {
          Text(this.title)
            .fontColor(Color.Black)
            .width('100%')
            .fontSize(18)
            .opacity(0.9)
        }
        .padding({ top: px2vp(5), bottom: px2vp(5) })
        .alignItems(HorizontalAlign.Start)
        .layoutWeight(1)

        Toggle({ type: ToggleType.Switch, isOn: this.isOn == "1" })
          .selectedColor('#1d85f6')
          .align(Alignment.Center)
          .switchPointColor('#F1F3F5')
          .size({ width: px2vp(36), height: px2vp(20) })
          .onChange((isOn: boolean) => {
            if (this.isEnable) {
              this.isOn = (isOn ? "1" :"0")
              this.onToggleChange(this.isOn)
            }
          })
          .margin({ right: 40 })

      }
      .padding({ left: 15 }).height(54)
      .width('100%')
    }.height(55).backgroundColor(Color.White).width("100%").margin({ top: 1 })

  }
}
