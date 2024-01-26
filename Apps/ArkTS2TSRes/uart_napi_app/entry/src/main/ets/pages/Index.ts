interface Index_Params {
    uart_value?: string;
    sensor_respond?: string;
    control?: string;
    timeID?: number;
    ison?: Boolean;
    Nextread?: Boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
// @ts-nocheck
import uart_napi from '@ohos.uart_napi';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__uart_value = new ObservedPropertySimple("没有数据", this, "uart_value");
        this.__sensor_respond = new ObservedPropertySimple("尚未启动", this, "sensor_respond");
        this.__control = new ObservedPropertySimple("启动", this, "control");
        this.timeID = -1;
        this.ison = false;
        this.Nextread = true;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.uart_value !== undefined) {
            this.uart_value = params.uart_value;
        }
        if (params.sensor_respond !== undefined) {
            this.sensor_respond = params.sensor_respond;
        }
        if (params.control !== undefined) {
            this.control = params.control;
        }
        if (params.timeID !== undefined) {
            this.timeID = params.timeID;
        }
        if (params.ison !== undefined) {
            this.ison = params.ison;
        }
        if (params.Nextread !== undefined) {
            this.Nextread = params.Nextread;
        }
    }
    aboutToBeDeleted() {
        this.__uart_value.aboutToBeDeleted();
        this.__sensor_respond.aboutToBeDeleted();
        this.__control.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __uart_value: ObservedPropertySimple<string>;
    get uart_value() {
        return this.__uart_value.get();
    }
    set uart_value(newValue: string) {
        this.__uart_value.set(newValue);
    }
    private __sensor_respond: ObservedPropertySimple<string>;
    get sensor_respond() {
        return this.__sensor_respond.get();
    }
    set sensor_respond(newValue: string) {
        this.__sensor_respond.set(newValue);
    }
    private __control: ObservedPropertySimple<string>;
    get control() {
        return this.__control.get();
    }
    set control(newValue: string) {
        this.__control.set(newValue);
    }
    private timeID: number;
    private ison: Boolean;
    private Nextread: Boolean; // 控制异步的锁，只有上一个read读出数据才会新开一个异步工作项
    private uart_get() {
        this.Nextread = false;
        uart_napi.uartreadCallback((result) => {
            this.sensor_respond = result;
            this.Nextread = true;
            console.log("result的值为：" + result);
        });
    }
    render() {
        Column.create();
        Button.createWithLabel(this.control);
        Button.id("button");
        Button.onClick(() => {
            if (this.ison) { //点击前为正常传输，点击后暂停
                this.control = '启动';
                this.ison = false;
                clearInterval(this.timeID);
                uart_napi.uart_close_napi();
                this.sensor_respond = "尚未启动";
                console.log('close succeed');
            }
            else { //点击前未启动，点击后启动
                this.control = '关闭';
                this.ison = true;
                uart_napi.uart_init_napi();
                console.log('init succeed');
                this.timeID = setInterval(() => {
                    if (this.Nextread) {
                        this.uart_get();
                    }
                }, 0.2);
            }
        });
        Button.margin({ top: 60, right: 60 });
        Button.pop();
        Column.create();
        Column.margin({ left: 60, top: 40 });
        Text.create("感应值: " + this.sensor_respond);
        Text.fontSize(20);
        Text.fontWeight(FontWeight.Bold);
        Text.id("text");
        Text.pop();
        Column.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
