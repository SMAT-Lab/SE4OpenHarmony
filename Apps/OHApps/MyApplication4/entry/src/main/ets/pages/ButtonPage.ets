@Entry
@Component
struct ButtonPage {
  @State message: string = 'Hello World'
  @State isvisited: boolean = false

  build() {
    Row() {
      Column() {
        Text("BNU")
          .fontSize(25)
          .fontWeight(FontWeight.Bolder).fontColor(Color.Brown)
          .backgroundColor(Color.Transparent).padding({
          bottom: 10,
          top: 10,
          left: 40,
          right: 40
        }).border({
          width: 10,
          color: Color.Brown,
          style: BorderStyle.Solid,
          radius: 10
        })
        Text(this.message)
          .width(200)
          .height(200)
          .backgroundColor(Color.Pink)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .fontColor(Color.White)
          .borderRadius({
            topRight: 50
          })
          .margin({ // margin-对外边距进行设置
            bottom: 10, // 只对下面设置属性（如果是margin(10)就是对各个方向都设置间距）
            top: 20
          })
          .padding(10) // padding-对内边距进行设置
          .borderStyle(BorderStyle.Dashed)
          .borderWidth(5)
          .borderColor(Color.Black)
        //胶囊按钮
        Button("按我").type(ButtonType.Capsule).onClick(() => {
          this.isvisited = true
        }).width(80)
        if (this.isvisited) {
          //圆形按钮
          Button("按").type(ButtonType.Circle).width("20%")
        }

        //Button("我是按钮").type(ButtonType.Normal).height(90)
        Button("我是按钮").type(ButtonType.Normal).borderRadius(10) //borderRadius:设置矩形按钮的圆角
        Button("方形按钮").type(ButtonType.Normal).borderRadius({
          bottomLeft: 10,
          bottomRight: 20,
          topLeft: 10,
          topRight: 40
        })
      }
      .width('100%')
    }
    .height('100%')
  }
}