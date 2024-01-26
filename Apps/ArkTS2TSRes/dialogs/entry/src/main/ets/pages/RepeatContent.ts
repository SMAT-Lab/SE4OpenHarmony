interface RepeatDialogExample_Params {
    scroller?: Scroller;
    model?: BaseCenterMode;
    inputValue?: string;
    animateOption?: AnimateDialogOptions;
    dialogController?: CustomDialogController | undefined;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "RepeatContent_" + ++__generate__Id;
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
import { RepeatDialog, BaseCenterMode } from '@ohos/dialogs';
import { AnimateEffect, AnimateDialogOptions } from '@ohos/dialogs';
import { TitleBorder, BtnContentBorder } from '@ohos/dialogs';
class RepeatDialogExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.__model = new ObservedPropertyObject(new BaseCenterMode(), this, "model");
        this.__inputValue = new ObservedPropertySimple('click me', this, "inputValue");
        this.__animateOption = new ObservedPropertyObject({ animate: AnimateEffect.TranslateFromTop }, this, "animateOption");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new RepeatDialog({
                    slotContent: () => {
                        this.componentBuilder();
                    },
                    model: this.model,
                    cancel: this.onCancel,
                    confirm: this.onAccept,
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            cancel: this.existApp,
            autoCancel: true,
            alignment: DialogAlignment.Center,
            offset: { dx: 0, dy: 0 },
            gridCount: 4,
            customStyle: true
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: RepeatDialogExample_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.inputValue !== undefined) {
            this.inputValue = params.inputValue;
        }
        if (params.animateOption !== undefined) {
            this.animateOption = params.animateOption;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__inputValue.aboutToBeDeleted();
        this.__animateOption.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private __model: ObservedPropertyObject<BaseCenterMode>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: BaseCenterMode) {
        this.__model.set(newValue);
    }
    private __inputValue: ObservedPropertySimple<string>;
    get inputValue() {
        return this.__inputValue.get();
    }
    set inputValue(newValue: string) {
        this.__inputValue.set(newValue);
    }
    private __animateOption: ObservedPropertyObject<AnimateDialogOptions>;
    get animateOption() {
        return this.__animateOption.get();
    }
    set animateOption(newValue: AnimateDialogOptions) {
        this.__animateOption.set(newValue);
    }
    aboutToAppear() {
        this.model.dialogPadding = { left: 10, right: 10 };
        this.model.dialogBgColor = '#F0A0CA';
        this.model.title = '复用项目已有组件';
        this.model.titleFontColor = Color.Red;
        this.model.contentHeight = 100;
        this.model.titleMargin = { top: 10, bottom: 10 };
        this.model.contentMargin = { left: 10, right: 10, bottom: 0 };
        let btnContentBorder: BtnContentBorder = {
            width: { top: 1 },
            color: { top: Color.Yellow },
            style: { top: BorderStyle.Solid },
        };
        this.model.btnContentBorder = btnContentBorder;
        this.model.cancelBtnTitle = 'cancel';
        this.model.cancelBtnFontColor = '#6E495D';
        this.model.confirmBtnFontColor = '#6E495D';
        this.model.cancelBtnBgColor = '#F0A0CA';
        this.model.confirmBtnBgColor = '#F0A0CA';
        this.model.confirmBtnTitle = 'OK';
        let titleBorder: TitleBorder = {
            width: { bottom: 1 },
            color: { bottom: Color.Yellow },
            style: { bottom: BorderStyle.Solid },
        };
        this.model.titleBorder = titleBorder;
    }
    componentBuilder(parent = null) {
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.height('100%');
        Stack.padding(10);
        Scroll.create(this.scroller);
        Column.create();
        Text.create('你可以为弹窗选择任意一种动画，但这并不必要，因为我已经默认给每种弹窗设定了最佳动画！对于你自定义的弹窗，可以随心选中心仪的动画方案。');
        Text.fontColor(Color.Black);
        Text.fontSize(20);
        Text.pop();
        Column.pop();
        Scroll.pop();
        Stack.pop();
    }
    private dialogController: CustomDialogController | undefined;
    // 在自定义组件即将析构销毁时将dialogControlle删除和置空
    aboutToDisappear() {
        this.dialogController = undefined; // 将dialogController置空
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
    render() {
        Column.create();
        Column.width('100%');
        Column.margin({ top: 5 });
        Column.backdropBlur(20);
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center });
        Button.createWithLabel('使用内置弹窗绑定项目已有布局');
        Button.onClick(() => {
            if (this.dialogController != undefined) {
                this.dialogController.open();
            }
        });
        Button.pop();
        Flex.pop();
        Column.pop();
    }
}
loadDocument(new RepeatDialogExample("1", undefined, {}));
