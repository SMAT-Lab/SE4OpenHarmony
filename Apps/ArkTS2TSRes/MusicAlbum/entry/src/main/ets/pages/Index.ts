interface Index_Params {
    breakpointSystem?: BreakpointSystem;
    currentBreakpoint?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "Index_" + ++__generate__Id;
}
/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language go
 verning permissions and
 * limitations under the License.
 */
import Header from '../common/Header';
import Player from '../common/Player';
import Content from '../common/Content';
import BreakpointSystem from '../model/MediaData';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.breakpointSystem = new BreakpointSystem();
        this.__currentBreakpoint = AppStorage.SetAndProp('currentBreakpoint', 'sm', this, "currentBreakpoint");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.breakpointSystem !== undefined) {
            this.breakpointSystem = params.breakpointSystem;
        }
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private breakpointSystem: BreakpointSystem;
    private __currentBreakpoint: ObservedPropertyAbstract<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    aboutToAppear() {
        this.breakpointSystem.register();
    }
    aboutToDisappear() {
        this.breakpointSystem.unregister();
    }
    render() {
        Stack.create({ alignContent: Alignment.Bottom });
        Stack.width('100%');
        Stack.backgroundColor(this.currentBreakpoint === 'sm' ? '#e4ecf7' : '#f6f9fc');
        Stack.create({ alignContent: Alignment.Top });
        let earlierCreatedChild_2: Header = (this && this.findChildById) ? this.findChildById("2") as Header : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new Header("2", this, {}));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        let earlierCreatedChild_3: Content = (this && this.findChildById) ? this.findChildById("3") as Content : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new Content("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            View.create(earlierCreatedChild_3);
        }
        Stack.pop();
        let earlierCreatedChild_4: Player = (this && this.findChildById) ? this.findChildById("4") as Player : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new Player("4", this, {}));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({});
            View.create(earlierCreatedChild_4);
        }
        Stack.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
