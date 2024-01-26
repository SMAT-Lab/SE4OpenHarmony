@Entry
@Component
struct DynamicBind {
  @State message: string = 'Hello World'

  build() {
    Row() {
      Column({space:20}) {
        // 在build中使用被@builder装饰的函数
        this.TextDemo(this.message)
        this.TextDemo('东山：愿先生心境四季如春')
        Text('再见').Tt(20)
        Text('你好').Tt(60)
      }
      .width('100%')
    }
    .height('100%')
  }
  // 在build函数外，使用@Builder装饰一个函数
  @Builder TextDemo(label: string){
    Text(label).fontColor(0xff69b4).fontWeight(700).fontSize(30)
  }
}
@Extend(Text)function Tt(fontSize:number){
  .fontStyle(FontStyle.Italic)
  .fontSize(fontSize)
}