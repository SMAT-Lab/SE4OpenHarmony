interface MyMenu_Params {
    adc_value?: number;
    temperature?: number;
    visual?: number;
    datainfolist?: Array<TempInfo>;
    tempmode?: boolean;
    mode?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "myMenu_" + ++__generate__Id;
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
import { TempInfo, TempInfoTable } from '../common/database/TempInfoTable';
import { value_text, get_value_button, GridExample, time_text, getdata, showtemp, onlywirte } from "./widgets";
import prompt from '@system.prompt';
import router from '@ohos.router';
import RouterParm from '../common/database/RouterParm';
class MyMenu extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__adc_value = new ObservedPropertySimple(0, this, "adc_value");
        this.__temperature = new ObservedPropertySimple(0, this, "temperature");
        this.__visual = new ObservedPropertySimple(1, this, "visual");
        this.__datainfolist = new ObservedPropertyObject([], this, "datainfolist");
        this.__tempmode = new ObservedPropertySimple(true, this, "tempmode");
        this.__mode = new ObservedPropertySimple(true, this, "mode");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MyMenu_Params) {
        if (params.adc_value !== undefined) {
            this.adc_value = params.adc_value;
        }
        if (params.temperature !== undefined) {
            this.temperature = params.temperature;
        }
        if (params.visual !== undefined) {
            this.visual = params.visual;
        }
        if (params.datainfolist !== undefined) {
            this.datainfolist = params.datainfolist;
        }
        if (params.tempmode !== undefined) {
            this.tempmode = params.tempmode;
        }
        if (params.mode !== undefined) {
            this.mode = params.mode;
        }
    }
    aboutToBeDeleted() {
        this.__adc_value.aboutToBeDeleted();
        this.__temperature.aboutToBeDeleted();
        this.__visual.aboutToBeDeleted();
        this.__datainfolist.aboutToBeDeleted();
        this.__tempmode.aboutToBeDeleted();
        this.__mode.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __adc_value: ObservedPropertySimple<number>;
    get adc_value() {
        return this.__adc_value.get();
    }
    set adc_value(newValue: number) {
        this.__adc_value.set(newValue);
    }
    private __temperature: ObservedPropertySimple<number>;
    get temperature() {
        return this.__temperature.get();
    }
    set temperature(newValue: number) {
        this.__temperature.set(newValue);
    }
    private __visual: ObservedPropertySimple<number>;
    get visual() {
        return this.__visual.get();
    }
    set visual(newValue: number) {
        this.__visual.set(newValue);
    }
    private __datainfolist: ObservedPropertyObject<Array<TempInfo>>; //存放查询结果的数组
    get datainfolist() {
        return this.__datainfolist.get();
    }
    set datainfolist(newValue: Array<TempInfo>) {
        this.__datainfolist.set(newValue);
    }
    private __tempmode: ObservedPropertySimple<boolean>;
    get tempmode() {
        return this.__tempmode.get();
    }
    set tempmode(newValue: boolean) {
        this.__tempmode.set(newValue);
    }
    private __mode: ObservedPropertySimple<boolean>;
    get mode() {
        return this.__mode.get();
    }
    set mode(newValue: boolean) {
        this.__mode.set(newValue);
    }
    onPageShow() {
        try {
            // console.log("myMenu中接收到了table对象吗："+this.TempInfoobj)
            let routerParm = router.getParams() as RouterParm;
            this.mode = routerParm.mode;
        }
        catch (err) {
            console.log("nomode,its first time");
        }
    }
    render() {
        Row.create();
        Row.height('100%');
        Row.width('100%');
        Row.backgroundImage($r('app.media.bg2'));
        Row.backgroundImageSize(ImageSize.Cover);
        Column.create();
        Column.margin({ top: '15%', left: '10%' });
        let earlierCreatedChild_2: showtemp = (this && this.findChildById) ? this.findChildById("2") as showtemp : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new showtemp("2", this, { adc_value: this.__adc_value, temperature: this.__temperature, mode: this.__mode }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: value_text = (this && this.findChildById) ? this.findChildById("3") as value_text : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new value_text("3", this, { adc_value: this.__adc_value, temperature: this.__temperature, mode: this.__mode }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
        Column.create();
        Column.margin({ top: '15%', left: '15%' });
        Button.createWithLabel('设置', { type: ButtonType.Capsule });
        Button.borderRadius(20);
        Button.fontSize(30);
        Button.margin({ bottom: 12 });
        Button.id("Setting");
        Button.onClick(() => {
            router.replaceUrl({
                url: 'pages/myset',
                params: {
                    mode: this.mode,
                },
            });
        });
        Button.pop();
        Button.createWithLabel('历史温度趋势', { type: ButtonType.Capsule });
        Button.borderRadius(20);
        Button.fontSize(30);
        Button.margin({ bottom: 12 });
        Button.id("history");
        Button.onClick(() => {
            router.pushUrl({
                url: 'pages/Index',
            });
        });
        Button.pop();
        Column.pop();
        Row.pop();
    }
}
loadDocument(new MyMenu("1", undefined, {}));
