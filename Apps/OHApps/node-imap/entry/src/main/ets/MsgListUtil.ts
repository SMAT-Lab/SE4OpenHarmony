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
import GlobalObj from './GlobalObj';


export type SortCriteria =
| "ARRIVAL"
  | "-ARRIVAL"
  | "CC"
  | "-CC"
  | "DATE"
  | "-DATE"
  | "FROM"
  | "-FROM"
  | "SIZE"
  | "-SIZE"
  | "SUBJECT"
  | "-SUBJECT"
  | "TO"
  | "-TO";

export default class MsgListUtil {
  getListData(startIndex: number, endIndex: number,callback: DetailCallback) {
    // fetch里面可以是fetch(`1:3`）这种取序号为1-3的信息的  也可以是可以是fetch(`1`）这种取序号为1的信息
    var f = GlobalObj?.getInstance()?.getClient()?.seq?.fetch(`${startIndex}:${endIndex}`, {
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