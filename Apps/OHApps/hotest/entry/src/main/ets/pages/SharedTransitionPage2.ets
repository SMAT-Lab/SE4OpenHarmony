@Entry
@Component
struct SharedTransitionPage2 {
  build() {
    Stack() {
      Image($r('app.media.bg4')).width(150).height(150)
        .sharedTransition('sharedImage', { duration: 800, curve: Curve.Linear, delay: 100 })
    }.width('100%').height('100%')
  }
}