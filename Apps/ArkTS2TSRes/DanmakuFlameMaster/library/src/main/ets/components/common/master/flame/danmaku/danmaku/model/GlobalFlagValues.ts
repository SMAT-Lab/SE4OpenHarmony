let __generate__Id: number = 0;
function generateId(): string {
    return "GlobalFlagValues_" + ++__generate__Id;
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
export class GlobalFlagValues {
    public MEASURE_RESET_FLAG: number = 0;
    public VISIBLE_RESET_FLAG: number = 0;
    public FILTER_RESET_FLAG: number = 0;
    public FIRST_SHOWN_RESET_FLAG: number = 0;
    public SYNC_TIME_OFFSET_RESET_FLAG: number = 0;
    public PREPARE_RESET_FLAG: number = 0;
    public resetAll() {
        this.VISIBLE_RESET_FLAG = 0;
        this.MEASURE_RESET_FLAG = 0;
        this.FILTER_RESET_FLAG = 0;
        this.FIRST_SHOWN_RESET_FLAG = 0;
        this.SYNC_TIME_OFFSET_RESET_FLAG = 0;
        this.PREPARE_RESET_FLAG = 0;
    }
    public updateAll() {
        this.VISIBLE_RESET_FLAG++;
        this.MEASURE_RESET_FLAG++;
        this.FILTER_RESET_FLAG++;
        this.FIRST_SHOWN_RESET_FLAG++;
        this.SYNC_TIME_OFFSET_RESET_FLAG++;
        this.PREPARE_RESET_FLAG++;
    }
    public updateVisibleFlag() {
        this.VISIBLE_RESET_FLAG++;
    }
    public updateMeasureFlag() {
        this.MEASURE_RESET_FLAG++;
    }
    public updateFilterFlag() {
        this.FILTER_RESET_FLAG++;
    }
    public updateFirstShownFlag() {
        this.FIRST_SHOWN_RESET_FLAG++;
    }
    public updateSyncOffsetTimeFlag() {
        this.SYNC_TIME_OFFSET_RESET_FLAG++;
    }
    public updatePrepareFlag() {
        this.PREPARE_RESET_FLAG++;
    }
}
