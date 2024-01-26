interface pwmButton_Params {
    interface?: number;
    backColor?: Color;
    btnName?: string;
    // 创建一个controller
    controller?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "pwmButton_" + ++__generate__Id;
}
/*
 * Copyright 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { commonButton } from './commonButton';
// @ts-ignore
import pwmtest from '@ohos.pwmtest';
import { CustomBatteryDialog } from './dialog';
export class pwmButton extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__interface = new ObservedPropertySimple(1, this, "interface");
        this.__backColor = new ObservedPropertySimple(Color.Red, this, "backColor");
        this.__btnName = new ObservedPropertySimple("PWM_1", this, "btnName");
        this.controller = new CustomDialogController({
            builder: () => {
                let jsDialog = new CustomBatteryDialog("3", this, {
                    backColor: this.__backColor,
                    title: "PWM",
                    message: "舵机正转又反转说明合格。"
                });
                jsDialog.setController(this.
                // 创建一个controller
                controller);
                View.create(jsDialog);
            },
            cancel: () => {
                console.log("cancel"); // 点击蒙层的回调
            },
            autoCancel: true,
            customStyle: true // 使用自定义样式
        }, this);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: pwmButton_Params) {
        if (params.interface !== undefined) {
            this.interface = params.interface;
        }
        if (params.backColor !== undefined) {
            this.backColor = params.backColor;
        }
        if (params.btnName !== undefined) {
            this.btnName = params.btnName;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__interface.aboutToBeDeleted();
        this.__backColor.aboutToBeDeleted();
        this.__btnName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __interface: ObservedPropertySimple<number>;
    get interface() {
        return this.__interface.get();
    }
    set interface(newValue: number) {
        this.__interface.set(newValue);
    }
    private __backColor: ObservedPropertySimple<Color>;
    get backColor() {
        return this.__backColor.get();
    }
    set backColor(newValue: Color) {
        this.__backColor.set(newValue);
    }
    private __btnName: ObservedPropertySimple<string>;
    get btnName() {
        return this.__btnName.get();
    }
    set btnName(newValue: string) {
        this.__btnName.set(newValue);
    }
    // 创建一个controller
    private controller: CustomDialogController;
    aboutToDisappear() {
        delete this.controller, // 删除dialogController
            this.controller = undefined; // 将dialogController置空
    }
    aboutToAppear() {
        if (this.interface == 1) {
            this.interface = 0;
        }
        if (this.interface == 2) {
            this.btnName = "PWM_2";
        }
    }
    render() {
        __Common__.create();
        __Common__.onClick(() => {
            this.controller.open();
            pwmtest.UM_pwm_test(this.interface, 2500000);
            setTimeout(() => {
                pwmtest.UM_pwm_test(this.interface, 500000);
            }, 1000);
        });
        let earlierCreatedChild_2: commonButton = (this && this.findChildById) ? this.findChildById("2") as commonButton : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new commonButton("2", this, {
                backColor: this.__backColor,
                btnName: this.__btnName,
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        __Common__.pop();
    }
}
