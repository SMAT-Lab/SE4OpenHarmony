interface HashSetView_Params {
    totalCount?: number;
    hashSet?: HashSet<string>;
    dataSource?: HashSetDataSource;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "HashSetView_" + ++__generate__Id;
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
import HashSet from '@ohos.util.HashSet';
import emitter from '@ohos.events.emitter';
import { EmptyPage, logger } from '@ohos/common';
import { ValueItemView } from '../components/ValueItemView';
import { HashSetDataSource } from '../components/hashsetcomponents/HashSetDataSource';
import { Constant } from '../Constant';
const TAG = 'HashSetView';
export class HashSetView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__totalCount = new ObservedPropertySimple(0, this, "totalCount");
        this.hashSet = new HashSet();
        this.dataSource = new HashSetDataSource();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: HashSetView_Params) {
        if (params.totalCount !== undefined) {
            this.totalCount = params.totalCount;
        }
        if (params.hashSet !== undefined) {
            this.hashSet = params.hashSet;
        }
        if (params.dataSource !== undefined) {
            this.dataSource = params.dataSource;
        }
    }
    aboutToBeDeleted() {
        this.__totalCount.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __totalCount: ObservedPropertySimple<number>;
    get totalCount() {
        return this.__totalCount.get();
    }
    set totalCount(newValue: number) {
        this.__totalCount.set(newValue);
    }
    private hashSet: HashSet<string>;
    private dataSource: HashSetDataSource;
    aboutToAppear() {
        emitter.on({ eventId: Constant.EMITTER_ID_HASH_SET }, (eventData: emitter.EventData) => {
            if (eventData.data === undefined) {
                return;
            }
            let item: string = eventData.data.value;
            this.dataSource.addData(item);
            this.totalCount = this.dataSource.totalCount();
            this.hashSet.add(item);
        });
    }
    aboutToDisappear() {
        emitter.off(Constant.EMITTER_ID_HASH_SET);
    }
    render() {
        Column.create();
        Column.backgroundColor($r('sys.color.ohos_id_color_sub_background'));
        If.create();
        if (this.totalCount != 0) {
            If.branchId(0);
            List.create({ space: 12 });
            List.width('100%');
            List.height('100%');
            List.padding({ top: 8, left: 12, right: 12 });
            LazyForEach.create("3", this, ObservedObject.GetRawObject(this.dataSource), (item: string, index: number) => {
                this.isRenderingInProgress = true;
                ListItem.create();
                ListItem.height(72);
                ListItem.width('100%');
                let earlierCreatedChild_2: ValueItemView = (this && this.findChildById) ? this.findChildById("2") as ValueItemView : undefined;
                if (earlierCreatedChild_2 == undefined) {
                    View.create(new ValueItemView("2", this, {
                        index: index,
                        value: item,
                        deleteAction: () => {
                            logger.info(TAG, `item = ${JSON.stringify(item)}`);
                            this.dataSource.deleteData(item, index);
                            this.totalCount = this.dataSource.totalCount();
                            this.hashSet.remove(item);
                        }
                    }));
                }
                else {
                    earlierCreatedChild_2.updateWithValueParams({
                        index: index,
                        value: item,
                        deleteAction: () => {
                            logger.info(TAG, `item = ${JSON.stringify(item)}`);
                            this.dataSource.deleteData(item, index);
                            this.totalCount = this.dataSource.totalCount();
                            this.hashSet.remove(item);
                        }
                    });
                    View.create(earlierCreatedChild_2);
                }
                ListItem.pop();
                this.isRenderingInProgress = false;
            }, (item: string, index: number) => JSON.stringify(item) + index);
            LazyForEach.pop();
            List.pop();
        }
        else {
            If.branchId(1);
        }
        If.pop();
        Column.pop();
    }
}
