/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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

import { ColumnOperation } from '../components/ColumnOperation';
import { getString } from '@ohos/common';
import { PowerManagerUtil } from '../util/PowerManagerUtil';

@Component
export struct PowerManager {
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
        ColumnOperation({ operationRes: $r('app.strarray.power_operations'), doOperation: this.doOperation })
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
          let isActive = PowerManagerUtil.isActive();
          this.result = `${getString($r('app.string.screen_state'))}${isActive}`;
        } catch (err) {
          this.result = `isActive fail:${err}`;
        }
        break
      case 1:
        try {
          let modeName = await PowerManagerUtil.getPowerModeName();
          this.result = `${getString($r('app.string.power_mode'))}${modeName}`;
        } catch (err) {
          this.result = `getPowerModeName fail:${err}`;
        }
        break
      default:
        break
    }
  }
}