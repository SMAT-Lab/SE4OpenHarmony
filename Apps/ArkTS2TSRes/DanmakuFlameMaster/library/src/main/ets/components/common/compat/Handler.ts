let __generate__Id: number = 0;
function generateId(): string {
    return "Handler_" + ++__generate__Id;
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
// 基于setTimeout的Handler实现
// 可设置消息延时响应时间
// 可移除尚未处理的消息
// setTimeout使用的是js的MacroTask事件队列, 为单线程异步 非多线程实现(注意避免耗时操作)
// 除handleMessage外,其他方法不需要重写
export class Handler {
    // record timeout ids, for abort future tasks by removeMessages()/removeCallbacks()
    private msgRecords: Map<number, number[]> = new Map;
    private runnableRecords: Map<() => void, number[]> = new Map;
    private updateMsgRecords(what: number, add: boolean, taskId: number) {
        let ids: number[] | undefined = this.msgRecords.get(what);
        if (add) {
            if (!ids) {
                ids = [];
                this.msgRecords.set(what, ids);
            }
            ids.push(taskId);
        }
        else {
            if (ids) {
                for (let i = 0; i < ids.length; i++) {
                    if (ids[i] === taskId) {
                        ids.splice(i, 1);
                    }
                }
                if (ids.length === 0) {
                    this.msgRecords.delete(what);
                }
            }
        }
    }
    private updateRunnableRecords(r: () => void, add: boolean, taskId: number) {
        let ids: number[] | undefined = this.runnableRecords.get(r);
        if (add) {
            if (!ids) {
                ids = [];
                this.runnableRecords.set(r, ids);
            }
            ids.push(taskId);
        }
        else {
            if (ids) {
                for (let i = 0; i < ids.length; i++) {
                    if (ids[i] === taskId) {
                        ids.splice(i, 1);
                    }
                }
                if (ids.length === 0) {
                    this.runnableRecords.delete(r);
                }
            }
        }
    }
    private dispatchMessage(msg: Message): void {
        if (msg.callback) {
            msg.callback();
        }
        else {
            this.handleMessage(msg);
        }
    }
    handleMessage(msg: Message): void {
    }
    sendMessage(msg: Message) {
        this.sendMessageDelayed(msg, 0);
    }
    sendEmptyMessageDelayed(what: number, delay: number) {
        this.sendMessageDelayed(new Message({ what: what }), delay);
    }
    sendEmptyMessage(what: number) {
        this.sendMessage(new Message({ what: what }));
    }
    // 延迟发送消息
    sendMessageDelayed(msg: Message, delay: number) {
        let taskId: number = setTimeout(() => {
            this.updateMsgRecords(msg.what, false, taskId);
            this.dispatchMessage(msg);
        }, delay);
        this.updateMsgRecords(msg.what, true, taskId);
    }
    // 删除消息
    removeMessages(what: number) {
        let ids: number[] | undefined = this.msgRecords.get(what);
        if (ids) {
            while (ids.length > 0) {
                let taskId = ids.shift();
                clearTimeout(taskId);
            }
            this.msgRecords.delete(what);
        }
    }
    post(r: () => void) {
        this.postDelayed(r, 0);
    }
    postDelayed(r: () => void, delay: number) {
        let taskId = setTimeout(() => {
            this.updateRunnableRecords(r, false, taskId);
            if (r) {
                r();
            }
        }, delay);
        this.updateRunnableRecords(r, true, taskId);
    }
    // 删除回调
    removeCallbacks(r: () => void) {
        let ids: number[] | undefined = this.runnableRecords.get(r);
        if (ids) {
            while (ids.length > 0) {
                let taskId = ids.shift();
                clearTimeout(taskId);
            }
            this.runnableRecords.delete(r);
        }
    }
    removeCallbacksAndMessages() {
        Array.from(this.msgRecords.keys())
            .forEach((what: number) => {
            this.removeMessages(what);
        });
        Array.from(this.runnableRecords.keys())
            .forEach((r: () => void) => {
            this.removeCallbacks(r);
        });
    }
}
class Args {
    what: number = 0;
    obj?: any;
    callback?: () => void;
}
export class Message {
    what: number = 0;
    obj: any;
    callback?: () => void = () => { };
    constructor(args: Args) {
        this.what = args.what;
        this.obj = args.obj;
        this.callback = args.callback;
    }
}
