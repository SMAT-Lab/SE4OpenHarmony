interface Index_Params {
    operations?: Array<string>;
    context?: common.UIAbilityContext;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
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
import router from '@ohos.router';
import common from '@ohos.app.ability.common';
import TitleBar from '../component/TitleBar';
import OperationView from '../component/OperationView';
import ResourceUtil from '../util/ResourceUtil';
const TAG: string = 'Index';
const operationUrls: Array<string> = ['pages/Calendar', 'pages/TextProcessing'];
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__operations = new ObservedPropertyObject([], this, "operations");
        this.context = getContext(this) as common.UIAbilityContext;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.operations !== undefined) {
            this.operations = params.operations;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
    }
    aboutToBeDeleted() {
        this.__operations.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __operations: ObservedPropertyObject<Array<string>>;
    get operations() {
        return this.__operations.get();
    }
    set operations(newValue: Array<string>) {
        this.__operations.set(newValue);
    }
    private context: common.UIAbilityContext;
    aboutToAppear() {
        this.getOperation();
    }
    async getOperation() {
        this.operations = await ResourceUtil.getStringArray($r('app.strarray.operation_arr').id, this.context);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor($r('app.color.background'));
        let earlierCreatedChild_2: TitleBar = (this && this.findChildById) ? this.findChildById("2") as TitleBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new TitleBar("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        ForEach.create("4", this, ObservedObject.GetRawObject(this.operations), (item: string, index) => {
            Row.create();
            __Common__.create();
            __Common__.id(`operationView_${index}`);
            __Common__.margin({ left: 12, right: 12, top: 12 });
            let earlierCreatedChild_3: OperationView = (this && this.findChildById) ? this.findChildById("3") as OperationView : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new OperationView("3", this, { operationKey: item, handleClick: () => {
                        router.pushUrl({
                            url: operationUrls[index]
                        });
                    }
                }));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({
                    operationKey: item, handleClick: () => {
                        router.pushUrl({
                            url: operationUrls[index]
                        });
                    }
                });
                if (!earlierCreatedChild_3.needsUpdate()) {
                    earlierCreatedChild_3.markStatic();
                }
                View.create(earlierCreatedChild_3);
            }
            __Common__.pop();
            Row.pop();
        }, (item: string) => item);
        ForEach.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
