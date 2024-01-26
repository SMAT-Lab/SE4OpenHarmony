// 我真的会谢，叫MainPage不行，MainnPage就可以。。。。
import router from '@ohos.router'

@Entry
@Component
export struct MainPage {
  @State message: string = 'Hello World'

  build() {
    Row() {
      Column() {
        // Part1：首页最顶白条 ”CherishDates“
        Row({ space: 10 }) {
          Image($r("app.media.setting4"))
            .width(30)
            .margin(7)
            .fillColor(Color.Brown)
          Text("CherishDates").fontSize(20).margin({
            left: 57
          }).fontWeight(FontWeight.Bold)
          // Blank()
          // Image(this.img2).width(15).fillColor(Color.Gray)
          //   .margin({
          //     right:10
          //   })
        }.width("100%").margin(10)

        // Part2：主题设置卡片(Days for Me)
        Image($r("app.media.daysforme")).width("100%")

        // Part3：思考要不要分部件，先空着
        // 先放必要组件：添加按钮（转到AddPage）
        Button("＋")
          .type(ButtonType.Capsule)
          .fontSize(25)
          .backgroundColor('#ffd8d6fd')
          .onClick(() => {
            router.pushUrl({
              url: "pages/AddPage"
            })
          }).width(60)
      }
      .width('100%')
    }
    .height('100%').alignItems(VerticalAlign.Top)
  }
}