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

import settings from '@ohos.settings';
import { ColumnOperation } from '../components/ColumnOperation';
import { getString } from '@ohos/common';

@Component
export struct SettingsManager {
  @State result: string = '';
  private enableAirplane: boolean = false;

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
        ColumnOperation({ operationRes: $r('app.strarray.settings_operations'), doOperation: this.doOperation })
      }
      .width('100%')
      .padding(4)
    }
    .scrollBar(BarState.Off)
  }

  doOperation = async (index: number) => {
    switch (index) {
      case 0:
        let uri = settings.getUriSync(settings.display.SCREEN_BRIGHTNESS_STATUS);
        this.result = `${uri}`;
        break
      case 1:
        try {
          this.enableAirplane = !this.enableAirplane;
          settings.enableAirplaneMode(this.enableAirplane, () => {
            this.result = `${getString($r('app.string.airplane_status'))}${this.enableAirplane}`;
          })
        } catch (err) {
          this.result = `${getString($r('app.string.airplane_status'))}error:${JSON.stringify(err)}`;
        }
        break
      case 2:
        try {
          let res = await settings.canShowFloating();
          this.result = `${getString($r('app.string.show_floating_status'))}${res}`;
        } catch (err) {
          this.result = `${getString($r('app.string.show_floating_status'))}error: ${JSON.stringify(err)}`;
        }
        break
      default:
        break
    }
  }
}