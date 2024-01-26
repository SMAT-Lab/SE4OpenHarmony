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

import { TempInfo, TempInfoTable } from '../common/database/TempInfoTable';
import { value_text, get_value_button, GridExample, time_text, getdata, showtemp, onlywirte } from "./widgets"
import prompt from '@system.prompt';
import router from '@ohos.router';
import RouterParm from '../common/database/RouterParm';

@Entry
@Component
struct MyMenu {
  @State adc_value: number = 0;
  @State temperature: number = 0;
  @State visual: number = 1;
  @State datainfolist: Array<TempInfo> = []; //存放查询结果的数组
  @State tempmode: boolean = true;
  @State mode: boolean = true;

  onPageShow() {
    try {
      // console.log("myMenu中接收到了table对象吗："+this.TempInfoobj)
      let routerParm = router.getParams() as RouterParm;
      this.mode = routerParm.mode;
    } catch (err) {
      console.log("nomode,its first time");
    }
  }

  build() {
    Row() {
      Column() {
        showtemp({ adc_value: $adc_value, temperature: $temperature, mode: $mode })
        value_text({ adc_value: $adc_value, temperature: $temperature, mode: $mode });
      }
      .margin({ top: '15%', left: '10%' })

      Column() {
        Button('设置', { type: ButtonType.Capsule })
          .borderRadius(20)
          .fontSize(30)
          .margin({ bottom: 12 })
          .id("Setting")
          .onClick(() => {
            router.replaceUrl({
              url: 'pages/myset',
              params: {
                mode: this.mode,
              },
            })
          })
        Button('历史温度趋势', { type: ButtonType.Capsule })
          .borderRadius(20)
          .fontSize(30)
          .margin({ bottom: 12 })
          .id("history")
          .onClick(() => {
            router.pushUrl({
              url: 'pages/Index',
            })
          })
      }
      .margin({ top: '15%', left: '15%' })
    }
    .height('100%')
    .width('100%')
    .backgroundImage($r('app.media.bg2')).backgroundImageSize(ImageSize.Cover)

    // Column(){
    //   onlywirte({TempInfoobj:$TempInfoobj});
    //   Scroll(){
    //     GridExample({TempInfoobj: $TempInfoobj,datainfolist:$datainfolist});
    //   }
    //   .scrollable(ScrollDirection.Horizontal)
    //   .scrollBar(BarState.Auto)
    //   //startrecord_button({TempInfoobj:$TempInfoobj});
    //   getdata({TempInfoobj: $TempInfoobj,datainfolist:$datainfolist});
    // }
  }
}