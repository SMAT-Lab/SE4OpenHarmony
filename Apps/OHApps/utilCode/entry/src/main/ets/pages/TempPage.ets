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
import { TempUtils } from '@ohos/util_code'

@Entry
@Component
struct TempPage {

  @State C:number = 0;
  @State F:number = 0;

  build() {
    Column() {

      Column({ space: 12 }) {
        Text('摄氏度转华氏度')
          .margin({ top: 5 })
          .fontSize(16)
        TextInput({ placeholder: '请输入摄氏度' })
          .height(60)
          .fontSize(18)
          .maxLength(5)
          .type(InputType.Number)
          .onChange((value: string) => {
            if (value.length>0) {
              this.C = Number.parseInt(value)
            }else {
              this.C = 0
            }
          })
        Text('摄氏度：'+this.C+'为华氏度：'+TempUtils.C2F(this.C),)
          .fontSize(18)
          .fontColor('#000')
          .margin({ top: 20 })
          .backgroundColor('#12939f')

        Divider().strokeWidth(2).color('#F1F3F5').margin({ top: 8, bottom: 8 })
      }.margin({ top: 10 })



      Column({ space: 12 }) {
        Text('华氏度转摄氏度')
          .margin({ top: 5 })
          .fontSize(16)
        TextInput({ placeholder: '请输入华氏度' })
          .height(60)
          .fontSize(18)
          .maxLength(5)
          .type(InputType.Number)
          .onChange((value: string) => {
            if (value.length>0) {
              this.F = Number.parseInt(value)
            }else {
              this.F = 0
            }
          })
        Text('华氏度：'+this.F+'为摄氏度：'+TempUtils.F2C(this.F),)
          .fontSize(18)
          .fontColor('#000')
          .margin({ top: 20 })
          .backgroundColor('#12939f')

        Divider().strokeWidth(2).color('#F1F3F5').margin({ top: 8, bottom: 8 })
      }.margin({ top: 10 })

    }
  }
}