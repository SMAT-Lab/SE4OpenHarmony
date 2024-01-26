let __generate__Id: number = 0;
function generateId(): string {
    return "SMTPPressDeplayTime.test_" + ++__generate__Id;
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
import { AUTH_METHODS, Message, MessageAttachment, MessageHeaders, SMTPClient } from '@ohos/emailjs';
import promptAction from '@ohos.promptAction';
import router from '@ohos.router';
import socket from '@ohos.net.socket';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import fs from '@ohos.file.fs';
export default function SMTPPressTest() {
    let from: string = 'xxx';
    let accountName: string = 'xxx';
    let to: string = 'xxx';
    let cc: string = 'xxx';
    let bcc: string = 'xxx';
    let subject: string = 'test';
    let content: string = 'test';
    //总的次数
    const BASE_COUNT = 10000;
    //每个用例延迟时间执行毫秒单位
    const deplayTime = 500;
    describe('SMTPPressTest', () => {
        for (let i = 1; i <= BASE_COUNT; i++) {
            it('new_SMTPClient', 0, function (done) {
                setTimeout(() => {
                    let client = new SMTPClient({
                        user: 'xxx',
                        password: 'xxx',
                        host: 'smtp.xxx.com',
                        port: 25,
                        timeout: 30000,
                        authentication: [AUTH_METHODS.LOGIN],
                        ssl: false,
                        tls: undefined
                    });
                    console.log("new_SMTPClient count:" + i);
                    done();
                }, deplayTime);
            });
            it('sendAsync', 0, function (done) {
                setTimeout(() => {
                    let client = new SMTPClient({
                        user: '',
                        password: '',
                        host: 'smtp.qq.com',
                        port: 25,
                        timeout: 30000,
                        authentication: [AUTH_METHODS.LOGIN],
                        ssl: false,
                        tls: undefined
                    });
                    let msg: Message | MessageHeaders = {
                        text: content,
                        from: `${accountName} <${from}>`,
                        to: to,
                        cc: cc,
                        bcc: cc,
                        subject: subject,
                        attachment: null
                    };
                    client.sendAsync(msg);
                    console.log("sendAsync count:" + i);
                    done();
                }, deplayTime);
            });
        }
    });
}
