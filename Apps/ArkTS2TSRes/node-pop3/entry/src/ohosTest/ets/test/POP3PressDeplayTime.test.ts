let __generate__Id: number = 0;
function generateId(): string {
    return "POP3PressDeplayTime.test_" + ++__generate__Id;
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
import hilog from '@ohos.hilog';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@ohos/hypium';
import promptAction from '@ohos.promptAction';
import router from '@ohos.router';
import socket from '@ohos.net.socket';
import Pop3Command, { Pop3LoginBean } from '@ohos/node-pop3';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import MsgBean from '../../../../../entry/src/main/ets/MsgBean';
export default function POP3PressTest() {
    let message = 'Hello World';
    let account = 'xxx';
    let password = 'xxx';
    let mailType = '@qq.com';
    let textValue = '';
    let inputValue = 'click me';
    let secure = false;
    let listData: Array<string> = [];
    let client: Pop3Command = undefined;
    let selectMsgNum: number = -1;
    let isListShow: boolean = false;
    //总的次数
    const BASE_COUNT = 10000;
    //每个用例延迟时间执行毫秒单位
    const deplayTime = 500;
    describe('POP3PressTest', () => {
        for (let i = 1; i <= BASE_COUNT; i++) {
            it('LIST', 0, (done: Function) => {
                setTimeout(() => {
                    let option: Pop3LoginBean = {
                        host: 'pop.qq.com',
                        port: 110,
                        user: account + mailType,
                        password: password,
                        timeout: 30000,
                        servername: 'pop.qq.com',
                        tls: false,
                        tlsOptions: undefined
                    };
                    client = new Pop3Command(option);
                    let result = client.LIST();
                    done();
                }, deplayTime);
            });
            it('STAT', 0, (done: Function) => {
                setTimeout(() => {
                    let option: Pop3LoginBean = {
                        host: 'pop.qq.com',
                        port: 110,
                        user: account + mailType,
                        password: password,
                        timeout: 30000,
                        servername: 'pop.qq.com',
                        tls: false,
                        tlsOptions: undefined
                    };
                    client = new Pop3Command(option);
                    let result = client.STAT();
                    done();
                }, deplayTime);
            });
            it('NOOP', 0, (done: Function) => {
                setTimeout(() => {
                    let option: Pop3LoginBean = {
                        host: 'pop.qq.com',
                        port: 110,
                        user: account + mailType,
                        password: password,
                        timeout: 30000,
                        servername: 'pop.qq.com',
                        tls: false,
                        tlsOptions: undefined
                    };
                    client = new Pop3Command(option);
                    let result = client.NOOP();
                    done();
                }, deplayTime);
            });
            it('UIDL', 0, (done: Function) => {
                setTimeout(() => {
                    let option: Pop3LoginBean = {
                        host: 'pop.qq.com',
                        port: 110,
                        user: account + mailType,
                        password: password,
                        timeout: 30000,
                        servername: 'pop.qq.com',
                        tls: false,
                        tlsOptions: undefined
                    };
                    client = new Pop3Command(option);
                    let result = client.UIDL("1");
                    done();
                }, deplayTime);
            });
            it('RSET', 0, (done: Function) => {
                setTimeout(() => {
                    let option: Pop3LoginBean = {
                        host: 'pop.qq.com',
                        port: 110,
                        user: account + mailType,
                        password: password,
                        timeout: 30000,
                        servername: 'pop.qq.com',
                        tls: false,
                        tlsOptions: undefined
                    };
                    client = new Pop3Command(option);
                    let result = client.RSET();
                    done();
                }, deplayTime);
            });
            it('RETR', 0, (done: Function) => {
                setTimeout(() => {
                    let option: Pop3LoginBean = {
                        host: 'pop.qq.com',
                        port: 110,
                        user: account + mailType,
                        password: password,
                        timeout: 30000,
                        servername: 'pop.qq.com',
                        tls: false,
                        tlsOptions: undefined
                    };
                    client = new Pop3Command(option);
                    let result = client.RETR("1");
                    done();
                }, deplayTime);
            });
            it('DELE', 0, (done: Function) => {
                setTimeout(() => {
                    let option: Pop3LoginBean = {
                        host: 'pop.qq.com',
                        port: 110,
                        user: account + mailType,
                        password: password,
                        timeout: 30000,
                        servername: 'pop.qq.com',
                        tls: false,
                        tlsOptions: undefined
                    };
                    client = new Pop3Command(option);
                    let result = client.DELE("1");
                    done();
                }, deplayTime);
            });
            it('QUIT', 0, (done: Function) => {
                setTimeout(() => {
                    let option: Pop3LoginBean = {
                        host: 'pop.qq.com',
                        port: 110,
                        user: account + mailType,
                        password: password,
                        timeout: 30000,
                        servername: 'pop.qq.com',
                        tls: false,
                        tlsOptions: undefined
                    };
                    client = new Pop3Command(option);
                    let result = client.QUIT();
                    done();
                }, deplayTime);
            });
            it('connect', 0, (done: Function) => {
                setTimeout(() => {
                    let option: Pop3LoginBean = {
                        host: 'pop.qq.com',
                        port: 110,
                        user: account + mailType,
                        password: password,
                        timeout: 30000,
                        servername: 'pop.qq.com',
                        tls: false,
                        tlsOptions: undefined
                    };
                    client = new Pop3Command(option);
                    let result = client.connect();
                    done();
                }, deplayTime);
            });
            it('TOP', 0, (done: Function) => {
                setTimeout(() => {
                    let option: Pop3LoginBean = {
                        host: 'pop.qq.com',
                        port: 110,
                        user: account + mailType,
                        password: password,
                        timeout: 30000,
                        servername: 'pop.qq.com',
                        tls: false,
                        tlsOptions: undefined
                    };
                    client = new Pop3Command(option);
                    let result = client.TOP("1");
                    done();
                }, deplayTime);
            });
            it('command', 0, (done: Function) => {
                setTimeout(() => {
                    let option: Pop3LoginBean = {
                        host: 'pop.qq.com',
                        port: 110,
                        user: account + mailType,
                        password: password,
                        timeout: 30000,
                        servername: 'pop.qq.com',
                        tls: false,
                        tlsOptions: undefined
                    };
                    client = new Pop3Command(option);
                    let result = client.command("NOOP");
                    console.log("command count:" + i);
                    done();
                }, deplayTime);
            });
        }
    });
}
