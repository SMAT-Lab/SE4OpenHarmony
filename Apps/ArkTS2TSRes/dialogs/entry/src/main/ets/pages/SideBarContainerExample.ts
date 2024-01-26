interface SideBarContainerExample_Params {
    normalIcon?: Resource;
    selectedIcon?: Resource;
    arrRight?: number[];
    textRight?: string;
    current?: number;
    currentIndex?: number;
    fontColor?: string;
    selectedFontColor?: string;
    text1?: string;
    controller1?: TextInputController;
    text2?: string;
    controller2?: TextInputController;
    controller?: TabsController;
    leftTitles?;
    modelLeft?: SideBarModel;
    modelRight?: SideBarModel;
    dialogControllerLeft?: CustomDialogController;
    dialogControllerRight?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SideBarContainerExample_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { SideBarCustomDialog, SideBarModel } from '@ohos/dialogs';
class SideBarContainerExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.normalIcon = $r("app.media.icon");
        this.selectedIcon = $r("app.media.icon");
        this.__arrRight = new ObservedPropertyObject([], this, "arrRight");
        this.__textRight = new ObservedPropertySimple('点击测试LIVEDATA', this, "textRight");
        this.__current = new ObservedPropertySimple(1, this, "current");
        this.__currentIndex = new ObservedPropertySimple(0, this, "currentIndex");
        this.__fontColor = new ObservedPropertySimple('#fff', this, "fontColor");
        this.__selectedFontColor = new ObservedPropertySimple('#007DFF', this, "selectedFontColor");
        this.__text1 = new ObservedPropertySimple('', this, "text1");
        this.controller1 = new TextInputController();
        this.__text2 = new ObservedPropertySimple('', this, "text2");
        this.controller2 = new TextInputController();
        this.controller = new TabsController();
        this.leftTitles = ['首页', '娱乐', '汽车', '八卦', '搞笑', '互联网'];
        this.__modelLeft = new ObservedPropertyObject({
            sideBarPosition: SideBarPosition.End,
            initShow: true,
        }, this, "modelLeft");
        this.__modelRight = new ObservedPropertyObject({
            sideBarPosition: SideBarPosition.End,
            initShow: true,
        }, this, "modelRight");
        this.dialogControllerLeft = new CustomDialogController({
            builder: () => {
                let jsDialog = new SideBarCustomDialog({
                    customComponent: () => {
                        this.MySideBarComponentLeft();
                    },
                    model: this.modelLeft
                });
                jsDialog.setController(this.dialogControllerLeft);
                View.create(jsDialog);
            },
            autoCancel: true,
            alignment: DialogAlignment.Center,
            maskColor: 0x33000000,
            offset: { dx: 0, dy: 0 },
            customStyle: true,
            closeAnimation: { duration: 500 }
        }, this);
        this.dialogControllerRight = new CustomDialogController({
            builder: () => {
                let jsDialog = new SideBarCustomDialog({
                    customComponent: () => {
                        this.MySideBarComponentRight();
                    },
                    model: this.modelRight
                });
                jsDialog.setController(this.dialogControllerRight);
                View.create(jsDialog);
            },
            autoCancel: true,
            alignment: DialogAlignment.Center,
            maskColor: 0x33000000,
            offset: { dx: 0, dy: 0 },
            customStyle: true,
            closeAnimation: { duration: 500 }
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SideBarContainerExample_Params) {
        if (params.normalIcon !== undefined) {
            this.normalIcon = params.normalIcon;
        }
        if (params.selectedIcon !== undefined) {
            this.selectedIcon = params.selectedIcon;
        }
        if (params.arrRight !== undefined) {
            this.arrRight = params.arrRight;
        }
        if (params.textRight !== undefined) {
            this.textRight = params.textRight;
        }
        if (params.current !== undefined) {
            this.current = params.current;
        }
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.fontColor !== undefined) {
            this.fontColor = params.fontColor;
        }
        if (params.selectedFontColor !== undefined) {
            this.selectedFontColor = params.selectedFontColor;
        }
        if (params.text1 !== undefined) {
            this.text1 = params.text1;
        }
        if (params.controller1 !== undefined) {
            this.controller1 = params.controller1;
        }
        if (params.text2 !== undefined) {
            this.text2 = params.text2;
        }
        if (params.controller2 !== undefined) {
            this.controller2 = params.controller2;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.leftTitles !== undefined) {
            this.leftTitles = params.leftTitles;
        }
        if (params.modelLeft !== undefined) {
            this.modelLeft = params.modelLeft;
        }
        if (params.modelRight !== undefined) {
            this.modelRight = params.modelRight;
        }
        if (params.dialogControllerLeft !== undefined) {
            this.dialogControllerLeft = params.dialogControllerLeft;
        }
        if (params.dialogControllerRight !== undefined) {
            this.dialogControllerRight = params.dialogControllerRight;
        }
    }
    aboutToBeDeleted() {
        this.__arrRight.aboutToBeDeleted();
        this.__textRight.aboutToBeDeleted();
        this.__current.aboutToBeDeleted();
        this.__currentIndex.aboutToBeDeleted();
        this.__fontColor.aboutToBeDeleted();
        this.__selectedFontColor.aboutToBeDeleted();
        this.__text1.aboutToBeDeleted();
        this.__text2.aboutToBeDeleted();
        this.__modelLeft.aboutToBeDeleted();
        this.__modelRight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private normalIcon: Resource;
    private selectedIcon: Resource;
    private __arrRight: ObservedPropertyObject<number[]>;
    get arrRight() {
        return this.__arrRight.get();
    }
    set arrRight(newValue: number[]) {
        this.__arrRight.set(newValue);
    }
    private __textRight: ObservedPropertySimple<string>;
    get textRight() {
        return this.__textRight.get();
    }
    set textRight(newValue: string) {
        this.__textRight.set(newValue);
    }
    private __current: ObservedPropertySimple<number>;
    get current() {
        return this.__current.get();
    }
    set current(newValue: number) {
        this.__current.set(newValue);
    }
    private __currentIndex: ObservedPropertySimple<number>;
    get currentIndex() {
        return this.__currentIndex.get();
    }
    set currentIndex(newValue: number) {
        this.__currentIndex.set(newValue);
    }
    private __fontColor: ObservedPropertySimple<string>;
    get fontColor() {
        return this.__fontColor.get();
    }
    set fontColor(newValue: string) {
        this.__fontColor.set(newValue);
    }
    private __selectedFontColor: ObservedPropertySimple<string>;
    get selectedFontColor() {
        return this.__selectedFontColor.get();
    }
    set selectedFontColor(newValue: string) {
        this.__selectedFontColor.set(newValue);
    }
    private __text1: ObservedPropertySimple<string>;
    get text1() {
        return this.__text1.get();
    }
    set text1(newValue: string) {
        this.__text1.set(newValue);
    }
    private controller1: TextInputController;
    private __text2: ObservedPropertySimple<string>;
    get text2() {
        return this.__text2.get();
    }
    set text2(newValue: string) {
        this.__text2.set(newValue);
    }
    private controller2: TextInputController;
    TabBuilder(index: number, name: string, parent = null) {
        Column.create();
        Column.width(50);
        Text.create(name);
        Text.fontColor(this.currentIndex === index ? this.selectedFontColor : this.fontColor);
        Text.fontSize(16);
        Text.fontWeight(this.currentIndex === index ? 400 : 300);
        Text.lineHeight(22);
        Text.margin({ top: 17, bottom: 7 });
        Text.pop();
        Divider.create();
        Divider.strokeWidth(2);
        Divider.color('#007DFF');
        Divider.opacity(this.currentIndex === index ? 1 : 0);
        Column.pop();
    }
    private controller: TabsController;
    private leftTitles;
    MySideBarComponentLeft(parent = null) {
        Column.create();
        Stack.create();
        Stack.width('100%');
        Stack.height(150);
        Stack.backgroundColor('#444');
        Stack.pop();
        Tabs.create({ barPosition: BarPosition.Start, controller: this.controller });
        Tabs.vertical(false);
        Tabs.scrollable(true);
        Tabs.barMode(BarMode.Scrollable);
        Tabs.barHeight(80);
        Tabs.animationDuration(400);
        Tabs.onChange((index: number) => {
            this.currentIndex = index;
            console.info(index.toString());
        });
        Tabs.fadingEdge(false);
        Tabs.barBackgroundColor('#444');
        Tabs.height('100%');
        Tabs.width('100%');
        ForEach.create("2", this, ObservedObject.GetRawObject(this.leftTitles), (item: Object, index: number) => {
            TabContent.create();
            TabContent.tabBar({ builder: () => {
                    this.TabBuilder.call(this, index, `${item}`);
                } });
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor(Color.White);
            Text.create(`当前界面是：${item}`);
            Text.pop();
            Column.pop();
            TabContent.pop();
        });
        ForEach.pop();
        Tabs.pop();
        Column.pop();
    }
    getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    MySideBarComponentRight(parent = null) {
        Column.create();
        Text.create(this.textRight);
        Text.width('100%');
        Text.height('10%');
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(Color.Gray);
        Text.onClick(() => {
            this.dialogControllerRight.close();
            let nextInputValue = this.getRandomInt(0, 10000);
            this.arrRight.unshift(nextInputValue);
            this.textRight = nextInputValue + '';
        });
        Text.pop();
        TextInput.create({ text: this.text1, placeholder: '输入框交互...', controller: this.controller1 });
        TextInput.placeholderColor(Color.Grey);
        TextInput.placeholderFont({ size: 14, weight: 400 });
        TextInput.caretColor(Color.Blue);
        TextInput.width('100%');
        TextInput.height('5%');
        TextInput.fontSize(14);
        TextInput.fontColor(Color.Black);
        TextInput.onChange((value: string) => {
            this.text1 = value;
        });
        List.create({ space: 20, initialIndex: 0 });
        List.listDirection(Axis.Vertical);
        List.scrollBar(BarState.Off);
        List.edgeEffect(EdgeEffect.None);
        List.width('100%');
        List.height('80%');
        ForEach.create("3", this, ObservedObject.GetRawObject(this.arrRight), (item: number) => {
            ListItem.create();
            Text.create('' + item);
            Text.width('100%');
            Text.height(50);
            Text.fontSize(16);
            Text.textAlign(TextAlign.Center);
            Text.borderRadius(10);
            Text.backgroundColor(0xFFFFFF);
            Text.pop();
            ListItem.pop();
        }, (item: number) => item.toString());
        ForEach.pop();
        List.pop();
        TextInput.create({ text: this.text2, placeholder: '输入框交互...', controller: this.controller2 });
        TextInput.placeholderColor(Color.Grey);
        TextInput.placeholderFont({ size: 14, weight: 400 });
        TextInput.caretColor(Color.Blue);
        TextInput.width('100%');
        TextInput.height('5%');
        TextInput.fontSize(14);
        TextInput.fontColor(Color.Black);
        TextInput.onChange((value: string) => {
            this.text2 = value;
        });
        Column.pop();
    }
    private __modelLeft: ObservedPropertyObject<SideBarModel>;
    get modelLeft() {
        return this.__modelLeft.get();
    }
    set modelLeft(newValue: SideBarModel) {
        this.__modelLeft.set(newValue);
    }
    private __modelRight: ObservedPropertyObject<SideBarModel>;
    get modelRight() {
        return this.__modelRight.get();
    }
    set modelRight(newValue: SideBarModel) {
        this.__modelRight.set(newValue);
    }
    private dialogControllerLeft: CustomDialogController;
    private dialogControllerRight: CustomDialogController;
    aboutToAppear() {
        for (let i = 0; i < 50; i++) {
            this.arrRight.push(i);
        }
    }
    render() {
        Row.create();
        Row.justifyContent(FlexAlign.SpaceBetween);
        Row.alignItems(VerticalAlign.Center);
        Row.height('100%');
        Row.width('100%');
        Button.createWithLabel("左边弹窗");
        Button.width('30%');
        Button.height(50);
        Button.margin({ left: 30 });
        Button.onClick(() => {
            if (this.dialogControllerLeft != undefined) {
                this.modelLeft = {
                    sideBarPosition: SideBarPosition.Start,
                    initShow: true,
                    minSideBarWidth: '70%'
                };
                console.log("SideBarCustomDialog", "isShow: " + this.modelLeft.initShow);
                this.dialogControllerLeft.open();
            }
        });
        Button.backgroundColor(0x317aff);
        Button.pop();
        Button.createWithLabel("右边弹窗");
        Button.width('30%');
        Button.height(50);
        Button.margin({ right: 30 });
        Button.onClick(() => {
            if (this.dialogControllerRight != undefined) {
                this.modelRight = {
                    sideBarPosition: SideBarPosition.End,
                    initShow: true,
                    minSideBarWidth: '70%'
                };
                console.log("SideBarCustomDialog", "isShow: " + this.modelLeft.initShow);
                this.dialogControllerRight.open();
            }
        });
        Button.backgroundColor(0x317aff);
        Button.pop();
        Row.pop();
    }
}
loadDocument(new SideBarContainerExample("1", undefined, {}));
