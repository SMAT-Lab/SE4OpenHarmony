import router from '@ohos.router'

@Entry
@Component
struct LoginPage {
  @State username: string = ""
  @State password: string = ""

  build() {
    Column() {
      //第一块
      Text("欢迎来到图片妙妙屋！").fontColor(Color.Black).fontSize(36).fontWeight(600).margin({
        bottom: 60
      })
      //第二块
      Column({ space: 10 }) {
        Text("您觉得咱做得咋样？").fontWeight(FontWeight.Bold).margin({
          bottom: 16
        })
        Row() {
          Image($r("app.media.user")).width(20).margin({
            right: 20
          })
          TextInput({
            placeholder: "给点鼓励吧！",
            text: this.username
          }).width("60%").onChange((val: string) => {
            this.username = val
          })
        }.margin({
          bottom: 16
        })

        Divider().width("80%")
        Text("密码").fontWeight(FontWeight.Bold).margin({
          bottom: 16
        })
        Row() {
          Image($r("app.media.password")).width(20).margin({
            right: 20
          })
          TextInput({
            placeholder: "请输入密码"
          ,
            text: this.password
          }).width("60%").onChange((val: string) => {
            this.password = val
          })
        }.margin({
          bottom: 16
        })

      }.alignItems(HorizontalAlign.Start)

      Divider().width("80%")
      Row() {
        Blank()
        Text("忘记密码")
      }.width("60%")

      Button("登录").width(300).backgroundColor(Color.Gray).margin({
        bottom: 40
      }).onClick(() => {
        router.pushUrl({
          url: "pages/TabPage",

        })
      })
      Row({ space: 10 }) {
        Image($r("app.media.QQ")).width(20)
        Image($r("app.media.zfb")).width(20)
        Image($r("app.media.weixin")).width(20)
      }

      Text("立即注册").margin({
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