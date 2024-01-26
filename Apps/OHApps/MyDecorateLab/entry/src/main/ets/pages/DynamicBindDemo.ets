@Entry
@Component
struct DynamicBindDemo {
  // 调用自定义弹窗
  dialogController:CustomDialogController=new CustomDialogController({
    builder:DialogDemo(),//当前是构造函数，所以函数后面加小括号
    autoCancel:true
  })
  build() {
      Column({space:20}) {
        Text('@Extend~~~~').TextDem(20)
        Divider().vertical(false).strokeWidth(5).color(0xf5f5f5).lineCap(LineCapStyle.Round)
        Button('@Styles~~~~')
          .stateStyles({
            normal:StyleNorm,//调用的时候，外面的不用加任何东西
            pressed:this.stylePressed//调用内部Style样式时，需要加this关键字
          })
        Divider().vertical(false).strokeWidth(5).color(0xf5f5f5).lineCap(LineCapStyle.Round)
        Button('@CustomDialog~~~~').backgroundColor(0xff69b4).width(300).borderRadius(8)
          .onClick(()=>{
          //   弹出弹窗
            this.dialogController.open()
          })
        Divider().vertical(false).strokeWidth(5).color(0xf5f5f5).lineCap(LineCapStyle.Round)
      // 调用builder函数
        this.buildText('Builder~~~~~')
        Divider().vertical(false).strokeWidth(5).color(0xf5f5f5).lineCap(LineCapStyle.Round)
        Row({space:20}){
          Navigator({target:"pages/WatchBind",type:NavigationType.Back}){
            Button('Back').backgroundColor(0x7fffd4).borderRadius(4).width(120).fontSize(20)
          }
          Navigator({target:"pages/Index",type:NavigationType.Push}){
            Button('First').backgroundColor(0x7fffd4).borderRadius(4).width(120).fontSize(20)
          }
        }
      }
      .height('100%')
      .width('100%')
      .backgroundColor(0x1e90ff)
    }
//   Style定义在组件内,不加function关键字
  @Styles stylePressed(){
    .width(120)
    .height(120)
    .backgroundColor(0x00bfff)
  }
//   使用@Builder装饰函数，快速生成布局内容，且此函数在build组件外声明
  @Builder buildText(label:string){
    Text(label).fontSize(25).fontWeight(700).fontColor(0xff69b4)
  }
}
// Extend只能定义在组件外
@Extend(Text)function TextDem(fontSize:number){
  .fontColor(0xffffff)
  .fontWeight(700)
  .fontStyle(FontStyle.Italic)
  .fontSize(fontSize)
  .margin({top :10})
}
// styles定义在组件外，需要加function关键字
@Styles function StyleNorm(){
  .backgroundColor(0xff69b4)
  .height(95)
  .width(95)
}
//   CustomDialog定义在组件外,自定义弹窗组件
@CustomDialog
struct DialogDemo{
  controller:CustomDialogController
  build(){
    Button('CustomDialog close~~~~')
      .onClick(()=>{
        this.controller.close()
      })
  }
}