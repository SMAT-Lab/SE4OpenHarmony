interface ClassicsSample_Params {
    model?: SmartRefresh.Model;
    arr?: string[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ClassicsSample_" + ++__generate__Id;
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
import { Classics } from "@ohos/smartrefreshlayout";
import { ClassicsBottom } from "@ohos/smartrefreshlayout";
class ClassicsSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new SmartRefresh.Model(), this, "model");
        this.arr = ['显示时间', '隐藏时间', '默认主题', '橙色主题', '红色主题', '绿色主题', '蓝色主题'];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ClassicsSample_Params) {
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
    private arr: string[];
    aboutToAppear() {
        this.model.setBackgroundColor(Color.White);
    }
    pickColor(SelectColorParam: string) {
        let SelectColor = SelectColorParam.trim();
        if (SelectColor == this.arr[0].trim()) {
            this.model.setTimeShowState(true);
        }
        if (SelectColor == this.arr[1].trim()) {
            this.model.setTimeShowState(false);
        }
        if (SelectColor == this.arr[2].trim()) {
            this.model.setBackgroundShadowColor(Color.Gray);
            this.model.setBackgroundColor(Color.Black);
        }
        if (SelectColor == this.arr[3].trim()) {
            this.model.setBackgroundShadowColor(Color.Orange);
            this.model.setBackgroundColor(Color.White);
        }
        if (SelectColor == this.arr[4].trim()) {
            this.model.setBackgroundShadowColor(Color.Red);
            this.model.setBackgroundColor(Color.White);
        }
        if (SelectColor == this.arr[5].trim()) {
            this.model.setBackgroundShadowColor(Color.Green);
            this.model.setBackgroundColor(Color.White);
        }
        if (SelectColor == this.arr[6].trim()) {
            this.model.setBackgroundShadowColor(Color.Blue);
            this.model.setBackgroundColor(Color.White);
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
        List.create({ space: 20, initialIndex: 0 });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), (item: string) => {
            ListItem.create();
            this.card(item, this);
            ListItem.pop();
        }, (item: string) => item);
        ForEach.pop();
        List.pop();
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
loadDocument(new ClassicsSample("1", undefined, {}));