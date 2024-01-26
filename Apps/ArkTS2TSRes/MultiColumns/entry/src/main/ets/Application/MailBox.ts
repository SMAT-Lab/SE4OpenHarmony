interface MailBox_Params {
    currentBreakPoint?: string;
    isFold?: boolean;
    sideBarWidth?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MailBox_" + ++__generate__Id;
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
import { BreakpointType } from '../common/BreakpointSystem';
import { MailNavigation } from '../common/MailNavigation';
import { MailSideBar } from '../common/MailSideBar';
let storage = LocalStorage.GetShared();
class MailBox extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__isFold = new ObservedPropertySimple(false, this, "isFold");
        this.__sideBarWidth = new ObservedPropertySimple(304, this, "sideBarWidth");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MailBox_Params) {
        if (params.isFold !== undefined) {
            this.isFold = params.isFold;
        }
        if (params.sideBarWidth !== undefined) {
            this.sideBarWidth = params.sideBarWidth;
        }
    }
    aboutToBeDeleted() {
        this.__currentBreakPoint.aboutToBeDeleted();
        this.__isFold.aboutToBeDeleted();
        this.__sideBarWidth.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __currentBreakPoint: ObservedPropertyAbstract<string> = this.localStorage_.setAndLink<string>('currentBreakPoint', 'md', this, "currentBreakPoint");
    get currentBreakPoint() {
        return this.__currentBreakPoint.get();
    }
    set currentBreakPoint(newValue: string) {
        this.__currentBreakPoint.set(newValue);
    }
    private __isFold: ObservedPropertySimple<boolean>;
    get isFold() {
        return this.__isFold.get();
    }
    set isFold(newValue: boolean) {
        this.__isFold.set(newValue);
    }
    private __sideBarWidth: ObservedPropertySimple<number>;
    get sideBarWidth() {
        return this.__sideBarWidth.get();
    }
    set sideBarWidth(newValue: number) {
        this.__sideBarWidth.set(newValue);
    }
    render() {
        GridRow.create();
        GridRow.onBreakpointChange((breakpoint: string) => {
            this.currentBreakPoint = breakpoint;
        });
        GridCol.create({ span: { sm: 12, md: 12, lg: 12 } });
        SideBarContainer.create(SideBarContainerType.AUTO);
        SideBarContainer.sideBarWidth(this.sideBarWidth);
        SideBarContainer.minSideBarWidth(240);
        SideBarContainer.minContentWidth(this.currentBreakPoint === 'sm' ? 360 : 600);
        SideBarContainer.controlButton({ left: 24, top: 40, width: 24, height: 24 });
        SideBarContainer.showSideBar(this.currentBreakPoint === 'lg');
        SideBarContainer.onChange((value: boolean) => {
            this.isFold = value;
        });
        // Area A
        Column.create();
        // Area A
        Column.width('100%');
        // Area A
        Column.height('100%');
        // Area A
        Column.backgroundColor('#f1f3f5');
        let earlierCreatedChild_2: MailSideBar = (this && this.findChildById) ? this.findChildById("2") as MailSideBar : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new MailSideBar("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            if (!earlierCreatedChild_2.needsUpdate()) {
                earlierCreatedChild_2.markStatic();
            }
            View.create(earlierCreatedChild_2);
        }
        // Area A
        Column.pop();
        // Area B+C
        Column.create();
        // Area B+C
        Column.height('100%');
        // Area B+C
        Column.width('100%');
        Stack.create();
        let earlierCreatedChild_3: MailNavigation = (this && this.findChildById) ? this.findChildById("3") as MailNavigation : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new MailNavigation("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        If.create();
        if (this.isFold && this.currentBreakPoint !== 'lg') {
            If.branchId(0);
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#33000000');
            Column.pop();
        }
        If.pop();
        Stack.pop();
        // Area B+C
        Column.pop();
        SideBarContainer.pop();
        GridCol.pop();
        GridRow.pop();
    }
}
loadDocument(new MailBox("1", undefined, {}, storage));
