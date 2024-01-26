let __generate__Id: number = 0;
function generateId(): string {
    return "IDanmakuView_" + ++__generate__Id;
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
import { IDanmakus } from '../danmaku/model/IDanmakus';
import { DanmakuContext } from '../danmaku/model/ohos/DanmakuContext';
import { Callback } from './DrawHandler';
import { BaseDanmakuParser } from '../danmaku/parser/BaseDanmakuParser';
export const THREAD_TYPE_NORMAL_PRIORITY: number = 0x0;
export const THREAD_TYPE_MAIN_THREAD: number = 0x1;
export const THREAD_TYPE_HIGH_PRIORITY: number = 0x2;
export const THREAD_TYPE_LOW_PRIORITY: number = 0x3;
export interface IDanmakuView {
    isPrepared(): boolean;
    isPaused(): boolean;
    /**
       *
       * @param type One of THREAD_TYPE_MAIN_THREAD, THREAD_TYPE_HIGH_PRIORITY, THREAD_TYPE_NORMAL_PRIORITY, or THREAD_TYPE_LOW_PRIORITY.
       */
    setDrawingThreadType(threadType: number): void;
    showFPS(show: boolean): void;
    /**
       * danmaku.isLive == true的情况下,请在非UI线程中使用此方法,避免可能卡住主线程
       * @param item
       */
    addDanmaku(item: BaseDanmaku): void;
    invalidateDanmaku(item: BaseDanmaku, remeasure: boolean): void;
    removeAllDanmakus(isClearDanmakusOnScreen: boolean): void;
    removeAllLiveDanmakus(): void;
    getCurrentVisibleDanmakus(): IDanmakus;
    setCallback(callback: Callback): void;
    /**
       * for getting the accurate play-time. use this method instead of parser.getTimer().currMillisecond
       * @return
       */
    getCurrentTime(): number;
    getConfig(): DanmakuContext;
    // ------------- View方法  --------------------
    getView(): IDanmakuView;
    getWidth(): number;
    getHeight(): number;
    setVisibility(visibility: boolean): void;
    isShown(): boolean;
    // ------------- 播放控制 -------------------
    prepare(parser: BaseDanmakuParser, config: DanmakuContext): void;
    seekTo(ms: number): void;
    start(position?: number): void;
    stop(): void;
    pause(): void;
    resume(): void;
    release(): void;
    toggle(): void;
    show(): void;
    hide(): void;
    /**
       * show the danmakuview again if you called hideAndPauseDrawTask()
       * @param position The position you want to resume
       * @see #hideAndPauseDrawTask
       */
    showAndResumeDrawTask(position: number): void;
    /**
       * hide the danmakuview and pause the drawtask
       * @return the paused position
       * @see #showAndResumeDrawTask
       */
    hideAndPauseDrawTask(): number;
    clearDanmakusOnScreen(): void;
    // ------------- Click Listener -------------------
    setOnDanmakuClickListener(listener: OnDanmakuClickListener, xOff?: number, yOff?: number): void;
    getOnDanmakuClickListener(): OnDanmakuClickListener;
    getXOff(): number;
    getYOff(): number;
    forceRender(): void;
}
export interface OnDanmakuClickListener {
    /**
           * @param danmakus all to be clicked, this value may be empty;
           *                 danmakus.last() is the latest danmaku which may be null;
           * @return True if the event was handled, false otherwise.
           */
    onDanmakuClick(danmakus: IDanmakus): boolean;
    onDanmakuLongClick(danmakus: IDanmakus): boolean;
    onViewClick(view: IDanmakuView): boolean;
}
