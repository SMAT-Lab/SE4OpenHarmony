interface FixTabsIndicator_Params {
    model?: FixTabsModel;
    itemIndex?: number;
    titles?: Array<string>;
    tabs?: Array<TabInfo>;
    colorsUtilsToS?: ColorGradient | null;
    colorsUtilsToN?: ColorGradient | null;
    startX?;
    indicatorOffset?: number;
    isMove?: number;
    timeoutId?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "FixTabsIndicator_" + ++__generate__Id;
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
import { ColorGradient } from '../utils/ColorGradient';
import { FixTabsModel, CursorType } from '../models/FixTabsModel';
import { TabInfo } from './model/TabInfo';
class FixTabsIndicator extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new FixTabsModel(null), this, "model");
        this.__itemIndex = new SynchedPropertySimpleTwoWay(params.itemIndex, this, "itemIndex");
        this.__titles = new ObservedPropertyObject([], this, "titles");
        this.tabs = [];
        this.colorsUtilsToS = null;
        this.colorsUtilsToN = null;
        this.startX = 0;
        this.__indicatorOffset = new ObservedPropertySimple(0, this, "indicatorOffset");
        this.__isMove = new ObservedPropertySimple(0 // 0 停止  1左  2右
        , this, "isMove");
        this.timeoutId = -1;
        this.updateWithValueParams(params);
        this.declareWatch("itemIndex", this.onIndexChange);
    }
    updateWithValueParams(params: FixTabsIndicator_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.titles !== undefined) {
            this.titles = params.titles;
        }
        if (params.tabs !== undefined) {
            this.tabs = params.tabs;
        }
        if (params.colorsUtilsToS !== undefined) {
            this.colorsUtilsToS = params.colorsUtilsToS;
        }
        if (params.colorsUtilsToN !== undefined) {
            this.colorsUtilsToN = params.colorsUtilsToN;
        }
        if (params.startX !== undefined) {
            this.startX = params.startX;
        }
        if (params.indicatorOffset !== undefined) {
            this.indicatorOffset = params.indicatorOffset;
        }
        if (params.isMove !== undefined) {
            this.isMove = params.isMove;
        }
        if (params.timeoutId !== undefined) {
            this.timeoutId = params.timeoutId;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__itemIndex.aboutToBeDeleted();
        this.__titles.aboutToBeDeleted();
        this.__indicatorOffset.aboutToBeDeleted();
        this.__isMove.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<FixTabsModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: FixTabsModel) {
        this.__model.set(newValue);
    }
    private __itemIndex: SynchedPropertySimpleTwoWay<number>;
    get itemIndex() {
        return this.__itemIndex.get();
    }
    set itemIndex(newValue: number) {
        this.__itemIndex.set(newValue);
    }
    private __titles: ObservedPropertyObject<Array<string>>;
    get titles() {
        return this.__titles.get();
    }
    set titles(newValue: Array<string>) {
        this.__titles.set(newValue);
    }
    private tabs: Array<TabInfo>;
    private colorsUtilsToS: ColorGradient | null;
    private colorsUtilsToN: ColorGradient | null;
    private startX;
    private __indicatorOffset: ObservedPropertySimple<number>;
    get indicatorOffset() {
        return this.__indicatorOffset.get();
    }
    set indicatorOffset(newValue: number) {
        this.__indicatorOffset.set(newValue);
    }
    private __isMove: ObservedPropertySimple<number>; // 0 停止  1左  2右
    get isMove() {
        return this.__isMove.get();
    }
    set isMove(newValue: number) {
        this.__isMove.set(newValue);
    }
    private timeoutId: number;
    onIndexChange() {
        clearTimeout(this.timeoutId);
        this.reset();
    }
    aboutToAppear() {
        this.model.setOnPageTouchListener((event: TouchEvent, currentIndex: number) => {
            this.onIndicatorTouch(event, currentIndex);
        });
        this.colorsUtilsToS = new ColorGradient(this.model.getUnselectedTextColor(), this.model.getSelectedTextColor(), 100);
        this.colorsUtilsToN = new ColorGradient(this.model.getSelectedTextColor(), this.model.getUnselectedTextColor(), 100);
        for (let i = 0; i < this.titles.length; i++) {
            let temp: TabInfo = {
                index: i,
                text: this.titles[i],
                fontSize: this.model.getSelectedTextSize(),
                fontColor: this.model.getSelectedTextColor()
            };
            this.tabs.push(temp);
        }
    }
    private dealWithFont(offset: number): number {
        if (!offset)
            offset = 0;
        /**
         * 滑动结束
         */
        if (this.isMove == 0) {
            console.log('滑动结束');
            for (let i = 0; i < this.tabs.length; i++) {
                if (offset == i) {
                    this.tabs[i].fontSize = this.model.getSelectedTextSize();
                    this.tabs[i].fontColor = this.model.getSelectedTextColor();
                }
                else {
                    this.tabs[i].fontSize = this.model.getUnselectedTextSize();
                    this.tabs[i].fontColor = this.model.getUnselectedTextColor();
                }
            }
        }
        /**
         * 向左滑动
         */
        else if (this.isMove == 1) {
            if (offset <= 0)
                return 0;
            console.log('向左滑动');
            let nextPage = Math.floor(offset);
            let distance = 1 - Number.parseFloat((offset - Math.floor(offset)).toFixed(2));
            // 处理 文字大小 渐变
            let fontSizeOffset = (this.model.getSelectedTextSize() - this.model.getUnselectedTextSize()) * distance;
            this.tabs[nextPage].fontSize = this.model.getUnselectedTextSize() + fontSizeOffset;
            this.tabs[nextPage + 1].fontSize = this.model.getSelectedTextSize() - fontSizeOffset;
            // 处理 文字颜色 渐变
            let fontColorDistance: number = Number.parseInt((distance * 100).toFixed(0)); // 偏移量 0 - 99
            if (this.colorsUtilsToS)
                this.tabs[nextPage].fontColor = this.colorsUtilsToS.getColorByFraction(fontColorDistance);
            if (this.colorsUtilsToN)
                this.tabs[nextPage + 1].fontColor = this.colorsUtilsToN.getColorByFraction(fontColorDistance);
        }
        /**
         * 向右滑动
         */
        else if (this.isMove == 2) {
            if (offset >= this.tabs.length - 1)
                return 0;
            console.log('向右滑动');
            let nextPage = Math.ceil(offset);
            let distance = Number.parseFloat((offset - Math.floor(offset)).toFixed(2)); // 偏移量 0.00 - 1.00
            // 处理 文字大小 渐变
            let fontSizeOffset = (this.model.getSelectedTextSize() - this.model.getUnselectedTextSize()) * distance;
            this.tabs[nextPage].fontSize = this.model.getUnselectedTextSize() + fontSizeOffset;
            this.tabs[nextPage - 1].fontSize = this.model.getSelectedTextSize() - fontSizeOffset;
            // 处理 文字颜色 渐变
            let fontColorDistance: number = Number.parseInt((distance * 100).toFixed(0)); // 偏移量 0 - 99
            if (this.colorsUtilsToS)
                this.tabs[nextPage].fontColor = this.colorsUtilsToS.getColorByFraction(fontColorDistance);
            if (this.colorsUtilsToN)
                this.tabs[nextPage - 1].fontColor = this.colorsUtilsToN.getColorByFraction(fontColorDistance);
        }
        return 0;
    }
    render() {
        Stack.create({ alignContent: Alignment.Start });
        Stack.width(this.model.getWidth());
        Stack.height(this.model.getHeight());
        Stack.backgroundColor(this.model.getBackgroundColor());
        // 滑块
        Flex.create({
            direction: FlexDirection.Column,
            justifyContent: (this.model.getCursorType() == CursorType.Overline) ? FlexAlign.Start :
                (this.model.getCursorType() == CursorType.Underline) ? FlexAlign.End : FlexAlign.Center
        });
        // 滑块
        Flex.height('100%');
        // 滑块
        Flex.width(360 / this.tabs.length);
        // 滑块
        Flex.offset({
            x: this.model.isAnimation() ? (360 / this.tabs.length * (this.itemIndex - this.indicatorOffset / 1080)) : ((360 / this.tabs.length) * (this.itemIndex)),
            y: 0
        });
        If.create();
        if (this.model.getCursorType() == CursorType.Block) {
            If.branchId(0);
            Stack.create({ alignContent: Alignment.Center });
            Stack.width('100%');
            Stack.height('100%');
            Text.create('');
            Text.width('100%');
            Text.height(this.model.getBgHeightPercent());
            Text.backgroundColor(this.model.getCursorColor());
            Text.borderRadius(this.model.getCursorRadius());
            Text.pop();
            Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
            Flex.width('100%');
            Flex.height(this.model.getBgHeightPercent());
            If.create();
            if (this.model.getCursorImage() !== null) {
                If.branchId(0);
                Image.create(this.model.getCursorImage());
                Image.width('100%');
                Image.height('60%');
                Image.objectFit(ImageFit.ScaleDown);
            }
            If.pop();
            If.create();
            if (this.model.getCursorText() !== '') {
                If.branchId(0);
                Column.create();
                Column.margin({ top: '1%' });
                Text.create(this.model.getCursorText());
                Text.fontSize(9);
                Text.fontColor('#ffffff');
                Text.maxLines(1);
                Text.padding({ left: vp2px(5), right: vp2px(5) });
                Text.textAlign(TextAlign.Center);
                Text.pop();
                Column.pop();
            }
            If.pop();
            Flex.pop();
            Stack.pop();
        }
        else {
            If.branchId(1);
            Text.create('');
            Text.width('100%');
            Text.height(this.model.getLineHeight());
            Text.backgroundColor(this.model.getLineColor());
            Text.pop();
        }
        If.pop();
        // 滑块
        Flex.pop();
        Row.create();
        Row.width('100%');
        Row.height('100%');
        ForEach.create("2", this, ObservedObject.GetRawObject(this.tabs), (item: TabInfo) => {
            Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
            Flex.width(360 / this.tabs.length);
            Flex.height('100%');
            Flex.onClick(() => {
                this.itemIndex = item.index ? item.index : 0;
                this.model.getTabsController()?.changeIndex(item.index);
                if (this.model.getClickListener() && (item.index || item.index == 0)) {
                    this.model.getClickListener()(item.index);
                }
            });
            Text.create(item.text);
            Text.fontSize(this.itemIndex === item.index ? this.model.getUnselectedTextSize() : this.model.getSelectedTextSize());
            Text.fontColor(this.itemIndex === item.index ? this.model.getSelectedTextColor() : this.model.getUnselectedTextColor());
            Text.pop();
            Flex.pop();
        }, (item: TabInfo) => JSON.stringify(item));
        ForEach.pop();
        Row.pop();
        Stack.pop();
    }
    onIndicatorTouch(event: TouchEvent, currentIndex: number) {
        let startX = this.startX;
        let offset = 0;
        if (event.type === TouchType.Down) {
            this.startX = event.touches[0].x;
        }
        if (event.type === TouchType.Move) {
            offset = event.touches[0].x - startX;
            if (offset <= 0) {
                this.isMove = 2;
            }
            else {
                this.isMove = 1;
            }
            if ((offset >= 0 && currentIndex > 0) || (offset <= 0 && currentIndex < this.titles.length - 1)) {
                this.indicatorOffset = offset;
            }
        }
        if (event.type === TouchType.Up) {
            this.model.getTabsController()?.changeIndex(currentIndex);
            this.timeoutId = setTimeout(() => {
                offset = 0;
                this.reset();
            }, 750);
        }
    }
    reset() {
        this.indicatorOffset = 0;
        this.isMove = 0;
        if (this.model.getChangeListener()) {
            this.model.getChangeListener()(this.itemIndex);
        }
    }
}
export default FixTabsIndicator;
