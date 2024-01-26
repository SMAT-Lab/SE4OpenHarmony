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
import i2cnapi from '@ohos.i2cnapi';

@Component
export struct i2cButton {
  @State backColor: Color = Color.Red;
  @State btnName: string = "I2C";
  private intervalID;

  aboutToDisappear() {
    clearInterval(this.intervalID);
  }

  aboutToAppear() {
    this.intervalID = setInterval(() => {
      i2cnapi.UM_i2c_40Pin_test().then((data) => {
        if (data == 1) {
          this.backColor = Color.Green
          clearInterval(this.intervalID);
        }
      })
    }, 1000);

  }

  build() {
    commonButton({
      backColor: $backColor,
      btnName: $btnName,
    })
  }
}