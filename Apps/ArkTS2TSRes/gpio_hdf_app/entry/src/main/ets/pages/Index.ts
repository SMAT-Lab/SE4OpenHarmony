interface Index_Params {
    gpio?: Gpio;
    gpioSelectValue?: string;
    gpioIsOpen?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Unionman Technology Co., Ltd.
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
import { GpioName, Dir, Val, Gpio } from "@ohos.gpio_ctl";
import Prompt from '@system.prompt';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.gpio = new Gpio(GpioName.GPIO_01, Dir.output);
        this.__gpioSelectValue = new ObservedPropertySimple("GPIO_01", this, "gpioSelectValue");
        this.__gpioIsOpen = new ObservedPropertySimple(false, this, "gpioIsOpen");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.gpio !== undefined) {
            this.gpio = params.gpio;
        }
        if (params.gpioSelectValue !== undefined) {
            this.gpioSelectValue = params.gpioSelectValue;
        }
        if (params.gpioIsOpen !== undefined) {
            this.gpioIsOpen = params.gpioIsOpen;
        }
    }
    aboutToBeDeleted() {
        this.__gpioSelectValue.aboutToBeDeleted();
        this.__gpioIsOpen.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private gpio: Gpio;
    private __gpioSelectValue: ObservedPropertySimple<string>;
    get gpioSelectValue() {
        return this.__gpioSelectValue.get();
    }
    set gpioSelectValue(newValue: string) {
        this.__gpioSelectValue.set(newValue);
    }
    private __gpioIsOpen: ObservedPropertySimple<boolean>;
    get gpioIsOpen() {
        return this.__gpioIsOpen.get();
    }
    set gpioIsOpen(newValue: boolean) {
        this.__gpioIsOpen.set(newValue);
    }
    render() {
        Row.create();
        Row.height('100%');
        Row.onAppear(() => {
            this.gpio = new Gpio(GpioName[this.gpioSelectValue], Dir.output);
            let val = this.gpio.read();
            this.gpioIsOpen = (val === Val.height);
        });
        Column.create();
        Column.width('100%');
        Text.create("GPIO Demo");
        Text.fontSize('60vp');
        Text.lineHeight('60px');
        Text.fontFamily('HarmonyHeiTi-Bold');
        Text.fontWeight(FontWeight.Bold);
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.pop();
        Row.create();
        Text.create("选择pin: ");
        Text.pop();
        Select.create([
            { value: "GPIO_01" },
            { value: "GPIO_02" },
            { value: "GPIO_03" },
            { value: "GPIO_04" },
            { value: "GPIO_05" },
            { value: "GPIO_06" },
            { value: "GPIO_07" },
            { value: "GPIO_08" },
            { value: "GPIO_09" },
            { value: "GPIO_10" },
            { value: "GPIO_11" },
            { value: "GPIO_12" },
            { value: "GPIO_13" },
            { value: "GPIO_14" },
            { value: "GPIO_15" },
            { value: "GPIO_16" },
        ]);
        Select.selected(0);
        Select.value(this.gpioSelectValue);
        Select.onSelect((index: number, value: string) => {
            this.gpioSelectValue = value;
            this.gpio = new Gpio(GpioName[value], Dir.output);
            let val = this.gpio.read();
            this.gpioIsOpen = (val === Val.height);
        });
        Select.pop();
        Row.pop();
        Row.create();
        Text.create("开关: ");
        Text.pop();
        Toggle.create({ type: ToggleType.Switch, isOn: this.gpioIsOpen });
        Toggle.onChange((isOn: boolean) => {
            this.gpioIsOpen = isOn;
            if (isOn) {
                this.gpio.write(Val.height);
            }
            else {
                this.gpio.write(Val.low);
            }
            Prompt.showToast({ message: isOn ? "打开" : "关闭" });
        });
        Toggle.pop();
        Row.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
