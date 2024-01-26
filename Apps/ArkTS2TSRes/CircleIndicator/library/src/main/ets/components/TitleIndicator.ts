interface TitleIndicator_Params {
    titles?: string[];
    itemIndex?: number;
    model?: TitleModel;
    listBounds?: Array<Bounds>;
    horizontalVpOffsets?: number[];
    // 记录延时动画id, 每次触发touch事件后丢弃之前未播放完的动画, 防止快速连续切换后状态混乱
    timeoutId?: number;
    // 记录动画结束后应显示的目标下标, 当快速点击左右按钮时立刻以目标下标为当前下标, 防止多次点击过程中下标一直不刷新
    targetIndex?: number;
    // touch 事件处理
    movedDuringTouch?: boolean;
    startX?: number;
    // up事件和最后一个move事件坐标的坐标相同，因此需要记录最后两个move事件的坐标才能计算出最后一次滑动的速度
    lastX?: number;
    lastX2?: number;
    // 有三套offset 逻辑
    // originalOffset 与 originalIndex 对应当前page的滑动动作 在一次滑动中 originalIndex始终不变， originalOffset 范围 [-1, 1]
    // centerOffset 与 centerIndex 对应当前最接近屏幕中间的indicator、title。
    // originalOffset在[-0.5,0.5] 区间时，原始页仍占屏幕中央部分, centerIndex == originalIndex, centerIndex 范围 [-1, 1]
    // originalOffset在[-1, -0.5) 区间时, 原始页右页占屏幕中央部分, centerIndex == originalIndex + 1, centerIndex 范围 [0, 1)
    // originalOffset在(0.5, 1] 区间时, 原始页右页占屏幕中央部分, centerIndex == originalIndex - 1, centerIndex 范围 (-1, 0]
    // vpOffsets 存储每个title的水平位移 单位vp
    originalIndex?: number;
    originalOffset?: number;
    centerOffset?: number;
    centerIndex?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TitleIndicator_" + ++__generate__Id;
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
import MeasurableText from './inner_components/MeasurableText';
import { evaluateTextHeight } from '../utils/UiUtil';
import { TitleModel, Bounds, IndicatorStyle, LinePosition } from '../models/TitleModel';
const SPEED_THRESHOLD: number = 30;
const FLING_INTERVAL: number = 20;
const FLING_OFFSET_PER_FRAME: number = 0.1;
class TitleIndicator extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__titles = new ObservedPropertyObject([], this, "titles");
        this.__itemIndex = new SynchedPropertySimpleTwoWay(params.itemIndex, this, "itemIndex");
        this.__model = new ObservedPropertyObject(new TitleModel(null), this, "model");
        this.listBounds = [];
        this.__horizontalVpOffsets = new ObservedPropertyObject([]
        // 记录延时动画id, 每次触发touch事件后丢弃之前未播放完的动画, 防止快速连续切换后状态混乱
        , this, "horizontalVpOffsets");
        this.timeoutId = -1;
        this.targetIndex = -1;
        this.movedDuringTouch = false;
        this.startX = 0;
        this.lastX = 0;
        this.lastX2 = 0;
        this.originalIndex = 0;
        this.__originalOffset = new ObservedPropertySimple(0, this, "originalOffset");
        this.centerOffset = 0;
        this.centerIndex = 0;
        this.updateWithValueParams(params);
        this.declareWatch("titles", this.onTitlesUpdate);
        this.declareWatch("originalOffset", this.onOriginalOffsetChange);
    }
    updateWithValueParams(params: TitleIndicator_Params) {
        if (params.titles !== undefined) {
            this.titles = params.titles;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.listBounds !== undefined) {
            this.listBounds = params.listBounds;
        }
        if (params.horizontalVpOffsets !== undefined) {
            this.horizontalVpOffsets = params.horizontalVpOffsets;
        }
        if (params.timeoutId !== undefined) {
            this.timeoutId = params.timeoutId;
        }
        if (params.targetIndex !== undefined) {
            this.targetIndex = params.targetIndex;
        }
        if (params.movedDuringTouch !== undefined) {
            this.movedDuringTouch = params.movedDuringTouch;
        }
        if (params.startX !== undefined) {
            this.startX = params.startX;
        }
        if (params.lastX !== undefined) {
            this.lastX = params.lastX;
        }
        if (params.lastX2 !== undefined) {
            this.lastX2 = params.lastX2;
        }
        if (params.originalIndex !== undefined) {
            this.originalIndex = params.originalIndex;
        }
        if (params.originalOffset !== undefined) {
            this.originalOffset = params.originalOffset;
        }
        if (params.centerOffset !== undefined) {
            this.centerOffset = params.centerOffset;
        }
        if (params.centerIndex !== undefined) {
            this.centerIndex = params.centerIndex;
        }
    }
    aboutToBeDeleted() {
        this.__titles.aboutToBeDeleted();
        this.__itemIndex.aboutToBeDeleted();
        this.__model.aboutToBeDeleted();
        this.__horizontalVpOffsets.aboutToBeDeleted();
        this.__originalOffset.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __titles: ObservedPropertyObject<string[]>;
    get titles() {
        return this.__titles.get();
    }
    set titles(newValue: string[]) {
        this.__titles.set(newValue);
    }
    private __itemIndex: SynchedPropertySimpleTwoWay<number>;
    get itemIndex() {
        return this.__itemIndex.get();
    }
    set itemIndex(newValue: number) {
        this.__itemIndex.set(newValue);
    }
    private __model: ObservedPropertyObject<TitleModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: TitleModel) {
        this.__model.set(newValue);
    }
    private listBounds: Array<Bounds>;
    private __horizontalVpOffsets: ObservedPropertyObject<number[]>;
    get horizontalVpOffsets() {
        return this.__horizontalVpOffsets.get();
    }
    set horizontalVpOffsets(newValue: number[]) {
        this.__horizontalVpOffsets.set(newValue);
    }
    // 记录延时动画id, 每次触发touch事件后丢弃之前未播放完的动画, 防止快速连续切换后状态混乱
    private timeoutId: number;
    // 记录动画结束后应显示的目标下标, 当快速点击左右按钮时立刻以目标下标为当前下标, 防止多次点击过程中下标一直不刷新
    private targetIndex: number;
    // touch 事件处理
    private movedDuringTouch: boolean;
    private startX: number;
    // up事件和最后一个move事件坐标的坐标相同，因此需要记录最后两个move事件的坐标才能计算出最后一次滑动的速度
    private lastX: number;
    private lastX2: number;
    // 有三套offset 逻辑
    // originalOffset 与 originalIndex 对应当前page的滑动动作 在一次滑动中 originalIndex始终不变， originalOffset 范围 [-1, 1]
    // centerOffset 与 centerIndex 对应当前最接近屏幕中间的indicator、title。
    // originalOffset在[-0.5,0.5] 区间时，原始页仍占屏幕中央部分, centerIndex == originalIndex, centerIndex 范围 [-1, 1]
    // originalOffset在[-1, -0.5) 区间时, 原始页右页占屏幕中央部分, centerIndex == originalIndex + 1, centerIndex 范围 [0, 1)
    // originalOffset在(0.5, 1] 区间时, 原始页右页占屏幕中央部分, centerIndex == originalIndex - 1, centerIndex 范围 (-1, 0]
    // vpOffsets 存储每个title的水平位移 单位vp
    private originalIndex: number;
    private __originalOffset: ObservedPropertySimple<number>;
    get originalOffset() {
        return this.__originalOffset.get();
    }
    set originalOffset(newValue: number) {
        this.__originalOffset.set(newValue);
    }
    private centerOffset: number;
    private centerIndex: number;
    triangleIndicator(isTop: boolean, parent = null) {
        If.create();
        if (isTop) {
            If.branchId(0);
            Path.create();
            Path.fill(this.model.getFooterColor());
            Path.width(this.model.getFooterIndicatorHeight() * 2);
            Path.height(this.model.getFooterIndicatorHeight());
            Path.commands('M0 0 H' + vp2px(this.model.getFooterIndicatorHeight() * 2) + ' L'
                + vp2px(this.model.getFooterIndicatorHeight()) + ' ' + vp2px(this.model.getFooterIndicatorHeight()) + ' Z');
        }
        else {
            If.branchId(1);
            Path.create();
            Path.fill(this.model.getFooterColor());
            Path.width(this.model.getFooterIndicatorHeight() * 2);
            Path.height(this.model.getFooterIndicatorHeight());
            Path.commands('M0 ' + vp2px(this.model.getFooterIndicatorHeight()) + ' L' + vp2px(this.model.getFooterIndicatorHeight())
                + ' 0 L' + vp2px(this.model.getFooterIndicatorHeight() * 2) + ' ' + vp2px(this.model.getFooterIndicatorHeight()) + ' Z');
        }
        If.pop();
    }
    underlineIndicator(parent = null) {
        Rect.create();
        Rect.fill(this.model.getFooterColor());
        Rect.width((this.listBounds[this.centerIndex] ? this.listBounds[this.centerIndex].right : 0)
            + 2 * this.model.getFooterIndicatorUnderlinePadding());
        Rect.height(this.model.getFooterIndicatorHeight());
        Rect.opacity(Math.max(1 - Math.abs(this.centerOffset) * 2, 0));
        Rect.translate({ x: this.horizontalVpOffsets[this.centerIndex] });
    }
    render() {
        Column.create();
        Column.width(this.model.getWidth());
        Column.height(this.model.getHeight() === undefined
            ? (this.model.getTopPadding()
                + evaluateTextHeight(this.model.getTextSize())
                + this.model.getFooterIndicatorPadding()
                + (this.model.getFooterIndicatorStyle() === IndicatorStyle.NONE ? 0 : this.model.getFooterIndicatorHeight())
                + this.model.getFooterLineHeight()) // 总高度分五部分 顶部padding、文字区高度、文字区与footer间padding、footer滑块高度、footer底线高度
            : this.model.getHeight());
        Column.backgroundColor(this.model.getBackgroundColor());
        If.create();
        // 顶部 indicator 区域
        if (this.model.getLinePosition() === LinePosition.TOP) {
            If.branchId(0);
            Rect.create();
            Rect.fill(this.model.getFooterColor());
            Rect.width('100%');
            Rect.height(this.model.getFooterLineHeight());
            If.create();
            if (this.model.getFooterIndicatorStyle() === IndicatorStyle.TRIANGLE) {
                If.branchId(0);
                this.triangleIndicator(true, this);
            }
            else if (this.model.getFooterIndicatorStyle() === IndicatorStyle.UNDERLINE) {
                If.branchId(1);
                this.underlineIndicator(this);
            }
            If.pop();
        }
        If.pop();
        // titles 区域
        Stack.create();
        // titles 区域
        Stack.onTouch((event: TouchEvent) => {
            this.onIndicatorTouch(event, this.originalIndex, true);
        });
        // titles 区域
        Stack.margin({ top: this.model.getTopPadding(), bottom: this.model.getFooterIndicatorPadding() });
        // titles 区域
        Stack.width('100%');
        ForEach.create("3", this, ObservedObject.GetRawObject(this.titles), (item: string, index: number) => {
            Stack.create();
            Stack.translate({ x: this.horizontalVpOffsets[index] });
            let earlierCreatedChild_2: MeasurableText = (this && this.findChildById) ? this.findChildById("2") as MeasurableText : undefined;
            if (earlierCreatedChild_2 == undefined) {
                View.create(new MeasurableText("2", this, { text: item,
                    model: new MeasurableText.Model()
                        .setFontSize(this.model.getTextSize())
                        .setFontWeight((this.centerIndex === index && Math.abs(this.centerOffset) <= 0.1 && this.model.isSelectedBold())
                        ? FontWeight.Bold
                        : FontWeight.Normal)
                        .setTextColor(this.model.getTextColor())
                        .setSelectedColor(this.model.getSelectedColor())
                        .setFontFamily(this.model.getFontFamily())
                        .setCenterOffset(this.centerIndex === index ? Math.min(Math.abs(this.centerOffset) * 2, 1) : 1)
                        .setMeasuredListener((key: any, width: number, height: number) => {
                        this.listBounds[key as number] = new Bounds(0, 0, width, height);
                        this.onOriginalOffsetChange(); //由于Text宽度测量完成，需要重新计算每个Text的位移
                    }, index)
                }));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({
                    text: item,
                    model: new MeasurableText.Model()
                        .setFontSize(this.model.getTextSize())
                        .setFontWeight((this.centerIndex === index && Math.abs(this.centerOffset) <= 0.1 && this.model.isSelectedBold())
                        ? FontWeight.Bold
                        : FontWeight.Normal)
                        .setTextColor(this.model.getTextColor())
                        .setSelectedColor(this.model.getSelectedColor())
                        .setFontFamily(this.model.getFontFamily())
                        .setCenterOffset(this.centerIndex === index ? Math.min(Math.abs(this.centerOffset) * 2, 1) : 1)
                        .setMeasuredListener((key: any, width: number, height: number) => {
                        this.listBounds[key as number] = new Bounds(0, 0, width, height);
                        this.onOriginalOffsetChange(); //由于Text宽度测量完成，需要重新计算每个Text的位移
                    }, index)
                });
                View.create(earlierCreatedChild_2);
            }
            Stack.pop();
        }, (item: string) => JSON.stringify(item));
        ForEach.pop();
        // titles 区域
        Stack.pop();
        If.create();
        // 底部indicator 区域
        if (this.model.getLinePosition() === LinePosition.BOTTOM) {
            If.branchId(0);
            If.create();
            if (this.model.getFooterIndicatorStyle() === IndicatorStyle.TRIANGLE) {
                If.branchId(0);
                this.triangleIndicator(false, this);
            }
            else if (this.model.getFooterIndicatorStyle() === IndicatorStyle.UNDERLINE) {
                If.branchId(1);
                this.underlineIndicator(this);
            }
            If.pop();
            Rect.create();
            Rect.fill(this.model.getFooterColor());
            Rect.width('100%');
            Rect.height(this.model.getFooterLineHeight());
        }
        If.pop();
        Column.pop();
    }
    onTitlesUpdate() {
        if (this.listBounds.length != this.titles.length) {
            this.listBounds = Array.from({ length: this.titles.length }, (item: string, index: number) => new Bounds(0, 0, 0, 0));
            this.horizontalVpOffsets = Array.from({ length: this.titles.length }, (item: string, index: number) => 0);
        }
    }
    aboutToAppear() {
        this.listBounds = Array.from({ length: this.titles.length }, (item: string, index: number) => new Bounds(0, 0, 0, 0));
        this.horizontalVpOffsets = Array.from({ length: this.titles.length }, (item: string, index: number) => 0);
        this.originalIndex = this.itemIndex;
        this.model.setOnPageTouchListener((event: TouchEvent, currentIndex: number) => {
            this.onIndicatorTouch(event, currentIndex);
        });
    }
    onIndicatorTouch(event: TouchEvent, currentIndex: number, fromIndicator: boolean = false) {
        switch (event.type) {
            case TouchType.Down:
                this.startX = (event.changedTouches[0].screenX);
                this.lastX2 = this.startX;
                this.lastX = this.startX;
                this.originalOffset = 0;
                this.movedDuringTouch = false;
                break;
            case TouchType.Move:
                this.lastX2 = this.lastX;
                this.lastX = (event.changedTouches[0].screenX);
                this.originalOffset = (this.lastX - this.startX) / this.model.getWidth();
                this.movedDuringTouch = true;
                break;
            case TouchType.Up:
            case TouchType.Cancel:
                let currentX: number = (event.changedTouches[0].screenX);
                let nextIndex = currentIndex;
                if (fromIndicator && !this.movedDuringTouch) { // 将indicator点击事件统一到touch事件里处理
                    if (this.model.centerItemClickListener) {
                        this.model.centerItemClickListener(currentIndex);
                    }
                }
                else {
                    let speed: number = currentX - this.lastX2;
                    if (speed > SPEED_THRESHOLD) {
                        nextIndex = Math.max(currentIndex - 1, 0);
                    }
                    else if (speed < -SPEED_THRESHOLD) {
                        nextIndex = Math.min(currentIndex + 1, this.titles.length - 1);
                    }
                    else { // 慢速滑动, 根据位移决定index
                        if (Math.abs(this.lastX - this.startX) > this.model.getWidth() / 3) {
                            if (this.lastX - this.startX < 0) {
                                nextIndex = Math.min(currentIndex + 1, this.titles.length - 1);
                            }
                            else {
                                nextIndex = Math.max(currentIndex - 1, 0);
                            }
                        }
                        else {
                            nextIndex = currentIndex;
                        }
                    }
                }
                this.movedDuringTouch = false;
                this.targetIndex = nextIndex;
                this.timeoutId = setTimeout(() => {
                    this.refreshOffsetForFling(this.originalIndex, this.originalOffset, nextIndex);
                    this.originalOffset = 0;
                    clearTimeout(this.timeoutId);
                }, FLING_INTERVAL);
                break;
        }
    }
    // 为减少调用次数优化性能,只监听了 originalOffset属性, 当同时更新originalIndex与originalOffset时, 需确保originalOffset最后赋值
    onOriginalOffsetChange() {
        let originalIndex = this.originalIndex;
        let originalOffset = this.originalOffset;
        if (originalOffset > 0.5) {
            this.centerIndex = Math.max(0, originalIndex - 1);
            // 已经是第一页且滑动过半的话,保持第一页的滑块在最右位置
            this.centerOffset = originalIndex === 0 ? 1 : (originalOffset - 1) * 2;
        }
        else if (originalOffset < -0.5) {
            this.centerIndex = Math.min(this.titles.length - 1, originalIndex + 1);
            // 已经是最后一页且滑动过半的话,保持最后一页的滑块在最右位置
            this.centerOffset = originalIndex === this.titles.length - 1 ? -1 : (originalOffset + 1) * 2;
        }
        else {
            this.centerIndex = originalIndex;
            this.centerOffset = originalOffset * 2;
        }
        this.calcHorizontalVpOffsets(this.centerIndex, this.centerOffset);
    }
    onIndexChange() {
        this.itemIndex = this.originalIndex;
        if (this.model.getChangeListener()) {
            this.model.getChangeListener()(this.originalIndex);
        }
    }
    // 重新计算当前滑动状态下每个Text所需的位移
    calcHorizontalVpOffsets(centerIndex: number, centerOffset: number) {
        this.horizontalVpOffsets[centerIndex] = ((this.model.getWidth() - this.listBounds[centerIndex].right) / 2
            - this.model.getClipPadding()) * centerOffset;
        if (centerIndex > 0) {
            if ((this.model.getWidth() - this.listBounds[centerIndex].right) / 2 + this.horizontalVpOffsets[centerIndex]
                - this.model.getTitlePadding() < this.model.getClipPadding() + this.listBounds[centerIndex - 1].right) {
                this.horizontalVpOffsets[centerIndex - 1] = -this.listBounds[centerIndex].right / 2
                    + this.horizontalVpOffsets[centerIndex] - this.model.getTitlePadding() - this.listBounds[centerIndex - 1].right / 2;
            }
            else {
                this.horizontalVpOffsets[centerIndex - 1] = this.model.getClipPadding() - this.model.getWidth() / 2
                    + this.listBounds[centerIndex - 1].right / 2;
            }
            for (let i = centerIndex - 2; i >= 0; i--) {
                this.horizontalVpOffsets[i] = this.horizontalVpOffsets[i + 1] - (this.listBounds[i].right + this.listBounds[i + 1].right) / 2
                    - this.model.getTitlePadding();
            }
        }
        if (centerIndex < this.titles.length - 1) {
            if (this.listBounds[centerIndex].right / 2 + this.horizontalVpOffsets[centerIndex] + this.model.getTitlePadding()
                + this.listBounds[centerIndex + 1].right + this.model.getClipPadding() > this.model.getWidth() / 2) {
                this.horizontalVpOffsets[centerIndex + 1] = this.listBounds[centerIndex].right / 2 + this.horizontalVpOffsets[centerIndex]
                    + this.model.getTitlePadding() + this.listBounds[centerIndex + 1].right / 2;
            }
            else {
                this.horizontalVpOffsets[centerIndex + 1] = this.model.getWidth() / 2 - this.model.getClipPadding()
                    - this.listBounds[centerIndex + 1].right / 2;
            }
            for (let i = centerIndex + 2; i <= this.titles.length - 1; i++) {
                this.horizontalVpOffsets[i] = this.horizontalVpOffsets[i - 1] + (this.listBounds[i].right
                    + this.listBounds[i - 1].right) / 2 + this.model.getTitlePadding();
            }
        }
    }
    // 通过定时更新index, 补全松手后indicator区域的fling动画
    refreshOffsetForFling(originalIndex: number, originalOffset: number, nextIndex: number) {
        if (nextIndex === originalIndex) {
            if (Math.abs(originalOffset) <= FLING_OFFSET_PER_FRAME) {
                this.originalOffset = 0;
            }
            else {
                this.originalOffset = (Math.abs(this.originalOffset) - FLING_OFFSET_PER_FRAME) * Math.sign(this.originalOffset);
                clearTimeout(this.timeoutId);
                this.timeoutId = setTimeout(() => { this.refreshOffsetForFling(originalIndex, this.originalOffset, nextIndex); }, FLING_INTERVAL);
            }
        }
        else if (nextIndex > originalIndex) { //显示下一页 说明往左滑动 offset 为负
            if (originalOffset <= -(1 - FLING_OFFSET_PER_FRAME)) {
                this.originalIndex = nextIndex;
                this.onIndexChange();
                this.originalOffset = 0;
            }
            else {
                this.originalOffset -= FLING_OFFSET_PER_FRAME;
                clearTimeout(this.timeoutId);
                this.timeoutId = setTimeout(() => { this.refreshOffsetForFling(originalIndex, this.originalOffset, nextIndex); }, FLING_INTERVAL);
            }
        }
        else if (nextIndex < originalIndex) {
            if (originalOffset >= 1 - FLING_OFFSET_PER_FRAME) {
                this.originalIndex = nextIndex;
                this.onIndexChange();
                this.originalOffset = 0;
            }
            else {
                this.originalOffset += FLING_OFFSET_PER_FRAME;
                clearTimeout(this.timeoutId);
                this.timeoutId = setTimeout(() => { this.refreshOffsetForFling(originalIndex, this.originalOffset, nextIndex); }, FLING_INTERVAL);
            }
        }
    }
}
export default TitleIndicator;
