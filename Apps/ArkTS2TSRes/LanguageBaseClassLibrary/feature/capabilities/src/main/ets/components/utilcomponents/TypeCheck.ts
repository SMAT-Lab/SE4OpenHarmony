interface TypeCheck_Params {
    checkResult?: string;
    presetValue?: Array<Int8Array | Number | String | Boolean>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TypeCheck_" + ++__generate__Id;
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
import { ShowKey } from './typecheck/ShowKey';
import { CheckType } from './typecheck/CheckType';
let int8Array: Int8Array = new Int8Array(new ArrayBuffer(8));
let numVal: Number = new Number(55);
let strVal: String = new String('zhangsan');
let boolVal: Boolean = new Boolean(true);
;
for (let i = 0; i < int8Array.length; i++) {
    int8Array[i] = i;
}
export class TypeCheck extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__checkResult = new ObservedPropertySimple('', this, "checkResult");
        this.__presetValue = new ObservedPropertyObject([numVal, strVal, boolVal, int8Array], this, "presetValue");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TypeCheck_Params) {
        if (params.checkResult !== undefined) {
            this.checkResult = params.checkResult;
        }
        if (params.presetValue !== undefined) {
            this.presetValue = params.presetValue;
        }
    }
    aboutToBeDeleted() {
        this.__checkResult.aboutToBeDeleted();
        this.__presetValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __checkResult: ObservedPropertySimple<string>;
    get checkResult() {
        return this.__checkResult.get();
    }
    set checkResult(newValue: string) {
        this.__checkResult.set(newValue);
    }
    private __presetValue: ObservedPropertyObject<Array<Int8Array | Number | String | Boolean>>;
    get presetValue() {
        return this.__presetValue.get();
    }
    set presetValue(newValue: Array<Int8Array | Number | String | Boolean>) {
        this.__presetValue.set(newValue);
    }
    render() {
        Scroll.create();
        Scroll.scrollBar(BarState.Off);
        Scroll.align(Alignment.Start);
        Column.create();
        Column.width('100%');
        Column.padding(16);
        Text.create(this.checkResult);
        Text.width('100%');
        Text.height(200);
        Text.fontSize(20);
        Text.margin(20);
        Text.padding({ left: 5, right: 5 });
        Text.border({ width: 2, radius: 15, color: Color.Gray });
        Text.pop();
        let earlierCreatedChild_2: ShowKey = (this && this.findChildById) ? this.findChildById("2") as ShowKey : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new ShowKey("2", this, { presetValue: this.__presetValue, checkResult: this.__checkResult }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: CheckType = (this && this.findChildById) ? this.findChildById("3") as CheckType : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new CheckType("3", this, { presetValue: this.__presetValue, checkResult: this.__checkResult }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
        Scroll.pop();
    }
}
