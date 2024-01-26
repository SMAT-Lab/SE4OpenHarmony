interface LineChartItem_Params {
    data?: LineData | null;
    lineChartModel?: LineChartModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LineChartItem_" + ++__generate__Id;
}
/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
import { LineChart, LineChartModel } from '@ohos/mpchart';
import { XAxisPosition } from '@ohos/mpchart';
import { LineData } from '@ohos/mpchart';
import { LimitLine } from '@ohos/mpchart';
export default class LineChartItem extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.data = null;
        this.__lineChartModel = new ObservedPropertyObject(new LineChartModel(), this, "lineChartModel");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: LineChartItem_Params) {
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.lineChartModel !== undefined) {
            this.lineChartModel = params.lineChartModel;
        }
    }
    aboutToBeDeleted() {
        this.__lineChartModel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private data: LineData | null;
    private __lineChartModel: ObservedPropertyObject<LineChartModel>;
    get lineChartModel() {
        return this.__lineChartModel.get();
    }
    set lineChartModel(newValue: LineChartModel) {
        this.__lineChartModel.set(newValue);
    }
    aboutToAppear() {
        if (this.data) {
            this.lineChartModel.setData(this.data);
        }
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.alignItems(HorizontalAlign.Start);
        Column.pop();
    }
}
loadDocument(new LineChartItem("1", undefined, {}));
