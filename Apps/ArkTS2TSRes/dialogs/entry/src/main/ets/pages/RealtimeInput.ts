interface RealtimeInput_Params {
    allData?: string[];
    model?: InputAttributeModel;
    inputVal?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "RealtimeInput_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { InputAttributeModel, RealtimeInputPopup } from '@ohos/dialogs';
class RealtimeInput extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.allData = ['abc', 'bcd', 'cde', 'def', 'efg', 'fgh', 'ghi', 'hij', 'ijk', 'jkl', 'bcd', 'cde', 'def', 'efg', 'fgh', 'ghi', 'hij', 'ijk', 'jkl'];
        this.__model = new ObservedPropertyObject(new InputAttributeModel(), this, "model");
        this.__inputVal = new ObservedPropertySimple('', this, "inputVal");
        this.updateWithValueParams(params);
        this.declareWatch("inputVal", this.onChange);
    }
    updateWithValueParams(params: RealtimeInput_Params) {
        if (params.allData !== undefined) {
            this.allData = params.allData;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.inputVal !== undefined) {
            this.inputVal = params.inputVal;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__inputVal.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private allData: string[];
    private __model: ObservedPropertyObject<InputAttributeModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: InputAttributeModel) {
        this.__model.set(newValue);
    }
    private __inputVal: ObservedPropertySimple<string>;
    get inputVal() {
        return this.__inputVal.get();
    }
    set inputVal(newValue: string) {
        this.__inputVal.set(newValue);
    }
    onChange() {
        this.model.dataList = this.allData.filter(data => (data.indexOf(this.inputVal) != -1));
    }
    aboutToAppear() {
        this.model.setInputWidth(150);
    }
    render() {
        Column.create();
        Column.pop();
    }
}
loadDocument(new RealtimeInput("1", undefined, {}));
