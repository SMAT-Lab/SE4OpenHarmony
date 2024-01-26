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

import { BottomScrollDialog } from '@ohos/dialogs'
import { InputCustomDialog } from '../components/InputCustomDialog'

@Entry
@Component
struct BottomScrollDialogExample {
  @State arr: string[] = ["这是一个自定义Bottom类型的评论弹框！",
    "这是一个自定义Bottom类型的评论弹框！",
    "这是一个自定义Bottom类型的评论弹框！",
    "这是一个自定义Bottom类型的评论弹框！",
    "这是一个自定义Bottom类型的评论弹框！",
    "这是一个自定义Bottom类型的评论弹框！",
    "这是一个自定义Bottom类型的评论弹框！"]
  @Builder ListDataComponent(item:Object, itemIndex:number) {
    Column() {
      RelativeContainer(){
        Image($r("app.media.test1"))
          .width(55)
          .height(55)
          .margin({right:12})
          .alignRules({
            top: {anchor: "__container__", align: VerticalAlign.Top},
            left: {anchor: "__container__", align: HorizontalAlign.Start}
          })
          .id("avatar")
        Text("评论人" + itemIndex.toString()).fontColor('#111')
          .fontSize(17)
          .alignRules({left:{anchor:"avatar",align:HorizontalAlign.End}})
          .id("name")
        Text(item.toString()).fontColor('#888').fontSize(15).margin({top:8})
          .textOverflow({overflow:TextOverflow.MARQUEE})
          .maxLines(100)
          .alignRules({left:{anchor:"avatar",align:HorizontalAlign.End},top:{anchor:"name",align:VerticalAlign.Bottom}})
          .id("comment")
        Column(){
          Button("删除").backgroundColor("#ddd").width(150).height(36)
            .onClick(() => {
              this.arr.splice(itemIndex, 1)
            })
        }.width('100%').margin({top:10})
        .alignRules({
          top:{anchor:"comment",align:VerticalAlign.Bottom}})
        .alignItems(HorizontalAlign.Center).id("row2")
      }.padding(12)
    }.backgroundColor(0xFFFFFF).borderRadius(15).height('25%')
  }
  dialogInput = new CustomDialogController({
    builder: InputCustomDialog({
      onButtonClick: (value:string) => {
        this.arr.splice(0,0, value)
      }
    }),
    customStyle: true,
    autoCancel: true,
    alignment: DialogAlignment.Center,
    offset: { dx: 0, dy: 0 },
  })

  dialogController:CustomDialogController = new CustomDialogController({
    builder: BottomScrollDialog({
      customComponent: (item:Object, itemIndex:number) => {
        this.ListDataComponent(item, itemIndex);
      },
      arr: this.arr,
      dialogInput : this.dialogInput,
    }),
    customStyle: true,
    autoCancel: true,
    alignment: DialogAlignment.Center,
    offset: { dx: 0, dy: 0 },
  })
  aboutToAppear(){

  }
  build() {
      Column() {
        Button("显示自定义Bottom弹窗(自带拖拽交互)").onClick(() => {
          this.dialogController.open()
        })
      }
      .width('100%')
  }
}