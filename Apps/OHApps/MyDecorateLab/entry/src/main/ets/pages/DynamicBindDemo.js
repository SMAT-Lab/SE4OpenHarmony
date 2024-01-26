"use strict";
struct DynamicBindDemo extends   {
    constructor() { }
    build() {
            .height('100%')
            .width('100%')
            .backgroundColor(0x1e90ff);
    }
    //   Style定义在组件内,不加function关键字
    stylePressed() {
        
    
            .width(120)
            .height(120)
            .backgroundColor(0x00bfff);
    }
}
// Extend只能定义在组件外
function TextDem(fontSize) {
    
  
        .fontColor(0xffffff)
        .fontWeight(700)
        .fontStyle(FontStyle.Italic)
        .fontSize(fontSize)
        .margin({ top: 10 });
}
// styles定义在组件外，需要加function关键字
function StyleNorm() {
    
  
        .backgroundColor(0xff69b4)
        .height(95)
        .width(95);
}
//   CustomDialog定义在组件外,自定义弹窗组件
struct DialogDemo extends  {
    constructor() { }
    build() {
            .onClick(() => {
            this.controller.close();
        });
    }
}
//# sourceMappingURL=DynamicBindDemo.js.map