import router from '@ohos.router'
import { compAnniversary } from './compAnniversary'
import { compBirthday } from './compBirthday'
import { compCountdown } from './compCountdown'
import { MainnPage } from './MainnPage'
import { MePage } from './MePage'
import { ToolPage } from './ToolPage'

@Entry
@Component
struct TabPage {
  @State fontColor: string = '#182431'
  @State selectedFontColor: string = '#007DFF'
  @State currentIndex: number = 0
  // @State newName:string = router.getParams()["name"]
  // @State newDate:string = router.getParams()["date"]
  private controller: TabsController = new TabsController()
  // selectedDate: Date = router.getParams()["text1"]


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
            // Text("CherishDates").fontSize(20)
            MainnPage().margin({
              bottom:10
            })
            // 在下面显示组件（纪念日/生日/倒计时）
              // 添加三个组件示例（生日）
            compBirthday()
            compCountdown()
            compAnniversary()
            compBirthday({
              text:"ff's birthday",
              // text:this.newName.toString(),
              date:"2023-6-25"
              // date:this.newDate.toString()
            })

          }.width('100%').height('100%').backgroundColor('#34cb0000')
        }.tabBar(this.TabBuilder(0, '提醒日',$r("app.media.discover2")))

        TabContent() {
          Column(){
            ToolPage()

          }.width('100%').height('100%').backgroundColor('#3200b7ff')
        }.tabBar(this.TabBuilder(1, '工具',$r("app.media.message")))

        TabContent() {
          Column(){

            MePage()
          }.width('100%').height('100%').backgroundColor('#34ffdf7f')
        }.tabBar(this.TabBuilder(2, '我',$r("app.media.cute")))

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

      .width("100%")
      .height("100%")
      .margin({ top: 0 })
      .backgroundColor('#F1F3F5')
    }.width('100%')
  }
}