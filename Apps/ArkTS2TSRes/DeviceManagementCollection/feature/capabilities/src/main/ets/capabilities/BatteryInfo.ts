interface BatteryInfo_Params {
    table?: ListModel[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BatteryInfo_" + ++__generate__Id;
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
import { ListModel } from '../model/ListModel';
import { BatteryUtil } from '../util/BatteryUtil';
function __Text__fancy(): void {
    Text.height(50);
    Text.fontSize(16);
    Text.fontWeight(500);
}
export class BatteryInfo extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__table = new ObservedPropertyObject([
            new ListModel('Battery SOC', BatteryUtil.batterySOC),
            new ListModel('Charging Status', BatteryUtil.chargingStatus),
            new ListModel('Health Status', BatteryUtil.healthStatus),
            new ListModel('Plugged Type', BatteryUtil.pluggedType),
            new ListModel('Voltage', BatteryUtil.voltage),
            new ListModel('Technology', BatteryUtil.technology),
            new ListModel('Battery Temperature', BatteryUtil.batteryTemperature),
            new ListModel('Battery Present', BatteryUtil.isBatteryPresent),
            new ListModel('Battery Capacity Level', BatteryUtil.batteryCapacityLevel)
        ], this, "table");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BatteryInfo_Params) {
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
    render() {
        List.create();
        List.divider({
            strokeWidth: px2vp(1),
            color: $r("app.color.divider"),
            startMargin: 16,
            endMargin: 16
        });
        List.margin({
            top: 16,
            bottom: 16,
            left: 4,
            right: 4
        });
        List.width('100%');
        List.backgroundColor($r("app.color.white"));
        List.borderRadius(20);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.table), (item: ListModel) => {
            ListItem.create();
            Row.create();
            Row.padding({
                left: 16,
                right: 16
            });
            Row.height(62);
            Row.width('100%');
            Text.create(item.title);
            Text.textAlign(TextAlign.Start);
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor($r("app.color.list_title"));
            Text.pop();
            Blank.create();
            Blank.pop();
            Text.create(item.getValue());
            Text.textAlign(TextAlign.End);
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Regular);
            Text.fontColor($r("app.color.list_sub_content"));
            Text.pop();
            Row.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
    }
}
