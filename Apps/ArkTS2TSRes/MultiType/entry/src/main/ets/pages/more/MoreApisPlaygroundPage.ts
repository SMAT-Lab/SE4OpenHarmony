interface MoreApisPlayground_Params {
    observable?: string;
    items?: Array<number>;
    scroller?: Scroller;
    buffer?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MoreApisPlaygroundPage_" + ++__generate__Id;
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
import process from '@ohos.process';
import { TitleBar } from '../common/TitleBar';
const txt: string = 'ObservableTextItemViewBinder: ';
class MoreApisPlayground extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__observable = new ObservedPropertySimple(txt, this, "observable");
        this.__items = new ObservedPropertyObject([], this, "items");
        this.scroller = new Scroller();
        this.__buffer = new ObservedPropertySimple(0, this, "buffer");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MoreApisPlayground_Params) {
        if (params.observable !== undefined) {
            this.observable = params.observable;
        }
        if (params.items !== undefined) {
            this.items = params.items;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.buffer !== undefined) {
            this.buffer = params.buffer;
        }
    }
    aboutToBeDeleted() {
        this.__observable.aboutToBeDeleted();
        this.__items.aboutToBeDeleted();
        this.__buffer.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __observable: ObservedPropertySimple<string>;
    get observable() {
        return this.__observable.get();
    }
    set observable(newValue: string) {
        this.__observable.set(newValue);
    }
    private __items: ObservedPropertyObject<Array<number>>;
    get items() {
        return this.__items.get();
    }
    set items(newValue: Array<number>) {
        this.__items.set(newValue);
    }
    private scroller: Scroller;
    private __buffer: ObservedPropertySimple<number>;
    get buffer() {
        return this.__buffer.get();
    }
    set buffer(newValue: number) {
        this.__buffer.set(newValue);
    }
    aboutToAppear() {
        let num: number = 0;
        while (num < 19) {
            this.items.push(num);
            num++;
        }
    }
    MyListItem(index: number, parent = null) {
        Column.create();
        Button.createWithLabel('observable item(' + index + ')', { type: ButtonType.Normal });
        Button.width(220);
        Button.fontSize(16);
        Button.borderRadius(1);
        Button.backgroundColor('#CCCCCC');
        Button.border({ width: 1, color: Color.Black });
        Button.fontColor(Color.Black);
        Button.pop();
        Column.pop();
    }
    render() {
        Column.create();
        let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleBar("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Column.create();
        Column.height('25%');
        Row.create({ space: 10 });
        Button.createWithLabel('ADD', { type: ButtonType.Normal });
        Button.borderRadius(6);
        Button.backgroundColor('#CCCCCC');
        Button.fontColor(Color.Black);
        Button.layoutWeight(1);
        Button.onClick(event => {
            let time: number = process.uptime();
            this.items.push(time);
            this.scroller.scrollToIndex(this.items.length);
        });
        Button.pop();
        Button.createWithLabel('REMOVE', { type: ButtonType.Normal });
        Button.borderRadius(6);
        Button.backgroundColor('#CCCCCC');
        Button.fontColor(Color.Black);
        Button.layoutWeight(1);
        Button.onClick(event => {
            this.items.pop();
            this.scroller.scrollToIndex(this.items.length);
        });
        Button.pop();
        Button.createWithLabel('CLEAR', { type: ButtonType.Normal });
        Button.borderRadius(6);
        Button.backgroundColor('#CCCCCC');
        Button.fontColor(Color.Black);
        Button.layoutWeight(1);
        Button.onClick(event => {
            this.items.splice(0, this.items.length);
        });
        Button.pop();
        Row.pop();
        Scroll.create();
        Scroll.backgroundColor(Color.Black);
        Scroll.height('75%');
        Scroll.width('100%');
        Scroll.align(Alignment.TopStart);
        Text.create(this.observable);
        Text.fontSize(14);
        Text.fontColor('#8CF22F');
        Text.padding(15);
        Text.pop();
        Scroll.pop();
        Column.pop();
        Column.create();
        Column.width('100%');
        Column.height('70%');
        Column.alignItems(HorizontalAlign.Start);
        List.create({ space: 10, scroller: this.scroller });
        List.width('100%');
        List.onScrollIndex((firstIndex, lastIndex) => {
            this.appendTerminalLine("observable first item(" + this.items[firstIndex] + ")\n" + "observable last item(" + this.items[lastIndex] + ")");
        });
        ForEach.create("3", this, ObservedObject.GetRawObject(this.items), (item: number) => {
            ListItem.create();
            ListItem.width('100%');
            Column.create();
            Text.create('observable item(' + item + ')');
            Text.width(220);
            Text.fontSize(16);
            Text.borderRadius(1);
            Text.backgroundColor('#CCCCCC');
            Text.border({ width: 1, color: Color.Black });
            Text.fontColor(Color.Black);
            Text.pop();
            Column.pop();
            ListItem.pop();
        }, (item: string) => item.toString());
        ForEach.pop();
        List.pop();
        Column.pop();
        Column.pop();
    }
    appendTerminalLine(line: string) {
        if (this.buffer == 3) {
            this.observable = txt;
            this.buffer = 0;
        }
        this.observable += "\n" + line;
        this.buffer++;
    }
}
loadDocument(new MoreApisPlayground("1", undefined, {}));
