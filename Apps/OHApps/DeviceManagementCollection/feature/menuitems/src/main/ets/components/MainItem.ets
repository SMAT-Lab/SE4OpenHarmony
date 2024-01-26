/**
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
  private title?: string | Resource;
  @LocalStorageProp('isSplitMode') isSplitMode: boolean = false;
  @State isTouched: boolean = false;

  build() {
    Row() {
      Text(this.title)
        .fontSize(20)
        .lineHeight(22)
        .fontWeight(FontWeight.Medium)
        .fontColor($r("app.color.list_title"))
        .align(Alignment.Start)

      Blank()

      Image($r('app.media.ic_arrow'))
        .width(16)
        .height(32)
        .fillColor($r('sys.color.ohos_id_color_fourth'))
    }
    .alignItems(VerticalAlign.Center)
    .width('100%')
    .height(62)
    .borderRadius(20)
    .padding({ left: 16, right: 16 })
    .backgroundColor(this.isTouched ? $r('app.color.itemActivated') : $r('app.color.itemInactivated'))
    .onTouch((event: TouchEvent) => {
      if (event.type === TouchType.Down) {
        this.isTouched = true;
      } else if (event.type === TouchType.Up) {
        this.isTouched = false;
      }
    })
  }
}