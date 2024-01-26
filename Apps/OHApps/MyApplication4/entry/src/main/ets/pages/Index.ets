import router from '@ohos.router'

@Entry
@Component
struct Index {
  @State message: string = '本大王欢迎你，请点击'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontColor(Color.Orange)
          .maxLines(2)
          .textOverflow({
            overflow: TextOverflow.Ellipsis
          })
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            router.pushUrl({
              url: "pages/ImagePage"
            })
          })
      }
      .width('100%')
    }
    .height('100%')
  }
}