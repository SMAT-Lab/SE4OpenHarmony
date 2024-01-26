let __generate__Id: number = 0;
function generateId(): string {
    return "AbsDisplayer_" + ++__generate__Id;
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
import { IDisplayer } from './IDisplayer';
import { BaseDanmaku } from './BaseDanmaku';
import { BaseCacheStuffer } from './ohos/BaseCacheStuffer';
export abstract class AbsDisplayer<T, F> implements IDisplayer {
    public abstract getExtraData(): T;
    public abstract setExtraData(data: T): void;
    public abstract drawDanmaku(danmaku: BaseDanmaku, canvas: T, left: number, top: number, fromWorkerThread: boolean);
    public abstract clearTextHeightCache();
    public abstract setTypeFace(font: F);
    public abstract setFakeBoldText(bold: boolean);
    public abstract setTransparency(newTransparency: number);
    public abstract setScaleTextSizeFactor(factor: number);
    public abstract setCacheStuffer(cacheStuffer: BaseCacheStuffer);
    public abstract getCacheStuffer(): BaseCacheStuffer;
    public abstract getWidth(): number;
    public abstract getHeight(): number;
    public abstract getDensity(): number;
    public abstract getDensityDpi(): number;
    public abstract draw(danmaku: BaseDanmaku): number;
    public abstract recycle(danmaku: BaseDanmaku);
    public abstract getScaledDensity(): number;
    public abstract getSlopPixel(): number;
    public abstract prepare(danmaku: BaseDanmaku, fromWorkerThread: boolean);
    public abstract measure(danmaku: BaseDanmaku, fromWorkerThread: boolean);
    public abstract getStrokeWidth(): number;
    ////////////////// setter ///////////////////////////
    public abstract resetSlopPixel(factor: number);
    public abstract setDensities(density: number, densityDpi: number, scaledDensity: number);
    public abstract setSize(width: number, height: number);
    public abstract setDanmakuStyle(style: number, data: number[]);
    public abstract setMargin(m: number);
    public abstract getMargin(): number;
    public abstract setAllMarginTop(m: number);
    public abstract getAllMarginTop(): number;
}
