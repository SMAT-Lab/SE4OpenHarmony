interface ListViewMultiChartPage_Params {
    list?: Array<object>;
    title?: string;
    titleModel?: ChartTitleModel;
    menuItemArr?: Array<string>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ListViewMultiChartPage_" + ++__generate__Id;
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
import { LineData } from '@ohos/mpchart';
import { PieData } from '@ohos/mpchart';
import { LineDataSet, Mode } from '@ohos/mpchart';
import { PieDataSet } from '@ohos/mpchart';
import { EntryOhos } from '@ohos/mpchart';
import { PieEntry } from '@ohos/mpchart';
import { JArrayList } from '@ohos/mpchart';
import { ILineDataSet } from '@ohos/mpchart';
import { IBarDataSet } from '@ohos/mpchart';
import { ColorTemplate } from '@ohos/mpchart';
import PieChartItem from './listViewItems/PieChartItem';
import LineChartItem from './listViewItems/LineChartItem';
import BarChartItem from './listViewItems/BarChartItem';
import { BarDataSet } from '@ohos/mpchart';
import { BarData } from '@ohos/mpchart';
import { BarEntry } from '@ohos/mpchart';
import title, { ChartTitleModel } from '../../title';
interface valueItem {
    index: number;
    itemData: object;
}
class ListViewMultiChartPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.list = new Array();
        this.title = 'ListViewMultiChartPage';
        this.__titleModel = new ObservedPropertyObject(new ChartTitleModel(), this, "titleModel");
        this.menuItemArr = ['View on GitHub'];
        this.updateWithValueParams(params);
        this.declareWatch("titleModel", this.menuCallback);
    }
    updateWithValueParams(params: ListViewMultiChartPage_Params) {
        if (params.list !== undefined) {
            this.list = params.list;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.titleModel !== undefined) {
            this.titleModel = params.titleModel;
        }
        if (params.menuItemArr !== undefined) {
            this.menuItemArr = params.menuItemArr;
        }
    }
    aboutToBeDeleted() {
        this.__titleModel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private list: Array<object>;
    private title: string;
    private __titleModel: ObservedPropertyObject<ChartTitleModel>;
    get titleModel() {
        return this.__titleModel.get();
    }
    set titleModel(newValue: ChartTitleModel) {
        this.__titleModel.set(newValue);
    }
    private menuItemArr: Array<string>;
    aboutToAppear() {
        // 30 items
        for (let i = 0; i < 12; i++) {
            if (i % 3 == 0) {
                this.list.push(this.generateDataLine(i + 1));
            }
            else if (i % 3 == 1) {
                this.list.push(this.generateDataBar(i + 1));
            }
            else if (i % 3 == 2) {
                this.list.push(this.generateDataPie());
            }
        }
        this.titleModel.menuItemArr = this.menuItemArr;
        this.titleModel.title = this.title;
        this.titleModel.isShowMenu = false;
    }
    menuCallback() {
        if (this.titleModel == null || this.titleModel == undefined) {
            return;
        }
        let index: number = this.titleModel.getIndex();
        switch (index) {
            case 0:
                break;
        }
        this.titleModel.setIndex(-1);
    }
    private generateDataPie(): PieData {
        let entries: JArrayList<PieEntry> = new JArrayList<PieEntry>();
        for (let i = 0; i < 4; i++) {
            entries.add(new PieEntry(30, "Quarter " + (i + 1)));
        }
        let d: PieDataSet = new PieDataSet(entries, "");
        // space between slices
        d.setSliceSpace(1);
        d.setColorsByVariable(ColorTemplate.COLORFUL_COLORS);
        d.setValueTextSize(25);
        d.setValueTextColor(Color.White);
        return new PieData(d);
    }
    private generateDataLine(cnt: number): LineData {
        let values1: JArrayList<EntryOhos> = new JArrayList<EntryOhos>();
        for (let i = 0; i < 12; i++) {
            values1.add(new EntryOhos(i, (Math.random() * 65) + 40));
        }
        let d1: LineDataSet = new LineDataSet(values1, "New DataSet " + cnt + ", (1)");
        d1.setLineWidth(2.5);
        d1.setCircleRadius(4.5);
        d1.setHighLightColor(0xF47575);
        d1.setDrawValues(false);
        d1.setCircleColor(0x8CEAFF);
        let values2: JArrayList<EntryOhos> = new JArrayList<EntryOhos>();
        for (let i = 0; i < 12; i++) {
            values2.add(new EntryOhos(i, values1.get(i).getY() - 30));
        }
        let d2: LineDataSet = new LineDataSet(values2, "New DataSet " + cnt + ", (2)");
        d2.setLineWidth(2.5);
        d2.setCircleRadius(4.5);
        d2.setHighLightColor(0xF47575);
        d2.setColorByColor(ColorTemplate.VORDIPLOM_COLORS[0]);
        d2.setCircleColor(ColorTemplate.VORDIPLOM_COLORS[0]);
        d2.setDrawValues(false);
        let sets: JArrayList<ILineDataSet> = new JArrayList<ILineDataSet>();
        sets.add(d1);
        sets.add(d2);
        return new LineData(sets);
    }
    private generateDataBar(cnt: number): BarData {
        let entries: JArrayList<BarEntry> = new JArrayList<BarEntry>();
        for (let i = 0; i < 12; i++) {
            entries.add(new BarEntry(i, (Math.random() * 70) + 30));
        }
        let d: BarDataSet = new BarDataSet(entries, "New DataSet " + cnt);
        d.setColorsByVariable(ColorTemplate.VORDIPLOM_COLORS);
        d.setHighLightAlpha(255);
        d.setValueTextSize(8);
        let dataSets: JArrayList<IBarDataSet> = new JArrayList<IBarDataSet>();
        dataSets.add(d);
        let cd: BarData = new BarData(dataSets);
        return cd;
    }
    render() {
        Column.create();
        let earlierCreatedChild_2: title = (this && this.findChildById) ? this.findChildById("2") as title : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new title("2", this, { model: this.titleModel }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                model: this.titleModel
            });
            View.create(earlierCreatedChild_2);
        }
        List.create({ space: 20, initialIndex: 0 });
        List.margin({ bottom: 100 });
        List.listDirection(Axis.Vertical);
        List.divider({ strokeWidth: 1, color: Color.Gray, startMargin: 0, endMargin: 0 });
        List.edgeEffect(EdgeEffect.None);
        List.chainAnimation(false);
        ForEach.create("6", this, ObservedObject.GetRawObject(this.list.map((data, index) => {
            let value: valueItem = { index: index, itemData: data };
            return value;
        })), (item: valueItem) => {
            ListItem.create();
            ListItem.editable(false);
            Column.create();
            If.create();
            if (item.itemData instanceof PieData) {
                If.branchId(0);
                let earlierCreatedChild_3: PieChartItem = (this && this.findChildById) ? this.findChildById("3") as PieChartItem : undefined;
                if (earlierCreatedChild_3 == undefined) {
                    View.create(new PieChartItem("3", this, { data: item.itemData }));
                }
                else {
                    earlierCreatedChild_3.updateWithValueParams({
                        data: item.itemData
                    });
                    View.create(earlierCreatedChild_3);
                }
            }
            If.pop();
            If.create();
            if (item.itemData instanceof LineData) {
                If.branchId(0);
                let earlierCreatedChild_4: LineChartItem = (this && this.findChildById) ? this.findChildById("4") as LineChartItem : undefined;
                if (earlierCreatedChild_4 == undefined) {
                    View.create(new LineChartItem("4", this, { data: item.itemData }));
                }
                else {
                    earlierCreatedChild_4.updateWithValueParams({
                        data: item.itemData
                    });
                    View.create(earlierCreatedChild_4);
                }
            }
            If.pop();
            If.create();
            if (item.itemData instanceof BarData) {
                If.branchId(0);
                let earlierCreatedChild_5: BarChartItem = (this && this.findChildById) ? this.findChildById("5") as BarChartItem : undefined;
                if (earlierCreatedChild_5 == undefined) {
                    View.create(new BarChartItem("5", this, { data: item.itemData }));
                }
                else {
                    earlierCreatedChild_5.updateWithValueParams({
                        data: item.itemData
                    });
                    View.create(earlierCreatedChild_5);
                }
            }
            If.pop();
            Column.pop();
            ListItem.pop();
        }, (item: valueItem) => item.index + "");
        ForEach.pop();
        List.pop();
        Column.pop();
    }
}
loadDocument(new ListViewMultiChartPage("1", undefined, {}));
