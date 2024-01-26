interface BannerIndicator_Params {
    count?: number;
    model?: BannerModel;
    flingIndex?: number;
    indicatorOffset?: number;
    flingTimeoutId?: number;
    // fade效果相关
    fadeTimeoutId?: number;
    indicatorOpacity?: number;
    // autoPlay相关
    playIntervalId?: number;
    startX?: number;
    lastX?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BannerIndicator_" + ++__generate__Id;
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
import { BannerModel } from '../models/BannerModel';
const FLING_INTERVAL: number = 30;
const FLING_DURATION: number = 200;
class BannerIndicator extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__count = new SynchedPropertySimpleTwoWay(params.count, this, "count");
        this.__model = new ObservedPropertyObject(new BannerModel(null)
        // fling过程中，计算游标位移所用，与Swiper的index变化不一定完全同步
        , this, "model");
        this.__flingIndex = new SynchedPropertySimpleTwoWay(params.flingIndex, this, "flingIndex");
        this.__indicatorOffset = new ObservedPropertySimple(0, this, "indicatorOffset");
        this.flingTimeoutId = -1;
        this.fadeTimeoutId = -1;
        this.__indicatorOpacity = new ObservedPropertySimple(1
        // autoPlay相关
        , this, "indicatorOpacity");
        this.playIntervalId = -1;
        this.startX = 0;
        this.lastX = 0;
        this.updateWithValueParams(params);
        this.declareWatch("flingIndex", this.onIndexChange);
    }
    updateWithValueParams(params: BannerIndicator_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.indicatorOffset !== undefined) {
            this.indicatorOffset = params.indicatorOffset;
        }
        if (params.flingTimeoutId !== undefined) {
            this.flingTimeoutId = params.flingTimeoutId;
        }
        if (params.fadeTimeoutId !== undefined) {
            this.fadeTimeoutId = params.fadeTimeoutId;
        }
        if (params.indicatorOpacity !== undefined) {
            this.indicatorOpacity = params.indicatorOpacity;
        }
        if (params.playIntervalId !== undefined) {
            this.playIntervalId = params.playIntervalId;
        }
        if (params.startX !== undefined) {
            this.startX = params.startX;
        }
        if (params.lastX !== undefined) {
            this.lastX = params.lastX;
        }
    }
    aboutToBeDeleted() {
        this.__count.aboutToBeDeleted();
        this.__model.aboutToBeDeleted();
        this.__flingIndex.aboutToBeDeleted();
        this.__indicatorOffset.aboutToBeDeleted();
        this.__indicatorOpacity.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __count: SynchedPropertySimpleTwoWay<number>;
    get count() {
        return this.__count.get();
    }
    set count(newValue: number) {
        this.__count.set(newValue);
    }
    private __model: ObservedPropertyObject<BannerModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: BannerModel) {
        this.__model.set(newValue);
    }
    // fling过程中，计算游标位移所用，与Swiper的index变化不一定完全同步
    private __flingIndex: SynchedPropertySimpleTwoWay<number>;
    get flingIndex() {
        return this.__flingIndex.get();
    }
    set flingIndex(newValue: number) {
        this.__flingIndex.set(newValue);
    }
    private __indicatorOffset: ObservedPropertySimple<number>;
    get indicatorOffset() {
        return this.__indicatorOffset.get();
    }
    set indicatorOffset(newValue: number) {
        this.__indicatorOffset.set(newValue);
    }
    private flingTimeoutId: number;
    // fade效果相关
    private fadeTimeoutId: number;
    private __indicatorOpacity: ObservedPropertySimple<number>;
    get indicatorOpacity() {
        return this.__indicatorOpacity.get();
    }
    set indicatorOpacity(newValue: number) {
        this.__indicatorOpacity.set(newValue);
    }
    // autoPlay相关
    private playIntervalId: number;
    private startX: number;
    private lastX: number;
    render() {
        Stack.create();
        Stack.width(this.model.getWidth());
        Stack.height(this.model.getHeight());
        Stack.backgroundColor(this.model.getBackgroundColor());
        Stack.alignContent(Alignment.TopStart);
        If.create();
        if (this.count == 1) {
            If.branchId(0);
            Rect.create();
            Rect.height('100%');
            Rect.width('100%');
            Rect.fill(this.model.getColor());
            Rect.opacity(this.indicatorOpacity);
        }
        else if (this.count != 0) {
            If.branchId(1);
            Rect.create();
            Rect.height('100%');
            Rect.width((100 / this.count) + "%");
            Rect.fill(this.model.getColor());
            Rect.translate({ x: ((this.flingIndex + this.indicatorOffset) / this.count) * this.model.getWidth() });
            Rect.opacity(this.indicatorOpacity);
            If.create();
            if (this.flingIndex + this.indicatorOffset < 0) {
                If.branchId(0);
                Rect.create();
                Rect.height('100%');
                Rect.width((100 / this.count) + "%");
                Rect.fill(this.model.getColor());
                Rect.translate({ x: ((this.flingIndex + this.indicatorOffset) / this.count + 1) * this.model.getWidth() });
                Rect.opacity(this.indicatorOpacity);
            }
            else if (this.flingIndex + this.indicatorOffset > this.count - 1) {
                If.branchId(1);
                Rect.create();
                Rect.height('100%');
                Rect.width((100 / this.count) + "%");
                Rect.fill(this.model.getColor());
                Rect.translate({ x: ((this.flingIndex + this.indicatorOffset) / this.count - 1) * this.model.getWidth() });
                Rect.opacity(this.indicatorOpacity);
            }
            If.pop();
        }
        If.pop();
        Stack.pop();
    }
    aboutToAppear() {
        this.model.setOnPageTouchListener((event: TouchEvent, currentIndex: number) => {
            this.onIndicatorTouch(event, currentIndex);
        });
        this.model.setNotifyPlayListener((status: boolean) => {
            this.autoPlay(status);
        });
        this.model.setNotifyFadesListener((fades: boolean) => {
            this.onFadesChange(fades);
        });
        if (this.model.isAutoPlay()) {
            this.startPlay();
        }
        else if (this.model.isFades()) {
            setTimeout(() => {
                this.indicatorOpacity = 0;
            }, 20);
        }
    }
    onIndexChange() {
        clearTimeout(this.flingTimeoutId);
        this.indicatorOffset = 0;
    }
    onIndicatorTouch(event: TouchEvent, currentIndex: number) {
        switch (event.type) {
            case TouchType.Down:
                clearTimeout(this.fadeTimeoutId);
                this.indicatorOpacity = 1;
                clearInterval(this.playIntervalId);
                clearTimeout(this.flingTimeoutId);
                this.startX = (event.changedTouches[0].screenX);
                this.lastX = this.startX;
                break;
            case TouchType.Move:
                this.lastX = (event.changedTouches[0].screenX);
                if (this.model) {
                    this.indicatorOffset = (this.startX - this.lastX) / this.model.getWidth();
                }
                break;
            case TouchType.Up:
            case TouchType.Cancel:
                this.lastX = (event.changedTouches[0].screenX);
                let direction: number = 0;
                if (this.model && Math.abs(this.lastX - this.startX) > this.model.getWidth() / 2) {
                    if (this.lastX - this.startX < 0) {
                        direction = 1;
                    }
                    else {
                        direction = -1;
                    }
                }
                clearTimeout(this.flingTimeoutId);
                setTimeout(() => {
                    this.refreshOffsetForFling(this.flingIndex, this.indicatorOffset, direction, Math.abs(direction - this.indicatorOffset) / (FLING_DURATION / FLING_INTERVAL));
                }, FLING_INTERVAL);
                clearTimeout(this.fadeTimeoutId);
                if (this.model.isAutoPlay()) {
                    this.startPlay();
                }
                else if (this.model.isFades()) {
                    this.fadeTimeoutId = setTimeout(() => {
                        this.doFade();
                    }, this.model.getFadeDelay() + FLING_DURATION);
                }
                break;
        }
    }
    /**
       * flingIndex: 当前下标
       * offset: 当前offset
       * direction: 动画滑动方向 1: 滑到下一页 -1: 滑到上一页 0: 滑回当前页
       * offsetPerFrame: 每次更新的offset变化值
       */
    refreshOffsetForFling(flingIndex: number, offset: number, direction: number, offsetPerFrame: number) {
        if (direction === 0) {
            if (Math.abs(offset) <= offsetPerFrame) {
                this.indicatorOffset = 0;
            }
            else {
                this.indicatorOffset = (Math.abs(offset) - offsetPerFrame) * Math.sign(offset);
                clearTimeout(this.flingTimeoutId);
                this.flingTimeoutId = setTimeout(() => {
                    this.refreshOffsetForFling(flingIndex, this.indicatorOffset, direction, offsetPerFrame);
                }, FLING_INTERVAL);
            }
        }
        else if (direction === 1) { //显示下一页 说明往左滑动 offset 为正
            if (offset >= 1 - offsetPerFrame) {
                this.flingIndex = ((flingIndex + direction) % this.count + this.count) % this.count;
                this.indicatorOffset = 0;
            }
            else {
                this.indicatorOffset += offsetPerFrame;
                clearTimeout(this.flingTimeoutId);
                this.flingTimeoutId = setTimeout(() => {
                    this.refreshOffsetForFling(flingIndex, this.indicatorOffset, direction, offsetPerFrame);
                }, FLING_INTERVAL);
            }
        }
        else if (direction === -1) { //显示上一页 说明往右滑动 offset 为负
            if (offset <= -(1 - offsetPerFrame)) {
                this.flingIndex = ((flingIndex + direction) % this.count + this.count) % this.count;
                this.indicatorOffset = 0;
            }
            else {
                this.indicatorOffset -= offsetPerFrame;
                clearTimeout(this.flingTimeoutId);
                this.flingTimeoutId = setTimeout(() => {
                    this.refreshOffsetForFling(flingIndex, this.indicatorOffset, direction, offsetPerFrame);
                }, FLING_INTERVAL);
            }
        }
    }
    doFade() {
        if (this.model.isFades()) {
            this.indicatorOpacity = Math.max(0, this.indicatorOpacity - FLING_INTERVAL / this.model.getFadeLength());
            if (this.indicatorOpacity != 0) {
                this.fadeTimeoutId = setTimeout(() => {
                    this.doFade();
                }, FLING_INTERVAL);
            }
        }
        else {
            this.indicatorOpacity = 1;
        }
    }
    autoPlay(status: boolean) {
        if (status) {
            this.startPlay();
        }
        else {
            this.stopPlay();
        }
    }
    startPlay() {
        clearInterval(this.playIntervalId);
        clearTimeout(this.fadeTimeoutId);
        this.indicatorOpacity = 1;
        this.playIntervalId = setInterval(() => {
            this.model.getSwiperController()?.showNext();
            this.refreshOffsetForFling(this.flingIndex, 0, 1, FLING_INTERVAL / FLING_DURATION);
        }, this.model.getAutoPlayTime());
    }
    stopPlay() {
        clearInterval(this.playIntervalId);
    }
    onFadesChange(fades: boolean) {
        clearTimeout(this.fadeTimeoutId);
        if (fades) {
            this.fadeTimeoutId = setTimeout(() => {
                this.doFade();
            }, this.model.getFadeDelay());
        }
        else {
            this.indicatorOpacity = 1;
        }
    }
}
export default BannerIndicator;
