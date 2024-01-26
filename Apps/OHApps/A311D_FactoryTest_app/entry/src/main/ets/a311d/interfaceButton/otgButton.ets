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
import otgtest from '@ohos.otgtest'

@Component
export struct otgButton {
  @State backColor: Color = Color.Red;
  @State btnName: string = "OTG";

  build() {
    commonButton({
      backColor: $backColor,
      btnName: $btnName,
    })
      .onClick(() => {
        otgtest.UM_otg_test().then((data) => {
          if (data == 1) {
            this.backColor = Color.Green
          }
        })
      })
  }
}