let __generate__Id: number = 0;
function generateId(): string {
    return "CollectionMetadata.test_" + ++__generate__Id;
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
import { DocumentCollection } from "library/src/main/ets/dist/collection";
export default function CollectionMetadataTest() {
    const tag = "threeTest：";
    const dbName = `testdb_${Date.now()}`;
    const collectionName = `collection-${Date.now()}`;
    let system: Database, db: Database;
    let collection: DocumentCollection<Record<string, string>>;
    const COLLECTION_NOT_FOUND = 1203;
    describe('CollectionMetadataTest1', () => {
        // 初始化数据库
        beforeAll(async () => {
            system = new Database(config.host);
            system.useBasicAuth(config.userInfo.username);
            await system.createDatabase(dbName);
            db = system.database(dbName);
            collection = await db.createCollection(collectionName);
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
        it("should_return_information_about_a_collection1", 0, async (done: Function) => {
            const info = await collection.get();
            expect(info.name).assertEqual(collectionName);
            expect(info.isSystem).assertEqual(false);
            expect(info.status).assertEqual(3); // loaded
            expect(info.type).assertEqual(2); // document collection
            done();
        });
        it("should_throw_if_collection_does_not_exist", 0, async (done: Function) => {
            try {
                await db.collection<any>("no").get();
            }
            catch (e) {
                expect(e.errorNum).assertEqual(COLLECTION_NOT_FOUND);
                done();
                return;
            }
            expect("").assertThrowError("should throw");
            done();
        });
        it("should_return_true_if_collection_exists", 0, async (done: Function) => {
            const exists = await collection.exists();
            expect(exists).assertEqual(true);
            done();
        });
        it("should_return_false_if_collection_does_not_exist", 0, async (done: Function) => {
            const exists = await db.collection<any>("no").exists();
            expect(exists).assertEqual(false);
            done();
        });
        it("should_return_properties_of_a_collection", 0, async (done: Function) => {
            const properties = await collection.properties();
            expect(properties.name).assertEqual(collectionName);
            expect(properties.waitForSync).assertEqual(false);
            done();
        });
        it("should_return_information_about_a_collection2", 0, async (done: Function) => {
            const info = await collection.count();
            expect(info.name).assertEqual(collectionName);
            expect(info.count).assertEqual(0);
            done();
        });
        it("should_return_information_about_a_collection3", 0, async (done: Function) => {
            const info = await collection.revision();
            expect(info.name).assertEqual(collectionName);
            expect(Boolean<Object>(info)).assertTrue();
            done();
        });
    });
}
