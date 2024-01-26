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
export class Message {
    what: number;
    obj: any;
    data = new Map();
    constructor(what?: number, obj?: any, data?: any) {
        this.what = what;
        this.obj = obj;
        this.data = data;
    }
    public setData(data: Map<any, any>) {
        this.data = data;
    }
    public getData(): Map<any, any> {
        return this.data;
    }
}
//export abstract class Handler {
//  public abstract handleMessage(msg: Message): void;
//
//  private messageTimoutMap = new Map<number, number>(); // <msgWhat, timeoutHandle>
//
//  public sendMessage(msg: Message) {
//    this.sendMessageDelayed(msg, 0);
//  }
//
//  public sendMessageDelayed(msg: Message, delay: number) {
//    let handle = setTimeout(() => {
//      this.messageTimoutMap.delete(msg.what);
//      this.handleMessage(msg);
//    }, delay);
//    this.messageTimoutMap.set(msg.what, handle);
//  }
//
//  public removeMessages(what: number): void {
//    if (this.messageTimoutMap.has(what)) {
//      clearTimeout(this.messageTimoutMap.get(what));
//      this.messageTimoutMap.delete(what);
//    }
//  }
//
//  public removeAllMessage(): void {
//    for (let [key, value] of this.messageTimoutMap.entries()) {
//      this.messageTimoutMap.delete(key);
//      clearTimeout(value);
//    }
//  }
//
//  public obtainMessage(what?: number, obj?: any): Message {
//    if (what != undefined) {
//      if (obj != undefined) {
//        return new Message(what, obj);
//      } else {
//        return new Message(what);
//      }
//    } else {
//      return new Message();
//    }
//  }
//}
