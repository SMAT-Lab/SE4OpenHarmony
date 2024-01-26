let __generate__Id: number = 0;
function generateId(): string {
    return "Ability.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { describe, it, expect } from '@ohos/hypium';
import { StunServer, StunClient } from '@ohos/stun';
import { Utils } from '@ohos/stun/src/main/ets/common/node-stun/lib/Utils';
import { OnClientMessageListener } from '@ohos/stun/src/main/ets/common/node-stun/bin/StunClient';
import { OnServerMessageListener } from '@ohos/stun/src/main/ets/common/node-stun/bin/StunServer';
export default function abilityTest() {
    describe('ActsAbilityTest', () => {
        class Default {
            host: string = '';
            port: string = '';
        }
        it('assertinetAton01', 0, () => {
            let num = Utils.inetAton("2.2");
            expect(num == 1536).assertFalse();
        });
        it('assertinetAton02', 0, () => {
            let num = Utils.inetAton("192.168.43.153");
            expect(num).assertEqual(3232246681);
        });
        it('assertinetAton03', 0, () => {
            let num = Utils.inetAton("127.0.0.1");
            expect(num).assertEqual(2130706433);
        });
        it('assertinetAton04', 0, () => {
            let num = Utils.inetAton("192.163.2.1");
            expect(num).assertEqual(3231908353);
        });
        it('assertBufferCompare01', 0, () => {
            let flag: boolean = Utils.bufferCompare("CQ", "CQ");
            expect(flag).assertTrue();
        });
        it('assertBufferCompare02', 0, () => {
            let flag: boolean = Utils.bufferCompare("", "");
            expect(flag).assertTrue();
        });
        it('assertBufferCompare03', 0, () => {
            let flag: boolean = Utils.bufferCompare("A", "B");
            expect(flag).assertFalse();
        });
        it('assertBufferCompare04', 0, () => {
            let flag: boolean = Utils.bufferCompare('function', 'function');
            expect(flag).assertTrue();
        });
        it('asserteInetNtoa01', 0, () => {
            let d = Utils.inetNtoa(100);
            expect(d == "200").assertFalse();
        });
        it('asserteInetNtoa02', 0, () => {
            let d = Utils.inetNtoa(1024);
            expect(d).assertEqual('0.0.4.0');
        });
        it('asserteInetNtoa03', 0, () => {
            let d = Utils.inetNtoa(0);
            expect(d).assertEqual('0.0.0.0');
        });
        it('asserteInetNtoa04', 0, () => {
            let d = Utils.inetNtoa(99);
            expect(d).assertEqual('0.0.0.99');
        });
        it('assertBuffer', 0, () => {
            let Buffer = new ArrayBuffer(100);
            let teststring = Utils.buffer2String(Buffer);
            expect(teststring == "str").assertFalse();
        });
        it('setServerMessageListener', 0, (done: any) => {
            let stunServer = new StunServer();
            let onServerMessageListener: OnServerMessageListener | any;
            let teststring = stunServer.setServerMessageListener(onServerMessageListener);
            expect(teststring).assertUndefined();
            done();
        });
        it('createServer01', 0, () => {
            let stunServer = new StunServer();
            let createServer = stunServer.createServer({ primary: { host: "127.0.0.1", port: "3478" } as Default, secondary: { host: "127.0.0.2", port: "3479" } as Default });
            expect(createServer).assertUndefined();
        });
        it('createServer02', 0, () => {
            let stunServer = new StunServer();
            let createServer = stunServer.createServer();
            expect(createServer).assertUndefined();
        });
        it('createServer03', 0, () => {
            let stunServer = new StunServer();
            let createServer = stunServer.createServer(undefined);
            expect(createServer).assertUndefined();
        });
        it('createServer04', 0, () => {
            let stunServer = new StunServer();
            let createServer = stunServer.createServer({ primary: { host: "192.168.43.25", port: "1235" } as Default, secondary: { host: "192.168.35.10", port: "3201" } as Default });
            expect(createServer).assertUndefined();
        });
        it('createClient01', 0, () => {
            let stunClient = new StunClient();
            let createClient = stunClient.createClient('192.168.43.153', { host: "127.0.0.1", port: "3478" });
            expect(createClient).assertUndefined();
        });
        it('createClient02', 0, () => {
            let stunClient = new StunClient();
            let createClient = stunClient.createClient(' ');
            expect(createClient).assertUndefined();
        });
        it('createClient03', 0, () => {
            let stunClient = new StunClient();
            let createClient = stunClient.createClient('123');
            expect(createClient).assertUndefined();
        });
        it('createClient04', 0, () => {
            let stunClient = new StunClient();
            let createClient = stunClient.createClient('127.0.0.1');
            expect(createClient).assertUndefined();
        });
        it('setClientMessageListener', 0, () => {
            let stunClient = new StunClient();
            let onClientMessageListener: OnClientMessageListener | any;
            let setClientMessageListener = stunClient.setClientMessageListener(onClientMessageListener);
            expect(setClientMessageListener).assertUndefined();
        });
    });
}
