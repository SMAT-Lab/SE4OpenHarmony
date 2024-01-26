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
import gpiotest from '@ohos.gpiotest';


@Component
export struct keyButton {
  // interface:1，表示是电源键 interface:2，表示是升级键
  @State interface: number = 1;
  @State backColor: Color = Color.Red;
  @State btnName: string = "电源键";
  private intervalID;

  aboutToDisappear() {
    clearInterval(this.intervalID);
  }

  aboutToAppear() {
    if (this.interface == 1) {
      this.intervalID = setInterval(() => {
        gpiotest.UM_power_test().then((ret) => {
          if (ret == 1) {
            this.backColor = Color.Green;
            clearInterval(this.intervalID);
          }
        });
      }, 1000);
    }
    else if (this.interface == 2) {
      this.btnName = "升级键";
      this.intervalID = setInterval(() => {
        gpiotest.UM_update_test().then((ret) => {
          if (ret == 1) {
            this.backColor = Color.Green;
            clearInterval(this.intervalID);
          }
        });
      }, 1000);
    }
  }

  build() {
    Column() {
      commonButton({
        backColor: $backColor,
        btnName: $btnName,
      })
    }
  }
}