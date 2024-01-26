interface CityPickerComponent_Params {
    currentThis?;
    selectValue?: string;
    confirmValue?: string;
    model?: CityPickerComponentEntity.Model;
    dialogCityController?: CustomDialogController;
}
interface CustomDialogCityExample_Params {
    currentThis?: ESObject;
    controller?: CustomDialogController;
    cancel?: () => void;
    confirm?: () => void;
    scrollerProvince?: Scroller;
    scrollerCity?: Scroller;
    scrollerArea?: Scroller;
    firstProvinceInsert?: boolean;
    firstCityInsert?: boolean;
    firstAreaInsert?: boolean;
    lastProvincePosition?: number;
    lastCityPosition?: number;
    lastAreaPosition?: number;
    buttonHeight?: number;
    array?: number[];
    confirmValue?: string;
    provinceArray?: Province[];
    scrollerProvinceIndex?: number;
    scrollerCityIndex?: number;
    scrollerAreaIndex?: number;
    cityPickerModel?: CityPickerComponentEntity.Model;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CityPickerComponent_" + ++__generate__Id;
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
import { initializeProvinceOnStartup, Province, CityAndArea } from './Province';
import { DividerType, deviceWidth } from './Constant';
class CustomDialogCityExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.currentThis = undefined;
        this.controller = undefined;
        this.cancel = () => { };
        this.confirm = () => { };
        this.scrollerProvince = new Scroller();
        this.scrollerCity = new Scroller();
        this.scrollerArea = new Scroller();
        this.firstProvinceInsert = true;
        this.firstCityInsert = true;
        this.firstAreaInsert = true;
        this.lastProvincePosition = 0;
        this.lastCityPosition = 0;
        this.lastAreaPosition = 0;
        this.buttonHeight = 50;
        this.array = [1, 2];
        this.confirmValue = '';
        this.__provinceArray = new ObservedPropertyObject(initializeProvinceOnStartup(), this, "provinceArray");
        this.__scrollerProvinceIndex = new ObservedPropertySimple(0, this, "scrollerProvinceIndex");
        this.__scrollerCityIndex = new ObservedPropertySimple(0, this, "scrollerCityIndex");
        this.__scrollerAreaIndex = new ObservedPropertySimple(0, this, "scrollerAreaIndex");
        this.__cityPickerModel = new ObservedPropertyObject(new CityPickerComponentEntity.Model(), this, "cityPickerModel");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomDialogCityExample_Params) {
        if (params.currentThis !== undefined) {
            this.currentThis = params.currentThis;
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
        if (params.scrollerProvince !== undefined) {
            this.scrollerProvince = params.scrollerProvince;
        }
        if (params.scrollerCity !== undefined) {
            this.scrollerCity = params.scrollerCity;
        }
        if (params.scrollerArea !== undefined) {
            this.scrollerArea = params.scrollerArea;
        }
        if (params.firstProvinceInsert !== undefined) {
            this.firstProvinceInsert = params.firstProvinceInsert;
        }
        if (params.firstCityInsert !== undefined) {
            this.firstCityInsert = params.firstCityInsert;
        }
        if (params.firstAreaInsert !== undefined) {
            this.firstAreaInsert = params.firstAreaInsert;
        }
        if (params.lastProvincePosition !== undefined) {
            this.lastProvincePosition = params.lastProvincePosition;
        }
        if (params.lastCityPosition !== undefined) {
            this.lastCityPosition = params.lastCityPosition;
        }
        if (params.lastAreaPosition !== undefined) {
            this.lastAreaPosition = params.lastAreaPosition;
        }
        if (params.buttonHeight !== undefined) {
            this.buttonHeight = params.buttonHeight;
        }
        if (params.array !== undefined) {
            this.array = params.array;
        }
        if (params.confirmValue !== undefined) {
            this.confirmValue = params.confirmValue;
        }
        if (params.provinceArray !== undefined) {
            this.provinceArray = params.provinceArray;
        }
        if (params.scrollerProvinceIndex !== undefined) {
            this.scrollerProvinceIndex = params.scrollerProvinceIndex;
        }
        if (params.scrollerCityIndex !== undefined) {
            this.scrollerCityIndex = params.scrollerCityIndex;
        }
        if (params.scrollerAreaIndex !== undefined) {
            this.scrollerAreaIndex = params.scrollerAreaIndex;
        }
        if (params.cityPickerModel !== undefined) {
            this.cityPickerModel = params.cityPickerModel;
        }
    }
    aboutToBeDeleted() {
        this.__provinceArray.aboutToBeDeleted();
        this.__scrollerProvinceIndex.aboutToBeDeleted();
        this.__scrollerCityIndex.aboutToBeDeleted();
        this.__scrollerAreaIndex.aboutToBeDeleted();
        this.__cityPickerModel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private currentThis: any;
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private cancel: () => void;
    private confirm: () => void;
    private scrollerProvince: Scroller;
    private scrollerCity: Scroller;
    private scrollerArea: Scroller;
    private firstProvinceInsert: boolean;
    private firstCityInsert: boolean;
    private firstAreaInsert: boolean;
    private lastProvincePosition: number;
    private lastCityPosition: number;
    private lastAreaPosition: number;
    private buttonHeight: number;
    private array: number[];
    private confirmValue: string;
    private __provinceArray: ObservedPropertyObject<Province[]>;
    get provinceArray() {
        return this.__provinceArray.get();
    }
    set provinceArray(newValue: Province[]) {
        this.__provinceArray.set(newValue);
    }
    private __scrollerProvinceIndex: ObservedPropertySimple<number>;
    get scrollerProvinceIndex() {
        return this.__scrollerProvinceIndex.get();
    }
    set scrollerProvinceIndex(newValue: number) {
        this.__scrollerProvinceIndex.set(newValue);
    }
    private __scrollerCityIndex: ObservedPropertySimple<number>;
    get scrollerCityIndex() {
        return this.__scrollerCityIndex.get();
    }
    set scrollerCityIndex(newValue: number) {
        this.__scrollerCityIndex.set(newValue);
    }
    private __scrollerAreaIndex: ObservedPropertySimple<number>;
    get scrollerAreaIndex() {
        return this.__scrollerAreaIndex.get();
    }
    set scrollerAreaIndex(newValue: number) {
        this.__scrollerAreaIndex.set(newValue);
    }
    private __cityPickerModel: ObservedPropertyObject<CityPickerComponentEntity.Model>;
    get cityPickerModel() {
        return this.__cityPickerModel.get();
    }
    set cityPickerModel(newValue: CityPickerComponentEntity.Model) {
        this.__cityPickerModel.set(newValue);
    }
    public aboutToAppear() {
        // 获取初始化选择省的index
        if (this.cityPickerModel.defaultSelection[0] != null && this.cityPickerModel.defaultSelection[0] != "0") {
            this.provinceArray.forEach((val: Province, idx: number) => {
                if (this.cityPickerModel.defaultSelection[0] == val.provinceName) {
                    this.scrollerProvinceIndex = idx;
                }
            });
        }
        if (this.cityPickerModel.defaultSelection[1] != null && this.cityPickerModel.defaultSelection[1] != "") {
            this.provinceArray[this.scrollerProvinceIndex].cityAndArea.forEach((val: CityAndArea, idx: number) => {
                if (this.cityPickerModel.defaultSelection[1] == val.cityName) {
                    this.scrollerCityIndex = idx;
                }
            });
        }
        if (this.cityPickerModel.defaultSelection[2] != null && this.cityPickerModel.defaultSelection[2] != "0") {
            this.provinceArray[this.scrollerProvinceIndex].cityAndArea[this.scrollerCityIndex].area.forEach((val: string, idx: number) => {
                if (this.cityPickerModel.defaultSelection[2] == val) {
                    this.scrollerAreaIndex = idx;
                }
            });
        }
    }
    render() {
        Column.create();
        Column.backgroundColor(Color.White);
        Flex.create({ justifyContent: FlexAlign.SpaceAround });
        Flex.backgroundColor("#7CDCDC");
        Flex.margin({ bottom: 0 });
        Button.createWithLabel(this.cityPickerModel.cancelButtonFont);
        Button.height(this.buttonHeight);
        Button.fontSize(this.cityPickerModel.titleFontSize);
        Button.backgroundColor(this.cityPickerModel.buttonBackgroundColor);
        Button.fontColor(this.cityPickerModel.cancelButtonColor);
        Button.margin({ left: 10 });
        Button.onClick(() => {
            this.controller.close();
            this.cancel();
        });
        Button.pop();
        Column.create();
        Row.create();
        Text.create("城市选择");
        Text.height(this.buttonHeight);
        Text.fontSize(this.cityPickerModel.titleFontSize);
        Text.fontColor(this.cityPickerModel.titleFontColor);
        Text.pop();
        Row.pop();
        Column.pop();
        Button.createWithLabel(this.cityPickerModel.confirmButtonFont);
        Button.fontSize(this.cityPickerModel.titleFontSize);
        Button.backgroundColor(this.cityPickerModel.buttonBackgroundColor);
        Button.fontColor(this.cityPickerModel.confirmButtonColor);
        Button.onClick(() => {
            let provinceName: string = this.provinceArray[this.scrollerProvinceIndex].provinceName;
            let cityName: string = this.provinceArray[this.scrollerProvinceIndex].cityAndArea[this.scrollerCityIndex].cityName;
            if (!this.cityPickerModel.areaIsShow) {
                this.confirmValue = provinceName + '/' + cityName;
            }
            else {
                let areaName: string = this.provinceArray[this.scrollerProvinceIndex].cityAndArea[this.scrollerCityIndex].area[this.scrollerAreaIndex];
                this.confirmValue = provinceName + '/' + cityName + '/' + areaName;
            }
            this.controller.close();
            this.confirm();
        });
        Button.pop();
        Flex.pop();
        Stack.create({ alignContent: Alignment.TopStart });
        If.create();
        if (this.cityPickerModel.dividerType == DividerType.FILL) {
            If.branchId(0);
            Divider.create();
            Divider.vertical(false);
            Divider.strokeWidth(this.cityPickerModel.dividerLineStroke);
            Divider.color(this.cityPickerModel.dividerLineColor);
            Divider.lineCap(LineCapStyle.Round);
            Divider.margin({ top: this.cityPickerModel.textHeight * 2 });
            Divider.create();
            Divider.vertical(false);
            Divider.strokeWidth(this.cityPickerModel.dividerLineStroke);
            Divider.color(this.cityPickerModel.dividerLineColor);
            Divider.lineCap(LineCapStyle.Round);
            Divider.margin({ top: this.cityPickerModel.textHeight * 3 });
        }
        else if (this.cityPickerModel.dividerType == DividerType.CIRCLE) {
            If.branchId(1);
            Row.create({ space: 30 });
            Row.margin({ top: this.cityPickerModel.textHeight * 2 });
            Row.justifyContent(FlexAlign.Center);
            Row.width("100%");
            Ellipse.create({ width: "40%", height: this.cityPickerModel.textHeight });
            Ellipse.fillOpacity(0);
            Ellipse.stroke(this.cityPickerModel.dividerLineColor);
            Ellipse.strokeWidth(this.cityPickerModel.dividerLineStroke);
            Ellipse.create({ width: "40%", height: this.cityPickerModel.textHeight });
            Ellipse.fillOpacity(0);
            Ellipse.stroke(this.cityPickerModel.dividerLineColor);
            Ellipse.strokeWidth(this.cityPickerModel.dividerLineStroke);
            Row.pop();
        }
        else if (this.cityPickerModel.dividerType == DividerType.WRAP) {
            If.branchId(2);
            Row.create();
            Row.justifyContent(FlexAlign.SpaceAround);
            Row.width("100%");
            ForEach.create("2", this, ObservedObject.GetRawObject(this.array), (index: number) => {
                Column.create();
                Column.width(this.cityPickerModel.columnLeftWidth);
                Divider.create();
                Divider.vertical(false);
                Divider.strokeWidth(this.cityPickerModel.dividerLineStroke);
                Divider.color(this.cityPickerModel.dividerLineColor);
                Divider.lineCap(LineCapStyle.Round);
                Divider.margin({ top: this.cityPickerModel.textHeight * 2 });
                Divider.create();
                Divider.vertical(false);
                Divider.strokeWidth(this.cityPickerModel.dividerLineStroke);
                Divider.color(this.cityPickerModel.dividerLineColor);
                Divider.lineCap(LineCapStyle.Round);
                Divider.margin({ top: this.cityPickerModel.textHeight * 1 });
                Column.pop();
            });
            ForEach.pop();
            Row.pop();
        }
        If.pop();
        Row.create();
        Row.height(this.cityPickerModel.popupWindowHeight);
        Row.alignItems(VerticalAlign.Bottom);
        //Scroll(this.scrollerProvince) {
        Column.create();
        //Scroll(this.scrollerProvince) {
        Column.width(this.cityPickerModel.columnWidth);
        //  省
        List.create({ space: 0, initialIndex: this.scrollerProvinceIndex, scroller: this.scrollerProvince });
        //  省
        List.scrollBar(BarState.Off);
        //  省
        List.onReachStart(() => {
            this.scrollerProvinceIndex = 0;
        });
        //  省
        List.onReachEnd(() => {
            this.scrollerProvinceIndex = this.provinceArray.length - 1;
        });
        //  省
        List.onScrollStop(() => {
            let provinceCurrentOffset: number = this.scrollerProvince.currentOffset().yOffset;
            let scrollProvinceOffset = provinceCurrentOffset % this.cityPickerModel.textHeight;
            if (scrollProvinceOffset > 1) {
                if (this.lastProvincePosition > provinceCurrentOffset) { // 小于0，向下滑动，大于0是，是向上滑动
                    this.scrollerProvinceIndex = (provinceCurrentOffset - scrollProvinceOffset) / this.cityPickerModel.textHeight;
                }
                else {
                    this.scrollerProvinceIndex = (provinceCurrentOffset - scrollProvinceOffset) / this.cityPickerModel.textHeight + 1;
                }
                if (this.scrollerProvinceIndex > (this.provinceArray.length - 1)) {
                    this.scrollerProvinceIndex = this.provinceArray.length - 1;
                }
                this.scrollerProvince.scrollTo({
                    xOffset: 0,
                    yOffset: this.scrollerProvinceIndex * this.cityPickerModel.textHeight,
                    animation: { duration: 1000, curve: Curve.Ease }
                });
                this.lastProvincePosition = provinceCurrentOffset;
            }
        });
        ListItem.create();
        Text.create(" ");
        Text.fontSize(this.cityPickerModel.fontSize);
        Text.height(this.cityPickerModel.textHeight);
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        ListItem.pop();
        ListItem.create();
        Text.create(" ");
        Text.fontSize(this.cityPickerModel.fontSize);
        Text.height(this.cityPickerModel.textHeight);
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        ListItem.pop();
        ForEach.create("3", this, ObservedObject.GetRawObject(this.provinceArray), (provinceItem: Province) => {
            ListItem.create();
            Text.create(provinceItem.provinceName);
            Text.fontSize(this.cityPickerModel.fontSize);
            Text.fontColor(this.cityPickerModel.fontColor);
            Text.height(this.cityPickerModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
        });
        ForEach.pop();
        ListItem.create();
        Text.create(" ");
        Text.fontSize(this.cityPickerModel.fontSize);
        Text.height(this.cityPickerModel.textHeight);
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        ListItem.pop();
        ListItem.create();
        Text.create(" ");
        Text.fontSize(this.cityPickerModel.fontSize);
        Text.height(this.cityPickerModel.textHeight);
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        ListItem.pop();
        //  省
        List.pop();
        //Scroll(this.scrollerProvince) {
        Column.pop();
        // 城市
        Column.create();
        // 城市
        Column.width(this.cityPickerModel.columnWidth);
        List.create({ space: 0, initialIndex: this.scrollerCityIndex, scroller: this.scrollerCity });
        List.scrollBar(BarState.Off);
        List.onReachStart(() => {
            this.scrollerCityIndex = 0;
        });
        List.onReachEnd(() => {
            this.scrollerCityIndex = this.provinceArray[this.scrollerProvinceIndex].cityAndArea.length - 1;
        });
        List.onScrollStop(() => {
            // 滑动过后，计算滑动距离，保持选择项在红色线之内
            let cityCurrentOffset: number = this.scrollerCity.currentOffset().yOffset;
            let scrollCityOffset = cityCurrentOffset % this.cityPickerModel.textHeight;
            if (scrollCityOffset > 1) {
                if (this.lastCityPosition > cityCurrentOffset) { // 小于0，向下滑动，大于0是，是向上滑动
                    this.scrollerCityIndex = (cityCurrentOffset - scrollCityOffset) / this.cityPickerModel.textHeight;
                }
                else {
                    this.scrollerCityIndex = (cityCurrentOffset - scrollCityOffset) / this.cityPickerModel.textHeight + 1;
                }
                if (this.scrollerCityIndex > (this.provinceArray[this.scrollerProvinceIndex].cityAndArea.length - 1)) {
                    this.scrollerCityIndex = this.provinceArray[this.scrollerProvinceIndex].cityAndArea.length - 1;
                }
                this.scrollerCity.scrollTo({
                    xOffset: 0,
                    yOffset: this.scrollerCityIndex * this.cityPickerModel.textHeight,
                    animation: { duration: 1000, curve: Curve.Ease }
                });
                this.lastCityPosition = cityCurrentOffset;
            }
        });
        ListItem.create();
        Text.create(" ");
        Text.fontSize(this.cityPickerModel.fontSize);
        Text.height(this.cityPickerModel.textHeight);
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        ListItem.pop();
        ListItem.create();
        Text.create(" ");
        Text.fontSize(this.cityPickerModel.fontSize);
        Text.height(this.cityPickerModel.textHeight);
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        ListItem.pop();
        ForEach.create("4", this, ObservedObject.GetRawObject(this.provinceArray[this.scrollerProvinceIndex].cityAndArea), (val: CityAndArea) => {
            If.create();
            if (val.cityName.length > 5) {
                If.branchId(0);
                ListItem.create();
                Text.create(val.cityName);
                Text.fontSize(this.cityPickerModel.lengthOverFive_fontSize);
                Text.fontColor(this.cityPickerModel.fontColor);
                Text.height(this.cityPickerModel.textHeight);
                Text.width('100%');
                Text.textAlign(TextAlign.Center);
                Text.pop();
                ListItem.pop();
            }
            else {
                If.branchId(1);
                ListItem.create();
                Text.create(val.cityName);
                Text.fontSize(this.cityPickerModel.fontSize);
                Text.fontColor(this.cityPickerModel.fontColor);
                Text.height(this.cityPickerModel.textHeight);
                Text.width('100%');
                Text.textAlign(TextAlign.Center);
                Text.pop();
                ListItem.pop();
            }
            If.pop();
        }, (val: CityAndArea) => val.id.toString());
        ForEach.pop();
        ListItem.create();
        Text.create(" ");
        Text.fontSize(this.cityPickerModel.fontSize);
        Text.height(this.cityPickerModel.textHeight);
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        ListItem.pop();
        ListItem.create();
        Text.create(" ");
        Text.fontSize(this.cityPickerModel.fontSize);
        Text.height(this.cityPickerModel.textHeight);
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        ListItem.pop();
        List.pop();
        // 城市
        Column.pop();
        If.create();
        // 是否显示区
        if (this.cityPickerModel.areaIsShow) {
            If.branchId(0);
            Column.create();
            Column.width(this.cityPickerModel.columnWidth);
            // 城市
            List.create({ space: 0, initialIndex: this.scrollerAreaIndex, scroller: this.scrollerArea });
            // 城市
            List.scrollBar(BarState.Off);
            // 城市
            List.onReachStart(() => {
                this.scrollerAreaIndex = 0;
            });
            // 城市
            List.onReachEnd(() => {
                this.scrollerAreaIndex = this.provinceArray[this.scrollerProvinceIndex].cityAndArea[this.scrollerCityIndex].area.length - 1;
            });
            // 城市
            List.onScrollStop(() => {
                let areaCurrentOffset: number = this.scrollerArea.currentOffset().yOffset;
                let scrollCityOffset = areaCurrentOffset % this.cityPickerModel.textHeight;
                if (scrollCityOffset > 1) {
                    if (this.lastAreaPosition > areaCurrentOffset) { // 小于0，向下滑动，大于0是，是向上滑动
                        this.scrollerAreaIndex = (areaCurrentOffset - scrollCityOffset) / this.cityPickerModel.textHeight;
                    }
                    else {
                        this.scrollerAreaIndex = (areaCurrentOffset - scrollCityOffset) / this.cityPickerModel.textHeight + 1;
                    }
                    if (this.scrollerAreaIndex > (this.provinceArray[this.scrollerProvinceIndex].cityAndArea[this.scrollerCityIndex].area.length - 1)) {
                        this.scrollerAreaIndex = this.provinceArray[this.scrollerProvinceIndex].cityAndArea[this.scrollerCityIndex].area.length - 1;
                    }
                    this.scrollerArea.scrollTo({
                        xOffset: 0,
                        yOffset: this.scrollerAreaIndex * this.cityPickerModel.textHeight,
                        animation: { duration: 1000, curve: Curve.Ease }
                    });
                    this.lastAreaPosition = areaCurrentOffset;
                }
            });
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.cityPickerModel.fontSize);
            Text.height(this.cityPickerModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.cityPickerModel.fontSize);
            Text.height(this.cityPickerModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
            ForEach.create("5", this, ObservedObject.GetRawObject(this.provinceArray[this.scrollerProvinceIndex].cityAndArea[this.scrollerCityIndex].area), (area: string) => {
                ListItem.create();
                Text.create(area);
                Text.fontSize(this.cityPickerModel.fontSize);
                Text.fontColor(this.cityPickerModel.fontColor);
                Text.height(this.cityPickerModel.textHeight);
                Text.width('100%');
                Text.textAlign(TextAlign.Center);
                Text.pop();
                ListItem.pop();
            }, (val: string) => val.toString());
            ForEach.pop();
            ListItem.create();
            Text.create(' ');
            Text.fontSize(this.cityPickerModel.fontSize);
            Text.height(this.cityPickerModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
            ListItem.create();
            Text.create(' ');
            Text.fontSize(this.cityPickerModel.fontSize);
            Text.height(this.cityPickerModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
            // 城市
            List.pop();
            Column.pop();
        }
        If.pop();
        Row.pop();
        Stack.pop();
        Column.pop();
    }
}
export class CityPickerComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.currentThis = this;
        this.__selectValue = new ObservedPropertySimple("", this, "selectValue");
        this.confirmValue = "";
        this.__model = new ObservedPropertyObject(new CityPickerComponentEntity.Model(), this, "model");
        this.dialogCityController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogCityExample("6", this, {
                    currentThis: this.currentThis,
                    cancel: this.onCityCancel,
                    confirm: this.onCityAccept,
                    cityPickerModel: this.model,
                    confirmValue: this.confirmValue
                });
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
    updateWithValueParams(params: CityPickerComponent_Params) {
        if (params.currentThis !== undefined) {
            this.currentThis = params.currentThis;
        }
        if (params.selectValue !== undefined) {
            this.selectValue = params.selectValue;
        }
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
        this.__selectValue.aboutToBeDeleted();
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private currentThis;
    private __selectValue: ObservedPropertySimple<string>;
    get selectValue() {
        return this.__selectValue.get();
    }
    set selectValue(newValue: string) {
        this.__selectValue.set(newValue);
    }
    private confirmValue: string;
    private __model: ObservedPropertyObject<CityPickerComponentEntity.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: CityPickerComponentEntity.Model) {
        this.__model.set(newValue);
    }
    private dialogCityController: CustomDialogController;
    // 城市
    onCityCancel() {
        console.info('Callback when the city second button is clicked');
    }
    onCityAccept() {
        this.currentThis.selectValue = this.confirmValue;
        // console.info(JSON.stringify(this.cityPickerModel.textHeight) + "onCityAccept:" )
        //this.cityPickerModel.callback(this.that.selectValue);
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
        Text.create(this.selectValue.length > 0 ? this.selectValue : '城市选择器');
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
namespace CityPickerComponentEntity {
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
        lengthOverFive_fontSize: number = 30;
        color: string = '';
        onclick: Function = () => { };
        pickerSpace: number = 15;
        buttonBackgroundColor: string = "#7CDCDC";
        defaultSelection: string[] = [];
        dividerType?: DividerType = DividerType.FILL;
        lineSpacingMultiplier: number = 0;
        popupWindowHeight: number = 250;
        textHeight: number = 50;
        columnLeftWidth: number = px2vp(deviceWidth * 0.3);
        callback: Function = (selectValueParam: string) => { };
        setCallback(callback: (selectValueParam: string) => void): Model {
            console.warn("setCallback" + callback);
            this.callback = callback;
            return this;
        }
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
        setDefaultSelection(defaultSelection: string[]): Model {
            this.defaultSelection = defaultSelection;
            return this;
        }
        setButtonBackgroundColor(buttonBackgroundColor: string): Model {
            this.buttonBackgroundColor = buttonBackgroundColor;
            return this;
        }
        setLengthOverFive_fontSize(fontSize: number): Model {
            this.lengthOverFive_fontSize = fontSize;
            return this;
        }
        setPickerSpace(pickerSpace: number): Model {
            this.pickerSpace = pickerSpace;
            return this;
        }
        constructor(dividerLineStroke?: number) {
            //      this.dividerLineStroke = dividerLineStroke;
            console.log("in Builder constructor");
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
export default CityPickerComponentEntity;
