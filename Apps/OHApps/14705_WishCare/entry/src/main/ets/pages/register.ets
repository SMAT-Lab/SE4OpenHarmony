import router from '@ohos.router';
import prompt from '@ohos.prompt';
import { db } from '../signup/Database';
@Entry
@Component
struct Home {
  @State username:string = ''
  @State password:string = ''
  build() {
    Column() {
      Column() {
        Image($r('app.media.img1'))
          .width("78vp")
          .height("78vp")
            //.margin({
            //top: $r('24vp'),
            // bottom: $r('6vp')
            //})
          .offset({ x: "0px", y: "-150px" })
          .interpolation(ImageInterpolation.High)
        Text("注册界面")
          //.fontWeight(FontWeight.Medium)
          .width("200vp")
          .height("60vp")
          .offset({ x: "150px", y: "-150px" })
          .fontSize("24fp")
        Text("注册账号使用更多服务")
          .width("200vp")
          .height("60vp")
            //.offset({ x: "11.53px", y: "-185.73px" })
          .offset({ x: "20px", y: "-185.73px" })
          .fontColor("#99182431")
          .textAlign(TextAlign.Start)
          .fontSize("55px")
          .fontStyle(FontStyle.Normal)
          .fontWeight(400)
        TextInput()
          .width("80%")
          .height("5%")
          .offset({ x: "0px", y: "-115.43px" })
          .type(InputType.Normal)
          .onChange((value: string) =>{
            this.username = value;
          });
        TextInput()
          .width("80%")
          .height("5%")
          .offset({ x: "0px", y: "-107.56px" })
          .type(InputType.Password)
          .onChange((value: string) =>{
            this.password = value;
          });
        Row() {
          //Text("短信验证码登录")
           // .width("200vp")
           // .height("60vp")
           // .offset({ x: "30.16px", y: "-60px" })
           // .fontColor("#6e93e9")
           // .fontSize("15fp")
          //Text("忘记密码")
            //.width("200vp")
            //.height("60vp")
            //.offset({ x: "222.37px", y: "-60px" })
            //.fontColor("#6e93e9")
           //.fontSize("15fp")
        }
        .width("100%")
        .height("100vp")
        .offset({ x: "0px", y: "-13.32px" })
        Button("注册")
          .width("80%")
          .height("5%")
          .offset({ x: "25px", y: "-113.29px" })
          .fontSize("18fp")
          .onClick(this.signUp_account.bind(this))
        Text("已有账号，请登录")
          .width("200vp")
          .height("60vp")
          .offset({ x: ".27px", y: "-100.67px" })
          .fontColor("#6e93e9")
          .textAlign(TextAlign.Center)
          .fontSize("16fp")
          .fontWeight(FontWeight.Medium)
          .onClick(() => {
            router.pushUrl({ url: 'pages/login'})
          })

      }
      .width("100%")
      .height("100%")
      .alignItems(HorizontalAlign.Center)
      .justifyContent(FlexAlign.Center)
    }
    .width("100%")
    .height("100%")

  }
  signUp_account(){

    // 添加账号
    db.tables.get("Account").insert({id: 1, username: this.username, password: this.password});
    prompt.showToast({message:'注册成功'})

    // 查询账号
    let account = db.tables.get("Account").select(1);
    console.log(account.username + account.password);

  }

}
