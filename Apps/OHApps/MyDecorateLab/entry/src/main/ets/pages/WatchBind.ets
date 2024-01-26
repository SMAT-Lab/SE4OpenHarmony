// @Watch用于监听状态变量的变换，通过@Watch注册一个回调方法Onchanged，
// 当状态变量count被改变时，触发Onchange回调
@Entry
@Component
struct WatchBind {
  @State @Watch('OnNumChange')Num:number=0
  @State Num2:number=0
  // Watch监听的状态变量一发生改变，就会调用它此函数
  OnNumChange(){
    this.Num2+=2
  }
  build() {
      Column() {
        Text("@Watch的使用6666").textform1()
        Row(){
          Text('Num='+this.Num).textform1().margin({right:40})
          Text('Num2='+this.Num2).textform1()
        }
        Divider().vertical(false).strokeWidth(5).color(0xffffff)
        Button('Num+1').but1form1().onClick(()=>{
          this.Num++
        })
        Divider().vertical(false).strokeWidth(5).color(0xffffff)
        Navigator({target:"pages/proConsumeDate",type:NavigationType.Back}){
          Button('Back').but1form1()
        }
        Navigator({target:"pages/DynamicBindDemo",type:NavigationType.Push}){
          Button('Next').but1form1()
        }
      }
      .width('100%')
      .height('100%')
      .backgroundColor(0x1e90ff)
  }
}
@Extend(Text)function textform1(){
  .fontSize(20)
  .fontColor(0xffffff)
  .fontWeight(700)
  .margin({top:10,bottom:10})
}
@Extend(Button)function but1form1(){
  .backgroundColor(0xff1493)
  .width(220)
  .margin({top:30,bottom:30})
}