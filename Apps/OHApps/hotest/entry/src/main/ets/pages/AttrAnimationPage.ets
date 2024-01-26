// xxx.ets
@Entry
@Component
struct AttrAnimationPage {
  @State widthSize: number = 250
  @State heightSize: number = 100
  @State rotateAngle: number = 0
  @State flag: boolean = true

  build() {
    Column() {
      Button('change size')
        .onClick(() => {
          if (this.flag) {
            this.widthSize = 150
            this.heightSize = 60
          } else {
            this.widthSize = 250
            this.heightSize = 100
          }
          this.flag = !this.flag
        })
        .margin(30)
        .width(this.widthSize)
        .height(this.heightSize)
        .animation({
          //设置动画时长。
          duration: 2000,
          //设置动画曲线。默认曲线为线性。
          curve: Curve.EaseOut,
          iterations: 3, //设置播放次数。
          playMode: PlayMode.Normal, //设置动画播放模式，默认播放完成后重头开始播放。

          tempo: 30, //动画播放速度。数值越大，动画播放速度越快，数值越小，播放速度越慢。

          delay: 10, //设置动画延迟执行的时长。单位为毫秒，默认不延时播放。
        })
      Button('change rotate angle')
        .onClick(() => {
          this.rotateAngle = 90
        })
        .margin(50)
        .rotate({ angle: this.rotateAngle })
        .animation({
          duration: 1200,
          curve: Curve.Friction,
          delay: 500,
          iterations: -1, // 设置-1表示动画无限循环
          playMode: PlayMode.Alternate
        })
    }.width('100%').margin({ top: 20 })
  }
}