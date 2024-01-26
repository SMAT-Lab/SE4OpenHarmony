/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

@CustomDialog
export struct CustomBatteryDialog {
  @State title: string = '';
  @State message: string = '';
  @Link backColor: Color;
  yesEvent: () => void;
  noEvent: () => void;
  private controller: CustomDialogController; // 定义controller

  build() {
    Stack() {
      Column() {
        Text(this.title)
          .fontSize(20)
          .margin({ top: 15 })
        Text(this.message)
          .fontSize(16)
          .margin({ top: 3 })
        Text()
          .size({ width: "100%", height: "2px" })
          .backgroundColor("#bebbc1")
          .margin({ top: 15 })
        Row() {
          Text("不合格")
            .height("100%")
            .layoutWeight(1)
            .textAlign(TextAlign.Center)
            .fontSize(18)
            .fontColor("#317ef5")
            .onClick(() => {
              this.backColor = Color.Red;
              this.controller.close(); // 关闭弹窗
              if (this.noEvent) {
                this.noEvent();
              }

            })
          Text()
            .size({ width: "2px", height: "100%" })
            .backgroundColor("#bebbc1")
          Text("合格")
            .textAlign(TextAlign.Center)
            .fontSize(18)
            .fontColor("#317ef5")
            .height("100%")
            .layoutWeight(1)
            .onClick(() => {
              this.backColor = Color.Green;
              this.controller.close(); // 关闭弹窗
              if (this.yesEvent) {
                this.yesEvent();
              }
            })
        }
        .height(45)
        .width('100%')
      }
      .backgroundColor("#e6ffffff")
      .borderRadius(20)
    }
    .padding({ left: 40, right: 40 })
    .width("100%")
  }
}