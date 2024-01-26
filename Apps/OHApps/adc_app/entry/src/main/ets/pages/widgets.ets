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

import adc_napi from '@ohos.adc_napi';
import prompt from '@ohos.prompt';
import Notification from '@ohos.notification';

@Component
export struct value_text {
  @Link adc_value: number ;
  @Link temperature: number ;

  build() {
    Column() {
      Text("adc数值：" + this.adc_value)
        .fontSize(40)
        .fontWeight(FontWeight.Bold)
        .id("adc_value")
      Text("温度：" + this.temperature.toFixed(1) + "°C") // toFixed(1) 浮点数保留一位小数
        .fontSize(40)
        .fontWeight(FontWeight.Bold)
        .id("Temp_value")
    }
  }
}

@Component
export struct get_value_button {
  @Link adc_value: number ;
  @Link temperature: number ;
  private idNum: number = 123456;
  private error: string = "";

  build() {
    Column() {
      Button() {
        Text('获取')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontStyle(FontStyle.Italic)
      }
      .type(ButtonType.Capsule)
      .margin({
        top: 20
      })
      .backgroundColor('#0D9FFB')
      .width('20%')
      .height('10%')
      .id("get_adc_button")
      .onClick(() => {
        this.get_adc_value();
      })
    }
  }

  private get_adc_value() {
    let get_value = adc_napi.sync_get_adc_value();
    if (get_value < 0) {
      this.require_permission();
    }
    else if (get_value <= 800 && get_value >= 500) {
      this.adc_value = get_value;
      this.temperature = this.adc_value * 0.042;
      prompt.showToast({
        message: "获取成功", // 显示文本
        duration: 500, // 显示时长
        bottom: 200 // 距离底部的距离
      })
    }
    else {
      prompt.showToast({
        message: "获取失败，请检查连线", // 显示文本
        duration: 1000, // 显示时长
        bottom: 200 // 距离底部的距离
      })
    }
    this.publish_notification();
  }

  private require_permission() {
    if (adc_napi.sync_get_permission() == (-1)) {
      prompt.showToast({
        message: "修改权限失败，请运行sample_server", // 显示文本
        duration: 500, // 显示时长
        bottom: 200 // 距离底部的距离
      })
    }
    else {
      prompt.showToast({
        message: "修改权限成功", // 显示文本
        duration: 500, // 显示时长
        bottom: 200 // 距离底部的距离
      })
    }
  }

  private publish_notification() {
    console.log("publish")
    let contentType = Notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT;
    Notification.publish({
      content: {
        contentType: contentType,
        normal: {
          title: "",
          text: "adc数值：" + this.adc_value + "  " + "温度：" + this.temperature.toFixed(1) + "°C",
        }
      },
      id: this.idNum,
      color: 0xff0000,
      colorEnabled: true,
      label: "测试标签" + this.idNum,
      badgeIconStyle: 20
    }, (error) => {
      if (error) {
        this.error = JSON.stringify(error);
      } else {
        this.idNum++;
        prompt.showToast({
          message: "发送成功"
        })
      }
    })
  }
}

@Component
export struct value_QRcode {
  @Link adc_value: number ;
  @Link temperature: number ;
  @Link visual: number ;

  build() {
    Column() {
      QRCode("adc数值：" + this.adc_value + "\n" +
      "温度：" + this.temperature.toFixed(1) + "°C")
        .id("QRCode")
        .width(100)
        .visibility(this.visual);
    }
  }
}

@Component
export struct show_switch {
  @Link visual: number ;

  build() {
    Column() {
      Toggle({ type: ToggleType.Switch, isOn: Boolean(1 - this.visual) })
        .onChange((isOn) => {
          this.visual = 1 - this.visual;
        })
        .id("Toggle")
    }
  }
}