interface SwipeLayoutLayDownFull_Params {
    parentIsTouch?: boolean;
    mDuration?;
    sX?: number;
    sY?: number;
    mWidth?;
    mHeight?;
    bottomViewRightW?: number;
    bottomViewLeftW?: number;
    bottomViewTopH?: number;
    bottomViewBottomH?: number;
    offsetX?: number;
    offsetY?: number;
    rightSlideEnable?;
    leftSlideEnable?;
    previousX?;
    topState?: ESObject;
    enableSlide?: boolean[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SwipeLayoutLayDownFull_" + ++__generate__Id;
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
//import {SwipeLayout} from '../common/SwipeLayout.ets'
import prompt from '@system.prompt';
import { SwipeLayoutPullOut } from '../ets/SwipeLayoutPullOut';
export class SwipeLayoutLayDownFull extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__parentIsTouch = new SynchedPropertySimpleTwoWay(params.parentIsTouch, this, "parentIsTouch");
        this.mDuration = 200;
        this.sX = 0;
        this.sY = 0;
        this.mWidth = '100%';
        this.mHeight = 90;
        this.bottomViewRightW = 320;
        this.bottomViewLeftW = 120;
        this.bottomViewTopH = 100;
        this.bottomViewBottomH = 100;
        this.__offsetX = new ObservedPropertySimple(0, this, "offsetX");
        this.__offsetY = new ObservedPropertySimple(0, this, "offsetY");
        this.rightSlideEnable = true;
        this.leftSlideEnable = true;
        this.previousX = 0;
        this.topState = undefined;
        this.enableSlide = new Array(false, true, true, false);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SwipeLayoutLayDownFull_Params) {
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
        if (params.enableSlide !== undefined) {
            this.enableSlide = params.enableSlide;
        }
    }
    aboutToBeDeleted() {
        this.__parentIsTouch.aboutToBeDeleted();
        this.__offsetX.aboutToBeDeleted();
        this.__offsetY.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __parentIsTouch: SynchedPropertySimpleTwoWay<boolean>;
    get parentIsTouch() {
        return this.__parentIsTouch.get();
    }
    set parentIsTouch(newValue: boolean) {
        this.__parentIsTouch.set(newValue);
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
    private enableSlide: boolean[];
    render() {
        Column.create();
        Column.width(this.mWidth);
        Column.height(this.mHeight);
        Column.position({ x: px2vp(this.offsetX), y: this.offsetY });
        Column.create();
        Column.position({ x: 0, y: -this.bottomViewTopH });
        Column.onTouch((event: TouchEvent) => {
            if (event.type === TouchType.Down) {
                this.parentIsTouch = false;
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
                this.parentIsTouch = true;
            }
        });
        Image.create($r('app.media.star'));
        Image.backgroundColor('#b9ee4d');
        Image.padding(12);
        Image.objectFit(ImageFit.Contain);
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
        Column.onTouch((event: TouchEvent) => {
            if (event.type === TouchType.Down) {
                this.parentIsTouch = false;
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
                            if (!this.enableSlide[2]) {
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
                            if (!this.enableSlide[0]) {
                                return;
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
                            if (!this.enableSlide[1]) {
                                return;
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
                            if (!this.enableSlide[3]) {
                                return;
                            }
                            //当前移动距离小于左侧View的宽度  并且没有处于刚好拉出的状态
                            if (Math.abs(this.offsetY) < this.bottomViewBottomH) {
                                this.offsetY = moveY;
                            }
                            else {
                                this.offsetY = -this.bottomViewBottomH;
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
                this.parentIsTouch = true;
            }
        });
        Text.create('None is of freedom or of life deserving unless he daily conquers it anew. ');
        Text.fontSize('20');
        Text.width('100%');
        Text.height(this.mHeight);
        Text.fontColor('#000000');
        Text.padding(5);
        Text.maxLines(1);
        Text.onClick(() => {
            prompt.showToast({
                message: "Click on surface",
                duration: 1500
            });
        });
        Text.backgroundColor('#ffffff');
        Text.pop();
        Column.pop();
        Column.create();
        Column.onTouch((event: TouchEvent) => {
            if (event.type === TouchType.Down) {
                this.parentIsTouch = false;
                this.sX = event.touches[0].screenX;
                this.sY = event.touches[0].screenY;
            }
            if (event.type === TouchType.Move) {
                let moveX = event.touches[0].screenX - this.sX;
                let moveY = event.touches[0].screenY - this.sY;
                if (Math.abs(moveX) > Math.abs(moveY)) { // 横向滑动
                    if (this.offsetY == 0) {
                        if (moveX < 0 && moveY < 30 && moveY > -30) { //左滑
                            this.parentIsTouch = true;
                        }
                        else if (moveX > 0 && moveY < 30 && moveY > -30) { //右滑
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
                        }
                    }
                }
                this.previousX = event.touches[0].screenX;
            }
            if (event.type === TouchType.Up) {
                let moveX = event.touches[0].screenX - this.sX;
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
                });
                this.parentIsTouch = true;
            }
        });
        Row.create();
        Row.height(this.mHeight);
        Row.width(px2vp(this.bottomViewRightW));
        Image.create($r('app.media.star'));
        Image.backgroundColor('#b1b2aa');
        Image.width('100%');
        Image.height('100%');
        Image.padding(8);
        Image.objectFit(ImageFit.Contain);
        Image.onClick(() => {
            prompt.showToast({
                message: "Magnifier",
                duration: 1500,
            });
        });
        Row.pop();
        Column.pop();
        Row.pop();
        Column.pop();
    }
}
