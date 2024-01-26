interface keyButton_Params {
    interface?: number;
    backColor?: Color;
    btnName?: string;
    intervalID?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "keyButton_" + ++__generate__Id;
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
import gpiotest from '@ohos.gpiotest';
export class keyButton extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__interface = new ObservedPropertySimple(1, this, "interface");
        this.__backColor = new ObservedPropertySimple(Color.Red, this, "backColor");
        this.__btnName = new ObservedPropertySimple("电源键", this, "btnName");
        this.intervalID = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: keyButton_Params) {
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
    // interface:1，表示是电源键 interface:2，表示是升级键
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
        if (this.interface == 1) {
            this.intervalID = setInterval(() => {
                gpiotest.UM_power_test().then((ret) => {
                    if (ret == 1) {
                        this.backColor = Color.Green;
                        clearInterval(this.intervalID);
                    }
                });
            }, 1000);
        }
        else if (this.interface == 2) {
            this.btnName = "升级键";
            this.intervalID = setInterval(() => {
                gpiotest.UM_update_test().then((ret) => {
                    if (ret == 1) {
                        this.backColor = Color.Green;
                        clearInterval(this.intervalID);
                    }
                });
            }, 1000);
        }
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
