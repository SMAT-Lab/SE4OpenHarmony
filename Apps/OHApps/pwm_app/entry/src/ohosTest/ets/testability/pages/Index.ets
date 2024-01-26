/* Copyright 2023 Unionman Technology Co., Ltd.
 *
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
 *
 */
// @ts-nocheck
import hilog from '@ohos.hilog';
import pwmtest from '@ohos.pwmtest';
import promptAction from '@ohos.promptAction';

@Entry
@Component
struct Index {
  // 舵机的角度
  @State pwmAngle: number = 0
  // 舵机的引脚,默认是引脚1
  @State pwmPin: number = 1

  aboutToAppear() {
    hilog.info(0x0000, 'testTag', '%{public}s', 'TestAbility index aboutToAppear');
  }

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center }) {
      Button('选择引脚')
        .onClick(() => {
          ActionSheet.show({
            title: '舵机的引脚',
            message: '选择引脚如下',
            autoCancel: false,
            cancel: () => {
              console.log('actionSheet canceled')
            },
            alignment: DialogAlignment.Bottom,
            offset: { dx: 0, dy: -10 },
            sheets: [
              {
                title: '引脚1',
                action: () => {
                  this.pwmPin = 1
                  console.log('select the servo pwmPin ' + this.pwmPin)
                }
              },
              {
                title: '引脚2',
                action: () => {
                  this.pwmPin = 2
                  console.log('select the servo pwmPin ' + this.pwmPin)
                }
              }
            ]
          })
        })
      TextInput({ text: this.pwmAngle, placeholder: '输入舵机要转动的角度...', controller: this.controller })
        .placeholderColor(Color.Grey)
        .placeholderFont({ size: 14, weight: 400 })
        .caretColor(Color.Blue)
        .width(400)
        .height(40)
        .margin(20)
        .fontSize(14)
        .fontColor(Color.Black)
        .inputFilter('[0-9]', (e) => {
          console.log('The servo angle is' + JSON.stringify(e))
        })
        .onChange((value: number) => {
          this.pwmAngle = value
          if (value > 180) {
            this.pwmAngle = 0
            try {
              promptAction.showToast({
                message: "角度范围在0-180！", // 显示文本
                duration: 2000
              })
            } catch (error) {
              console.error(`showToast args error code is ${error.code}, message is ${error.message}`);
            }
            ;
          }
          console.log('select the this.pwmAngle is ' + this.pwmAngle)
        })
      Row() {
        Text('选择的引脚为：' + this.pwmPin)
        Divider()
          .vertical(true)
          .height(22)
          .color('#182431')
          .opacity(0.6)
          .margin({ left: 8, right: 8 })
        Text('舵机的角度为：' + this.pwmAngle)
      }

      Divider()
        .vertical(false)
        .height(22)
        .color('#182431')
        .opacity(0.6)
        .margin({ left: 8, right: 8 })
      Button('启动')
        .onClick(() => {
          pwmtest.setPwmStatus(this.pwmPin, this.pwmAngle)
        })
    }.width('100%')
    .height('100%')
  }
}