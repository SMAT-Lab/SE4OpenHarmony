import router from '@ohos.router'
import  { homeItem} from './homeItem'
//图标下载地址：https://www.iconfont.cn/
@Entry
@Component
struct MainPage {
  @State message: string = 'Main Page'
  @State username: string = router.getParams()?.["name"]
  aboutToAppear(){
    this.message="aboutToAppear"
  }

  build() {
    Row() {
      Column() {
        Text(this.message)

        homeItem({
          text: "服务",
          img: $r("app.media.user"), bgColor: Color.Orange
        })
        homeItem({
          text: "收藏",bgColor: Color.Pink
        })
        homeItem({
          text: "朋友圈"
        })
        homeItem({
          text: "视频号"
        })
        homeItem({
          text: "设置"
        })

      }
      .width('100%')
    }
    .height('100%')
  }
}