@Component
export struct MyVideo {
  @State videoSrc: Resource = $rawfile('video2.mp4')
  @State previewUri: Resource = $r('app.media.img')
  @State curRate: PlaybackSpeed = PlaybackSpeed.Speed_Forward_1_00_X//倍数
  @State isAutoPlay: boolean = false
  @State showControls: boolean = true
  controller: VideoController = new VideoController()

  build() {
    Column() {
      Video({
        src: this.videoSrc,
        previewUri: this.previewUri,
        currentProgressRate: this.curRate,
        controller: this.controller
      }).width(800).height(600)
        .autoPlay(this.isAutoPlay)
        .controls(this.showControls)
        .onStart(() => {//播放时触发该事件
          console.info('onStart视频')
        })
        .onPause(() => {//暂停时触发该事件
          console.info('onPause视频')
        })
        .onFinish(() => {//播放结束时触发该事件
          console.info('onFinish视频')
        })
        .onError(() => {//播放失败时触发该事件
          console.info('onFinish视频')
        })
        .onPrepared((e) => {
          //视频准备完成时触发该事件，通过duration可以获取视频时长，单位为s
          // duration: 视频的时长。
          console.info('视频onPrepared is ' + e.duration)
        })
        .onSeeking((e) => {//操作进度条过程时上报时间信息，单位为s
          console.info('视频onSeeking is ' + e.time)
        })
        .onSeeked((e) => {//操作进度条完成后，上报播放时间信息，单位为s
          console.info('视频onSeeked is ' + e.time)
        })
        .onUpdate((e) => {//播放进度变化时触发该事件，单位为s，更新时间间隔为250ms
          console.info('视频onUpdate is ' + e.time)
        })

      Row() {
        Button('src').onClick(() => {
          this.videoSrc = $rawfile('video2.mp4') // 切换视频源
        }).margin(5)
        Button('previewUri').onClick(() => {
          this.previewUri = $r('app.media.img2') // 切换视频预览海报
        }).margin(5)
        Button('controls').onClick(() => {
          this.showControls = !this.showControls // 切换是否显示视频控制栏
        }).margin(5)
      }

      Row() {
        Button('start').onClick(() => {
          console.info('视频开始播放')
          this.controller.start() // 开始播放
        }).margin(5)
        Button('pause').onClick(() => {
          this.controller.pause() // 暂停播放
        }).margin(5)
        Button('stop').onClick(() => {
          this.controller.stop() // 结束播放
        }).margin(5)
        Button('setTime').onClick(() => {
          this.controller.setCurrentTime(10, SeekMode.Accurate) // 精准跳转到视频的10s位置
        }).margin(5)
      }

      Row() {
        Button('rate 0.75').onClick(() => {
          this.curRate = PlaybackSpeed.Speed_Forward_0_75_X // 0.75倍速播放
        }).margin(5)
        Button('rate 1').onClick(() => {
          this.curRate = PlaybackSpeed.Speed_Forward_1_00_X // 原倍速播放
        }).margin(5)
        Button('rate 2').onClick(() => {
          this.curRate = PlaybackSpeed.Speed_Forward_2_00_X // 2倍速播放
        }).margin(5)
      }
    }
  }
}