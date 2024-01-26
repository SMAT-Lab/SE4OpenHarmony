@Entry
@Component
struct ThridPage {
  @State message: string = 'Hello World'
  @State password: string = '密码'
  build() {
    Row() {
      Column() {
        Text(this.message)
          .fontSize(50).fontColor(Color.Orange)
          .fontWeight(FontWeight.Bold)
   Image("https://img1.baidu.com/it/u=1960110688,1786190632&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281").width("50%").height("50%")

        Button("按钮").type(ButtonType.Capsule).width(200).margin(20)

        TextInput({text:this.password},).onChange((value: string)=>{
          this.password=value

        }).height(60)
        Text(this.password).fontSize(60)
      }



      .width('100%')
    }
    .height('100%')
  }
}