// import { Tabss } from './Tabs'
import promptAction from '@ohos.promptAction'
import router from '@ohos.router';
import hilog from '@ohos.hilog'
import { Tabss3 } from './Tabss3';

@Entry
@Component
struct SettingPage {
  @State message: string = 'Hello World'
  scroller: Scroller = new Scroller()
  build() {
    Scroll(this.scroller) {
      Column() {
        // Row() {
        //   Image($r("app.media.back")).margin({ top: 20 }).width(20).onClick(() => {
        //     router.pushUrl({
        //       url: "pages/TabPage",
        //     })
        //   })
        // }.justifyContent(FlexAlign.Start).width("80%").alignItems(VerticalAlign.Top)

        // Text("设置")
        //   .fontSize(50)
        //   .fontWeight(FontWeight.Bolder)
        //   .margin({ top: 15 })

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
          Text("设置").fontSize(20).margin({
            left: 156
          }).fontWeight(FontWeight.Bold)
        }.width("100%").width("100%").padding(10)
        .backgroundColor(Color.White)
        .margin({
          bottom:10
        })

        Column() {
          Text("全局")
            .fontSize(20)
            .textAlign(TextAlign.Start)
            .margin(15)
            .fontWeight(FontWeight.Bold)
          Column() {
            Row() {
              Image($r("app.media.yun")).width(20)
              Text("数据同步")
                .fontSize(16)
                .textAlign(TextAlign.Start)
                .margin(15)
              Blank(195)
              Toggle({ type: ToggleType.Switch }).selectedColor(Color.Pink)
                .margin({ right:15 })
                .onChange((isOn: boolean) => {
                  if (isOn) {
                    promptAction.showToast({ message: 'plusone is on.' })
                  } else {
                    promptAction.showToast({ message: 'plusone is off.' })
                  }
                })
            }.margin(15)

            Divider().width("80%")
            Tabss3({
              text: "主题颜色",
              img: $r("app.media.zhuti")
            }).margin(15)
            Divider().width("80%")
            Row() {
              Image($r("app.media.passwordsuo")).width(20)
              Text("密码锁")
                .fontSize(16)
                .textAlign(TextAlign.Start)
                .margin(15)
              Blank(210)
              Toggle({ type: ToggleType.Switch }).selectedColor(Color.Pink)
                .margin({ right:15 })
                .onChange((isOn: boolean) => {
                  if (isOn) {
                    promptAction.showToast({ message: 'plusone is on.' })
                  } else {
                    promptAction.showToast({ message: 'plusone is off.' })
                  }
                })
            }.margin(15)
          }.alignItems(HorizontalAlign.Start).borderWidth(1).borderRadius(15).backgroundColor(Color.White).borderColor(Color.Gray)


          Row() {
            Tabss3({
              text: "标签管理",
              img: $r("app.media.label")
            }).margin(15).onClick(() => {
              promptAction.showActionMenu({
                title: "标签管理",
                buttons: [
                  {
                    text: "倒计时",
                    color: $r("app.color.start_window_background")
                  },
                  {
                    text: "生日",
                    color: $r("app.color.start_window_background")
                  },
                  {
                    text: "纪念日",
                    color: $r("app.color.start_window_background")
                  },
                  {
                    text: "有效期",
                    color: $r("app.color.start_window_background")
                  },
                  {
                    text: "学习",
                    color: $r("app.color.start_window_background")
                  },
                  {
                    text: "考试",
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
          .margin({ top: 10 })

          Text("首页")
            .fontSize(20)
            .margin(15)
            .fontWeight(FontWeight.Bold)
          Row() {
            Tabss3({
              text: "颜色排序",
              img: $r("app.media.abc")
            }).margin(15).onClick(() => {
              promptAction.showActionMenu({
                title: "选择颜色排序方式",
                buttons: [
                  {
                    text: "按使用次数",
                    color: $r("app.color.start_window_background")
                  },
                  {
                    text: "随机",
                    color: $r("app.color.start_window_background")
                  },
                  {
                    text: "按光谱",
                    color: $r("app.color.start_window_background")
                  }
                ]
              })
            })
          }.borderWidth(1).borderRadius(15).backgroundColor(Color.White).borderColor(Color.Gray)

          Text("工具")
            .fontSize(20)
            .margin(15)
            .fontWeight(FontWeight.Bold)
          Column() {
            Row() {
              Image($r("app.media.notification")).width(20)
              Text("显示小红点")
                .fontSize(16)
                .margin(15)
                .textAlign(TextAlign.Start)
              Blank(180)
              Toggle({ type: ToggleType.Switch }).selectedColor(Color.Pink)
                .margin({ right:15 })
                .onChange((isOn: boolean) => {
                  if (isOn) {
                    promptAction.showToast({ message: 'plusone is on.' })
                  } else {
                    promptAction.showToast({ message: 'plusone is off.' })
                  }
                })
            }.margin(15)
          }.borderWidth(1).borderRadius(15).backgroundColor(Color.White).borderColor(Color.Gray)

        }
      }
      .width('100%')
      .height(800)
      .backgroundColor(Color.Pink)
    }
  }
}
