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

import Stack from '@ohos.util.Stack';
import { BaseDataSource } from '@ohos/common';
import { Information } from '../../model/Information';

export class StackDataSource extends BaseDataSource {
  private dataArr: Stack<Information> = new Stack();

  public totalCount(): number {
    return this.dataArr.length;
  }

  public getData(index: number): Information {
    return this.dataArr[index];
  }

  public addData(information: Information): void {
    this.dataArr.push(information);
    this.dataArr.forEach((value, index) => {
      value.clickAble = index === this.dataArr.length - 1;
    });
    this.notifyDataAdd(this.dataArr.length - 1);
    this.notifyDataReload();
  }

  public deleteData(): void {
    this.dataArr.pop();
    this.dataArr.forEach((value, index) => {
      value.clickAble = index === this.dataArr.length - 1;
    });
    this.notifyDataDelete(this.dataArr.length - 1);
    this.notifyDataReload();
  }
}