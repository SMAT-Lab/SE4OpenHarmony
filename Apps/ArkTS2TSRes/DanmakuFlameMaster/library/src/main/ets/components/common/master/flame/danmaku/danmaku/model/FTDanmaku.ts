let __generate__Id: number = 0;
function generateId(): string {
    return "FTDanmaku_" + ++__generate__Id;
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
import { Duration } from '../model/Duration';
import { IDisplayer } from '../model/IDisplayer';
export class FTDanmaku extends BaseDanmaku {
    private x: number = 0;
    protected y: number = -1;
    private RECT: number[] | null = null;
    private mLastLeft: number = 0;
    private mLastPaintWidth: number = 0;
    private mLastDispWidth: number = 0;
    public constructor(duration: Duration) {
        super();
        this.duration = duration;
    }
    public layout(displayer: IDisplayer, x: number, y: number) {
        if (this.mTimer != null) {
            let deltaDuration: number = this.mTimer.currMillisecond - this.getActualTime();
            if (deltaDuration > 0 && deltaDuration < this.duration.value) {
                if (!this.isShown()) {
                    this.x = this.getLeftWithDisplayer(displayer);
                    this.y = y;
                    this.setVisibility(true);
                }
                return;
            }
            this.setVisibility(false);
            this.y = -1;
            this.x = displayer.getWidth();
        }
    }
    public getLeftWithDisplayer(displayer: IDisplayer): number {
        if (this.mLastDispWidth == displayer.getWidth() && this.mLastPaintWidth == this.paintWidth) {
            return this.mLastLeft;
        }
        let left: number = (displayer.getWidth() - this.paintWidth) / 2;
        this.mLastDispWidth = displayer.getWidth();
        this.mLastPaintWidth = this.paintWidth;
        this.mLastLeft = left;
        return left;
    }
    public getRectAtTime(displayer: IDisplayer, time: number): number[] | any {
        if (!this.isMeasured())
            return null;
        let left: number = this.getLeftWithDisplayer(displayer);
        if (this.RECT == null) {
            this.RECT = new Array<number>(4);
        }
        this.RECT[0] = left;
        this.RECT[1] = this.y;
        this.RECT[2] = left + this.paintWidth;
        this.RECT[3] = this.y + this.paintHeight;
        return this.RECT;
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
        return BaseDanmaku.TYPE_FIX_TOP;
    }
}
