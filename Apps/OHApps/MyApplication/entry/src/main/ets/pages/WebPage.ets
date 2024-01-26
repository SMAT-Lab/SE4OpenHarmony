import  web_controller from "@ohos.web.webview"

@Entry
@Component
struct WebPage {
  @State message: string = 'Hello World'
  controller:WebviewController=new web_controller.WebviewController

  build() {
    Row() {
      Column() {
       Web({src:"https://www.openharmony.cn/mainPlay",controller:this.controller})
      }
      .width('100%')
    }
    .height('100%')
  }
}