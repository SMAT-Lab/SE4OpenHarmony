import webview from '@ohos.web.webview'
import router from '@ohos.router'
@Entry
@Component
struct CutiePetPage {
  @State message: string = 'Hello World'
  controller : WebviewController = new webview.WebviewController()

  build() {
    Row() {
      Column() {
        // 顶部白条
        Column() {
          Row({ space: 10 }) {
            Image($r("app.media.back"))
              .width(30)
              .margin(7)
              .fillColor(Color.Brown)
              .onClick(() => {
                router.pushUrl({
                  url: "pages/TabPage"
                })
              })
            Text("治愈萌宠").fontSize(20).margin({
              left: 140
            }).fontWeight(FontWeight.Bold)
          }
          .width("100%")
          .padding(10)
          .backgroundColor(Color.White)
          .margin({
            bottom: 0
          })
        }

        Web({
          src:"https://www.bing.com/images/search?q=%e5%8f%af%e7%88%b1%e5%b0%8f%e7%8c%ab&form=HDRSC2&first=1",
          controller:this.controller
        }).height("100%")
      }
      .width('100%')
    }
    .height('100%')
  }
}