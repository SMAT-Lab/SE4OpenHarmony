/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 *
 */

const SCALE: number = 0.5; // 缩放比例

@CustomDialog
export struct ScreenshotDialog {
  screenshotController: CustomDialogController
  @Link screenshotUrl: PixelMap

  build() {
    Column() {
      Image(this.screenshotUrl)
    }
    .borderRadius(10)
    .padding(20)
    .backgroundColor(Color.White)
    .scale({ x: SCALE, y: SCALE })
  }
}