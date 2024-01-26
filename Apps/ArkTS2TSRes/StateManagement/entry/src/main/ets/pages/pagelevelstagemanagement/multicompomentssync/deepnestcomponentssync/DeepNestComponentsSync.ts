interface DeepNestComponentsSync_Params {
    title?: Resource;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "DeepNestComponentsSync_" + ++__generate__Id;
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
import { CodeView } from '../../../../commoncomponents/CodeView';
import { DeepNestComponentsSyncCode } from './DeepNestComponentsSyncCode';
class DeepNestComponentsSync extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__title = new ObservedPropertyObject($r('app.string.parent_descendent_sync'), this, "title");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DeepNestComponentsSync_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __title: ObservedPropertyObject<Resource>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: Resource) {
        this.__title.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.padding($r('app.float.page_padding'));
        Column.backgroundColor($r('app.color.background_shallow_grey'));
        let earlierCreatedChild_3: CodeView = (this && this.findChildById) ? this.findChildById("3") as CodeView : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new CodeView("3", this, {
                title: this.__title,
                contentView: () => {
                    let earlierCreatedChild_2: DeepNestComponentsSyncCode = (this && this.findChildById) ? this.findChildById("2") as DeepNestComponentsSyncCode : undefined;
                    if (earlierCreatedChild_2 == undefined) {
                        View.create(new DeepNestComponentsSyncCode("2", this, {}));
                    }
                    else {
                        earlierCreatedChild_2.updateWithValueParams({});
                        if (!earlierCreatedChild_2.needsUpdate()) {
                            earlierCreatedChild_2.markStatic();
                        }
                        View.create(earlierCreatedChild_2);
                    }
                }
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                contentView: () => {
                    let earlierCreatedChild_2: DeepNestComponentsSyncCode = (this && this.findChildById) ? this.findChildById("2") as DeepNestComponentsSyncCode : undefined;
                    if (earlierCreatedChild_2 == undefined) {
                        View.create(new DeepNestComponentsSyncCode("2", this, {}));
                    }
                    else {
                        earlierCreatedChild_2.updateWithValueParams({});
                        if (!earlierCreatedChild_2.needsUpdate()) {
                            earlierCreatedChild_2.markStatic();
                        }
                        View.create(earlierCreatedChild_2);
                    }
                }
            });
            View.create(earlierCreatedChild_3);
        }
        Column.pop();
    }
    aboutToDisappear(): void {
        AppStorage.setOrCreate('sideBarShow', false);
    }
}
loadDocument(new DeepNestComponentsSync("1", undefined, {}));
