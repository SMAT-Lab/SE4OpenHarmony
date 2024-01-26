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

import Deque from '@ohos.util.Deque';
import { BaseDataSource } from '@ohos/common';
import { Information } from '../../model/Information';

export class DequeDataSource extends BaseDataSource {
  private deque = new Deque<Information>();

  public totalCount(): number {
    return this.deque.length
  }

  public getData(index: number): Information {
    return this.deque[index]
  }

  public insertFront(information: Information): void {
    this.deque.insertFront(information);
    this.deque.forEach((value, index) => {
      value.clickAble = index === 0 || index === this.deque.length - 1;
    });
    this.notifyDataReload();
  }

  public insertEnd(information: Information): void {
    this.deque.insertEnd(information);
    this.deque.forEach((value, index) => {
      value.clickAble = index === 0 || index === this.deque.length - 1;
    });
    this.notifyDataReload();
  }

  public deleteFront(): void {
    this.deque.popFirst();
    this.deque.forEach((value, index) => {
      value.clickAble = index === 0 || index === this.deque.length - 1;
    });
    this.notifyDataReload();
  }

  public deleteEnd(): void {
    this.deque.popLast();
    this.deque.forEach((value, index) => {
      value.clickAble = index === 0 || index === this.deque.length - 1;
    });
    this.notifyDataReload();
  }
}