// @ts-ignore
import router from '@ohos.router';
import CommonConstants from '../common/constants/CommonConstants';
// @ts-ignore
import CustomCardDialog, { CustomDialogExample } from '../common/customComponent/CustomCardDialog'

// 解析存在GameAbility.ts的AppStorage中由EntryAbility传递过来的数据
const KEY: string ='UserName';
const UserName:string = AppStorage.Get<string>(KEY);

@Entry
@Component
struct GamePage {
  @State message: string = UserName
  @State score: number = 10 //得分
  @State time: number = 3 //抽卡次数
  @State imageArray: string[] = ['images/red.jpg', 'images/yellow.jpg', 'images/blue.jpg','images/purple.jpg']
  @State rangNumber:number =0;//随机生成数
  @State level:number =0//卡等级
  @State gradeLv:string=''//最后得分等级
  build() {
    Column({ space: 4 }) {
      //   统计栏
      Row({ space: 5 }) {
        Text(this.message + '得分:' + this.score).textStyle()
        Text('抽卡次数:' + this.time).textStyle()
      }.rowStyle()
      //   显示区
      Row({ space: 4 }) {
        Column({ space: 4 }) {
          Image($rawfile(`${this.imageArray[0]}`)).borderColor(0xf21225).imageStyle()
          Text('状元').textStyle()
        }

        Column({ space: 4 }) {
          Image($rawfile(`${this.imageArray[1]}`)).borderColor(0xfbd501).imageStyle()
          Text('榜眼').textStyle()
        }
      }

      Row({ space: 4 }) {
        Column({ space: 4 }) {
          Image($rawfile(`${this.imageArray[2]}`)).borderColor(0x3f97fd).imageStyle()
          Text('探花').textStyle()
        }

        Column({ space: 4 }) {
          Image($rawfile(`${this.imageArray[3]}`)).borderColor(0x9800fc).imageStyle()
          Text('进士').textStyle()
        }
      }

    //   触发区
      Button('去抽卡',{type:ButtonType.Normal,stateEffect:true}).butStyle()
  //     绑定一个点击事件，实现抽卡逻辑
        .onClick(()=>{this.judgeFunction()})

      Button('看结果',{type:ButtonType.Normal,stateEffect:true}).butStyle()
  //     绑定事件
        .onClick(()=>{
          // 先对等级进行判断
          this.judgeGradeLv()
          // 给个提示查看分数和等级
          console.log('------------');
          // console.info('.........this.score='+this.score)
          // console.info('.........this.gradeLv='+this.gradeLv)
          this.lookGrade()
        })

  }
    .width('100%')
    .height('100%')
  }

//2、实现抽卡功能
//   自定义弹窗组件
  dialogController:CustomDialogController=new CustomDialogController({
    builder: CustomDialogExample({
    cancel:()=>this.onCancel(),
    confirm:()=>this.onAccept(),
    score:$score,
    level:$level
  }),
    cancel:()=>this.existApp(),
    autoCancel:true
  })

//   弹窗回调
  onCancel(){
    console.log('cancel....');
  }
  onAccept(){
    console.log('accept....')
  }
  existApp(){
    console.log('exist.....')
  }
//   2.1定义一个随机函数
  randomGrade(Min,Max){
    // 随机抽取1-4中任意数字
    var Range=Max-Min;
    var rand=Math.random();
    this.rangNumber=Min+Math.round(rand*Range);//四舍五入
  //   抽到红卡+50分，弹窗回显红卡
    if(this.rangNumber==1){
      this.score+=50
      this.level=1
    }
  //   抽到黄卡+10分，弹窗回显黄卡
    if (this.rangNumber==2) {
      this.score+=10
      this.level=2
    }
  //   抽到蓝卡-5分，弹窗回显蓝卡
    if (this.rangNumber==3) {
      this.score-=5
      this.level=3
    }
  //   抽到绿卡0分，得分归0 弹窗回显绿卡
    if (this.rangNumber==4) {
      this.score=0
      this.level=4
    }
  }
//   积分、抽卡次数判断函数
  judgeFunction(){
    this.time--//抽一次，抽卡次数减一
    // 判断，次数大于0时，并且没有抽到50和0的积分卡
    if(this.time>=0&&this.score<50&&this.score>0){
      this.randomGrade(1,4)//调用的是前面定义的定义随机数字
      this.dialogController.open()//根据随机抽取的数字，score加减完之后，进行弹窗显示，调用上面的弹窗组件
    }else{
      // 当抽卡次数用尽
      if(this.time<0){
        this.time=0
        AlertDialog.show({
          title:'提示',
          message:'您的抽卡次数已用完',
          confirm:{
            value:'关闭',
            action:()=>{console.info('close.....')}
          },
          cancel:()=>{
            console.info('cancel........')
          }
        })
      }
      // 当抽中状元
      if (this.score>=50) {
        this.time=0
        AlertDialog.show({
          title:'提示',
          message:'您已高中状元，无需再抽',
          confirm:{
            value:'关闭',
            action:()=>{
              console.info('close,,,,,')
            }
          },
          cancel:()=>{
            console.info('cancel....')
          }
        })

      }
    //   当得分小于0分
      if(this.score<=0){
        this.time=0
        AlertDialog.show({
          title:'提示',
          message:'很遗憾，下次努力',
          confirm:{
            value:'关闭',
            action:()=>{
              console.info('close....')
            }
          },
          cancel:()=>{
            console.info('cancel........')
          }
        })
      }
    }
  }
//   根据结果判断等级
  judgeGradeLv(){
    if (this.score>=50) {
      this.gradeLv='甲'//状元
    }else if(this.score>=40&&this.score<50){
      this.gradeLv='乙'//榜眼，连抽3次10分卡
    }else if(this.score>=25&&this.score<40){
      this.gradeLv='丙'//探花
    }else if(this.score<25&&this.score>0){
      this.gradeLv='丁'//进士
    } else if(this.score<=0){
      this.gradeLv='末'//落榜
    }
  }
//   查看游戏结果
  lookGrade(){
    // 抽卡还未完成，继续完成抽卡
    if (this.time>0) {
      AlertDialog.show({
        title: "提示",
        message: "您的抽卡还未完成，无法查看功名",
        confirm: {
          value: "关闭",
          action: () => {
            console.info('close')
          },
        },
        cancel:()=>{
          console.info('cancel...')
        },
        autoCancel:true
      })
    }
  //  抽卡抽完了
    else{
    //  1、当 抽到’末‘的时候，弹窗
      if (this.gradeLv=='末') {
        AlertDialog.show({
          title:'提示',
          message:'很遗憾，您的成绩欠佳，未能中第',
          confirm:{
            value:'关闭',
            action:()=>{
              console.info('close..')
            }
          },
          cancel:()=>{
            console.info('cancel..')
          },autoCancel:true
        })
      }
    //   2、当为其他4个等级是，传递等级给结果展示页面
      else {
        router.push({
          url:CommonConstants.SECOND_URL2,
          params:{
            gradeLv:this.gradeLv
          }
        })
      }
    }
  }
}
//文本样式
@Extend(Text)function textStyle(){
  .fontSize(24)
  .fontWeight(600)
  .fontColor(0xb0c4de)
}
//row组件样式
@Extend(Row)function rowStyle(){
  .width('80%')
  .height('10%')
  .borderRadius(10)
  .margin({top:'1%',bottom:'4%v'})
  .shadow({radius:10,color:0xD3D3D3,offsetX:20,offsetY:20})
  .backgroundColor(0xff8247)
  .justifyContent(FlexAlign.Center)
}
//图片样式
@Extend(Image)function imageStyle(){
  .width('45%')
  .height('25%')
  .borderWidth(4)
  .borderRadius(30)
  .margin({top:'2%'})
}
//按钮样式
@Extend(Button)function butStyle(){
  .width('50%')
  .height('8%')
  .borderRadius(8)
  .fontSize(24)
  .fontWeight(600)
  .shadow({radius:10,color:0xd3d3d3,offsetY:20,offsetX:20})
  .margin({top:'2%'})


}