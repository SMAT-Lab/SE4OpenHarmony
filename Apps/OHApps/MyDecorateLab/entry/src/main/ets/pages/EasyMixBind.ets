// 用preview装饰的自定义组件可以在预览器上预览
// 复杂的单双向传递，父---->子<----->孙
@Preview
@Entry
@Component
struct EasyMixBind {
  // 表示组件中的状态变量，这个状态变量会引起UI变更
  // @State ffValue2:number= 0 //传递
   ffValue2:number= 0 //传递
  @State ffValue: number =  this.ffValue2   //绑定

  build() {
    Column() {
      Text('复杂单+双向绑定333333').fontSize(20).fontWeight(700).ttStyle()
      Text('父组件值:' + this.ffValue).ttStyle()
      Row() {
        Button('+', { type: ButtonType.Normal }).backgroundColor(0xff1493).bb()
          .onClick(() => {
            this.ffValue++//父组件展示
            this.ffValue2++//传给子组件
            // console.log(this.ffValue2 + '')
          })
        Button('-', { type: ButtonType.Normal }).backgroundColor(0xff1493).bb()
          .onClick(() => {
            this.ffValue--
            this.ffValue2--
          })
      }
      //   应用子组件
      // ssComponent({ fromFV:this.ffValue2}) //父传子
      ssComponent({ ssValue:this.ffValue2}) //父传子
      //   实现页面跳转
      Row(){
        Navigator({ target: "pages/TwoDirectionBind", type: NavigationType.Back }) {
          //   按钮
          Button('Back', { type: ButtonType.Capsule }).backgroundColor(0x7ffd4).bb()
            .fontColor(0x696969)
            .margin({ top: 20 })
        }
        Navigator({ target: "pages/ClassBind", type: NavigationType.Push }) {
          //   按钮
          Button('Next', { type: ButtonType.Capsule }).backgroundColor(0x7ffd4).bb()
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
struct ssComponent {
  // 在子组件中用@Prop组件装饰传递变量
  //   @Prop fromFV:number
  //  @State ssValue: number= this.fromFV
   @State ssValue: number= 0

  build() {
    Column() {

      Text('子组件值：' + this.ssValue).ttStyle()
      .onClick(()=>{
        console.log( 'sscom' + this.ssValue)
      })
      Row() {
        Button('+', { type: ButtonType.Normal }).backgroundColor(0xff6984).bb()
          .onClick(() => {
            this.ssValue++
            // this.fromFV++
          })
        Button('-', { type: ButtonType.Normal }).backgroundColor(0xff6984).bb()
          .onClick(() => {
            this.ssValue--
            // this.fromFV--
          })
      }
      // .justifyContent(FlexAlign.SpaceBetween)
      //   调用孙组件
      grandssComponent({ grandssValue: $ssValue })
    }
    .backgroundColor(0x00BFF)
    .width('80%')
    .height("60%")
    .margin({ top: 30 })
  }
}
// 定义孙组件
@Component
struct grandssComponent {
  @Link grandssValue: number

  build() {
    Column() {
      Text('孙组件的值：' + this.grandssValue).ttStyle().margin({ top: 30, bottom: 30 })
      Row() {
        Button('+', { type: ButtonType.Normal }).backgroundColor(0xffc0cb).bb()
          .onClick(() => {
            this.grandssValue++
          })
        Button('-', { type: ButtonType.Normal }).backgroundColor(0xffc0cb).bb()
          .onClick(() => {
            this.grandssValue--
          })
      }

    }.backgroundColor(0x87cefa)
    .width('80%')
    .height('45%')
    .margin({ top: 30 })
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
@Extend(Text) function ttStyle() {
  .fontColor(0xffffff)
  .margin({ top: 5, bottom: 10 })
  .fontSize(30)
  .fontWeight(1000)
}

@Extend(Button) function bb() {
  .borderRadius(8)
  .width(90)
  .margin({
    // left:40,
    right: 30
  })

}
