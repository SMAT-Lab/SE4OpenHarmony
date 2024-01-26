import  web_v from '@ohos.web.webview'
@Entry
@Component
export struct SurfingPage {
  @State message: string = '想好吃什么了吗'
  controller: WebviewController=new web_v.WebviewController()
  controller2: WebviewController=new web_v.WebviewController()

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(35)
          .fontWeight(FontWeight.Bold)
        Web({
          src:"https://www.meishichina.com/",
          controller:this.controller

        }).height("100%")
        // Web({
        //   src:$rawfile("index.html"),
        //   controller:this.controller2
        //
        // }).height("40%")



      }
      .width('100%')
    }
    .height('100%')
  }
}