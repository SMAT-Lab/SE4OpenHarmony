interface RecyclerViewAttachDemo_Params {
    color?: Array<string>;
    colorName?: Array<string>;
    horizontalView?: OverScrollDecor.Model;
    verticalView?: OverScrollDecor.Model;
    isVisibility?: Visibility;
    backOffset?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "RecyclerViewAttachDemo_" + ++__generate__Id;
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
import router from '@system.router';
import { OverScrollDecor } from '@ohos/overscroll-decor';
import SideBar from "./SideBar";
class RecyclerViewAttachDemo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.color = ["#ffaa66cc", "#ff0099cc", "#ff33b5e5", "#00e0e0", "#ff669900", "#ff99cc00",
            "#f0e000", "#ffffbb33", "#ffff8800", "#ffff4444", "#ffcc0000"];
        this.colorName = ["PURPLE", "BLUE", "LIGHT BLUE", "CYAN", "GREEN", "LIGHT GREEN",
            "YELLOW", "LIGHT ORANGE", "ORANGE", "LIGHT RED", "RED"];
        this.__horizontalView = new ObservedPropertyObject(new OverScrollDecor.Model(), this, "horizontalView");
        this.__verticalView = new ObservedPropertyObject(new OverScrollDecor.Model(), this, "verticalView");
        this.__isVisibility = new ObservedPropertySimple(Visibility.None, this, "isVisibility");
        this.__backOffset = new ObservedPropertySimple(0, this, "backOffset");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: RecyclerViewAttachDemo_Params) {
        if (params.color !== undefined) {
            this.color = params.color;
        }
        if (params.colorName !== undefined) {
            this.colorName = params.colorName;
        }
        if (params.horizontalView !== undefined) {
            this.horizontalView = params.horizontalView;
        }
        if (params.verticalView !== undefined) {
            this.verticalView = params.verticalView;
        }
        if (params.isVisibility !== undefined) {
            this.isVisibility = params.isVisibility;
        }
        if (params.backOffset !== undefined) {
            this.backOffset = params.backOffset;
        }
    }
    aboutToBeDeleted() {
        this.__horizontalView.aboutToBeDeleted();
        this.__verticalView.aboutToBeDeleted();
        this.__isVisibility.aboutToBeDeleted();
        this.__backOffset.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private color: Array<string>;
    private colorName: Array<string>;
    private __horizontalView: ObservedPropertyObject<OverScrollDecor.Model>;
    get horizontalView() {
        return this.__horizontalView.get();
    }
    set horizontalView(newValue: OverScrollDecor.Model) {
        this.__horizontalView.set(newValue);
    }
    private __verticalView: ObservedPropertyObject<OverScrollDecor.Model>;
    get verticalView() {
        return this.__verticalView.get();
    }
    set verticalView(newValue: OverScrollDecor.Model) {
        this.__verticalView.set(newValue);
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
        this.horizontalView
            .setUpOverScroll(true)
            .setOrientation(OverScrollDecor.ORIENTATION.HORIZONTAL)
            .setOverScrollBounceEffect(true)
            .setScrollBar(false)
            .setWidth("100%")
            .setHeight("24%");
        this.verticalView
            .setUpOverScroll(true)
            .setOrientation(OverScrollDecor.ORIENTATION.VERTICAL)
            .setOverScrollBounceEffect(true)
            .setScrollBar(false)
            .setWidth("100%")
            .setHeight("54%");
    }
    RecyclerViewVertical(parent = null) {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center });
        ForEach.create("2", this, ObservedObject.GetRawObject(this.colorName), (item: string) => {
            Text.create('' + this.colorName[this.colorName.length - 1 - this.colorName.indexOf(item)]);
            Text.width('100%');
            Text.height("20%");
            Text.fontSize(35);
            Text.textAlign(TextAlign.Center);
            Text.backgroundColor(this.color[this.colorName.length - 1 - this.colorName.indexOf(item)]);
            Text.onClick((event?: ClickEvent) => {
                prompt.showToast({
                    message: "Tapped on: " + this.colorName[this.colorName.length - 1 - this.colorName.indexOf(item)],
                    duration: 2000
                });
            });
            Gesture.create(GesturePriority.Low);
            LongPressGesture.create();
            LongPressGesture.onAction((event?: GestureEvent) => {
                prompt.showToast({
                    message: "Long-tapped on: " + this.colorName[this.colorName.length - 1 - this.colorName.indexOf(item)],
                    duration: 2000
                });
            });
            LongPressGesture.pop();
            Gesture.pop();
            Text.pop();
        }, (item: string) => item);
        ForEach.pop();
        Flex.pop();
    }
    RecyclerViewHorizontal(parent = null) {
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center });
        ForEach.create("3", this, ObservedObject.GetRawObject(this.colorName), (item: string) => {
            Text.create('' + item);
            Text.width("20%");
            Text.height("90%");
            Text.fontSize(25);
            Text.textAlign(TextAlign.Center);
            Text.backgroundColor(this.color[this.colorName.indexOf(item)]);
            Text.onClick((event?: ClickEvent) => {
                prompt.showToast({ message: "Tapped on: " + item, duration: 2000 });
            });
            Gesture.create(GesturePriority.Low);
            LongPressGesture.create();
            LongPressGesture.onAction((event?: GestureEvent) => {
                prompt.showToast({
                    message: "Long-tapped on: " + item, duration: 2000
                });
            });
            LongPressGesture.pop();
            Gesture.pop();
            Text.pop();
        }, (item: string) => item);
        ForEach.pop();
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
        Text.create("RecyclerView Over-Scroll Demo");
        Text.fontSize(38);
        Text.maxLines(1);
        Text.fontColor(Color.White);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.width("70%");
        Text.pop();
        Image.create($r('app.media.ic_select'));
        Image.objectFit(ImageFit.Contain);
        Image.width("8%");
        Image.height("80%");
        Image.margin({ left: 20, right: 10 });
        Image.bindMenu([
            {
                value: 'Detach over-scroll',
                action: () => {
                    router.push({ uri: 'pages/RecyclerViewDetachDemo' });
                }
            }
        ]);
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.height("7%");
        Row.padding({ left: 16, right: 16 });
        Text.create("⇔ Drag Horizontally");
        Text.fontSize(35);
        Text.height("95%");
        Text.fontColor("#727171");
        Text.pop();
        Blank.create();
        Blank.pop();
        Text.create("" + this.horizontalView.getOffsetX());
        Text.fontSize(35);
        Text.height("95%");
        Text.fontWeight(600);
        Text.fontColor("" + this.horizontalView.getTextColor());
        Text.pop();
        Row.pop();
        Row.create();
        Row.width('100%');
        Row.height("7%");
        Row.padding({ left: 16, right: 16 });
        Text.create("⇳ Drag Vertically");
        Text.fontSize(35);
        Text.height("95%");
        Text.fontColor("#727171");
        Text.pop();
        Blank.create();
        Blank.pop();
        Text.create("" + this.verticalView.getOffsetY());
        Text.fontSize(35);
        Text.height("95%");
        Text.fontWeight(600);
        Text.fontColor("" + this.verticalView.getTextColor());
        Text.pop();
        Row.pop();
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
loadDocument(new RecyclerViewAttachDemo("1", undefined, {}));
