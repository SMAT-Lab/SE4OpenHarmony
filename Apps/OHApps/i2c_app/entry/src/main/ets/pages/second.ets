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

import router from '@ohos.router';
import i2cnapidemo from '@ohos.i2cnapidemo';
import prompt from '@ohos.prompt';
import promptAction from '@ohos.promptAction';

// 自定义按钮组件
@Extend(Button)
function ButtonStyle() {
  .fontSize(15)
  .fontWeight(FontWeight.Bold)
  .fontStyle(FontStyle.Italic)
  .type(ButtonType.Capsule)
  .backgroundColor('#0D9FFB')
}

@Entry
@Component
struct Second {
  // Popup组件标志位
  @State handlePopup: boolean = false
  // 摄氏度值
  @State ReadTemperatureC: number = 0;
  // 湿度值
  @State ReadHumidity: number = 0;
  // 华氏度值
  @State ReadTemperatureF: number = 0;
  // 使用教程文本
  @State message: string = '使用教程:一.启动/重启 二.滑动选择后按下模式选择 三.获取';
  // TextPicker组件参数
  @State select1: number = 3;
  @State Mps: string[] = ['0.5Hz', '1Hz', '2Hz', '4Hz', '10Hz'];
  @State select2: number = 1;
  @State Repeatability: string[] = ['low', 'mid', 'high'];
  // Popup组件初始化message值
  @State popupMessage: string = "The current Mps is " + this.Mps[this.select1] + "\n" +
    "And the current refresh rate is " + this.Repeatability[this.select2] + "\n" +
    "Are you sure to refresh?";
  intervalID: number;

  // 构造器供Popup组件调用显示当前模式
  @Builder
  popupBuilder() {
    Column() {
      Text(this.popupMessage).fontSize(12)
      Row() {
        Button('confirm')
          .backgroundColor('#ffffffff')
          .fontColor('#ff020202')
          .id('modeConfirm_button')
          .onClick(() => {
            this.handlePopup = !this.handlePopup
            this.popupMessage = "The current Mps is " + this.Mps[this.select1] + "\n" +
              "And the current refresh rate is " + this.Repeatability[this.select2] + "\n" +
              "Are you sure to refresh?";
            if (i2cnapidemo.ReadTemperatureC() <= 800) {
              i2cnapidemo.ModeSet(this.select1, this.select2);
              promptAction.showToast({
                message: "模式选择成功", // 显示文本
                duration: 500, // 显示时长
                bottom: 100 // 距离底部的距离
              })
            }
            else {
              promptAction.showToast({
                message: "模式选择失败，请检查连线", // 显示文本
                duration: 1000, // 显示时长
                bottom: 100 // 距离底部的距离
              })
            }

          })
        Button('cancel')
          .backgroundColor('#ffffffff')
          .fontColor('#ff030303')
          .id('Mode_cancel')
          .onClick(() => {
            this.handlePopup = !this.handlePopup
          })
      }
    }.height(50)
    .padding(5)
    .backgroundColor("#FFFFFF")
  }

  // 获取温湿度
  getValue() {
    i2cnapidemo.ReadData();
    this.ReadTemperatureC = i2cnapidemo.ReadTemperatureC();
    this.ReadHumidity = i2cnapidemo.ReadHumidity();
    this.ReadTemperatureF = i2cnapidemo.ReadTemperatureF();
  }

  // 开启定时器
  startWork() {
    this.intervalID = setInterval(() => {
      this.getValue();
    }, 500)
  }

  build() {
    Column() {
      Row() {
        Column() {
          Row() {
            // TextPicker组件选择Mps
            TextPicker({ range: this.Mps, selected: this.select1 })
              .onChange((value: string, index: number) => {
                console.info('Picker item changed, value: ' + value + ', index: ' + index)
                this.select1 = index;
              })
              .width('50%')
              .height('100%')
              .margin({
                bottom: 10
              })
              .id('Mps_TextPicker')

            // TextPicker组件选择刷新率
            TextPicker({ range: this.Repeatability, selected: this.select2 })
              .onChange((value: string, index: number) => {
                console.info('Picker item changed, value: ' + value + ', index: ' + index)
                this.select2 = index;
              })

              .margin({
                bottom: 10
              })
              .width('50%')
              .height('100%')
              .id('Repeatability_TextPicker')
          }
          .height('50%')
        }
        .width('50%')

        // 显示温湿度
        Column() {
          Text("摄氏度：" + this.ReadTemperatureC.toFixed(2) + "°C")
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .textAlign(TextAlign.Center)
            .id('TempC')
          Text("华氏度：" + this.ReadTemperatureF.toFixed(2) + "°F")
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .textAlign(TextAlign.Center)
            .id('TempF')
          Text("湿度：" + this.ReadHumidity.toFixed(2) + "%RH")
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .textAlign(TextAlign.Center)
            .id('Hum')
        }
        .width('50%')
      }
      .height('60%')

      // 显示使用说明
      Row() {
        Text(this.message)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .margin({
            bottom: 25
          })
      }

      // 按钮选项
      Row() {
        Button('启动/重启')
          .ButtonStyle()
          .margin({
            right: 40
          })
          .width('20%')
          .height('10%')
          .id('softReset_button')
          .onClick(() => {
            if (i2cnapidemo.ReadTemperatureC() <= 800) {
              i2cnapidemo.SoftReset();
              promptAction.showToast({
                message: "启动/重启成功", // 显示文本
                duration: 500, // 显示时长
                bottom: 100 // 距离底部的距离
              })
            }
            else {
              promptAction.showToast({
                message: "启动失败，请检查连线", // 显示文本
                duration: 1000, // 显示时长
                bottom: 100 // 距离底部的距离
              })
            }
          })

        Button('模式选择')
          .ButtonStyle()
          .margin({
            right: 70
          })
          .width('20%')
          .height('10%')
          .id('modeSet_button')
          .onClick(() => {
            this.handlePopup = !this.handlePopup
          })
          .bindPopup(this.handlePopup, {
            builder: this.popupBuilder,
            placementOnTop: true,
            showInSubWindow: false,
            onStateChange: (e) => {
              console.info(JSON.stringify(e.isVisible))
              if (!e.isVisible) {
                console.info("mps: " + this.Mps[this.select1]);
                console.info("rate: " + this.Repeatability[this.select2]);
                this.handlePopup = false
              }
            }
          })

        Button('获取')
          .ButtonStyle()
          .margin({
            right: 40
          })
          .width('16%')
          .height('10%')
          .id('getTemp_Button')
          .onClick(() => {
            if (i2cnapidemo.ReadTemperatureC() <= 800) {
              if(this.intervalID)
              {
                clearInterval(this.intervalID)
              }
              this.startWork();
              console.info(" i2cvalue " + this.ReadTemperatureC + "\n" + this.ReadHumidity + "\n" + this.ReadTemperatureF);
              promptAction.showToast({
                message: "获取成功", // 显示文本
                duration: 500, // 显示时长
                bottom: 100 // 距离底部的距离
              })
            }
            else {
              clearInterval(this.intervalID);
              promptAction.showToast({
                message: "获取失败，请检查连线", // 显示文本
                duration: 1000, // 显示时长
                bottom: 100 // 距离底部的距离
              })
            }
          })

        Button("返回")
          .ButtonStyle()
          .width('16%')
          .height('10%')// 返回按钮绑定onClick事件，点击按钮时返回到第一页
          .id('back_button')
          .onClick(() => {
            clearInterval(this.intervalID); // 销毁定时器
            router.back()
          })
      }
    }
  }
}
