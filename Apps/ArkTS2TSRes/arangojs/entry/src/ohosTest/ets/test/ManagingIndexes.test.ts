let __generate__Id: number = 0;
function generateId(): string {
    return "ManagingIndexes.test_" + ++__generate__Id;
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
export default function ManagingIndexesTest() {
    let system: Database, db: Database;
    let collection: any;
    const dbName = `testdb_${Date.now()}`;
    const collectionName = `collection-${Date.now()}`;
    describe('ManagingIndexesTest1', () => {
        // 初始化数据库
        beforeAll(async () => {
            system = new Database(config.host);
            system.useBasicAuth(config.userInfo.username);
            await system.createDatabase(dbName);
            db = system.database(dbName);
            collection = await db.createCollection<any>(collectionName);
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
        it("should_create_a_persistent_index", 0, async (done: Function) => {
            const info: any = await collection.ensureIndex({
                type: "persistent",
                fields: ["value"],
            });
            expect(info).to.have.property("id");
            expect(info).to.have.property("type", "persistent");
            expect(info).to.have.property("fields");
            expect(info).to.have.property("isNewlyCreated", true);
            done();
        });
        it("should_create_a_geo_index_for_one_field", 0, async (done: Function) => {
            const info: any = await collection.ensureIndex({
                type: "geo",
                fields: ["value"],
            });
            expect(info).to.have.property("id");
            expect(info).to.have.property("type", "geo");
            expect(info).to.have.property("fields");
            expect(info).to.have.property("isNewlyCreated", true);
            done();
        });
        it("should_create_a_geo_index_for_two_fields", 0, async (done: Function) => {
            const info: any = await collection.ensureIndex({
                type: "geo",
                fields: ["value1", "value2"],
            });
            expect(info).to.have.property("id");
            expect(info).to.have.property("type", "geo");
            expect(info).to.have.property("fields");
            expect(info).to.have.property("isNewlyCreated", true);
            done();
        });
        it("should_create_a_fulltext_index", 0, async (done: Function) => {
            const info: any = await collection.ensureIndex({
                type: "fulltext",
                fields: ["value"],
            });
            expect(info).to.have.property("id");
            expect(info).to.have.property("type", "fulltext");
            expect(info).to.have.property("fields");
            expect(info).to.have.property("isNewlyCreated", true);
            done();
        });
        it("should_return_information_about_a_index", 0, async (done: Function) => {
            const info: any = await collection.ensureIndex({
                type: "persistent",
                fields: ["test"],
            });
            expect(await collection.index(info.id)).to.have.property("id", info.id);
            expect(await collection.index(info.id)).to.have.property("type", info.type);
            done();
        });
        it("should_return_a_list_of_indexes", 0, async (done: Function) => {
            const index: any = await collection.ensureIndex({
                type: "persistent",
                fields: ["test"],
            });
            const indexes: any = await collection.indexes();
            expect(indexes.filter((i: any) => i.id === index.id).length).to.equal(1);
            done();
        });
        it("should_drop_existing_index", 0, async (done: Function) => {
            const info: any = await collection.ensureIndex({
                type: "persistent",
                fields: ["test"],
            });
            const index: any = await collection.dropIndex(info.id);
            expect(index).to.have.property("id", info.id);
            const indexes: any = await collection.indexes();
            expect(indexes.filter((i: any) => i.id === index.id).length).to.equal(0);
            done();
        });
    });
}
