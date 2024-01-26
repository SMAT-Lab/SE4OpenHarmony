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

import { SideBarCustomDialog, SideBarModel } from '@ohos/dialogs'

@Entry
@Component
struct SideBarContainerExample {
  normalIcon: Resource = $r("app.media.icon")
  selectedIcon: Resource = $r("app.media.icon")
  @State arrRight: number[] = []
  @State textRight: string = '点击测试LIVEDATA'
  @State current: number = 1
  @State currentIndex: number = 0
  @State fontColor: string = '#fff'
  @State selectedFontColor: string = '#007DFF'
  @State text1: string = ''
  controller1: TextInputController = new TextInputController()
  @State text2: string = ''
  controller2: TextInputController = new TextInputController()

  @Builder TabBuilder(index: number, name: string) {
    Column() {
      Text(name)
        .fontColor(this.currentIndex === index ? this.selectedFontColor : this.fontColor)
        .fontSize(16)
        .fontWeight(this.currentIndex === index ? 400 : 300)
        .lineHeight(22)
        .margin({ top: 17, bottom: 7 })
      Divider()
        .strokeWidth(2)
        .color('#007DFF')
        .opacity(this.currentIndex === index ? 1 : 0)
    }.width(50)
  }

  private controller: TabsController = new TabsController()
  leftTitles = ['首页', '娱乐', '汽车', '八卦', '搞笑', '互联网']

  @Builder MySideBarComponentLeft() {

    Column() {
      Stack() {

      }
      .width('100%')
      .height(150)
      .backgroundColor('#444')

      Tabs({ barPosition: BarPosition.Start, controller: this.controller }) {

        ForEach(this.leftTitles, (item:Object, index:number) => {
          TabContent() {
            Column() {
              Text(`当前界面是：${item}`)
            }.width('100%').height('100%').backgroundColor(Color.White)
          }.tabBar(this.TabBuilder(index, `${item}`))
        })
      }
      .vertical(false)
      .scrollable(true)
      .barMode(BarMode.Scrollable)
      .barHeight(80)
      .animationDuration(400)
      .onChange((index: number) => {
        this.currentIndex = index;
        console.info(index.toString())
      })
      .fadingEdge(false)
      .barBackgroundColor('#444')
      .height('100%')
      .width('100%')

    }
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min)
  }

  @Builder MySideBarComponentRight() {

    Column() {
      Text(this.textRight)
        .width('100%')
        .height('10%')
        .textAlign(TextAlign.Center)
        .backgroundColor(Color.Gray)
        .onClick(() => {
          this.dialogControllerRight.close();
          let nextInputValue = this.getRandomInt(0, 10000);
          this.arrRight.unshift(nextInputValue)
          this.textRight = nextInputValue + ''
        })

      TextInput({ text: this.text1, placeholder: '输入框交互...', controller: this.controller1 })
        .placeholderColor(Color.Grey)
        .placeholderFont({ size: 14, weight: 400 })
        .caretColor(Color.Blue)
        .width('100%')
        .height('5%')
        .fontSize(14)
        .fontColor(Color.Black)
        .onChange((value: string) => {
          this.text1 = value
        })

      List({ space: 20, initialIndex: 0 }) {
        ForEach(this.arrRight, (item:number) => {
          ListItem() {
            Text('' + item)
              .width('100%')
              .height(50)
              .fontSize(16)
              .textAlign(TextAlign.Center)
              .borderRadius(10)
              .backgroundColor(0xFFFFFF)
          }
        }, (item:number )=> item.toString())
      }
      .listDirection(Axis.Vertical) // 排列方向
      .scrollBar(BarState.Off)
      .edgeEffect(EdgeEffect.None)
      .width('100%')
      .height('80%')


      TextInput({ text: this.text2, placeholder: '输入框交互...', controller: this.controller2 })
        .placeholderColor(Color.Grey)
        .placeholderFont({ size: 14, weight: 400 })
        .caretColor(Color.Blue)
        .width('100%')
        .height('5%')
        .fontSize(14)
        .fontColor(Color.Black)
        .onChange((value: string) => {
          this.text2 = value
        })


    }

  }

  @State modelLeft: SideBarModel = {
    sideBarPosition: SideBarPosition.End,
    initShow: true,
  }
  @State modelRight: SideBarModel = {
    sideBarPosition: SideBarPosition.End,
    initShow: true,
  }
  dialogControllerLeft: CustomDialogController = new CustomDialogController({
    builder: SideBarCustomDialog({
      customComponent: () => {
        this.MySideBarComponentLeft()
      },
      model: this.modelLeft
    }),
    autoCancel: true,
    alignment: DialogAlignment.Center,
    maskColor: 0x33000000,
    offset: { dx: 0, dy: 0 },
    customStyle: true,
    closeAnimation: { duration: 500 }
  })
  dialogControllerRight: CustomDialogController = new CustomDialogController({
    builder: SideBarCustomDialog({
      customComponent: () => {
        this.MySideBarComponentRight()
      },
      model: this.modelRight
    }),
    autoCancel: true,
    alignment: DialogAlignment.Center,
    maskColor: 0x33000000,
    offset: { dx: 0, dy: 0 },
    customStyle: true,
    closeAnimation: { duration: 500 }
  })

  aboutToAppear() {
    for (let i = 0; i < 50; i++) {
      this.arrRight.push(i);
    }
  }

  build() {
    Row() {
      Button("左边弹窗")
        .width('30%')
        .height(50)
        .margin({ left: 30 })
        .onClick(() => {
          if (this.dialogControllerLeft != undefined) {
            this.modelLeft = {
              sideBarPosition: SideBarPosition.Start,
              initShow: true,
              minSideBarWidth: '70%'
            }
            console.log("SideBarCustomDialog", "isShow: " + this.modelLeft.initShow)
            this.dialogControllerLeft.open()
          }
        })
        .backgroundColor(0x317aff)
      Button("右边弹窗")
        .width('30%')
        .height(50)
        .margin({ right: 30 })
        .onClick(() => {
          if (this.dialogControllerRight != undefined) {
            this.modelRight = {
              sideBarPosition: SideBarPosition.End,
              initShow: true,
              minSideBarWidth: '70%'
            }
            console.log("SideBarCustomDialog", "isShow: " + this.modelLeft.initShow)
            this.dialogControllerRight.open()
          }
        })
        .backgroundColor(0x317aff)
    }
    .justifyContent(FlexAlign.SpaceBetween)
    .alignItems(VerticalAlign.Center)
    .height('100%')
    .width('100%')
  }
}