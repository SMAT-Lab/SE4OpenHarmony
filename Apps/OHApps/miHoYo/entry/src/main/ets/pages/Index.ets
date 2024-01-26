import router from '@ohos.router'

@Entry
@Component
struct Index {
  @State message: string = '北京师范大学'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50).fontColor(Color.Orange)
          .fontWeight(FontWeight.Bold).onClick(() => {
          //跳转到指定页面
          router.pushUrl({
            url: "pages/SecondPage"
          })
        })


      }
      .width('100%')
    }
    .height('100%')
  }
}