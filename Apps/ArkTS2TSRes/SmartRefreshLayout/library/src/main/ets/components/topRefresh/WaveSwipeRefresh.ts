interface WaveSwipe_Params {
    refresh?: boolean;
    model?: SmartRefresh.Model;
    refreshData?: ComWheel.Model;
    touchMoveHeight?: number;
    pathCmd?: string;
    dragPathCmd?: string;
    dragUpFlag?: boolean;
    dragBottomCirclePathCmd?: string;
    lastYOffset?: number;
    maxRangeHeight?: number;
    firstOffsetX?: number;
    firstOffsetY?: number;
    secondOffsetX?: number;
    secondOffsetY?: number;
    thirdOffsetX?: number;
    thirdOffsetY?: number;
    fourOffsetX?: number;
    fourOffsetY?: number;
    fiveOffsetX?: number;
    fiveOffsetY?: number;
    sixOffsetX?: number;
    sevenOffsetX?: number;
    eightOffsetX?: number;
    refreshStateId?: number;
    onlyInsert?: boolean;
    stopIntervalID?: number;
    drawIntervalId?: number;
    dragBottomCircleRadius?: number;
    dragRefreshData?: ComWheel.Model;
    ArrowRadius?: number;
    arrowAngle?: number;
    arrowPathCmd?: string;
    arrowAngleFlag?: number;
    arrowPositionStartX?: number;
    arrowPositionStartY?: number;
    arrowDragDown_TopPointEndX?: number;
    arrowDragDown_TopPointEndY?: number;
    arrowDragDown_BottomPointEndX?: number;
    arrowDragDown_BottomPointEndY?: number;
    arrowDragUpYOffset?: number;
    arrowDragUpXOffset?: number;
    screenWidth?: number;
    screenHeight?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "WaveSwipeRefresh_" + ++__generate__Id;
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
export class WaveSwipe extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__refresh = new ObservedPropertySimple(false, this, "refresh");
        this.__model = new SynchedPropertyObjectTwoWay(params.model, this, "model");
        this.__refreshData = new ObservedPropertyObject(new ComWheel.Model(), this, "refreshData");
        this.touchMoveHeight = 0;
        this.__pathCmd = new ObservedPropertySimple("", this, "pathCmd");
        this.__dragPathCmd = new ObservedPropertySimple('', this, "dragPathCmd");
        this.__dragUpFlag = new ObservedPropertySimple(true, this, "dragUpFlag");
        this.dragBottomCirclePathCmd = '';
        this.lastYOffset = 0;
        this.maxRangeHeight = 0;
        this.firstOffsetX = 0;
        this.firstOffsetY = 0;
        this.secondOffsetX = 0;
        this.secondOffsetY = 0;
        this.thirdOffsetX = 0;
        this.thirdOffsetY = 0;
        this.fourOffsetX = 0;
        this.fourOffsetY = 0;
        this.fiveOffsetX = 0;
        this.fiveOffsetY = 0;
        this.sixOffsetX = 0;
        this.sevenOffsetX = 0;
        this.eightOffsetX = 0;
        this.refreshStateId = 0;
        this.onlyInsert = false;
        this.stopIntervalID = 0;
        this.drawIntervalId = 0;
        this.dragBottomCircleRadius = 50;
        this.dragRefreshData = new ComWheel.Model();
        this.ArrowRadius = 30;
        this.arrowAngle = 45;
        this.arrowPathCmd = '';
        this.arrowAngleFlag = 0;
        this.arrowPositionStartX = 65;
        this.arrowPositionStartY = 150;
        this.arrowDragDown_TopPointEndX = 0;
        this.arrowDragDown_TopPointEndY = 0;
        this.arrowDragDown_BottomPointEndX = 0;
        this.arrowDragDown_BottomPointEndY = 0;
        this.arrowDragUpYOffset = 230;
        this.arrowDragUpXOffset = 10;
        this.screenWidth = display.getDefaultDisplaySync().width;
        this.screenHeight = display.getDefaultDisplaySync().height;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: WaveSwipe_Params) {
        if (params.refresh !== undefined) {
            this.refresh = params.refresh;
        }
        if (params.refreshData !== undefined) {
            this.refreshData = params.refreshData;
        }
        if (params.touchMoveHeight !== undefined) {
            this.touchMoveHeight = params.touchMoveHeight;
        }
        if (params.pathCmd !== undefined) {
            this.pathCmd = params.pathCmd;
        }
        if (params.dragPathCmd !== undefined) {
            this.dragPathCmd = params.dragPathCmd;
        }
        if (params.dragUpFlag !== undefined) {
            this.dragUpFlag = params.dragUpFlag;
        }
        if (params.dragBottomCirclePathCmd !== undefined) {
            this.dragBottomCirclePathCmd = params.dragBottomCirclePathCmd;
        }
        if (params.lastYOffset !== undefined) {
            this.lastYOffset = params.lastYOffset;
        }
        if (params.maxRangeHeight !== undefined) {
            this.maxRangeHeight = params.maxRangeHeight;
        }
        if (params.firstOffsetX !== undefined) {
            this.firstOffsetX = params.firstOffsetX;
        }
        if (params.firstOffsetY !== undefined) {
            this.firstOffsetY = params.firstOffsetY;
        }
        if (params.secondOffsetX !== undefined) {
            this.secondOffsetX = params.secondOffsetX;
        }
        if (params.secondOffsetY !== undefined) {
            this.secondOffsetY = params.secondOffsetY;
        }
        if (params.thirdOffsetX !== undefined) {
            this.thirdOffsetX = params.thirdOffsetX;
        }
        if (params.thirdOffsetY !== undefined) {
            this.thirdOffsetY = params.thirdOffsetY;
        }
        if (params.fourOffsetX !== undefined) {
            this.fourOffsetX = params.fourOffsetX;
        }
        if (params.fourOffsetY !== undefined) {
            this.fourOffsetY = params.fourOffsetY;
        }
        if (params.fiveOffsetX !== undefined) {
            this.fiveOffsetX = params.fiveOffsetX;
        }
        if (params.fiveOffsetY !== undefined) {
            this.fiveOffsetY = params.fiveOffsetY;
        }
        if (params.sixOffsetX !== undefined) {
            this.sixOffsetX = params.sixOffsetX;
        }
        if (params.sevenOffsetX !== undefined) {
            this.sevenOffsetX = params.sevenOffsetX;
        }
        if (params.eightOffsetX !== undefined) {
            this.eightOffsetX = params.eightOffsetX;
        }
        if (params.refreshStateId !== undefined) {
            this.refreshStateId = params.refreshStateId;
        }
        if (params.onlyInsert !== undefined) {
            this.onlyInsert = params.onlyInsert;
        }
        if (params.stopIntervalID !== undefined) {
            this.stopIntervalID = params.stopIntervalID;
        }
        if (params.drawIntervalId !== undefined) {
            this.drawIntervalId = params.drawIntervalId;
        }
        if (params.dragBottomCircleRadius !== undefined) {
            this.dragBottomCircleRadius = params.dragBottomCircleRadius;
        }
        if (params.dragRefreshData !== undefined) {
            this.dragRefreshData = params.dragRefreshData;
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
        if (params.arrowPositionStartX !== undefined) {
            this.arrowPositionStartX = params.arrowPositionStartX;
        }
        if (params.arrowPositionStartY !== undefined) {
            this.arrowPositionStartY = params.arrowPositionStartY;
        }
        if (params.arrowDragDown_TopPointEndX !== undefined) {
            this.arrowDragDown_TopPointEndX = params.arrowDragDown_TopPointEndX;
        }
        if (params.arrowDragDown_TopPointEndY !== undefined) {
            this.arrowDragDown_TopPointEndY = params.arrowDragDown_TopPointEndY;
        }
        if (params.arrowDragDown_BottomPointEndX !== undefined) {
            this.arrowDragDown_BottomPointEndX = params.arrowDragDown_BottomPointEndX;
        }
        if (params.arrowDragDown_BottomPointEndY !== undefined) {
            this.arrowDragDown_BottomPointEndY = params.arrowDragDown_BottomPointEndY;
        }
        if (params.arrowDragUpYOffset !== undefined) {
            this.arrowDragUpYOffset = params.arrowDragUpYOffset;
        }
        if (params.arrowDragUpXOffset !== undefined) {
            this.arrowDragUpXOffset = params.arrowDragUpXOffset;
        }
        if (params.screenWidth !== undefined) {
            this.screenWidth = params.screenWidth;
        }
        if (params.screenHeight !== undefined) {
            this.screenHeight = params.screenHeight;
        }
    }
    aboutToBeDeleted() {
        this.__refresh.aboutToBeDeleted();
        this.__model.aboutToBeDeleted();
        this.__refreshData.aboutToBeDeleted();
        this.__pathCmd.aboutToBeDeleted();
        this.__dragPathCmd.aboutToBeDeleted();
        this.__dragUpFlag.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __refresh: ObservedPropertySimple<boolean>;
    get refresh() {
        return this.__refresh.get();
    }
    set refresh(newValue: boolean) {
        this.__refresh.set(newValue);
    }
    private __model: SynchedPropertySimpleOneWay<SmartRefresh.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SmartRefresh.Model) {
        this.__model.set(newValue);
    }
    private __refreshData: ObservedPropertyObject<ComWheel.Model>;
    get refreshData() {
        return this.__refreshData.get();
    }
    set refreshData(newValue: ComWheel.Model) {
        this.__refreshData.set(newValue);
    }
    private touchMoveHeight: number;
    private __pathCmd: ObservedPropertySimple<string>;
    get pathCmd() {
        return this.__pathCmd.get();
    }
    set pathCmd(newValue: string) {
        this.__pathCmd.set(newValue);
    }
    private __dragPathCmd: ObservedPropertySimple<string>;
    get dragPathCmd() {
        return this.__dragPathCmd.get();
    }
    set dragPathCmd(newValue: string) {
        this.__dragPathCmd.set(newValue);
    }
    private __dragUpFlag: ObservedPropertySimple<boolean>;
    get dragUpFlag() {
        return this.__dragUpFlag.get();
    }
    set dragUpFlag(newValue: boolean) {
        this.__dragUpFlag.set(newValue);
    }
    private dragBottomCirclePathCmd: string;
    private lastYOffset: number;
    private maxRangeHeight: number;
    private firstOffsetX: number;
    private firstOffsetY: number;
    private secondOffsetX: number;
    private secondOffsetY: number;
    private thirdOffsetX: number;
    private thirdOffsetY: number;
    private fourOffsetX: number;
    private fourOffsetY: number;
    private fiveOffsetX: number;
    private fiveOffsetY: number;
    private sixOffsetX: number;
    private sevenOffsetX: number;
    private eightOffsetX: number;
    private refreshStateId: number;
    private onlyInsert: boolean;
    private stopIntervalID: number;
    private drawIntervalId: number;
    private dragBottomCircleRadius: number;
    //下拉刷新时的箭头
    private dragRefreshData: ComWheel.Model;
    private ArrowRadius: number;
    private arrowAngle: number;
    private arrowPathCmd: string;
    private arrowAngleFlag: number;
    private arrowPositionStartX: number;
    private arrowPositionStartY: number;
    private arrowDragDown_TopPointEndX: number;
    private arrowDragDown_TopPointEndY: number;
    private arrowDragDown_BottomPointEndX: number;
    private arrowDragDown_BottomPointEndY: number;
    private arrowDragUpYOffset: number;
    private arrowDragUpXOffset: number;
    private screenWidth: number;
    private screenHeight: number;
    arrowDraw(centerX: number, centerY: number): void {
        if (SmartRefresh.REFRESHSTATE.TOREFRESH == this.model.refreshState) {
            this.dragRefreshData.setCircleRadius(45);
            //超过默认高度，显示底部圆,最大为100
            let exceedInitHeaderHeight = 80 * (this.model.headerHeight - this.model.initHeaderHeight / 2) / this.model.initHeaderHeight;
            if (exceedInitHeaderHeight <= 40) {
                this.dragBottomCircleRadius = 40;
            }
            else {
                this.dragBottomCircleRadius = exceedInitHeaderHeight <= 70 ? exceedInitHeaderHeight : 70;
            }
            //顶部圆形中的刷新
            let increase_distanceToAngle: number = 360 * (this.model.headerHeight - this.model.initHeaderHeight) / this.model.initHeaderHeight;
            let reduce_distanceToAngle: number = 135 * (this.model.headerHeight - this.model.initHeaderHeight) / this.model.initHeaderHeight;
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
            this.dragRefreshData.startX = centerX + (this.dragRefreshData.radius * Math.cos(increaseRadian));
            this.dragRefreshData.startY = centerY + (this.dragRefreshData.radius * Math.sin(increaseRadian));
            this.dragRefreshData.endX = centerX + (this.dragRefreshData.radius * Math.cos(reduceRadian));
            this.dragRefreshData.endY = centerY + (this.dragRefreshData.radius * Math.sin(reduceRadian));
            this.arrowDragDown_TopPointEndX = this.dragRefreshData.startX + (this.ArrowRadius * Math.cos(arrowTopRadian));
            this.arrowDragDown_TopPointEndY = this.dragRefreshData.startY + (this.ArrowRadius * Math.sin(arrowTopRadian));
            this.arrowDragDown_BottomPointEndX = this.dragRefreshData.startX + (this.ArrowRadius * Math.cos(arrowBottomRadian));
            this.arrowDragDown_BottomPointEndY = this.dragRefreshData.startY + (this.ArrowRadius * Math.sin(arrowBottomRadian));
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
                    + this.dragRefreshData.startX + " " + this.dragRefreshData.startY + " "
                    + "L" + this.arrowDragDown_TopPointEndX + " " + this.arrowDragDown_TopPointEndY
                    + "L " + this.dragRefreshData.startX + " " + this.dragRefreshData.startY + " "
                    + "L " + this.arrowDragDown_BottomPointEndX + " " + this.arrowDragDown_BottomPointEndY;
            }
        }
    }
    //先放大圆，在放大颈部，更好控制刷新条
    private dropMoveDraw(): void {
        this.model.headerRefreshId = setInterval(() => {
            let screenWidth = this.screenWidth;
            let bottomLineWidth = 100;
            this.touchMoveHeight = this.model.downYOffset;
            if (this.model.refreshState == SmartRefresh.REFRESHSTATE.TOREFRESH) {
                this.model.waterDropYTopCoordinate = 0;
                this.model.waterDropYMiddleCoordinate = 400;
                this.model.waterDropYBottomCoordinate = 600;
                this.secondOffsetX = screenWidth * 9 / 20;
                this.firstOffsetX = this.secondOffsetX / 2;
                this.thirdOffsetX = this.secondOffsetX + 40;
                this.fourOffsetX = this.secondOffsetX;
                this.fiveOffsetX = this.fourOffsetX + bottomLineWidth;
                this.sixOffsetX = this.fiveOffsetX - 40;
                this.sevenOffsetX = this.fiveOffsetX;
                this.eightOffsetX = (this.sevenOffsetX + screenWidth) / 2;
                this.firstOffsetY = this.touchMoveHeight < 200 ? this.touchMoveHeight / 5 : 30;
                this.secondOffsetY = this.touchMoveHeight < 200 ? this.touchMoveHeight / 2 : 100;
                this.thirdOffsetY = this.touchMoveHeight < 200 ? this.touchMoveHeight / 2 : 100;
                this.fourOffsetY = (200 < this.touchMoveHeight && this.touchMoveHeight < 300) ? 150 : this.touchMoveHeight * 0.5;
                this.fourOffsetY = this.fourOffsetY > 200 ? 200 : this.fourOffsetY;
                this.fiveOffsetY = this.fourOffsetY + 200;
                if (this.touchMoveHeight > 150) {
                    this.maxRangeHeight = 450;
                }
                else {
                    this.maxRangeHeight = this.touchMoveHeight * 3; // 为1100dp 除以360
                }
                if (this.touchMoveHeight <= this.model.initHeaderHeight) {
                    // this.pathCmd = `C0 0 ${this.firstOffsetX} ${this.firstOffsetY} 350 ${this.secondOffsetY}`
                    //                + `C350 ${this.secondOffsetY} 360 ${this.secondOffsetY} 370 ${this.secondOffsetY}`
                    //                + `C370 ${this.secondOffsetY} ${this.eightOffsetX} ${this.firstOffsetY} ${screenWidth} 0`
                    //                + `Z`;
                    this.pathCmd = `C0 0 ${this.firstOffsetX} ${this.firstOffsetY} C ${screenWidth / 2 - 10} 350`
                        + `C ${screenWidth / 2 - 10} ${this.secondOffsetY} ${screenWidth / 2} ${this.secondOffsetY} ${screenWidth / 2 + 10} ${this.secondOffsetY}`
                        + `C ${screenWidth / 2 + 10} ${this.secondOffsetY} ${this.eightOffsetX} ${this.firstOffsetY} ${screenWidth} 0`
                        + `Z`;
                }
                else {
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
                let VerticalDistanceY = Math.sqrt(this.dragBottomCircleRadius * this.dragBottomCircleRadius - (bottomLineWidth / 2) * (bottomLineWidth / 2));
                this.arrowDraw(this.fiveOffsetX - 50, this.fourOffsetY + VerticalDistanceY);
            }
            if (this.model.refreshState == SmartRefresh.REFRESHSTATE.REFRESHING && this.model.waterDropYTopCoordinate < 500) {
                this.model.waterDropYTopCoordinate += 40;
                this.model.waterDropYMiddleCoordinate += 20;
                this.model.waterDropYBottomCoordinate += 20;
                this.pathCmd = `M${screenWidth / 2 - this.dragBottomCircleRadius} ${this.model.waterDropYMiddleCoordinate}
                        L${screenWidth / 2} ${this.model.waterDropYTopCoordinate}
                        L${screenWidth / 2 + this.dragBottomCircleRadius} ${this.model.waterDropYMiddleCoordinate}
                        M${screenWidth / 2 + this.dragBottomCircleRadius} ${this.model.waterDropYMiddleCoordinate}
                        A ${this.dragBottomCircleRadius} ${this.dragBottomCircleRadius} 0, 1, 1,
                        ${screenWidth / 2 - this.dragBottomCircleRadius} ${this.model.waterDropYMiddleCoordinate} Z`;
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
                    + (this.arrowDragDown_BottomPointEndY + this.model.waterDropYMiddleCoordinate - this.arrowDragUpYOffset);
                if (this.model.waterDropYTopCoordinate > 459 && this.model.waterDropYTopCoordinate < 500) { //确保只有一次
                    this.dragUpFlag = false; //控制刷新出现
                    this.drawIntervalId = setInterval(() => {
                        // 刷新数据
                        this.onDraw();
                    }, 20);
                    setTimeout(() => {
                        this.dragUpFlag = true;
                        this.pathCmd = 'M0 0 L0 0 Z';
                        clearInterval(this.drawIntervalId);
                    }, this.model.refreshDuration);
                }
            }
            this.refresh = !this.refresh;
        }, 30);
    }
    aboutToAppear() {
        this.model.setInitHeaderHeight(200).setZHeaderIndex(99).setZMainIndex(-1);
        this.model.setHeaderHeight(200);
        this.refreshData.setBarColor(Color.Black).setCircleRadius(50).init();
        this.model.setRefreshHeaderCallback(() => this.dropMoveDraw());
        if (this.model.initRefreshing) {
            this.model.refreshHeaderCallback();
            this.model.initRefreshing = false;
        }
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
        if (this.model.refreshState == SmartRefresh.REFRESHSTATE.TOREFRESH) { //拖住过程中的样式
            If.branchId(0);
            Stack.create({ alignContent: Alignment.Center });
            Path.create();
            Path.width("100%");
            Path.height("100%");
            Path.strokeWidth(2);
            Path.stroke(this.model.backgroundColor);
            Path.commands(this.pathCmd);
            Path.fill(this.model.backgroundColor);
            Path.create();
            Path.commands(this.dragPathCmd);
            Path.width("100%");
            Path.height("100%");
            Path.strokeWidth(3);
            Path.fill(this.model.backgroundColor);
            Path.stroke(Color.White);
            Stack.pop();
        }
        else if (this.model.refreshState == SmartRefresh.REFRESHSTATE.REFRESHING) { //松开过后的刷新样式
            If.branchId(1);
            If.create();
            if (this.dragUpFlag) {
                If.branchId(0);
                Stack.create();
                Path.create();
                Path.width("100%");
                Path.height("100%");
                Path.strokeWidth(2);
                Path.stroke(this.model.backgroundColor);
                Path.commands(this.pathCmd);
                Path.fill(this.model.backgroundColor);
                Path.antiAlias(true);
                Path.create();
                Path.commands(this.dragPathCmd);
                Path.width("100%");
                Path.height("100%");
                Path.strokeWidth(3);
                Path.fill(this.model.backgroundColor);
                Path.stroke(Color.White);
                Stack.pop();
            }
            else {
                If.branchId(1);
                Stack.create();
                Path.create();
                Path.strokeWidth(1);
                Path.stroke(this.model.backgroundColor);
                Path.commands("M70 70 A 70 70 0 1 1 70 69.9");
                Path.width("100%");
                Path.height("100%");
                Path.fill(this.model.backgroundColor);
                Path.zIndex(10);
                Path.margin({ left: px2vp(this.screenWidth), top: this.screenHeight / 5 });
                Path.create();
                Path.strokeWidth(this.refreshData.barWidth);
                Path.stroke(Color.White);
                Path.commands(this.refreshData.svgPath);
                Path.fill(this.model.backgroundColor);
                Path.width("100%");
                Path.height("100%");
                Path.zIndex(20);
                Path.margin({ left: px2vp(this.screenWidth - 140) + 10, top: (this.screenHeight / 5 + 10) });
                Stack.pop();
            }
            If.pop();
        }
        If.pop();
        Flex.pop();
    }
    onDraw(): void {
        // 动态绘制
        if (this.refreshData.isSpinning) {
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
            this.refreshData.svgPath = "M" + (this.refreshData.startX) + " " + (this.refreshData.startY) + " "
                + "A " + this.refreshData.radius + " " + this.refreshData.radius
                + ", 0, " + this.refreshData.angleFlag + ", " + this.refreshData.directionFlag + ", "
                + (this.refreshData.endX) + " " + (this.refreshData.endY);
            this.refreshData.mProgress = "Progress:";
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
}
namespace ComWheel {
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
export default ComWheel;
