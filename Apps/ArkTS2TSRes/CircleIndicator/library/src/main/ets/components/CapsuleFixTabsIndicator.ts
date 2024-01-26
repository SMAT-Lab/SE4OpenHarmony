interface CapsuleFixTabsIndicator_Params {
    model?: CapsuleFixTabsModel;
    itemIndex?: number;
    titles?: string[];
    tabs?: Array<TabInfo>;
    colorsUtilsToS?: ColorGradient | null;
    colorsUtilsToN?: ColorGradient | null;
    startX?;
    isMove?: number;
    indicatorOffset?: number;
    timeoutId?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CapsuleFixTabsIndicator_" + ++__generate__Id;
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
import { CapsuleFixTabsModel } from '../models/CapsuleFixTabsModel';
import { TabInfo } from './model/TabInfo';
class CapsuleFixTabsIndicator extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new CapsuleFixTabsModel(null), this, "model");
        this.__itemIndex = new SynchedPropertySimpleTwoWay(params.itemIndex, this, "itemIndex");
        this.__titles = new ObservedPropertyObject([], this, "titles");
        this.tabs = [];
        this.colorsUtilsToS = null;
        this.colorsUtilsToN = null;
        this.startX = 0;
        this.isMove = 0;
        this.__indicatorOffset = new ObservedPropertySimple(0, this, "indicatorOffset");
        this.timeoutId = -1;
        this.updateWithValueParams(params);
        this.declareWatch("itemIndex", this.onIndexChange);
    }
    updateWithValueParams(params: CapsuleFixTabsIndicator_Params) {
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
        if (params.isMove !== undefined) {
            this.isMove = params.isMove;
        }
        if (params.indicatorOffset !== undefined) {
            this.indicatorOffset = params.indicatorOffset;
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
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<CapsuleFixTabsModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: CapsuleFixTabsModel) {
        this.__model.set(newValue);
    }
    private __itemIndex: SynchedPropertySimpleTwoWay<number>;
    get itemIndex() {
        return this.__itemIndex.get();
    }
    set itemIndex(newValue: number) {
        this.__itemIndex.set(newValue);
    }
    private __titles: ObservedPropertyObject<string[]>;
    get titles() {
        return this.__titles.get();
    }
    set titles(newValue: string[]) {
        this.__titles.set(newValue);
    }
    private tabs: Array<TabInfo>;
    private colorsUtilsToS: ColorGradient | null;
    private colorsUtilsToN: ColorGradient | null;
    private startX;
    private isMove: number;
    private __indicatorOffset: ObservedPropertySimple<number>;
    get indicatorOffset() {
        return this.__indicatorOffset.get();
    }
    set indicatorOffset(newValue: number) {
        this.__indicatorOffset.set(newValue);
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
            let item: TabInfo = {
                index: i,
                fontColor: this.model.getSelectedTextColor(),
                fontSize: this.model.getSelectedTextSize(),
                text: this.titles[i]
            };
            this.tabs.push(item);
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
            let fontColorDistance = Number.parseInt((distance * 100).toFixed(0)); // 偏移量 0 - 99
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
            let fontColorDistance = Number.parseInt((distance * 100).toFixed(0)); // 偏移量 0 - 9
            if (this.colorsUtilsToS)
                this.tabs[nextPage].fontColor = this.colorsUtilsToS.getColorByFraction(fontColorDistance);
            if (this.colorsUtilsToN)
                this.tabs[nextPage - 1].fontColor = this.colorsUtilsToN.getColorByFraction(fontColorDistance);
        }
        return 0;
    }
    render() {
        Stack.create();
        Stack.height(this.model.getHeight());
        Stack.width('100%');
        Stack.backgroundColor(this.model.getBackgroundColor());
        Stack.create({ alignContent: Alignment.Start });
        // 滑块
        Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        // 滑块
        Flex.width(this.model.getWidth() / this.tabs.length);
        // 滑块
        Flex.height('100%');
        // 滑块
        Flex.padding({
            top: this.model.getVerticalPadding(),
            right: this.model.getHorizontalPadding(),
            bottom: this.model.getVerticalPadding(),
            left: this.model.getHorizontalPadding()
        });
        // 滑块
        Flex.offset({
            x: this.model.isAnimation() ? ((this.model.getWidth() / this.tabs.length + 1) * (this.itemIndex - this.indicatorOffset / 1080)) : ((this.model.getWidth() / this.tabs.length) * (this.itemIndex)),
            y: 0
        });
        Text.create('');
        Text.border({
            width: this.model.getBorderWidth(),
            color: this.model.getFillColor(),
            radius: this.model.getRadius(),
            style: BorderStyle.Solid
        });
        Text.height('100%');
        Text.width('100%');
        Text.backgroundColor(this.model.getFillColor());
        Text.pop();
        // 滑块
        Flex.pop();
        // tab项
        Row.create();
        // tab项
        Row.border({
            width: this.model.getBorderWidth(),
            color: this.model.getFillColor(),
            radius: this.model.getRadius(),
            style: BorderStyle.Solid
        });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.tabs), (item: TabInfo) => {
            Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
            Flex.onClick(() => {
                this.model.getTabsController()?.changeIndex(item.index);
                this.itemIndex = item.index ? item.index : 0;
                if (this.model.getClickListener() && (item.index || item.index == 0)) {
                    this.model.getClickListener()(item.index);
                }
            });
            Flex.width(this.model.getWidth() / this.tabs.length);
            Flex.height('100%');
            Text.create(item.text);
            Text.fontSize(this.itemIndex === item.index ? this.model.getUnselectedTextSize() : this.model.getSelectedTextSize());
            Text.fontColor(this.itemIndex === item.index ? this.model.getSelectedTextColor() : this.model.getUnselectedTextColor());
            Text.pop();
            Flex.pop();
        }, (item: TabInfo) => JSON.stringify(item));
        ForEach.pop();
        // tab项
        Row.pop();
        Stack.pop();
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
            if ((offset >= 0 && currentIndex > 0) || (offset <= 0 && currentIndex < this.tabs.length - 1)) {
                this.indicatorOffset = offset;
            }
        }
        if (event.type === TouchType.Up) {
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
export default CapsuleFixTabsIndicator;
