interface ItemList_Params {
    items?: Array<ItemType>;
    x?: string;
    firstItem?: number;
    lastItem?: number;
}
interface Index_Params {
    items?: Array<ItemType>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "NormalPage_" + ++__generate__Id;
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
import { ItemType, tempType } from './ItemType';
import { TitleBar } from '../common/TitleBar';
class Index extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__items = new ObservedPropertyObject([], this, "items");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: Index_Params) {
        if (params.items !== undefined) {
            this.items = params.items;
        }
    }
    aboutToBeDeleted() {
        this.__items.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __items: ObservedPropertyObject<Array<ItemType>>;
    get items() {
        return this.__items.get();
    }
    set items(newValue: Array<ItemType>) {
        this.__items.set(newValue);
    }
    aboutToAppear() {
        for (let i = 0; i < 10; i++) {
            let item0: ItemType = new ItemType('txt', 'world', null, { x: '-100%', value: 'txt' });
            this.items.push(item0);
            let item1: ItemType = new ItemType('img', '', $r('app.media.icon'), { x: '-100%', value: 'img' });
            this.items.push(item1);
            let item2: ItemType = new ItemType('rich', '小艾大人赛高', $r('app.media.img_11'), { x: '-100%', value: 'img' });
            this.items.push(item2);
        }
    }
    render() {
        Column.create();
        let earlierCreatedChild_2: ItemList = (this && this.findChildById) ? this.findChildById("2") as ItemList : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new ItemList("2", this, { items: this.items }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                items: this.items
            });
            View.create(earlierCreatedChild_2);
        }
        Column.pop();
    }
}
class ItemList extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.items = [];
        this.__x = new ObservedPropertySimple('-100%', this, "x");
        this.__firstItem = new ObservedPropertySimple(0, this, "firstItem");
        this.__lastItem = new ObservedPropertySimple(0, this, "lastItem");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ItemList_Params) {
        if (params.items !== undefined) {
            this.items = params.items;
        }
        if (params.x !== undefined) {
            this.x = params.x;
        }
        if (params.firstItem !== undefined) {
            this.firstItem = params.firstItem;
        }
        if (params.lastItem !== undefined) {
            this.lastItem = params.lastItem;
        }
    }
    aboutToBeDeleted() {
        this.__x.aboutToBeDeleted();
        this.__firstItem.aboutToBeDeleted();
        this.__lastItem.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private items: Array<ItemType>;
    private __x: ObservedPropertySimple<string>;
    get x() {
        return this.__x.get();
    }
    set x(newValue: string) {
        this.__x.set(newValue);
    }
    private __firstItem: ObservedPropertySimple<number>;
    get firstItem() {
        return this.__firstItem.get();
    }
    set firstItem(newValue: number) {
        this.__firstItem.set(newValue);
    }
    private __lastItem: ObservedPropertySimple<number>;
    get lastItem() {
        return this.__lastItem.get();
    }
    set lastItem(newValue: number) {
        this.__lastItem.set(newValue);
    }
    render() {
        Column.create();
        let earlierCreatedChild_3: TitleBar = (this && this.findChildById) ? this.findChildById("3") as TitleBar : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new TitleBar("3", this, {}));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({});
            if (!earlierCreatedChild_3.needsUpdate()) {
                earlierCreatedChild_3.markStatic();
            }
            View.create(earlierCreatedChild_3);
        }
        List.create({ space: 5, initialIndex: 0 });
        List.height('94%');
        List.editMode(false);
        List.onScrollIndex((firstIndex: number, lastIndex: number) => {
            this.firstItem = firstIndex;
            this.lastItem = lastIndex;
            this.items.forEach((item: ItemType, index: number) => {
                if (this.items[index].temp.value == 'txt') {
                    if (index >= firstIndex && index < lastIndex) {
                        let temp: tempType = { x: '0%', value: 'txt' };
                        let data: ItemType = new ItemType(this.items[index].itemType, this.items[index].content, this.items[index].res, temp);
                        this.items.splice(index, 1, data);
                    }
                }
            });
        });
        ForEach.create("4", this, ObservedObject.GetRawObject(this.items), (item: ItemType, index: number) => {
            ListItem.create();
            Column.create();
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Center);
            If.create();
            if (item.temp.value == 'txt') {
                If.branchId(0);
                Column.create();
                Context.animation({
                    duration: 800,
                    curve: Curve.EaseOut,
                    delay: 200,
                    iterations: 1,
                    playMode: PlayMode.Normal // 动画模式
                });
                Column.width('100%');
                Column.alignItems(HorizontalAlign.Center);
                Column.translate({ x: item.temp.x });
                Context.animation(null);
                Text.create('hello ' + item.content);
                Text.fontSize(14);
                Text.padding(16);
                Text.border({ width: 2 });
                Text.pop();
                Column.pop();
            }
            else if (item.itemType == 'img') {
                If.branchId(1);
                Flex.create();
                Flex.width(75);
                Flex.height(75);
                Flex.padding(16);
                Flex.border({ width: 2 });
                Image.create(item.res);
                Flex.pop();
            }
            else if (item.itemType == 'rich') {
                If.branchId(2);
                Image.create(item.res);
                Image.height(75);
                Image.objectFit(ImageFit.ScaleDown);
                Text.create(item.content + "\nlayoutPosition:" + index + "\nabsoluteAdapterPosition:"
                    + index + "\nbindingAdapterPosition:" + index);
                Text.fontSize(14);
                Text.padding(5);
                Text.textAlign(TextAlign.Center);
                Text.pop();
            }
            If.pop();
            Column.pop();
            ListItem.pop();
        }, (index: string) => index + '');
        ForEach.pop();
        List.pop();
        Column.pop();
    }
}
loadDocument(new Index("1", undefined, {}));
