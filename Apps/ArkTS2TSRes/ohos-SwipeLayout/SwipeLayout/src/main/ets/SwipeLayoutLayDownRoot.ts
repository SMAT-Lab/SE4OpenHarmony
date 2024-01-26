interface SwipeLayoutLayDownRoot_Params {
    isTouch?: boolean;
    mDuration?;
    sX?: number;
    sY?: number;
    mWidth?;
    mHeight?;
    bottomViewRightW?: number;
    bottomViewLeftW?: number;
    bottomViewTopH?: number;
    bottomViewBottomH?: number;
    bottomImageBottomH?: number;
    offsetX?: number;
    offsetY?: number;
    rightSlideEnable?;
    leftSlideEnable?;
    previousX?;
    topState?: ESObject;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SwipeLayoutLayDownRoot_" + ++__generate__Id;
}
/**
 *  MIT License
 *
 *  Copyright (c) 2023 Huawei Device Co., Ltd.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */
import prompt from '@system.prompt';
import { SwipeLayoutPullOut } from '../ets/SwipeLayoutPullOut';
import { SwipeLayoutLayDown } from '../ets/SwipeLayoutLayDown';
import { SwipeLayoutLayDownFull } from '../ets/SwipeLayoutLayDownFull';
export class SwipeLayoutLayDownRoot extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isTouch = new ObservedPropertySimple(true, this, "isTouch");
        this.mDuration = 200;
        this.sX = 0;
        this.sY = 0;
        this.mWidth = '100%';
        this.mHeight = 90;
        this.bottomViewRightW = 120;
        this.bottomViewLeftW = 120;
        this.bottomViewTopH = 120;
        this.bottomViewBottomH = 720;
        this.bottomImageBottomH = 120;
        this.__offsetX = new ObservedPropertySimple(0, this, "offsetX");
        this.__offsetY = new ObservedPropertySimple(0, this, "offsetY");
        this.rightSlideEnable = true;
        this.leftSlideEnable = true;
        this.previousX = 0;
        this.topState = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SwipeLayoutLayDownRoot_Params) {
        if (params.isTouch !== undefined) {
            this.isTouch = params.isTouch;
        }
        if (params.mDuration !== undefined) {
            this.mDuration = params.mDuration;
        }
        if (params.sX !== undefined) {
            this.sX = params.sX;
        }
        if (params.sY !== undefined) {
            this.sY = params.sY;
        }
        if (params.mWidth !== undefined) {
            this.mWidth = params.mWidth;
        }
        if (params.mHeight !== undefined) {
            this.mHeight = params.mHeight;
        }
        if (params.bottomViewRightW !== undefined) {
            this.bottomViewRightW = params.bottomViewRightW;
        }
        if (params.bottomViewLeftW !== undefined) {
            this.bottomViewLeftW = params.bottomViewLeftW;
        }
        if (params.bottomViewTopH !== undefined) {
            this.bottomViewTopH = params.bottomViewTopH;
        }
        if (params.bottomViewBottomH !== undefined) {
            this.bottomViewBottomH = params.bottomViewBottomH;
        }
        if (params.bottomImageBottomH !== undefined) {
            this.bottomImageBottomH = params.bottomImageBottomH;
        }
        if (params.offsetX !== undefined) {
            this.offsetX = params.offsetX;
        }
        if (params.offsetY !== undefined) {
            this.offsetY = params.offsetY;
        }
        if (params.rightSlideEnable !== undefined) {
            this.rightSlideEnable = params.rightSlideEnable;
        }
        if (params.leftSlideEnable !== undefined) {
            this.leftSlideEnable = params.leftSlideEnable;
        }
        if (params.previousX !== undefined) {
            this.previousX = params.previousX;
        }
        if (params.topState !== undefined) {
            this.topState = params.topState;
        }
    }
    aboutToBeDeleted() {
        this.__isTouch.aboutToBeDeleted();
        this.__offsetX.aboutToBeDeleted();
        this.__offsetY.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isTouch: ObservedPropertySimple<boolean>;
    get isTouch() {
        return this.__isTouch.get();
    }
    set isTouch(newValue: boolean) {
        this.__isTouch.set(newValue);
    }
    private mDuration;
    private sX: number;
    private sY: number;
    private mWidth;
    private mHeight;
    private bottomViewRightW: number;
    private bottomViewLeftW: number;
    private bottomViewTopH: number;
    private bottomViewBottomH: number;
    private bottomImageBottomH: number;
    private __offsetX: ObservedPropertySimple<number>;
    get offsetX() {
        return this.__offsetX.get();
    }
    set offsetX(newValue: number) {
        this.__offsetX.set(newValue);
    }
    private __offsetY: ObservedPropertySimple<number>;
    get offsetY() {
        return this.__offsetY.get();
    }
    set offsetY(newValue: number) {
        this.__offsetY.set(newValue);
    }
    private rightSlideEnable;
    private leftSlideEnable;
    private previousX;
    private topState: any;
    render() {
        Column.create();
        Column.width(this.mWidth);
        Column.height(this.mHeight);
        Column.position({ x: this.offsetX, y: this.offsetY });
        Column.create();
        Column.position({ x: 0, y: -this.bottomViewTopH });
        Column.onTouch((event: TouchEvent) => {
            if (event.type === TouchType.Down) {
                this.sX = event.touches[0].screenX;
                this.sY = event.touches[0].screenY;
            }
            if (event.type === TouchType.Move) {
                let moveX = event.touches[0].screenX - this.sX;
                let moveY = event.touches[0].screenY - this.sY;
                if (Math.abs(moveX) < Math.abs(moveY)) { //纵向滑动
                    if (moveY < 0) { //上滑
                        //顶侧菜单开始关闭
                        if (this.offsetY > 0) {
                            if (this.mHeight - Math.abs(moveY) >= 0) {
                                this.offsetY = this.bottomViewTopH + moveY;
                                return;
                            }
                        }
                    }
                }
            }
            if (event.type === TouchType.Up) {
                let moveY = event.touches[0].screenY - this.sY;
                if (moveY >= 0) {
                    return;
                }
                Context.animateTo({
                    duration: this.mDuration,
                    tempo: 1,
                    curve: Curve.FastOutLinearIn,
                    iterations: 1,
                    playMode: PlayMode.Normal, // 动画模式
                }, () => {
                    if (this.offsetY > 0) {
                        if (Math.abs(moveY) >= 20) {
                            this.offsetY = 0;
                        }
                        else {
                            this.offsetY = this.bottomViewTopH;
                        }
                    }
                });
            }
        });
        Image.create($r("app.media.take_photo"));
        Image.padding(12);
        Image.objectFit(ImageFit.Contain);
        Image.interpolation(ImageInterpolation.Medium);
        Image.backgroundColor('#ffffff');
        Image.onClick(() => {
            prompt.showToast({
                message: "click search",
                duration: 1500,
            });
        });
        Image.height(this.bottomViewTopH);
        Image.width('100%');
        Column.pop();
        Row.create();
        Column.create();
        Column.position({ x: -this.bottomViewLeftW, y: 0 });
        Image.create($r("app.media.take_photo"));
        Image.backgroundColor('#ffffff');
        Image.padding(12);
        Image.objectFit(ImageFit.Contain);
        Image.interpolation(ImageInterpolation.Medium);
        Image.onClick(() => {
            prompt.showToast({
                message: "click search",
                duration: 1500,
            });
        });
        Image.height(this.mHeight);
        Image.width(this.bottomViewLeftW);
        Column.pop();
        Column.create();
        Column.height('100%');
        Column.width('100%');
        Column.backgroundColor('#ffffff');
        Column.onTouch((event: TouchEvent) => {
            if (!this.isTouch) {
                return;
            }
            if (event.type === TouchType.Down) {
                this.sX = event.touches[0].screenX;
                this.sY = event.touches[0].screenY;
            }
            if (event.type === TouchType.Move) {
                let moveX = event.touches[0].screenX - this.sX;
                let moveY = event.touches[0].screenY - this.sY;
                if (Math.abs(moveX) > Math.abs(moveY)) { // 横向滑动
                    if (this.offsetY == 0) {
                        if (moveX < 0 && moveY < 30 && moveY > -30) { //左滑
                            //左侧菜单处于打开状态，开始关闭
                            if (this.offsetX > 0) {
                                this.rightSlideEnable = false;
                                if (-moveX < this.bottomViewLeftW) {
                                    this.offsetX = moveX + this.bottomViewLeftW;
                                }
                                else {
                                    this.offsetX = 0;
                                }
                                return;
                            }
                            //当前移动距离小于右侧View的宽度，并且没有处于刚好拉出的状态
                            if (this.rightSlideEnable) {
                                if (this.offsetX <= 0 && this.offsetX > -this.bottomViewRightW && -moveX <= this.bottomViewRightW) {
                                    this.offsetX = moveX;
                                }
                                else if (-moveX > this.bottomViewRightW) {
                                    this.offsetX = -this.bottomViewRightW;
                                    this.sX = event.touches[0].screenX;
                                    this.leftSlideEnable = false;
                                }
                            }
                        }
                        else if (moveX > 0 && moveY < 30 && moveY > -30) { //右滑
                            //右侧菜单开始关闭
                            if (this.offsetX < 0) {
                                this.leftSlideEnable = false;
                                if (moveX <= this.bottomViewRightW) {
                                    this.offsetX = moveX - this.bottomViewRightW;
                                    return;
                                }
                                else {
                                    this.offsetX = 0;
                                }
                            }
                            //当前移动距离小于左侧View的宽度  并且没有处于刚好拉出的状态
                            if (this.leftSlideEnable) {
                                if (this.offsetX >= 0 && this.offsetX < this.bottomViewLeftW && moveX <= this.bottomViewLeftW) {
                                    this.offsetX = moveX;
                                }
                                else if (moveX > this.bottomViewRightW) {
                                    this.offsetX = this.bottomViewLeftW;
                                    this.sX = event.touches[0].screenX;
                                    this.rightSlideEnable = false;
                                }
                            }
                        }
                    }
                }
                else { //纵向滑动
                    if (this.offsetX == 0) {
                        if (moveY > 0) { //下滑
                            //底部菜单开始关闭
                            if (this.offsetY < 0) {
                                if (moveY - this.bottomViewBottomH <= 0) {
                                    this.offsetY = moveY - this.bottomViewBottomH;
                                    return;
                                }
                            }
                            //当前移动距离小于右侧View的宽度，并且没有处于刚好拉出的状态
                            if (this.offsetY < this.bottomViewTopH) {
                                this.offsetY = moveY;
                            }
                            else {
                                this.offsetY = this.bottomViewTopH;
                            }
                        }
                        else if (moveY < 0) { //上滑
                            //顶侧菜单开始关闭
                            if (this.offsetY > 0) {
                                if (this.bottomViewTopH - Math.abs(moveY) >= 0) {
                                    this.offsetY = this.bottomViewTopH + moveY;
                                    return;
                                }
                            }
                            if (this.offsetY <= 0) {
                                if (Math.abs(this.offsetY) < this.bottomViewBottomH) {
                                    this.offsetY = moveY;
                                }
                                else {
                                    this.offsetY = -this.bottomViewBottomH;
                                }
                            }
                        }
                    }
                }
                this.previousX = event.touches[0].screenX;
            }
            if (event.type === TouchType.Up) {
                let moveX = event.touches[0].screenX - this.sX;
                let moveY = event.touches[0].screenY - this.sY;
                Context.animateTo({
                    duration: this.mDuration,
                    tempo: 1,
                    curve: Curve.FastOutLinearIn,
                    iterations: 1,
                    playMode: PlayMode.Normal,
                    onFinish: () => {
                        this.rightSlideEnable = true;
                        this.leftSlideEnable = true;
                    }
                }, () => {
                    if (this.offsetX > 0 && this.leftSlideEnable) {
                        if (moveX >= 40) {
                            this.offsetX = this.bottomViewLeftW;
                        }
                        else if (moveX > 0) {
                            this.offsetX = 0;
                        }
                        if (moveX < -40) {
                            this.offsetX = 0;
                        }
                        else if (moveX < 0) {
                            this.offsetX = this.bottomViewLeftW;
                        }
                        return;
                    }
                    if (this.offsetX < 0 && this.rightSlideEnable) {
                        if (moveX >= 40) {
                            this.offsetX = 0;
                        }
                        else if (moveX > 0) {
                            this.offsetX = -this.bottomViewRightW;
                        }
                        if (moveX <= -40) {
                            this.offsetX = -this.bottomViewRightW;
                        }
                        else if (moveX < 0) {
                            this.offsetX = 0;
                        }
                        return;
                    }
                    if (this.offsetY > 0) {
                        if (moveY >= 20) {
                            this.offsetY = this.bottomViewTopH;
                        }
                        else {
                            this.offsetY = 0;
                        }
                        return;
                    }
                    if (this.offsetY < 0) {
                        if (moveY <= -20) {
                            this.offsetY = -this.bottomViewBottomH;
                        }
                        else {
                            this.offsetY = 0;
                        }
                        return;
                    }
                });
            }
        });
        ColumnSplit.create();
        ColumnSplit.backgroundColor('#e3ee5a');
        let earlierCreatedChild_2: SwipeLayoutLayDown = (this && this.findChildById) ? this.findChildById("2") as SwipeLayoutLayDown : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new SwipeLayoutLayDown("2", this, {
                bottomViewLeftW: this.bottomViewLeftW,
                bottomViewRightW: this.bottomViewRightW,
                mWidth: '100%',
                mHeight: 100,
                parentIsTouch: this.__isTouch
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                bottomViewLeftW: this.bottomViewLeftW,
                bottomViewRightW: this.bottomViewRightW,
                mWidth: '100%',
                mHeight: 100
            });
            View.create(earlierCreatedChild_2);
        }
        ColumnSplit.pop();
        ColumnSplit.create();
        ColumnSplit.backgroundColor('#f04f97');
        let earlierCreatedChild_3: SwipeLayoutPullOut = (this && this.findChildById) ? this.findChildById("3") as SwipeLayoutPullOut : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new SwipeLayoutPullOut("3", this, {
                bottomViewLeftW: this.bottomViewLeftW,
                bottomViewRightW: this.bottomViewRightW,
                mWidth: '100%',
                mHeight: 100,
                parentIsTouch: this.__isTouch
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                bottomViewLeftW: this.bottomViewLeftW,
                bottomViewRightW: this.bottomViewRightW,
                mWidth: '100%',
                mHeight: 100
            });
            View.create(earlierCreatedChild_3);
        }
        ColumnSplit.pop();
        ColumnSplit.create();
        ColumnSplit.backgroundColor('#e3ee5a');
        let earlierCreatedChild_4: SwipeLayoutLayDownFull = (this && this.findChildById) ? this.findChildById("4") as SwipeLayoutLayDownFull : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new SwipeLayoutLayDownFull("4", this, {
                bottomViewLeftW: this.bottomViewLeftW,
                bottomViewRightW: 720,
                mWidth: '100%',
                mHeight: 100,
                parentIsTouch: this.__isTouch
            }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                bottomViewLeftW: this.bottomViewLeftW,
                bottomViewRightW: 720,
                mWidth: '100%',
                mHeight: 100
            });
            View.create(earlierCreatedChild_4);
        }
        ColumnSplit.pop();
        Image.create($r("app.media.arrow_up"));
        Image.backgroundColor('#ffffff');
        Image.objectFit(ImageFit.Contain);
        Image.onClick(() => {
            prompt.showToast({
                message: "click search",
                duration: 1500,
            });
        });
        Image.height(90);
        Image.width(90);
        Image.margin({ top: 40 });
        Column.pop();
        Column.create();
        Image.create($r("app.media.take_photo"));
        Image.backgroundColor('#ffffff');
        Image.padding(12);
        Image.objectFit(ImageFit.Contain);
        Image.interpolation(ImageInterpolation.Medium);
        Image.onClick(() => {
            prompt.showToast({
                message: "click search",
                duration: 1500,
            });
        });
        Image.height(this.mHeight);
        Image.width(this.bottomViewRightW);
        Column.pop();
        Row.pop();
        Column.create();
        Column.onTouch((event: TouchEvent) => {
            if (event.type === TouchType.Down) {
                this.sX = event.touches[0].screenX;
                this.sY = event.touches[0].screenY;
            }
            if (event.type === TouchType.Move) {
                let moveX = event.touches[0].screenX - this.sX;
                let moveY = event.touches[0].screenY - this.sY;
                if (Math.abs(moveX) < Math.abs(moveY)) { //纵向滑动
                    if (moveY > 0) { //下滑
                        //底部菜单开始关闭
                        if (this.offsetY < 0) {
                            if (this.mHeight - Math.abs(moveY) >= 0) {
                                this.offsetY = -(this.bottomViewBottomH - moveY);
                            }
                        }
                    }
                }
            }
            if (event.type === TouchType.Up) {
                let moveY = event.touches[0].screenY - this.sY;
                if (moveY <= 0) {
                    return;
                }
                Context.animateTo({
                    duration: this.mDuration,
                    tempo: 1,
                    curve: Curve.FastOutLinearIn,
                    iterations: 1,
                    playMode: PlayMode.Normal, // 动画模式
                }, () => {
                    if (this.offsetY < 0) {
                        if (Math.abs(moveY) >= 20) {
                            this.offsetY = 0;
                        }
                        else {
                            this.offsetY = -this.bottomViewBottomH;
                        }
                    }
                });
            }
        });
        Image.create($r("app.media.take_photo"));
        Image.backgroundColor('#ffffff');
        Image.padding(12);
        Image.objectFit(ImageFit.Contain);
        Image.interpolation(ImageInterpolation.Medium);
        Image.onClick(() => {
            prompt.showToast({
                message: "click search",
                duration: 1500,
            });
        });
        Image.height(this.bottomImageBottomH);
        Image.width('100%');
        Column.pop();
        Column.pop();
    }
}
