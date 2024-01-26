interface PowerManager_Params {
    result?: string;
    doOperation?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PowerManager_" + ++__generate__Id;
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
import { ColumnOperation } from '../components/ColumnOperation';
import { getString } from '@ohos/common';
import { PowerManagerUtil } from '../util/PowerManagerUtil';
export class PowerManager extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__result = new ObservedPropertySimple('', this, "result");
        this.doOperation = async (index: number) => {
            switch (index) {
                case 0:
                    try {
                        let isActive = PowerManagerUtil.isActive();
                        this.result = `${getString($r('app.string.screen_state'))}${isActive}`;
                    }
                    catch (err) {
                        this.result = `isActive fail:${err}`;
                    }
                    break;
                case 1:
                    try {
                        let modeName = await PowerManagerUtil.getPowerModeName();
                        this.result = `${getString($r('app.string.power_mode'))}${modeName}`;
                    }
                    catch (err) {
                        this.result = `getPowerModeName fail:${err}`;
                    }
                    break;
                default:
                    break;
            }
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PowerManager_Params) {
        if (params.result !== undefined) {
            this.result = params.result;
        }
        if (params.doOperation !== undefined) {
            this.doOperation = params.doOperation;
        }
    }
    aboutToBeDeleted() {
        this.__result.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __result: ObservedPropertySimple<string>;
    get result() {
        return this.__result.get();
    }
    set result(newValue: string) {
        this.__result.set(newValue);
    }
    render() {
        Scroll.create();
        Scroll.scrollBar(BarState.Off);
        Column.create();
        Column.width('100%');
        Column.padding(4);
        Row.create();
        Row.alignItems(VerticalAlign.Top);
        Row.width('100%');
        Row.backgroundColor($r("app.color.white"));
        Row.height(160);
        Row.padding(16);
        Row.borderRadius(20);
        Row.margin({ top: 16 });
        Text.create(this.result);
        Text.fontWeight(FontWeight.Medium);
        Text.fontSize(20);
        Text.pop();
        Row.pop();
        let earlierCreatedChild_2: ColumnOperation = (this && this.findChildById) ? this.findChildById("2") as ColumnOperation : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new ColumnOperation("2", this, { operationRes: $r('app.strarray.power_operations'), doOperation: this.doOperation }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                operationRes: $r('app.strarray.power_operations'), doOperation: this.doOperation
            });
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        Column.pop();
        Scroll.pop();
    }
    private doOperation;
}
