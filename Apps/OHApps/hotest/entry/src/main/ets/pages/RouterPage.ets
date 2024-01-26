import router from '@ohos.router';
@Entry
@Component
struct RouterPage {
  private value: string = router.getParams()['value'];
  @State message: string = 'Hello World'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold).onClick(()=>{
          router.back()
        })
        Text(this.value)
          .fontSize(50)

      }
      .width('100%')
    }
    .height('100%')
  }
}