interface SettingsManager_Params {
    result?: string;
    enableAirplane?: boolean;
    doOperation?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SettingsManager_" + ++__generate__Id;
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
import settings from '@ohos.settings';
import { ColumnOperation } from '../components/ColumnOperation';
import { getString } from '@ohos/common';
export class SettingsManager extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__result = new ObservedPropertySimple('', this, "result");
        this.enableAirplane = false;
        this.doOperation = async (index: number) => {
            switch (index) {
                case 0:
                    let uri = settings.getUriSync(settings.display.SCREEN_BRIGHTNESS_STATUS);
                    this.result = `${uri}`;
                    break;
                case 1:
                    try {
                        this.enableAirplane = !this.enableAirplane;
                        settings.enableAirplaneMode(this.enableAirplane, () => {
                            this.result = `${getString($r('app.string.airplane_status'))}${this.enableAirplane}`;
                        });
                    }
                    catch (err) {
                        this.result = `${getString($r('app.string.airplane_status'))}error:${JSON.stringify(err)}`;
                    }
                    break;
                case 2:
                    try {
                        let res = await settings.canShowFloating();
                        this.result = `${getString($r('app.string.show_floating_status'))}${res}`;
                    }
                    catch (err) {
                        this.result = `${getString($r('app.string.show_floating_status'))}error: ${JSON.stringify(err)}`;
                    }
                    break;
                default:
                    break;
            }
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SettingsManager_Params) {
        if (params.result !== undefined) {
            this.result = params.result;
        }
        if (params.enableAirplane !== undefined) {
            this.enableAirplane = params.enableAirplane;
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
    private enableAirplane: boolean;
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
            View.create(new ColumnOperation("2", this, { operationRes: $r('app.strarray.settings_operations'), doOperation: this.doOperation }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                operationRes: $r('app.strarray.settings_operations'), doOperation: this.doOperation
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
