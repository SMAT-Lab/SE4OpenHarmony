let __generate__Id: number = 0;
function generateId(): string {
    return "Routes.test_" + ++__generate__Id;
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
interface Body {
    version: string;
    server: string;
    details?: string;
}
export default function RoutesTest() {
    const tag = "threeTest：";
    const name = `testdb_${Date.now()}`;
    let system: Database, db: Database;
    let collection: any;
    describe('RoutesTest1', () => {
        // 初始化数据库
        beforeAll(async () => {
            system = new Database(config.host);
            system.useBasicAuth(config.userInfo.username);
            db = await system.createDatabase(name);
            collection = await db.createCollection<any>(`c_${Date.now()}`);
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
            await collection.truncate();
        });
        it("should_concat_path", 0, () => {
            const route = db.route("/_api").route("/version");
            expect(route["_path"]).assertEqual("/_api/version");
        });
        it("should_be_executed_using_the_route_path", 0, async (done: Function) => {
            const res = await db.route("/_api/version").get();
            expect(Boolean<Body>(res.body)).assertTrue();
            const body: Body = res.body;
            expect(Boolean<string>(body.version)).assertTrue();
            expect(Boolean<string>(body.server)).assertTrue();
            done();
        });
        it("should_concat_path_to_route_path", 0, async (done: Function) => {
            const res = await db.route("/_api").get("/version");
            expect(Boolean<Body>(res.body)).assertTrue();
            const body: Body = res.body;
            expect(Boolean<string>(body.version)).assertTrue();
            expect(Boolean<string>(body.server)).assertTrue();
            done();
        });
        it("should_passes_query_parameters", 0, async (done: Function) => {
            const res = await db.route("/_api").get("/version", {
                details: true
            });
            expect(Boolean<Body>(res.body)).assertTrue();
            const body: Body = res.body;
            expect(Boolean<string>(body.version)).assertTrue();
            expect(Boolean<string>(body.server)).assertTrue();
            expect(Boolean<string>(body.details)).assertTrue();
            done();
        });
    });
}
