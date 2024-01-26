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
          style:ProgressStyle.Ring    //环形
          // style:ProgressStyle.Linear  //线型
          // style:ProgressStyle.Eclipse   //圆形
          // style:ProgressStyle.ScaleRing   //环形（粗）
          // style:ProgressStyle.Capsule    //胶囊形（为什么和圆形一样？）
        })
      }
      .width('100%')
    }
    .height('100%')
  }
}