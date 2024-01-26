/**
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * This software is distributed under a license. The full license
 * agreement can be found in the file LICENSE in this distribution.
 * This software may not be copied, modified, sold or distributed
 * other than expressed in the named license agreement.
 *
 * This software is distributed without any warranty.
 */

@Component
export struct ItemInput {
  title: string | Resource = ""
  @Link value: string
  typeStr: string = "1" //1:Normal,2:Password,3:Email,4:Number
  radio: boolean = false
  widthStr: string = '30%'
  widthInput: string = '65%'
  @Link val: string
  selectDialog: () => void = () => {}


  build() {
    Column() {
      Row() {
        Text(this.title).width(this.widthStr).height('100%').fontSize(18)
        if (!this.radio) {
          TextInput({ text: this.value, placeholder: '请输入' })
            .type(
                this.typeStr == "1" ? InputType.Normal : this.typeStr == "2" ? InputType.Password : this.typeStr == "3" ? InputType.Email : InputType.Number
            )
            .width(this.widthInput)
            .fontSize(18)
            .textAlign(TextAlign.End)
            .onChange(v => {
              this.value = v
            })
        } else {
          Text(this.val).width(this.widthInput).fontSize(18).textAlign(TextAlign.End)
            .onClick(v => {
              this.selectDialog()
            })
        }
      }
      .padding({ left: 15 }).height(54)
      .width('100%')
    }.height(55).backgroundColor(Color.White).width("100%").margin({ top: 1 })
  }
}

