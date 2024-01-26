interface AreaDataPickerViewLib_Params {
    scrollerProvince?: Scroller;
    scrollerCity?: Scroller;
    scrollerArea?: Scroller;
    provinceArray?: Province[];
    lastProvincePosition?: number;
    lastCityPosition?: number;
    lastAreaPosition?: number;
    buttonHeight?: number;
    firstProvinceInsert?: boolean;
    firstCityInsert?: boolean;
    firstAreaInsert?: boolean;
    array?: number[];
    scrollerProvinceIndex?: number;
    scrollerCityIndex?: number;
    scrollerAreaIndex?: number;
    parseDataSuccess?: boolean;
    showTimePickerView?: boolean;
    areaDataModel?: AreaDataPickerViewLib.Model;
    cityAndAreaState?: CityAndArea[];
    AreaArrayState?: string[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AreaDataPickerViewLib_" + ++__generate__Id;
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
import { showToast, setTimeOut } from './ShowToast';
import { DividerType } from './Constant';
class AreaDataPickerViewLib extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scrollerProvince = new Scroller();
        this.scrollerCity = new Scroller();
        this.scrollerArea = new Scroller();
        this.provinceArray = initializeProvinceOnStartup();
        this.lastProvincePosition = 0;
        this.lastCityPosition = 0;
        this.lastAreaPosition = 0;
        this.buttonHeight = 50;
        this.firstProvinceInsert = true;
        this.firstCityInsert = true;
        this.firstAreaInsert = true;
        this.array = [1, 2, 3];
        this.__scrollerProvinceIndex = new ObservedPropertySimple(0, this, "scrollerProvinceIndex");
        this.__scrollerCityIndex = new ObservedPropertySimple(0, this, "scrollerCityIndex");
        this.__scrollerAreaIndex = new ObservedPropertySimple(0, this, "scrollerAreaIndex");
        this.__parseDataSuccess = new ObservedPropertySimple(false, this, "parseDataSuccess");
        this.__showTimePickerView = new ObservedPropertySimple(false, this, "showTimePickerView");
        this.areaDataModel = new AreaDataPickerViewLib.Model();
        this.__cityAndAreaState = new ObservedPropertyObject(this.provinceArray[this.scrollerProvinceIndex].cityAndArea, this, "cityAndAreaState");
        this.__AreaArrayState = new ObservedPropertyObject(this.provinceArray[this.scrollerProvinceIndex].cityAndArea[this.scrollerCityIndex].area, this, "AreaArrayState");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AreaDataPickerViewLib_Params) {
        if (params.scrollerProvince !== undefined) {
            this.scrollerProvince = params.scrollerProvince;
        }
        if (params.scrollerCity !== undefined) {
            this.scrollerCity = params.scrollerCity;
        }
        if (params.scrollerArea !== undefined) {
            this.scrollerArea = params.scrollerArea;
        }
        if (params.provinceArray !== undefined) {
            this.provinceArray = params.provinceArray;
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
        if (params.firstProvinceInsert !== undefined) {
            this.firstProvinceInsert = params.firstProvinceInsert;
        }
        if (params.firstCityInsert !== undefined) {
            this.firstCityInsert = params.firstCityInsert;
        }
        if (params.firstAreaInsert !== undefined) {
            this.firstAreaInsert = params.firstAreaInsert;
        }
        if (params.array !== undefined) {
            this.array = params.array;
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
        if (params.parseDataSuccess !== undefined) {
            this.parseDataSuccess = params.parseDataSuccess;
        }
        if (params.showTimePickerView !== undefined) {
            this.showTimePickerView = params.showTimePickerView;
        }
        if (params.areaDataModel !== undefined) {
            this.areaDataModel = params.areaDataModel;
        }
        if (params.cityAndAreaState !== undefined) {
            this.cityAndAreaState = params.cityAndAreaState;
        }
        if (params.AreaArrayState !== undefined) {
            this.AreaArrayState = params.AreaArrayState;
        }
    }
    aboutToBeDeleted() {
        this.__scrollerProvinceIndex.aboutToBeDeleted();
        this.__scrollerCityIndex.aboutToBeDeleted();
        this.__scrollerAreaIndex.aboutToBeDeleted();
        this.__parseDataSuccess.aboutToBeDeleted();
        this.__showTimePickerView.aboutToBeDeleted();
        this.__cityAndAreaState.aboutToBeDeleted();
        this.__AreaArrayState.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scrollerProvince: Scroller;
    private scrollerCity: Scroller;
    private scrollerArea: Scroller;
    private provinceArray: Province[];
    private lastProvincePosition: number;
    private lastCityPosition: number;
    private lastAreaPosition: number;
    private buttonHeight: number;
    private firstProvinceInsert: boolean;
    private firstCityInsert: boolean;
    private firstAreaInsert: boolean;
    private array: number[];
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
    private __parseDataSuccess: ObservedPropertySimple<boolean>;
    get parseDataSuccess() {
        return this.__parseDataSuccess.get();
    }
    set parseDataSuccess(newValue: boolean) {
        this.__parseDataSuccess.set(newValue);
    }
    private __showTimePickerView: ObservedPropertySimple<boolean>;
    get showTimePickerView() {
        return this.__showTimePickerView.get();
    }
    set showTimePickerView(newValue: boolean) {
        this.__showTimePickerView.set(newValue);
    }
    private areaDataModel: AreaDataPickerViewLib.Model;
    private __cityAndAreaState: ObservedPropertyObject<CityAndArea[]>;
    get cityAndAreaState() {
        return this.__cityAndAreaState.get();
    }
    set cityAndAreaState(newValue: CityAndArea[]) {
        this.__cityAndAreaState.set(newValue);
    }
    private __AreaArrayState: ObservedPropertyObject<string[]>;
    get AreaArrayState() {
        return this.__AreaArrayState.get();
    }
    set AreaArrayState(newValue: string[]) {
        this.__AreaArrayState.set(newValue);
    }
    aboutToAppear() {
        if (this.areaDataModel.defaultSelection[0] != null && this.areaDataModel.defaultSelection[0] != "0") {
            this.provinceArray.forEach((val: Province, idx: number) => {
                if (this.areaDataModel.defaultSelection[0] == val.provinceName) {
                    this.scrollerProvinceIndex = idx;
                }
            });
        }
        if (this.areaDataModel.defaultSelection[1] != null && this.areaDataModel.defaultSelection[1] != "") {
            this.provinceArray[this.scrollerProvinceIndex].cityAndArea.forEach((val: CityAndArea, idx: number) => {
                if (this.areaDataModel.defaultSelection[1] == val.cityName) {
                    this.scrollerCityIndex = idx;
                }
            });
        }
        if (this.areaDataModel.defaultSelection[2] != null && this.areaDataModel.defaultSelection[2] != "0") {
            this.provinceArray[this.scrollerProvinceIndex].cityAndArea[this.scrollerCityIndex].area.forEach((val: string, idx: number) => {
                if (this.areaDataModel.defaultSelection[2] == val) {
                    this.scrollerAreaIndex = idx;
                }
            });
        }
    }
    render() {
        Column.create();
        Column.width("100%");
        Column.height("100%");
        Column.backgroundColor(Color.White);
        Row.create();
        Row.alignItems(VerticalAlign.Bottom);
        Row.height("15%");
        Text.create('PARSE DATA');
        Text.width("90%");
        Text.height(this.buttonHeight);
        Text.backgroundColor(Color.Gray);
        Text.textAlign(TextAlign.Center);
        Text.fontSize(this.areaDataModel.titleFontSize);
        Text.fontColor(this.areaDataModel.titleFontColor);
        Text.onClick(() => {
            showToast("Begin Parse Data");
            setTimeOut(5000);
            this.showTimePickerView = false;
            this.parseDataSuccess = true;
        });
        Text.pop();
        Row.pop();
        Row.create();
        Row.alignItems(VerticalAlign.Top);
        Row.margin({ top: 10 });
        Row.height("15%");
        Text.create('SHOW OPTIONSPICKER');
        Text.width("90%");
        Text.height(this.buttonHeight);
        Text.backgroundColor(Color.Gray);
        Text.textAlign(TextAlign.Center);
        Text.fontSize(this.areaDataModel.titleFontSize);
        Text.fontColor(this.areaDataModel.titleFontColor);
        Text.onClick(() => {
            this.showTimePickerView = !this.showTimePickerView;
            if (!this.parseDataSuccess) { //再次打开，将index置为0
                showToast("Please parse the data first");
            }
            else {
                this.scrollerProvinceIndex = 0;
                this.scrollerCityIndex = 0;
                this.scrollerAreaIndex = 0;
            }
        });
        Text.pop();
        Row.pop();
        If.create();
        if (this.showTimePickerView && this.parseDataSuccess) {
            If.branchId(0);
            Flex.create({ justifyContent: FlexAlign.SpaceAround });
            Flex.backgroundColor("#7CDCDC");
            Button.createWithLabel(this.areaDataModel.cancelButtonFont);
            Button.height(this.buttonHeight);
            Button.fontSize(this.areaDataModel.titleFontSize);
            Button.backgroundColor(this.areaDataModel.buttonBackgroundColor);
            Button.fontColor(this.areaDataModel.cancelButtonColor);
            Button.margin({ left: 10 });
            Button.onClick(() => {
                this.showTimePickerView = false;
            });
            Button.pop();
            Column.create();
            Row.create();
            Text.create("城市选择");
            Text.height(this.buttonHeight);
            Text.fontSize(this.areaDataModel.titleFontSize);
            Text.fontColor(this.areaDataModel.titleFontColor);
            Text.pop();
            Row.pop();
            Column.pop();
            Button.createWithLabel(this.areaDataModel.confirmButtonFont);
            Button.fontSize(this.areaDataModel.titleFontSize);
            Button.backgroundColor(this.areaDataModel.buttonBackgroundColor);
            Button.fontColor(this.areaDataModel.confirmButtonColor);
            Button.onClick(() => {
                this.firstProvinceInsert = true;
                this.firstCityInsert = true;
                this.firstAreaInsert = true;
                this.showTimePickerView = false;
                showToast(this.provinceArray[this.scrollerProvinceIndex].provinceName + "/"
                    + this.provinceArray[this.scrollerProvinceIndex].cityAndArea[this.scrollerCityIndex].cityName + "/"
                    + this.provinceArray[this.scrollerProvinceIndex].cityAndArea[this.scrollerCityIndex].area[this.scrollerAreaIndex]);
            });
            Button.pop();
            Flex.pop();
            Stack.create({ alignContent: Alignment.TopStart });
            If.create();
            if (this.areaDataModel.dividerType == DividerType.FILL) {
                If.branchId(0);
                Divider.create();
                Divider.vertical(false);
                Divider.strokeWidth(this.areaDataModel.dividerLineStroke);
                Divider.color(this.areaDataModel.dividerLineColor);
                Divider.lineCap(LineCapStyle.Round);
                Divider.margin({ top: this.areaDataModel.textHeight * 2 });
                Divider.create();
                Divider.vertical(false);
                Divider.strokeWidth(this.areaDataModel.dividerLineStroke);
                Divider.color(this.areaDataModel.dividerLineColor);
                Divider.lineCap(LineCapStyle.Round);
                Divider.margin({ top: this.areaDataModel.textHeight * 3 });
            }
            else if (this.areaDataModel.dividerType == DividerType.CIRCLE) {
                If.branchId(1);
                Row.create();
                Row.width('100%');
                Row.justifyContent(FlexAlign.SpaceAround);
                Ellipse.create({ width: "30%", height: this.areaDataModel.textHeight });
                Ellipse.fillOpacity(0);
                Ellipse.stroke(this.areaDataModel.dividerLineColor);
                Ellipse.strokeWidth(this.areaDataModel.dividerLineStroke);
                Ellipse.margin({ top: this.areaDataModel.textHeight * 2 });
                Ellipse.create({ width: "30%", height: this.areaDataModel.textHeight });
                Ellipse.fillOpacity(0);
                Ellipse.stroke(this.areaDataModel.dividerLineColor);
                Ellipse.strokeWidth(this.areaDataModel.dividerLineStroke);
                Ellipse.margin({ top: this.areaDataModel.textHeight * 2 });
                Ellipse.create({ width: "30%", height: this.areaDataModel.textHeight });
                Ellipse.fillOpacity(0);
                Ellipse.stroke(this.areaDataModel.dividerLineColor);
                Ellipse.strokeWidth(this.areaDataModel.dividerLineStroke);
                Ellipse.margin({ top: this.areaDataModel.textHeight * 2 });
                Row.pop();
            }
            else if (this.areaDataModel.dividerType == DividerType.WRAP) {
                If.branchId(2);
                Row.create();
                Row.width('100%');
                Row.justifyContent(FlexAlign.SpaceAround);
                ForEach.create("2", this, ObservedObject.GetRawObject(this.array), (index: number) => {
                    Column.create();
                    Divider.create();
                    Divider.vertical(false);
                    Divider.strokeWidth(this.areaDataModel.dividerLineStroke);
                    Divider.color(this.areaDataModel.dividerLineColor);
                    Divider.lineCap(LineCapStyle.Round);
                    Divider.margin({ top: this.areaDataModel.textHeight * 2 });
                    Divider.width("30%");
                    Divider.create();
                    Divider.vertical(false);
                    Divider.strokeWidth(this.areaDataModel.dividerLineStroke);
                    Divider.color(this.areaDataModel.dividerLineColor);
                    Divider.lineCap(LineCapStyle.Round);
                    Divider.margin({ top: this.areaDataModel.textHeight * 1 });
                    Divider.width("30%");
                    Column.pop();
                }, (index: number) => index.toString());
                ForEach.pop();
                Row.pop();
            }
            If.pop();
            Row.create();
            Row.height(this.areaDataModel.popupWindowHeight);
            Row.alignItems(VerticalAlign.Bottom);
            Column.create();
            Column.width(this.areaDataModel.columnWidth);
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
                let scrollProvinceOffset = provinceCurrentOffset % this.areaDataModel.textHeight;
                if (scrollProvinceOffset > 1) {
                    if (this.lastProvincePosition > provinceCurrentOffset) { // 小于0，向下滑动，大于0是，是向上滑动
                        this.scrollerProvinceIndex = (provinceCurrentOffset - scrollProvinceOffset) / this.areaDataModel.textHeight;
                    }
                    else {
                        this.scrollerProvinceIndex = (provinceCurrentOffset - scrollProvinceOffset) / this.areaDataModel.textHeight + 1;
                    }
                    if (this.scrollerProvinceIndex > (this.provinceArray.length - 1)) {
                        this.scrollerProvinceIndex = this.provinceArray.length - 1;
                    }
                    this.scrollerProvince.scrollTo({
                        xOffset: 0,
                        yOffset: this.scrollerProvinceIndex * this.areaDataModel.textHeight,
                        animation: { duration: 1000, curve: Curve.Ease }
                    });
                    this.lastProvincePosition = provinceCurrentOffset;
                }
            });
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.areaDataModel.fontSize);
            Text.height(this.areaDataModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.areaDataModel.fontSize);
            Text.height(this.areaDataModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
            ForEach.create("3", this, ObservedObject.GetRawObject(this.provinceArray), (provinceItem: Province) => {
                ListItem.create();
                Text.create(provinceItem.provinceName);
                Text.fontSize(this.areaDataModel.fontSize);
                Text.height(this.areaDataModel.textHeight);
                Text.fontColor(this.areaDataModel.fontColor);
                Text.width('100%');
                Text.textAlign(TextAlign.Center);
                Text.pop();
                ListItem.pop();
            });
            ForEach.pop();
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.areaDataModel.fontSize);
            Text.height(this.areaDataModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.areaDataModel.fontSize);
            Text.height(this.areaDataModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
            //  省
            List.pop();
            Column.pop();
            // 城市列
            Column.create();
            // 城市列
            Column.width(this.areaDataModel.columnWidth);
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
                let scrollCityOffset = cityCurrentOffset % this.areaDataModel.textHeight;
                if (scrollCityOffset > 1) {
                    if (this.lastCityPosition > cityCurrentOffset) { // 小于0，向下滑动，大于0是，是向上滑动
                        this.scrollerCityIndex = (cityCurrentOffset - scrollCityOffset) / this.areaDataModel.textHeight;
                    }
                    else {
                        this.scrollerCityIndex = (cityCurrentOffset - scrollCityOffset) / this.areaDataModel.textHeight + 1;
                    }
                    if (this.scrollerCityIndex > (this.provinceArray[this.scrollerProvinceIndex].cityAndArea.length - 1)) {
                        this.scrollerCityIndex = this.provinceArray[this.scrollerProvinceIndex].cityAndArea.length - 1;
                    }
                    this.scrollerCity.scrollTo({
                        xOffset: 0,
                        yOffset: this.scrollerCityIndex * this.areaDataModel.textHeight,
                        animation: { duration: 1000, curve: Curve.Ease }
                    });
                    this.lastCityPosition = cityCurrentOffset;
                }
            });
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.areaDataModel.fontSize);
            Text.height(this.areaDataModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.areaDataModel.fontSize);
            Text.height(this.areaDataModel.textHeight);
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
                    Text.fontSize(this.areaDataModel.fontSize <= 15 ? this.areaDataModel.fontSize : 15);
                    Text.height(this.areaDataModel.textHeight);
                    Text.fontColor(this.areaDataModel.fontColor);
                    Text.width('100%');
                    Text.textAlign(TextAlign.Center);
                    Text.pop();
                    ListItem.pop();
                }
                else {
                    If.branchId(1);
                    ListItem.create();
                    Text.create(val.cityName);
                    Text.fontSize(this.areaDataModel.fontSize);
                    Text.height(this.areaDataModel.textHeight);
                    Text.fontColor(this.areaDataModel.fontColor);
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
            Text.fontSize(this.areaDataModel.fontSize);
            Text.height(this.areaDataModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.areaDataModel.fontSize);
            Text.height(this.areaDataModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
            List.pop();
            // 城市列
            Column.pop();
            // 区显示
            Column.create();
            // 区显示
            Column.width(this.areaDataModel.columnWidth);
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
                let scrollCityOffset = areaCurrentOffset % this.areaDataModel.textHeight;
                if (scrollCityOffset > 1) {
                    if (this.lastAreaPosition > areaCurrentOffset) { // 小于0，向下滑动，大于0是，是向上滑动
                        this.scrollerAreaIndex = (areaCurrentOffset - scrollCityOffset) / this.areaDataModel.textHeight;
                    }
                    else {
                        this.scrollerAreaIndex = (areaCurrentOffset - scrollCityOffset) / this.areaDataModel.textHeight + 1;
                    }
                    if (this.scrollerAreaIndex > (this.provinceArray[this.scrollerProvinceIndex].cityAndArea[this.scrollerCityIndex].area.length - 1)) {
                        this.scrollerAreaIndex = this.provinceArray[this.scrollerProvinceIndex].cityAndArea[this.scrollerCityIndex].area.length - 1;
                    }
                    this.scrollerArea.scrollTo({
                        xOffset: 0,
                        yOffset: this.scrollerAreaIndex * this.areaDataModel.textHeight,
                        animation: { duration: 1000, curve: Curve.Ease }
                    });
                    this.lastAreaPosition = areaCurrentOffset;
                }
            });
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.areaDataModel.fontSize);
            Text.height(this.areaDataModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.areaDataModel.fontSize);
            Text.height(this.areaDataModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
            ForEach.create("5", this, ObservedObject.GetRawObject(this.provinceArray[this.scrollerProvinceIndex].cityAndArea[this.scrollerCityIndex].area), (area: string) => {
                If.create();
                if (area.length > 5) { //长度超过5，设置更小字体
                    If.branchId(0);
                    ListItem.create();
                    Text.create(area);
                    Text.fontSize(this.areaDataModel.fontSize <= 15 ? this.areaDataModel.fontSize : 15);
                    Text.fontColor(this.areaDataModel.fontColor);
                    Text.height(this.areaDataModel.textHeight);
                    Text.width('100%');
                    Text.textAlign(TextAlign.Center);
                    Text.pop();
                    ListItem.pop();
                }
                else {
                    If.branchId(1);
                    ListItem.create();
                    Text.create(area);
                    Text.fontSize(this.areaDataModel.fontSize);
                    Text.fontColor(this.areaDataModel.fontColor);
                    Text.height(this.areaDataModel.textHeight);
                    Text.width('100%');
                    Text.textAlign(TextAlign.Center);
                    Text.pop();
                    ListItem.pop();
                }
                If.pop();
            }, (val: string) => val.toString());
            ForEach.pop();
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.areaDataModel.fontSize);
            Text.height(this.areaDataModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
            ListItem.create();
            Text.create(" ");
            Text.fontSize(this.areaDataModel.fontSize);
            Text.height(this.areaDataModel.textHeight);
            Text.width('100%');
            Text.textAlign(TextAlign.Center);
            Text.pop();
            ListItem.pop();
            // 城市
            List.pop();
            // 区显示
            Column.pop();
            Row.pop();
            Stack.pop();
        }
        If.pop();
        Column.pop();
    }
}
namespace AreaDataPickerViewLib {
    export class Model {
        text: string = '';
        dividerLineColor: Color = Color.Red;
        dividerLineStroke: number = 1;
        columnWidth: string = '33%';
        fontSize: number = 30;
        fontColor: Color = Color.Black;
        titleFontSize: number = 30;
        titleFontColor: Color = Color.Black;
        cancelButtonFont: string = "cancel";
        cancelButtonColor: Color = Color.Black;
        confirmButtonFont: string = "confirm";
        confirmButtonColor: Color = Color.Black;
        defaultSelection: string[] = [];
        color: string = '';
        onclick: Function = () => { };
        pickerSpace: number = 15;
        buttonBackgroundColor: string = "#7CDCDC";
        dividerType?: DividerType = DividerType.FILL;
        lineSpacingMultiplier: number = 0;
        popupWindowHeight: number = 250;
        textHeight: number = 50;
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
        setDefaultSelection(defaultSelection: string[]): Model {
            this.defaultSelection = defaultSelection;
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
export default AreaDataPickerViewLib;
