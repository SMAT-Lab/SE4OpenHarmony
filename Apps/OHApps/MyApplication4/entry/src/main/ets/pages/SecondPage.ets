import router from '@ohos.router'
@Entry
@Component
struct SecondPage {
  @State message: string = 'Hello World'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold).onClick(()=>{
          router.back()
        })
          .fontColor($r("sys.color.ohos_toggle_bg_transparent"))
      }
      .width('100%')
    }
    .height('100%')
  }
}