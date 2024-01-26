// import { Tabss } from './Tabs'
import router from '@ohos.router';
import promptAction from '@ohos.promptAction'
import { Tabss3 } from './Tabss3';

@Entry
@Component
export struct MePage {
  scroller: Scroller = new Scroller()
  @State message: string = 'Hello World'

  build() {

      Scroll(this.scroller) {
        Column() {
          Image($r("app.media.logo")).width(100).height(100).margin({ top: 10 })

          Text("(点击登录)")
            .fontSize(20)
            .fontColor(Color.Gray)
            .fontWeight(FontWeight.Bold)
            .margin({
              bottom: 20,
            })
            .onClick(() => {
              router.pushUrl({
                url: "pages/LoginPage",
              })
            })
          Column() {
            Tabss3({
              text: "提醒日礼盒",
              img: $r("app.media.giftbox")
            }).margin(15).onClick(() => {
              router.pushUrl({
                url: "pages/GiftBoxPage",
              })
            })
            Divider().width("80%")
            Tabss3({
              text: "购买记录",
              img: $r("app.media.dingdan")
            }).margin(15).onClick(() => {
              router.pushUrl({
                url: "pages/PurchaseHistoryPage",
              })
            })
          }
          .backgroundColor(Color.White)
          .borderRadius(15)
          .borderColor(Color.Gray)
          .borderWidth(1)
          .margin(5)

          Row() {
            Tabss3({
              text: "设置",
              img: $r("app.media.setting")
            }).margin(15).onClick(() => {
              router.pushUrl({
                url: "pages/SettingPage",
              })
            })
          }
          .borderWidth(1)
          .borderRadius(15)
          .backgroundColor(Color.White)
          .borderColor(Color.Gray)
          .margin(5)

          Column() {
            Tabss3({
              text: "分享给好友",
              img: $r("app.media.share")
            }).margin(20).onClick(() => {
              promptAction.showActionMenu({
                title: "分享",
                buttons: [
                  {
                    text: "微信",
                    color: $r("app.color.start_window_background")
                  },
                  {
                    text: "QQ",
                    color: $r("app.color.start_window_background")
                  },
                  {
                    text: "微博",
                    color: $r("app.color.start_window_background")
                  }
                ]
              })
            })
            Divider().width("80%")
            Tabss3({
              text: "联系我们",
              img: $r("app.media.comment")
            }).margin(15).onClick(() => {
              promptAction.showActionMenu({
                title: "联系我们",
                buttons: [
                  {
                    text: "微博 cherishdates",
                    color: $r("app.color.start_window_background")
                  },
                  {
                    text: "小红书 cherishdates",
                    color: $r("app.color.start_window_background")
                  }
                ]
              })
            })
            Divider().width("80%")
            Tabss3({
              text: "给个评价",
              img: $r("app.media.heart")
            }).margin(15).onClick(() => {
              promptAction.showActionMenu({
                title: "给个好评",
                buttons: [
                  {
                    text: "去应用市场给CherishDates一个五星好评",
                    color: $r("app.color.start_window_background")
                  }
                ]
              })
            })
          }
          .borderWidth(1)
          .borderRadius(15)
          .backgroundColor(Color.White)
          .borderColor(Color.Gray)
          .margin(5)

          Column() {
            Row() {
              Image($r("app.media.lubiao")).width(20).margin({ left: 15 })
              Text("版本")
                .fontSize(16)
                .margin(15)
                .textAlign(TextAlign.Start)
              Blank()
              Text("1.0.2").margin({ right:15 }).fontColor(Color.Gray)
            }.margin(5).width('80%')
          }
          .borderWidth(1)
          .borderRadius(15)
          .backgroundColor(Color.White)
          .borderColor(Color.Gray)
          .margin(5)
        }.width('100%')
        .height(800)
        .backgroundColor(Color.Pink)
        .backgroundBlurStyle(BlurStyle.Regular)
      }
      .scrollable(ScrollDirection.Vertical) // 滚动方向纵向
      .scrollBar(BarState.On) // 滚动条常驻显示
      .scrollBarColor(Color.Gray) // 滚动条颜色
      .scrollBarWidth(10) // 滚动条宽度
      .edgeEffect(EdgeEffect.None)
      .onScroll((xOffset: number, yOffset: number) => {
        console.info(xOffset + ' ' + yOffset)
      })


  }
}
