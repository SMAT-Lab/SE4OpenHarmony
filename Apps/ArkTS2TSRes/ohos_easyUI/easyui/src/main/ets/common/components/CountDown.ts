interface CountDown_Params {
    hour?: number;
    min?: number;
    sec?: number;
    intervalID?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CountDown_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Institute of Software, Chinese Academy of Sciences.
 * Licensed under the Apache License,Version 2.0 (the "License");
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
import prompt from '@system.prompt';
export class CountDown extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__hour = new ObservedPropertySimple(0, this, "hour");
        this.__min = new ObservedPropertySimple(0, this, "min");
        this.__sec = new ObservedPropertySimple(0, this, "sec");
        this.__intervalID = new ObservedPropertySimple(0, this, "intervalID");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: CountDown_Params) {
        if (params.hour !== undefined) {
            this.hour = params.hour;
        }
        if (params.min !== undefined) {
            this.min = params.min;
        }
        if (params.sec !== undefined) {
            this.sec = params.sec;
        }
        if (params.intervalID !== undefined) {
            this.intervalID = params.intervalID;
        }
    }
    aboutToBeDeleted() {
        this.__hour.aboutToBeDeleted();
        this.__min.aboutToBeDeleted();
        this.__sec.aboutToBeDeleted();
        this.__intervalID.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    // 时、分、秒
    private __hour: ObservedPropertySimple<number>;
    get hour() {
        return this.__hour.get();
    }
    set hour(newValue: number) {
        this.__hour.set(newValue);
    }
    private __min: ObservedPropertySimple<number>;
    get min() {
        return this.__min.get();
    }
    set min(newValue: number) {
        this.__min.set(newValue);
    }
    private __sec: ObservedPropertySimple<number>;
    get sec() {
        return this.__sec.get();
    }
    set sec(newValue: number) {
        this.__sec.set(newValue);
    }
    //用于控制当前倒计时开始和结束的参数
    private __intervalID: ObservedPropertySimple<number>;
    get intervalID() {
        return this.__intervalID.get();
    }
    set intervalID(newValue: number) {
        this.__intervalID.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height(200);
        Row.create();
        Row.width('100%');
        Row.margin({ left: 25, top: 25 });
        // 时
        Text.create(this.hour + "");
        // 时
        Text.width(50);
        // 时
        Text.height(50);
        // 时
        Text.fontSize(25);
        // 时
        Text.textAlign(TextAlign.Center);
        // 时
        Text.border({
            width: 2,
            color: Color.Gray,
            radius: 6
        });
        // 时
        Text.pop();
        Column.create();
        Column.margin(1);
        Column.border({
            width: 2,
            color: Color.Gray,
            radius: 6
        });
        Text.create('+');
        Text.width(20);
        Text.height(25);
        Text.fontSize(25);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.backgroundColor(Color.Gray);
        Text.margin({ bottom: 1 });
        Text.onClick(() => {
            ++this.hour;
        });
        Text.pop();
        Text.create('-');
        Text.width(20);
        Text.height(25);
        Text.fontSize(25);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.backgroundColor(Color.Gray);
        Text.onClick(() => {
            --this.hour;
            if (this.hour < 0) {
                this.hour = 0;
            }
        });
        Text.pop();
        Column.pop();
        Text.create("时");
        Text.height(50);
        Text.margin(5);
        Text.fontSize(20);
        Text.pop();
        // 分
        Text.create(this.min + "");
        // 分
        Text.width(50);
        // 分
        Text.height(50);
        // 分
        Text.fontSize(25);
        // 分
        Text.textAlign(TextAlign.Center);
        // 分
        Text.border({
            width: 2,
            color: Color.Gray,
            radius: 6
        });
        // 分
        Text.pop();
        Column.create();
        Column.margin(1);
        Column.border({
            width: 2,
            color: Color.Gray,
            radius: 6
        });
        Text.create('+');
        Text.width(20);
        Text.height(25);
        Text.fontSize(25);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.backgroundColor(Color.Gray);
        Text.margin({ bottom: 1 });
        Text.onClick(() => {
            ++this.min;
            if (this.min == 60) {
                this.min = 0;
            }
        });
        Text.pop();
        Text.create('-');
        Text.width(20);
        Text.height(25);
        Text.fontSize(25);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.backgroundColor(Color.Gray);
        Text.onClick(() => {
            --this.min;
            if (this.min < 0) {
                this.min = 59;
            }
        });
        Text.pop();
        Column.pop();
        Text.create("分");
        Text.height(50);
        Text.margin(5);
        Text.fontSize(20);
        Text.pop();
        // 秒
        Text.create(this.sec + "");
        // 秒
        Text.width(50);
        // 秒
        Text.height(50);
        // 秒
        Text.fontSize(25);
        // 秒
        Text.textAlign(TextAlign.Center);
        // 秒
        Text.border({
            width: 2,
            color: Color.Gray,
            radius: 6
        });
        // 秒
        Text.pop();
        Column.create();
        Column.margin(1);
        Column.border({
            width: 2,
            color: Color.Gray,
            radius: 6
        });
        Text.create('+');
        Text.width(20);
        Text.height(25);
        Text.fontSize(25);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.backgroundColor(Color.Gray);
        Text.margin({ bottom: 1 });
        Text.onClick(() => {
            ++this.sec;
            if (this.sec == 60) {
                this.sec = 0;
            }
        });
        Text.pop();
        Text.create('-');
        Text.width(20);
        Text.height(25);
        Text.fontSize(25);
        Text.textAlign(TextAlign.Center);
        Text.fontColor(Color.White);
        Text.backgroundColor(Color.Gray);
        Text.onClick(() => {
            --this.sec;
            if (this.sec < 0) {
                this.sec = 59;
            }
        });
        Text.pop();
        Column.pop();
        Text.create("秒");
        Text.height(50);
        Text.margin(8);
        Text.fontSize(20);
        Text.pop();
        Row.pop();
        // 按钮
        Row.create();
        // 按钮
        Row.width('100%');
        // 按钮
        Row.margin({ left: 25, top: 25 });
        Button.createWithLabel("Start");
        Button.width(80);
        Button.height(40);
        Button.fontSize(20);
        Button.margin(10);
        Button.backgroundColor("#ff704949");
        Button.type(ButtonType.Capsule);
        Button.onClick(() => {
            console.log("【开始倒计时】");
            prompt.showToast({
                message: "开始倒计时",
                duration: 1500,
                bottom: 800 // 距离底部的距离
            });
            this.intervalID = setInterval(() => {
                if (this.sec > 0)
                    --this.sec;
                else {
                    if (this.min > 0) {
                        --this.min;
                        this.sec = 59;
                    }
                    else {
                        if (this.hour > 0) {
                            --this.hour;
                            this.min = 59;
                            this.sec = 59;
                        }
                        else {
                            clearInterval(this.intervalID);
                            prompt.showToast({
                                message: "倒计时结束",
                                duration: 1500,
                                bottom: 800 // 距离底部的距离
                            });
                        }
                    }
                }
            }, 1000);
        });
        Button.pop();
        Button.createWithLabel("Reset");
        Button.width(85);
        Button.height(40);
        Button.margin(10);
        Button.fontSize(20);
        Button.backgroundColor("#ff704949");
        Button.type(ButtonType.Capsule);
        Button.onClick(() => {
            console.log("【重置倒计时】");
            prompt.showToast({
                message: "已重置倒计时",
                duration: 1500,
                bottom: 800 // 距离底部的距离
            });
            this.hour = 0;
            this.min = 0;
            this.sec = 0;
        });
        Button.pop();
        Button.createWithLabel("Stop");
        Button.width(80);
        Button.height(40);
        Button.margin(10);
        Button.fontSize(20);
        Button.backgroundColor("#ff704949");
        Button.type(ButtonType.Capsule);
        Button.onClick(() => {
            console.log("【停止倒计时】");
            prompt.showToast({
                message: "倒计时停止",
                duration: 1500,
                bottom: 800 // 距离底部的距离
            });
            clearInterval(this.intervalID);
        });
        Button.pop();
        // 按钮
        Row.pop();
        Column.pop();
    }
}
