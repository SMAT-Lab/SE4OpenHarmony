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
import { Entity, ToMany, Columns, Id, ColumnType, NotNull, OrderBy, JoinEntity } from '@ohos/dataorm';
import { Student } from './Student';
import { DateEntity } from './DateEntity';
import { JoinManyToDateEntity } from './JoinManyToDateEntity';
@Entity('TEACHER')
export class Teacher {
    @Id({ isPrimaryKey: true })
    @Columns({ columnName: 'ID', types: ColumnType.num })
    id: number;
    @NotNull()
    @Columns({ columnName: 'NAME', types: ColumnType.str })
    name: string;
    @ToMany({ targetClsName: "Student", joinProperty: [{ name: "ID", referencedName: "TID" }] })
    @OrderBy("NAME ASC")
    students: Array<Student>;
    @JoinEntity({ entityName: 'JoinManyToDateEntity', targetClsName: 'DateEntity', sourceProperty: 'ID_TO_MANY', targetProperty: 'ID_DATE' })
    @OrderBy("ID DESC")
    dateEntityList: Array<DateEntity>;
    constructor(id?: number, name?: string, students?: Array<Student>, dateEntityList?: Array<DateEntity>) {
        this.id = id;
        this.name = name;
        this.students = students;
        this.dateEntityList = dateEntityList;
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
    setStudent(student: Array<Student>) {
        this.students = student;
    }
    getStudent(): Array<Student> {
        return this.students;
    }
}
