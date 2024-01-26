@Preview //添加预览功能
  // 自定义组件compCountdown
@Component
export struct compCountdown {
  @State text: string = "暑假开始" // 之后改成传入的形式（AddPage）
  @State date: string = "2023-6-30" // 有没有日期格式的输入呢？
  @State img: Resource = $r("app.media.countdown") // 设置默认值（生日图标）
  // @State bgColor:     // 定义默认颜色
  build() {
    Row({ space: 15 }) {
      Image(this.img)
        .width(37)
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
        Text(this.text).fontSize(17).fontWeight(FontWeight.Bold).margin({
          top: 3
        })
        Text(this.date).fontColor(Color.Gray).fontSize(13)
      }.alignItems(HorizontalAlign.Start)
    }
    .width("80%")
    .backgroundColor(Color.White)
    .borderRadius(15)
    .borderColor(Color.Gray)
    .borderWidth(1)
    .margin(10)

  }
}