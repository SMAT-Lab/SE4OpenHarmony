interface Capabilities_Params {
    selectedLabel?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Capabilities_" + ++__generate__Id;
}
/**
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import { getString } from '@ohos/common';
import { ArrayListView, ConvertXml, Url, Util, TaskPool, DequeView, HashMapView, HashSetView, LightWeightMapView, LightWeightSetView, LinkedListView, ListView, PlainArrayView, QueueView, StackView, TreeMapView, TreeSetView, VectorView } from '@ohos/capabilities';
export class Capabilities extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__selectedLabel = AppStorage.SetAndLink('selectedLabel', '', this, "selectedLabel");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Capabilities_Params) {
    }
    aboutToBeDeleted() {
        this.__selectedLabel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __selectedLabel: ObservedPropertyAbstract<string>;
    get selectedLabel() {
        return this.__selectedLabel.get();
    }
    set selectedLabel(newValue: string) {
        this.__selectedLabel.set(newValue);
    }
    render() {
        Column.create();
        Divider.create();
        Divider.strokeWidth('1px');
        Divider.color($r('sys.color.ohos_id_color_list_separator'));
        Column.create();
        Column.padding({ left: 12, right: 12 });
        If.create();
        // 此处根据选中的菜单，显示对应的页面内容
        if (this.selectedLabel === getString($r('app.string.xml'))) {
            If.branchId(0);
        }
        If.pop();
        If.create();
        if (this.selectedLabel === getString($r('app.string.util'))) {
            If.branchId(0);
        }
        If.pop();
        If.create();
        if (this.selectedLabel === getString($r('app.string.url'))) {
            If.branchId(0);
        }
        If.pop();
        If.create();
        if (this.selectedLabel === getString($r('app.string.array_list'))) {
            If.branchId(0);
        }
        If.pop();
        If.create();
        if (this.selectedLabel === getString($r('app.string.task_pool'))) {
            If.branchId(0);
        }
        If.pop();
        If.create();
        if (this.selectedLabel === getString($r('app.string.deque'))) {
            If.branchId(0);
        }
        If.pop();
        If.create();
        if (this.selectedLabel === getString($r('app.string.hash_map'))) {
            If.branchId(0);
        }
        If.pop();
        If.create();
        if (this.selectedLabel === getString($r('app.string.hash_set'))) {
            If.branchId(0);
        }
        If.pop();
        If.create();
        if (this.selectedLabel === getString($r('app.string.light_weight_map'))) {
            If.branchId(0);
        }
        If.pop();
        If.create();
        if (this.selectedLabel === getString($r('app.string.light_weight_set'))) {
            If.branchId(0);
        }
        If.pop();
        If.create();
        if (this.selectedLabel === getString($r('app.string.linked_list'))) {
            If.branchId(0);
        }
        If.pop();
        If.create();
        if (this.selectedLabel === getString($r('app.string.list'))) {
            If.branchId(0);
        }
        If.pop();
        If.create();
        if (this.selectedLabel === getString($r('app.string.plain_array'))) {
            If.branchId(0);
        }
        If.pop();
        If.create();
        if (this.selectedLabel === getString($r('app.string.queue'))) {
            If.branchId(0);
        }
        If.pop();
        If.create();
        if (this.selectedLabel === getString($r('app.string.stack'))) {
            If.branchId(0);
        }
        If.pop();
        If.create();
        if (this.selectedLabel === getString($r('app.string.tree_map'))) {
            If.branchId(0);
        }
        If.pop();
        If.create();
        if (this.selectedLabel === getString($r('app.string.tree_set'))) {
            If.branchId(0);
        }
        If.pop();
        If.create();
        if (this.selectedLabel === getString($r('app.string.vector'))) {
            If.branchId(0);
        }
        If.pop();
        Column.pop();
        Column.pop();
    }
}
