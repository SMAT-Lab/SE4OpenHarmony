interface TestTreeSelect_Params {
    result?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestTreeSelect_" + ++__generate__Id;
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
import { TreeSelect } from 'easyui';
import promptAction from '@ohos.promptAction';
class TestTreeSelect extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__result = new ObservedPropertySimple("", this, "result");
        this.updateWithValueParams(params);
        this.declareWatch("result", this.showResult);
    }
    updateWithValueParams(params: TestTreeSelect_Params) {
        if (params.result !== undefined) {
            this.result = params.result;
        }
    }
    aboutToBeDeleted() {
        this.__result.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __result: ObservedPropertySimple<string>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string) {
        this.__result.set(newValue);
    }
    showResult() {
        promptAction.showToast({
            message: "选中值：" + this.result,
            duration: 2000,
            bottom: 300
        });
    }
    render() {
        Column.create();
        Column.pop();
    }
}
loadDocument(new TestTreeSelect("1", undefined, {}));
