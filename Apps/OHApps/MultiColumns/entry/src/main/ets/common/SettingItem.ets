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

@Component
export struct MainItem {
  itemDesc: Resource = $r("app.string.nonSense")
  src: Resource = $r("app.media.icon")
  isUserItem: boolean = false
  itemStatusDesc: Resource = $r("app.string.nonSense")

  build() {
    Row() {
      Image(this.src).width(32).aspectRatio(1)

      if (this.isUserItem) {
        Column() {
          Text($r('app.string.userInfo')).fontSize(16).fontWeight(FontWeight.Medium)
          Text($r('app.string.aboutUserInfo'))
            .fontSize(14)
            .fontWeight(FontWeight.Regular)
            .opacity(0.6)
            .maxLines(1)
            .textOverflow({ overflow: TextOverflow.Ellipsis })
        }.alignItems(HorizontalAlign.Start).margin({ left: 12 }).flexShrink(1)
      } else {
        Text(this.itemDesc)
          .fontSize(16)
          .lineHeight(22)
          .fontWeight(FontWeight.Medium)
          .fontFamily('HarmonyHeiTi')
          .fontColor($r('sys.color.ohos_id_color_text_primary'))
          .align(Alignment.Start)
          .margin({ left: 16 })
      }

      Blank()

      if (this.itemStatusDesc) {
        Text(this.itemStatusDesc).fontWeight(FontWeight.Regular).fontSize(14)
      }
      Image($r('app.media.ic_settings_arrow'))
        .width(12)
        .height(24)
        .fillColor($r('sys.color.ohos_id_color_fourth'))
        .margin({ left: 4 })
    }.padding({ left: 12, right: 12 })
    .height(56)
    .borderRadius(20)
    .width('100%')
  }
}

@Component
export struct SubItem {
  itemDesc: Resource = $r("app.string.nonSense")
  src: Resource = $r("app.media.icon")
  isShowButton: boolean = false
  isShowRightArrow: boolean = false
  itemStatusDesc: Resource = $r("app.string.nonSense")
  content: Resource = $r("app.string.nonSense")
  isLinkAddress: boolean = false

  build() {
    Row() {
      Column() {
        Text(this.itemDesc)
          .fontSize(16)
          .lineHeight(22)
          .fontWeight(FontWeight.Medium)
          .fontFamily('HarmonyHeiTi')
          .fontColor(this.isLinkAddress ? '#254ff7' : $r('sys.color.ohos_id_color_text_primary'))
          .align(Alignment.Start)
        if (this.content) {
          Text(this.content)
            .fontWeight(FontWeight.Regular)
            .fontSize(14)
            .fontColor('#99000000').margin({ top: 1.5 })
        }
      }.alignItems(HorizontalAlign.Start)

      Blank()

      if (this.isShowButton) {
        Toggle({ type: ToggleType.Switch, isOn: true })
          .id('ToggleSwitch')
          .width(36)
          .height(20)
          .selectedColor('#007DFF')
      } else if (this.isShowRightArrow) {
        if (this.itemStatusDesc) {
          Text(this.itemStatusDesc).fontWeight(FontWeight.Regular).fontSize(14)
        }
        Image($r('app.media.ic_settings_arrow'))
          .width(12)
          .height(24)
          .fillColor($r('sys.color.ohos_id_color_fourth'))
          .margin({ left: 4
          })
      } else {
        Image(this.src)
          .width(24)
          .height(24)
          .fillColor($r('sys.color.ohos_id_color_primary'))
      }
    }
    .height(56)
    .borderRadius(20)
    .width('100%')
    .padding({ left: 12, right: 12 })
  }
}