import router from '@system.router'
@Entry
@Component
struct OpenPage {
  @State message: string = 'Hello World'
  @State value: number = 0;
  private intervalID: number = -1;

  build() {
    Row() {
      Column() {
        Image($r("app.media.logo")).width(200).margin({ bottom: 400 })
        Text("CherishDates")
          .fontSize(20)
          .fontWeight(FontWeight.Bolder)
        Progress({
          value: this.value, // 设置当前进度
          total: 100, // 设置进度总量
          type: ProgressType.Linear
        })
          .style({ strokeWidth: 10 }) // 设置进度条线宽
          .margin({top:20})
          .size({ width: '80%', height: 40 })
          .color(Color.Pink)
      }.onClick(() => {
        router.push({ uri: 'pages/TabPage' })
      })
      .width('100%')
    }
    .height('100%')
  }

  aboutToAppear() {
    this.intervalID = setInterval(() => {
      this.value += 1
      if (this.value > 100) {
        clearInterval(this.intervalID);
      }
      console.log("update: " + this.value)
    }, 100);
  }
}
