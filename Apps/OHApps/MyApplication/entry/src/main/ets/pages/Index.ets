import router from '@ohos.router'

@Entry
@Component
struct Index {
  @State message: string = 'Hello World'

  aboutToAppear(){

    // this.message="自定义组件生命周期"

  }


  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50)
          .fontWeight(FontWeight.Bold).onClick(()=>{
          router.pushUrl({
            url:"pages/SecondPage",
            params:{
              value:"harmonyos"
            }
          })

          this.message="鸿蒙培训"


        })
      }
      .width('100%')
    }
    .height('100%')
  }
}