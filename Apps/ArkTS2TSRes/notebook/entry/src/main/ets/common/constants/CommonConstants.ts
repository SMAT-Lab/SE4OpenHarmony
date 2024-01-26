let __generate__Id: number = 0;
function generateId(): string {
    return "CommonConstants_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export default class CommonConstants {
    static readonly notebookName: string = '记事本';
    static readonly KEY_NOTEBOOK_NAME: string = 'notebookName';
    static readonly PREFERENCE_NAME: string = 'myStore';
    static readonly FULL_WIDTH: string = '100%';
    static readonly FULL_HEIGHT: string = '100%';
    static readonly MARGIN_1: number = 17;
    static readonly MARGIN_2: number = 24;
    static readonly MARGIN_17: Object = {
        left: 17,
        right: 17
    };
    static readonly MARGIN_24: Object = {
        left: 24,
        right: 24
    };
    static readonly FONT_SIZE_17: string = '17fp';
    static readonly FONT_SIZE_19: string = '19fp';
    static readonly FONT_SIZE_22: string = '22fp';
    static readonly FONT_SIZE_29: string = '29fp';
    static readonly FONT_SIZE_38: string = '38fp';
}
export const STORE_CONFIG = { name: 'noteInfo.db' };
export const NOTE_INFO = {
    tableName: 'noteInfo',
    sqlCreate: 'CREATE TABLE IF NOT EXISTS noteInfo(id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, ' +
        'title TEXT NOT NULL, content TEXT NOT NULL, imageArr TEXT NOT NULL)',
    columns: ['id', 'date', 'title', 'content', 'imageArr']
};
