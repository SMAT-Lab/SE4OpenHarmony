interface TextPickerExample_Params {
    value?: string | string[];
    select?: number;
    gpionumber?: string[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "gpio_" + ++__generate__Id;
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
import gpio from '@ohos.gpioled';
import prompt from '@ohos.prompt';
function setgpioon(value: string | string[]) {
    switch (value) {
        case 'gpio1': {
            gpio.setLedStatus(380, 1).then(() => { });
        }
        case 'gpio2': {
            gpio.setLedStatus(381, 1).then(() => { });
        }
        case 'gpio3': {
            gpio.setLedStatus(382, 1).then(() => { });
        }
        case 'gpio4': {
            gpio.setLedStatus(383, 1).then(() => { });
        }
        case 'gpio5': {
            gpio.setLedStatus(384, 1).then(() => { });
        }
        case 'gpio6': {
            gpio.setLedStatus(385, 1).then(() => { });
        }
        case 'gpio7': {
            gpio.setLedStatus(386, 1).then(() => { });
        }
        case 'gpio8': {
            gpio.setLedStatus(387, 1).then(() => { });
        }
        case 'gpio9': {
            gpio.setLedStatus(388, 1).then(() => { });
        }
        case 'gpio10': {
            gpio.setLedStatus(389, 1).then(() => { });
        }
        case 'gpio11': {
            gpio.setLedStatus(390, 1).then(() => { });
        }
        case 'gpio12': {
            gpio.setLedStatus(391, 1).then(() => { });
        }
        case 'gpio13': {
            gpio.setLedStatus(392, 1).then(() => { });
        }
        case 'gpio14': {
            gpio.setLedStatus(393, 1).then(() => { });
        }
        case 'gpio15': {
            gpio.setLedStatus(394, 1).then(() => { });
        }
        case 'gpio16': {
            gpio.setLedStatus(395, 1).then(() => { });
        }
    }
}
function setgpiooff(value: string | string[]) {
    switch (value) {
        case 'gpio1': {
            gpio.setLedStatus(380, 0).then(() => { });
        }
        case 'gpio2': {
            gpio.setLedStatus(381, 0).then(() => { });
        }
        case 'gpio3': {
            gpio.setLedStatus(382, 0).then(() => { });
        }
        case 'gpio4': {
            gpio.setLedStatus(383, 0).then(() => { });
        }
        case 'gpio5': {
            gpio.setLedStatus(384, 0).then(() => { });
        }
        case 'gpio6': {
            gpio.setLedStatus(385, 0).then(() => { });
        }
        case 'gpio7': {
            gpio.setLedStatus(386, 0).then(() => { });
        }
        case 'gpio8': {
            gpio.setLedStatus(387, 0).then(() => { });
        }
        case 'gpio9': {
            gpio.setLedStatus(388, 0).then(() => { });
        }
        case 'gpio10': {
            gpio.setLedStatus(389, 0).then(() => { });
        }
        case 'gpio11': {
            gpio.setLedStatus(390, 0).then(() => { });
        }
        case 'gpio12': {
            gpio.setLedStatus(391, 0).then(() => { });
        }
        case 'gpio13': {
            gpio.setLedStatus(392, 0).then(() => { });
        }
        case 'gpio14': {
            gpio.setLedStatus(393, 0).then(() => { });
        }
        case 'gpio15': {
            gpio.setLedStatus(394, 0).then(() => { });
        }
        case 'gpio16': {
            gpio.setLedStatus(395, 0).then(() => { });
        }
    }
}
class TextPickerExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.value = '';
        this.select = 1;
        this.gpionumber = ['gpio1', 'gpio2', 'gpio3', 'gpio4', 'gpio5', 'gpio6', 'gpio7', 'gpio8',
            'gpio9', 'gpio10', 'gpio11', 'gpio12', 'gpio13', 'gpio14', 'gpio15', 'gpio16'];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TextPickerExample_Params) {
        if (params.value !== undefined) {
            this.value = params.value;
        }
        if (params.select !== undefined) {
            this.select = params.select;
        }
        if (params.gpionumber !== undefined) {
            this.gpionumber = params.gpionumber;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private value: string | string[];
    private select: number;
    private gpionumber: string[];
    render() {
        Row.create();
        Row.width('100%');
        Row.height('100%');
        Row.backgroundImage('/comment/background.jpg', ImageRepeat.NoRepeat);
        Row.backgroundImageSize(ImageSize.Cover);
        Row.border({ width: 1 });
        Row.create();
        Row.height('100%');
        Row.width('30%');
        TextPicker.create({ range: this.gpionumber, selected: this.select });
        TextPicker.onChange((value: string | string[], index: number | number[]) => {
            this.value = value;
            console.info('Picker item changed, value: ' + value + ', index: ' + index);
        });
        TextPicker.disappearTextStyle({ color: Color.Red, font: { size: 15, weight: FontWeight.Lighter } });
        TextPicker.textStyle({ color: Color.Black, font: { size: 20, weight: FontWeight.Normal } });
        TextPicker.selectedTextStyle({ color: Color.Blue, font: { size: 30, weight: FontWeight.Bolder } });
        TextPicker.pop();
        Row.pop();
        Row.create();
        Row.height('100%');
        Row.width('70%');
        Button.createWithLabel('开灯');
        Button.width('30%');
        Button.height('30%');
        Button.onClick((event?: ClickEvent) => {
            if (event) {
                if (this.value == '') {
                    prompt.showToast({
                        message: 'please choose the gpio',
                        duration: 2000
                    });
                }
                else {
                    setgpioon(this.value);
                    console.log('The ' + this.value + 'is on.');
                }
            }
        });
        Button.pop();
        Button.createWithLabel('关灯');
        Button.width('30%');
        Button.height('30%');
        Button.onClick((event?: ClickEvent) => {
            if (event) {
                if (this.value == '') {
                    prompt.showToast({
                        message: 'please choose the gpio',
                        duration: 2000
                    });
                }
                else {
                    setgpiooff(this.value);
                    console.log('The ' + this.value + 'is off.');
                }
            }
        });
        Button.pop();
        Row.pop();
        Row.pop();
    }
}
loadDocument(new TextPickerExample("1", undefined, {}));
