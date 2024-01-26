import router from '@ohos.router';
@Entry
@Component
struct LoginPage {
  @State message: string = 'HelloWorld'
  @State username: string = ""
  @State password: string = ""


  build() {
    Column() {
      Row(){
        Text("登录")
          .fontSize(30)
          .fontWeight(FontWeight.Bold)
          .margin({
            bottom: 50
          })
      }.justifyContent(FlexAlign.Center)
      Column({space:10}) {
        Text("用户名")
          .fontWeight(FontWeight.Bold)
          .margin({
            bottom: 16
          })
          .fontSize(20)
          .fontWeight(FontWeight.Medium)
          .padding(10)

        Row() {
          Image($r("app.media.user")).width(30).height(30).objectFit(ImageFit.Cover)
          TextInput({
            placeholder: "请输入用户名",
            text:this.username
          }).width("60%").onChange((val:string)=>{
            this.username=val
          })
        }.margin({
          bottom: 16
        })

        Divider().width("80%")
        Text("密码")
          .fontWeight(FontWeight.Bold)
          .margin({
            bottom: 16
          })
          .fontSize(20)
          .fontWeight(FontWeight.Medium)
          .padding(10)
        Row() {
          Image($r("app.media.password")).width(30).height(30).objectFit(ImageFit.Cover)
          TextInput({
            placeholder: "请输入密码",
            text:this.password
          }).width("60%").onChange((val:string)=>{
            this.password=val
          })
        }.margin({
          bottom: 16
        })

        Divider().width("80%")
      }.alignItems(HorizontalAlign.Start)

      Row() {
        Blank()
        Text("忘记密码?")
      }.width("60%").margin({
        top:16,
        bottom:16
      })

      Button("Sign in").width(300).backgroundColor("#ff4589fe").margin({
        bottom:20
      }).onClick(()=>{
        router.pushUrl({
          url:"pages/TabPage",
          params:{
            name:this.username,
            key:this.password
          }
        })
      })
      Text("通过第三方登录").margin({
        bottom:16
      })
      Row({space:10}) {
        Image($r("app.media.instagram")).width(30).height(30).objectFit(ImageFit.Cover)
        Image($r("app.media.microsoft")).width(30).height(30).objectFit(ImageFit.Cover)
        Image($r("app.media.facebook")).width(30).height(30).objectFit(ImageFit.Cover)
      }.margin({
        bottom:16
      })

      Button("立即注册").width(200).backgroundColor(Color.Pink).margin({
        bottom:20
      })
    }
    .width("100%")
    .height("100%")
    .alignItems(HorizontalAlign.Center)
    .justifyContent(FlexAlign.Center)
    .margin({

      bottom: 40,
      top: 40
    })
  }
}
