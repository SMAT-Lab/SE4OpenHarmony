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

import router from '@ohos.router'
import { NewKey } from '../common/NewKey'
import { OldKey } from '../common/OldKey'
import { MinAccessControl } from  '../common/MinAccessControl'
import { Flag } from '../pages/Index'

@Entry
@Component
struct SelectPage {
  @State Params: number = Flag.value;
  @Builder NavigationTitle() {
    Column() {
    }
    .alignItems(HorizontalAlign.Start)
  }

  build() {
    Column() {
      Navigation() {
        if (this.Params === 1) {
          NewKey()
        } else if (this.Params === 2) {
          OldKey()
        } else {
          MinAccessControl()
        }
      }
      .title({ builder: this.NavigationTitle, height: 56 })
      .titleMode(NavigationTitleMode.Mini)
      .hideTitleBar(false)
      .hideToolBar(true)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F1F1F1')
  }
}