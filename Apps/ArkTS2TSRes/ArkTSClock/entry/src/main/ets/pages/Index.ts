interface Clock_Params {
    settings?: RenderingContextSettings;
    context?: CanvasRenderingContext2D;
    canvasWidth?: number;
    radius?: number;
    intervalId?: number;
    updateTime?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
 */
import display from '@ohos.display';
import Logger from '../model/Logger';
const HOURS: Array<string> = ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '1', '2'];
const HEIGHT_ADD: number = 150; // 表盘下面需要绘制时间，canvas高度是宽度加150
const TAG: string = 'Index';
class Clock extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.settings = new RenderingContextSettings(true);
        this.context = new CanvasRenderingContext2D(this.settings);
        this.__canvasWidth = new ObservedPropertySimple(300 // 300是表盘默认大小
        , this, "canvasWidth");
        this.radius = 150 // 默认表盘半径
        ;
        this.intervalId = 0;
        this.updateTime = () => {
            this.context.clearRect(0, 0, this.canvasWidth, this.canvasWidth + HEIGHT_ADD);
            let nowTime = new Date();
            let hour = nowTime.getHours();
            let minute = nowTime.getMinutes();
            let second = nowTime.getSeconds();
            let time = `${this.fillTime(hour)}:${this.fillTime(minute)}:${this.fillTime(second)}`;
            this.drawBackGround();
            this.drawHour(hour, minute);
            this.drawMinute(minute);
            this.drawSecond(second);
            this.drawDot();
            this.drawTime(time);
            this.context.translate(-this.radius, -this.radius);
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Clock_Params) {
        if (params.settings !== undefined) {
            this.settings = params.settings;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.canvasWidth !== undefined) {
            this.canvasWidth = params.canvasWidth;
        }
        if (params.radius !== undefined) {
            this.radius = params.radius;
        }
        if (params.intervalId !== undefined) {
            this.intervalId = params.intervalId;
        }
        if (params.updateTime !== undefined) {
            this.updateTime = params.updateTime;
        }
    }
    aboutToBeDeleted() {
        this.__canvasWidth.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private settings: RenderingContextSettings;
    private context: CanvasRenderingContext2D;
    private __canvasWidth: ObservedPropertySimple<number>; // 300是表盘默认大小
    get canvasWidth() {
        return this.__canvasWidth.get();
    }
    set canvasWidth(newValue: number) {
        this.__canvasWidth.set(newValue);
    }
    private radius: number; // 默认表盘半径
    private intervalId: number;
    private updateTime;
    fillTime(time: number) {
        return time < 10 ? `0${time}` : `${time}`;
    }
    aboutToAppear() {
        this.getSize();
    }
    // 获取设备宽高计算表盘大小
    async getSize() {
        let mDisplay = await display.getDefaultDisplay();
        Logger.info(TAG, `getDefaultDisplay mDisplay = ${JSON.stringify(mDisplay)}`);
        this.canvasWidth = px2vp(mDisplay.width > mDisplay.height ? mDisplay.height * 0.6 : mDisplay.width * 0.6);
        this.radius = this.canvasWidth / 2;
    }
    drawBackGround() {
        this.context.save();
        // 绘制背景
        let grad = this.context.createRadialGradient(this.radius, this.radius, this.radius - 32, this.radius, this.radius, this.radius);
        grad.addColorStop(0.0, 'white');
        grad.addColorStop(0.9, '#eee');
        grad.addColorStop(1.0, 'white');
        this.context.fillStyle = grad;
        this.context.fillRect(0, 0, this.canvasWidth, this.canvasWidth);
        // 绘制外圈圆
        this.context.translate(this.radius, this.radius);
        this.context.lineWidth = 6;
        this.context.beginPath();
        this.context.strokeStyle = '#fff';
        this.context.arc(0, 0, this.radius - 5, 0, 2 * Math.PI, false);
        this.context.stroke();
        // 绘制时间文字
        this.context.font = '30px';
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.fillStyle = '#000';
        HOURS.forEach((num, index) => {
            this.context.save();
            let rad = 2 * Math.PI / 12 * index;
            let x = Math.cos(rad) * (this.radius - 38);
            let y = Math.sin(rad) * (this.radius - 38);
            this.context.fillText(num, x, y);
        });
        // 绘制刻度
        for (let i = 0; i < 60; i++) {
            let rad = 2 * Math.PI / 60 * i;
            let x = Math.cos(rad) * (this.radius - 12);
            let y = Math.sin(rad) * (this.radius - 12);
            this.context.beginPath();
            this.context.moveTo(x, y);
            if (i % 5 == 0) {
                let x1 = Math.cos(rad) * (this.radius - 20);
                let y1 = Math.sin(rad) * (this.radius - 20);
                this.context.strokeStyle = '#000';
                this.context.lineWidth = 2;
                this.context.lineTo(x1, y1);
            }
            else {
                let x1 = Math.cos(rad) * (this.radius - 18);
                let y1 = Math.sin(rad) * (this.radius - 18);
                this.context.strokeStyle = '#ccc';
                this.context.lineWidth = 1;
                this.context.lineTo(x1, y1);
            }
            this.context.stroke();
        }
    }
    // 绘制时针
    drawHour(hour: number, minute: number) {
        this.context.save();
        this.context.beginPath();
        this.context.lineWidth = 8;
        this.context.lineCap = 'round';
        let rad = 2 * Math.PI / 12 * hour;
        let mrad = 2 * Math.PI / 12 / 60 * minute;
        this.context.rotate(rad + mrad);
        this.context.moveTo(0, 10);
        this.context.strokeStyle = '#000';
        this.context.lineTo(0, -this.radius / 2);
        this.context.stroke();
        this.context.restore();
    }
    // 绘制分针
    drawMinute(minute: number) {
        this.context.save();
        this.context.beginPath();
        this.context.lineWidth = 5;
        this.context.lineCap = 'round';
        let rad = 2 * Math.PI / 60 * minute;
        this.context.rotate(rad);
        this.context.moveTo(0, 10);
        this.context.strokeStyle = '#000';
        this.context.lineTo(0, -this.radius + 40);
        this.context.stroke();
        this.context.restore();
    }
    // 绘制秒针
    drawSecond(second: number) {
        this.context.save();
        this.context.beginPath();
        this.context.lineWidth = 2;
        this.context.lineCap = 'round';
        let rad = 2 * Math.PI / 60 * second;
        this.context.rotate(rad);
        this.context.moveTo(0, 10);
        this.context.strokeStyle = '#05f';
        this.context.lineTo(0, -this.radius + 21);
        this.context.stroke();
        this.context.restore();
    }
    // 绘制中心点
    drawDot() {
        this.context.save();
        this.context.beginPath();
        this.context.fillStyle = '#05f';
        this.context.arc(0, 0, 4, 0, 2 * Math.PI, false);
        this.context.fill();
        this.context.restore();
    }
    // 绘制表盘下面时间文本
    drawTime(time: string) {
        this.context.save();
        this.context.beginPath();
        this.context.font = '90px';
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.fillStyle = '#000';
        this.context.fillText(time, 0, this.radius + 80);
        this.context.restore();
    }
    render() {
        Stack.create({ alignContent: Alignment.Center });
        Stack.width('100%');
        Stack.height('100%');
        Canvas.create(this.context);
        Canvas.padding({ top: 76 });
        Canvas.width(this.canvasWidth);
        Canvas.height(this.canvasWidth + HEIGHT_ADD);
        Canvas.onReady(() => {
            this.updateTime();
            this.intervalId = setInterval(this.updateTime, 1000);
        });
        Canvas.pop();
        Stack.pop();
    }
    onPageHide() {
        clearInterval(this.intervalId);
    }
}
loadDocument(new Clock("1", undefined, {}));
