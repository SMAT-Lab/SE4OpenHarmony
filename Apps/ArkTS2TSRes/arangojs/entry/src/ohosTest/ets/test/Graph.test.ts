let __generate__Id: number = 0;
function generateId(): string {
    return "Graph.test_" + ++__generate__Id;
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
import { arrayParsing } from './ArrayParsing';
interface CtrType {
    collection: string;
    from: string[];
    to: string[];
}
function ctr(collection: string, from: string[], to: string[]): CtrType {
    return {
        collection,
        from,
        to
    };
}
export default function GraphTest() {
    const tag = "threeTest：";
    const range = (n: number): number[] => Array.from(Array(n).keys());
    const name = `testdb_${Date.now()}`;
    let system: Database, db: Database;
    describe('GraphTest1', () => {
        const vertexCollectionNames = range(2).map((i) => `vc_${Date.now()}_${i}`);
        const edgeCollectionNames = range(2).map((i) => `ec_${Date.now()}_${i}`);
        const graphNames = range(4).map((i) => `g_${Date.now()}_${i}`);
        // 初始化数据库
        beforeAll(async () => {
            system = new Database(config.host);
            system.useBasicAuth(config.userInfo.username);
            db = await system.createDatabase(name);
            await Promise.all<any>(arrayParsing([vertexCollectionNames, edgeCollectionNames], [async (name: string) => {
                    const collection: any = await db.createCollection<any>(name);
                    await db.waitForPropagation({
                        path: `/_api/collection/${collection.name}`
                    }, 10000);
                }, async (name: string) => {
                    const collection: any = await db.createEdgeCollection<any>(name);
                    await db.waitForPropagation({
                        path: `/_api/collection/${collection.name}`
                    }, 10000);
                }]) as Promise<void>[]);
            await Promise.all<any>(arrayParsing([graphNames], [async (name: string) => {
                    const graph = db.graph(name);
                    await graph.create(edgeCollectionNames.map((name) => (ctr(name, vertexCollectionNames, vertexCollectionNames))));
                    await db.waitForPropagation({
                        path: `/_api/gharial/${graph.name}`
                    }, 10000);
                }]));
        });
        afterAll(async () => {
            try {
                await system.dropDatabase(name);
            }
            finally {
                system.close();
            }
            await Promise.all(graphNames.map((name) => db.graph(name).drop()));
            await Promise.all(vertexCollectionNames
                .concat(edgeCollectionNames)
                .map((name) => db.collection<any>(name).drop()));
        });
        it("fetches_information_about_all_graphs", 0, async (done: Function) => {
            const graphs = await db.listGraphs();
            expect(graphs.length).assertEqual(graphNames.length);
            done();
        });
    });
}
