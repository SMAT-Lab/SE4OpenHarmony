@Preview  //添加预览功能
  // 自定义组件xingzuo
@Component
export struct xingzuo{
  @State topic:string = "事业指数："
  @State text:string = "100"
  @State img:Resource = $r("app.media.cute")  // 设置默认值,需要传入
  // @State img2:Resource = $r("app.media.go")
  // @State bgColor:     // 定义默认颜色
  build(){

    Row({space:10}){
      Image(this.img).width(37)
        // .fillColor(Color.Orange)   //fillcolor只能对svg格式的图片使用
        // .margin({
        //   left:5
        // })
        .margin({left:25,right:7,top:9,bottom:9})
      Row() {
        Text(this.topic)
        Text(this.text)
      }
      // Blank()

    }.width("80%")
    .backgroundColor(Color.White)
    .borderRadius(15)
    .borderColor(Color.Gray)
    .borderWidth(1)
    .margin(10)
  }
}