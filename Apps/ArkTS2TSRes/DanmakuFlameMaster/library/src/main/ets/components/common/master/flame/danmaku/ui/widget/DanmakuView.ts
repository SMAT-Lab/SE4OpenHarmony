interface DanmakuView_Params {
    refreshGeneration?: number;
    model?: DanmakuView.Model;
    settings?: RenderingContextSettings;
    context?: CanvasRenderingContext2D;
    ready?: boolean;
    viewWidth?: number;
    viewHeight?: number;
    mCallback?: Callback | ESObject;
    handler?: DrawHandler | ESObject;
    mOnDanmakuClickListener?: OnDanmakuClickListener | ESObject;
    mXOff?: number;
    mYOff?: number;
    mTouchHelper?: DanmakuTouchHelper | ESObject;
    mShowFps?: boolean;
    mDanmakuVisible?: boolean;
    mDrawingThreadType?: number;
    mRequestRender?: boolean;
    mDrawTimes?: number[] | ESObject;
    mClearFlag?: boolean;
    mResumeTryCount?: number;
    mResumeRunnable?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DanmakuView_" + ++__generate__Id;
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
import { RenderingState } from '../../danmaku/renderer/IRenderer';
import { IDanmakuView, OnDanmakuClickListener, THREAD_TYPE_NORMAL_PRIORITY } from '../../controller/IDanmakuView';
import { IDanmakuViewController } from '../../controller/IDanmakuViewController';
import { DrawHandler, Callback, START } from '../../controller/DrawHandler';
import { Message } from '../../../../../compat/Handler';
import { IDanmakus } from '../../danmaku/model/IDanmakus';
import { BaseDanmaku } from '../../danmaku/model/BaseDanmaku';
import { BaseDanmakuParser } from '../../danmaku/parser/BaseDanmakuParser';
import { DanmakuContext } from '../../danmaku/model/ohos/DanmakuContext';
import SystemClock from '../../danmaku/util/SystemClock';
import { DrawHelper } from '../../controller/DrawHelper';
import { DanmakuTouchHelper } from './DanmakuTouchHelper';
const MAX_RECORD_SIZE: number = 50;
const ONE_SECOND: number = 1000;
class DanmakuView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__refreshGeneration = new ObservedPropertySimple(0, this, "refreshGeneration");
        this.__model = new SynchedPropertyObjectTwoWay(params.model, this, "model");
        this.settings = new RenderingContextSettings(true);
        this.context = new CanvasRenderingContext2D(this.settings);
        this.ready = false;
        this.__viewWidth = new ObservedPropertySimple(1920, this, "viewWidth");
        this.__viewHeight = new ObservedPropertySimple(1080, this, "viewHeight");
        this.mCallback = undefined;
        this.handler = undefined;
        this.mOnDanmakuClickListener = undefined;
        this.mXOff = 0;
        this.mYOff = 0;
        this.mTouchHelper = undefined;
        this.mShowFps = false;
        this.mDanmakuVisible = true;
        this.mDrawingThreadType = THREAD_TYPE_NORMAL_PRIORITY;
        this.mRequestRender = false;
        this.mDrawTimes = undefined;
        this.mClearFlag = false;
        this.mResumeTryCount = 0;
        this.mResumeRunnable = () => {
            let drawHandler: DrawHandler = this.handler;
            if (drawHandler == null) {
                return;
            }
            this.mResumeTryCount++;
            if (this.mResumeTryCount > 4 /*|| DanmakuView.super.isShown()*/) {
                drawHandler.resume();
            }
            else {
                drawHandler.postDelayed(this.mResumeRunnable, 100 * this.mResumeTryCount);
            }
        };
        this.updateWithValueParams(params);
        this.declareWatch("viewWidth", this.onRelayout);
        this.declareWatch("viewHeight", this.onRelayout);
    }
    updateWithValueParams(params: DanmakuView_Params) {
        if (params.refreshGeneration !== undefined) {
            this.refreshGeneration = params.refreshGeneration;
        }
        if (params.settings !== undefined) {
            this.settings = params.settings;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.ready !== undefined) {
            this.ready = params.ready;
        }
        if (params.viewWidth !== undefined) {
            this.viewWidth = params.viewWidth;
        }
        if (params.viewHeight !== undefined) {
            this.viewHeight = params.viewHeight;
        }
        if (params.mCallback !== undefined) {
            this.mCallback = params.mCallback;
        }
        if (params.handler !== undefined) {
            this.handler = params.handler;
        }
        if (params.mOnDanmakuClickListener !== undefined) {
            this.mOnDanmakuClickListener = params.mOnDanmakuClickListener;
        }
        if (params.mXOff !== undefined) {
            this.mXOff = params.mXOff;
        }
        if (params.mYOff !== undefined) {
            this.mYOff = params.mYOff;
        }
        if (params.mTouchHelper !== undefined) {
            this.mTouchHelper = params.mTouchHelper;
        }
        if (params.mShowFps !== undefined) {
            this.mShowFps = params.mShowFps;
        }
        if (params.mDanmakuVisible !== undefined) {
            this.mDanmakuVisible = params.mDanmakuVisible;
        }
        if (params.mDrawingThreadType !== undefined) {
            this.mDrawingThreadType = params.mDrawingThreadType;
        }
        if (params.mRequestRender !== undefined) {
            this.mRequestRender = params.mRequestRender;
        }
        if (params.mDrawTimes !== undefined) {
            this.mDrawTimes = params.mDrawTimes;
        }
        if (params.mClearFlag !== undefined) {
            this.mClearFlag = params.mClearFlag;
        }
        if (params.mResumeTryCount !== undefined) {
            this.mResumeTryCount = params.mResumeTryCount;
        }
        if (params.mResumeRunnable !== undefined) {
            this.mResumeRunnable = params.mResumeRunnable;
        }
    }
    aboutToBeDeleted() {
        this.__refreshGeneration.aboutToBeDeleted();
        this.__model.aboutToBeDeleted();
        this.__viewWidth.aboutToBeDeleted();
        this.__viewHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __refreshGeneration: ObservedPropertySimple<number>;
    get refreshGeneration() {
        return this.__refreshGeneration.get();
    }
    set refreshGeneration(newValue: number) {
        this.__refreshGeneration.set(newValue);
    }
    private __model: SynchedPropertySimpleOneWay<DanmakuView.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: DanmakuView.Model) {
        this.__model.set(newValue);
    }
    private settings: RenderingContextSettings;
    private context: CanvasRenderingContext2D;
    private ready: boolean;
    private __viewWidth: ObservedPropertySimple<number>;
    get viewWidth() {
        return this.__viewWidth.get();
    }
    set viewWidth(newValue: number) {
        this.__viewWidth.set(newValue);
    }
    private __viewHeight: ObservedPropertySimple<number>;
    get viewHeight() {
        return this.__viewHeight.get();
    }
    set viewHeight(newValue: number) {
        this.__viewHeight.set(newValue);
    }
    render() {
        Stack.create();
        Stack.width(this.model.getViewWidth() + "px");
        Stack.height(this.model.getViewHeight() + "px");
        Stack.visibility(this.mDanmakuVisible ? Visibility.Visible : Visibility.Hidden);
        Stack.onTouch((event: TouchEvent): void => this.onTouchEvent(event));
        Canvas.create(this.context);
        Canvas.onReady(() => {
            this.ready = true;
        });
        Canvas.width('100%');
        Canvas.height('100%');
        Canvas.backgroundColor(Color.Transparent);
        Canvas.pop();
        Stack.pop();
    }
    invalidate() {
        this.refreshGeneration = (this.refreshGeneration + 1) % 65536;
        this.onDraw(this.context);
    }
    postInvalidate() {
        setTimeout(() => {
            this.invalidate();
        }, 0);
    }
    aboutToAppear() {
        this.model.delegate = this;
        this.init();
    }
    private mCallback: Callback | any;
    protected handler: DrawHandler | any;
    private mOnDanmakuClickListener: OnDanmakuClickListener | any;
    private mXOff: number;
    private mYOff: number;
    private mTouchHelper: DanmakuTouchHelper | any;
    private mShowFps: boolean;
    public mDanmakuVisible: boolean;
    protected mDrawingThreadType: number;
    protected mRequestRender: boolean;
    private init(): void {
        DrawHelper.useDrawColorToClearCanvas(true, false);
        this.mTouchHelper = DanmakuTouchHelper.instance(this.model);
    }
    /**
     * danmaku.isLive == true的情况下,请在非UI线程中使用此方法,避免可能卡住主线程
     *
     * @param item
     */
    public addDanmaku(item: BaseDanmaku): void {
        if (this.handler != null) {
            this.handler.addDanmaku(item);
        }
    }
    public invalidateDanmaku(item: BaseDanmaku, remeasure: boolean): void {
        if (this.handler != null) {
            this.handler.invalidateDanmaku(item, remeasure);
        }
    }
    public removeAllDanmakus(isClearDanmakusOnScreen: boolean): void {
        if (this.handler != null) {
            this.handler.removeAllDanmakus(isClearDanmakusOnScreen);
        }
    }
    public removeAllLiveDanmakus(): void {
        if (this.handler != null) {
            this.handler.removeAllLiveDanmakus();
        }
    }
    public getCurrentVisibleDanmakus(): IDanmakus | null {
        if (this.handler != null) {
            return this.handler.getCurrentVisibleDanmakus();
        }
        return null;
    }
    public setCallback(callback: Callback): void {
        this.mCallback = callback;
        if (this.handler != null) {
            this.handler.setCallback(callback);
        }
    }
    public release(): void {
        this.stop();
        if (this.mDrawTimes != null) {
            this.mDrawTimes.length = 0;
        }
        ;
    }
    public stop(): void {
        this.stopDraw();
    }
    private stopDraw(): void {
        if (this.handler == null) {
            return;
        }
        let handler: DrawHandler = this.handler;
        this.handler = null;
        if (this.handler != null) {
            this.handler.quit();
        }
    }
    private prepareInner(): void {
        if (this.handler == null) {
            this.handler = new DrawHandler(this.model, this.mDanmakuVisible);
        }
    }
    public prepare(parser: BaseDanmakuParser, config: DanmakuContext): void {
        this.prepareInner();
        this.handler.setConfig(config);
        this.handler.setParser(parser);
        this.handler.setCallback(this.mCallback);
        this.handler.prepare();
    }
    public isPrepared(): boolean {
        return this.handler != null && this.handler.isPrepared();
    }
    public getConfig(): DanmakuContext | null {
        if (this.handler == null) {
            return null;
        }
        return this.handler.getConfig();
    }
    public showFPS(show: boolean): void {
        this.mShowFps = show;
    }
    private mDrawTimes: number[] | any;
    protected mClearFlag: boolean;
    private fps(): number {
        let lastTime: number = SystemClock.uptimeMillis();
        this.mDrawTimes.push(lastTime);
        let first: number = this.mDrawTimes[0];
        if (first === undefined) {
            return 0.0;
        }
        let dtime: number = lastTime - first;
        let frames: number = this.mDrawTimes.length;
        if (frames > MAX_RECORD_SIZE) {
            this.mDrawTimes.shift();
        }
        return dtime > 0 ? this.mDrawTimes.length * ONE_SECOND / dtime : 0.0;
    }
    public drawDanmakus(): number {
        if (!this.isShown())
            return -1;
        let stime: number = SystemClock.uptimeMillis();
        this.lockCanvas();
        return SystemClock.uptimeMillis() - stime;
    }
    private postInvalidateCompat(): void {
        this.mRequestRender = true;
        this.postInvalidate();
    }
    protected lockCanvas(): void {
        if (this.mDanmakuVisible == false) {
            return;
        }
        this.postInvalidateCompat();
    }
    protected onDraw(canvas: CanvasRenderingContext2D): number {
        if (!this.ready) {
            return 0;
        }
        if ((!this.mDanmakuVisible) && (!this.mRequestRender)) {
            return 0;
        }
        DrawHelper.clearCanvas(canvas);
        if (this.mClearFlag) {
            DrawHelper.clearCanvas(canvas);
            this.mClearFlag = false;
        }
        else {
            if (this.handler != null) {
                let rs: RenderingState = this.handler.draw(canvas);
                if (this.mShowFps) {
                    if (this.mDrawTimes == null)
                        this.mDrawTimes = new Array<number>();
                    let fps: string = "fps " + this.fps().toFixed(2) + ",time:" + Math.floor(this.getCurrentTime() / 1000);
                    DrawHelper.drawFPS(canvas, fps);
                }
            }
        }
        this.mRequestRender = false;
        return 0;
    }
    protected onRelayout(): void {
        if (this.handler != null) {
            this.handler.notifyDispSizeChanged(this.viewWidth, this.viewHeight);
        }
    }
    public toggle(): void {
        if (this.handler == null) {
            this.start();
        }
        else if (this.handler.isStop()) {
            this.resume();
        }
        else {
            this.pause();
        }
    }
    public pause(): void {
        if (this.handler != null) {
            this.handler.removeCallbacks(this.mResumeRunnable);
            this.handler.pause();
        }
    }
    private mResumeTryCount: number;
    private mResumeRunnable;
    public resume(): void {
        if (this.handler != null && this.handler.isPrepared()) {
            this.mResumeTryCount = 0;
            this.handler.post(this.mResumeRunnable);
        }
        else if (this.handler == null) {
            this.restart();
        }
    }
    public isPaused(): boolean {
        if (this.handler != null) {
            return this.handler.isStop();
        }
        return false;
    }
    public restart(): void {
        this.stop();
        this.start();
    }
    public start(position: number = 0): void {
        let handlerLocal: DrawHandler = this.handler;
        if (handlerLocal == null) {
            this.prepareInner();
            handlerLocal = this.handler;
        }
        else {
            handlerLocal.removeCallbacksAndMessages();
        }
        if (handlerLocal != null) {
            handlerLocal.sendMessage(new Message({ what: START, obj: position }));
        }
    }
    public onTouchEvent(event: TouchEvent): void {
        this.mTouchHelper.onTouchEvent(event);
    }
    public seekTo(ms: number): void {
        if (this.handler != null) {
            this.handler.seekTo(ms);
        }
    }
    public isViewReady(): boolean {
        return this.ready;
    }
    public show(): void {
        this.showAndResumeDrawTask(null);
    }
    /**
     * show the danmakuview again if you called hideAndPauseDrawTask()
     *
     * @param position The position you want to resume
     * @see #hideAndPauseDrawTask
     */
    public showAndResumeDrawTask(position: number | any): void {
        this.mDanmakuVisible = true;
        this.mClearFlag = false;
        if (this.handler == null) {
            return;
        }
        this.handler.showDanmakus(position);
    }
    public hide(): void {
        this.mDanmakuVisible = false;
        if (this.handler == null) {
            return;
        }
        this.handler.hideDanmakus(false);
    }
    /**
     * hide the danmakuview and pause the drawtask
     *
     * @return the paused position
     * @see #showAndResumeDrawTask
     */
    public hideAndPauseDrawTask(): number {
        this.mDanmakuVisible = false;
        if (this.handler == null) {
            return 0;
        }
        return this.handler.hideDanmakus(true);
    }
    public clear(): void {
        if (!this.isViewReady()) {
            return;
        }
        this.mClearFlag = true;
        this.postInvalidateCompat();
    }
    public isShown(): boolean {
        return this.mDanmakuVisible;
    }
    /**
     * @param type One of THREAD_TYPE_MAIN_THREAD, THREAD_TYPE_HIGH_PRIORITY, THREAD_TYPE_NORMAL_PRIORITY, or THREAD_TYPE_LOW_PRIORITY.
     */
    public setDrawingThreadType(threadType: number): void {
        this.mDrawingThreadType = threadType;
    }
    /**
     * for getting the accurate play-time. use this method instead of parser.getTimer().currMillisecond
     *
     * @return
     */
    public getCurrentTime(): number {
        if (this.handler != null) {
            return this.handler.getCurrentTime();
        }
        return 0;
    }
    public clearDanmakusOnScreen(): void {
        if (this.handler != null) {
            this.handler.clearDanmakusOnScreen();
        }
    }
    public setOnDanmakuClickListener(listener: OnDanmakuClickListener, xOff: number, yOff: number): void {
        this.mOnDanmakuClickListener = listener;
        if (xOff !== undefined) {
            this.mXOff = xOff;
        }
        if (yOff !== undefined) {
            this.mYOff = yOff;
        }
    }
    public getOnDanmakuClickListener(): OnDanmakuClickListener {
        return this.mOnDanmakuClickListener;
    }
    public getXOff(): number {
        return this.mXOff;
    }
    public getYOff(): number {
        return this.mYOff;
    }
    public forceRender(): void {
        this.mRequestRender = true;
        this.handler.forceRender();
    }
}
namespace DanmakuView {
    export class Model implements IDanmakuView, IDanmakuViewController {
        delegate: DanmakuView | any;
        isPrepared(): boolean {
            return this.delegate.isPrepared();
        }
        isPaused(): boolean {
            return this.delegate.isPaused();
        }
        /**
         *
         * @param type One of THREAD_TYPE_MAIN_THREAD, THREAD_TYPE_HIGH_PRIORITY, THREAD_TYPE_NORMAL_PRIORITY, or THREAD_TYPE_LOW_PRIORITY.
         */
        setDrawingThreadType(threadType: number): void {
            this.delegate.setDrawingThreadType(threadType);
        }
        showFPS(show: boolean): void {
            this.delegate.showFPS(show);
        }
        /**
         * danmaku.isLive == true的情况下,请在非UI线程中使用此方法,避免可能卡住主线程
         * @param item
         */
        addDanmaku(item: BaseDanmaku): void {
            this.delegate.addDanmaku(item);
        }
        invalidateDanmaku(item: BaseDanmaku, remeasure: boolean): void {
            this.delegate.invalidateDanmaku(item, remeasure);
        }
        removeAllDanmakus(isClearDanmakusOnScreen: boolean): void {
            this.delegate.removeAllDanmakus(isClearDanmakusOnScreen);
        }
        removeAllLiveDanmakus(): void {
            this.delegate.removeAllLiveDanmakus();
        }
        getCurrentVisibleDanmakus(): IDanmakus {
            return this.delegate.getCurrentVisibleDanmakus();
        }
        setCallback(callback: Callback | any): void {
            this.delegate.setCallback(callback);
        }
        /**
         * for getting the accurate play-time. use this method instead of parser.getTimer().currMillisecond
         * @return
         */
        getCurrentTime(): number {
            return this.delegate.getCurrentTime();
        }
        getConfig(): DanmakuContext {
            return this.delegate.getConfig();
        }
        // ------------- View方法  --------------------
        getView(): IDanmakuView {
            return this;
        }
        setWidth(width: number) {
            this.delegate.viewWidth = width;
        }
        setHeight(height: number) {
            this.delegate.viewHeight = height;
        }
        getWidth(): number {
            return this.delegate.viewWidth;
        }
        getHeight(): number {
            return this.delegate.viewHeight;
        }
        setVisibility(visibility: boolean): void {
            this.delegate.mDanmakuVisible = visibility;
        }
        isShown(): boolean {
            return this.delegate.isShown();
        }
        // ------------- 播放控制 -------------------
        prepare(parser: BaseDanmakuParser, config: DanmakuContext): void {
            this.delegate.prepare(parser, config);
        }
        seekTo(ms: number): void {
            this.delegate.seekTo(ms);
        }
        start(position?: number): void {
            this.delegate.start(position);
        }
        stop(): void {
            this.delegate.stop();
        }
        pause(): void {
            this.delegate.pause();
        }
        resume(): void {
            this.delegate.resume();
        }
        release(): void {
            this.delegate.release();
        }
        toggle(): void {
            this.delegate.toggle();
        }
        show(): void {
            this.delegate.show();
        }
        hide(): void {
            this.delegate.hide();
        }
        /**
         * show the danmakuview again if you called hideAndPauseDrawTask()
         * @param position The position you want to resume
         * @see #hideAndPauseDrawTask
         */
        showAndResumeDrawTask(position: number): void {
            this.delegate.showAndResumeDrawTask(position);
        }
        /**
         * hide the danmakuview and pause the drawtask
         * @return the paused position
         * @see #showAndResumeDrawTask
         */
        hideAndPauseDrawTask(): number {
            return this.delegate.hideAndPauseDrawTask();
        }
        clearDanmakusOnScreen(): void {
            this.delegate.clearDanmakusOnScreen();
        }
        // ------------- Click Listener -------------------
        setOnDanmakuClickListener(listener: OnDanmakuClickListener | any, xOff?: number, yOff?: number): void {
            this.delegate.setOnDanmakuClickListener(listener, xOff, yOff);
        }
        getOnDanmakuClickListener(): OnDanmakuClickListener {
            return this.delegate.getOnDanmakuClickListener();
        }
        getXOff(): number {
            return this.delegate.getXOff();
        }
        getYOff(): number {
            return this.delegate.getYOff();
        }
        forceRender(): void {
            this.delegate.forceRender();
        }
        isViewReady(): boolean {
            return this.delegate.isViewReady();
        }
        getViewWidth(): number {
            return this.getWidth();
        }
        ;
        getViewHeight(): number {
            return this.getHeight();
        }
        ;
        drawDanmakus(): number {
            return this.delegate?.drawDanmakus();
        }
        ;
        clear(): void {
            this.delegate?.clear();
        }
        ;
    }
}
export default DanmakuView;
