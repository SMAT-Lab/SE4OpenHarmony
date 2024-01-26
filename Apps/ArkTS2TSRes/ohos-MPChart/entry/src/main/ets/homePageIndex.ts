interface Item_Params {
    itemData?: ContentItem;
    backGround?: number;
}
interface ItemTitle_Params {
    itemData?: ContentItem;
    backGroundTitle?: number;
}
interface homePageIndex_Params {
    pageItemArr?: Array<ContentItemData>;
    menuItemArr?: Array<string>;
    title?: string;
    scroller?: Scroller;
    model?: ChartTitleModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "homePageIndex_" + ++__generate__Id;
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
import ContentItem from './pageconfig/ContentItem';
import ContentItemData from './pageconfig/ContentItemData';
import router from '@ohos.router';
import title, { ChartTitleModel } from './title/index';
class homePageIndex extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__pageItemArr = new ObservedPropertyObject(ContentItemData.getData(), this, "pageItemArr");
        this.menuItemArr = ['View on GitHub', 'Problem Report', 'Developer Website'];
        this.title = 'mpchart Example';
        this.scroller = new Scroller();
        this.__model = new ObservedPropertyObject(new ChartTitleModel(), this, "model");
        this.updateWithValueParams(params);
        this.declareWatch("model", this.menuCallback);
    }
    updateWithValueParams(params: homePageIndex_Params) {
        if (params.pageItemArr !== undefined) {
            this.pageItemArr = params.pageItemArr;
        }
        if (params.menuItemArr !== undefined) {
            this.menuItemArr = params.menuItemArr;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
    }
    aboutToBeDeleted() {
        this.__pageItemArr.aboutToBeDeleted();
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __pageItemArr: ObservedPropertyObject<Array<ContentItemData>>;
    get pageItemArr() {
        return this.__pageItemArr.get();
    }
    set pageItemArr(newValue: Array<ContentItemData>) {
        this.__pageItemArr.set(newValue);
    }
    private menuItemArr: Array<string>;
    private title: string;
    private scroller: Scroller;
    private __model: ObservedPropertyObject<ChartTitleModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: ChartTitleModel) {
        this.__model.set(newValue);
    }
    render() {
        Column.create();
        let earlierCreatedChild_2: title = (this && this.findChildById) ? this.findChildById("2") as title : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new title("2", this, { model: this.model }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                model: this.model
            });
            View.create(earlierCreatedChild_2);
        }
        Scroll.create(this.scroller);
        Scroll.height('100%');
        Scroll.scrollable(ScrollDirection.Vertical);
        Scroll.scrollBarWidth(0);
        Scroll.backgroundColor(Color.White);
        Column.create();
        Column.width('100%');
        Column.padding({ bottom: 80 });
        ForEach.create("5", this, ObservedObject.GetRawObject(this.pageItemArr), (item: ContentItem) => {
            If.create();
            if (item.getIsSection()) {
                If.branchId(0);
                let earlierCreatedChild_3: ItemTitle = (this && this.findChildById) ? this.findChildById("3") as ItemTitle : undefined;
                if (earlierCreatedChild_3 == undefined) {
                    View.create(new ItemTitle("3", this, { itemData: item }));
                }
                else {
                    earlierCreatedChild_3.updateWithValueParams({
                        itemData: item
                    });
                    View.create(earlierCreatedChild_3);
                }
            }
            else {
                If.branchId(1);
                Flex.create();
                Flex.onClick((event: ClickEvent) => {
                    router.pushUrl({
                        url: item.getPagePath(),
                    });
                });
                let earlierCreatedChild_4: Item = (this && this.findChildById) ? this.findChildById("4") as Item : undefined;
                if (earlierCreatedChild_4 == undefined) {
                    View.create(new Item("4", this, { itemData: item }));
                }
                else {
                    earlierCreatedChild_4.updateWithValueParams({
                        itemData: item
                    });
                    View.create(earlierCreatedChild_4);
                }
                Flex.pop();
            }
            If.pop();
        }, (item: ContentItem) => (item.getName() + "").toString());
        ForEach.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    public aboutToAppear() {
        this.model.menuItemArr = this.menuItemArr;
        this.model.title = this.title;
        this.model.isShowMenu = false;
    }
    menuCallback() {
    }
}
class ItemTitle extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__itemData = new ObservedPropertyObject(new ContentItem('title'), this, "itemData");
        this.__backGroundTitle = new ObservedPropertySimple(Color.White, this, "backGroundTitle");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ItemTitle_Params) {
        if (params.itemData !== undefined) {
            this.itemData = params.itemData;
        }
        if (params.backGroundTitle !== undefined) {
            this.backGroundTitle = params.backGroundTitle;
        }
    }
    aboutToBeDeleted() {
        this.__itemData.aboutToBeDeleted();
        this.__backGroundTitle.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __itemData: ObservedPropertyObject<ContentItem>;
    get itemData() {
        return this.__itemData.get();
    }
    set itemData(newValue: ContentItem) {
        this.__itemData.set(newValue);
    }
    private __backGroundTitle: ObservedPropertySimple<number>;
    get backGroundTitle() {
        return this.__backGroundTitle.get();
    }
    set backGroundTitle(newValue: number) {
        this.__backGroundTitle.set(newValue);
    }
    render() {
        Column.create();
        Column.backgroundColor(this.backGroundTitle);
        Text.create(this.itemData.getName());
        Text.fontSize(21);
        Text.padding(16);
        Text.fontColor(Color.Gray);
        Text.pop();
        Blank.create();
        Blank.width('100%');
        Blank.height(1);
        Blank.backgroundColor(0xdddddd);
        Blank.pop();
        Column.pop();
    }
}
class Item extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__itemData = new ObservedPropertyObject(new ContentItem('title'), this, "itemData");
        this.__backGround = new ObservedPropertySimple(Color.White, this, "backGround");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Item_Params) {
        if (params.itemData !== undefined) {
            this.itemData = params.itemData;
        }
        if (params.backGround !== undefined) {
            this.backGround = params.backGround;
        }
    }
    aboutToBeDeleted() {
        this.__itemData.aboutToBeDeleted();
        this.__backGround.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __itemData: ObservedPropertyObject<ContentItem>;
    get itemData() {
        return this.__itemData.get();
    }
    set itemData(newValue: ContentItem) {
        this.__itemData.set(newValue);
    }
    private __backGround: ObservedPropertySimple<number>;
    get backGround() {
        return this.__backGround.get();
    }
    set backGround(newValue: number) {
        this.__backGround.set(newValue);
    }
    render() {
        Column.create();
        Column.onTouch((event: TouchEvent) => {
            if (event.type == TouchType.Down) {
                this.backGround = 0xdcdcdc;
            }
            if (event.type == TouchType.Up) {
                this.backGround = Color.White;
            }
        });
        Column.backgroundColor(this.backGround);
        Text.create(this.itemData.getName());
        Text.fontSize(16);
        Text.fontColor(Color.Black);
        Text.margin({ left: 4 });
        Text.padding(8);
        Text.alignSelf(ItemAlign.Start);
        Text.width('100%');
        Text.pop();
        Text.create(this.itemData.getDesc());
        Text.fontSize(12);
        Text.fontColor(Color.Gray);
        Text.margin({ left: 4 });
        Text.padding({ top: 0, right: 8, bottom: 8, left: 8 });
        Text.alignSelf(ItemAlign.Start);
        Text.width('100%');
        Text.pop();
        Blank.create();
        Blank.width('100%');
        Blank.height(1);
        Blank.backgroundColor(0xdddddd);
        Blank.pop();
        Column.pop();
    }
}
loadDocument(new homePageIndex("1", undefined, {}));
