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
import display from '@ohos.display';
import { TitleBar } from '../../common/TitleBar'
import Logger from '../../model/Logger';

@Entry
@Component
export struct gradient {
  @State myAngle: number = 90;
  @State windowWidth: number = 0;
  @State windowHeight: number = 0;
  @State gradientType: number = 0;
  @State isTestTime: boolean = true;
  private intervalID;
  private colorWhite: number = 0xffffff;
  private colorBlack: number = 0x000000;

  aboutToDisappear() {
    clearInterval(this.intervalID);
  }

  async aboutToAppear() {
    let displayClass = null;
    try {
      displayClass = display.getDefaultDisplaySync();
      this.windowWidth = displayClass.width;
      this.windowHeight = displayClass.height;
    } catch (exception) {
      console.error('Failed to obtain the default display object. Code: ' + JSON.stringify(exception));
    }
    this.intervalID = setInterval(() => {
      switch (this.myAngle) {
        case 360:
          this.myAngle = 225;
          break;
        case 225:
          this.myAngle = 45;
          break;
        case 45:
          if (this.gradientType != 2) {
            this.gradientType++;
          }
          else {
            this.gradientType = 0;
            this.myAngle = 90;
          }
          break;
        default:
          this.myAngle = this.myAngle + 90;break;
      }

    }, 2000);

  }

  build() {
    Column() {
      TitleBar({ title: '灰度测试' })
        .visibility(this.isTestTime ? Visibility.None : Visibility.Visible)
      if (this.gradientType == 0) {
        Column() {
        }
        .linearGradient({
          angle: this.myAngle,
          colors: [[this.colorWhite, 0.0], [this.colorBlack, 1.0]]
        })
        .width('100%')
        .height('100%')
      }
      else {
        Column() {
        }
        .width('100%')
        .height('100%')
        .radialGradient({
          center: [this.windowWidth / 2, this.windowHeight / 2],
          radius: Math.max(this.windowWidth, this.windowHeight) / 2,
          colors: [[this.gradientType == 1 ? this.colorWhite : this.colorBlack, 0.0], [this.gradientType == 1 ? this.colorBlack : this.colorWhite, 1.0]]
        })
      }
    }
    .onClick(() => {
      this.isTestTime = true;
    })
    .gesture(
      PinchGesture({ fingers: 5 })
        .onActionEnd(() => {
          this.isTestTime = false;
        })
    )
  }
}
