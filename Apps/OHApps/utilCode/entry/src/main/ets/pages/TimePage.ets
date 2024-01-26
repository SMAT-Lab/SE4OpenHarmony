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

import { get12, get24 } from 'time-ampm';
import isLeapYear from 'leap-year';
import prompt from '@ohos.promptAction';

@Entry
@Component
struct TimePage {
  private select: number = 1
  time24: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];
  time12: string[] = ["12 am", "1 am", "2 am", "3 am", "4 am", "5 am", "6 am", "7 am", "8 am", "9 am", "10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm", "9 pm", "10 pm", "11 pm", "11.59 pm"];
  @State year: number = 2014

  scroller: Scroller = new Scroller()
  build() {


    Scroll(this.scroller) {
      Column() {


        Column({ space: 12 }) {
          Text('闰年测试，点击按钮判断是否为闰年')
            .margin({ top: 5 })
            .fontSize(16)
          TextInput({ text: this.year.toString(), placeholder: '请输入年份,年份范围，大于1581' })
            .height(60)
            .fontSize(18)
            .type(InputType.Number)
            .margin(18)
            .maxLength(4)
            .onChange((value: string) => {
              if (value.length > 0 && Number.parseInt(value) > 1581  ) {
                this.year = Number.parseInt(value)
              } else {
                prompt.showToast({ message: '请输入大于1581的年份', duration: 3000 })
              }
            })

          Button(this.year+'年是否闰年判断'+isLeapYear(this.year), { type: ButtonType.Normal })
            .fontSize(18)
            .fontColor('#000')
            .height(60)
            .width(300)
            .margin({ top: 20 })
            .backgroundColor('#12939f')
            .onClick(() => {

              if ( this.year == 0){
                prompt.showToast({ message: '请输入大于1581的年份', duration: 3000 })
              }

              if (isLeapYear(this.year)) {
                prompt.showToast({ message: this.year+'是闰年', duration: 3000 })
              }else {
                prompt.showToast({ message: this.year+'不是闰年', duration: 3000 })
              }

            })

          Column() {

            Text('上下午测试，判断对应时间为上午或下午')
              .margin({ top: 5 })
              .fontSize(16)
            ForEach(this.time24, (item:string, index?: number) => {
              Row() {
                Text(item + '点为：' + get12(item))
                  .margin({ top: 5 })
                  .fontSize(16)
              }
            })
            ForEach(this.time12, (item:string, index?: number) => {
              Row() {
                Text(item + '点为：' + get24(item))
                  .margin({ top: 5 })
                  .fontSize(16)
              }
            })

          }

          Divider().strokeWidth(2).color('#F1F3F5').margin({ top: 8, bottom: 8 })
        }.margin({ top: 10 })

      }
    }
    .scrollable(ScrollDirection.Vertical)
    .scrollBar(BarState.Off)
    .scrollBarColor(Color.Gray)
    .scrollBarWidth(1)

  }

  init() {

  }
}