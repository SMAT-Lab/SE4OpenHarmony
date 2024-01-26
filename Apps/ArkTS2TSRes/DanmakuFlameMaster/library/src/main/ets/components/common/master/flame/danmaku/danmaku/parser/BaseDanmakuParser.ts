let __generate__Id: number = 0;
function generateId(): string {
    return "BaseDanmakuParser_" + ++__generate__Id;
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
import { DanmakuTimer } from '../model/DanmakuTimer';
import { IDanmakus } from '../model/IDanmakus';
import { IDisplayer } from '../model/IDisplayer';
import { DanmakuContext } from '../model/ohos/DanmakuContext';
import { IDataSource } from './IDataSource';
export interface Listener {
    onDanmakuAdd(danmaku: BaseDanmaku): void;
}
export abstract class BaseDanmakuParser {
    protected mDataSource: IDataSource<any> | null = null;
    protected mTimer: DanmakuTimer | any;
    protected mDispWidth: number = 0;
    protected mDispHeight: number = 0;
    protected mDispDensity: number = 0;
    protected mScaledDensity: number = 0;
    private mDanmakus: IDanmakus | any;
    protected mDisp: IDisplayer | any;
    protected mContext: DanmakuContext | any;
    protected mListener: Listener | any;
    public setDisplayer(disp: IDisplayer): BaseDanmakuParser {
        this.mDisp = disp;
        this.mDispWidth = disp.getWidth();
        this.mDispHeight = disp.getHeight();
        this.mDispDensity = disp.getDensity();
        this.mScaledDensity = disp.getScaledDensity();
        this.mContext.mDanmakuFactory.updateViewportState(this.mDispWidth, this.mDispHeight, this.getViewportSizeFactor());
        this.mContext.mDanmakuFactory.updateMaxDanmakuDuration();
        return this;
    }
    public getDisplayer(): IDisplayer {
        return this.mDisp;
    }
    public setListener(listener: Listener | any): BaseDanmakuParser {
        this.mListener = listener;
        return this;
    }
    /**
     * decide the speed of scroll-danmakus
     * @return
     */
    protected getViewportSizeFactor(): number {
        return 1 / (this.mDispDensity * 0.8);
    }
    public load(source: IDataSource<any>): BaseDanmakuParser {
        this.mDataSource = source;
        return this;
    }
    public setTimer(timer: DanmakuTimer): BaseDanmakuParser {
        this.mTimer = timer;
        return this;
    }
    public getTimer(): DanmakuTimer {
        return this.mTimer;
    }
    public getDanmakus(): IDanmakus {
        if (this.mDanmakus != null) {
            return this.mDanmakus;
        }
        this.mContext.mDanmakuFactory.resetDurationsData();
        this.mDanmakus = this.parse();
        this.releaseDataSource();
        this.mContext.mDanmakuFactory.updateMaxDanmakuDuration();
        return this.mDanmakus;
    }
    protected releaseDataSource(): void {
        if (this.mDataSource != null) {
            this.mDataSource.release();
        }
        this.mDataSource = null;
    }
    protected abstract parse(): IDanmakus;
    public release(): void {
        this.releaseDataSource();
    }
    public setConfig(config: DanmakuContext): BaseDanmakuParser {
        this.mContext = config;
        return this;
    }
}
