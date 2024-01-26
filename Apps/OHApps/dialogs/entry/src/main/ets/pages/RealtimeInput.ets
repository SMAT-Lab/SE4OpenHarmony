/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { InputAttributeModel, RealtimeInputPopup } from '@ohos/dialogs'

@Entry
@Component
struct RealtimeInput {
  private allData: string[] = ['abc', 'bcd', 'cde', 'def', 'efg', 'fgh', 'ghi', 'hij', 'ijk', 'jkl', 'bcd', 'cde', 'def', 'efg', 'fgh', 'ghi', 'hij', 'ijk', 'jkl']
  @State model: InputAttributeModel = new InputAttributeModel()
  @State @Watch('onChange') inputVal: string = ''

  onChange() {
    this.model.dataList = this.allData.filter(data => (data.indexOf(this.inputVal) != -1))
  }

  aboutToAppear() {
    this.model.setInputWidth(150)
  }

  build() {
    Column() {
      RealtimeInputPopup({ model: this.model, inputVal: this.inputVal })
    }
  }
}