interface Index_Params {
    message?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
var libworker, { Message } = globalThis.requireNapi("worker", true);
import worker, { MessageEvents, ErrorEvent } from '@ohos.worker';
const workerInstance = new worker.ThreadWorker('entry/ets/pages/workers/worker.ts');
workerInstance.onmessage = (e: MessageEvents): void => {
    let info: string = e.data;
    console.log("main thread onmessage" + info);
};
workerInstance.onexit = () => {
    console.log("main thread exit");
};
workerInstance.onerror = (err: ErrorEvent) => {
    console.log("main thread error");
};
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            for (let i = 0; i < 100; i++) {
                let test = new Message("hello");
                workerInstance.postMessage("start");
                libworker.AsyncTaskMessageReturnMessage(test, "one").then((result: Message) => {
                    console.log("main thread " + result.message);
                });
            }
        });
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));