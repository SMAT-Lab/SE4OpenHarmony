let __generate__Id: number = 0;
function generateId(): string {
    return "BaseDanmaku_" + ++__generate__Id;
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
import { Duration } from '../model/Duration';
import { IDisplayer } from '../model/IDisplayer';
import { DanmakuTimer } from '../model/DanmakuTimer';
import { GlobalFlagValues } from '../model/GlobalFlagValues';
import { AlphaValue } from './AlphaValue';
export abstract class BaseDanmaku {
    public static DANMAKU_BR_CHAR: string = "/n";
    public static TYPE_SCROLL_RL: number = 1;
    public static TYPE_SCROLL_LR: number = 6;
    public static TYPE_FIX_TOP: number = 5;
    public static TYPE_FIX_BOTTOM: number = 4;
    public static TYPE_SPECIAL: number = 7;
    public static TYPE_MOVEABLE_XXX: number = 0; // TODO: add more type
    public static INVISIBLE: number = 0;
    public static VISIBLE: number = 1;
    public static FLAG_REQUEST_REMEASURE: number = 0x1;
    public static FLAG_REQUEST_INVALIDATE: number = 0x2;
    /**
       * 显示时间(毫秒)
       */
    private time: number = 0;
    /**
       * 偏移时间
       */
    public timeOffset: number = 0;
    /**
       * 文本
       */
    public text: string = '';
    /**
       * 多行文本: 如果有包含换行符需事先拆分到lines
       */
    public lines: string[] | any;
    /**
       * 保存一些数据的引用(库内部使用, 外部使用请用tag)
       */
    public obj: object | any;
    /**
       * 可保存一些自定义数据的引用(外部使用).
       * 除非主动set null,否则不会自动释放引用.
       * 确定你会主动set null, 否则不要使用这个字段引用大内存的对象实例.
       */
    public tag: object | any;
    /**
       * 文本颜色
       */
    public textColor: number = 0;
    /**
       * Z轴角度
       */
    public rotationZ: number = 0;
    /**
       * Y轴角度
       */
    public rotationY: number = 0;
    /**
       * 阴影/描边颜色
       */
    public textShadowColor: number = 0;
    /**
       * 下划线颜色,0表示无下划线
       */
    public underlineColor: number = 0;
    /**
       * 字体大小
       */
    public textSize: number = -1;
    /**
       * 框的颜色,0表示无框
       */
    public borderColor: number = 0;
    /**
       * 内边距(像素)
       */
    public padding: number = 0;
    /**
       * 弹幕优先级,0为低优先级,>0为高优先级不会被过滤器过滤
       */
    public priority: number = 0;
    /**
       * 占位宽度
       */
    public paintWidth: number = -1;
    /**
       * 占位高度
       */
    public paintHeight: number = -1;
    /**
       * 存活时间(毫秒)
       */
    public duration: Duration | any;
    /**
       * 索引/编号
       */
    public index: number = 0;
    /**
       * 是否可见
       */
    public visibility: number = 0;
    /**
       * 重置位 visible
       */
    private visibleResetFlag: number = 0;
    /**
       * 重置位 measure
       */
    public measureResetFlag: number = 0;
    /**
       * 重置位 offset time
       */
    public syncTimeOffsetResetFlag: number = 0;
    /**
       * 重置位 prepare
       */
    public prepareResetFlag: number = -1;
    /**
       * 是否是直播弹幕
       */
    public isLive: boolean | any;
    /**
       * 临时, 是否在同线程创建缓存
       */
    public forceBuildCacheInSameThread: boolean = true;
    /**
       * 弹幕发布者id, 0表示游客
       */
    public userId: number = 0;
    /**
       * 弹幕发布者id
       */
    public userHash: string = '';
    /**
       * 是否游客
       */
    public isGuest: boolean = true;
    /**
       * 计时
       */
    protected mTimer: DanmakuTimer | any;
    /**
       * 透明度
       */
    protected alpha: number = AlphaValue.MAX;
    public mFilterParam: number = 0;
    public filterResetFlag: number = -1;
    public flags: GlobalFlagValues | any;
    public requestFlags: number = 0;
    static LAST_HASH: number = 0;
    protected mHashCode: number;
    constructor() {
        this.mHashCode = BaseDanmaku.LAST_HASH++;
    }
    /**
       * 标记是否首次显示，首次显示后将置为FIRST_SHOWN_RESET_FLAG
       */
    public firstShownFlag: number = -1;
    private mTags: Map<number, object> = new Map();
    public getDuration(): number {
        return this.duration.value;
    }
    public setDuration(duration: Duration) {
        this.duration = duration;
    }
    public draw(displayer: IDisplayer): number {
        return displayer.draw(this);
    }
    public isMeasured(): boolean {
        return this.paintWidth > -1 && this.paintHeight > -1
            && this.measureResetFlag == this.flags.MEASURE_RESET_FLAG;
    }
    public measure(displayer: IDisplayer, fromWorkerThread: boolean) {
        displayer.measure(this, fromWorkerThread);
        this.measureResetFlag = this.flags.MEASURE_RESET_FLAG;
    }
    public isPrepared(): boolean {
        return this.prepareResetFlag == this.flags.PREPARE_RESET_FLAG;
    }
    public prepare(displayer: IDisplayer, fromWorkerThread: boolean) {
        displayer.prepare(this, fromWorkerThread);
        this.prepareResetFlag = this.flags.PREPARE_RESET_FLAG;
    }
    public isShown(): boolean {
        return this.visibility == BaseDanmaku.VISIBLE
            && this.visibleResetFlag == this.flags.VISIBLE_RESET_FLAG;
    }
    public isTimeOut(ctime?: number): boolean {
        if (ctime === undefined) {
            return this.mTimer == null || this.isTimeOut(this.mTimer.currMillisecond);
        }
        else {
            return ctime - this.getActualTime() >= this.duration.value;
        }
    }
    public isOutside(ctime?: number): boolean {
        if (ctime === undefined) {
            return this.mTimer == null || this.isOutside(this.mTimer.currMillisecond);
        }
        else {
            let dtime: number = ctime - this.getActualTime();
            return dtime <= 0 || dtime >= this.duration.value;
        }
    }
    public isLate(): boolean {
        return this.mTimer == null || this.mTimer.currMillisecond < this.getActualTime();
    }
    public hasPassedFilter(): boolean {
        if (this.filterResetFlag != this.flags.FILTER_RESET_FLAG) {
            this.mFilterParam = 0;
            return false;
        }
        return true;
    }
    public isFiltered(): boolean {
        return this.filterResetFlag == this.flags.FILTER_RESET_FLAG && this.mFilterParam != 0;
    }
    public isFilteredBy(flag: number): boolean {
        return this.filterResetFlag == this.flags.FILTER_RESET_FLAG && (this.mFilterParam & flag) == flag;
    }
    public setVisibility(b: boolean) {
        if (b) {
            this.visibleResetFlag = this.flags.VISIBLE_RESET_FLAG;
            this.visibility = BaseDanmaku.VISIBLE;
        }
        else
            this.visibility = BaseDanmaku.INVISIBLE;
    }
    public abstract layout(displayer: IDisplayer, x: number, y: number);
    public abstract getRectAtTime(displayer: IDisplayer, currTime: number): number[];
    public abstract getLeft(): number;
    public abstract getTop(): number;
    public abstract getRight(): number;
    public abstract getBottom(): number;
    /**
       * return the type of Danmaku
       *
       * @return TYPE_SCROLL_RL = 0 TYPE_SCROLL_RL = 1 TYPE_SCROLL_LR = 2
       * TYPE_FIX_TOP = 3; TYPE_FIX_BOTTOM = 4;
       */
    public abstract getType(): number;
    public getTimer(): DanmakuTimer | any {
        return this.mTimer;
    }
    public setTimer(timer: DanmakuTimer) {
        this.mTimer = timer;
    }
    public getAlpha(): number {
        return this.alpha;
    }
    public setTag(tag: object, key?: number) {
        if (key === undefined) {
            this.tag = tag;
        }
        else {
            this.mTags.set(key, tag);
        }
    }
    public getTag(key: number): any {
        if (this.mTags === null) {
            return null;
        }
        return this.mTags.get(key);
    }
    public setTimeOffset(timeOffset: number) {
        this.timeOffset = timeOffset;
        this.syncTimeOffsetResetFlag = this.flags.SYNC_TIME_OFFSET_RESET_FLAG;
    }
    public setTime(time: number) {
        this.time = time;
        this.timeOffset = 0;
    }
    public getTime(): number {
        return this.time;
    }
    public getActualTime(): number {
        if (this.flags == null || this.flags.SYNC_TIME_OFFSET_RESET_FLAG != this.syncTimeOffsetResetFlag) {
            this.timeOffset = 0;
            return this.time;
        }
        return this.time + this.timeOffset;
    }
    public isOffset(): boolean {
        if (this.flags == null || this.flags.SYNC_TIME_OFFSET_RESET_FLAG != this.syncTimeOffsetResetFlag) {
            this.timeOffset = 0;
            return false;
        }
        return this.timeOffset != 0;
    }
    public hashCode(): number {
        return this.mHashCode;
    }
}
