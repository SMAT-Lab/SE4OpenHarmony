let __generate__Id: number = 0;
function generateId(): string {
    return "DrawTask_" + ++__generate__Id;
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
import { AbsDisplayer } from '../danmaku/model/AbsDisplayer';
import { BaseDanmaku } from '../danmaku/model/BaseDanmaku';
import { DanmakuTimer } from '../danmaku/model/DanmakuTimer';
import { IDanmakus, Consumer, DefaultConsumer, ST_BY_LIST } from '../danmaku/model/IDanmakus';
import { DanmakuContext, ConfigChangedCallback, DanmakuConfigTag } from '../danmaku/model/ohos/DanmakuContext';
import { Danmakus } from '../danmaku/model/ohos/Danmakus';
import { BaseDanmakuParser, Listener } from '../danmaku/parser/BaseDanmakuParser';
import { IRenderer, RenderingState, OnDanmakuShownListener } from '../danmaku/renderer/IRenderer';
import { DanmakuRenderer } from '../danmaku/renderer/ohos/DanmakuRenderer';
import { IDrawTask, TaskListener } from './IDrawTask';
import DanmakuView from '../ui/widget/DanmakuView';
import { DanmakuFilters } from './DanmakuFilters';
import SystemClock from '../danmaku/util/SystemClock';
let self: DrawTask | any = null;
class Config implements ConfigChangedCallback {
    public onDanmakuConfigChanged(config: DanmakuContext, tag: DanmakuConfigTag, values: any[]): boolean {
        return self.onDanmakuConfigChanged(config, tag, values);
    }
}
;
class OnDanMuKu implements OnDanmakuShownListener {
    private that: any;
    constructor(that: any) {
        this.that = that;
    }
    public onDanmakuShown(danmaku: BaseDanmaku): void {
        if (this.that.mTaskListener != null) {
            this.that.mTaskListener.onDanmakuShown(danmaku);
        }
    }
}
;
class Remove extends DefaultConsumer<BaseDanmaku> {
    private that: any;
    constructor(that: any) {
        super();
        this.that = that;
    }
    public accept(danmaku: BaseDanmaku) {
        if (danmaku.isLive) {
            this.that.onDanmakuRemoved(danmaku);
            return Consumer.ACTION_REMOVE;
        }
        return Consumer.ACTION_CONTINUE;
    }
}
;
class RemoveUnused extends DefaultConsumer<BaseDanmaku> {
    private that: any;
    private msec: number;
    constructor(that: any, msec: number) {
        super();
        this.that = that;
        this.msec = msec;
    }
    startTime: number = SystemClock.uptimeMillis();
    public accept(danmaku: BaseDanmaku): number {
        let isTimeout: boolean = danmaku.isTimeOut();
        if (SystemClock.uptimeMillis() - this.startTime > this.msec) {
            return Consumer.ACTION_BREAK;
        }
        if (isTimeout) {
            this.that.danmakuList.removeItem(danmaku);
            this.that.onDanmakuRemoved(danmaku);
            return Consumer.ACTION_REMOVE;
        }
        else {
            return Consumer.ACTION_BREAK;
        }
    }
}
;
class SubDanMu extends DefaultConsumer<BaseDanmaku> {
    private visibleDanmakus: any;
    constructor(visibleDanmakus: any) {
        super();
        this.visibleDanmakus = visibleDanmakus;
    }
    public accept(danmaku: BaseDanmaku): number {
        if (danmaku.isShown() && !danmaku.isOutside()) {
            this.visibleDanmakus.addItem(danmaku);
        }
        return Consumer.ACTION_CONTINUE;
    }
}
class LoadDanMu implements Listener {
    private that: any;
    constructor(that: any) {
        this.that = that;
    }
    public onDanmakuAdd(danmaku: BaseDanmaku): void {
        if (this.that.mTaskListener != null) {
            this.that.mTaskListener.onDanmakuAdd(danmaku);
        }
    }
}
class Running extends DefaultConsumer<BaseDanmaku> {
    private offsetMills: any;
    constructor(offsetMills: any) {
        super();
        this.offsetMills = offsetMills;
    }
    public accept(danmaku: BaseDanmaku): number {
        if (danmaku.isOutside()) {
            return Consumer.ACTION_REMOVE;
        }
        danmaku.setTimeOffset(this.offsetMills + danmaku.timeOffset);
        if (danmaku.timeOffset == 0) {
            return Consumer.ACTION_REMOVE;
        }
        return Consumer.ACTION_CONTINUE;
    }
}
export class DrawTask implements IDrawTask {
    protected mContext: DanmakuContext;
    protected mDisp: AbsDisplayer<CanvasRenderingContext2D, string>;
    protected danmakuList: IDanmakus | any = null;
    protected mParser: BaseDanmakuParser | any;
    mTaskListener: TaskListener;
    mRenderer: IRenderer | any = null;
    mTimer: DanmakuTimer | any;
    private danmakus: IDanmakus = new Danmakus({ sortType: ST_BY_LIST });
    protected clearRetainerFlag: boolean = false;
    private mStartRenderTime: number = 0;
    private mRenderingState: RenderingState = new RenderingState();
    protected mReadyState: boolean = false;
    private mLastBeginMills: number = 0;
    private mLastEndMills: number = 0;
    protected mPlayState: number = 0;
    private mIsHidden: boolean = false;
    private mLastDanmaku: BaseDanmaku | any;
    private mLiveDanmakus: Danmakus = new Danmakus({ sortType: ST_BY_LIST });
    private mRunningDanmakus: IDanmakus | any;
    private mRequestRender: boolean = false;
    private mConfigChangedCallback: ConfigChangedCallback = new Config();
    public constructor(timer: DanmakuTimer, context: DanmakuContext, taskListener: TaskListener) {
        if (context == null) {
            throw new Error("context is null");
        }
        self = this;
        this.mContext = context;
        this.mDisp = context.getDisplayer();
        this.mTaskListener = taskListener;
        this.mRenderer = new DanmakuRenderer(context);
        let that = this;
        this.mRenderer.setOnDanmakuShownListener(new OnDanMuKu(that));
        this.mRenderer.setVerifierEnabled(this.mContext.isPreventOverlappingEnabled() || this.mContext.isMaxLinesLimited());
        this.initTimer(timer);
        let enable: boolean = this.mContext.isDuplicateMergingEnabled();
        if (enable) {
            this.mContext.mDanmakuFilters.registerFilter({ tag: DanmakuFilters.TAG_DUPLICATE_FILTER });
        }
        else {
            this.mContext.mDanmakuFilters.unregisterFilter({ tag: DanmakuFilters.TAG_DUPLICATE_FILTER });
        }
    }
    protected initTimer(timer: DanmakuTimer): void {
        this.mTimer = timer;
    }
    public addDanmaku(item: BaseDanmaku): void {
        if (this.danmakuList === null)
            return;
        if (item.isLive) {
            this.mLiveDanmakus.addItem(item);
            this.removeUnusedLiveDanmakusIn(10);
        }
        item.index = this.danmakuList.size();
        let subAdded: boolean = true;
        if (this.mLastBeginMills <= item.getActualTime() && item.getActualTime() <= this.mLastEndMills) {
            subAdded = this.danmakus.addItem(item);
        }
        else if (item.isLive) {
            subAdded = false;
        }
        let added: boolean = false;
        added = this.danmakuList.addItem(item);
        if (!subAdded || !added) {
            this.mLastBeginMills = this.mLastEndMills = 0;
        }
        if (added && this.mTaskListener != null) {
            this.mTaskListener.onDanmakuAdd(item);
        }
        if (this.mLastDanmaku == null || (item != null && this.mLastDanmaku != null && item.getActualTime() > this.mLastDanmaku.getActualTime())) {
            this.mLastDanmaku = item;
        }
    }
    public invalidateDanmaku(item: BaseDanmaku, remeasure: boolean): void {
        this.mContext.getDisplayer().getCacheStuffer().clearCache(item);
        item.requestFlags |= BaseDanmaku.FLAG_REQUEST_INVALIDATE;
        if (remeasure) {
            item.paintWidth = -1;
            item.paintHeight = -1;
            item.requestFlags |= BaseDanmaku.FLAG_REQUEST_REMEASURE;
            item.measureResetFlag++;
        }
    }
    public removeAllDanmakus(isClearDanmakusOnScreen: boolean): void {
        if (this.danmakuList === null || this.danmakuList.isEmpty())
            return;
        if (!isClearDanmakusOnScreen) {
            let beginMills: number = this.mTimer.currMillisecond - this.mContext.mDanmakuFactory.MAX_DANMAKU_DURATION - 100;
            let endMills: number = this.mTimer.currMillisecond + this.mContext.mDanmakuFactory.MAX_DANMAKU_DURATION;
            let tempDanmakus: IDanmakus = this.danmakuList.subnew(beginMills, endMills);
            if (tempDanmakus !== null)
                this.danmakus = tempDanmakus;
        }
        this.danmakuList.clear();
    }
    protected onDanmakuRemoved(danmaku: BaseDanmaku): void {
        // override by CacheManagingDrawTask
    }
    public removeAllLiveDanmakus(): void {
        if (this.danmakus === null || this.danmakus.isEmpty()) {
            return;
        }
        let that = this;
        this.danmakus.forEachSync(new Remove(that));
    }
    protected removeUnusedLiveDanmakusIn(msec: number): void {
        if (this.danmakuList == null || this.danmakuList.isEmpty() || this.mLiveDanmakus.isEmpty()) {
            return;
        }
        let that = this;
        this.mLiveDanmakus.forEachSync(new RemoveUnused(that, msec));
    }
    public getVisibleDanmakusOnTime(time: number): IDanmakus {
        let beginMills: number = time - this.mContext.mDanmakuFactory.MAX_DANMAKU_DURATION - 100;
        let endMills: number = time + this.mContext.mDanmakuFactory.MAX_DANMAKU_DURATION;
        let subDanmakus: IDanmakus | any = null;
        let i: number = 0;
        while (i++ < 3) { //avoid ConcurrentModificationException
            try {
                subDanmakus = this.danmakuList.subnew(beginMills, endMills);
                break;
            }
            catch (e) {
            }
        }
        let visibleDanmakus: IDanmakus = new Danmakus({});
        if (null != subDanmakus && !subDanmakus.isEmpty()) {
            subDanmakus.forEachSync(new SubDanMu(visibleDanmakus));
        }
        return visibleDanmakus;
    }
    public draw(displayer: AbsDisplayer<CanvasRenderingContext2D, string>): RenderingState {
        return this.drawDanmakus(displayer, this.mTimer);
    }
    public reset(): void {
        if (this.danmakus !== null)
            this.danmakus = new Danmakus({});
        if (this.mRenderer !== null)
            this.mRenderer.clear();
    }
    public seek(mills: number): void {
        this.reset();
        this.mContext.mGlobalFlagValues.updateVisibleFlag();
        this.mContext.mGlobalFlagValues.updateFirstShownFlag();
        this.mContext.mGlobalFlagValues.updateSyncOffsetTimeFlag();
        this.mContext.mGlobalFlagValues.updatePrepareFlag();
        this.mRunningDanmakus = new Danmakus({ sortType: ST_BY_LIST });
        this.mStartRenderTime = mills < 1000 ? 0 : mills;
        this.mRenderingState.reset();
        this.mRenderingState.endTime = this.mStartRenderTime;
        this.mLastBeginMills = this.mLastEndMills = 0;
        if (this.danmakuList !== null) {
            let last: BaseDanmaku = this.danmakuList.last();
            if (last != null && !last.isTimeOut()) {
                this.mLastDanmaku = last;
            }
        }
    }
    public clearDanmakusOnScreen(currMillis: number): void {
        this.reset();
        this.mContext.mGlobalFlagValues.updateVisibleFlag();
        this.mContext.mGlobalFlagValues.updateFirstShownFlag();
        this.mStartRenderTime = currMillis;
    }
    public start(): void {
        this.mContext.registerConfigChangedCallback(this.mConfigChangedCallback);
    }
    public quit(): void {
        this.mContext.unregisterAllConfigChangedCallbacks();
        if (this.mRenderer != null) {
            this.mRenderer.release();
        }
    }
    public prepare(): void {
        if (this.mParser == null) {
            return;
        }
        this.loadDanmakus(this.mParser);
        this.mLastBeginMills = this.mLastEndMills = 0;
        if (this.mTaskListener != null) {
            this.mTaskListener.ready();
            this.mReadyState = true;
        }
    }
    public onPlayStateChanged(state: number): void {
        this.mPlayState = state;
    }
    protected loadDanmakus(parser: BaseDanmakuParser): void {
        let that = this;
        this.danmakuList = parser.setConfig(this.mContext)
            .setDisplayer(this.mDisp)
            .setTimer(this.mTimer)
            .setListener(new LoadDanMu(that))
            .getDanmakus();
        that.mContext.mGlobalFlagValues.resetAll();
        if (that.danmakuList != null) {
            that.mLastDanmaku = that.danmakuList.last();
        }
    }
    public setParser(parser: BaseDanmakuParser): void {
        this.mParser = parser;
        this.mReadyState = false;
    }
    protected drawDanmakus(disp: AbsDisplayer<CanvasRenderingContext2D, string>, timer: DanmakuTimer): RenderingState | any {
        if (this.clearRetainerFlag) {
            this.mRenderer.clearRetainer();
            this.clearRetainerFlag = false;
        }
        if (this.danmakuList != null) {
            let canvas: CanvasRenderingContext2D = disp.getExtraData() as CanvasRenderingContext2D;
            //DrawHelper.clearCanvas(canvas);
            if (this.mIsHidden && !this.mRequestRender) {
                return this.mRenderingState;
            }
            this.mRequestRender = false;
            let renderingState: RenderingState = this.mRenderingState;
            // prepare screenDanmakus
            let beginMills: number = timer.currMillisecond - this.mContext.mDanmakuFactory.MAX_DANMAKU_DURATION - 100;
            let endMills: number = timer.currMillisecond + this.mContext.mDanmakuFactory.MAX_DANMAKU_DURATION;
            let screenDanmakus: IDanmakus = this.danmakus;
            if (this.mLastBeginMills > beginMills || timer.currMillisecond > this.mLastEndMills) {
                screenDanmakus = this.danmakuList.sub(beginMills, endMills);
                if (screenDanmakus != null) {
                    this.danmakus = screenDanmakus;
                }
                this.mLastBeginMills = beginMills;
                this.mLastEndMills = endMills;
            }
            else {
                beginMills = this.mLastBeginMills;
                endMills = this.mLastEndMills;
            }
            // prepare runningDanmakus to draw (in sync-mode)
            let runningDanmakus: IDanmakus = this.mRunningDanmakus;
            this.beginTracing(renderingState, runningDanmakus, screenDanmakus);
            if (runningDanmakus != null && !runningDanmakus.isEmpty()) {
                this.mRenderingState.isRunningDanmakus = true;
                this.mRenderer.draw(disp, runningDanmakus, 0, this.mRenderingState);
            }
            // draw screenDanmakus
            this.mRenderingState.isRunningDanmakus = false;
            if (screenDanmakus != null && !screenDanmakus.isEmpty()) {
                this.mRenderer.draw(this.mDisp, screenDanmakus, this.mStartRenderTime, renderingState);
                this.endTracing(renderingState);
                if (renderingState.nothingRendered) {
                    if (this.mLastDanmaku != null && this.mLastDanmaku.isTimeOut()) {
                        this.mLastDanmaku = null;
                        if (this.mTaskListener != null) {
                            this.mTaskListener.onDanmakusDrawingFinished();
                        }
                    }
                    if (renderingState.beginTime == RenderingState.UNKNOWN_TIME) {
                        renderingState.beginTime = beginMills;
                    }
                    if (renderingState.endTime == RenderingState.UNKNOWN_TIME) {
                        renderingState.endTime = endMills;
                    }
                }
                return renderingState;
            }
            else {
                renderingState.nothingRendered = true;
                renderingState.beginTime = beginMills;
                renderingState.endTime = endMills;
                return renderingState;
            }
        }
        return null;
    }
    public requestClear(): void {
        this.mLastBeginMills = this.mLastEndMills = 0;
        this.mIsHidden = false;
    }
    public requestClearRetainer(): void {
        this.clearRetainerFlag = true;
    }
    public requestSync(fromTimeMills: number, toTimeMills: number, offsetMills: number): void {
        // obtain the running-danmakus which was drawn on screen
        let runningDanmakus: IDanmakus = this.mRenderingState.obtainRunningDanmakus();
        this.mRunningDanmakus = runningDanmakus;
        // set offset time for each running-danmakus
        runningDanmakus.forEachSync(new Running(offsetMills));
        this.mStartRenderTime = toTimeMills;
    }
    public onDanmakuConfigChanged(config: DanmakuContext, tag: DanmakuConfigTag, values: any[]): boolean {
        let handled: boolean = this.handleOnDanmakuConfigChanged(config, tag, values);
        if (this.mTaskListener != null) {
            this.mTaskListener.onDanmakuConfigChanged();
        }
        return handled;
    }
    protected handleOnDanmakuConfigChanged(config: DanmakuContext, tag: DanmakuConfigTag, values: any[]): boolean {
        let handled: boolean = false;
        if (tag === null || DanmakuConfigTag.MAXIMUM_NUMS_IN_SCREEN === tag) {
            handled = true;
        }
        else if (DanmakuConfigTag.DUPLICATE_MERGING_ENABLED === tag) {
            let enable: boolean = values[0] as boolean;
            if (enable) {
                this.mContext.mDanmakuFilters.registerFilter({ tag: DanmakuFilters.TAG_DUPLICATE_FILTER });
            }
            else {
                this.mContext.mDanmakuFilters.unregisterFilter({ tag: DanmakuFilters.TAG_DUPLICATE_FILTER });
            }
            handled = true;
        }
        else if (DanmakuConfigTag.SCALE_TEXTSIZE === tag || DanmakuConfigTag.SCROLL_SPEED_FACTOR === tag || DanmakuConfigTag.DANMAKU_MARGIN === tag) {
            this.requestClearRetainer();
            handled = false;
        }
        else if (DanmakuConfigTag.MAXIMUN_LINES === tag || DanmakuConfigTag.OVERLAPPING_ENABLE === tag) {
            if (this.mRenderer != null) {
                this.mRenderer.setVerifierEnabled(this.mContext.isPreventOverlappingEnabled() || this.mContext.isMaxLinesLimited());
            }
            handled = true;
        }
        else if (DanmakuConfigTag.ALIGN_BOTTOM === tag) {
            let enable: boolean = values[0] as boolean;
            if (this.mRenderer != null) {
                this.mRenderer.alignBottom(enable);
            }
            handled = true;
        }
        return handled;
    }
    public requestHide(): void {
        this.mIsHidden = true;
    }
    public requestRender(): void {
        this.mRequestRender = true;
    }
    private beginTracing(renderingState: RenderingState, runningDanmakus: IDanmakus, screenDanmakus: IDanmakus): void {
        renderingState.reset();
        renderingState.timer.update(SystemClock.uptimeMillis());
        renderingState.indexInScreen = 0;
        renderingState.totalSizeInScreen = (runningDanmakus != null ? runningDanmakus.size() : 0) + (screenDanmakus != null ? screenDanmakus.size() : 0);
    }
    private endTracing(renderingState: RenderingState): void {
        renderingState.nothingRendered = (renderingState.totalDanmakuCount == 0);
        if (renderingState.nothingRendered) {
            renderingState.beginTime = RenderingState.UNKNOWN_TIME;
        }
        let lastDanmaku: BaseDanmaku = renderingState.lastDanmaku;
        renderingState.lastDanmaku = null;
        renderingState.endTime = lastDanmaku != null ? lastDanmaku.getActualTime() : RenderingState.UNKNOWN_TIME;
        renderingState.consumingTime = renderingState.timer.update(SystemClock.uptimeMillis());
    }
}
