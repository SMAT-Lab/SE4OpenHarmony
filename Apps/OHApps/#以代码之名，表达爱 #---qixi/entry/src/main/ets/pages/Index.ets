import { imgString, qixiString } from '../model/DataSource'

@Entry
@Component
struct Index {
  @State imageVisible: boolean = false
  @State imageOpacity: number = 0
  @State mgWidth:string='100%'
  @State mgHeight:string='100%'
  @State swpFlage:boolean=false
  @State index:number=0

  build() {
    Column() {
      Stack() {
        Swiper(){
          ForEach(imgString,(item)=>{
            Image(item)
              .width("100%")
              .height("100%")
              .objectFit(ImageFit.Fill)
          })
        }.size({width:'100%',height:'100%'})
        .autoPlay(this.swpFlage)
        .indicator(false)
        .loop(true)
        .interval(-1)
        .duration(3000)
        .vertical(false)
        .displayCount(1)
        .onChange((index)=>{
          this.index=index
        })

        Button('我的告白')
          .width('60%')
          .fontSize(32)
          .fontColor(Color.Yellow)
          .backgroundColor('#eff76dbd')
          .padding({ left: 20, right: 20, bottom: 10, top: 10 })
          .visibility(this.imageVisible ? Visibility.None : Visibility.Visible)
          .onClick(() => {
            animateTo({ duration: 3000 }, () => {
              this.imageVisible = true
              this.swpFlage=true
            })
          })
          .transition({ type: TransitionType.Delete, translate: { x: 0, y: -300 }, opacity: 0 })

        if (this.imageVisible) {
          Column() {
            Image($r('app.media.lmqx'))
              .width('60%')
              .height(60)
              .objectFit(ImageFit.Fill)
              .margin({ top: 170, bottom: 30 })
              .transition({ type: TransitionType.Insert, translate: { x: 0, y: -200 } })


            Column({ space: 15 }) {
              ForEach(qixiString, (item, index) => {
                Text(item)
                  .fontSize(18)
                  .fontWeight(FontWeight.Bold)
                  .fontColor(this.index%2==0?'#fff427a9':'#ffffff')
                  .transition({ type: TransitionType.Insert, translate: { x: 0, y: 200 * (index + 4) } })
              })

              Image($r('app.media.qxgif'))
                .size({ width: 300, height: 140 })
                .objectFit(ImageFit.Contain)
                .transition({ type: TransitionType.Insert, translate: { x: 0, y: 200 * 8 } })

            }
          }.width('100%')
          .height('100%')
          .justifyContent(FlexAlign.Start)
        }
      }
      .width("100%")
      .height("100%")
    }
    .width("100%")
    .height("100%")
  }

  pageTransition() {
    PageTransitionEnter({ duration: 2000 })
      .slide(SlideEffect.Right)
    PageTransitionExit({ delay: 100 })
      .opacity(0)
  }
}