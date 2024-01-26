let __generate__Id: number = 0;
function generateId(): string {
    return "Transactions.test_" + ++__generate__Id;
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
export default function TransactionsTest() {
    const tag = "threeTest：";
    const range = (n: number): number[] => Array.from(Array(n).keys());
    const name = `testdb_${Date.now()}`;
    let system: Database;
    describe('TransactionsTest1', () => {
        const name = `testdb_${Date.now()}`;
        let db: Database;
        // 初始化数据库
        beforeAll(async () => {
            system = new Database(config.host);
            system.useBasicAuth(config.userInfo.username);
            db = await system.createDatabase(name);
        });
        afterAll(async () => {
            system.close();
            await system.dropDatabase(name);
        });
        it("should_execute_a_transaction_and_return_the_result", 0, async (done: Function) => {
            interface ParamType {
                params: string;
            }
            let params: ParamType = {
                params: "test"
            };
            const result: any = await db.executeTransaction([], "function (params) {return params;}", params);
            expect(result).assertEqual("test");
            done();
        });
    });
}
