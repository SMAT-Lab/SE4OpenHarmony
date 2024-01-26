import router from '@ohos.router';
// @ts-ignore
import AppContext from '@ohos.application.context';
import hilog from '@ohos.hilog';
import CommonConstants from '../common/constants/CommonConstants';
@Entry
@Component
struct Second {
  // 获取index传递过来的玩家姓名
  @State showText: string = router.getParams()['showText'] ? router.getParams()['showText'] : '12'
  // 进度条是变化的，先给它定义一个初始化值
  @State proValue: number = 20
  @State colorValue: number = 20
  private timer: number = 0
  /**
   * 进度条的变幻可以用定时器
   * 它的转换过程在build之前
   * 可以在build组件出现之前，做一些其他设置，aboutToAppear就是在build之前的组件
   */
  aboutToAppear() {
    //   欢迎页面的倒计时，复杂页面的数据加载
    //进度条进度控制
    this.timer = setInterval(() => {
      this.proValue = this.proValue + 20
      // this.proValue += 20
      if (this.proValue >= 100) {
        clearInterval(this.timer)
        // router.back()
        //拉起第二个ability
      //   进度条加载完之后，进行跳转
        this.turnToGameAbility()
      }
    }, 1000)
  }

  build() {
    Row() {
      Column() {
        Column({ space: 20 }) {
          Column({ space: 20 }) {
            Text(`【${this.showText}】` + '正在进入游戏....').textStyle()
            Progress({ value: this.proValue, total: 100, type: ProgressType.ScaleRing })
              .color(0x1e90ff)
                // .value(this.colorValue)
              .width(150)
              .style({ strokeWidth: 20, scaleCount: 30, scaleWidth: 3 })
              .margin({ top: '30%' })
          }.margin({ top: '10%' })
        }
      }
      .width('100%')
    }
    .height('100%')
  }
  //跳转到gameablity
  turnToGameAbility() {
    //   1、获取AbilityContext的接口
    let handler = getContext(this) as AppContext.AbilityContext
    //   2、获取到AbilityContext的接口后，调用该接口中的StartAbility()方法,启动GameAbility
    this.startGameAbility(handler)
  }
//   具体的跳转方法
  startGameAbility(context){
    const want={
      // app.json5
      bundleName: "com.example.abilitylab",
      // module.json5
      abilityName:"GameAbility",
      parameters:{
        username:`${this.showText}`
      }
    };
    try {
      context.startAbility(want)
    }catch (error){
      hilog.error(CommonConstants.LOG_COLOR,CommonConstants.TAG,'%{public}s',error)
    }
  }
}


@Extend(Text) function textStyle() {
  .fontColor(0x1e90ff)
  .fontSize(24)
  .fontWeight(700)
}
