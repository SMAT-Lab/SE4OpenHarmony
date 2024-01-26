let __generate__Id: number = 0;
function generateId(): string {
    return "IDrawTask_" + ++__generate__Id;
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
import { AbsDisplayer } from '../danmaku/model/AbsDisplayer';
import { RenderingState } from '../danmaku/renderer/IRenderer';
import { BaseDanmakuParser } from '../danmaku/parser/BaseDanmakuParser';
export const PLAY_STATE_PLAYING: number = 1;
export const PLAY_STATE_PAUSE: number = 2;
export interface IDrawTask {
    addDanmaku(item: BaseDanmaku): void;
    removeAllDanmakus(isClearDanmakusOnScreen: boolean): void;
    removeAllLiveDanmakus(): void;
    clearDanmakusOnScreen(currMillis: number): void;
    getVisibleDanmakusOnTime(time: number): IDanmakus;
    draw(displayer: AbsDisplayer<CanvasRenderingContext2D, string>): RenderingState;
    reset(): void;
    seek(mills: number): void;
    start(): void;
    quit(): void;
    prepare(): void;
    onPlayStateChanged(state: number): void;
    requestClear(): void;
    requestClearRetainer(): void;
    requestSync(fromTimeMills: number, toTimeMills: number, offsetMills: number): void;
    setParser(parser: BaseDanmakuParser): void;
    invalidateDanmaku(item: BaseDanmaku, remeasure: boolean): void;
    requestHide(): void;
    requestRender(): void;
}
export interface TaskListener {
    ready(): void;
    onDanmakuAdd(danmaku: BaseDanmaku): void;
    onDanmakuShown(danmaku: BaseDanmaku): void;
    onDanmakuConfigChanged(): void;
    onDanmakusDrawingFinished(): void;
}
