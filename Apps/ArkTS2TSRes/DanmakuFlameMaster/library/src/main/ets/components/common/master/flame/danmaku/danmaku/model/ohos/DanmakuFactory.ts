let __generate__Id: number = 0;
function generateId(): string {
    return "DanmakuFactory_" + ++__generate__Id;
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
import { DanmakuContext } from '../ohos/DanmakuContext';
import { BaseDanmaku } from '../BaseDanmaku';
import { Duration } from '../Duration';
import { IDisplayer } from '../IDisplayer';
import { FBDanmaku } from '../FBDanmaku';
import { FTDanmaku } from '../FTDanmaku';
import { L2RDanmaku } from '../L2RDanmaku';
import { R2LDanmaku } from '../R2LDanmaku';
import { SpecialDanmaku, ScaleFactor } from '../SpecialDanmaku';
export class DanmakuFactory {
    public static OLD_BILI_PLAYER_WIDTH: number = 539;
    public static BILI_PLAYER_WIDTH: number = 682;
    public static OLD_BILI_PLAYER_HEIGHT: number = 385;
    public static BILI_PLAYER_HEIGHT: number = 438;
    public static COMMON_DANMAKU_DURATION: number = 3800; // B站原始分辨率下弹幕存活时间
    public static DANMAKU_MEDIUM_TEXTSIZE: number = 25;
    public static MIN_DANMAKU_DURATION: number = 4000;
    public static MAX_DANMAKU_DURATION_HIGH_DENSITY: number = 9000;
    public CURRENT_DISP_WIDTH: number = 0;
    public CURRENT_DISP_HEIGHT: number = 0;
    private mScaleFactor: ScaleFactor | any = null;
    private CURRENT_DISP_SIZE_FACTOR: number = 1.0;
    public REAL_DANMAKU_DURATION: number = DanmakuFactory.COMMON_DANMAKU_DURATION;
    public MAX_DANMAKU_DURATION: number = DanmakuFactory.MIN_DANMAKU_DURATION;
    public MAX_Duration_Scroll_Danmaku: Duration | any;
    public MAX_Duration_Fix_Danmaku: Duration | any;
    public MAX_Duration_Special_Danmaku: Duration | any;
    public sLastDisp: IDisplayer | any;
    private sLastConfig: DanmakuContext | any;
    public static create(): DanmakuFactory {
        return new DanmakuFactory();
    }
    protected constructor() {
    }
    public resetDurationsData() {
        this.sLastDisp = null;
        this.CURRENT_DISP_WIDTH = this.CURRENT_DISP_HEIGHT = 0;
        this.MAX_Duration_Scroll_Danmaku = null;
        this.MAX_Duration_Fix_Danmaku = null;
        this.MAX_Duration_Special_Danmaku = null;
        this.MAX_DANMAKU_DURATION = DanmakuFactory.MIN_DANMAKU_DURATION;
    }
    public notifyDispSizeChanged(context: DanmakuContext) {
        this.sLastConfig = context;
        this.sLastDisp = context.getDisplayer();
        this.createDanmakuByContext(BaseDanmaku.TYPE_SCROLL_RL, context);
    }
    /**
       * 创建弹幕数据请尽量使用此方法,参考BiliDanmakuParser或AcfunDanmakuParser
       *
       * @param type           弹幕类型
       * @param viewportWidth  danmakuview宽度,会影响滚动弹幕的存活时间(duration)
       * @param viewportHeight danmakuview高度
       * @param viewportScale  缩放比例,会影响滚动弹幕的存活时间(duration)
       * @return
       */
    /**
       * 创建弹幕数据请尽量使用此方法,参考BiliDanmakuParser或AcfunDanmakuParser
       *
       * @param type               弹幕类型
       * @param viewportWidth      danmakuview宽度,会影响滚动弹幕的存活时间(duration)
       * @param viewportHeight     danmakuview高度
       * @param viewportSizeFactor 会影响滚动弹幕的速度/存活时间(duration)
       * @return
       */
    public createDanmaku(type: number): BaseDanmaku {
        return this.createDanmakuByContext(type, this.sLastConfig);
    }
    public createDanmakuByContext(type: number, context: DanmakuContext): BaseDanmaku | any {
        if (context == null)
            return null;
        this.sLastConfig = context;
        this.sLastDisp = context.getDisplayer();
        return this.createDanmakuByAll(type, this.sLastDisp.getWidth(), this.sLastDisp.getHeight(), this.CURRENT_DISP_SIZE_FACTOR, context.scrollSpeedFactor);
    }
    public createDanmakuByDisplayer(type: number, disp: IDisplayer, viewportScale: number, scrollSpeedFactor: number): BaseDanmaku | any {
        if (disp == null)
            return null;
        this.sLastDisp = disp;
        return this.createDanmakuByAll(type, disp.getWidth(), disp.getHeight(), viewportScale, scrollSpeedFactor);
    }
    public createDanmakuByAll(type: number, viewportWidth?: number | any, viewportHeight?: number | any, viewportScale?: number | any, scrollSpeedFactor?: number | any): BaseDanmaku {
        let oldDispWidth: number = this.CURRENT_DISP_WIDTH;
        let oldDispHeight: number = this.CURRENT_DISP_HEIGHT;
        let sizeChanged: boolean = this.updateViewportState(viewportWidth, viewportHeight, viewportScale);
        if (this.MAX_Duration_Scroll_Danmaku == null) {
            this.MAX_Duration_Scroll_Danmaku = new Duration(this.REAL_DANMAKU_DURATION);
            this.MAX_Duration_Scroll_Danmaku.setFactor(scrollSpeedFactor);
        }
        else if (sizeChanged) {
            this.MAX_Duration_Scroll_Danmaku.setValue(this.REAL_DANMAKU_DURATION);
        }
        if (this.MAX_Duration_Fix_Danmaku == null) {
            this.MAX_Duration_Fix_Danmaku = new Duration(DanmakuFactory.COMMON_DANMAKU_DURATION);
        }
        let scaleX: number = 1;
        let scaleY: number = 1;
        if (sizeChanged && viewportWidth > 0) {
            this.updateMaxDanmakuDuration();
            if (oldDispWidth > 0 && oldDispHeight > 0) {
                scaleX = viewportWidth / oldDispWidth;
                scaleY = viewportHeight / oldDispHeight;
            }
            this.updateScaleFactor(viewportWidth, viewportHeight, scaleX, scaleY);
            if (viewportHeight > 0) {
                this.updateSpecialDanmakusDate(viewportWidth, viewportHeight, scaleX, scaleY);
            }
        }
        let instance: BaseDanmaku | any = null;
        switch (type) {
            case 1: // 从右往左滚动
                instance = new R2LDanmaku(this.MAX_Duration_Scroll_Danmaku);
                break;
            case 4: // 底端固定
                instance = new FBDanmaku(this.MAX_Duration_Fix_Danmaku);
                break;
            case 5: // 顶端固定
                instance = new FTDanmaku(this.MAX_Duration_Fix_Danmaku);
                break;
            case 6: // 从左往右滚动
                instance = new L2RDanmaku(this.MAX_Duration_Scroll_Danmaku);
                break;
            case 7: // 特殊弹幕
                instance = new SpecialDanmaku();
                this.updateScaleFactor(viewportWidth, viewportHeight, scaleX, scaleY);
                (instance as SpecialDanmaku).setScaleFactor(this.mScaleFactor);
                break;
        }
        return instance;
    }
    private updateScaleFactor(width: number, height: number, scaleX: number, scaleY: number) {
        if (this.mScaleFactor == null) {
            this.mScaleFactor = new ScaleFactor(width, height, scaleX, scaleY);
        }
        this.mScaleFactor.update(width, height, scaleX, scaleY);
    }
    public updateViewportState(viewportWidth: number | any, viewportHeight: number, viewportSizeFactor: number): boolean {
        let sizeChanged: boolean = false;
        if (this.CURRENT_DISP_WIDTH != viewportWidth
            || this.CURRENT_DISP_HEIGHT != viewportHeight
            || this.CURRENT_DISP_SIZE_FACTOR != viewportSizeFactor) {
            sizeChanged = true;
            this.REAL_DANMAKU_DURATION = (DanmakuFactory.COMMON_DANMAKU_DURATION * (viewportSizeFactor
                * viewportWidth / DanmakuFactory.BILI_PLAYER_WIDTH));
            this.REAL_DANMAKU_DURATION = Math.min(DanmakuFactory.MAX_DANMAKU_DURATION_HIGH_DENSITY, this.REAL_DANMAKU_DURATION);
            this.REAL_DANMAKU_DURATION = Math.max(DanmakuFactory.MIN_DANMAKU_DURATION, this.REAL_DANMAKU_DURATION);
            this.CURRENT_DISP_WIDTH = viewportWidth;
            this.CURRENT_DISP_HEIGHT = viewportHeight;
            this.CURRENT_DISP_SIZE_FACTOR = viewportSizeFactor;
        }
        return sizeChanged;
    }
    private updateSpecialDanmakusDate(width: number, height: number, scaleX: number, scaleY: number) {
        if (this.mScaleFactor != null) {
            this.mScaleFactor.update(width, height, scaleX, scaleY);
        }
    }
    public updateMaxDanmakuDuration() {
        let maxScrollDuration: number = (this.MAX_Duration_Scroll_Danmaku == null ? 0 : this.MAX_Duration_Scroll_Danmaku.value), maxFixDuration: number = (this.MAX_Duration_Fix_Danmaku == null ? 0 : this.MAX_Duration_Fix_Danmaku.value), maxSpecialDuration: number = (this.MAX_Duration_Special_Danmaku == null ? 0 : this.MAX_Duration_Special_Danmaku.value);
        this.MAX_DANMAKU_DURATION = Math.max(maxScrollDuration, maxFixDuration);
        this.MAX_DANMAKU_DURATION = Math.max(this.MAX_DANMAKU_DURATION, maxSpecialDuration);
        this.MAX_DANMAKU_DURATION = Math.max(DanmakuFactory.COMMON_DANMAKU_DURATION, this.MAX_DANMAKU_DURATION);
        this.MAX_DANMAKU_DURATION = Math.max(this.REAL_DANMAKU_DURATION, this.MAX_DANMAKU_DURATION);
    }
    public updateDurationFactor(f: number) {
        if (this.MAX_Duration_Scroll_Danmaku == null || this.MAX_Duration_Fix_Danmaku == null) {
            return;
        }
        this.MAX_Duration_Scroll_Danmaku.setFactor(f);
        this.updateMaxDanmakuDuration();
    }
    /**
       * Initial translation data of the special danmaku
       *
       * @param item
       * @param beginX
       * @param beginX
       * @param beginY
       * @param endX
       * @param endY
       * @param translationDuration
       * @param translationStartDelay
       */
    public fillTranslationData(item: BaseDanmaku, beginX: number, beginY: number, endX: number, endY: number, translationDuration: number, translationStartDelay: number, scaleX: number, scaleY: number) {
        if (item.getType() != BaseDanmaku.TYPE_SPECIAL)
            return;
        (item as SpecialDanmaku).setTranslationData(beginX * scaleX, beginY * scaleY, endX * scaleX, endY * scaleY, translationDuration, translationStartDelay);
        this.updateSpecicalDanmakuDuration(item);
    }
    public static fillLinePathData(item: BaseDanmaku, points: number[][], scaleX: number, scaleY: number) {
        if (item.getType() != BaseDanmaku.TYPE_SPECIAL || points.length == 0 || points[0].length != 2) {
            return;
        }
        for (let i = 0; i < points.length; i++) {
            points[i][0] *= scaleX;
            points[i][1] *= scaleY;
        }
        (item as SpecialDanmaku).setLinePathData(points);
    }
    /**
       * Initial alpha data of the special danmaku
       *
       * @param item
       * @param beginAlpha
       * @param endAlpha
       * @param alphaDuraion
       */
    public fillAlphaData(item: BaseDanmaku, beginAlpha: number, endAlpha: number, alphaDuraion: number) {
        if (item.getType() != BaseDanmaku.TYPE_SPECIAL) {
            return;
        }
        (item as SpecialDanmaku).setAlphaData(beginAlpha, endAlpha, alphaDuraion);
        this.updateSpecicalDanmakuDuration(item);
    }
    private updateSpecicalDanmakuDuration(item: BaseDanmaku) {
        if (this.MAX_Duration_Special_Danmaku == null || (item.duration != null && item.duration.value > this.MAX_Duration_Special_Danmaku.value)) {
            this.MAX_Duration_Special_Danmaku = item.duration;
            this.updateMaxDanmakuDuration();
        }
    }
}
