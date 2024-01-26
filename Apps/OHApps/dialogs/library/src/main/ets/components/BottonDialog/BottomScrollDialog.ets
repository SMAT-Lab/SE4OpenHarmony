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

import { BaseMode } from '../model/BaseModel'
import inspector from '@ohos.arkui.inspector'

import componentUtils from '@ohos.arkui.componentUtils'

const TAG = 'BottomScrollDialog'
@CustomDialog
export struct BottomScrollDialog {
  scroller: Scroller = new Scroller()
  model: BaseMode = new BaseMode()
  @Link arr: string[]   // 列表数据
  @Prop dialogTitle: string = "全部评论" // 列表标题
  @Prop inputTextPlaceholder: string = "请输入" // 输入框的提示语句
  @State dialogTitleFontSize: number = 20 // 标题字体大小
  @State scrollEmptyHeight: number = 20  // 控件内部使用，滑动控制
  scrollMinHeight: Length = '10%'
  scrollMaxHeight: Length = '78%'
  private closeDialogHeight = 78 // 控件内部使用，关闭界限
  private parentScrollHeight: number = 80 // 控件内部使用，scroll的高度
  @State init: boolean = true // 控件内部使用，用于初始化走手势逻辑
  @BuilderParam customComponent: (item:Object, itemIndex:number) => void // 列表中的自定义控件
  private panOption: PanGestureOptions = new PanGestureOptions({ direction: PanDirection.Up | PanDirection.Down }) // 手势定义
  dialogInput: CustomDialogController // 输入框的控制对象
  controller: CustomDialogController  // 当选dialog控制对象
  listenerScrollColumn= inspector.createComponentObserver('scrollColumnId');
  aboutToDisappear() {
    this.listenerScrollColumn.off("draw")
    if (this.model.customCallback && this.model.customCallback.beforeDisappear) {
      this.model.customCallback.beforeDisappear();
    }
   
  }
  aboutToAppear() {
    this.listenerScrollColumn.on("draw",() => {
      let scrollIdPosition:componentUtils.ComponentInfo = componentUtils.getRectangleById("scrollId");
      let scrollColumnIdPosition:componentUtils.ComponentInfo = componentUtils.getRectangleById("scrollColumnId");
      let scrollColumnHeight:number = scrollColumnIdPosition.size.height;
      let Scroll_01_height:number = scrollIdPosition.size.height;
      if (scrollColumnHeight < Scroll_01_height) {
        console.log(TAG, "this.init: " + this.init )
        this.init = true
      }
    })

    if (this.model.customCallback && this.model.customCallback.beforeAppear) {
      this.model.customCallback.beforeAppear();
    }
  }

  build() {
    Column(){
      Column().width('100%').height((100 - this.parentScrollHeight) + '%').onClick(() => {
        if(this.controller != undefined) {
          this.controller.close()
        }
      })
      Scroll(this.scroller){
        Column(){
          Column(){
          }.width('100%').height(this.scrollEmptyHeight + '%').backgroundColor(Color.Transparent).onClick(() => {
            if(this.controller != undefined) {
              this.controller.close()
            }
          }).id("scrollEmpty")

          Column(){
            Text(this.dialogTitle).width('100%').fontSize(this.dialogTitleFontSize).height('100%').padding(20)
              .borderRadius({ topLeft:'20vp',topRight:'20vp' })
          }.width('100%').height('10%').backgroundColor(Color.White).id("Scroll_title")
          Scroll() {
            Column({space:20}) {
              if (this.arr) {
                ForEach(this.arr, (item:string, itemIndex:number) => {
                  if (this.customComponent != undefined) {
                    this.customComponent(item, itemIndex);
                  }
                }, (item:string)=> item)
              }
            }.width('100%').margin({"top":"5.00vp","right":"0.00vp","bottom":"5.00vp","left":"0.00vp"}).id("scrollColumnId")
          }.width('100%').constraintSize({minHeight: this.scrollMinHeight, maxHeight: this.scrollMaxHeight})
          .id("scrollId")
          .scrollable(ScrollDirection.Vertical)  // 滚动方向纵向
          .scrollBar(BarState.Off)  // 滚动条常驻显示
          .edgeEffect(EdgeEffect.None)
          .nestedScroll({scrollForward:NestedScrollMode.PARENT_FIRST, scrollBackward:NestedScrollMode.SELF_FIRST})
          if (this.dialogInput) {
            Column(){
              Text(this.inputTextPlaceholder).width('100%').fontSize(14).height('100%').backgroundColor(Color.White).padding(10).onClick(() => {
                this.dialogInput.open();
              }).margin({bottom:10})
            }.width('100%').height('12%').backgroundColor(Color.Green).padding(15)
          }
        }.width('100%').margin({bottom:40})
      }.parallelGesture( PanGesture(this.panOption)
        .onActionUpdate((event: GestureEvent) => {
          console.info(TAG, "eventy: " + event.offsetY + " scrollEmptyHeight: " + this.scrollEmptyHeight + " isInit: " + this.init)
          if (this.init) {
            if ((event.offsetY > 0) && (this.scrollEmptyHeight < this.closeDialogHeight)) {
              this.scrollEmptyHeight += 4
            } else if (event.offsetY < 0 && this.scrollEmptyHeight > 0) {
              let tmp = this.scrollEmptyHeight - 4;
              this.scrollEmptyHeight = tmp < 0 ? 0 : tmp
            }
            if ((this.scrollEmptyHeight > this.closeDialogHeight) ||
              (this.scrollEmptyHeight == this.closeDialogHeight)) {
              if(this.controller != undefined) {
                this.controller.close()
              }
            }
          }

        }), GestureMask.Normal)
      .onScroll((xOffset: number, yOffset: number) => {
        this.init = false
        console.info(TAG, "parent: " + xOffset + ' ' + yOffset + ' scrollEmptyHeight: ' + this.scrollEmptyHeight)
        if ((yOffset < 0) && (this.scrollEmptyHeight < this.closeDialogHeight)) {
          this.scrollEmptyHeight += 2
        }
      }).onScrollEdge((side: Edge) => {
        console.info(TAG,'To the edge side: ' + side)
        if (side == 0) {
          if(this.controller != undefined) {
            this.controller.close()
          }
        }
      })
      .width('100%').height(this.parentScrollHeight + '%')
      .scrollable(ScrollDirection.Vertical)
      .scrollBar(BarState.Off)
      .align(Alignment.Bottom)
    }.width('100%').height('100%')
    .backgroundColor(Color.Transparent)
    .onClick(() => {
      this.controller.close();
    })
  }
}