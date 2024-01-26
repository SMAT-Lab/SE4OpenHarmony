let __generate__Id: number = 0;
function generateId(): string {
    return "DanmakusRetainer_" + ++__generate__Id;
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
import { BaseDanmaku } from '../../model/BaseDanmaku';
import { Consumer, ST_BY_YPOS, ST_BY_YPOS_DESC } from '../../model/IDanmakus';
import { IDisplayer } from '../../model/IDisplayer';
import { Danmakus } from '../../model/ohos/Danmakus';
import { DanmakuUtils } from '../../util/DanmakuUtils';
export class DanmakusRetainer {
    private rldrInstance: IDanmakusRetainer | any = null;
    private lrdrInstance: IDanmakusRetainer | any = null;
    private ftdrInstance: IDanmakusRetainer | any = null;
    private fbdrInstance: IDanmakusRetainer | any = null;
    public constructor(alignBottom: boolean) {
        this.alignBottom(alignBottom);
    }
    public alignBottom(alignBottom: boolean): void {
        this.rldrInstance = alignBottom ? new AlignBottomRetainer() : new AlignTopRetainer(); //r2l, 使用AlignBottom或AlignTop
        this.lrdrInstance = alignBottom ? new AlignBottomRetainer() : new AlignTopRetainer(); //l2r, 使用AlignBottom或AlignTop
        if (this.ftdrInstance == null) {
            this.ftdrInstance = new FTDanmakusRetainer(); //fix top
        }
        if (this.fbdrInstance == null) {
            this.fbdrInstance = new AlignBottomRetainer(); //fix bottom 使用 AlignBottomRetainer逻辑
        }
    }
    public fix(danmaku: BaseDanmaku, disp: IDisplayer, verifier: Verifier): void {
        let danmakuType = danmaku.getType();
        switch (danmakuType) {
            case BaseDanmaku.TYPE_SCROLL_RL:
                this.rldrInstance.fix(danmaku, disp, verifier);
                break;
            case BaseDanmaku.TYPE_SCROLL_LR:
                this.lrdrInstance.fix(danmaku, disp, verifier);
                break;
            case BaseDanmaku.TYPE_FIX_TOP:
                this.ftdrInstance.fix(danmaku, disp, verifier);
                break;
            case BaseDanmaku.TYPE_FIX_BOTTOM:
                this.fbdrInstance.fix(danmaku, disp, verifier);
                break;
            case BaseDanmaku.TYPE_SPECIAL:
                danmaku.layout(disp, 0, 0);
                break;
        }
    }
    public clear(): void {
        if (this.rldrInstance != null) {
            this.rldrInstance.clear();
        }
        if (this.lrdrInstance != null) {
            this.lrdrInstance.clear();
        }
        if (this.ftdrInstance != null) {
            this.ftdrInstance.clear();
        }
        if (this.fbdrInstance != null) {
            this.fbdrInstance.clear();
        }
    }
    public release(): void {
        this.clear();
    }
}
export interface Verifier {
    skipLayout(danmaku: BaseDanmaku, fixedTop: number, lines: number, willHit: boolean): boolean;
}
export interface IDanmakusRetainer {
    fix(drawItem: BaseDanmaku, disp: IDisplayer, verifier: Verifier): void;
    clear(): void;
}
class RetainerState {
    public lines: number = 0;
    public insertItem: BaseDanmaku | any = null;
    public firstItem: BaseDanmaku | any = null;
    public lastItem: BaseDanmaku | any = null;
    public minRightRow: BaseDanmaku | any = null;
    public removeItem: BaseDanmaku | any = null;
    public overwriteInsert: boolean = false;
    public shown: boolean = false;
    public willHit: boolean = false;
}
class RetainerConsumerTop extends Consumer<BaseDanmaku, RetainerState> {
    public disp: IDisplayer | any;
    lines: number = 0;
    public insertItem: BaseDanmaku | any = null;
    public firstItem: BaseDanmaku | any = null;
    public lastItem: BaseDanmaku | any = null;
    public minRightRow: BaseDanmaku | any = null;
    public drawItem: BaseDanmaku | any = null;
    overwriteInsert: boolean = false;
    shown: boolean = false;
    willHit: boolean = false;
    outer: AlignTopRetainer;
    constructor(outer: AlignTopRetainer) {
        super();
        this.outer = outer;
    }
    public before(): void {
        this.lines = 0;
        this.insertItem = this.firstItem = this.lastItem = this.minRightRow = null;
        this.overwriteInsert = this.shown = this.willHit = false;
    }
    public accept(item: BaseDanmaku): number {
        if (this.outer.mCancelFixingFlag) {
            return Consumer.ACTION_BREAK;
        }
        this.lines++;
        if (item == this.drawItem) {
            this.insertItem = item;
            this.lastItem = null;
            this.shown = true;
            this.willHit = false;
            return Consumer.ACTION_BREAK;
        }
        if (this.firstItem == null)
            this.firstItem = item;
        if (this.drawItem.paintHeight + item.getTop() > this.disp.getHeight()) {
            this.overwriteInsert = true;
            return Consumer.ACTION_BREAK;
        }
        if (this.minRightRow == null) {
            this.minRightRow = item;
        }
        else {
            if (this.minRightRow.getRight() >= item.getRight()) {
                this.minRightRow = item;
            }
        }
        // 检查碰撞
        this.willHit = DanmakuUtils.willHitInDuration(this.disp, item, this.drawItem, this.drawItem.getDuration(), this.drawItem.getTimer().currMillisecond);
        if (!this.willHit) {
            this.insertItem = item;
            return Consumer.ACTION_BREAK;
        }
        this.lastItem = item;
        return Consumer.ACTION_CONTINUE;
    }
    public result(): RetainerState {
        let retainerState: RetainerState = new RetainerState();
        retainerState.lines = this.lines;
        retainerState.firstItem = this.firstItem;
        retainerState.insertItem = this.insertItem;
        retainerState.lastItem = this.lastItem;
        retainerState.minRightRow = this.minRightRow;
        retainerState.overwriteInsert = this.overwriteInsert;
        retainerState.shown = this.shown;
        retainerState.willHit = this.willHit;
        return retainerState;
    }
}
class AlignTopRetainer implements IDanmakusRetainer {
    protected mVisibleDanmakus: Danmakus = new Danmakus({ sortType: ST_BY_YPOS });
    public mCancelFixingFlag: boolean = false;
    private mConsumerTop: RetainerConsumerTop = new RetainerConsumerTop(this);
    public fix(drawItem: BaseDanmaku, disp: IDisplayer, verifier: Verifier): void {
        if (drawItem.isOutside())
            return;
        let topPos: number = disp.getAllMarginTop();
        let lines: number = 0;
        let shown: boolean = drawItem.isShown();
        let willHit: boolean = !shown && !this.mVisibleDanmakus.isEmpty();
        let isOutOfVertialEdge: boolean = false;
        let removeItem: BaseDanmaku | any = null;
        let margin: number = disp.getMargin();
        if (!shown) {
            this.mCancelFixingFlag = false;
            // 确定弹幕位置
            let insertItem: BaseDanmaku | any = null;
            let firstItem: BaseDanmaku | any = null;
            let lastItem: BaseDanmaku | any = null;
            let minRightRow: BaseDanmaku | any = null;
            let overwriteInsert: boolean = false;
            this.mConsumerTop.disp = disp;
            this.mConsumerTop.drawItem = drawItem;
            this.mVisibleDanmakus.forEachSync(this.mConsumerTop);
            let retainerState: RetainerState = this.mConsumerTop.result();
            if (retainerState != null) {
                lines = retainerState.lines;
                insertItem = retainerState.insertItem;
                firstItem = retainerState.firstItem;
                lastItem = retainerState.lastItem;
                minRightRow = retainerState.minRightRow;
                overwriteInsert = retainerState.overwriteInsert;
                shown = retainerState.shown;
                willHit = retainerState.willHit;
            }
            let checkEdge: boolean = true;
            if (insertItem != null) {
                if (lastItem != null)
                    topPos = lastItem.getBottom() + margin;
                else
                    topPos = insertItem.getTop();
                if (insertItem != drawItem) {
                    removeItem = insertItem;
                    shown = false;
                }
            }
            else if (overwriteInsert && minRightRow != null) {
                topPos = minRightRow.getTop();
                checkEdge = false;
                shown = false;
            }
            else if (lastItem != null) {
                topPos = lastItem.getBottom() + margin;
                willHit = false;
            }
            else if (firstItem != null) {
                topPos = firstItem.getTop();
                removeItem = firstItem;
                shown = false;
            }
            else {
                topPos = disp.getAllMarginTop();
            }
            if (checkEdge) {
                isOutOfVertialEdge = this.isOutVerticalEdge(overwriteInsert, drawItem, disp, topPos, firstItem, lastItem);
            }
            if (isOutOfVertialEdge) {
                topPos = disp.getAllMarginTop();
                willHit = true;
                lines = 1;
            }
            else if (removeItem != null) {
                lines--;
            }
            if (topPos == disp.getAllMarginTop()) {
                shown = false;
            }
        }
        if (verifier != null && verifier.skipLayout(drawItem, topPos, lines, willHit)) {
            return;
        }
        if (isOutOfVertialEdge) {
            this.clear();
        }
        drawItem.layout(disp, drawItem.getLeft(), topPos);
        if (!shown) {
            this.mVisibleDanmakus.removeItem(removeItem);
            this.mVisibleDanmakus.addItem(drawItem);
        }
    }
    protected isOutVerticalEdge(overwriteInsert: boolean, drawItem: BaseDanmaku, disp: IDisplayer, topPos: number, firstItem: BaseDanmaku, lastItem: BaseDanmaku): boolean {
        if (topPos < disp.getAllMarginTop() || (firstItem != null && firstItem.getTop() > 0) || topPos + drawItem.paintHeight > disp.getHeight()) {
            return true;
        }
        return false;
    }
    public clear(): void {
        this.mCancelFixingFlag = true;
        this.mVisibleDanmakus.clear();
    }
}
class FTDanmakusRetainer extends AlignTopRetainer {
    protected isOutVerticalEdge(overwriteInsert: boolean, drawItem: BaseDanmaku, disp: IDisplayer, topPos: number, firstItem: BaseDanmaku, lastItem: BaseDanmaku): boolean {
        if (topPos + drawItem.paintHeight > disp.getHeight()) {
            return true;
        }
        return false;
    }
}
class RetainerConsumerBottom extends Consumer<BaseDanmaku, RetainerState> {
    public disp: IDisplayer | any;
    lines: number = 0;
    public removeItem: BaseDanmaku | any = null;
    public firstItem: BaseDanmaku | any = null;
    public drawItem: BaseDanmaku | any = null;
    willHit: boolean = false;
    topPos: number = 0;
    outer: AlignBottomRetainer;
    constructor(outer: AlignBottomRetainer) {
        super();
        this.outer = outer;
    }
    public before(): void {
        this.lines = 0;
        this.removeItem = this.firstItem = null;
        this.willHit = false;
    }
    public accept(item: BaseDanmaku): number {
        if (this.outer.mCancelFixingFlag) {
            return Consumer.ACTION_BREAK;
        }
        this.lines++;
        if (item == this.drawItem) {
            this.removeItem = null;
            this.willHit = false;
            return Consumer.ACTION_BREAK;
        }
        if (this.firstItem == null) {
            this.firstItem = item;
            if (this.firstItem.getBottom() != this.disp.getHeight()) {
                return Consumer.ACTION_BREAK;
            }
        }
        if (this.topPos < this.disp.getAllMarginTop()) {
            this.removeItem = null;
            return Consumer.ACTION_BREAK;
        }
        // 检查碰撞
        this.willHit = DanmakuUtils.willHitInDuration(this.disp, item, this.drawItem, this.drawItem.getDuration(), this.drawItem.getTimer().currMillisecond);
        if (!this.willHit) {
            this.removeItem = item;
            // topPos = item.getBottom() - drawItem.paintHeight;
            return Consumer.ACTION_BREAK;
        }
        this.topPos = item.getTop() - this.disp.getMargin() - this.drawItem.paintHeight;
        return Consumer.ACTION_CONTINUE;
    }
    public result(): RetainerState {
        let retainerState: RetainerState = new RetainerState();
        retainerState.lines = this.lines;
        retainerState.firstItem = this.firstItem;
        retainerState.removeItem = this.removeItem;
        retainerState.willHit = this.willHit;
        return retainerState;
    }
}
class AlignBottomRetainer extends FTDanmakusRetainer {
    private mConsumerBottom: RetainerConsumerBottom = new RetainerConsumerBottom(this);
    protected mVisibleDanmakus: Danmakus = new Danmakus({ sortType: ST_BY_YPOS_DESC });
    public fix(drawItem: BaseDanmaku, disp: IDisplayer, verifier: Verifier): void {
        if (drawItem.isOutside())
            return;
        let shown: boolean = drawItem.isShown();
        let topPos: number = shown ? drawItem.getTop() : -1;
        let lines: number = 0;
        let willHit: boolean = !shown && !this.mVisibleDanmakus.isEmpty();
        let isOutOfVerticalEdge: boolean = false;
        if (topPos < disp.getAllMarginTop()) {
            topPos = disp.getHeight() - drawItem.paintHeight;
        }
        let removeItem: BaseDanmaku | any = null;
        let firstItem: BaseDanmaku | any = null;
        if (!shown) {
            this.mCancelFixingFlag = false;
            this.mConsumerBottom.topPos = topPos;
            this.mConsumerBottom.disp = disp;
            this.mConsumerBottom.drawItem = drawItem;
            this.mVisibleDanmakus.forEachSync(this.mConsumerBottom);
            let retainerState: RetainerState = this.mConsumerBottom.result();
            topPos = this.mConsumerBottom.topPos;
            if (retainerState != null) {
                lines = retainerState.lines;
                firstItem = retainerState.firstItem;
                removeItem = retainerState.removeItem;
                shown = retainerState.shown;
                willHit = retainerState.willHit;
            }
            isOutOfVerticalEdge = this.isOutVerticalEdge(false, drawItem, disp, topPos, firstItem, null);
            if (isOutOfVerticalEdge) {
                topPos = disp.getHeight() - drawItem.paintHeight;
                willHit = true;
                lines = 1;
            }
            else {
                if (topPos >= disp.getAllMarginTop()) {
                    willHit = false;
                }
                if (removeItem != null) {
                    lines--;
                }
            }
        }
        if (verifier != null && verifier.skipLayout(drawItem, topPos, lines, willHit)) {
            return;
        }
        if (isOutOfVerticalEdge) {
            this.clear();
        }
        drawItem.layout(disp, drawItem.getLeft(), topPos);
        if (!shown) {
            this.mVisibleDanmakus.removeItem(removeItem);
            this.mVisibleDanmakus.addItem(drawItem);
        }
    }
    protected isOutVerticalEdge(overwriteInsert: boolean, drawItem: BaseDanmaku, disp: IDisplayer, topPos: number, firstItem: BaseDanmaku, lastItem: BaseDanmaku | null): boolean {
        if (topPos < disp.getAllMarginTop() || (firstItem != null && firstItem.getBottom() != disp.getHeight())) {
            return true;
        }
        return false;
    }
    public clear(): void {
        this.mCancelFixingFlag = true;
        this.mVisibleDanmakus.clear();
    }
}
