let __generate__Id: number = 0;
function generateId(): string {
    return "DanmakuRenderer_" + ++__generate__Id;
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
import { Renderer } from '../Renderer';
import { BaseDanmaku } from '../../model/BaseDanmaku';
import { DanmakuTimer } from '../../model/DanmakuTimer';
import { IDanmakus, DefaultConsumer, Consumer } from '../../model/IDanmakus';
import { IDisplayer } from '../../model/IDisplayer';
import { DanmakuContext } from '../../model/ohos/DanmakuContext';
import { IRenderer, RenderingState, OnDanmakuShownListener, CACHE_RENDERING, TEXT_RENDERING } from '../IRenderer';
import { DanmakusRetainer, Verifier } from './DanmakusRetainer';
let self: DanmakuRenderer;
class verifier implements Verifier {
    public skipLayout(danmaku: BaseDanmaku, fixedTop: number, lines: number, willHit: boolean): boolean {
        if (danmaku.priority == 0 && self.mContext.mDanmakuFilters.filterSecondary(danmaku, lines, 0, self.mStartTimer, willHit, self.mContext)) {
            danmaku.setVisibility(false);
            return true;
        }
        return false;
    }
}
let message: verifier | any;
export class DanmakuRenderer extends Renderer {
    public mStartTimer: DanmakuTimer | any;
    mContext: DanmakuContext;
    mVerifier: Verifier | any;
    private verifier: Verifier | any = message;
    mDanmakusRetainer: DanmakusRetainer;
    mOnDanmakuShownListener: OnDanmakuShownListener | any;
    private mConsumer: InnerConsumer = new InnerConsumer();
    public constructor(config: DanmakuContext) {
        super();
        self = this;
        this.mContext = config;
        this.mDanmakusRetainer = new DanmakusRetainer(config.isAlignBottom());
    }
    public clear(): void {
        this.clearRetainer();
        this.mContext.mDanmakuFilters.clear();
    }
    public clearRetainer(): void {
        this.mDanmakusRetainer.clear();
    }
    public release(): void {
        this.mDanmakusRetainer.release();
        this.mContext.mDanmakuFilters.clear();
    }
    public setVerifierEnabled(enabled: boolean): void {
        this.mVerifier = (enabled ? this.verifier : null);
    }
    public draw(disp: IDisplayer, danmakus: IDanmakus, startRenderTime: number, renderingState: RenderingState): void {
        this.mStartTimer = renderingState.timer;
        this.mConsumer.disp = disp;
        this.mConsumer.renderingState = renderingState;
        this.mConsumer.startRenderTime = startRenderTime;
        danmakus.forEachSync(this.mConsumer);
    }
    public setOnDanmakuShownListener(onDanmakuShownListener: OnDanmakuShownListener): void {
        this.mOnDanmakuShownListener = onDanmakuShownListener;
    }
    public removeOnDanmakuShownListener(): void {
        this.mOnDanmakuShownListener = null;
    }
    public alignBottom(enable: boolean): void {
        if (this.mDanmakusRetainer != null) {
            this.mDanmakusRetainer.alignBottom(enable);
        }
    }
}
class InnerConsumer extends DefaultConsumer<BaseDanmaku> {
    private lastItem: BaseDanmaku | null = null;
    public disp: IDisplayer | any = null;
    public renderingState: RenderingState | null = null;
    public startRenderTime: number = 0;
    public accept(drawItem: BaseDanmaku): number {
        this.lastItem = drawItem;
        if (drawItem.isTimeOut()) {
            this.disp.recycle(drawItem);
            if (this.renderingState != null) {
                return this.renderingState.isRunningDanmakus ? Consumer.ACTION_REMOVE : Consumer.ACTION_CONTINUE;
            }
        }
        if (this.renderingState != null) {
            if (!this.renderingState.isRunningDanmakus && drawItem.isOffset()) {
                return Consumer.ACTION_CONTINUE;
            }
        }
        if (this.renderingState != null) {
            if (!drawItem.hasPassedFilter()) { //还没执行过过滤逻辑
                self.mContext.mDanmakuFilters.filter(drawItem, this.renderingState.indexInScreen, this.renderingState.totalSizeInScreen, this.renderingState.timer, false, self.mContext);
            }
        }
        if (drawItem.getActualTime() < this.startRenderTime
            || (drawItem.priority == 0 && drawItem.isFiltered())) { // isFiltered 就表示已经被过滤掉了 0表示低优先级 大于0不会被过滤
            return Consumer.ACTION_CONTINUE;
        }
        if (drawItem.isLate()) {
            return Consumer.ACTION_BREAK;
        }
        if (drawItem.getType() == BaseDanmaku.TYPE_SCROLL_RL) {
            // 同屏弹幕密度只对滚动弹幕有效
            if (this.renderingState != null) {
                this.renderingState.indexInScreen++;
            }
        }
        // measure
        if (!drawItem.isMeasured()) {
            drawItem.measure(this.disp, false);
        }
        // notify prepare drawing
        if (!drawItem.isPrepared()) {
            drawItem.prepare(this.disp, false);
        }
        // layout
        self.mDanmakusRetainer.fix(drawItem, this.disp, self.mVerifier);
        // draw
        if (drawItem.isShown()) {
            if (drawItem.lines == null && drawItem.getBottom() > this.disp.getHeight()) {
                return Consumer.ACTION_CONTINUE; // skip bottom outside danmaku
            }
            let renderingType: number = drawItem.draw(this.disp);
            if (this.renderingState != null) {
                if (renderingType == CACHE_RENDERING) {
                    this.renderingState.cacheHitCount++;
                }
                else if (renderingType == TEXT_RENDERING) {
                    this.renderingState.cacheMissCount++;
                }
                this.renderingState.addCount(drawItem.getType(), 1);
                this.renderingState.addTotalCount(1);
                this.renderingState.appendToRunningDanmakus(drawItem);
            }
            if (self.mOnDanmakuShownListener != null
                && drawItem.firstShownFlag != self.mContext.mGlobalFlagValues.FIRST_SHOWN_RESET_FLAG) {
                drawItem.firstShownFlag = self.mContext.mGlobalFlagValues.FIRST_SHOWN_RESET_FLAG;
                self.mOnDanmakuShownListener.onDanmakuShown(drawItem);
            }
        }
        return Consumer.ACTION_CONTINUE;
    }
    public after(): void {
        if (this.renderingState != null) {
            this.renderingState.lastDanmaku = this.lastItem;
            super.after();
        }
    }
}
