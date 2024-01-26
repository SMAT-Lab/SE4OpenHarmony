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

import { Metadata } from '@ohos/metadata-extractor';
import { AdobeJpegReader } from '@ohos/metadata-extractor'
import { SequentialByteArrayReader } from '@ohos/metadata-extractor'
import { FileUtil } from '@ohos/metadata-extractor'
import {GlobalContext} from './GlobalContext'

let fileDir:string;

@Entry
@Component
struct AdobeJpeg {
  @State isVisibility: Visibility = Visibility.Hidden
  @State data: Array<string> = []

  private getMetaData() {
    fileDir = GlobalContext.getContext().getValue("filesDir") as string;
    let path = fileDir.concat("/adobeJpeg1.jpg.appe")
    try {
      let metadata = new  Metadata()
      new AdobeJpegReader().extract(new SequentialByteArrayReader(FileUtil.readBytes(path)), metadata);
      for (let directory of metadata.getDirectories()) {
        for (let tag of directory.getTags()) {
          let tagName = tag.getTagName()
          let description = tag.getDescription()
          this.data.push("[" + tagName + "] " + tagName + " = " + description)
        }
      }
    } catch (err) {
      console.error("metadata error..")
    }

  }

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start }) {
      Column() {

        Text("提取AdobeJpegReader元数据")
          .fontSize(25)
          .fontColor(Color.Gray)
          .padding(20)
          .height("10%")
          .textAlign(TextAlign.Center)

        Text("资源路径:/resource/adobeJpeg1.jpg.appe").fontSize(22).width('100%')
          .textAlign(TextAlign.Start)

        Column() {
          Text("元数据:").fontSize(20).width('100%')
            .textAlign(TextAlign.Start)
          Text("" + JSON.stringify(this.data)).fontSize(20).width('100%')
            .textAlign(TextAlign.Start)
            .visibility(this.isVisibility)
        }.height("80%").padding({ bottom: 10 })

        Button("显示AdobeJpeg文件的元数据", { type: ButtonType.Normal, stateEffect: true })
          .borderRadius(8).width("70%").height("8%")
          .onClick(() => {
            this.getMetaData()
            this.isVisibility = Visibility.Visible
          })

      }.height("100%")
    }.padding(16)
    .width('100%')
    .height("100%")
  }
}