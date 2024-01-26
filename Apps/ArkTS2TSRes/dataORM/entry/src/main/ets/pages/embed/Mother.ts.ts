/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Columns, ColumnType, Embedded } from '@ohos/dataorm';
import { ChildInfo } from './ChildInfo';
import { ChildTwo } from './ChildTwo';
export class Mother {
    @Embedded({ prefix: "c_", targetClass: ChildInfo })
    child: ChildInfo;
    @Embedded({ prefix: "c2_", targetClass: ChildTwo })
    childTwo: ChildTwo;
    @Columns({ columnName: 'name', types: ColumnType.str })
    name: string;
    @Columns({ columnName: 'age', types: ColumnType.num })
    age: number;
    @Columns({ columnName: 'work', types: ColumnType.str })
    work: string;
    constructor(name?: string, age?: number, work?: string, child?: ChildInfo, childTwo?: ChildTwo) {
        this.name = name;
        this.age = age;
        this.work = work;
        this.child = child;
        this.childTwo = childTwo;
    }
}
