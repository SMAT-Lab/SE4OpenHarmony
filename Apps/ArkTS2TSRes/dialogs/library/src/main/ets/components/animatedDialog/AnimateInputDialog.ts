interface AnimateInputDialog_Params {
    controller?: CustomDialogController;
    inputValue?: string;
    title?: string;
    isDisplay?: boolean;
    cancel?: () => void;
    confirm?: () => void;
    showDialog?: boolean;
    duration?: number;
    openAnimatedFlag?: boolean;
    compDialogWidth?: number;
    compDialogHeight?: number;
    showStatus?: Visibility;
    useScale?: boolean;
    scaleOptions?: ScaleOptions;
    animateOptions?: AnimateDialogOptions;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AnimateInputDialog_" + ++__generate__Id;
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
import radio from '@ohos.telephony.radio';
import { AnimateDialogOptions } from './AnimateDialogOptions';
import { AnimateEffect } from './AnimateEffect';
export class AnimateInputDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.controller = undefined;
        this.inputValue = '测试动画内容';
        this.title = '测试动画';
        this.isDisplay = true;
        this.cancel = () => { };
        this.confirm = () => { };
        this.__showDialog = new ObservedPropertySimple(true, this, "showDialog");
        this.duration = 1000;
        this.openAnimatedFlag = false;
        this.compDialogWidth = 0;
        this.compDialogHeight = 0;
        this.__showStatus = new ObservedPropertySimple(Visibility.Hidden, this, "showStatus");
        this.__useScale = new ObservedPropertySimple(false, this, "useScale");
        this.__scaleOptions = new ObservedPropertyObject({
            x: 1,
            y: 1,
            z: 1,
            centerX: '50%',
            centerY: '50%'
        }, this, "scaleOptions");
        this.__animateOptions = new SynchedPropertyObjectTwoWay(params.animateOptions, this, "animateOptions");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AnimateInputDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.inputValue !== undefined) {
            this.inputValue = params.inputValue;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.isDisplay !== undefined) {
            this.isDisplay = params.isDisplay;
        }
        if (params.cancel !== undefined) {
            this.cancel = params.cancel;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
        if (params.showDialog !== undefined) {
            this.showDialog = params.showDialog;
        }
        if (params.duration !== undefined) {
            this.duration = params.duration;
        }
        if (params.openAnimatedFlag !== undefined) {
            this.openAnimatedFlag = params.openAnimatedFlag;
        }
        if (params.compDialogWidth !== undefined) {
            this.compDialogWidth = params.compDialogWidth;
        }
        if (params.compDialogHeight !== undefined) {
            this.compDialogHeight = params.compDialogHeight;
        }
        if (params.showStatus !== undefined) {
            this.showStatus = params.showStatus;
        }
        if (params.useScale !== undefined) {
            this.useScale = params.useScale;
        }
        if (params.scaleOptions !== undefined) {
            this.scaleOptions = params.scaleOptions;
        }
    }
    aboutToBeDeleted() {
        this.__showDialog.aboutToBeDeleted();
        this.__showStatus.aboutToBeDeleted();
        this.__useScale.aboutToBeDeleted();
        this.__scaleOptions.aboutToBeDeleted();
        this.__animateOptions.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private inputValue: string;
    private title: string;
    private isDisplay: boolean;
    private cancel: () => void;
    private confirm: () => void;
    private __showDialog: ObservedPropertySimple<boolean>;
    get showDialog() {
        return this.__showDialog.get();
    }
    set showDialog(newValue: boolean) {
        this.__showDialog.set(newValue);
    }
    private duration: number; // 这个值是动画执行时长,
    private openAnimatedFlag: boolean;
    private compDialogWidth: number;
    private compDialogHeight: number;
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
    private __scaleOptions: ObservedPropertyObject<ScaleOptions>;
    get scaleOptions() {
        return this.__scaleOptions.get();
    }
    set scaleOptions(newValue: ScaleOptions) {
        this.__scaleOptions.set(newValue);
    }
    private __animateOptions: SynchedPropertySimpleOneWay<AnimateDialogOptions>;
    get animateOptions() {
        return this.__animateOptions.get();
    }
    set animateOptions(newValue: AnimateDialogOptions) {
        this.__animateOptions.set(newValue);
    }
    closeDialog() {
        this.executeEndAnimate();
        this.controller.close();
    }
    aboutToAppear() {
        this.openAnimatedFlag = true;
    }
    aboutToDisappear() {
    }
    animateBeforeStartStatus() {
        if (AnimateEffect.ScaleLeftTop == this.animateOptions.animate) {
            this.scaleOptions = {
                x: 0,
                y: 0,
                z: 1,
                centerX: 0,
                centerY: 0,
            };
        }
        else if (AnimateEffect.ScaleLeftBottom == this.animateOptions.animate) {
            this.scaleOptions = {
                x: 0,
                y: 0,
                z: 1,
                centerX: 0,
                centerY: '100%',
            };
        }
        else if (AnimateEffect.ScaleRightTop == this.animateOptions.animate) {
            this.scaleOptions = {
                x: 0,
                y: 0,
                z: 1,
                centerX: '100%',
                centerY: 0,
            };
        }
        else if (AnimateEffect.ScaleRightBottom == this.animateOptions.animate) {
            this.scaleOptions = {
                x: 0,
                y: 0,
                z: 1,
                centerX: '100%',
                centerY: '100%',
            };
        }
        else if (AnimateEffect.ScaleCenterLeft == this.animateOptions.animate) {
            this.scaleOptions = {
                x: 0,
                y: 1,
                z: 1,
                centerX: 0,
                centerY: '50%',
            };
        }
        else if (AnimateEffect.ScaleCenterRight == this.animateOptions.animate) {
            this.scaleOptions = {
                x: 0,
                y: 1,
                z: 1,
                centerX: '100%',
                centerY: '50%',
            };
        }
        else if (AnimateEffect.ScaleCenterTop == this.animateOptions.animate) {
            this.scaleOptions = {
                x: 1,
                y: 0,
                z: 1,
                centerX: '50%',
                centerY: 0,
            };
        }
        else if (AnimateEffect.ScaleCenterBottom == this.animateOptions.animate) {
            this.scaleOptions = {
                x: 1,
                y: 0,
                z: 1,
                centerX: '50%',
                centerY: '100%',
            };
        }
    }
    animateAfterStartStatus() {
        if (AnimateEffect.ScaleLeftTop == this.animateOptions.animate) {
            this.scaleOptions = {
                x: 1,
                y: 1,
                z: 1,
                centerX: 0,
                centerY: 0,
            };
        }
        else if (AnimateEffect.ScaleLeftBottom == this.animateOptions.animate) {
            this.scaleOptions = {
                x: 1,
                y: 1,
                z: 1,
                centerX: 0,
                centerY: '100%',
            };
        }
        else if (AnimateEffect.ScaleRightTop == this.animateOptions.animate) {
            this.scaleOptions = {
                x: 1,
                y: 1,
                z: 1,
                centerX: '100%',
                centerY: 0,
            };
        }
        else if (AnimateEffect.ScaleRightBottom == this.animateOptions.animate) {
            this.scaleOptions = {
                x: 1,
                y: 1,
                z: 1,
                centerX: '100%',
                centerY: '100%',
            };
        }
        else if (AnimateEffect.ScaleCenterLeft == this.animateOptions.animate) {
            this.scaleOptions = {
                x: 1,
                y: 1,
                z: 1,
                centerX: 0,
                centerY: '50%',
            };
        }
        else if (AnimateEffect.ScaleCenterRight == this.animateOptions.animate) {
            this.scaleOptions = {
                x: 1,
                y: 1,
                z: 1,
                centerX: '100%',
                centerY: '50%',
            };
        }
        else if (AnimateEffect.ScaleCenterTop == this.animateOptions.animate) {
            this.scaleOptions = {
                x: 1,
                y: 1,
                z: 1,
                centerX: '50%',
                centerY: 0,
            };
        }
        else if (AnimateEffect.ScaleCenterBottom == this.animateOptions.animate) {
            this.scaleOptions = {
                x: 1,
                y: 1,
                z: 1,
                centerX: '50%',
                centerY: '100%',
            };
        }
    }
    animateBeforeEndStatus() {
        this.animateAfterStartStatus();
    }
    animateAfterEndStatus() {
        this.animateBeforeStartStatus();
    }
    // 开启动画
    executeStartAnimate() {
        this.animateBeforeStartStatus();
        this.useScale = true;
        Context.animateTo({ duration: this.duration, curve: Curve.Linear, onFinish: () => {
                this.useScale = false;
            } }, () => {
            this.animateAfterStartStatus();
        });
        this.showStatus = Visibility.Visible;
    }
    // 反转动画
    executeEndAnimate() {
        this.animateBeforeEndStatus();
        this.useScale = true;
        Context.animateTo({ duration: this.duration, curve: Curve.Linear, onFinish: () => {
            } }, () => {
            this.animateAfterEndStatus();
        });
    }
    render() {
        Stack.create();
        Stack.onClick(() => {
            this.closeDialog();
            // this.controller.close()
        });
        Column.create();
        Column.width('80%');
        Column.backgroundColor('#232323');
        Column.borderRadius(10);
        Column.visibility(this.showStatus);
        Column.scale(this.useScale ? this.scaleOptions : {});
        Column.onAreaChange((oldValue, newValue) => {
            this.compDialogWidth = newValue.width as number;
            this.compDialogHeight = newValue.height as number;
            if (this.openAnimatedFlag) {
                this.executeStartAnimate();
            }
        });
        Column.onClick(() => {
            return;
        });
        Text.create(this.title);
        Text.fontSize(24);
        Text.padding(5);
        Text.height(60);
        Text.fontColor('#ffffff');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Text.create('这里是提示内容区域');
        Text.fontSize(18);
        Text.padding(5);
        Text.height(40);
        Text.fontColor('#ffffff');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        If.create();
        if (this.isDisplay) {
            If.branchId(0);
            Column.create();
            Column.height(60);
            Column.width('100%');
            Column.margin({ top: 20 });
            Column.border({
                width: { top: 1 },
                color: { top: '#ffffff' },
                style: { top: BorderStyle.Solid },
            });
            Flex.create({ direction: FlexDirection.Row });
            Flex.width('100%');
            Text.create('Cancel');
            Text.fontColor('#ffffff');
            Text.textAlign(TextAlign.Center);
            Text.width('50%');
            Text.height('100%');
            Text.lineHeight('100%');
            Text.border({
                width: { right: 1 },
                color: { right: '#ffffff' },
                style: { top: BorderStyle.Solid }
            });
            Text.onClick(() => {
                this.closeDialog();
                this.cancel();
            });
            Text.pop();
            Text.create('Ok');
            Text.fontColor("#ffffff");
            Text.textAlign(TextAlign.Center);
            Text.width('50%');
            Text.height('100%');
            Text.lineHeight('100%');
            Text.onClick(() => {
                this.closeDialog();
                this.confirm();
            });
            Text.pop();
            Flex.pop();
            Column.pop();
        }
        If.pop();
        Column.pop();
        Stack.pop();
    }
}
