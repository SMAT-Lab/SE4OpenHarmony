@Preview //添加预览功能
  // 自定义组件compTool
@Component
export struct compTool {
  @State tool: string = "无名氏" // 工具名称
  @State intro: string = "" // 内容简介
  @State img: Resource = $r("app.media.tool_base") // 设置默认值（工具图标）

  // @State bgColor:     // 定义默认颜色
  build() {
    Row({ space: 15 }) {
      Image(this.img)
        .width(45)
        .borderWidth(1)
        .borderRadius(12)
        .borderColor(Color.Gray)
        .padding(4)
        .margin({
          top:15,
          bottom:15,
          left:20,
          right:5
        })
      Column({ space: 3 }) {
        Text(this.tool).fontSize(15).fontWeight(FontWeight.Bold).margin({
          top: 3
        })
        Text(this.intro).fontColor(Color.Gray).fontSize(13).width("68%")
      }.alignItems(HorizontalAlign.Start)
    }
    .width("85%")
    .backgroundColor(Color.White)
    .borderRadius(15)
    .borderColor(Color.Gray)
    .borderWidth(1)
    .margin(10)

  }
}