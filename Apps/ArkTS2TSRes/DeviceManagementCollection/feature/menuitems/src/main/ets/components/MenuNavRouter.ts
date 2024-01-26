interface MenuNavRouter_Params {
    selectedLabel?: string;
    navDestination?: () => void;
    childList?: Array<string>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MenuNavRouter_" + ++__generate__Id;
}
/**
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
import { ItemGroup } from './ItemGroup';
import { logger } from '@ohos/common';
import { MainItem } from './MainItem';
const TAG: string = 'MenuNavRouter';
export class MenuNavRouter extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__selectedLabel = AppStorage.SetAndLink('selectedLabel', '', this, "selectedLabel");
        this.navDestination = undefined;
        this.childList = [];
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MenuNavRouter_Params) {
        if (params.navDestination !== undefined) {
            this.navDestination = params.navDestination;
        }
        if (params.childList !== undefined) {
            this.childList = params.childList;
        }
    }
    aboutToBeDeleted() {
        this.__selectedLabel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __selectedLabel: ObservedPropertyAbstract<string>;
    get selectedLabel() {
        return this.__selectedLabel.get();
    }
    set selectedLabel(newValue: string) {
        this.__selectedLabel.set(newValue);
    }
    private __navDestination;
    private childList: Array<string>;
    CustomDivider(parent = null) {
        Divider.create();
        Divider.strokeWidth('1px');
        Divider.color($r("app.color.divider"));
        Divider.margin({ left: 16, right: 16 });
    }
    render() {
        let earlierCreatedChild_4: ItemGroup = (this && this.findChildById) ? this.findChildById("4") as ItemGroup : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new ItemGroup("4", this, {
                noParam: () => {
                    Column.create();
                    ForEach.create("3", this, ObservedObject.GetRawObject(this.childList), (item: string, index: number) => {
                        If.create();
                        if (index > 0) {
                            If.branchId(0);
                            this.CustomDivider(this);
                        }
                        If.pop();
                        NavRouter.create();
                        NavRouter.onStateChange((isActivated: boolean) => {
                            if (isActivated) {
                                this.selectedLabel = item;
                                logger.info(TAG, `NavRouter isActivated= ${isActivated}, selectedLabel=${item}`);
                            }
                        });
                        let earlierCreatedChild_2: MainItem = (this && this.findChildById) ? this.findChildById("2") as MainItem : undefined;
                        if (earlierCreatedChild_2 == undefined) {
                            View.create(new MainItem("2", this, {
                                title: item
                            }));
                        }
                        else {
                            earlierCreatedChild_2.updateWithValueParams({
                                title: item
                            });
                            View.create(earlierCreatedChild_2);
                        }
                        NavDestination.create();
                        NavDestination.title(item);
                        NavDestination.backgroundColor($r('sys.color.ohos_id_color_sub_background'));
                        Column.create();
                        this.navDestination(this);
                        Column.pop();
                        NavDestination.pop();
                        NavRouter.pop();
                    }, (item: string) => JSON.stringify(item));
                    ForEach.pop();
                    Column.pop();
                }
            }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                noParam: () => {
                    Column.create();
                    ForEach.create("3", this, ObservedObject.GetRawObject(this.childList), (item: string, index: number) => {
                        If.create();
                        if (index > 0) {
                            If.branchId(0);
                            this.CustomDivider(this);
                        }
                        If.pop();
                        NavRouter.create();
                        NavRouter.onStateChange((isActivated: boolean) => {
                            if (isActivated) {
                                this.selectedLabel = item;
                                logger.info(TAG, `NavRouter isActivated= ${isActivated}, selectedLabel=${item}`);
                            }
                        });
                        let earlierCreatedChild_2: MainItem = (this && this.findChildById) ? this.findChildById("2") as MainItem : undefined;
                        if (earlierCreatedChild_2 == undefined) {
                            View.create(new MainItem("2", this, {
                                title: item
                            }));
                        }
                        else {
                            earlierCreatedChild_2.updateWithValueParams({
                                title: item
                            });
                            View.create(earlierCreatedChild_2);
                        }
                        NavDestination.create();
                        NavDestination.title(item);
                        NavDestination.backgroundColor($r('sys.color.ohos_id_color_sub_background'));
                        Column.create();
                        this.navDestination(this);
                        Column.pop();
                        NavDestination.pop();
                        NavRouter.pop();
                    }, (item: string) => JSON.stringify(item));
                    ForEach.pop();
                    Column.pop();
                }
            });
            View.create(earlierCreatedChild_4);
        }
    }
}
