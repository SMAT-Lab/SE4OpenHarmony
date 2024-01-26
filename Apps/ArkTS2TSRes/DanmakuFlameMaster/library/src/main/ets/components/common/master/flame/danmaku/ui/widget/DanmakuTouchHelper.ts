let __generate__Id: number = 0;
function generateId(): string {
    return "DanmakuTouchHelper_" + ++__generate__Id;
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
import { IDanmakuView, OnDanmakuClickListener } from '../../controller/IDanmakuView';
import { IDanmakus, DefaultConsumer, Consumer } from '../../danmaku/model/IDanmakus';
import { Danmakus } from '../../danmaku/model/ohos/Danmakus';
import { BaseDanmaku } from '../../danmaku/model/BaseDanmaku';
import SystemClock from '../../danmaku/util/SystemClock';
import { RectF } from '../../../../../compat/RectF';
export class DanmakuTouchHelper {
    private mTouchDelegate: GestureDetector;
    private danmakuView: IDanmakuView | any = null;
    private mDanmakuBounds: RectF;
    private mXOff: number = 0;
    private mYOff: number = 0;
    public getDanmakuView(): IDanmakuView | null {
        return this.danmakuView;
    }
    public setmXOff(mXOff: number): void {
        this.mXOff = mXOff;
    }
    public setmYOff(mYOff: number): void {
        this.mYOff = mYOff;
    }
    private constructor(danmakuView: IDanmakuView) {
        this.danmakuView = danmakuView;
        this.mDanmakuBounds = new RectF();
        this.mTouchDelegate = new GestureDetector(this);
    }
    public static instance(danmakuView: IDanmakuView): DanmakuTouchHelper {
        return new DanmakuTouchHelper(danmakuView);
    }
    public onTouchEvent(event: TouchEvent): boolean {
        return this.mTouchDelegate.onTouchEvent(event);
    }
    public performDanmakuClick(danmakus: IDanmakus, isLongClick: boolean): boolean {
        let onDanmakuClickListener: OnDanmakuClickListener = this.danmakuView.getOnDanmakuClickListener();
        if (onDanmakuClickListener != null) {
            if (isLongClick) {
                return onDanmakuClickListener.onDanmakuLongClick(danmakus);
            }
            else {
                return onDanmakuClickListener.onDanmakuClick(danmakus);
            }
        }
        return false;
    }
    public performViewClick(): boolean {
        let onDanmakuClickListener: OnDanmakuClickListener = this.danmakuView.getOnDanmakuClickListener();
        if (onDanmakuClickListener != null) {
            return onDanmakuClickListener.onViewClick(this.danmakuView);
        }
        return false;
    }
    public touchHitDanmaku(x: number, y: number): IDanmakus {
        let hitDanmakus: IDanmakus = new Danmakus({});
        this.mDanmakuBounds.setEmpty();
        let that = this;
        let danmakus: IDanmakus = this.danmakuView.getCurrentVisibleDanmakus();
        if (null != danmakus && !danmakus.isEmpty()) {
            class danMuKu extends DefaultConsumer<BaseDanmaku> {
                public accept(danmaku: BaseDanmaku): number {
                    if (null != danmaku) {
                        that.mDanmakuBounds.set(danmaku.getLeft(), danmaku.getTop(), danmaku.getRight(), danmaku.getBottom());
                        if (that.mDanmakuBounds.intersect(x - that.mXOff, y - that.mYOff, x + that.mXOff, y + that.mYOff)) {
                            hitDanmakus.addItem(danmaku);
                        }
                    }
                    return Consumer.ACTION_CONTINUE;
                }
                before() {
                }
                after() {
                }
                result() {
                }
            }
            let danMUKuMessage: danMuKu | any;
            danmakus.forEachSync(danMUKuMessage);
        }
        return hitDanmakus;
    }
}
interface SimpleOnGestureListener {
    onDown(event: TouchEvent): boolean;
    onSingleTapConfirmed(event: TouchEvent): boolean;
    onLongPress(event: TouchEvent): boolean;
}
class GestureDetector implements SimpleOnGestureListener {
    private TIME_LONG_PRESS: number = 600;
    private startTime: number = 0;
    private endTime: number = 0;
    private danmakuTouchHelper: DanmakuTouchHelper | any = null;
    constructor(danmakuTouchHelper: DanmakuTouchHelper) {
        this.danmakuTouchHelper = danmakuTouchHelper;
    }
    onTouchEvent(event: TouchEvent): boolean {
        if (event.type == TouchType.Down) {
            this.startTime = SystemClock.uptimeMillis();
            this.onDown(event);
        }
        if (event.type == TouchType.Up) {
            this.endTime = SystemClock.uptimeMillis();
            let pressTime = this.endTime - this.startTime;
            if (pressTime < this.TIME_LONG_PRESS) {
                this.onSingleTapConfirmed(event);
            }
            else {
                this.onLongPress(event);
            }
        }
        return false;
    }
    onDown(event: TouchEvent): boolean {
        if (this.danmakuTouchHelper.getDanmakuView() != null) {
            let onDanmakuClickListener: OnDanmakuClickListener = this.danmakuTouchHelper.getDanmakuView()
                .getOnDanmakuClickListener();
            if (onDanmakuClickListener != null) {
                this.danmakuTouchHelper.setmXOff(this.danmakuTouchHelper.getDanmakuView().getXOff());
                this.danmakuTouchHelper.setmYOff(this.danmakuTouchHelper.getDanmakuView().getYOff());
                return true;
            }
        }
        return false;
    }
    onSingleTapConfirmed(event: TouchEvent): boolean {
        let clickDanmakus: IDanmakus = this.danmakuTouchHelper.touchHitDanmaku(lpx2px(event.touches[0].x), lpx2px(event.touches[0].y));
        let isEventConsumed: boolean = false;
        if (null != clickDanmakus && !clickDanmakus.isEmpty()) {
            isEventConsumed = this.danmakuTouchHelper.performDanmakuClick(clickDanmakus, false);
        }
        if (!isEventConsumed) {
            isEventConsumed = this.danmakuTouchHelper.performViewClick();
        }
        return isEventConsumed;
    }
    onLongPress(event: TouchEvent): boolean | any {
        let onDanmakuClickListener: OnDanmakuClickListener = this.danmakuTouchHelper.getDanmakuView()
            .getOnDanmakuClickListener();
        if (onDanmakuClickListener == null) {
            return;
        }
        this.danmakuTouchHelper.setmXOff(this.danmakuTouchHelper.getDanmakuView().getXOff());
        this.danmakuTouchHelper.setmYOff(this.danmakuTouchHelper.getDanmakuView().getYOff());
        let clickDanmakus: IDanmakus = this.danmakuTouchHelper.touchHitDanmaku(lpx2px(event.touches[0].x), lpx2px(event.touches[0].y));
        if (null != clickDanmakus && !clickDanmakus.isEmpty()) {
            this.danmakuTouchHelper.performDanmakuClick(clickDanmakus, true);
        }
    }
}
