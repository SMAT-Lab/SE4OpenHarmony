interface HitBlockGameBody_Params {
    model?: SmartRefreshForGame.Model;
    blockHorizontalNum?: number;
    blockVerticalNum?: number;
    BLOCK_WIDTH_RATIO?: number;
    RACKET_POSITION_RATIO?: number;
    BLOCK_POSITION_RATIO?: number;
    DIVIDING_LINE_SIZE?: number;
    DEFAULT_ANGLE?: number;
    mCircle?: number;
    blockLeft?: number;
    cx?: number;
    cy?: number;
    pointList?: Array<TouchBlock>;
    isLeft?: boolean;
    angle?: number;
    speed?: number;
    rectList?: Array<RectParam>;
    controllerSize?: number;
    mOffsetY?: number;
    isGameOver?: boolean;
    offsetXY?: number;
    blockBorderWidth?: number;
    mScreenWidth?: number;
    blockHeight?: number;
    blockWidth?: number;
    tipText?: string;
    slideOffset?: number;
    mScreenHeight?: number;
    initBackgroundColor?: Color | string | number;
    downY?: number;
    isNotifyFinish?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "HitBlockGameBody_" + ++__generate__Id;
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
import SmartRefreshForGame from './SmartRefreshForGame';
class RectParam {
    index: number = 0;
    x: number = 0;
    y: number = 0;
}
class TouchBlock {
    x: number = 0;
    y: number = 0;
}
export class HitBlockGameBody extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new SmartRefreshForGame.Model(), this, "model");
        this.blockHorizontalNum = this.model.blockHorizontalNum;
        this.blockVerticalNum = 5;
        this.BLOCK_WIDTH_RATIO = 0.01806;
        this.RACKET_POSITION_RATIO = 0.8;
        this.BLOCK_POSITION_RATIO = 0.08;
        this.DIVIDING_LINE_SIZE = 1;
        this.DEFAULT_ANGLE = 30;
        this.mCircle = 7;
        this.blockLeft = 0;
        this.__cx = new ObservedPropertySimple(0, this, "cx");
        this.__cy = new ObservedPropertySimple(0, this, "cy");
        this.pointList = [];
        this.isLeft = true;
        this.angle = 30;
        this.speed = this.model.ballSpeed;
        this.__rectList = new ObservedPropertyObject([] // 绘制的砖块
        , this, "rectList");
        this.controllerSize = 40 //挡板长度
        ;
        this.mOffsetY = 55 // 挡板上下移动的位置
        ;
        this.isGameOver = false // 游戏时是否结束
        ;
        this.offsetXY = 1;
        this.blockBorderWidth = 1;
        this.mScreenWidth = px2vp(lpx2px(720));
        this.blockHeight = 0;
        this.blockWidth = 0;
        this.__tipText = new ObservedPropertySimple(this.model.textLoading, this, "tipText");
        this.__slideOffset = new ObservedPropertySimple(0, this, "slideOffset");
        this.mScreenHeight = 0;
        this.initBackgroundColor = '';
        this.__downY = new SynchedPropertySimpleOneWay(params.downY, this, "downY");
        this.__isNotifyFinish = new SynchedPropertySimpleOneWay(params.isNotifyFinish, this, "isNotifyFinish");
        this.updateWithValueParams(params);
        this.declareWatch("downY", this.onYStateChange);
        this.declareWatch("isNotifyFinish", this.onFinishChange);
    }
    updateWithValueParams(params: HitBlockGameBody_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.blockHorizontalNum !== undefined) {
            this.blockHorizontalNum = params.blockHorizontalNum;
        }
        if (params.blockVerticalNum !== undefined) {
            this.blockVerticalNum = params.blockVerticalNum;
        }
        if (params.BLOCK_WIDTH_RATIO !== undefined) {
            this.BLOCK_WIDTH_RATIO = params.BLOCK_WIDTH_RATIO;
        }
        if (params.RACKET_POSITION_RATIO !== undefined) {
            this.RACKET_POSITION_RATIO = params.RACKET_POSITION_RATIO;
        }
        if (params.BLOCK_POSITION_RATIO !== undefined) {
            this.BLOCK_POSITION_RATIO = params.BLOCK_POSITION_RATIO;
        }
        if (params.DIVIDING_LINE_SIZE !== undefined) {
            this.DIVIDING_LINE_SIZE = params.DIVIDING_LINE_SIZE;
        }
        if (params.DEFAULT_ANGLE !== undefined) {
            this.DEFAULT_ANGLE = params.DEFAULT_ANGLE;
        }
        if (params.mCircle !== undefined) {
            this.mCircle = params.mCircle;
        }
        if (params.blockLeft !== undefined) {
            this.blockLeft = params.blockLeft;
        }
        if (params.cx !== undefined) {
            this.cx = params.cx;
        }
        if (params.cy !== undefined) {
            this.cy = params.cy;
        }
        if (params.pointList !== undefined) {
            this.pointList = params.pointList;
        }
        if (params.isLeft !== undefined) {
            this.isLeft = params.isLeft;
        }
        if (params.angle !== undefined) {
            this.angle = params.angle;
        }
        if (params.speed !== undefined) {
            this.speed = params.speed;
        }
        if (params.rectList !== undefined) {
            this.rectList = params.rectList;
        }
        if (params.controllerSize !== undefined) {
            this.controllerSize = params.controllerSize;
        }
        if (params.mOffsetY !== undefined) {
            this.mOffsetY = params.mOffsetY;
        }
        if (params.isGameOver !== undefined) {
            this.isGameOver = params.isGameOver;
        }
        if (params.offsetXY !== undefined) {
            this.offsetXY = params.offsetXY;
        }
        if (params.blockBorderWidth !== undefined) {
            this.blockBorderWidth = params.blockBorderWidth;
        }
        if (params.mScreenWidth !== undefined) {
            this.mScreenWidth = params.mScreenWidth;
        }
        if (params.blockHeight !== undefined) {
            this.blockHeight = params.blockHeight;
        }
        if (params.blockWidth !== undefined) {
            this.blockWidth = params.blockWidth;
        }
        if (params.tipText !== undefined) {
            this.tipText = params.tipText;
        }
        if (params.slideOffset !== undefined) {
            this.slideOffset = params.slideOffset;
        }
        if (params.mScreenHeight !== undefined) {
            this.mScreenHeight = params.mScreenHeight;
        }
        if (params.initBackgroundColor !== undefined) {
            this.initBackgroundColor = params.initBackgroundColor;
        }
        this.downY = params.downY;
        this.isNotifyFinish = params.isNotifyFinish;
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__cx.aboutToBeDeleted();
        this.__cy.aboutToBeDeleted();
        this.__rectList.aboutToBeDeleted();
        this.__tipText.aboutToBeDeleted();
        this.__slideOffset.aboutToBeDeleted();
        this.__downY.aboutToBeDeleted();
        this.__isNotifyFinish.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<SmartRefreshForGame.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SmartRefreshForGame.Model) {
        this.__model.set(newValue);
    }
    protected blockHorizontalNum: number;
    protected blockVerticalNum: number;
    protected BLOCK_WIDTH_RATIO: number;
    protected RACKET_POSITION_RATIO: number;
    protected BLOCK_POSITION_RATIO: number;
    protected DIVIDING_LINE_SIZE: number;
    protected DEFAULT_ANGLE: number;
    private mCircle: number;
    protected blockLeft: number;
    private __cx: ObservedPropertySimple<number>;
    get cx() {
        return this.__cx.get();
    }
    set cx(newValue: number) {
        this.__cx.set(newValue);
    }
    private __cy: ObservedPropertySimple<number>;
    get cy() {
        return this.__cy.get();
    }
    set cy(newValue: number) {
        this.__cy.set(newValue);
    }
    protected pointList: Array<TouchBlock>;
    protected isLeft: boolean;
    protected angle: number;
    protected speed: number; // 球球移动速度
    private __rectList: ObservedPropertyObject<Array<RectParam>>; // 绘制的砖块
    get rectList() {
        return this.__rectList.get();
    }
    set rectList(newValue: Array<RectParam>) {
        this.__rectList.set(newValue);
    }
    private controllerSize: number; //挡板长度
    private mOffsetY: number; // 挡板上下移动的位置
    private isGameOver: boolean; // 游戏时是否结束
    private offsetXY: number;
    private blockBorderWidth: number;
    private mScreenWidth: number;
    protected blockHeight: number;
    protected blockWidth: number;
    private __tipText: ObservedPropertySimple<string>;
    get tipText() {
        return this.__tipText.get();
    }
    set tipText(newValue: string) {
        this.__tipText.set(newValue);
    }
    private __slideOffset: ObservedPropertySimple<number>;
    get slideOffset() {
        return this.__slideOffset.get();
    }
    set slideOffset(newValue: number) {
        this.__slideOffset.set(newValue);
    }
    private mScreenHeight: number;
    private initBackgroundColor: Color | string | number;
    private __downY: SynchedPropertySimpleOneWay<number>;
    get downY() {
        return this.__downY.get();
    }
    set downY(newValue: number) {
        this.__downY.set(newValue);
    }
    private __isNotifyFinish: SynchedPropertySimpleOneWay<boolean>;
    get isNotifyFinish() {
        return this.__isNotifyFinish.get();
    }
    set isNotifyFinish(newValue: boolean) {
        this.__isNotifyFinish.set(newValue);
    }
    private onFinishChange() {
        if (this.isNotifyFinish) {
            this.tipText = this.model.isFinishSuccess ? this.model.textLoadingFinish : this.model.textLoadingFailed;
        }
    }
    private onYStateChange() {
        if (this.downY < 0) {
            this.slideOffset = 0;
        }
        else if (this.downY > (this.mScreenHeight - this.controllerSize)) {
            this.slideOffset = (this.mScreenHeight - this.controllerSize);
        }
        else {
            this.slideOffset = this.downY;
        }
    }
    aboutToAppear() {
        this.blockHeight = (this.mScreenHeight) / 5; //5为砖块最大行数
        this.blockLeft = this.mScreenWidth * this.BLOCK_POSITION_RATIO;
        this.blockWidth = this.mScreenWidth * this.BLOCK_WIDTH_RATIO;
        this.cx = this.mScreenWidth * this.RACKET_POSITION_RATIO - this.mCircle;
        this.cy = this.mScreenHeight / 2;
        this.slideOffset = 0; //初始化偏移量
        this.drawRect();
        setInterval(() => {
            if (!this.isGameOver) {
                this.drawCircle();
            }
        }, 10 - this.speed);
    }
    //检测小球与砖块碰撞
    protected checkTouchBlock(x: number, y: number): boolean {
        let columnX: number = Math.floor((x - Math.floor(this.blockLeft)) / this.blockWidth);
        columnX = columnX == this.blockHorizontalNum ? columnX - 1 : columnX;
        let rowY: number = Math.floor(y / this.blockHeight);
        rowY = rowY == this.blockVerticalNum ? rowY - 1 : rowY;
        let p: Array<TouchBlock> = [];
        p.push({ x: columnX, y: rowY });
        let flag: boolean = false;
        for (let index = 0; index < this.pointList.length; index++) {
            if (this.pointList[index].x == p[0].x && this.pointList[index].y == p[0].y) {
                flag = true;
                break;
            }
        }
        if (!flag) {
            this.pointList.push(p[0]);
            this.drawRect();
        }
        return !flag;
    }
    //检测小球与挡板碰撞
    protected checkTouchRacket(y: number) {
        let flag: boolean = false;
        let diffVal: number = y - this.slideOffset;
        if (diffVal >= 0 && diffVal <= this.controllerSize) { // 小球位于挡板Y值区域范围内
            flag = true;
        }
        return flag;
    }
    private drawRect() {
        let column: number;
        let row: number;
        let i: number = 0;
        this.rectList.splice(0, this.rectList.length);
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
            let temp: RectParam = {
                index: i,
                x: column,
                y: row
            };
            this.rectList.push(temp);
        }
        return;
    }
    private drawCircle() {
        if (this.cx <= this.blockLeft) { // 小球穿过色块区域后的左边界
            this.isLeft = false;
        }
        if (this.cx >= this.mScreenWidth * this.RACKET_POSITION_RATIO - this.mCircle && this.cx < this.mScreenWidth * this.RACKET_POSITION_RATIO + this.blockWidth) {
            if (this.checkTouchRacket(this.cy)) { // 小球与挡板接触
                if (this.pointList.length == this.blockHorizontalNum * this.blockVerticalNum) {
                    this.isGameOver = true; //游戏结束
                    this.tipText = this.model.textGameOver;
                }
                this.isLeft = true;
            }
        }
        if (this.cx <= this.blockLeft + this.blockHorizontalNum * this.blockWidth + (this.blockHorizontalNum - 1) * this.blockBorderWidth && this.cy > 0) { // 小球进入到色块区域  *1是DIVIDING_LINE_SIZE
            if (this.checkTouchBlock(this.cx, this.cy)) { // 反弹回来
                this.isLeft = false;
            }
        }
        else if (this.cx >= this.mScreenWidth) {
            this.isGameOver = true; //游戏结束
            this.tipText = this.model.textGameOver;
        }
        if (this.cy <= 0) { // 小球撞到上边界
            this.angle = 180 - this.DEFAULT_ANGLE;
        }
        else if (this.cy > this.mScreenHeight - this.mCircle) { // 小球撞到下边界
            this.angle = 180 + this.DEFAULT_ANGLE;
        }
        if (this.isLeft) {
            this.cx -= this.offsetXY;
        }
        else {
            this.cx += this.offsetXY;
        }
        this.cy -= Math.tan(Math.PI * this.angle / 180) * this.offsetXY;
        return;
    }
    //砖块，球和挡板颜色设置
    private drawColor(color: number, alpha: number = 255) {
        let colorStr = ("00000" + (color & 0xffffff).toString(16)).substr(-6);
        let alphaStr = ("0" + (alpha & 0xff).toString(16)).substr(-2);
        return "#" + alphaStr + colorStr;
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Start, justifyContent: FlexAlign.Start });
        Flex.width('100%');
        Flex.height(this.mScreenHeight);
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.width('100%');
        Stack.height(this.mScreenHeight);
        Stack.backgroundColor(this.initBackgroundColor);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.rectList), (item: RectParam) => {
            Path.create();
            Path.commands("M0 0 L" + fp2px(this.blockWidth) + " 0 L" + fp2px(this.blockWidth) + " " + fp2px(this.mScreenHeight / 5) + " L0 " + fp2px(this.mScreenHeight / 5) + "z");
            Path.fill(this.drawColor(this.initBackgroundColor == '#ffffff' ? 0x000000 : 0xffffff, 255 - (255 / this.blockHorizontalNum) * item.x));
            Path.strokeWidth(this.blockBorderWidth);
            Path.translate({
                x: item.x * this.blockWidth + this.blockLeft,
                y: item.y * (this.mScreenHeight - 1) / this.blockVerticalNum,
                z: 0
            });
        }, (item: RectParam) => item.index.toString());
        ForEach.pop();
        Circle.create({ width: this.mCircle, height: this.mCircle });
        Circle.fill(this.drawColor(this.initBackgroundColor == '#ffffff' ? 0x000000 : 0xffffff, 230));
        Circle.translate({
            x: this.cx,
            y: this.cy
        });
        Path.create();
        Path.commands("M0 0 L" + fp2px(this.blockWidth) + " 0 L" + fp2px(this.blockWidth) + " " + fp2px(this.controllerSize) + " L0 " + fp2px(this.controllerSize) + "z");
        Path.fill(this.drawColor(this.initBackgroundColor == '#ffffff' ? 0x000000 : 0xffffff, 230));
        Path.translate({
            x: this.mScreenWidth * this.RACKET_POSITION_RATIO,
            y: this.slideOffset
        });
        Text.create(this.tipText);
        Text.width('100%');
        Text.height('100%');
        Text.textAlign(TextAlign.Center);
        Text.fontSize(30);
        Text.fontColor(this.initBackgroundColor == '#ffffff' ? '#000000' : '#ffffff');
        Text.pop();
        Stack.pop();
        Flex.pop();
    }
}
