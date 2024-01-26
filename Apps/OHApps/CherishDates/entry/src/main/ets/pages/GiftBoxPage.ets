import router from '@ohos.router';

@Entry
@Component
struct GiftBoxPage {
  @State message: string = 'Hello World'

  build() {
    Column() {
      Row() {
        Image($r("app.media.back")).margin({ top: 20 }).width(20).onClick(() => {
          router.pushUrl({
            url: "pages/MePage",
          })
        })
      }.justifyContent(FlexAlign.Start).width("80%").alignItems(VerticalAlign.Top)

      Text("CherishDates")
        .fontSize(30)
        .fontWeight(FontWeight.Bolder)
        .margin({
          top: 10
        })
      Column() {
        Text("感谢您对[ChrishDates]App的支持！为了能够支付服务器和流量费用，让TA持续的迭代更新下去，我们提供了一些非强制的消费功能。在此先行感谢大家的支持！")
          .fontSize(15)
          .textAlign(TextAlign.Start)
          .fontWeight(FontWeight.Regular)
          .fontWeight(FontWeight.Regular)

        Text("如果您喜欢这个产品，可以考虑购买【提醒日礼盒】。此购买为一次性购买，购买后同一账号登录永久有效。礼盒包含以下内容和功能：")
          .fontSize(15)
          .textAlign(TextAlign.Start)
          .fontWeight(FontWeight.Regular)
          .fontWeight(FontWeight.Regular)
      }.margin({
        left: 25, right: 25, bottom: 15, top: 15
      })

      Column() {
        Row() {
          Image($r("app.media.abc")).width(25).margin({ right: 20 })
          Text("所有的提醒日色彩和图表").fontSize(16).fontWeight(FontWeight.Bold)
        }.width("80%").margin(10)

        Row() {
          Image($r("app.media.zhuti")).width(25).margin({ right: 20 })
          Text("所有的主题颜色").fontSize(16).fontWeight(FontWeight.Bold)
        }.width("80%").margin(10)

        Row() {
          Image($r("app.media.yun")).width(25).margin({ right: 20 })
          Text("数据备份与同步").fontSize(16).fontWeight(FontWeight.Bold)
        }.width("80%").margin(10)

        Row() {
          Image($r("app.media.passwordsuo")).width(25).margin({ right: 20 })
          Text("密码锁支持").fontSize(16).fontWeight(FontWeight.Bold)
        }.width("80%").margin(10)

        Row() {
          Image($r("app.media.setting")).width(25).margin({ right: 20 })
          Text("更多的高级选项设置").fontSize(16).fontWeight(FontWeight.Bold)
        }.width("80%").margin(10)

        Row() {
          Image($r("app.media.rocket")).width(25).margin({ right: 20 })
          Text("桌面小组件个性化设置").fontSize(16).fontWeight(FontWeight.Bold)
        }.width("80%").margin(10)

        Row() {
          Image($r("app.media.future")).width(25).margin({ right: 20 })
          Text("未来新功能").fontSize(16).fontWeight(FontWeight.Bold)
        }.width("80%").margin(10)
      }.backgroundColor(Color.Pink).margin({ bottom: 15 }).borderRadius(10)

      Text("购买须知").fontSize(13).fontWeight(FontWeight.Bold).textAlign(TextAlign.Start)
      Column() {
        Text("1、虚拟商品，购买后不支持退款")
          .fontSize(12)
          .margin(6)
        Text("2、提醒日礼盒属于一次性购买，并非订阅收费")
          .fontSize(12)
          .margin(6)
        Text("3、购买状态与您的登录 ID 绑定，若更换设备，只需登录同一个 ID ，并点击右上方的恢复购买即可恢复购买状态")
          .fontSize(12)
          .margin(6)
        Text("4、如果购买遇到问题，请点击此处与我们联系，我们会第一时间给予处理")
          .fontSize(12)
          .margin(6)
      }.alignItems(HorizontalAlign.Start).width("90%").margin({ bottom: 10 })

      Row() {
        Text("  25.00元").margin({ left: 20, right: 155 })
        Button("立即购买").alignSelf(ItemAlign.End).backgroundColor(Color.Pink)
      }.backgroundColor(Color.White).width("100%")
    }

    .width('100%').backgroundColor(Color.White)


    .height('100%')
  }
}
