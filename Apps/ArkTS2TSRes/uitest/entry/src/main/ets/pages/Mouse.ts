interface Mouse_Params {
    message?: string;
    scroller?: Scroller;
    arr?: number[];
    count?: number;
    hoverText?: string;
    hoverMsg?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Mouse_" + ++__generate__Id;
}
/*
* Copyright (c) 2023 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License")
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
import router from '@ohos.router';
class Mouse extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.scroller = new Scroller();
        this.arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18.19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
        this.__count = new ObservedPropertySimple(0, this, "count");
        this.__hoverText = new ObservedPropertySimple('jump', this, "hoverText");
        this.__hoverMsg = new ObservedPropertySimple('hoverText', this, "hoverMsg");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Mouse_Params) {
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.count !== undefined) {
            this.count = params.count;
        }
        if (params.hoverText !== undefined) {
            this.hoverText = params.hoverText;
        }
        if (params.hoverMsg !== undefined) {
            this.hoverMsg = params.hoverMsg;
        }
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__count.aboutToBeDeleted();
        this.__hoverText.aboutToBeDeleted();
        this.__hoverMsg.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    private scroller: Scroller;
    private arr: number[];
    private __count: ObservedPropertySimple<number>;
    get count() {
        return this.__count.get();
    }
    set count(newValue: number) {
        this.__count.set(newValue);
    }
    private __hoverText: ObservedPropertySimple<string>;
    get hoverText() {
        return this.__hoverText.get();
    }
    set hoverText(newValue: string) {
        this.__hoverText.set(newValue);
    }
    private __hoverMsg: ObservedPropertySimple<string>;
    get hoverMsg() {
        return this.__hoverMsg.get();
    }
    set hoverMsg(newValue: string) {
        this.__hoverMsg.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Row.backgroundColor("#FF3333");
        Column.create();
        Column.width('100%');
        Column.height("100%");
        Column.alignItems(HorizontalAlign.Start);
        Column.backgroundColor("#800000");
        Button.createWithChild();
        Button.id("hover_bt");
        Button.onHover((isHover: boolean) => {
            if (isHover) {
                this.hoverMsg = 'hover';
            }
        });
        Text.create(this.hoverMsg);
        Text.id("hoverText");
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.id("mouse_test");
        Button.type(ButtonType.Capsule);
        Button.margin({ top: 20 });
        Button.onHover((isHover: boolean) => {
            if (isHover) {
                this.hoverText = 'hover';
            }
        });
        Button.onMouse((event: MouseEvent) => {
            switch (event.button) {
                case MouseButton.Left:
                    this.hoverText = 'left';
                    break;
                case MouseButton.Right:
                    this.hoverText = 'right';
                    break;
                case MouseButton.Middle:
                    this.hoverText = 'middle';
                    break;
            }
        });
        Text.create(this.hoverText);
        Text.id("mouse_test_result");
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Button.pop();
        Column.create();
        Column.height("300");
        Column.width("100%");
        Scroll.create(this.scroller);
        Scroll.id("scroll_test");
        Scroll.scrollBar(BarState.Off);
        Scroll.scrollable(ScrollDirection.Vertical);
        Flex.create({ direction: FlexDirection.Column });
        Flex.margin({ right: 10 });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), (item: number) => {
            Row.create();
            Text.create(item.toString());
            Text.width('90%');
            Text.height(100);
            Text.id("scroll_item");
            Text.backgroundColor('#3366CC');
            Text.borderRadius(15);
            Text.fontSize(16);
            Text.textAlign(TextAlign.Center);
            Text.margin({ top: 5 });
            Text.pop();
            Row.pop();
        }, (item: string) => item);
        ForEach.pop();
        Flex.pop();
        Scroll.pop();
        Column.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Mouse("1", undefined, {}));
