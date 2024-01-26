@Entry
@Component
struct NavPage {
  @State message: string = 'Hello World'

  build() {
    Row() {
      Column() {

        Navigator({target:"pages/Index",type :NavigationType.Push}){
          Text(this.message)
            .fontSize(50)
            .fontWeight(FontWeight.Bold)
        }
      }
      .width('100%')
    }
    .height('100%')
  }
}