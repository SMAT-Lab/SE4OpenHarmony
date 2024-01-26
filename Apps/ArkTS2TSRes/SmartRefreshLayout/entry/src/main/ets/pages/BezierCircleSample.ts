interface ABottomBezierCircleSample_Params {
    model?: SmartRefreshSecond.Model;
    arr?: string[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BezierCircleSample_" + ++__generate__Id;
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
import { SmartRefreshSecond } from "@ohos/smartrefreshlayout";
import { BezierCircleBottom } from "@ohos/smartrefreshlayout";
import { BezierCircle } from "@ohos/smartrefreshlayout";
class ABottomBezierCircleSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new SmartRefreshSecond.Model(), this, "model");
        this.arr = ['内容不偏移 ', '内容跟随偏移', '橙色主题', '红色主题', '绿色主题', '蓝色主题', '蓝色主题', '蓝色主题', '蓝色主题'];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ABottomBezierCircleSample_Params) {
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
    private __model: ObservedPropertyObject<SmartRefreshSecond.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SmartRefreshSecond.Model) {
        this.__model.set(newValue);
    }
    private arr: string[];
    pickColor(SelectColorParam: string) {
        this.model.setBackgroundShadowColor(Color.Gray);
        let SelectColor = SelectColorParam.trim();
        if (SelectColor == this.arr[0].trim()) {
            this.model.setFixedContent(true);
            this.model.setBackgroundShadowColor(Color.White);
            this.model.setBackgroundColor(Color.Gray);
        }
        else if (SelectColor == this.arr[1].trim()) {
            this.model.setFixedContent(false);
            this.model.setBackgroundShadowColor(Color.White);
            this.model.setBackgroundColor(Color.Gray);
        }
        else if (SelectColor == this.arr[2].trim()) {
            this.model.setBackgroundShadowColor(Color.White);
            this.model.setBackgroundColor(Color.Orange);
        }
        else if (SelectColor == this.arr[3].trim()) {
            this.model.setBackgroundShadowColor(Color.White);
            this.model.setBackgroundColor(Color.Red);
        }
        else if (SelectColor == this.arr[4].trim()) {
            this.model.setBackgroundShadowColor(Color.White);
            this.model.setBackgroundColor(Color.Green);
        }
        else if (SelectColor == this.arr[5].trim()) {
            this.model.setBackgroundShadowColor(Color.White);
            this.model.setBackgroundColor(Color.Blue);
        }
        else {
            this.model.setBackgroundShadowColor(Color.White);
            this.model.setBackgroundColor(Color.Blue);
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
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), (item: string) => {
            this.card(item, this);
        }, (item: string) => item);
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
        If.create();
        if (this.model.fixedContent) {
            If.branchId(0);
        }
        If.pop();
        If.create();
        if (!this.model.fixedContent) {
            If.branchId(0);
        }
        If.pop();
        Column.pop();
    }
}
loadDocument(new ABottomBezierCircleSample("1", undefined, {}));
