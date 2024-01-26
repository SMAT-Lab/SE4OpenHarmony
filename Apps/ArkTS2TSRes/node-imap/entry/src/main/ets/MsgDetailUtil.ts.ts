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
import GlobalObj from './GlobalObj';
import DetailCallback from './bean/DetailCallback';
import { ImapMessage, ImapMessageAttributes, ImapMessageBodyInfo, MyBuffer, MyStream } from './bean/ImapMessage';
export default class MsgDetailUtil {
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
