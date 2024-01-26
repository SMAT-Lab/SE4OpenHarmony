let __generate__Id: number = 0;
function generateId(): string {
    return "TreeMapDataSource_" + ++__generate__Id;
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
import TreeMap from '@ohos.util.TreeMap';
import ArrayList from '@ohos.util.ArrayList';
import { BaseDataSource } from '@ohos/common';
import { KeyValuePair } from '../../model/KeyValuePair';
export class TreeMapDataSource extends BaseDataSource {
    private dataArr: TreeMap<string, string> = new TreeMap();
    private arr: ArrayList<string> = new ArrayList();
    public totalCount(): number {
        return this.arr.length;
    }
    public getData(index: number): KeyValuePair {
        let key: string = this.arr[index];
        let value: string = this.dataArr.get(key);
        this.dataArr.get(this.arr[index]);
        let keyValuePair: KeyValuePair = new KeyValuePair(`${this.arr[index]}`, value);
        return keyValuePair;
    }
    public addData(keyValuePair: KeyValuePair): void {
        if (!this.dataArr.hasKey(keyValuePair.key)) {
            this.arr.add(keyValuePair.key);
        }
        this.dataArr.set(keyValuePair.key, keyValuePair.value);
        this.notifyDataChange(this.dataArr.length - 1);
        this.notifyDataReload();
    }
    public deleteData(key: string): void {
        this.dataArr.remove(key);
        let index = this.arr.getIndexOf(key);
        this.arr.remove(key);
        this.notifyDataDelete(index);
        this.notifyDataReload();
    }
}
