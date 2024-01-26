let __generate__Id: number = 0;
function generateId(): string {
    return "DocumentCollection.test_" + ++__generate__Id;
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
import { Database, DocumentCollection } from 'library';
import { Document, DocumentMetadata } from 'library/src/main/ets/dist/documents';
import { config } from "../config/config";
import { expect } from "../utils/utils";
export default function DocumentCollectionTest() {
    const name = `testdb_${Date.now()}`;
    let system: Database, db: Database;
    let collection: any;
    describe('DocumentCollectionTest1', () => {
        interface DataType {
            foo?: string;
        }
        const data: DataType = { foo: "bar" };
        let meta: any;
        // 初始化数据库
        beforeAll(async () => {
            system = new Database(config.host);
            system.useBasicAuth(config.userInfo.username);
            db = await system.createDatabase(name);
        });
        beforeEach(async () => {
            collection = await db.createCollection<any>(`c_${Date.now()}`);
            await db.waitForPropagation({
                path: `/_api/collection/${collection.name}`
            }, 10000);
            meta = await collection.save(data);
        });
        afterEach(async () => {
            await collection.drop();
        });
        afterAll(async () => {
            try {
                await system.dropDatabase(name);
            }
            finally {
                system.close();
            }
        });
        it("returns_a_document_in_the_collection", 0, async (done: Function) => {
            const doc: any = await collection.document(meta._id);
            expect(doc).to.have.keys("_key", "_id", "_rev", "foo");
            expect(doc._id).to.equal(meta._id);
            expect(doc._key).to.equal(meta._key);
            expect(doc._rev).to.equal(meta._rev);
            expect(doc.foo).to.equal(data.foo);
            done();
        });
        it("does_not_throw_on_not_found_when_graceful", 0, async (done: Function) => {
            expect(await collection.document("does-not-exist", true)).to.equal(null);
            done();
        });
    });
}
