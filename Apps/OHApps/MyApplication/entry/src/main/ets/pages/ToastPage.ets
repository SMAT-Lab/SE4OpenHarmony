import promptAction from '@ohos.promptAction'
@Entry
@Component
struct ToastPage {
  @State message: string = 'Hello World'

  build() {
    Row() {
      Column() {


        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold).onClick(()=>{

          promptAction.showToast({
            message:"我是弹窗",
bottom:500,
            duration:50

          })
        })
      }
      .width('100%')
    }
    .height('100%')
  }
}