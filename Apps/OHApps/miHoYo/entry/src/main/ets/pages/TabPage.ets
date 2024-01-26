import { MePage } from './MePage'

@Entry
@Component
struct TabPage {
  @State fontColor: string = '#182431'
  @State selectedFontColor: string = '#007DFF'
  @State currentIndex: number = 0
  private controller: TabsController = new TabsController()

  @Builder TabBuilder(index: number, name: string, img: Resource) {
    Column() {
      Image(img).width(40).fillColor(this.currentIndex === index ? this.selectedFontColor : this.fontColor)
      Text(name)
        .fontColor(this.currentIndex === index ? this.selectedFontColor : this.fontColor)
        .fontSize(16)
        .fontWeight(this.currentIndex === index ? 500 : 400)
        .lineHeight(22)
        .margin({ top: 0, bottom: 0 })

    }.width('100%')
  }

  build() {
    Column() {
      Tabs({ barPosition: BarPosition.End, controller: this.controller }) {
        TabContent() {
          Column() {
            Text("首页").fontSize(60)

          }.width('100%').height('100%').backgroundColor('#00CB87')
        }.tabBar(this.TabBuilder(0, '首页', $r("app.media.anemo")))

        TabContent() {
          Column() {
            Text("消息").fontSize(60)


          }
          .width('100%').height('100%').backgroundColor('#007DFF')
        }.tabBar(this.TabBuilder(1, '消息', $r("app.media.electro")))

        TabContent() {
          videoPage()
        }.tabBar(this.TabBuilder(2, "个人", $r("app.media.hydro")))

      }
      .vertical(false)
      .barMode(BarMode.Fixed)
      // .barWidth(360)
      .barHeight(80)
      .animationDuration(400)
      .onChange((index: number) => {
        this.currentIndex = index
      })
      .width("100%")
      .height("100%")

      .backgroundColor('#F1F3F5')
    }.width('100%')
  }
}