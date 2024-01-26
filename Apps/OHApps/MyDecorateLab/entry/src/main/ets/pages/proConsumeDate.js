"use strict";
//@Provide作为数据的提供方，可以更新其子孙节点的数据，并处罚页面渲染
//@Consumer在感知到@Provide数据的更新后，会触发当前自定义组建的重新渲染
// @Provide的变量类似与@State，可以修改对应变量进行页面重新渲染。也可以修改@Consume装饰的变量，反向修改@State变量
//本案例中父组件中的状态变量使用@Provide装饰，子、孙组件中的状态变量使用@Consume装饰，则会形成父子、子孙凉凉双向传递的数据流
struct comA extends  {
    constructor(
//@Provide作为数据的提供方，可以更新其子孙节点的数据，并处罚页面渲染
//@Consumer在感知到@Provide数据的更新后，会触发当前自定义组建的重新渲染
// @Provide的变量类似与@State，可以修改对应变量进行页面重新渲染。也可以修改@Consume装饰的变量，反向修改@State变量
//本案例中父组件中的状态变量使用@Provide装饰，子、孙组件中的状态变量使用@Consume装饰，则会形成父子、子孙凉凉双向传递的数据流
    ) {
    }
    // string给变量名起一个别名
    build() {
            .height('100%')
            .width('100%')
            .backgroundColor(0x1e90ff);
    }
}
// 子组件
struct comB extends  {
    constructor(
//@Provide作为数据的提供方，可以更新其子孙节点的数据，并处罚页面渲染
//@Consumer在感知到@Provide数据的更新后，会触发当前自定义组建的重新渲染
// @Provide的变量类似与@State，可以修改对应变量进行页面重新渲染。也可以修改@Consume装饰的变量，反向修改@State变量
//本案例中父组件中的状态变量使用@Provide装饰，子、孙组件中的状态变量使用@Consume装饰，则会形成父子、子孙凉凉双向传递的数据流
    //@Provide作为数据的提供方，可以更新其子孙节点的数据，并处罚页面渲染
    //@Consumer在感知到@Provide数据的更新后，会触发当前自定义组建的重新渲染
    // @Provide的变量类似与@State，可以修改对应变量进行页面重新渲染。也可以修改@Consume装饰的变量，反向修改@State变量
    //本案例中父组件中的状态变量使用@Provide装饰，子、孙组件中的状态变量使用@Consume装饰，则会形成父子、子孙凉凉双向传递的数据流
    ) {
        //@Provide作为数据的提供方，可以更新其子孙节点的数据，并处罚页面渲染
        //@Consumer在感知到@Provide数据的更新后，会触发当前自定义组建的重新渲染
        // @Provide的变量类似与@State，可以修改对应变量进行页面重新渲染。也可以修改@Consume装饰的变量，反向修改@State变量
        //本案例中父组件中的状态变量使用@Provide装饰，子、孙组件中的状态变量使用@Consume装饰，则会形成父子、子孙凉凉双向传递的数据流
    }
    build() {
        .width('80%')
            .height('50%')
            .backgroundColor(0x00bfff)
            .margin({ top: 10, bottom: 10 });
    }
}
// 孙组件
struct comC extends  {
    constructor(
//@Provide作为数据的提供方，可以更新其子孙节点的数据，并处罚页面渲染
//@Consumer在感知到@Provide数据的更新后，会触发当前自定义组建的重新渲染
// @Provide的变量类似与@State，可以修改对应变量进行页面重新渲染。也可以修改@Consume装饰的变量，反向修改@State变量
//本案例中父组件中的状态变量使用@Provide装饰，子、孙组件中的状态变量使用@Consume装饰，则会形成父子、子孙凉凉双向传递的数据流
    //@Provide作为数据的提供方，可以更新其子孙节点的数据，并处罚页面渲染
    //@Consumer在感知到@Provide数据的更新后，会触发当前自定义组建的重新渲染
    // @Provide的变量类似与@State，可以修改对应变量进行页面重新渲染。也可以修改@Consume装饰的变量，反向修改@State变量
    //本案例中父组件中的状态变量使用@Provide装饰，子、孙组件中的状态变量使用@Consume装饰，则会形成父子、子孙凉凉双向传递的数据流
    ) {
        //@Provide作为数据的提供方，可以更新其子孙节点的数据，并处罚页面渲染
        //@Consumer在感知到@Provide数据的更新后，会触发当前自定义组建的重新渲染
        // @Provide的变量类似与@State，可以修改对应变量进行页面重新渲染。也可以修改@Consume装饰的变量，反向修改@State变量
        //本案例中父组件中的状态变量使用@Provide装饰，子、孙组件中的状态变量使用@Consume装饰，则会形成父子、子孙凉凉双向传递的数据流
    }
    build() {
        .width('80%')
            .height('50%')
            .backgroundColor(0x87cefa)
            .margin({ top: 10, bottom: 10 });
    }
}
function textstyle4() {
    
  
        .fontWeight(700)
        .fontSize(30)
        .fontColor(0xffffff)
        .margin({ top: 10, bottom: 10 });
}
function buSty() {
    
  
        .fontColor(0xffffff)
        .backgroundColor(0xff1493)
        .borderRadius(8)
        .margin({ left: 40 })
        .width(90);
}
function buSty2() {
    
  
        .fontColor(0x696969)
        .backgroundColor(0x7fffd4)
        .borderRadius(8)
        .margin({ left: 40 })
        .width(90);
}
//# sourceMappingURL=proConsumeDate.js.map