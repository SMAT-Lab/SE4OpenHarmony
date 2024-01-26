import router from '@ohos.router'
import { xingzuo } from './xingzuo'

@Entry
@Component
struct Xingzuo2Page {
  @State message: string = 'Hello World'
  // @State datas: Array<any> = []
  @State time: string = router.getParams()["time"]
  // 返回参数
  @State name: string = router.getParams()["name"]
  @State QFriend: string = router.getParams()["QFriend"]
  @State color: string = router.getParams()["color"] // 幸运色
  @State datetime: string = router.getParams()["datetime"] // 日期
  @State health: string = router.getParams()["health"] // 健康指数
  @State love: string = router.getParams()["love"] // 恋爱指数
  @State work: string = router.getParams()["work"] // 事业指数
  @State money: string = router.getParams()["money"] // 财富指数
  @State number: number = router.getParams()["number"] // 幸运数字
  @State summary: string = router.getParams()["summary"] // 概要
  @State all: string = router.getParams()["all"] // 整体指数

  // @State test: string = router.getParams()["test"] // 整体指数

  build() {
    Scroll() {
      Row() {
        Column() {
          // Text(this.test)
          Text(this.name).fontSize(35).fontWeight(FontWeight.Bold).margin({top:20,bottom:10})
          Text(this.datetime).fontSize(17).fontWeight(FontWeight.Normal).margin(10)

          Text(this.summary)
            .fontSize(19)
            .fontColor(Color.White)
            .fontWeight(FontWeight.Normal)
            .backgroundImage($r("app.media.background1"))
            .borderRadius(15)
            .width("80%")
            .height("28%")
            .padding(17)

          xingzuo({
            topic: "配对星座：",
            text: this.QFriend.toString(),
            img:$r("app.media.xingzuo_peidui")
          })
          xingzuo({
            topic: "幸运色：",
            text: this.color.toString(),
            img:$r("app.media.xingzuo_color")
          })
          xingzuo({
            topic: "健康指数：",
            text: this.health.toString(),
            img:$r("app.media.xingzuo_health")
          })
          xingzuo({
            topic: "恋爱指数：",
            text: this.love.toString(),
            img:$r("app.media.xingzuo_love")
          })
          xingzuo({
            topic: "事业指数：",
            text: this.work.toString(),
            img:$r("app.media.xingzuo_work")
          })
          xingzuo({
            topic: "财富指数：",
            text: this.money.toString(),
            img:$r("app.media.xingzuo_money")
          })
          xingzuo({
            topic: "幸运数字：",
            text: this.number.toString(),
            img:$r("app.media.xingzuo_number")
          })
          xingzuo({
            topic: "整体指数：",
            text: this.all.toString(),
            img:$r("app.media.xingzuo_all")
          })
        }
        .width('100%')
      }
      .height(1100)
    }
  }
}