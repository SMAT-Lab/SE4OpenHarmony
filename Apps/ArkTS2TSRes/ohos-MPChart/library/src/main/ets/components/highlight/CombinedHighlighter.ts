let __generate__Id: number = 0;
function generateId(): string {
    return "CombinedHighlighter_" + ++__generate__Id;
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
import BarData from '../data/BarData';
import BarLineScatterCandleBubbleData from '../data/BarLineScatterCandleBubbleData';
import ChartData from '../data/ChartData';
import { Rounding } from '../data/DataSet';
import EntryOhos from '../data/EntryOhos';
import BarDataProvider from '../interfaces/dataprovider/BarDataProvider';
import CombinedDataProvider from '../interfaces/dataprovider/CombinedDataProvider';
import IBarLineScatterCandleBubbleDataSet from '../interfaces/datasets/IBarLineScatterCandleBubbleDataSet';
import IDataSet from '../interfaces/datasets/IDataSet';
import { JArrayList } from '../utils/JArrayList';
import BarHighlighter from './BarHighlighter';
import ChartHighlighter from './ChartHighlighter';
import Highlight from './Highlight';
import IHighlighter from './IHighlighter';
export default class CombinedHighlighter extends ChartHighlighter<CombinedDataProvider> implements IHighlighter {
    /**
     * bar highlighter for supporting stacked highlighting
     */
    protected barHighlighter: BarHighlighter | null = null;
    constructor(chart: CombinedDataProvider, barChart: BarDataProvider) {
        super(chart);
        // if there is BarData, create a BarHighlighter
        this.barHighlighter = barChart.getBarData() == null ? null : new BarHighlighter(barChart);
    }
    protected getHighlightsAtXValue(xVal: number, x: number, y: number): JArrayList<Highlight> | null {
        this.mHighlightBuffer.clear();
        let combinedData = this.mChart.getCombinedData();
        if (!combinedData) {
            return null;
        }
        let dataObjects: JArrayList<BarLineScatterCandleBubbleData<IBarLineScatterCandleBubbleDataSet<EntryOhos>>> = combinedData.getAllData();
        for (let i = 0; i < dataObjects.size(); i++) {
            let dataObject: BarLineScatterCandleBubbleData<IBarLineScatterCandleBubbleDataSet<EntryOhos>> = dataObjects.get(i);
            // in case of BarData, let the BarHighlighter take over
            if (this.barHighlighter != null && dataObject instanceof BarData) {
                let high: Highlight | null = this.barHighlighter.getHighlight(x, y);
                if (high != null) {
                    high.setDataIndex(i);
                    this.mHighlightBuffer.add(high);
                }
            }
            else {
                for (let j = 0, dataSetCount = dataObject.getDataSetCount(); j < dataSetCount; j++) {
                    let dataSet: IBarLineScatterCandleBubbleDataSet<EntryOhos> | null = dataObjects.get(i).getDataSetByIndex(j);
                    // don't include datasets that cannot be highlighted
                    if (!dataSet || !dataSet.isHighlightEnabled())
                        continue;
                    let highs: JArrayList<Highlight> = this.buildHighlights(dataSet as IDataSet<EntryOhos>, j, xVal, Rounding.CLOSEST);
                    for (let j = 0; j < highs.size(); j++) {
                        let high = highs.get(j);
                        high.setDataIndex(i);
                        this.mHighlightBuffer.add(high);
                    }
                }
            }
        }
        return this.mHighlightBuffer;
    }
}
