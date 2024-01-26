// 导入常量封装文件。
import router from '@ohos.router'
import CommonConstants from '../common/constants/CommonConstants'

@Entry
@Component
struct Index {

    @State userName:string = ''

  build() {
    Column({ space: 10 }) {
      Text(CommonConstants.INDEX_MESSAGE)
        .fontSize(40)
        .fontWeight(700)
      Row({ space: 10 }) {
        //button的形状
        Button('状', { type: ButtonType.Normal })
          .fancy(Color.Red)

        Button('元', { type: ButtonType.Normal })
          .fancy('#fed700')
      }

      Row({ space: 10 }) {
        Button('及', { type: ButtonType.Normal })
          .fancy('#4293ff')
        Button('弟', { type: ButtonType.Normal })
          .fancy('#00cd66')
      }

      Row({ space: 10 }) {
        TextInput({ placeholder: '请输入考生姓名' })
          .tIptStyle()
        //当输入框内容发生改变的时候触发
          .onChange((value)=>{
            this.userName = value
          })
        Image($rawfile('images/about.png'))
          .imgStyle()
          .onClick(()=>{
              //调用一个函数，这个函数会给我一个弹窗
              this.aboutGame()
          })
      }

      Button('进入游戏',{type:ButtonType.Normal})
        .goGameBtnStyle()
        .onClick(()=>{
          router.push({
            url:CommonConstants.SECOND_URL,
            params: {
              'userName' :this.userName
            }
          })
        })
    }
    .width('100%')
    .height('100%')
  }

  //封装一个函数：弹出游戏规则弹窗界面
  aboutGame(){
    //弹出规则窗口
    AlertDialog.show({
      title:'游戏规则',
      message:CommonConstants.RULES_OF_THE_GAME,
      //点击弹窗之外区域，自动关闭弹窗
      autoCancel:true,
      //第一个按钮
      primaryButton:{
        value:'取消',
        action:()=>{
          //点击会触发这个action
          console.info('点击了游戏规则弹窗的取消按钮！！！')
        }
      },
      //第二个按钮
      secondaryButton:{
        value:'OK',
        action:()=>{
          console.info('点击了游戏规则弹窗的OK按钮！！！')
        }
      },
      //让弹窗从默认的中间，设置到底部显示
      alignment:DialogAlignment.Bottom,
      // 灵活利用偏移量设置弹窗位置
      // offset:{dx:0,dy:-300}
      // 占了 多少网格，控制弹窗宽度
      gridCount:5
    })
  }
}

//封装共性属性值。提高复用性
@Extend(Button) function fancy(bgcolor) {
  .backgroundColor(bgcolor)
  .width('43%')
  .height('20%')
  .fontSize(24)
  .borderRadius(10)
  .shadow({
    radius: 10,
    color: 0xD3D3D3,
    offsetX: 20,
    offsetY: 20
  })
}

//输入框样式
@Extend(TextInput) function tIptStyle() {
  .width('75%')
  .height(50)
  .margin(20)
  .borderRadius(0)
  .style(TextInputStyle.Inline)
}


// 关于游戏规则的那个问好图片的样式。
@Extend(Image) function imgStyle() {
  .width(30)
  .height(30)
  //不清楚该样式的作用，可以到官方文档查看详细解释
  .objectFit(ImageFit.Contain)
}

// 进入游戏按钮的样式封装
@Extend(Button) function goGameBtnStyle(){
  .width('50%')
  .height('8%')
  .borderRadius(8)
  .fontSize(24)
  .fontWeight(700)
  .shadow({
    radius:10,
    color:0xd3d3d3,
    offsetX:20,
    offsetY:20
  })
}





