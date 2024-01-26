interface TempView_Params {
    tempMorning?: number;
    tempNoon?: number;
    tempNight?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TempView_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import promptAction from '@ohos.promptAction';
import util from '@ohos.util';
import { getString } from '@ohos/common';
import { InputItem } from './InputItem';
import { ScopeNumber } from '../../../model/ScopeNumber';
const ZERO: number = 0;
const TEMPERATURE_MIN: number = 36;
const TEMPERATURE_MAX: number = 37.2;
export class TempView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__tempMorning = new ObservedPropertySimple(ZERO, this, "tempMorning");
        this.__tempNoon = new ObservedPropertySimple(ZERO, this, "tempNoon");
        this.__tempNight = new ObservedPropertySimple(ZERO, this, "tempNight");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TempView_Params) {
        if (params.tempMorning !== undefined) {
            this.tempMorning = params.tempMorning;
        }
        if (params.tempNoon !== undefined) {
            this.tempNoon = params.tempNoon;
        }
        if (params.tempNight !== undefined) {
            this.tempNight = params.tempNight;
        }
    }
    aboutToBeDeleted() {
        this.__tempMorning.aboutToBeDeleted();
        this.__tempNoon.aboutToBeDeleted();
        this.__tempNight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __tempMorning: ObservedPropertySimple<number>;
    get tempMorning() {
        return this.__tempMorning.get();
    }
    set tempMorning(newValue: number) {
        this.__tempMorning.set(newValue);
    }
    private __tempNoon: ObservedPropertySimple<number>;
    get tempNoon() {
        return this.__tempNoon.get();
    }
    set tempNoon(newValue: number) {
        this.__tempNoon.set(newValue);
    }
    private __tempNight: ObservedPropertySimple<number>;
    get tempNight() {
        return this.__tempNight.get();
    }
    set tempNight(newValue: number) {
        this.__tempNight.set(newValue);
    }
    render() {
        Column.create({ space: 12 });
        Column.alignItems(HorizontalAlign.Center);
        Column.justifyContent(FlexAlign.Start);
        Column.width('100%');
        Text.create($r('app.string.judge_temp'));
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.backgroundColor(Color.Gray);
        Text.textAlign(TextAlign.Start);
        Text.margin({ top: 2 });
        Text.pop();
        let earlierCreatedChild_2: InputItem = (this && this.findChildById) ? this.findChildById("2") as InputItem : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new InputItem("2", this, {
                textValue: $r('app.string.temp_morning'),
                placeHolder: $r('app.string.morning_placeholder'),
                value: this.__tempMorning
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                textValue: $r('app.string.temp_morning'),
                placeHolder: $r('app.string.morning_placeholder')
            });
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: InputItem = (this && this.findChildById) ? this.findChildById("3") as InputItem : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new InputItem("3", this, {
                textValue: $r('app.string.temp_noon'),
                placeHolder: $r('app.string.noon_placeholder'),
                value: this.__tempNoon
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                textValue: $r('app.string.temp_noon'),
                placeHolder: $r('app.string.noon_placeholder')
            });
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: InputItem = (this && this.findChildById) ? this.findChildById("4") as InputItem : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new InputItem("4", this, {
                textValue: $r('app.string.temp_night'),
                placeHolder: $r('app.string.night_placeholder'),
                value: this.__tempNight
            }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                textValue: $r('app.string.temp_night'),
                placeHolder: $r('app.string.night_placeholder')
            });
            View.create(earlierCreatedChild_4);
        }
        Button.createWithChild();
        Button.key('temperatureAnalysis');
        Button.type(ButtonType.Capsule);
        Button.width('100%');
        Button.height(45);
        Button.backgroundColor(0x317aff);
        Button.onClick(() => {
            this.tempRange();
        });
        Text.create($r('app.string.temp_analyse'));
        Text.fontColor(Color.White);
        Text.fontSize(16);
        Text.pop();
        Button.pop();
        Column.pop();
    }
    alertDialog(title: ResourceStr, message: ResourceStr, value: ResourceStr) {
        AlertDialog.show({
            title: title,
            message: message,
            confirm: {
                value: value,
                action: () => {
                }
            },
        });
    }
    tempRange() {
        if (this.tempMorning <= ZERO || this.tempNoon <= ZERO || this.tempNight <= ZERO) {
            promptAction.showToast({ message: $r("app.string.scope_temp_tips") });
            return;
        }
        let arr = [this.tempMorning, this.tempNoon, this.tempNight].sort();
        let max = new ScopeNumber(arr[2]);
        let min = new ScopeNumber(arr[0]);
        let tempLower = new ScopeNumber(TEMPERATURE_MIN);
        let tempUpper = new ScopeNumber(TEMPERATURE_MAX);
        let standardRange = new util.ScopeHelper(tempLower, tempUpper);
        if (standardRange.contains(min) && standardRange.contains(max)) {
            this.alertDialog($r('app.string.temperature'), getString($r('app.string.temp_min')) + min + getString($r('app.string.temp_max'))
                + max + getString($r('app.string.temp_normal_range')), $r('app.string.determine'));
        }
        else {
            this.alertDialog($r('app.string.temperature'), $r('app.string.temp_message_abnormal'), $r('app.string.determine'));
        }
    }
}
