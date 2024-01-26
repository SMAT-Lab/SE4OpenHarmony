import webview from '@ohos.web.webview';

@Entry
@Component
struct WebPage {
  @State message: string = 'Hello World'
  controller : WebviewController = new webview.WebviewController()
  controller2 : WebviewController = new webview.WebviewController()

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)
        Web({
          src:"https://www.openharmony.cn/mainPlay",
          controller:this.controller
        }).height("40%")
        Web({
          src:$rawfile("index.html"),
          controller:this.controller2
        }).height("40%")
      }
      .width('100%')
    }
    .height('100%')
  }
}