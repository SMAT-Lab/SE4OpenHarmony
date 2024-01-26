interface RootSample_Params {
    sample?: routerType[];
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import router from '@ohos.router';
class RootSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.sample = [
            { title: 'WheelPicker', page: 'pages/wheelpicker' },
            { title: 'WheelAreaPicker', page: 'pages/wheelareapicker' },
            { title: 'WheelDatePicker', page: 'pages/wheeldatepicker' },
            { title: 'WheelDayPicker', page: 'pages/wheeldaypicker' },
            { title: 'WheelMonthPicker', page: 'pages/wheelmonthpicker' },
            { title: 'WheelYearPicker', page: 'pages/wheelyearpicker' }
        ];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: RootSample_Params) {
        if (params.sample !== undefined) {
            this.sample = params.sample;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private sample: routerType[];
    render() {
        Column.create();
        Column.backgroundColor('#FAFAFA');
        List.create();
        List.width('100%');
        List.height('100%');
        List.edgeEffect(EdgeEffect.None);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.sample), (item: routerType) => {
            ListItem.create();
            Column.create();
            Text.create(item.title);
            Text.width('100%');
            Text.margin('3%');
            Text.fontSize(18);
            Text.fontColor('#000000');
            Text.onClick(() => {
                router.pushUrl({ url: item.page });
            });
            Text.pop();
            Divider.create();
            Divider.color('#DCDCDC');
            Divider.strokeWidth(1);
            Column.pop();
            ListItem.pop();
        });
        ForEach.pop();
        List.pop();
        Column.pop();
    }
}
class routerType {
    title: string = '';
    page: string = '';
}
loadDocument(new RootSample("1", undefined, {}));
