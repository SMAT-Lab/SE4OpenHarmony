interface Util_Params {
    selectedSecondLabel?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Util_" + ++__generate__Id;
}
/*
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
import { LRUCache } from '../components/utilcomponents/LRUCache';
import { Base64Helper } from '../components/utilcomponents/Base64Helper';
import { MenuList } from '@ohos/menuitems';
import { RationalNumber } from '../components/utilcomponents/RationalNumber';
import { ScopeHelper } from '../components/utilcomponents/ScopeHelper';
import { StringCode } from '../components/utilcomponents/StringCode';
import { TypeCheck } from '../components/utilcomponents/TypeCheck';
export class Util extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__selectedSecondLabel = AppStorage.SetAndLink('selectedSecondLabel', '', this, "selectedSecondLabel");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Util_Params) {
    }
    aboutToBeDeleted() {
        this.__selectedSecondLabel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __selectedSecondLabel: ObservedPropertyAbstract<string>;
    get selectedSecondLabel() {
        return this.__selectedSecondLabel.get();
    }
    set selectedSecondLabel(newValue: string) {
        this.__selectedSecondLabel.set(newValue);
    }
    UtilCapabilities(parent = null) {
        If.create();
        if (this.selectedSecondLabel === getString($r('app.string.lru_cache'))) {
            If.branchId(0);
            let earlierCreatedChild_2: LRUCache = ((parent ? parent : this) && (parent ? parent : this).findChildById) ? (parent ? parent : this).findChildById(generateId()) as LRUCache : undefined;
            if (earlierCreatedChild_2 == undefined) {
                View.create(new LRUCache("Util_" + __generate__Id, parent ? parent : this, {}));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({});
                View.create(earlierCreatedChild_2);
            }
        }
        If.pop();
        If.create();
        if (this.selectedSecondLabel === getString($r('app.string.base64'))) {
            If.branchId(0);
            let earlierCreatedChild_3: Base64Helper = ((parent ? parent : this) && (parent ? parent : this).findChildById) ? (parent ? parent : this).findChildById(generateId()) as Base64Helper : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new Base64Helper("Util_" + __generate__Id, parent ? parent : this, {}));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({});
                View.create(earlierCreatedChild_3);
            }
        }
        If.pop();
        If.create();
        if (this.selectedSecondLabel === getString($r('app.string.string_code'))) {
            If.branchId(0);
            let earlierCreatedChild_4: StringCode = ((parent ? parent : this) && (parent ? parent : this).findChildById) ? (parent ? parent : this).findChildById(generateId()) as StringCode : undefined;
            if (earlierCreatedChild_4 == undefined) {
                View.create(new StringCode("Util_" + __generate__Id, parent ? parent : this, {}));
            }
            else {
                earlierCreatedChild_4.updateWithValueParams({});
                View.create(earlierCreatedChild_4);
            }
        }
        If.pop();
        If.create();
        if (this.selectedSecondLabel === getString($r('app.string.rational_number'))) {
            If.branchId(0);
            let earlierCreatedChild_5: RationalNumber = ((parent ? parent : this) && (parent ? parent : this).findChildById) ? (parent ? parent : this).findChildById(generateId()) as RationalNumber : undefined;
            if (earlierCreatedChild_5 == undefined) {
                View.create(new RationalNumber("Util_" + __generate__Id, parent ? parent : this, {}));
            }
            else {
                earlierCreatedChild_5.updateWithValueParams({});
                View.create(earlierCreatedChild_5);
            }
        }
        If.pop();
        If.create();
        if (this.selectedSecondLabel === getString($r('app.string.type_check'))) {
            If.branchId(0);
            let earlierCreatedChild_6: TypeCheck = ((parent ? parent : this) && (parent ? parent : this).findChildById) ? (parent ? parent : this).findChildById(generateId()) as TypeCheck : undefined;
            if (earlierCreatedChild_6 == undefined) {
                View.create(new TypeCheck("Util_" + __generate__Id, parent ? parent : this, {}));
            }
            else {
                earlierCreatedChild_6.updateWithValueParams({});
                View.create(earlierCreatedChild_6);
            }
        }
        If.pop();
        If.create();
        if (this.selectedSecondLabel === getString($r('app.string.scope_helper'))) {
            If.branchId(0);
            let earlierCreatedChild_7: ScopeHelper = ((parent ? parent : this) && (parent ? parent : this).findChildById) ? (parent ? parent : this).findChildById(generateId()) as ScopeHelper : undefined;
            if (earlierCreatedChild_7 == undefined) {
                View.create(new ScopeHelper("Util_" + __generate__Id, parent ? parent : this, {}));
            }
            else {
                earlierCreatedChild_7.updateWithValueParams({});
                View.create(earlierCreatedChild_7);
            }
        }
        If.pop();
    }
    render() {
        Column.create();
        Column.margin({ left: -12, right: -12 });
        MenuList.create({ menuList: $r('app.strarray.util_menu') });
        Column.create();
        Divider.create();
        Divider.strokeWidth('1px');
        Divider.color($r('sys.color.ohos_id_color_list_separator'));
        this.UtilCapabilities(this);
        Column.pop();
        Column.pop();
    }
}
