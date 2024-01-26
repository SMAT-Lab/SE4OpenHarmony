import http from '@ohos.net.http'
import router from '@ohos.router'
import { WenanModel } from '../Model/WenanModel'
// import { JitangModel } from '../Model/JitangModel'

@Entry
@Component
struct WenanPage {
  aboutToAppear() {
    this.getData()
  }

  @State message: string = 'Hello World'
  @State datas: Array<any> = []
  @State keys: string = '649d5e8be5436d055d9634954e3ca468' // 文案key
  @State wenanText: string = "加油！"
  @State source:string = "Somebody"

  getData() {
    let httpRequest = http.createHttp()
    httpRequest.request("http://apis.juhe.cn/fapigx/pyqwenan/query?key=" + this.keys, {
      connectTimeout: 60000,
      readTimeout: 60000,
      usingProtocol: http.HttpProtocol.HTTP1_1,
    }, (err, data) => {
      if (!err) {
        this.message = JSON.stringify(data.result)
        let wenanModel: WenanModel = JSON.parse(data.result.toString())
        this.wenanText = wenanModel.result.content // 文案
        this.source = wenanModel.result.source     // 来源
        // this.datas = jitangModel.result.list
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
        Scroll() {
          Text(this.wenanText)
            .fontSize(30)
            .fontWeight(FontWeight.Normal)
            .fontColor(Color.White)
            .onClick(() => {
              this.getData()
            })
            .width("80%")
            .backgroundColor(Color.Orange)
            .borderRadius(20)
            .borderColor(Color.Black).borderWidth(2)
            .padding(20)
          // Text(this.source).margin(50)
        }
        Row() {
          Blank()
          Image($r("app.media.wenan")).width(140)
        }.width("80%")
      }
      .width('100%')
    }
    .height('100%')
  }
}