/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import SmartRefresh from "./SmartRefresh"
import display from '@ohos.display';

@Component
export struct WaterSwipe {
  @Link model: SmartRefresh.Model
  @State refresh: boolean  = false

  private waterTopPathCmd: string = ''
  private waterSwipeTouchType: TouchType = TouchType.Down
  private bottomWaterCmd: string = ''
  @State middleWaterCmd: string = ''
  private waterBottomPathCmd: string = ''
  private sunSingleLinePth: string = ''
  private sunSingleSecondLinePth: string = ''
  private sunRefreshIndex: number = 0
  private intervalId: number = 0
  private sunRefreshID : number = -1
  private sunRefreshIDClearFlag: boolean = true
  private bottomCircleRadius: number = 0
  private offsetIncrement: number = 0
  private sunXOffset: number = 300
  private sunYOffset: number = 0
  private refreshSelectPth: string = ''
  private refreshSecondSelectPth: string = ''
  private sunPthArray : number[] = [250, 200, 250, 140,
  270, 220,  330, 220,
  250,240,  250, 300,
  230, 220,  170, 220,
  264, 208,  306, 167,
  264, 234,  306, 276,
  236, 234,  194, 274,
  236, 208,  194, 171]
  //下拉刷新时的箭头
  private dragRefreshData: WaterSwipeSimple.Model = new WaterSwipeSimple.Model()
  private dragPathCmd: string = ''
  private ArrowRadius : number = 30
  private arrowAngle: number = 45
  private arrowPathCmd: string = ''
  private arrowAngleFlag: number = 0

  private pullRefreshImage: Resource = $r("app.media.ic_loading")
  private screenWidth:number = display.getDefaultDisplaySync().width
  private screenHeight:number = display.getDefaultDisplaySync().height
  private arrowPositionStartX: number = (this.screenWidth / 2) //330
  private arrowPositionStartY: number = 100

  caculateSunOffset(sunXOffset: number, sunYOffset: number): void {
    let index: number = 0
    this.sunPthArray.forEach((item: number) => {
      let itemRemainder = index % 4
      if (itemRemainder == 0) {
        this.refreshSelectPth = this.refreshSelectPth + ' ' + 'M' + ' ' + (this.sunPthArray[index] + sunXOffset)
      }
      if (itemRemainder == 1) {
        this.refreshSelectPth= this.refreshSelectPth+ ' ' + (this.sunPthArray[index] + sunYOffset)
      }
      if (itemRemainder == 2) {
        this.refreshSelectPth= this.refreshSelectPth+ ' ' + 'L' + ' ' + (this.sunPthArray[index] + sunXOffset)
      }
      if (itemRemainder == 3) {
        this.refreshSelectPth= this.refreshSelectPth+ ' ' + (this.sunPthArray[index] + sunYOffset)
      }
      index += 1
    })
  }

  ondraw() : void {
    this.refreshSunFunction()
    this.model.headerRefreshId = setInterval(() => {
      if(this.model.refreshState == SmartRefresh.REFRESHSTATE.REFRESHFINISH) {
        if(this.sunRefreshIDClearFlag) {
          this.sunRefreshIDClearFlag = false
          setTimeout(() => {//关闭刷新定时器
            clearInterval(this.sunRefreshID)
            this.sunRefreshIDClearFlag = true
            this.sunRefreshID = -1
          }, this.model.refreshDuration);
        }
      }
      let topCircleRadius: number = 100
      let initStartX: number = this.screenWidth / 2 - topCircleRadius

      let initStartY: number = this.model.headerHeight - this.model.initHeaderHeight < 100 ? (this.model.headerHeight - this.model.initHeaderHeight) : 100
      this.arrowPositionStartY = initStartY
      if (SmartRefresh.REFRESHSTATE.TOREFRESH == this.model.refreshState) {
        this.waterTopPathCmd = `M ${initStartX},${initStartY} a ${topCircleRadius} ${topCircleRadius} 90 1 1 0 1 Z`
        this.bottomCircleRadius = 100 - Math.pow(this.model.getOffset() , 0.8) * 45
        let bottomCircleStartX = initStartX + topCircleRadius - this.bottomCircleRadius // 450 + 100
        let getOffset = this.model.getOffset() * this.model.initHeaderHeight
        let bottomCircleStartY = this.model.headerHeight > this.model.initHeaderHeight ?
          ((this.model.headerHeight - this.model.initHeaderHeight + initStartY) * 3) : (initStartY)
        let leftMiddleX = (initStartX + bottomCircleStartX) / 2 + 20
        let leftMiddleY = (initStartY + bottomCircleStartY) / 2
        let rightMiddleX = (initStartX + 2 * topCircleRadius  + bottomCircleStartX + 2 * this.bottomCircleRadius) / 2 - 20
        let bottomCircleEndX = bottomCircleStartX + 2 * this.bottomCircleRadius
        let topCircleEndX = initStartX + 2 * topCircleRadius
        this.bottomWaterCmd = ` M `+ bottomCircleStartX + " " + bottomCircleStartY + ` a ${this.bottomCircleRadius} ${this.bottomCircleRadius} 90 1 1 0 1 Z`
        this.middleWaterCmd = `M ${initStartX} ${initStartY} `
                            + ` C ${initStartX} ${initStartY} ` + leftMiddleX + " " + leftMiddleY + " " + bottomCircleStartX + " " + bottomCircleStartY
                            + " M" + bottomCircleStartX + " " + bottomCircleStartY
                            + " L" + bottomCircleEndX + " " + bottomCircleStartY
                            + " C" + bottomCircleEndX + " " + bottomCircleStartY + " " + rightMiddleX + " " + leftMiddleY + " " +`${topCircleEndX}` + ` ${initStartY}`
                            + ` L${initStartX} ${initStartY} `

        //顶部圆形中的刷新
        let increase_distanceToAngle : number = 360 * this.model.headerHeight / (this.model.initHeaderHeight * 2)
        let reduce_distanceToAngle : number = 135 * this.model.headerHeight  / (this.model.initHeaderHeight * 3)
        let arrowTopRadian: number = 0
        let arrowBottomRadian: number = 0
        if ((increase_distanceToAngle - reduce_distanceToAngle) < 180) {
          this.arrowAngleFlag = 0
        } else {
          arrowTopRadian = (increase_distanceToAngle - this.arrowAngle - 10) * Math.PI / 180 //减10是基于效果
          arrowBottomRadian = (increase_distanceToAngle - this.arrowAngle * 3 - 10) * Math.PI / 180
          this.arrowAngleFlag = 1
        }
        let increaseRadian = increase_distanceToAngle * Math.PI / 180
        let reduceRadian = reduce_distanceToAngle * Math.PI / 180
        this.dragRefreshData.radius = this.dragRefreshData.circleRadius - this.dragRefreshData.barWidth
        this.dragRefreshData.startX = this.arrowPositionStartX + (this.dragRefreshData.radius * Math.cos(increaseRadian))
        this.dragRefreshData.startY = this.arrowPositionStartY + (this.dragRefreshData.radius * Math.sin(increaseRadian))
        this.dragRefreshData.endX = this.arrowPositionStartX + (this.dragRefreshData.radius * Math.cos(reduceRadian))
        this.dragRefreshData.endY = this.arrowPositionStartY + (this.dragRefreshData.radius * Math.sin(reduceRadian))
        let arrowTopPointEndX = this.dragRefreshData.startX + (this.ArrowRadius * Math.cos(arrowTopRadian))
        let arrowTopPointEndY = this.dragRefreshData.startY + (this.ArrowRadius * Math.sin(arrowTopRadian))
        let arrowBottomPointEndX = this.dragRefreshData.startX + (this.ArrowRadius * Math.cos(arrowBottomRadian))
        let arrowBottomPointEndY = this.dragRefreshData.startY + (this.ArrowRadius * Math.sin(arrowBottomRadian))
        if (this.arrowAngleFlag == 0){
          this.dragPathCmd = "M" + this.dragRefreshData.endX  + " " + this.dragRefreshData.endY + " "
                            + "A " + this.dragRefreshData.radius + " " + this.dragRefreshData.radius + ", 0, "
                            + this.arrowAngleFlag + ", " + this.dragRefreshData.directionFlag + ", "
                            + this.dragRefreshData.startX + " " + this.dragRefreshData.startY
        }else{
          this.dragPathCmd = "M " + this.dragRefreshData.endX + " " + this.dragRefreshData.endY + " "
                            + "A " + this.dragRefreshData.radius + " " + this.dragRefreshData.radius + ", 0, "
                            + this.arrowAngleFlag + ", " + this.dragRefreshData.directionFlag + ", "
                            + this.dragRefreshData.startX + " " + this.dragRefreshData.startY
          this.arrowPathCmd = "M" + arrowTopPointEndX + " " + arrowTopPointEndY
                            + "L " + this.dragRefreshData.startX + " " + this.dragRefreshData.startY + " "
                            + "L " + arrowBottomPointEndX + " " + arrowBottomPointEndY
        }
        this.refresh = !this.refresh
      } else { //清除上一次的数据
        this.bottomWaterCmd = ""
        this.middleWaterCmd = ""
        this.waterTopPathCmd = ""
        this.dragPathCmd = ""
      }
    }, 30)
  }

  refreshSunFunction() : void {
    this.pullRefreshImage = $r("app.media.ic_loading")
    this.sunRefreshID = setInterval(() => {
      animateTo({
        duration: 150, // 动画时长
        delay: 50, // 延迟时长
        onFinish: () => {
          this.pullRefreshImage = $r("app.media.ic_loading")
        }
      }, () => {
      })
    }, 200)
  }

  aboutToAppear() {
    this.model.setInitHeaderHeight(200).setHeaderHeight(200).setZHeaderIndex(99).setZMainIndex(-1).setBackgroundShadowColor(Color.White)
    this.model.setRefreshHeaderCallback(() => this.ondraw())
    if(this.model.initRefreshing) {
      this.model.refreshHeaderCallback()
      this.model.initRefreshing = false
    }
  }

  aboutToDisappear(){
    clearInterval(this.model.headerRefreshId)
    clearInterval(this.sunRefreshID)
  }

  build() {
    Flex() {
      if (this.refresh) {
        Text("0").visibility(Visibility.None)
      } else {
        Text("1").visibility(Visibility.None)
      }

      if (this.model.refreshState == SmartRefresh.REFRESHSTATE.REFRESHING) { //松开过后的刷新样式
        Stack() {
          Image(this.pullRefreshImage)
            .width(100)
            .height(100)
            .margin({top:30})
        }.width("100%")
      } else if (this.model.refreshState == SmartRefresh.REFRESHSTATE.TOREFRESH) { //拖住过程中的样式
        Stack({ alignContent : Alignment.Center }) {
          if (this.model.latestYOffset < 300 && this.model.latestYOffset > 75) {
            // Stack() {
            //   Path().width("100%").height(this.model.headerHeight).commands(this.waterTopPathCmd).fill(this.model.backgroundColor)
            //   Path().width("100%").height(this.model.headerHeight)
            //     .commands(this.dragPathCmd)
            //     .strokeWidth(3)
            //     .stroke(Color.White)
            //     .fill(this.model.backgroundColor)
            //   if (this.arrowAngleFlag == 1) {
            //     Path() //圆的轨道
            //       .width("100%")
            //       .height(this.model.headerHeight)
            //       .strokeWidth(3)
            //       .fillOpacity(0)
            //       //.stroke(Color.White)
            //       .stroke(Color.White)
            //       .height(this.model.headerHeight)
            //       .commands(this.arrowPathCmd)
            //       //.margin({top:0,left:160})
            //       .zIndex(2)
            //       .opacity(1)
            //   }
            // }
          } else {
            Stack({ alignContent : Alignment.Center }) {
              Path().width("100%").height(this.model.headerHeight).commands(this.bottomWaterCmd).fill(this.model.backgroundColor)
              Path().width("100%").height(this.model.headerHeight).commands(this.middleWaterCmd).fill(this.model.backgroundColor)
              Path().width("100%").height(this.model.headerHeight).commands(this.waterTopPathCmd).fill(this.model.backgroundColor)
              Path().width("100%")
                .height(this.model.headerHeight)
                .commands(this.dragPathCmd)
                .strokeWidth(3)
                .fill(this.model.backgroundColor)
                .stroke(Color.White)
                .margin({top:0,left:0})
            }
          }
        }
      }
    }.backgroundColor(this.model.backgroundShadowColor)
  }
}

namespace WaterSwipeSimple {
  export class Model {
    //画笔宽度
    barWidth: number = 5;
    //轮圈宽度
    rimWidth: number = 5
    //画笔颜色
    barColor: number = 0X5588FF
    // 大/小角度弧标志  0为小角度
    angleFlag: number = 0
    // 圆弧最小角度
    minAngle: number = 16
    // 圆弧最大角度
    maxAngle: number = 270
    //半径
    circleRadius: number = 50
    //真实半径
    radius: number = 0
    // 在 minAngle 基础上，额外需要绘制的角度
    barExtraLength: number = 0
    // 需要绘制到的角度
    targetAngle: number = 0
    // 圆弧递增或递减的标记  true表示递增
    barGrowingFromFront: boolean = true
    // 逆时针顺时针标志 1表示顺时针
    directionFlag: number = 1
    // svg路径
    svgPath: string = "";
    // 绘制终点的X轴坐标
    endX: number = 0;
    //绘制终点的Y轴坐标
    endY: number = 0;
    //起始位置
    startX: number = 0;
    startY: number = 0;
    // 目标进度值
    mTargetProgress: number = 1
    // 进度值
    mProgress: string = "0";
    // 起始角度
    progress: number = 0
    //轮圈颜色
    rimColor: number = Color.White
    // 近似闭合的坐标
    closureY: number = 0
    // 每1ms的旋转角度，例：230 每1s旋转 230 度    (270-16)/0.46 = 230
    spinSpeed: number = 230
    //轮圈的svg路径
    rimSvgPath: string = ""
    // 是否是动态进度轮
    isSpinning: boolean = true
    // 是否是线性进度轮
    linearProgress: boolean = false
    //圆弧处在最大或者最小角度时，保持当时状态的时间，简而言之，当圆弧为的角度为 barLength
    //圆弧处在最大或者最小角度时，保持当时状态的时间，简而言之，当圆弧为的角度为 barLength
    // 或者 barMaxLength 时，都会在 pauseGrowingTime 这个时间后才会继续变化，最大向最小变化，最小向最大变化，可以理解为 delayTime
    pauseGrowingTime: number = 200
    // 圆弧 递增/递减 已经经历时间
    timeStartGrowing: number = 0
    //圆弧 从最小到最大/从最大到最小 的总时间
    barSpinCycleTime: number = 460
    // 圆弧在 最大/最小 角度保持的时间
    pausedTimeWithoutGrowing: number = 0
    //上一次绘制的时间
    lastTimeAnimated: number = 0
    // 定时器
    intervalID: number = 0

    //初始化
    init() {
      this.radius = this.circleRadius - this.barWidth
      this.startX = this.circleRadius
      this.startY = this.barWidth
      // 近似一个完整的回环(轮圈)
      let closureRadian = 359.99 * Math.PI / 180
      // 近似闭合的坐标
      let closureX = this.circleRadius + (this.radius * Math.sin(closureRadian))
      this.closureY = this.circleRadius - (this.radius * Math.cos(closureRadian))
      this.rimSvgPath = "M" + this.startX + " " + this.startY + " " + "A " + this.radius + " " +
      this.radius + ", 0, " + "1" + ", " + this.directionFlag + ", " + closureX + " " + this.closureY + "Z"
      // 计算弧度
      if (this.isSpinning) {
        let radian = this.minAngle * Math.PI / 180
        this.endX = this.circleRadius + (this.radius * Math.sin(radian))
        this.endY = this.circleRadius - (this.radius * Math.cos(radian))
        this.svgPath = "M" + this.startX + " " + this.startY + " " + "A " + this.radius + " " +
        this.radius + ", 0, " + this.angleFlag + ", " + this.directionFlag + ", " + this.endX + " " + this.endY
      } else {
        if (this.mTargetProgress == 1) {
          this.maxAngle = 359.99
        } else {
          this.maxAngle = this.mTargetProgress * 360
        }
      }
      this.lastTimeAnimated = new Date().getTime()
      if (this.intervalID != 0) {
        this.closeTimer()
      }
    }



    setCircleRadius(circleRadius: number): Model {
      this.circleRadius = circleRadius
      return this
    }

    getCircleRadius(): number{
      return this.circleRadius
    }

    setBarColor(barColor: number): Model{
      this.barColor = barColor
      return this
    }

    getBarColor(): number{
      return this.barColor
    }

    setRimColor(rimColor: number): Model{
      this.rimColor = rimColor
      return this
    }

    getRimColor(): number{
      return this.rimColor
    }

    setRimWidth(rimWidth: number): Model{
      this.rimWidth = rimWidth
      return this
    }

    getRimWidth(): number{
      return this.rimWidth
    }

    setBarWidth(barWidth: number): Model{
      this.barWidth = barWidth
      return this
    }

    getBarWidth(): number{
      return this.barWidth
    }

    setProgress(mTargetProgress: number): Model {
      if (this.isSpinning) {
        this.progress = 0
        this.isSpinning = false
      }
      if (mTargetProgress > 1) {
        mTargetProgress = 1
      } else if (mTargetProgress < 0) {
        mTargetProgress = 0
      }
      this.mTargetProgress = mTargetProgress
      return this
    }
    // 获取当前的进度值
    getProgress(): string {
      return this.mProgress
    }

    setSpinning(isSpinning: boolean): Model {
      this.isSpinning = isSpinning
      return this
    }

    setLinearProgress(linearProgress: boolean): Model {
      this.linearProgress = linearProgress
      return this
    }

    setSpinSpeed(spinSpeed: number): Model{
      this.spinSpeed = spinSpeed
      return this
    }

    getSpinSpeed(): number {
      return this.spinSpeed
    }

    // Reset the count (in increment mode)
    resetCount(): void{
      this.progress = 0
      this.mTargetProgress = 0
    }

    stopSpinning(): void {
      this.isSpinning = false;
      this.progress = 0;
      this.mTargetProgress = 0;
    }

    // Puts the view on spin mode
    spin(): void {
      this.lastTimeAnimated = new Date().getTime()
      this.isSpinning = true;
    }

    // 将进度设置为特定值，栏将立即设置为该值 @param progress 0 和 1 之间的进度
    setInstantProgress(progress: number): void{
      if (this.isSpinning) {
        this.progress = 0
        this.isSpinning = false
      }
      if (progress > 1) {
        progress -= 1
      } else if (progress < 0) {
        progress = 0
      }
      if (progress == this.mTargetProgress) {
        return;
      }
      this.mTargetProgress = Math.min(progress * 360, 360);
      this.progress = this.mTargetProgress;
      this.lastTimeAnimated = new Date().getTime()
    }

    spinning(): boolean{
      return this.isSpinning
    }

    closeTimer() {
      clearInterval(this.intervalID);
    }
  }
}
export default WaterSwipeSimple;