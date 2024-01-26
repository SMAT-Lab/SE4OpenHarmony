@Entry
@Component
struct SharedTransitionPage {
  @State active: boolean = false

  build() {
    Column() {
      Navigator({ target: 'pages/SharedTransitionPage2', type: NavigationType.Push }) {
        Image($r('app.media.bg4')).width(50).height(50)
          .sharedTransition('sharedImage', { duration: 800, curve: Curve.Linear, delay: 100 })
      }.padding({ left: 20, top: 20 })
      .onClick(() => {
        this.active = true
      })
    }
  }
}