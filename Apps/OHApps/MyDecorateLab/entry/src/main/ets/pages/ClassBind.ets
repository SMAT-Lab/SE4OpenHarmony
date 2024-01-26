// 数据对象
class ClassB{
  public name:string
//   嵌套一个类
  public a:ClassA
  constructor(a:ClassA,name:string='Mike'){
    this.a=a;
    this.name=name
  }
}
// 内置ClassA,要传递或修改的数据就是这里面的内容
@Observed
class ClassA{
  public name:string
  public id:number
  constructor(id:number,name:string='OK'){
    this.name=name
    this.id=id
  }
}

@Entry
@Component
struct classBind{
  @State fatherValue:ClassB=new ClassB(new ClassA(10))
  build(){
    Column(){
      Text('@Observed与@ObjectLink44444444').textform()
      Text('父组件的ID值:'+this.fatherValue.a.id).textform()
      // 按钮交互区
      Column() {
        // 点击+，子组件ID自增
        // 不会生效，只会导致@ObjectLInk装饰的变量法国所在组件被刷新，当前组件是不会被刷新的
        Button('+', { type: ButtonType.Capsule, }).but1form()
          .onClick((event: ClickEvent) => {
            this.fatherValue.a.id+=1

          })
        // 点击，父组件ID和子组件ID一起清0
        // 重置数据对象中的类
        Button('重置方式一', { type: ButtonType.Capsule, }).but1form()
          .onClick((event: ClickEvent) => {
            this.fatherValue.a=new ClassA(0)
          })
        // 点击，只有子组件清0
        // 重置数据对象
        Button('重置方式二', { type: ButtonType.Capsule, }).but1form()
          .onClick((event: ClickEvent) => {
            this.fatherValue=new ClassB(new ClassA(0))
          })
      }
      // 子组件
      sonCompo({sonValue:this.fatherValue.a})

    //   页面切换按钮
      Row(){
        Navigator({target:'pages/EasyMixBind',type:NavigationType.Back}){
          Button('Back').but3form()
        }
        Navigator({target:'pages/proConsumeDate',type:NavigationType.Push}){
          Button('Next').but3form()
        }
      }

    }.width('100%')
    .height('100%')
    .backgroundColor(0x1e90ff)
  }
}

@Component
struct sonCompo{
  @ObjectLink sonValue:ClassA
  build(){
    Column(){
      Text('子组件的ID值:'+this.sonValue.id).textform()
      Row(){
        Button('+',{type:ButtonType.Normal}).but2form()
          .onClick(()=>{
            this.sonValue.id+=1
          })
        Button('reset',{type:ButtonType.Normal}).but2form()
          .onClick(()=>{
            this.sonValue=new ClassA(0)
          })
      }
    }.width('80%')
    .height('40%')
    .backgroundColor(0x00bfff)
    .margin({top:20})
  }
}

@Extend(Text)function textform(){
  .fontSize(20)
  .fontColor(0xffffff)
  .fontWeight(700)
  .margin({top:10,bottom:10})
}
@Extend(Button)function but1form(){
  .backgroundColor(0xff1493)
  .width(320)
  .margin(4)
}
@Extend(Button)function but2form(){
  .backgroundColor(0xff69b4)
  .width(90)
  .borderRadius(8)
  .margin({right :30})
}
@Extend(Button)function but3form(){
  .borderRadius(4)
  .backgroundColor(0x7ffd4)
  .width(120)
  .fontColor(0x696969)
  .margin({top:20,left:20})
}
