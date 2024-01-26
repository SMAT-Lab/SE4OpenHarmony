import router from '@ohos.router'
@Entry
@Component
struct WhitenoisePage {
  @State message: string = 'Hello World'
  // @State videoUrl:string = 'http://www.w3school.com.cn/example/html5/mov_bbb.mp4'
  @State videoUrl:string = 'https://qkodo.playlistmusic.com.cn/transcode_1080/video/8e72f89b3c707ac2b111a86831ca92fa.mp4'
  videoController:VideoController = new VideoController()
  @State curRate:number = 1

  build() {
    Row() {
      Column() {
        // 顶部白条
        Column() {
          Row({ space: 10 }) {
            Image($r("app.media.back"))
              .width(30)
              .margin(7)
              .fillColor(Color.Brown)
              .onClick(() => {
                router.pushUrl({
                  url: "pages/TabPage"
                })
              })
            Text("静心白噪").fontSize(20).margin({
              left: 140
            }).fontWeight(FontWeight.Bold)
          }
          .width("100%")
          .padding(10)
          .backgroundColor(Color.White)
          .margin({
            bottom: 0
          })
        }.height("20%")

        Video({
          src: this.videoUrl,
          previewUri: $r("app.media.whitenoise2"), // 视频封面
          currentProgressRate: this.curRate,
          controller: this.videoController // 控制器（控制进度播放等）
        }).autoPlay(true)
          .width('90%').height("40%")

        Column() {
          Row() {
            Blank()
            Image($r("app.media.start2")).onClick(() => {
              this.videoController.start()
            }).width(70)
            Image($r("app.media.stop")).onClick(() => {
              this.videoController.pause()
            }).width(70)
            Image($r("app.media.reset")).onClick(() => {
              this.videoController.stop()
            }).width(60).fillColor("#fffed62e")
              .backgroundColor("#ffabaaf8").borderRadius(15).margin({left:6})
          }
        }.alignItems(HorizontalAlign.Center).margin({top:10})

        Row({space:10}) {
          Button("  1x  ").onClick(() => {
            this.curRate = 1
          }).backgroundColor("#ffabaaf8").fontWeight(FontWeight.Bold)
          Button("1.25x").onClick(() => {
            this.curRate = 1.25
          }).backgroundColor("#ffabaaf8").fontWeight(FontWeight.Bold)
          Button(" 1.5x ").onClick(() => {
            this.curRate = 1.5
          }).backgroundColor("#ffabaaf8").fontWeight(FontWeight.Bold)
          Button("  2x  ").onClick(() => {
            this.curRate = 2
          }).backgroundColor("#ffabaaf8").fontWeight(FontWeight.Bold)
        }.margin(5)

      }
      .width("100%")
    }.alignItems(VerticalAlign.Top)
    .height('100%')
  }
}