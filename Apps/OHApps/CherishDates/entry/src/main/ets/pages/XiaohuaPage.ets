import http from '@ohos.net.http'
import router from '@ohos.router'
import { XiaohuaModel } from '../Model/XiaohuaModel'
// import { JitangModel } from '../Model/JitangModel'

@Entry
@Component
struct XiaohuaPage {
  aboutToAppear() {
    this.getData()
  }

  @State message: string = 'Hello World'
  @State datas: Array<any> = []
  @State keys: string = '63b9e7c5aee474002d71b0f55c0fe962' // 笑话key
  @State xiaohuaText: string = ":D"

  getData() {
    let httpRequest = http.createHttp()
    httpRequest.request("http://v.juhe.cn/joke/content/list.php?sort=desc&page=&pagesize=&time=1618816972&key=" + this.keys, {
      connectTimeout: 60000,
      readTimeout: 60000,
      usingProtocol: http.HttpProtocol.HTTP1_1,
    }, (err, data) => {
      if (!err) {
        this.message = JSON.stringify(data.result)
        let xiaohuaModel: XiaohuaModel = JSON.parse(data.result.toString())
        this.xiaohuaText = xiaohuaModel.result.data[6].content // 获取笑话文本
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

          Text(this.xiaohuaText)
            .fontSize(25)
            .fontWeight(FontWeight.Normal)
            .fontColor(Color.White)
            .onClick(() => {
              this.getData()
            })
            .width("80%")
            .backgroundColor("#f2b67d79")
            .borderRadius(20)
            .borderColor(Color.Black).borderWidth(2)
            .padding(20)
        }
        Row() {
          Blank()
          Image($r("app.media.xiaohua")).width(120)
        }.width("80%")
      }
      .width('100%')
    }
    .height('100%')
  }
}