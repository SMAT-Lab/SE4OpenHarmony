interface CustomDialogExample2_Params {
    scroller?: Scroller;
    model?: BaseCenterMode;
    inputValue?: string;
    isFixPosition?: boolean;
    positionDialog?: string;
    popupAnimation?: TransitionEffect | undefined;
    animateOption?: AnimateDialogOptions;
    curve?: Curve;
    customDialogController?: CustomDialogController;
    dialogController?: CustomDialogController | undefined;
    text?: string;
    index?: number;
    space?: number;
    arrowPosition?: ArrowPosition;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PositionContent_" + ++__generate__Id;
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
import { PositionDialog, BaseCenterMode } from '@ohos/dialogs';
import { AnimateEffect, AnimateDialogOptions } from '@ohos/dialogs';
import { BtnBorder, BtnContentBorder } from '@ohos/dialogs';
class CustomDialogExample2 extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.__model = new ObservedPropertyObject(new BaseCenterMode(), this, "model");
        this.__inputValue = new ObservedPropertySimple('click me', this, "inputValue");
        this.__isFixPosition = new ObservedPropertySimple(true, this, "isFixPosition");
        this.__positionDialog = new ObservedPropertySimple('center', this, "positionDialog");
        this.__popupAnimation = new ObservedPropertyObject(undefined, this, "popupAnimation");
        this.__animateOption = new ObservedPropertyObject({ animate: AnimateEffect.ScaleCenterBottom }, this, "animateOption");
        this.__curve = new ObservedPropertySimple(Curve.EaseIn //动画曲线
        , this, "curve");
        this.customDialogController = undefined;
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new PositionDialog({
                    slotContent: () => {
                        this.componentBuilder();
                    },
                    animateOptions: this.animateOption,
                    model: this.model,
                    cancel: this.onCancel,
                    confirm: this.onAccept,
                    isFixPosition: this.isFixPosition,
                    positionDialog: this.positionDialog,
                    duration: 500,
                    curve: this.curve
                });
                jsDialog.setController(this.dialogController);
                View.create(jsDialog);
            },
            cancel: this.existApp,
            autoCancel: true,
            alignment: DialogAlignment.Center,
            offset: { dx: 0, dy: 0 },
            gridCount: 4,
            customStyle: true,
            // openAnimation:{duration:3000},
            closeAnimation: { duration: 500 }
        }, this);
        this.__text = new ObservedPropertySimple("下拉选择", this, "text");
        this.__index = new ObservedPropertySimple(2, this, "index");
        this.__space = new ObservedPropertySimple(8, this, "space");
        this.__arrowPosition = new ObservedPropertySimple(ArrowPosition.END, this, "arrowPosition");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CustomDialogExample2_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.inputValue !== undefined) {
            this.inputValue = params.inputValue;
        }
        if (params.isFixPosition !== undefined) {
            this.isFixPosition = params.isFixPosition;
        }
        if (params.positionDialog !== undefined) {
            this.positionDialog = params.positionDialog;
        }
        if (params.popupAnimation !== undefined) {
            this.popupAnimation = params.popupAnimation;
        }
        if (params.animateOption !== undefined) {
            this.animateOption = params.animateOption;
        }
        if (params.curve !== undefined) {
            this.curve = params.curve;
        }
        if (params.customDialogController !== undefined) {
            this.customDialogController = params.customDialogController;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.space !== undefined) {
            this.space = params.space;
        }
        if (params.arrowPosition !== undefined) {
            this.arrowPosition = params.arrowPosition;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__inputValue.aboutToBeDeleted();
        this.__isFixPosition.aboutToBeDeleted();
        this.__positionDialog.aboutToBeDeleted();
        this.__popupAnimation.aboutToBeDeleted();
        this.__animateOption.aboutToBeDeleted();
        this.__curve.aboutToBeDeleted();
        this.__text.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        this.__space.aboutToBeDeleted();
        this.__arrowPosition.aboutToBeDeleted();
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
    private __isFixPosition: ObservedPropertySimple<boolean>;
    get isFixPosition() {
        return this.__isFixPosition.get();
    }
    set isFixPosition(newValue: boolean) {
        this.__isFixPosition.set(newValue);
    }
    private __positionDialog: ObservedPropertySimple<string>;
    get positionDialog() {
        return this.__positionDialog.get();
    }
    set positionDialog(newValue: string) {
        this.__positionDialog.set(newValue);
    }
    private __popupAnimation: ObservedPropertyObject<TransitionEffect | undefined>;
    get popupAnimation() {
        return this.__popupAnimation.get();
    }
    set popupAnimation(newValue: TransitionEffect | undefined) {
        this.__popupAnimation.set(newValue);
    }
    private __animateOption: ObservedPropertyObject<AnimateDialogOptions>;
    get animateOption() {
        return this.__animateOption.get();
    }
    set animateOption(newValue: AnimateDialogOptions) {
        this.__animateOption.set(newValue);
    }
    private __curve: ObservedPropertySimple<Curve>; //动画曲线
    get curve() {
        return this.__curve.get();
    }
    set curve(newValue: Curve) {
        this.__curve.set(newValue);
    }
    private customDialogController?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.customDialogController = ctr;
    }
    aboutToAppear() {
        this.model.title = '标题';
        this.model.titleMargin = { top: 10, bottom: 10 };
        this.model.contentMargin = { left: 10, right: 10, bottom: 30 };
        let btnContentBorder: BtnContentBorder = {
            width: { top: 1 },
            color: { top: '#F6F6F6' },
            style: { top: BorderStyle.Solid },
        };
        this.model.btnContentBorder = btnContentBorder;
        let btnBorder: BtnBorder = {
            width: { right: 1 },
            color: { right: '#F6F6F6' },
            style: { right: BorderStyle.Solid }
        };
        this.model.btnBorder = btnBorder;
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
        Column.create();
        Column.height(200);
        Column.width('100%');
        Column.backgroundColor(Color.Pink);
        Column.pop();
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
    private __text: ObservedPropertySimple<string>;
    get text() {
        return this.__text.get();
    }
    set text(newValue: string) {
        this.__text.set(newValue);
    }
    private __index: ObservedPropertySimple<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private __space: ObservedPropertySimple<number>;
    get space() {
        return this.__space.get();
    }
    set space(newValue: number) {
        this.__space.set(newValue);
    }
    private __arrowPosition: ObservedPropertySimple<ArrowPosition>;
    get arrowPosition() {
        return this.__arrowPosition.get();
    }
    set arrowPosition(newValue: ArrowPosition) {
        this.__arrowPosition.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.margin({ top: 5 });
        Column.backdropBlur(20);
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center });
        Text.create('请选择动画：');
        Text.pop();
        Select.create([
            { value: 'TranslateFromCenter' },
            { value: 'TranslateFromTop' },
            { value: 'TranslateFromBottom' },
            { value: 'TranslateFromLeft' },
            { value: 'TranslateFromRight' },
            { value: 'TranslateFromLeftTop' },
            { value: 'TranslateFromLeftBottom' },
            { value: 'TranslateRightTop' },
            { value: 'TranslateFromRightBottom' },
            { value: 'ScaleLeftTop' },
            { value: 'ScaleLeftBottom' },
            { value: 'ScaleRightTop' },
            { value: 'ScaleRightBottom' },
            { value: 'ScaleCenterLeft' },
            { value: 'ScaleCenterTop' },
            { value: 'ScaleCenterRight' },
            { value: 'ScaleCenterBottom' }
        ]);
        Select.value(this.text);
        Select.font({ size: 16, weight: 500 });
        Select.fontColor('#182431');
        Select.selectedOptionFont({ size: 16, weight: 400 });
        Select.optionFont({ size: 16, weight: 400 });
        Select.space(this.space);
        Select.arrowPosition(this.arrowPosition);
        Select.onSelect((index: number, text: string) => {
            let option = new AnimateDialogOptions();
            option.animate = AnimateEffect[text];
            this.animateOption = option;
            if (this.dialogController != undefined) {
                this.dialogController.open();
            }
            this.text = text;
        });
        Select.pop();
        Flex.pop();
        Column.pop();
    }
}
loadDocument(new CustomDialogExample2("1", undefined, {}));
