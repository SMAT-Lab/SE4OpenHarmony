interface PieChartItem_Params {
    data?: PieData;
    pieModel?: PieChartModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PieChartItem_" + ++__generate__Id;
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
import { PieChartModel, PieData } from '@ohos/mpchart';
import { PieChart } from '@ohos/mpchart';
import { Legend, LegendVerticalAlignment, LegendOrientation, LegendHorizontalAlignment } from '@ohos/mpchart';
import { MPPointF } from '@ohos/mpchart';
export default class PieChartItem extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.data = new PieData();
        this.__pieModel = new ObservedPropertyObject(new PieChartModel(), this, "pieModel");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PieChartItem_Params) {
        if (params.data !== undefined) {
            this.data = params.data;
        }
        if (params.pieModel !== undefined) {
            this.pieModel = params.pieModel;
        }
    }
    aboutToBeDeleted() {
        this.__pieModel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private data: PieData;
    private __pieModel: ObservedPropertyObject<PieChartModel>;
    get pieModel() {
        return this.__pieModel.get();
    }
    set pieModel(newValue: PieChartModel) {
        this.__pieModel.set(newValue);
    }
    aboutToAppear() {
        this.pieModel.setHoleRadius(95);
        this.pieModel.setData(this.data);
        this.pieModel.setUsePercentValues(true);
        this.pieModel.setHoleRadius(10);
        this.pieModel.setTransparentCircleRadius(15);
        this.pieModel.setExtraOffsets(-20, 0, 0, 0);
        this.pieModel.setEntryLabelTextSize(5);
        this.pieModel.setDrawHoleEnabled(false);
        let l: Legend | null = this.pieModel.getLegend();
        if (l) {
            l.setOrientation(LegendOrientation.VERTICAL);
            l.setVerticalAlignment(LegendVerticalAlignment.TOP);
            l.setHorizontalAlignment(LegendHorizontalAlignment.RIGHT);
        }
    }
    render() {
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.pop();
    }
}
