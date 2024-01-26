//引入commonConstants.ets定义的静态变量
import router from '@ohos.router';
import CommonConstants from '../common/constants/CommonConstants';
@Entry
@Component
struct Index {
  // 声明一个变量用于存储输入的考生信息
  @State StudentName: string=''
  /**
   * 实现页面跳转，并进行参数传递
   * 用到router模块
   * router.push方法，url写上我们要跳转的路径
   * 使用params自定义参数，进行数据传递
   * 目标页面中用router.getParams()获取传递过来的数据
   *
   */
  build() {
    Column({space:10}) {
      Column({space:10}){
        Text(CommonConstants.INDEX_MESSAGE).fontSize(40).fontWeight(700).margin({bottom:10})
        Row({space:10}){
          // 设置按钮的内容、样式、以及按压显示状态，背景颜色
          Button('状',{type:ButtonType.Normal,stateEffect:true})
            .backgroundColor(0xc7000b)
        //   按钮的高、宽、圆角，所有的按钮的样式都是一样的，那么可以对他们进行封装，组件装饰器@Extend
        // 装饰器的使用，节省开发效率
            .fancy()
          Button('元',{type:ButtonType.Normal,stateEffect:true})
            .backgroundColor(0xFFD700)
            .fancy()
        }
        Row({space:10}){
          Button('及',{type:ButtonType.Normal,stateEffect:true})
            .backgroundColor(0x4194ff)
            .fancy()
          Button('第',{type:ButtonType.Normal,stateEffect:true})
            .backgroundColor(0x00cd66)
            .fancy()
        }
      }.margin({top:'5%'})
      // placeholder：提示
      Row({space:10}){
        TextInput({placeholder:'输入考生姓名'}).inputStyle().onChange((value:string)=>{

          // 把输入的值赋值给StudentName变量
          this.StudentName=value
          console.log(value)
          console.error(this.StudentName)
        })
      //   图片组件，必备的src
      //   TO DO(点击图片，出现详情界面）
        Image($rawfile('images/about.png')).imageStyle().onClick(()=>{this.aboutGame()})
      }
      Button('进入游戏',{type:ButtonType.Normal,stateEffect:true})
        .fancy1()
        .onClick(()=>{
          router.push(
            {
              url:CommonConstants.SECOND_URL,
              // 这里的参数是文本框中，我们把输入的文本存入到了studentname变量中
              params:{
                showText:this.StudentName
              }
            }
          )
        })
    }
  }
  // 规则弹窗
  aboutGame(){
    AlertDialog.show({
      title:'游戏规则',
      message:CommonConstants.RULES_OF_THE_GAME,
      autoCancel:true,//点击遮罩层的时候，是否关闭弹窗
      alignment:DialogAlignment.Bottom,//弹窗在竖直方向对齐方式
      gridCount:3,//弹窗容器宽度占用的栅格数
      offset:{dx:0,dy:-300},//弹窗相对于alignment位置的偏移量
    //   定义两个按钮，用来关掉弹窗
    //   第一个按钮，点击cancel的时候被调用
      primaryButton:{
        value:'cancel',
        action:()=>{
          console.log("callback when the first button is clicked")
        }
      },
      // 第二个按钮，点击ok的时候被调用
      secondaryButton:{
        value:'ok',
        action:()=>{
          console.log("callback when the second button is clicked")
        }
      },//点击遮罩层的时候被调用
      cancel:()=>{
        console.log("closed callback");
      }
    })
  }
}


// 定义的装饰器在函数外面，所以要写function
// offset：偏移量
// 按钮的样式
@Extend(Button)function  fancy(){
  .width('35%')
  .height('20%')
  .borderRadius(8)
  .fontSize(24)
  .fontWeight(600)
  .shadow({radius:10,color:0xD3D3D3,offsetX:20})
}
// 输入文本框的样式
@Extend(TextInput)function inputStyle(){
  .width('75%')
  .height(50)
  .margin(20)
  .style(TextInputStyle.Inline)
}
// 图片样式
@Extend(Image) function imageStyle() {
 .objectFit(ImageFit.Contain)
  .height(30)
  .width(30)
}
// 设置“进入游戏”按钮样式
@Extend(Button)function fancy1(){
  .width('50%')
  .height('8%')
  .borderRadius(8)
  .fontSize(24)
  .fontWeight(600)
  .shadow({radius:10,color:0xd3d3d3,offsetX:20,offsetY:20})
}
