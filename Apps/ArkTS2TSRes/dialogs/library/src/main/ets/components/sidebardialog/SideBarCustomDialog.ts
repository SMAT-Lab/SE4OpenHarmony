interface SideBarCustomDialog_Params {
    customComponent?: () => void;
    isShow?: boolean;
    model?: SideBarModel;
    controller?: CustomDialogController;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SideBarCustomDialog_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { SideBarModel } from '../model/SideBarModel';
const TAG = "SideBarCustomDialog";
export class SideBarCustomDialog extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.customComponent = undefined;
        this.__isShow = new ObservedPropertySimple(true, this, "isShow");
        this.__model = new ObservedPropertyObject(new SideBarModel(), this, "model");
        this.controller = undefined;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SideBarCustomDialog_Params) {
        if (params.customComponent !== undefined) {
            this.customComponent = params.customComponent;
        }
        if (params.isShow !== undefined) {
            this.isShow = params.isShow;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    aboutToBeDeleted() {
        this.__isShow.aboutToBeDeleted();
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __customComponent;
    private __isShow: ObservedPropertySimple<boolean>;
    get isShow() {
        return this.__isShow.get();
    }
    set isShow(newValue: boolean) {
        this.__isShow.set(newValue);
    }
    private __model: ObservedPropertyObject<SideBarModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SideBarModel) {
        this.__model.set(newValue);
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    aboutToAppear() {
        this.isShow = this.model.initShow;
        console.log(TAG, "isShow: " + this.isShow);
    }
    render() {
        SideBarContainer.create(SideBarContainerType.Embed);
        SideBarContainer.sideBarPosition(this.model.sideBarPosition ? this.model.sideBarPosition : SideBarPosition.Start);
        SideBarContainer.showControlButton(false);
        SideBarContainer.showSideBar(this.isShow);
        SideBarContainer.minSideBarWidth(this.model.minSideBarWidth ? this.model.minSideBarWidth : '30%');
        SideBarContainer.maxSideBarWidth(this.model.maxSideBarWidth ? this.model.maxSideBarWidth : '100%');
        SideBarContainer.onChange((value: boolean) => {
            this.isShow = value;
            if (!this.isShow) {
                this.controller.close();
            }
            console.info('status:' + value);
        });
        Stack.create();
        If.create();
        if (this.customComponent != undefined) {
            If.branchId(0);
            this.customComponent(this);
        }
        If.pop();
        Stack.pop();
        Stack.create();
        Stack.onClick(() => {
            console.info('onClick isShow: ' + this.isShow);
            this.isShow = false;
        });
        Stack.pop();
        SideBarContainer.pop();
    }
}
