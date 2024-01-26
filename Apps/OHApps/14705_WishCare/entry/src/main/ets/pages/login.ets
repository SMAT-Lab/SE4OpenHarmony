import router from '@ohos.router';
import prompt from '@ohos.prompt';
import { db } from '../signup/Database';
@Entry
@Component
struct Home {
  @State username:string = '123'
  @State account:string = ''
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
        Text("登录界面")
          //.fontWeight(FontWeight.Medium)
          .width("200vp")
          .height("60vp")
          .offset({ x: "150px", y: "-150px" })
          .fontSize("24fp")
        Text("登录账号使用更多服务")
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
            this.account = value;
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
          Text("短信验证码登录")
            .width("200vp")
            .height("60vp")
            .offset({ x: "30.16px", y: "-60px" })
            .fontColor("#6e93e9")
            .fontSize("15fp")
          Text("忘记密码")
            .width("200vp")
            .height("60vp")
            .offset({ x: "222.37px", y: "-60px" })
            .fontColor("#6e93e9")
            .fontSize("15fp")
        }        
        .width("100%")
        .height("100vp")
        .offset({ x: "0px", y: "-13.32px" })
        Button("登录")
          .width("80%")
          .height("5%")
          .offset({ x: "25px", y: "-113.29px" })
          .fontSize("18fp")
          .onClick(this.launch.bind(this))
        Text("注册账号")
          .width("200vp")
          .height("60vp")
          .offset({ x: ".27px", y: "-100.67px" })
          .fontColor("#6e93e9")
          .textAlign(TextAlign.Center)
          .fontSize("16fp")
          .fontWeight(FontWeight.Medium)
          .onClick(() => {
            router.pushUrl({ url: 'pages/register'})
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
  launch(){
    let account = db.tables.get("Account").select(1);

    if(account){
      console.log(account.username + ' '+account.password);
      if (this.account === account.username && this.password === account.password)
      {
        router.push({
          url:'pages/wisecare',
        })
      }
    }
    else if ((this.account === "admin" && this.password==="1"))
    {
      router.push({
        url:'pages/wisecare',
      })
    }
    else
    {
      prompt.showToast({message:'账号或密码错误'})
    }

  }

}
