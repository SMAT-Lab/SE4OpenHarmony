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
import Logger from '../utlis/Logger';

const TAG: string = '[SelectComponent]';

@CustomDialog
export struct SelectComponent {
  controller?: CustomDialogController;
  private title: Resource | null = null;
  private dataList: Resource[] = [];
  @Link selectType: number;
  @State selected: number = 0 // 当前选择项的索引;

  aboutToAppear() {
    Logger.info(TAG, `aboutToAppear selectType_ ${AppStorage.Get<number>(`selectType_${this.selectType}`)}`);
    let selectTypeValue: number | undefined = AppStorage.Get<number>(`selectType_${this.selectType}`);
    if (selectTypeValue !== undefined) {
      this.selected = selectTypeValue;
    }
  }

  build() {
    Column() {
      if (this.title !== null) {
        Text(this.title)
          .fontSize(20)
          .width('90%')
          .fontColor($r('app.color.COLOR_E6000000'))
          .fontFamily($r('app.string.font_family'))
          .textAlign(TextAlign.Start)
          .margin({ top: 20, bottom: 12 })
      }

      List() {
        ForEach(this.dataList, (item: Resource, index: number) => {
          ListItem() {
            Column() {
              Row() {
                Text(item)
                  .fontSize(16)
                  .fontColor($r('app.color.COLOR_E6000000'))
                  .fontFamily($r('app.string.font_family'))
                  .fontWeight(FontWeight.Medium)
                  .textAlign(TextAlign.Center)
                Blank()
                Radio({ group: 'radio', value: '' })
                  .width(24)
                  .height(24)
                  .checked(this.selected == index)
                  .hitTestBehavior(HitTestMode.None)
              }
              .width('100%')
              .alignItems(VerticalAlign.Center)

              if (index != this.dataList.length - 1) {
                Divider()
                  .vertical(false)
                  .strokeWidth(1)
                  .color($r('app.color.COLOR_33000000'))
              }
            }
            .width('90%')
          }
          .width('100%')
          .height(48)
          .onClick(() => {
            if (index !== undefined) {
              this.selected = index;
            }
            Logger.info(TAG, `item onClick ${this.selected}`);
          })
        })
      }
      .width('100%')
      .margin({ top: 12 })

      Row() {
        Text($r('app.string.cancel'))
          .fontSize(16)
          .fontColor($r('app.color.COLOR_007DFF'))
          .fontWeight(FontWeight.Medium)
          .layoutWeight(1)
          .textAlign(TextAlign.Center)
          .onClick(() => {
            this.controller?.close();
          })

        Divider()
          .vertical(true)
          .strokeWidth(1)
          .color($r('app.color.COLOR_33000000'))
          .height(20)

        Text($r('app.string.confirm'))
          .id('confirm')
          .fontSize(16)
          .fontColor($r('app.color.COLOR_007DFF'))
          .fontWeight(FontWeight.Medium)
          .layoutWeight(1)
          .textAlign(TextAlign.Center)
          .onClick(() => {
            // 确认后返回当前索引
            AppStorage.SetOrCreate(`selectType_${this.selectType}`, this.selected);
            Logger.info(TAG, `confirm onClick ${this.selected}`);
            this.controller?.close();
          })
      }
      .alignItems(VerticalAlign.Center)
      .height(40)
      .width('100%')
    }
    .alignItems(HorizontalAlign.Center)
    .width('90%')
    .borderRadius(24)
    .backgroundColor(Color.White)
  }
}