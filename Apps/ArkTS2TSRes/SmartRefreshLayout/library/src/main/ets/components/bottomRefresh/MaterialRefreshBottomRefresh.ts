interface MaterialBottom_Params {
    model?: SmartRefresh.Model;
    refreshData?: MaterialBottomSimple.Model;
    refresh?: boolean;
    refreshState?: boolean;
    dragRefreshData?: MaterialBottomSimple.Model;
    dragPathCmd?: string;
    init?: boolean;
    lastYOffset?: number;
    intervalID?: number;
    information?: string;
    EnglishMonth?: string[];
    refreshColor?: Color[];
    latestIndex?: number;
    latestAngle?: number;
    flag?: boolean;
    ArrowRadius?: number;
    arrowAngle?: number;
    arrowPathCmd?: string;
    arrowAngleFlag?: number;
    screenWidth?: number;
    multiple3?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MaterialRefreshBottomRefresh_" + ++__generate__Id;
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
import SmartRefresh from "../topRefresh/SmartRefresh";
import display from '@ohos.display';
export class MaterialBottom extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new SynchedPropertyObjectTwoWay(params.model, this, "model");
        this.__refreshData = new ObservedPropertyObject(new MaterialBottomSimple.Model(), this, "refreshData");
        this.__refresh = new ObservedPropertySimple(false, this, "refresh");
        this.__refreshState = new ObservedPropertySimple(false
        //拖拽变量
        , this, "refreshState");
        this.dragRefreshData = new MaterialBottomSimple.Model();
        this.dragPathCmd = '';
        this.init = false;
        this.lastYOffset = 0;
        this.intervalID = 0;
        this.information = '';
        this.EnglishMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Oct', 'Dec'];
        this.refreshColor = [Color.Blue, Color.Red, Color.Green];
        this.latestIndex = 0;
        this.latestAngle = 0;
        this.flag = false;
        this.ArrowRadius = 30;
        this.arrowAngle = 45;
        this.arrowPathCmd = '';
        this.arrowAngleFlag = 0;
        this.screenWidth = display.getDefaultDisplaySync().width;
        this.multiple3 = 3;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MaterialBottom_Params) {
        if (params.refreshData !== undefined) {
            this.refreshData = params.refreshData;
        }
        if (params.refresh !== undefined) {
            this.refresh = params.refresh;
        }
        if (params.refreshState !== undefined) {
            this.refreshState = params.refreshState;
        }
        if (params.dragRefreshData !== undefined) {
            this.dragRefreshData = params.dragRefreshData;
        }
        if (params.dragPathCmd !== undefined) {
            this.dragPathCmd = params.dragPathCmd;
        }
        if (params.init !== undefined) {
            this.init = params.init;
        }
        if (params.lastYOffset !== undefined) {
            this.lastYOffset = params.lastYOffset;
        }
        if (params.intervalID !== undefined) {
            this.intervalID = params.intervalID;
        }
        if (params.information !== undefined) {
            this.information = params.information;
        }
        if (params.EnglishMonth !== undefined) {
            this.EnglishMonth = params.EnglishMonth;
        }
        if (params.refreshColor !== undefined) {
            this.refreshColor = params.refreshColor;
        }
        if (params.latestIndex !== undefined) {
            this.latestIndex = params.latestIndex;
        }
        if (params.latestAngle !== undefined) {
            this.latestAngle = params.latestAngle;
        }
        if (params.flag !== undefined) {
            this.flag = params.flag;
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
        if (params.screenWidth !== undefined) {
            this.screenWidth = params.screenWidth;
        }
        if (params.multiple3 !== undefined) {
            this.multiple3 = params.multiple3;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__refreshData.aboutToBeDeleted();
        this.__refresh.aboutToBeDeleted();
        this.__refreshState.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: SynchedPropertySimpleOneWay<SmartRefresh.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SmartRefresh.Model) {
        this.__model.set(newValue);
    }
    private __refreshData: ObservedPropertyObject<MaterialBottomSimple.Model>;
    get refreshData() {
        return this.__refreshData.get();
    }
    set refreshData(newValue: MaterialBottomSimple.Model) {
        this.__refreshData.set(newValue);
    }
    private __refresh: ObservedPropertySimple<boolean>;
    get refresh() {
        return this.__refresh.get();
    }
    set refresh(newValue: boolean) {
        this.__refresh.set(newValue);
    }
    private __refreshState: ObservedPropertySimple<boolean>;
    get refreshState() {
        return this.__refreshState.get();
    }
    set refreshState(newValue: boolean) {
        this.__refreshState.set(newValue);
    }
    //拖拽变量
    private dragRefreshData: MaterialBottomSimple.Model;
    private dragPathCmd: string;
    private init: boolean;
    private lastYOffset: number;
    private intervalID: number;
    private information: string;
    private EnglishMonth: string[];
    // 刷新条的颜色
    private refreshColor: Color[];
    private latestIndex: number;
    private latestAngle: number;
    private flag: boolean;
    //下拉刷新时的箭头
    private ArrowRadius: number;
    private arrowAngle: number;
    private arrowPathCmd: string;
    private arrowAngleFlag: number;
    private screenWidth: number;
    private multiple3: number;
    draw(): void {
        this.model.bottomRefreshId = setInterval(() => {
            if (this.model.refreshState == SmartRefresh.REFRESHSTATE.TOREFRESH) {
                let increase_distanceToAngle: number = 360 * (this.model.footerHeight - this.model.initFooterHeight) / 150;
                let reduce_distanceToAngle: number = 135 * (this.model.footerHeight - this.model.initFooterHeight) / 150;
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
                let progress = increase_distanceToAngle - reduce_distanceToAngle;
                let increaseRadian = increase_distanceToAngle * Math.PI / 180;
                let reduceRadian = reduce_distanceToAngle * Math.PI / 180;
                this.dragRefreshData.radius = this.dragRefreshData.circleRadius - this.dragRefreshData.barWidth;
                this.dragRefreshData.startX = 60 + (this.dragRefreshData.radius * Math.cos(increaseRadian));
                this.dragRefreshData.startY = 60 + (this.dragRefreshData.radius * Math.sin(increaseRadian));
                this.dragRefreshData.endX = 60 + (this.dragRefreshData.radius * Math.cos(reduceRadian));
                this.dragRefreshData.endY = 60 + (this.dragRefreshData.radius * Math.sin(reduceRadian));
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
            }
            // 刷新数据
            this.onDraw();
            this.refresh = !this.refresh;
        }, 20);
    }
    private onDraw(): void {
        // 动态绘制
        if (this.refreshData.isSpinning) {
            //刷新条的颜色控制
            if (this.refreshData.barExtraLength <= this.latestAngle) {
                this.latestAngle = this.refreshData.barExtraLength;
                this.flag = true;
            }
            else {
                this.latestAngle = this.refreshData.barExtraLength;
                if (this.flag) {
                    this.refreshData.setBarColor(this.refreshColor[this.latestIndex % 3]);
                    this.latestIndex += 1;
                    this.flag = false;
                }
            }
            if ((this.refreshData.barExtraLength + this.refreshData.minAngle) < 180) {
                this.refreshData.angleFlag = 0;
            }
            else {
                this.refreshData.angleFlag = 1;
            }
            // 增量时间
            let deltaTime = new Date().getTime() - this.refreshData.lastTimeAnimated;
            let deltaNormalized = deltaTime * this.refreshData.spinSpeed / 1000;
            this.refreshData.progress += deltaNormalized;
            if (this.refreshData.progress > 360) {
                this.refreshData.progress -= 360;
            }
            let radian = this.refreshData.progress * Math.PI / 180;
            this.refreshData.startX = this.refreshData.circleRadius + (this.refreshData.radius * Math.sin(radian));
            this.refreshData.startY = this.refreshData.circleRadius - (this.refreshData.radius * Math.cos(radian));
            // 计算需要额外绘制的角度
            this.updateBarLength(deltaTime);
            this.refreshData.lastTimeAnimated = new Date().getTime();
            // 计算坐标
            this.calculation();
            this.refreshData.targetAngle = this.refreshData.progress + this.refreshData.barExtraLength + this.refreshData.minAngle;
            if (this.refreshData.targetAngle > 360) {
                this.refreshData.targetAngle = this.refreshData.targetAngle - 360;
            }
            this.refreshData.mProgress = "Progress:";
            this.refreshData.svgPath = "M" + this.refreshData.startX + " " + this.refreshData.startY + " " + "A " + this.refreshData.radius + " " +
                this.refreshData.radius + ", 0, " + this.refreshData.angleFlag + ", " + this.refreshData.directionFlag + ", " + this.refreshData.endX + " " + this.refreshData.endY;
        }
    }
    private calculation(): void {
        // 计算弧度
        let radian = this.refreshData.targetAngle * Math.PI / 180;
        this.refreshData.endX = this.refreshData.circleRadius + (this.refreshData.radius * Math.sin(radian));
        this.refreshData.endY = this.refreshData.circleRadius - (this.refreshData.radius * Math.cos(radian));
        // 控制起点终点无限接近时正常画圆
        if ((this.refreshData.circleRadius - 1) < this.refreshData.endX && this.refreshData.endX < this.refreshData.circleRadius && (this.refreshData.circleRadius - this.refreshData.endX) < 0.01) {
            this.refreshData.endX = this.refreshData.circleRadius - 0.01;
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
            }
            else {
                //递减
                let newLength = destLength * (1 - distance);
                this.refreshData.progress += (this.refreshData.barExtraLength - newLength);
                this.refreshData.barExtraLength = newLength;
            }
        }
        else {
            this.refreshData.pausedTimeWithoutGrowing += deltaTimeInMilliSeconds;
        }
    }
    aboutToAppear() {
        this.model.setInitFooterHeight(200).setZMainIndex(-1);
        this.model.setRefreshBottomCallback(() => this.draw());
        this.refreshData.setBarColor(Color.Black).setCircleRadius(45).init();
        this.dragRefreshData.setCircleRadius(45);
    }
    render() {
        Flex.create();
        Flex.backgroundColor(Color.White);
        Flex.width("100%");
        Flex.height("100%");
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
            //            Circle({ width:  65, height: 65 })
            //              .fillOpacity(3)
            //              .stroke(Color.Gray)
            //              .strokeWidth(3)
            //              .fill(this.model.getBackgroundShadowColor())
            //              .margin({top: 40, left: 153})
            Path.create();
            //            Circle({ width:  65, height: 65 })
            //              .fillOpacity(3)
            //              .stroke(Color.Gray)
            //              .strokeWidth(3)
            //              .fill(this.model.getBackgroundShadowColor())
            //              .margin({top: 40, left: 153})
            Path.strokeWidth(3);
            //            Circle({ width:  65, height: 65 })
            //              .fillOpacity(3)
            //              .stroke(Color.Gray)
            //              .strokeWidth(3)
            //              .fill(this.model.getBackgroundShadowColor())
            //              .margin({top: 40, left: 153})
            Path.stroke(this.model.backgroundColor);
            //            Circle({ width:  65, height: 65 })
            //              .fillOpacity(3)
            //              .stroke(Color.Gray)
            //              .strokeWidth(3)
            //              .fill(this.model.getBackgroundShadowColor())
            //              .margin({top: 40, left: 153})
            Path.commands("M0 80 A 80 80, 0, 1, 1, 0 79.99");
            //            Circle({ width:  65, height: 65 })
            //              .fillOpacity(3)
            //              .stroke(Color.Gray)
            //              .strokeWidth(3)
            //              .fill(this.model.getBackgroundShadowColor())
            //              .margin({top: 40, left: 153})
            Path.width(50);
            //            Circle({ width:  65, height: 65 })
            //              .fillOpacity(3)
            //              .stroke(Color.Gray)
            //              .strokeWidth(3)
            //              .fill(this.model.getBackgroundShadowColor())
            //              .margin({top: 40, left: 153})
            Path.height(50);
            //            Circle({ width:  65, height: 65 })
            //              .fillOpacity(3)
            //              .stroke(Color.Gray)
            //              .strokeWidth(3)
            //              .fill(this.model.getBackgroundShadowColor())
            //              .margin({top: 40, left: 153})
            Path.margin({ top: (this.model.footerHeight / 5), left: this.screenWidth / 6.5 });
            //            Circle({ width:  65, height: 65 })
            //              .fillOpacity(3)
            //              .stroke(Color.Gray)
            //              .strokeWidth(3)
            //              .fill(this.model.getBackgroundShadowColor())
            //              .margin({top: 40, left: 153})
            Path.fill(Color.White);
            Path.create();
            Path.strokeWidth(5);
            Path.fillOpacity(0);
            Path.stroke(this.refreshData.barColor);
            Path.commands(this.refreshData.svgPath);
            Path.width(50);
            Path.height(50);
            Path.zIndex(2);
            Path.margin({ top: (this.model.footerHeight / 5 + 20), left: this.screenWidth / 10 });
            Path.opacity(1);
            Stack.pop();
        }
        else if (this.model.refreshState == SmartRefresh.REFRESHSTATE.TOREFRESH) { //拖住过程中的样式
            If.branchId(1);
            If.create();
            if (this.model.footerHeight > (this.model.initFooterHeight * 3 / 4)) {
                If.branchId(0);
                Stack.create();
                Stack.width("100%");
                Path.create();
                Path.strokeWidth(3);
                Path.stroke(4);
                Path.commands("M0 80 A 80 80, 0, 1, 1, 0 79.99");
                Path.margin({ top: (this.model.footerHeight / 5 + 10), left: px2vp(this.screenWidth / 2) - 80 });
                Path.width(px2vp(80));
                Path.height(px2vp(80));
                Path.fill(Color.White);
                Path.create();
                Path.strokeWidth(this.refreshData.barWidth);
                Path.fillOpacity(0);
                Path.stroke(Color.Blue);
                Path.commands(this.dragPathCmd);
                Path.width(px2vp(80));
                Path.height(px2vp(80));
                Path.zIndex(2);
                Path.margin({ top: (this.model.footerHeight / 5 + 20), left: px2vp(this.screenWidth / 2) - 160 });
                Path.opacity(1);
                If.create();
                if (this.arrowAngleFlag == 1) {
                    If.branchId(0);
                    Path.create();
                    Path.strokeWidth(3);
                    Path.fillOpacity(0);
                    Path.stroke(Color.Blue);
                    Path.commands(this.arrowPathCmd);
                    Path.width(50);
                    Path.height(50);
                    Path.zIndex(2);
                    Path.margin({ top: (this.model.footerHeight / 5 + 20), left: px2vp(this.screenWidth / 2) - 160 });
                    Path.opacity(1);
                }
                If.pop();
                Stack.pop();
            }
            If.pop();
        }
        If.pop();
        Flex.pop();
    }
}
namespace MaterialBottomSimple {
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
export default MaterialBottomSimple;
