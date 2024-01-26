interface CheckType_Params {
    result?: string;
    checkResult?: string;
    presetValue?: Array<Int8Array | Number | String | Boolean>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CheckType_" + ++__generate__Id;
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
import util from '@ohos.util';
export class CheckType extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__result = new ObservedPropertySimple(' ', this, "result");
        this.__checkResult = new SynchedPropertySimpleTwoWay(params.checkResult, this, "checkResult");
        this.__presetValue = new SynchedPropertyObjectTwoWay(params.presetValue, this, "presetValue");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CheckType_Params) {
        if (params.result !== undefined) {
            this.result = params.result;
        }
    }
    aboutToBeDeleted() {
        this.__result.aboutToBeDeleted();
        this.__checkResult.aboutToBeDeleted();
        this.__presetValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __result: ObservedPropertySimple<string>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string) {
        this.__result.set(newValue);
    }
    private __checkResult: SynchedPropertySimpleTwoWay<string>;
    get checkResult() {
        return this.__checkResult.get();
    }
    set checkResult(newValue: string) {
        this.__checkResult.set(newValue);
    }
    private __presetValue: SynchedPropertySimpleOneWay<Array<Int8Array | Number | String | Boolean>>;
    get presetValue() {
        return this.__presetValue.get();
    }
    set presetValue(newValue: Array<Int8Array | Number | String | Boolean>) {
        this.__presetValue.set(newValue);
    }
    check(value: Object) {
        let utilType: util.types = new util.types();
        let utilData: Map<string, boolean> | null = new Map([
            ['ArrayBuffer', utilType.isAnyArrayBuffer(value)],
            ['Int8Array', utilType.isInt8Array(value)],
            ['Number', utilType.isNumberObject(value)],
            ['String', utilType.isStringObject(value)],
            ['Boolean', utilType.isBooleanObject(value)],
            ['ArrayBuffer', utilType.isAnyArrayBuffer(value)],
            ['DataView', utilType.isDataView(value)],
            ['Arguments', utilType.isArgumentsObject(value)],
            ['AsyncFunction', utilType.isAsyncFunction(value)],
            ['External', utilType.isExternal(value)],
            ['Float32Array', utilType.isFloat32Array(value)],
            ['Generator', utilType.isGeneratorFunction(value)]
        ]);
        for (let item of utilData) {
            if (item[1] === true) {
                this.result = item[0];
            }
        }
        utilData = null;
        return this.result;
    }
    show() {
        let showResult: string = '';
        for (let i = 0; i < this.presetValue.length; i++) {
            let typeResult = this.check(this.presetValue[i]);
            showResult = showResult + `${this.presetValue[i]} check success,this value type is ${typeResult}\n`;
        }
        this.checkResult = showResult;
    }
    render() {
        Button.createWithChild();
        Button.key('checkPresetValue');
        Button.type(ButtonType.Capsule);
        Button.backgroundColor('#0D9FFB');
        Button.padding(5);
        Button.margin({ top: 10 });
        Button.onClick(() => {
            this.show();
        });
        Text.create($r('app.string.check'));
        Text.fontColor(Color.Black);
        Text.fontSize(20);
        Text.textAlign(TextAlign.Center);
        Text.width('85%');
        Text.pop();
        Button.pop();
    }
}
