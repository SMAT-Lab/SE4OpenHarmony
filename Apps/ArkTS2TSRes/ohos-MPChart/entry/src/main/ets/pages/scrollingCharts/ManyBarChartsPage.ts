interface ManyBarChartsPage_Params {
    minOffset?: number;
    list?: Array<BarChartModel>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ManyBarChartsPage_" + ++__generate__Id;
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
import { BarEntry } from '@ohos/mpchart';
import { JArrayList } from '@ohos/mpchart';
import { BarDataSet } from '@ohos/mpchart';
import { BarData } from '@ohos/mpchart';
import { BarChart, BarChartModel } from '@ohos/mpchart';
import { IBarDataSet } from '@ohos/mpchart';
import { ColorTemplate } from '@ohos/mpchart';
interface valueItem {
    index: number;
    data: BarChartModel;
}
class ManyBarChartsPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.minOffset = 15;
        this.list = new Array<BarChartModel>();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ManyBarChartsPage_Params) {
        if (params.minOffset !== undefined) {
            this.minOffset = params.minOffset;
        }
        if (params.list !== undefined) {
            this.list = params.list;
        }
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    private minOffset: number; //X轴线偏移量
    private list: Array<BarChartModel>;
    aboutToAppear() {
        // 20 items
        for (let i = 0; i < 20; i++) {
            this.setData(i + 1, this.createModel());
        }
    }
    private createModel(): BarChartModel {
        let model: BarChartModel = new BarChartModel();
        model.setDrawBarShadow(false);
        model.setDrawValueAboveBar(true);
        model.getDescription()?.setEnabled(false);
        model.setMaxVisibleValueCount(60);
        return model;
    }
    render() {
        Column.create();
        Column.create();
        List.create({ space: 20, initialIndex: 0 });
        List.listDirection(Axis.Vertical);
        List.divider({ strokeWidth: 1, color: Color.Gray, startMargin: 0, endMargin: 0 });
        List.edgeEffect(EdgeEffect.None);
        List.chainAnimation(false);
        ForEach.create("2", this, ObservedObject.GetRawObject(this.list.map((data, index) => {
            let value: valueItem = { data: data, index: index };
            return value;
        })), (item: valueItem) => {
            ListItem.create();
            ListItem.editable(false);
            Column.create();
            Column.pop();
            ListItem.pop();
        }, (item: valueItem) => item.index + "");
        ForEach.pop();
        List.pop();
        Column.pop();
        Column.pop();
    }
    private setData(cnt: number, model: BarChartModel) {
        let entries: JArrayList<BarEntry> = new JArrayList<BarEntry>();
        for (let i = 0; i < 12; i++) {
            entries.add(new BarEntry(i, (Math.random() * 70) + 30));
        }
        let d: BarDataSet = new BarDataSet(entries, "New DataSet " + cnt);
        d.setColorsByVariable(ColorTemplate.VORDIPLOM_COLORS);
        d.setDrawIcons(false);
        d.setValueTextSize(25);
        let sets: JArrayList<IBarDataSet> = new JArrayList<IBarDataSet>();
        sets.add(d);
        let cd: BarData = new BarData(sets);
        cd.setValueTextSize(10);
        model.setData(cd);
        this.list.push(model);
    }
}
loadDocument(new ManyBarChartsPage("1", undefined, {}));
