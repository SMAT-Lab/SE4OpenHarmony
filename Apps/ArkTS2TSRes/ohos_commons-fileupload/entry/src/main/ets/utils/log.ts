let __generate__Id: number = 0;
function generateId(): string {
    return "log_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const TAG = "COMMONS_FILEUPLOAD";
export function log(value: any) {
    console.log(TAG + "----" + value);
}
export function logError(value: any) {
    console.error(TAG + "----" + value);
}
export function logInfo(value: any) {
    console.info(TAG + "----" + value);
}
export function debug(func: any) {
    if (typeof func !== "function")
        return;
    try {
        func();
    }
    catch (err) {
        logError(JSON.stringify(err));
        logError(err.message);
    }
}
