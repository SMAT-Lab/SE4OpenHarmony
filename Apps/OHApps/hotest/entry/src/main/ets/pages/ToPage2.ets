@Entry
@Component
struct ToPage2 {
  @State scale2: number = 1
  @State opacity2: number = 1

  build() {
    Column() {
      Navigator({ target: 'pages/PageTransitionPage2', type: NavigationType.Push }) {
        Image($r('app.media.bg2')).width('100%').height('100%')    // 图片存放在media文件夹下
      }
    }.scale({ x: this.scale2 }).opacity(this.opacity2)
  }

  // 自定义方式2：使用系统提供的多种默认效果(平移、缩放、透明度等)
  pageTransition() {
    PageTransitionEnter({ duration: 1200 })
      .slide(SlideEffect.Left)
    PageTransitionExit({ delay: 100 })
      .translate({ x: 100.0, y: 100.0 })
      .opacity(0)
  }
}