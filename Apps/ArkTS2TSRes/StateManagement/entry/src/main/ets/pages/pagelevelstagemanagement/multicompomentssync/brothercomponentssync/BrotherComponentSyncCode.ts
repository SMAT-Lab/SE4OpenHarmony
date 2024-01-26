interface BrotherComponentSyncCode_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "BrotherComponentSyncCode_" + ++__generate__Id;
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
import { ProvideFatherComponent } from './ProvideFatherComponent';
import { StateFatherComponent } from './StateFatherComponent';
export class BrotherComponentSyncCode extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: BrotherComponentSyncCode_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Column.create();
        Text.create($r('app.string.realize_by_state_link'));
        Text.fontSize($r('app.float.tips_font_size'));
        Text.width('100%');
        Text.textAlign(TextAlign.Start);
        Text.pop();
        let earlierCreatedChild_2: StateFatherComponent = (this && this.findChildById) ? this.findChildById("2") as StateFatherComponent : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 共同父组件@State
            View.create(new StateFatherComponent("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        Column.pop();
        Column.create();
        Column.margin({ top: 10 });
        Text.create($r('app.string.realize_by_provide_consume'));
        Text.fontSize($r('app.float.tips_font_size'));
        Text.width('100%');
        Text.textAlign(TextAlign.Start);
        Text.pop();
        let earlierCreatedChild_3: ProvideFatherComponent = (this && this.findChildById) ? this.findChildById("3") as ProvideFatherComponent : undefined;
        if (earlierCreatedChild_3 == undefined) {
            // 共同父组件@Provide
            View.create(new ProvideFatherComponent("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
        Column.pop();
    }
}
