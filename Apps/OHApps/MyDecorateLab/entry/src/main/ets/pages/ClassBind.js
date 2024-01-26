"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 数据对象
class ClassB {
    constructor(a, name = 'Mike') {
        this.a = a;
        this.name = name;
    }
}
// 内置ClassA,要传递或修改的数据就是这里面的内容
let ClassA = class ClassA {
    constructor(id, name = 'OK') {
        this.name = name;
        this.id = id;
    }
};
ClassA = __decorate([
    Observed
], ClassA);
struct classBind extends  {
    constructor(// 数据对象
    // 数据对象
    // 数据对象
    ) {
        // 数据对象
    }
    build() {
        .width('100%')
            .height('100%')
            .backgroundColor(0x1e90ff);
    }
}
struct sonCompo extends  {
    constructor(// 数据对象
    // 数据对象
    // 数据对象
    ) {
        // 数据对象
    }
    build() {
        .width('80%')
            .height('40%')
            .backgroundColor(0x00bfff)
            .margin({ top: 20 });
    }
}
function textform() {
    
  
        .fontSize(20)
        .fontColor(0xffffff)
        .fontWeight(700)
        .margin({ top: 10, bottom: 10 });
}
function but1form() {
    
  
        .backgroundColor(0xff1493)
        .width(320)
        .margin(4);
}
function but2form() {
    
  
        .backgroundColor(0xff69b4)
        .width(90)
        .borderRadius(8)
        .margin({ right: 30 });
}
function but3form() {
    
  
        .borderRadius(4)
        .backgroundColor(0x7ffd4)
        .width(120)
        .fontColor(0x696969)
        .margin({ top: 20, left: 20 });
}
//# sourceMappingURL=ClassBind.js.map