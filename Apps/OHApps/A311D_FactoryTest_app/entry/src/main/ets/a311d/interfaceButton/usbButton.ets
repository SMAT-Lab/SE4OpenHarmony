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
import usbtest from '@ohos.usbtest';
import prompt from '@ohos.prompt';

@Component
export struct usbButton {
  // interface:1，表示是USB2_1 interface:2，表示是USB2_2  interface:3，表示是USB2_3 interface:4，表示是USB3.0
  @State interface: number = 1;
  @State backColor: Color = Color.Red;
  @State btnName: string = "USB2_1";
  private intervalID;

  aboutToDisappear() {
    clearInterval(this.intervalID);
  }

  aboutToAppear() {
    switch (this.interface) {
      case 1:
        this.btnName = "USB2_1";
        break;
      case 2:
        this.btnName = "USB2_2";
        break;
      case 3:
        this.btnName = "USB2_3";
        break;
      default:
        this.btnName = "USB3.0";
        break;
    }
    this.intervalID = setInterval(() => {
      usbtest.UM_usb_test(this.interface).then((ret) => {
        if (ret == 1) {
          this.backColor = Color.Green;
          clearInterval(this.intervalID);
        }
      });
    }, 1000);
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