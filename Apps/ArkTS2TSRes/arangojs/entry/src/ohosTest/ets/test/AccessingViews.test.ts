let __generate__Id: number = 0;
function generateId(): string {
    return "AccessingViews.test_" + ++__generate__Id;
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
export default function AccessingViewsTest() {
    const name = `testdb_${Date.now()}`;
    let system: Database, db: Database;
    const range = (n: number): number[] => Array.from(Array(n).keys());
    const viewNames = range(4).map((i) => `v_${Date.now()}_${i}`);
    describe('AccessingViewsTest1', () => {
        // 初始化数据库
        beforeAll(async () => {
            system = new Database(config.host);
            system.useBasicAuth(config.userInfo.username);
            db = await system.createDatabase(name);
            await Promise.all(viewNames.map(async (name) => {
                const view = db.view(name);
                await view.create({
                    type: "arangosearch"
                });
                await db.waitForPropagation({
                    path: `/_api/view/${view.name}`
                }, 10000);
            }));
        });
        afterAll(async () => {
            try {
                await Promise.all(viewNames.map((name) => db.view(name).drop()));
                await system.dropDatabase(name);
            }
            finally {
                system.close();
            }
        });
        it("fetches_information_about_all_views", 0, async (done: Function) => {
            const views = await db.listViews();
            expect(views.length).to.equal(viewNames.length);
            expect(views.map((v) => v.name).sort()).to.eql(viewNames);
            done();
        });
    });
}
