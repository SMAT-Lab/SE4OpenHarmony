@Entry
@Component
struct MainPage {
  @State message: string = 'Hello World'

  build() {
    Column() {
        Tabs({barPosition:BarPosition.End}){
          // 首页
          TabContent(){
            Column(){
              Text('首页').fontSize('60px').fontWeight(600)
              Swiper() {
                
              }.onChange((index: number) => {
                
              })
              



            }
          }.tabBar('首页')
          .backgroundColor(0xefefef)



          // 我的
          TabContent(){
            Text('22222222222')

          }.tabBar('首页')
          .backgroundColor(0xefefef)



        }.backgroundColor(Color.White)
    }
    .width('100%')
    .height('100%')
  }
}