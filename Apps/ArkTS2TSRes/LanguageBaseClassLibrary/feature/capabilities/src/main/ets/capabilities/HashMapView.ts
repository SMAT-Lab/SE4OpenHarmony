interface HashMapView_Params {
    totalCount?: number;
    hashMap?: HashMap<string, string>;
    dataSource?: HashMapDataSource;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "HashMapView_" + ++__generate__Id;
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
import HashMap from '@ohos.util.HashMap';
import emitter from '@ohos.events.emitter';
import { EmptyPage, logger } from '@ohos/common';
import { KeyValueItemView } from '../components/KeyValueItemView';
import { KeyValuePair } from '../model/KeyValuePair';
import { HashMapDataSource } from '../components/hashmapcomponents/HashMapDataSource';
import { Constant } from '../Constant';
const TAG = 'HashMapView';
export class HashMapView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__totalCount = new ObservedPropertySimple(0, this, "totalCount");
        this.hashMap = new HashMap();
        this.__dataSource = new ObservedPropertyObject(new HashMapDataSource(), this, "dataSource");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: HashMapView_Params) {
        if (params.totalCount !== undefined) {
            this.totalCount = params.totalCount;
        }
        if (params.hashMap !== undefined) {
            this.hashMap = params.hashMap;
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
    private hashMap: HashMap<string, string>;
    private __dataSource: ObservedPropertyObject<HashMapDataSource>;
    get dataSource() {
        return this.__dataSource.get();
    }
    set dataSource(newValue: HashMapDataSource) {
        this.__dataSource.set(newValue);
    }
    aboutToAppear() {
        emitter.on({ eventId: Constant.EMITTER_ID_HASH_MAP }, (eventData) => {
            let item: KeyValuePair = eventData.data as KeyValuePair;
            this.dataSource.addData(item);
            this.totalCount = this.dataSource.totalCount();
            this.hashMap.set(item.key, item.value);
        });
    }
    aboutToDisappear() {
        emitter.off(Constant.EMITTER_ID_HASH_MAP);
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
            LazyForEach.create("3", this, ObservedObject.GetRawObject(this.dataSource), (item: KeyValuePair, index: number) => {
                this.isRenderingInProgress = true;
                ListItem.create();
                ListItem.height(72);
                ListItem.width('100%');
                let earlierCreatedChild_2: KeyValueItemView = (this && this.findChildById) ? this.findChildById("2") as KeyValueItemView : undefined;
                if (earlierCreatedChild_2 == undefined) {
                    View.create(new KeyValueItemView("2", this, {
                        index: index,
                        keyValuePair: item,
                        deleteAction: () => {
                            logger.info(TAG, `item = ${JSON.stringify(item)}`);
                            this.dataSource.deleteData(item, index);
                            this.totalCount = this.dataSource.totalCount();
                            this.hashMap.remove(item.key);
                        }
                    }));
                }
                else {
                    earlierCreatedChild_2.updateWithValueParams({
                        index: index,
                        keyValuePair: item,
                        deleteAction: () => {
                            logger.info(TAG, `item = ${JSON.stringify(item)}`);
                            this.dataSource.deleteData(item, index);
                            this.totalCount = this.dataSource.totalCount();
                            this.hashMap.remove(item.key);
                        }
                    });
                    View.create(earlierCreatedChild_2);
                }
                ListItem.pop();
                this.isRenderingInProgress = false;
            }, (item: KeyValuePair, index: number) => JSON.stringify(item) + index);
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
