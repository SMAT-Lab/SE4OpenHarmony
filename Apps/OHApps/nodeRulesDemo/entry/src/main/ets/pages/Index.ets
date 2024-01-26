/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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

import router from '@ohos.router';

interface Item{
  name:string
  path:string
}

@Entry
@Component
struct Index {
  public data: Item[] = [
    { name: "SimpleRule", path: "pages/SimpleRule" },
    { name: "MultipleRules", path: "pages/MultipleRules" },
    { name: "CascadingRules", path: "pages/CascadingRules" },
    { name: "PrioritizedRules", path: "pages/PrioritizedRules" },
    { name: "RecurssionWithRules", path: "pages/RecurssionWithRules" },
    { name: "MoreRulesAndFacts", path: "pages/MoreRulesAndFacts" }
  ]

  @Builder
  BuildEntryItem(item: Item) {
    Text(item.name)
      .width("90%")
      .height(50)
      .backgroundColor(0xCCCCCC)
      .borderRadius(15)
      .fontSize(16)
      .textAlign(TextAlign.Center)
      .margin({ top: 10 })
      .onClick(() => {
        router.pushUrl({ url: item.path })
      })
  }

  build() {
    Row() {
      Column() {
        ForEach(this.data, (v: Item) => {
          this.BuildEntryItem(v);
        })
      }
      .width('100%')
    }
    .height('100%')
  }
}