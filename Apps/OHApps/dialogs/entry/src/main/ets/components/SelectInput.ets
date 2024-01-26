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

import { SelectParam } from './SelectParam'

@Component
export struct SelectInput {
  @State select: SelectParam = new SelectParam()

  build() {
    Column({ space: 10 }) {
      Flex({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center }) {
        Checkbox({ name: 'checkbox1', group: 'checkboxGroup' })
          .select(true)
          .selectedColor(0x39a2db)
          .onChange((value: boolean) => {
            this.select.autoCancel = value
          })
          .width(30)
          .height(30)
        Text('设置点击蒙层是否退出').fontSize(20)
      }.backgroundColor('#ffcfcccc')

      Flex({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center }) {
        Checkbox({ name: 'checkbox2', group: 'checkboxGroup' })
          .select(true)
          .selectedColor(0x39a2db)
          .onChange((value: boolean) => {
            this.select.autoClose = value
          })
          .width(30)
          .height(30)
        Text('确认后是否关闭弹窗').fontSize(20)
      }.backgroundColor('#ffcfcccc')

      Flex({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center }) {
        TextInput().onChange((value: string) => {
          this.select.maskColor = value
        }).backgroundColor(Color.White).margin({ right: 20 })
        Text('自定义蒙层颜色').fontSize(20)
      }.backgroundColor('#ffcfcccc')

      Flex({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center }) {
        TextInput().onChange((value: string) => {
          this.select.borderRadius = Number.parseInt(value)
        }).backgroundColor(Color.White).margin({ right: 20 })
        Text('圆角弧度').fontSize(20)
      }.backgroundColor('#ffcfcccc')

      Flex({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center }) {
        Checkbox({ name: 'checkbox3', group: 'checkboxGroup' })
          .select(true)
          .selectedColor(0x39a2db)
          .onChange((value: boolean) => {
            this.select.isDisplayInput = value
          })
          .width(30)
          .height(30)
        Text('包含输入法的弹框拉起输入法').fontSize(20)
      }.backgroundColor('#ffcfcccc')

      Column() {
        Flex({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center }) {
          Text('offsetX:').fontSize(16).padding(10)
          TextInput()
            .onChange((value: string) => {
              this.select.dx = Number.parseInt(value)
            })
            .backgroundColor(Color.White)
            .margin({ right: 20 })
            .width(100)
            .height(30)
          Text('offsetY:').fontSize(16).padding(10)
          TextInput()
            .onChange((value: string) => {
              this.select.dy = Number.parseInt(value)
            })
            .backgroundColor(Color.White)
            .margin({ right: 20 })
            .width(100)
            .height(30)
        }.height(50)

        Text('设置偏移量offset').fontSize(20)
      }.backgroundColor('#ffcfcccc')

      Flex({ justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center }) {
        Checkbox({ name: 'checkbox4', group: 'checkboxGroup' })
          .select(false)
          .selectedColor(0x39a2db)
          .onChange((value: boolean) => {
            this.select.isDeleteOnDisappear = value
          })
          .width(30)
          .height(30)
        Text('弹出退出时删除对象').fontSize(20)
      }.backgroundColor('#ffcfcccc')
    }
  }
}