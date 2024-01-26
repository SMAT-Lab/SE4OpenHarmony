import router from '@ohos.router'
import { Tabss2 } from './Tabss2'
@Entry
@Component
struct ComSettingPage {
  @State message: string = 'Hello World'

  build() {
    Row() {
      Column() {
        // Part1：顶部白条
        Row({ space: 10 }) {
          // 常用设置(转到ComSettingPage)
          Image($r("app.media.back"))
            .width(30)
            .margin(7)
            .fillColor(Color.Brown)
            .onClick(()=>{
              router.pushUrl({
                url:"pages/TabPage"
              })
            })
          Text("常用设置").fontSize(20).margin({
            left: 80
          }).fontWeight(FontWeight.Bold)
        }.width("100%").width("100%").padding(10)
        .backgroundColor(Color.White)
        .margin({
          bottom:10
        })

        // Part2:功能组件
        Column() {   // 合前三个组件
          Row({ space: 10 }) {
            Image($r("app.media.xingge")).width(37)
              .margin(7)
            Text("数据同步")
            Blank(116)
            Image($r("app.media.go")).width(15).fillColor(Color.Gray)
              .margin({
                right: 10
              })
          }
          Divider().strokeWidth(0.8).color("#31808080").width("80%")
          Row({ space: 10 }) {
            Image($r("app.media.xingge")).width(37)
              .margin(7)
            Text("主题颜色")
            Blank(116)
            Image($r("app.media.go")).width(15).fillColor(Color.Gray)
              .margin({
                right: 10
              })
          }
          Divider().strokeWidth(0.8).color("#31808080").width("80%")
          Row({ space: 10 }) {
            Image($r("app.media.xingge")).width(37)
              .margin(7)
            Text("密码锁")
            Blank(132)
            Image($r("app.media.go")).width(15).fillColor(Color.Gray)
              .margin({
                right: 10
              })
          }
        }.alignItems(HorizontalAlign.Center)
        .width("80%")
        .backgroundColor(Color.White)
        .borderRadius(15)
        .borderColor(Color.Gray)
        .borderWidth(1)
        .margin(10)

        Tabss2({
          text:"标签管理",
          img:$r("app.media.xingge")
        })
        Tabss2({
          text:"颜色排序",
          img:$r("app.media.xingge")
        })
        Tabss2({
          text:"更多设置",
          img:$r("app.media.xingge")
        })
      }
      // .width('100%')
      .width(360)
    }.alignItems(VerticalAlign.Top)
    .height('100%').backgroundColor("#ffd8d6fd")
  }
}