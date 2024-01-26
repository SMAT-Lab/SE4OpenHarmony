let __generate__Id: number = 0;
function generateId(): string {
    return "Client.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it as _it, expect, diff } from '../utils/my_hypium';
import { config } from "../utils/config";
import Client from "ohos_newsie";
export default function ClientTest() {
    let client: Client;
    let greeting: any;
    describe('ClientTest', () => {
        beforeAll(async () => {
            client = new Client({ host: config.host, port: config.port });
            greeting = await client.connect();
        });
        afterAll(async () => {
            await client.quit();
        });
        _it('should_initialize_host', () => {
            expect(client._connection['_host']).to.equal(config.host);
        });
        _it('should_initialize_port', () => {
            expect(client._connection['_port']).to.equal(config.port);
        });
        _it('should_initialize_queue', () => {
            expect(diff(client._connection['_queue'], [])).to.equal(true);
        });
        _it('should_initialize_frames', () => {
            expect(client._connection['_frames']).to.equal('');
        });
        _it('client connects and disconnects from server', async () => {
            expect(greeting.code).toEqual(201);
            expect(greeting.comment).toEqual("Server ready - No posting allowed");
            expect(greeting.description).toEqual("Service available, posting prohibited");
        });
    });
}
