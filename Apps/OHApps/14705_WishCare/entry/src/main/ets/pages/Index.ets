import router from '@ohos.router';
@Entry
@Component
struct Index {
  @State message: string = 'WiseCare'

  build() {
    Column() {
      Column() {
        Image($r('app.media.img'))
          .width("100%")
          .height("100%")
          .offset({ x: "0", y: "0px" })
      }      
      .width("100%")
      .height("100%")
      .offset({ x: "0px", y: "0px" })
      .alignItems(HorizontalAlign.End)
      Text(`${this.message}`)
        .width("300vp")
        .height("60vp")
        .offset({ x: "-90px", y: "-2046.91px" })
        .textAlign(TextAlign.Center)
        .fontSize("50fp")
        .fontWeight(FontWeight.Bold)
    }    
    .width("100%")
    .height("100%")
    .alignItems(HorizontalAlign.End)
  }

  aboutToAppear() {
    //延迟五秒钟 做一个操作
    setTimeout(function () {
      //操作的内容->跳转
      router.pushUrl({
        url: "pages/login"
      })

    }, 5000)
  }
  //跳转时候动画
  pageTransition() {
    //入场动画
    PageTransitionEnter({ duration: 2000, curve: Curve.Friction }).slide(SlideEffect.Left)
    //出场动画
    PageTransitionExit({ duration: 2000, curve: Curve.Smooth }).slide(SlideEffect.Bottom)
  }
}