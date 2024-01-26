@Entry
@Component
struct QrcodePage {
  @State message: string = 'Hello World'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        QRCode("https://www.openharmony.cn/mainPlay").width("80%")
        // QRCode("北京师范大学人工智能学院").width("80%")

      }
      .width('100%')
    }
    .height('100%')
  }
}