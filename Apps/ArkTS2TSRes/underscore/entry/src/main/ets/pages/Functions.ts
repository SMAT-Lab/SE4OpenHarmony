interface Utility_Params {
    delayResult?: string;
    onceResult?: string;
    afterResult?: string;
    composeResult?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Functions_" + ++__generate__Id;
}
/*
 * MIT License
 *
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
import { delay, once, after, compose } from 'underscore';
class Utility extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__delayResult = new ObservedPropertySimple('', this, "delayResult");
        this.__onceResult = new ObservedPropertySimple('', this, "onceResult");
        this.__afterResult = new ObservedPropertySimple('', this, "afterResult");
        this.__composeResult = new ObservedPropertySimple('', this, "composeResult");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Utility_Params) {
        if (params.delayResult !== undefined) {
            this.delayResult = params.delayResult;
        }
        if (params.onceResult !== undefined) {
            this.onceResult = params.onceResult;
        }
        if (params.afterResult !== undefined) {
            this.afterResult = params.afterResult;
        }
        if (params.composeResult !== undefined) {
            this.composeResult = params.composeResult;
        }
    }
    aboutToBeDeleted() {
        this.__delayResult.aboutToBeDeleted();
        this.__onceResult.aboutToBeDeleted();
        this.__afterResult.aboutToBeDeleted();
        this.__composeResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __delayResult: ObservedPropertySimple<string>;
    get delayResult() {
        return this.__delayResult.get();
    }
    set delayResult(newValue: string) {
        this.__delayResult.set(newValue);
    }
    private __onceResult: ObservedPropertySimple<string>;
    get onceResult() {
        return this.__onceResult.get();
    }
    set onceResult(newValue: string) {
        this.__onceResult.set(newValue);
    }
    private __afterResult: ObservedPropertySimple<string>;
    get afterResult() {
        return this.__afterResult.get();
    }
    set afterResult(newValue: string) {
        this.__afterResult.set(newValue);
    }
    private __composeResult: ObservedPropertySimple<string>;
    get composeResult() {
        return this.__composeResult.get();
    }
    set composeResult(newValue: string) {
        this.__composeResult.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Button.createWithLabel('Click', { type: ButtonType.Capsule, stateEffect: true });
        Button.backgroundColor(0x317aff);
        Button.width('50%');
        Button.height(60);
        Button.margin({ bottom: 30, top: 50 });
        Button.onClick(() => {
            let delayed: boolean = false;
            this.delayResult = delay(() => {
                delayed = true;
            }, 100);
        });
        Button.pop();
        Column.create();
        Column.width('100%');
        Column.alignItems(HorizontalAlign.Start);
        Text.create('delay 从零开始，每次值 +1');
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('delay: ' + this.delayResult);
        Text.fontSize(25);
        Text.margin({ bottom: 50 });
        Text.pop();
        Column.pop();
        Button.createWithLabel('Click', { type: ButtonType.Capsule, stateEffect: true });
        Button.backgroundColor(0x317aff);
        Button.width('50%');
        Button.height(60);
        Button.margin({ bottom: 30, top: 50 });
        Button.onClick(() => {
            let num: number = 0;
            let increment: any = once(() => {
                return ++num;
            });
            this.onceResult = increment(); //1
            let testAfter = (afterAmount: any, timesCalled: any) => {
                let afterCalled = 0;
                let after1: any = after(afterAmount, () => {
                    afterCalled++;
                });
                while (timesCalled--)
                    after1();
                return afterCalled;
            };
            this.afterResult = testAfter(5, 5).toString(); //1
            let greet = (name: any) => {
                return "hi: " + name;
            };
            let exclaim = (statement: any) => {
                return statement.toUpperCase() + "!";
            };
            let welcome: any = compose(greet, exclaim);
            this.composeResult = welcome('moe'); //'hi: MOE!
        });
        Button.pop();
        Column.create();
        Column.width('100%');
        Column.alignItems(HorizontalAlign.Start);
        Text.create('function：once(() => {})');
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('once: ' + this.onceResult);
        Text.fontSize(25);
        Text.margin({ bottom: 30 });
        Text.pop();
        Text.create('function：after(afterAmount, () => {})');
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('after: ' + this.afterResult);
        Text.fontSize(25);
        Text.margin({ bottom: 30 });
        Text.pop();
        Text.create('function：compose(a, b)');
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('compose: ' + this.composeResult);
        Text.fontSize(25);
        Text.margin({ bottom: 30 });
        Text.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new Utility("1", undefined, {}));
