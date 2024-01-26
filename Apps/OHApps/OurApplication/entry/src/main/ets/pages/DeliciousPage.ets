import http from "@ohos.net.http"
// import { FriendModel } from '../Model/friendModel';
import { DeliciousModel } from '../Model/deliciousModel'

@Entry
@Component
export struct DeliciousPage {
  @State message: string = ''
  @State recommend: string = ''
  @State food: string = '麻辣小龙虾'
  // aboutToAppear() {
  //   this.getData()
  // }

  getData() {
    let httpRequest = http.createHttp();
    // httpRequest.request("http://apis.juhe.cn/fapigx/caipu/query?key=a8e9fcc4a43e33882e02287d5651dfe1&word=" + this.recommend, {
    httpRequest.request("http://apis.juhe.cn/fapigx/caipu/query?key=a8e9fcc4a43e33882e02287d5651dfe1&word=" + this.food, {
    }, (err, data) => {
      if (!err) {
        let model: DeliciousModel = JSON.parse(data.result.toString())

        this.message = model.result.list[0].zuofa

        httpRequest.destroy();

      }
      else {
        this.message = JSON.stringify(data.result)

        console.info('error:' + JSON.stringify(err))

        httpRequest.destroy()
      }
    })
  }

  build() {
    Column() {
      Text("马尧今天吃什么？")
        .fontColor(Color.Brown)
        .fontSize(36)
        .fontWeight(600)
        .margin({
          bottom: 60
        })
      Column({ space: 10 }) {
        Text("马尧现在饿惨了，但是他不知道吃些什么，给点建议吧！")
          .fontWeight(FontWeight.Bold)
          .margin({
            bottom: 16
          })
          .width('80%')
        Row() {
          Image($r("app.media.weini")).width(60).margin({
            right: 20
          })
          TextInput({
            placeholder: "给点建议吧",
            text: this.recommend
          })
            .width("60%")
            .onChange((val: string) => {
              this.recommend = val
            })
        }
        .margin({
          bottom: 16
        })
      }
      .alignItems(HorizontalAlign.Start)

      Button("试试怎么样！")
        .width(300)
        .backgroundColor(Color.Gray)
        .margin({
        bottom: 40
      })
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .onClick(() => {
          this.getData()
        })
      .width('100%')
      Text(this.message)
        .fontSize(20)
    }
    .height('60%')

  }

}