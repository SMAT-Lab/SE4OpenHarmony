let __generate__Id: number = 0;
function generateId(): string {
    return "PieHighlighter_" + ++__generate__Id;
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
import PieRadarHighlighter from './PieRadarHighlighter';
import PieChart from '../charts/PieChartModel';
import Highlight from './Highlight';
import IPieDataSet from '../interfaces/datasets/IPieDataSet';
import EntryOhos from '../data/EntryOhos';
export default class PieHighlighter extends PieRadarHighlighter<PieChart> {
    constructor(chart: PieChart) {
        super(chart);
    }
    public getClosestHighlight(index: number, x: number, y: number): Highlight {
        let chartData = this.mChart.getData();
        if (chartData) {
            let set: IPieDataSet = chartData.getDataSet();
            let entry: EntryOhos = set.getEntryForIndex(index);
            return new Highlight(index, entry.getY(), 0, -1, 0, x, y, set.getAxisDependency());
        }
        return new Highlight(0, 0, 0, 0, 0, 0, 0, null);
    }
}
