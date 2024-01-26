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
import { KeyValuePair } from '../../model/KeyValuePair';

export class HashMapDataSource extends BaseDataSource {
  public dataArr: KeyValuePair[] = [];

  public totalCount(): number {
    return this.dataArr.length;
  }

  public getData(index: number): KeyValuePair {
    return this.dataArr[index];
  }

  public addData(item: KeyValuePair): void {
    this.dataArr.push(item);
    this.notifyDataAdd(this.dataArr.length - 1);
    this.notifyDataReload();
  }

  public deleteData(item: KeyValuePair, index: number): void {
    this.notifyDataDelete(index);
    this.dataArr.splice(index, 1);
    this.notifyDataReload();
  }
}