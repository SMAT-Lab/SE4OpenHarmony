@Entry
@Component
struct TextinputPage {
  @State message: string = 'Hello World'
  @State text: string = ''
  controller: TextInputController = new TextInputController()

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        TextInput({
          placeholder: "请输入密码",
          text: this.text,
          controller: this.controller
        })
          .onChange((value:string) =>{  // 实时展示输入的内容
          this.message = value
        })
          .type(InputType.Password) // 密码格式的输入框（可以选择可见or not）
          // .type(InputType.Number)   // 只允许输入数字类型
          // .type(InputType.Email)
          .placeholderColor(Color.Orange)
          .placeholderFont({  // 对提示文本进行设置
            size: 20,
            //weight:200
          })
          .width("80%")
          .height(50)
          .fontSize(20)
          .fontColor(Color.Brown)
      }
      .width('100%')
    }
    .height('100%')
  }
}