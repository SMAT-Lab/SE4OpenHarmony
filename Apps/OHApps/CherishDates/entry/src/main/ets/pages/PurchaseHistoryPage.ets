import router from '@ohos.router';
@Entry
@Component
struct PurchaseHistoryPage {
  @State message: string = 'Hello World'

  build() {
    Row() {
      Column() {
        Row(){
          Image($r("app.media.back")).margin({top:20}).width(20).onClick(()=>{
            router.pushUrl({
              url:"pages/MePage",
            })
          })
        }.justifyContent(FlexAlign.Start).width("80%").alignItems(VerticalAlign.Top)
        Row(){
          Text("我的购买记录")
            .fontSize(45)
            .fontWeight(FontWeight.Bold)
            .margin({top:20,bottom:250})
            .textAlign(TextAlign.Start)
        }.alignItems(VerticalAlign.Top).justifyContent(FlexAlign.Start)


        Text("还没有购买记录~").fontSize(25).fontColor(Color.Pink).margin({bottom:250})
        Button("恢复购买记录").margin({top:50}).type(ButtonType.Normal).fontSize(35).backgroundColor(Color.Pink)
      }
      .width('100%')
    }
    .height('100%')
  }
}
