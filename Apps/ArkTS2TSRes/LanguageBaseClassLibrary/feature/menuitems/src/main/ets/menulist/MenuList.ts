interface MenuList_Params {
    menuListData?: Array<string>;
    childNavDestination?: () => void;
    menuList?: Resource | undefined;
    addAction?: (title: string) => void;
    getData?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MenuList_" + ++__generate__Id;
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
import { getStringArray } from '@ohos/common';
import { MenuNavRouter } from '../components/MenuNavRouter';
export class MenuList extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__menuListData = new ObservedPropertyObject([], this, "menuListData");
        this.childNavDestination = undefined;
        this.menuList = undefined;
        this.addAction = undefined;
        this.getData = async () => {
            if (this.menuList) {
                this.menuListData = await getStringArray(this.menuList);
            }
        };
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MenuList_Params) {
        if (params.menuListData !== undefined) {
            this.menuListData = params.menuListData;
        }
        if (params.childNavDestination !== undefined) {
            this.childNavDestination = params.childNavDestination;
        }
        if (params.menuList !== undefined) {
            this.menuList = params.menuList;
        }
        if (params.addAction !== undefined) {
            this.addAction = params.addAction;
        }
        if (params.getData !== undefined) {
            this.getData = params.getData;
        }
    }
    aboutToBeDeleted() {
        this.__menuListData.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __menuListData: ObservedPropertyObject<Array<string>>;
    get menuListData() {
        return this.__menuListData.get();
    }
    set menuListData(newValue: Array<string>) {
        this.__menuListData.set(newValue);
    }
    private __childNavDestination;
    private menuList: Resource | undefined;
    private addAction?: (title: string) => void;
    render() {
        List.create({ space: 12 });
        List.id('menu_list');
        List.width('100%');
        List.padding({ left: 12, right: 12 });
        List.margin({ top: 12 });
        List.backgroundColor($r('sys.color.ohos_id_color_sub_background'));
        List.scrollBar(BarState.Off);
        ListItem.create();
        If.create();
        if (this.menuListData.length > 0) {
            If.branchId(0);
            let earlierCreatedChild_2: MenuNavRouter = (this && this.findChildById) ? this.findChildById("2") as MenuNavRouter : undefined;
            if (earlierCreatedChild_2 == undefined) {
                View.create(new MenuNavRouter("2", this, {
                    childList: this.menuListData, addAction: this.addAction,
                    navDestination: () => {
                        this.childNavDestination(this);
                    }
                }));
            }
            else {
                earlierCreatedChild_2.updateWithValueParams({
                    childList: this.menuListData, addAction: this.addAction,
                    navDestination: () => {
                        this.childNavDestination(this);
                    }
                });
                View.create(earlierCreatedChild_2);
            }
        }
        If.pop();
        ListItem.pop();
        List.pop();
    }
    aboutToAppear() {
        this.getData();
    }
    private getData;
}
