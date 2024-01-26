interface SleepView_Params {
    shortTime?: number;
    longTime?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SleepView_" + ++__generate__Id;
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
const SLEEP_TIME_SHORT: number = 7;
const SLEEP_TIME_LONG: number = 10;
export class SleepView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__shortTime = new ObservedPropertySimple(ZERO, this, "shortTime");
        this.__longTime = new ObservedPropertySimple(ZERO, this, "longTime");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SleepView_Params) {
        if (params.shortTime !== undefined) {
            this.shortTime = params.shortTime;
        }
        if (params.longTime !== undefined) {
            this.longTime = params.longTime;
        }
    }
    aboutToBeDeleted() {
        this.__shortTime.aboutToBeDeleted();
        this.__longTime.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
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
        Column.create({ space: 12 });
        Column.alignItems(HorizontalAlign.Center);
        Column.justifyContent(FlexAlign.Start);
        Column.width('100%');
        Text.create($r('app.string.judge_sleep'));
        Text.fontSize(20);
        Text.fontColor(Color.White);
        Text.backgroundColor(Color.Gray);
        Text.textAlign(TextAlign.Start);
        Text.margin({ top: 2 });
        Text.pop();
        let earlierCreatedChild_2: InputItem = (this && this.findChildById) ? this.findChildById("2") as InputItem : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new InputItem("2", this, {
                textValue: $r('app.string.short_sleep'),
                placeHolder: $r('app.string.enter_sleep_time'),
                value: this.__shortTime
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                textValue: $r('app.string.short_sleep'),
                placeHolder: $r('app.string.enter_sleep_time')
            });
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: InputItem = (this && this.findChildById) ? this.findChildById("3") as InputItem : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new InputItem("3", this, {
                textValue: $r('app.string.long_sleep'),
                placeHolder: $r('app.string.enter_sleep_time'),
                value: this.__longTime
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                textValue: $r('app.string.long_sleep'),
                placeHolder: $r('app.string.enter_sleep_time')
            });
            View.create(earlierCreatedChild_3);
        }
        Text.create($r('app.string.sleep_time'));
        Text.fontSize(18);
        Text.fontColor(Color.Red);
        Text.pop();
        Button.createWithChild();
        Button.key('sleepAnalysis');
        Button.type(ButtonType.Capsule);
        Button.width('100%');
        Button.height(45);
        Button.margin({ top: 10, bottom: 10 });
        Button.backgroundColor(0x317aff);
        Button.onClick(() => {
            this.sleepRange();
        });
        Text.create($r('app.string.sleep_analyse'));
        Text.fontColor(Color.White);
        Text.fontSize(16);
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Button.pop();
        Column.pop();
    }
    sleepRange() {
        if (this.shortTime <= ZERO || this.longTime <= ZERO) {
            promptAction.showToast({ message: $r("app.string.scope_sleep_tips") });
            return;
        }
        if (this.longTime <= this.shortTime) {
            promptAction.showToast({ message: $r("app.string.scope_sleep_tips_less") });
            return;
        }
        let timeLower = new ScopeNumber(SLEEP_TIME_SHORT);
        let timeUpper = new ScopeNumber(SLEEP_TIME_LONG);
        let timeRange = new util.ScopeHelper(timeLower, timeUpper);
        let yTimeLower = new ScopeNumber(this.shortTime);
        let yTimeUpper = new ScopeNumber(this.longTime);
        let yTimeRange = new util.ScopeHelper(yTimeLower, yTimeUpper);
        let message = getString($r("app.string.scope_expand"));
        try {
            message += `${timeRange.expand(yTimeRange)}`;
        }
        catch {
            message += getString($r('app.string.empty'));
        }
        message += getString($r("app.string.scope_intersect"));
        try {
            message += `${timeRange.intersect(yTimeRange)}`;
        }
        catch {
            message += getString($r('app.string.empty'));
        }
        AlertDialog.show({
            title: $r('app.string.sleep_analyse'),
            message: message,
            confirm: {
                value: $r('app.string.determine'),
                action: () => {
                }
            },
        });
    }
}
