interface DeepNestComponentsSyncCode_Params {
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DeepNestComponentsSyncCode_" + ++__generate__Id;
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
import { StateGrandfatherComponent } from './StateGrandfatherComponent';
import { ProvideGrandfatherComponent } from './ProvideGrandfatherComponent';
export class DeepNestComponentsSyncCode extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DeepNestComponentsSyncCode_Params) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id());
    }
    render() {
        Column.create();
        Column.create();
        Column.margin({ bottom: 16 });
        Text.create($r('app.string.realize_by_state_link'));
        Text.fontSize($r('app.float.tips_font_size'));
        Text.width('100%');
        Text.textAlign(TextAlign.Start);
        Text.pop();
        let earlierCreatedChild_2: StateGrandfatherComponent = (this && this.findChildById) ? this.findChildById("2") as StateGrandfatherComponent : undefined;
        if (earlierCreatedChild_2 == undefined) {
            // 爷组件@State
            View.create(new StateGrandfatherComponent("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        Column.pop();
        Column.create();
        Text.create($r('app.string.realize_by_provide_consume'));
        Text.fontSize($r('app.float.tips_font_size'));
        Text.width('100%');
        Text.textAlign(TextAlign.Start);
        Text.pop();
        let earlierCreatedChild_3: ProvideGrandfatherComponent = (this && this.findChildById) ? this.findChildById("3") as ProvideGrandfatherComponent : undefined;
        if (earlierCreatedChild_3 == undefined) {
            // 爷组件@Provide
            View.create(new ProvideGrandfatherComponent("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
        Column.pop();
    }
}
