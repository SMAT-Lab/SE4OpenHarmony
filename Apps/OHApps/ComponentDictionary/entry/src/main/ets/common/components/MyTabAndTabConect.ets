@Component
export struct MyTabAndTabContent {
  @State fontColor: string = 'rgba(0, 0, 0, 0.4)'
  @State selectedFontColor: string = 'rgba(10, 30, 255, 1)'
  @State currentIndex: number = 0
  private controller: TabsController = new TabsController()

  @Builder TabBuilder(index: number) {
    Column() {
      Text(`Tab${(index > 2 ? (index - 1) : index) + 1}`)
        .fontColor(this.currentIndex === index ? this.selectedFontColor : this.fontColor)
        .fontSize(10)
    }.width('100%')
  }

  build() {
    Column() {
      Tabs({ barPosition: BarPosition.End, controller: this.controller }) {
        TabContent() {
          Column() {
            Text('Tab1').fontSize(32)
          }.width('100%')
        }.tabBar(this.TabBuilder(0))

        TabContent() {
          Column() {
            Text('Tab2').fontSize(32)
          }.width('100%')
        }.tabBar(this.TabBuilder(1))

        TabContent() {
          Column() {
            Text('Tab3').fontSize(32)
          }.width('100%')
        }.tabBar(this.TabBuilder(3))

        TabContent() {
          Column() {
            Text('Tab4').fontSize(32)
          }.width('100%')
        }.tabBar(this.TabBuilder(4))
      }
      .vertical(false)
      .barWidth(300)
      .barHeight(56)
      .onChange((index: number) => {
        this.currentIndex = index
      })
      .width('90%')
      .backgroundColor('rgba(241, 243, 245, 0.95)')
    }.width('100%').height(200).margin({ top: 15 })
  }
}