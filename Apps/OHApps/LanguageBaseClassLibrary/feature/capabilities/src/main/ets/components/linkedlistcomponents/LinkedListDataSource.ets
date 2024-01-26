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

import LinkedList from '@ohos.util.LinkedList';
import { BaseDataSource } from '@ohos/common';
import { Information } from '../../model/Information';

export class LinkedListDataSource extends BaseDataSource {
  private linkedList: LinkedList<Information> = new LinkedList();

  public totalCount(): number {
    return this.linkedList.length;
  }

  public getData(index: number): Information {
    return this.linkedList[index];
  }

  public addData(item: Information): void {
    this.linkedList.add(item);
    this.notifyDataAdd(this.linkedList.length - 1);
    this.notifyDataReload();
  }

  public deleteFirst(): void {
    this.linkedList.removeFirst();
    this.notifyDataDelete(0);
    this.notifyDataReload();
  }

  public deleteLast(): void {
    this.linkedList.removeLast();
    this.notifyDataDelete(this.linkedList.length - 1);
    this.notifyDataReload();
  }

  public deleteData(index: number): void {
    this.linkedList.removeByIndex(index);
    this.notifyDataDelete(index);
    this.notifyDataReload();
  }
}