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
import { Columns, ColumnType, Entity, Id, NotNull, Unique } from '@ohos/dataorm';
@Entity("Phone")
export class Phone {
    @Columns({ columnName: "PHONE_ID", types: ColumnType.num })
    id: number;
    @Unique()
    @NotNull()
    @Id({ isPrimaryKey: true })
    @Columns({ columnName: "PHONE_NAME", types: ColumnType.str })
    phoneName: string;
    @Columns({ columnName: "PHONE_PRICE", types: ColumnType.num })
    phonePrice: number;
    constructor(id: number, phoneName?: string, phonePrice?: number) {
        this.id = id;
        this.phoneName = phoneName;
        this.phonePrice = phonePrice;
    }
}
