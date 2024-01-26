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
import { Columns, Entity, ColumnType, Id } from '@ohos/dataorm';
@Entity("TOPICS")
export class Topics {
    @Columns({ columnName: 'bookId', types: ColumnType.num })
    bookId: number;
    @Id()
    @Columns({ columnName: 'chapterUrl', types: ColumnType.str })
    chapterUrl: string;
    @Columns({ columnName: 'questionName', types: ColumnType.str })
    questionName: string;
    @Columns({ columnName: 'answer', types: ColumnType.str })
    answer: string;
    constructor(id?: number, url?: string, name?: string, answer?: string) {
        this.bookId = id;
        this.chapterUrl = url;
        this.questionName = name;
        this.answer = answer;
    }
}
