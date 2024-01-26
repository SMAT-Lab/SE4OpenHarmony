interface BottomTabsIndicator_Params {
    model?: BottomTabsModel;
    itemIndex?: number;
    titles?: TabIcon[];
    colorsUtilsToS?: ColorGradient | null;
    colorsUtilsToN?: ColorGradient | null;
    tabs?: Array<TabInfo>;
    startX?;
    indicatorOffset?;
    isMove?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BottomTabsIndicator_" + ++__generate__Id;
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
import { BottomTabsModel } from '../models/BottomTabsModel';
import { TabIcon } from './model/TabIcon';
import { TabInfo } from './model/TabInfo';
class BottomTabsIndicator extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new BottomTabsModel(null), this, "model");
        this.__itemIndex = new SynchedPropertySimpleTwoWay(params.itemIndex, this, "itemIndex");
        this.__titles = new ObservedPropertyObject([], this, "titles");
        this.colorsUtilsToS = null;
        this.colorsUtilsToN = null;
        this.tabs = [];
        this.startX = 0;
        this.indicatorOffset = 0;
        this.isMove = 0 // 0 停止  1左  2右
        ;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BottomTabsIndicator_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.titles !== undefined) {
            this.titles = params.titles;
        }
        if (params.colorsUtilsToS !== undefined) {
            this.colorsUtilsToS = params.colorsUtilsToS;
        }
        if (params.colorsUtilsToN !== undefined) {
            this.colorsUtilsToN = params.colorsUtilsToN;
        }
        if (params.tabs !== undefined) {
            this.tabs = params.tabs;
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
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__itemIndex.aboutToBeDeleted();
        this.__titles.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<BottomTabsModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: BottomTabsModel) {
        this.__model.set(newValue);
    }
    private __itemIndex: SynchedPropertySimpleTwoWay<number>;
    get itemIndex() {
        return this.__itemIndex.get();
    }
    set itemIndex(newValue: number) {
        this.__itemIndex.set(newValue);
    }
    private __titles: ObservedPropertyObject<TabIcon[]>;
    get titles() {
        return this.__titles.get();
    }
    set titles(newValue: TabIcon[]) {
        this.__titles.set(newValue);
    }
    private colorsUtilsToS: ColorGradient | null;
    private colorsUtilsToN: ColorGradient | null;
    private tabs: Array<TabInfo>;
    private startX;
    private indicatorOffset;
    private isMove: number; // 0 停止  1左  2右
    aboutToAppear() {
        this.model.setOnPageTouchListener((event: TouchEvent, currentIndex: number) => {
            this.onIndicatorTouch(event, currentIndex);
        });
        this.colorsUtilsToS = new ColorGradient(this.model.getUnselectedTextColor(), this.model.getSelectedTextColor(), 100);
        this.colorsUtilsToN = new ColorGradient(this.model.getSelectedTextColor(), this.model.getUnselectedTextColor(), 100);
        for (let i = 0; i < this.titles.length; i++) {
            let temp: TabInfo = {
                index: i,
                tab: this.titles[i],
                fontSize: this.model.getUnselectedTextSize(),
                fontColor: this.model.getUnselectedTextColor(),
                iconSize: this.model.getUnselectedIconSize(),
                isCenterView: false
            };
            this.tabs.push(temp);
        }
        if (this.model.getCenterImage() !== null) {
            let arr: TabInfo = {
                isCenterView: true,
                fontSize: this.model.getUnselectedTextSize(),
                fontColor: this.model.getUnselectedTextColor(),
                iconSize: this.model.getUnselectedIconSize(),
                src: this.model.getCenterImage()
            };
            this.tabs.splice(Math.floor(this.tabs.length / 2), 0, arr);
        }
    }
    private dealWithFont(offset: number): number {
        if (!offset)
            offset = 0;
        let centerIndex = -1;
        if (this.model.getCenterImage() != null) {
            centerIndex = Math.floor(this.tabs.length / 2); // 中间的图片所在的索引
        }
        /**
         * 滑动结束
         */
        if (this.isMove == 0) {
            console.log('滑动结束 ' + offset);
            if (centerIndex !== -1 && offset >= centerIndex) {
                offset = offset + 1;
            }
            for (let i = 0; i < this.tabs.length; i++) {
                if (offset == i) {
                    this.tabs[i].fontSize = this.model.getSelectedTextSize();
                    this.tabs[i].fontColor = this.model.getSelectedTextColor();
                    this.tabs[i].iconSize = this.model.getSelectedIconSize();
                }
                else {
                    this.tabs[i].fontSize = this.model.getUnselectedTextSize();
                    this.tabs[i].fontColor = this.model.getUnselectedTextColor();
                    this.tabs[i].iconSize = this.model.getUnselectedIconSize();
                }
            }
        }
        /**
         * 向左滑动
         */
        else if (this.isMove == 1) {
            if (offset <= 0)
                return 0;
            if (centerIndex !== -1) {
                offset = offset + 1;
            }
            let nextPage = Math.floor(offset); // 下一页
            let previousPage = nextPage + 1; // 上一页
            if (centerIndex !== -1 && nextPage <= centerIndex) {
                nextPage = nextPage - 1;
                if (centerIndex == previousPage) {
                    previousPage = nextPage + 1;
                }
                else {
                    //          previousPage = nextPage + 1
                }
            }
            console.log('向左滑动 上一页：' + previousPage + '下一页：' + nextPage);
            let distance = 1 - Number.parseFloat((offset - Math.floor(offset)).toFixed(2));
            // 处理 文字大小 渐变
            let fontSizeOffset = (this.model.getSelectedTextSize() - this.model.getUnselectedTextSize()) * distance;
            this.tabs[nextPage].fontSize = this.model.getUnselectedTextSize() + fontSizeOffset;
            this.tabs[previousPage].fontSize = this.model.getSelectedTextSize() - fontSizeOffset;
            // 处理 文字颜色 渐变
            let fontColorDistance = Number.parseInt((distance * 100).toFixed(0)); // 偏移量 0 - 99
            if (this.colorsUtilsToS)
                this.tabs[nextPage].fontColor = this.colorsUtilsToS.getColorByFraction(fontColorDistance);
            if (this.colorsUtilsToN)
                this.tabs[previousPage].fontColor = this.colorsUtilsToN.getColorByFraction(fontColorDistance);
            // 处理 icon大小 渐变
            if (this.model) {
                let iconSizeOffset = (this.model.getSelectedIconSize() - this.model.getUnselectedIconSize()) * distance;
                this.tabs[nextPage].iconSize = this.model.getUnselectedIconSize() + iconSizeOffset;
                this.tabs[previousPage].iconSize = this.model.getSelectedIconSize() - iconSizeOffset;
            }
        }
        /**
         * 向右滑动
         */
        else if (this.isMove == 2) {
            if (offset >= this.tabs.length - 1)
                return 0;
            let nextPage = Math.ceil(offset); // 下一页
            let previousPage = nextPage - 1; // 上一页
            if (centerIndex !== -1 && nextPage >= centerIndex) {
                offset = offset + 1;
                nextPage = nextPage + 1;
                if (centerIndex + 1 == nextPage) {
                    previousPage = nextPage - 2;
                }
                else {
                    previousPage = nextPage - 1;
                }
            }
            console.log('向右滑动  上一页：' + previousPage + '下一页：' + nextPage);
            let distance = Number.parseFloat((offset - Math.floor(offset)).toFixed(2)); // 偏移量 0.00 - 1.00
            // 处理 文字大小 渐变
            let fontSizeOffset = (this.model.getSelectedTextSize() - this.model.getUnselectedTextSize()) * distance;
            this.tabs[nextPage].fontSize = this.model.getUnselectedTextSize() + fontSizeOffset;
            this.tabs[previousPage].fontSize = this.model.getSelectedTextSize() - fontSizeOffset;
            // 处理 文字颜色 渐变
            let fontColorDistance: number = Number.parseInt((distance * 100).toFixed(0)); // 偏移量 0 - 99
            if (this.colorsUtilsToS)
                this.tabs[nextPage].fontColor = this.colorsUtilsToS.getColorByFraction(fontColorDistance);
            if (this.colorsUtilsToN)
                this.tabs[previousPage].fontColor = this.colorsUtilsToN.getColorByFraction(fontColorDistance);
            // 处理 icon大小 渐变
            if (this.model) {
                let iconSizeOffset = (this.model.getSelectedIconSize() - this.model.getUnselectedIconSize()) * distance;
                this.tabs[nextPage].iconSize = this.model.getUnselectedIconSize() + iconSizeOffset;
                this.tabs[previousPage].iconSize = this.model.getSelectedIconSize() - iconSizeOffset;
            }
        }
        return 0;
    }
    render() {
        Stack.create({ alignContent: Alignment.Start });
        Stack.width(this.model.getWidth());
        Stack.height(this.model.getHeight());
        Stack.backgroundColor(this.model.getBackgroundColor());
        Text.create(this.dealWithFont(this.itemIndex - this.indicatorOffset / 1080) + ' ');
        Text.fontSize(12);
        Text.fontColor('#ffffff');
        Text.visibility(Visibility.Hidden);
        Text.pop();
        Row.create();
        Row.width('100%');
        Row.height('100%');
        ForEach.create("2", this, ObservedObject.GetRawObject(this.tabs), (item: TabInfo) => {
            Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Center, alignItems: ItemAlign.Center });
            Flex.width(this.model.getWidth() / (this.model.getCenterImage() !== null ? this.titles.length + 1 : this.titles.length));
            Flex.height('100%');
            Flex.onClick(() => {
                if (item.index == undefined) {
                    this.model.getCenterClickListener()();
                }
                else {
                    this.itemIndex = item.index;
                    this.model.getTabsController()?.changeIndex(item.index);
                    if (this.model.getClickListener()) {
                        this.model.getClickListener()(item.index);
                    }
                }
            });
            If.create();
            if (item.isCenterView == true) {
                If.branchId(0);
                Image.create(item.src);
                Image.width(this.model.getCenterViewWidth());
                Image.height(this.model.getCenterViewHeight());
                Image.objectFit(ImageFit.Contain);
            }
            else {
                If.branchId(1);
                Flex.create({
                    direction: FlexDirection.Column,
                    justifyContent: FlexAlign.SpaceBetween,
                    alignItems: ItemAlign.Center
                });
                Flex.padding(5);
                Image.create(this.itemIndex === item.index ? item.tab?.selectIcon : item.tab?.normalIcon);
                Image.objectFit(ImageFit.Contain);
                Image.width(this.model.isIconsScale() ? item.iconSize : this.model.getSelectedIconSize());
                Image.height(this.model.isIconsScale() ? item.iconSize : this.model.getSelectedIconSize());
                Text.create(item.tab?.text);
                Text.fontSize(this.model.isIconsScale() ? this.model.getUnselectedTextSize() : this.model.getSelectedTextSize());
                Text.fontColor(this.itemIndex === item.index ? this.model.getSelectedTextColor() : this.model.getUnselectedTextColor());
                Text.pop();
                Flex.pop();
            }
            If.pop();
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
            if (this.indicatorOffset >= this.model.getWidth() / 2 && currentIndex > 0) {
                currentIndex--;
            }
            else if (this.indicatorOffset <= -this.model.getWidth() / 2 && currentIndex < this.titles.length - 1) {
                currentIndex++;
            }
            this.model.getTabsController()?.changeIndex(currentIndex);
            this.itemIndex = currentIndex;
            offset = 0;
            this.indicatorOffset = offset;
            this.isMove = 0;
            if (this.model.getChangeListener()) {
                this.model.getChangeListener()(currentIndex);
            }
        }
    }
}
export default BottomTabsIndicator;
