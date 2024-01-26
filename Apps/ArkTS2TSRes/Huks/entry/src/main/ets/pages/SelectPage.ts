interface SelectPage_Params {
    Params?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SelectPage_" + ++__generate__Id;
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
import router from '@ohos.router';
import { NewKey } from '../common/NewKey';
import { OldKey } from '../common/OldKey';
import { MinAccessControl } from '../common/MinAccessControl';
import { Flag } from '../pages/Index';
class SelectPage extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__Params = new ObservedPropertySimple(Flag.value, this, "Params");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SelectPage_Params) {
        if (params.Params !== undefined) {
            this.Params = params.Params;
        }
    }
    aboutToBeDeleted() {
        this.__Params.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __Params: ObservedPropertySimple<number>;
    get Params() {
        return this.__Params.get();
    }
    set Params(newValue: number) {
        this.__Params.set(newValue);
    }
    NavigationTitle(parent = null) {
        Column.create();
        Column.alignItems(HorizontalAlign.Start);
        Column.pop();
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor('#F1F1F1');
        Navigation.create();
        Navigation.title({ builder: this.NavigationTitle.bind(this), height: 56 });
        Navigation.titleMode(NavigationTitleMode.Mini);
        Navigation.hideTitleBar(false);
        Navigation.hideToolBar(true);
        If.create();
        if (this.Params === 1) {
            If.branchId(0);
            let earlierCreatedChild_2: NewKey = (this && this.findChildById) ? this.findChildById("2") as NewKey : undefined;
            if (earlierCreatedChild_2 == undefined) {
                View.create(new NewKey("2", this, {}));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({});
                View.create(earlierCreatedChild_2);
            }
        }
        else if (this.Params === 2) {
            If.branchId(1);
            let earlierCreatedChild_3: OldKey = (this && this.findChildById) ? this.findChildById("3") as OldKey : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new OldKey("3", this, {}));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({});
                View.create(earlierCreatedChild_3);
            }
        }
        else {
            If.branchId(2);
            let earlierCreatedChild_4: MinAccessControl = (this && this.findChildById) ? this.findChildById("4") as MinAccessControl : undefined;
            if (earlierCreatedChild_4 == undefined) {
                View.create(new MinAccessControl("4", this, {}));
            }
            else {
                earlierCreatedChild_4.updateWithValueParams({});
                View.create(earlierCreatedChild_4);
            }
        }
        If.pop();
        Navigation.pop();
        Column.pop();
    }
}
loadDocument(new SelectPage("1", undefined, {}));
