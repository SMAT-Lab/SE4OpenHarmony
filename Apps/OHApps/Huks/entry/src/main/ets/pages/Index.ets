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

import router from '@ohos.router';

export class Flag {
  public  static value : number = 0;
  public  static set(v : number): void {
    Flag.value = v;
  }
}
@Entry
@Component
struct Index {
  @Builder NavigationTitle() {
    Column() {
      Text($r('app.string.module_desc'))
        .fontColor('#182431')
        .fontSize(20)
        .lineHeight(25)
        .fontWeight(700)
    }
    .alignItems(HorizontalAlign.Start)
  }

  build() {
    Column() {
      Navigation() {
        Stack({ alignContent: Alignment.Center }) {
          Column() {
            GridRow() {
              GridCol({ span: { xs: 12, sm: 12, md: 12, lg: 12 } }) {
                Column() {
                  Button() {
                    Text($r('app.string.new_key')).fontSize(16).fontWeight(500)
                      .lineHeight(22)
                      .fontColor('#FFFFFF')
                  }
                  .id('new_key')
                  .borderRadius(20)
                  .type(ButtonType.Capsule)
                  .width('100%')
                  .height('40vp')
                  .margin({ bottom: 16 })
                  .backgroundColor('#007DFF')
                  .onClick(() => {
                    Flag.set(1);
                    router.pushUrl({
                      url: 'pages/SelectPage'
                    })
                  });
                  Button() {
                    Text($r('app.string.old_key')).fontSize(16).fontWeight(500)
                      .lineHeight(22)
                      .fontColor('#FFFFFF')
                  }
                  .borderRadius(20)
                  .id('old_key')
                  .type(ButtonType.Capsule)
                  .margin({ left: 24, right: 24 })
                  .margin({ bottom: 16 })
                  .width('100%')
                  .height('40vp')
                  .backgroundColor('#007DFF')
                  .onClick(() => {
                    Flag.set(2);
                    router.pushUrl({
                      url: 'pages/SelectPage'
                    })
                  });

                  Button() {
                    Text($r('app.string.min_access_control')).fontSize(16).fontWeight(500)
                      .lineHeight(22)
                      .fontColor('#FFFFFF')
                  }
                  .borderRadius(20)
                  .id('min_access_control')
                  .type(ButtonType.Capsule)
                  .margin({ left: 24, right: 24 })
                  .margin({ bottom: 16 })
                  .width('100%')
                  .height('40vp')
                  .backgroundColor('#007DFF')
                  .onClick(() => {
                    Flag.set(3);
                    router.pushUrl({
                      url: 'pages/SelectPage'
                    })
                  });
                }
              }
            }.margin({ left: 24, right: 24 })
          }.width('100%').height('296vp').justifyContent(FlexAlign.End)
        }
        .height('94%')
      }
      .title({ builder: this.NavigationTitle, height: 56 })
      .titleMode(NavigationTitleMode.Mini)
      .hideTitleBar(false)
      .hideToolBar(true)
      .hideBackButton(true)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F1F1F1')
  }
}