interface Index_Params {
    message?: string;
    message2?: string;
    changedMsg?: string;
    changedMsg2?: string;
    hint1?: string;
    hint2?: string;
    data1?: string;
    data2?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Second_" + ++__generate__Id;
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
import { test1, test2, test3, test4, test5, test6, test7, test8, test9, test10 } from './testAmf';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('AMF.stringify和AMF.parse,点击后看展示', this, "message");
        this.__message2 = new ObservedPropertySimple('AMF.serialize和AMF.deserialize,点击后看展示', this, "message2");
        this.__changedMsg = new ObservedPropertySimple('待转换', this, "changedMsg");
        this.__changedMsg2 = new ObservedPropertySimple('待转换', this, "changedMsg2");
        this.__hint1 = new ObservedPropertySimple('转换后数据', this, "hint1");
        this.__hint2 = new ObservedPropertySimple('转换后数据', this, "hint2");
        this.__data1 = new ObservedPropertySimple('', this, "data1");
        this.__data2 = new ObservedPropertySimple('', this, "data2");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.message2 !== undefined) {
            this.message2 = params.message2;
        }
        if (params.changedMsg !== undefined) {
            this.changedMsg = params.changedMsg;
        }
        if (params.changedMsg2 !== undefined) {
            this.changedMsg2 = params.changedMsg2;
        }
        if (params.hint1 !== undefined) {
            this.hint1 = params.hint1;
        }
        if (params.hint2 !== undefined) {
            this.hint2 = params.hint2;
        }
        if (params.data1 !== undefined) {
            this.data1 = params.data1;
        }
        if (params.data2 !== undefined) {
            this.data2 = params.data2;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__message2.aboutToBeDeleted();
        this.__changedMsg.aboutToBeDeleted();
        this.__changedMsg2.aboutToBeDeleted();
        this.__hint1.aboutToBeDeleted();
        this.__hint2.aboutToBeDeleted();
        this.__data1.aboutToBeDeleted();
        this.__data2.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __message2: ObservedPropertySimple<string>;
    get message2() {
        return this.__message2.get();
    }
    set message2(newValue: string) {
        this.__message2.set(newValue);
    }
    private __changedMsg: ObservedPropertySimple<string>;
    get changedMsg() {
        return this.__changedMsg.get();
    }
    set changedMsg(newValue: string) {
        this.__changedMsg.set(newValue);
    }
    private __changedMsg2: ObservedPropertySimple<string>;
    get changedMsg2() {
        return this.__changedMsg2.get();
    }
    set changedMsg2(newValue: string) {
        this.__changedMsg2.set(newValue);
    }
    private __hint1: ObservedPropertySimple<string>;
    get hint1() {
        return this.__hint1.get();
    }
    set hint1(newValue: string) {
        this.__hint1.set(newValue);
    }
    private __hint2: ObservedPropertySimple<string>;
    get hint2() {
        return this.__hint2.get();
    }
    set hint2(newValue: string) {
        this.__hint2.set(newValue);
    }
    private __data1: ObservedPropertySimple<string>;
    get data1() {
        return this.__data1.get();
    }
    set data1(newValue: string) {
        this.__data1.set(newValue);
    }
    private __data2: ObservedPropertySimple<string>;
    get data2() {
        return this.__data2.get();
    }
    set data2(newValue: string) {
        this.__data2.set(newValue);
    }
    render() {
        Scroll.create();
        Scroll.width('100%');
        Scroll.height('100%');
        Column.create();
        Button.createWithLabel('测试接口响应时长');
        Button.onClick(() => {
            test1();
        });
        Button.pop();
        Button.createWithLabel('测试基础数据类型');
        Button.onClick(() => {
            test2();
        });
        Button.margin({ top: 15 });
        Button.pop();
        Button.createWithLabel('测试string');
        Button.onClick(() => {
            test3();
        });
        Button.margin({ top: 15 });
        Button.pop();
        Button.createWithLabel('测试date');
        Button.onClick(() => {
            test4();
        });
        Button.margin({ top: 15 });
        Button.pop();
        Button.createWithLabel('测试array');
        Button.onClick(() => {
            test5();
        });
        Button.margin({ top: 15 });
        Button.pop();
        Button.createWithLabel('测试object');
        Button.onClick(() => {
            test6();
        });
        Button.margin({ top: 15 });
        Button.pop();
        Button.createWithLabel('测试class mapping');
        Button.onClick(() => {
            test7();
        });
        Button.margin({ top: 15 });
        Button.pop();
        Button.createWithLabel('测试class mapping + serializable');
        Button.onClick(() => {
            test8();
        });
        Button.margin({ top: 15 });
        Button.pop();
        Button.createWithLabel('测试bytearray');
        Button.onClick(() => {
            test9();
        });
        Button.margin({ top: 15 });
        Button.pop();
        Button.createWithLabel('测试Exception');
        Button.onClick(() => {
            test10();
        });
        Button.margin({ top: 15 });
        Button.pop();
        Column.pop();
        Scroll.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
