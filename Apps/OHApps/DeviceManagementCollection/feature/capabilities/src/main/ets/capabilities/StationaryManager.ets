/*
 * Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
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
 */

import stationary from '@ohos.stationary';
import { ColumnOperation } from '../components/ColumnOperation';

@Component
export struct StationaryManager {
  @State result: string = '';

  build() {
    Scroll() {
      Column() {
        Row() {
          Text(this.result)
            .fontWeight(FontWeight.Medium)
            .fontSize(20)
        }
        .alignItems(VerticalAlign.Top)
        .width('100%')
        .backgroundColor($r("app.color.white"))
        .height(160)
        .padding(16)
        .borderRadius(20)
        .margin({ top: 16 })
        ColumnOperation({ operationRes: $r('app.strarray.stationary_operations'), doOperation: this.doOperation })
      }
      .width('100%')
      .padding(4)
    }
    .scrollBar(BarState.Off)
  }

  doOperation = async (index: number) => {
    switch (index) {
      case 0:
        try {
          stationary.on('still', stationary.ActivityEvent.ENTER_EXIT, 3, (data) => {
            this.result = `on still success:${JSON.stringify(data)}`;
          })
          this.result = ``;
        } catch (err) {
          this.result = `on still fail:${JSON.stringify(err)}`;
        }
        break
      case 1:
        try {
          stationary.off('still', stationary.ActivityEvent.ENTER_EXIT, (data) => {
            this.result = `off still success:${JSON.stringify(data)}`;
          })
          this.result = ``;
        } catch (err) {
          this.result = `off still fail:${JSON.stringify(err)}`;
        }
        break
      case 2:
        try {
          stationary.once('still', (data) => {
            this.result = `once still success:${JSON.stringify(data)}`;
          })
        } catch (err) {
          this.result = `once still fail:${JSON.stringify(err)}`;
        }
        break
      default:
        break
    }
  }
}