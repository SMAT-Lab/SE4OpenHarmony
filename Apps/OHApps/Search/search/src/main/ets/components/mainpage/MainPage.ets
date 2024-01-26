/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

@Component
export struct MainPage {
  @Link textInfo: string
  private controller: SearchController = new SearchController()
  customizeFunction: () => void = () => {}

  build() {
    Column() {
      Search({ value: this.textInfo, placeholder: 'Input to search', controller: this.controller })
        .searchButton('Search')
        .width('95%')
        .height(40)
        .textFont({ size: 25, weight: FontWeight.Bold })
        .placeholderFont({ size: 25, weight: FontWeight.Normal, style: FontStyle.Normal })
        .backgroundColor(Color.White)
        .placeholderColor(Color.Grey)
        .onSubmit((value: string) => {
          this.textInfo = value
          this.customizeFunction()
        })
        .onChange((value: string) => {
          this.textInfo = value
          this.customizeFunction()
        })
    }
    .margin({ top: 10, bottom: 10 })
  }
}
