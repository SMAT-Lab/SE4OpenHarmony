@Component
export struct MyPanel {
  @State show: boolean = false

  build() {Column() {
    Text('2021-09-30    Today Calendar: 1.afternoon......Click for details')
      .width('90%').height(50).borderRadius(10)
      .backgroundColor(0xFFFFFF).padding({ left: 20 })
      .onClick(() => {
        this.show = !this.show
      })
    Panel(this.show) { // 展示日程
      Column() {
        Text('Today Calendar')
        Divider()
        Text('1. afternoon 4:00 The project meeting')
      }
    }
    .type(PanelType.Foldable).mode(PanelMode.Half)
    .dragBar(true) // 默认开启
    .halfHeight(500) // 默认一半
    .onChange((width: number, height: number, mode: PanelMode) => {
      console.info(`width:${width},height:${height},mode:${mode}`)
    })
  }.width('100%').height('100%').backgroundColor(0xDCDCDC).padding({ top: 5 })
  }
}