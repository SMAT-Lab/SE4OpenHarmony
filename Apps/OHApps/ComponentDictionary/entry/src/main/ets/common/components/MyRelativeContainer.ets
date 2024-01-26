
@Component
export struct MyRelativeContainer {
  build() {
    Row() {
      Button("Extra button").width(100).height(50)

      // 外层容器的id默认为为'__container__'
      RelativeContainer() {
        Button("Button 1")
          .width(120)
          .height(30)
          .alignRules({
            middle: { anchor: "__container__", align: HorizontalAlign.Center }, // 水平方向上，组件中部与容器中间对齐，即组件在容器中水平居中
          })
          .id("bt1") // id设置为bt1
          .borderWidth(1)
          .borderColor(Color.Black)

        Text("This is text 2")
          .fontSize(20)
          .padding(10)
          .borderWidth(1)
          .borderColor(Color.Black)
          .height(30)
          .id("tx2") // id设置为tx2
          .alignRules({
            bottom: { anchor: "__container__", align: VerticalAlign.Bottom }, // 组件下边与容器下边对齐
            top: { anchor: "bt1", align: VerticalAlign.Bottom }, // 组件上边与button1底部对齐
            right: { anchor: "bt1", align: HorizontalAlign.Center } //  组件右侧与button1中间点对齐
          })

        LoadingProgress()
          .color(Color.Blue)
          .borderWidth(1)
          .borderColor(Color.Black)
          .height(30)
          .width(30)
          .id("lp3") // id设置为lp3
          .alignRules({
            left: { anchor: "bt1", align: HorizontalAlign.End }, // 组件左边对齐容器bt1的右边
            top: { anchor: "tx2", align: VerticalAlign.Center }, // 组件上边对齐容器tx2的中间
            bottom: { anchor: "__container__", align: VerticalAlign.Bottom } // 组件下边对齐最外层容器的底边
          })

        Gauge({ value: 50, min: 0, max: 100 })
          .startAngle(210)
          .endAngle(150)
          .colors([[0x317AF7, 1], [0x5BA854, 1], [0xE08C3A, 1], [0x9C554B, 1], [0xD94838, 1]])
          .strokeWidth(20)
          .width(50)
          .height(50)
          .alignRules({
            left: { anchor: "tx2", align: HorizontalAlign.End }, // 组件左边对齐容器tx2的右边
            right: { anchor: "__container__", align: HorizontalAlign.End }, // 组件右边对齐最外层容器的右边
            top: { anchor: "__container__", align: VerticalAlign.Top }, // 组件上边对齐最外层容器的上边
            bottom: { anchor: "lp3", align: VerticalAlign.Top } // 组件下边对齐容器lp3的上边
          })
          .id("g4")
          .borderWidth(1)
          .borderColor(Color.Black)
      }
      .width(200).height(200)
      .backgroundColor(Color.Orange)
    }.height('100%')
  }
}