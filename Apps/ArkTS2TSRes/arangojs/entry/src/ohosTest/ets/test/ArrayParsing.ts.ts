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
export function arrayParsing(collectionNames, fun) {
    let arr = [];
    for (let index = 0; index < collectionNames.length; index++) {
        arr.push(...collectionNames[index].map(fun[index]));
    }
    return arr;
}
export function getNameObj(name, role, num?) {
    return {
        "@value0": name,
        value1: role,
        value2: num,
    };
}
