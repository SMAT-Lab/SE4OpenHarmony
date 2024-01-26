"use strict";
// ArkTs为了避免开发者对重复样式的设置,
// @Styles可以将多个样式设置提炼成一个方法,直接在组件声明时调用
// @Styles可以定义在组件内或组件外，在组件外定义时需要在方法名前加上‘function’关键字，在组件内不需要加
struct DynamicStyleBuild extends   {
    constructor(// ArkTs为了避免开发者对重复样式的设置,
    // ArkTs为了避免开发者对重复样式的设置,
// @Styles可以将多个样式设置提炼成一个方法,直接在组件声明时调用
// @Styles可以定义在组件内或组件外，在组件外定义时需要在方法名前加上‘function’关键字，在组件内不需要加
    ) {
    }
    // 在组件内定义的时候，不需要加function
    normalStyle() {
        
    
            .backgroundColor(0xff69b4)
            .width('95')
            .height('95');
    }
    onAccept() {
        console.info('OnAccept');
    }
    existApp() {
        console.info('Cancel dialog');
    }
    build() {
            .width('100%')
            .height('100%')
            .backgroundColor(0x1e90ff);
    }
}
//在组件外定义的时候，要加function关键字
function outStyle() {
    
  
        .width(120)
        .height(120)
        .backgroundColor(0x00bfff);
}
//在自定义组件外定义@CustomDialog
struct DialogExample extends  {
    constructor(// ArkTs为了避免开发者对重复样式的设置,
    // ArkTs为了避免开发者对重复样式的设置,
// @Styles可以将多个样式设置提炼成一个方法,直接在组件声明时调用
// @Styles可以定义在组件内或组件外，在组件外定义时需要在方法名前加上‘function’关键字，在组件内不需要加
    // ArkTs为了避免开发者对重复样式的设置,
    // @Styles可以将多个样式设置提炼成一个方法,直接在组件声明时调用
    // @Styles可以定义在组件内或组件外，在组件外定义时需要在方法名前加上‘function’关键字，在组件内不需要加
    ) {
        // ArkTs为了避免开发者对重复样式的设置,
        // @Styles可以将多个样式设置提炼成一个方法,直接在组件声明时调用
        // @Styles可以定义在组件内或组件外，在组件外定义时需要在方法名前加上‘function’关键字，在组件内不需要加
    }
    build() {
        ;
    }
}
//# sourceMappingURL=DynamicStyleBuild.js.map