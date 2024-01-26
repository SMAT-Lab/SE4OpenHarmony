
import router from '@ohos.router'
@Entry
@Component
struct SecondPage {
  @State message: string = ' 第二个页面'

  private  value: string=router.getParams()["value"]

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