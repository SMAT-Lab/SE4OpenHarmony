@Entry
@Component
struct MotionPathPage {
  @State toggle: boolean = true

  build() {
    Column() {
      Button('click me').margin(50)
        // 执行动画：从起点移动到(300,200)，再到(500,500)，再到终点
        .motionPath({ path: 'Mstart.x start.y L300 200 L500 500 Lend.x end.y', from: 0.0, to: 1.0, rotatable: true })
        .onClick(() => {
          animateTo({ duration: 4000, curve: Curve.Linear }, () => {
            this.toggle = !this.toggle // 通过this.toggle变化组件的位置
          })
        })
    }.width('100%').height('100%').alignItems(this.toggle ? HorizontalAlign.Start : HorizontalAlign.Center)
  }
}