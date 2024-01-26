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
import DetailCallback from './bean/DetailCallback';
import { ImapMessage, ImapMessageAttributes, ImapMessageBodyInfo, MyBuffer, MyStream } from './bean/ImapMessage';
import LoginOption from './bean/LoginOption';
import GlobalObj from './GlobalObj';
import Imap, { inspect } from '@ohos/node-imap';
const BASE_COUNT = 1;
export default class TestInterfaceUtil {
    async login(option: LoginOption, readyCallback: () => void, errorCallback: (err: Error) => void, endCallback: () => void) {
        const ctx = this;
        try {
            if (!GlobalObj?.getInstance()?.getClient()) {
                if (option.secure) {
                    let client = new Imap({
                        user: option.account,
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
                        user: option.account,
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
            console.log(`客户端初始化成功，参数：${JSON.stringify(GlobalObj?.getInstance()?.getClient()?._config)}`);
            if (GlobalObj?.getInstance()?.getClient()) {
                GlobalObj?.getInstance()?.getClient()?.once('ready', readyCallback);
                GlobalObj?.getInstance()?.getClient()?.on('error', errorCallback);
                GlobalObj?.getInstance()?.getClient()?.once('end', endCallback);
                console.log('开始连接服务器');
                let startTime1 = new Date().getTime();
                await GlobalObj?.getInstance()?.getClient().connect();
                let endTime1 = new Date().getTime();
                let averageTime1 = ((endTime1 - startTime1) * 1000) / BASE_COUNT;
                console.log("IMAPClientTest : connect averageTime : " + averageTime1 + "us");
                console.log('服务器连接成功');
            }
        }
        catch (err) {
            errorCallback(new Error(`账号登录出错：${err.message}`));
        }
    }
    getListData(startIndex: number, endIndex: number, callback: DetailCallback) {
        // fetch里面可以是fetch(`1:3`）这种取序号为1-3的信息的  也可以是可以是fetch(`1`）这种取序号为1的信息
        var f = GlobalObj?.getInstance()?.getClient()?.seq?.fetch(`${startIndex}:${endIndex}`, {
            bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
            struct: true
        });
        f?.on('message', (msg: ImapMessage, seqno: number) => {
            console.log('Message #%d', seqno);
            let prefix = '(#' + seqno + ') ';
            callback?.messageStartCallback(seqno);
            msg?.on('body', (stream: MyStream, info: ImapMessageBodyInfo) => {
                callback?.bodyStartCallback();
                stream?.on('data', (chunk: MyBuffer) => {
                    callback?.bodyDataCallback(chunk.toString('utf8'));
                });
                stream?.once('end', () => {
                    callback?.bodyEndCallback();
                });
            });
            msg?.once('attributes', (attrs: ImapMessageAttributes) => {
                callback?.attributesCallback(attrs);
            });
            msg?.once('end', () => {
                callback?.messageEndCallback();
            });
        });
        f?.on('error', (err: Error) => {
            callback?.fetchErrorCallback(err);
        });
        f?.once('end', () => {
            callback?.fetchEndCallback();
        });
    }
    getDetail(clickIndex: number, callback: DetailCallback) {
        var f = GlobalObj?.getInstance()?.getClient()?.seq?.fetch(`${clickIndex}`, {
            bodies: 'TEXT',
            struct: true
        });
        f?.on('message', (msg: ImapMessage, seqno: number) => {
            console.log('Message #%d', seqno);
            let prefix = '(#' + seqno + ') ';
            callback?.messageStartCallback(seqno);
            msg?.on('body', (stream: MyStream, info: ImapMessageBodyInfo) => {
                callback?.bodyStartCallback();
                stream?.on('data', (chunk: MyBuffer) => {
                    callback?.bodyDataCallback(chunk.toString('utf8'));
                });
                stream?.once('end', () => {
                    callback?.bodyEndCallback();
                });
            });
            msg?.once('attributes', (attrs: ImapMessageAttributes) => {
                callback?.attributesCallback(attrs);
            });
            msg?.once('end', () => {
                callback?.messageEndCallback();
            });
        });
        f?.on('error', (err: Error) => {
            callback?.fetchErrorCallback(err);
        });
        f?.once('end', () => {
            callback?.fetchEndCallback();
        });
    }
}
