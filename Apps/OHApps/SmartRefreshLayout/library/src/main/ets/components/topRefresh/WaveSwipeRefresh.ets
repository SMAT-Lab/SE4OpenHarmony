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
export struct WaveSwipe {
  @State refresh: boolean  = false
  @Link model: SmartRefresh.Model
  @State refreshData: ComWheel.Model = new ComWheel.Model();
  private touchMoveHeight: number = 0
  @State pathCmd: string = ""
  @State dragPathCmd: string = ''
  @State private dragUpFlag: boolean = true
  private dragBottomCirclePathCmd: string = ''
  private lastYOffset: number = 0
  private maxRangeHeight : number = 0

  private firstOffsetX: number = 0
  private firstOffsetY: number = 0

  private secondOffsetX: number = 0
  private secondOffsetY: number = 0

  private thirdOffsetX: number = 0
  private thirdOffsetY: number = 0

  private fourOffsetX: number = 0
  private fourOffsetY: number = 0

  private fiveOffsetX: number = 0
  private fiveOffsetY: number = 0

  private sixOffsetX: number = 0
  private sevenOffsetX: number = 0
  private eightOffsetX: number = 0

  private refreshStateId : number = 0
  private onlyInsert: boolean = false
  private stopIntervalID: number = 0
  private drawIntervalId: number = 0

  private dragBottomCircleRadius: number = 50
  //下拉刷新时的箭头
  private dragRefreshData: ComWheel.Model = new ComWheel.Model()

  private ArrowRadius : number = 30
  private arrowAngle: number = 45
  private arrowPathCmd: string = ''
  private arrowAngleFlag: number = 0
  private arrowPositionStartX: number = 65
  private arrowPositionStartY: number = 150
  private arrowDragDown_TopPointEndX: number = 0
  private arrowDragDown_TopPointEndY: number = 0
  private arrowDragDown_BottomPointEndX: number = 0
  private arrowDragDown_BottomPointEndY: number = 0
  private arrowDragUpYOffset : number = 230
  private arrowDragUpXOffset : number = 10
  private screenWidth:number = display.getDefaultDisplaySync().width
  private screenHeight:number = display.getDefaultDisplaySync().height

  arrowDraw(centerX:number, centerY:number) : void {
      if (SmartRefresh.REFRESHSTATE.TOREFRESH == this.model.refreshState) {
        this.dragRefreshData.setCircleRadius(45)
        //超过默认高度，显示底部圆,最大为100
        let exceedInitHeaderHeight = 80 * (this.model.headerHeight - this.model.initHeaderHeight / 2) /  this.model.initHeaderHeight
        if (exceedInitHeaderHeight <= 40) {
          this.dragBottomCircleRadius = 40
        } else {
          this.dragBottomCircleRadius = exceedInitHeaderHeight <= 70 ? exceedInitHeaderHeight : 70
        }
        //顶部圆形中的刷新
        let increase_distanceToAngle : number = 360 * (this.model.headerHeight - this.model.initHeaderHeight) / this.model.initHeaderHeight
        let reduce_distanceToAngle : number = 135 * (this.model.headerHeight - this.model.initHeaderHeight) / this.model.initHeaderHeight
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
        this.dragRefreshData.startX = centerX + (this.dragRefreshData.radius * Math.cos(increaseRadian))
        this.dragRefreshData.startY = centerY + (this.dragRefreshData.radius * Math.sin(increaseRadian))
        this.dragRefreshData.endX = centerX + (this.dragRefreshData.radius * Math.cos(reduceRadian))
        this.dragRefreshData.endY = centerY + (this.dragRefreshData.radius * Math.sin(reduceRadian))
        this.arrowDragDown_TopPointEndX = this.dragRefreshData.startX + (this.ArrowRadius * Math.cos(arrowTopRadian))
        this.arrowDragDown_TopPointEndY = this.dragRefreshData.startY + (this.ArrowRadius * Math.sin(arrowTopRadian))
        this.arrowDragDown_BottomPointEndX = this.dragRefreshData.startX + (this.ArrowRadius * Math.cos(arrowBottomRadian))
        this.arrowDragDown_BottomPointEndY = this.dragRefreshData.startY + (this.ArrowRadius * Math.sin(arrowBottomRadian))
        if (this.arrowAngleFlag == 0){
          this.dragPathCmd = "M" + this.dragRefreshData.endX + " " + this.dragRefreshData.endY + " "
          + "A " + this.dragRefreshData.radius + " " + this.dragRefreshData.radius + ", 0, "
          + this.arrowAngleFlag + ", " + this.dragRefreshData.directionFlag + ", "
          + this.dragRefreshData.startX + " " + this.dragRefreshData.startY
        } else {
          this.dragPathCmd = "M " + this.dragRefreshData.endX + " " + this.dragRefreshData.endY + " "
                            + "A " + this.dragRefreshData.radius + " " + this.dragRefreshData.radius + ", 0, "
                            + this.arrowAngleFlag + ", " + this.dragRefreshData.directionFlag + ", "
                            + this.dragRefreshData.startX + " " + this.dragRefreshData.startY + " "
                            + "L" + this.arrowDragDown_TopPointEndX + " " + this.arrowDragDown_TopPointEndY
                            + "L " + this.dragRefreshData.startX + " " + this.dragRefreshData.startY + " "
                            + "L " + this.arrowDragDown_BottomPointEndX + " " + this.arrowDragDown_BottomPointEndY
        }
      }
  }
//先放大圆，在放大颈部，更好控制刷新条
  private dropMoveDraw(): void {
    this.model.headerRefreshId = setInterval(() => {
      let screenWidth = this.screenWidth
      let bottomLineWidth = 100
      this.touchMoveHeight = this.model.downYOffset
      if (this.model.refreshState == SmartRefresh.REFRESHSTATE.TOREFRESH) {
        this.model.waterDropYTopCoordinate = 0
        this.model.waterDropYMiddleCoordinate = 400
        this.model.waterDropYBottomCoordinate = 600

        this.secondOffsetX = screenWidth * 9 / 20
        this.firstOffsetX = this.secondOffsetX / 2
        this.thirdOffsetX = this.secondOffsetX + 40
        this.fourOffsetX  = this.secondOffsetX
        this.fiveOffsetX = this.fourOffsetX + bottomLineWidth
        this.sixOffsetX = this.fiveOffsetX - 40
        this.sevenOffsetX = this.fiveOffsetX
        this.eightOffsetX = (this.sevenOffsetX + screenWidth) / 2

        this.firstOffsetY = this.touchMoveHeight < 200 ? this.touchMoveHeight / 5 : 30
        this.secondOffsetY = this.touchMoveHeight < 200 ? this.touchMoveHeight / 2 : 100
        this.thirdOffsetY = this.touchMoveHeight  < 200 ? this.touchMoveHeight  / 2 : 100
        this.fourOffsetY  = (200 < this.touchMoveHeight &&  this.touchMoveHeight < 300) ? 150 : this.touchMoveHeight * 0.5
        this.fourOffsetY = this.fourOffsetY > 200 ? 200 : this.fourOffsetY

        this.fiveOffsetY = this.fourOffsetY + 200
        if (this.touchMoveHeight > 150) {
          this.maxRangeHeight = 450
        } else {
          this.maxRangeHeight = this.touchMoveHeight * 3// 为1100dp 除以360
        }
        if(this.touchMoveHeight <= this.model.initHeaderHeight) {
          // this.pathCmd = `C0 0 ${this.firstOffsetX} ${this.firstOffsetY} 350 ${this.secondOffsetY}`
          //                + `C350 ${this.secondOffsetY} 360 ${this.secondOffsetY} 370 ${this.secondOffsetY}`
          //                + `C370 ${this.secondOffsetY} ${this.eightOffsetX} ${this.firstOffsetY} ${screenWidth} 0`
          //                + `Z`;
          this.pathCmd = `C0 0 ${this.firstOffsetX} ${this.firstOffsetY} C ${screenWidth / 2 - 10} 350`
            + `C ${screenWidth / 2 - 10} ${this.secondOffsetY} ${screenWidth / 2} ${this.secondOffsetY} ${screenWidth / 2 + 10} ${this.secondOffsetY}`
            + `C ${screenWidth / 2 + 10} ${this.secondOffsetY} ${this.eightOffsetX} ${this.firstOffsetY} ${screenWidth} 0`
            + `Z`;
        } else {
          this.pathCmd = `C0 0 ${this.firstOffsetX} ${this.firstOffsetY} ${this.secondOffsetX} ${this.secondOffsetY}
                        C${this.secondOffsetX} ${this.secondOffsetY} ${this.thirdOffsetX} ${this.thirdOffsetY} ${this.fourOffsetX} ${this.fourOffsetY}
                        L${this.fiveOffsetX} ${this.fourOffsetY}
                        C${this.fiveOffsetX} ${this.fourOffsetY} ${this.sixOffsetX} ${this.thirdOffsetY} ${this.sevenOffsetX} ${this.secondOffsetY}
                        C${this.sevenOffsetX} ${this.secondOffsetY} ${this.eightOffsetX} ${this.firstOffsetY} ${screenWidth} 0
                        M${this.fourOffsetX} ${this.fourOffsetY}
                        A ${this.dragBottomCircleRadius} ${this.dragBottomCircleRadius} 0, 1, 0,
                          ${this.fiveOffsetX} ${this.fourOffsetY} Z`;
        }
        //计算刷新条的中心点坐标
        let VerticalDistanceY = Math.sqrt(this.dragBottomCircleRadius * this.dragBottomCircleRadius - (bottomLineWidth / 2) * (bottomLineWidth / 2))
        this.arrowDraw(this.fiveOffsetX - 50, this.fourOffsetY + VerticalDistanceY)
      }
      if(this.model.refreshState == SmartRefresh.REFRESHSTATE.REFRESHING && this.model.waterDropYTopCoordinate < 500) {
        this.model.waterDropYTopCoordinate += 40
        this.model.waterDropYMiddleCoordinate += 20
        this.model.waterDropYBottomCoordinate += 20
        this.pathCmd = `M${screenWidth / 2 - this.dragBottomCircleRadius} ${this.model.waterDropYMiddleCoordinate}
                        L${screenWidth / 2} ${this.model.waterDropYTopCoordinate}
                        L${screenWidth / 2 + this.dragBottomCircleRadius} ${this.model.waterDropYMiddleCoordinate}
                        M${screenWidth / 2 + this.dragBottomCircleRadius} ${this.model.waterDropYMiddleCoordinate}
                        A ${this.dragBottomCircleRadius} ${this.dragBottomCircleRadius} 0, 1, 1,
                        ${screenWidth / 2 - this.dragBottomCircleRadius} ${this.model.waterDropYMiddleCoordinate} Z`
        this.dragPathCmd = "M " + (this.dragRefreshData.endX + this.arrowDragUpXOffset) + " "
                                + (this.dragRefreshData.endY + this.model.waterDropYMiddleCoordinate - this.arrowDragUpYOffset) + " "
                         + "A " + this.dragRefreshData.radius + " " + this.dragRefreshData.radius + ", 0, "
                                + this.arrowAngleFlag + ", " + this.dragRefreshData.directionFlag + ", "
                                + (this.dragRefreshData.startX + this.arrowDragUpXOffset) + " "
                                + (this.dragRefreshData.startY + this.model.waterDropYMiddleCoordinate - this.arrowDragUpYOffset) + " "
                         + "L " + (this.arrowDragDown_TopPointEndX + this.arrowDragUpXOffset) + " "
                                + (this.arrowDragDown_TopPointEndY + this.model.waterDropYMiddleCoordinate - this.arrowDragUpYOffset)
                         + "L " + (this.dragRefreshData.startX + this.arrowDragUpXOffset) + " "
                                + (this.dragRefreshData.startY + this.model.waterDropYMiddleCoordinate - this.arrowDragUpYOffset) + " "
                         + "L " + (this.arrowDragDown_BottomPointEndX + this.arrowDragUpXOffset) + " "
                                + (this.arrowDragDown_BottomPointEndY + this.model.waterDropYMiddleCoordinate - this.arrowDragUpYOffset)
        if (this.model.waterDropYTopCoordinate > 459 && this.model.waterDropYTopCoordinate < 500) { //确保只有一次
          this.dragUpFlag = false //控制刷新出现
          this.drawIntervalId = setInterval(() => {
            // 刷新数据
            this.onDraw()
          }, 20)
          setTimeout(() => {//关闭刷新定时器
            this.dragUpFlag = true
            this.pathCmd = 'M0 0 L0 0 Z';
            clearInterval(this.drawIntervalId)
          }, this.model.refreshDuration);
        }
      }
       this.refresh = !this.refresh
    }, 30)
  }

  aboutToAppear() {
    this.model.setInitHeaderHeight(200).setZHeaderIndex(99).setZMainIndex(-1)
    this.model.setHeaderHeight(200)
    this.refreshData.setBarColor(Color.Black).setCircleRadius(50).init()
    this.model.setRefreshHeaderCallback(() => this.dropMoveDraw())
    if(this.model.initRefreshing) {
      this.model.refreshHeaderCallback()
      this.model.initRefreshing = false
    }
  }

  build() {
    Flex() {
      if (this.refresh) {
        Text("0").visibility(Visibility.None)
      } else {
        Text("1").visibility(Visibility.None)
      }
      if (this.model.refreshState == SmartRefresh.REFRESHSTATE.TOREFRESH) { //拖住过程中的样式
        Stack({ alignContent : Alignment.Center }) {
          Path() //圆的轨道
            .width("100%")
            .height("100%")
            .strokeWidth(2)
            .stroke(this.model.backgroundColor)
            .commands(this.pathCmd)
            .fill(this.model.backgroundColor)
            Path()
              .commands(this.dragPathCmd)
              .width("100%")
              .height("100%")
              .strokeWidth(3)
              .fill(this.model.backgroundColor)
              .stroke(Color.White)
        }
      } else if (this.model.refreshState == SmartRefresh.REFRESHSTATE.REFRESHING ) { //松开过后的刷新样式
        if (this.dragUpFlag) {
          Stack() {//掉过的过程中
            Path() //圆的轨道
              .width("100%")
              .height("100%")
              .strokeWidth(2)
              .stroke(this.model.backgroundColor)
              .commands(this.pathCmd)
              .fill(this.model.backgroundColor)
              .antiAlias(true)
            Path()
              .commands(this.dragPathCmd)
              .width("100%")
              .height("100%")
              .strokeWidth(3)
              .fill(this.model.backgroundColor)
              .stroke(Color.White)
          }
        } else {
          Stack() {
            Path() //圆的轨道
              .strokeWidth(1)
              .stroke(this.model.backgroundColor)
              .commands("M70 70 A 70 70 0 1 1 70 69.9")
              .width("100%")
              .height("100%")
              .fill(this.model.backgroundColor)
              .zIndex(10)
              .margin({left:px2vp(this.screenWidth),top:this.screenHeight / 5})
            Path() //圆的轨道
              .strokeWidth(this.refreshData.barWidth)
              .stroke(Color.White)
              .commands(this.refreshData.svgPath)
              .fill(this.model.backgroundColor)
              .width("100%")
              .height("100%")
              .zIndex(20)
              .margin({left:px2vp(this.screenWidth - 140) + 10,top:(this.screenHeight / 5 + 10)})
           }
        }
      }
    }.backgroundColor(Color.White).width("100%").height("100%")
  }

  onDraw(): void {
    // 动态绘制
    if (this.refreshData.isSpinning) {
      if ((this.refreshData.barExtraLength + this.refreshData.minAngle) < 180) {
        this.refreshData.angleFlag = 0
      } else {
        this.refreshData.angleFlag = 1
      }
      // 增量时间
      let deltaTime = new Date().getTime() - this.refreshData.lastTimeAnimated;
      let deltaNormalized = deltaTime * this.refreshData.spinSpeed / 1000;
      this.refreshData.progress += deltaNormalized
      if (this.refreshData.progress > 360) {
        this.refreshData.progress -= 360;
      }
      let radian = this.refreshData.progress * Math.PI / 180
      this.refreshData.startX = this.refreshData.circleRadius + (this.refreshData.radius * Math.sin(radian))
      this.refreshData.startY = this.refreshData.circleRadius - (this.refreshData.radius * Math.cos(radian))
      // 计算需要额外绘制的角度
      this.updateBarLength(deltaTime)
      this.refreshData.lastTimeAnimated = new Date().getTime()
      // 计算坐标
      this.calculation()
      this.refreshData.targetAngle = this.refreshData.progress + this.refreshData.barExtraLength + this.refreshData.minAngle
      if (this.refreshData.targetAngle > 360) {
        this.refreshData.targetAngle = this.refreshData.targetAngle - 360
      }
      this.refreshData.svgPath = "M" + (this.refreshData.startX) + " " + (this.refreshData.startY)+ " "
                                + "A " + this.refreshData.radius + " " + this.refreshData.radius
                                + ", 0, " + this.refreshData.angleFlag + ", " + this.refreshData.directionFlag + ", "
                                + (this.refreshData.endX) + " " + (this.refreshData.endY)

      this.refreshData.mProgress = "Progress:"
    }
  }

  private calculation(): void{
    // 计算弧度
    let radian = this.refreshData.targetAngle * Math.PI / 180
    this.refreshData.endX = this.refreshData.circleRadius + (this.refreshData.radius * Math.sin(radian))
    this.refreshData.endY = this.refreshData.circleRadius - (this.refreshData.radius * Math.cos(radian))
    // 控制起点终点无限接近时正常画圆
    if ((this.refreshData.circleRadius - 1) < this.refreshData.endX && this.refreshData.endX < this.refreshData.circleRadius && (this.refreshData.circleRadius - this.refreshData.endX) < 0.01) {
      this.refreshData.endX = this.refreshData.circleRadius - 0.01
    }
  }

  private updateBarLength(deltaTimeInMilliSeconds: number): void {
    // 到达最大小最小角的保持时间
    if (this.refreshData.pausedTimeWithoutGrowing >= this.refreshData.pauseGrowingTime) {
      this.refreshData.timeStartGrowing += deltaTimeInMilliSeconds;
      // 计算递增递减
      if (this.refreshData.timeStartGrowing > this.refreshData.barSpinCycleTime) {
        this.refreshData.timeStartGrowing -= this.refreshData.barSpinCycleTime;
        this.refreshData.pausedTimeWithoutGrowing = 0;
        // 递增递减切换
        this.refreshData.barGrowingFromFront = !this.refreshData.barGrowingFromFront;
      }
      let distance = Math.cos((this.refreshData.timeStartGrowing / this.refreshData.barSpinCycleTime + 1) * Math.PI) / 2 + 0.5;
      // 目标角度
      let destLength = (this.refreshData.maxAngle - this.refreshData.minAngle);
      if (this.refreshData.barGrowingFromFront) {
        // 递增
        this.refreshData.barExtraLength = distance * destLength;
      } else {
        //递减
        let newLength = destLength * (1 - distance);
        this.refreshData.progress += (this.refreshData.barExtraLength - newLength);
        this.refreshData.barExtraLength = newLength;
      }
    } else {
      this.refreshData.pausedTimeWithoutGrowing += deltaTimeInMilliSeconds;
    }
  }
}

namespace ComWheel {
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
    circleRadius: number = 60
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
export default ComWheel