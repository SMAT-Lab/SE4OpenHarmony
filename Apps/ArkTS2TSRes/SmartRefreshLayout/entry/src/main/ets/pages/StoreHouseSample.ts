interface StoreHouseSample_Params {
    modelStore?: SmartRefreshForStoreHouseSample.Model;
    arr?: string[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "StoreHouseSample_" + ++__generate__Id;
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
import { SmartRefreshForStoreHouseSample } from "@ohos/smartrefreshlayout";
import { StoreHouse } from "@ohos/smartrefreshlayout";
class StoreHouseSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__modelStore = new ObservedPropertyObject(new SmartRefreshForStoreHouseSample.Model(), this, "modelStore");
        this.arr = ['显示中文', '显示英文', '显示图标', '显示商标', '显示数字', '蓝色主题', '绿色主题', '橙色主题', '橙色主题', '橙色主题', '橙色主题'];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: StoreHouseSample_Params) {
        if (params.modelStore !== undefined) {
            this.modelStore = params.modelStore;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
    }
    aboutToBeDeleted() {
        this.__modelStore.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __modelStore: ObservedPropertyObject<SmartRefreshForStoreHouseSample.Model>;
    get modelStore() {
        return this.__modelStore.get();
    }
    set modelStore(newValue: SmartRefreshForStoreHouseSample.Model) {
        this.__modelStore.set(newValue);
    }
    private arr: string[];
    testHeader(parent = null) {
    }
    testMain(parent = null) {
        Column.create();
        Column.width("100%");
        Column.padding("20lpx");
        Column.backgroundColor(Color.White);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), (item: string) => {
            Column.create();
            Column.width("100%");
            Column.alignItems(HorizontalAlign.Start);
            Column.height("150lpx");
            Column.onClick(() => {
                if (this.modelStore.refreshState == SmartRefreshForStoreHouseSample.REFRESHSTATE.REFRESHING) { //松开过后的刷新样式
                }
                else if (this.modelStore.refreshState == SmartRefreshForStoreHouseSample.REFRESHSTATE.TOREFRESH) { //拖住过程中的样式
                }
                else {
                    if (item == "蓝色主题") {
                        this.modelStore.setColor("#0000FF");
                    }
                    else if (item == "绿色主题") {
                        this.modelStore.setColor("#00785D");
                    }
                    else if (item == "橙色主题") {
                        this.modelStore.setColor("#FF8000");
                    }
                    else {
                        this.modelStore.setDemand(item);
                    }
                }
            });
            Text.create(item);
            Text.fontSize("60lpx");
            Text.pop();
            Column.pop();
            Divider.create();
            Divider.strokeWidth(2);
            Divider.color(Color.Grey);
        }, (item: string) => item);
        ForEach.pop();
        Column.pop();
    }
    render() {
        Column.create();
        Column.backgroundColor("#ffffff");
        Column.pop();
    }
}
loadDocument(new StoreHouseSample("1", undefined, {}));
