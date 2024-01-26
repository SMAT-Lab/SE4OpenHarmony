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
/**
 * Entity mapped to table "NOTE".
 */
import { Id } from "@ohos/dataorm";
import { NotNull } from "@ohos/dataorm";
import { Columns } from "@ohos/dataorm";
import { Entity } from "@ohos/dataorm";
import { Unique } from "@ohos/dataorm";
import { Index } from "@ohos/dataorm";
import { ToMany } from "@ohos/dataorm";
import { ColumnType } from "@ohos/dataorm";
import { ToOne } from "@ohos/dataorm";
@Entity("NOTE", [{ value: "text, date DESC", unique: true }])
export class Note {
    @Id()
    @Columns({ columnName: "ID", types: ColumnType.num })
    id: number;
    @NotNull()
    @Columns({ columnName: "TEXT", types: ColumnType.str })
    text: string;
    @Columns({ columnName: "COMMENT", types: ColumnType.str })
    comment: string;
    @Columns({ columnName: "DATE", types: ColumnType.str })
    date: string;
    @Columns({ columnName: "TYPE", types: ColumnType.str })
    type: string;
    @Columns({ columnName: "MONEYS", types: ColumnType.real })
    moneys: number;
    constructor(id?: number, text?: string, comment?: string, date?: string, types?: string, moneys?: number) {
        this.id = id;
        this.text = text;
        this.comment = comment;
        this.date = date;
        this.type = types;
        this.moneys = moneys;
    }
    getMoneys(): number {
        return this.moneys;
    }
    setMoneys(moneys: number) {
        this.moneys = moneys;
    }
    getId(): number {
        return this.id;
    }
    setId(id: number) {
        this.id = id;
    }
    getText(): string {
        return this.text;
    }
    /** Not-null value; ensure this value is available before it is saved to the database. */
    setText(text: string) {
        this.text = text;
    }
    getComment(): string {
        return this.comment;
    }
    setComment(comment: string) {
        this.comment = comment;
    }
    getDate(): string {
        return this.date;
    }
    setDate(date: string) {
        this.date = date;
    }
    getType(): string {
        return this.type;
    }
    setType(types: string) {
        this.type = types;
    }
}
