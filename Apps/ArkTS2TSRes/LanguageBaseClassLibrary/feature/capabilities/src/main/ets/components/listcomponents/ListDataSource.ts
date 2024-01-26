let __generate__Id: number = 0;
function generateId(): string {
    return "ListDataSource_" + ++__generate__Id;
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
import ListUtil from '@ohos.util.List';
import { BaseDataSource } from '@ohos/common';
import { Information } from '../../model/Information';
export class ListDateSource extends BaseDataSource {
    private dataArr: ListUtil<Information> = new ListUtil();
    public totalCount(): number {
        return this.dataArr.length;
    }
    public getData(index: number): Information {
        return this.dataArr.get(index);
    }
    public addData(information: Information): void {
        this.dataArr.add(information);
        this.notifyDataAdd(this.dataArr.length - 1);
        this.notifyDataReload();
    }
    public deleteData(index: number): void {
        this.dataArr.removeByIndex(index);
        this.notifyDataDelete(index);
        this.notifyDataReload();
    }
}
