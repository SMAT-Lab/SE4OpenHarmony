interface WaterSwipeSample_Params {
    model?: SmartRefresh.Model;
    needScroller?: boolean;
    arr?: string[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "WaveSwipeSample_" + ++__generate__Id;
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
import { WaveSwipe } from "@ohos/smartrefreshlayout";
import { SmartRefresh } from "@ohos/smartrefreshlayout";
class WaterSwipeSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new SmartRefresh.Model(), this, "model");
        this.__needScroller = new ObservedPropertySimple(false, this, "needScroller");
        this.arr = ['默认主题', '橙色主题', '红色主题', '绿色主题', '蓝色主题', '默认主题', '橙色主题', '红色主题', '绿色主题', '蓝色主题'];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: WaterSwipeSample_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.needScroller !== undefined) {
            this.needScroller = params.needScroller;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__needScroller.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<SmartRefresh.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SmartRefresh.Model) {
        this.__model.set(newValue);
    }
    private __needScroller: ObservedPropertySimple<boolean>;
    get needScroller() {
        return this.__needScroller.get();
    }
    set needScroller(newValue: boolean) {
        this.__needScroller.set(newValue);
    }
    private arr: string[];
    testHeader(parent = null) {
    }
    pickColor(SelectColorParam: string) {
        let SelectColor = SelectColorParam.trim();
        if (SelectColor == this.arr[0].trim()) {
            this.model.setBackgroundColor(Color.Black);
        }
        if (SelectColor == this.arr[1].trim()) {
            this.model.setBackgroundColor(Color.Orange);
        }
        if (SelectColor == this.arr[2].trim()) {
            this.model.setBackgroundColor(Color.Red);
        }
        if (SelectColor == this.arr[3].trim()) {
            this.model.setBackgroundColor(Color.Green);
        }
        if (SelectColor == this.arr[4].trim()) {
            this.model.setBackgroundColor(Color.Blue);
        }
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
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), (item: string) => {
            this.card(item, this);
        }, (item: string) => item);
        ForEach.pop();
        Column.pop();
    }
    render() {
        Column.create();
        Column.backgroundColor("#dddddd");
        Column.pop();
    }
}
loadDocument(new WaterSwipeSample("1", undefined, {}));
