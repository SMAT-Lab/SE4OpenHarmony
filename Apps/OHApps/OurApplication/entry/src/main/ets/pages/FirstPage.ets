import router from '@ohos.router'

@Entry
@Component
struct FirstPage {
  @State recommend: string = ""

  build() {
    Column() {
      //第一块
      Text("马尧今天吃什么？")
        .fontColor(Color.Brown)
        .fontSize(36)
        .fontWeight(600)
        .margin({
        bottom: 60
      })
      //第二块
      Column({ space: 10 }) {
        Text("马尧现在饿惨了，但是他不知道吃些什么，给点建议吧！")
          .fontWeight(FontWeight.Bold)
          .margin({
          bottom: 16
        })
        .width('80%')
        Row() {
          Image($r("app.media.weini")).width(60).margin({
            right: 20
          })
          TextInput({
            placeholder: "给点建议吧",
            text: this.recommend
          })
            .width("60%")
            .onChange((val: string) => {
            this.recommend = val
            // params:{
            //   content: this.recommend
            // }
          })
        }
        .margin({
          bottom: 16
        })

        // Divider().width("80%")

      }.alignItems(HorizontalAlign.Start)

      Button("马氏菜谱，启动！").width(300).backgroundColor(Color.Gray).margin({
        bottom: 40
      }).onClick(() => {
        router.pushUrl({
          url: "pages/TabPage",
        })
      })
      Row({ space: 10 }) {
        Image($r("app.media.anemo")).width(20)
        Image($r("app.media.dendro")).width(20)
        Image($r("app.media.electro")).width(20)
        Image($r("app.media.geo")).width(20)
        Image($r("app.media.hydro")).width(20)
        Image($r("app.media.pyro")).width(20)
      }

      Text("立即启动！").margin({
        top: 20
      })
    }
    .width("100%")
    .height("100%")
    .alignItems(HorizontalAlign.Center)
    .justifyContent(FlexAlign.Center)
    .margin({
      left: 20,
      right: 20,
      bottom: 40,
      top
      : 40
    })
  }
}