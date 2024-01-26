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
import { Columns, Entity, ColumnType, Id, Convert } from '@ohos/dataorm';
import ArrayList from '@ohos.util.ArrayList';
import { TypeConvert } from './TypeConvert';
@Entity("ConvertInfo")
export class ConvertInfo {
    @Id()
    @Columns({ columnName: 'ConvertInfoId', types: ColumnType.num })
    id: number;
    @Convert({ converter: TypeConvert, columnType: ColumnType.str })
    images: ArrayList<string>;
    constructor(id?: number, images?: ArrayList<string>) {
        this.id = id;
        this.images = images;
    }
}
