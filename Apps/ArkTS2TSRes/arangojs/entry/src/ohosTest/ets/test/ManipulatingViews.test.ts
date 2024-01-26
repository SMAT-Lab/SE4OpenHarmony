let __generate__Id: number = 0;
function generateId(): string {
    return "ManipulatingViews.test_" + ++__generate__Id;
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
import { View, ViewProperties } from "library/src/main/ets/dist/view";
import { ArangoApiResponse } from 'library/src/main/ets/dist/connection';
import { replaceProperties } from './view';
export default function ManipulatingViewsTest() {
    const name = `testdb_${Date.now()}`;
    let system: Database, db: Database;
    let view: View;
    describe('ManipulatingViewsTest1', () => {
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
            view = db.view(`v-${Date.now()}`);
            await view.create({
                type: "arangosearch"
            });
            await db.waitForPropagation({
                path: `/_api/view/${view.name}`
            }, 10000);
        });
        afterEach(async () => {
            try {
                await view.get();
            }
            catch (e) {
                return;
            }
            await view.drop();
        });
        it("creates_a_new_arangosearch_view", 0, async (done: Function) => {
            const view = db.view(`asv-${Date.now()}`);
            await view.create({
                type: "arangosearch"
            });
            await db.waitForPropagation({
                path: `/_api/view/${view.name}`
            }, 10000);
            const info = await view.get();
            expect(info).to.have.property("name", view.name);
            expect(info).to.have.property("type", "arangosearch");
            done();
        });
        // const title1 = "should not overwrite properties";
        // it(title1,0, async (done) => {
        //   const initial = (await view.properties()) ;
        //   expect(initial.consolidationIntervalMsec).not.to.equal(45000);
        //   const oldProps = await view.updateProperties({
        //     consolidationIntervalMsec: 45000,
        //     commitIntervalMsec: 45000,
        //   });
        //   console.log(`JZZ-----------------oldProps:${JSON.stringify(oldProps)}`)
        //   expect(oldProps.consolidationIntervalMsec).to.equal(45000);
        //   const properties = await view.updateProperties({
        //     commitIntervalMsec: 30000,
        //   });
        //   expect(properties.consolidationIntervalMsec).to.equal(45000);
        //   expect(properties.commitIntervalMsec).to.equal(30000);
        //   done()
        // });
        it("should_overwrite_properties", 0, async (done: Function) => {
            const initial: any = (await view.properties());
            expect(initial.consolidationIntervalMsec).not.to.equal(45000);
            const oldProps: any = await replaceProperties(view, {
                consolidationIntervalMsec: 45000,
                commitIntervalMsec: 45000,
            });
            expect(oldProps.consolidationIntervalMsec).to.equal(45000);
            const properties: any = await replaceProperties(view, {
                commitIntervalMsec: 30000,
            });
            expect(properties.consolidationIntervalMsec).to.equal(initial.consolidationIntervalMsec);
            expect(properties.commitIntervalMsec).to.equal(30000);
            done();
        });
        it("should_rename_a_view", 0, async () => {
            const name = `v2-${Date.now()}`;
            const res = await db.route("/_admin/server/role").get();
            if (res.body.role === "SINGLE") {
                // view renaming is only implemented for single servers
                // eslint-disable-next-line security/detect-non-literal-fs-filename
                const info = await view.rename(name);
                expect(info).to.have.property("name", name);
            }
            else {
                try {
                    // eslint-disable-next-line security/detect-non-literal-fs-filename
                    await view.rename(name);
                }
                catch (e) {
                    // "unsupported operation" in cluster
                    expect(e).to.have.property("errorNum", 1470);
                    return;
                }
                expect(1).to.equal(2);
            }
        });
        it("should_drop_a_view", 0, async () => {
            await view.drop();
            try {
                await view.get();
            }
            catch (e) {
                expect(e).to.have.property("errorNum", 1203);
                return;
            }
            expect(1).to.equal(2);
        });
    });
}
