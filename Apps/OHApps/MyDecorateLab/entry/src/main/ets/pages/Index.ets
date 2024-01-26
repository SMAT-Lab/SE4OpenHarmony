// 用preview装饰的自定义组件可以在预览器上预览
@Preview
@Entry
@Component
struct TwoDirectionBind {
  // 表示组件中的状态变量，这个状态变量会引起UI变更
  @State fatherValue: number = 0

  build() {
    Column() {
      Text('单向绑定1111111').fontSize(20).fontWeight(700).tStyle()
      Text('父组件值:' + this.fatherValue).tStyle()
      Row() {
        Button('+', { type: ButtonType.Normal }).backgroundColor(0xff1493).bStyle()
          .onClick(() => {
            this.fatherValue++
          })
        Button('-', { type: ButtonType.Normal }).backgroundColor(0xff1493).bStyle()
          .onClick(() => {
            this.fatherValue--
          })
      }
      //   应用子组件
      sonComponent({ sonValue: this.fatherValue }) //父传子
      //   实现页面跳转
      Navigator({ target: "pages/TwoDirectionBind", type: NavigationType.Push }) {
        //   按钮
        Button('Next', { type: ButtonType.Capsule }).backgroundColor(0x7ffd4).bStyle()
          .fontColor(0x696969)
          .margin({ top: 20 })
      }
    }
    .backgroundColor(0x1e90ff)
    .height('100%')
    .width('100%')
  }
}
// 定义子组件
@Component
struct sonComponent {
  // 在子组件中用@Prop组件装饰传递变量
  @Prop sonValue: number

  build() {
    Column() {
      Text('子组件值：' + this.sonValue).tStyle()
      Row() {
        Button('+', { type: ButtonType.Normal }).backgroundColor(0xff6984).bStyle()
          .onClick(() => {
            this.sonValue++
          })
        Button('-', { type: ButtonType.Normal }).backgroundColor(0xff6984).bStyle()
          .onClick(() => {
            this.sonValue--
          })
      }
      // .justifyContent(FlexAlign.SpaceBetween)
      //   调用孙组件
      grandsonComponent({ grandsonValue: this.sonValue })
    }
    .backgroundColor(0x00BFF)
    .width('80%')
    .height("60%")
    .margin({ top: 30 })
  }
}
// 定义孙组件
@Component
struct grandsonComponent {
  @Prop grandsonValue: number

  build() {
    Column() {
      Text('孙组件的值：' + this.grandsonValue).tStyle().margin({ top: 30, bottom: 30 })
      Row() {
        Button('+', { type: ButtonType.Normal }).backgroundColor(0xffc0cb).bStyle()
          .onClick(() => {
            this.grandsonValue++
          })
        Button('-', { type: ButtonType.Normal }).backgroundColor(0xffc0cb).bStyle()
          .onClick(() => {
            this.grandsonValue--
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
@Extend(Text) function tStyle() {
  .fontColor(0xffffff)
  .margin({ top: 5, bottom: 10 })
  .fontSize(30)
  .fontWeight(1000)
}

@Extend(Button) function bStyle() {
  .borderRadius(8)
  .width(90)
  .margin({
    // left:40,
    right: 30
  })

}
