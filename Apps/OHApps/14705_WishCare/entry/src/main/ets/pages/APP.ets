@Entry
@Component
struct Home1 {
  @State message: string = 'Hello World'

  build() {
    Column() {
      Flex({ direction: FlexDirection.Column, justifyContent: FlexAlign.End }) {
        Flex() {
          Row() {
            Text("主页")
              .width("100%")
              .height("70vp")
              .offset({ x: "-19.66px", y: "0" })
              .textAlign(TextAlign.Center)
              .fontSize("70px")
              .fontWeight(FontWeight.Regular)
          }          
          .width("100%")
          .height("100vp")
          .alignItems(VerticalAlign.Top)
        }        
        .width("100%")
        .height("100vp")
        .flexGrow(1)
        .backgroundColor("#ffffff")
        Row() {
          Column() {
            Image($r('app.media.img_1'))
              .width("70%")
              .height("70%")
              .objectFit(ImageFit.Contain)
              .objectRepeat(ImageRepeat.NoRepeat)
            Text("首页")
              .width("100%")
              .height("30%")
              .offset({ x: "-1px", y: "0" })
              .textAlign(TextAlign.Center)
              .fontSize("20fp")
              .fontWeight(FontWeight.Bold)
          }          
          .width("25%")
          .height("100%")
          .backgroundColor("#ffffff")
          Column() {
            Image($r('app.media.img_2'))
              .width("70%")
              .height("70%")
              .objectFit(ImageFit.Contain)
              .objectRepeat(ImageRepeat.NoRepeat)
            Text("健康报告")
              .width("100%")
              .height("30%")
              .offset({ x: "-1px", y: "0" })
              .textAlign(TextAlign.Center)
              .fontSize("20fp")
              .fontWeight(FontWeight.Bold)
          }          
          .width("25%")
          .height("100%")
          .backgroundColor("#ffffff")
          Column() {
            Image($r('app.media.img_3'))
              .width("70%")
              .height("70%")
              .objectFit(ImageFit.Contain)
              .objectRepeat(ImageRepeat.NoRepeat)
            Text("运动计划")
              .width("100%")
              .height("30%")
              .offset({ x: "-1px", y: "0" })
              .textAlign(TextAlign.Center)
              .fontSize("20fp")
              .fontWeight(FontWeight.Bold)
          }          
          .width("25%")
          .height("100%")
          .backgroundColor("#ffffff")
          Column() {
            Image($r('app.media.img_4'))
              .width("70%")
              .height("70%")
              .objectFit(ImageFit.Contain)
              .objectRepeat(ImageRepeat.NoRepeat)
            Text("我的家庭")
              .width("100%")
              .height("30%")
              .offset({ x: "-1px", y: "0" })
              .textAlign(TextAlign.Center)
              .fontSize("20fp")
              .fontWeight(FontWeight.Bold)
          }          
          .width("25%")
          .height("100%")
          .backgroundColor("#ffffff")
        }        
        .width("100%")
        .height("10%")
        .backgroundColor("#d15959")
        .alignItems(VerticalAlign.Top)
        .justifyContent(FlexAlign.SpaceBetween)
      }      
      .width("100%")
      .height("100%")
    }    
    .width("100%")
    .height("100%")
  }

}