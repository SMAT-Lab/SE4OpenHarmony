@Preview  //添加预览功能
  // 自定义组件Tabss
@Component
export struct Tabss{
  @State text:string = ""
  @State img:Resource = $r("app.media.cute")  // 设置默认值
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
    }.width("100%")
  }
}