// 用preview装饰的自定义组件可以在预览器上预览
@Preview
@Entry
@Component
struct Index {
  // 表示组件中的状态变量，这个状态变量会引起UI变更
  @State frValue:number =0
  build() {
    Column(){
      Text('双向绑定222222').fontSize(20).fontWeight(700).textStyle()
      Text('父组件值:'+this.frValue).textStyle()
      Row(){
        Button('+',{type:ButtonType.Normal}).backgroundColor(0xff1493).butStyle()
          .onClick(()=>{
            this.frValue++
          })
        Button('-',{type:ButtonType.Normal}).backgroundColor(0xff1493).butStyle()
          .onClick(()=>{
            this.frValue--
          })
      }
      //   应用子组件
      sComponent({sValue:$frValue})//父传子

      Row(){
        Navigator({ target: 'pages/Index', type: NavigationType.Back }) {
          //   按钮
          Button('Back', { type: ButtonType.Capsule }).backgroundColor(0x7ffd4).butStyle()
            .fontColor(0x696969)
            .margin({ top: 20 })
        }
        Navigator({ target: 'pages/EasyMixBind', type: NavigationType.Push }) {
          //   按钮
          Button('Next', { type: ButtonType.Capsule }).backgroundColor(0x7ffd4).butStyle()
            .fontColor(0x696969)
            .margin({ top: 20 })
        }
      }
    }
    .backgroundColor(0x1e90ff)
    .height('100%')
    .width('100%')
  }
}
// 定义子组件
@Component
struct sComponent{
  // 在子组件中用@Prop组件装饰传递变量
  @Link sValue:number
  build(){
    Column(){
      Text('子组件值：'+this.sValue).textStyle()
      Row(){
        Button('+',{type:ButtonType.Normal}).backgroundColor(0xff6984).butStyle()
          .onClick(()=>{
            this.sValue++
          })
        Button('-',{type:ButtonType.Normal}).backgroundColor(0xff6984).butStyle()
          .onClick(()=>{
            this.sValue--
          })
      }
      // .justifyContent(FlexAlign.SpaceBetween)
      //   调用孙组件
      // 当用到@Prop组件，调用父数据用this，当用到@Link组件，调用父数据用$
      grandsComponent({ grandsValue: $sValue })
    }
    .backgroundColor(0x00BFF)
    .width('80%')
    .height("60%")
    .margin({top:30})
  }
}
// 定义孙组件
@Component
struct grandsComponent{
  @Link grandsValue:number
  build(){
    Column(){
      Text('孙组件的值：'+this.grandsValue).textStyle().margin({top:30,bottom:30})
      Row(){
        Button('+',{type:ButtonType.Normal}).backgroundColor(0xffc0cb).butStyle()
          .onClick(()=>{
            this.grandsValue++
          })
        Button('-',{type:ButtonType.Normal}).backgroundColor(0xffc0cb).butStyle()
          .onClick(()=>{
            this.grandsValue--
          })
      }

    }.backgroundColor(0x87cefa)
    .width('80%')
    .height('45%')
    .margin({top:30})
  }
}

//自定义组件，
// 可组合、可重用、具有生命周期、数据驱动更新
// 数据驱动更新：由状态变量的数据驱动，实现UI的自动更新，
// 也就是说，当我当前的自定义组件内容发生改变时，它会返回通知调用它的build重新构建
/*
@Component
struct myComponent{
  build(){
    Column(){
      Text('自定义组件1111')
    }
  }
}*/
@Extend(Text)function  textStyle(){
  .fontColor(0xffffff)
  .margin({top:5,bottom:10})
  .fontSize(30)
  .fontWeight(1000)
}
@Extend(Button)function butStyle(){
  .borderRadius(8)
  .width(90)
  .margin({
    // left:40,
    right:30
  })

}
