@Entry
@Component
struct AnimationPage {
  @State message: string = 'Hello World'
  @State txtWidth: number = 300
  @State txtHeight: number = 300
  @State flag: boolean = true

  build() {
    Row() {
      Column() {
        Text(this.message)
          .animation({
            duration: 1000,
            tempo: 0,
            playMode: PlayMode.Normal,
            curve: Curve.Linear,
            iterations: 5
          })
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
          .onClick(() => {
            this.txtHeight = 100, this.txtWidth = 100

          })
          .width(this.txtWidth)
          .height(this.txtHeight)
          .backgroundColor(Color.Orange)


        Button("按钮").width(this.txtWidth).height(this.txtHeight).onClick(() => {
          animateTo({
            duration: 1000,
            tempo: 0,
            playMode: PlayMode.AlternateReverse,
            curve: Curve.EaseOut,
            iterations: 5
          }, () => {
            if (this.flag == true) {
              this.txtHeight = 100,
              this.txtWidth = 100
            }
            else {
              this.txtHeight = 200,
              this.txtWidth = 200
            }
            this.flag != this.flag
          })
        })
      }
      .width('100%')
    }
    .height('100%')
  }
}