let __generate__Id: number = 0;
function generateId(): string {
    return "ManipulatingAnalyzers.test_" + ++__generate__Id;
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
import { CreateAnalyzerOptions } from 'library/src/main/ets/dist/analyzer';
import { config } from "../config/config";
import { expect } from "../utils/utils";
function waitForAnalyzer(db: Database, name: string) {
    return db.waitForPropagation({ path: `/_api/analyzer/${name}` }, 30000);
}
export default function ManipulatingAnalyzersTest() {
    const name = `testdb_${Date.now()}`;
    let system: Database, db: Database;
    describe('ManipulatingAnalyzersTest1', () => {
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
        it("indicates_whether_the_analyzer_exists", 0, async (done: Function) => {
            const analyzer = db.analyzer(`a_${Date.now()}`);
            expect(await analyzer.exists()).to.equal(false);
            await analyzer.create<CreateAnalyzerOptions>({
                type: "identity"
            });
            await waitForAnalyzer(db, analyzer.name);
            expect(await analyzer.exists()).to.equal(true);
            done();
        });
        it("creates_the_analyzer", 0, async (done: Function) => {
            const analyzer = db.analyzer(`a_${Date.now()}`);
            await analyzer.create<CreateAnalyzerOptions>({
                type: "identity"
            });
            await waitForAnalyzer(db, analyzer.name);
            const data = await analyzer.get();
            expect(data).to.have.property("name", `${name}::${analyzer.name}`);
            expect(data).to.have.property("type", "identity");
            done();
        });
        it("destroys_the_analyzer", 0, async (done: Function) => {
            const analyzer = db.analyzer(`a_${Date.now()}`);
            await analyzer.create<CreateAnalyzerOptions>({
                type: "identity"
            });
            await waitForAnalyzer(db, analyzer.name);
            await analyzer.drop();
            expect(await analyzer.exists()).to.equal(false);
            done();
        });
    });
}
