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
class MessageItem {
    constructor() {
    }
    set total(totalNum: number) {
        this.total = totalNum;
    }
    set new(newNum: number) {
        this.new = newNum;
    }
    set unseen(unseenNum: number) {
        this.unseen = unseenNum;
    }
    get total(): number {
        return this.total;
    }
    get new(): number {
        return this.new;
    }
    get unseen(): number {
        return this.unseen;
    }
}
export default class StatusBean {
    set name(nameStr: string) {
        this.name = nameStr;
    }
    set uidnext(uid: string) {
        this.uidnext = uid;
    }
    set uidvilidity(vilidity: string) {
        this.uidvilidity = vilidity;
    }
    set messages(msg: MessageItem) {
        this.messages = msg;
    }
}
