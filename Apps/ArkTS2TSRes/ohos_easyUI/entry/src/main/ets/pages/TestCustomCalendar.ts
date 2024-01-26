interface TestCustomCalendar_Params {
    dialogController?: CustomDialogController;
    selectedDay?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "TestCustomCalendar_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Institute of Software, Chinese Academy of Sciences.
 * Licensed under the Apache License,Version 2.0 (the "License");
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
import { CustomCalendar } from "easyui";
class TestCustomCalendar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.dialogController = new CustomDialogController({
            builder: CustomCalendar({ confirmSelectedDay: $selectedDay }),
            cancel: () => {
                console.info('退出选择日期');
            },
            autoCancel: true,
            alignment: DialogAlignment.Bottom,
            offset: { dx: 0, dy: -20 }
        }, this);
        this.__selectedDay = new ObservedPropertySimple('' // 点击选中的时间
        , this, "selectedDay");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: TestCustomCalendar_Params) {
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
        if (params.selectedDay !== undefined) {
            this.selectedDay = params.selectedDay;
        }
    }
    aboutToBeDeleted() {
        this.__selectedDay.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private dialogController: CustomDialogController;
    private __selectedDay: ObservedPropertySimple<string>; // 点击选中的时间
    get selectedDay() {
        return this.__selectedDay.get();
    }
    set selectedDay(newValue: string) {
        this.__selectedDay.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.margin({ top: 5 });
        Button.createWithLabel('显示日历弹框');
        Button.onClick(() => {
            this.dialogController.open();
        });
        Button.backgroundColor(0x317aff);
        Button.pop();
        Text.create(this.selectedDay);
        Text.fontSize(30);
        Text.width('100%');
        Text.textAlign(TextAlign.Center);
        Text.pop();
        Column.pop();
    }
}
loadDocument(new TestCustomCalendar("1", undefined, {}));
