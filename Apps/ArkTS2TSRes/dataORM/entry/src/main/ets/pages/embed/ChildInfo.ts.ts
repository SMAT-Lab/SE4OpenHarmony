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
import { SunInfo } from './SunInfo';
export class ChildInfo {
    @Columns({ columnName: 'name', types: ColumnType.str })
    cName: string;
    @Columns({ columnName: 'age', types: ColumnType.num })
    cAge: number;
    @Columns({ columnName: 'work', types: ColumnType.str })
    cWork: string;
    @Embedded({ prefix: "s_", targetClass: SunInfo })
    sunInfo: SunInfo;
    constructor(name?: string, age?: number, work?: string, sun?: SunInfo) {
        this.sunInfo = sun;
        this.cName = name;
        this.cAge = age;
        this.cWork = work;
    }
}
