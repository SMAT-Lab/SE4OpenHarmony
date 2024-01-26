let __generate__Id: number = 0;
function generateId(): string {
    return "IBarLineScatterCandleBubbleDataSet_" + ++__generate__Id;
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
import EntryOhos from '../../data/EntryOhos';
import IDataSet from './IDataSet';
export default interface IBarLineScatterCandleBubbleDataSet<T extends EntryOhos> extends IDataSet<T> {
    /**
     * Returns the color that is used for drawing the highlight indicators.
     *
     * @return
     */
    getHighLightColor(): number;
}
