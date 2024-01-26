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
import { CountryUtils } from '@ohos/util_code'

@Entry
@Component
struct CountryPage {
  @State message: string = ''
  @State err: string = ''
  private simKey: string[] = [];
  private simValue: string[] = [];

  scroller: Scroller = new Scroller()
  build() {
    Scroll(this.scroller){
      Column() {
        Text('当前系统地区获取拨号字冠' + CountryUtils.getCountryCodeByLanguage())
          .fontSize(18)
          .margin({ left: 18, top: 18 })


        Divider().strokeWidth(2).color('#F1F3F5').margin({ top: 8, bottom: 8 })


        Text('sim卡获取拨号字冠模拟测试，模拟测试项目')
          .fontSize(18)
          .margin({ left: 18, top: 18 })

        ForEach(this.simKey, (item:string, index?: number) => {
          Row() {
            Text(item + '拨号字冠为：' + CountryUtils.getCountryCode(item))
              .margin({ top: 5 })
              .fontSize(16)
          }
        })

      }
      .padding({ top: 18, bottom: 18 })
    }
    .scrollable(ScrollDirection.Vertical)
    .scrollBar(BarState.Off)
    .scrollBarColor(Color.Gray)
    .scrollBarWidth(1)


  }

  aboutToAppear() {
    CountryUtils.getCountryCodeFromMap().forEach((value , key) => {
      this.simKey.push(key)
      this.simValue.push(value)
    });
  }

}
