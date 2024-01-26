interface BarChartItem_Params {
    data?: BarData | null;
    barModel?: BarChartModel;
    mChartData?: BarData | null;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BarChartItem_" + ++__generate__Id;
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
import { BarData } from '@ohos/mpchart';
import { LegendEntry } from '@ohos/mpchart';
import { BarChart, BarChartModel } from '@ohos/mpchart';
import { XAxis, XAxisPosition } from '@ohos/mpchart';
import { YAxis, AxisDependency, YAxisLabelPosition } from '@ohos/mpchart';
export default class BarChartItem extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.data = null;
        this.__barModel = new ObservedPropertyObject(new BarChartModel(), this, "barModel");
        this.mChartData = null;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BarChartItem_Params) {
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.barModel !== undefined) {
            this.barModel = params.barModel;
        }
        if (params.mChartData !== undefined) {
            this.mChartData = params.mChartData;
        }
    }
    aboutToBeDeleted() {
        this.__barModel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private data: BarData | null;
    private __barModel: ObservedPropertyObject<BarChartModel>;
    get barModel() {
        return this.__barModel.get();
    }
    set barModel(newValue: BarChartModel) {
        this.__barModel.set(newValue);
    }
    private mChartData: BarData | null;
    aboutToAppear() {
        let leftAxis = this.barModel.getAxisLeft();
        if (leftAxis) {
            leftAxis.setLabelCount(7, false);
            leftAxis?.setAxisMinimum(0);
            leftAxis?.setAxisMaximum(100);
            leftAxis?.enableGridDashedLine(10, 10, 0);
        }
        if (this.data) {
            this.data.setValueTextSize(20);
            this.barModel.setData(this.data!);
        }
        this.barModel.setDrawBarShadow(false);
        this.barModel.setDrawValueAboveBar(true);
        this.barModel.getDescription()?.setEnabled(false);
        this.barModel.setMaxVisibleValueCount(60);
    }
    render() {
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Stack.create();
        Stack.pop();
        Column.pop();
    }
}
interface valueItem {
    index: number;
    legendItem: LegendEntry;
}
loadDocument(new BarChartItem("1", undefined, {}));
