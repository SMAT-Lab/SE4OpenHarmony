interface FlyRefreshHeaderAircraft_Params {
    modelParam?: SmartRefreshForFlyRefresh.Model;
    mScale?: number;
    mScaleX?: number;
    mScaleY?: number;
    mTrunk?: Path2D;
    mBranch?: Path2D;
    x?: number;
    y?: number;
    angle?: number;
    isClick?: boolean;
    isAdd?: boolean;
    initHeight?;
    refresh?: boolean;
    isRefreshState?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "FlyRefreshHeaderAircraft_" + ++__generate__Id;
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
import SmartRefreshForFlyRefresh from "./SmartRefreshForFlyRefresh";
export class FlyRefreshHeaderAircraft extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__modelParam = new SynchedPropertyObjectTwoWay(params.modelParam, this, "modelParam");
        this.mScale = 0;
        this.mScaleX = 1;
        this.mScaleY = 1;
        this.mTrunk = new Path2D();
        this.mBranch = new Path2D();
        this.x = 0;
        this.y = 0;
        this.__angle = new ObservedPropertySimple(0, this, "angle");
        this.isClick = true;
        this.isAdd = false;
        this.initHeight = this.modelParam.initHeaderHeight;
        this.__refresh = new ObservedPropertySimple(true, this, "refresh");
        this.isRefreshState = false;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: FlyRefreshHeaderAircraft_Params) {
        if (params.mScale !== undefined) {
            this.mScale = params.mScale;
        }
        if (params.mScaleX !== undefined) {
            this.mScaleX = params.mScaleX;
        }
        if (params.mScaleY !== undefined) {
            this.mScaleY = params.mScaleY;
        }
        if (params.mTrunk !== undefined) {
            this.mTrunk = params.mTrunk;
        }
        if (params.mBranch !== undefined) {
            this.mBranch = params.mBranch;
        }
        if (params.x !== undefined) {
            this.x = params.x;
        }
        if (params.y !== undefined) {
            this.y = params.y;
        }
        if (params.angle !== undefined) {
            this.angle = params.angle;
        }
        if (params.isClick !== undefined) {
            this.isClick = params.isClick;
        }
        if (params.isAdd !== undefined) {
            this.isAdd = params.isAdd;
        }
        if (params.initHeight !== undefined) {
            this.initHeight = params.initHeight;
        }
        if (params.refresh !== undefined) {
            this.refresh = params.refresh;
        }
        if (params.isRefreshState !== undefined) {
            this.isRefreshState = params.isRefreshState;
        }
    }
    aboutToBeDeleted() {
        this.__modelParam.aboutToBeDeleted();
        this.__angle.aboutToBeDeleted();
        this.__refresh.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __modelParam: SynchedPropertySimpleOneWay<SmartRefreshForFlyRefresh.Model>;
    get modelParam() {
        return this.__modelParam.get();
    }
    set modelParam(newValue: SmartRefreshForFlyRefresh.Model) {
        this.__modelParam.set(newValue);
    }
    private mScale: number;
    protected mScaleX: number;
    protected mScaleY: number;
    protected mTrunk: Path2D;
    protected mBranch: Path2D;
    private x: number;
    private y: number;
    private __angle: ObservedPropertySimple<number>;
    get angle() {
        return this.__angle.get();
    }
    set angle(newValue: number) {
        this.__angle.set(newValue);
    }
    private isClick: boolean;
    private isAdd: boolean;
    private initHeight;
    private __refresh: ObservedPropertySimple<boolean>;
    get refresh() {
        return this.__refresh.get();
    }
    set refresh(newValue: boolean) {
        this.__refresh.set(newValue);
    }
    private isRefreshState: boolean;
    aboutToAppear() {
        this.modelParam.setRefreshHeaderCallback(() => this.startDraw());
        if (this.modelParam.initRefreshing) {
            this.modelParam.refreshHeaderCallback();
            this.modelParam.initRefreshing = false;
        }
    }
    startDraw(): void {
        this.modelParam.headerRefreshId = setInterval(() => {
            this.changeStatus();
            this.refresh = !this.refresh;
        }, 50);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start });
        Flex.width('100%');
        Flex.height(this.initHeight);
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
        Stack.create();
        Stack.onClick(event => {
            this.angle = -30;
            this.modelParam.setHeaderHeight(340);
            this.initHeight = 240;
            setTimeout(() => {
                this.modelParam.setHeaderHeight(200);
                this.initHeight = 200;
                this.flyPosition();
            }, 1000);
        });
        Stack.position({ x: 20, y: (this.initHeight - 40) });
        Circle.create();
        Circle.width(80);
        Circle.height(80);
        Circle.fill('#33AAFF');
        Path.create();
        Context.animation({
            duration: 1500,
            curve: Curve.EaseOut,
            delay: 200,
            iterations: 1,
            playMode: PlayMode.Normal, // 动画模式
        });
        Path.commands('M4.02 42 L46 24 L4.02 6 L4 20 L36 24 L4 28z');
        Path.fill(Color.White);
        Path.translate({ x: this.x, y: this.y });
        Path.rotate({
            z: 1,
            centerX: '50%',
            centerY: '50%',
            angle: this.angle
        });
        Path.zIndex(999);
        Context.animation(null);
        Stack.pop();
        Flex.pop();
    }
    changeStatus(): void {
        if (this.modelParam.refreshState == SmartRefreshForFlyRefresh.REFRESHSTATE.TOREFRESH) { //下拉中
            this.angle = -30;
            this.initHeight = this.modelParam.headerHeight;
        }
        else if (this.modelParam.refreshState == SmartRefreshForFlyRefresh.REFRESHSTATE.REFRESHING) { //刷新中
            if (!this.isRefreshState) { //不在刷新中
                this.isRefreshState = true;
                this.initHeight = this.modelParam.initHeaderHeight;
                this.flyPosition();
            }
        }
        else { //停止刷新
            if (this.isAdd) {
                if (this.modelParam.refreshCallback) {
                    this.modelParam.refreshCallback();
                }
                this.isAdd = false;
            }
        }
    }
    flyPosition(): void {
        if (this.isClick) {
            this.isClick = false;
            this.x = 720;
            this.y = -445;
            this.angle = 0;
            setTimeout(() => {
                this.x = 0;
                this.y = 0;
                this.angle = 0;
                this.isRefreshState = false;
                this.isClick = true;
                this.isAdd = true;
                //        this.modelParam.refreshCallback()
                //clearInterval(this.modelParam.headerRefreshId)
            }, 5200);
            setTimeout(() => {
                this.x = -300;
                this.y = -10;
                this.angle = -180;
            }, 3200);
            setTimeout(() => {
                this.x = 1993;
                this.y = -100;
                this.angle = -180;
            }, 2200);
        }
    }
}
export default FlyRefreshHeaderAircraft;
