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

import router from '@ohos.router';
import prompt from '@ohos.prompt';
import RouterParm from '../common/database/RouterParm';

@Entry
@Component
struct Myset {
  @State localmode: boolean = true //只有state变量才能给check赋值
  @State clickAble: boolean = true
  mode: boolean = true;
  lowthreshold: number = 0;
  highthreshold: number = 0;

  onPageShow() {
    let routerParm = router.getParams() as RouterParm;
    this.mode = routerParm.mode;
    this.localmode = this.mode;
    console.log("在设置界面的onpageshow,拿到了mode为：" + this.mode)
  }

  save() {
    let routerParm: RouterParm = new RouterParm(this.mode,this.lowthreshold,this.highthreshold)
    router.replaceUrl({
      url: 'pages/myMenu',
      params: routerParm,
    })
  }

  back() {
    router.replaceUrl({
      url: 'pages/myMenu'
    })
  }

  build() {
    Column() {
      Row() {
        Row() {
          Image($r('app.media.icon_back'))
            .width(24)
            .height(24)
            .id("back")
        }
        .padding({ left: 2, right: 17, top: 10, bottom: 10 })
        .onClick(() => {
          this.back()
        })

        Blank()
        Button($r('app.string.save'))
          .fontSize(22)
          .id("Saving")
          .backgroundColor(this.clickAble ? '#4F7EFD' : "#C0CFF7")
          .height(44)
          .borderRadius(7)
          .padding({
            left: 14,
            right: 14,
          })
          .margin({ bottom: 4 })
          .enabled(this.clickAble)
          .onClick(() => {
            this.save()
          })
          .type(ButtonType.Normal)

      }
      .width('100%')
      .height(54)
      .margin({
        top: 5
      })

      Row() {
        Column() {
          Text("温度单位:")
            .fontSize(50)
            .fontWeight(FontWeight.Bold)
            .textAlign(TextAlign.Start)
            .id("TempUnit")
          Row() {
            Column() {
              Radio({ value: 'centigrade', group: 'tempchoice' })
                .checked(this.localmode)
                .id('°C')
                .width(50)
                .onChange((isChecked: boolean) => {
                  if (isChecked) {
                    // 切换为摄氏度模式
                    prompt.showToast({ message: 'centigrade mode.' })
                    this.mode = true;
                  }
                })
              Text('°C')
            }

            Column() {
              Radio({ value: 'Fahrenheit', group: 'tempchoice' })
                .checked(!this.localmode)
                .id('°F')
                .width(50)
                .onChange((isChecked: boolean) => {
                  if (isChecked) {
                    // 切换为华氏度模式
                    prompt.showToast({ message: 'Fahrenheit mode.' })
                    this.mode = false;
                  }
                })
              Text('°F')
            }
          }
        }
        .margin({ top: 80 })

        Blank()
        Column() {
          Row() {
            Text("低温阈值:")
              .fontSize(50)
              .fontWeight(FontWeight.Bold)
              .id("MinTemp")
            TextInput()
              .type(InputType.Number)
              .id("InputMin")
              .width(100)
              .backgroundColor(Color.Gray)
          }
          .margin({ top: 30 })

          Row() {
            Text("高温阈值:")
              .fontSize(50)
              .fontWeight(FontWeight.Bold)
              .id("MaxTemp")
            TextInput()
              .type(InputType.Number)
              .id("InputMax")
              .width(100)
              .backgroundColor(Color.Grey)
          }
          .margin({ top: 40 })
        }
      }
      .width('90%')
    }
    .height('100%')
    .width('100%')
    .backgroundImage($r('app.media.bg1')).backgroundImageSize(ImageSize.Cover)
  }
}