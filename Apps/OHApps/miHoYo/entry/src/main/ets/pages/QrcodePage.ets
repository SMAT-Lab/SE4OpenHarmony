@Entry
@Component
struct QrcodePage {
  @State message: string = "北京师范大学人工智能学院"
  aboutToAppear(){
    // this.message=""
  }

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        QRCode(this.message).width("80%")
      }
      .width('100%')
    }
    .height('100%')
  }
}