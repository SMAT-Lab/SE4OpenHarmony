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

import LoginOption from '../../main/ets/bean/LoginOption';
import GlobalObj from '../../main/ets/GlobalObj';
import Imap, { inspect } from '@ohos/node-imap'
import DetailCallback from '../../main/ets/bean/DetailCallback';
import {
  ImapMessage,
  ImapMessageAttributes,
  ImapMessageBodyInfo,
  MyBuffer,
  MyStream
} from '../../main/ets/bean/ImapMessage';

export default class IMAPClientUtil {
  async login(readyCallback: () => void, errorCallback: (err: Error) => void, endCallback: () => void) {
    const ctx = this;
    try {
      if (GlobalObj?.getInstance()?.getClient()) {
        GlobalObj?.getInstance()?.getClient()?.once('ready', readyCallback);

        GlobalObj?.getInstance()?.getClient()?.on('error', errorCallback);

        GlobalObj?.getInstance()?.getClient()?.once('end', endCallback);
        await GlobalObj?.getInstance()?.getClient()?.connect();
      }
    } catch (err) {
      errorCallback(new Error(`账号登录出错：${err.message}`))
    }
  }

  getListData(startIndex: number, endIndex?: number | null, callback?: DetailCallback) {
    let command: string = '';
    if (endIndex != null) {
      command = `${startIndex}:${endIndex}`
    } else {
      command = `${startIndex}`
    }
    // fetch里面可以是fetch(`1:3`）这种取序号为1-3的信息的  也可以是可以是fetch(`1`）这种取序号为1的信息
    var f = GlobalObj?.getInstance()?.getClient()?.seq?.fetch(command, {
      bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
      struct: true
    });
    f?.on('message', (msg: ImapMessage, seqno: number) => {
      console.log('Message #%d', seqno);
      let prefix = '(#' + seqno + ') ';
      callback?.messageStartCallback(seqno)
      msg?.on('body', (stream: MyStream, info: ImapMessageBodyInfo) => {
        callback?.bodyStartCallback()
        stream?.on('data', (chunk: MyBuffer) => {
          callback?.bodyDataCallback(chunk.toString('utf8'))
        });
        stream?.once('end', () => {
          callback?.bodyEndCallback()
        });
      });
      msg?.once('attributes', (attrs: ImapMessageAttributes) => {
        callback?.attributesCallback(attrs)
      });
      msg?.once('end', () => {
        callback?.messageEndCallback()
      });
    });
    f?.on('error', (err: Error) => {
      callback?.fetchErrorCallback(err)
    });
    f?.once('end', () => {
      callback?.fetchEndCallback()
    });
  }
}