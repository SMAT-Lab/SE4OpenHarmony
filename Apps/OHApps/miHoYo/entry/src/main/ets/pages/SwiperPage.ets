import { Swiper_Data } from "../Model/imagedata"
import router from '@ohos.router'

@Entry
@Component
struct SwiperPage {
  @State message: string = '你们知道吗？'
  @State friend : string[]=["郭祖宇","是","我儿子"]

  private controller: SwiperController = new
  SwiperController()
  private controller2: SwiperController = new
  SwiperController()

  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold)

        ForEach(this.friend, (item: string) => {
          Text(`${
          item
          }`).fontColor(Color.Orange).fontSize(34)
        },)

        Swiper(this.controller) {
          ForEach(this.friend, (item: string) => {
            Text(`${
            item
            }`)
              .fontColor(Color.Orange)
              .fontSize(34)
              .height(200)
              .backgroundColor(Color.Black)
              .width(200)
          },)

        }

        Swiper(this.controller2) {
          ForEach(Swiper_Data, item => {
            Image(item.image)

              .height(200)

              .width(200).onClick(() => {

              router.pushUrl({
                url: item.url
              })
            })
          },)

        }.autoPlay(true)
      }
      .width('100%')
    }
    .height('100%')
  }
}