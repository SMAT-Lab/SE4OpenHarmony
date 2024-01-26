interface RecyclerViewStaggeredGridDemo_Params {
    leftColor?: Array<string>;
    leftColorName?: Array<string>;
    leftHeight?: Array<number>;
    rightColor?: Array<string>;
    rightColorName?: Array<string>;
    rightHeight?: Array<number>;
    model?: OverScrollDecor.Model;
    isVisibility?: Visibility;
    backOffset?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "RecyclerViewStaggeredGridDemo_" + ++__generate__Id;
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
import prompt from '@system.prompt';
import { OverScrollDecor } from '@ohos/overscroll-decor';
import SideBar from "./SideBar";
class RecyclerViewStaggeredGridDemo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.leftColor = ["#ffcc0000", "#ffff8800", "#f0e000", "#ff99cc00", "#ff33b5e5", "#ffaa66cc"];
        this.leftColorName = ["RED", "ORANGE", "YELLOW", "LIGHT GREEN", "LIGHT BLUE", "PURPLE"];
        this.leftHeight = [220, 220, 220, 330, 330, 220];
        this.rightColor = ["#ffff4444", "#ffffbb33", "#ff669900", "#00e0e0", "#ff0099cc"];
        this.rightColorName = ["LIGHT RED", "LIGHT ORANGE", "GREEN", "CYAN", "BLUE"];
        this.rightHeight = [330, 330, 220, 220, 220];
        this.__model = new ObservedPropertyObject(new OverScrollDecor.Model(), this, "model");
        this.__isVisibility = new ObservedPropertySimple(Visibility.None, this, "isVisibility");
        this.__backOffset = new ObservedPropertySimple(0, this, "backOffset");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: RecyclerViewStaggeredGridDemo_Params) {
        if (params.leftColor !== undefined) {
            this.leftColor = params.leftColor;
        }
        if (params.leftColorName !== undefined) {
            this.leftColorName = params.leftColorName;
        }
        if (params.leftHeight !== undefined) {
            this.leftHeight = params.leftHeight;
        }
        if (params.rightColor !== undefined) {
            this.rightColor = params.rightColor;
        }
        if (params.rightColorName !== undefined) {
            this.rightColorName = params.rightColorName;
        }
        if (params.rightHeight !== undefined) {
            this.rightHeight = params.rightHeight;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.isVisibility !== undefined) {
            this.isVisibility = params.isVisibility;
        }
        if (params.backOffset !== undefined) {
            this.backOffset = params.backOffset;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__isVisibility.aboutToBeDeleted();
        this.__backOffset.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private leftColor: Array<string>;
    private leftColorName: Array<string>;
    private leftHeight: Array<number>;
    private rightColor: Array<string>;
    private rightColorName: Array<string>;
    private rightHeight: Array<number>;
    private __model: ObservedPropertyObject<OverScrollDecor.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: OverScrollDecor.Model) {
        this.__model.set(newValue);
    }
    private __isVisibility: ObservedPropertySimple<Visibility>;
    get isVisibility() {
        return this.__isVisibility.get();
    }
    set isVisibility(newValue: Visibility) {
        this.__isVisibility.set(newValue);
    }
    private __backOffset: ObservedPropertySimple<number>;
    get backOffset() {
        return this.__backOffset.get();
    }
    set backOffset(newValue: number) {
        this.__backOffset.set(newValue);
    }
    aboutToAppear() {
        this.model
            .setUpOverScroll(true)
            .setOrientation(OverScrollDecor.ORIENTATION.VERTICAL)
            .setOverScrollBounceEffect(true)
            .setScrollBar(false)
            .setWidth("100%")
            .setHeight("85%");
    }
    leftView(parent = null) {
        Column.create();
        Column.width("100%");
        ForEach.create("2", this, ObservedObject.GetRawObject(this.leftColorName), (item: string) => {
            Text.create('' + item);
            Text.fontSize(35);
            Text.width('100%');
            Text.height(this.leftHeight[this.leftColorName.indexOf(item)]);
            Text.textAlign(TextAlign.Center);
            Text.backgroundColor(this.leftColor[this.leftColorName.indexOf(item)]);
            Text.onClick((event?: ClickEvent) => {
                prompt.showToast({ message: "Tapped on: " + item, duration: 2000 });
            });
            Gesture.create(GesturePriority.Low);
            LongPressGesture.create();
            LongPressGesture.onAction((event?: GestureEvent) => {
                prompt.showToast({ message: "Long-tapped on: " + item, duration: 2000 });
            });
            LongPressGesture.pop();
            Gesture.pop();
            Text.pop();
        }, (item: string) => item);
        ForEach.pop();
        Column.pop();
    }
    rightView(parent = null) {
        Column.create();
        Column.width("100%");
        ForEach.create("3", this, ObservedObject.GetRawObject(this.rightColorName), (item: string) => {
            Text.create('' + item);
            Text.fontSize(35);
            Text.width('100%');
            Text.height(this.rightHeight[this.rightColorName.indexOf(item)]);
            Text.textAlign(TextAlign.Center);
            Text.backgroundColor(this.rightColor[this.rightColorName.indexOf(item)]);
            Text.onClick((event?: ClickEvent) => {
                prompt.showToast({ message: "Tapped on: " + item, duration: 2000 });
            });
            Gesture.create(GesturePriority.Low);
            LongPressGesture.create();
            LongPressGesture.onAction((event?: GestureEvent) => {
                prompt.showToast({ message: "Long-tapped on: " + item, duration: 2000 });
            });
            LongPressGesture.pop();
            Gesture.pop();
            Text.pop();
        }, (item: string) => item);
        ForEach.pop();
        Column.pop();
    }
    SpecificChild(parent = null) {
        Flex.create({ direction: FlexDirection.Column });
        Flex.create({ alignItems: ItemAlign.Start });
        Flex.width('100%');
        Flex.create({});
        Flex.width('50%');
        this.leftView(this);
        Flex.pop();
        Flex.create({});
        Flex.width('50%');
        this.rightView(this);
        Flex.pop();
        Flex.pop();
        Flex.pop();
    }
    render() {
        Stack.create({ alignContent: Alignment.TopStart });
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Row.create();
        Row.width("100%");
        Row.height("8%");
        Row.backgroundColor("#ffffbb33");
        Image.create($r('app.media.ic_more'));
        Image.objectFit(ImageFit.Contain);
        Image.width("10%");
        Image.height("65%");
        Image.margin({ left: 16, right: 20 });
        Image.onClick((event?: ClickEvent) => {
            let that = this;
            this.backOffset = -1;
            let intervalID = setInterval(() => {
                that.backOffset += 0.1;
            }, 40);
            let timeoutID = setTimeout(() => {
                clearInterval(intervalID);
                that.backOffset = 0;
            }, 400);
            this.isVisibility = Visibility.Visible;
        });
        Text.create("RecyclerView St.Grid Over-Scroll Demo");
        Text.fontSize(38);
        Text.maxLines(1);
        Text.fontColor(Color.White);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.width("80%");
        Text.pop();
        Row.pop();
        Text.create("⇳ Drag Vertically");
        Text.textAlign(TextAlign.Center);
        Text.fontSize(35);
        Text.width('100%');
        Text.height("7%");
        Text.fontColor("#727171");
        Text.padding({ top: 15 });
        Text.pop();
        Flex.pop();
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.width("100%");
        Stack.height("100%");
        Stack.visibility(this.isVisibility);
        Flex.create();
        Flex.width("100%");
        Flex.height("100%");
        Flex.backgroundColor(Color.Black);
        Flex.opacity(0.5 + this.backOffset * 0.3);
        Flex.onClick((event?: ClickEvent) => {
            let that = this;
            let intervalID = setInterval(() => {
                that.backOffset -= 0.1;
            }, 40);
            let timeoutID = setTimeout(() => {
                clearInterval(intervalID);
                that.backOffset = 0;
                that.isVisibility = Visibility.None;
            }, 400);
        });
        Flex.pop();
        Flex.create();
        Flex.offset({ x: this.backOffset * 500, y: 0 });
        let earlierCreatedChild_4: SideBar = (this && this.findChildById) ? this.findChildById("4") as SideBar : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new SideBar("4", this, {}));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({});
            if (!earlierCreatedChild_4.needsUpdate()) {
                earlierCreatedChild_4.markStatic();
            }
            View.create(earlierCreatedChild_4);
        }
        Flex.pop();
        Stack.pop();
        Stack.pop();
    }
}
loadDocument(new RecyclerViewStaggeredGridDemo("1", undefined, {}));
