interface CircleDividerViewLib_Params {
    scrollerFirst?: Scroller;
    firstCircleInsert?: boolean;
    textHeight?: number;
    lastPosition?: number;
    dividerIndex?: number;
    model?: CircleDividerViewLib.Model;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CircleDividerViewLib_" + ++__generate__Id;
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
import router from '@ohos.router';
import display from '@ohos.display';
class Param {
    index: any = 0;
    data: any = "";
    constructor(index: any, data: any) {
        this.index = index;
        this.data = data;
    }
}
class CircleDividerViewLib extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scrollerFirst = new Scroller();
        this.firstCircleInsert = true;
        this.textHeight = 50;
        this.lastPosition = 0;
        this.dividerIndex = 0;
        this.model = new CircleDividerViewLib.Model();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CircleDividerViewLib_Params) {
        if (params.scrollerFirst !== undefined) {
            this.scrollerFirst = params.scrollerFirst;
        }
        if (params.firstCircleInsert !== undefined) {
            this.firstCircleInsert = params.firstCircleInsert;
        }
        if (params.textHeight !== undefined) {
            this.textHeight = params.textHeight;
        }
        if (params.lastPosition !== undefined) {
            this.lastPosition = params.lastPosition;
        }
        if (params.dividerIndex !== undefined) {
            this.dividerIndex = params.dividerIndex;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private scrollerFirst: Scroller;
    private firstCircleInsert: boolean;
    private textHeight: number;
    private lastPosition: number;
    private dividerIndex: number;
    private model: CircleDividerViewLib.Model;
    // private firstArray : ESObject[] = this.model.getFirstArray()
    aboutToAppear() {
    }
    render() {
        Column.create();
        Column.alignItems(HorizontalAlign.Center);
        Column.width("100%");
        Row.create();
        Flex.create({ justifyContent: FlexAlign.SpaceAround });
        Flex.backgroundColor("#7CDCDC");
        Flex.margin({ bottom: 0 });
        Button.createWithLabel(this.model.cancelButtonFont);
        Button.height(this.textHeight);
        Button.fontSize(this.model.titleFontSize);
        Button.backgroundColor(this.model.buttonBackgroundColor);
        Button.fontColor(this.model.cancelButtonColor);
        Button.margin({ left: 10 });
        Button.onClick((event: ClickEvent) => {
            router.back();
        });
        Button.pop();
        Column.create();
        Row.create();
        Text.create("圆形分割器");
        Text.height(this.textHeight);
        Text.fontSize(this.model.titleFontSize);
        Text.fontColor(this.model.titleFontColor);
        Text.pop();
        Row.pop();
        Column.pop();
        Button.createWithLabel(this.model.confirmButtonFont);
        Button.fontSize(this.model.titleFontSize);
        Button.backgroundColor(this.model.buttonBackgroundColor);
        Button.fontColor(this.model.confirmButtonColor);
        Button.onClick(() => {
            router.back();
        });
        Button.pop();
        Flex.pop();
        Row.pop();
        Stack.create({ alignContent: Alignment.Center });
        Stack.width('100%');
        Stack.height('100%');
        Stack.margin({ bottom: 100 });
        Circle.create({ width: 70, height: 70 });
        Circle.fillOpacity(0);
        Circle.stroke(this.model.dividerLineColor);
        Circle.strokeWidth(this.model.dividerLineStroke);
        Row.create();
        Scroll.create(this.scrollerFirst);
        Scroll.scrollBar(BarState.Off);
        Scroll.height(this.textHeight * 5);
        Scroll.onScroll((xOffset: number, yOffset: number) => {
            this.lastPosition = yOffset == 0 ? this.lastPosition : yOffset;
            if (this.firstCircleInsert) { //首次进入，用于初始化位置
                if (this.model.defaultSelection[0] != null) {
                    this.model.getFirstArray().forEach((val: number, idx: number) => {
                        if (this.model.defaultSelection[0] == val) {
                            this.scrollerFirst.scrollTo({ xOffset: 0, yOffset: (idx - 2) * this.textHeight, animation: { duration: 1, curve: Curve.Ease } });
                            this.dividerIndex = idx;
                        }
                    });
                }
                this.firstCircleInsert = false;
            }
        });
        Scroll.onScrollStop(() => {
            let scrollFirstOffset = this.scrollerFirst.currentOffset().yOffset % this.textHeight;
            if (scrollFirstOffset > 1) {
                if (this.lastPosition <= 0) { // 小于0，向下滑动，大于0是，是向上滑动
                    this.scrollerFirst.scrollTo({ xOffset: 0, yOffset: this.scrollerFirst.currentOffset().yOffset
                            - scrollFirstOffset,
                        animation: { duration: 2000,
                            curve: Curve.EaseOut
                        } });
                    this.dividerIndex = (this.scrollerFirst.currentOffset().yOffset - scrollFirstOffset) / this.textHeight;
                }
                else {
                    this.scrollerFirst.scrollTo({ xOffset: 0, yOffset: this.scrollerFirst.currentOffset().yOffset
                            + this.textHeight - scrollFirstOffset,
                        animation: { duration: 2000,
                            curve: Curve.EaseOut } });
                    this.dividerIndex = (this.scrollerFirst.currentOffset().yOffset - scrollFirstOffset) / this.textHeight + 1;
                }
            }
        });
        Column.create();
        Column.width('30%');
        ForEach.create("2", this, ObservedObject.GetRawObject(this.model.getFirstArray().map((item1: any, index1: any) => { return new Param(index1 + 1, item1); })), (item: Param) => {
            Text.create(`${item.data}`.toString());
            Text.fontSize(this.model.fontSize);
            Text.fontColor(this.model.fontColor);
            Text.height(this.textHeight);
            Text.pop();
        }, (item: Param) => item.index.toString());
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Row.pop();
        Stack.pop();
        Column.pop();
    }
}
namespace CircleDividerViewLib {
    export class Model {
        text: string = '';
        firstArray: number[] = [];
        dividerLineColor: Color = Color.Red;
        dividerLineStroke: number = 1;
        columnWidth: string = '50%';
        fontSize: number = 30;
        fontColor: Color = Color.Black;
        titleFontSize: number = 20;
        titleFontColor: Color = Color.Black;
        cancelButtonFont: string = "cancel";
        confirmButtonFont: string = "confirm";
        cancelButtonColor: Color = Color.Green;
        confirmButtonColor: Color = Color.Green;
        color: string = '';
        onclick: Function = () => { };
        pickerSpace: number = 15;
        buttonBackgroundColor: string = "#7CDCDC";
        defaultSelection: number[] = [];
        setDefaultSelection(defaultSelection: number[]): Model {
            this.defaultSelection = defaultSelection;
            return this;
        }
        setButtonBackgroundColor(buttonBackgroundColor: string): Model {
            this.buttonBackgroundColor = buttonBackgroundColor;
            return this;
        }
        setPickerSpace(pickerSpace: number): Model {
            this.pickerSpace = pickerSpace;
            return this;
        }
        constructor(firstArray?: number[]) {
            if (firstArray) {
                this.firstArray = firstArray;
            }
        }
        getFirstArray(): number[] {
            return this.firstArray;
        }
        setDividerLineStroke(dividerLineStroke: number): Model {
            if (0 < dividerLineStroke && dividerLineStroke <= 20) {
                this.dividerLineStroke = dividerLineStroke;
            }
            else {
                dividerLineStroke = 8;
            }
            return this;
        }
        setDividerLineColor(color: Color): Model {
            this.dividerLineColor = color;
            return this;
        }
        setFirstArray(firstArray: number[]): Model {
            this.firstArray = firstArray;
            return this;
        }
        setFontSize(fontSize: number): Model {
            this.fontSize = fontSize;
            return this;
        }
        setFontColor(fontColor: Color): Model {
            this.fontColor = fontColor;
            return this;
        }
        setTitleFontSize(titleFontSize: number): Model {
            this.titleFontSize = titleFontSize;
            return this;
        }
        setTitleFontColor(titleFontColor: Color): Model {
            this.titleFontColor = titleFontColor;
            return this;
        }
        setCancelButtonFont(cancelButtonFont: string): Model {
            this.cancelButtonFont = cancelButtonFont;
            return this;
        }
        setConfirmButtonFont(confirmButtonFont: string): Model {
            this.confirmButtonFont = confirmButtonFont;
            return this;
        }
        setCancelButtonColor(cancelButtonColor: Color): Model {
            this.cancelButtonColor = cancelButtonColor;
            return this;
        }
        setConfirmButtonColor(confirmButtonColor: Color): Model {
            this.confirmButtonColor = confirmButtonColor;
            return this;
        }
        withText(text: string): Model {
            this.text = text;
            return this;
        }
        withClick(callback: (event?: ClickEvent) => void): Model {
            this.onclick = callback;
            return this;
        }
    }
}
export default CircleDividerViewLib;
