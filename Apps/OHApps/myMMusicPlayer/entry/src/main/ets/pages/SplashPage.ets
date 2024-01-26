import router from '@ohos.router'

@Entry
@Component
struct SplashPage {
  @State secondInfo:number=3
  private timerId
  private intervalId

  aboutToAppear(){
    this.timerId=setTimeout(()=>{
      router.pushUrl({
        url:'pages/Index'
      })
    },3000)

    this.intervalId=setInterval(()=>{
      if (this.secondInfo>0){
        this.secondInfo--
      }
      else{
        clearInterval(this.intervalId)
      }
    },1000)
  }

  aboutToDisappear(){
    clearTimeout(this.timerId)
  }

  build() {
    Stack({alignContent:Alignment.TopEnd}) {
      Image($r('app.media.ic_album'))

      Row(){
        Button(){
          Text('跳过 ')
            .fontSize(16)
        }.backgroundColor(Color.Transparent)

        Text(this.secondInfo+'秒')
          .fontSize(16)
      }.margin({top:10,right:10})

    }.width('100%')
    .height('100%')
  }
}