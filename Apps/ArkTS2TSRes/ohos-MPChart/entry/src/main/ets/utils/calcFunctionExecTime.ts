let __generate__Id: number = 0;
function generateId(): string {
    return "calcFunctionExecTime_" + ++__generate__Id;
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
import promptAction from '@ohos.promptAction';
import hilog from '@ohos.hilog';
export interface CalcFuncConfig {
    loopCount?: number;
    endCallBack?: () => void;
}
export default function calcFunctionExecTime<T, P>(thisArg: T, funcName: keyof T, params: P[], config?: CalcFuncConfig) {
    let loopCount = 2000;
    let endCallBack = () => { };
    if (config) {
        if (config.loopCount) {
            loopCount = config.loopCount;
        }
        if (config.endCallBack) {
            endCallBack = config.endCallBack;
        }
    }
    const functionName = String(funcName);
    try {
        if (typeof (thisArg as any)[functionName] !== 'function') {
            throw new Error(`${functionName}, It's not a function.`);
        }
        const startTime = new Date().getTime();
        for (let i = 0; i < loopCount; i++) {
            (thisArg as any)[functionName](...params);
        }
        endCallBack();
        const endTime = new Date().getTime();
        const averageTime = ((endTime - startTime) * 1000) / loopCount;
        hilog.info(0x0000, 'performanceTest', `${functionName} averageTime: ${averageTime}  us`);
        promptAction.showToast({ message: "averageTime: " + averageTime + "us", duration: 9000 });
    }
    catch (err) {
        promptAction.showToast({ message: JSON.stringify(err) });
    }
}
