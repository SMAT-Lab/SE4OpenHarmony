interface CustomizePickerComponent_Params {
    model?: CustomizePickerComponent.Model;
    dialogController?: CustomDialogController;
}
interface CustomizeDialogController_Params {
    controller?: CustomDialogController;
    cancel?: () => void;
    confirm?: () => void;
    scrollerFirst?: Scroller;
    scrollerSecond?: Scroller;
    scrollerThird?: Scroller;
    buttonHeight?: number;
    halfMoveRatio?: number;
    array?;
    scrollerFirstIndex?: number;
    scrollerSecondIndex?: number;
    scrollerThirdIndex?: number;
    customizePickerModel?: CustomizePickerComponent.Model;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CustomizePickerComponent_" + ++__generate__Id;
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
import { DividerType, deviceWidth } from './Constant';
import { initializeCustomizePickerDataOnStartup, CustomizePickerBean, SecondAndThirdArray } from './CustomizePickerModel';
class CustomizeDialogController extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = undefined;
        this.cancel = () => { };
        this.confirm = () => { };
        this.scrollerFirst = new Scroller();
        this.scrollerSecond = new Scroller();
        this.scrollerThird = new Scroller();
        this.buttonHeight = 50;
        this.halfMoveRatio = 0.5;
        this.array = [1, 2, 3];
        this.__scrollerFirstIndex = new ObservedPropertySimple(0, this, "scrollerFirstIndex");
        this.__scrollerSecondIndex = new ObservedPropertySimple(0, this, "scrollerSecondIndex");
        this.__scrollerThirdIndex = new ObservedPropertySimple(0, this, "scrollerThirdIndex");
        this.__customizePickerModel = new ObservedPropertyObject(new CustomizePickerComponent.Model(), this, "customizePickerModel");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomizeDialogController_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
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
        if (params.buttonHeight !== undefined) {
            this.buttonHeight = params.buttonHeight;
        }
        if (params.halfMoveRatio !== undefined) {
            this.halfMoveRatio = params.halfMoveRatio;
        }
        if (params.array !== undefined) {
            this.array = params.array;
        }
        if (params.scrollerFirstIndex !== undefined) {
            this.scrollerFirstIndex = params.scrollerFirstIndex;
        }
        if (params.scrollerSecondIndex !== undefined) {
            this.scrollerSecondIndex = params.scrollerSecondIndex;
        }
        if (params.scrollerThirdIndex !== undefined) {
            this.scrollerThirdIndex = params.scrollerThirdIndex;
        }
        if (params.customizePickerModel !== undefined) {
            this.customizePickerModel = params.customizePickerModel;
        }
    }
    aboutToBeDeleted() {
        this.__scrollerFirstIndex.aboutToBeDeleted();
        this.__scrollerSecondIndex.aboutToBeDeleted();
        this.__scrollerThirdIndex.aboutToBeDeleted();
        this.__customizePickerModel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private cancel: () => void;
    private confirm: () => void;
    private scrollerFirst: Scroller;
    private scrollerSecond: Scroller;
    private scrollerThird: Scroller;
    private buttonHeight: number;
    private halfMoveRatio: number;
    private array;
    private __scrollerFirstIndex: ObservedPropertySimple<number>;
    get scrollerFirstIndex() {
        return this.__scrollerFirstIndex.get();
    }
    set scrollerFirstIndex(newValue: number) {
        this.__scrollerFirstIndex.set(newValue);
    }
    private __scrollerSecondIndex: ObservedPropertySimple<number>;
    get scrollerSecondIndex() {
        return this.__scrollerSecondIndex.get();
    }
    set scrollerSecondIndex(newValue: number) {
        this.__scrollerSecondIndex.set(newValue);
    }
    private __scrollerThirdIndex: ObservedPropertySimple<number>;
    get scrollerThirdIndex() {
        return this.__scrollerThirdIndex.get();
    }
    set scrollerThirdIndex(newValue: number) {
        this.__scrollerThirdIndex.set(newValue);
    }
    private __customizePickerModel: ObservedPropertyObject<CustomizePickerComponent.Model>;
    get customizePickerModel() {
        return this.__customizePickerModel.get();
    }
    set customizePickerModel(newValue: CustomizePickerComponent.Model) {
        this.__customizePickerModel.set(newValue);
    }
    render() {
        Column.create();
        Column.backgroundColor(Color.White);
        Flex.create({ justifyContent: FlexAlign.SpaceAround, direction: FlexDirection.Row });
        Flex.backgroundColor("#7CDCDC");
        Flex.margin({ bottom: 0 });
        Button.createWithLabel(this.customizePickerModel.cancelButtonFont);
        Button.height(this.buttonHeight);
        Button.fontSize(this.customizePickerModel.titleFontSize);
        Button.backgroundColor(this.customizePickerModel.buttonBackgroundColor);
        Button.fontColor(this.customizePickerModel.cancelButtonColor);
        Button.margin({ left: 10 });
        Button.onClick(() => {
            if (this.controller !== undefined) {
                this.controller.close();
            }
            this.cancel();
        });
        Button.pop();
        Column.create();
        Row.create();
        Text.create("自定义选择器");
        Text.height(this.buttonHeight);
        Text.fontSize(this.customizePickerModel.titleFontSize);
        Text.fontColor(this.customizePickerModel.titleFontColor);
        Text.pop();
        Row.pop();
        Column.pop();
        Button.createWithLabel(this.customizePickerModel.confirmButtonFont);
        Button.fontSize(this.customizePickerModel.titleFontSize);
        Button.height(this.buttonHeight);
        Button.backgroundColor(this.customizePickerModel.buttonBackgroundColor);
        Button.fontColor(this.customizePickerModel.confirmButtonColor);
        Button.onClick(() => {
            if (this.controller) {
                this.controller.close();
                this.confirm();
            }
        });
        Button.pop();
        Flex.pop();
        Stack.create({ alignContent: Alignment.TopStart });
        If.create();
        if (this.customizePickerModel.dividerType == DividerType.FILL) {
            If.branchId(0);
            Divider.create();
            Divider.vertical(false);
            Divider.strokeWidth(this.customizePickerModel.dividerLineStroke);
            Divider.color(this.customizePickerModel.dividerLineColor);
            Divider.lineCap(LineCapStyle.Round);
            Divider.margin({ left: 10, top: this.customizePickerModel.textHeight * 2, right: 10 });
            Divider.create();
            Divider.vertical(false);
            Divider.strokeWidth(this.customizePickerModel.dividerLineStroke);
            Divider.color(this.customizePickerModel.dividerLineColor);
            Divider.lineCap(LineCapStyle.Round);
            Divider.margin({ left: 10, top: this.customizePickerModel.textHeight * 3, right: 10 });
        }
        else if (this.customizePickerModel.dividerType == DividerType.CIRCLE) {
            If.branchId(1);
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceAround);
            Ellipse.create({ width: "30%", height: this.customizePickerModel.textHeight });
            Ellipse.fillOpacity(0);
            Ellipse.stroke(this.customizePickerModel.dividerLineColor);
            Ellipse.strokeWidth(this.customizePickerModel.dividerLineStroke);
            Ellipse.margin({
                //left: this.customizePickerModel.columnLeftWidth[0],
                top: this.customizePickerModel.textHeight * 2
            });
            Ellipse.create({ width: "30%", height: this.customizePickerModel.textHeight });
            Ellipse.fillOpacity(0);
            Ellipse.stroke(this.customizePickerModel.dividerLineColor);
            Ellipse.strokeWidth(this.customizePickerModel.dividerLineStroke);
            Ellipse.margin({
                top: this.customizePickerModel.textHeight * 2
            });
            Ellipse.create({ width: "30%", height: this.customizePickerModel.textHeight });
            Ellipse.fillOpacity(0);
            Ellipse.stroke(this.customizePickerModel.dividerLineColor);
            Ellipse.strokeWidth(this.customizePickerModel.dividerLineStroke);
            Ellipse.margin({
                top: this.customizePickerModel.textHeight * 2
            });
            Row.pop();
        }
        else if (this.customizePickerModel.dividerType == DividerType.WRAP) {
            If.branchId(2);
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceAround);
            ForEach.create("2", this, ObservedObject.GetRawObject(this.array), (index: number) => {
                Column.create();
                Divider.create();
                Divider.vertical(false);
                Divider.strokeWidth(this.customizePickerModel.dividerLineStroke);
                Divider.color(this.customizePickerModel.dividerLineColor);
                Divider.lineCap(LineCapStyle.Round);
                Divider.margin({
                    top: this.customizePickerModel.textHeight * 2
                });
                Divider.width(this.customizePickerModel.lineWidth);
                Divider.create();
                Divider.vertical(false);
                Divider.strokeWidth(this.customizePickerModel.dividerLineStroke);
                Divider.color(this.customizePickerModel.dividerLineColor);
                Divider.lineCap(LineCapStyle.Round);
                Divider.margin({
                    top: this.customizePickerModel.textHeight * 1
                });
                Divider.width(this.customizePickerModel.lineWidth);
                Column.pop();
            }, (index: number) => index.toString());
            ForEach.pop();
            Row.pop();
        }
        If.pop();
        Row.create();
        Row.height(this.customizePickerModel.popupWindowHeight);
        //第一列
        Scroll.create(this.scrollerFirst);
        //第一列
        Scroll.scrollBar(BarState.Off);
        //第一列
        Scroll.onScrollStop(() => {
            // 滑动过后，计算滑动距离，保持选择项在红色线之内
            this.scrollerFirst.scrollTo({
                xOffset: 0,
                yOffset: Math.floor(this.scrollerFirst.currentOffset()
                    .yOffset / this.customizePickerModel.textHeight + this.halfMoveRatio) * this.customizePickerModel.textHeight,
                animation: { duration: 2000, curve: Curve.Ease }
            });
            this.scrollerFirstIndex = Math.floor(this.scrollerFirst.currentOffset()
                .yOffset / this.customizePickerModel.textHeight + this.halfMoveRatio);
            //将第二例位置重置
            this.scrollerSecond.scrollTo({
                xOffset: 0,
                yOffset: 0
            });
        });
        Column.create();
        Column.width(this.customizePickerModel.columnWidth);
        Text.create(' ');
        Text.height(this.customizePickerModel.textHeight);
        Text.pop();
        Text.create(' ');
        Text.height(this.customizePickerModel.textHeight);
        Text.pop();
        If.create();
        if (this.customizePickerModel.isPicker) {
            If.branchId(0);
            ForEach.create("3", this, ObservedObject.GetRawObject(this.customizePickerModel.pickerData), (item: CustomizePickerBean) => {
                Text.create((item.firstName).toString());
                Text.fontSize(this.customizePickerModel.fontSize);
                Text.height(this.customizePickerModel.textHeight);
                Text.fontColor(this.customizePickerModel.fontColor);
                Text.pop();
            }, (item: CustomizePickerBean) => item.id.toString());
            ForEach.pop();
        }
        else {
            If.branchId(1);
            ForEach.create("4", this, ObservedObject.GetRawObject(this.customizePickerModel.firstArray), (item: string) => {
                Text.create(item.toString());
                Text.fontSize(this.customizePickerModel.fontSize);
                Text.height(this.customizePickerModel.textHeight);
                Text.fontColor(this.customizePickerModel.fontColor);
                Text.pop();
            }, (item: string) => item.toString());
            ForEach.pop();
        }
        If.pop();
        Text.create(' ');
        Text.height(this.customizePickerModel.textHeight);
        Text.pop();
        Text.create(' ');
        Text.height(this.customizePickerModel.textHeight);
        Text.pop();
        Column.pop();
        //第一列
        Scroll.pop();
        //是否第二列
        Scroll.create(this.scrollerSecond);
        //是否第二列
        Scroll.scrollBar(BarState.Off);
        //是否第二列
        Scroll.onScrollStop(() => {
            // 滑动过后，计算滑动距离，保持选择项在红色线之内
            this.scrollerSecond.scrollTo({
                xOffset: 0,
                //如果移动的单位数超过字体高度的一半，则移动一个位置。否则回归原位
                yOffset: Math.floor(this.scrollerSecond.currentOffset()
                    .yOffset / this.customizePickerModel.textHeight + this.halfMoveRatio) * this.customizePickerModel.textHeight,
                animation: { duration: 2000, curve: Curve.Ease }
            });
            this.scrollerSecondIndex = Math.floor(this.scrollerSecond.currentOffset()
                .yOffset / this.customizePickerModel.textHeight + this.halfMoveRatio);
            //将第三列位置重置
            this.scrollerThird.scrollTo({
                xOffset: 0,
                yOffset: 0
            });
        });
        Column.create();
        Column.width(this.customizePickerModel.columnWidth);
        Text.create(' ');
        Text.height(this.customizePickerModel.textHeight);
        Text.pop();
        Text.create(' ');
        Text.height(this.customizePickerModel.textHeight);
        Text.pop();
        If.create();
        if (this.customizePickerModel.isPicker) {
            If.branchId(0);
            ForEach.create("5", this, ObservedObject.GetRawObject(this.customizePickerModel.pickerData[this.scrollerFirstIndex].secondAndThirdArray), (item: SecondAndThirdArray) => {
                Text.create((item.secondName).toString());
                Text.fontSize(this.customizePickerModel.fontSize);
                Text.height(this.customizePickerModel.textHeight);
                Text.fontColor(this.customizePickerModel.fontColor);
                Text.pop();
            }, (item: SecondAndThirdArray) => item.ids.toString());
            ForEach.pop();
        }
        else {
            If.branchId(1);
            ForEach.create("6", this, ObservedObject.GetRawObject(this.customizePickerModel.secondArray), (item: string) => {
                Text.create(item.toString());
                Text.fontSize(this.customizePickerModel.fontSize);
                Text.height(this.customizePickerModel.textHeight);
                Text.fontColor(this.customizePickerModel.fontColor);
                Text.pop();
            }, (item: string) => item.toString());
            ForEach.pop();
        }
        If.pop();
        Text.create(' ');
        Text.height(this.customizePickerModel.textHeight);
        Text.pop();
        Text.create(' ');
        Text.height(this.customizePickerModel.textHeight);
        Text.pop();
        Column.pop();
        //是否第二列
        Scroll.pop();
        // 是否第三列
        Scroll.create(this.scrollerThird);
        // 是否第三列
        Scroll.scrollBar(BarState.Off);
        // 是否第三列
        Scroll.onScrollStop(() => {
            this.scrollerThird.scrollTo({
                xOffset: 0,
                yOffset: Math.floor(this.scrollerThird.currentOffset()
                    .yOffset / this.customizePickerModel.textHeight + this.halfMoveRatio) * this.customizePickerModel.textHeight,
                animation: { duration: 2000, curve: Curve.Ease }
            });
            this.scrollerThirdIndex = Math.floor(this.scrollerThird.currentOffset()
                .yOffset / this.customizePickerModel.textHeight + this.halfMoveRatio);
        });
        Column.create();
        Column.width(this.customizePickerModel.columnWidth);
        Text.create(' ');
        Text.height(this.customizePickerModel.textHeight);
        Text.pop();
        Text.create(' ');
        Text.height(this.customizePickerModel.textHeight);
        Text.pop();
        If.create();
        if (this.customizePickerModel.isPicker) {
            If.branchId(0);
            ForEach.create("7", this, ObservedObject.GetRawObject(this.customizePickerModel.pickerData[this.scrollerFirstIndex].secondAndThirdArray[this.scrollerSecondIndex].thirdArray), (item: string) => {
                Text.create(item.toString());
                Text.fontSize(this.customizePickerModel.fontSize);
                Text.fontColor(this.customizePickerModel.fontColor);
                Text.height(this.customizePickerModel.textHeight);
                Text.pop();
            });
            ForEach.pop();
        }
        else {
            If.branchId(1);
            ForEach.create("8", this, ObservedObject.GetRawObject(this.customizePickerModel.thirdArray), (itemString: number) => {
                Text.create(`${itemString}`.toString());
                Text.fontSize(this.customizePickerModel.fontSize);
                Text.fontColor(this.customizePickerModel.fontColor);
                Text.height(this.customizePickerModel.textHeight);
                Text.pop();
            }, (val: string) => val.toString());
            ForEach.pop();
        }
        If.pop();
        Text.create(' ');
        Text.height(this.customizePickerModel.textHeight);
        Text.pop();
        Text.create(' ');
        Text.height(this.customizePickerModel.textHeight);
        Text.pop();
        Column.pop();
        // 是否第三列
        Scroll.pop();
        Row.pop();
        Stack.pop();
        Column.pop();
    }
}
class CustomizePickerComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new CustomizePickerComponent.Model(), this, "model");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomizeDialogController("9", this, {
                    cancel: this.onCancel,
                    confirm: this.onAccept,
                    customizePickerModel: this.model
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            cancel: this.existApp,
            autoCancel: true,
            alignment: DialogAlignment.Bottom
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomizePickerComponent_Params) {
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
    private __model: ObservedPropertyObject<CustomizePickerComponent.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: CustomizePickerComponent.Model) {
        this.__model.set(newValue);
    }
    private dialogController: CustomDialogController;
    // 城市
    onCancel() {
        console.info('Callback when the city first button is clicked');
    }
    onAccept() {
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
        Text.create('自定义选择器');
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
namespace CustomizePickerComponent {
    export class Model {
        text: string = '';
        firstArray: number[] = [];
        secondArray: string[] | number[] = [];
        thirdArray: string[] | number[] = [];
        dividerLineColor: Color = Color.Red;
        dividerLineStroke: number = 1;
        thirdIsShow: boolean = false;
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
        dividerType?: DividerType = DividerType.FILL;
        lineSpacingMultiplier: number = 0;
        popupWindowHeight: number = 250;
        textHeight: number = 50;
        isPicker: boolean = true;
        pickerData: CustomizePickerBean[] = [];
        lineWidth: number = px2vp(deviceWidth * 0.25);
        setLineSpacingMultiplier(lineSpacingMultiplier: number): Model {
            if (lineSpacingMultiplier > 50) {
                lineSpacingMultiplier = 50;
            }
            this.lineSpacingMultiplier = lineSpacingMultiplier;
            this.textHeight = 50 + lineSpacingMultiplier;
            this.popupWindowHeight = this.textHeight * 5;
            return this;
        }
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
        constructor(firstArray?: any) {
            this.firstArray = firstArray;
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
        setPicker(firstArray: any, secondArray: any, thirdArray: any): Model {
            this.isPicker = true;
            this.firstArray = firstArray;
            this.secondArray = secondArray;
            this.thirdArray = thirdArray;
            this.pickerData = initializeCustomizePickerDataOnStartup(firstArray, secondArray, thirdArray);
            return this;
        }
        setNPicker(firstArray: any, secondArray: any, thirdArray: any): Model {
            this.isPicker = false;
            this.firstArray = firstArray;
            this.secondArray = secondArray;
            this.thirdArray = thirdArray;
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
export default CustomizePickerComponent;
