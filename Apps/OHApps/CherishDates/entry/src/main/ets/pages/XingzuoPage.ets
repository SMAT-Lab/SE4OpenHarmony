import http from '@ohos.net.http'
import router from '@ohos.router'
import { XingzuoModel } from '../Model/XingzuoModel'

@Entry
@Component
struct XingzuoPage {
  // aboutToAppear() {
  //   this.getData()
  // }
  @State message: string = ''
  @State time: string = ''
  @State keys: string = '9f312a36fa2887f41bea1f3e6197619f' // 星座key
  controller: TextInputController = new TextInputController()
  controller2: TextInputController = new TextInputController()
  // 返回参数
  @State name: string = "天秤座"
  @State namecode: string = "%E5%A4%A9%E7%A7%A4%E5%BA%A7" // "天秤座"编码
  @State QFriend: string = ""
  @State color: string = "彩色" // 幸运色
  @State datetime: string = "2023年6月25日" // 日期
  @State health: string = "" // 健康指数
  @State love: string = "" // 恋爱指数
  @State work: string = "" // 事业指数
  @State money: string = "" // 财富指数
  @State number: number = 0 // 幸运数字
  @State summary: string = "" // 概要
  @State all: string = "" // 整体指数
  // @State test:string = "传参成功"


  getData() {
    let httpRequest = http.createHttp()
    httpRequest.request("http://web.juhe.cn/constellation/getAll?" + "consName=" + this.namecode + "&type=" + this.time + "&key=" + this.keys, {
      connectTimeout: 60000,
      readTimeout: 60000,
      usingProtocol: http.HttpProtocol.HTTP1_1,
    }, (err, data) => {
      if (!err) {
        this.message = JSON.stringify(data.result)
        let xingzuoModel: XingzuoModel = JSON.parse(data.result.toString())
        // this.datas = xingzuoModel.result.list
        this.name = xingzuoModel.name // 星座名称
        this.QFriend = xingzuoModel.QFriend // 配对星座
        this.color = xingzuoModel.color
        this.datetime = xingzuoModel.datetime
        this.health = xingzuoModel.health
        this.love = xingzuoModel.love
        this.work = xingzuoModel.work
        this.money = xingzuoModel.money
        this.number = xingzuoModel.number
        this.summary = xingzuoModel.summary
        this.all = xingzuoModel.all
        console.info("打印" + JSON.stringify(data.result))
        httpRequest.destroy();
      } else {
        this.message = JSON.stringify(err)
        console.info('error:' + JSON.stringify((err)));
        httpRequest.destroy();
      }
    }
    );
  }

  build() {
    Row() {
      Column() {
        // Part1:顶部白条
        Column() {
          Row({ space: 10 }) {
            Image($r("app.media.back"))
              .width(30)
              .margin(7)
              .fillColor(Color.Brown)
              .onClick(() => {
                router.pushUrl({
                  url: "pages/TabPage"
                })
              })
            Text("星座运势").fontSize(20).margin({
              left: 140
            }).fontWeight(FontWeight.Bold)
          }
          .width("100%")
          .padding(10)
          .backgroundColor(Color.White)
          .margin({
            bottom: 30
          })
        }

        // Part2:
        Scroll() {
          // 输入星座进行查询
          Column() {
            // 可以放个图片在这

            // 输入查询星座
            TextInput({
              placeholder: "请输入查询星座",
              // text: this.text,
              controller: this.controller
            })
              .onChange((value: string) => { // 实时展示输入的内容
                this.name = value
              })
              .type(InputType.Normal)
              .placeholderColor(Color.Pink)
              .placeholderFont({ // 对提示文本进行设置
                size: 20,
                //weight:200
              })
              .width("80%")
              .height(50)
              .fontSize(20)
              .fontColor(Color.Black)
              .margin(10)


            // 输入日期(today,tomorrow,week,month,year)
            TextInput({
              placeholder: "请输入查询日期",
              // text: this.text,
              controller: this.controller2
            })
              .onChange((value: string) => { // 实时展示输入的内容
                this.time = value
              })
              .type(InputType.Normal)
              .placeholderColor(Color.Pink)
              .placeholderFont({ // 对提示文本进行设置
                size: 20,
                //weight:200
              })
              .width("80%")
              .height(50)
              .fontSize(20)
              .fontColor(Color.Black)
              .margin(10)
          }
        }

        Button("确定")
          .fontSize(20)
          .fontWeight(FontWeight.Normal)
          .fontColor(Color.White)
          .backgroundColor(Color.Pink)
          .onClick(() => {
            this.getData()
          })
          .width("30%")
          .borderRadius(20)
          .borderColor(Color.Black)
          .borderWidth(2)
          .padding(10)
          .margin(10)
        // Text("幸运色：")
        // Text(this.color).fontSize(40)
        Row() {
          Blank()
          Column() {
            Image($r("app.media.xingzuo")).width(120)
              .onClick(() => {
                router.pushUrl({
                  url: "pages/Xingzuo2Page",
                  params: {
                    time: this.time,
                    name: this.name,
                    QFriend: this.QFriend,
                    color: this.color, // 幸运色
                    datetime: this.datetime, // 日期
                    health: this.health, // 健康指数
                    love: this.love, // 恋爱指数
                    work: this.work, // 事业指数
                    money: this.money, // 财富指数
                    number: this.number, // 幸运数字
                    summary: this.summary, // 概要
                    all: this.all // 整体指数
                    // test:this.test
                  }
                })
              })
              Text("点我查看").fontColor(Color.Pink)
            }
          }.width("80%")
      }.width("100%").height("100%")

    }.height('100%')
  }
}
