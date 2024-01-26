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

import { commonButton } from './commonButton';
// @ts-ignore
import pwmtest from '@ohos.pwmtest';
import { CustomBatteryDialog } from './dialog';

@Component
export struct pwmButton {
  @State interface: number = 1;
  @State backColor: Color = Color.Red;
  @State btnName: string = "PWM_1";
  // 创建一个controller
  controller: CustomDialogController = new CustomDialogController({
    builder: CustomBatteryDialog({
      backColor: $backColor,
      title: "PWM",
      message: "舵机正转又反转说明合格。"
    }), // 弹框的构造器
    cancel: () => {
      console.log("cancel") // 点击蒙层的回调
    },
    autoCancel: true, // 允许点击蒙层关闭弹窗
    customStyle: true // 使用自定义样式
  });

  aboutToDisappear() {
    delete this.controller, // 删除dialogController
    this.controller = undefined // 将dialogController置空
  }

  aboutToAppear() {
    if (this.interface == 1) {
      this.interface = 0;
    }
    if (this.interface == 2) {
      this.btnName = "PWM_2";
    }
  }

  build() {
    commonButton({
      backColor: $backColor,
      btnName: $btnName,
    })
      .onClick(() => {
        this.controller.open();
        pwmtest.UM_pwm_test(this.interface, 2500000);
        setTimeout(() => {
          pwmtest.UM_pwm_test(this.interface, 500000);
        }, 1000)
      })
  }
}