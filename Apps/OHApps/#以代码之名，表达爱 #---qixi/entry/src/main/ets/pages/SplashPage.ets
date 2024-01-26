import router from '@ohos.router'
import { PoetryData } from '../model/DataSource'
@Entry
@Component
struct SplashPage {
  @State txtOpacity:number=0
  private timeId:number=0
  private intId:number=0

  @Builder MyRow(txt:string,txtSize:number,delay:number){
    Row(){
      Text(txt)
        .fontSize(txtSize)
        .fontColor('#fff427a9')
        .textAlign(TextAlign.Center)
    }.width('100%')
    .justifyContent(FlexAlign.Center)
    .opacity(this.txtOpacity)
    .animation({
      duration:1000,
      delay:delay,
      tempo:1,
      curve:Curve.Linear,
      playMode:PlayMode.Normal,
      iterations:1
    })
  }

  aboutToAppear(){
    this.intId=setInterval(()=>{
      this.txtOpacity=1
    },2000)
    this.timeId=setTimeout(()=>{
      router.pushUrl({
        url:'pages/Index'
      })
    },10000)
  }

  aboutToDisappear(){
   clearTimeout(this.timeId)
    clearInterval(this.intId)
  }

  build() {
    Column() {
      Column({space:20}) {
        Image($r('app.media.circle7'))
          .size({width:200,height:200})
          .objectFit(ImageFit.Cover)
          .clip(new Circle({width:200,height:200}))
          .margin({bottom:30})

        ForEach(PoetryData,(item)=>{
          this.MyRow(item.txt,item.fSize,item.dTime)
        })
      }
      .width('100%')
      .height('80%')
      .justifyContent(FlexAlign.Center)

      Text('* * * * * * * * * *')
        .fontColor(Color.Red)
        .opacity(this.txtOpacity)
        .animation({
          duration:1000,
          delay:6000,
          tempo:1,
          curve:Curve.Linear,
          playMode:PlayMode.Normal,
          iterations:1
        })
    }.width('100%')
    .height('100%')
    .backgroundImage($r('app.media.qixibackground'))
    .backgroundImageSize(ImageSize.Cover)

  }
  
  pageTransition(){
    PageTransitionEnter({ duration: 1200 })
      .slide(SlideEffect.Left)
    PageTransitionExit({duration:2000})
      .slide(SlideEffect.Left)
      .opacity(0)
  }
}
