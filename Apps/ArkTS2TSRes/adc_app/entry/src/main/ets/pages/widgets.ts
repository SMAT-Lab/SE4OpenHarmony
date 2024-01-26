interface show_switch_Params {
    visual?: number;
}
interface value_QRcode_Params {
    adc_value?: number;
    temperature?: number;
    visual?: number;
}
interface get_value_button_Params {
    adc_value?: number;
    temperature?: number;
    idNum?: number;
    error?: string;
}
interface value_text_Params {
    adc_value?: number;
    temperature?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "widgets_" + ++__generate__Id;
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
import adc_napi from '@ohos.adc_napi';
import prompt from '@ohos.prompt';
import Notification from '@ohos.notification';
export class value_text extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__adc_value = new SynchedPropertySimpleTwoWay(params.adc_value, this, "adc_value");
        this.__temperature = new SynchedPropertySimpleTwoWay(params.temperature, this, "temperature");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: value_text_Params) {
    }
    aboutToBeDeleted() {
        this.__adc_value.aboutToBeDeleted();
        this.__temperature.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __adc_value: SynchedPropertySimpleTwoWay<number>;
    get adc_value() {
        return this.__adc_value.get();
    }
    set adc_value(newValue: number) {
        this.__adc_value.set(newValue);
    }
    private __temperature: SynchedPropertySimpleTwoWay<number>;
    get temperature() {
        return this.__temperature.get();
    }
    set temperature(newValue: number) {
        this.__temperature.set(newValue);
    }
    render() {
        Column.create();
        Text.create("adc数值：" + this.adc_value);
        Text.fontSize(40);
        Text.fontWeight(FontWeight.Bold);
        Text.id("adc_value");
        Text.pop();
        Text.create("温度：" + this.temperature.toFixed(1) + "°C");
        Text.fontSize(40);
        Text.fontWeight(FontWeight.Bold);
        Text.id("Temp_value");
        Text.pop();
        Column.pop();
    }
}
export class get_value_button extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__adc_value = new SynchedPropertySimpleTwoWay(params.adc_value, this, "adc_value");
        this.__temperature = new SynchedPropertySimpleTwoWay(params.temperature, this, "temperature");
        this.idNum = 123456;
        this.error = "";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: get_value_button_Params) {
        if (params.idNum !== undefined) {
            this.idNum = params.idNum;
        }
        if (params.error !== undefined) {
            this.error = params.error;
        }
    }
    aboutToBeDeleted() {
        this.__adc_value.aboutToBeDeleted();
        this.__temperature.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __adc_value: SynchedPropertySimpleTwoWay<number>;
    get adc_value() {
        return this.__adc_value.get();
    }
    set adc_value(newValue: number) {
        this.__adc_value.set(newValue);
    }
    private __temperature: SynchedPropertySimpleTwoWay<number>;
    get temperature() {
        return this.__temperature.get();
    }
    set temperature(newValue: number) {
        this.__temperature.set(newValue);
    }
    private idNum: number;
    private error: string;
    render() {
        Column.create();
        Button.createWithChild();
        Button.type(ButtonType.Capsule);
        Button.margin({
            top: 20
        });
        Button.backgroundColor('#0D9FFB');
        Button.width('20%');
        Button.height('10%');
        Button.id("get_adc_button");
        Button.onClick(() => {
            this.get_adc_value();
        });
        Text.create('获取');
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.fontStyle(FontStyle.Italic);
        Text.pop();
        Button.pop();
        Column.pop();
    }
    private get_adc_value() {
        let get_value = adc_napi.sync_get_adc_value();
        if (get_value < 0) {
            this.require_permission();
        }
        else if (get_value <= 800 && get_value >= 500) {
            this.adc_value = get_value;
            this.temperature = this.adc_value * 0.042;
            prompt.showToast({
                message: "获取成功",
                duration: 500,
                bottom: 200 // 距离底部的距离
            });
        }
        else {
            prompt.showToast({
                message: "获取失败，请检查连线",
                duration: 1000,
                bottom: 200 // 距离底部的距离
            });
        }
        this.publish_notification();
    }
    private require_permission() {
        if (adc_napi.sync_get_permission() == (-1)) {
            prompt.showToast({
                message: "修改权限失败，请运行sample_server",
                duration: 500,
                bottom: 200 // 距离底部的距离
            });
        }
        else {
            prompt.showToast({
                message: "修改权限成功",
                duration: 500,
                bottom: 200 // 距离底部的距离
            });
        }
    }
    private publish_notification() {
        console.log("publish");
        let contentType = Notification.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT;
        Notification.publish({
            content: {
                contentType: contentType,
                normal: {
                    title: "",
                    text: "adc数值：" + this.adc_value + "  " + "温度：" + this.temperature.toFixed(1) + "°C",
                }
            },
            id: this.idNum,
            color: 0xff0000,
            colorEnabled: true,
            label: "测试标签" + this.idNum,
            badgeIconStyle: 20
        }, (error) => {
            if (error) {
                this.error = JSON.stringify(error);
            }
            else {
                this.idNum++;
                prompt.showToast({
                    message: "发送成功"
                });
            }
        });
    }
}
export class value_QRcode extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__adc_value = new SynchedPropertySimpleTwoWay(params.adc_value, this, "adc_value");
        this.__temperature = new SynchedPropertySimpleTwoWay(params.temperature, this, "temperature");
        this.__visual = new SynchedPropertySimpleTwoWay(params.visual, this, "visual");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: value_QRcode_Params) {
    }
    aboutToBeDeleted() {
        this.__adc_value.aboutToBeDeleted();
        this.__temperature.aboutToBeDeleted();
        this.__visual.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __adc_value: SynchedPropertySimpleTwoWay<number>;
    get adc_value() {
        return this.__adc_value.get();
    }
    set adc_value(newValue: number) {
        this.__adc_value.set(newValue);
    }
    private __temperature: SynchedPropertySimpleTwoWay<number>;
    get temperature() {
        return this.__temperature.get();
    }
    set temperature(newValue: number) {
        this.__temperature.set(newValue);
    }
    private __visual: SynchedPropertySimpleTwoWay<number>;
    get visual() {
        return this.__visual.get();
    }
    set visual(newValue: number) {
        this.__visual.set(newValue);
    }
    render() {
        Column.create();
        QRCode.create("adc数值：" + this.adc_value + "\n" +
            "温度：" + this.temperature.toFixed(1) + "°C");
        QRCode.id("QRCode");
        QRCode.width(100);
        QRCode.visibility(this.visual);
        QRCode.pop();
        Column.pop();
    }
}
export class show_switch extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__visual = new SynchedPropertySimpleTwoWay(params.visual, this, "visual");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: show_switch_Params) {
    }
    aboutToBeDeleted() {
        this.__visual.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __visual: SynchedPropertySimpleTwoWay<number>;
    get visual() {
        return this.__visual.get();
    }
    set visual(newValue: number) {
        this.__visual.set(newValue);
    }
    render() {
        Column.create();
        Toggle.create({ type: ToggleType.Switch, isOn: Boolean(1 - this.visual) });
        Toggle.onChange((isOn) => {
            this.visual = 1 - this.visual;
        });
        Toggle.id("Toggle");
        Toggle.pop();
        Column.pop();
    }
}
