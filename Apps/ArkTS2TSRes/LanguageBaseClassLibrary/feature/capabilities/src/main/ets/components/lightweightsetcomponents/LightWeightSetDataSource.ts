let __generate__Id: number = 0;
function generateId(): string {
    return "LightWeightSetDataSource_" + ++__generate__Id;
}
/*
* Copyright (c) 2023 Hunan OpenValley Digital Industry Development Co., Ltd.
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
import { BaseDataSource } from '@ohos/common';
export class LightWeightSetDataSource extends BaseDataSource {
    public dataArr: string[] = [];
    public totalCount(): number {
        return this.dataArr.length;
    }
    public getData(index: number): string {
        return this.dataArr[index];
    }
    public addData(item: string): void {
        this.dataArr.push(item);
        this.notifyDataAdd(this.dataArr.length - 1);
        this.notifyDataReload();
    }
    public deleteData(item: string, index: number): void {
        this.dataArr.splice(index, 1);
        this.notifyDataDelete(index);
        this.notifyDataReload();
    }
}