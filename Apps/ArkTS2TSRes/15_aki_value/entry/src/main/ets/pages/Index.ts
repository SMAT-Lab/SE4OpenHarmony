interface Index_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
var libaki = globalThis.requireNapi("aki_value", true);
;
import { BundleManager } from './BundleManager';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            BundleManager.setBundleGlobal();
            let result = libaki.PassingValueAsString('akiString');
            console.log('AKI', 'PassingValueAsString', result);
            result = libaki.PassingValueAsStringReturnValue('akiString');
            console.log('AKI', 'PassingValueAsStringReturnValue', result);
            result = libaki.PassingArrayValueReturnValue(['aki']);
            console.log('AKI', 'PassingArrayValueReturnValue', result);
            result = libaki.PassingArrayValueReturnArrayValue(['aki']);
            console.log('AKI', 'PassingArrayValueReturnArrayValue', result);
            let array = ['aki', 'aki'];
            libaki.PassingArrayValueThenSetValue(array);
            console.log('AKI', 'PassingArrayValueThenSetValue', array);
            result = libaki.PassingValueAsBool(false);
            console.log('AKI', 'PassingValueAsBool', result);
            result = libaki.PassingValueAsBoolReturnValue(false);
            console.log('AKI', 'PassingValueAsBoolReturnValue', result);
            let result2 = libaki.PassingValueAsInt(5566);
            console.log('AKI', 'PassingValueAsInt', result2);
            result2 = libaki.PassingValueAsIntReturnValue(7788);
            console.log('AKI', 'PassingValueAsIntReturnValue', result2);
            result = libaki.PassingValueAsFunction((str: string) => {
                return str + ' and with javascript.';
            });
            console.log('AKI', 'PassingValueAsFunction', result);
            result = libaki.PassingValueAsJsonObject({
                'name': 'aki',
                'age': 1
            });
            console.log('AKI', 'PassingValueAsJsonObject', JSON.stringify(result));
            result = libaki.PassingValueCheckIsNull(null);
            console.log('AKI', 'PassingValueCheckIsNull', result);
            result = libaki.PassingValueCheckIsUndefined(undefined);
            console.log('AKI', 'PassingValueCheckIsUndefined', result);
            result = libaki.PassingValueCheckIsBool(false);
            console.log('AKI', 'PassingValueCheckIsBool', result);
            result = libaki.PassingValueCheckIsNumber(1);
            console.log('AKI', 'PassingValueCheckIsNumber', result);
            result = libaki.PassingValueCheckIsString('aki');
            console.log('AKI', 'PassingValueCheckIsString', result);
            result = libaki.PassingValueCheckIsObject(new Date());
            console.log('AKI', 'PassingValueCheckIsObject', result);
            result = libaki.PassingValueCheckIsArray(['aki', 'jsbind']);
            console.log('AKI', 'PassingValueCheckIsArray', result);
            result = libaki.PassingValueCheckIsFunction(() => { });
            console.log('AKI', 'PassingValueCheckIsFunction', result);
            libaki.FromGlobalBundleManager();
            result = libaki.FromGlobalJSONStringify({
                'name': 'aki',
                'age': 1
            });
            console.log('AKI', 'FromGlobalJSONStringify', result);
            result = libaki.FromGlobalJSONParse(result);
            console.log('AKI', 'FromGlobalJSONParse', JSON.stringify(result));
            let result3 = new libaki.AkiValueData();
            result3.value = ['aki', 'jsbind'];
            console.log('AKI', 'AkiValueData::GetValue', result3.value);
            result3.SetValueFromNative();
            console.log('AKI', 'AkiValueData::SetValueFromNative', result3.value);
            let buff: ArrayBuffer = new ArrayBuffer(8);
            let uint8Buff: Uint8Array = new Uint8Array(buff);
            uint8Buff[0] = 0;
            uint8Buff[1] = 1;
            uint8Buff[2] = 2;
            uint8Buff[3] = 3;
            libaki.PassingValueAsArrayBuffer(buff);
            console.log('AKI', 'PassingValueAsArrayBuffer', uint8Buff.toString());
        });
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
