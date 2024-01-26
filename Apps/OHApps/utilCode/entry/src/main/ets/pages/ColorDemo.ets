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


import randomColor from 'randomcolor';
interface formatType{
  format:string
}
let formatFn = (data:string):formatType => {
  const  formatData:formatType= {
    format:data
  }
  return formatData
}
@Entry
@Component
struct ColorDemo {

  @State color: number = 0xff0000

  build() {
    Column() {
      Row() {
        Button('随机颜色测试')
          .margin({ left: 18 })
          .onClick(() => {
             this.color = randomColor(formatFn('hex'));
            console.log('颜色' +  this.color); // '22';
          })
        Text()
          .size({ width: 20, height: 20 })
          .margin({ left: 18 })
          .backgroundColor(this.color)
      }

    }.padding({ top: 18, bottom: 18 })
  }



}