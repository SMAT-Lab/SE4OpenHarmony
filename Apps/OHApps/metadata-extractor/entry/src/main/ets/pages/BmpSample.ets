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

import { BmpHeaderDirectory } from '@ohos/metadata-extractor';
import {Metadata} from '@ohos/metadata-extractor';
import {ImageMetadataReader} from '@ohos/metadata-extractor'
import {GlobalContext} from './GlobalContext'

let fileDir:string;
@Entry
@Component
struct BmpSample {
  @State isVisibility: Visibility = Visibility.Hidden
  @State data: Array<string> = [""]

  private getMetaData() {
    this.data.splice(0,this.data.length)
    fileDir = GlobalContext.getContext().getValue("filesDir") as string;
    let path = fileDir.concat("/Test_01.bmp")

    try {
      let metadata: Metadata = ImageMetadataReader.readMetadata(path)
      // iterate over the metadata and print to System.out

      metadata.getDirectories().forEach((value:ESObject,vlue2:ESObject,mataSet:ESObject)=>{
        let directoryName:string = value.getName()
        value.getTags().forEach((tag:ESObject,vlue2:ESObject,mataSet:ESObject)=>{
          let tagName:string = tag.getTagName()
          let description:string = tag.getDescription()
          this.data.push("[" + directoryName + "] " + tagName + " = " + description)
        })
      })
    } catch (err) {
      console.error("metadata error..")
    }

  }

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start }) {
      Column() {

        Text("提取Bmp元数据").fontSize(25).fontColor(Color.Gray)
          .padding(20).height("10%")
          .textAlign(TextAlign.Center)

        Text("资源路径:/resource/Test_01.bmp" ).fontSize(22).width('100%')
          .textAlign(TextAlign.Start)

        Column() {
          Text("元数据:" ).fontSize(20).width('100%')
            .textAlign(TextAlign.Start)
          Text("" + JSON.stringify(this.data)).fontSize(20).width('100%')
            .textAlign(TextAlign.Start)
            .visibility(this.isVisibility)
        }.height("80%").padding({ bottom: 10 })

        Button("显示Bmp文件的元数据", { type: ButtonType.Normal, stateEffect: true })
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