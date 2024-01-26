/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
export default struct Player {
  @StorageProp('fontSize') fontSize: number = 0

  build() {
    Row() {
      Image($r('app.media.pic_music_cover'))
        .height(32)
        .width(32)
        .borderRadius(5)
        .margin({ right: 12 })
      Column() {
        Text($r('app.string.song_name'))
          .fontColor('#000000')
          .fontSize(this.fontSize - 1)
        Row() {
          Image($r('app.media.ic_vip'))
            .height(16)
            .width(16)
            .margin({ right: 4 })
          Text($r('app.string.singer'))
            .fontColor('#000000')
            .fontSize(this.fontSize - 4)
            .opacity(0.38)
        }
      }
      .alignItems(HorizontalAlign.Start)

      Blank()
      Image($r('app.media.icon_pause'))
        .height(26)
        .width(26)
        .margin({ right: 16 })
      Image($r('app.media.ic_next'))
        .height(24)
        .width(24)
        .margin({ right: 16 })
      Image($r('app.media.ic_Music_list'))
        .height(24)
        .width(24)
    }
    .width('100%')
    .height(48)
    .backgroundColor('#F6F9FC')
    .padding({ left: 16, right: 16 })
  }
}