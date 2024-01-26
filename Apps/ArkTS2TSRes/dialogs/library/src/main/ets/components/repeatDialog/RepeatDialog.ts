interface RepeatDialog_Params {
    model?: BaseCenterMode;
    offsetX?: number;
    offsetY?: number;
    positionX?: number;
    positionY?: number;
    popupAnimation?: TransitionEffect | undefined;
    slotContent?: () => void;
    controller?: CustomDialogController;
    // 若尝试在CustomDialog中传入多个其他的Controller，以实现在CustomDialog中打开另一个或另一些CustomDialog，那么此处需要将指向自己的controller放在最后
    cancel?: () => void;
    confirm?: () => void;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "RepeatDialog_" + ++__generate__Id;
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
export class RepeatDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new BaseCenterMode(), this, "model");
        this.__offsetX = new ObservedPropertySimple(0, this, "offsetX");
        this.__offsetY = new ObservedPropertySimple(0, this, "offsetY");
        this.__positionX = new ObservedPropertySimple(0, this, "positionX");
        this.__positionY = new ObservedPropertySimple(0, this, "positionY");
        this.slotContent = undefined;
        this.controller = undefined;
        this.cancel = () => { };
        this.confirm = () => { };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: RepeatDialog_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.offsetX !== undefined) {
            this.offsetX = params.offsetX;
        }
        if (params.offsetY !== undefined) {
            this.offsetY = params.offsetY;
        }
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
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__offsetX.aboutToBeDeleted();
        this.__offsetY.aboutToBeDeleted();
        this.__positionX.aboutToBeDeleted();
        this.__positionY.aboutToBeDeleted();
        this.__popupAnimation.aboutToBeDeleted();
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
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    // 若尝试在CustomDialog中传入多个其他的Controller，以实现在CustomDialog中打开另一个或另一些CustomDialog，那么此处需要将指向自己的controller放在最后
    private cancel: () => void;
    private confirm: () => void;
    aboutToDisappear() {
        if (this.model.isDeleteOnDisappear) {
            this.controller = undefined;
        }
    }
    render() {
        Column.create();
        Column.onClick(() => {
            return;
        });
        Column.width(this.model.dialogWidth);
        Column.backgroundColor(this.model.dialogBgColor);
        Column.borderRadius(this.model.dialogBorderRadius);
        Column.padding(this.model.dialogPadding);
        Column.translate({ x: this.offsetX, y: this.offsetY, z: 0 });
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
                if (this.controller != undefined) {
                    this.controller.close();
                }
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
                if (this.controller != undefined) {
                    this.controller.close();
                }
                this.confirm();
            });
            Button.borderRadius(this.model.confirmBtnBorderRadius);
            Button.pop();
            Flex.pop();
            Column.pop();
        }
        If.pop();
        Column.pop();
    }
}
