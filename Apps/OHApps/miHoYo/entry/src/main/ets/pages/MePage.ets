import { homeItem } from './homeItem'

@Entry
@Component
export  struct MePage {
  @State message: string = 'Hello World'

  build() {
    Column() {

      homeItem({
        text: "服务",
        img: $r("app.media.user"), bgColor: Color.Orange
      })
      homeItem({
        text: "收藏", bgColor: Color.Pink
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

    }.width('100%').height('100%').backgroundColor('#FFBF00')
  }
}