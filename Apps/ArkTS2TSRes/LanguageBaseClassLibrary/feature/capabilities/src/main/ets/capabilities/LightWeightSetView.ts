interface LightWeightSetView_Params {
    totalCount?: number;
    lightWeightSet?: LightWeightSet<string>;
    dataSource?: LightWeightSetDataSource;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "LightWeightSetView_" + ++__generate__Id;
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
import LightWeightSet from '@ohos.util.LightWeightSet';
import emitter from '@ohos.events.emitter';
import { EmptyPage, logger } from '@ohos/common';
import { ValueItemView } from '../components/ValueItemView';
import { LightWeightSetDataSource } from '../components/lightweightsetcomponents/LightWeightSetDataSource';
import { Constant } from '../Constant';
const TAG = 'LightWeightSetView';
export class LightWeightSetView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__totalCount = new ObservedPropertySimple(0, this, "totalCount");
        this.__lightWeightSet = new ObservedPropertyObject(new LightWeightSet(), this, "lightWeightSet");
        this.dataSource = new LightWeightSetDataSource();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: LightWeightSetView_Params) {
        if (params.totalCount !== undefined) {
            this.totalCount = params.totalCount;
        }
        if (params.lightWeightSet !== undefined) {
            this.lightWeightSet = params.lightWeightSet;
        }
        if (params.dataSource !== undefined) {
            this.dataSource = params.dataSource;
        }
    }
    aboutToBeDeleted() {
        this.__totalCount.aboutToBeDeleted();
        this.__lightWeightSet.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __totalCount: ObservedPropertySimple<number>;
    get totalCount() {
        return this.__totalCount.get();
    }
    set totalCount(newValue: number) {
        this.__totalCount.set(newValue);
    }
    private __lightWeightSet: ObservedPropertyObject<LightWeightSet<string>>;
    get lightWeightSet() {
        return this.__lightWeightSet.get();
    }
    set lightWeightSet(newValue: LightWeightSet<string>) {
        this.__lightWeightSet.set(newValue);
    }
    private dataSource: LightWeightSetDataSource;
    aboutToAppear() {
        emitter.on({ eventId: Constant.EMITTER_ID_LIGHT_WEIGHT_SET }, (eventData: emitter.EventData) => {
            if (eventData.data === undefined) {
                return;
            }
            let item: string = eventData.data.value;
            this.dataSource.addData(item);
            this.lightWeightSet.add(item);
            this.totalCount = this.dataSource.totalCount();
        });
    }
    aboutToDisappear() {
        emitter.off(Constant.EMITTER_ID_LIGHT_WEIGHT_SET);
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
                            this.lightWeightSet.remove(item);
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
                            this.lightWeightSet.remove(item);
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
