interface MessageDialog_Params {
    model?: BaseCenterMode;
    offsetX?: number;
    offsetY?: number;
    isFixPosition?: boolean;
    positionDialog?: string;
    positionX?: number;
    positionY?: number;
    blurValue?: number;
    controller?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MessageDialog_" + ++__generate__Id;
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
export class MessageDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new BaseCenterMode(), this, "model");
        this.__offsetX = new ObservedPropertySimple(0, this, "offsetX");
        this.__offsetY = new ObservedPropertySimple(0, this, "offsetY");
        this.__isFixPosition = new ObservedPropertySimple(true, this, "isFixPosition");
        this.__positionDialog = new SynchedPropertySimpleOneWay(params.positionDialog, this, "positionDialog");
        this.__positionX = new ObservedPropertySimple(0, this, "positionX");
        this.__positionY = new ObservedPropertySimple(0, this, "positionY");
        this.__blurValue = new SynchedPropertySimpleTwoWay(params.blurValue, this, "blurValue");
        this.controller = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MessageDialog_Params) {
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
        if (params.controller !== undefined) {
            this.controller = params.controller;
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
        this.__blurValue.aboutToBeDeleted();
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
    private __blurValue: SynchedPropertySimpleTwoWay<number>;
    get blurValue() {
        return this.__blurValue.get();
    }
    set blurValue(newValue: number) {
        this.__blurValue.set(newValue);
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    // 若尝试在CustomDialog中传入多个其他的Controller，以实现在CustomDialog中打开另一个或另一些CustomDialog，那么此处需要将指向自己的controller放在最后
    aboutToAppear() {
        if (this.isFixPosition) {
            if (this.positionDialog == 'left') {
                this.offsetX = -75;
                this.positionX = -75;
            }
            else if (this.positionDialog == 'right') {
                this.offsetX = 75;
                this.positionX = 75;
            }
            else {
                this.offsetX = 0;
                this.positionX = 0;
            }
            if (this.positionDialog == 'top') {
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
    aboutToDisappear() {
        this.blurValue = 0;
    }
    render() {
        Column.create();
        Column.width(this.model.dialogWidth);
        Column.backgroundColor(this.model.dialogBgColor);
        Column.borderRadius(this.model.dialogBorderRadius);
        Column.transition(this.model.popupAnimation);
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
        Text.create(this.model.contentValue);
        Text.fontSize(this.model.contentFontSize);
        Text.padding(this.model.contentPadding);
        Text.fontColor(this.model.contentFontColor);
        Text.pop();
        Column.pop();
    }
}
