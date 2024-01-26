@Entry
@Component
struct VideoPage {
  // 网路地址需要在module.json中添加权限
  @State videoUrl:string = 'http://www.w3school.com.cn/example/html5/mov_bbb.mp4'
  videoController:VideoController = new VideoController()
  @State curRate:number = 1
  build() {
    Row() {
      Column() {
        Video({
          src:this.videoUrl,
          previewUri:$r("app.media.wink"),  // 视频封面
          currentProgressRate:1,
          controller:this.videoController   // 控制器（控制进度播放等）
        }).autoPlay(true)
          .width('90%').height("60%")

        Flex(){
          Button("播放").onClick(()=>{
            this.videoController.start()
          })
          Button("暂停").onClick(()=>{
            this.videoController.pause()
          })
          Button("停止").onClick(()=>{
            this.videoController.stop()
          })
          Button("1x").onClick(()=>{
            this.curRate = 1
          })
          Button("1.25x").onClick(()=>{
            this.curRate = 1.25
          })
          Button("2x").onClick(()=>{
            this.curRate = 2
          })
          Button("播放").onClick(()=>{
            this.videoController.start()
          })
        }

      }
      .width("100%")
    }
    .height('100%')
  }
}