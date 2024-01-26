let __generate__Id: number = 0;
function generateId(): string {
    return "BaseCacheStuffer_" + ++__generate__Id;
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
import { BaseDanmaku } from '../BaseDanmaku';
import { Paint } from '../../../../../../compat/Paint';
export abstract class Proxy {
    /**
     * 在弹幕显示前使用新的text,使用新的text
     * @param danmaku
     * @param fromWorkerThread 是否在工作(非UI)线程,在true的情况下可以做一些耗时操作(例如更新Span的drawblae或者其他IO操作)
     * @return 如果不需重置，直接返回danmaku.text
     */
    public abstract prepareDrawing(danmaku: BaseDanmaku, fromWorkerThread: boolean);
    public abstract releaseResource(danmaku: BaseDanmaku);
}
export abstract class BaseCacheStuffer {
    public mProxy: Proxy | any;
    public prepare(danmaku: BaseDanmaku, fromWorkerThread: boolean) {
        if (this.mProxy != null) {
            this.mProxy.prepareDrawing(danmaku, fromWorkerThread);
        }
    }
    /**
     * set paintWidth, paintHeight to danmaku
     * @param danmaku
     * @param fromWorkerThread
     */
    public abstract measure(danmaku: BaseDanmaku, paint: Paint, fromWorkerThread: boolean);
    /**
     * clear caches which created by this stuffer
     */
    public abstract clearCaches();
    public abstract drawDanmaku(danmaku: BaseDanmaku, canvas: CanvasRenderingContext2D, left: number, top: number, fromWorkerThread: boolean, displayerConfig: any /*DisplayerConfig*/);
    public clearCache(danmaku: BaseDanmaku) {
    }
    public setProxy(adapter: Proxy) {
        this.mProxy = adapter;
    }
    public releaseResource(danmaku: BaseDanmaku) {
        if (this.mProxy != null) {
            this.mProxy.releaseResource(danmaku);
        }
    }
}
