import { Tabss } from './Tabss'

@Entry
@Component
export struct MePage {
  @State message: string = 'Hello World'
  @State username: string = '耶' //后续改成接受登录页的传参

  build() {
    Row() {
      Column() {
        Row() {
          Image($r("app.media.touxiang"))
            .width(70)
            .margin({
              top:20,
              bottom:60,
              left:20,
              right:20
            })
            .borderRadius(5)
          Column() {
            Text(this.username)
              .fontSize(25)
              .fontColor(Color.Black)
              .fontWeight(FontWeight.Medium)
              .margin({
                top: 20
              })
            Text("微信号:")
              .fontSize(15).fontWeight(FontWeight.Regular).fontColor(Color.Gray)
              .margin({
              top:10
            })
            Row() {
              Text("wxid_jtsghrzhhhhhhh666").fontSize(15).fontWeight(FontWeight.Regular).fontColor(Color.Gray)
              Blank(10)
              Image($r("app.media.QRcode")).width(15).margin({
                right:10
              }).fillColor(Color.Gray)
              Image($r("app.media.go")).width(15).margin({
                right:10
              })
            }
          }.alignItems(HorizontalAlign.Start)
          // Blank(180)
        }.alignItems(VerticalAlign.Top)
        .margin({
          top:50
        })

        // Text(this.username)
        //   .fontSize(50)
        //   .fontWeight(FontWeight.Bold)
        Divider().strokeWidth(8).color("#31808080")
        Tabss({
          text: "服务",
          img: $r("app.media.service2")
          // bgColor: Color.Orange
        })
        Divider().strokeWidth(8).color("#31808080")
        Tabss({
          text: "收藏",
          img: $r("app.media.cheese")
        })
        Divider().strokeWidth(0.4).color("#31808080").width("100%").margin({
          left:60,
          right:0
        })
        Tabss({
          text: "朋友圈",
          img: $r("app.media.pyq")
        })
        Divider().strokeWidth(0.4).color("#31808080").width("100%").margin({
          left:60,
          right:0
        })
        Tabss({
          text: "视频号",
          img: $r("app.media.video")
        })
        Divider().strokeWidth(0.4).color("#31808080").width("100%").margin({
          left:60,
          right:0
        })
        Tabss({
          text: "卡包",
          img: $r("app.media.card2")
        })
        Divider().strokeWidth(0.4).color("#31808080").width("100%").margin({
          left:60,
          right:0
        })
        Tabss({
          text: "表情",
          img: $r("app.media.girl")
        })
        Divider().strokeWidth(8).color("#31808080")
        Tabss({
          text: "设置",
          img: $r("app.media.setting2")
        })
        Divider().strokeWidth(150).color("#31808080")
      }
      .width('100%')
    }
    .height('100%')
  }
}