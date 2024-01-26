
import router from '@ohos.router'
@Component
export struct TitleDesc {
  private text: string
  private Url: string

  build() {
    Stack({ alignContent: Alignment.Center }) {
      //      Rect({ width: '100%', height: 100 }).fill(Color.Orange)
      Button(this.text)
        .fontSize(20)
        .fontWeight(FontWeight.Bold)
        .fontColor(Color.Black)
        .width("100%")
        .height(60)
        .backgroundColor(Color.Orange)
    }
    .onClick(() => {
      router.pushUrl({ url: this.Url })
    })
    .margin(10)
  }
}

