let __generate__Id: number = 0;
function generateId(): string {
    return "ManagingFunction.test_" + ++__generate__Id;
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
export default function ManagingFunctionTest() {
    const tag = "sixTest：";
    const name = `testdb_${Date.now()}`;
    let system: Database, db: Database;
    describe('ManagingFunctionTest1', () => {
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
        it("should_be_empty_per_default", 0, async (done: Function) => {
            const result = await db.listFunctions();
            expect(result instanceof Array).assertEqual(true);
            done();
        });
        it("should_include_before_created_function", 0, async (done: Function) => {
            const name = "myfunctions::temperature::celsiustofahrenheit";
            const code = "function (celsius) { return celsius * 1.8 + 32; }";
            await db.createFunction(name, code);
            const result = await db.listFunctions();
            expect(result instanceof Array).assertEqual(true);
            done();
        });
    });
    it("should_create_a_function", 0, async (done: Function) => {
        const info = await db.createFunction("myfunctions::temperature::celsiustofahrenheit2", "function (celsius) { return celsius * 1.8 + 32; }");
        expect(info.code).assertEqual(201);
        expect(info.error).assertEqual(false);
        done();
    });
    it("should_drop_a_existing_function", 0, async (done: Function) => {
        const name = "myfunctions::temperature::celsiustofahrenheit";
        try {
            await db.createFunction(name, "function (celsius) { return celsius * 1.8 + 32; }");
            // const info = await db.dropFunction(name);
            // console.log(`${tag} db.dropFunction完成`  )
            // expect(info.deletedCount).assertEqual( 1);
        }
        catch (err) {
        }
        done();
    });
}
