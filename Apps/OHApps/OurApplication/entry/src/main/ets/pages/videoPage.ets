@Entry
@Component
export struct VideoPage {

  videoController: VideoController = new VideoController()
  @State curRate: number = 1

  build() {
    Column() {
      Text("视频播放")
        .fontSize(40)
        .fontColor(Color.Brown)
        .textAlign(TextAlign.Center)
      Video({
        src: $r('app.media.foodVedio'), //视频源
        previewUri: $r("app.media.weini"),// 视频封面

        currentProgressRate: 1,
        controller: this.videoController,

      }).autoPlay(false)
        .height("60%")

      Flex() {


        Button("播放").height(30).width(100).backgroundColor(Color.Orange).margin({
          bottom: 40
        })
          .onClick(() => {
            this.videoController.start()
          })
        Button("暂停").height(30).width(100).backgroundColor(Color.Orange).margin({
          bottom: 40
        })
          .onClick(() => {
            this.videoController.pause()
          })
        Button("停止").height(30).width(100).backgroundColor(Color.Orange).margin({
          bottom: 40
        })
          .onClick(() => {
            this.videoController.stop()
          })

        Button("2倍速").height(30).width(100).backgroundColor(Color.Brown).margin({
          bottom: 40
        })
          .onClick(() => {
            this.curRate = 16
          })
      }

    }
  }
}