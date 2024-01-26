interface PositionDialog_Params {
    model?: BaseCenterMode;
    offsetX?: number;
    offsetY?: number;
    isFixPosition?: boolean;
    positionDialog?: string;
    positionX?: number;
    positionY?: number;
    popupAnimation?: TransitionEffect | undefined;
    slotContent?: () => void;
    controller?: CustomDialogController;
    // 若尝试在CustomDialog中传入多个其他的Controller，以实现在CustomDialog中打开另一个或另一些CustomDialog，那么此处需要将指向自己的controller放在最后
    cancel?: () => void;
    confirm?: () => void;
    animateOptions?: AnimateDialogOptions;
    scaleOptions?: ScaleOptions;
    duration?: number;
    openAnimatedFlag?: boolean;
    showStatus?: Visibility;
    useScale?: boolean;
    animationMode?: string;
    curve?: Curve;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PositionDialog_" + ++__generate__Id;
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
import { BaseCenterMode } from '../model/BaseCenterModel';
import { animateBeforeStartStatus, animateAfterStartStatus } from './positionAnimation';
import { AnimateDialogOptions } from './AnimateDialogOptions';
export class PositionDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new BaseCenterMode(), this, "model");
        this.__offsetX = new ObservedPropertySimple(0, this, "offsetX");
        this.__offsetY = new ObservedPropertySimple(0, this, "offsetY");
        this.__isFixPosition = new ObservedPropertySimple(true, this, "isFixPosition");
        this.__positionDialog = new SynchedPropertySimpleOneWay(params.positionDialog, this, "positionDialog");
        this.__positionX = new ObservedPropertySimple(0, this, "positionX");
        this.__positionY = new ObservedPropertySimple(0, this, "positionY");
        this.slotContent = undefined;
        this.controller = undefined;
        this.cancel = () => { };
        this.confirm = () => { };
        this.__animateOptions = new SynchedPropertyObjectTwoWay(params.animateOptions, this, "animateOptions");
        this.__scaleOptions = new ObservedPropertyObject({
            x: 1,
            y: 1,
            z: 1,
            centerX: '50%',
            centerY: '50%'
        }, this, "scaleOptions");
        this.__duration = new ObservedPropertySimple(1000, this, "duration");
        this.openAnimatedFlag = false;
        this.__showStatus = new ObservedPropertySimple(Visibility.Hidden, this, "showStatus");
        this.__useScale = new ObservedPropertySimple(false, this, "useScale");
        this.__animationMode = new ObservedPropertySimple('translate', this, "animationMode");
        this.curve = Curve.Linear;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PositionDialog_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.offsetX !== undefined) {
            this.offsetX = params.offsetX;
        }
        if (params.offsetY !== undefined) {
            this.offsetY = params.offsetY;
        }
        if (params.isFixPosition !== undefined) {
            this.isFixPosition = params.isFixPosition;
        }
        this.positionDialog = params.positionDialog;
        if (params.positionX !== undefined) {
            this.positionX = params.positionX;
        }
        if (params.positionY !== undefined) {
            this.positionY = params.positionY;
        }
        this.popupAnimation = params.popupAnimation;
        if (params.slotContent !== undefined) {
            this.slotContent = params.slotContent;
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
        if (params.scaleOptions !== undefined) {
            this.scaleOptions = params.scaleOptions;
        }
        if (params.duration !== undefined) {
            this.duration = params.duration;
        }
        if (params.openAnimatedFlag !== undefined) {
            this.openAnimatedFlag = params.openAnimatedFlag;
        }
        if (params.showStatus !== undefined) {
            this.showStatus = params.showStatus;
        }
        if (params.useScale !== undefined) {
            this.useScale = params.useScale;
        }
        if (params.animationMode !== undefined) {
            this.animationMode = params.animationMode;
        }
        if (params.curve !== undefined) {
            this.curve = params.curve;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__offsetX.aboutToBeDeleted();
        this.__offsetY.aboutToBeDeleted();
        this.__isFixPosition.aboutToBeDeleted();
        this.__positionDialog.aboutToBeDeleted();
        this.__positionX.aboutToBeDeleted();
        this.__positionY.aboutToBeDeleted();
        this.__popupAnimation.aboutToBeDeleted();
        this.__animateOptions.aboutToBeDeleted();
        this.__scaleOptions.aboutToBeDeleted();
        this.__duration.aboutToBeDeleted();
        this.__showStatus.aboutToBeDeleted();
        this.__useScale.aboutToBeDeleted();
        this.__animationMode.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<BaseCenterMode>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: BaseCenterMode) {
        this.__model.set(newValue);
    }
    private __offsetX: ObservedPropertySimple<number>;
    get offsetX() {
        return this.__offsetX.get();
    }
    set offsetX(newValue: number) {
        this.__offsetX.set(newValue);
    }
    private __offsetY: ObservedPropertySimple<number>;
    get offsetY() {
        return this.__offsetY.get();
    }
    set offsetY(newValue: number) {
        this.__offsetY.set(newValue);
    }
    private __isFixPosition: ObservedPropertySimple<boolean>;
    get isFixPosition() {
        return this.__isFixPosition.get();
    }
    set isFixPosition(newValue: boolean) {
        this.__isFixPosition.set(newValue);
    }
    private __positionDialog: SynchedPropertySimpleOneWay<string>;
    get positionDialog() {
        return this.__positionDialog.get();
    }
    set positionDialog(newValue: string) {
        this.__positionDialog.set(newValue);
    }
    private __positionX: ObservedPropertySimple<number>;
    get positionX() {
        return this.__positionX.get();
    }
    set positionX(newValue: number) {
        this.__positionX.set(newValue);
    }
    private __positionY: ObservedPropertySimple<number>;
    get positionY() {
        return this.__positionY.get();
    }
    set positionY(newValue: number) {
        this.__positionY.set(newValue);
    }
    private __popupAnimation: SynchedPropertySimpleOneWay<TransitionEffect | undefined>;
    get popupAnimation() {
        return this.__popupAnimation.get();
    }
    set popupAnimation(newValue: TransitionEffect | undefined) {
        this.__popupAnimation.set(newValue);
    }
    private __slotContent?;
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    // 若尝试在CustomDialog中传入多个其他的Controller，以实现在CustomDialog中打开另一个或另一些CustomDialog，那么此处需要将指向自己的controller放在最后
    private cancel: () => void;
    private confirm: () => void;
    private __animateOptions: SynchedPropertySimpleOneWay<AnimateDialogOptions>;
    get animateOptions() {
        return this.__animateOptions.get();
    }
    set animateOptions(newValue: AnimateDialogOptions) {
        this.__animateOptions.set(newValue);
    }
    private __scaleOptions: ObservedPropertyObject<ScaleOptions>;
    get scaleOptions() {
        return this.__scaleOptions.get();
    }
    set scaleOptions(newValue: ScaleOptions) {
        this.__scaleOptions.set(newValue);
    }
    private __duration: ObservedPropertySimple<number>; // 这个值是动画执行时长,
    get duration() {
        return this.__duration.get();
    }
    set duration(newValue: number) {
        this.__duration.set(newValue);
    }
    private openAnimatedFlag: boolean;
    private __showStatus: ObservedPropertySimple<Visibility>;
    get showStatus() {
        return this.__showStatus.get();
    }
    set showStatus(newValue: Visibility) {
        this.__showStatus.set(newValue);
    }
    private __useScale: ObservedPropertySimple<boolean>;
    get useScale() {
        return this.__useScale.get();
    }
    set useScale(newValue: boolean) {
        this.__useScale.set(newValue);
    }
    private __animationMode: ObservedPropertySimple<string>;
    get animationMode() {
        return this.__animationMode.get();
    }
    set animationMode(newValue: string) {
        this.__animationMode.set(newValue);
    }
    private curve: Curve;
    aboutToAppear() {
        this.openAnimatedFlag = true;
        // this.isAnimation = true
        if (this.animateOptions.animate > 7) {
            this.animationMode = 'translate';
        }
        else {
            this.animationMode = 'scale';
        }
        if (this.isFixPosition) {
            if (this.positionDialog == 'left') {
                this.offsetX = -100;
                this.positionX = -100;
            }
            else if (this.positionDialog == 'right') {
                this.offsetX = 100;
                this.positionX = 100;
            }
            else if (this.positionDialog == 'top') {
                this.offsetY = -300;
                this.positionY = -300;
            }
            else if (this.positionDialog == 'bottom') {
                this.offsetY = 300;
                this.positionY = 300;
            }
            else {
                this.offsetY = 0;
                this.positionY = 0;
            }
        }
    }
    executeStartAnimate() {
        let options = animateBeforeStartStatus(this.animateOptions.animate);
        if (options != undefined) {
            this.scaleOptions = options as ScaleOptions;
        }
        this.useScale = true;
        Context.animateTo({ duration: this.duration, curve: this.curve, onFinish: () => {
                this.useScale = false;
            } }, () => {
            let options = animateAfterStartStatus(this.animateOptions.animate);
            if (options != undefined) {
                this.scaleOptions = options as ScaleOptions;
            }
        });
        this.showStatus = Visibility.Visible;
    }
    // 反转动画
    executeEndAnimate() {
        this.animateBeforeEndStatus();
        this.useScale = true;
        Context.animateTo({ duration: this.duration, curve: this.curve, onFinish: () => {
            } }, () => {
            this.animateAfterEndStatus();
        });
    }
    animateBeforeEndStatus() {
        let options = animateAfterStartStatus(this.animateOptions.animate);
        if (options != undefined) {
            this.scaleOptions = options as ScaleOptions;
        }
    }
    animateAfterEndStatus() {
        let options = animateBeforeStartStatus(this.animateOptions.animate);
        if (options != undefined) {
            this.scaleOptions = options as ScaleOptions;
        }
    }
    closeDialog() {
        this.executeEndAnimate();
        this.controller.close();
    }
    aboutToDisappear() {
        if (this.model.isDeleteOnDisappear) {
        }
    }
    render() {
        Stack.create();
        Stack.height('100%');
        Stack.width('100%');
        Stack.onClick(() => {
            this.closeDialog();
        });
        Column.create();
        Column.width(this.model.dialogWidth);
        Column.backgroundColor(this.model.dialogBgColor);
        Column.borderRadius(this.model.dialogBorderRadius);
        Column.padding(this.model.dialogPadding);
        Column.translate({ x: this.offsetX, y: this.offsetY, z: 0 });
        Column.visibility(this.showStatus);
        Column.translate(this.useScale && this.animationMode == 'translate' ? this.scaleOptions : {});
        Column.scale(this.useScale && this.animationMode == 'scale' ? this.scaleOptions : {});
        Column.onAreaChange((oldValue, newValue) => {
            if (this.openAnimatedFlag) {
                this.executeStartAnimate();
            }
        });
        Gesture.create(GesturePriority.Low);
        // 声明该组合手势的类型为Sequence类型
        GestureGroup.create(GestureMode.Sequence);
        // 该组合手势第一个触发的手势为长按手势，且长按手势可多次响应
        LongPressGesture.create({ repeat: true });
        // 该组合手势第一个触发的手势为长按手势，且长按手势可多次响应
        LongPressGesture.onAction((event: GestureEvent) => {
            if (event.repeat) {
            }
            console.info('LongPress onAction');
        });
        // 该组合手势第一个触发的手势为长按手势，且长按手势可多次响应
        LongPressGesture.onActionEnd(() => {
            console.info('LongPress end');
        });
        // 该组合手势第一个触发的手势为长按手势，且长按手势可多次响应
        LongPressGesture.pop();
        // 当长按之后进行拖动，PanGesture手势被触发
        PanGesture.create();
        // 当长按之后进行拖动，PanGesture手势被触发
        PanGesture.onActionStart(() => {
            console.info('pan start');
        });
        // 当长按之后进行拖动，PanGesture手势被触发
        PanGesture.onActionUpdate((event: GestureEvent) => {
            this.offsetX = this.positionX + event.offsetX;
            this.offsetY = this.positionY + event.offsetY;
            console.info('pan update');
        });
        // 当长按之后进行拖动，PanGesture手势被触发
        PanGesture.onActionEnd(() => {
            this.positionX = this.offsetX;
            this.positionY = this.offsetY;
        });
        // 当长按之后进行拖动，PanGesture手势被触发
        PanGesture.pop();
        // 声明该组合手势的类型为Sequence类型
        GestureGroup.pop();
        Gesture.pop();
        Text.create(this.model.title);
        Text.fontSize(this.model.titleFontSize);
        Text.fontColor(this.model.titleFontColor);
        Text.margin(this.model.titleMargin);
        Text.textAlign(this.model.titleTextAlign);
        Text.height(this.model.titleHeight);
        Text.border(this.model.titleBorder);
        Text.width(this.model.titleWight);
        Text.pop();
        Column.create();
        Column.height(this.model.contentHeight);
        Column.margin(this.model.contentMargin);
        If.create();
        if (this.slotContent != undefined) {
            If.branchId(0);
            this.slotContent(this);
        }
        If.pop();
        Column.pop();
        If.create();
        if (this.model.isDisplayBtn) {
            If.branchId(0);
            Column.create();
            Column.width(this.model.btnContentWidth);
            Column.margin(this.model.btnContentMargin);
            Column.border(this.model.btnContentBorder);
            Flex.create({ direction: FlexDirection.Row });
            Button.createWithLabel(this.model.cancelBtnTitle, { type: this.model.btnType });
            Button.fontColor(this.model.cancelBtnFontColor);
            Button.fontSize(this.model.btnFontSize);
            Button.backgroundColor(this.model.cancelBtnBgColor);
            Button.width(this.model.btnWidth);
            Button.height(this.model.btnHeight);
            Button.border(this.model.btnBorder);
            Button.onClick(() => {
                this.closeDialog();
                this.cancel();
            });
            Button.borderRadius(this.model.cancelBtnBorderRadius);
            Button.pop();
            Button.createWithLabel(this.model.confirmBtnTitle, { type: this.model.btnType });
            Button.fontColor(this.model.confirmBtnFontColor);
            Button.fontSize(this.model.btnFontSize);
            Button.backgroundColor(this.model.confirmBtnBgColor);
            Button.width(this.model.btnWidth);
            Button.height(this.model.btnHeight);
            Button.onClick(() => {
                this.closeDialog();
                this.confirm();
            });
            Button.borderRadius(this.model.confirmBtnBorderRadius);
            Button.pop();
            Flex.pop();
            Column.pop();
        }
        If.pop();
        Column.pop();
        Stack.pop();
    }
}
