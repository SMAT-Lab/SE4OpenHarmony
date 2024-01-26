import prompt from '@ohos.prompt'
import promptAction from '@ohos.promptAction'
import hilog from '@ohos.hilog'

@Entry
@Component
struct ToastPage {
  @State message: string = '弹窗'

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold).onClick(() => {


          promptAction.showToast({
            message: "我是toast", bottom: 400,
            duration: 7000
          })
        })
        Button("弹窗").onClick(() => {
          promptAction.showDialog({
            title: "我是弹窗",
            buttons: [
              {
                text: "文本1",
                color: $r("app.color.start_window_background")
              },
              {
                text: "文本2",
                color: $r("app.color.start_window_background")
              },
              {
                text: "文本3",
                color: $r("app.color.start_window_background")
              }
            ]
          }).then(data=>{
            hilog.info(123,"tag",data.index.toString())

            if(data.index==0){

              console.info("我是"+data.index)


            }


          })
        })

        Button("按钮").onClick(() => {


          promptAction.showActionMenu({
            title: "12",
            buttons: [
              {
                text: "文本1",
                color: $r("app.color.start_window_background")
              },
              {
                text: "文本2",
                color: $r("app.color.start_window_background")
              },
              {
                text: "文本3",
                color: $r("app.color.start_window_background")
              }
            ]
          }).then(data => {

            if(data.index==1){
              promptAction.showToast({
                message: "我是index执行的逻辑",
                bottom: 400,
                duration: 7000
              })

            }
            else {
              promptAction.showToast({
                message: "我其他执行的逻辑",
                bottom: 400,
                duration: 7000
              })

            }



          })
        })
      }
      .width('100%')
    }
    .height('100%')
  }
}