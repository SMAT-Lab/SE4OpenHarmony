/* Copyright 2023 Unionman Technology Co., Ltd.
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

import { Logger } from '../utils/Logger';
import i2cOpengl from 'libi2cOpengl.so'
// @ts-ignore
import i2cnapidemo from '@ohos.i2cnapidemo'

@Entry
@Component
struct Index {
  @State tempC: number = 0.0;
  @State tempF: number = 0.0;
  @State Hum: number = 0.0;
  @State tempString: string = '';
  private xcomponentId = 'temp';
  intervalID: number
  updateintervalID: number

  async aboutToAppear() {
    Logger.info('aboutToAppear');
    let resourceManager = getContext(this).resourceManager;
    this.tempString = await resourceManager.getStringValue($r('app.string.mode_label').id);
    i2cnapidemo.SoftReset();
    i2cnapidemo.ModeSet(1, 1);
  }

  getValue() {
    i2cnapidemo.ReadData();
    this.tempC = i2cnapidemo.ReadTemperatureC();
    this.tempF = i2cnapidemo.ReadTemperatureF();
    this.Hum = i2cnapidemo.ReadHumidity();
  }

  startWork() {
    this.intervalID = setInterval(() => {
      this.getValue();
    }, 500)
  }

  Update() {
    this.updateintervalID = setInterval(() => {
      i2cOpengl.updateTemp(this.tempC);
    }, 500)
  }

  build() {
    Row() {
      Column() {
        Text($r('app.string.EntryAbility_desc'))
          .fontSize($r('app.float.head_font_24'))
          .lineHeight($r('app.float.wh_value_33'))
          .fontFamily('HarmonyHeiTi-Bold')
          .fontWeight(FontWeight.Bold)
          .fontColor($r('app.color.font_color_182431'))
          .textOverflow({ overflow: TextOverflow.Ellipsis })
          .textAlign(TextAlign.Start)
          .margin({ top: $r('app.float.wh_value_13'), bottom: $r('app.float.wh_value_15') })

        Text(`摄氏度为 ：${this.tempC.toFixed(2)}°C`)
          .fontSize($r('app.float.head_font_24'))
          .lineHeight($r('app.float.wh_value_33'))
          .fontFamily('HarmonyHeiTi-Bold')
          .fontWeight(FontWeight.Bold)
          .fontColor($r('app.color.font_color_182431'))
          .textOverflow({ overflow: TextOverflow.Ellipsis })
          .textAlign(TextAlign.Start)
          .margin({ top: $r('app.float.wh_value_13'), bottom: $r('app.float.wh_value_15') })
          .onAppear(() => {
            this.startWork();
          })
        Text("华氏度为 ： " + this.tempF.toFixed(2).toString() + "°F")
          .fontSize($r('app.float.head_font_24'))
          .lineHeight($r('app.float.wh_value_33'))
          .fontFamily('HarmonyHeiTi-Bold')
          .fontWeight(FontWeight.Bold)
          .fontColor($r('app.color.font_color_182431'))
          .textOverflow({ overflow: TextOverflow.Ellipsis })
          .textAlign(TextAlign.Start)
          .margin({ top: $r('app.float.wh_value_13'), bottom: $r('app.float.wh_value_15') })

        Text("湿度为 ： " + this.Hum.toFixed(2).toString() + "%")
          .fontSize($r('app.float.head_font_24'))
          .lineHeight($r('app.float.wh_value_33'))
          .fontFamily('HarmonyHeiTi-Bold')
          .fontWeight(FontWeight.Bold)
          .fontColor($r('app.color.font_color_182431'))
          .textOverflow({ overflow: TextOverflow.Ellipsis })
          .textAlign(TextAlign.Start)
          .margin({ top: $r('app.float.wh_value_13'), bottom: $r('app.float.wh_value_15') })
      }

      Column() {
        XComponent({ id: this.xcomponentId, type: 'surface', libraryname: 'libi2cOpengl' })
          .onLoad(() => {
            Logger.info('onLoad');
            this.Update();
          })
          .width($r('app.float.wh_value_360'))
          .height($r('app.float.wh_value_360'))
          .onDestroy(() => {
            Logger.info('onDestroy');
          })
          .backgroundColor(Color.White)
      }
      .justifyContent(FlexAlign.SpaceAround)
      .alignItems(HorizontalAlign.Center)
      .height('120%')
      .width('100%')
      .backgroundColor(Color.White)
      .borderRadius(24)

    }
    .padding(12)
    .backgroundColor('#f1f3f5')
    .height('100%')
  }
}
