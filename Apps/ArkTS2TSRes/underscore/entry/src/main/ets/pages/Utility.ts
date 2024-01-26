interface Utility_Params {
    randomResult?: string;
    nowResult?: string;
    escapeResult?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Utility_" + ++__generate__Id;
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
import { random, escape, now } from 'underscore';
class Utility extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__randomResult = new ObservedPropertySimple('', this, "randomResult");
        this.__nowResult = new ObservedPropertySimple('', this, "nowResult");
        this.__escapeResult = new ObservedPropertySimple('', this, "escapeResult");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Utility_Params) {
        if (params.randomResult !== undefined) {
            this.randomResult = params.randomResult;
        }
        if (params.nowResult !== undefined) {
            this.nowResult = params.nowResult;
        }
        if (params.escapeResult !== undefined) {
            this.escapeResult = params.escapeResult;
        }
    }
    aboutToBeDeleted() {
        this.__randomResult.aboutToBeDeleted();
        this.__nowResult.aboutToBeDeleted();
        this.__escapeResult.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __randomResult: ObservedPropertySimple<string>;
    get randomResult() {
        return this.__randomResult.get();
    }
    set randomResult(newValue: string) {
        this.__randomResult.set(newValue);
    }
    private __nowResult: ObservedPropertySimple<string>;
    get nowResult() {
        return this.__nowResult.get();
    }
    set nowResult(newValue: string) {
        this.__nowResult.set(newValue);
    }
    private __escapeResult: ObservedPropertySimple<string>;
    get escapeResult() {
        return this.__escapeResult.get();
    }
    set escapeResult(newValue: string) {
        this.__escapeResult.set(newValue);
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
            this.randomResult = random(0, 100);
            this.nowResult = now();
        });
        Button.pop();
        Column.create();
        Column.width('100%');
        Column.alignItems(HorizontalAlign.Start);
        Text.create('随机数范围：0 ~ 100');
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('random: ' + this.randomResult);
        Text.fontSize(25);
        Text.margin({ bottom: 20 });
        Text.pop();
        Text.create('时间戳');
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('now: ' + this.nowResult);
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
            this.escapeResult = escape('Curly, Larry &amp; Moe'); //Curly, Larry &amp;amp; Moe
        });
        Button.pop();
        Column.create();
        Column.width('100%');
        Column.alignItems(HorizontalAlign.Start);
        Text.create('数据：Curly, Larry &amp; Moe');
        Text.fontSize(20);
        Text.margin({ bottom: 10 });
        Text.pop();
        Text.create('escape: ' + this.escapeResult);
        Text.fontSize(25);
        Text.margin({ bottom: 30 });
        Text.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new Utility("1", undefined, {}));
