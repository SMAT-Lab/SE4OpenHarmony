/*
  * Copyright (c) 2022 Huawei Device Co., Ltd.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
    *
  * http://www.apache.org/licenses/LICENSE-2.0
    *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
import { Entity, Columns, Id, NotNull, ColumnType, ToOne } from '@ohos/dataorm';
import { Teacher } from './Teacher';
@Entity('STUDENT')
export class Student {
    @Id()
    @Columns({ columnName: 'ID', types: ColumnType.num })
    id: number;
    @NotNull()
    @Columns({ columnName: 'NAME', types: ColumnType.str })
    name: string;
    @Columns({ columnName: 'TID', types: ColumnType.num })
    tId: number;
    @ToOne({ joinProperty: 'TID', targetObj: Teacher })
    teacher: Teacher;
    constructor(id?: number, name?: string, tId?: number, teacher: Teacher = new Teacher()) {
        this.id = id;
        this.name = name;
        this.tId = tId;
        this.teacher = teacher;
    }
    setId(id: number) {
        this.id = id;
    }
    getId(): number {
        return this.id;
    }
    setName(name: string) {
        this.name = name;
    }
    getName(): string {
        return this.name;
    }
    setTId(tId: number) {
        this.tId = tId;
    }
    getTId(): number {
        return this.tId;
    }
}
