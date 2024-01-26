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
import adc_napi from '@ohos.adc'
import audio from '@ohos.multimedia.audio'; // 导入audio模块
import inputDevice from '@ohos.multimodalInput.inputDevice';
import Logger from '../../../utils/Logger';

const TAG = '[headsetInButton]';

@Component
export struct headsetInButton {
  @State backColor: Color = Color.Red;
  @State btnName: string = "耳机接入";
  private intervalID;
  private audioManager = audio.getAudioManager(); // 需要先创建AudioManager实例

  private audioRoutingManager = this.audioManager.getRoutingManager(); // 再调用AudioManager的方法创建AudioRoutingManager实例


  aboutToDisappear() {
    clearInterval(this.intervalID);
  }

  aboutToAppear() {
    this.intervalID = setInterval(() => {
      // 传入3表示测试耳机接入
      adc_napi.UM_adc_test(3).then((ret) => {
        if (ret == 1) {
          this.backColor = Color.Green;
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