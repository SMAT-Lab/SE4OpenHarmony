//多行文本输入
@Component
export struct MyTextArea {
  controller: TextAreaController = new TextAreaController()
  @State text: string = ''

  build() {
    Column() {
      TextArea({ placeholder: 'input your word', controller: this.controller })
        .placeholderColor("rgb(0,0,225)")
        .placeholderFont({ size: 20, weight: 100, family: 'cursive', style: FontStyle.Italic })
        .textAlign(TextAlign.Center)
        .caretColor(Color.Blue)
        .fontSize(30)
        .fontWeight(FontWeight.Bold)
        .fontFamily("sans-serif")
        .fontStyle(FontStyle.Normal)
        .fontColor(Color.Red)
        .inputFilter('^[\u4E00-\u9FA5A-Za-z0-9_]+$', (value: string) => {
          console.info("hyb" + value)
        })
        .onChange((value: string) => {
          this.text = value
          this.controller.caretPosition(-1)
        })
      Text(this.text).width('90%')
    }
  }
}
//设置光标
/*
@Component
export struct MyTextArea {
  controller: TextAreaController = new TextAreaController()
  build() {
    Column() {
      TextArea({ placeholder: 'input your word',controller:this.controller })
      Button('caretPosition')
        .onClick(() => {
          this.controller.caretPosition(4)
        })
    }
  }
}
 */

