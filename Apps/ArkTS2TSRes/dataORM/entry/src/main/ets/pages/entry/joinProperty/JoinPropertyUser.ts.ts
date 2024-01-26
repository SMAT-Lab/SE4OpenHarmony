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
import { Columns, ColumnType, Entity, Id, OrderBy, ToMany, Unique } from '@ohos/dataorm';
import { Customer } from './Customer';
@Entity("JoinPropertyUser")
export class JoinPropertyUser {
    @Id()
    @Columns({ columnName: 'id', types: ColumnType.num })
    id: number;
    @Columns({ columnName: 'joinPropertyUserName', types: ColumnType.str })
    joinPropertyUserName: string;
    @Unique()
    @Columns({ columnName: 'flag', types: ColumnType.num })
    flag: number;
    @ToMany({ targetClsName: 'Customer', joinProperty: [{ name: "flag", referencedName: "userFlag" }] })
    @OrderBy("CustomerUserName ASC")
    customers: Array<Customer>;
    constructor(id?: number, name?: string, flag?: number, customers?: Array<Customer>) {
        this.id = id;
        this.joinPropertyUserName = name;
        this.flag = flag;
        this.customers = customers;
    }
}
