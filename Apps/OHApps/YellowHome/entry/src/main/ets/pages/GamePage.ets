import { CustomDialogExample } from '../common/customComponent/CustomCardDialog'
import CommonConstants from '../common/constants/CommonConstants'
import router from '@ohos.router'
// 获取从EntryAbility中的sencond页面拉起GameAbility时传递并且存储在appStorage中的userName
let userName: string = AppStorage.Get('userName') ? AppStorage.Get('userName') : '马哥'

@Entry
@Component
struct GamePage {
  // 得分
  @State source: number = 10
  // 抽卡次数
  @State times: number = 3
  @State imgArray: Array<string> = CommonConstants.images
  @State level: number = 0 // 卡片等级
  @State rangNumber:number = 0  //存储起来随机数
  @State gradeLv:string = ''  //用来存储根据成绩判定的等级
  build() {
    Column({ space: 10 }) {
      Text(userName + ` 得分:${this.source}抽卡次数:${this.times}`)
        .topText()
      //展示区---------------------
      Row({ space: 4 }) {
        Column({ space: 4 }) {
          Image($rawfile(`${this.imgArray[0]}`)).borderColor(0xf21225).imgStyle()
          Text('状元').textStyle()
        }

        Column({ space: 4 }) {
          Image($rawfile(`${this.imgArray[1]}`)).borderColor(0xfbd501).imgStyle()
          Text('榜眼').textStyle()
        }
      }

      Row({ space: 4 }) {
        Column({ space: 4 }) {
          Image($rawfile(`${this.imgArray[2]}`)).borderColor(0x3f97fd).imgStyle()
          Text('探花').textStyle()
        }

        Column({ space: 4 }) {
          Image($rawfile(`${this.imgArray[3]}`)).borderColor(0x9800fc).imgStyle()
          Text('进士').textStyle()
        }
      }

      //触发区--------------------
      Button('去抽卡', { type: ButtonType.Normal, stateEffect: true })
        .cardStyle()
        .onClick(() => {
          //调用抽卡业务函数
          this.judgeFunction()
        })

      Button('看结果', { type: ButtonType.Normal, stateEffect: true })
        .cardStyle()
        .onClick(()=>{
          //判定等级
          this.confirmGrade()
          // 专门用来查看结果的业务逻辑
          this.lookGrade()
        })

    }
    .width('100%')
    .height('100%')
  }
  //抽卡的业务逻辑
  judgeFunction() {
    //能抽卡的情况
    if (this.times > 0 && this.source < 50 && this.source > 0) {
      //第一件事：抽卡次数-1
      this.times--
      this.randomGrade(1,4)
      this.dialogController.open()
    }else{
      //不能抽卡的情况。分门别类的提示。
      //判断其他情况。应该给出不让抽奖的提示
      if (this.times <= 0 ) {
        //避免UI界面上抽卡次数变成-1
        this.times = 0
        //弹窗提示说：次数用完
        AlertDialog.show({
          title:'提示',
          message:'您的抽卡次数已经用完了',
          autoCancel:true
        })
      }
      //对成绩判断。比如已经0分了。
      if (this.source >= 50) {
        this.times = 0
        AlertDialog.show({
          message:'您已高中状元，无需抽奖',
        })
      }
      // 成绩小于0
      if (this.source <= 0) {
        this.times = 0
        AlertDialog.show({
          message:'滚出考场',
        })
      }
    }
  }

  // 随机数函数，方便让level的值，随机出现
  randomGrade(Min,Max){
    let Range = Max - Min   //3
    let Rand =  Math.random()   // 0 - 0.9999 ? 0.99
    // 1-4的随机数获取
    this.rangNumber = Min +  Math.round( Rand * Range)

    this.level = this.rangNumber
    // 红+50
    if(this.level == 1){
      this.source += 50
    }
    // 黄+10
    if(this.level == 2){
      this.source += 10
    }
    // 蓝 -5
    if(this.level == 3){
      this.source -= 5
    }
    //绿 归零
    if(this.level == 4){
      this.source = 0
    }

  }

  //准备自定义弹窗组件 顶部记得导入。。。
  dialogController: CustomDialogController = new CustomDialogController({
    //构建了一个弹窗组件
    builder: CustomDialogExample({
      //弹窗里面需要数据
      source: $source,
      level: $level
    }),
    autoCancel: true
  })

  //积分等级判断
  confirmGrade(){
      //等级甲乙丙丁末
    if (this.source >= 50) {
      this.gradeLv = '甲'
    }
    if (this.source == 40) {
      this.gradeLv = '乙'
    }
    if (this.source == 25) {
      this.gradeLv = '丙'
    }
    if (this.source < 25 && this.source > 0 ) {
      this.gradeLv = '丁'  //进士
    }
    if (this.source <= 0) {
      this.gradeLv = '末'  //落榜
    }
  }
  //看结果之前，先判定一下用户能不能去第二个页面
  lookGrade(){
    //你还有抽奖次数呢。
    if (this.times > 0) {
      AlertDialog.show({
        title:'请继续抽卡',
        message:'你的抽卡未完成，无法查看你的功名！！！'
      })
    }else {
      //判定等级或者说成绩
      if (this.gradeLv == '末') {
        AlertDialog.show({
          title:'落榜啦',
          message:'您落榜了就不配查看结果页面'
        })
      }else {
        //没落榜
        router.push({
          url:CommonConstants.SECOND_URL2,
          params:{
            'lv' : this.gradeLv
          }
        })
      }
    }

  }
}

//组件样式
@Extend(Button) function cardStyle() {
  .width('50%')
  .height('8%')
  .borderRadius(8)
  .fontSize(24)
  .fontWeight(600)
  .shadow({ radius: 10, color: 0xD3D3D3, offsetX: 20, offsetY: 20 })
  .margin({ top: '2%' })
}

@Extend(Image) function imgStyle() {

  .width('45%')
  .height('25%')
  .borderWidth(4)

  .borderRadius(30)
}

@Extend(Text) function textStyle() {
  .fontSize(24)
  .fontWeight(600)
  .fontColor(0xB0C4DE)
}

@Extend(Text) function topText() {
  .width('80%')
  .height('10%')
  .backgroundColor(0xff8247)
  .margin({
    left: '10%',
    top: '3%'
  })
  .textAlign(TextAlign.Center)
  .borderRadius(10)
  .fontColor('white')
  .shadow({
    radius: 10,
    color: 0xd3d3d3,
    offsetX: 20,
    offsetY: 30
  })
}

