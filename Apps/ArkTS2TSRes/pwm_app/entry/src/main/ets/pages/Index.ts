interface MarqueeExample_Params {
    start?: boolean;
    pwmAngle?: number;
    Pex?: number;
    power?: string;
    mid?: number;
    pwmPex?: string[];
}
interface TextForm_Params {
    textContent?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/* Copyright 2023 Unionman Technology Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
// @ts-nocheck
import pwmtest from '@ohos.pwmtest';
import promptAction from '@ohos.promptAction';
class TextForm extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__textContent = new ObservedPropertySimple(1, this, "textContent");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TextForm_Params) {
        if (params.textContent !== undefined) {
            this.textContent = params.textContent;
        }
    }
    aboutToBeDeleted() {
        this.__textContent.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __textContent: ObservedPropertySimple<string>;
    get textContent() {
        return this.__textContent.get();
    }
    set textContent(newValue: string) {
        this.__textContent.set(newValue);
    }
    render() {
        Text.create(this.textContent);
        Text.textOverflow({ overflow: TextOverflow.Clip });
        Text.fontSize(21);
        Text.fontColor(Color.Orange);
        Text.fontWeight(700);
        Text.pop();
    }
}
class MarqueeExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__start = new ObservedPropertySimple(true
        // 舵机的角度
        , this, "start");
        this.__pwmAngle = new ObservedPropertySimple(0
        // 舵机的引脚参数,默认是引脚1
        , this, "pwmAngle");
        this.__Pex = new ObservedPropertySimple(1
        // 开关按钮显示的文本,ON表示开
        , this, "Pex");
        this.__power = new ObservedPropertySimple('ON'
        // 初始选择的舵机引脚
        , this, "power");
        this.__mid = new ObservedPropertySimple(1
        // 舵机的引脚UI显示 PWM_1代表pwm引脚1,PWM_2代表pwm引脚2
        , this, "mid");
        this.pwmPex = ['PWM_1', 'PWM_2'];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MarqueeExample_Params) {
        if (params.start !== undefined) {
            this.start = params.start;
        }
        if (params.pwmAngle !== undefined) {
            this.pwmAngle = params.pwmAngle;
        }
        if (params.Pex !== undefined) {
            this.Pex = params.Pex;
        }
        if (params.power !== undefined) {
            this.power = params.power;
        }
        if (params.mid !== undefined) {
            this.mid = params.mid;
        }
        if (params.pwmPex !== undefined) {
            this.pwmPex = params.pwmPex;
        }
    }
    aboutToBeDeleted() {
        this.__start.aboutToBeDeleted();
        this.__pwmAngle.aboutToBeDeleted();
        this.__Pex.aboutToBeDeleted();
        this.__power.aboutToBeDeleted();
        this.__mid.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 开关标记位
    private __start: ObservedPropertySimple<boolean>;
    get start() {
        return this.__start.get();
    }
    set start(newValue: boolean) {
        this.__start.set(newValue);
    }
    // 舵机的角度
    private __pwmAngle: ObservedPropertySimple<number>;
    get pwmAngle() {
        return this.__pwmAngle.get();
    }
    set pwmAngle(newValue: number) {
        this.__pwmAngle.set(newValue);
    }
    // 舵机的引脚参数,默认是引脚1
    private __Pex: ObservedPropertySimple<number>;
    get Pex() {
        return this.__Pex.get();
    }
    set Pex(newValue: number) {
        this.__Pex.set(newValue);
    }
    // 开关按钮显示的文本,ON表示开
    private __power: ObservedPropertySimple<string>;
    get power() {
        return this.__power.get();
    }
    set power(newValue: string) {
        this.__power.set(newValue);
    }
    // 初始选择的舵机引脚
    private __mid: ObservedPropertySimple<number>;
    get mid() {
        return this.__mid.get();
    }
    set mid(newValue: number) {
        this.__mid.set(newValue);
    }
    // 舵机的引脚UI显示 PWM_1代表pwm引脚1,PWM_2代表pwm引脚2
    private pwmPex: string[];
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.backgroundImage($r("app.media.bg3"));
        Flex.backgroundImageSize(ImageSize.Cover);
        Divider.create();
        Divider.vertical(false);
        Divider.strokeWidth(5);
        Divider.color(Color.Gray);
        Divider.lineCap(LineCapStyle.Round);
        Row.create();
        Row.height('70%');
        Column.create();
        Column.width('50%');
        // 选择引脚：PWM_1、PWM_2（默认为PWM_1）
        TextPicker.create({ range: this.pwmPex, selected: this.Pex - 1 });
        // 选择引脚：PWM_1、PWM_2（默认为PWM_1）
        TextPicker.onChange((value: string, index: number) => {
            this.mid = index + 1;
            console.info('Picker item changed, value: ' + value + ', index: ' + index);
        });
        // 选择引脚：PWM_1、PWM_2（默认为PWM_1）
        TextPicker.width('60%');
        // 选择引脚：PWM_1、PWM_2（默认为PWM_1）
        TextPicker.margin({ right: 20, left: 60 });
        // 选择引脚：PWM_1、PWM_2（默认为PWM_1）
        TextPicker.height('40%');
        // 选择引脚：PWM_1、PWM_2（默认为PWM_1）
        TextPicker.pop();
        Row.create();
        Row.height('30%');
        // 舵机开关：默认为开
        Button.createWithLabel(this.power, { type: ButtonType.Capsule, stateEffect: true });
        // 舵机开关：默认为开
        Button.backgroundColor(Color.Gray);
        // 舵机开关：默认为开
        Button.margin({ top: 10, right: 20, left: 60, bottom: 20 });
        // 舵机开关：默认为开
        Button.width(90);
        // 舵机开关：默认为开
        Button.onClick(() => {
            // 开关标记为进行判断
            if (this.start) {
                try {
                    promptAction.showToast({
                        message: "关闭舵机",
                        duration: 2000
                    });
                }
                catch (error) {
                    console.error(`showToast args error code is ${error.code}, message is ${error.message}`);
                }
                ;
                this.power = "OFF";
            }
            else {
                try {
                    promptAction.showToast({
                        message: "打开舵机",
                        duration: 2000
                    });
                }
                catch (error) {
                    console.error(`showToast args error code is ${error.code}, message is ${error.message}`);
                }
                ;
                this.power = "ON";
            }
            // 开关标记位取反
            this.start = !this.start;
            console.info("power: " + this.power + " ,start:   " + this.start);
        });
        // 舵机开关：默认为开
        Button.pop();
        // 确定选择引脚
        Button.createWithLabel('Set', { type: ButtonType.Capsule, stateEffect: true });
        // 确定选择引脚
        Button.margin({ top: 10, bottom: 20 });
        // 确定选择引脚
        Button.backgroundColor(Color.Gray);
        // 确定选择引脚
        Button.width(90);
        // 确定选择引脚
        Button.onClick(() => {
            this.Pex = this.mid;
            try {
                promptAction.showToast({
                    message: "选择" + this.Pex + "号引脚",
                    duration: 2000
                });
            }
            catch (error) {
                console.error(`showToast args error code is ${error.code}, message is ${error.message}`);
            }
            ;
        });
        // 确定选择引脚
        Button.pop();
        Row.pop();
        // 按钮功能提示
        Text.create('ON 按钮控制舵机的开关');
        // 按钮功能提示
        Text.textOverflow({ overflow: TextOverflow.Clip });
        // 按钮功能提示
        Text.fontSize(18);
        // 按钮功能提示
        Text.fontColor(Color.Gray);
        // 按钮功能提示
        Text.fontWeight(700);
        // 按钮功能提示
        Text.margin({ left: 50, top: 7 });
        // 按钮功能提示
        Text.pop();
        Text.create('Set 按钮控制舵机的引脚');
        Text.textOverflow({ overflow: TextOverflow.Clip });
        Text.fontSize(18);
        Text.fontColor(Color.Gray);
        Text.fontWeight(700);
        Text.margin({ left: 50, top: 14 });
        Text.pop();
        Column.pop();
        Column.create();
        Column.width('50%');
        Row.create();
        // 根据设置的角度，模拟舵机转动角度
        Gauge.create({ value: 0, min: -90, max: 90 });
        // 根据设置的角度，模拟舵机转动角度
        Gauge.startAngle(-90);
        // 根据设置的角度，模拟舵机转动角度
        Gauge.endAngle(90);
        // 根据设置的角度，模拟舵机转动角度
        Gauge.colors([[Color.Gray, 1]]);
        // 根据设置的角度，模拟舵机转动角度
        Gauge.strokeWidth(30);
        // 根据设置的角度，模拟舵机转动角度
        Gauge.value(this.pwmAngle - 90);
        // 根据设置的角度，模拟舵机转动角度
        Gauge.height('60%');
        // 根据设置的角度，模拟舵机转动角度
        Gauge.width('100%');
        // 根据设置的角度，模拟舵机转动角度
        Gauge.margin({ top: 20 });
        // 根据设置的角度，模拟舵机转动角度
        Gauge.pop();
        Row.pop();
        let earlierCreatedChild_2: TextForm = (this && this.findChildById) ? this.findChildById("2") as TextForm : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TextForm("2", this, { textContent: this.pwmAngle.toFixed(0) + '°' }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                textContent: this.pwmAngle.toFixed(0) + '°'
            });
            View.create(earlierCreatedChild_2);
        }
        Row.create();
        // 设置舵机的转动角度
        Slider.create({
            value: this.pwmAngle,
            min: 0,
            max: 180,
            step: 1,
            style: SliderStyle.OutSet
        });
        // 设置舵机的转动角度
        Slider.width('60%');
        // 设置舵机的转动角度
        Slider.blockColor(Color.Gray);
        // 设置舵机的转动角度
        Slider.trackColor(Color.Gray);
        // 设置舵机的转动角度
        Slider.selectedColor(0x317aff);
        // 设置舵机的转动角度
        Slider.showSteps(true);
        // 设置舵机的转动角度
        Slider.showTips(true);
        // 设置舵机的转动角度
        Slider.onChange((value: number) => {
            // 根据开关的标识位，来选择是否转动舵机
            if (this.start) {
                this.pwmAngle = value;
                console.info("onChange pwmAngle = " + this.pwmAngle);
                pwmtest.setPwmStatus(this.Pex, this.pwmAngle);
            }
        });
        Row.pop();
        Column.pop();
        Row.pop();
        // 显示舵机的引脚和角度信息
        Row.create();
        // 显示舵机的引脚和角度信息
        Row.height('20%');
        let earlierCreatedChild_3: TextForm = (this && this.findChildById) ? this.findChildById("3") as TextForm : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new TextForm("3", this, { textContent: 'The selected pin is PWM_' + this.Pex + ", " }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                textContent: 'The selected pin is PWM_' + this.Pex + ", "
            });
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: TextForm = (this && this.findChildById) ? this.findChildById("4") as TextForm : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new TextForm("4", this, { textContent: 'and the Angle is ' + this.pwmAngle.toFixed(0) + '°!' }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                textContent: 'and the Angle is ' + this.pwmAngle.toFixed(0) + '°!'
            });
            View.create(earlierCreatedChild_4);
        }
        // 显示舵机的引脚和角度信息
        Row.pop();
        Divider.create();
        Divider.vertical(false);
        Divider.strokeWidth(5);
        Divider.color(Color.Gray);
        Divider.lineCap(LineCapStyle.Round);
        Flex.pop();
    }
}
loadDocument(new MarqueeExample("1", undefined, {}));
