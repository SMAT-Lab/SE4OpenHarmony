interface AnimateContent_Params {
    inputValue?: string;
    inputValue2?: string;
    dialogProgressNumberController?: CustomDialogController;
    dialogRingController?: CustomDialogController;
    percentValue?: number;
}
interface CustomDialogExample2_Params {
    ringController?: LVCircularRingController;
    ringAnimatedManager?: AnimateManager;
    controller?: CustomDialogController;
    // 若尝试在CustomDialog中传入多个其他的Controller，以实现在CustomDialog中打开另一个或另一些CustomDialog，那么此处需要将指向自己的controller放在最后
    cancel?: () => void;
    confirm?: () => void;
}
interface CustomDialogExample_Params {
    percentValue?: number;
    lvLineWithTextController?: LVLineWithTextController;
    controller?: CustomDialogController;
    // 若尝试在CustomDialog中传入多个其他的Controller，以实现在CustomDialog中打开另一个或另一些CustomDialog，那么此处需要将指向自己的controller放在最后
    cancel?: () => void;
    confirm?: () => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AnimateContent_" + ++__generate__Id;
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
import { AnimateInputDialog, AnimateEffect, AnimateDialogOptions } from '@ohos/dialogs';
import { LVLineWithTextController, LVLineWithText } from '@ohos/dialogs';
import { LVCircularRing, LVCircularRingController, AnimateManager, Switch } from '@ohos/dialogs';
import animator from "@ohos.animator";
class CustomDialogExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__percentValue = new SynchedPropertySimpleTwoWay(params.percentValue, this, "percentValue");
        this.__lvLineWithTextController = new ObservedPropertyObject(new LVLineWithTextController()
            .setViewColor("rgb(33,66,77)").setTextColor("rgb(233, 166, 177)"), this, "lvLineWithTextController");
        this.controller = undefined;
        this.cancel = () => { };
        this.confirm = () => { };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomDialogExample_Params) {
        if (params.lvLineWithTextController !== undefined) {
            this.lvLineWithTextController = params.lvLineWithTextController;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
    }
    aboutToBeDeleted() {
        this.__percentValue.aboutToBeDeleted();
        this.__lvLineWithTextController.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __percentValue: SynchedPropertySimpleTwoWay<number>;
    get percentValue() {
        return this.__percentValue.get();
    }
    set percentValue(newValue: number) {
        this.__percentValue.set(newValue);
    }
    private __lvLineWithTextController: ObservedPropertyObject<LVLineWithTextController>;
    get lvLineWithTextController() {
        return this.__lvLineWithTextController.get();
    }
    set lvLineWithTextController(newValue: LVLineWithTextController) {
        this.__lvLineWithTextController.set(newValue);
    }
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    // 若尝试在CustomDialog中传入多个其他的Controller，以实现在CustomDialog中打开另一个或另一些CustomDialog，那么此处需要将指向自己的controller放在最后
    private cancel: () => void;
    private confirm: () => void;
    render() {
        Stack.create();
        Stack.width(300);
        Stack.height(50);
        Stack.backgroundColor('#33000000');
        Stack.pop();
    }
}
class CustomDialogExample2 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__ringController = new ObservedPropertyObject(new LVCircularRingController()
            .setViewColor("#64ffffff").setBarColor("#FFFF00"), this, "ringController");
        this.__ringAnimatedManager = new ObservedPropertyObject({
            animatedSwitch: Switch.CLOSE
        }, this, "ringAnimatedManager");
        this.controller = undefined;
        this.cancel = () => { };
        this.confirm = () => { };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomDialogExample2_Params) {
        if (params.ringController !== undefined) {
            this.ringController = params.ringController;
        }
        if (params.ringAnimatedManager !== undefined) {
            this.ringAnimatedManager = params.ringAnimatedManager;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
    }
    aboutToBeDeleted() {
        this.__ringController.aboutToBeDeleted();
        this.__ringAnimatedManager.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __ringController: ObservedPropertyObject<LVCircularRingController>;
    get ringController() {
        return this.__ringController.get();
    }
    set ringController(newValue: LVCircularRingController) {
        this.__ringController.set(newValue);
    }
    private __ringAnimatedManager: ObservedPropertyObject<AnimateManager>;
    get ringAnimatedManager() {
        return this.__ringAnimatedManager.get();
    }
    set ringAnimatedManager(newValue: AnimateManager) {
        this.__ringAnimatedManager.set(newValue);
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    // 若尝试在CustomDialog中传入多个其他的Controller，以实现在CustomDialog中打开另一个或另一些CustomDialog，那么此处需要将指向自己的controller放在最后
    private cancel: () => void;
    private confirm: () => void;
    render() {
        Column.create();
        Column.alignItems(HorizontalAlign.Center);
        Column.justifyContent(FlexAlign.Center);
        Column.width(300);
        Column.height(300);
        Column.backgroundColor('#33000000');
        Row.create();
        Row.margin({ top: 50 });
        Button.createWithLabel('时间0.5s');
        Button.onClick(() => {
            this.ringAnimatedManager = {
                animatedSwitch: Switch.OPEN
            };
        });
        Button.pop();
        Button.createWithLabel('时间5s');
        Button.onClick(() => {
            this.ringAnimatedManager = {
                animatedSwitch: Switch.OPEN,
                duration: 5000
            };
        });
        Button.pop();
        Button.createWithLabel('关闭');
        Button.onClick(() => {
            this.ringAnimatedManager = {
                animatedSwitch: Switch.CLOSE
            };
        });
        Button.pop();
        Row.pop();
        Column.pop();
    }
}
class AnimateContent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__inputValue = new ObservedPropertySimple('点击展示数字百分比', this, "inputValue");
        this.__inputValue2 = new ObservedPropertySimple('点击展示圆环', this, "inputValue2");
        this.dialogProgressNumberController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogExample("2", this, {
                    percentValue: this.__percentValue
                });
                jsDialog.setController(this.dialogProgressNumberController);
                View.create(jsDialog);
            },
            autoCancel: true,
            alignment: DialogAlignment.Center,
            customStyle: true
        }, this);
        this.dialogRingController = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomDialogExample2("3", this, {});
                jsDialog.setController(this.dialogRingController);
                View.create(jsDialog);
            },
            autoCancel: true,
            alignment: DialogAlignment.Center,
            customStyle: true
        }, this);
        this.__percentValue = new ObservedPropertySimple(0, this, "percentValue");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AnimateContent_Params) {
        if (params.inputValue !== undefined) {
            this.inputValue = params.inputValue;
        }
        if (params.inputValue2 !== undefined) {
            this.inputValue2 = params.inputValue2;
        }
        if (params.dialogProgressNumberController !== undefined) {
            this.dialogProgressNumberController = params.dialogProgressNumberController;
        }
        if (params.dialogRingController !== undefined) {
            this.dialogRingController = params.dialogRingController;
        }
        if (params.percentValue !== undefined) {
            this.percentValue = params.percentValue;
        }
    }
    aboutToBeDeleted() {
        this.__inputValue.aboutToBeDeleted();
        this.__inputValue2.aboutToBeDeleted();
        this.__percentValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __inputValue: ObservedPropertySimple<string>;
    get inputValue() {
        return this.__inputValue.get();
    }
    set inputValue(newValue: string) {
        this.__inputValue.set(newValue);
    }
    private __inputValue2: ObservedPropertySimple<string>;
    get inputValue2() {
        return this.__inputValue2.get();
    }
    set inputValue2(newValue: string) {
        this.__inputValue2.set(newValue);
    }
    private dialogProgressNumberController: CustomDialogController;
    private dialogRingController: CustomDialogController;
    // 在自定义组件即将析构销毁时将dialogControlle删除和置空
    aboutToDisappear() {
    }
    onCancel() {
        console.info('Callback when the first button is clicked');
    }
    onAccept() {
        console.info('Callback when the second button is clicked');
    }
    existApp() {
        console.info('Click the callback in the blank area');
    }
    private __percentValue: ObservedPropertySimple<number>;
    get percentValue() {
        return this.__percentValue.get();
    }
    set percentValue(newValue: number) {
        this.__percentValue.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.margin({ top: 5 });
        Button.createWithLabel(this.inputValue);
        Button.onClick(() => {
            if (this.dialogProgressNumberController != undefined) {
                this.dialogProgressNumberController.open();
                let animator1 = animator.create({
                    duration: 5000,
                    easing: 'linear',
                    iterations: 1,
                    begin: 0,
                    end: 100,
                    fill: 'none',
                    delay: 0,
                    direction: 'normal'
                });
                animator1.onframe = (inputValue: number) => {
                    console.log('dodo value = ' + inputValue);
                    this.percentValue = Math.floor(inputValue);
                };
                animator1.play();
            }
        });
        Button.backgroundColor(0x317aff);
        Button.pop();
        Button.createWithLabel(this.inputValue2);
        Button.onClick(() => {
            if (this.dialogRingController != undefined) {
                this.dialogRingController.open();
            }
        });
        Button.margin({ top: 20 });
        Button.pop();
        Column.pop();
    }
}
loadDocument(new AnimateContent("1", undefined, {}));
