@Preview //添加预览功能
  // 自定义组件compAnniversary
@Component
export struct compAnniversary {
  @State text: string = "成为大学生" // 之后改成传入的形式（AddPage）
  @State date: string = "2021-9-5" // 有没有日期格式的输入呢？
  @State img: Resource = $r("app.media.anniversary") // 设置默认值（生日图标）

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