interface Index_Params {
    result?: string;
    result1?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import { TinyEmitter } from "tiny-emitter";
import emitter from "tiny-emitter/instance";
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__result = new ObservedPropertySimple('', this, "result");
        this.__result1 = new ObservedPropertySimple('', this, "result1");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.result !== undefined) {
            this.result = params.result;
        }
        if (params.result1 !== undefined) {
            this.result1 = params.result1;
        }
    }
    aboutToBeDeleted() {
        this.__result.aboutToBeDeleted();
        this.__result1.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __result: ObservedPropertySimple<string>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string) {
        this.__result.set(newValue);
    }
    private __result1: ObservedPropertySimple<string>;
    get result1() {
        return this.__result1.get();
    }
    set result1(newValue: string) {
        this.__result1.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Column.create();
        Column.width('100%');
        Text.create("Emitter.on()");
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            console.log('test page click');
            let mEmitter: TinyEmitter = new TinyEmitter();
            mEmitter.on('some-event', (arg1: string, arg2: string, arg3: string) => {
                this.result = 'arg1:' + arg1 + ',arg2:' + arg2 + ',arg3:' + arg3;
            });
            mEmitter.emit('some-event', 'arg1 value', 'arg2 value', 'arg3 value');
            console.log('test page click result:' + this.result);
        });
        Text.pop();
        Text.create('结果: ' + this.result);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: 10 });
        Text.pop();
        Text.create("emitter.on()");
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            console.log('test page click');
            emitter.on('some-event', (arg1: string, arg2: string, arg3: string) => {
                this.result1 = 'arg1:' + arg1 + ',arg2:' + arg2 + ',arg3:' + arg3;
            });
            emitter.emit('some-event', 'arg1 value', 'arg2 value', 'arg3 value');
            console.log('test page click result:' + this.result1);
        });
        Text.pop();
        Text.create('结果: ' + this.result1);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({ top: 10 });
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));