interface PlainArrayView_Params {
    dataSource?: PlainArrayDataSource;
    totalCount?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PlainArrayView_" + ++__generate__Id;
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
import promptAction from '@ohos.promptAction';
import { EmptyPage } from '@ohos/common';
import { KeyValuePair } from '../model/KeyValuePair';
import { PlainArrayDataSource } from '../components/plainarraycomponents/PlainArrayDataSource';
import { KeyValueItemView } from '../components/KeyValueItemView';
import { Constant } from '../Constant';
const MIN_LENGTH = 0;
const isNaturalNumber = (str: string): boolean => {
    let regExp: RegExp = new RegExp('^\\d+$');
    return regExp.test(str);
};
export class PlainArrayView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__dataSource = new ObservedPropertyObject(new PlainArrayDataSource(), this, "dataSource");
        this.__totalCount = new ObservedPropertySimple(MIN_LENGTH, this, "totalCount");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PlainArrayView_Params) {
        if (params.dataSource !== undefined) {
            this.dataSource = params.dataSource;
        }
        if (params.totalCount !== undefined) {
            this.totalCount = params.totalCount;
        }
    }
    aboutToBeDeleted() {
        this.__dataSource.aboutToBeDeleted();
        this.__totalCount.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __dataSource: ObservedPropertyObject<PlainArrayDataSource>;
    get dataSource() {
        return this.__dataSource.get();
    }
    set dataSource(newValue: PlainArrayDataSource) {
        this.__dataSource.set(newValue);
    }
    private __totalCount: ObservedPropertySimple<number>;
    get totalCount() {
        return this.__totalCount.get();
    }
    set totalCount(newValue: number) {
        this.__totalCount.set(newValue);
    }
    aboutToAppear() {
        emitter.on({ eventId: Constant.EMITTER_ID_PLAIN_ARRAY }, (eventData) => {
            let data = eventData.data as KeyValuePair;
            if (isNaturalNumber(data.key)) {
                this.dataSource.addData(eventData.data as KeyValuePair);
                this.totalCount = this.dataSource.totalCount();
            }
            else {
                promptAction.showToast({ message: $r('app.string.key_limit') });
            }
        });
    }
    aboutToDisappear() {
        emitter.off(Constant.EMITTER_ID_PLAIN_ARRAY);
    }
    render() {
        Column.create();
        Column.backgroundColor($r('sys.color.ohos_id_color_sub_background'));
        If.create();
        if (this.totalCount > MIN_LENGTH) {
            If.branchId(0);
            List.create();
            List.width('100%');
            List.layoutWeight(1);
            LazyForEach.create("3", this, ObservedObject.GetRawObject(this.dataSource), (item: KeyValuePair, index: number) => {
                this.isRenderingInProgress = true;
                ListItem.create();
                ListItem.height(72);
                ListItem.width('100%');
                ListItem.margin({ bottom: 20 });
                let earlierCreatedChild_2: KeyValueItemView = (this && this.findChildById) ? this.findChildById("2") as KeyValueItemView : undefined;
                if (earlierCreatedChild_2 == undefined) {
                    View.create(new KeyValueItemView("2", this, { index: index, keyValuePair: item, deleteAction: () => {
                            this.dataSource.deleteData(index);
                            this.totalCount = this.dataSource.totalCount();
                        } }));
                }
                else {
                    earlierCreatedChild_2.updateWithValueParams({
                        index: index, keyValuePair: item, deleteAction: () => {
                            this.dataSource.deleteData(index);
                            this.totalCount = this.dataSource.totalCount();
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