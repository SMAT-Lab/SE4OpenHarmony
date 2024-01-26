interface HourSecondMinuteComponent_Params {
    confirmValue?: string;
    model?: HourSecondMinuteComponent.Model;
    dialogCityController?: CustomDialogController;
}
interface HourSecondMinuteDialogController_Params {
    hourAndSecondAndMinuteArray?: HourAndSecondAndMinute[];
    confirmValue?: string;
    controller?: CustomDialogController;
    cancel?: () => void;
    confirm?: () => void;
    textHeight?: number;
    scrollerFirst?: Scroller;
    scrollerSecond?: Scroller;
    scrollerThird?: Scroller;
    lastHourPosition?: number;
    lastSecondPosition?: number;
    lastMinutePosition?: number;
    firstIndex?: number;
    secondIndex?: number;
    minuteIndex?: number;
    array?;
    hourSecondMinuteModel?: HourSecondMinuteComponent.Model;
    hourArray?: ESObject[];
    secondArray?: ESObject[];
    minuteArray?: ESObject[];
    initHourDateArray?: ESObject;
    initSecondDateArray?: ESObject;
    initMinuteDateArray?: ESObject;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "HourSecondMinuteComponent_" + ++__generate__Id;
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
import { initializeHourAndSecondAndMinute, HourAndSecondAndMinute } from './HourSecondMinuteModel';
import { DividerType } from './Constant';
class HourParam {
    index: number = 0;
    data: string | number = "";
    constructor(index: number, data: string | number) {
        this.index = index;
        this.data = data;
    }
}
class HourSecondMinuteDialogController extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.hourAndSecondAndMinuteArray = initializeHourAndSecondAndMinute();
        this.__confirmValue = new SynchedPropertySimpleTwoWay(params.confirmValue, this, "confirmValue");
        this.controller = undefined;
        this.cancel = () => { };
        this.confirm = () => { };
        this.textHeight = 50;
        this.scrollerFirst = new Scroller();
        this.scrollerSecond = new Scroller();
        this.scrollerThird = new Scroller();
        this.lastHourPosition = 0;
        this.lastSecondPosition = 0;
        this.lastMinutePosition = 0;
        this.firstIndex = 0;
        this.secondIndex = 0;
        this.minuteIndex = 0;
        this.array = [1, 2, 3];
        this.__hourSecondMinuteModel = new ObservedPropertyObject(new HourSecondMinuteComponent.Model(), this, "hourSecondMinuteModel");
        this.__hourArray = new ObservedPropertyObject(this.hourAndSecondAndMinuteArray[0].hour, this, "hourArray");
        this.__secondArray = new ObservedPropertyObject(this.hourAndSecondAndMinuteArray[0].second, this, "secondArray");
        this.__minuteArray = new ObservedPropertyObject(this.hourAndSecondAndMinuteArray[0].minute, this, "minuteArray");
        this.initHourDateArray = this.hourAndSecondAndMinuteArray[0].hour;
        this.initSecondDateArray = this.hourAndSecondAndMinuteArray[0].second;
        this.initMinuteDateArray = this.hourAndSecondAndMinuteArray[0].minute;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: HourSecondMinuteDialogController_Params) {
        if (params.hourAndSecondAndMinuteArray !== undefined) {
            this.hourAndSecondAndMinuteArray = params.hourAndSecondAndMinuteArray;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
        if (params.textHeight !== undefined) {
            this.textHeight = params.textHeight;
        }
        if (params.scrollerFirst !== undefined) {
            this.scrollerFirst = params.scrollerFirst;
        }
        if (params.scrollerSecond !== undefined) {
            this.scrollerSecond = params.scrollerSecond;
        }
        if (params.scrollerThird !== undefined) {
            this.scrollerThird = params.scrollerThird;
        }
        if (params.lastHourPosition !== undefined) {
            this.lastHourPosition = params.lastHourPosition;
        }
        if (params.lastSecondPosition !== undefined) {
            this.lastSecondPosition = params.lastSecondPosition;
        }
        if (params.lastMinutePosition !== undefined) {
            this.lastMinutePosition = params.lastMinutePosition;
        }
        if (params.firstIndex !== undefined) {
            this.firstIndex = params.firstIndex;
        }
        if (params.secondIndex !== undefined) {
            this.secondIndex = params.secondIndex;
        }
        if (params.minuteIndex !== undefined) {
            this.minuteIndex = params.minuteIndex;
        }
        if (params.array !== undefined) {
            this.array = params.array;
        }
        if (params.hourSecondMinuteModel !== undefined) {
            this.hourSecondMinuteModel = params.hourSecondMinuteModel;
        }
        if (params.hourArray !== undefined) {
            this.hourArray = params.hourArray;
        }
        if (params.secondArray !== undefined) {
            this.secondArray = params.secondArray;
        }
        if (params.minuteArray !== undefined) {
            this.minuteArray = params.minuteArray;
        }
        if (params.initHourDateArray !== undefined) {
            this.initHourDateArray = params.initHourDateArray;
        }
        if (params.initSecondDateArray !== undefined) {
            this.initSecondDateArray = params.initSecondDateArray;
        }
        if (params.initMinuteDateArray !== undefined) {
            this.initMinuteDateArray = params.initMinuteDateArray;
        }
    }
    aboutToBeDeleted() {
        this.__confirmValue.aboutToBeDeleted();
        this.__hourSecondMinuteModel.aboutToBeDeleted();
        this.__hourArray.aboutToBeDeleted();
        this.__secondArray.aboutToBeDeleted();
        this.__minuteArray.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private hourAndSecondAndMinuteArray: HourAndSecondAndMinute[];
    private __confirmValue: SynchedPropertySimpleTwoWay<string>;
    get confirmValue() {
        return this.__confirmValue.get();
    }
    set confirmValue(newValue: string) {
        this.__confirmValue.set(newValue);
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private cancel: () => void;
    private confirm: () => void;
    private textHeight: number;
    private scrollerFirst: Scroller;
    private scrollerSecond: Scroller;
    private scrollerThird: Scroller;
    private lastHourPosition: number;
    private lastSecondPosition: number;
    private lastMinutePosition: number;
    private firstIndex: number;
    private secondIndex: number;
    private minuteIndex: number;
    private array;
    private __hourSecondMinuteModel: ObservedPropertyObject<HourSecondMinuteComponent.Model>;
    get hourSecondMinuteModel() {
        return this.__hourSecondMinuteModel.get();
    }
    set hourSecondMinuteModel(newValue: HourSecondMinuteComponent.Model) {
        this.__hourSecondMinuteModel.set(newValue);
    }
    private __hourArray: ObservedPropertyObject<any[]>;
    get hourArray() {
        return this.__hourArray.get();
    }
    set hourArray(newValue: any[]) {
        this.__hourArray.set(newValue);
    }
    private __secondArray: ObservedPropertyObject<any[]>;
    get secondArray() {
        return this.__secondArray.get();
    }
    set secondArray(newValue: any[]) {
        this.__secondArray.set(newValue);
    }
    private __minuteArray: ObservedPropertyObject<any[]>;
    get minuteArray() {
        return this.__minuteArray.get();
    }
    set minuteArray(newValue: any[]) {
        this.__minuteArray.set(newValue);
    }
    private initHourDateArray: any;
    private initSecondDateArray: any;
    private initMinuteDateArray: any;
    render() {
        Column.create();
        Flex.create({ justifyContent: FlexAlign.SpaceAround });
        Flex.backgroundColor("#7CDCDC");
        Flex.margin({ bottom: 0 });
        Button.createWithLabel(this.hourSecondMinuteModel.cancelButtonFont);
        Button.height(this.textHeight);
        Button.fontSize(this.hourSecondMinuteModel.titleFontSize);
        Button.backgroundColor(this.hourSecondMinuteModel.buttonBackgroundColor);
        Button.fontColor(this.hourSecondMinuteModel.buttonColor);
        Button.margin({ left: 10 });
        Button.onClick(() => {
            this.controller.close();
            this.cancel();
        });
        Button.pop();
        Column.create();
        Row.create();
        Text.create(this.hourSecondMinuteModel.titleName);
        Text.height(this.textHeight);
        Text.fontSize(this.hourSecondMinuteModel.titleFontSize);
        Text.fontColor(this.hourSecondMinuteModel.titleFontColor);
        Text.pop();
        Row.pop();
        Column.pop();
        Button.createWithLabel(this.hourSecondMinuteModel.confirmButtonFont);
        Button.fontSize(this.hourSecondMinuteModel.titleFontSize);
        Button.backgroundColor(this.hourSecondMinuteModel.buttonBackgroundColor);
        Button.fontColor(this.hourSecondMinuteModel.buttonColor);
        Button.onClick(() => {
            let selectHour: number | string = this.hourArray[this.firstIndex];
            let selectSecond: number | string = this.secondArray[this.secondIndex];
            let selectMinute: number | string = this.minuteArray[this.minuteIndex];
            this.confirmValue = selectHour + '/' + selectSecond + '/' + selectMinute;
            this.controller.close();
            this.confirm();
        });
        Button.pop();
        Flex.pop();
        Stack.create({ alignContent: Alignment.TopStart });
        If.create();
        if (this.hourSecondMinuteModel.dividerType == DividerType.FILL) {
            If.branchId(0);
            Divider.create();
            Divider.vertical(false);
            Divider.strokeWidth(this.hourSecondMinuteModel.dividerLineStroke);
            Divider.color(this.hourSecondMinuteModel.dividerLineColor);
            Divider.lineCap(LineCapStyle.Round);
            Divider.margin({ top: 100 });
            Divider.create();
            Divider.vertical(false);
            Divider.strokeWidth(this.hourSecondMinuteModel.dividerLineStroke);
            Divider.color(this.hourSecondMinuteModel.dividerLineColor);
            Divider.lineCap(LineCapStyle.Round);
            Divider.margin({ top: 150 });
        }
        else if (this.hourSecondMinuteModel.dividerType == DividerType.CIRCLE) {
            If.branchId(1);
            Circle.create({ width: 80, height: 80 });
            Circle.fillOpacity(0);
            Circle.stroke(this.hourSecondMinuteModel.dividerLineColor);
            Circle.strokeWidth(this.hourSecondMinuteModel.dividerLineStroke);
            Circle.margin({ left: 15, top: 85 });
            Circle.create({ width: 80, height: 80 });
            Circle.fillOpacity(0);
            Circle.stroke(this.hourSecondMinuteModel.dividerLineColor);
            Circle.strokeWidth(this.hourSecondMinuteModel.dividerLineStroke);
            Circle.margin({ left: 130, top: 85 });
            Circle.create({ width: 80, height: 80 });
            Circle.fillOpacity(0);
            Circle.stroke(this.hourSecondMinuteModel.dividerLineColor);
            Circle.strokeWidth(this.hourSecondMinuteModel.dividerLineStroke);
            Circle.margin({ left: 240, top: 85 });
        }
        else if (this.hourSecondMinuteModel.dividerType == DividerType.WRAP) {
            If.branchId(2);
            ForEach.create("2", this, ObservedObject.GetRawObject(this.array), (index: number) => {
                Divider.create();
                Divider.vertical(false);
                Divider.strokeWidth(this.hourSecondMinuteModel.dividerLineStroke);
                Divider.color(this.hourSecondMinuteModel.dividerLineColor);
                Divider.lineCap(LineCapStyle.Round);
                Divider.margin({ left: 10 + 110 * (index - 1), top: 100 });
                Divider.width("30%");
                Divider.create();
                Divider.vertical(false);
                Divider.strokeWidth(this.hourSecondMinuteModel.dividerLineStroke);
                Divider.color(this.hourSecondMinuteModel.dividerLineColor);
                Divider.lineCap(LineCapStyle.Round);
                Divider.margin({ left: 10 + 110 * (index - 1), top: 150 });
                Divider.width("30%");
            }, (index: number) => index.toString());
            ForEach.pop();
        }
        If.pop();
        Row.create();
        Row.height(250);
        Scroll.create(this.scrollerFirst);
        Scroll.scrollBar(BarState.Off);
        Scroll.onScroll((xOffset: number, yOffset: number) => {
            this.lastHourPosition = yOffset == 0 ? this.lastHourPosition : yOffset;
        });
        Scroll.onScrollEdge((side: Edge) => {
            if (side.valueOf() == 0) { // 向上滑动
            }
            if (side.valueOf() == 1) {
                this.initHourDateArray.forEach((val: any) => {
                    this.hourArray.push(val);
                });
            }
        });
        Scroll.onScrollStop(() => {
            let scrollProvinceOffset = this.scrollerFirst.currentOffset().yOffset % this.textHeight;
            if (scrollProvinceOffset > 1) {
                if (this.lastHourPosition <= 0) { // 小于0，向下滑动，大于0是，是向上滑动
                    this.scrollerFirst.scrollTo({ xOffset: 0, yOffset: this.scrollerFirst.currentOffset().yOffset
                            - scrollProvinceOffset, animation: { duration: 2000, curve: Curve.Ease } });
                    this.firstIndex = (this.scrollerFirst.currentOffset().yOffset - scrollProvinceOffset) / this.textHeight;
                }
                else {
                    this.scrollerFirst.scrollTo({ xOffset: 0, yOffset: this.scrollerFirst.currentOffset().yOffset
                            + this.textHeight - scrollProvinceOffset, animation: { duration: 2000, curve: Curve.Ease } });
                    this.firstIndex = (this.scrollerFirst.currentOffset().yOffset - scrollProvinceOffset) / this.textHeight + 1;
                }
            }
        });
        Column.create();
        Column.width(this.hourSecondMinuteModel.columnWidth);
        Text.create(" ");
        Text.fontSize(30);
        Text.height(this.textHeight);
        Text.pop();
        Text.create(" ");
        Text.fontSize(30);
        Text.height(this.textHeight);
        Text.pop();
        ForEach.create("3", this, ObservedObject.GetRawObject(this.hourArray.map((item1: string | number, index1: number) => { return new HourParam(index1 + 1, item1); })), (item: HourParam) => {
            Text.create(`${item.data}` + this.hourSecondMinuteModel.hourLable);
            Text.fontSize(this.hourSecondMinuteModel.fontSize);
            Text.fontColor(this.hourSecondMinuteModel.fontColor);
            Text.height(this.textHeight);
            Text.pop();
        }, (item: HourParam) => item.index.toString());
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Scroll.create(this.scrollerSecond);
        Scroll.scrollBar(BarState.Off);
        Scroll.onScroll((xOffset: number, yOffset: number) => {
            this.lastSecondPosition = yOffset == 0 ? this.lastSecondPosition : yOffset;
        });
        Scroll.onScrollEdge((side: Edge) => {
            if (side.valueOf() == 0) { // 向上滑动
            }
            if (side.valueOf() == 1) {
                this.initSecondDateArray.forEach((val: any) => {
                    this.secondArray.push(val);
                });
            }
        });
        Scroll.onScrollStop(() => {
            // 滑动过后，计算滑动距离，保持选择项在红色线之内
            let scrollSecondOffset = this.scrollerSecond.currentOffset().yOffset % this.textHeight;
            if (scrollSecondOffset > 1) {
                if (this.lastSecondPosition < 0) { // 小于0，向下滑动，大于0是，是向上滑动
                    // 获取选中的市
                    this.scrollerSecond.scrollTo({ xOffset: 0, yOffset: this.scrollerSecond.currentOffset().yOffset
                            - scrollSecondOffset, animation: { duration: 2000, curve: Curve.Ease } });
                    this.secondIndex = (this.scrollerSecond.currentOffset().yOffset - scrollSecondOffset) / this.textHeight;
                }
                else {
                    this.scrollerSecond.scrollTo({ xOffset: 0, yOffset: this.scrollerSecond.currentOffset().yOffset
                            + this.textHeight - scrollSecondOffset, animation: { duration: 2000, curve: Curve.Ease } });
                    this.secondIndex = (this.scrollerSecond.currentOffset().yOffset - scrollSecondOffset) / this.textHeight + 1;
                }
            }
        });
        Column.create();
        Column.width(this.hourSecondMinuteModel.columnWidth);
        // 分
        Text.create(' ');
        // 分
        Text.height(this.textHeight);
        // 分
        Text.pop();
        Text.create(' ');
        Text.height(this.textHeight);
        Text.pop();
        ForEach.create("4", this, ObservedObject.GetRawObject(this.secondArray.map((item1: string | number, index1: number) => { return new HourParam(index1 + 1, item1); })), (item: HourParam) => {
            Text.create(`${item.data}` + this.hourSecondMinuteModel.secondLable);
            Text.fontSize(this.hourSecondMinuteModel.fontSize);
            Text.fontColor(this.hourSecondMinuteModel.fontColor);
            Text.height(this.textHeight);
            Text.pop();
        }, (item: HourParam) => item.index.toString());
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        // 是否显示区
        Scroll.create(this.scrollerThird);
        // 是否显示区
        Scroll.scrollBar(BarState.Off);
        // 是否显示区
        Scroll.onScroll((xOffset: number, yOffset: number) => {
            this.lastMinutePosition = yOffset == 0 ? this.lastMinutePosition : yOffset;
        });
        // 是否显示区
        Scroll.onScrollEdge((side: Edge) => {
            if (side.valueOf() == 0) { // 向上滑动
            }
            if (side.valueOf() == 1) {
                this.initMinuteDateArray.forEach((val: any) => {
                    this.minuteArray.push(val);
                });
            }
        });
        // 是否显示区
        Scroll.onScrollStop(() => {
            let scrollMinuteOffset = this.scrollerThird.currentOffset().yOffset % this.textHeight;
            if (scrollMinuteOffset > 1) {
                if (this.lastMinutePosition <= 0) { // 小于0，向下滑动，大于0是，是向上滑动
                    // 获取选中的省
                    this.scrollerThird.scrollTo({ xOffset: 0, yOffset: this.scrollerThird.currentOffset().yOffset
                            - scrollMinuteOffset, animation: { duration: 2000, curve: Curve.Ease } });
                    this.minuteIndex = (this.scrollerThird.currentOffset().yOffset - scrollMinuteOffset) / this.textHeight;
                }
                else {
                    this.scrollerThird.scrollTo({ xOffset: 0, yOffset: this.scrollerThird.currentOffset().yOffset
                            + this.textHeight - scrollMinuteOffset, animation: { duration: 2000, curve: Curve.Ease } });
                    this.minuteIndex = (this.scrollerThird.currentOffset().yOffset - scrollMinuteOffset) / this.textHeight + 1;
                }
            }
        });
        Column.create();
        Column.width(this.hourSecondMinuteModel.columnWidth);
        // 秒
        Text.create(' ');
        // 秒
        Text.height(this.textHeight);
        // 秒
        Text.pop();
        Text.create(' ');
        Text.height(this.textHeight);
        Text.pop();
        ForEach.create("5", this, ObservedObject.GetRawObject(this.minuteArray.map((item1: string | number, index1: number) => { return new HourParam(index1 + 1, item1); })), (item: HourParam) => {
            Text.create(`${item.data}` + this.hourSecondMinuteModel.minuteLable);
            Text.fontSize(this.hourSecondMinuteModel.fontSize);
            Text.fontColor(this.hourSecondMinuteModel.fontColor);
            Text.height(this.textHeight);
            Text.pop();
        }, (item: HourParam) => item.index.toString());
        ForEach.pop();
        Column.pop();
        // 是否显示区
        Scroll.pop();
        Row.pop();
        Stack.pop();
        Column.pop();
    }
}
class HourSecondMinuteComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__confirmValue = new ObservedPropertySimple('', this, "confirmValue");
        this.__model = new ObservedPropertyObject(new HourSecondMinuteComponent.Model(), this, "model");
        this.dialogCityController = new CustomDialogController({
            builder: () => {
                let jsDialog = new HourSecondMinuteDialogController("6", this, { cancel: this.onCustomizeCancel, confirm: this.onCustomizeAccept,
                    hourSecondMinuteModel: this.__model, confirmValue: this.__confirmValue });
                jsDialog.setController(this.dialogCityController);
                View.create(jsDialog);
            },
            cancel: this.existApp,
            autoCancel: true,
            alignment: DialogAlignment.Bottom
            //offset:{dx: 0, dy:150}
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: HourSecondMinuteComponent_Params) {
        if (params.confirmValue !== undefined) {
            this.confirmValue = params.confirmValue;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.dialogCityController !== undefined) {
            this.dialogCityController = params.dialogCityController;
        }
    }
    aboutToBeDeleted() {
        this.__confirmValue.aboutToBeDeleted();
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __confirmValue: ObservedPropertySimple<string>;
    get confirmValue() {
        return this.__confirmValue.get();
    }
    set confirmValue(newValue: string) {
        this.__confirmValue.set(newValue);
    }
    private __model: ObservedPropertyObject<HourSecondMinuteComponent.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: HourSecondMinuteComponent.Model) {
        this.__model.set(newValue);
    }
    private dialogCityController: CustomDialogController;
    // 城市
    onCustomizeCancel() {
        console.info('Callback when the city second button is clicked');
    }
    onCustomizeAccept() {
        console.info('Callback when the city second button is clicked');
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
        Text.create(this.confirmValue.length > 0 ? this.confirmValue : '时分秒选择器');
        Text.height(50);
        Text.fontSize(20);
        Text.fontColor(Color.Black);
        Text.backgroundColor(Color.Gray);
        Text.width("90%");
        Text.textAlign(TextAlign.Center);
        Text.onClick(() => {
            this.dialogCityController.open();
        });
        Text.pop();
        Row.pop();
        //设置Stack的对齐方式为底部起始端对齐，Stack默认为居中对齐。设置Stack构造参数alignContent为Alignment.BottomStart。
        // 其中Alignment和FontWeight一样，都是框架提供的内置枚举类型
        Column.pop();
    }
}
namespace HourSecondMinuteComponent {
    export class Model {
        text: string = '';
        dividerLineColor: Color = Color.Red;
        dividerLineStroke: number = 1;
        thirdIsShow: boolean = false;
        columnWidth: string = '50%';
        fontSize: number = 30;
        fontColor: Color = Color.Black;
        titleName: string = '时分秒选择器';
        titleFontSize: number = 20;
        titleFontColor: Color = Color.Black;
        cancelButtonFont: string = "cancel";
        confirmButtonFont: string = "confirm";
        buttonColor: Color = Color.Black;
        color: string = '';
        hourLable: string = '';
        secondLable: string = '';
        minuteLable: string = '';
        onclick: any = null;
        pickerSpace: number = 15;
        buttonBackgroundColor: string = "#7CDCDC";
        dividerType?: DividerType = DividerType.FILL;
        setDividerType(dividerType: DividerType): Model {
            this.dividerType = dividerType;
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
        setThirdIsShow(bool: boolean): Model {
            this.thirdIsShow = bool;
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
        setTitleName(titleName: string): Model {
            this.titleName = titleName;
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
        setButtonColor(buttonColor: Color): Model {
            this.buttonColor = buttonColor;
            return this;
        }
        withText(text: string): Model {
            this.text = text;
            return this;
        }
        setHourLable(hourLable: string): Model {
            this.hourLable = hourLable;
            return this;
        }
        setSecondLable(secondLable: string): Model {
            this.secondLable = secondLable;
            return this;
        }
        setMinuteLable(minuteLable: string): Model {
            this.minuteLable = minuteLable;
            return this;
        }
        withClick(callback: (event?: ClickEvent) => void): Model {
            this.onclick = callback;
            return this;
        }
    }
}
export default HourSecondMinuteComponent;
