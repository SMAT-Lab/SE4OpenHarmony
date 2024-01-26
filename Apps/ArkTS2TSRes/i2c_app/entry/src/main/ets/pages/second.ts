interface Second_Params {
    handlePopup?: boolean;
    ReadTemperatureC?: number;
    ReadHumidity?: number;
    ReadTemperatureF?: number;
    message?: string;
    select1?: number;
    Mps?: string[];
    select2?: number;
    Repeatability?: string[];
    popupMessage?: string;
    intervalID?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "second_" + ++__generate__Id;
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
import router from '@ohos.router';
import i2cnapidemo from '@ohos.i2cnapidemo';
import prompt from '@ohos.prompt';
import promptAction from '@ohos.promptAction';
// 自定义按钮组件
function __Button__ButtonStyle(): void {
    Button.fontSize(15);
    Button.fontWeight(FontWeight.Bold);
    Button.fontStyle(FontStyle.Italic);
    Button.type(ButtonType.Capsule);
    Button.backgroundColor('#0D9FFB');
}
class Second extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__handlePopup = new ObservedPropertySimple(false
        // 摄氏度值
        , this, "handlePopup");
        this.__ReadTemperatureC = new ObservedPropertySimple(0, this, "ReadTemperatureC");
        this.__ReadHumidity = new ObservedPropertySimple(0, this, "ReadHumidity");
        this.__ReadTemperatureF = new ObservedPropertySimple(0, this, "ReadTemperatureF");
        this.__message = new ObservedPropertySimple('使用教程:一.启动/重启 二.滑动选择后按下模式选择 三.获取', this, "message");
        this.__select1 = new ObservedPropertySimple(3, this, "select1");
        this.__Mps = new ObservedPropertyObject(['0.5Hz', '1Hz', '2Hz', '4Hz', '10Hz'], this, "Mps");
        this.__select2 = new ObservedPropertySimple(1, this, "select2");
        this.__Repeatability = new ObservedPropertyObject(['low', 'mid', 'high'], this, "Repeatability");
        this.__popupMessage = new ObservedPropertySimple("The current Mps is " + this.Mps[this.select1] + "\n" +
            "And the current refresh rate is " + this.Repeatability[this.select2] + "\n" +
            "Are you sure to refresh?", this, "popupMessage");
        this.intervalID = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Second_Params) {
        if (params.handlePopup !== undefined) {
            this.handlePopup = params.handlePopup;
        }
        if (params.ReadTemperatureC !== undefined) {
            this.ReadTemperatureC = params.ReadTemperatureC;
        }
        if (params.ReadHumidity !== undefined) {
            this.ReadHumidity = params.ReadHumidity;
        }
        if (params.ReadTemperatureF !== undefined) {
            this.ReadTemperatureF = params.ReadTemperatureF;
        }
        if (params.message !== undefined) {
            this.message = params.message;
        }
        if (params.select1 !== undefined) {
            this.select1 = params.select1;
        }
        if (params.Mps !== undefined) {
            this.Mps = params.Mps;
        }
        if (params.select2 !== undefined) {
            this.select2 = params.select2;
        }
        if (params.Repeatability !== undefined) {
            this.Repeatability = params.Repeatability;
        }
        if (params.popupMessage !== undefined) {
            this.popupMessage = params.popupMessage;
        }
        if (params.intervalID !== undefined) {
            this.intervalID = params.intervalID;
        }
    }
    aboutToBeDeleted() {
        this.__handlePopup.aboutToBeDeleted();
        this.__ReadTemperatureC.aboutToBeDeleted();
        this.__ReadHumidity.aboutToBeDeleted();
        this.__ReadTemperatureF.aboutToBeDeleted();
        this.__message.aboutToBeDeleted();
        this.__select1.aboutToBeDeleted();
        this.__Mps.aboutToBeDeleted();
        this.__select2.aboutToBeDeleted();
        this.__Repeatability.aboutToBeDeleted();
        this.__popupMessage.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // Popup组件标志位
    private __handlePopup: ObservedPropertySimple<boolean>;
    get handlePopup() {
        return this.__handlePopup.get();
    }
    set handlePopup(newValue: boolean) {
        this.__handlePopup.set(newValue);
    }
    // 摄氏度值
    private __ReadTemperatureC: ObservedPropertySimple<number>;
    get ReadTemperatureC() {
        return this.__ReadTemperatureC.get();
    }
    set ReadTemperatureC(newValue: number) {
        this.__ReadTemperatureC.set(newValue);
    }
    // 湿度值
    private __ReadHumidity: ObservedPropertySimple<number>;
    get ReadHumidity() {
        return this.__ReadHumidity.get();
    }
    set ReadHumidity(newValue: number) {
        this.__ReadHumidity.set(newValue);
    }
    // 华氏度值
    private __ReadTemperatureF: ObservedPropertySimple<number>;
    get ReadTemperatureF() {
        return this.__ReadTemperatureF.get();
    }
    set ReadTemperatureF(newValue: number) {
        this.__ReadTemperatureF.set(newValue);
    }
    // 使用教程文本
    private __message: ObservedPropertySimple<string>;
    get message() {
        return this.__message.get();
    }
    set message(newValue: string) {
        this.__message.set(newValue);
    }
    // TextPicker组件参数
    private __select1: ObservedPropertySimple<number>;
    get select1() {
        return this.__select1.get();
    }
    set select1(newValue: number) {
        this.__select1.set(newValue);
    }
    private __Mps: ObservedPropertyObject<string[]>;
    get Mps() {
        return this.__Mps.get();
    }
    set Mps(newValue: string[]) {
        this.__Mps.set(newValue);
    }
    private __select2: ObservedPropertySimple<number>;
    get select2() {
        return this.__select2.get();
    }
    set select2(newValue: number) {
        this.__select2.set(newValue);
    }
    private __Repeatability: ObservedPropertyObject<string[]>;
    get Repeatability() {
        return this.__Repeatability.get();
    }
    set Repeatability(newValue: string[]) {
        this.__Repeatability.set(newValue);
    }
    // Popup组件初始化message值
    private __popupMessage: ObservedPropertySimple<string>;
    get popupMessage() {
        return this.__popupMessage.get();
    }
    set popupMessage(newValue: string) {
        this.__popupMessage.set(newValue);
    }
    private intervalID: number;
    // 构造器供Popup组件调用显示当前模式
    popupBuilder(parent = null) {
        Column.create();
        Column.height(50);
        Column.padding(5);
        Column.backgroundColor("#FFFFFF");
        Text.create(this.popupMessage);
        Text.fontSize(12);
        Text.pop();
        Row.create();
        Button.createWithLabel('confirm');
        Button.backgroundColor('#ffffffff');
        Button.fontColor('#ff020202');
        Button.id('modeConfirm_button');
        Button.onClick(() => {
            this.handlePopup = !this.handlePopup;
            this.popupMessage = "The current Mps is " + this.Mps[this.select1] + "\n" +
                "And the current refresh rate is " + this.Repeatability[this.select2] + "\n" +
                "Are you sure to refresh?";
            if (i2cnapidemo.ReadTemperatureC() <= 800) {
                i2cnapidemo.ModeSet(this.select1, this.select2);
                promptAction.showToast({
                    message: "模式选择成功",
                    duration: 500,
                    bottom: 100 // 距离底部的距离
                });
            }
            else {
                promptAction.showToast({
                    message: "模式选择失败，请检查连线",
                    duration: 1000,
                    bottom: 100 // 距离底部的距离
                });
            }
        });
        Button.pop();
        Button.createWithLabel('cancel');
        Button.backgroundColor('#ffffffff');
        Button.fontColor('#ff030303');
        Button.id('Mode_cancel');
        Button.onClick(() => {
            this.handlePopup = !this.handlePopup;
        });
        Button.pop();
        Row.pop();
        Column.pop();
    }
    // 获取温湿度
    getValue() {
        i2cnapidemo.ReadData();
        this.ReadTemperatureC = i2cnapidemo.ReadTemperatureC();
        this.ReadHumidity = i2cnapidemo.ReadHumidity();
        this.ReadTemperatureF = i2cnapidemo.ReadTemperatureF();
    }
    // 开启定时器
    startWork() {
        this.intervalID = setInterval(() => {
            this.getValue();
        }, 500);
    }
    render() {
        Column.create();
        Row.create();
        Row.height('60%');
        Column.create();
        Column.width('50%');
        Row.create();
        Row.height('50%');
        // TextPicker组件选择Mps
        TextPicker.create({ range: this.Mps, selected: this.select1 });
        // TextPicker组件选择Mps
        TextPicker.onChange((value: string, index: number) => {
            console.info('Picker item changed, value: ' + value + ', index: ' + index);
            this.select1 = index;
        });
        // TextPicker组件选择Mps
        TextPicker.width('50%');
        // TextPicker组件选择Mps
        TextPicker.height('100%');
        // TextPicker组件选择Mps
        TextPicker.margin({
            bottom: 10
        });
        // TextPicker组件选择Mps
        TextPicker.id('Mps_TextPicker');
        // TextPicker组件选择Mps
        TextPicker.pop();
        // TextPicker组件选择刷新率
        TextPicker.create({ range: this.Repeatability, selected: this.select2 });
        // TextPicker组件选择刷新率
        TextPicker.onChange((value: string, index: number) => {
            console.info('Picker item changed, value: ' + value + ', index: ' + index);
            this.select2 = index;
        });
        // TextPicker组件选择刷新率
        TextPicker.margin({
            bottom: 10
        });
        // TextPicker组件选择刷新率
        TextPicker.width('50%');
        // TextPicker组件选择刷新率
        TextPicker.height('100%');
        // TextPicker组件选择刷新率
        TextPicker.id('Repeatability_TextPicker');
        // TextPicker组件选择刷新率
        TextPicker.pop();
        Row.pop();
        Column.pop();
        // 显示温湿度
        Column.create();
        // 显示温湿度
        Column.width('50%');
        Text.create("摄氏度：" + this.ReadTemperatureC.toFixed(2) + "°C");
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Center);
        Text.id('TempC');
        Text.pop();
        Text.create("华氏度：" + this.ReadTemperatureF.toFixed(2) + "°F");
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Center);
        Text.id('TempF');
        Text.pop();
        Text.create("湿度：" + this.ReadHumidity.toFixed(2) + "%RH");
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.textAlign(TextAlign.Center);
        Text.id('Hum');
        Text.pop();
        // 显示温湿度
        Column.pop();
        Row.pop();
        // 显示使用说明
        Row.create();
        Text.create(this.message);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.margin({
            bottom: 25
        });
        Text.pop();
        // 显示使用说明
        Row.pop();
        // 按钮选项
        Row.create();
        Button.createWithLabel('启动/重启');
        __Button__ButtonStyle();
        Button.margin({
            right: 40
        });
        Button.width('20%');
        Button.height('10%');
        Button.id('softReset_button');
        Button.onClick(() => {
            if (i2cnapidemo.ReadTemperatureC() <= 800) {
                i2cnapidemo.SoftReset();
                promptAction.showToast({
                    message: "启动/重启成功",
                    duration: 500,
                    bottom: 100 // 距离底部的距离
                });
            }
            else {
                promptAction.showToast({
                    message: "启动失败，请检查连线",
                    duration: 1000,
                    bottom: 100 // 距离底部的距离
                });
            }
        });
        Button.pop();
        Button.createWithLabel('模式选择');
        __Button__ButtonStyle();
        Button.margin({
            right: 70
        });
        Button.width('20%');
        Button.height('10%');
        Button.id('modeSet_button');
        Button.onClick(() => {
            this.handlePopup = !this.handlePopup;
        });
        Button.bindPopup(this.handlePopup, {
            builder: { builder: this.popupBuilder.bind(this) },
            placementOnTop: true,
            showInSubWindow: false,
            onStateChange: (e) => {
                console.info(JSON.stringify(e.isVisible));
                if (!e.isVisible) {
                    console.info("mps: " + this.Mps[this.select1]);
                    console.info("rate: " + this.Repeatability[this.select2]);
                    this.handlePopup = false;
                }
            }
        });
        Button.pop();
        Button.createWithLabel('获取');
        __Button__ButtonStyle();
        Button.margin({
            right: 40
        });
        Button.width('16%');
        Button.height('10%');
        Button.id('getTemp_Button');
        Button.onClick(() => {
            if (i2cnapidemo.ReadTemperatureC() <= 800) {
                if (this.intervalID) {
                    clearInterval(this.intervalID);
                }
                this.startWork();
                console.info(" i2cvalue " + this.ReadTemperatureC + "\n" + this.ReadHumidity + "\n" + this.ReadTemperatureF);
                promptAction.showToast({
                    message: "获取成功",
                    duration: 500,
                    bottom: 100 // 距离底部的距离
                });
            }
            else {
                clearInterval(this.intervalID);
                promptAction.showToast({
                    message: "获取失败，请检查连线",
                    duration: 1000,
                    bottom: 100 // 距离底部的距离
                });
            }
        });
        Button.pop();
        Button.createWithLabel("返回");
        __Button__ButtonStyle();
        Button.width('16%');
        Button.height('10%');
        Button.id('back_button');
        Button.onClick(() => {
            clearInterval(this.intervalID); // 销毁定时器
            router.back();
        });
        Button.pop();
        // 按钮选项
        Row.pop();
        Column.pop();
    }
}
loadDocument(new Second("1", undefined, {}));
