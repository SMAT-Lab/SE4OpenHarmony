"use strict";
// 用preview装饰的自定义组件可以在预览器上预览
struct Index extends   {
    constructor(// 用preview装饰的自定义组件可以在预览器上预览
    // 用preview装饰的自定义组件可以在预览器上预览
    ) {
    }
    build() {
            .backgroundColor(0x1e90ff)
            .height('100%')
            .width('100%');
    }
}
// 定义子组件
struct sComponent extends  {
    constructor(// 用preview装饰的自定义组件可以在预览器上预览
    // 用preview装饰的自定义组件可以在预览器上预览
    // 用preview装饰的自定义组件可以在预览器上预览
    ) {
        // 用preview装饰的自定义组件可以在预览器上预览
    }
    build() {
            .backgroundColor(0x00BFF)
            .width('80%')
            .height("60%")
            .margin({ top: 30 });
    }
}
// 定义孙组件
struct grandsComponent extends  {
    constructor(// 用preview装饰的自定义组件可以在预览器上预览
    // 用preview装饰的自定义组件可以在预览器上预览
    // 用preview装饰的自定义组件可以在预览器上预览
    ) {
        // 用preview装饰的自定义组件可以在预览器上预览
    }
    build() {
        .backgroundColor(0x87cefa)
            .width('80%')
            .height('45%')
            .margin({ top: 30 });
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
function textStyle() {
    
  
        .fontColor(0xffffff)
        .margin({ top: 5, bottom: 10 })
        .fontSize(30)
        .fontWeight(1000);
}
function butStyle() {
    
  
        .borderRadius(8)
        .width(90)
        .margin({
        // left:40,
        right: 30
    });
}
//# sourceMappingURL=TwoDirectionBind.js.map