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

@Component
export struct EmptyPage {
  private img: string | PixelMap | Resource = $r('app.media.bg_empty_page');
  private message: ResourceStr = $r('app.string.tv_no_data');

  build() {
    Column() {
      Image(this.img)
        .width(120)
        .aspectRatio(1)

      Text(this.message)
        .fontSize(14)
        .fontColor($r('app.color.text_color_second'))
        .margin({ top: 8 })
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
    .alignItems(HorizontalAlign.Center)
  }
}