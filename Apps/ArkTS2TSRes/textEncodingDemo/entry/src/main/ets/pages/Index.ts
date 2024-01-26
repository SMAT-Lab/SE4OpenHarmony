interface Index_Params {
    scroller?: Scroller;
    message?: string;
    encode?: string;
    deco?: string;
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
import { TextEncoder, TextDecoder } from 'text-encoding';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.__message = new ObservedPropertySimple('点我', this, "message");
        this.__encode = new ObservedPropertySimple('0', this, "encode");
        this.__deco = new ObservedPropertySimple('0', this, "deco");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.encode !== undefined) {
            this.encode = params.encode;
        }
        if (params.deco !== undefined) {
            this.deco = params.deco;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__encode.aboutToBeDeleted();
        this.__deco.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private __encode: ObservedPropertySimple<string>;
    get encode() {
        return this.__encode.get();
    }
    set encode(newValue: string) {
        this.__encode.set(newValue);
    }
    private __deco: ObservedPropertySimple<string>;
    get deco() {
        return this.__deco.get();
    }
    set deco(newValue: string) {
        this.__deco.set(newValue);
    }
    render() {
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.height('100%');
        Scroll.create(this.scroller);
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBar(BarState.On);
        Scroll.scrollBarColor(Color.Gray);
        Scroll.scrollBarWidth(30);
        Scroll.onScroll((xOffset: number, yOffset: number) => {
            console.info(xOffset + ' ' + yOffset);
        });
        Scroll.onScrollEdge((side: Edge) => {
            console.info('To the edge');
        });
        Scroll.onScrollEnd(() => {
            console.info('Scroll Stop');
        });
        Column.create();
        Column.width('100%');
        Text.create(this.message);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.onClick(() => {
            let content: string = 'ABCDEFGHIJKabcdefj123456+/AA==!@';
            let uInt8: Uint8Array = new TextEncoder().encode(content);
            this.encode = uInt8.toString();
            this.deco = new TextDecoder().decode(uInt8);
        });
        Text.pop();
        Text.create("TextEncoder: " + this.encode);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("TextDecoder: " + this.deco);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Column.pop();
        Scroll.pop();
        Stack.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
