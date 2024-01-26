let __generate__Id: number = 0;
function generateId(): string {
    return "IRenderer_" + ++__generate__Id;
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
import { DanmakuTimer } from '../model/DanmakuTimer';
import { BaseDanmaku } from '../model/BaseDanmaku';
import { IDanmakus, ST_BY_LIST } from '../model/IDanmakus';
import { IDisplayer } from '../model/IDisplayer';
import { Danmakus } from '../model/ohos/Danmakus';
export const NOTHING_RENDERING: number = 0;
export const CACHE_RENDERING: number = 1; // useless on ohos
export const TEXT_RENDERING: number = 2;
export interface IRenderer {
    draw(disp: IDisplayer, danmakus: IDanmakus, startRenderTime: number, renderingState: RenderingState): void;
    clear(): void;
    clearRetainer(): void;
    release(): void;
    setVerifierEnabled(enabled: boolean): void;
    setOnDanmakuShownListener(onDanmakuShownListener: OnDanmakuShownListener): void;
    removeOnDanmakuShownListener(): void;
    alignBottom(enable: boolean): void;
}
export interface OnDanmakuShownListener {
    onDanmakuShown(danmaku: BaseDanmaku): void;
}
export class Area {
    public mRefreshRect: number[] = [0, 0, 0, 0];
    private mMaxHeight: number = 0;
    private mMaxWidth: number = 0;
    public setEdge(maxWidth: number, maxHeight: number): void {
        this.mMaxWidth = maxWidth;
        this.mMaxHeight = maxHeight;
    }
    public reset(): void {
        this.set(this.mMaxWidth, this.mMaxHeight, 0, 0);
    }
    public resizeToMax(): void {
        this.set(0, 0, this.mMaxWidth, this.mMaxHeight);
    }
    public set(left: number, top: number, right: number, bottom: number): void {
        this.mRefreshRect[0] = left;
        this.mRefreshRect[1] = top;
        this.mRefreshRect[2] = right;
        this.mRefreshRect[3] = bottom;
    }
}
export class RenderingState {
    public static UNKNOWN_TIME: number = -1;
    public isRunningDanmakus: boolean = false;
    public timer: DanmakuTimer = new DanmakuTimer();
    public indexInScreen: number = 0;
    public totalSizeInScreen: number = 0;
    public lastDanmaku: BaseDanmaku | any = null;
    public r2lDanmakuCount: number = 0;
    public l2rDanmakuCount: number = 0;
    public ftDanmakuCount: number = 0;
    public fbDanmakuCount: number = 0;
    public specialDanmakuCount: number = 0;
    public totalDanmakuCount: number = 0;
    public lastTotalDanmakuCount: number = 0;
    public consumingTime: number = 0;
    public beginTime: number = 0;
    public endTime: number = 0;
    public nothingRendered: boolean = true;
    public sysTime: number = 0;
    public cacheHitCount: number = 0;
    public cacheMissCount: number = 0;
    private runningDanmakus: IDanmakus = new Danmakus({ sortType: ST_BY_LIST });
    private mIsObtaining: boolean = false;
    public addTotalCount(count: number): number {
        this.totalDanmakuCount += count;
        return this.totalDanmakuCount;
    }
    public addCount(type: number, count: number): number {
        switch (type) {
            case BaseDanmaku.TYPE_SCROLL_RL:
                this.r2lDanmakuCount += count;
                return this.r2lDanmakuCount;
            case BaseDanmaku.TYPE_SCROLL_LR:
                this.l2rDanmakuCount += count;
                return this.l2rDanmakuCount;
            case BaseDanmaku.TYPE_FIX_TOP:
                this.ftDanmakuCount += count;
                return this.ftDanmakuCount;
            case BaseDanmaku.TYPE_FIX_BOTTOM:
                this.fbDanmakuCount += count;
                return this.fbDanmakuCount;
            case BaseDanmaku.TYPE_SPECIAL:
                this.specialDanmakuCount += count;
                return this.specialDanmakuCount;
        }
        return 0;
    }
    public reset(): void {
        this.lastTotalDanmakuCount = this.totalDanmakuCount;
        this.r2lDanmakuCount = this.l2rDanmakuCount = this.ftDanmakuCount = this.fbDanmakuCount = this.specialDanmakuCount = this.totalDanmakuCount = 0;
        this.sysTime = this.beginTime = this.endTime = this.consumingTime = 0;
        this.nothingRendered = false;
        this.runningDanmakus.clear();
    }
    public set(other: RenderingState): void {
        if (other == null)
            return;
        this.lastTotalDanmakuCount = other.lastTotalDanmakuCount;
        this.r2lDanmakuCount = other.r2lDanmakuCount;
        this.l2rDanmakuCount = other.l2rDanmakuCount;
        this.ftDanmakuCount = other.ftDanmakuCount;
        this.fbDanmakuCount = other.fbDanmakuCount;
        this.specialDanmakuCount = other.specialDanmakuCount;
        this.totalDanmakuCount = other.totalDanmakuCount;
        this.consumingTime = other.consumingTime;
        this.beginTime = other.beginTime;
        this.endTime = other.endTime;
        this.nothingRendered = other.nothingRendered;
        this.sysTime = other.sysTime;
        this.cacheHitCount = other.cacheHitCount;
        this.cacheMissCount = other.cacheMissCount;
    }
    public appendToRunningDanmakus(danmaku: BaseDanmaku): void {
        if (!this.mIsObtaining) {
            this.runningDanmakus.addItem(danmaku);
        }
    }
    public obtainRunningDanmakus(): IDanmakus {
        this.mIsObtaining = true;
        let danmakus: IDanmakus = this.runningDanmakus;
        this.runningDanmakus = new Danmakus({ sortType: ST_BY_LIST });
        this.mIsObtaining = false;
        return danmakus;
    }
}
