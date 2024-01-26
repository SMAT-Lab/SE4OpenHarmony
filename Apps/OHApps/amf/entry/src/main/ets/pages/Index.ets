/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import AMF from 'amf-convert'
import router from '@ohos.router';
export interface TestData{
  any:string,
  you:string
}
export interface TestData2{
  array:Array<Object>,
  reference:Array<Object>
}
export interface TestData3{
  nesting:"of objects",
  yeah:boolean,
  ref: Array<number>
}
@Entry
@Component
struct Index {
  @State message: string = 'AMF.stringify和AMF.parse,点击后看展示'
  @State message2: string = 'AMF.serialize和AMF.deserialize,点击后看展示'
  @State changedMsg: string = '待转换'
  @State changedMsg2: string = '待转换'

  @State hint1:string ='转换后数据'
  @State hint2:string ='转换后数据'
  @State data1:string = ''
  @State data2:string = ''
  build() {
    Row() {
      Scroll() {
        Column() {
          Column() {
            Text(`源输入data = { any: 'data', you: 'like!'};`).width('100%').height(50)
            Text(`经过AMF.stringify和AMF.parse转换后:${this.changedMsg}`).width('100%').height(100)
            Button(this.message)
              .fontSize(12)
              .fontWeight(FontWeight.Bold)
              .onClick(() => {
                let data:TestData = {
                  any: 'data',
                  you: 'like!'
                };

                let encodedData:Object = AMF.stringify(data);
                let obj = AMF.parse(encodedData);
                let str = JSON.stringify(obj);
                this.changedMsg = str;
                console.log(str);
              }).height(40)
          }.width('100%')
          .height(190)
          .backgroundColor(Color.Orange)


          Column() {
            Text(`源输入data = {"array": [99, 100, 101,{"nesting": "of objects", "yeah?": true, ref: [1, 2, 3]}],"reference": [1, 2, 3]};`).width('100%').height(70)
            Text(`经过AMF.serialize和AMF.deserialize转换后:${this.changedMsg2}`).width('100%').height(140)
            Button(this.message2)
              .fontSize(12)
              .fontWeight(FontWeight.Bold)
              .onClick(() => {
                let dataInner:TestData3 = { nesting: "of objects", yeah: true, ref: [1, 2, 3] }
                let data:TestData2 = {
                  array: [99, 100, 101,
                    dataInner
                  ],
                  reference: [1, 2, 3]
                }

                let encodedData:Object = AMF.serialize(data);
                let obj = AMF.deserialize(encodedData);
                let str = JSON.stringify(obj);
                this.changedMsg2 = str;
                console.log(str);
              }).height(40)
          }.width('100%')
          .height(250)
          .backgroundColor(Color.Orange)


          Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
            Text(this.hint1)

            TextArea({ placeholder: '输入任意数据' })
              .placeholderColor("rgb(0,0,35)")
              .placeholderFont({ size: 20, weight: 100, family: 'cursive', style: FontStyle.Italic })
              .textAlign(TextAlign.Center)
              .caretColor(Color.Blue)
              .height(40)
              .width(144)
              .fontSize(20)
              .fontWeight(FontWeight.Bold)
              .fontFamily("sans-serif")
              .fontStyle(FontStyle.Normal)
              .fontColor(Color.Red)
              .onChange((value: string) => {
                  this.data1 = value
              })
            Button('填入数据后,点击此处查看amf stringify parse后数据')
              .onClick(()=>{

                let encodedData:Object = AMF.stringify(this.data1 as Object);
                let obj = AMF.parse(encodedData);
                let str = JSON.stringify(obj);
                this.hint1 ='转换后数据:'+ str;
              })

          }.width('100%')
          .margin({ bottom: 5 })

          Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
            Text(this.hint2)
            TextArea({ placeholder: '输入任意数据' })
              .placeholderColor("rgb(0,0,35)")
              .placeholderFont({ size: 20, weight: 100, family: 'cursive', style: FontStyle.Italic })
              .textAlign(TextAlign.Center)
              .caretColor(Color.Blue)
              .height(40)
              .width(144)
              .fontSize(20)
              .fontWeight(FontWeight.Bold)
              .fontFamily("sans-serif")
              .fontStyle(FontStyle.Normal)
              .fontColor(Color.Red)
              .onChange((value: string) => {
                  this.data2 = value
              })
            Button('填入数据后,点击此处查看amf serialize deserialize后数据')
              .onClick(()=>{
                let encodedData:Object = AMF.serialize(this.data2 as Object);
                let obj = AMF.deserialize(encodedData);
                let str = JSON.stringify(obj);
                this.hint2 ='转换后数据:'+ str;
              })

          }.width('100%')
          .margin({ bottom: 5 })

          Button('跳转至下一个页面测试更多类型')
            .onClick(()=>{
              router.pushUrl({url:"pages/Second"})
            })
        }
      }
      .width('100%')
      .height('100%')
    }
    .width('100%')
    .height('100%')
  }
}