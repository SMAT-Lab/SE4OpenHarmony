interface BezierCircleBottom_Params {
    scroller?: Scroller;
    model?: smartRefreshSecond.Model;
    classicsSimple?: BezierCircleBottomModel.Model;
    smoothPathCmd?: string;
    rectPathCmd?: string;
    refresh?: boolean;
    bounceCount?: number;
    bounceMaxOffset?: number;
    bounceDirection?: boolean;
    multiple3?: number;
    screenWidth?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BezierCircleBottomRefresh_" + ++__generate__Id;
}
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
import smartRefreshSecond from "../topRefresh/SmartRefreshSecond";
import display from '@ohos.display';
export class BezierCircleBottom extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.__model = new SynchedPropertyObjectTwoWay(params.model, this, "model");
        this.__classicsSimple = new ObservedPropertyObject(new BezierCircleBottomModel.Model()
        //控制超过最大偏移量
        , this, "classicsSimple");
        this.__smoothPathCmd = new ObservedPropertySimple('', this, "smoothPathCmd");
        this.__rectPathCmd = new ObservedPropertySimple('', this, "rectPathCmd");
        this.__refresh = new ObservedPropertySimple(false, this, "refresh");
        this.bounceCount = 0;
        this.bounceMaxOffset = 100;
        this.bounceDirection = true;
        this.multiple3 = 3;
        this.screenWidth = display.getDefaultDisplaySync().width;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BezierCircleBottom_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.classicsSimple !== undefined) {
            this.classicsSimple = params.classicsSimple;
        }
        if (params.smoothPathCmd !== undefined) {
            this.smoothPathCmd = params.smoothPathCmd;
        }
        if (params.rectPathCmd !== undefined) {
            this.rectPathCmd = params.rectPathCmd;
        }
        if (params.refresh !== undefined) {
            this.refresh = params.refresh;
        }
        if (params.bounceCount !== undefined) {
            this.bounceCount = params.bounceCount;
        }
        if (params.bounceMaxOffset !== undefined) {
            this.bounceMaxOffset = params.bounceMaxOffset;
        }
        if (params.bounceDirection !== undefined) {
            this.bounceDirection = params.bounceDirection;
        }
        if (params.multiple3 !== undefined) {
            this.multiple3 = params.multiple3;
        }
        if (params.screenWidth !== undefined) {
            this.screenWidth = params.screenWidth;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__classicsSimple.aboutToBeDeleted();
        this.__smoothPathCmd.aboutToBeDeleted();
        this.__rectPathCmd.aboutToBeDeleted();
        this.__refresh.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private __model: SynchedPropertySimpleOneWay<smartRefreshSecond.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: smartRefreshSecond.Model) {
        this.__model.set(newValue);
    }
    private __classicsSimple: ObservedPropertyObject<BezierCircleBottomModel.Model>;
    get classicsSimple() {
        return this.__classicsSimple.get();
    }
    set classicsSimple(newValue: BezierCircleBottomModel.Model) {
        this.__classicsSimple.set(newValue);
    }
    //控制超过最大偏移量
    private __smoothPathCmd: ObservedPropertySimple<string>;
    get smoothPathCmd() {
        return this.__smoothPathCmd.get();
    }
    set smoothPathCmd(newValue: string) {
        this.__smoothPathCmd.set(newValue);
    }
    private __rectPathCmd: ObservedPropertySimple<string>;
    get rectPathCmd() {
        return this.__rectPathCmd.get();
    }
    set rectPathCmd(newValue: string) {
        this.__rectPathCmd.set(newValue);
    }
    private __refresh: ObservedPropertySimple<boolean>;
    get refresh() {
        return this.__refresh.get();
    }
    set refresh(newValue: boolean) {
        this.__refresh.set(newValue);
    }
    private bounceCount: number;
    private bounceMaxOffset: number;
    private bounceDirection: boolean;
    private multiple3: number;
    private screenWidth: number;
    private onDraw(): void {
        // 动态绘制
        if (this.classicsSimple.isSpinning) {
            if ((this.classicsSimple.barExtraLength + this.classicsSimple.minAngle) < 180) {
                this.classicsSimple.angleFlag = 0;
            }
            else {
                this.classicsSimple.angleFlag = 1;
            }
            // 增量时间
            let deltaTime = new Date().getTime() - this.classicsSimple.lastTimeAnimated;
            let deltaNormalized = deltaTime * this.classicsSimple.spinSpeed / 1000;
            this.classicsSimple.progress += deltaNormalized;
            if (this.classicsSimple.progress > 360) {
                this.classicsSimple.progress -= 360;
            }
            let radian = this.classicsSimple.progress * Math.PI / 180;
            this.classicsSimple.startX = this.classicsSimple.circleRadius + (this.classicsSimple.radius * Math.sin(radian));
            this.classicsSimple.startY = this.classicsSimple.circleRadius - (this.classicsSimple.radius * Math.cos(radian));
            // 计算需要额外绘制的角度
            this.updateBarLength(deltaTime);
            this.classicsSimple.lastTimeAnimated = new Date().getTime();
            // 计算坐标
            this.calculation();
            this.classicsSimple.targetAngle = this.classicsSimple.progress + this.classicsSimple.barExtraLength + this.classicsSimple.minAngle;
            if (this.classicsSimple.targetAngle > 360) {
                this.classicsSimple.targetAngle = this.classicsSimple.targetAngle - 360;
            }
            this.classicsSimple.svgPath = "M" + this.classicsSimple.startX + " " + this.classicsSimple.startY + " " + "A " + this.classicsSimple.radius + " " +
                this.classicsSimple.radius + ", 0, " + this.classicsSimple.angleFlag + ", " + this.classicsSimple.directionFlag + ", " + this.classicsSimple.endX + " " + this.classicsSimple.endY;
            this.classicsSimple.mProgress = "Progress:";
        }
    }
    private calculation(): void {
        // 计算弧度
        let radian = this.classicsSimple.targetAngle * Math.PI / 180;
        this.classicsSimple.endX = this.classicsSimple.circleRadius + (this.classicsSimple.radius * Math.sin(radian));
        this.classicsSimple.endY = this.classicsSimple.circleRadius - (this.classicsSimple.radius * Math.cos(radian));
        // 控制起点终点无限接近时正常画圆
        if ((this.classicsSimple.circleRadius - 1) < this.classicsSimple.endX && this.classicsSimple.endX < this.classicsSimple.circleRadius && (this.classicsSimple.circleRadius - this.classicsSimple.endX) < 0.01) {
            this.classicsSimple.endX = this.classicsSimple.circleRadius - 0.01;
        }
    }
    private updateBarLength(deltaTimeInMilliSeconds: number): void {
        // 到达最大小最小角的保持时间
        if (this.classicsSimple.pausedTimeWithoutGrowing >= this.classicsSimple.pauseGrowingTime) {
            this.classicsSimple.timeStartGrowing += deltaTimeInMilliSeconds;
            // 计算递增递减
            if (this.classicsSimple.timeStartGrowing > this.classicsSimple.barSpinCycleTime) {
                this.classicsSimple.timeStartGrowing -= this.classicsSimple.barSpinCycleTime;
                this.classicsSimple.pausedTimeWithoutGrowing = 0;
                // 递增递减切换
                this.classicsSimple.barGrowingFromFront = !this.classicsSimple.barGrowingFromFront;
            }
            let distance = Math.cos((this.classicsSimple.timeStartGrowing / this.classicsSimple.barSpinCycleTime + 1) * Math.PI) / 2 + 0.5;
            // 目标角度
            let destLength = (this.classicsSimple.maxAngle - this.classicsSimple.minAngle);
            if (this.classicsSimple.barGrowingFromFront) {
                // 递增
                this.classicsSimple.barExtraLength = distance * destLength;
            }
            else {
                //递减
                let newLength = destLength * (1 - distance);
                this.classicsSimple.progress += (this.classicsSimple.barExtraLength - newLength);
                this.classicsSimple.barExtraLength = newLength;
            }
        }
        else {
            this.classicsSimple.pausedTimeWithoutGrowing += deltaTimeInMilliSeconds;
        }
    }
    draw(): void {
        this.model.headerRefreshId = setInterval(() => {
            let topHeight = this.model.initFooterHeight * this.multiple3;
            if (smartRefreshSecond.REFRESHSTATE.TOREFRESH == this.model.refreshState) {
                this.bounceCount = 0;
                let bottomCircleStartY = this.model.footerHeight * this.multiple3;
                this.smoothPathCmd = `M0 0 L0 ${topHeight} S${this.screenWidth / 2} ${bottomCircleStartY} ${this.screenWidth} ${topHeight} L${this.screenWidth} 0 Z`;
            }
            if (smartRefreshSecond.REFRESHSTATE.REFRESHING == this.model.refreshState) {
                let bottomCircleStartY = 0;
                if (this.bounceCount < 20) { // 1000/30 约等于66
                    this.bounceCount += 1;
                    if (this.bounceDirection) {
                        if (this.bounceMaxOffset <= 0) {
                            this.bounceMaxOffset = 100 - this.bounceCount * 5; //第二次在50位置开始
                        }
                        bottomCircleStartY = (this.model.initFooterHeight - this.bounceMaxOffset) * this.multiple3;
                        this.bounceMaxOffset -= 10;
                    }
                }
                else {
                    bottomCircleStartY = this.model.initFooterHeight * this.multiple3;
                }
                this.smoothPathCmd = `M0 0 L0 ${topHeight} S${this.screenWidth / 2} ${bottomCircleStartY} ${this.screenWidth} ${topHeight} L${this.screenWidth} 0 Z`;
                this.onDraw();
            }
            this.refresh = !this.refresh;
        }, 30);
    }
    aboutToAppear() {
        this.model.setInitFooterHeight(250);
        this.model.setFooterHeight(250);
        this.model.setRefreshBottomCallback(() => this.draw());
        this.classicsSimple.setBarColor(Color.White).setCircleRadius(110).init();
    }
    render() {
        Flex.create();
        Flex.backgroundColor(Color.Gray);
        If.create();
        if (this.refresh) {
            If.branchId(0);
            Text.create("0");
            Text.visibility(Visibility.None);
            Text.pop();
        }
        else {
            If.branchId(1);
            Text.create("1");
            Text.visibility(Visibility.None);
            Text.pop();
        }
        If.pop();
        If.create();
        if (this.model.refreshState == smartRefreshSecond.REFRESHSTATE.REFRESHING) { //松开过后的刷新样式
            If.branchId(0);
            Stack.create({ alignContent: Alignment.Center });
            Stack.width("100%");
            Stack.height("100%");
            Path.create();
            Path.width("100%");
            Path.height(this.model.initHeaderHeight);
            Path.commands(this.smoothPathCmd);
            Path.backgroundColor(Color.White);
            Path.fill(this.model.getBackgroundColor());
            Circle.create({ width: 40, height: 40 });
            Circle.fillOpacity(3);
            Circle.stroke(Color.White);
            Circle.strokeWidth(2);
            Circle.fill(Color.White);
            Path.create();
            Path.strokeWidth(8);
            Path.fillOpacity(0);
            Path.stroke(this.classicsSimple.barColor);
            Path.commands(this.classicsSimple.svgPath);
            Path.width(80);
            Path.height(80);
            Path.zIndex(2);
            Path.margin({ left: (16), top: (18) });
            Path.opacity(1);
            Stack.pop();
        }
        else if (this.model.refreshState == smartRefreshSecond.REFRESHSTATE.TOREFRESH) { //拖住过程中的样式
            If.branchId(1);
            Path.create();
            Path.width("100%");
            Path.height(this.model.initFooterHeight);
            Path.commands(this.smoothPathCmd);
            Path.backgroundColor(Color.Gray);
            Path.fill(this.model.getBackgroundColor());
        }
        If.pop();
        Flex.pop();
    }
}
namespace BezierCircleBottomModel {
    export class Model {
        //画笔宽度
        barWidth: number = 5;
        //轮圈宽度
        rimWidth: number = 5;
        //画笔颜色
        barColor: number = 0X5588FF;
        // 大/小角度弧标志  0为小角度
        angleFlag: number = 0;
        // 圆弧最小角度
        minAngle: number = 16;
        // 圆弧最大角度
        maxAngle: number = 270;
        //半径
        circleRadius: number = 60;
        //真实半径
        radius: number = 0;
        // 在 minAngle 基础上，额外需要绘制的角度
        barExtraLength: number = 0;
        // 需要绘制到的角度
        targetAngle: number = 0;
        // 圆弧递增或递减的标记  true表示递增
        barGrowingFromFront: boolean = true;
        // 逆时针顺时针标志 1表示顺时针
        directionFlag: number = 1;
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
        mTargetProgress: number = 1;
        // 进度值
        mProgress: string = "0";
        // 起始角度
        progress: number = 0;
        //轮圈颜色
        rimColor: number = Color.White;
        // 近似闭合的坐标
        closureY: number = 0;
        // 每1ms的旋转角度，例：230 每1s旋转 230 度    (270-16)/0.46 = 230
        spinSpeed: number = 230;
        //轮圈的svg路径
        rimSvgPath: string = "";
        // 是否是动态进度轮
        isSpinning: boolean = true;
        // 是否是线性进度轮
        linearProgress: boolean = false;
        //圆弧处在最大或者最小角度时，保持当时状态的时间，简而言之，当圆弧为的角度为 barLength
        //圆弧处在最大或者最小角度时，保持当时状态的时间，简而言之，当圆弧为的角度为 barLength
        // 或者 barMaxLength 时，都会在 pauseGrowingTime 这个时间后才会继续变化，最大向最小变化，最小向最大变化，可以理解为 delayTime
        pauseGrowingTime: number = 200;
        // 圆弧 递增/递减 已经经历时间
        timeStartGrowing: number = 0;
        //圆弧 从最小到最大/从最大到最小 的总时间
        barSpinCycleTime: number = 460;
        // 圆弧在 最大/最小 角度保持的时间
        pausedTimeWithoutGrowing: number = 0;
        //上一次绘制的时间
        lastTimeAnimated: number = 0;
        // 定时器
        intervalID: number = 0;
        //初始化
        init() {
            this.radius = this.circleRadius - this.barWidth;
            this.startX = this.circleRadius;
            this.startY = this.barWidth;
            // 近似一个完整的回环(轮圈)
            let closureRadian = 359.99 * Math.PI / 180;
            // 近似闭合的坐标
            let closureX = this.circleRadius + (this.radius * Math.sin(closureRadian));
            this.closureY = this.circleRadius - (this.radius * Math.cos(closureRadian));
            this.rimSvgPath = "M" + this.startX + " " + this.startY + " " + "A " + this.radius + " " +
                this.radius + ", 0, " + "1" + ", " + this.directionFlag + ", " + closureX + " " + this.closureY + "Z";
            // 计算弧度
            if (this.isSpinning) {
                let radian = this.minAngle * Math.PI / 180;
                this.endX = this.circleRadius + (this.radius * Math.sin(radian));
                this.endY = this.circleRadius - (this.radius * Math.cos(radian));
                this.svgPath = "M" + this.startX + " " + this.startY + " " + "A " + this.radius + " " +
                    this.radius + ", 0, " + this.angleFlag + ", " + this.directionFlag + ", " + this.endX + " " + this.endY;
            }
            else {
                if (this.mTargetProgress == 1) {
                    this.maxAngle = 359.99;
                }
                else {
                    this.maxAngle = this.mTargetProgress * 360;
                }
            }
            this.lastTimeAnimated = new Date().getTime();
            if (this.intervalID != 0) {
                this.closeTimer();
            }
        }
        setCircleRadius(circleRadius: number): Model {
            this.circleRadius = circleRadius;
            return this;
        }
        getCircleRadius(): number {
            return this.circleRadius;
        }
        setBarColor(barColor: number): Model {
            this.barColor = barColor;
            return this;
        }
        getBarColor(): number {
            return this.barColor;
        }
        setRimColor(rimColor: number): Model {
            this.rimColor = rimColor;
            return this;
        }
        getRimColor(): number {
            return this.rimColor;
        }
        setRimWidth(rimWidth: number): Model {
            this.rimWidth = rimWidth;
            return this;
        }
        getRimWidth(): number {
            return this.rimWidth;
        }
        setBarWidth(barWidth: number): Model {
            this.barWidth = barWidth;
            return this;
        }
        getBarWidth(): number {
            return this.barWidth;
        }
        setProgress(mTargetProgress: number): Model {
            if (this.isSpinning) {
                this.progress = 0;
                this.isSpinning = false;
            }
            if (mTargetProgress > 1) {
                mTargetProgress = 1;
            }
            else if (mTargetProgress < 0) {
                mTargetProgress = 0;
            }
            this.mTargetProgress = mTargetProgress;
            return this;
        }
        // 获取当前的进度值
        getProgress(): string {
            return this.mProgress;
        }
        setSpinning(isSpinning: boolean): Model {
            this.isSpinning = isSpinning;
            return this;
        }
        setLinearProgress(linearProgress: boolean): Model {
            this.linearProgress = linearProgress;
            return this;
        }
        setSpinSpeed(spinSpeed: number): Model {
            this.spinSpeed = spinSpeed;
            return this;
        }
        getSpinSpeed(): number {
            return this.spinSpeed;
        }
        // Reset the count (in increment mode)
        resetCount(): void {
            this.progress = 0;
            this.mTargetProgress = 0;
        }
        stopSpinning(): void {
            this.isSpinning = false;
            this.progress = 0;
            this.mTargetProgress = 0;
        }
        // Puts the view on spin mode
        spin(): void {
            this.lastTimeAnimated = new Date().getTime();
            this.isSpinning = true;
        }
        // 将进度设置为特定值，栏将立即设置为该值 @param progress 0 和 1 之间的进度
        setInstantProgress(progress: number): void {
            if (this.isSpinning) {
                this.progress = 0;
                this.isSpinning = false;
            }
            if (progress > 1) {
                progress -= 1;
            }
            else if (progress < 0) {
                progress = 0;
            }
            if (progress == this.mTargetProgress) {
                return;
            }
            this.mTargetProgress = Math.min(progress * 360, 360);
            this.progress = this.mTargetProgress;
            this.lastTimeAnimated = new Date().getTime();
        }
        spinning(): boolean {
            return this.isSpinning;
        }
        closeTimer() {
            clearInterval(this.intervalID);
        }
    }
}
export default BezierCircleBottomModel;
