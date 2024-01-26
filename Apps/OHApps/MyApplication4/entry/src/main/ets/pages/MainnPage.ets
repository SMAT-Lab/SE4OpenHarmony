import router from '@ohos.router'
import { Tabss } from './Tabss'

@Entry
@Component
export struct MainnPage {
  @State message: string = 'Main Page'
  @State username: string = router.getParams()["name"]
  aboutToAppear(){
    //
    this.message = "aboutToAppear"
  }
  build() {
    Row() {
      Column() {
        Text(this.username)
        // Text(this.username)
        //   .fontSize(50)
        //   .fontWeight(FontWeight.Bold)
        Tabss({
          text:"服务",
          img:$r("app.media.QQ")
          // bgColor: Color.Orange
        })
        Tabss()  // 没有传入参数就是使用默认值
        Tabss({
          text:"朋友圈"
        })
        Tabss({
          text:"视频号"
        })
      }
      .width('100%')
    }
    .height('100%')
  }
}