interface PhoenixBottomRefresh_Params {
    model?: SmartRefreshForTaurus.Model;
    angle?: number;
    refresh?: boolean;
    mYCenter?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "PhoenixBottomRefresh_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import SmartRefreshForTaurus from "../topRefresh/SmartRefreshForTaurus";
export class PhoenixBottomRefresh extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new SynchedPropertyObjectTwoWay(params.model, this, "model");
        this.__angle = new ObservedPropertySimple(0, this, "angle");
        this.__refresh = new ObservedPropertySimple(true, this, "refresh");
        this.__mYCenter = new ObservedPropertySimple(140, this, "mYCenter");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: PhoenixBottomRefresh_Params) {
        if (params.angle !== undefined) {
            this.angle = params.angle;
        }
        if (params.refresh !== undefined) {
            this.refresh = params.refresh;
        }
        if (params.mYCenter !== undefined) {
            this.mYCenter = params.mYCenter;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__angle.aboutToBeDeleted();
        this.__refresh.aboutToBeDeleted();
        this.__mYCenter.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: SynchedPropertySimpleOneWay<SmartRefreshForTaurus.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SmartRefreshForTaurus.Model) {
        this.__model.set(newValue);
    }
    private __angle: ObservedPropertySimple<number>;
    get angle() {
        return this.__angle.get();
    }
    set angle(newValue: number) {
        this.__angle.set(newValue);
    }
    private __refresh: ObservedPropertySimple<boolean>;
    get refresh() {
        return this.__refresh.get();
    }
    set refresh(newValue: boolean) {
        this.__refresh.set(newValue);
    }
    private __mYCenter: ObservedPropertySimple<number>;
    get mYCenter() {
        return this.__mYCenter.get();
    }
    set mYCenter(newValue: number) {
        this.__mYCenter.set(newValue);
    }
    aboutToAppear() {
        this.model.setZFooterHeight(-1).setInitFooterHeight(200);
        this.model.setRefreshBottomCallback(() => this.startDraw());
    }
    startDraw(): void {
        this.model.headerRefreshId = setInterval(() => {
            this.angle = (this.angle + 5) % 720;
            this.refresh = !this.refresh;
        }, 50);
    }
    render() {
        Flex.create();
        If.create();
        if (this.refresh) {
            If.branchId(0);
            Text.create("0");
            Text.visibility(Visibility.None);
            Text.pop();
        }
        else {
            If.branchId(1);
            Text.create("1");
            Text.visibility(Visibility.None);
            Text.pop();
        }
        If.pop();
        If.create();
        if (this.model.refreshState == SmartRefreshForTaurus.REFRESHSTATE.REFRESHING) { //松开过后的刷新样式
            If.branchId(0);
            Stack.create({ alignContent: Alignment.TopStart });
            Stack.width("100%");
            Stack.height("100%");
            Stack.backgroundColor(0xff11bbff);
            Text.create('');
            Text.backgroundColor(this.model.backgroundColor);
            Text.width('100%');
            Text.height('100%');
            Text.pop();
            Image.create($r("app.media.cloud"));
            Image.width('100%');
            Image.height('100%');
            Image.create($r("app.media.sun"));
            Image.width(60);
            Image.height(60);
            Image.position({
                x: 720 / 3,
                y: this.model.footerHeight / 5
            });
            Image.scale({
                x: 1,
                y: 1,
                z: 1,
                centerX: '50%',
                centerY: '50%'
            });
            Image.rotate({
                x: 0,
                y: 0,
                z: 1,
                centerX: '50%',
                centerY: '50%',
                angle: this.angle
            });
            Image.create($r("app.media.city"));
            Image.width('100%');
            Image.height('100%');
            Image.scale({
                x: 1,
                y: 1,
                z: 1,
                centerX: '50%',
                centerY: '50%'
            });
            Stack.pop();
        }
        else if (this.model.refreshState == SmartRefreshForTaurus.REFRESHSTATE.TOREFRESH
            || this.model.refreshState == SmartRefreshForTaurus.REFRESHSTATE.NONE) { //拖住过程中的样式
            If.branchId(1);
            Stack.create({ alignContent: Alignment.TopStart });
            Stack.width("100%");
            Stack.height("100%");
            Stack.backgroundColor(0xff11bbff);
            Text.create('');
            Text.backgroundColor(this.model.backgroundColor);
            Text.width('100%');
            Text.height('100%');
            Text.pop();
            Image.create($r("app.media.cloud"));
            Image.width('100%');
            Image.height('100%');
            Image.create($r("app.media.sun"));
            Image.width(60);
            Image.height(60);
            Image.position({
                x: 720 / 3,
                y: this.model.footerHeight / 5
            });
            Image.scale({
                x: this.model.getOffset() >= 1 ? (1 - (this.model.getOffset() - 1)) : 1,
                y: this.model.getOffset() >= 1 ? (1 - (this.model.getOffset() - 1)) : 1,
                z: 1,
                centerX: '50%',
                centerY: '50%'
            });
            Image.rotate({
                x: 0,
                y: 0,
                z: 1,
                centerX: '50%',
                centerY: '50%',
                angle: this.angle
            });
            Image.create($r("app.media.city"));
            Image.width('100%');
            Image.height('100%');
            Image.scale({
                x: this.model.getOffset() >= 1 ? this.model.getOffset() : 1,
                y: this.model.getOffset() >= 1 ? this.model.getOffset() : 1,
                z: 1,
                centerX: '50%',
                centerY: '100%'
            });
            Stack.pop();
        }
        If.pop();
        Flex.pop();
    }
}
