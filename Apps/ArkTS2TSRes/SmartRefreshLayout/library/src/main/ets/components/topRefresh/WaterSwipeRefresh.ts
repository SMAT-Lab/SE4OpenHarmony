interface WaterSwipe_Params {
    model?: SmartRefresh.Model;
    refresh?: boolean;
    waterTopPathCmd?: string;
    waterSwipeTouchType?: TouchType;
    bottomWaterCmd?: string;
    middleWaterCmd?: string;
    waterBottomPathCmd?: string;
    sunSingleLinePth?: string;
    sunSingleSecondLinePth?: string;
    sunRefreshIndex?: number;
    intervalId?: number;
    sunRefreshID?: number;
    sunRefreshIDClearFlag?: boolean;
    bottomCircleRadius?: number;
    offsetIncrement?: number;
    sunXOffset?: number;
    sunYOffset?: number;
    refreshSelectPth?: string;
    refreshSecondSelectPth?: string;
    sunPthArray?: number[];
    dragRefreshData?: WaterSwipeSimple.Model;
    dragPathCmd?: string;
    ArrowRadius?: number;
    arrowAngle?: number;
    arrowPathCmd?: string;
    arrowAngleFlag?: number;
    pullRefreshImage?: Resource;
    screenWidth?: number;
    screenHeight?: number;
    arrowPositionStartX?: number;
    arrowPositionStartY?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "WaterSwipeRefresh_" + ++__generate__Id;
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
import SmartRefresh from "./SmartRefresh";
import display from '@ohos.display';
export class WaterSwipe extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new SynchedPropertyObjectTwoWay(params.model, this, "model");
        this.__refresh = new ObservedPropertySimple(false, this, "refresh");
        this.waterTopPathCmd = '';
        this.waterSwipeTouchType = TouchType.Down;
        this.bottomWaterCmd = '';
        this.__middleWaterCmd = new ObservedPropertySimple('', this, "middleWaterCmd");
        this.waterBottomPathCmd = '';
        this.sunSingleLinePth = '';
        this.sunSingleSecondLinePth = '';
        this.sunRefreshIndex = 0;
        this.intervalId = 0;
        this.sunRefreshID = -1;
        this.sunRefreshIDClearFlag = true;
        this.bottomCircleRadius = 0;
        this.offsetIncrement = 0;
        this.sunXOffset = 300;
        this.sunYOffset = 0;
        this.refreshSelectPth = '';
        this.refreshSecondSelectPth = '';
        this.sunPthArray = [250, 200, 250, 140,
            270, 220, 330, 220,
            250, 240, 250, 300,
            230, 220, 170, 220,
            264, 208, 306, 167,
            264, 234, 306, 276,
            236, 234, 194, 274,
            236, 208, 194, 171];
        this.dragRefreshData = new WaterSwipeSimple.Model();
        this.dragPathCmd = '';
        this.ArrowRadius = 30;
        this.arrowAngle = 45;
        this.arrowPathCmd = '';
        this.arrowAngleFlag = 0;
        this.pullRefreshImage = $r("app.media.ic_loading");
        this.screenWidth = display.getDefaultDisplaySync().width;
        this.screenHeight = display.getDefaultDisplaySync().height;
        this.arrowPositionStartX = (this.screenWidth / 2) //330
        ;
        this.arrowPositionStartY = 100;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: WaterSwipe_Params) {
        if (params.refresh !== undefined) {
            this.refresh = params.refresh;
        }
        if (params.waterTopPathCmd !== undefined) {
            this.waterTopPathCmd = params.waterTopPathCmd;
        }
        if (params.waterSwipeTouchType !== undefined) {
            this.waterSwipeTouchType = params.waterSwipeTouchType;
        }
        if (params.bottomWaterCmd !== undefined) {
            this.bottomWaterCmd = params.bottomWaterCmd;
        }
        if (params.middleWaterCmd !== undefined) {
            this.middleWaterCmd = params.middleWaterCmd;
        }
        if (params.waterBottomPathCmd !== undefined) {
            this.waterBottomPathCmd = params.waterBottomPathCmd;
        }
        if (params.sunSingleLinePth !== undefined) {
            this.sunSingleLinePth = params.sunSingleLinePth;
        }
        if (params.sunSingleSecondLinePth !== undefined) {
            this.sunSingleSecondLinePth = params.sunSingleSecondLinePth;
        }
        if (params.sunRefreshIndex !== undefined) {
            this.sunRefreshIndex = params.sunRefreshIndex;
        }
        if (params.intervalId !== undefined) {
            this.intervalId = params.intervalId;
        }
        if (params.sunRefreshID !== undefined) {
            this.sunRefreshID = params.sunRefreshID;
        }
        if (params.sunRefreshIDClearFlag !== undefined) {
            this.sunRefreshIDClearFlag = params.sunRefreshIDClearFlag;
        }
        if (params.bottomCircleRadius !== undefined) {
            this.bottomCircleRadius = params.bottomCircleRadius;
        }
        if (params.offsetIncrement !== undefined) {
            this.offsetIncrement = params.offsetIncrement;
        }
        if (params.sunXOffset !== undefined) {
            this.sunXOffset = params.sunXOffset;
        }
        if (params.sunYOffset !== undefined) {
            this.sunYOffset = params.sunYOffset;
        }
        if (params.refreshSelectPth !== undefined) {
            this.refreshSelectPth = params.refreshSelectPth;
        }
        if (params.refreshSecondSelectPth !== undefined) {
            this.refreshSecondSelectPth = params.refreshSecondSelectPth;
        }
        if (params.sunPthArray !== undefined) {
            this.sunPthArray = params.sunPthArray;
        }
        if (params.dragRefreshData !== undefined) {
            this.dragRefreshData = params.dragRefreshData;
        }
        if (params.dragPathCmd !== undefined) {
            this.dragPathCmd = params.dragPathCmd;
        }
        if (params.ArrowRadius !== undefined) {
            this.ArrowRadius = params.ArrowRadius;
        }
        if (params.arrowAngle !== undefined) {
            this.arrowAngle = params.arrowAngle;
        }
        if (params.arrowPathCmd !== undefined) {
            this.arrowPathCmd = params.arrowPathCmd;
        }
        if (params.arrowAngleFlag !== undefined) {
            this.arrowAngleFlag = params.arrowAngleFlag;
        }
        if (params.pullRefreshImage !== undefined) {
            this.pullRefreshImage = params.pullRefreshImage;
        }
        if (params.screenWidth !== undefined) {
            this.screenWidth = params.screenWidth;
        }
        if (params.screenHeight !== undefined) {
            this.screenHeight = params.screenHeight;
        }
        if (params.arrowPositionStartX !== undefined) {
            this.arrowPositionStartX = params.arrowPositionStartX;
        }
        if (params.arrowPositionStartY !== undefined) {
            this.arrowPositionStartY = params.arrowPositionStartY;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__refresh.aboutToBeDeleted();
        this.__middleWaterCmd.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: SynchedPropertySimpleOneWay<SmartRefresh.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SmartRefresh.Model) {
        this.__model.set(newValue);
    }
    private __refresh: ObservedPropertySimple<boolean>;
    get refresh() {
        return this.__refresh.get();
    }
    set refresh(newValue: boolean) {
        this.__refresh.set(newValue);
    }
    private waterTopPathCmd: string;
    private waterSwipeTouchType: TouchType;
    private bottomWaterCmd: string;
    private __middleWaterCmd: ObservedPropertySimple<string>;
    get middleWaterCmd() {
        return this.__middleWaterCmd.get();
    }
    set middleWaterCmd(newValue: string) {
        this.__middleWaterCmd.set(newValue);
    }
    private waterBottomPathCmd: string;
    private sunSingleLinePth: string;
    private sunSingleSecondLinePth: string;
    private sunRefreshIndex: number;
    private intervalId: number;
    private sunRefreshID: number;
    private sunRefreshIDClearFlag: boolean;
    private bottomCircleRadius: number;
    private offsetIncrement: number;
    private sunXOffset: number;
    private sunYOffset: number;
    private refreshSelectPth: string;
    private refreshSecondSelectPth: string;
    private sunPthArray: number[];
    //下拉刷新时的箭头
    private dragRefreshData: WaterSwipeSimple.Model;
    private dragPathCmd: string;
    private ArrowRadius: number;
    private arrowAngle: number;
    private arrowPathCmd: string;
    private arrowAngleFlag: number;
    private pullRefreshImage: Resource;
    private screenWidth: number;
    private screenHeight: number;
    private arrowPositionStartX: number; //330
    private arrowPositionStartY: number;
    caculateSunOffset(sunXOffset: number, sunYOffset: number): void {
        let index: number = 0;
        this.sunPthArray.forEach((item: number) => {
            let itemRemainder = index % 4;
            if (itemRemainder == 0) {
                this.refreshSelectPth = this.refreshSelectPth + ' ' + 'M' + ' ' + (this.sunPthArray[index] + sunXOffset);
            }
            if (itemRemainder == 1) {
                this.refreshSelectPth = this.refreshSelectPth + ' ' + (this.sunPthArray[index] + sunYOffset);
            }
            if (itemRemainder == 2) {
                this.refreshSelectPth = this.refreshSelectPth + ' ' + 'L' + ' ' + (this.sunPthArray[index] + sunXOffset);
            }
            if (itemRemainder == 3) {
                this.refreshSelectPth = this.refreshSelectPth + ' ' + (this.sunPthArray[index] + sunYOffset);
            }
            index += 1;
        });
    }
    ondraw(): void {
        this.refreshSunFunction();
        this.model.headerRefreshId = setInterval(() => {
            if (this.model.refreshState == SmartRefresh.REFRESHSTATE.REFRESHFINISH) {
                if (this.sunRefreshIDClearFlag) {
                    this.sunRefreshIDClearFlag = false;
                    setTimeout(() => {
                        clearInterval(this.sunRefreshID);
                        this.sunRefreshIDClearFlag = true;
                        this.sunRefreshID = -1;
                    }, this.model.refreshDuration);
                }
            }
            let topCircleRadius: number = 100;
            let initStartX: number = this.screenWidth / 2 - topCircleRadius;
            let initStartY: number = this.model.headerHeight - this.model.initHeaderHeight < 100 ? (this.model.headerHeight - this.model.initHeaderHeight) : 100;
            this.arrowPositionStartY = initStartY;
            if (SmartRefresh.REFRESHSTATE.TOREFRESH == this.model.refreshState) {
                this.waterTopPathCmd = `M ${initStartX},${initStartY} a ${topCircleRadius} ${topCircleRadius} 90 1 1 0 1 Z`;
                this.bottomCircleRadius = 100 - Math.pow(this.model.getOffset(), 0.8) * 45;
                let bottomCircleStartX = initStartX + topCircleRadius - this.bottomCircleRadius; // 450 + 100
                let getOffset = this.model.getOffset() * this.model.initHeaderHeight;
                let bottomCircleStartY = this.model.headerHeight > this.model.initHeaderHeight ?
                    ((this.model.headerHeight - this.model.initHeaderHeight + initStartY) * 3) : (initStartY);
                let leftMiddleX = (initStartX + bottomCircleStartX) / 2 + 20;
                let leftMiddleY = (initStartY + bottomCircleStartY) / 2;
                let rightMiddleX = (initStartX + 2 * topCircleRadius + bottomCircleStartX + 2 * this.bottomCircleRadius) / 2 - 20;
                let bottomCircleEndX = bottomCircleStartX + 2 * this.bottomCircleRadius;
                let topCircleEndX = initStartX + 2 * topCircleRadius;
                this.bottomWaterCmd = ` M ` + bottomCircleStartX + " " + bottomCircleStartY + ` a ${this.bottomCircleRadius} ${this.bottomCircleRadius} 90 1 1 0 1 Z`;
                this.middleWaterCmd = `M ${initStartX} ${initStartY} `
                    + ` C ${initStartX} ${initStartY} ` + leftMiddleX + " " + leftMiddleY + " " + bottomCircleStartX + " " + bottomCircleStartY
                    + " M" + bottomCircleStartX + " " + bottomCircleStartY
                    + " L" + bottomCircleEndX + " " + bottomCircleStartY
                    + " C" + bottomCircleEndX + " " + bottomCircleStartY + " " + rightMiddleX + " " + leftMiddleY + " " + `${topCircleEndX}` + ` ${initStartY}`
                    + ` L${initStartX} ${initStartY} `;
                //顶部圆形中的刷新
                let increase_distanceToAngle: number = 360 * this.model.headerHeight / (this.model.initHeaderHeight * 2);
                let reduce_distanceToAngle: number = 135 * this.model.headerHeight / (this.model.initHeaderHeight * 3);
                let arrowTopRadian: number = 0;
                let arrowBottomRadian: number = 0;
                if ((increase_distanceToAngle - reduce_distanceToAngle) < 180) {
                    this.arrowAngleFlag = 0;
                }
                else {
                    arrowTopRadian = (increase_distanceToAngle - this.arrowAngle - 10) * Math.PI / 180; //减10是基于效果
                    arrowBottomRadian = (increase_distanceToAngle - this.arrowAngle * 3 - 10) * Math.PI / 180;
                    this.arrowAngleFlag = 1;
                }
                let increaseRadian = increase_distanceToAngle * Math.PI / 180;
                let reduceRadian = reduce_distanceToAngle * Math.PI / 180;
                this.dragRefreshData.radius = this.dragRefreshData.circleRadius - this.dragRefreshData.barWidth;
                this.dragRefreshData.startX = this.arrowPositionStartX + (this.dragRefreshData.radius * Math.cos(increaseRadian));
                this.dragRefreshData.startY = this.arrowPositionStartY + (this.dragRefreshData.radius * Math.sin(increaseRadian));
                this.dragRefreshData.endX = this.arrowPositionStartX + (this.dragRefreshData.radius * Math.cos(reduceRadian));
                this.dragRefreshData.endY = this.arrowPositionStartY + (this.dragRefreshData.radius * Math.sin(reduceRadian));
                let arrowTopPointEndX = this.dragRefreshData.startX + (this.ArrowRadius * Math.cos(arrowTopRadian));
                let arrowTopPointEndY = this.dragRefreshData.startY + (this.ArrowRadius * Math.sin(arrowTopRadian));
                let arrowBottomPointEndX = this.dragRefreshData.startX + (this.ArrowRadius * Math.cos(arrowBottomRadian));
                let arrowBottomPointEndY = this.dragRefreshData.startY + (this.ArrowRadius * Math.sin(arrowBottomRadian));
                if (this.arrowAngleFlag == 0) {
                    this.dragPathCmd = "M" + this.dragRefreshData.endX + " " + this.dragRefreshData.endY + " "
                        + "A " + this.dragRefreshData.radius + " " + this.dragRefreshData.radius + ", 0, "
                        + this.arrowAngleFlag + ", " + this.dragRefreshData.directionFlag + ", "
                        + this.dragRefreshData.startX + " " + this.dragRefreshData.startY;
                }
                else {
                    this.dragPathCmd = "M " + this.dragRefreshData.endX + " " + this.dragRefreshData.endY + " "
                        + "A " + this.dragRefreshData.radius + " " + this.dragRefreshData.radius + ", 0, "
                        + this.arrowAngleFlag + ", " + this.dragRefreshData.directionFlag + ", "
                        + this.dragRefreshData.startX + " " + this.dragRefreshData.startY;
                    this.arrowPathCmd = "M" + arrowTopPointEndX + " " + arrowTopPointEndY
                        + "L " + this.dragRefreshData.startX + " " + this.dragRefreshData.startY + " "
                        + "L " + arrowBottomPointEndX + " " + arrowBottomPointEndY;
                }
                this.refresh = !this.refresh;
            }
            else { //清除上一次的数据
                this.bottomWaterCmd = "";
                this.middleWaterCmd = "";
                this.waterTopPathCmd = "";
                this.dragPathCmd = "";
            }
        }, 30);
    }
    refreshSunFunction(): void {
        this.pullRefreshImage = $r("app.media.ic_loading");
        this.sunRefreshID = setInterval(() => {
            Context.animateTo({
                duration: 150,
                delay: 50,
                onFinish: () => {
                    this.pullRefreshImage = $r("app.media.ic_loading");
                }
            }, () => {
            });
        }, 200);
    }
    aboutToAppear() {
        this.model.setInitHeaderHeight(200).setHeaderHeight(200).setZHeaderIndex(99).setZMainIndex(-1).setBackgroundShadowColor(Color.White);
        this.model.setRefreshHeaderCallback(() => this.ondraw());
        if (this.model.initRefreshing) {
            this.model.refreshHeaderCallback();
            this.model.initRefreshing = false;
        }
    }
    aboutToDisappear() {
        clearInterval(this.model.headerRefreshId);
        clearInterval(this.sunRefreshID);
    }
    render() {
        Flex.create();
        Flex.backgroundColor(this.model.backgroundShadowColor);
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
        if (this.model.refreshState == SmartRefresh.REFRESHSTATE.REFRESHING) { //松开过后的刷新样式
            If.branchId(0);
            Stack.create();
            Stack.width("100%");
            Image.create(this.pullRefreshImage);
            Image.width(100);
            Image.height(100);
            Image.margin({ top: 30 });
            Stack.pop();
        }
        else if (this.model.refreshState == SmartRefresh.REFRESHSTATE.TOREFRESH) { //拖住过程中的样式
            If.branchId(1);
            Stack.create({ alignContent: Alignment.Center });
            If.create();
            if (this.model.latestYOffset < 300 && this.model.latestYOffset > 75) {
                If.branchId(0);
            }
            else {
                If.branchId(1);
                Stack.create({ alignContent: Alignment.Center });
                Path.create();
                Path.width("100%");
                Path.height(this.model.headerHeight);
                Path.commands(this.bottomWaterCmd);
                Path.fill(this.model.backgroundColor);
                Path.create();
                Path.width("100%");
                Path.height(this.model.headerHeight);
                Path.commands(this.middleWaterCmd);
                Path.fill(this.model.backgroundColor);
                Path.create();
                Path.width("100%");
                Path.height(this.model.headerHeight);
                Path.commands(this.waterTopPathCmd);
                Path.fill(this.model.backgroundColor);
                Path.create();
                Path.width("100%");
                Path.height(this.model.headerHeight);
                Path.commands(this.dragPathCmd);
                Path.strokeWidth(3);
                Path.fill(this.model.backgroundColor);
                Path.stroke(Color.White);
                Path.margin({ top: 0, left: 0 });
                Stack.pop();
            }
            If.pop();
            Stack.pop();
        }
        If.pop();
        Flex.pop();
    }
}
namespace WaterSwipeSimple {
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
        circleRadius: number = 50;
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
export default WaterSwipeSimple;
