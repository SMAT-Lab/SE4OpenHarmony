interface Index_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
import { BundleInfo } from '../common/BundleInfo';
import { NavigationBar } from '../common/NavigationBar';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        let earlierCreatedChild_2: NavigationBar = (this && this.findChildById) ? this.findChildById("2") as NavigationBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new NavigationBar("2", this, { title: $r('app.string.entry_MainAbility'), flag: false }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                title: $r('app.string.entry_MainAbility'), flag: false
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: BundleInfo = (this && this.findChildById) ? this.findChildById("3") as BundleInfo : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new BundleInfo("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
