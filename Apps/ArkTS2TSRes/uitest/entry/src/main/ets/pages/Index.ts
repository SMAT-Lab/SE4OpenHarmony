interface Index_Params {
    message?: string;
    scroller?: Scroller;
    arr?: number[];
    count?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__message = new ObservedPropertySimple('Hello World', this, "message");
        this.scroller = new Scroller();
        this.arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.__count = new ObservedPropertySimple(0, this, "count");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
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
    }
    aboutToBeDeleted() {
        this.__message.aboutToBeDeleted();
        this.__count.aboutToBeDeleted();
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
    render() {
        Row.create();
        Row.height('100%');
        Row.backgroundColor("#FF3333");
        Column.create();
        Column.width('100%');
        Column.height("100%");
        Column.alignItems(HorizontalAlign.Start);
        Column.backgroundColor("#800000");
        Text.create(this.message);
        Text.fontSize(10);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("Next");
        Text.fontSize(10);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("after click");
        Text.fontSize(10);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Text.create("idTest");
        Text.id("idTest");
        Text.fontSize(10);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
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
        Row.create();
        Row.margin({ top: 10 });
        Button.createWithChild();
        Button.id("btnTest");
        Button.onClick(() => {
            router.replaceUrl({
                url: 'pages/Scroller'
            });
        });
        Text.create("ButtonTest");
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.id("btnTest");
        Button.onClick(() => {
        });
        Button.margin({ left: 10 });
        Text.create("ButtonTest1");
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.id("drag");
        Button.onClick(() => {
            router.pushUrl({
                url: 'pages/Drag'
            });
        });
        Text.create("Drag");
        Text.pop();
        Button.pop();
        Button.createWithChild();
        Button.id("inch");
        Button.onClick(() => {
            router.pushUrl({
                url: 'pages/Pinch'
            });
        });
        Button.margin({ left: 10 });
        Text.create("Pinch");
        Text.pop();
        Button.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Toggle.create({ type: ToggleType.Switch, isOn: false });
        Toggle.selectedColor('#007DFF');
        Toggle.switchPointColor('#FFFFFF');
        Toggle.onChange((isOn: boolean) => {
            console.info('Component status:' + isOn);
        });
        Toggle.id("Toggle_switch_false");
        Toggle.pop();
        Toggle.create({ type: ToggleType.Switch, isOn: true });
        Toggle.selectedColor('#007DFF');
        Toggle.switchPointColor('#FFFFFF');
        Toggle.onChange((isOn: boolean) => {
            console.info('Component status:' + isOn);
        });
        Toggle.id("Toggle_switch_true");
        Toggle.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Checkbox.create({ name: 'checkbox1', group: 'checkboxGroup' });
        Checkbox.select(true);
        Checkbox.selectedColor(0xed6f21);
        Checkbox.onChange((value: boolean) => {
            console.info('Checkbox1 change is' + value);
        });
        Checkbox.id("check_test_checked");
        Checkbox.pop();
        Checkbox.create({ name: 'checkbox2', group: 'checkboxGroup' });
        Checkbox.select(false);
        Checkbox.selectedColor(0x39a2db);
        Checkbox.onChange((value: boolean) => {
            console.info('Checkbox2 change is' + value);
        });
        Checkbox.id("check_test_not_checked");
        Checkbox.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Select.create([{ value: 'aaa', icon: "/common/1.png" },
            { value: 'bbb', icon: "/common/2.png" },
            { value: 'ccc', icon: "/common/3.png" },
            { value: 'ddd', icon: "/common/4.png" }]);
        Select.selected(2);
        Select.value('TTT');
        Select.font({ size: 30, weight: 400, family: 'serif', style: FontStyle.Normal });
        Select.selectedOptionFont({ size: 40, weight: 500, family: 'serif', style: FontStyle.Normal });
        Select.optionFont({ size: 30, weight: 400, family: 'serif', style: FontStyle.Normal });
        Select.onSelect((index: number) => {
            console.info("Select:" + index);
        });
        Select.pop();
        Row.pop();
        Row.create();
        Row.margin({ top: 10 });
        Radio.create({ value: 'Radio1', group: 'radioGroup' });
        Radio.checked(false);
        Radio.id("radio_test");
        Radio.create({ value: 'Radio2', group: 'radioGroup' });
        Radio.checked(true);
        Radio.id("radio_test1");
        Row.pop();
        Text.create("unit_jsunit");
        Text.fontSize(30);
        Text.fontWeight(FontWeight.Bold);
        Gesture.create(GesturePriority.Low);
        TapGesture.create({ count: 2 });
        TapGesture.onAction(() => {
            router.pushUrl({ url: 'pages/Swipe' });
        });
        TapGesture.pop();
        Gesture.pop();
        Text.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
