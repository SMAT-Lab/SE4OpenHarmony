import  web_v from '@ohos.web.webview'
@Entry
@Component
struct WebPage {
  @State message: string = 'OpenHarmony官网'
  controller: WebviewController=new web_v.WebviewController()
  controller2: WebviewController=new web_v.WebviewController()

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(35)
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