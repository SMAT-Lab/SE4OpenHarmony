import router from '@ohos.router'
@Entry
@Component
export struct MainnPage {
  @State message: string = 'Hello World'

  build() {
    Row() {
      Row() {
        Column() {
          // Part1：首页最顶白条 “CherishDates”
          Row({ space: 10 }) {
            // 常用设置(转到ComSettingPage)
            Image($r("app.media.setting4"))
              .width(30)
              .margin(7)
              .fillColor(Color.Brown)
              .onClick(()=>{
                router.pushUrl({
                  url:"pages/SettingPage"
                })
              })
            Text("CherishDates").fontSize(20).margin({
              left: 130
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
            })
            .width(60)
        }
        .width('100%')
      }
      .height('36%').alignItems(VerticalAlign.Top)
      // 设置占比30%是为了给下面的提醒日留空间，同时能显示出背景色（也方便之后换主题色）
    }.backgroundColor(Color.White)
  }
}