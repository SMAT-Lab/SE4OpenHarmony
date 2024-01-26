/*
Copyright (c) 2022 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import {Metadata} from '@ohos/metadata-extractor';
import {ImageMetadataReader} from '@ohos/metadata-extractor'
import {GlobalContext} from './GlobalContext'

let fileDir:string;
@Entry
@Component
struct PsdSample{
  @State isVisibility: Visibility = Visibility.Hidden
  @State data: string[]= []
  scroller: Scroller = new Scroller()

  private getMetaData() {
    fileDir = GlobalContext.getContext().getValue("filesDir") as string;
    let path = fileDir.concat("/8x4x8bit-Grayscale.psd")
      this.data.splice(0,this.data.length)
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
      console.info("psd sample meta all:"+JSON.stringify(this.data))
    } catch (err) {
      console.error("metadata error..")
    }


  }

  build() {

    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start }) {
      Text("提取Psd元数据").fontSize(25).fontColor(Color.Gray)
        .padding({ left:10,right:10,top:10,bottom:10 })
        .textAlign(TextAlign.Center)

      Text("资源路径:/resource/8x4x8bit-Grayscale.psd" ).fontSize(22).width('100%')
        .textAlign(TextAlign.Start)
      Text("元数据:" ).fontSize(20).width('100%')
        .textAlign(TextAlign.Start)
      Scroll(this.scroller) {
        Column() {
          Text("" + JSON.stringify(this.data)).fontSize(20).width('100%')
            .textAlign(TextAlign.Start)
            .visibility(this.isVisibility)
        }
      }.scrollable(ScrollDirection.Vertical).scrollBar(BarState.On)
      .scrollBarColor(Color.Gray).scrollBarWidth(1).height('80%')


      Button("显示Psd文件的元数据", { type: ButtonType.Normal, stateEffect: true })
        .borderRadius(8).width("100%").height(60)
        .onClick(() => {
          this.getMetaData()
          this.isVisibility = Visibility.Visible
        })
    }.padding(16)
    .width('100%')
    .height("100%")
  }
}