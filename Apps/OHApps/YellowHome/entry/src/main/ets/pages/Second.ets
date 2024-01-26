import router from '@ohos.router'

// @ts-ignore
import AppContext from '@ohos.application.context'

@Entry
@Component
struct Second {
  // 接收从第一个页面传递过来的考生姓名  userName  使用三元运算符避免玩家没有录入姓名
  @State showText: string = router.getParams()['userName'] ? router.getParams()['userName'] : '马哥'

  //定义进度条的进度初识值
  @State proValue: number = 20

  // 更新进度条的定时器标记  这个变量的变化，对布局没有影响，不必重新渲染页面
  private timer: number

  build() {
    Column({ space: 20 }) {
      Text(`【${this.showText}】` + '正在进入游戏...').textStyle()
      Progress({ value: this.proValue, total: 100, type: ProgressType.ScaleRing })
        .color(0x1E90FF)
        .width(150)
        .style({ strokeWidth: 20, scaleCount: 30, scaleWidth: 3 })
        .margin({ top: '30%' })
    }.width('100%').height('100%')

  }

  //让这个页面加载的时候执行某些功能。
  aboutToAppear() {
    //定时器函数
    this.timer = setInterval(() => {
      this.proValue += 20
      //如果进图条的值》100了.
      if (this.proValue >= 100) {
        clearInterval(this.timer)
        //如果进度条的值>100 跳转到GameAbility  拉起这个模块，传递参数给这个模块
        this.turnToGameAbility()
      }
    }, 1000)
  }

  turnToGameAbility() {
    //   1.首先获取AbilityContext接口
    let handle = getContext() as AppContext.AbilityContext
    //   2:调用startxxx方法并且传递相关的数据。
    let want = {
      //bundleName的值取决于你项目创建时生成的内容，在AppScope/app.json5中查看
      bundleName: 'com.example.yellowhome',
      abilityName: 'GameAbility',
      parameters: {
        'userName': this.showText
      }
    }
    //拉起want变量中存放的指定的项目中指定的GameAbility
    handle.startAbility(want)
  }
}


//组件样式
@Extend(Text) function textStyle() {
  .fontColor(0x1E90FF)
  .fontWeight(700)
  .fontSize(24)
}