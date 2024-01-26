import http from '@ohos.net.http'
import router from '@ohos.router'
import { JitangModel } from '../Model/JitangModel'

@Entry
@Component
struct JitangPage {
  aboutToAppear() {
    this.getData()
  }

  @State message: string = 'Hello World'
  @State datas: Array<any> = []
  @State keys: string = '125d1d2ea49e35337667d7c7f70f15e1' // 鸡汤key
  @State jitangText: string = "加油！"

  getData() {
    let httpRequest = http.createHttp()
    httpRequest.request("https://apis.juhe.cn/fapig/soup/query?key=" + this.keys, {
      connectTimeout: 60000,
      readTimeout: 60000,
      usingProtocol: http.HttpProtocol.HTTP1_1,
    }, (err, data) => {
      if (!err) {
        this.message = JSON.stringify(data.result)
        let jitangModel: JitangModel = JSON.parse(data.result.toString())
        this.jitangText = jitangModel.result.text // 获取鸡汤文本
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

          Text(this.jitangText)
            .fontSize(30)
            .fontWeight(FontWeight.Normal)
            .fontColor(Color.White)
            .onClick(() => {
              this.getData()
            })
            .width("80%")
            .backgroundColor(Color.Pink)
            .borderRadius(20)
            .borderColor(Color.Black).borderWidth(2)
            .padding(20)
        }
        Row() {
          Blank()
          Image($r("app.media.fight1")).width(120)
        }.width("80%")
      }
      .width('100%')
    }
    .height('100%')
  }
}