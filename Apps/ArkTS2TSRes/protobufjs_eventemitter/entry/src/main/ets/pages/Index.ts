interface Index_Params {
    result?: string;
    str?: string;
    scroller?: Scroller;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
  * Copyright (c) 2024 Huawei Device Co., Ltd.
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
    *
  * http://www.apache.org/licenses/LICENSE-2.0
    *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
import EventEmitter from '@protobufjs/eventemitter';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__result = new ObservedPropertySimple("", this, "result");
        this.str = '';
        this.scroller = new Scroller();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.result !== undefined) {
            this.result = params.result;
        }
        if (params.str !== undefined) {
            this.str = params.str;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
    }
    aboutToBeDeleted() {
        this.__result.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __result: ObservedPropertySimple<string>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string) {
        this.__result.set(newValue);
    }
    private str: string;
    private scroller: Scroller;
    render() {
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.width('100%');
        Stack.height('100%');
        Stack.backgroundColor(0xDCDCDC);
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.On);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.scrollBarWidth(30);
        Column.create();
        Column.width('100%');
        Text.create("emit");
        Text.width('90%');
        Text.height(60);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 20 });
        Text.onClick(event => {
            this.result = "";
            let ee = new EventEmitter();
            let ctx: any = {};
            ee.on("eventA", ((arg1: any) => {
                this.result = "on eventA arg1=" + arg1;
            }) as any, ctx);
            ee.emit("eventA", 1);
        });
        Text.pop();
        Text.create("off");
        Text.width('90%');
        Text.height(60);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 20 });
        Text.onClick(event => {
            this.result = "";
            let ee = new EventEmitter();
            let ctx: any = {};
            ee.on("eventA", ((arg1: any) => {
                this.result += "on eventA arg1=" + arg1 + "\r\n";
            }) as any, ctx);
            ee.on("eventB", ((arg1: any) => {
                this.result += "on eventB arg1=" + arg1 + "\r\n";
            }) as any, ctx);
            ee.emit("eventA", 1);
            ee.off("eventB");
            ee.emit("eventB", 1);
        });
        Text.pop();
        Text.create("offAll");
        Text.width('90%');
        Text.height(60);
        Text.backgroundColor(0xFFFFFF);
        Text.borderRadius(15);
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.margin({ top: 20 });
        Text.onClick(event => {
            this.result = "";
            let result: number = 0;
            let ee = new EventEmitter();
            let ctx: any = {};
            ee.on("eventA", ((arg1: any) => {
                this.result += "on eventA arg1=" + arg1 + "\r\n";
            }) as any, ctx);
            ee.on("eventB", ((arg1: any) => {
                this.result += "on eventB arg1=" + arg1 + "\r\n";
            }) as any, ctx);
            ee.emit("eventA", 1);
            ee.off();
            ee.emit("eventA", 2);
            ee.emit("eventB", 1);
            this.result += "on eventB arg1=" + result + "\r\n";
        });
        Text.pop();
        Text.create("结果 :\r\n  " + this.result);
        Text.fontSize(15);
        Text.margin({ top: 55, left: 10, right: 10 });
        Text.pop();
        Column.pop();
        Scroll.pop();
        Stack.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
