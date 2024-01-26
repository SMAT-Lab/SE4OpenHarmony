let __generate__Id: number = 0;
function generateId(): string {
    return "DanmakuFilters_" + ++__generate__Id;
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
import { BaseDanmaku } from '../danmaku/model/BaseDanmaku';
import { DanmakuContext } from '../danmaku/model/ohos/DanmakuContext';
import { DanmakuTimer } from '../danmaku/model/DanmakuTimer';
import { Duration } from '../danmaku/model/Duration';
import { Danmakus } from '../danmaku/model/ohos/Danmakus';
import SystemClock from '../danmaku/util/SystemClock';
import { Consumer, IDanmakus, DefaultConsumer, ST_BY_LIST } from '../danmaku/model/IDanmakus';
class Args {
    tag?: string;
    primary?: boolean;
    filter?: BaseDanmakuFilter<any>;
}
class Remove extends DefaultConsumer<BaseDanmaku> {
    private limitTime: any;
    constructor(limitTime: any) {
        super();
        this.limitTime = limitTime;
    }
    startTime: number = SystemClock.uptimeMillis();
    public accept(item: BaseDanmaku): number {
        try {
            if (SystemClock.uptimeMillis() - this.startTime > this.limitTime) {
                return Consumer.ACTION_BREAK;
            }
            if (item.isTimeOut()) {
                return Consumer.ACTION_REMOVE;
            }
            else {
                return Consumer.ACTION_BREAK;
            }
        }
        catch (e) {
            return Consumer.ACTION_BREAK;
        }
    }
}
export class DanmakuFilters {
    public static FILTER_TYPE_TYPE: number = 1;
    public static FILYER_TYPE_QUANTITY: number = 2;
    public static FILTER_TYPE_ELAPSED_TIME: number = 4;
    public static FILTER_TYPE_TEXTCOLOR: number = 8;
    public static FILTER_TYPE_USER_ID: number = 16;
    public static FILTER_TYPE_USER_HASH: number = 32;
    public static FILTER_TYPE_USER_GUEST: number = 64;
    public static FILTER_TYPE_DUPLICATE_MERGE: number = 128;
    public static FILTER_TYPE_MAXIMUM_LINES: number = 256;
    public static FILTER_TYPE_OVERLAPPING: number = 512;
    public static TAG_TYPE_DANMAKU_FILTER: string = "1010_Filter";
    public static TAG_QUANTITY_DANMAKU_FILTER: string = "1011_Filter";
    public static TAG_ELAPSED_TIME_FILTER: string = "1012_Filter";
    public static TAG_TEXT_COLOR_DANMAKU_FILTER: string = "1013_Filter";
    public static TAG_USER_ID_FILTER: string = "1014_Filter";
    public static TAG_USER_HASH_FILTER: string = "1015_Filter";
    public static TAG_GUEST_FILTER: string = "1016_Filter";
    public static TAG_DUPLICATE_FILTER: string = "1017_Filter";
    public static TAG_MAXIMUN_LINES_FILTER: string = "1018_Filter";
    public static TAG_OVERLAPPING_FILTER: string = "1019_Filter";
    public static TAG_PRIMARY_CUSTOM_FILTER: string = "2000_Primary_Custom_Filter";
    public filterException: Error = new Error("not support this filter tag");
    public filter(danmaku: BaseDanmaku, index: number, totalsizeInScreen: number, timer: DanmakuTimer, fromCachingTask: boolean, context: DanmakuContext): void {
        for (let i = 0; i < this.mFilterArray.length; i++) {
            let f: IDanmakuFilter<any> = this.mFilterArray[i];
            if (f != null) {
                let filtered: boolean = this.mFilterArray[i].filter(danmaku, index, totalsizeInScreen, timer, fromCachingTask, context);
                danmaku.filterResetFlag = context.mGlobalFlagValues.FILTER_RESET_FLAG;
                if (filtered) {
                    break;
                }
            }
        }
    }
    public filterSecondary(danmaku: BaseDanmaku, lines: number, totalsizeInScreen: number, timer: DanmakuTimer, willHit: boolean, context: DanmakuContext): boolean {
        for (let i = 0; i < this.mFilterArraySecondary.length; i++) {
            let f: IDanmakuFilter<any> = this.mFilterArraySecondary[i];
            if (f != null) {
                let filtered: boolean = f.filter(danmaku, lines, totalsizeInScreen, timer, willHit, context);
                danmaku.filterResetFlag = context.mGlobalFlagValues.FILTER_RESET_FLAG;
                if (filtered) {
                    return true;
                }
            }
        }
        return false;
    }
    private filters: Map<string, IDanmakuFilter<any>> = new Map<string, IDanmakuFilter<any>>();
    private filtersSecondary: Map<string, IDanmakuFilter<any>> = new Map<string, IDanmakuFilter<any>>();
    mFilterArray: IDanmakuFilter<any>[] = [];
    mFilterArraySecondary: IDanmakuFilter<any>[] = [];
    public get(tag: string, primary: boolean = true): IDanmakuFilter<any> {
        let f: IDanmakuFilter<any> | any = primary ? this.filters.get(tag) : this.filtersSecondary.get(tag);
        if (f == null) {
            let args: Args = { tag: tag,
                primary: primary };
            f = this.registerFilter((args) as any);
        }
        return f;
    }
    public registerFilter(args: Args): any {
        if (args.filter != undefined) {
            this.filters.set(DanmakuFilters.TAG_PRIMARY_CUSTOM_FILTER + "_" + args.filter.hashCode(), args.filter);
            this.mFilterArray = (Array as any).from(this.filters.values());
            return null;
        }
        if (args.tag !== undefined) {
            if (args.primary === undefined) {
                args.primary = true;
            }
            if (args.tag == null) {
                this.throwFilterException();
                return null;
            }
            let filter: IDanmakuFilter<any> | undefined = this.filters.get(args.tag);
            if (filter == null) {
                if (DanmakuFilters.TAG_TYPE_DANMAKU_FILTER == args.tag) {
                    filter = new TypeDanmakuFilter();
                }
                else if (DanmakuFilters.TAG_QUANTITY_DANMAKU_FILTER == args.tag) {
                    filter = new QuantityDanmakuFilter();
                }
                else if (DanmakuFilters.TAG_ELAPSED_TIME_FILTER == args.tag) {
                    filter = new ElapsedTimeFilter();
                }
                else if (DanmakuFilters.TAG_TEXT_COLOR_DANMAKU_FILTER == args.tag) {
                    filter = new TextColorFilter();
                }
                else if (DanmakuFilters.TAG_USER_ID_FILTER == args.tag) {
                    filter = new UserIdFilter();
                }
                else if (DanmakuFilters.TAG_USER_HASH_FILTER == args.tag) {
                    filter = new UserHashFilter();
                }
                else if (DanmakuFilters.TAG_GUEST_FILTER == args.tag) {
                    filter = new GuestFilter();
                }
                else if (DanmakuFilters.TAG_DUPLICATE_FILTER == args.tag) {
                    filter = new DuplicateMergingFilter();
                }
                else if (DanmakuFilters.TAG_MAXIMUN_LINES_FILTER == args.tag) {
                    filter = new MaximumLinesFilter();
                }
                else if (DanmakuFilters.TAG_OVERLAPPING_FILTER == args.tag) {
                    filter = new OverlappingFilter();
                }
            }
            if (filter == null) {
                this.throwFilterException();
                return null;
            }
            filter.setData(null);
            if (args.primary) {
                this.filters.set(args.tag, filter);
                this.mFilterArray = (Array as any).from(this.filters.values());
            }
            else {
                this.filtersSecondary.set(args.tag, filter);
                this.mFilterArraySecondary = (Array as any).from(this.filtersSecondary.values());
            }
            return filter;
        }
    }
    public unregisterFilter(args: Args) {
        if (args.filter !== undefined) {
            this.filters.delete(DanmakuFilters.TAG_PRIMARY_CUSTOM_FILTER + "_" + args.filter.hashCode());
            this.mFilterArray = (Array as any).from(this.filters.values());
            return;
        }
        if (args.tag != undefined) {
            if (args.primary === undefined) {
                args.primary = true;
            }
            let f: IDanmakuFilter<any> | undefined;
            if (args.primary) {
                f = this.filters.get(args.tag);
                this.filters.delete(args.tag);
            }
            else {
                f = this.filtersSecondary.get(args.tag);
                this.filtersSecondary.delete(args.tag);
            }
            if (f != null) {
                f.clear();
                if (args.primary) {
                    this.mFilterArray = (Array as any).from(this.filters.values());
                }
                else {
                    this.mFilterArraySecondary = (Array as any).from(this.filtersSecondary.values());
                }
            }
        }
    }
    public clear(): void {
        this.mFilterArray.forEach((f: any) => {
            if (f != null)
                f.clear();
        });
        this.mFilterArraySecondary.forEach((f: any) => {
            if (f != null)
                f.clear();
        });
    }
    public reset(): void {
        this.mFilterArray.forEach((f: any) => {
            if (f != null)
                f.reset();
        });
        this.mFilterArraySecondary.forEach((f: any) => {
            if (f != null)
                f.reset();
        });
    }
    public release(): void {
        this.clear();
        this.filters.clear();
        this.mFilterArray = [];
        this.filtersSecondary.clear();
        this.mFilterArraySecondary = [];
    }
    private throwFilterException(): void {
        try {
            throw this.filterException;
        }
        catch (e) {
        }
    }
}
export interface IDanmakuFilter<T> {
    /*
           * 是否过滤
           */
    filter(danmaku: BaseDanmaku, index: number, totalsizeInScreen: number, timer: DanmakuTimer, fromCachingTask: boolean, config: DanmakuContext): boolean;
    setData(data: T): void;
    reset(): void;
    clear(): void;
    hashCode(): number;
}
export abstract class BaseDanmakuFilter<T> implements IDanmakuFilter<T> {
    static LAST_HASH: number = 0;
    protected mHashCode: number;
    constructor() {
        this.mHashCode = BaseDanmakuFilter.LAST_HASH++;
    }
    clear(): void {
    }
    abstract filter(danmaku: BaseDanmaku, index: number, totalsizeInScreen: number, timer: DanmakuTimer, fromCachingTask: boolean, config: DanmakuContext): boolean;
    abstract setData(data: T): void;
    abstract reset(): void;
    hashCode(): number {
        return this.mHashCode;
    }
}
/**
     * 根据弹幕类型过滤
     *
     * @author ch
     */
export class TypeDanmakuFilter extends BaseDanmakuFilter<Array<number>> {
    public mFilterTypes: Array<number> = new Array<number>();
    public enableType(filterType: number): void {
        if (this.mFilterTypes.indexOf(filterType) < 0)
            this.mFilterTypes.push(filterType);
    }
    public disableType(filterType: number): void {
        if (this.mFilterTypes.indexOf(filterType) >= 0)
            this.mFilterTypes.splice(this.mFilterTypes.indexOf(filterType), 1);
    }
    public filter(danmaku: BaseDanmaku, orderInScreen: number, totalsizeInScreen: number, timer: DanmakuTimer, fromCachingTask: boolean, config: DanmakuContext): boolean {
        let filtered: boolean = danmaku != null && this.mFilterTypes.indexOf(danmaku.getType()) >= 0;
        if (filtered) {
            danmaku.mFilterParam |= DanmakuFilters.FILTER_TYPE_TYPE;
        }
        return filtered;
    }
    public setData(data: Array<number>): void {
        this.reset();
        if (data != null) {
            data.forEach((i) => {
                this.enableType(i);
            });
        }
    }
    public reset(): void {
        this.mFilterTypes.splice(0, this.mFilterTypes.length);
    }
}
/**
     * 根据同屏数量过滤弹幕
     *
     * @author ch
     */
export class QuantityDanmakuFilter extends BaseDanmakuFilter<number> {
    protected mMaximumSize: number = -1;
    protected mLastSkipped: BaseDanmaku | any = null;
    private mFilterFactor: number = 1;
    private needFilter(danmaku: BaseDanmaku, orderInScreen: number, totalSizeInScreen: number, timer: DanmakuTimer, fromCachingTask: boolean, context: DanmakuContext): boolean {
        if (this.mMaximumSize <= 0 || danmaku.getType() != BaseDanmaku.TYPE_SCROLL_RL) {
            return false;
        }
        if (this.mLastSkipped == null || this.mLastSkipped.isTimeOut()) {
            this.mLastSkipped = danmaku;
            return false;
        }
        let gapTime: number = danmaku.getActualTime() - this.mLastSkipped.getActualTime();
        let maximumScrollDuration: Duration = context.mDanmakuFactory.MAX_Duration_Scroll_Danmaku;
        if (gapTime >= 0 && maximumScrollDuration != null && gapTime < (maximumScrollDuration.value * this.mFilterFactor)) {
            return true;
        }
        if (orderInScreen > this.mMaximumSize) {
            return true;
        }
        this.mLastSkipped = danmaku;
        return false;
    }
    public filter(danmaku: BaseDanmaku, orderInScreen: number, totalsizeInScreen: number, timer: DanmakuTimer, fromCachingTask: boolean, config: DanmakuContext): boolean {
        let filtered: boolean = this.needFilter(danmaku, orderInScreen, totalsizeInScreen, timer, fromCachingTask, config);
        if (filtered) {
            danmaku.mFilterParam |= DanmakuFilters.FILYER_TYPE_QUANTITY;
        }
        return filtered;
    }
    public setData(data: number): void {
        this.reset();
        if (data == null)
            return;
        if (data != this.mMaximumSize) {
            this.mMaximumSize = data + data / 5;
            this.mFilterFactor = 1 / this.mMaximumSize;
        }
    }
    public reset(): void {
        this.mLastSkipped = null;
    }
    public clear(): void {
        this.reset();
    }
}
/**
     * 根据绘制耗时过滤弹幕
     *
     * @author ch
     */
export class ElapsedTimeFilter extends BaseDanmakuFilter<Object> {
    public mMaxTime: number = 20; // 绘制超过20ms就跳过 ，默认保持接近50fps
    private needFilter(danmaku: BaseDanmaku, orderInScreen: number, totalsizeInScreen: number, timer: DanmakuTimer, fromCachingTask: boolean): boolean {
        if (timer == null || !danmaku.isOutside()) {
            return false;
        }
        let elapsedTime: number = SystemClock.uptimeMillis() - timer.currMillisecond;
        if (elapsedTime >= this.mMaxTime) {
            return true;
        }
        return false;
    }
    public filter(danmaku: BaseDanmaku, orderInScreen: number, totalsizeInScreen: number, timer: DanmakuTimer, fromCachingTask: boolean, config: DanmakuContext): boolean {
        let filtered: boolean = this.needFilter(danmaku, orderInScreen, totalsizeInScreen, timer, fromCachingTask);
        if (filtered) {
            danmaku.mFilterParam |= DanmakuFilters.FILTER_TYPE_ELAPSED_TIME;
        }
        return filtered;
    }
    public setData(data: Object): void {
        this.reset();
    }
    public reset(): void {
    }
    public clear(): void {
        this.reset();
    }
}
/**
     * 根据文本颜色白名单过滤
     *
     * @author ch
     */
export class TextColorFilter extends BaseDanmakuFilter<Array<number>> {
    public mWhiteList: Array<number> = new Array<number>();
    private addToWhiteList(color: number): void {
        if (this.mWhiteList.indexOf(color) < 0) {
            this.mWhiteList.push(color);
        }
    }
    public filter(danmaku: BaseDanmaku, index: number, totalsizeInScreen: number, timer: DanmakuTimer, fromCachingTask: boolean, config: DanmakuContext): boolean {
        let filtered: boolean = danmaku != null && this.mWhiteList.indexOf(danmaku.textColor) < 0;
        if (filtered) {
            danmaku.mFilterParam |= DanmakuFilters.FILTER_TYPE_TEXTCOLOR;
        }
        return filtered;
    }
    public setData(data: Array<number>): void {
        this.reset();
        if (data != null) {
            data.forEach((i) => {
                this.addToWhiteList(i);
            });
        }
    }
    public reset(): void {
        this.mWhiteList.splice(0, this.mWhiteList.length);
    }
}
/**
     * 根据用户标识黑名单过滤
     *
     * @author ch
     */
export abstract class UserFilter<T> extends BaseDanmakuFilter<Array<T>> {
    public mBlackList: Array<T> = new Array<T>();
    private addToBlackList(id: T): void {
        if (this.mBlackList.indexOf(id) < 0) {
            this.mBlackList.push(id);
        }
    }
    public abstract filter(danmaku: BaseDanmaku, index: number, totalsizeInScreen: number, timer: DanmakuTimer, fromCachingTask: boolean, config: DanmakuContext): boolean;
    public setData(data: Array<T>): void {
        this.reset();
        if (data != null) {
            data.forEach((i) => {
                this.addToBlackList(i);
            });
        }
    }
    public reset(): void {
        this.mBlackList.splice(0, this.mBlackList.length);
    }
}
/**
     * 根据用户Id黑名单过滤
     *
     * @author ch
     */
export class UserIdFilter extends UserFilter<number> {
    public filter(danmaku: BaseDanmaku, index: number, totalsizeInScreen: number, timer: DanmakuTimer, fromCachingTask: boolean, config: DanmakuContext): boolean {
        let filtered: boolean = danmaku != null && this.mBlackList.indexOf(danmaku.userId) >= 0;
        if (filtered) {
            danmaku.mFilterParam |= DanmakuFilters.FILTER_TYPE_USER_ID;
        }
        return filtered;
    }
}
/**
     * 根据用户hash黑名单过滤
     *
     * @author ch
     */
export class UserHashFilter extends UserFilter<string> {
    public filter(danmaku: BaseDanmaku, index: number, totalsizeInScreen: number, timer: DanmakuTimer, fromCachingTask: boolean, config: DanmakuContext): boolean {
        let filtered: boolean = danmaku != null && this.mBlackList.indexOf(danmaku.userHash) >= 0;
        if (filtered) {
            danmaku.mFilterParam |= DanmakuFilters.FILTER_TYPE_USER_HASH;
        }
        return filtered;
    }
}
/**
     * 屏蔽游客弹幕
     *
     * @author ch
     */
export class GuestFilter extends BaseDanmakuFilter<boolean> {
    private mBlock: boolean = false;
    public filter(danmaku: BaseDanmaku, index: number, totalsizeInScreen: number, timer: DanmakuTimer, fromCachingTask: boolean, config: DanmakuContext): boolean {
        let filtered: boolean = this.mBlock && danmaku.isGuest;
        if (filtered) {
            danmaku.mFilterParam |= DanmakuFilters.FILTER_TYPE_USER_GUEST;
        }
        return filtered;
    }
    public setData(data: boolean): void {
        this.mBlock = data;
    }
    public reset(): void {
        this.mBlock = false;
    }
}
export class DuplicateMergingFilter extends BaseDanmakuFilter<void> {
    protected blockedDanmakus: IDanmakus = new Danmakus({ sortType: ST_BY_LIST });
    protected currentDanmakus: Map<string, BaseDanmaku> = new Map<string, BaseDanmaku>();
    private passedDanmakus: IDanmakus = new Danmakus({ sortType: ST_BY_LIST });
    private removeTimeoutDanmakusByIDanmakus(danmakus: IDanmakus, limitTime: number): void {
        danmakus.forEachSync(new Remove(limitTime));
    }
    private removeTimeoutDanmakusByMap(danmakus: Map<string, BaseDanmaku>, limitTime: number): void {
        let it = danmakus.entries();
        let r: IteratorResult<[
            string,
            BaseDanmaku
        ]>;
        let startTime: number = SystemClock.uptimeMillis();
        r = it.next();
        while (!r.done) {
            try {
                let item: BaseDanmaku = r.value[1];
                if (item.isTimeOut()) {
                    danmakus.delete(r.value[0]);
                }
                else {
                    break;
                }
            }
            catch (e) {
                break;
            }
            if (SystemClock.uptimeMillis() - startTime > limitTime) {
                break;
            }
        }
    }
    public needFilter(danmaku: BaseDanmaku, index: number, totalsizeInScreen: number, timer: DanmakuTimer, fromCachingTask: boolean): boolean {
        this.removeTimeoutDanmakusByIDanmakus(this.blockedDanmakus, 2);
        this.removeTimeoutDanmakusByIDanmakus(this.passedDanmakus, 2);
        this.removeTimeoutDanmakusByMap(this.currentDanmakus, 3);
        if (this.blockedDanmakus.contains(danmaku) && !danmaku.isOutside()) {
            return true;
        }
        if (this.passedDanmakus.contains(danmaku)) {
            return false;
        }
        if (this.currentDanmakus.has(danmaku.text)) {
            this.currentDanmakus.set(danmaku.text, danmaku);
            this.blockedDanmakus.removeItem(danmaku);
            this.blockedDanmakus.addItem(danmaku);
            return true;
        }
        else {
            this.currentDanmakus.set(danmaku.text, danmaku);
            this.passedDanmakus.addItem(danmaku);
            return false;
        }
    }
    public filter(danmaku: BaseDanmaku, index: number, totalsizeInScreen: number, timer: DanmakuTimer, fromCachingTask: boolean, config: DanmakuContext): boolean {
        let filtered: boolean = this.needFilter(danmaku, index, totalsizeInScreen, timer, fromCachingTask);
        if (filtered) {
            danmaku.mFilterParam |= DanmakuFilters.FILTER_TYPE_DUPLICATE_MERGE;
        }
        return filtered;
    }
    public setData(data: void): void {
    }
    public reset(): void {
        this.passedDanmakus.clear();
        this.blockedDanmakus.clear();
        this.currentDanmakus.clear();
    }
    public clear(): void {
        this.reset();
    }
}
export class MaximumLinesFilter extends BaseDanmakuFilter<Map<number, number>> {
    private mMaximumLinesPairs: Map<number, number> | any = null;
    public filter(danmaku: BaseDanmaku, lines: number, totalsizeInScreen: number, timer: DanmakuTimer, willHit: boolean, config: DanmakuContext): boolean {
        let filtered: boolean = false;
        if (this.mMaximumLinesPairs != null) {
            let maxLines: number = this.mMaximumLinesPairs.get(danmaku.getType());
            filtered = (maxLines != null && lines >= maxLines);
            if (filtered) {
                danmaku.mFilterParam |= DanmakuFilters.FILTER_TYPE_MAXIMUM_LINES;
            }
        }
        return filtered;
    }
    public setData(data: Map<number, number>): void {
        this.mMaximumLinesPairs = data;
    }
    public reset(): void {
        this.mMaximumLinesPairs = null;
    }
}
export class OverlappingFilter extends BaseDanmakuFilter<Map<number, boolean>> {
    private mEnabledPairs: Map<number, boolean> | null = null;
    public filter(danmaku: BaseDanmaku, index: number, totalsizeInScreen: number, timer: DanmakuTimer, willHit: boolean, config: DanmakuContext): boolean {
        let filtered: boolean = false;
        if (this.mEnabledPairs != null) {
            let enabledValue = this.mEnabledPairs.get(danmaku.getType());
            filtered = enabledValue != null && enabledValue && willHit;
            if (filtered) {
                danmaku.mFilterParam |= DanmakuFilters.FILTER_TYPE_OVERLAPPING;
            }
        }
        return filtered;
    }
    public setData(data: Map<number, boolean>): void {
        this.mEnabledPairs = data;
    }
    public reset(): void {
        this.mEnabledPairs = null;
    }
}
