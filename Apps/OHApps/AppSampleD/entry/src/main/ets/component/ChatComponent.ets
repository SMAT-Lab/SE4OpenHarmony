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
import { ChatBox } from '../appsampled/data/ChatBox';

@Component
export default struct ChatComponent {
  private item: ChatBox | undefined = undefined;

  build() {
    Row() {
      if (!this.item?.isSend) {
        Image($r('app.media.app_icon'))
          .width(50)
          .height(50)
          .objectFit(ImageFit.Contain)
          .borderRadius(25)
          .margin({ left: 10, right: 10 })
      }
      Column() {
        Text(this.item?.message)
          .maxLines(5)
          .padding(10)
          .fontSize(18)
          .fontColor($r('app.color.COLOR_FFFFFF'))
          .fontFamily($r('app.string.Font_family_regular'))
          .borderRadius(14)
          .alignSelf(this.item?.isSend ? ItemAlign.End : ItemAlign.Start)
          .backgroundColor(this.item?.isSend ? $r('app.color.COLOR_3DA0F1') : $r('app.color.COLOR_393939'))
      }
      .width('85%')

      if (this.item?.isSend) {
        Image($r('app.media.app_icon'))
          .width(50)
          .height(50)
          .objectFit(ImageFit.Contain)
          .borderRadius(25)
          .margin({ left: 10, right: 10 })
      }
    }
    .width('100%')
    .height(40)
  }
}
