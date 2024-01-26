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
import { Columns, ColumnType, Embedded, Entity, Id, NotNull, Transient } from '@ohos/dataorm';
import { Father } from './Father';
import { Mother } from './Mother';
@Entity("USER", [{ value: 'name,age DESC', unique: true }])
export class User {
    @Transient()
    home: string;
    @Id()
    @Columns({ columnName: 'ID', types: ColumnType.num })
    id: number;
    @Columns({ columnName: 'name', types: ColumnType.str })
    userName: string;
    @NotNull()
    @Columns({ columnName: 'age', types: ColumnType.num })
    userAge: number;
    @Embedded({ prefix: "m_", targetClass: Mother })
    mother: Mother;
    @Embedded({ prefix: "f_", targetClass: Father })
    father: Father;
    constructor(home?: string, id?: number, name?: string, age?: number, mother?: Mother, father?: Father) {
        this.home = home;
        this.id = id;
        this.userName = name;
        this.userAge = age;
        this.father = father;
        this.mother = mother;
    }
}
