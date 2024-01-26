@Preview  //添加预览功能
  // 自定义组件Tabss2
@Component
export struct Tabss2{
  @State text:string = ""
  @State img:Resource = $r("app.media.cute")  // 设置默认值,需要传入
  @State img2:Resource = $r("app.media.go")
  // @State bgColor:     // 定义默认颜色
  build(){

    Row({space:10}){
      Image(this.img).width(37)
        // .fillColor(Color.Orange)   //fillcolor只能对svg格式的图片使用
        // .margin({
        //   left:5
        // })
        .margin(7)
      Text(this.text)
      Blank()
      Image(this.img2).width(15).fillColor(Color.Gray)
        .margin({
          right:10
        })
    }.width("80%")
    .backgroundColor(Color.White)
    .borderRadius(15)
    .borderColor(Color.Gray)
    .borderWidth(1)
    .margin(10)
  }
}