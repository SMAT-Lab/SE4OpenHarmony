@Entry
@Component
struct ProgressPage {
  @State message: string = 'Hello World'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        Progress({
          value:40,
          total:50,
          style:ProgressStyle.Ring

        })
        Progress({
          value:40,
          total:50,
          style:ProgressStyle.Linear

        })

        Progress({
          value:40,
          total:50,
          style:ProgressStyle.Eclipse

        })
        Progress({
          value:40,
          total:50,
          style:ProgressStyle.Capsule

        })
      }
      .width('100%')
    }
    .height('100%')
  }
}