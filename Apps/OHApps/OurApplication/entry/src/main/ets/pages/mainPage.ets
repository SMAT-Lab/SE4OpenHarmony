import router from '@ohos.router'
import  { homeItem} from './homeItem'

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
          text: "生成图片！",
          img: $r("app.media.geo"), bgColor: Color.Orange
        })
        homeItem({
          text: "功能待定……",
          img: $r("app.media.hydro"),bgColor: Color.Pink
        })

      }
      .width('100%')
    }
    .height('100%')
  }
}