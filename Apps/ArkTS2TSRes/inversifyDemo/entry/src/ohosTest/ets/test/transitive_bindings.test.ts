let __generate__Id: number = 0;
function generateId(): string {
    return "transitive_bindings.test_" + ++__generate__Id;
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it as _it, expect } from '../utils/util';
import { Container, injectable, multiBindToService } from "inversify";
import * as ns from "reflect-metadata";
ns;
export default function transitive_bindingsTest() {
    describe('transitive_bindingsTest', () => {
        _it("Should_be_able_to_bind_to_a_service", () => {
            @injectable()
            class MySqlDatabaseTransactionLog {
                public time: number;
                public name: string;
                public constructor() {
                    this.time = new Date().getTime();
                    this.name = "MySqlDatabaseTransactionLog";
                }
            }
            @injectable()
            class DatabaseTransactionLog {
                public time!: number;
                public name!: string;
            }
            @injectable()
            class TransactionLog {
                public time!: number;
                public name!: string;
            }
            const container = new Container();
            container.bind(MySqlDatabaseTransactionLog).toSelf().inSingletonScope();
            container.bind(DatabaseTransactionLog).toService(MySqlDatabaseTransactionLog);
            container.bind(TransactionLog).toService(DatabaseTransactionLog);
            const mySqlDatabaseTransactionLog = container.get(MySqlDatabaseTransactionLog);
            const databaseTransactionLog = container.get(DatabaseTransactionLog);
            const transactionLog = container.get(TransactionLog);
            expect(mySqlDatabaseTransactionLog.name).to.eq("MySqlDatabaseTransactionLog");
            expect(databaseTransactionLog.name).to.eq("MySqlDatabaseTransactionLog");
            expect(transactionLog.name).to.eq("MySqlDatabaseTransactionLog");
            expect(mySqlDatabaseTransactionLog.time).to.eq(databaseTransactionLog.time);
            expect(databaseTransactionLog.time).to.eq(transactionLog.time);
        });
        _it("Should_be_able_to_bulk_bind_to_a_service", () => {
            @injectable()
            class MySqlDatabaseTransactionLog {
                public time: number;
                public name: string;
                public constructor() {
                    this.time = new Date().getTime();
                    this.name = "MySqlDatabaseTransactionLog";
                }
            }
            @injectable()
            class DatabaseTransactionLog {
                public time!: number;
                public name!: string;
            }
            @injectable()
            class TransactionLog {
                public time!: number;
                public name!: string;
            }
            const container = new Container();
            const mbts = multiBindToService(container);
            container.bind(MySqlDatabaseTransactionLog).toSelf().inSingletonScope();
            mbts(MySqlDatabaseTransactionLog)(DatabaseTransactionLog, TransactionLog);
            const mySqlDatabaseTransactionLog = container.get(MySqlDatabaseTransactionLog);
            const databaseTransactionLog = container.get(DatabaseTransactionLog);
            const transactionLog = container.get(TransactionLog);
            expect(mySqlDatabaseTransactionLog.name).to.eq("MySqlDatabaseTransactionLog");
            expect(databaseTransactionLog.name).to.eq("MySqlDatabaseTransactionLog");
            expect(transactionLog.name).to.eq("MySqlDatabaseTransactionLog");
            expect(mySqlDatabaseTransactionLog.time).to.eq(databaseTransactionLog.time);
            expect(databaseTransactionLog.time).to.eq(transactionLog.time);
        });
    });
}
