let __generate__Id: number = 0;
function generateId(): string {
    return "SimpleQueries.test_" + ++__generate__Id;
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
import { DocumentCollection } from 'library/src/main/ets/dist/collection';
import { ArrayCursor } from 'library/src/main/ets/dist/cursor';
import { Document } from 'library/src/main/ets/dist/documents';
import { config } from "../config/config";
import { expect } from "../utils/utils";
export default function SimpleQueriesTest() {
    const range = (n: number): number[] => Array.from(Array(n).keys());
    const alpha = (i: number): string => String.fromCharCode("a".charCodeAt(0) + i);
    const name = `testdb_${Date.now()}`;
    let system: Database, db: Database;
    let collection: any;
    describe('SimpleQueriesTest1', () => {
        // 初始化数据库
        beforeAll(async () => {
            system = new Database(config.host);
            system.useBasicAuth(config.userInfo.username);
            db = await system.createDatabase(name);
        });
        afterAll(async () => {
            try {
                await system.dropDatabase(name);
            }
            finally {
                system.close();
            }
        });
        beforeEach(async () => {
            collection = await db.createCollection<Record<string, string>>(`c_${Date.now()}`);
            await db.waitForPropagation({
                path: `/_api/collection/${collection.name}`
            }, 10000);
            await Promise.all<any>(range(10).map<any>((i: number): any => collection.save({
                _key: alpha(i),
                value: i + 1,
                group: Math.floor(i / 2) + 1,
            })));
        });
        afterEach(async () => {
            await collection.drop();
        });
        it("returns_a_cursor_for_all_documents_in_the_collection", 0, async (done: Function) => {
            const cursor: any = await collection.all();
            expect(cursor.count).to.equal(10);
            const arr: any = await cursor.all();
            expect(arr).to.have.length(10);
            arr.forEach((doc: any) => {
                expect(doc).to.have.keys("_key", "_id", "_rev", "value", "group");
                expect(doc._id).to.equal(`${collection.name}/${doc._key}`);
                expect(doc.group).to.equal(Math.floor((doc.value - 1) / 2) + 1);
            });
            done();
        });
        it("returns_a_random_document_from_the_collection", 0, async (done: Function) => {
            const doc: any = await collection.any();
            expect(doc).to.have.keys("_key", "_id", "_rev", "value", "group");
            expect(doc._key).to.equal(alpha(doc.value - 1));
            expect(doc._id).to.equal(`${collection.name}/${doc._key}`);
            expect(doc.group).to.equal(Math.floor((doc.value - 1) / 2) + 1);
            done();
        });
        it("returns_all_documents_matching_the_example", 0, async (done: Function) => {
            const cursor: any = await collection.byExample({
                group: 2
            });
            const arr: any = await cursor.all();
            expect(arr).to.have.length(2);
            arr.forEach((doc: any) => {
                expect(doc).to.have.keys("_key", "_id", "_rev", "value", "group");
                expect(doc._id).to.equal(`${collection.name}/${doc._key}`);
                expect(doc.group).to.equal(2);
            });
            expect(arr.map((d: any): any => d._key).sort()).to.eql(["c", "d"]);
            expect(arr.map((d: any): any => d.value).sort()).to.eql([3, 4]);
            done();
        });
        it("returns_the_first_document_matching_the_example", 0, async (done: Function) => {
            const doc: any = await collection.firstExample({
                group: 2
            });
            expect(doc).to.have.keys("_key", "_id", "_rev", "value", "group");
            expect(doc._id).to.equal(`${collection.name}/${doc._key}`);
            expect(doc.group).to.equal(2);
            done();
        });
        it("returns_the_documents_with_the_given_keys", 0, async (done: Function) => {
            const arr: any = await collection.lookupByKeys(["b", "c", "d"]);
            expect(arr).to.have.length(3);
            arr.forEach((doc: any) => {
                expect(doc).to.have.keys("_key", "_id", "_rev", "value", "group");
                expect(doc._id).to.equal(`${collection.name}/${doc._key}`);
                expect(doc.group).to.equal(Math.floor((doc.value - 1) / 2) + 1);
            });
            expect(arr.map((d: any): any => d._key)).to.eql(["b", "c", "d"]);
            done();
        });
    });
}
