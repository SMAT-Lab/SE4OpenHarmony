@Entry
@Component
struct ButtonPage {
  @State message: string = 'Hello World'
  @State isvisited: boolean = true

  build() {
    Row() {
      Column() {
        Text("北师大").backgroundColor(Color.Blue).padding({

          bottom: 10,
          top: 20,
          left: 30,
          right: 40
        }).border({
          width: 10,
          color: Color.Gray,
          style:BorderStyle.Dotted,
          radius:10

        })
        Text(this.message)
          .width(200)
          .height(200)
          .backgroundColor(Color.Orange)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .borderRadius({
            topRight: 20,
            bottomRight: 10
          })
          .margin({
            bottom: 10,
            top: 10
          })
          .borderStyle(BorderStyle.Dotted)
          .borderWidth(10)
          .borderColor(Color.Pink)

        Button("按钮").type(ButtonType.Capsule).backgroundColor(Color.Black)
          .onClick(() => {
            this.isvisited = true


          }).width(200)
        if (this.isvisited) {
          Button("yuanxing按钮").type(ButtonType.Circle).width("30%")
        }
        Button("按钮").type(ButtonType.Normal).borderRadius(30)
      }
      .width('100%')
    }
    .height('100%')
  }
}