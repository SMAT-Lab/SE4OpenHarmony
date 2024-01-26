interface usbButton_Params {
    interface?: number;
    backColor?: Color;
    btnName?: string;
    intervalID?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "usbButton_" + ++__generate__Id;
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
import usbtest from '@ohos.usbtest';
import prompt from '@ohos.prompt';
export class usbButton extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__interface = new ObservedPropertySimple(1, this, "interface");
        this.__backColor = new ObservedPropertySimple(Color.Red, this, "backColor");
        this.__btnName = new ObservedPropertySimple("USB2_1", this, "btnName");
        this.intervalID = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: usbButton_Params) {
        if (params.interface !== undefined) {
            this.interface = params.interface;
        }
        if (params.backColor !== undefined) {
            this.backColor = params.backColor;
        }
        if (params.btnName !== undefined) {
            this.btnName = params.btnName;
        }
        if (params.intervalID !== undefined) {
            this.intervalID = params.intervalID;
        }
    }
    aboutToBeDeleted() {
        this.__interface.aboutToBeDeleted();
        this.__backColor.aboutToBeDeleted();
        this.__btnName.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // interface:1，表示是USB2_1 interface:2，表示是USB2_2  interface:3，表示是USB2_3 interface:4，表示是USB3.0
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
    private intervalID;
    aboutToDisappear() {
        clearInterval(this.intervalID);
    }
    aboutToAppear() {
        switch (this.interface) {
            case 1:
                this.btnName = "USB2_1";
                break;
            case 2:
                this.btnName = "USB2_2";
                break;
            case 3:
                this.btnName = "USB2_3";
                break;
            default:
                this.btnName = "USB3.0";
                break;
        }
        this.intervalID = setInterval(() => {
            usbtest.UM_usb_test(this.interface).then((ret) => {
                if (ret == 1) {
                    this.backColor = Color.Green;
                    clearInterval(this.intervalID);
                }
            });
        }, 1000);
    }
    render() {
        Column.create();
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
        Column.pop();
    }
}
