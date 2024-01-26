interface LinkedListView_Params {
    totalCount?: number;
    dataSource?: LinkedListDataSource;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LinkedListView_" + ++__generate__Id;
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
import emitter from '@ohos.events.emitter';
import { EmptyPage, logger } from '@ohos/common';
import { Information } from '../model/Information';
import { InformationItemView } from '../components/InformationItemView';
import { LinkedListDataSource } from '../components/linkedlistcomponents/LinkedListDataSource';
import { Constant } from '../Constant';
const TAG = 'LinkedListView';
export class LinkedListView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__totalCount = new ObservedPropertySimple(0, this, "totalCount");
        this.__dataSource = new ObservedPropertyObject(new LinkedListDataSource(), this, "dataSource");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: LinkedListView_Params) {
        if (params.totalCount !== undefined) {
            this.totalCount = params.totalCount;
        }
        if (params.dataSource !== undefined) {
            this.dataSource = params.dataSource;
        }
    }
    aboutToBeDeleted() {
        this.__totalCount.aboutToBeDeleted();
        this.__dataSource.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __totalCount: ObservedPropertySimple<number>;
    get totalCount() {
        return this.__totalCount.get();
    }
    set totalCount(newValue: number) {
        this.__totalCount.set(newValue);
    }
    private __dataSource: ObservedPropertyObject<LinkedListDataSource>;
    get dataSource() {
        return this.__dataSource.get();
    }
    set dataSource(newValue: LinkedListDataSource) {
        this.__dataSource.set(newValue);
    }
    aboutToAppear() {
        emitter.on({ eventId: Constant.EMITTER_ID_LINKED_LIST }, (eventData) => {
            let item = eventData.data as Information;
            this.dataSource.addData(item);
            this.totalCount = this.dataSource.totalCount();
        });
    }
    aboutToDisappear() {
        emitter.off(Constant.EMITTER_ID_LINKED_LIST);
    }
    render() {
        Column.create();
        Column.backgroundColor($r('sys.color.ohos_id_color_sub_background'));
        If.create();
        if (this.totalCount != 0) {
            If.branchId(0);
            List.create();
            List.width('100%');
            List.height('100%');
            List.padding({ top: 8, left: 12, right: 12 });
            LazyForEach.create("3", this, ObservedObject.GetRawObject(this.dataSource), (item: Information, index: number) => {
                this.isRenderingInProgress = true;
                ListItem.create();
                ListItem.height(72);
                ListItem.width('100%');
                ListItem.margin({ bottom: 20 });
                let earlierCreatedChild_2: InformationItemView = (this && this.findChildById) ? this.findChildById("2") as InformationItemView : undefined;
                if (earlierCreatedChild_2 == undefined) {
                    View.create(new InformationItemView("2", this, {
                        index: index,
                        information: item,
                        deleteAction: () => {
                            logger.info(TAG, `deleteAction: ${JSON.stringify(item)}`);
                            if (index === 0) {
                                this.dataSource.deleteFirst();
                                this.totalCount = this.dataSource.totalCount();
                            }
                            else if (index === this.totalCount - 1) {
                                this.dataSource.deleteLast();
                                this.totalCount = this.dataSource.totalCount();
                            }
                            else {
                                this.dataSource.deleteData(index);
                                this.totalCount = this.dataSource.totalCount();
                            }
                        }
                    }));
                }
                else {
                    earlierCreatedChild_2.updateWithValueParams({
                        index: index,
                        information: item,
                        deleteAction: () => {
                            logger.info(TAG, `deleteAction: ${JSON.stringify(item)}`);
                            if (index === 0) {
                                this.dataSource.deleteFirst();
                                this.totalCount = this.dataSource.totalCount();
                            }
                            else if (index === this.totalCount - 1) {
                                this.dataSource.deleteLast();
                                this.totalCount = this.dataSource.totalCount();
                            }
                            else {
                                this.dataSource.deleteData(index);
                                this.totalCount = this.dataSource.totalCount();
                            }
                        }
                    });
                    View.create(earlierCreatedChild_2);
                }
                ListItem.pop();
                this.isRenderingInProgress = false;
            }, (item: Information, index: number) => JSON.stringify(item) + index);
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
