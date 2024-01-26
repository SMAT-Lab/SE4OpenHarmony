let __generate__Id: number = 0;
function generateId(): string {
    return "CustomizePickerModel_" + ++__generate__Id;
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
export function initializeCustomizePickerDataOnStartup(firstArray: any, secondArray: any, thirdArray: any): Array<CustomizePickerBean> {
    let pickerArray: Array<CustomizePickerBean> = [];
    let index = 0;
    let secondIndex = 0;
    firstArray.forEach((item: string) => {
        let secondAndThirdArray: Array<SecondAndThirdArray> = [];
        for (secondIndex = 0; secondIndex < secondArray[index].length; secondIndex++) {
            secondAndThirdArray.push(new SecondAndThirdArray(secondArray[index][secondIndex], thirdArray[index][secondIndex]));
        }
        pickerArray.push(new CustomizePickerBean(item, secondAndThirdArray));
        index = index + 1;
    });
    return pickerArray;
}
let nextId = 0;
export class CustomizePickerBean {
    id: string;
    firstName: string;
    secondAndThirdArray: SecondAndThirdArray[];
    constructor(firstName: string, secondAndThirdArray: SecondAndThirdArray[]) {
        this.id = `${nextId++}`;
        this.firstName = firstName;
        this.secondAndThirdArray = secondAndThirdArray;
    }
}
let childNextId = 0;
export class SecondAndThirdArray {
    ids: string;
    secondName: string;
    thirdArray: any;
    constructor(secondName: string, thirdArray: any) {
        this.ids = `${childNextId++}`;
        this.secondName = secondName;
        this.thirdArray = thirdArray;
    }
}
