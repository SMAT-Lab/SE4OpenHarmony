interface Area_placeholder_Params {
    result?: string;
    provinces?: string[];
    cities?: string[];
    district?: string[];
    selectedProvince?: number;
    selectedCity?: number;
    selectedDistrict?: number;
    title?: string;
    dataInfo?;
}
interface Area_selectedPC_Params {
    result?: string;
    provinces?: string[];
    cities?: string[];
    selectedProvince?: number;
    selectedCity?: number;
    title?: string;
    dataInfo?;
}
interface Area_selectedPCD_Params {
    result?: string;
    provinces?: string[];
    cities?: string[];
    district?: string[];
    selectedProvince?: string;
    selectedCity?: string;
    selectedDistrict?: string;
    dataInfo?;
    selectedProvinceNumber?: number;
    selectedCityNumber?: number;
    selectedDistrictNumber?: number;
}
interface Area_basic_Params {
    result?: string;
    provinces?: string[];
    cities?: string[];
    district?: string[];
    selectedProvince?: number;
    selectedCity?: number;
    selectedDistrict?: number;
    dataInfo?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Area_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Institute of Software, Chinese Academy of Sciences.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { areaInfo } from "../data/Data";
//获取省份，城市，区域信息
class ObtainInfo {
    private provinces: string[] = [];
    private cities: string[] = [];
    private district: string[] = [];
    allProvince(): string[] {
        this.provinces = [];
        areaInfo.forEach(element => {
            this.provinces.push(element.label);
        });
        return this.provinces;
    }
    allCity(provinceName = "北京市"): string[] {
        this.cities = [];
        areaInfo.forEach(element => {
            if (element.label == provinceName) {
                let cityForProvince = element.children;
                cityForProvince.forEach(element => {
                    this.cities.push(element.label);
                });
            }
        });
        return this.cities;
    }
    allDistrict(provinceName = "北京市", cityName = "北京市"): string[] {
        this.district = [];
        areaInfo.forEach(element => {
            if (element.label == provinceName) {
                let cityForProvince = element.children;
                cityForProvince.forEach(element => {
                    if (element.label == cityName) {
                        let districtForCity = element.children;
                        districtForCity.forEach(element => {
                            this.district.push(element.label);
                        });
                    }
                });
            }
        });
        return this.district;
    }
    InitSelectPDC(provinces: string[], cities: string[], districts: string[], province, city, district): number[] {
        let P = 0;
        let C = 0;
        let D = 0;
        for (let i = 0; i < provinces.length; i++) {
            if (provinces[i] == province) {
                P = i;
                for (let j = 0; j < cities.length; j++) {
                    if (cities[j] == city) {
                        C = j;
                        for (let k = 0; k < districts.length; k++) {
                            if (districts[k] == district) {
                                D = k;
                                break;
                            }
                        }
                    }
                }
            }
        }
        return [P, C, D];
    }
}
export class Area_basic extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__result = new SynchedPropertySimpleTwoWay(params.result, this, "result");
        this.__provinces = new ObservedPropertyObject([], this, "provinces");
        this.__cities = new ObservedPropertyObject([], this, "cities");
        this.__district = new ObservedPropertyObject([], this, "district");
        this.__selectedProvince = new ObservedPropertySimple(0, this, "selectedProvince");
        this.__selectedCity = new ObservedPropertySimple(0, this, "selectedCity");
        this.__selectedDistrict = new ObservedPropertySimple(0, this, "selectedDistrict");
        this.dataInfo = new ObtainInfo();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Area_basic_Params) {
        if (params.provinces !== undefined) {
            this.provinces = params.provinces;
        }
        if (params.cities !== undefined) {
            this.cities = params.cities;
        }
        if (params.district !== undefined) {
            this.district = params.district;
        }
        if (params.selectedProvince !== undefined) {
            this.selectedProvince = params.selectedProvince;
        }
        if (params.selectedCity !== undefined) {
            this.selectedCity = params.selectedCity;
        }
        if (params.selectedDistrict !== undefined) {
            this.selectedDistrict = params.selectedDistrict;
        }
        if (params.dataInfo !== undefined) {
            this.dataInfo = params.dataInfo;
        }
    }
    aboutToBeDeleted() {
        this.__result.aboutToBeDeleted();
        this.__provinces.aboutToBeDeleted();
        this.__cities.aboutToBeDeleted();
        this.__district.aboutToBeDeleted();
        this.__selectedProvince.aboutToBeDeleted();
        this.__selectedCity.aboutToBeDeleted();
        this.__selectedDistrict.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __result: SynchedPropertySimpleTwoWay<string>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string) {
        this.__result.set(newValue);
    }
    private __provinces: ObservedPropertyObject<string[]>;
    get provinces() {
        return this.__provinces.get();
    }
    set provinces(newValue: string[]) {
        this.__provinces.set(newValue);
    }
    private __cities: ObservedPropertyObject<string[]>;
    get cities() {
        return this.__cities.get();
    }
    set cities(newValue: string[]) {
        this.__cities.set(newValue);
    }
    private __district: ObservedPropertyObject<string[]>;
    get district() {
        return this.__district.get();
    }
    set district(newValue: string[]) {
        this.__district.set(newValue);
    }
    private __selectedProvince: ObservedPropertySimple<number>;
    get selectedProvince() {
        return this.__selectedProvince.get();
    }
    set selectedProvince(newValue: number) {
        this.__selectedProvince.set(newValue);
    }
    private __selectedCity: ObservedPropertySimple<number>;
    get selectedCity() {
        return this.__selectedCity.get();
    }
    set selectedCity(newValue: number) {
        this.__selectedCity.set(newValue);
    }
    private __selectedDistrict: ObservedPropertySimple<number>;
    get selectedDistrict() {
        return this.__selectedDistrict.get();
    }
    set selectedDistrict(newValue: number) {
        this.__selectedDistrict.set(newValue);
    }
    private dataInfo;
    aboutToAppear() {
        this.provinces = this.dataInfo.allProvince();
        this.cities = this.dataInfo.allCity();
        this.district = this.dataInfo.allDistrict();
    }
    provinceChange(index: number) {
        this.selectedProvince = index;
        this.cities = this.dataInfo.allCity(this.provinces[index]);
        this.district = this.dataInfo.allDistrict(this.provinces[this.selectedProvince], this.cities[this.selectedCity]);
    }
    cityChange(index: number) {
        this.selectedCity = index;
        this.district = this.dataInfo.allDistrict(this.provinces[this.selectedProvince], this.cities[index]);
    }
    districtChange(index: number) {
        this.selectedDistrict = index;
    }
    render() {
        Column.create();
        Column.backgroundColor("#ffffffff");
        Row.create();
        Row.margin({ top: 10 });
        Row.width("100%");
        Button.createWithLabel("取消");
        Button.margin({ left: 10 });
        Button.fontColor("#ff2181e9");
        Button.fontSize(16);
        Button.type(ButtonType.Normal);
        Button.borderRadius(20);
        Button.backgroundColor("#ffffffff");
        Button.layoutWeight(2);
        Button.onClick(() => {
            console.log("取消选择");
        });
        Button.pop();
        Divider.create();
        Divider.vertical(true);
        Divider.height(20);
        Divider.layoutWeight(5);
        Button.createWithLabel("确认");
        Button.margin({ right: 10 });
        Button.fontColor("#ff2181e9");
        Button.fontSize(16);
        Button.type(ButtonType.Normal);
        Button.borderRadius(20);
        Button.backgroundColor("#ffffffff");
        Button.layoutWeight(2);
        Button.onClick(() => {
            console.log("选中的值：" + this.provinces[this.selectedProvince] + "-" + this.cities[this.selectedCity] + "-" + this.district[this.selectedDistrict]);
            this.result = this.provinces[this.selectedProvince] + " " + this.cities[this.selectedCity] + " " + this.district[this.selectedDistrict];
        });
        Button.pop();
        Row.pop();
        Row.create();
        Row.width("100%");
        Row.height(300);
        TextPicker.create({ range: this.provinces, selected: this.selectedProvince });
        TextPicker.onChange((value: string, index: number) => {
            this.provinceChange(index);
        });
        TextPicker.margin({ left: 10 });
        TextPicker.layoutWeight(1);
        TextPicker.pop();
        TextPicker.create({ range: this.cities, selected: this.selectedCity });
        TextPicker.onChange((value: string, index: number) => {
            this.cityChange(index);
        });
        TextPicker.layoutWeight(1);
        TextPicker.pop();
        TextPicker.create({ range: this.district, selected: this.selectedDistrict });
        TextPicker.onChange((value: string, index: number) => {
            this.districtChange(index);
        });
        TextPicker.layoutWeight(1);
        TextPicker.margin({ right: 10 });
        TextPicker.pop();
        Row.pop();
        Column.pop();
    }
}
export class Area_selectedPCD extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__result = new SynchedPropertySimpleTwoWay(params.result, this, "result");
        this.__provinces = new ObservedPropertyObject([], this, "provinces");
        this.__cities = new ObservedPropertyObject([], this, "cities");
        this.__district = new ObservedPropertyObject([], this, "district");
        this.__selectedProvince = new SynchedPropertySimpleTwoWay(params.selectedProvince, this, "selectedProvince");
        this.__selectedCity = new SynchedPropertySimpleTwoWay(params.selectedCity, this, "selectedCity");
        this.__selectedDistrict = new SynchedPropertySimpleTwoWay(params.selectedDistrict, this, "selectedDistrict");
        this.dataInfo = new ObtainInfo();
        this.__selectedProvinceNumber = new ObservedPropertySimple(0, this, "selectedProvinceNumber");
        this.__selectedCityNumber = new ObservedPropertySimple(0, this, "selectedCityNumber");
        this.__selectedDistrictNumber = new ObservedPropertySimple(0, this, "selectedDistrictNumber");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Area_selectedPCD_Params) {
        if (params.provinces !== undefined) {
            this.provinces = params.provinces;
        }
        if (params.cities !== undefined) {
            this.cities = params.cities;
        }
        if (params.district !== undefined) {
            this.district = params.district;
        }
        if (params.dataInfo !== undefined) {
            this.dataInfo = params.dataInfo;
        }
        if (params.selectedProvinceNumber !== undefined) {
            this.selectedProvinceNumber = params.selectedProvinceNumber;
        }
        if (params.selectedCityNumber !== undefined) {
            this.selectedCityNumber = params.selectedCityNumber;
        }
        if (params.selectedDistrictNumber !== undefined) {
            this.selectedDistrictNumber = params.selectedDistrictNumber;
        }
    }
    aboutToBeDeleted() {
        this.__result.aboutToBeDeleted();
        this.__provinces.aboutToBeDeleted();
        this.__cities.aboutToBeDeleted();
        this.__district.aboutToBeDeleted();
        this.__selectedProvince.aboutToBeDeleted();
        this.__selectedCity.aboutToBeDeleted();
        this.__selectedDistrict.aboutToBeDeleted();
        this.__selectedProvinceNumber.aboutToBeDeleted();
        this.__selectedCityNumber.aboutToBeDeleted();
        this.__selectedDistrictNumber.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __result: SynchedPropertySimpleTwoWay<string>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string) {
        this.__result.set(newValue);
    }
    private __provinces: ObservedPropertyObject<string[]>;
    get provinces() {
        return this.__provinces.get();
    }
    set provinces(newValue: string[]) {
        this.__provinces.set(newValue);
    }
    private __cities: ObservedPropertyObject<string[]>;
    get cities() {
        return this.__cities.get();
    }
    set cities(newValue: string[]) {
        this.__cities.set(newValue);
    }
    private __district: ObservedPropertyObject<string[]>;
    get district() {
        return this.__district.get();
    }
    set district(newValue: string[]) {
        this.__district.set(newValue);
    }
    private __selectedProvince: SynchedPropertySimpleTwoWay<string>;
    get selectedProvince() {
        return this.__selectedProvince.get();
    }
    set selectedProvince(newValue: string) {
        this.__selectedProvince.set(newValue);
    }
    private __selectedCity: SynchedPropertySimpleTwoWay<string>;
    get selectedCity() {
        return this.__selectedCity.get();
    }
    set selectedCity(newValue: string) {
        this.__selectedCity.set(newValue);
    }
    private __selectedDistrict: SynchedPropertySimpleTwoWay<string>;
    get selectedDistrict() {
        return this.__selectedDistrict.get();
    }
    set selectedDistrict(newValue: string) {
        this.__selectedDistrict.set(newValue);
    }
    private dataInfo;
    private __selectedProvinceNumber: ObservedPropertySimple<number>;
    get selectedProvinceNumber() {
        return this.__selectedProvinceNumber.get();
    }
    set selectedProvinceNumber(newValue: number) {
        this.__selectedProvinceNumber.set(newValue);
    }
    private __selectedCityNumber: ObservedPropertySimple<number>;
    get selectedCityNumber() {
        return this.__selectedCityNumber.get();
    }
    set selectedCityNumber(newValue: number) {
        this.__selectedCityNumber.set(newValue);
    }
    private __selectedDistrictNumber: ObservedPropertySimple<number>;
    get selectedDistrictNumber() {
        return this.__selectedDistrictNumber.get();
    }
    set selectedDistrictNumber(newValue: number) {
        this.__selectedDistrictNumber.set(newValue);
    }
    aboutToAppear() {
        this.provinces = this.dataInfo.allProvince();
        this.cities = this.dataInfo.allCity(this.selectedProvince);
        this.district = this.dataInfo.allDistrict(this.selectedProvince, this.selectedCity);
        this.initPDC(this.dataInfo.InitSelectPDC(this.provinces, this.cities, this.district, this.selectedProvince, this.selectedCity, this.selectedDistrict));
    }
    initPDC(PDC: number[]) {
        this.selectedProvinceNumber = PDC[0];
        this.selectedCityNumber = PDC[1];
        this.selectedDistrictNumber = PDC[2];
    }
    provinceChange(value: string, index: number) {
        this.selectedProvince = value;
        this.selectedProvinceNumber = index;
        this.selectedCityNumber = 0;
        this.selectedDistrictNumber = 0;
        this.cities = this.dataInfo.allCity(this.provinces[index]);
        this.district = this.dataInfo.allDistrict(this.provinces[this.selectedProvinceNumber], this.cities[this.selectedCityNumber]);
    }
    cityChange(value: string, index: number) {
        this.selectedCity = value;
        this.selectedCityNumber = index;
        this.district = this.dataInfo.allDistrict(this.provinces[this.selectedProvinceNumber], this.cities[index]);
    }
    districtChange(value: string, index: number) {
        this.selectedDistrict = value;
        this.selectedDistrictNumber = index;
    }
    render() {
        Column.create();
        Column.backgroundColor("#ffffffff");
        Row.create();
        Row.margin({ top: 10 });
        Row.width("100%");
        Button.createWithLabel("取消");
        Button.margin({ left: 10 });
        Button.fontColor("#ff2181e9");
        Button.fontSize(16);
        Button.type(ButtonType.Normal);
        Button.borderRadius(20);
        Button.backgroundColor("#ffffffff");
        Button.layoutWeight(2);
        Button.onClick(() => {
            console.log("取消选择");
        });
        Button.pop();
        Divider.create();
        Divider.vertical(true);
        Divider.height(20);
        Divider.layoutWeight(5);
        Button.createWithLabel("确认");
        Button.margin({ right: 10 });
        Button.fontColor("#ff2181e9");
        Button.fontSize(16);
        Button.type(ButtonType.Normal);
        Button.borderRadius(20);
        Button.backgroundColor("#ffffffff");
        Button.layoutWeight(2);
        Button.onClick(() => {
            console.log("选中的值：" + this.selectedProvince + "-" + this.selectedCity + "-" + this.selectedDistrict);
            this.result = this.selectedProvince + " " + this.selectedCity + " " + this.selectedDistrict;
        });
        Button.pop();
        Row.pop();
        Row.create();
        Row.width("100%");
        Row.height(300);
        TextPicker.create({ range: this.provinces, selected: this.selectedProvinceNumber });
        TextPicker.onChange((value: string, index: number) => {
            this.provinceChange(value, index);
        });
        TextPicker.margin({ left: 10 });
        TextPicker.layoutWeight(1);
        TextPicker.pop();
        TextPicker.create({ range: this.cities, selected: this.selectedCityNumber });
        TextPicker.onChange((value: string, index: number) => {
            this.cityChange(value, index);
        });
        TextPicker.layoutWeight(1);
        TextPicker.pop();
        TextPicker.create({ range: this.district, selected: this.selectedDistrictNumber });
        TextPicker.onChange((value: string, index: number) => {
            this.districtChange(value, index);
        });
        TextPicker.layoutWeight(1);
        TextPicker.margin({ right: 10 });
        TextPicker.pop();
        Row.pop();
        Column.pop();
    }
}
export class Area_selectedPC extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__result = new SynchedPropertySimpleTwoWay(params.result, this, "result");
        this.__provinces = new ObservedPropertyObject([], this, "provinces");
        this.__cities = new ObservedPropertyObject([], this, "cities");
        this.__selectedProvince = new ObservedPropertySimple(0, this, "selectedProvince");
        this.__selectedCity = new ObservedPropertySimple(0, this, "selectedCity");
        this.title = "标题";
        this.dataInfo = new ObtainInfo();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Area_selectedPC_Params) {
        if (params.provinces !== undefined) {
            this.provinces = params.provinces;
        }
        if (params.cities !== undefined) {
            this.cities = params.cities;
        }
        if (params.selectedProvince !== undefined) {
            this.selectedProvince = params.selectedProvince;
        }
        if (params.selectedCity !== undefined) {
            this.selectedCity = params.selectedCity;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.dataInfo !== undefined) {
            this.dataInfo = params.dataInfo;
        }
    }
    aboutToBeDeleted() {
        this.__result.aboutToBeDeleted();
        this.__provinces.aboutToBeDeleted();
        this.__cities.aboutToBeDeleted();
        this.__selectedProvince.aboutToBeDeleted();
        this.__selectedCity.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __result: SynchedPropertySimpleTwoWay<string>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string) {
        this.__result.set(newValue);
    }
    private __provinces: ObservedPropertyObject<string[]>;
    get provinces() {
        return this.__provinces.get();
    }
    set provinces(newValue: string[]) {
        this.__provinces.set(newValue);
    }
    private __cities: ObservedPropertyObject<string[]>;
    get cities() {
        return this.__cities.get();
    }
    set cities(newValue: string[]) {
        this.__cities.set(newValue);
    }
    private __selectedProvince: ObservedPropertySimple<number>;
    get selectedProvince() {
        return this.__selectedProvince.get();
    }
    set selectedProvince(newValue: number) {
        this.__selectedProvince.set(newValue);
    }
    private __selectedCity: ObservedPropertySimple<number>;
    get selectedCity() {
        return this.__selectedCity.get();
    }
    set selectedCity(newValue: number) {
        this.__selectedCity.set(newValue);
    }
    private title: string;
    private dataInfo;
    aboutToAppear() {
        this.provinces = this.dataInfo.allProvince();
        this.cities = this.dataInfo.allCity();
    }
    provinceChange(index: number) {
        this.selectedProvince = index;
        this.cities = this.dataInfo.allCity(this.provinces[index]);
    }
    cityChange(index: number) {
        this.selectedCity = index;
    }
    render() {
        Column.create();
        Column.backgroundColor("#ffffffff");
        Row.create();
        Row.margin({ top: 10 });
        Row.width("100%");
        Button.createWithLabel("取消");
        Button.margin({ left: 10 });
        Button.fontColor("#ff2181e9");
        Button.fontSize(16);
        Button.type(ButtonType.Normal);
        Button.borderRadius(20);
        Button.backgroundColor("#ffffffff");
        Button.layoutWeight(2);
        Button.onClick(() => {
            console.log("取消选择");
        });
        Button.pop();
        Column.create();
        Column.height(20);
        Column.layoutWeight(5);
        Text.create(this.title);
        Text.fontSize(16);
        Text.pop();
        Column.pop();
        Button.createWithLabel("确认");
        Button.margin({ right: 10 });
        Button.fontColor("#ff2181e9");
        Button.fontSize(16);
        Button.type(ButtonType.Normal);
        Button.borderRadius(20);
        Button.backgroundColor("#ffffffff");
        Button.layoutWeight(2);
        Button.onClick(() => {
            console.log("选中的值：" + this.provinces[this.selectedProvince] + "-" + this.cities[this.selectedCity]);
            this.result = this.provinces[this.selectedProvince] + " " + this.cities[this.selectedCity];
        });
        Button.pop();
        Row.pop();
        Row.create();
        Row.width("100%");
        Row.height(300);
        TextPicker.create({ range: this.provinces, selected: this.selectedProvince });
        TextPicker.onChange((value: string, index: number) => {
            this.provinceChange(index);
        });
        TextPicker.margin({ left: 10 });
        TextPicker.layoutWeight(1);
        TextPicker.pop();
        TextPicker.create({ range: this.cities, selected: this.selectedCity });
        TextPicker.onChange((value: string, index: number) => {
            this.cityChange(index);
        });
        TextPicker.layoutWeight(1);
        TextPicker.pop();
        Row.pop();
        Column.pop();
    }
}
export class Area_placeholder extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__result = new SynchedPropertySimpleTwoWay(params.result, this, "result");
        this.__provinces = new ObservedPropertyObject([], this, "provinces");
        this.__cities = new ObservedPropertyObject([], this, "cities");
        this.__district = new ObservedPropertyObject([], this, "district");
        this.__selectedProvince = new ObservedPropertySimple(0, this, "selectedProvince");
        this.__selectedCity = new ObservedPropertySimple(0, this, "selectedCity");
        this.__selectedDistrict = new ObservedPropertySimple(0, this, "selectedDistrict");
        this.title = "标题";
        this.dataInfo = new ObtainInfo();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Area_placeholder_Params) {
        if (params.provinces !== undefined) {
            this.provinces = params.provinces;
        }
        if (params.cities !== undefined) {
            this.cities = params.cities;
        }
        if (params.district !== undefined) {
            this.district = params.district;
        }
        if (params.selectedProvince !== undefined) {
            this.selectedProvince = params.selectedProvince;
        }
        if (params.selectedCity !== undefined) {
            this.selectedCity = params.selectedCity;
        }
        if (params.selectedDistrict !== undefined) {
            this.selectedDistrict = params.selectedDistrict;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.dataInfo !== undefined) {
            this.dataInfo = params.dataInfo;
        }
    }
    aboutToBeDeleted() {
        this.__result.aboutToBeDeleted();
        this.__provinces.aboutToBeDeleted();
        this.__cities.aboutToBeDeleted();
        this.__district.aboutToBeDeleted();
        this.__selectedProvince.aboutToBeDeleted();
        this.__selectedCity.aboutToBeDeleted();
        this.__selectedDistrict.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __result: SynchedPropertySimpleTwoWay<string>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string) {
        this.__result.set(newValue);
    }
    private __provinces: ObservedPropertyObject<string[]>;
    get provinces() {
        return this.__provinces.get();
    }
    set provinces(newValue: string[]) {
        this.__provinces.set(newValue);
    }
    private __cities: ObservedPropertyObject<string[]>;
    get cities() {
        return this.__cities.get();
    }
    set cities(newValue: string[]) {
        this.__cities.set(newValue);
    }
    private __district: ObservedPropertyObject<string[]>;
    get district() {
        return this.__district.get();
    }
    set district(newValue: string[]) {
        this.__district.set(newValue);
    }
    private __selectedProvince: ObservedPropertySimple<number>;
    get selectedProvince() {
        return this.__selectedProvince.get();
    }
    set selectedProvince(newValue: number) {
        this.__selectedProvince.set(newValue);
    }
    private __selectedCity: ObservedPropertySimple<number>;
    get selectedCity() {
        return this.__selectedCity.get();
    }
    set selectedCity(newValue: number) {
        this.__selectedCity.set(newValue);
    }
    private __selectedDistrict: ObservedPropertySimple<number>;
    get selectedDistrict() {
        return this.__selectedDistrict.get();
    }
    set selectedDistrict(newValue: number) {
        this.__selectedDistrict.set(newValue);
    }
    private title: string;
    private dataInfo;
    aboutToAppear() {
        this.provinces = this.dataInfo.allProvince();
        this.provinces.splice(0, 0, "请选择");
    }
    provinceChange(index: number) {
        this.selectedProvince = index;
        this.selectedCity = 0;
        this.selectedDistrict = 0;
        this.district = [""];
        if (this.selectedProvince != 0) {
            this.cities = this.dataInfo.allCity(this.provinces[index]);
            this.cities.splice(0, 0, "请选择");
        }
        else {
            this.selectedCity = 0;
            this.cities = [""];
        }
    }
    cityChange(index: number) {
        this.selectedCity = index;
        this.selectedDistrict = 0;
        if (this.selectedCity != 0) {
            this.district = this.dataInfo.allDistrict(this.provinces[this.selectedProvince], this.cities[index]);
            this.district.splice(0, 0, "请选择");
        }
        else {
            this.selectedDistrict = 0;
            this.district = [""];
        }
    }
    districtChange(index: number) {
        this.selectedDistrict = index;
    }
    render() {
        Column.create();
        Column.backgroundColor("#ffffffff");
        Row.create();
        Row.margin({ top: 10 });
        Row.width("100%");
        Button.createWithLabel("取消");
        Button.margin({ left: 10 });
        Button.fontColor("#ff2181e9");
        Button.fontSize(16);
        Button.type(ButtonType.Normal);
        Button.borderRadius(20);
        Button.backgroundColor("#ffffffff");
        Button.layoutWeight(2);
        Button.onClick(() => {
            console.log("取消选择");
        });
        Button.pop();
        Column.create();
        Column.height(20);
        Column.layoutWeight(5);
        Text.create(this.title);
        Text.fontSize(16);
        Text.pop();
        Column.pop();
        Button.createWithLabel("确认");
        Button.margin({ right: 10 });
        Button.fontColor("#ff2181e9");
        Button.fontSize(16);
        Button.type(ButtonType.Normal);
        Button.borderRadius(20);
        Button.backgroundColor("#ffffffff");
        Button.layoutWeight(2);
        Button.onClick(() => {
            console.log("选中的值：" + this.provinces[this.selectedProvince] + "-" + this.cities[this.selectedCity] + "-" + this.district[this.selectedDistrict]);
            this.result = this.provinces[this.selectedProvince] + " " + this.cities[this.selectedCity] + " " + this.district[this.selectedDistrict];
        });
        Button.pop();
        Row.pop();
        Row.create();
        Row.width("100%");
        Row.height(300);
        TextPicker.create({ range: this.provinces, selected: this.selectedProvince });
        TextPicker.onChange((value: string, index: number) => {
            this.provinceChange(index);
        });
        TextPicker.margin({ left: 10 });
        TextPicker.layoutWeight(1);
        TextPicker.pop();
        TextPicker.create({ range: this.cities, selected: this.selectedCity });
        TextPicker.onChange((value: string, index: number) => {
            this.cityChange(index);
        });
        TextPicker.layoutWeight(1);
        TextPicker.pop();
        TextPicker.create({ range: this.district, selected: this.selectedDistrict });
        TextPicker.onChange((value: string, index: number) => {
            this.districtChange(index);
        });
        TextPicker.layoutWeight(1);
        TextPicker.margin({ right: 10 });
        TextPicker.pop();
        Row.pop();
        Column.pop();
    }
}
