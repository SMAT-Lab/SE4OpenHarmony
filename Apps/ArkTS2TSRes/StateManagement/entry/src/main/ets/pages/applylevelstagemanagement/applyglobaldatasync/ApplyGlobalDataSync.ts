interface ApplyGlobalDataSync_Params {
    title?: Resource;
    currentModelStatus?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ApplyGlobalDataSync_" + ++__generate__Id;
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
import ApplyGlobalDataSyncCode from './ApplyGlobalDataSyncCode';
import { CodeView } from '../../../commoncomponents/CodeView';
import { TitleBarDark } from '../../../commoncomponents/TitleBarDark';
import { TitleBar } from '../../../commoncomponents/TitleBar';
class ApplyGlobalDataSync extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__title = new ObservedPropertyObject($r('app.string.application_storage_ui'), this, "title");
        this.__currentModelStatus = AppStorage.SetAndLink('currentModelStatus', true, this, "currentModelStatus");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ApplyGlobalDataSync_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        this.__currentModelStatus.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __title: ObservedPropertyObject<Resource>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: Resource) {
        this.__title.set(newValue);
    }
    // 当前夜间模式的状态
    private __currentModelStatus: ObservedPropertyAbstract<boolean>;
    get currentModelStatus() {
        return this.__currentModelStatus.get();
    }
    set currentModelStatus(newValue: boolean) {
        this.__currentModelStatus.set(newValue);
    }
    render() {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor(this.currentModelStatus ? $r('app.color.nightnode_color') : $r('app.color.background_shallow_grey'));
        If.create();
        // 展示不同模式状态下的标题
        if (this.currentModelStatus) {
            If.branchId(0);
            let earlierCreatedChild_2: TitleBarDark = (this && this.findChildById) ? this.findChildById("2") as TitleBarDark : undefined;
            if (earlierCreatedChild_2 == undefined) {
                View.create(new TitleBarDark("2", this, { title: this.__title }));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({});
                View.create(earlierCreatedChild_2);
            }
        }
        else {
            If.branchId(1);
            let earlierCreatedChild_3: TitleBar = (this && this.findChildById) ? this.findChildById("3") as TitleBar : undefined;
            if (earlierCreatedChild_3 == undefined) {
                View.create(new TitleBar("3", this, { title: this.__title }));
            }
            else {
                earlierCreatedChild_3.updateWithValueParams({});
                View.create(earlierCreatedChild_3);
            }
        }
        If.pop();
        let earlierCreatedChild_5: CodeView = (this && this.findChildById) ? this.findChildById("5") as CodeView : undefined;
        if (earlierCreatedChild_5 == undefined) {
            View.create(new CodeView("5", this, {
                title: this.__title, isShowTitle: false,
                contentView: () => {
                    let earlierCreatedChild_4: ApplyGlobalDataSyncCode = (this && this.findChildById) ? this.findChildById("4") as ApplyGlobalDataSyncCode : undefined;
                    if (earlierCreatedChild_4 == undefined) {
                        View.create(new ApplyGlobalDataSyncCode("4", this, {}));
                    }
                    else {
                        earlierCreatedChild_4.updateWithValueParams({});
                        View.create(earlierCreatedChild_4);
                    }
                }
            }));
        }
        else {
            earlierCreatedChild_5.updateWithValueParams({
                isShowTitle: false,
                contentView: () => {
                    let earlierCreatedChild_4: ApplyGlobalDataSyncCode = (this && this.findChildById) ? this.findChildById("4") as ApplyGlobalDataSyncCode : undefined;
                    if (earlierCreatedChild_4 == undefined) {
                        View.create(new ApplyGlobalDataSyncCode("4", this, {}));
                    }
                    else {
                        earlierCreatedChild_4.updateWithValueParams({});
                        View.create(earlierCreatedChild_4);
                    }
                }
            });
            View.create(earlierCreatedChild_5);
        }
        Column.pop();
    }
    aboutToDisappear(): void {
        AppStorage.setOrCreate('sideBarShow', false);
    }
}
loadDocument(new ApplyGlobalDataSync("1", undefined, {}));
