import { MainnPage } from './MainnPage'
import { MePage } from './MePage'
@Entry
@Component
struct TabsExample {
  @State fontColor: string = '#182431'
  @State selectedFontColor: string = '#007DFF'
  @State currentIndex: number = 0
  private controller: TabsController = new TabsController()

  @Builder TabBuilder(index: number, name: string,img:Resource) {
    Column() {
      Image(img).width(40).fillColor(this.currentIndex === index ? this.selectedFontColor : this.fontColor)
      Text(name)
        .fontColor(this.currentIndex === index ? this.selectedFontColor : this.fontColor)
        .fontSize(16)
        .fontWeight(this.currentIndex === index ? 500 : 400)
        .lineHeight(22)
        .margin({ top: 0, bottom: 7 })
      // Divider()
      //   .strokeWidth(2)
      //   .color('#007DFF')
      //   .opacity(this.currentIndex === index ? 1 : 0)
    }.width('100%')
  }

  build() {
    Column() {
      Tabs({ barPosition: BarPosition.End, controller: this.controller }) {
        TabContent() {
          Column() {
            Text("首页").fontSize(60)
            MainnPage()
          }.width('100%').height('100%').backgroundColor('#34cb0000')
        }.tabBar(this.TabBuilder(0, '首页',$r("app.media.discover2")))

        TabContent() {
          Column(){
            Text("消息").fontSize(60)

          }.width('100%').height('100%').backgroundColor('#3200b7ff')
        }.tabBar(this.TabBuilder(1, '消息',$r("app.media.message")))

        TabContent() {
          Column(){
            // Text("个人中心").fontSize(60)
            MePage()
          }.width('100%').height('100%').backgroundColor('#34ffdf7f')
        }.tabBar(this.TabBuilder(2, '个人中心',$r("app.media.cute")))

        // TabContent() {
        //   Column().width('100%').height('100%').backgroundColor('#E67C92')
        // }.tabBar(this.TabBuilder(3, 'pink'))
      }
      .vertical(false)
      .barMode(BarMode.Fixed)
      .barWidth(360)
      .barHeight(80)
      .animationDuration(400)
      .onChange((index: number) => {
        this.currentIndex = index
      })
      .width(360)
      .height("100%")
      .margin({ top: 0 })
      .backgroundColor('#F1F3F5')
    }.width('100%')
  }
}function MainPage() {
throw new Error('Function not implemented.')
}
