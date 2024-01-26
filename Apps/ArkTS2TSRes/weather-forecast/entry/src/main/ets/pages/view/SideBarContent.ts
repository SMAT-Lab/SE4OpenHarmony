interface SideBarContent_Params {
    lineHeight?: number;
    lineWidth?: number;
    pointArr?: number[];
    selectDay?: string;
    isShowSideBar?: boolean;
    selectCity?: CityModel;
    weatherUiModel?: WeatherUiModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SideBarContent_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import { CityModel } from '../../model/CityModel';
import { WeatherUiModel } from '../../model/WeatherUiModel';
export default class SideBarContent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.lineHeight = 40;
        this.lineWidth = 280;
        this.pointArr = [20, 20, 20, 20, 20];
        this.__selectDay = new ObservedPropertySimple('今天', this, "selectDay");
        this.__isShowSideBar = new SynchedPropertySimpleTwoWay(params.isShowSideBar, this, "isShowSideBar");
        this.__selectCity = new SynchedPropertyObjectTwoWay(params.selectCity, this, "selectCity");
        this.__weatherUiModel = new SynchedPropertyObjectTwoWay(params.weatherUiModel, this, "weatherUiModel");
        this.updateWithValueParams(params);
        this.declareWatch("weatherUiModel", this.calculatePoint);
    }
    updateWithValueParams(params: SideBarContent_Params) {
        if (params.lineHeight !== undefined) {
            this.lineHeight = params.lineHeight;
        }
        if (params.lineWidth !== undefined) {
            this.lineWidth = params.lineWidth;
        }
        if (params.pointArr !== undefined) {
            this.pointArr = params.pointArr;
        }
        if (params.selectDay !== undefined) {
            this.selectDay = params.selectDay;
        }
    }
    aboutToBeDeleted() {
        this.__selectDay.aboutToBeDeleted();
        this.__isShowSideBar.aboutToBeDeleted();
        this.__selectCity.aboutToBeDeleted();
        this.__weatherUiModel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private lineHeight: number;
    private lineWidth: number;
    private pointArr: number[];
    private __selectDay: ObservedPropertySimple<string>;
    get selectDay() {
        return this.__selectDay.get();
    }
    set selectDay(newValue: string) {
        this.__selectDay.set(newValue);
    }
    private __isShowSideBar: SynchedPropertySimpleTwoWay<boolean>;
    get isShowSideBar() {
        return this.__isShowSideBar.get();
    }
    set isShowSideBar(newValue: boolean) {
        this.__isShowSideBar.set(newValue);
    }
    private __selectCity: SynchedPropertySimpleOneWay<CityModel>;
    get selectCity() {
        return this.__selectCity.get();
    }
    set selectCity(newValue: CityModel) {
        this.__selectCity.set(newValue);
    }
    private __weatherUiModel: SynchedPropertySimpleOneWay<WeatherUiModel>;
    get weatherUiModel() {
        return this.__weatherUiModel.get();
    }
    set weatherUiModel(newValue: WeatherUiModel) {
        this.__weatherUiModel.set(newValue);
    }
    render() {
        Column.create();
        Column.padding({ left: 38, right: 24, top: 20 });
        Column.height('100%');
        Column.width('100%');
        Column.backgroundColor(Color.White);
        // 头部
        Row.create();
        // 头部
        Row.width('100%');
        Image.create($r('app.media.icon_city'));
        Image.width(28);
        Image.height(28);
        Image.onClick(() => {
            this.isShowSideBar = !this.isShowSideBar;
        });
        Blank.create();
        Blank.pop();
        Image.create($r('app.media.icon_more'));
        Image.width(28);
        Image.height(28);
        // 头部
        Row.pop();
        // 天气和城市
        Row.create();
        // 天气和城市
        Row.margin({ top: 130 });
        // 天气和城市
        Row.width('100%');
        Text.create(this.weatherUiModel.nowTemp.toString());
        Text.fontSize(120);
        Text.fontColor('#E6000000');
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Column.create();
        Text.create('°');
        Text.fontSize(48);
        Text.fontColor('#E6000000');
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create(this.weatherUiModel.nowWeatherText);
        Text.fontSize(38);
        Text.pop();
        Column.pop();
        Blank.create();
        Blank.pop();
        Text.create(this.selectCity.locationName);
        Text.fontSize(38);
        Text.margin({ top: 50 });
        Text.pop();
        // 天气和城市
        Row.pop();
        // 日期、最高温度、最低温度
        Text.create(this.weatherUiModel.date + '  ' + this.weatherUiModel.day + '  ' +
            this.weatherUiModel.tempMin + '℃' + '/' + this.weatherUiModel.tempMax + '℃');
        // 日期、最高温度、最低温度
        Text.fontSize(16);
        // 日期、最高温度、最低温度
        Text.margin({ left: 4 });
        // 日期、最高温度、最低温度
        Text.textAlign(TextAlign.Start);
        // 日期、最高温度、最低温度
        Text.width('100%');
        // 日期、最高温度、最低温度
        Text.pop();
        //未来两小时天气和风向
        Row.create();
        //未来两小时天气和风向
        Row.margin({ top: 24 });
        //未来两小时天气和风向
        Row.width('100%');
        Column.create();
        Column.backgroundColor('#05000000');
        Column.padding({ top: 12, bottom: 15 });
        Column.border({ radius: 14 });
        Column.size({ width: 140, height: 100 });
        Text.create('未来两小时');
        Text.fontSize(14);
        Text.pop();
        Blank.create();
        Blank.pop();
        If.create();
        if (this.weatherUiModel.precip > 0) {
            If.branchId(0);
            Text.create('有雨');
            Text.fontSize(32);
            Text.fontColor('#FFF7B500');
            Text.pop();
        }
        else if (this.weatherUiModel.precip >= 0) {
            If.branchId(1);
            Text.create('无雨');
            Text.fontSize(32);
            Text.fontColor('#FF6DD400');
            Text.pop();
        }
        else {
            If.branchId(2);
            Text.create('无雨');
            Text.fontSize(32);
            Text.fontColor('#FF6DD400');
            Text.pop();
        }
        If.pop();
        Column.pop();
        Column.create();
        Column.backgroundColor('#05000000');
        Column.padding({ top: 12, bottom: 15 });
        Column.margin({ left: 14 });
        Column.border({ radius: 14 });
        Column.size({ width: 140, height: 100 });
        Text.create('风向');
        Text.fontSize(14);
        Text.pop();
        Blank.create();
        Blank.pop();
        Text.create(this.weatherUiModel.category);
        Text.fontSize(32);
        Text.fontColor('#FF6DD400');
        Text.pop();
        Column.pop();
        //未来两小时天气和风向
        Row.pop();
        // 实时温度信息
        Column.create();
        // 实时温度信息
        Column.margin({ top: 39 });
        // 实时温度信息
        Column.width('100%');
        //时间
        Row.create();
        //时间
        Row.margin({ bottom: 10 });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.weatherUiModel.hoursArr), (item) => {
            Text.create(item);
            Text.textAlign(TextAlign.Center);
            Text.layoutWeight(1);
            Text.pop();
        });
        ForEach.pop();
        //时间
        Row.pop();
        If.create();
        // 温度折线
        if (this.weatherUiModel.hourlyTemp.length > 0) {
            If.branchId(0);
            Polyline.create({ width: this.lineWidth, height: this.lineHeight });
            Polyline.points([[0, this.pointArr[0]],
                [(this.lineWidth * 0.25).toString(), this.pointArr[1]], [(this.lineWidth * 0.5).toString(), this.pointArr[2]],
                [(this.lineWidth * 0.75).toString(), this.pointArr[3]], [(this.lineWidth * 1).toString(), this.pointArr[4]]]);
            Polyline.fillOpacity(0);
            Polyline.stroke('#AAB8CA');
            Polyline.strokeWidth(1);
            Row.create();
            Row.margin({ top: 35 });
            ForEach.create("3", this, ObservedObject.GetRawObject(this.weatherUiModel.hourlyTemp), (item) => {
                Text.create(item.temp + '℃');
                Text.textAlign(TextAlign.Center);
                Text.layoutWeight(1);
                Text.pop();
            });
            ForEach.pop();
            Row.pop();
        }
        If.pop();
        // 实时温度信息
        Column.pop();
        // 近一周天气
        Column.create();
        // 近一周天气
        Column.margin({ top: 30 });
        // 近一周天气
        Column.width('100%');
        // 天气icon
        Row.create();
        ForEach.create("4", this, ObservedObject.GetRawObject(this.weatherUiModel.iconDays), (item) => {
            Column.create();
            Column.align(Alignment.Center);
            Column.layoutWeight(1);
            Image.create($rawfile(item.iconDay));
            Image.size({ width: 24, height: 24 });
            Column.pop();
        });
        ForEach.pop();
        // 天气icon
        Row.pop();
        // 日期
        Row.create();
        // 日期
        Row.margin({ top: 18 });
        ForEach.create("5", this, ObservedObject.GetRawObject(this.weatherUiModel.dayArr), (item) => {
            Column.create();
            Column.layoutWeight(1);
            Column.align(Alignment.Center);
            If.create();
            if (item == this.selectDay) {
                If.branchId(0);
                Text.create(item);
                Text.fontColor(Color.White);
                Text.textAlign(TextAlign.Center);
                Text.height(40);
                Text.width(40);
                Text.border({ radius: 40 });
                Text.fontSize(14);
                Text.backgroundColor(Color.Black);
                Text.pop();
            }
            else {
                If.branchId(1);
                Text.create(item);
                Text.textAlign(TextAlign.Center);
                Text.height(40);
                Text.width(40);
                Text.fontSize(14);
                Text.pop();
            }
            If.pop();
            Column.pop();
        });
        ForEach.pop();
        // 日期
        Row.pop();
        // 近一周天气
        Column.pop();
        Column.pop();
    }
    //点位置计算
    calculatePoint() {
        if (this.weatherUiModel.hourlyTemp.length > 0) {
            for (var i = 0; i < 5; i++) {
                let tempArg = parseInt(this.weatherUiModel.hourlyTemp[0].temp);
                if (i == 0) {
                    this.pointArr[i] = this.lineHeight - tempArg;
                }
                else {
                    this.pointArr[i] = this.lineHeight -
                        (((parseInt(this.weatherUiModel.hourlyTemp[i].temp) - tempArg) * 3) +
                            parseInt(this.weatherUiModel.hourlyTemp[i].temp));
                }
            }
        }
    }
}
