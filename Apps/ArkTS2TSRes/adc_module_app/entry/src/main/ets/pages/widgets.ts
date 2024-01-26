interface GridExample_Params {
    settings?: RenderingContextSettings;
    context?: CanvasRenderingContext2D;
    datainfolist?: Array<TempInfo>;
    TempInfoobj?: TempInfoTable //link index.ets中的tempinfotable对象
    ;
    timerId?: number;
    slidervaluefortext?: number;
    slidervalue?: number;
    xleft?: number;
    axisratio?: number;
    intervalratio?: number;
}
interface getdata_Params {
    TempInfoobj?: TempInfoTable //link index.ets中的tempinfotable对象
    ;
    datainfolist?: Array<TempInfo>;
}
interface startrecord_button_Params {
    TempInfoobj?: TempInfoTable //link index.ets中的tempinfotable对象
    ;
}
interface get_value_button_Params {
    adc_value?: number;
    temperature?: number;
    CONST_TEMP?: number;
    error?: string;
}
interface value_text_Params {
    adc_value?: number;
    temperature?: number;
    mode?: boolean;
}
interface time_text_Params {
}
interface onlywirte_Params {
    TempInfoobj?: TempInfoTable //link index.ets中的tempinfotable对象
    ;
    timerId?: number;
}
interface showtemp_Params {
    adc_value?: number;
    temperature?: number;
    CONST_TEMP?: number;
    timerId?: number;
    mode?: boolean;
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
import adc_napi from '@ohos.napi_adc';
import prompt from '@system.prompt';
import { TempInfo, TempInfoTable } from "../common/database/TempInfoTable";
import systemTime from '@ohos.systemTime';
import hilog from '@ohos.hilog';
import radio from '@ohos.telephony.radio';
let context = getContext(this);
let data = context.filesDir;
console.log('getFilesDir success, data:' + JSON.stringify(data));
export class showtemp extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__adc_value = new SynchedPropertySimpleTwoWay(params.adc_value, this, "adc_value");
        this.__temperature = new SynchedPropertySimpleTwoWay(params.temperature, this, "temperature");
        this.__CONST_TEMP = new ObservedPropertySimple(0.042, this, "CONST_TEMP");
        this.__timerId = new ObservedPropertySimple(-1, this, "timerId");
        this.__mode = new SynchedPropertySimpleTwoWay(params.mode, this, "mode");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: showtemp_Params) {
        if (params.CONST_TEMP !== undefined) {
            this.CONST_TEMP = params.CONST_TEMP;
        }
        if (params.timerId !== undefined) {
            this.timerId = params.timerId;
        }
    }
    aboutToBeDeleted() {
        this.__adc_value.aboutToBeDeleted();
        this.__temperature.aboutToBeDeleted();
        this.__CONST_TEMP.aboutToBeDeleted();
        this.__timerId.aboutToBeDeleted();
        this.__mode.aboutToBeDeleted();
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
    private __CONST_TEMP: ObservedPropertySimple<number>;
    get CONST_TEMP() {
        return this.__CONST_TEMP.get();
    }
    set CONST_TEMP(newValue: number) {
        this.__CONST_TEMP.set(newValue);
    }
    private __timerId: ObservedPropertySimple<number>;
    get timerId() {
        return this.__timerId.get();
    }
    set timerId(newValue: number) {
        this.__timerId.set(newValue);
    }
    private __mode: SynchedPropertySimpleTwoWay<boolean>;
    get mode() {
        return this.__mode.get();
    }
    set mode(newValue: boolean) {
        this.__mode.set(newValue);
    }
    //销毁定时器
    aboutToDisappear() {
        if (this.timerId > 0) {
            clearTimeout(this.timerId);
            this.timerId = -1;
        }
    }
    private get_adc_value() {
        let value = adc_napi.get_adc_value();
        this.adc_value = value;
    }
    private get_adc_tempature() {
        this.temperature = this.adc_value * this.CONST_TEMP;
    }
    private get_adc_tempatureF() {
        this.temperature = this.adc_value * this.CONST_TEMP * 9 / 5 + 32;
    }
    render() {
        Text.create();
        Text.height(1);
        Text.onAppear(() => {
            console.log("在showtemp组件中mode值为：" + this.mode);
            if (this.mode) {
                this.timerId = setInterval(() => {
                    this.get_adc_value();
                    this.get_adc_tempature();
                }, 1000);
            }
            else {
                console.log("华氏度模式");
                this.timerId = setInterval(() => {
                    this.get_adc_value();
                    this.get_adc_tempatureF();
                }, 1000);
            }
        });
        Text.pop();
    }
}
export class onlywirte extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__TempInfoobj = new SynchedPropertyObjectTwoWay(params.TempInfoobj, this, "TempInfoobj");
        this.__timerId = new ObservedPropertySimple(-1, this, "timerId");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: onlywirte_Params) {
        if (params.timerId !== undefined) {
            this.timerId = params.timerId;
        }
    }
    aboutToBeDeleted() {
        this.__TempInfoobj.aboutToBeDeleted();
        this.__timerId.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __TempInfoobj: SynchedPropertySimpleOneWay<TempInfoTable>; //link index.ets中的tempinfotable对象
    get TempInfoobj() {
        return this.__TempInfoobj.get();
    }
    set TempInfoobj(newValue: TempInfoTable //link index.ets中的tempinfotable对象
    ) {
        this.__TempInfoobj.set(newValue);
    }
    private __timerId: ObservedPropertySimple<number>;
    get timerId() {
        return this.__timerId.get();
    }
    set timerId(newValue: number) {
        this.__timerId.set(newValue);
    }
    //销毁定时器
    aboutToDisappear() {
        if (this.timerId > 0) {
            clearTimeout(this.timerId);
            this.timerId = -1;
        }
    }
    writetemptofile() {
        this.timerId = setInterval(() => {
            console.log("这里又如何");
            let adc_value1 = adc_napi.get_adc_value();
            console.log("adc_value1" + adc_value1.toString());
            let temperature = adc_value1 * 0.042;
            if (adc_value1 <= 800 && adc_value1 >= 500) {
                systemTime.getDate((error, date) => {
                    if (error) {
                        console.error(`Failed to get date. Cause:` + JSON.stringify(error));
                        return;
                    }
                    console.log(`Succeeded in getting Date. Date: ` + JSON.stringify(date));
                    let year = date.getFullYear();
                    let month = date.getMonth() + 1;
                    let day = date.getDate();
                    let hour = date.getHours();
                    let min = date.getMinutes();
                    let sec = date.getSeconds();
                    console.log("year:" + year);
                    console.log("month:" + month);
                    console.log("day:" + day);
                    console.log("hour:" + hour);
                    console.log("min:" + min);
                    console.log("sec:" + sec);
                    this.TempInfoobj.insertdata(year, month, day, hour, min, sec, temperature, (isdone: Function) => {
                        if (isdone) {
                            console.log("myTempInfotable success write!");
                        }
                        else {
                            console.log('myTempInfotable Failed to write');
                        }
                    });
                });
            }
            else {
                prompt.showToast({
                    message: "adc值异常，请检查连线",
                    duration: 1000,
                    bottom: 200 // 距离底部的距离
                });
            }
        }, 1000);
    }
    aboutToAppear() {
        this.writetemptofile();
    }
    render() {
    }
}
export class time_text extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: time_text_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    gettime() {
        systemTime.getDate((error, date) => {
            if (error) {
                console.info(`Failed to get date. message: ${error.message}, code: ${error.code}`);
                return;
            }
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hour = date.getHours();
            let min = date.getMinutes();
            let sec = date.getSeconds();
            console.log("year:" + year);
            console.log("month:" + month);
            console.log("day:" + day);
            console.log("hour:" + hour);
            console.log("min:" + min);
            console.log("sec:" + sec);
            console.info(`Succeeded in get date : ${date}`);
            ;
        });
    }
    render() {
        Button.createWithLabel('获取时间', { type: ButtonType.Capsule });
        Button.borderRadius(20);
        Button.fontSize(30);
        Button.onClick(() => {
            this.gettime();
        });
        Button.pop();
    }
}
export class value_text extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__adc_value = new SynchedPropertySimpleTwoWay(params.adc_value, this, "adc_value");
        this.__temperature = new SynchedPropertySimpleTwoWay(params.temperature, this, "temperature");
        this.__mode = new SynchedPropertySimpleTwoWay(params.mode, this, "mode");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: value_text_Params) {
    }
    aboutToBeDeleted() {
        this.__adc_value.aboutToBeDeleted();
        this.__temperature.aboutToBeDeleted();
        this.__mode.aboutToBeDeleted();
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
    private __mode: SynchedPropertySimpleTwoWay<boolean>;
    get mode() {
        return this.__mode.get();
    }
    set mode(newValue: boolean) {
        this.__mode.set(newValue);
    }
    render() {
        Column.create();
        Text.create("adc数值:" + this.adc_value);
        Text.fontSize(50);
        Text.fontWeight(FontWeight.Bold);
        Text.id("adcValue");
        Text.pop();
        If.create();
        if (this.mode) {
            If.branchId(0);
            Text.create("温度:" + this.temperature.toFixed(1) + "°C");
            Text.fontSize(50);
            Text.fontWeight(FontWeight.Bold);
            Text.id("C");
            Text.pop();
        }
        else {
            If.branchId(1);
            Text.create("温度:" + this.temperature.toFixed(1) + "°F");
            Text.fontSize(50);
            Text.fontWeight(FontWeight.Bold);
            Text.id("F");
            Text.pop();
        }
        If.pop();
        Column.pop();
    }
}
export class get_value_button extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__adc_value = new SynchedPropertySimpleTwoWay(params.adc_value, this, "adc_value");
        this.__temperature = new SynchedPropertySimpleTwoWay(params.temperature, this, "temperature");
        this.__CONST_TEMP = new ObservedPropertySimple(0.042, this, "CONST_TEMP");
        this.error = "";
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: get_value_button_Params) {
        if (params.CONST_TEMP !== undefined) {
            this.CONST_TEMP = params.CONST_TEMP;
        }
        if (params.error !== undefined) {
            this.error = params.error;
        }
    }
    aboutToBeDeleted() {
        this.__adc_value.aboutToBeDeleted();
        this.__temperature.aboutToBeDeleted();
        this.__CONST_TEMP.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    //@Link dataarray: Array<Number>;
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
    private __CONST_TEMP: ObservedPropertySimple<number>;
    get CONST_TEMP() {
        return this.__CONST_TEMP.get();
    }
    set CONST_TEMP(newValue: number) {
        this.__CONST_TEMP.set(newValue);
    }
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
        Button.onClick(() => {
            this.get_adc_value();
            this.get_adc_tempature();
            this.writeTemperature();
        });
        Text.create('获取');
        Text.fontSize(25);
        Text.fontWeight(FontWeight.Bold);
        Text.fontStyle(FontStyle.Italic);
        Text.pop();
        Button.pop();
        Column.pop();
    }
    private get_adc_value() {
        let value = adc_napi.get_adc_value();
        this.adc_value = value;
    }
    private get_adc_tempature() {
        this.temperature = this.adc_value * this.CONST_TEMP;
    }
    private async writeTemperature() {
        let ret = adc_napi.filewriteCallback();
    }
}
export class startrecord_button extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__TempInfoobj = new SynchedPropertyObjectTwoWay(params.TempInfoobj, this, "TempInfoobj");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: startrecord_button_Params) {
    }
    aboutToBeDeleted() {
        this.__TempInfoobj.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __TempInfoobj: SynchedPropertySimpleOneWay<TempInfoTable>; //link index.ets中的tempinfotable对象
    get TempInfoobj() {
        return this.__TempInfoobj.get();
    }
    set TempInfoobj(newValue: TempInfoTable //link index.ets中的tempinfotable对象
    ) {
        this.__TempInfoobj.set(newValue);
    }
    private async writetemptofile() {
        let intervalID = setInterval(() => {
            let adc_value = adc_napi.get_adc_value();
            console.log("adc_value" + adc_value.toString());
            let temperature = adc_value * 0.042;
            if (adc_value <= 800 && adc_value >= 500) {
                systemTime.getDate((error, date) => {
                    if (error) {
                        console.error(`Failed to get date. Cause:` + JSON.stringify(error));
                        return;
                    }
                    console.log(`Succeeded in getting Date. Date: ` + JSON.stringify(date));
                    let year = date.getFullYear();
                    let month = date.getMonth();
                    let day = date.getDate();
                    let hour = date.getHours();
                    let min = date.getMinutes();
                    let sec = date.getSeconds();
                    console.log("year:" + year);
                    console.log("month:" + month);
                    console.log("day:" + day);
                    console.log("hour:" + hour);
                    console.log("min:" + min);
                    console.log("sec:" + sec);
                    this.TempInfoobj.insertdata(year, month, day, hour, min, sec, temperature, (isdone: Function) => {
                        if (isdone) {
                            console.log("myTempInfotable success write!");
                        }
                        else {
                            console.log('myTempInfotable Failed to write');
                        }
                    });
                });
            }
            else {
                prompt.showToast({
                    message: "adc值异常，请检查连线",
                    duration: 1000,
                    bottom: 200 // 距离底部的距离
                });
            }
        }, 1000);
    }
    render() {
        Column.create();
        Button.createWithLabel('开始记录', { type: ButtonType.Capsule });
        Button.borderRadius(20);
        Button.fontSize(30);
        Button.onClick(() => {
            this.writetemptofile();
        });
        Button.pop();
        Column.pop();
    }
}
export class getdata extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__TempInfoobj = new SynchedPropertyObjectTwoWay(params.TempInfoobj, this, "TempInfoobj");
        this.__datainfolist = new SynchedPropertyObjectTwoWay(params.datainfolist, this, "datainfolist");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: getdata_Params) {
    }
    aboutToBeDeleted() {
        this.__TempInfoobj.aboutToBeDeleted();
        this.__datainfolist.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __TempInfoobj: SynchedPropertySimpleOneWay<TempInfoTable>; //link index.ets中的tempinfotable对象
    get TempInfoobj() {
        return this.__TempInfoobj.get();
    }
    set TempInfoobj(newValue: TempInfoTable //link index.ets中的tempinfotable对象
    ) {
        this.__TempInfoobj.set(newValue);
    }
    private __datainfolist: SynchedPropertySimpleOneWay<Array<TempInfo>>;
    get datainfolist() {
        return this.__datainfolist.get();
    }
    set datainfolist(newValue: Array<TempInfo>) {
        this.__datainfolist.set(newValue);
    }
    render() {
        Button.createWithLabel('查询数据', { type: ButtonType.Capsule });
        Button.borderRadius(20);
        Button.fontSize(30);
        Button.onClick(() => {
            console.log("开始读数据测试");
            this.TempInfoobj.queryAll((tempinfolist: TempInfo[]) => {
                this.datainfolist = tempinfolist;
                for (let i = 0; i < this.datainfolist.length; i++) {
                    console.log("温度数据：" + this.datainfolist[i].temperature);
                }
            });
        });
        Button.pop();
    }
}
export class GridExample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.settings = new RenderingContextSettings(true);
        this.context = new CanvasRenderingContext2D(this.settings);
        this.__datainfolist = new SynchedPropertyObjectTwoWay(params.datainfolist, this, "datainfolist");
        this.__TempInfoobj = new SynchedPropertyObjectTwoWay(params.TempInfoobj, this, "TempInfoobj");
        this.__timerId = new ObservedPropertySimple(-1, this, "timerId");
        this.__slidervaluefortext = new ObservedPropertySimple(1, this, "slidervaluefortext");
        this.slidervalue = 1;
        this.xleft = 40;
        this.axisratio = 1;
        this.intervalratio = 1;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: GridExample_Params) {
        if (params.settings !== undefined) {
            this.settings = params.settings;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.timerId !== undefined) {
            this.timerId = params.timerId;
        }
        if (params.slidervaluefortext !== undefined) {
            this.slidervaluefortext = params.slidervaluefortext;
        }
        if (params.slidervalue !== undefined) {
            this.slidervalue = params.slidervalue;
        }
        if (params.xleft !== undefined) {
            this.xleft = params.xleft;
        }
        if (params.axisratio !== undefined) {
            this.axisratio = params.axisratio;
        }
        if (params.intervalratio !== undefined) {
            this.intervalratio = params.intervalratio;
        }
    }
    aboutToBeDeleted() {
        this.__datainfolist.aboutToBeDeleted();
        this.__TempInfoobj.aboutToBeDeleted();
        this.__timerId.aboutToBeDeleted();
        this.__slidervaluefortext.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private settings: RenderingContextSettings;
    private context: CanvasRenderingContext2D;
    private __datainfolist: SynchedPropertySimpleOneWay<Array<TempInfo>>;
    get datainfolist() {
        return this.__datainfolist.get();
    }
    set datainfolist(newValue: Array<TempInfo>) {
        this.__datainfolist.set(newValue);
    }
    private __TempInfoobj: SynchedPropertySimpleOneWay<TempInfoTable>; //link index.ets中的tempinfotable对象
    get TempInfoobj() {
        return this.__TempInfoobj.get();
    }
    set TempInfoobj(newValue: TempInfoTable //link index.ets中的tempinfotable对象
    ) {
        this.__TempInfoobj.set(newValue);
    }
    private __timerId: ObservedPropertySimple<number>; //实时绘制的定时器id
    get timerId() {
        return this.__timerId.get();
    }
    set timerId(newValue: number) {
        this.__timerId.set(newValue);
    }
    private __slidervaluefortext: ObservedPropertySimple<number>;
    get slidervaluefortext() {
        return this.__slidervaluefortext.get();
    }
    set slidervaluefortext(newValue: number) {
        this.__slidervaluefortext.set(newValue);
    }
    private slidervalue: number;
    private xleft: number;
    private axisratio: number;
    private intervalratio: number;
    render() {
        Column.create({ space: 5 });
        Scroll.create();
        Scroll.scrollable(ScrollDirection.Horizontal);
        Scroll.scrollBar(BarState.Auto);
        Column.create();
        Column.width(2100);
        Column.margin({ top: 5 });
        Grid.create();
        Grid.columnsTemplate('1fr');
        Grid.rowsTemplate('1fr');
        Grid.columnsGap(10);
        Grid.rowsGap(10);
        Grid.width('95%');
        Grid.backgroundColor(0xFAEEE0);
        Grid.height(300);
        GridItem.create();
        Flex.create({
            direction: FlexDirection.Column,
            alignItems: ItemAlign.Center,
            justifyContent: FlexAlign.Center
        });
        Canvas.create(this.context);
        Canvas.id("Canvas");
        Canvas.width('100%');
        Canvas.height('100%');
        Canvas.backgroundColor('#ffff00');
        Canvas.onReady(() => {
            this.drawAxis();
            this.drawYLables();
        });
        Canvas.pop();
        Flex.pop();
        GridItem.pop();
        Grid.pop();
        Column.pop();
        Scroll.pop();
        Row.create();
        Row.width('100%');
        Button.createWithLabel('绘制', { type: ButtonType.Capsule });
        Button.borderRadius(20);
        Button.fontSize(30);
        Button.id("Draw");
        Button.onClick(async () => {
            console.log("开始读数据测试");
            this.TempInfoobj.queryAll((tempinfolist: TempInfo[]) => {
                this.datainfolist = tempinfolist;
            });
            this.context.clearRect(this.xleft + 2, 0, 2100, 0.89 * this.context.height);
            this.drawhistoricalData();
        });
        Button.margin({ left: 340 });
        Button.pop();
        Slider.create({
            value: this.slidervalue,
            min: 1,
            step: 1,
            max: 8,
            style: SliderStyle.OutSet
        });
        Slider.id('Slider');
        Slider.margin({ left: 100 });
        Slider.width(200);
        Slider.showSteps(true);
        Slider.onChange((value: number, mode: SliderChangeMode) => {
            if (this.timerId > 0) {
                clearTimeout(this.timerId);
                this.timerId = -1;
            }
            this.slidervaluefortext = value;
            this.slidervalue = value;
            console.info('value:' + value + 'mode:' + mode.toString());
        });
        Text.create(this.slidervaluefortext.toFixed(0));
        Text.fontSize(12);
        Text.pop();
        Row.pop();
        Column.pop();
    }
    //销毁定时器
    aboutToDisappear() {
        if (this.timerId > 0) {
            clearTimeout(this.timerId);
            this.timerId = -1;
        }
    }
    //画坐标轴
    private drawAxis() {
        const context = this.context;
        context.save();
        context.lineWidth = 3;
        context.strokeStyle = '#353535';
        this.context.lineCap = 'round';
        let h1 = this.context.height;
        let w1 = this.context.width;
        let xstart = this.xleft, ystart = 0.1 * h1, xend = 2000, yend = 0.9 * h1;
        context.beginPath();
        this.context.beginPath();
        this.context.moveTo(xstart, 0);
        this.context.lineTo(xstart, yend);
        this.context.lineTo(xend, yend);
        this.context.stroke();
    }
    drawYLables() {
        let h1 = this.context.height;
        let w1 = this.context.width;
        let xstart = this.xleft, ystart = 0.1 * h1, xend = 0.9 * w1, yend = 0.9 * h1;
        let coordinates = 25, value = 35;
        while (coordinates <= yend) {
            // 画文本
            this.context.save();
            // 指定绘制的填充色
            this.context.fillStyle = '#0000ff';
            // 设置文本绘制中的字体样式
            this.context.font = '20px sans-serif';
            // 设置文本绘制中的文本对齐方式：文本右对齐
            this.context.textAlign = 'left';
            // 绘制填充类文本
            this.context.fillText(value.toString(), 0, coordinates + 10);
            //绘制y轴上的小线段。
            this.context.strokeStyle = '#353535';
            if (coordinates < yend) {
                this.context.beginPath();
                this.context.moveTo(xstart - 10, coordinates);
                this.context.lineTo(xstart, coordinates);
                this.context.stroke();
            }
            // 更新y轴坐标：每次加上y轴等分
            coordinates += (yend - ystart) / 2;
            value -= 5;
        }
        this.context.stroke();
    }
    private drawhistoricalData() {
        const context = this.context;
        let h1 = this.context.height;
        let w1 = this.context.width;
        let xstart = this.xleft, ystart = 0.1 * h1, xend = 0.9 * w1, yend = 0.9 * h1;
        let data = this.datainfolist; //数据点坐标
        let gap = 20 * this.axisratio;
        //缓存从数据值到坐标距离的比例因子
        let yFactor = (yend - ystart) / 10;
        let activeX = 0; //记录绘制过程中当前点的坐标
        let activeY = 0; //记录绘制过程中当前点的y坐标
        context.strokeStyle = '#1abc9c';
        //绘制折线
        context.beginPath();
        context.moveTo(xstart, yend - (data[0].temperature - 25) * yFactor); //先将起点移动至第一个数据点
        for (let i = 0, j = 0; i < data.length; i += this.slidervalue, j++) {
            activeX = xstart + (j) * gap;
            activeY = yend - (data[i].temperature - 25) * yFactor;
            context.lineTo(activeX, activeY);
            context.stroke();
        }
        // context.restore()
        // //绘制数据点辅助虚线
        // context.strokeStyle = '#a29d9d'
        // context.setLineDash([10, 20])
        // context.beginPath()
        // for (let i = 0; i < data.length; i++) {
        //   context.moveTo(xstart, yend-(data[i].temperature-25) * yFactor)
        //   activeX = xstart + (i + 1) * gap;
        //   activeY = yend-(data[i].temperature-25) * yFactor;
        //   context.lineTo(activeX, activeY)
        //   context.lineTo(activeX, yend)
        //   context.lineTo(activeX, yend)
        //   context.stroke()
        // }
        //绘制数据点
        let j = 0; //历史数据横坐标画到了哪里
        for (let i = 0; i < data.length; i += this.slidervalue, j++) {
            activeX = xstart + j * gap;
            activeY = yend - (data[i].temperature - 25) * yFactor;
            context.beginPath();
            context.arc(activeX, activeY, 3, 0, 2 * Math.PI, false);
            context.fill();
            context.closePath();
        }
        context.restore();
        //以上为历史数据绘制
        //实时数据绘制
        if (this.timerId > 0) {
            clearTimeout(this.timerId);
            this.timerId = -1;
        }
        let i = 0;
        context.beginPath();
        context.moveTo(activeX, activeY);
        this.timerId = setInterval(() => {
            let adc_value1 = adc_napi.get_adc_value();
            let temperature = adc_value1 * 0.042;
            if (adc_value1 <= 800 && adc_value1 >= 500) {
                context.lineTo(activeX + (i + 1) * gap, yend - (temperature - 25) * yFactor);
                context.stroke();
                context.arc(activeX + (i + 1) * gap, yend - (temperature - 25) * yFactor, 3, 0, 2 * Math.PI, false);
                context.fill();
                context.closePath();
                context.moveTo(activeX + (i + 1) * gap, yend - (temperature - 25) * yFactor);
                i++;
            }
            else {
                prompt.showToast({
                    message: "adc值异常，请检查连线",
                    duration: 1000,
                    bottom: 200 // 距离底部的距离
                });
            }
        }, 1000 * this.slidervalue);
    }
}
