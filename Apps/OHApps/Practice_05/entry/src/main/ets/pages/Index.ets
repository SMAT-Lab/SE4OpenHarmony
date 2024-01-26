@Entry
@Component
struct Index {
  //****************************************************
  //20230726 OpenHarmony @State 页面刷新与onClick点击事件练习
  //    通过一个简单的按钮与检测按钮点击，让创建的number类型的变量
  //    发生改变，并通过在创建的变量前加入@State检测数字变化刷新页面
  //
  //    彭伟程
  //****************************************************
  @State message: string = 'Hello World'
  @State Num:number = 0   //创建一个number类型的变量Num，并且添加@State检测数字变化刷新页面
  build() {
    Column(){

      Button('按钮')
        .height(40)
        .width(100)
        .onClick(() => [    //创建一个onClick检测按钮点击事件
          this.Num = this.Num +1    //当检测到按钮被点击后，让Num变量加一
        ])

      Text(this.Num.toString())   //用text输出点击后增加的Num变量
        .fontSize(40)
    }
    .height('100%')
    .width('100%')

  }
}