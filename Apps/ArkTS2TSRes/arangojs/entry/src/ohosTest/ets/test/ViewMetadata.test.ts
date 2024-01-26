let __generate__Id: number = 0;
function generateId(): string {
    return "ViewMetadata.test_" + ++__generate__Id;
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
export default function ViewMetadataTest() {
    const dbName = `testdb_${Date.now()}`;
    const viewName = `view-${Date.now()}`;
    let system: Database, db: Database;
    let view: any;
    describe('ViewMetadataTest1', () => {
        // 初始化数据库
        beforeAll(async () => {
            system = new Database(config.host);
            system.useBasicAuth(config.userInfo.username);
            await system.createDatabase(dbName);
            db = system.database(dbName);
            view = db.view(viewName);
            await view.create({
                type: "arangosearch"
            });
            await db.waitForPropagation({
                path: `/_api/view/${view.name}`
            }, 10000);
        });
        afterAll(async () => {
            await system.dropDatabase(dbName);
        });
        it("should_return_information_about_a_view", 0, async () => {
            expect(await view.get()).to.have.property("name", viewName);
            expect(await view.get()).to.have.property("id");
            expect(await view.get()).to.have.property("type", "arangosearch");
        });
        it("should_throw_if_view_does_not_exists", 0, async () => {
            try {
                await db.view("no").get();
            }
            catch (err) {
                expect(err).to.have.property("errorNum", 1203);
                return;
            }
            expect(1).to.equal(2);
        });
        it("should_return_properties_of_a_view", 0, async () => {
            const properties: any = (await view.properties());
            expect(properties).to.have.property("name", viewName);
            expect(properties).to.have.property("id");
            expect(properties).to.have.property("type", "arangosearch");
            expect(properties).to.have.property("links");
            expect(properties).to.have.property("cleanupIntervalStep");
            expect(properties).to.have.property("consolidationPolicy");
            expect(properties).to.have.property("consolidationIntervalMsec");
            expect(properties.consolidationPolicy).to.have.property("type");
        });
    });
}
