interface Thermal_Params {
    table?: ListModel[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Thermal_" + ++__generate__Id;
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
import systemTime from '@ohos.systemDateTime';
import { ListModel } from '../model/ListModel';
import thermal from '@ohos.thermal';
import { ThermalUtil } from '../util/ThermalUtil';
import promptAction from '@ohos.promptAction';
function __Text__fancy(): void {
    Text.height(50);
    Text.fontSize(16);
    Text.fontWeight(500);
}
export class Thermal extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__table = new ObservedPropertyObject([
            new ListModel('Thermal level', ThermalUtil.getLevel),
            new ListModel('Callback level', undefined),
            new ListModel('Last callback time', undefined)
        ], this, "table");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Thermal_Params) {
        if (params.table !== undefined) {
            this.table = params.table;
        }
    }
    aboutToBeDeleted() {
        this.__table.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __table: ObservedPropertyObject<ListModel[]>;
    get table() {
        return this.__table.get();
    }
    set table(newValue: ListModel[]) {
        this.__table.set(newValue);
    }
    aboutToAppear() {
        this.initThermal();
    }
    aboutToDisappear() {
        ThermalUtil.unregisterThermalLevelCallback();
    }
    render() {
        List.create();
        List.divider({
            strokeWidth: px2vp(1),
            color: $r("app.color.divider"),
            startMargin: 16,
            endMargin: 16
        });
        List.borderRadius(20);
        List.backgroundColor($r("app.color.white"));
        List.margin({
            top: 16,
            bottom: 16,
            left: 4,
            right: 4
        });
        List.width('100%');
        ForEach.create("2", this, ObservedObject.GetRawObject(this.table), (item: ListModel) => {
            ListItem.create();
            Row.create();
            Row.padding({ left: 16, right: 16 });
            Row.height(62);
            Row.width('100%');
            Text.create(item.title);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor($r("app.color.list_title"));
            Text.textAlign(TextAlign.Start);
            Text.pop();
            Blank.create();
            Blank.pop();
            Text.create(item.getValue());
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor($r("app.color.list_sub_content"));
            Text.textAlign(TextAlign.End);
            Text.pop();
            Row.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
    }
    initThermal() {
        const INDEX_0 = 0;
        const INDEX_1 = 1;
        ThermalUtil.registerThermalLevelCallback((level: number) => {
            this.table[INDEX_0] = new ListModel('Thermal level', undefined, ThermalUtil.getLevel());
            this.table[INDEX_1] = new ListModel('Callback level', undefined, ThermalUtil.getStrLevel(level));
            this.getCurrentTime();
            if (level === thermal.ThermalLevel.WARNING) {
                try {
                    promptAction.showToast({
                        message: $r('app.string.thermal_warning'),
                        duration: 2000,
                    });
                }
                catch (error) {
                    console.error(`showToast args error code is ${error?.code}, message is ${error?.message}`);
                }
            }
        });
    }
    getCurrentTime() {
        const INDEX_2 = 2;
        systemTime.getCurrentTime().then((date: number) => {
            this.table[INDEX_2] = new ListModel('Last callback time', undefined, ThermalUtil.timestampToTime(date));
        });
    }
}
