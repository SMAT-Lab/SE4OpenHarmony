let __generate__Id: number = 0;
function generateId(): string {
    return "BulkImport.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it } from '@ohos/hypium';
import { Database } from 'library';
import { config } from "../config/config";
import { expect } from "../utils/utils";
export default function BulkImportTest() {
    let system: Database, db: Database;
    const dbName = `testdb_${Date.now()}`;
    let collection: any;
    const collectionName = `collection-${Date.now()}`;
    describe('BulkImportTest1', () => {
        // 初始化数据库
        beforeAll(async () => {
            system = new Database(config.host);
            system.useBasicAuth(config.userInfo.username);
            await system.createDatabase(dbName);
            db = system.database(dbName);
            collection = await db.createCollection<Record<string, string>>(collectionName);
            await db.waitForPropagation({
                path: `/_api/collection/${collection.name}`
            }, 10000);
        });
        afterAll(async () => {
            try {
                await system.dropDatabase(dbName);
            }
            finally {
                system.close();
            }
        });
        it("should_accept_tuples_array", 0, async (done: Function) => {
            const data = [
                ["_key", "data"],
                ["ta1", "banana"],
                ["ta2", "peach"],
                ["ta3", "apricot"],
            ];
            expect(await collection.import(data)).to.eql({
                error: false,
                created: 3,
                errors: 0,
                empty: 0,
                updated: 0,
                ignored: 0,
            });
            done();
        });
        it("should_accept_documents_array", 0, async (done: Function) => {
            interface DataType {
                _key: string;
                data: string;
            }
            const data: DataType[] = [
                {
                    _key: "da1", data: "banana"
                },
                {
                    _key: "da2", data: "peach"
                },
                {
                    _key: "da3", data: "apricot"
                },
            ];
            expect(await collection.import(data)).to.eql({
                error: false,
                created: 3,
                errors: 0,
                empty: 0,
                updated: 0,
                ignored: 0,
            });
            done();
        });
        it("should_accept_string_of_LDJSON_arrays", 0, async (done: Function) => {
            const data = '["_key", "data"]\r\n["ts1", "banana"]\r\n["ts2", "peach"]\r\n["ts3", "apricot"]\r\n';
            const info: any = await collection.import(data);
            expect(info).to.eql({
                error: false,
                created: 3,
                errors: 0,
                empty: 0,
                updated: 0,
                ignored: 0,
            });
            done();
        });
    });
}
