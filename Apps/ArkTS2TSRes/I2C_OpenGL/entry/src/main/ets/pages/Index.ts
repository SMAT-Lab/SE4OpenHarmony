interface Index_Params {
    tempC?: number;
    tempF?: number;
    Hum?: number;
    tempString?: string;
    xcomponentId?;
    intervalID?: number;
    updateintervalID?: number;
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
import { Logger } from '../utils/Logger';
var i2cOpengl = globalThis.requireNapi("i2cOpengl", true);
// @ts-ignore
import i2cnapidemo from '@ohos.i2cnapidemo';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__tempC = new ObservedPropertySimple(0.0, this, "tempC");
        this.__tempF = new ObservedPropertySimple(0.0, this, "tempF");
        this.__Hum = new ObservedPropertySimple(0.0, this, "Hum");
        this.__tempString = new ObservedPropertySimple('', this, "tempString");
        this.xcomponentId = 'temp';
        this.intervalID = undefined;
        this.updateintervalID = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.tempC !== undefined) {
            this.tempC = params.tempC;
        }
        if (params.tempF !== undefined) {
            this.tempF = params.tempF;
        }
        if (params.Hum !== undefined) {
            this.Hum = params.Hum;
        }
        if (params.tempString !== undefined) {
            this.tempString = params.tempString;
        }
        if (params.xcomponentId !== undefined) {
            this.xcomponentId = params.xcomponentId;
        }
        if (params.intervalID !== undefined) {
            this.intervalID = params.intervalID;
        }
        if (params.updateintervalID !== undefined) {
            this.updateintervalID = params.updateintervalID;
        }
    }
    aboutToBeDeleted() {
        this.__tempC.aboutToBeDeleted();
        this.__tempF.aboutToBeDeleted();
        this.__Hum.aboutToBeDeleted();
        this.__tempString.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __tempC: ObservedPropertySimple<number>;
    get tempC() {
        return this.__tempC.get();
    }
    set tempC(newValue: number) {
        this.__tempC.set(newValue);
    }
    private __tempF: ObservedPropertySimple<number>;
    get tempF() {
        return this.__tempF.get();
    }
    set tempF(newValue: number) {
        this.__tempF.set(newValue);
    }
    private __Hum: ObservedPropertySimple<number>;
    get Hum() {
        return this.__Hum.get();
    }
    set Hum(newValue: number) {
        this.__Hum.set(newValue);
    }
    private __tempString: ObservedPropertySimple<string>;
    get tempString() {
        return this.__tempString.get();
    }
    set tempString(newValue: string) {
        this.__tempString.set(newValue);
    }
    private xcomponentId;
    private intervalID: number;
    private updateintervalID: number;
    async aboutToAppear() {
        Logger.info('aboutToAppear');
        let resourceManager = getContext(this).resourceManager;
        this.tempString = await resourceManager.getStringValue($r('app.string.mode_label').id);
        i2cnapidemo.SoftReset();
        i2cnapidemo.ModeSet(1, 1);
    }
    getValue() {
        i2cnapidemo.ReadData();
        this.tempC = i2cnapidemo.ReadTemperatureC();
        this.tempF = i2cnapidemo.ReadTemperatureF();
        this.Hum = i2cnapidemo.ReadHumidity();
    }
    startWork() {
        this.intervalID = setInterval(() => {
            this.getValue();
        }, 500);
    }
    Update() {
        this.updateintervalID = setInterval(() => {
            i2cOpengl.updateTemp(this.tempC);
        }, 500);
    }
    render() {
        Row.create();
        Row.padding(12);
        Row.backgroundColor('#f1f3f5');
        Row.height('100%');
        Column.create();
        Text.create($r('app.string.EntryAbility_desc'));
        Text.fontSize($r('app.float.head_font_24'));
        Text.lineHeight($r('app.float.wh_value_33'));
        Text.fontFamily('HarmonyHeiTi-Bold');
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor($r('app.color.font_color_182431'));
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.textAlign(TextAlign.Start);
        Text.margin({ top: $r('app.float.wh_value_13'), bottom: $r('app.float.wh_value_15') });
        Text.pop();
        Text.create(`摄氏度为 ：${this.tempC.toFixed(2)}°C`);
        Text.fontSize($r('app.float.head_font_24'));
        Text.lineHeight($r('app.float.wh_value_33'));
        Text.fontFamily('HarmonyHeiTi-Bold');
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor($r('app.color.font_color_182431'));
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.textAlign(TextAlign.Start);
        Text.margin({ top: $r('app.float.wh_value_13'), bottom: $r('app.float.wh_value_15') });
        Text.onAppear(() => {
            this.startWork();
        });
        Text.pop();
        Text.create("华氏度为 ： " + this.tempF.toFixed(2).toString() + "°F");
        Text.fontSize($r('app.float.head_font_24'));
        Text.lineHeight($r('app.float.wh_value_33'));
        Text.fontFamily('HarmonyHeiTi-Bold');
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor($r('app.color.font_color_182431'));
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.textAlign(TextAlign.Start);
        Text.margin({ top: $r('app.float.wh_value_13'), bottom: $r('app.float.wh_value_15') });
        Text.pop();
        Text.create("湿度为 ： " + this.Hum.toFixed(2).toString() + "%");
        Text.fontSize($r('app.float.head_font_24'));
        Text.lineHeight($r('app.float.wh_value_33'));
        Text.fontFamily('HarmonyHeiTi-Bold');
        Text.fontWeight(FontWeight.Bold);
        Text.fontColor($r('app.color.font_color_182431'));
        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        Text.textAlign(TextAlign.Start);
        Text.margin({ top: $r('app.float.wh_value_13'), bottom: $r('app.float.wh_value_15') });
        Text.pop();
        Column.pop();
        Column.create();
        Column.justifyContent(FlexAlign.SpaceAround);
        Column.alignItems(HorizontalAlign.Center);
        Column.height('120%');
        Column.width('100%');
        Column.backgroundColor(Color.White);
        Column.borderRadius(24);
        XComponent.create({ id: this.xcomponentId, type: 'surface', libraryname: 'libi2cOpengl' });
        XComponent.onLoad(() => {
            Logger.info('onLoad');
            this.Update();
        });
        XComponent.width($r('app.float.wh_value_360'));
        XComponent.height($r('app.float.wh_value_360'));
        XComponent.onDestroy(() => {
            Logger.info('onDestroy');
        });
        XComponent.backgroundColor(Color.White);
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
