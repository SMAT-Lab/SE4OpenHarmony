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

import { fullScreenDialog } from '@ohos/dialogs'
@Component
struct BlockContent {
  placeholder: string = ''
  inputValue: string = ''
  build() {
    Column(){
      TextInput({placeholder: this.placeholder,text: this.inputValue})
        .placeholderFont({
          size: 20
        })
        .margin({left:5,right:5,top:20})
        .padding(0)
        .fontColor('#000000')
        .backgroundColor('#ffffff')
        .borderRadius(0)
        .fontSize(20)
        .border({
          width: {bottom: 1},
          color:{bottom:'#D81B60'},
          style:{top:BorderStyle.Solid}
        })
    }
  }
}

@Entry
@Component
struct SlotExample {
  private swiperController: SwiperController = new SwiperController()
  scroller: Scroller = new Scroller()
  @State arr: number[] = [10, 20, 30];
  @State isOpen:boolean = false
  @State placeholder:string = '测试软键盘交互'
  @State inputValue:string = ''
  dialogController: CustomDialogController = new CustomDialogController({
    builder: fullScreenDialog({
      slotContent: () => {
        this.componentBuilder()
      },
      slotBgColor: '#ffffff',
    }),
    offset: { dx: 0, dy: 24 },
    customStyle: true
  })
  @Builder componentBuilder() {
    Stack({ alignContent: Alignment.TopStart }){
      Scroll(this.scroller) {
        Column(){
          Text('这里是标题').fontSize(24).textAlign(TextAlign.Center).margin(30)
          Column(){
            Text('我是全屏弹窗，可以设置任意的动画器。我看起来就像一个从底部弹出的Actvity，可以用来做一些登录，选择界面').fontSize(20)
          }.margin({left:10,right:10})
          BlockContent({placeholder: this.placeholder,inputValue: this.inputValue})

          Column(){}.width('100%').height(400).backgroundColor('#CCCCCC').margin({ top: 20 })
          TextInput({placeholder: this.placeholder,text: this.inputValue})
            .placeholderFont({
              size: 20
            })
            .margin({left:5,right:5,top:20})
            .padding(0)
            .fontColor('#000000')
            .backgroundColor('#ffffff')
            .borderRadius(0)
            .fontSize(20)
            .border({
              width: {bottom: 1},
              color:{bottom:'#D81B60'},
              style:{top:BorderStyle.Solid}
            })
          Column(){}.width('100%').height(200).backgroundColor('#9C27B0').margin({ top: 20 })
          TextInput({placeholder: this.placeholder,text: this.inputValue})
            .placeholderFont({
              size: 20
            })
            .margin({left:5,right:5,top:20})
            .padding(0)
            .fontColor('#000000')
            .backgroundColor('#ffffff')
            .borderRadius(0)
            .fontSize(20)
            .border({
              width: {bottom: 1},
              color:{bottom:'#D81B60'},
              style:{top:BorderStyle.Solid}
            })
          Column(){}.width('100%').height(200).backgroundColor('#AC5959').margin({ top: 20 })
          TextInput({placeholder: this.placeholder,text: this.inputValue})
            .placeholderFont({
              size: 20
            })
            .margin({left:5,right:5,top:20})
            .padding(0)
            .fontColor('#000000')
            .backgroundColor('#ffffff')
            .borderRadius(0)
            .fontSize(20)
            .border({
              width: {bottom: 1},
              color:{bottom:'#D81B60'},
              style:{top:BorderStyle.Solid}
            })
        }
      }
    }.position({x:0,y:0}).height('100%').width('100%')

  }

  build() {
    Column(){
      Button('自定义全屏弹窗')
        .onClick(() => {
          this.dialogController.open()
        })
    }
  }
}