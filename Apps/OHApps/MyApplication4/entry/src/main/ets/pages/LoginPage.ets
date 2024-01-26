import router from '@ohos.router'
@Entry
@Component
struct LoginPage {
  @State message: string = 'Hello World'
  @State username:string =""
  @State password:string =""

  build() {
    Row() {
      Column() {
        // Part 1
        Text("登录").fontSize(40).fontWeight(600).margin({
          bottom:60
        })

        // Part 2
        Column(){
          Text("用户名").fontWeight(FontWeight.Bold).margin({
            bottom:10
          })

          Row(){
            Image($r("app.media.Name")).width(20).margin({
              right:20
            })
            TextInput({
              placeholder:"请输入用户名",
              text:this.username
            }).width("70%").onChange((val :string)=>{
                this.username = val
            })
          }

          Divider().width("80%").margin({
            bottom:10
          })

          Text("密码").fontWeight(FontWeight.Bold).margin({
            bottom:10
          })

          Row(){
            Image($r("app.media.pwd")).width(20).margin({
              right:20
            })
            TextInput({
              placeholder:"请输入密码"
            }).width("70%").onChange((val :string)=>{
              this.password = val
            })
          }
          Divider().width("80%")
        }.alignItems(HorizontalAlign.Start)


        // Part 3
        Row(){
          Blank()
          Text("忘记密码")
        }.width("80%")

        // Part 4 登录+跳转页面
        Button("登录").width(300).backgroundColor(Color.Gray).margin({
          bottom:40,
          top:20
        }).onClick(()=>{
          router.pushUrl({
            url:"pages/TabPage", // 跳转到主页（MainPage）
             params:{  // 把变量传给下一个页面
               name:this.username
             }
          })
        })

        Row({space:10}){
          Image($r("app.media.QQ")).width(20)
          Image($r("app.media.weixin")).width(20)
          Image($r("app.media.weibo")).width(20)
        }
        Text("立即注册").margin({
          top:10
        })



      }
      //宽、高设为100%，使Column排列铺满整个页面
      .width('100%')
      .height('100%')
      .alignItems(HorizontalAlign.Center) //设置对齐方式（Center）
      .justifyContent(FlexAlign.Center)
      .margin({
        left:20,
        right:20,
        bottom:40,
        top:40
      })
    }
  }
}