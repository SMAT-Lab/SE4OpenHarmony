interface CardPickerComponent_Params {
    model?: CardPickerComponent.Model;
    dialogController?: CustomDialogController;
}
interface CardDialogExample_Params {
    controller?: CustomDialogController;
    cancel?: () => void;
    confirm?: () => void;
    cardDataArray?: CardBean[];
    cardPickerModel?: CardPickerComponent.Model;
    initCardArray?: CardBean[];
    cardArray?: CardBean[];
    solarLatestYearIndex?: number;
    lastYearPosition?: number;
    caculatorYear?: number;
    textHeight?: number;
    scrollerCard?: Scroller;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CardPickerComponent_" + ++__generate__Id;
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
import { initializeCardData, CardBean } from './CardModel';
class CardDialogExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = undefined;
        this.cancel = () => { };
        this.confirm = () => { };
        this.cardDataArray = initializeCardData();
        this.__cardPickerModel = new SynchedPropertyObjectTwoWay(params.cardPickerModel, this, "cardPickerModel");
        this.initCardArray = this.cardDataArray;
        this.__cardArray = new ObservedPropertyObject(this.cardDataArray, this, "cardArray");
        this.__solarLatestYearIndex = new ObservedPropertySimple(0, this, "solarLatestYearIndex");
        this.lastYearPosition = 0;
        this.caculatorYear = 1;
        this.textHeight = 50;
        this.scrollerCard = new Scroller();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CardDialogExample_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
        if (params.cardDataArray !== undefined) {
            this.cardDataArray = params.cardDataArray;
        }
        if (params.initCardArray !== undefined) {
            this.initCardArray = params.initCardArray;
        }
        if (params.cardArray !== undefined) {
            this.cardArray = params.cardArray;
        }
        if (params.solarLatestYearIndex !== undefined) {
            this.solarLatestYearIndex = params.solarLatestYearIndex;
        }
        if (params.lastYearPosition !== undefined) {
            this.lastYearPosition = params.lastYearPosition;
        }
        if (params.caculatorYear !== undefined) {
            this.caculatorYear = params.caculatorYear;
        }
        if (params.textHeight !== undefined) {
            this.textHeight = params.textHeight;
        }
        if (params.scrollerCard !== undefined) {
            this.scrollerCard = params.scrollerCard;
        }
    }
    aboutToBeDeleted() {
        this.__cardPickerModel.aboutToBeDeleted();
        this.__cardArray.aboutToBeDeleted();
        this.__solarLatestYearIndex.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private cancel: () => void;
    private confirm: () => void;
    private cardDataArray: CardBean[];
    private __cardPickerModel: SynchedPropertySimpleOneWay<CardPickerComponent.Model>;
    get cardPickerModel() {
        return this.__cardPickerModel.get();
    }
    set cardPickerModel(newValue: CardPickerComponent.Model) {
        this.__cardPickerModel.set(newValue);
    }
    private initCardArray: CardBean[];
    private __cardArray: ObservedPropertyObject<CardBean[]>;
    get cardArray() {
        return this.__cardArray.get();
    }
    set cardArray(newValue: CardBean[]) {
        this.__cardArray.set(newValue);
    }
    private __solarLatestYearIndex: ObservedPropertySimple<number>;
    get solarLatestYearIndex() {
        return this.__solarLatestYearIndex.get();
    }
    set solarLatestYearIndex(newValue: number) {
        this.__solarLatestYearIndex.set(newValue);
    }
    private lastYearPosition: number;
    private caculatorYear: number;
    private textHeight: number;
    private scrollerCard: Scroller;
    render() {
        Column.create();
        Column.backgroundColor(Color.White);
        Flex.create({ justifyContent: FlexAlign.SpaceBetween });
        Flex.backgroundColor("#7CDCDC");
        Button.createWithLabel(this.cardPickerModel.cancelButtonFont);
        Button.height(this.textHeight);
        Button.fontSize(this.cardPickerModel.titleFontSize);
        Button.backgroundColor(this.cardPickerModel.buttonBackgroundColor);
        Button.fontColor(this.cardPickerModel.cancelButtonColor);
        Button.onClick(() => {
            this.controller.close();
            this.cancel();
        });
        Button.pop();
        Button.createWithLabel(this.cardPickerModel.confirmButtonFont);
        Button.height(this.textHeight);
        Button.fontSize(this.cardPickerModel.titleFontSize);
        Button.backgroundColor(this.cardPickerModel.buttonBackgroundColor);
        Button.fontColor(this.cardPickerModel.confirmButtonColor);
        Button.onClick(() => {
            this.controller.close();
            this.confirm();
        });
        Button.pop();
        Flex.pop();
        Stack.create({ alignContent: Alignment.Start });
        Stack.width('100%');
        Stack.height('50%');
        Stack.align(Alignment.Center);
        Row.create();
        Row.height(250);
        Scroll.create(this.scrollerCard);
        Scroll.scrollBar(BarState.Off);
        Scroll.onScroll((xOffset: number, yOffset: number) => {
            this.lastYearPosition = yOffset == 0 ? this.lastYearPosition : yOffset;
        });
        Scroll.onScrollStop(() => {
            // 滑动过后，计算滑动距离，保持选择项在红色线之内
            let scrollYearOffset = this.scrollerCard.currentOffset().yOffset % this.textHeight;
            if (scrollYearOffset > 1) {
                if (this.lastYearPosition <= 0) { // 小于0，向下滑动，大于0是，是向上滑动
                    this.solarLatestYearIndex = (this.scrollerCard.currentOffset().yOffset - scrollYearOffset) / this.textHeight;
                    this.scrollerCard.scrollTo({ xOffset: 0, yOffset: this.scrollerCard.currentOffset().yOffset - scrollYearOffset, animation: { duration: 2000, curve: Curve.Ease } });
                }
                else {
                    this.solarLatestYearIndex = (this.scrollerCard.currentOffset().yOffset - scrollYearOffset) / this.textHeight + 1;
                    this.scrollerCard.scrollTo({ xOffset: 0, yOffset: this.scrollerCard.currentOffset().yOffset + this.textHeight - scrollYearOffset, animation: { duration: 2000, curve: Curve.Ease } });
                }
            }
        });
        Column.create();
        Column.width("100%");
        Text.create(" ");
        Text.fontSize(this.cardPickerModel.fontSize);
        Text.height(this.textHeight);
        Text.pop();
        Text.create(" ");
        Text.fontSize(this.cardPickerModel.fontSize);
        Text.height(this.textHeight);
        Text.pop();
        ForEach.create("2", this, ObservedObject.GetRawObject(this.cardArray), (cardItem: CardBean) => {
            Text.create((cardItem.cardNo).toString());
            Text.height(this.textHeight);
            Text.fontSize(this.cardPickerModel.fontSize);
            Text.fontColor(this.cardPickerModel.fontColor);
            Text.pop();
        });
        ForEach.pop();
        Text.create(" ");
        Text.fontSize(this.cardPickerModel.fontSize);
        Text.height(this.textHeight);
        Text.pop();
        Text.create(" ");
        Text.fontSize(this.cardPickerModel.fontSize);
        Text.height(this.textHeight);
        Text.pop();
        Column.pop();
        Scroll.pop();
        Row.pop();
        Divider.create();
        Divider.vertical(false);
        Divider.strokeWidth(this.cardPickerModel.dividerLineStroke);
        Divider.color(this.cardPickerModel.dividerLineColor);
        Divider.lineCap(LineCapStyle.Round);
        Divider.align(Alignment.Center);
        Divider.offset({ x: 0, y: 25 });
        Stack.pop();
        Divider.create();
        Divider.vertical(false);
        Divider.strokeWidth(this.cardPickerModel.dividerLineStroke);
        Divider.color(Color.Green);
        Divider.lineCap(LineCapStyle.Round);
        Divider.align(Alignment.Center);
        Flex.create({ justifyContent: FlexAlign.SpaceBetween });
        Flex.backgroundColor(Color.White);
        Text.create("+添加加油卡");
        Text.textAlign(TextAlign.Center);
        Text.height(this.textHeight);
        Text.fontSize(this.cardPickerModel.titleFontSize);
        Text.fontColor(this.cardPickerModel.titleFontColor);
        Text.backgroundColor(Color.Gray);
        Text.width("100%");
        Text.onClick(() => {
            this.initCardArray.forEach((val) => {
                this.cardArray.unshift(val);
            });
            this.scrollerCard.scrollTo({ xOffset: 0, yOffset: 0 });
        });
        Text.pop();
        Flex.pop();
        Column.pop();
    }
}
class CardPickerComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new CardPickerComponent.Model(), this, "model");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CardDialogExample("3", this, { cancel: this.onCancel, confirm: this.onAccept, cardPickerModel: this.__model });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            cancel: this.existApp,
            autoCancel: this.model.outSideCancelable,
            alignment: DialogAlignment.Center
            //offset:{dx: 0, dy:150}
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CardPickerComponent_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<CardPickerComponent.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: CardPickerComponent.Model) {
        this.__model.set(newValue);
    }
    private dialogController: CustomDialogController;
    // 时间
    onCancel() {
        console.info('Callback when the first button is clicked');
    }
    onAccept() {
        console.info('Callback when the second button is clicked');
    }
    existApp() {
        console.info('Click the callback in the blank area');
    }
    render() {
        //设置Stack的对齐方式为底部起始端对齐，Stack默认为居中对齐。设置Stack构造参数alignContent为Alignment.BottomStart。
        // 其中Alignment和FontWeight一样，都是框架提供的内置枚举类型
        Column.create();
        //设置Stack的对齐方式为底部起始端对齐，Stack默认为居中对齐。设置Stack构造参数alignContent为Alignment.BottomStart。
        // 其中Alignment和FontWeight一样，都是框架提供的内置枚举类型
        Column.alignItems(HorizontalAlign.Center);
        //设置Stack的对齐方式为底部起始端对齐，Stack默认为居中对齐。设置Stack构造参数alignContent为Alignment.BottomStart。
        // 其中Alignment和FontWeight一样，都是框架提供的内置枚举类型
        Column.width("100%");
        Row.create();
        Row.alignItems(VerticalAlign.Top);
        Row.margin({ top: this.model.pickerSpace });
        Text.create('添加加油卡');
        Text.height(50);
        Text.fontSize(20);
        Text.fontColor(Color.Black);
        Text.backgroundColor(Color.Gray);
        Text.width("90%");
        Text.textAlign(TextAlign.Center);
        Text.onClick(() => {
            this.dialogController.open();
        });
        Text.pop();
        Row.pop();
        //设置Stack的对齐方式为底部起始端对齐，Stack默认为居中对齐。设置Stack构造参数alignContent为Alignment.BottomStart。
        // 其中Alignment和FontWeight一样，都是框架提供的内置枚举类型
        Column.pop();
    }
}
namespace CardPickerComponent {
    export class Model {
        text: string = '';
        dividerLineColor: Color = Color.Red;
        dividerLineStroke: number = 1;
        areaIsShow: boolean = false;
        columnWidth: string = '50%';
        fontSize: number = 30;
        fontColor: Color = Color.Black;
        titleFontSize: number = 30;
        titleFontColor: Color = Color.Black;
        cancelButtonFont: string = "cancel";
        confirmButtonFont: string = "confirm";
        cancelButtonColor: Color = Color.Green;
        confirmButtonColor: Color = Color.Green;
        onclick: Function = () => { };
        pickerSpace: number = 15;
        buttonBackgroundColor: string = "#7CDCDC";
        outSideCancelable: boolean = true;
        setOutSideCancelable(cancelable: boolean): Model {
            this.outSideCancelable = cancelable;
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
        constructor(dividerLineStroke?: number) {
            if (dividerLineStroke) {
                this.dividerLineStroke = dividerLineStroke;
                console.log("in Builder constructor");
            }
        }
        setDividerLineStroke(dividerLineStroke: number): Model {
            if (0 < dividerLineStroke && dividerLineStroke <= 5) {
                this.dividerLineStroke = dividerLineStroke;
            }
            else {
                dividerLineStroke = 2;
            }
            return this;
        }
        setDividerLineColor(color: Color): Model {
            this.dividerLineColor = color;
            return this;
        }
        setAreaIsShow(bool: boolean): Model {
            this.areaIsShow = bool;
            if (bool) { //根据区是否显示控制省、市的宽度
                this.columnWidth = '33%';
            }
            else {
                this.columnWidth = '50%';
            }
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
export default CardPickerComponent;
