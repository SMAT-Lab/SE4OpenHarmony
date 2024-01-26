let __generate__Id: number = 0;
function generateId(): string {
    return "L2RDanmaku_" + ++__generate__Id;
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
import { R2LDanmaku } from '../model/R2LDanmaku';
import { Duration } from '../model/Duration';
import { IDisplayer } from '../model/IDisplayer';
import { BaseDanmaku } from '../model/BaseDanmaku';
export class L2RDanmaku extends R2LDanmaku {
    public constructor(duration: Duration) {
        super(duration);
    }
    public layout(displayer: IDisplayer, x: number, y: number) {
        if (this.mTimer != null) {
            let currMS: number = this.mTimer.currMillisecond;
            let deltaDuration: number = currMS - this.getActualTime();
            if (deltaDuration > 0 && deltaDuration < this.duration.value) {
                this.x = this.getAccurateLeft(displayer, currMS);
                if (!this.isShown()) {
                    this.y = y;
                    this.setVisibility(true);
                }
                this.mLastTime = currMS;
                return;
            }
            this.mLastTime = currMS;
        }
        this.setVisibility(false);
    }
    public getRectAtTime(displayer: IDisplayer, time: number): number[] | any {
        if (!this.isMeasured())
            return null;
        let left: number = this.getAccurateLeft(displayer, time);
        if (this.RECT == null) {
            this.RECT = new Array<number>(4);
        }
        this.RECT[0] = left;
        this.RECT[1] = this.y;
        this.RECT[2] = left + this.paintWidth;
        this.RECT[3] = this.y + this.paintHeight;
        return this.RECT;
    }
    protected getAccurateLeft(displayer: IDisplayer, currTime: number): number {
        let elapsedTime: number = currTime - this.getActualTime();
        if (elapsedTime >= this.duration.value) {
            return displayer.getWidth();
        }
        return this.mStepX * elapsedTime - this.paintWidth;
    }
    public getLeft(): number {
        return this.x;
    }
    public getTop(): number {
        return this.y;
    }
    public getRight(): number {
        return this.x + this.paintWidth;
    }
    public getBottom(): number {
        return this.y + this.paintHeight;
    }
    public getType(): number {
        return BaseDanmaku.TYPE_SCROLL_LR;
    }
}
