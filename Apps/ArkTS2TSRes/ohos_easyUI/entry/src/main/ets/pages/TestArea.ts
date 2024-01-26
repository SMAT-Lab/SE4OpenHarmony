interface TestArea_Params {
    result?: string;
    scroller?: Scroller;
    selectedProvince?: string;
    selectedCity?: string;
    selectedDistrict?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestArea_" + ++__generate__Id;
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
import promptAction from '@ohos.promptAction';
import { Area_basic, Area_selectedPCD, Area_selectedPC, Area_placeholder } from "easyui";
class TestArea extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__result = new ObservedPropertySimple("", this, "result");
        this.scroller = new Scroller();
        this.__selectedProvince = new ObservedPropertySimple("河北省", this, "selectedProvince");
        this.__selectedCity = new ObservedPropertySimple("唐山市", this, "selectedCity");
        this.__selectedDistrict = new ObservedPropertySimple("路北区", this, "selectedDistrict");
        this.updateWithValueParams(params);
        this.declareWatch("result", this.showResult);
    }
    updateWithValueParams(params: TestArea_Params) {
        if (params.result !== undefined) {
            this.result = params.result;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
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
    }
    aboutToBeDeleted() {
        this.__result.aboutToBeDeleted();
        this.__selectedProvince.aboutToBeDeleted();
        this.__selectedCity.aboutToBeDeleted();
        this.__selectedDistrict.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __result: ObservedPropertySimple<string>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string) {
        this.__result.set(newValue);
    }
    private scroller: Scroller;
    private __selectedProvince: ObservedPropertySimple<string>;
    get selectedProvince() {
        return this.__selectedProvince.get();
    }
    set selectedProvince(newValue: string) {
        this.__selectedProvince.set(newValue);
    }
    private __selectedCity: ObservedPropertySimple<string>;
    get selectedCity() {
        return this.__selectedCity.get();
    }
    set selectedCity(newValue: string) {
        this.__selectedCity.set(newValue);
    }
    private __selectedDistrict: ObservedPropertySimple<string>;
    get selectedDistrict() {
        return this.__selectedDistrict.get();
    }
    set selectedDistrict(newValue: string) {
        this.__selectedDistrict.set(newValue);
    }
    showResult() {
        promptAction.showToast({
            message: "选中值：" + this.result,
            duration: 2000,
            bottom: 300
        });
    }
    render() {
        Scroll.create(this.scroller);
        Column.create();
        Column.margin({ bottom: 10 });
        Text.create("基础用法");
        Text.margin({ top: 10 });
        Text.pop();
        Text.create("选中省市区");
        Text.margin({ top: 10 });
        Text.pop();
        Text.create("配置显示列");
        Text.margin({ top: 10 });
        Text.pop();
        Text.create("显示占位文字");
        Text.margin({ top: 10 });
        Text.pop();
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new TestArea("1", undefined, {}));
