//1.导入对应的http模块
import http from "@ohos.net.http"
import { FriendModel } from '../Model/friendModel';
import { jiModel } from '../Model/jiModel';
// import { LuYou, luyouModel } from '../Model/lvyou';
import router from '@ohos.router';

@Entry
@Component
struct HttpPage {
  aboutToAppear() {
    this.getData()
  }
  //key:56bc45f8b5a0fb89437eea8d23095fcf
  @State datas: Array<any> = []
  @State message: string = 'Hello World'

  @State keys:string="123"
  private LVURL: string = ""
  private baseurl: string = "https://apis.juhe.cn/fapig/soup/query?key=1c7bb3387aaf3954bbbffcc607633923"

  getData() {
    //2. 每一个httpRequest对应一个HTTP请求任务，不可复用
    let httpRequest = http.createHttp()
    httpRequest.request("https://apis.juhe.cn/fapig/soup/query?key="+this.keys+"",
      // 填写HTTP请求的URL地址，可以带参数也可以不带参数。URL地址需要开发者自定义。请求的参数可以在extraData中指定"EXAMPLE_URL",
      {
        connectTimeout: 60000, // 可选，默认为60000ms
        readTimeout: 60000, // 可选，默认为60000ms
        usingProtocol: http.HttpProtocol.HTTP1_1, // 可选，协议类型默认值由系统自动指定

      }, (err, data) => {
        if (!err) {

          // this.message=JSON.stringify(data.result)
          // let friendModel:FriendModel=JSON.parse(data.result.toString())
          // let jiModel: LuYou = JSON.parse(data.result.toString())

          // this.datas = jiModel.result.list


          console.info("打印" + JSON.stringify(data.result))

          httpRequest.destroy();
        } else {
          this.message = JSON.stringify(err)
          console.info('error:' + JSON.stringify(err));
          // 当该请求使用完毕时，调用destroy方法主动销毁
          httpRequest.destroy();
        }
      }
    );

  }

  build() {

    Row() {
      Scroll() {

        TextInput().onChange(()=>{

          this.keys="value"
          this.getData()
        })
        Column() {
          Text(this.message).fontColor(Color.Orange)
            .fontSize(36)
            .fontWeight(FontWeight.Bold).onClick(() => {

            this.getData()
          })


          // // ForEach(this.datas, (item: luyouModel) => {
          //
          //   Column() {
          //     Text(item.name)
          //     Text(item.content)
          //     Text(item.city)
          //   }.onClick(() => {
          //     router.pushUrl({
          //       url: "pages/me/SecondPages",
          //       params: {
          //         con: item
          //       }
          //     })
          //   })
          // })

        }
        .width('100%')
      }
    }
    .height('100%')
  }
}