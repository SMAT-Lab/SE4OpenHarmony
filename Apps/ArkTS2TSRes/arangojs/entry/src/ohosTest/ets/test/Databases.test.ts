let __generate__Id: number = 0;
function generateId(): string {
    return "Databases.test_" + ++__generate__Id;
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { Database } from 'library';
import { config } from "../config/config";
export default function DatabasesTest() {
    const tag = "ARANGOJS：";
    let system: Database;
    // 初始化数据库
    system = new Database(config.host);
    system.useBasicAuth(config.userInfo.username);
    describe('DatabasesTest1', () => {
        const name = `testdb_${Date.now()}`;
        let db: Database;
        afterEach(async (done: Function) => {
            await system.dropDatabase(name);
            done();
        });
        it("creates_a_database_with_the_given_name", 0, async (done: Function) => {
            try {
                db = await system.createDatabase(name);
            }
            catch (err) {
            }
            const info = await db.get();
            expect(info.name).assertEqual(name);
            done();
        });
    });
    describe("DatabasesTest2", () => {
        const name = `testdb_${Date.now()}`;
        let db: Database;
        beforeAll(async () => {
            db = await system.createDatabase(name);
        });
        afterAll(async () => {
            await system.dropDatabase(name);
        });
        it("fetches_the_database_description_if_the_database_exists", 0, async (done: Function) => {
            const info = await db.get();
            expect(info.name).assertEqual(db.name);
            expect(db.name).assertEqual(name);
            done();
        });
    });
    describe("DatabasesTest3", () => {
        const name = `testdb_${Date.now()}`;
        beforeAll(async () => {
            await system.createDatabase(name);
        });
        afterAll(async () => {
            await system.dropDatabase(name);
        });
        it("returns_a_list_of_all_databases", 0, async (done: Function) => {
            const databases = await system.listDatabases();
            expect(databases.indexOf(name)).assertLarger(-1);
            done();
        });
    });
}
