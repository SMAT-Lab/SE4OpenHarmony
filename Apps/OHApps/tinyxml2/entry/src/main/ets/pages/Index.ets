/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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

import hilog from '@ohos.hilog';
import testNapi from 'libentry.so'

@Entry
@Component
struct Index {
  @State message: string = "<?xml version=\"1.0\"?>"+
  "<!DOCTYPE PLAY SYSTEM \"play.dtd\">"+
  "<PLAY>"+
  "<TITLE>A Midsummer Night's Dream</TITLE>"+
  "</PLAY>"
  @State resoult: string = ''

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            hilog.info(0x0000, 'testTag', 'tinyxml2 = %{public}s', testNapi.GetText());
          })

        Button() {
          Text('从字符串中解析xml')
            .fontSize(40)
            .fontWeight(FontWeight.Bold)
            .fontColor(Color.White)
            .maxLines(1)
            .textAlign(TextAlign.Center)
        }
        .backgroundColor(Color.Blue)
        .width("100%")
        .onClick(() => {
          this.test()
        })

        Text('解析结果：title标签的text = '+ this.resoult.toString())
          .fontSize(40)
          .fontWeight(FontWeight.Bold)
          .fontColor(Color.Black)
          .textAlign(TextAlign.Center)
      }
      .width('100%')
    }
    .height('100%')
  }

  test(){
    this.resoult = testNapi.GetText()
    hilog.info(0x0000, 'testTag', 'tinyxml2 = %{public}s', this.resoult);
  }
}
