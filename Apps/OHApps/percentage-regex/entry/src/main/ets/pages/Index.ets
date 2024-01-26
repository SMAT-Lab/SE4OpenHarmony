/**
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
import percentageRegex from 'percentage-regex';
import prompt from '@ohos.promptAction';

interface dataType {
  str: string,
  str1: string,
  mode: number
}

interface exactType {
  exact: boolean
}

let exactData1: exactType = { exact: true }
let exactData2: exactType = { exact: false }

@Entry
@Component
struct Index {
  @State strArray: Array<string> | null = []
  @State data: Array<dataType> = [
    { str: "检查字符串是否是百分数", str1: "80%", mode: 1 },
    { str: "匹配字符串中的百分数", str1: "weafdz 80% dawedafa", mode: 2 }
  ]

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Start }) {
      List({ space: 20, initialIndex: 0 }) {
        ForEach(this.data, (item: dataType, index?: number) => {
          ListItem() {
            Column() {
              Text(item.str)
                .fontSize(16)
                .margin({ top: 5 })
              TextInput({ text: item.str1, placeholder: '请输入字符串' })
                .height(60)
                .fontSize(18)
                .onChange((value: string) => {
                  item.str1 = value
                })
              Button('验证', { type: ButtonType.Normal })
                .fontSize(18)
                .fontColor('#000')
                .height(60)
                .width(300)
                .margin({ top: 20 })
                .backgroundColor('#12939f')
                .onClick(() => {
                  if (item.mode == 1) {
                    let result: boolean = percentageRegex(exactData1).test(item.str1)
                    prompt.showToast({ message: result.toString(), duration: 3000 })
                  } else {
                    this.strArray = item.str1.match(percentageRegex(exactData2))
                  }
                })
              if (item.mode == 2) {
                Text(JSON.stringify(this.strArray))
                  .fontSize(16)
                  .margin({ top: 5 })
              }
            }
          }
        })
      }
    }
  }
}