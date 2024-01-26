let __generate__Id: number = 0;
function generateId(): string {
    return "DrawHandler_" + ++__generate__Id;
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
import { Handler, Message } from '../../../../compat/Handler';
import { IDrawTask, TaskListener, PLAY_STATE_PAUSE, PLAY_STATE_PLAYING } from './IDrawTask';
import { AbsDanmakuSync } from '../danmaku/model/AbsDanmakuSync';
import { BaseDanmaku } from '../danmaku/model/BaseDanmaku';
import { DanmakuTimer } from '../danmaku/model/DanmakuTimer';
import { IDanmakus } from '../danmaku/model/IDanmakus';
import { IDisplayer } from '../danmaku/model/IDisplayer';
import { AbsDisplayer } from '../danmaku/model/AbsDisplayer';
import { DanmakuContext } from '../danmaku/model/ohos/DanmakuContext';
import { BaseDanmakuParser } from '../danmaku/parser/BaseDanmakuParser';
import { IRenderer, RenderingState } from '../danmaku/renderer/IRenderer';
import SystemClock from '../danmaku/util/SystemClock';
import DanmakuView from '../ui/widget/DanmakuView';
import { IDanmakuViewController } from './IDanmakuViewController';
import { DrawTask } from './DrawTask';
class Task implements TaskListener {
    private that: any;
    private runnable: any;
    constructor(that: any, runnable: any) {
        this.that = that;
        this.runnable = runnable;
    }
    public ready(): void {
        this.that.initRenderingConfigs();
        this.runnable();
    }
    public onDanmakuAdd(danmaku: BaseDanmaku): void {
        if (danmaku.isTimeOut()) {
            return;
        }
        let delay: number = danmaku.getActualTime() - this.that.getCurrentTime();
        if (delay < this.that.mContext.mDanmakuFactory.MAX_DANMAKU_DURATION && (this.that.mInWaitingState || this.that.mRenderingState.nothingRendered)) {
            this.that.notifyRendering();
        }
        else if (delay > 0 && delay <= this.that.mContext.mDanmakuFactory.MAX_DANMAKU_DURATION) {
            this.that.sendEmptyMessageDelayed(NOTIFY_RENDERING, delay);
        }
    }
    public onDanmakuShown(danmaku: BaseDanmaku): void {
        if (this.that.mCallback != null) {
            this.that.mCallback.danmakuShown(danmaku);
        }
    }
    public onDanmakusDrawingFinished(): void {
        if (this.that.mCallback != null) {
            this.that.mCallback.drawingFinished();
        }
    }
    public onDanmakuConfigChanged(): void {
        this.that.redrawIfNeeded();
    }
}
export const START: number = 1;
const UPDATE: number = 2;
const RESUME: number = 3;
const SEEK_POS: number = 4;
const PREPARE: number = 5;
const QUIT: number = 6;
const PAUSE: number = 7;
const SHOW_DANMAKUS: number = 8;
const HIDE_DANMAKUS: number = 9;
const NOTIFY_DISP_SIZE_CHANGED: number = 10;
const NOTIFY_RENDERING: number = 11;
const UPDATE_WHEN_PAUSED: number = 12;
const CLEAR_DANMAKUS_ON_SCREEN: number = 13;
const FORCE_RENDER: number = 14;
const INDEFINITE_TIME: number = 10000000;
const MAX_RECORD_SIZE: number = 500;
export class DrawHandler extends Handler {
    private mContext: DanmakuContext | any;
    private pausedPosition: number = 0;
    private quitFlag: boolean = true;
    private mTimeBase: number = 0;
    private mReady: boolean = true;
    private mCallback: Callback | any;
    private timer: DanmakuTimer = new DanmakuTimer();
    private mParser: BaseDanmakuParser | any;
    public drawTask: IDrawTask | any;
    private mDanmakuView: IDanmakuViewController | any;
    private mDanmakusVisible: boolean = true;
    private mDisp: AbsDisplayer<CanvasRenderingContext2D, string> | any;
    private mRenderingState: RenderingState = new RenderingState();
    private mDrawTimes: Array<number> = [];
    private mCordonTime: number = 30;
    private mCordonTime2: number = 60;
    private mFrameUpdateRate: number = 16;
    private mThresholdTime: number = 0;
    private mLastDeltaTime: number = 0;
    private mInSeekingAction: boolean = true;
    private mDesireSeekingTime: number = 0;
    private mRemainingTime: number = 0;
    private mInSyncAction: boolean = false;
    private mInWaitingState: boolean = false;
    private mNonBlockModeEnable: boolean = false;
    constructor(view: IDanmakuViewController, danmakuVisibile: boolean) {
        super();
        this.bindView(view);
        if (danmakuVisibile) {
            this.showDanmakus(null);
        }
        else {
            this.hideDanmakus(false);
        }
        this.mDanmakusVisible = danmakuVisibile;
    }
    private bindView(view: IDanmakuViewController) {
        this.mDanmakuView = view;
    }
    public enableNonBlockMode(enable: boolean): void {
        this.mNonBlockModeEnable = enable;
    }
    public setConfig(config: DanmakuContext): void {
        this.mContext = config;
    }
    public setParser(parser: BaseDanmakuParser) {
        this.mParser = parser;
        let timer: DanmakuTimer = parser.getTimer();
        if (timer != null) {
            this.timer = timer;
        }
    }
    public setCallback(cb: Callback): void {
        this.mCallback = cb;
    }
    public quit(): void {
        this.quitFlag = true;
        this.sendEmptyMessage(QUIT);
    }
    public isStop(): boolean {
        return this.quitFlag;
    }
    public handleMessage(msg: Message): void {
        let what: number = msg.what;
        switch (what) {
            case PREPARE:
                this.mTimeBase = SystemClock.uptimeMillis();
                if (this.mParser == null || !this.mDanmakuView.isViewReady()) {
                    this.sendEmptyMessageDelayed(PREPARE, 100);
                }
                else {
                    this.prepareInner(() => {
                        this.pausedPosition = 0;
                        this.mReady = true;
                        if (this.mCallback) {
                            this.mCallback.prepared();
                        }
                    });
                }
                break;
            case SHOW_DANMAKUS:
                this.mDanmakusVisible = true;
                let start: number = msg.obj as number;
                let resume: boolean = false;
                if (this.drawTask != null) {
                    if (start === null) {
                        this.timer.update(this.getCurrentTime());
                        this.drawTask.requestClear();
                    }
                    else {
                        this.drawTask.start();
                        this.drawTask.seek(start);
                        this.drawTask.requestClear();
                        resume = true;
                    }
                }
                if (this.quitFlag && this.mDanmakuView != null) {
                    this.mDanmakuView.drawDanmakus();
                }
                this.notifyRendering();
                if (!resume) {
                    break;
                }
            case START:
                let startTime: number = msg.obj as number;
                if (startTime != null) {
                    this.pausedPosition = startTime;
                }
                else {
                    this.pausedPosition = 0;
                }
            case SEEK_POS:
                if (what == SEEK_POS) {
                    this.quitFlag = true;
                    let position: number = msg.obj as number;
                    let deltaMs: number = position - this.timer.currMillisecond;
                    this.mTimeBase -= deltaMs;
                    this.timer.update(position);
                    this.mContext.mGlobalFlagValues.updateMeasureFlag();
                    if (this.drawTask != null)
                        this.drawTask.seek(position);
                    this.pausedPosition = position;
                }
            case RESUME:
                this.removeMessages(PAUSE);
                this.quitFlag = false;
                if (this.mReady) {
                    this.mRenderingState.reset();
                    this.mDrawTimes.length = 0;
                    this.mTimeBase = SystemClock.uptimeMillis() - this.pausedPosition;
                    this.timer.update(this.pausedPosition);
                    this.removeMessages(RESUME);
                    this.sendEmptyMessage(UPDATE);
                    this.drawTask.start();
                    this.notifyRendering();
                    this.mInSeekingAction = false;
                    if (this.drawTask != null) {
                        this.drawTask.onPlayStateChanged(PLAY_STATE_PLAYING);
                    }
                }
                else {
                    this.sendEmptyMessageDelayed(RESUME, 100);
                }
                break;
            case UPDATE:
                this.updateInCurrentThread();
                break;
            case NOTIFY_DISP_SIZE_CHANGED:
                this.mContext.mDanmakuFactory.notifyDispSizeChanged(this.mContext);
                let updateFlag: boolean = msg.obj as boolean;
                if (updateFlag != null && updateFlag) {
                    this.mContext.mGlobalFlagValues.updateMeasureFlag();
                    this.mContext.mGlobalFlagValues.updateVisibleFlag();
                    this.drawTask.requestClearRetainer();
                }
                break;
            case HIDE_DANMAKUS:
                this.mDanmakusVisible = false;
                if (this.mDanmakuView != null) {
                    this.mDanmakuView.clear();
                }
                if (this.drawTask != null) {
                    this.drawTask.requestClear();
                    this.drawTask.requestHide();
                }
                let quitDrawTask: boolean = msg.obj as boolean;
                if (quitDrawTask && this.drawTask != null) {
                    this.drawTask.quit();
                }
                if (!quitDrawTask) {
                    break;
                }
            case PAUSE:
                this.removeMessages(RESUME);
                this.removeMessages(UPDATE);
                if (this.drawTask != null) {
                    this.drawTask.onPlayStateChanged(PLAY_STATE_PAUSE);
                }
            case QUIT:
                if (what == QUIT) {
                    this.removeCallbacksAndMessages();
                }
                this.quitFlag = true;
                this.syncTimerIfNeeded();
                this.pausedPosition = this.timer.currMillisecond;
                if (what == QUIT) {
                    if (this.drawTask != null) {
                        this.drawTask.quit();
                    }
                    if (this.mParser != null) {
                        this.mParser.release();
                    }
                }
                break;
            case NOTIFY_RENDERING:
                this.notifyRendering();
                break;
            case UPDATE_WHEN_PAUSED:
                if (this.quitFlag && this.mDanmakuView != null) {
                    this.drawTask.requestClear();
                    this.mDanmakuView.drawDanmakus();
                    this.notifyRendering();
                }
                break;
            case CLEAR_DANMAKUS_ON_SCREEN:
                if (this.drawTask != null) {
                    this.drawTask.clearDanmakusOnScreen(this.getCurrentTime());
                }
                break;
            case FORCE_RENDER:
                if (this.drawTask != null) {
                    this.drawTask.requestRender();
                }
                break;
        }
    }
    private updateInCurrentThread(): void {
        if (this.quitFlag) {
            return;
        }
        let startMS: number = SystemClock.uptimeMillis();
        let d: number = this.syncTimer(startMS);
        if (d < 0 && !this.mNonBlockModeEnable) {
            this.removeMessages(UPDATE);
            this.sendEmptyMessageDelayed(UPDATE, 60 - d);
            return;
        }
        d = this.mDanmakuView.drawDanmakus();
        this.removeMessages(UPDATE);
        if (d > this.mCordonTime2) { // this situation may be cased by ui-thread waiting of DanmakuView, so we sync-timer at once
            this.timer.add(d);
            this.mDrawTimes.length = 0;
        }
        if (!this.mDanmakusVisible) {
            this.waitRendering(INDEFINITE_TIME);
            return;
        }
        else if (this.mRenderingState.nothingRendered) {
            let dTime: number = this.mRenderingState.endTime - this.timer.currMillisecond;
            if (dTime > 500) {
                this.waitRendering(dTime - 10);
                return;
            }
        }
        if (d < this.mFrameUpdateRate) {
            let date: Date = new Date();
            this.sendEmptyMessageDelayed(UPDATE, this.mFrameUpdateRate - d);
            return;
        }
        this.sendEmptyMessage(UPDATE);
    }
    private syncTimer(startMS: number): number {
        if (this.mInSeekingAction || this.mInSyncAction) {
            return 0;
        }
        this.mInSyncAction = true;
        let d: number = 0;
        let time: number = startMS - this.mTimeBase;
        if (this.mNonBlockModeEnable) {
            if (this.mCallback != null) {
                this.mCallback.updateTimer(this.timer);
                d = this.timer.getLastInterval();
            }
        }
        else if (!this.mDanmakusVisible || this.mRenderingState.nothingRendered || this.mInWaitingState) {
            this.timer.update(time);
            this.mRemainingTime = 0;
            if (this.mCallback != null) {
                this.mCallback.updateTimer(this.timer);
            }
        }
        else {
            let gapTime: number = time - this.timer.currMillisecond;
            let averageTime: number = Math.max(this.mFrameUpdateRate, this.getAverageRenderingTime());
            if (gapTime > 2000 || this.mRenderingState.consumingTime > this.mCordonTime || averageTime > this.mCordonTime) {
                d = gapTime;
                gapTime = 0;
            }
            else {
                d = averageTime + gapTime / this.mFrameUpdateRate;
                d = Math.max(this.mFrameUpdateRate, d);
                d = Math.min(this.mCordonTime, d);
                let a: number = d - this.mLastDeltaTime;
                if (a > 3 && a < 8 && this.mLastDeltaTime >= this.mFrameUpdateRate && this.mLastDeltaTime <= this.mCordonTime) {
                    d = this.mLastDeltaTime;
                }
                gapTime -= d;
                this.mLastDeltaTime = d;
            }
            this.mRemainingTime = gapTime;
            this.timer.add(d);
            if (this.mCallback != null) {
                this.mCallback.updateTimer(this.timer);
            }
        }
        this.mInSyncAction = false;
        return d;
    }
    private syncTimerIfNeeded(): void {
        if (this.mInWaitingState) {
            this.syncTimer(SystemClock.uptimeMillis());
        }
    }
    private initRenderingConfigs(): void {
        let averageFrameConsumingTime: number = 16;
        this.mCordonTime = Math.max(33, Math.floor(averageFrameConsumingTime * 2.5));
        this.mCordonTime2 = Math.floor(this.mCordonTime * 2.5);
        this.mFrameUpdateRate = Math.max(16, averageFrameConsumingTime / 15 * 15);
        this.mThresholdTime = this.mFrameUpdateRate + 3;
    }
    private prepareInner(runnable: () => void): void {
        if (this.drawTask == null) {
            let that = this;
            this.drawTask = this.createDrawTask(this.timer, this.mDanmakuView.getViewWidth(), this.mDanmakuView.getViewHeight(), new Task(that, runnable));
        }
        else {
            runnable();
        }
    }
    public isPrepared(): boolean {
        return this.mReady;
    }
    private createDrawTask(timer: DanmakuTimer, width: number, height: number, taskListener: TaskListener): IDrawTask {
        this.mDisp = this.mContext.getDisplayer();
        this.mDisp.setSize(width, height);
        this.mDisp.resetSlopPixel(this.mContext.scaleTextSize);
        let task: IDrawTask = new DrawTask(timer, this.mContext, taskListener);
        task.setParser(this.mParser);
        task.prepare();
        this.sendMessage(new Message({ what: NOTIFY_DISP_SIZE_CHANGED, obj: false }));
        return task;
    }
    public seekTo(ms: number): void {
        this.mInSeekingAction = true;
        this.mDesireSeekingTime = ms;
        this.removeMessages(UPDATE);
        this.removeMessages(RESUME);
        this.removeMessages(SEEK_POS);
        this.sendMessage(new Message({ what: SEEK_POS, obj: ms }));
    }
    public addDanmaku(item: BaseDanmaku): void {
        if (this.drawTask != null) {
            item.flags = this.mContext.mGlobalFlagValues;
            item.setTimer(this.timer);
            this.drawTask.addDanmaku(item);
            this.sendEmptyMessage(NOTIFY_RENDERING);
        }
    }
    public invalidateDanmaku(item: BaseDanmaku, remeasure: boolean): void {
        if (this.drawTask != null && item != null) {
            this.drawTask.invalidateDanmaku(item, remeasure);
        }
        this.redrawIfNeeded();
    }
    public resume(): void {
        this.removeMessages(PAUSE);
        this.sendEmptyMessage(RESUME);
    }
    public prepare(): void {
        this.mReady = false;
        this.sendEmptyMessage(PREPARE);
    }
    public pause(): void {
        this.removeMessages(RESUME);
        this.syncTimerIfNeeded();
        this.sendEmptyMessage(PAUSE);
    }
    public showDanmakus(position: number | any): void {
        if (this.mDanmakusVisible)
            return;
        this.mDanmakusVisible = true;
        this.removeMessages(SHOW_DANMAKUS);
        this.removeMessages(HIDE_DANMAKUS);
        this.sendMessage(new Message({ what: SHOW_DANMAKUS, obj: position }));
    }
    public hideDanmakus(quitDrawTask: boolean): number {
        if (!this.mDanmakusVisible) {
            return this.timer.currMillisecond;
        }
        this.mDanmakusVisible = false;
        this.removeMessages(SHOW_DANMAKUS);
        this.removeMessages(HIDE_DANMAKUS);
        this.sendMessage(new Message({ what: HIDE_DANMAKUS, obj: quitDrawTask }));
        return this.timer.currMillisecond;
    }
    public forceRender(): void {
        this.removeMessages(FORCE_RENDER);
        this.sendEmptyMessage(FORCE_RENDER);
    }
    public getVisibility(): boolean {
        return this.mDanmakusVisible;
    }
    public draw(canvas: CanvasRenderingContext2D): RenderingState {
        if (this.drawTask == null)
            return this.mRenderingState;
        if (!this.mInWaitingState) {
            let danmakuSync: AbsDanmakuSync = this.mContext.danmakuSync;
            if (danmakuSync != null) {
                do {
                    let isSyncPlayingState: boolean = danmakuSync.isSyncPlayingState();
                    if (!isSyncPlayingState && this.quitFlag) {
                        break;
                    }
                    let syncState: number = danmakuSync.getSyncState();
                    if (syncState == AbsDanmakuSync.SYNC_STATE_PLAYING) {
                        let fromTime: number = this.timer.currMillisecond;
                        let toTime: number = danmakuSync.getUptimeMillis();
                        let offset: number = toTime - fromTime;
                        if (Math.abs(offset) > danmakuSync.getThresholdTimeMills()) {
                            if (isSyncPlayingState && this.quitFlag) {
                                this.resume();
                            }
                            this.drawTask.requestSync(fromTime, toTime, offset);
                            this.timer.update(toTime);
                            this.mTimeBase -= offset;
                            this.mRemainingTime = 0;
                        }
                    }
                    else if (syncState == AbsDanmakuSync.SYNC_STATE_HALT) {
                        if (isSyncPlayingState && !this.quitFlag) {
                            this.pause();
                        }
                    }
                } while (false);
            }
        }
        this.mDisp.setExtraData(canvas);
        this.mRenderingState.set(this.drawTask.draw(this.mDisp));
        this.recordRenderingTime();
        return this.mRenderingState;
    }
    private redrawIfNeeded(): void {
        if (this.quitFlag && this.mDanmakusVisible) {
            this.removeMessages(UPDATE_WHEN_PAUSED);
            this.sendEmptyMessageDelayed(UPDATE_WHEN_PAUSED, 100);
        }
    }
    private notifyRendering(): void {
        if (!this.mInWaitingState) {
            return;
        }
        if (this.drawTask != null) {
            this.drawTask.requestClear();
        }
        this.mDrawTimes.length = 0;
        this.removeMessages(UPDATE);
        this.sendEmptyMessage(UPDATE);
        this.mInWaitingState = false;
    }
    private waitRendering(dTime: number): void {
        if (this.isStop() || !this.isPrepared() || this.mInSeekingAction) {
            return;
        }
        this.mRenderingState.sysTime = SystemClock.uptimeMillis();
        this.mInWaitingState = true;
        if (dTime == INDEFINITE_TIME) {
            this.removeMessages(NOTIFY_RENDERING);
            this.removeMessages(UPDATE);
        }
        else {
            this.removeMessages(NOTIFY_RENDERING);
            this.removeMessages(UPDATE);
            this.sendEmptyMessageDelayed(NOTIFY_RENDERING, dTime);
        }
    }
    private getAverageRenderingTime(): number {
        let frames: number = this.mDrawTimes.length;
        if (frames <= 0)
            return 0;
        let first: number = this.mDrawTimes[0];
        let last: number = this.mDrawTimes[this.mDrawTimes.length - 1];
        let dtime: number = last - first;
        return dtime / frames;
    }
    private recordRenderingTime(): void {
        let lastTime: number = SystemClock.uptimeMillis();
        this.mDrawTimes.push(lastTime);
        let frames = this.mDrawTimes.length;
        if (frames > MAX_RECORD_SIZE) {
            this.mDrawTimes.shift();
            frames = MAX_RECORD_SIZE;
        }
    }
    public getDisplayer(): IDisplayer {
        return this.mDisp;
    }
    public notifyDispSizeChanged(width: number, height: number): void {
        if (this.mDisp == null) {
            return;
        }
        if (this.mDisp.getWidth() != width || this.mDisp.getHeight() != height) {
            this.mDisp.setSize(width, height);
            this.sendMessage(new Message({ what: NOTIFY_DISP_SIZE_CHANGED, obj: true }));
        }
    }
    public removeAllDanmakus(isClearDanmakusOnScreen: boolean): void {
        if (this.drawTask != null) {
            this.drawTask.removeAllDanmakus(isClearDanmakusOnScreen);
        }
    }
    public removeAllLiveDanmakus(): void {
        if (this.drawTask != null) {
            this.drawTask.removeAllLiveDanmakus();
        }
    }
    public getCurrentVisibleDanmakus(): IDanmakus | any {
        if (this.drawTask != null) {
            return this.drawTask.getVisibleDanmakusOnTime(this.getCurrentTime());
        }
        return null;
    }
    public getCurrentTime(): number {
        if (!this.mReady) {
            return 0;
        }
        if (this.mInSeekingAction) {
            return this.mDesireSeekingTime;
        }
        if (this.quitFlag || !this.mInWaitingState) {
            return this.timer.currMillisecond - this.mRemainingTime;
        }
        return SystemClock.uptimeMillis() - this.mTimeBase;
    }
    public clearDanmakusOnScreen(): void {
        this.sendEmptyMessage(CLEAR_DANMAKUS_ON_SCREEN);
    }
    public getConfig(): DanmakuContext {
        return this.mContext;
    }
}
export interface Callback {
    prepared(): void;
    updateTimer(timer: DanmakuTimer): void;
    danmakuShown(danmaku: BaseDanmaku): void;
    drawingFinished(): void;
}
