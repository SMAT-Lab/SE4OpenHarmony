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

import { listSelectModel } from '../model/listSelectModel'
class obj  {
  name: string =''
  id: number = 0
  isSelect: boolean = false
}
@CustomDialog
export struct ListSelectDialog {
  controller: CustomDialogController
  @State model: listSelectModel = new listSelectModel()
  /**
   * 列表数据
   *
   */
  arrList: obj[] = []
  /**
   * 选中数据
   *
   */
  @State changeData:object[]=[]

  scroller: Scroller = new Scroller()

  aboutToAppear(){
    if(this.arrList) {
      this.arrList.forEach(item => {
        if(item.isSelect ){
          this.changeData.push(item)
        }
      })
    }
  }

  build() {
    Column(){
      Text(this.model.title)
        .fontSize(this.model.titleFontSize)
        .margin(this.model.titleMargin)
        .width(this.model.titleWight)
        .height(this.model.titleHeight)
        .fontColor(this.model.titleFontColor)
        .border(this.model.titleBorder)
        .textAlign(this.model.titleTextAlign)
      List({ initialIndex:0 }){
        ForEach(this.arrList,(item:obj,index:number) => {
          ListItem() {
            Flex({justifyContent: FlexAlign.SpaceBetween,alignItems:ItemAlign.Center}){
              Text(item.name)
                .width('100%')
                .fontColor(this.model.listTextFontColor)
                .textAlign(this.model.selectMode == 'normal' ? this.model.listTextAlign : this.model.listSelectTextAlign)
                .fontSize(this.model.listTextFontSize)
              if(this.model.selectMode == 'radio') {
                Radio({ value: item.name, group: 'radioGroup' }).checked(item.isSelect)
                  .height(this.model.selectBoxSize)
                  .width(this.model.selectBoxSize)
                  .onChange((isChecked: boolean) => {
                    this.changeData = [item]
                    this.controller.close()
                    if(this.model.confirm != undefined) {
                      this.model.confirm(this.changeData)
                    }
                  })
              }
              if(this.model.selectMode == 'checkbox'){
                Checkbox({ name: item.name, group: 'checkboxGroup'})
                  .select(item.isSelect)
                  .selectedColor(this.model.boxSelectedColor)
                  .width(this.model.selectBoxSize)
                  .height(this.model.selectBoxSize)
                  .onChange((value: boolean) => {
                    if(value) {
                      item.isSelect = true
                      this.changeData.push(item)
                    }else{
                      item.isSelect = false
                      this.changeData.push(item)
                    }
                  })
              }

            }

          }
          .height(this.model.listItemHeight)
          .padding(this.model.listItemPadding)
          .border(this.model.listItemBorder)
        })
      }
      .width('100%')
      .height(this.model.listHeight)
      .listDirection(this.model.listDirection) // 排列方向
      .scrollBar(this.model.listScrollBar)
      .edgeEffect(this.model.listEdgeEffect) // 滑动到边缘无效果
      .padding(this.model.listPadding)
      if(this.model.isDisplayBtn) {
        Column(){
          //alignItems: ItemAlign.Auto
          Flex({direction: FlexDirection.Row}) {
            Button(this.model.cancelBtnTitle,{ type: this.model.btnType })
              .fontColor(this.model.cancelBtnFontColor)
              .fontSize(this.model.btnFontSize)
              .backgroundColor(this.model.cancelBtnBgColor)
              // .width(this.model.btnWidth)
              .width(this.model.btnWidth)
              .height(this.model.btnHeight)
              .border(this.model.btnBorder)
              .onClick(() =>{
                this.controller.close()
                if(this.model.cancel != undefined) {
                  this.model.cancel()
                }
              })
              .borderRadius(this.model.cancelBtnBorderRadius)
            Button(this.model.confirmBtnTitle,{ type: this.model.btnType })
              .fontColor(this.model.contentFontColor)
              .fontSize(this.model.btnFontSize)
              .backgroundColor(this.model.confirmBtnBgColor)
              .width(this.model.btnWidth)
              .height(this.model.btnHeight)
              .onClick(() =>{
                this.controller.close()
                if(this.model.confirm != undefined) {
                  this.model.confirm(this.changeData)
                }
              })
              .borderRadius(this.model.confirmBtnBorderRadius)
          }
        }.width(this.model.btnContentWidth)
        .margin(this.model.btnContentMargin)
        .border(this.model.btnContentBorder)
      }
    }
    .width(this.model.dialogWidth)
    .backgroundColor(this.model.dialogBgColor)
    .borderRadius(this.model.dialogBorderRadius)
  }
}