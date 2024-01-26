interface SlotExample_Params {
    swiperController?: SwiperController;
    scroller?: Scroller;
    arr?: number[];
    isOpen?: boolean;
    placeholder?: string;
    inputValue?: string;
    dialogController?: CustomDialogController;
}
interface BlockContent_Params {
    placeholder?: string;
    inputValue?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "FullScreen_" + ++__generate__Id;
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
import { fullScreenDialog } from '@ohos/dialogs';
class BlockContent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.placeholder = '';
        this.inputValue = '';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BlockContent_Params) {
        if (params.placeholder !== undefined) {
            this.placeholder = params.placeholder;
        }
        if (params.inputValue !== undefined) {
            this.inputValue = params.inputValue;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private placeholder: string;
    private inputValue: string;
    render() {
        Column.create();
        TextInput.create({ placeholder: this.placeholder, text: this.inputValue });
        TextInput.placeholderFont({
            size: 20
        });
        TextInput.margin({ left: 5, right: 5, top: 20 });
        TextInput.padding(0);
        TextInput.fontColor('#000000');
        TextInput.backgroundColor('#ffffff');
        TextInput.borderRadius(0);
        TextInput.fontSize(20);
        TextInput.border({
            width: { bottom: 1 },
            color: { bottom: '#D81B60' },
            style: { top: BorderStyle.Solid }
        });
        Column.pop();
    }
}
class SlotExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.swiperController = new SwiperController();
        this.scroller = new Scroller();
        this.__arr = new ObservedPropertyObject([10, 20, 30], this, "arr");
        this.__isOpen = new ObservedPropertySimple(false, this, "isOpen");
        this.__placeholder = new ObservedPropertySimple('测试软键盘交互', this, "placeholder");
        this.__inputValue = new ObservedPropertySimple('', this, "inputValue");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new fullScreenDialog({
                    slotContent: () => {
                        this.componentBuilder();
                    },
                    slotBgColor: '#ffffff',
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            offset: { dx: 0, dy: 24 },
            customStyle: true
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SlotExample_Params) {
        if (params.swiperController !== undefined) {
            this.swiperController = params.swiperController;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.isOpen !== undefined) {
            this.isOpen = params.isOpen;
        }
        if (params.placeholder !== undefined) {
            this.placeholder = params.placeholder;
        }
        if (params.inputValue !== undefined) {
            this.inputValue = params.inputValue;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__arr.aboutToBeDeleted();
        this.__isOpen.aboutToBeDeleted();
        this.__placeholder.aboutToBeDeleted();
        this.__inputValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private swiperController: SwiperController;
    private scroller: Scroller;
    private __arr: ObservedPropertyObject<number[]>;
    get arr() {
        return this.__arr.get();
    }
    set arr(newValue: number[]) {
        this.__arr.set(newValue);
    }
    private __isOpen: ObservedPropertySimple<boolean>;
    get isOpen() {
        return this.__isOpen.get();
    }
    set isOpen(newValue: boolean) {
        this.__isOpen.set(newValue);
    }
    private __placeholder: ObservedPropertySimple<string>;
    get placeholder() {
        return this.__placeholder.get();
    }
    set placeholder(newValue: string) {
        this.__placeholder.set(newValue);
    }
    private __inputValue: ObservedPropertySimple<string>;
    get inputValue() {
        return this.__inputValue.get();
    }
    set inputValue(newValue: string) {
        this.__inputValue.set(newValue);
    }
    private dialogController: CustomDialogController;
    componentBuilder(parent = null) {
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.position({ x: 0, y: 0 });
        Stack.height('100%');
        Stack.width('100%');
        Scroll.create(this.scroller);
        Column.create();
        Text.create('这里是标题');
        Text.fontSize(24);
        Text.textAlign(TextAlign.Center);
        Text.margin(30);
        Text.pop();
        Column.create();
        Column.margin({ left: 10, right: 10 });
        Text.create('我是全屏弹窗，可以设置任意的动画器。我看起来就像一个从底部弹出的Actvity，可以用来做一些登录，选择界面');
        Text.fontSize(20);
        Text.pop();
        Column.pop();
        let earlierCreatedChild_2: BlockContent = ((parent ? parent : this) && (parent ? parent : this).findChildById) ? (parent ? parent : this).findChildById(generateId()) as BlockContent : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new BlockContent("FullScreen_" + __generate__Id, parent ? parent : this, { placeholder: this.placeholder, inputValue: this.inputValue }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                placeholder: this.placeholder, inputValue: this.inputValue
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Column.create();
        Column.width('100%');
        Column.height(400);
        Column.backgroundColor('#CCCCCC');
        Column.margin({ top: 20 });
        Column.pop();
        TextInput.create({ placeholder: this.placeholder, text: this.inputValue });
        TextInput.placeholderFont({
            size: 20
        });
        TextInput.margin({ left: 5, right: 5, top: 20 });
        TextInput.padding(0);
        TextInput.fontColor('#000000');
        TextInput.backgroundColor('#ffffff');
        TextInput.borderRadius(0);
        TextInput.fontSize(20);
        TextInput.border({
            width: { bottom: 1 },
            color: { bottom: '#D81B60' },
            style: { top: BorderStyle.Solid }
        });
        Column.create();
        Column.width('100%');
        Column.height(200);
        Column.backgroundColor('#9C27B0');
        Column.margin({ top: 20 });
        Column.pop();
        TextInput.create({ placeholder: this.placeholder, text: this.inputValue });
        TextInput.placeholderFont({
            size: 20
        });
        TextInput.margin({ left: 5, right: 5, top: 20 });
        TextInput.padding(0);
        TextInput.fontColor('#000000');
        TextInput.backgroundColor('#ffffff');
        TextInput.borderRadius(0);
        TextInput.fontSize(20);
        TextInput.border({
            width: { bottom: 1 },
            color: { bottom: '#D81B60' },
            style: { top: BorderStyle.Solid }
        });
        Column.create();
        Column.width('100%');
        Column.height(200);
        Column.backgroundColor('#AC5959');
        Column.margin({ top: 20 });
        Column.pop();
        TextInput.create({ placeholder: this.placeholder, text: this.inputValue });
        TextInput.placeholderFont({
            size: 20
        });
        TextInput.margin({ left: 5, right: 5, top: 20 });
        TextInput.padding(0);
        TextInput.fontColor('#000000');
        TextInput.backgroundColor('#ffffff');
        TextInput.borderRadius(0);
        TextInput.fontSize(20);
        TextInput.border({
            width: { bottom: 1 },
            color: { bottom: '#D81B60' },
            style: { top: BorderStyle.Solid }
        });
        Column.pop();
        Scroll.pop();
        Stack.pop();
    }
    render() {
        Column.create();
        Button.createWithLabel('自定义全屏弹窗');
        Button.onClick(() => {
            this.dialogController.open();
        });
        Button.pop();
        Column.pop();
    }
}
loadDocument(new SlotExample("1", undefined, {}));
