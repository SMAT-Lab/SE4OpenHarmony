let __generate__Id: number = 0;
function generateId(): string {
    return "ManipulatingCollections.test_" + ++__generate__Id;
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
import { CollectionMetadata } from 'library/src/main/ets/dist/collection';
import { ArangoApiResponse } from 'library/src/main/ets/dist/connection';
import { config } from "../config/config";
import { expect } from "../utils/utils";
export default function ManipulatingCollectionsTest() {
    const tag = "threeTest：";
    const name = `testdb_${Date.now()}`;
    let system: Database, db: Database;
    let collection: any;
    describe('ManipulatingCollectionsTest1', () => {
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
            collection = await db.createCollection<any>(`collection-${Date.now()}`);
            await db.waitForPropagation({
                path: `/_api/collection/${collection.name}`
            }, 10000);
        });
        afterEach(async () => {
            try {
                await collection.get();
            }
            catch (e) {
                return;
            }
            await collection.drop();
        });
        it("creates_a_new_document_collection", 0, async (done: Function) => {
            const collection: any = await db.createCollection<any>(`document-collection-${Date.now()}`);
            await db.waitForPropagation({
                path: `/_api/collection/${collection.name}`
            }, 10000);
            const info: ArangoApiResponse<CollectionMetadata> = await db.collection<any>(collection.name).get();
            expect(info).to.have.property("name", collection.name);
            expect(info).to.have.property("isSystem", false);
            expect(info).to.have.property("status", 3); // loaded
            expect(info).to.have.property("type", 2); // document collection
            done();
        });
        it("creates_a_new_edge_collection", 0, async (done: Function) => {
            const collection: any = await db.createEdgeCollection<any>(`edge-collection-${Date.now()}`);
            await db.waitForPropagation({
                path: `/_api/collection/${collection.name}`
            }, 10000);
            const info: ArangoApiResponse<CollectionMetadata> = await db.collection<any>(collection.name).get();
            expect(info).to.have.property("name", collection.name);
            expect(info).to.have.property("isSystem", false);
            expect(info).to.have.property("status", 3); // loaded
            expect(info).to.have.property("type", 3); // edge collection
            done();
        });
        it("should_change_properties", 0, async (done: Function) => {
            expect(await collection.properties({
                waitForSync: true
            })).to.have.property("name", collection.name);
            expect(await collection.properties({
                waitForSync: true
            })).to.have.property("waitForSync", true);
            done();
        });
        it("should_rename_a_collection", 0, async (done: Function) => {
            const res = await db.route("/_admin/server/role").get();
            if (res.body.role !== "SINGLE")
                return;
            const name = `rename-collection-${Date.now()}`;
            // eslint-disable-next-line security/detect-non-literal-fs-filename
            expect(await collection.rename(name)).to.have.property("name", name);
            done();
        });
        it("should_truncate_a_non_empty_collection", 0, async () => {
            await collection.save({});
            await collection.truncate();
            expect(await collection.count()).to.have.property("name", collection.name);
            expect(await collection.count()).to.have.property("count", 0);
        });
        it("should_allow_truncating_a_empty_collection", 0, async () => {
            await collection.truncate();
            expect(await collection.count()).to.have.property("name", collection.name);
            expect(await collection.count()).to.have.property("count", 0);
        });
        it("should_drop_a_collection", 0, async () => {
            await collection.drop();
            try {
                await collection.get();
            }
            catch (err) {
                expect(err).to.have.property("errorNum", 1203);
                return;
            }
        });
    });
}
