interface Index_Params {
    isShowSideBar?: boolean;
    selectCity?: CityModel;
    weatherUiModel?: WeatherUiModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import SideBar from './view/SideBar';
import SideBarContent from './view/SideBarContent';
import SideBarContentBac from './view/SideBarContentBac';
import { CityModel } from '../model/CityModel';
import { WeatherUiModel } from '../model/WeatherUiModel';
import utils from '../utils/utils';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isShowSideBar = new ObservedPropertySimple(false, this, "isShowSideBar");
        this.__selectCity = new ObservedPropertyObject({ locationId: 101280601, locationName: '深圳' }, this, "selectCity");
        this.__weatherUiModel = new ObservedPropertyObject({
            nowTemp: 0,
            nowWeatherText: 0,
            tempMax: 0,
            tempMin: 0,
            category: 0,
            precip: 0,
            hourlyTemp: [],
            iconDays: [],
            date: '-月-日',
            day: '',
            dayArr: utils.getDayArr(),
            hoursArr: utils.getHoursArr(),
        }, this, "weatherUiModel");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.isShowSideBar !== undefined) {
            this.isShowSideBar = params.isShowSideBar;
        }
        if (params.selectCity !== undefined) {
            this.selectCity = params.selectCity;
        }
        if (params.weatherUiModel !== undefined) {
            this.weatherUiModel = params.weatherUiModel;
        }
    }
    aboutToBeDeleted() {
        this.__isShowSideBar.aboutToBeDeleted();
        this.__selectCity.aboutToBeDeleted();
        this.__weatherUiModel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __isShowSideBar: ObservedPropertySimple<boolean>;
    get isShowSideBar() {
        return this.__isShowSideBar.get();
    }
    set isShowSideBar(newValue: boolean) {
        this.__isShowSideBar.set(newValue);
    }
    private __selectCity: ObservedPropertyObject<CityModel>;
    get selectCity() {
        return this.__selectCity.get();
    }
    set selectCity(newValue: CityModel) {
        this.__selectCity.set(newValue);
    }
    private __weatherUiModel: ObservedPropertyObject<WeatherUiModel>;
    get weatherUiModel() {
        return this.__weatherUiModel.get();
    }
    set weatherUiModel(newValue: WeatherUiModel) {
        this.__weatherUiModel.set(newValue);
    }
    // 绘制界面
    render() {
        SideBarContainer.create(SideBarContainerType.Embed);
        SideBarContainer.showControlButton(false);
        SideBarContainer.showSideBar(this.isShowSideBar);
        SideBarContainer.autoHide(false);
        SideBarContainer.sideBarWidth(160);
        SideBarContainer.width('100%');
        let earlierCreatedChild_2: SideBar = (this && this.findChildById) ? this.findChildById("2") as SideBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 侧边栏
            View.create(new SideBar("2", this, { selectCity: this.__selectCity, isShowSideBar: this.__isShowSideBar }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        If.create();
        if (this.isShowSideBar) {
            If.branchId(0);
            let earlierCreatedChild_3: SideBarContentBac = (this && this.findChildById) ? this.findChildById("3") as SideBarContentBac : undefined;
            if (earlierCreatedChild_3 == undefined) {
                //灰底
                View.create(new SideBarContentBac("3", this, { isShowSideBar: this.__isShowSideBar }));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({});
                View.create(earlierCreatedChild_3);
            }
        }
        else {
            If.branchId(1);
            let earlierCreatedChild_4: SideBarContent = (this && this.findChildById) ? this.findChildById("4") as SideBarContent : undefined;
            if (earlierCreatedChild_4 == undefined) {
                // 内容
                View.create(new SideBarContent("4", this, { isShowSideBar: this.__isShowSideBar, selectCity: this.__selectCity, weatherUiModel: this.__weatherUiModel }));
            }
            else {
                earlierCreatedChild_4.updateWithValueParams({});
                View.create(earlierCreatedChild_4);
            }
        }
        If.pop();
        SideBarContainer.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
