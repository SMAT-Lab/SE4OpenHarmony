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
import { Chapter } from './Chapter';
@Entity("BOOK", [{ value: 'bookId,readingChapterUrl DESC', unique: true }])
export class Book {
    @Id()
    @Columns({ columnName: 'bookId', types: ColumnType.num })
    bookId: number;
    @Columns({ columnName: 'bookName', types: ColumnType.str })
    bookName: string;
    @Columns({ columnName: 'readingChapterUrl', types: ColumnType.str })
    readingChapterUrl: string;
    @ToOne({ joinProperty: "bookId", targetObj: Chapter })
    readingChapter: Chapter;
    constructor(id?: number, name?: string, url?: string, chapter?: Chapter) {
        this.bookId = id;
        this.bookName = name;
        this.readingChapterUrl = url;
        this.readingChapter = chapter;
    }
}
