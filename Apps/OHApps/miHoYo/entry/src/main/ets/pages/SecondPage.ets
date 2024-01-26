import router from '@ohos.router';

@Entry
@Component
struct SecondPage {
  @State message: string = '不知道不知道不知道不知道不知道不知道'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontColor(Color.Orange)
          .maxLines(2)
          .textOverflow({
            overflow:TextOverflow.Ellipsis
          })
          .fontWeight(500)
          .onClick(()=>{
            router.back()
          }
          )
      }
      .width('100%')
    }
    .height('100%')
  }
}