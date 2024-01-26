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

import { ProvideFatherComponent } from './ProvideFatherComponent';
import { StateFatherComponent } from './StateFatherComponent';

@Component
export struct BrotherComponentSyncCode {

  build() {
    Column() {
      Column() {
        Text($r('app.string.realize_by_state_link'))
          .fontSize($r('app.float.tips_font_size'))
          .width('100%')
          .textAlign(TextAlign.Start)
        // 共同父组件@State
        StateFatherComponent()
      }

      Column() {
        Text($r('app.string.realize_by_provide_consume'))
          .fontSize($r('app.float.tips_font_size'))
          .width('100%')
          .textAlign(TextAlign.Start)
        // 共同父组件@Provide
        ProvideFatherComponent()
      }
      .margin({ top: 10 })
    }
  }
}