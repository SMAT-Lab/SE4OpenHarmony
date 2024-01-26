// ArkTs为了避免开发者对重复样式的设置,
// @Styles可以将多个样式设置提炼成一个方法,直接在组件声明时调用
// @Styles可以定义在组件内或组件外，在组件外定义时需要在方法名前加上‘function’关键字，在组件内不需要加
@Entry
@Component
struct DynamicStyleBuild {
  // 在组件内定义的时候，不需要加function
  @Styles normalStyle(){
    .backgroundColor(0xff69b4)
    .width('95')
    .height('95')
  }
  //   调用customDialog组件
  dialogController:CustomDialogController=new CustomDialogController({
    builder:DialogExample({action:this.onAccept}),//自定义弹窗内容构造器
    // cancel:this.existApp(),//点击遮障层退出时的回调
    autoCancel:true//是否允许点击遮障层退出
  })
  onAccept(){
    console.info('OnAccept')
  }
  existApp(){
    console.info('Cancel dialog')
  }
  build() {
    Column() {
      //   调用组件内定义的Style
      Button('@Styles类型')
        .stateStyles({
          //   在stateStyles中，可以直接调用组件外定义的Style
          //   在stateStyles中，要用this调用组件内定义的Style
          normal: this.normalStyle,
          pressed: outStyle
        })
      Button('@Dialog')
        .onClick(()=>{
          this.dialogController.open()
        })
    }
    .width('100%')
    .height('100%')
    .backgroundColor(0x1e90ff)
  }
}
//在组件外定义的时候，要加function关键字
@Styles function outStyle(){
  .width(120)
  .height(120)
  .backgroundColor(0x00bfff)
}
//在自定义组件外定义@CustomDialog
@CustomDialog
struct DialogExample{
  controller:CustomDialogController
  action:()=>void
  build(){
    Column(){
      Button('CustomDialog Close')
        .onClick(()=>{
          this.controller.close()
          this.action()
        })
    }
  }
}