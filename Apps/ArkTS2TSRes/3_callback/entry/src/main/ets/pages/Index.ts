interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import hilog from '@ohos.hilog';
var callback = globalThis.requireNapi("callback", true);
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Button.createWithLabel('std::function without return');
        Button.height(30);
        Button.fontSize(20);
        Button.margin({ top: 20, bottom: 20 });
        Button.onClick(() => {
            callback.CallFunctionReturnVoid(() => {
                hilog.info(0x0000, 'callback-js', 'std::function callback from js');
            });
        });
        Button.pop();
        Button.createWithLabel('std::function<short (short)>');
        Button.height(30);
        Button.fontSize(20);
        Button.margin({ top: 20, bottom: 20 });
        Button.onClick(() => {
            let result = callback.CallFunctionPassingShortReturnShort(-32768, (num) => {
                return num;
            });
            hilog.info(0x0000, 'callback-js', 'std::function<short (short)> result: ' + result);
        });
        Button.pop();
        Button.createWithLabel('std::function return string');
        Button.height(30);
        Button.fontSize(20);
        Button.margin({ top: 20, bottom: 20 });
        Button.onClick(() => {
            callback.CallFunctionReturnString((): string => {
                hilog.info(0x0000, 'callback-js', 'js call CallFunctionReturnString');
                return "js call CallFunctionReturnString";
            });
        });
        Button.pop();
        Button.createWithLabel('aki::Callback without return');
        Button.height(30);
        Button.fontSize(20);
        Button.margin({ top: 20, bottom: 20 });
        Button.onClick(() => {
            callback.CallJsbCallbackReturnVoid(() => {
                hilog.info(0x0000, 'callback-js', 'aki::Callback callback from js');
            });
        });
        Button.pop();
        Button.createWithLabel('aki::Callback return string');
        Button.height(30);
        Button.fontSize(20);
        Button.margin({ top: 20, bottom: 20 });
        Button.onClick(() => {
            callback.CallJsbCallbackReturnString((): string => {
                hilog.info(0x0000, 'callback-js', 'js call CallJsbCallbackReturnString');
                return "js call CallJsbCallbackReturnString";
            });
        });
        Button.pop();
        Button.createWithLabel('aki::SafetyCallback without return');
        Button.height(30);
        Button.fontSize(20);
        Button.margin({ top: 20, bottom: 20 });
        Button.onClick(() => {
            callback.CallJsbSafetyCallbackReturnVoid(() => {
                hilog.info(0x0000, 'callback-js', 'aki::SafetyCallback callback from js');
            });
        });
        Button.pop();
        Button.createWithLabel('aki::SafetyCallback return string');
        Button.height(30);
        Button.fontSize(20);
        Button.margin({ top: 20, bottom: 20 });
        Button.onClick(() => {
            callback.CallJsbSafetyCallbackReturnString((): string => {
                hilog.info(0x0000, 'callback-js', 'js call CallJsbSafetyCallbackReturnString');
                return "js call CallJsbSafetyCallbackReturnString";
            });
        });
        Button.pop();
        Button.createWithLabel('callback at js return number');
        Button.height(30);
        Button.fontSize(20);
        Button.margin({ top: 20, bottom: 20 });
        Button.onClick(() => {
            callback.JSBind.bindFunction("funcWithCallbackReturnNumber", (a: number, b: number, callback: (result: number) => void) => {
                let result = callback(a + b);
                hilog.info(0x0000, 'callback-js', 'AKI:' + result);
            });
            callback.InvokeFuncWithCallbackReturnNumber();
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
