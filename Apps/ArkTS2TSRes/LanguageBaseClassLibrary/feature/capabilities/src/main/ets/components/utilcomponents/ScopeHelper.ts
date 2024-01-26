interface ScopeHelper_Params {
    age?: number;
    tempMorning?: number;
    tempNoon?: number;
    tempNight?: number;
    shortTime?: number;
    longTime?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ScopeHelper_" + ++__generate__Id;
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
import util from '@ohos.util';
import { ScopeNumber } from '../../model/ScopeNumber';
import { TempView } from './scopehelper/TempView';
import { SleepView } from './scopehelper/SleepView';
const AGE_MIN: number = 16;
const AGE_MAX: number = 62;
export class ScopeHelper extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__age = new ObservedPropertySimple(0, this, "age");
        this.__tempMorning = new ObservedPropertySimple(0, this, "tempMorning");
        this.__tempNoon = new ObservedPropertySimple(1, this, "tempNoon");
        this.__tempNight = new ObservedPropertySimple(2, this, "tempNight");
        this.__shortTime = new ObservedPropertySimple(0, this, "shortTime");
        this.__longTime = new ObservedPropertySimple(0, this, "longTime");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ScopeHelper_Params) {
        if (params.age !== undefined) {
            this.age = params.age;
        }
        if (params.tempMorning !== undefined) {
            this.tempMorning = params.tempMorning;
        }
        if (params.tempNoon !== undefined) {
            this.tempNoon = params.tempNoon;
        }
        if (params.tempNight !== undefined) {
            this.tempNight = params.tempNight;
        }
        if (params.shortTime !== undefined) {
            this.shortTime = params.shortTime;
        }
        if (params.longTime !== undefined) {
            this.longTime = params.longTime;
        }
    }
    aboutToBeDeleted() {
        this.__age.aboutToBeDeleted();
        this.__tempMorning.aboutToBeDeleted();
        this.__tempNoon.aboutToBeDeleted();
        this.__tempNight.aboutToBeDeleted();
        this.__shortTime.aboutToBeDeleted();
        this.__longTime.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __age: ObservedPropertySimple<number>;
    get age() {
        return this.__age.get();
    }
    set age(newValue: number) {
        this.__age.set(newValue);
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
    private __shortTime: ObservedPropertySimple<number>;
    get shortTime() {
        return this.__shortTime.get();
    }
    set shortTime(newValue: number) {
        this.__shortTime.set(newValue);
    }
    private __longTime: ObservedPropertySimple<number>;
    get longTime() {
        return this.__longTime.get();
    }
    set longTime(newValue: number) {
        this.__longTime.set(newValue);
    }
    render() {
        Scroll.create();
        Scroll.scrollBar(BarState.Off);
        Scroll.align(Alignment.Start);
        Column.create({ space: 12 });
        Column.width('100%');
        Column.padding(16);
        Text.create($r('app.string.judge_age'));
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.backgroundColor(Color.Gray);
        Text.textAlign(TextAlign.Start);
        Text.pop();
        Row.create({ space: 5 });
        Row.height(50);
        TextInput.create({ placeholder: $r('app.string.age_placeholder') });
        TextInput.key('inputAge');
        TextInput.height('100%');
        TextInput.layoutWeight(6);
        TextInput.type(InputType.Number);
        TextInput.fontSize(24);
        TextInput.fontStyle(FontStyle.Italic);
        TextInput.maxLength(20);
        TextInput.fontWeight(FontWeight.Bold);
        TextInput.placeholderFont({ size: 24, weight: FontWeight.Normal });
        TextInput.enterKeyType(EnterKeyType.Go);
        TextInput.onChange((value: string) => {
            this.age = Number(value);
        });
        Button.createWithChild();
        Button.key('ageAnalysis');
        Button.layoutWeight(4);
        Button.height(40);
        Button.type(ButtonType.Capsule);
        Button.onClick(() => {
            this.ageRange();
        });
        Text.create($r('app.string.age_analyse'));
        Text.fontColor(Color.White);
        Text.fontSize(16);
        Text.pop();
        Button.pop();
        Row.pop();
        let earlierCreatedChild_2: TempView = (this && this.findChildById) ? this.findChildById("2") as TempView : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TempView("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: SleepView = (this && this.findChildById) ? this.findChildById("3") as SleepView : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new SleepView("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
        Scroll.pop();
    }
    dialog(title: ResourceStr, message: ResourceStr, value: ResourceStr) {
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
    ageRange() {
        let tempLower = new ScopeNumber(AGE_MIN);
        let tempUpper = new ScopeNumber(AGE_MAX);
        let range = new util.ScopeHelper(tempLower, tempUpper);
        let ageTemp = new ScopeNumber(this.age);
        if (range.contains(ageTemp)) {
            this.dialog($r('app.string.age'), $r('app.string.age_message_confirm'), $r('app.string.determine'));
        }
        else {
            this.dialog($r('app.string.age'), $r('app.string.age_message_not_confirm'), $r('app.string.determine'));
        }
    }
}
