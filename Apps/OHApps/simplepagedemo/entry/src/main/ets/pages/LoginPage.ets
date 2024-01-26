import cert from '@ohos.security.cert'
import router from '@ohos.router'
@Entry
@Component
struct Index {
  @State isShowProgress:boolean=false
  private timeIdOut=null
  login(){
    this.isShowProgress=true
    if (this.isShowProgress) {
      this.timeIdOut=setTimeout(()=>{
        this.isShowProgress=false
        this.timeIdOut=null
        router.replaceUrl({url:"pages/MainPage"})
      },3000)
    }
  }
  build(){
    Column(){
      // 1
      Column({space:10}){
        Image($r("app.media.logo")).width('18%')
        Text('登录界面').fontSize('60px').fontWeight(500)
        Text('登录账号以使用更多服务').fontSize('50px').fontColor(Color.Gray)
      }.height('30%')
      .justifyContent(FlexAlign.End)
      //2
      Column({space:10}){
        TextInput({placeholder:'账号'}).type(InputType.PhoneNumber).backgroundColor(0xefefef)
        Divider().vertical(false).width('90%')
        TextInput({placeholder:'密码'}).type(InputType.Password).backgroundColor(0xefefef)
        Divider().vertical(false).width('90%')
        Row(){
          Text('短信验证码验证').fontColor(0x1e90ff)
            .onClick(()=>{
            //   to do
            })
          Text('忘记密码').fontColor(0x1e90ff)
            .onClick(()=>{
            //   to do
            })
        }
        .width('90%')
        .height('3%')
        .justifyContent(FlexAlign.SpaceBetween)
      }
      // 3
      Column({space:10}){
        Button('登录',{type:ButtonType.Capsule}).fontColor(0xffffff).width('80%')
          .onClick(()=>{
            this.login()
          })
        Text('注册账号').fontColor(0x1e90ff)
      }
      Column(){
        if (this.isShowProgress){
          LoadingProgress()
        }
      }.height('10%')
      .width('10%')
     Column({space:10}){
       Text('其他登录方式')
       Row(){
         Image($r('app.media.login_method1')).width('18%')
         Image($r('app.media.login_method2')).width('18%')
         Image($r('app.media.login_method3')).width('18%')
       }.width('90%')
       .justifyContent(FlexAlign.SpaceEvenly)
     }.margin({bottom:20})
    }.height('100%')
    .width('100%')
    .justifyContent(FlexAlign.SpaceBetween)
    .alignItems(HorizontalAlign.Center)
    .backgroundColor(0xefefef)
  }
}