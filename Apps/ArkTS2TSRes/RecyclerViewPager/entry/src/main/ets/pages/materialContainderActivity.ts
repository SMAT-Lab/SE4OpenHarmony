interface MaterialContainderActivity_Params {
    text?;
    controller?: TabsController;
    model?: materialContainderTop.Model;
    index?: number;
    y0?: number;
    x0?: number;
    tmpX?: number;
    tmpY?: number;
    offsetY?: number;
    offsetX?: number;
    timeDown?: number;
    timeUp?: number;
    arr?: string[];
    editFlag?: boolean;
    barIsHidden?: boolean;
    titleHeight?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "materialContainderActivity_" + ++__generate__Id;
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
import { materialContainderTop } from "@ohos/recyclerviewpager";
import { Toolbar } from './toolbar';
class MaterialContainderActivity extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.text = ['item-0', 'item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6', 'item-7', 'item-8', 'item-9'];
        this.controller = new TabsController();
        this.__model = new ObservedPropertyObject(new materialContainderTop.Model(this.controller), this, "model");
        this.__index = new ObservedPropertySimple(0, this, "index");
        this.__y0 = new ObservedPropertySimple(0, this, "y0");
        this.__x0 = new ObservedPropertySimple(0, this, "x0");
        this.__tmpX = new ObservedPropertySimple(0, this, "tmpX");
        this.__tmpY = new ObservedPropertySimple(0, this, "tmpY");
        this.__offsetY = new ObservedPropertySimple(0, this, "offsetY");
        this.__offsetX = new ObservedPropertySimple(0, this, "offsetX");
        this.__timeDown = new ObservedPropertySimple(0, this, "timeDown");
        this.__timeUp = new ObservedPropertySimple(0, this, "timeUp");
        this.arr = ["item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8", "item9", "item10"];
        this.__editFlag = new ObservedPropertySimple(false, this, "editFlag");
        this.__barIsHidden = new ObservedPropertySimple(false, this, "barIsHidden");
        this.__titleHeight = new ObservedPropertySimple(8, this, "titleHeight");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MaterialContainderActivity_Params) {
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.y0 !== undefined) {
            this.y0 = params.y0;
        }
        if (params.x0 !== undefined) {
            this.x0 = params.x0;
        }
        if (params.tmpX !== undefined) {
            this.tmpX = params.tmpX;
        }
        if (params.tmpY !== undefined) {
            this.tmpY = params.tmpY;
        }
        if (params.offsetY !== undefined) {
            this.offsetY = params.offsetY;
        }
        if (params.offsetX !== undefined) {
            this.offsetX = params.offsetX;
        }
        if (params.timeDown !== undefined) {
            this.timeDown = params.timeDown;
        }
        if (params.timeUp !== undefined) {
            this.timeUp = params.timeUp;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.editFlag !== undefined) {
            this.editFlag = params.editFlag;
        }
        if (params.barIsHidden !== undefined) {
            this.barIsHidden = params.barIsHidden;
        }
        if (params.titleHeight !== undefined) {
            this.titleHeight = params.titleHeight;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        this.__y0.aboutToBeDeleted();
        this.__x0.aboutToBeDeleted();
        this.__tmpX.aboutToBeDeleted();
        this.__tmpY.aboutToBeDeleted();
        this.__offsetY.aboutToBeDeleted();
        this.__offsetX.aboutToBeDeleted();
        this.__timeDown.aboutToBeDeleted();
        this.__timeUp.aboutToBeDeleted();
        this.__editFlag.aboutToBeDeleted();
        this.__barIsHidden.aboutToBeDeleted();
        this.__titleHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private text;
    public controller: TabsController;
    private __model: ObservedPropertyObject<materialContainderTop.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: materialContainderTop.Model) {
        this.__model.set(newValue);
    }
    private __index: ObservedPropertySimple<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private __y0: ObservedPropertySimple<number>;
    get y0() {
        return this.__y0.get();
    }
    set y0(newValue: number) {
        this.__y0.set(newValue);
    }
    private __x0: ObservedPropertySimple<number>;
    get x0() {
        return this.__x0.get();
    }
    set x0(newValue: number) {
        this.__x0.set(newValue);
    }
    private __tmpX: ObservedPropertySimple<number>;
    get tmpX() {
        return this.__tmpX.get();
    }
    set tmpX(newValue: number) {
        this.__tmpX.set(newValue);
    }
    private __tmpY: ObservedPropertySimple<number>;
    get tmpY() {
        return this.__tmpY.get();
    }
    set tmpY(newValue: number) {
        this.__tmpY.set(newValue);
    }
    private __offsetY: ObservedPropertySimple<number>;
    get offsetY() {
        return this.__offsetY.get();
    }
    set offsetY(newValue: number) {
        this.__offsetY.set(newValue);
    }
    private __offsetX: ObservedPropertySimple<number>;
    get offsetX() {
        return this.__offsetX.get();
    }
    set offsetX(newValue: number) {
        this.__offsetX.set(newValue);
    }
    private __timeDown: ObservedPropertySimple<number>;
    get timeDown() {
        return this.__timeDown.get();
    }
    set timeDown(newValue: number) {
        this.__timeDown.set(newValue);
    }
    private __timeUp: ObservedPropertySimple<number>;
    get timeUp() {
        return this.__timeUp.get();
    }
    set timeUp(newValue: number) {
        this.__timeUp.set(newValue);
    }
    private arr: string[];
    private __editFlag: ObservedPropertySimple<boolean>;
    get editFlag() {
        return this.__editFlag.get();
    }
    set editFlag(newValue: boolean) {
        this.__editFlag.set(newValue);
    }
    private __barIsHidden: ObservedPropertySimple<boolean>;
    get barIsHidden() {
        return this.__barIsHidden.get();
    }
    set barIsHidden(newValue: boolean) {
        this.__barIsHidden.set(newValue);
    }
    private __titleHeight: ObservedPropertySimple<number>;
    get titleHeight() {
        return this.__titleHeight.get();
    }
    set titleHeight(newValue: number) {
        this.__titleHeight.set(newValue);
    }
    TabsContainder(index: number, parent = null) {
        Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.height("90%");
        Flex.width("100%");
        List.create({ space: 20, initialIndex: 0 });
        List.listDirection(Axis.Vertical);
        List.edgeEffect(EdgeEffect.None);
        List.chainAnimation(false);
        List.editMode(this.editFlag);
        List.width('90%');
        ForEach.create("2", this, ObservedObject.GetRawObject(this.arr), (item: string) => {
            ListItem.create();
            Row.create();
            Image.create($r('app.media.icon'));
            Image.width(60);
            Image.height(60);
            Text.create('' + item);
            Text.width('100%');
            Text.height(100);
            Text.fontSize(25);
            Text.textAlign(TextAlign.Start);
            Text.borderRadius(10);
            Text.backgroundColor(0xFFFFFF);
            Text.margin({ left: 20 });
            Text.pop();
            Row.pop();
            ListItem.pop();
        }, (item: string) => {
            return item;
        });
        ForEach.pop();
        List.pop();
        Flex.pop();
    }
    aboutToAppear() {
        this.model
            .setSnap(true)
            .setBackgroundColor("#8e46d4");
    }
    render() {
        Column.create();
        let earlierCreatedChild_3: Toolbar = (this && this.findChildById) ? this.findChildById("3") as Toolbar : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new Toolbar("3", this, { title: 'Material Demo', isBack: true }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                title: 'Material Demo', isBack: true
            });
            if (!earlierCreatedChild_3.needsUpdate()) {
                earlierCreatedChild_3.markStatic();
            }
            View.create(earlierCreatedChild_3);
        }
        Column.create();
        Flex.create({ direction: FlexDirection.Column, justifyContent: FlexAlign.Center });
        Flex.width(100 + '%');
        Flex.height(this.titleHeight + '%');
        Flex.backgroundColor("#8e46d4");
        Text.create("from argument:" + this.index);
        Text.fontSize(21);
        Text.fontColor("#ffffff");
        Text.margin({ left: 15 });
        Text.pop();
        Flex.pop();
        Tabs.create({ index: this.index, controller: this.controller });
        Tabs.width("100%");
        Tabs.height('100%');
        Tabs.onChange((index) => {
            this.index = index;
        });
        Tabs.barWidth(0);
        Tabs.barHeight(0);
        Tabs.onTouch((event: TouchEvent) => {
            this.model.notifyTouch(event, this.index);
            this.onTouchEvent(event);
        });
        Tabs.width('100%');
        Tabs.height('100%');
        TabContent.create();
        this.TabsContainder(0, this);
        TabContent.pop();
        TabContent.create();
        this.TabsContainder(1, this);
        TabContent.pop();
        TabContent.create();
        this.TabsContainder(2, this);
        TabContent.pop();
        TabContent.create();
        this.TabsContainder(3, this);
        TabContent.pop();
        TabContent.create();
        this.TabsContainder(4, this);
        TabContent.pop();
        TabContent.create();
        this.TabsContainder(5, this);
        TabContent.pop();
        TabContent.create();
        this.TabsContainder(6, this);
        TabContent.pop();
        TabContent.create();
        this.TabsContainder(7, this);
        TabContent.pop();
        TabContent.create();
        this.TabsContainder(8, this);
        TabContent.pop();
        TabContent.create();
        this.TabsContainder(9, this);
        TabContent.pop();
        Tabs.pop();
        Column.pop();
        Column.pop();
    }
    onTouchEvent(event: TouchEvent) {
        if (event.type == TouchType.Down) {
            this.y0 = event.touches[0].screenY;
            this.x0 = event.touches[0].screenX;
        }
        if (event.type == TouchType.Move) {
            this.tmpX = this.x0 - event.touches[0].screenX;
            this.tmpY = this.y0 - event.touches[0].screenY;
            if (Math.abs(this.tmpY) > Math.abs(this.tmpX)) {
                if (this.tmpY > 0 && !this.barIsHidden) {
                    //向上滑动，折叠
                    if (this.tmpY <= 8 * 25) {
                        this.offsetY = this.tmpY;
                    }
                    else {
                        this.barIsHidden = true;
                    }
                }
                else if (this.tmpY < 0 && this.barIsHidden) {
                    //向下滑动
                    if (Math.abs(this.tmpY) <= 8 * 25 * 0.5) {
                        this.offsetY = this.tmpY;
                    }
                    else {
                        this.barIsHidden = false;
                    }
                }
            }
            else {
                this.offsetX = this.tmpX;
            }
            this.titleHeight = (8 - (this.offsetY >= 0 && this.offsetY / 25 < 8 ? this.offsetY / 25 :
                (this.offsetY < 0 && (-this.offsetY / 25) < 8 ? (-(this.offsetY / 25) * (25 / this.offsetY)) : //下拉
                    this.offsetY < 0 ? 0 : 8) //下拉后固定
            ));
        }
        if (event.type == TouchType.Up) {
            if (Math.abs(this.tmpY) > Math.abs(this.tmpX)) {
                if (this.tmpY > 0 && !this.barIsHidden) {
                    //向上滑动，折叠
                    if (this.tmpY >= 8 * 25 * 0.5) {
                        this.offsetY += (8 * 25 - this.offsetY);
                        this.barIsHidden = true;
                    }
                    else {
                        this.offsetY = 0;
                    }
                }
                else if (this.tmpY < 0 && this.barIsHidden) {
                    //向下滑动
                    if (Math.abs(this.tmpY) >= 8 * 25 * 0.5) {
                        this.barIsHidden = false;
                    }
                }
            }
            this.titleHeight = (8 - (this.offsetY >= 0 && this.offsetY / 25 < 8 ? this.offsetY / 25 :
                (this.offsetY < 0 && (-this.offsetY / 25) < 8 ? (-(this.offsetY / 25) * (25 / this.offsetY)) : //下拉
                    this.offsetY < 0 ? 0 : 8) //下拉后固定
            ));
            if (this.titleHeight >= 8) {
                this.titleHeight = 8;
            }
            else if (this.titleHeight < 8 * 0.2) {
                this.titleHeight = 0;
            }
        }
    }
}
loadDocument(new MaterialContainderActivity("1", undefined, {}));
