interface FlyRefreshHeader_Params {
    model?: SmartRefreshForFlyRefresh.Model;
    settings?: RenderingContextSettings;
    context?: CanvasRenderingContext2D;
    ready?: boolean;
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
    initHeight?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "FlyRefreshHeader_" + ++__generate__Id;
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
import FlyRefreshHeaderAircraft from "./FlyRefreshHeaderAircraft";
export class FlyRefreshHeader extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new SynchedPropertyObjectTwoWay(params.model, this, "model");
        this.settings = new RenderingContextSettings(true);
        this.context = new CanvasRenderingContext2D(this.settings);
        this.__ready = new ObservedPropertySimple(false, this, "ready");
        this.mScale = 0;
        this.mScaleX = 1;
        this.mScaleY = 1;
        this.mTrunk = new Path2D();
        this.mBranch = new Path2D();
        this.__x = new ObservedPropertySimple(0, this, "x");
        this.__y = new ObservedPropertySimple(0, this, "y");
        this.__angle = new ObservedPropertySimple(0, this, "angle");
        this.__isClick = new ObservedPropertySimple(true, this, "isClick");
        this.__isAdd = new ObservedPropertySimple(false, this, "isAdd");
        this.__initHeight = new ObservedPropertySimple(this.model.initHeaderHeight, this, "initHeight");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: FlyRefreshHeader_Params) {
        if (params.settings !== undefined) {
            this.settings = params.settings;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.ready !== undefined) {
            this.ready = params.ready;
        }
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
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__ready.aboutToBeDeleted();
        this.__x.aboutToBeDeleted();
        this.__y.aboutToBeDeleted();
        this.__angle.aboutToBeDeleted();
        this.__isClick.aboutToBeDeleted();
        this.__isAdd.aboutToBeDeleted();
        this.__initHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: SynchedPropertySimpleOneWay<SmartRefreshForFlyRefresh.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SmartRefreshForFlyRefresh.Model) {
        this.__model.set(newValue);
    }
    private settings: RenderingContextSettings;
    private context: CanvasRenderingContext2D;
    private __ready: ObservedPropertySimple<boolean>;
    get ready() {
        return this.__ready.get();
    }
    set ready(newValue: boolean) {
        this.__ready.set(newValue);
    }
    private mScale: number;
    protected mScaleX: number;
    protected mScaleY: number;
    protected mTrunk: Path2D;
    protected mBranch: Path2D;
    private __x: ObservedPropertySimple<number>;
    get x() {
        return this.__x.get();
    }
    set x(newValue: number) {
        this.__x.set(newValue);
    }
    private __y: ObservedPropertySimple<number>;
    get y() {
        return this.__y.get();
    }
    set y(newValue: number) {
        this.__y.set(newValue);
    }
    private __angle: ObservedPropertySimple<number>;
    get angle() {
        return this.__angle.get();
    }
    set angle(newValue: number) {
        this.__angle.set(newValue);
    }
    private __isClick: ObservedPropertySimple<boolean>;
    get isClick() {
        return this.__isClick.get();
    }
    set isClick(newValue: boolean) {
        this.__isClick.set(newValue);
    }
    private __isAdd: ObservedPropertySimple<boolean>;
    get isAdd() {
        return this.__isAdd.get();
    }
    set isAdd(newValue: boolean) {
        this.__isAdd.set(newValue);
    }
    private __initHeight: ObservedPropertySimple<number>;
    get initHeight() {
        return this.__initHeight.get();
    }
    set initHeight(newValue: number) {
        this.__initHeight.set(newValue);
    }
    aboutToAppear() {
        this.model.flyRefreshHeaderIsShow = true;
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start });
        Flex.backgroundColor('#33AAFF');
        Flex.width('100%');
        Flex.height(this.initHeight);
        Text.create('' + this.changeStatus(ObservedObject.GetRawObject(this.model)));
        Text.visibility(Visibility.None);
        Text.pop();
        Stack.create();
        Stack.alignContent(Alignment.Bottom);
        Stack.width('100%');
        Stack.height('100%');
        Image.create($r("app.media.bg1"));
        Image.width('100%');
        Image.height(150 + ((this.model.getOffset() > 1 ? this.model.getOffset() : 1) - 1) * 150);
        Image.objectFit(ImageFit.Fill);
        Stack.create();
        Stack.width('100%');
        Stack.height((120 + ((this.model.getOffset() > 1 ? this.model.getOffset() : 1) - 1) * 120));
        Image.create($r("app.media.tree1"));
        Image.width(20);
        Image.height(30);
        Image.objectFit(ImageFit.Contain);
        Image.position({ x: 140, y: -10 + ((this.model.getOffset() > 1 ? this.model.getOffset() : 1) - 1) * 20 });
        Image.create($r("app.media.tree2"));
        Image.width(20);
        Image.height(40);
        Image.objectFit(ImageFit.Contain);
        Image.position({ x: 165, y: -25 + ((this.model.getOffset() > 1 ? this.model.getOffset() : 1) - 1) * 20 });
        Image.create($r("app.media.bg2"));
        Image.width('100%');
        Image.height('100%');
        Image.objectFit(ImageFit.Fill);
        Stack.pop();
        Stack.create();
        Stack.width('100%');
        Stack.height((80 + ((this.model.getOffset() > 1 ? this.model.getOffset() : 1) - 1) * 10));
        Image.create($r("app.media.tree4"));
        Image.width(10);
        Image.height(50);
        Image.objectFit(ImageFit.Fill);
        Image.position({ x: 380, y: -43 });
        Image.create($r("app.media.tree3"));
        Image.width(12);
        Image.height(65);
        Image.objectFit(ImageFit.Fill);
        Image.position({ x: 410, y: -58 });
        Image.create($r("app.media.tree5"));
        Image.width(10);
        Image.height(50);
        Image.objectFit(ImageFit.Fill);
        Image.position({ x: 440, y: -45 });
        Image.create($r("app.media.bg3"));
        Image.width('100%');
        Image.height('100%');
        Image.objectFit(ImageFit.Fill);
        Stack.pop();
        let earlierCreatedChild_2: FlyRefreshHeaderAircraft = (this && this.findChildById) ? this.findChildById("2") as FlyRefreshHeaderAircraft : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new FlyRefreshHeaderAircraft("2", this, { modelParam: this.__model }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({});
            View.create(earlierCreatedChild_2);
        }
        Stack.pop();
        Flex.pop();
    }
    changeStatus(model: SmartRefreshForFlyRefresh.Model) {
        if (model.refreshState == SmartRefreshForFlyRefresh.REFRESHSTATE.TOREFRESH || model.refreshState == SmartRefreshForFlyRefresh.REFRESHSTATE.NONE) { //下拉中
            this.initHeight = model.headerHeight > model.initHeaderHeight ? model.headerHeight : model.initHeaderHeight;
        }
        else if (model.refreshState == SmartRefreshForFlyRefresh.REFRESHSTATE.REFRESHING) { //刷新中
            this.initHeight = model.initHeaderHeight;
        }
    }
}
