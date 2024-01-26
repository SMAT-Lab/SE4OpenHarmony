interface SideBar_Params {
    selectCity?: CityModel;
    isShowSideBar?: boolean;
    cityArr?: CityModel[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SideBar_" + ++__generate__Id;
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
export default class SideBar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__selectCity = new SynchedPropertyObjectTwoWay(params.selectCity, this, "selectCity");
        this.__isShowSideBar = new SynchedPropertySimpleTwoWay(params.isShowSideBar, this, "isShowSideBar");
        this.__cityArr = new ObservedPropertyObject([
            { locationId: 101010100, locationName: '北京' }, { locationId: 101280601, locationName: '深圳' },
            { locationId: 101020100, locationName: '上海' }, { locationId: 101250101, locationName: '长沙' },
            { locationId: 101310101, locationName: '海口' }, { locationId: 101070201, locationName: '大连' }
        ], this, "cityArr");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SideBar_Params) {
        if (params.cityArr !== undefined) {
            this.cityArr = params.cityArr;
        }
    }
    aboutToBeDeleted() {
        this.__selectCity.aboutToBeDeleted();
        this.__isShowSideBar.aboutToBeDeleted();
        this.__cityArr.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __selectCity: SynchedPropertySimpleOneWay<CityModel>; //选中城市
    get selectCity() {
        return this.__selectCity.get();
    }
    set selectCity(newValue: CityModel) {
        this.__selectCity.set(newValue);
    }
    private __isShowSideBar: SynchedPropertySimpleTwoWay<boolean>; //是否展示侧边栏
    get isShowSideBar() {
        return this.__isShowSideBar.get();
    }
    set isShowSideBar(newValue: boolean) {
        this.__isShowSideBar.set(newValue);
    }
    private __cityArr: ObservedPropertyObject<CityModel[]>;
    get cityArr() {
        return this.__cityArr.get();
    }
    set cityArr(newValue: CityModel[]) {
        this.__cityArr.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.align(Alignment.TopStart);
        Text.create('城市选择');
        Text.fontSize(28);
        Text.width('100%');
        Text.fontColor('#E6000000');
        Text.padding({ top: 15, left: 22 });
        Text.pop();
        List.create({ space: 8, initialIndex: 0 });
        List.width('100%');
        List.height('80%');
        List.margin({ top: 26 });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.cityArr), (item) => {
            ListItem.create();
            ListItem.onClick(() => {
                this.selectCity = item;
                this.isShowSideBar = !this.isShowSideBar;
            });
            If.create();
            if (this.selectCity.locationName == item.locationName) {
                If.branchId(0);
                Text.create(item.locationName);
                Text.width('100%');
                Text.fontSize(20);
                Text.fontColor('#E64F7EFD');
                Text.backgroundColor('#1A4F7EFD');
                Text.padding({ top: 10, bottom: 10, left: 22 });
                Text.pop();
            }
            else {
                If.branchId(1);
                Text.create(item.locationName);
                Text.width('100%');
                Text.fontSize(20);
                Text.borderRadius(10);
                Text.fontColor('#E6000000');
                Text.padding({ top: 10, bottom: 10, left: 22 });
                Text.pop();
            }
            If.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Column.pop();
    }
}
