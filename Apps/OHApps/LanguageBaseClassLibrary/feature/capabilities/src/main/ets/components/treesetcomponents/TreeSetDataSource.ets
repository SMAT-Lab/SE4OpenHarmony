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

import TreeSet from '@ohos.util.TreeSet';
import ArrayList from '@ohos.util.ArrayList';
import { BaseDataSource } from '@ohos/common';

export class TreeSetDataSource extends BaseDataSource {
  private dataArr: TreeSet<string> = new TreeSet();
  private arr: ArrayList<string> = new ArrayList();

  public totalCount(): number {
    return this.dataArr.length;
  }

  public getData(index: number): string {
    return this.arr[index];
  }

  public addData(value: string): void {
    this.dataArr.add(value);
    this.arr.add(value);
    this.notifyDataAdd(this.dataArr.length - 1);
    this.notifyDataReload();
  }

  public deleteData(value: string, index: number): void {
    this.dataArr.remove(value);
    this.arr.removeByIndex(index);
    this.notifyDataDelete(index);
    this.notifyDataReload();
  }
}