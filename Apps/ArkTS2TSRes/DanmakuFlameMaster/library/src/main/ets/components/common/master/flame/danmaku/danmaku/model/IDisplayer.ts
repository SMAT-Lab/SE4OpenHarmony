let __generate__Id: number = 0;
function generateId(): string {
    return "IDisplayer_" + ++__generate__Id;
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
import { BaseDanmaku } from '../model/BaseDanmaku';
export const DANMAKU_STYLE_DEFAULT: number = -1; // 自动
export const DANMAKU_STYLE_NONE: number = 0; // 无
export const DANMAKU_STYLE_SHADOW: number = 1; // 阴影
export const DANMAKU_STYLE_STROKEN: number = 2; // 描边
export const DANMAKU_STYLE_PROJECTION: number = 3; // 投影
export interface IDisplayer {
    getWidth(): number;
    getHeight(): number;
    getDensity(): number;
    getDensityDpi(): number;
    draw(danmaku: BaseDanmaku): number;
    recycle(danmaku: BaseDanmaku): void;
    getScaledDensity(): number;
    getSlopPixel(): number;
    prepare(danmaku: BaseDanmaku, fromWorkerThread: boolean): void;
    measure(danmaku: BaseDanmaku, fromWorkerThread: boolean): void;
    getStrokeWidth(): number;
    ////////////////// setter ///////////////////////////
    resetSlopPixel(factor: number): void;
    setDensities(density: number, densityDpi: number, scaledDensity: number): void;
    setSize(width: number, height: number): void;
    setDanmakuStyle(style: number, data: number[]): void;
    setMargin(m: number): void;
    getMargin(): number;
    setAllMarginTop(m: number): void;
    getAllMarginTop(): number;
}
