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
@Entity('JoinManyToDateEntity')
export class JoinManyToDateEntity {
    @Id()
    @Columns({ columnName: 'ID', types: ColumnType.num })
    id: number;
    @Columns({ columnName: 'ID_TO_MANY', types: ColumnType.num })
    idToMany: number;
    @Columns({ columnName: 'ID_DATE', types: ColumnType.num })
    idDate: number;
    constructor(id?: number, idToMany?: number, idDate?: number) {
        this.id = id;
        this.idToMany = idToMany;
        this.idDate = idDate;
    }
}
