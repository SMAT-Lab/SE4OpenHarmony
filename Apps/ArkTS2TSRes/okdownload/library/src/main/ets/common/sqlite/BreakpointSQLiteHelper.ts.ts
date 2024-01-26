/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
import data_rdb from '@ohos.data.rdb';
import ability_featureAbility from '@ohos.ability.featureAbility';
import { ID, URL, ETAG, PARENT_PATH, FILENAME, TASK_ONLY_PARENT_PATH, CHUNKED, HOST_ID, BLOCK_INDEX, START_OFFSET, CONTENT_LENGTH, CURRENT_OFFSET } from './BreakpointSQLiteKey';
import { BreakpointInfo } from '../okdownload/breakpoint/BreakpointInfo';
import { BreakpointInfoRow } from './BreakpointInfoRow';
const NAME: string = "okdownload-breakpoint.db";
const RESPONSE_FILENAME_TABLE_NAME: string = "okdownloadResponseFilename";
const BREAKPOINT_TABLE_NAME: string = "breakpoint";
const BLOCK_TABLE_NAME: string = "block";
const TASK_FILE_DIRTY_TABLE_NAME: string = "taskFileDirty";
const BREAKPOINT: string = "CREATE TABLE IF NOT EXISTS "
    + BREAKPOINT_TABLE_NAME + "( "
    + ID + " INTEGER PRIMARY KEY, "
    + URL + " VARCHAR NOT NULL, "
    + ETAG + " VARCHAR, "
    + PARENT_PATH + " VARCHAR, "
    + FILENAME + " VARCHAR, "
    + TASK_ONLY_PARENT_PATH + " TINYINT(1) DEFAULT 0, "
    + CHUNKED + " TINYINT(1) DEFAULT 0)";
const BLOCK: string = "CREATE TABLE IF NOT EXISTS "
    + BLOCK_TABLE_NAME + "( "
    + ID + " INTEGER PRIMARY KEY AUTOINCREMENT, "
    + HOST_ID + " INTEGER, "
    + BLOCK_INDEX + " INTEGER, "
    + START_OFFSET + " INTEGER, "
    + CONTENT_LENGTH + " INTEGER, "
    + CURRENT_OFFSET + " INTEGER)";
const RESPONSE_FILENAME: string = "CREATE TABLE IF NOT EXISTS "
    + RESPONSE_FILENAME_TABLE_NAME + "( "
    + URL + " VARCHAR NOT NULL PRIMARY KEY, "
    + FILENAME + " VARCHAR NOT NULL)";
const TASK_FILE_DIRTY: string = "CREATE TABLE IF NOT EXISTS "
    + TASK_FILE_DIRTY_TABLE_NAME + "( "
    + ID + " INTEGER PRIMARY KEY)";
export class BreakpointSQLiteHelper {
    //public createSqlres: Promise<>;
    private rdbStore: any;
    constructor() {
        this.rdbStore = globalThis.exports.default.data.rdb_store;
        console.info("okdownload constructor = " + JSON.stringify(this.rdbStore));
    }
    public markFileDirty(id: number): void {
        const values = {
            ID: id
        };
        this.rdbStore.insert(TASK_FILE_DIRTY_TABLE_NAME, values, function (err, ret) {
            if (err) {
                console.info("okdownload insert TASK_FILE_DIRTY_TABLE_NAME fail");
            }
            console.info("okdownload insert TASK_FILE_DIRTY_TABLE_NAME success!!");
        });
    }
    public markFileClear(id: number): void {
        let predicates = new data_rdb.RdbPredicates(TASK_FILE_DIRTY_TABLE_NAME);
        predicates.equalTo(ID, id);
        this.rdbStore.delete(predicates, function (err, rows) {
            console.info("okdownload delete rows: " + rows);
        });
    }
    public loadDirtyFileList(): Array<number> {
        const dirtyFileList: Array<number> = new Array;
        let predicates = new data_rdb.RdbPredicates(TASK_FILE_DIRTY_TABLE_NAME);
        this.rdbStore.query(predicates, [ID], function (err, resultSet) {
            while (resultSet.goToNextRow()) {
                dirtyFileList.push(resultSet.getLong(resultSet.getColumnIndex(ID)));
            }
        });
        return dirtyFileList;
    }
    public loadToCache(): Map<number, BreakpointInfo> {
        const breakpointInfoRows: Array<BreakpointInfoRow> = new Array;
        console.info("okdownload loadToCache rdbStore  = " + this.rdbStore);
        let predicates = new data_rdb.RdbPredicates(BREAKPOINT_TABLE_NAME);
        this.rdbStore.query(predicates, [ID, URL, FILENAME, ETAG, CHUNKED], function (err, resultSet) {
            while (resultSet.goToNextRow()) {
                const id: number = resultSet.getLong(resultSet.getColumnIndex(ID));
                const url: string = resultSet.getString(resultSet.getColumnIndex(URL));
                const filename: string = resultSet.getString(resultSet.getColumnIndex(FILENAME));
                const etag: string = resultSet.getString(resultSet.getColumnIndex(ETAG));
                const chunked: boolean = resultSet.getLong(resultSet.getColumnIndex(CHUNKED));
                breakpointInfoRows.push(new BreakpointInfoRow(id, url, filename, etag, chunked));
            }
        });
        const breakpointInfoMap: Map<number, BreakpointInfo> = new Map;
        for (var i = 0; i < breakpointInfoRows.length; i++) {
            const info: BreakpointInfo = breakpointInfoRows[i].toInfo();
            breakpointInfoMap.set(info.id, info);
        }
        //        for (BreakpointInfoRow infoRow : breakpointInfoRows) {
        //            final BreakpointInfo info = infoRow.toInfo();
        //            final Iterator<BlockInfoRow> blockIt = blockInfoRows.iterator();
        //            while (blockIt.hasNext()) {
        //                final BlockInfoRow blockInfoRow = blockIt.next();
        //                if (blockInfoRow.getBreakpointId() == info.id) {
        //                    info.addBlock(blockInfoRow.toInfo());
        //                    blockIt.remove();
        //                }
        //            }
        //            breakpointInfoMap.put(info.id, info);
        //        }
        return breakpointInfoMap;
    }
    public loadResponseFilenameToMap(): Map<string, string> {
        const urlFilenameMap: Map<string, string> = new Map;
        let predicates = new data_rdb.RdbPredicates(RESPONSE_FILENAME_TABLE_NAME);
        this.rdbStore.query(predicates, [URL, FILENAME], function (err, resultSet) {
            while (resultSet.goToNextRow()) {
                const url: string = resultSet.getString(resultSet.getColumnIndex(URL));
                const filename: string = resultSet.getString(resultSet.getColumnIndex(FILENAME));
                urlFilenameMap.set(url, filename);
            }
        });
        return urlFilenameMap;
    }
    public updateFilename(url: string, filename: string): void {
        const values = {
            URL: url,
            FILENAME: filename
        };
        let predicates = new data_rdb.RdbPredicates(RESPONSE_FILENAME_TABLE_NAME);
        predicates.equalTo(URL, url);
        this.rdbStore.query(predicates, [FILENAME], function (err, resultSet) {
            if (resultSet.goToFirstRow()) {
                if (!(filename === resultSet.getString(resultSet.getColumnIndex(FILENAME)))) {
                    this.rdbStore.update(values, predicates, function (err, ret) {
                    });
                }
            }
            else {
                this.rdbStore.insert(RESPONSE_FILENAME_TABLE_NAME, values, function (err, ret) {
                });
            }
        });
    }
    public insert(info: BreakpointInfo): void {
        this.rdbStore.insert(BREAKPOINT_TABLE_NAME, BreakpointSQLiteHelper.toValues(info), function (err, ret) {
            if (err) {
                console.info("okdownload insert info " + info + "failed!!");
            }
            console.info("okdownload insert = " + ret);
        });
    }
    public updateInfo(info: BreakpointInfo): void {
        let predicates = new data_rdb.RdbPredicates(BREAKPOINT_TABLE_NAME);
        predicates.equalTo(ID, info.id);
        this.rdbStore.query(predicates, [ID], function (err, resultSet) {
            if (!resultSet.goToNextRow())
                return;
        });
        this.removeInfo(info.id);
        this.insert(info);
    }
    public removeInfo(id: number): void {
        let predicates = new data_rdb.RdbPredicates("BREAKPOINT_TABLE_NAME");
        predicates.equalTo(ID, id);
        this.rdbStore.delete(predicates, function (err, rows) {
            console.info("okdownload delete rows: " + rows);
        });
    }
    private static toValues(info: BreakpointInfo) {
        const values = {
            ID: info.getId(),
            URL: info.getUrl(),
            ETAG: info.getEtag(),
            FILENAME: info.getFilename(),
            CHUNKED: info.isChunked() ? 1 : 0
        };
        return values;
    }
}
