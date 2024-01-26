/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
export class Employee {
    ID: number;
    NAME: string;
    AGE: number;
    SALARY: number;
    CODES: Uint8Array;
    constructor(ID: number, NAME: string, AGE: number, SALARY: number, CODES: Uint8Array) {
        this.ID = ID;
        this.NAME = NAME;
        this.AGE = AGE;
        this.SALARY = SALARY;
        this.CODES = CODES;
    }
}
export let valuesBuckets = [
    { "NAME": "Lisa", "AGE": 18, "SALARY": 100.5, "CODES": new Uint8Array([1, 2, 3, 4, 5]) },
    { "NAME": "Rose", "AGE": 22, "SALARY": 100.5, "CODES": new Uint8Array([1, 2, 3, 4, 5]) },
    { "NAME": "Lisa", "AGE": 32, "SALARY": 120, "CODES": new Uint8Array([1, 2, 3, 4, 5]) },
    { "NAME": "Lisa", "AGE": 18, "SALARY": 110, "CODES": new Uint8Array([1, 2, 3, 4, 5]) }
];
export let newValuesBuckets = [
    { "NAME": "Rose", "AGE": 32, "SALARY": 116, "CODES": new Uint8Array([1, 2, 3, 4, 5]), }
];
