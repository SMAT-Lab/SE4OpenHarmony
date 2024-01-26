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
import { Columns, Entity, ColumnType, Id, ToOne } from '@ohos/dataorm';
import { Topics } from './Topics';
@Entity("CHAPTER", [{ value: 'bookId,name DESC', unique: true }])
export class Chapter {
    @Columns({ columnName: 'url', types: ColumnType.str })
    url: string;
    @Columns({ columnName: 'name', types: ColumnType.str })
    name: string;
    @Columns({ columnName: 'content', types: ColumnType.str })
    content: string;
    @Id()
    @Columns({ columnName: 'bookId', types: ColumnType.num })
    bookId: number;
    @ToOne({ joinProperty: "url", targetObj: Topics })
    topics: Topics;
    constructor(url?: string, name?: string, content?: string, bookId?: number, topics?: Topics) {
        this.url = url;
        this.name = name;
        this.content = content;
        this.bookId = bookId;
        this.topics = topics;
    }
}
