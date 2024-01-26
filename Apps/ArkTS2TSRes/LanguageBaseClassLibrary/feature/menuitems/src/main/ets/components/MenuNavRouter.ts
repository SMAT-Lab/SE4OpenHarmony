interface MenuNavRouter_Params {
    selectedLabel?: string;
    selectedSecondLabel?: string;
    navDestination?: () => void;
    childList?: Array<string>;
    addAction?: (title: string) => void;
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
import common from '@ohos.app.ability.common';
import { ItemGroup } from './ItemGroup';
import { getString, logger } from '@ohos/common';
import { MainItem } from './MainItem';
const TAG: string = 'MenuNavRouter';
export class MenuNavRouter extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__selectedLabel = AppStorage.SetAndLink('selectedLabel', '', this, "selectedLabel");
        this.__selectedSecondLabel = AppStorage.SetAndLink('selectedSecondLabel', '', this, "selectedSecondLabel");
        this.navDestination = undefined;
        this.childList = [];
        this.addAction = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MenuNavRouter_Params) {
        if (params.navDestination !== undefined) {
            this.navDestination = params.navDestination;
        }
        if (params.childList !== undefined) {
            this.childList = params.childList;
        }
        if (params.addAction !== undefined) {
            this.addAction = params.addAction;
        }
    }
    aboutToBeDeleted() {
        this.__selectedLabel.aboutToBeDeleted();
        this.__selectedSecondLabel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __selectedLabel: ObservedPropertyAbstract<string>;
    get selectedLabel() {
        return this.__selectedLabel.get();
    }
    set selectedLabel(newValue: string) {
        this.__selectedLabel.set(newValue);
    }
    private __selectedSecondLabel: ObservedPropertyAbstract<string>;
    get selectedSecondLabel() {
        return this.__selectedSecondLabel.get();
    }
    set selectedSecondLabel(newValue: string) {
        this.__selectedSecondLabel.set(newValue);
    }
    private __navDestination;
    private childList: Array<string>;
    private addAction?: (title: string) => void;
    CustomDivider(parent = null) {
        Divider.create();
        Divider.strokeWidth('1px');
        Divider.color($r('sys.color.ohos_id_color_list_separator'));
        Divider.margin({ left: 8, right: 8 });
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
                                this.selectedSecondLabel = item;
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
                        NavDestination.title({ builder: () => {
                                this.CustomTitle.call(this, item);
                            } });
                        NavDestination.backgroundColor($r('sys.color.ohos_id_color_sub_background'));
                        this.navDestination(this);
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
                                this.selectedSecondLabel = item;
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
                        NavDestination.title({ builder: () => {
                                this.CustomTitle.call(this, item);
                            } });
                        NavDestination.backgroundColor($r('sys.color.ohos_id_color_sub_background'));
                        this.navDestination(this);
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
    CustomTitle(title: string, parent = null) {
        Row.create();
        Row.width('85%');
        Row.height(56);
        Row.justifyContent(FlexAlign.SpaceBetween);
        Text.create(title);
        Text.fontColor($r('app.color.black'));
        Text.fontSize(16);
        Text.fontWeight(FontWeight.Bold);
        Text.pop();
        Row.create();
        Row.id('add');
        Row.height('100%');
        Row.aspectRatio(1);
        Row.visibility(this.showAddButton(title) ? Visibility.Visible : Visibility.None);
        Row.onClick(() => {
            logger.info(TAG, 'addAction');
            if (this.addAction) {
                this.addAction(title);
            }
        });
        Image.create($r('app.media.ic_public_add'));
        Image.height(24);
        Image.aspectRatio(1);
        Image.objectFit(ImageFit.Contain);
        Row.pop();
        Row.pop();
    }
    showAddButton(title: string) {
        let ret = false;
        switch (title) {
            case getString($r('app.string.deque')):
            case getString($r('app.string.hash_map')):
            case getString($r('app.string.hash_set')):
            case getString($r('app.string.light_weight_map')):
            case getString($r('app.string.light_weight_set')):
            case getString($r('app.string.linked_list')):
            case getString($r('app.string.list')):
            case getString($r('app.string.array_list')):
            case getString($r('app.string.plain_array')):
            case getString($r('app.string.queue')):
            case getString($r('app.string.stack')):
            case getString($r('app.string.tree_map')):
            case getString($r('app.string.tree_set')):
            case getString($r('app.string.vector')):
                ret = true;
                break;
        }
        return ret;
    }
    getString(resource: Resource) {
        let context = getContext(this) as common.UIAbilityContext;
        let resultStr = context.resourceManager.getStringSync(resource);
        logger.info(TAG, `getString = ${resultStr}`);
        return resultStr;
    }
}
