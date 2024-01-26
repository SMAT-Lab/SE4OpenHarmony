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

import SmartRefreshForGame from './SmartRefreshForGame'

class RectParam {
  index: number = 0;
  x: number = 0;
  y: number = 0
}

class TouchBlock {
  x: number = 0;
  y: number = 0;
}

@Component
export struct HitBlockGameBody {
  @State model: SmartRefreshForGame.Model = new SmartRefreshForGame.Model()
  protected blockHorizontalNum: number = this.model.blockHorizontalNum;
  protected blockVerticalNum: number = 5;
  protected BLOCK_WIDTH_RATIO: number = 0.01806;
  protected RACKET_POSITION_RATIO: number = 0.8;
  protected BLOCK_POSITION_RATIO: number = 0.08;
  protected DIVIDING_LINE_SIZE: number = 1;
  protected DEFAULT_ANGLE: number = 30
  private mCircle: number = 7
  protected blockLeft: number = 0;
  @State cx: number = 0;
  @State cy: number = 0;
  protected pointList: Array<TouchBlock> = [];
  protected isLeft: boolean = true;
  protected angle: number = 30;
  protected speed: number = this.model.ballSpeed; // 球球移动速度
  @State private rectList: Array<RectParam> = [] // 绘制的砖块
  private controllerSize: number = 40 //挡板长度
  private mOffsetY: number = 55 // 挡板上下移动的位置
  private isGameOver: boolean = false // 游戏时是否结束
  private offsetXY: number = 1
  private blockBorderWidth: number = 1
  private mScreenWidth: number = px2vp(lpx2px(720))
  protected blockHeight: number = 0 ;
  protected blockWidth: number = 0;
  @State private tipText: string = this.model.textLoading
  @State private slideOffset: number = 0
  mScreenHeight: number = 0
  initBackgroundColor: Color | string | number = ''
  @Prop @Watch('onYStateChange') downY: number
  @Prop @Watch('onFinishChange') isNotifyFinish: boolean

  private onFinishChange() {
    if (this.isNotifyFinish) {
      this.tipText = this.model.isFinishSuccess? this.model.textLoadingFinish: this.model.textLoadingFailed
    }
  }

  private onYStateChange() {
    if (this.downY < 0) {
      this.slideOffset = 0
    } else if (this.downY > (this.mScreenHeight - this.controllerSize)) {
      this.slideOffset = (this.mScreenHeight - this.controllerSize)
    } else {
      this.slideOffset = this.downY
    }
  }

  aboutToAppear() {
    this.blockHeight = (this.mScreenHeight) / 5 //5为砖块最大行数
    this.blockLeft = this.mScreenWidth * this.BLOCK_POSITION_RATIO
    this.blockWidth = this.mScreenWidth * this.BLOCK_WIDTH_RATIO
    this.cx = this.mScreenWidth * this.RACKET_POSITION_RATIO - this.mCircle
    this.cy = this.mScreenHeight / 2
    this.slideOffset = 0 //初始化偏移量
    this.drawRect()
    setInterval(() => {
      if (!this.isGameOver) {
        this.drawCircle()
      }
    }, 10 - this.speed)
  }

  //检测小球与砖块碰撞
  protected checkTouchBlock(x: number, y: number): boolean {
    let columnX: number = Math.floor((x - Math.floor(this.blockLeft)) / this.blockWidth);
    columnX = columnX == this.blockHorizontalNum ? columnX - 1 : columnX;
    let rowY: number = Math.floor(y / this.blockHeight);
    rowY = rowY == this.blockVerticalNum ? rowY - 1 : rowY;
    let p: Array<TouchBlock> = []
    p.push({ x: columnX, y: rowY })
    let flag: boolean = false;
    for (let index = 0; index < this.pointList.length; index++) {
      if (this.pointList[index].x == p[0].x && this.pointList[index].y == p[0].y) {
        flag = true
        break;
      }
    }
    if (!flag) {
      this.pointList.push(p[0]);
      this.drawRect()
    }
    return!flag;
  }

  //检测小球与挡板碰撞
  protected checkTouchRacket(y: number) {
    let flag: boolean = false;
    let diffVal: number = y - this.slideOffset;
    if (diffVal >= 0 && diffVal <= this.controllerSize) { // 小球位于挡板Y值区域范围内
      flag = true;
    }
    return flag
  }

  private drawRect() {
    let column: number
    let row: number
    let i: number = 0
    this.rectList.splice(0, this.rectList.length)
    for (i = 0; i < this.blockHorizontalNum * this.blockVerticalNum; i++) {
      row = Math.floor(i / this.blockHorizontalNum);
      column = i % this.blockHorizontalNum;
      let flag: boolean = false;
      for (let index = 0; index < this.pointList.length; index++) {
        if (this.pointList[index].x == column && this.pointList[index].y == row) {
          flag = true;
          break;
        }
      }
      if (flag) {
        continue;
      }
      let temp:RectParam = {
        index: i,
        x: column,
        y: row
      }
      this.rectList.push(temp)
    }
    return
  }

  private drawCircle() {
    if (this.cx <= this.blockLeft) { // 小球穿过色块区域后的左边界
      this.isLeft = false;
    }
    if (this.cx >= this.mScreenWidth * this.RACKET_POSITION_RATIO - this.mCircle && this.cx < this.mScreenWidth * this.RACKET_POSITION_RATIO + this.blockWidth) {
      if (this.checkTouchRacket(this.cy)) { // 小球与挡板接触
        if (this.pointList.length == this.blockHorizontalNum * this.blockVerticalNum) {
          this.isGameOver = true //游戏结束
          this.tipText = this.model.textGameOver
        }
        this.isLeft = true;
      }
    }
    if (this.cx <= this.blockLeft + this.blockHorizontalNum * this.blockWidth + (this.blockHorizontalNum - 1) * this.blockBorderWidth && this.cy > 0) { // 小球进入到色块区域  *1是DIVIDING_LINE_SIZE
      if (this.checkTouchBlock(this.cx, this.cy)) { // 反弹回来
        this.isLeft = false;
      }
    } else
      if (this.cx >= this.mScreenWidth) {
        this.isGameOver = true //游戏结束
        this.tipText = this.model.textGameOver
      }
    if (this.cy <= 0) { // 小球撞到上边界
      this.angle = 180 - this.DEFAULT_ANGLE;
    } else if (this.cy > this.mScreenHeight - this.mCircle) { // 小球撞到下边界
      this.angle = 180 + this.DEFAULT_ANGLE;
    }
    if (this.isLeft) {
      this.cx -= this.offsetXY;
    } else {
      this.cx += this.offsetXY;
    }
    this.cy -= Math.tan(Math.PI * this.angle / 180) * this.offsetXY;
    return
  }

  //砖块，球和挡板颜色设置
  private drawColor(color: number, alpha: number=255) {
    let colorStr = ("00000" + (color & 0xffffff).toString(16)).substr(-6)
    let alphaStr = ("0" + (alpha & 0xff).toString(16)).substr(-2)
    return "#" + alphaStr + colorStr
  }

  build() {
    Flex({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start }) {
      Stack({ alignContent: Alignment.TopStart }) {
        ForEach(this.rectList, (item:RectParam) => {
          Path() //砖块
            .commands("M0 0 L" + fp2px(this.blockWidth) + " 0 L" + fp2px(this.blockWidth) + " " + fp2px(this.mScreenHeight / 5) + " L0 " + fp2px(this.mScreenHeight / 5) + "z")
              //            .stroke(0xff11bbff)
            .fill(this.drawColor(this.initBackgroundColor == '#ffffff' ? 0x000000 : 0xffffff, 255 - (255 / this.blockHorizontalNum) * item.x))
            .strokeWidth(this.blockBorderWidth)
            .translate({
              x: item.x * this.blockWidth + this.blockLeft,
              y: item.y * (this.mScreenHeight - 1) / this.blockVerticalNum,
              z: 0
            })
        }, (item:RectParam) => item.index.toString())
        Circle({ width: this.mCircle, height: this.mCircle }) //球
          .fill(this.drawColor(this.initBackgroundColor == '#ffffff' ? 0x000000 : 0xffffff, 230))
          .translate({
            x: this.cx,
            y: this.cy
          })
        Path() //挡板
          .commands("M0 0 L" + fp2px(this.blockWidth) + " 0 L" + fp2px(this.blockWidth) + " " + fp2px(this.controllerSize) + " L0 " + fp2px(this.controllerSize) + "z")
          .fill(this.drawColor(this.initBackgroundColor == '#ffffff' ? 0x000000 : 0xffffff, 230))
          .translate({
            x: this.mScreenWidth * this.RACKET_POSITION_RATIO,
            y: this.slideOffset
          })

        Text(this.tipText)
          .width('100%')
          .height('100%')
          .textAlign(TextAlign.Center)
          .fontSize(30)
          .fontColor(this.initBackgroundColor == '#ffffff' ? '#000000' : '#ffffff')
      }
      .width('100%')
      .height(this.mScreenHeight)
      .backgroundColor(this.initBackgroundColor) //主题色
    }
    .width('100%')
    .height(this.mScreenHeight)
  }
}