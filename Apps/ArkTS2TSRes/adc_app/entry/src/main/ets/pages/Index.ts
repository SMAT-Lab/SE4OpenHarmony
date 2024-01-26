interface Index_Params {
    adc_value?: number;
    temperature?: number;
    visual?: number;
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
import { value_text, get_value_button, value_QRcode, show_switch } from "./widgets";
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__adc_value = new ObservedPropertySimple(0, this, "adc_value");
        this.__temperature = new ObservedPropertySimple(0, this, "temperature");
        this.__visual = new ObservedPropertySimple(1, this, "visual");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.adc_value !== undefined) {
            this.adc_value = params.adc_value;
        }
        if (params.temperature !== undefined) {
            this.temperature = params.temperature;
        }
        if (params.visual !== undefined) {
            this.visual = params.visual;
        }
    }
    aboutToBeDeleted() {
        this.__adc_value.aboutToBeDeleted();
        this.__temperature.aboutToBeDeleted();
        this.__visual.aboutToBeDeleted();
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
    render() {
        Row.create();
        Column.create();
        Column.margin({ top: '10%', left: '15%' });
        let earlierCreatedChild_2: value_text = (this && this.findChildById) ? this.findChildById("2") as value_text : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new value_text("2", this, { adc_value: this.__adc_value, temperature: this.__temperature }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: get_value_button = (this && this.findChildById) ? this.findChildById("3") as get_value_button : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new get_value_button("3", this, { adc_value: this.__adc_value, temperature: this.__temperature }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
        Column.create();
        Column.margin({ top: '20%', left: '15%' });
        let earlierCreatedChild_4: value_QRcode = (this && this.findChildById) ? this.findChildById("4") as value_QRcode : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new value_QRcode("4", this, { adc_value: this.__adc_value, temperature: this.__temperature, visual: this.__visual }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({});
            View.create(earlierCreatedChild_4);
        }
        let earlierCreatedChild_5: show_switch = (this && this.findChildById) ? this.findChildById("5") as show_switch : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new show_switch("5", this, { visual: this.__visual }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({});
            View.create(earlierCreatedChild_5);
        }
        Column.pop();
        Row.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
