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
import LoginOption from './bean/LoginOption';
import GlobalObj from './GlobalObj';
import Imap, { inspect } from '@ohos/node-imap';
export default class LoginUtil {
    async login(option: LoginOption, readyCallback: () => void, errorCallback: (err: Error) => void, endCallback: () => void) {
        const ctx = this;
        try {
            if (!GlobalObj?.getInstance()?.getClient()) {
                if (option.secure) {
                    let client = new Imap({
                        user: option.account + option.mailType,
                        password: option.password,
                        host: `imap.${option.hostParam}.com`,
                        port: 993,
                        tls: true,
                        tlsOptions: option.tlsOption,
                        socketTimeout: 60000,
                        connTimeout: 60000,
                        authTimeout: 60000,
                        keepalive: true,
                    });
                    GlobalObj?.getInstance()?.setClient(client);
                }
                else {
                    let client = new Imap({
                        user: option.account + option.mailType,
                        password: option.password,
                        host: `imap.${option.hostParam}.com`,
                        port: 143,
                        tls: false,
                        tlsOptions: null,
                        socketTimeout: 60000,
                        connTimeout: 60000,
                        authTimeout: 60000,
                        keepalive: true,
                    });
                    GlobalObj?.getInstance()?.setClient(client);
                }
            }
            if (GlobalObj?.getInstance()?.getClient()) {
                console.log(`login-imap---客户端初始化成功，参数：${JSON.stringify(GlobalObj?.getInstance()?.getClient()._config)}`);
                GlobalObj?.getInstance()?.getClient()?.once('ready', readyCallback);
                GlobalObj?.getInstance()?.getClient()?.on('error', errorCallback);
                GlobalObj?.getInstance()?.getClient()?.once('end', endCallback);
                await GlobalObj?.getInstance()?.getClient()?.connect();
            }
        }
        catch (err) {
            errorCallback(new Error(`账号登录出错：${err.message}`));
        }
    }
}
