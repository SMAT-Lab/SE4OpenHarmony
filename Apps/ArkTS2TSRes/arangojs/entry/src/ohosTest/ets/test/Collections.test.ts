let __generate__Id: number = 0;
function generateId(): string {
    return "Collections.test_" + ++__generate__Id;
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
import { CollectionMetadata } from 'library/src/main/ets/dist/collection';
import { ArangoApiResponse } from 'library/src/main/ets/dist/connection';
import { config } from "../config/config";
export default function CollectionsTest() {
    const tag = "secondTest：";
    const range = (n: number): number[] => Array.from(Array(n).keys());
    const name = `testdb_${Date.now()}`;
    let system: Database, db: Database;
    let builtinSystemCollections: string[];
    describe('CollectionsTest1', () => {
        // 初始化数据库
        beforeAll(async () => {
            system = new Database(config.host);
            system.useBasicAuth(config.userInfo.username);
            db = await system.createDatabase(name);
            const collections = await db.listCollections(false);
            builtinSystemCollections = collections.map((c: CollectionMetadata): string => c.name);
        });
        afterAll(async () => {
            try {
                await system.dropDatabase(name);
            }
            finally {
                system.close();
            }
        });
        it("returns_a_DocumentCollection_instance_for_the_collection", 0, () => {
            const name = "potato";
            const collection = db.collection<any>(name);
            expect(collection.name).assertEqual(name);
        });
        describe("CollectionsTest2", () => {
            const nonSystemCollectionNames = range(4).map((i) => `c_${Date.now()}_${i}`);
            const systemCollectionNames = range(4).map((i) => `_c_${Date.now()}_${i}`);
            beforeAll(async () => {
                let nonSys = nonSystemCollectionNames.map(async (name) => {
                    const collection = await db.createCollection<Record<string, string>>(name);
                    await db.waitForPropagation({
                        path: `/_api/collection/${collection.name}`
                    }, 10000);
                });
                let system = systemCollectionNames.map(async (name) => {
                    interface CreatData {
                        isSystem: boolean;
                    }
                    let creatData: CreatData = {
                        isSystem: true
                    };
                    const collection = db.collection<any>(name);
                    await collection.create(creatData);
                    await db.waitForPropagation({
                        path: `/_api/collection/${collection.name}`
                    }, 10000);
                });
                let listArr: any = [nonSys, system];
                let result: any = [];
                for (let i = 0; i < listArr.length; i++) {
                    for (let j = 0; j < listArr[i].length; j++) {
                        result.push(listArr[i][j]);
                    }
                }
                await Promise.all<any>(result);
            });
            afterAll(async () => {
                let nonSystemCollection: Promise<ArangoApiResponse<Record<string, never>>>[] = nonSystemCollectionNames.map((name: string) => {
                    return db.collection<Record<string, string>>(name).drop();
                });
                let systemCollection: Promise<ArangoApiResponse<Record<string, never>>>[] = systemCollectionNames.map((name) => db.collection<Record<string, string>>(name).drop({
                    isSystem: true
                }));
                let listArr: Array<Array<Promise<ArangoApiResponse<Record<string, never>>>>> = [nonSystemCollection, systemCollection];
                let result: Promise<ArangoApiResponse<Record<string, never>>>[] = [];
                for (let i = 0; i < listArr.length; i++) {
                    for (let j = 0; j < listArr[i].length; j++) {
                        result.push(listArr[i][j]);
                    }
                }
                await Promise.all(result);
            });
            it("fetches_information_about_all_non_system_collections", 0, async (done: Function) => {
                const collections = await db.listCollections();
                expect(collections.length).assertEqual(nonSystemCollectionNames.length);
                done();
            });
            it("includes_system_collections_if_explicitly_passed_false", 0, async (done: Function) => {
                const collections = await db.listCollections(false);
                const allCollectionNames = nonSystemCollectionNames
                    .concat(systemCollectionNames)
                    .concat(builtinSystemCollections)
                    .sort();
                expect(collections.length).assertEqual(allCollectionNames.length);
                done();
            });
        });
        describe("CollectionsTest3", () => {
            const documentCollectionNames = range(4).map((i) => `dc_${Date.now()}_${i}`);
            const edgeCollectionNames = range(4).map((i) => `ec_${Date.now()}_${i}`);
            const systemCollectionNames = range(4).map((i) => `_c_${Date.now()}_${i}`);
            beforeAll(async () => {
                let document: any = documentCollectionNames.map(async (name) => {
                    const collection = await db.createCollection<Record<string, string>>(name);
                    await db.waitForPropagation({
                        path: `/_api/collection/${collection.name}`
                    }, 10000);
                });
                let edge: any = edgeCollectionNames.map(async (name) => {
                    const collection = await db.createEdgeCollection<Record<string, string>>(name);
                    await db.waitForPropagation({
                        path: `/_api/collection/${collection.name}`
                    }, 10000);
                });
                let system: any = systemCollectionNames.map(async (name) => {
                    interface CreatData {
                        isSystem: boolean;
                    }
                    let creatData: CreatData = {
                        isSystem: true
                    };
                    const collection = db.collection<Record<string, string>>(name);
                    await collection.create(creatData);
                    await db.waitForPropagation({
                        path: `/_api/collection/${collection.name}`
                    }, 10000);
                });
                let listArr: any = [document, edge, system];
                let result: any = [];
                for (let i = 0; i < listArr.length; i++) {
                    for (let j = 0; j < listArr[i].length; j++) {
                        result.push(listArr[i][j]);
                    }
                }
                await Promise.all<any>(result);
            });
            afterAll(async () => {
                let nonSystemCollection: Promise<ArangoApiResponse<Record<string, never>>>[] = documentCollectionNames.map((name) => db.collection<Record<string, string>>(name).drop());
                let edgeCollection: Promise<ArangoApiResponse<Record<string, never>>>[] = edgeCollectionNames.map((name) => db.collection<Record<string, string>>(name).drop());
                let systemCollection: Promise<ArangoApiResponse<Record<string, never>>>[] = systemCollectionNames.map((name) => db.collection<Record<string, string>>(name).drop({
                    isSystem: true
                }));
                let listArr: Array<Array<Promise<ArangoApiResponse<Record<string, never>>>>> = [nonSystemCollection, systemCollection, edgeCollection];
                let result: Promise<ArangoApiResponse<Record<string, never>>>[] = [];
                for (let i = 0; i < listArr.length; i++) {
                    for (let j = 0; j < listArr[i].length; j++) {
                        result.push(listArr[i][j]);
                    }
                }
                await Promise.all<any>(result);
                it("creates_Collection_instances", 0, async (done: Function) => {
                    const collections = await db.collections();
                    expect(collections.length).assertEqual(documentCollectionNames.length + edgeCollectionNames.length);
                    done();
                });
                it("includes_system_collections_if_explicitly_passed_false", 0, async (done: Function) => {
                    const collections = await db.collections(false);
                    const allCollectionNames: string[] = [];
                    let listArr: Array<Array<string>> = [documentCollectionNames, edgeCollectionNames, systemCollectionNames, builtinSystemCollections];
                    for (let name = 0; name < listArr.length; name++) {
                        for (let index = 0; index < listArr[name].length; index++) {
                            allCollectionNames.push(listArr[name][index]);
                        }
                    }
                    allCollectionNames.sort();
                    expect(collections.map((c): string => c.name).sort().length).assertEqual(allCollectionNames.length);
                    done();
                });
            });
        });
    });
}
