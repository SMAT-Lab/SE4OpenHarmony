@Entry
@Component
struct TransitionPage {
  @State flag: boolean = true
  @State show: string = 'show'

  build() {
    Column() {
      Button(this.show).width(80).height(30).margin(30)
        .onClick(() => {
          // 点击Button控制Image的显示和消失
          animateTo({ duration: 1000 }, () => {
            if (this.flag) {
              this.show = 'hide'
            } else {
              this.show = 'show'
            }
            this.flag = !this.flag
          })
        })
      if (this.flag) {
        // Image的显示和消失配置为不同的过渡效果
        Image($r('app.media.bg5')).width(300).height(300)
          .transition({ type: TransitionType.Insert, scale: { x: 0, y: 1.0 } })
          .transition({ type: TransitionType.Delete, rotate: { angle: 180 } })
      }
    }.width('100%')
}}