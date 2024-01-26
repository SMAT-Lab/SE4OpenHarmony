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
import { compareVersions, compare, CompareOperator, satisfies, validate, validateStrict } from "compare-versions";
import promptAction from '@ohos.promptAction';

let tag = "COMPARE_VERSIONS----"

enum ECurrentEdit {
  A,
  B
}

@Entry
@Component
struct Index {
  @State message: string = 'Hello World'
  @State versionA: string = "4.1.0"
  @State versionB: string = "~10.0.0"
  @State operator: CompareOperator = "<"
  @State currentEdit: ECurrentEdit = ECurrentEdit.A
  private quickTexts: Array<string> = [
    "1.2.7 || >=1.2.9 <2.0.0",
    "1.2.3 - 2.3.4",
    ">=10.2.2",
    "<=10.2.2",
    "~10.0.0",
    "^10.0.0",
    ">10.0.4",
    "<10.2.2",
    "=10.0.1",
    "||",">=","<=","-","<",">","=","^","~"
  ]

  @Builder BuildButton(text: string, callback: () => void) {
    Button(text).onClick(callback).margin({ right: 4, bottom: 4 })
  }

  @Builder BuildQuickText(text: string) {
    Text(text).fontSize(14).margin({ right: 20, bottom: 10 }).onClick(() => {
      if (this.currentEdit === ECurrentEdit.A) {
        this.versionA = this.versionA.concat(text);
      }
      if (this.currentEdit === ECurrentEdit.B) {
        this.versionB = this.versionB.concat(text);
      }
    })
      .border({width:1,color:Color.Gray}).padding(6).borderRadius(4)
  }

  showMessage(message: string) {
    promptAction.showToast({ message });
    console.log(`${tag}${message}`)
  }

  build() {
    Column() {
      Row() {
        Text("版本A：")
        TextInput({ placeholder: "请输入版本号", text: this.versionA, })
          .width("50%")
          .onChange((value: string) => {
            this.versionA = value;
          })
          .onBlur(() => {
            this.currentEdit = ECurrentEdit.B
            console.log(`vvvv---${this.currentEdit}}`)
          })
      }.margin({ bottom: 20 })

      Row() {
        Text("版本B：")
        TextInput({ placeholder: "请输入版本号", text: this.versionB })
          .width("50%")
          .onChange((value: string) => {
            this.versionB = value;
          })
          .onBlur(() => {
            this.currentEdit = ECurrentEdit.A
            console.log(`vvvv---${this.currentEdit}}`)
          })
      }.margin({ bottom: 20 })

      Row() {
        Text("算术运算符：")
        Row() {
          Row() {
            Radio({ value: 'Radio1', group: 'radioGroup' }).checked(this.operator === ">")
              .height(20)
              .width(20)
              .onChange((isChecked: boolean) => {
                this.operator = ">"
              })
            Text('>')

          }.margin({ right: 10 })

          Row() {
            Radio({ value: 'Radio1', group: 'radioGroup' }).checked(this.operator === "<")
              .height(20)
              .width(20)
              .onChange((isChecked: boolean) => {
                this.operator = "<"

                console.log('Radio1 status is ' + isChecked)
              })
            Text('<')
          }.margin({ right: 10 })

          Row() {
            Radio({ value: 'Radio1', group: 'radioGroup' }).checked(this.operator === "=")
              .height(20)
              .width(20)
              .onChange((isChecked: boolean) => {
                console.log('Radio1 status is ' + isChecked)
                this.operator = "="

              })
            Text('=')
          }.margin({ right: 10 })

          Row() {
            Radio({ value: 'Radio1', group: 'radioGroup' }).checked(this.operator === ">=")
              .height(20)
              .width(20)
              .onChange((isChecked: boolean) => {
                console.log('Radio1 status is ' + isChecked)
                this.operator = ">="

              })
            Text('>=')
          }.margin({ right: 10 })

          Row() {
            Radio({ value: 'Radio1', group: 'radioGroup' }).checked(this.operator === "<=")
              .height(20)
              .width(20)
              .onChange((isChecked: boolean) => {
                console.log('Radio1 status is ' + isChecked)
                this.operator = "<="

              })
            Text('<=')
          }
        }
      }.margin({ bottom: 20 })

      Column() {
        Text("快捷操作：").width("100%").margin({ bottom: 10 }).fontSize(16)
        Flex({ wrap: FlexWrap.Wrap }) {
          ForEach(this.quickTexts,(text:string) => {
            this.BuildQuickText(text);
          })
        }
      }.margin({ bottom: 20 }).width("100%")

      Text("操作：").width("100%").margin({ top: 30, bottom: 20 })
      Flex({ wrap: FlexWrap.Wrap }) {
        this.BuildButton("compareVersions(比较版本号)", () => {
          try {
            this.showMessage(compareVersions(this.versionA, this.versionB) + "")
          } catch (err) {
            this.showMessage(err.message);
          }
        })
        this.BuildButton("compare(比较版本号(运算符))", () => {
          try {
            this.showMessage(compare(this.versionA, this.versionB, this.operator) + "")
          } catch (err) {
            this.showMessage(err.message);
          }
        })
        this.BuildButton("satisfies(比较版本号(范围))", () => {
          try {
            this.showMessage(satisfies(this.versionA, this.versionB) + "")
          } catch (err) {
            this.showMessage(err.message);
          }
        })
        this.BuildButton("版本号排序", () => {


          try {
            const versions = [this.versionA, this.versionB]
            const sorted = versions.sort(compareVersions);
            this.showMessage(JSON.stringify(sorted))
          } catch (err) {
            this.showMessage(err.message);
          }

        })

        this.BuildButton("validate(A)", () => {
          this.showMessage(validate(this.versionA) + "")
        })


        this.BuildButton("validateStrict严格模式(A)", () => {
          this.showMessage(validateStrict(this.versionA) + "")
        })


      }.width("100%")
    }
    .justifyContent(FlexAlign.Start)
    .width('100%')
    .height("100%")
    .padding({ top: 30, left: 10, right: 10 })

  }
}