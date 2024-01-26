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
import SmartRefreshForBezierRadarSample from "./SmartRefreshForBezierRadarSample"
import display from '@ohos.display';

@Component
export struct BezierRadar {
  @Link model: SmartRefreshForBezierRadarSample.Model
  @State bezierRadarModel: BezierRadarModel.BezierRadarModel = new BezierRadarModel.BezierRadarModel()
  @State refresh: boolean  = false;
  @State refreshGenerationId: number= 0;
  private context: CanvasRenderingContext2D = new CanvasRenderingContext2D(new RenderingContextSettings(true));
  private ready: boolean = false;
  private status = SmartRefreshForBezierRadarSample.REFRESHSTATE.NONE; //当前的状态
  private index: number = 0; //数组下标
  @State beforeEnableHorizontalDrag: boolean = false
  @State beforePrimaryColor:string = "#0000FF"
  @State beforeRadarFillColor:string = "#ADD8E6"
  private screenWidth: number = display.getDefaultDisplaySync().width


  aboutToAppear() {
    this.bezierRadarModel.setMWidth(this.screenWidth)
    this.bezierRadarModel.init();
    this.model.setRefreshHeaderCallback(() => this.draw())
    if(this.model.initRefreshing) {
      this.model.refreshHeaderCallback()
      this.model.initRefreshing = false
    }
  }

  aboutToDisappear(): void {
    if (this.model.headerRefreshId > 0) {
      clearInterval(this.model.headerRefreshId)
      this.model.headerRefreshId = -1
    }
  }

  draw() : void {
      this.model.headerRefreshId = setInterval(() => {
        // 刷新数据
        this.invalidate();
        this.init();
      }, 20)
  }

  init() {
    if(this.beforeEnableHorizontalDrag != this.model.getEnableHorizontalDrag()) {
      this.bezierRadarModel.setMEnableHorizontalDrag(this.model.getEnableHorizontalDrag())
      this.beforeEnableHorizontalDrag = this.model.getEnableHorizontalDrag()
    }
    if(this.beforePrimaryColor != this.model.getPrimaryColor()) {
      this.bezierRadarModel.setMPrimaryColor(this.model.getPrimaryColor());
      this.bezierRadarModel.setMRadarFillColor(this.model.getRadarFillColor())
      this.beforePrimaryColor = this.model.getPrimaryColor();
      this.beforeRadarFillColor = this.model.getRadarFillColor()
    }
  }

  invalidate() {
    this.refreshGenerationId++;
    //雷达刷新
    if (this.status == SmartRefreshForBezierRadarSample.REFRESHSTATE.TOREFRESH || this.bezierRadarModel.mRadarAngle >= 360) {
      this.bezierRadarModel.mRadarAngle = 0;
    }
    if (this.bezierRadarModel.lastTime - this.bezierRadarModel.firstTime > 800) {
      this.bezierRadarModel.mRadarAngle += 13;
    }
    this.status = this.model.refreshState;
  }

  build() {
    Flex({ justifyContent: FlexAlign.Center }) {
      if (this.refresh) {
        Text("0").visibility(Visibility.None)
      } else {
        Text("1").visibility(Visibility.None)
      }
      if (this.model.refreshState == SmartRefreshForBezierRadarSample.REFRESHSTATE.REFRESHING) {
        Stack() {
          Text(this.refreshGenerationId + "" + this.onDraw(this.context)).visibility(Visibility.None)
          Canvas(this.context).onReady(() => {
            this.ready = true
            this.context.lineWidth = 3
          }).width("100%").height("100%")
        }.height(this.bezierRadarModel.mHeight + "px").width(this.bezierRadarModel.mWidth + "px")
      } else if (this.model.refreshState == SmartRefreshForBezierRadarSample.REFRESHSTATE.TOREFRESH) {
        Stack() {
          Text(this.refreshGenerationId + "" + this.onDraw(this.context)).visibility(Visibility.None)
          Canvas(this.context).onReady(() => {
            this.ready = true
            this.context.lineWidth = 3
          }).width("100%").height("100%")
        }.height(this.bezierRadarModel.mHeight + "px").width(this.bezierRadarModel.mWidth + "px")
      }
    }
    .height("100%")
    .width("100%")
    .backgroundColor("#ffffff")
  }

  onDraw(canvas: CanvasRenderingContext2D): number {
    if (!this.ready) {
      return -1;
    }
    let width = this.bezierRadarModel.mWidth;
    let height = this.bezierRadarModel.mHeight;
    if (this.model.refreshState == SmartRefreshForBezierRadarSample.REFRESHSTATE.REFRESHING) {
      this.bezierRadarModel.mWaveOffsetX = -1;
      if (this.bezierRadarModel.isFirstGetTime) {
        this.bezierRadarModel.firstTime = new Date().getTime();
        this.bezierRadarModel.isFirstGetTime = !this.bezierRadarModel.isFirstGetTime;
      }
      this.bezierRadarModel.lastTime = new Date().getTime();
      if (this.bezierRadarModel.lastTime - this.bezierRadarModel.firstTime <= 800) {
        this.bezierRadarModel.mWaveHeight = this.bezierRadarModel.Arr[this.index];
        this.bezierRadarModel.drawWave(canvas, width);
        this.index++;
      } else if (this.bezierRadarModel.lastTime - this.bezierRadarModel.firstTime > 800 && this.bezierRadarModel.lastTime - this.bezierRadarModel.firstTime <= this.model.getRefreshDuration() - 200) {
        this.bezierRadarModel.drawRadar(canvas, width, height);
      } else if (this.bezierRadarModel.lastTime - this.bezierRadarModel.firstTime > this.model.getRefreshDuration() - 200) {
        this.bezierRadarModel.mRippleRadius += this.bezierRadarModel.mRippleRadiusAdd;
        this.bezierRadarModel.drawRipple(canvas, width, height);
      }
    } else if (this.model.refreshState == SmartRefreshForBezierRadarSample.REFRESHSTATE.TOREFRESH) {
      this.bezierRadarModel.isFirstGetTime = true;
      this.bezierRadarModel.mWaveHeight = 0;
      this.bezierRadarModel.firstTime = this.bezierRadarModel.lastTime = 0;
      this.bezierRadarModel.mRippleRadius = 500;
      this.index = 0;
      if (this.model.getOffset() >= 1) {
        if (this.bezierRadarModel.mWavePulling) {
          //下拉程度大于等于1时 加上背景波形
          this.bezierRadarModel.mWaveHeight = (this.model.getOffset() - 1) * 700;
        }
        if (this.bezierRadarModel.mEnableHorizontalDrag) {
          this.bezierRadarModel.mWaveOffsetX = vp2px(this.model.getCurrentMouseX());
        }
      }
      this.bezierRadarModel.drawWave(canvas, width);
      //下拉过程中白球的绘制。
      this.bezierRadarModel.mDotFraction = this.model.getOffset();
      this.bezierRadarModel.drawDot(canvas, width, height);
    }
    return 0;
  }
}

namespace BezierRadarModel {
  export class BezierRadarModel {
    mWidth: number = 720
    mHeight: number = 1280
    //<editor-fold desc="属性字段">
    mAccentColor: string = ""; //背景的颜色（白球内部，雷达内部）
    mPrimaryColor: string = ""; //背景波形的颜色
    mRadarFillColor: string = ""; //雷达填充的颜色
    mWavePulling: boolean= true; //背景波形是否可拉动
    mEnableHorizontalDrag: boolean  = false; //水平拖拽
    isSupportHorizontalDrag: boolean = true;//是否支持水平拖拽
    mWaveTop: number = 0; //背景波形头部
    mWaveHeight: number = 0; //背景波形高度
    mWaveOffsetX: number = -1; //弧度的顶端坐标。-1表示没有进行设置
    //mWaveOffsetY: number = 0;
    mDotAlpha: number = 255; //多个点的颜色分配
    mDotFraction: number = 0; //控制多个点的位置与份数
    mDotRadius: number = 0; //多个点的半径
    mRippleRadius: number = 0; //白色扩展半径
    mRippleRadiusAdd: number = 10; //白色扩展半径增量
    mRadarAngle: number = 0; //雷达角度
    mRadarRadius: number = 0; //雷达半径
    mRadarCircle: number = 0; //圆环宽度
    mRadarScale: number = 0; //雷达比例
    firstTime: number = 0; //第一次获取的时间
    lastTime: number = 0; //最后一次获取的时间
    isFirstGetTime: boolean = true
    location: number = 17; //表示绘制中心在整个高度的位置，height / location
    Arr: Array<number> = [-30, -60, -80, -100, -120, -130, -20, -80, -60, -40, -20,];

    init() {
      this.mDotRadius = vp2px(7);
      this.mRadarRadius = vp2px(20);
      this.mRadarCircle = vp2px(7);
      this.mRadarScale = 1.35;
      this.mWaveTop = 150;
      this.mRippleRadius = 480;
      this.mAccentColor = "#ffffff";
      this.mPrimaryColor = "#33aaff";
      this.mRadarFillColor = "#ADD8E6";
      this.Arr = this.Arr.concat(new Array<number>(25).fill(0));
    }

    getMWidth(): number{
      return this.mWidth
    }

    setMWidth(mWidth: number): BezierRadarModel{
      this.mWidth = mWidth;
      return this
    }

    getMHeight(): number{
      return this.mHeight
    }

    setMHeight(mHeight: number): BezierRadarModel{
      this.mHeight = mHeight;
      return this
    }

    getMWaveHeight(): number{
      return this.mWaveHeight
    }

    setMWaveHeight(mWaveHeight: number): BezierRadarModel{
      this.mWaveHeight = mWaveHeight;
      return this
    }

    getMWaveTop(): number{
      return this.mWaveTop
    }

    setMWaveTop(mWaveTop: number): BezierRadarModel{
      this.mWaveTop = mWaveTop;
      return this
    }

    getMWaveOffsetX(): number{
      return this.mWaveOffsetX
    }

    setMWaveOffsetX(mWaveOffsetX: number): BezierRadarModel{
      this.mWaveOffsetX = mWaveOffsetX;
      return this
    }

    getMDotAlpha(): number{
      return this.mDotAlpha
    }

    setMDotAlpha(mDotAlpha: number): BezierRadarModel{
      this.mDotAlpha = mDotAlpha;
      return this
    }

    getMDotFraction(): number{
      return this.mDotFraction
    }

    setMDotFraction(mDotFraction: number): BezierRadarModel{
      this.mDotFraction = mDotFraction;
      return this
    }

    getMDotRadius(): number{
      return this.mDotRadius
    }

    setMDotRadius(mDotRadius: number): BezierRadarModel{
      this.mDotRadius = mDotRadius;
      return this
    }

    getMRippleRadius(): number{
      return this.mRippleRadius
    }

    setMRippleRadius(mRippleRadius: number): BezierRadarModel{
      this.mRippleRadius = mRippleRadius;
      return this
    }

    getMRippleRadiusAdd(): number{
      return this.mRippleRadiusAdd
    }

    setMRippleRadiusAdd(mRippleRadiusAdd: number): BezierRadarModel{
      this.mRippleRadiusAdd = mRippleRadiusAdd;
      return this
    }

    getMRadarAngle(): number{
      return this.mRadarAngle
    }

    setMRadarAngle(mRadarAngle: number): BezierRadarModel{
      this.mRadarAngle = mRadarAngle;
      return this
    }

    getMRadarRadius(): number{
      return this.mRadarRadius
    }

    setMRadarRadius(mRadarRadius: number): BezierRadarModel{
      this.mRadarRadius = mRadarRadius;
      return this
    }

    getMRadarCircle(): number{
      return this.mRadarCircle
    }

    setMRadarCircle(mRadarCircle: number): BezierRadarModel{
      this.mRadarCircle = mRadarCircle;
      return this
    }

    getMRadarScale(): number{
      return this.mRadarScale
    }

    setMRadarScale(mRadarScale: number): BezierRadarModel{
      this.mRadarScale = mRadarScale;
      return this
    }

    getLocation(): number{
      return this.location
    }

    setLocation(location: number): BezierRadarModel{
      this.location = location;
      return this
    }

    getMEnableHorizontalDrag(): boolean{
      return this.mEnableHorizontalDrag
    }

    setMEnableHorizontalDrag(mEnableHorizontalDrag: boolean): BezierRadarModel{
      this.mEnableHorizontalDrag = mEnableHorizontalDrag;
      return this
    }

    getIsSupportHorizontalDrag() : boolean{
      return this.mEnableHorizontalDrag
    }

    getMWavePulling(): boolean{
      return this.mWavePulling
    }

    setMWavePulling(mWavePulling: boolean): BezierRadarModel{
      this.mWavePulling = mWavePulling;
      return this
    }

    getMAccentColor(): string{
      return this.mAccentColor
    }

    setMAccentColor(mAccentColor: string): BezierRadarModel{
      this.mAccentColor = mAccentColor;
      return this
    }

    getMPrimaryColor(): string{
      return this.mPrimaryColor
    }

    setMPrimaryColor(mPrimaryColor: string): BezierRadarModel{
      this.mPrimaryColor = mPrimaryColor;
      return this
    }

    getMRadarFillColor(): string{
      return this.mRadarFillColor
    }

    setMRadarFillColor(mRadarFillColor: string): BezierRadarModel{
      this.mRadarFillColor = mRadarFillColor;
      return this
    }

    /**
     * 绘制背景波形
     * @param canvas 画布
     * @param width 宽度
     */
    drawWave(canvas: CanvasRenderingContext2D, width: number) {
      canvas.clearRect(0, 0, this.mWidth, this.mHeight);
      canvas.beginPath();
      canvas.moveTo(0, 0);
      canvas.lineTo(0, px2vp(this.mWaveTop));
      canvas.quadraticCurveTo(px2vp(this.mWaveOffsetX >= 0 ? (this.mWaveOffsetX) : width / 2), px2vp(this.mWaveTop + this.mWaveHeight), px2vp(width), px2vp(this.mWaveTop));
      canvas.lineTo(px2vp(width), 0);
      canvas.fillStyle = this.mPrimaryColor;
      canvas.fill();
    }

    /**
     * 绘制下拉时的 多个点
     * @param canvas 画布
     * @param width 宽度
     * @param height 高度
     */
    drawDot(canvas: CanvasRenderingContext2D, width: number, height: number) {
      if (this.mDotAlpha > 0) {
        canvas.fillStyle = this.mAccentColor;
        let num: number = 7;
        let x: number = px2vp(height);
        let wide: number = (1 * width / num) * this.mDotFraction - ((this.mDotFraction > 1) ? ((this.mDotFraction - 1) * (1 * width / num) / this.mDotFraction) : 0); //y1 = t*(w/n)-(t>1)*((t-1)*(w/n)/t)
        let high: number = height - ((this.mDotFraction > 1) ? ((this.mDotFraction - 1) * height / this.location / this.mDotFraction) : 0); //y2 = x - (t>1)*((t-1)*x/t);
        for (let i: number = 0; i < num; i++) {
          let index: number = 1 + i - (1 + num) / 2; //y3 = (x + 1) - (n + 1)/2; 居中 index 变量：0 1 2 3 4 结果： -2 -1 0 1 2
          let alpha: number = 255 * (1 - (2 * (Math.abs(index) / num))); //y4 = m * ( 1 - 2 * abs(y3) / n); 横向 alpha 差
          //mPaint.setAlpha(Math.floor (this.mDotAlpha * alpha * (1 - 1 / Math.pow((x / 800 + 1), 15))));//y5 = y4 * (1-1/((x/800+1)^15));竖直 alpha 差
          canvas.fillStyle = "#" + ("0" + (alpha & 0xff).toString(16)).substr(-2) + this.mAccentColor.substr(1);
          let radius: number = this.mDotRadius * (1 - 1 / ((x / 10 + 1))); //y6 = mDotRadius*(1-1/(x/10+1));半径
          canvas.beginPath();
          canvas.arc(px2vp(width / 2 - radius / 2 + wide * index), px2vp(high / this.location), px2vp(radius), 0, Math.PI * 2);
          canvas.fill();
        }
      }
    }

    /**
     * 绘制刷新时的 雷达动画
     * @param canvas 画布
     * @param width 宽度
     * @param height 高度
     */
    drawRadar(canvas: CanvasRenderingContext2D, width: number, height: number) {
      let radius: number = this.mRadarRadius * this.mRadarScale;
      let circle: number = this.mRadarCircle * this.mRadarScale;
      canvas.fillStyle = this.mAccentColor;
      canvas.strokeStyle = this.mAccentColor;
      canvas.beginPath();
      canvas.arc(px2vp(width / 2), px2vp(height / this.location), px2vp(radius), 0, Math.PI * 2);
      canvas.fill();
      canvas.beginPath();
      canvas.arc(px2vp(width / 2), px2vp(height / this.location), px2vp(radius + circle), 0, Math.PI * 2);
      canvas.stroke();
      canvas.strokeStyle = this.mRadarFillColor;
      canvas.fillStyle = this.mRadarFillColor;
      canvas.beginPath();
      canvas.arc(px2vp(width / 2), px2vp(height / this.location), px2vp(radius), (-90) * Math.PI / 180, (-90 + this.mRadarAngle) * Math.PI / 180, false);
      canvas.lineTo(px2vp(width / 2), px2vp(height / this.location));
      canvas.fill();
      radius += circle;
      canvas.beginPath();
      canvas.arc(px2vp(width / 2), px2vp(height / this.location), px2vp(radius), (-90) * Math.PI / 180, (-90 + this.mRadarAngle) * Math.PI / 180, false);
      canvas.stroke();
    }

    /**
     * 绘制刷新完成 白色扩散动画
     * @param canvas 画布
     * @param width 宽度
     * @param height 高度
     */
    drawRipple(canvas: CanvasRenderingContext2D, width: number, height: number) {
      if (this.mRippleRadius > 0) {
        canvas.fillStyle = this.mAccentColor;
        canvas.beginPath();
        canvas.arc(px2vp(width / 2), px2vp(height / this.location), px2vp(this.mRippleRadius), Math.PI - (Math.PI / 7), Math.PI * 2 + Math.PI / 7)
        canvas.fill();
      }
    }
  }
}

export default BezierRadarModel