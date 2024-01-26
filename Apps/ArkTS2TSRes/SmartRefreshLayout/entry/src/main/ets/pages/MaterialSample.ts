interface MaterialRefreshSample_Params {
    model?: SmartRefresh.Model;
    arr?: Array<ThemeParam>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MaterialSample_" + ++__generate__Id;
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
import { SmartRefresh } from "@ohos/smartrefreshlayout";
import { Material } from "@ohos/smartrefreshlayout";
import { MaterialBottom } from "@ohos/smartrefreshlayout";
class ThemeParam {
    index: number = 0;
    name: string = "";
}
class MaterialRefreshSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new SmartRefresh.Model(), this, "model");
        this.arr = [{ index: 0, name: '红色主题' }, { index: 1, name: '绿色主题' }, { index: 2, name: '蓝色主题' }, { index: 3, name: '橙色主题' }, { index: 4, name: '橙色主题' },
            { index: 5, name: '橙色主题' }, { index: 6, name: '橙色主题' }, { index: 7, name: '橙色主题' }, { index: 8, name: '橙色主题' }, { index: 9, name: '橙色主题' }, { index: 10, name: '橙色主题' }];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MaterialRefreshSample_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<SmartRefresh.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SmartRefresh.Model) {
        this.__model.set(newValue);
    }
    private arr: Array<ThemeParam>;
    pickColor(SelectColorParam: string) {
        let SelectColor = SelectColorParam.trim();
        if (SelectColor == this.arr[0].name.trim()) {
            this.model.setAccentColor(Color.Red);
        }
        else if (SelectColor == this.arr[1].name.trim()) {
            this.model.setAccentColor(Color.Green);
        }
        else if (SelectColor == this.arr[2].name.trim()) {
            this.model.setAccentColor(Color.Blue);
        }
        else {
            this.model.setAccentColor(Color.Orange);
        }
    }
    testHeader(parent = null) {
    }
    card(item: string, parent = null) {
        Row.create();
        Row.width("100%");
        Row.height("280lpx");
        Row.margin("10lpx");
        Row.backgroundColor(Color.White);
        Row.padding("20lpx");
        Row.alignItems(VerticalAlign.Top);
        Row.border({ width: "2lpx", color: "#aaaaaa", style: BorderStyle.Solid });
        Button.createWithLabel(item);
        Button.onClick(() => { this.pickColor(item); });
        Button.fontSize(40);
        Button.width("100%");
        Button.height("100%");
        Button.backgroundColor("#CCCCCC");
        Button.pop();
        Row.pop();
    }
    testMain(parent = null) {
        Column.create();
        Column.width("100%");
        Column.padding("20lpx");
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), (item: ThemeParam) => {
            this.card(item.name, this);
        }, (item: ThemeParam) => item.index.toString());
        ForEach.pop();
        Column.pop();
    }
    testFooter(parent = null) {
        Column.create();
        Column.width("100%");
        Column.padding("20lpx");
        Column.pop();
    }
    render() {
        Column.create();
        Column.backgroundColor("#dddddd");
        Column.pop();
    }
}
loadDocument(new MaterialRefreshSample("1", undefined, {}));
