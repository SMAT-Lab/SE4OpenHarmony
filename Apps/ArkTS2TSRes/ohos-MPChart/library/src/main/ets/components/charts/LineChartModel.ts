let __generate__Id: number = 0;
function generateId(): string {
    return "LineChartModel_" + ++__generate__Id;
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
import LineData from '../data/LineData';
import LineDataProvider from '../interfaces/dataprovider/LineDataProvider';
import LineChartRenderer from '../renderer/LineChartRenderer';
import BarLineChartBaseModel from './BarLineChartBaseModel';
export default class LineChartModel extends BarLineChartBaseModel<LineData> implements LineDataProvider {
    public context2d: CanvasRenderingContext2D | null = null;
    constructor() {
        super();
        this.init();
    }
    public invalidate() {
        if (this.context2d) {
            this.onDraw(this.context2d);
        }
    }
    public setContext2D(context2d: CanvasRenderingContext2D) {
        this.context2d = context2d;
    }
    public onChartSizeChanged(newWidth: number, newHeight: number, oldWidth: number, oldHeight: number) {
        super.onSizeChanged(newWidth, newHeight, oldWidth, oldHeight);
    }
    public onDraw(c: CanvasRenderingContext2D): void {
        super.onDraw(c);
    }
    protected init(): void {
        super.init();
        this.mRenderer = new LineChartRenderer(this, this.mAnimator!, this.mViewPortHandler);
    }
    public getLineData(): LineData | null {
        return this.mData;
    }
}
