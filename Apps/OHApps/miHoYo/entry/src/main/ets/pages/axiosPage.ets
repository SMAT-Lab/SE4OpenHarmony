import axios from '@ohos/axios'
import { HealthyModel } from '../Model/healthyModel'
import prompt from '@ohos.prompt'
import promptAction from '@ohos.promptAction'

@Entry
@Component
struct AxiosPage {
  @State message: string = 'Hello World'
  private baseUrl: string = "http://apis.juhe.cn/fapigx/healthtip/query?key=749faa66c0d7676ae6ec73efd4833b47"

  aboutToAppear() {


    this.getData()


  }

  getData() {

    axios.get(this.baseUrl,).then(response => {
      // let  mode:HealthyModel=JSON.parse(response.data)
      //    this. message=mode.result.content
      promptAction.showToast({
        message: JSON.stringify(response)

      })
      this.message = JSON.stringify(response)
      console.info("12322" + JSON.stringify(response))


    })
    //   // 发送一个get请求
    //   axios({
    //     method: "get",
    //     url: this.baseUrl
    //   }).then(function (response) {
    //     console.info(JSON.stringify(response));
    //
    //
    //     let  mode:HealthyModel=JSON.parse(response.data)
    //    this. message=mode.result.content
    //
    //     promptAction.showToast({
    //       message:JSON.stringify(response)
    //     })
    //   })
  }

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold).onClick(() => {

          this.getData()
        })
      }
      .width('100%')
    }
    .height('100%')
  }
}