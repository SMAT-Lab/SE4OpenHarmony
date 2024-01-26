interface IconIndicator_Params {
    model?: IconModel;
    itemIndex?: number;
    iconItems?: Array<IconItem>;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "IconIndicator_" + ++__generate__Id;
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
import { IconModel, IconItem } from '../models/IconModel';
class IconIndicator extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new IconModel(null), this, "model");
        this.__itemIndex = new SynchedPropertySimpleTwoWay(params.itemIndex, this, "itemIndex");
        this.__iconItems = new ObservedPropertyObject([], this, "iconItems");
        this.updateWithValueParams(params);
        this.declareWatch("itemIndex", this.itemIndexChange);
    }
    updateWithValueParams(params: IconIndicator_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.iconItems !== undefined) {
            this.iconItems = params.iconItems;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__itemIndex.aboutToBeDeleted();
        this.__iconItems.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<IconModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: IconModel) {
        this.__model.set(newValue);
    }
    private __itemIndex: SynchedPropertySimpleTwoWay<number>;
    get itemIndex() {
        return this.__itemIndex.get();
    }
    set itemIndex(newValue: number) {
        this.__itemIndex.set(newValue);
    }
    private __iconItems: ObservedPropertyObject<Array<IconItem>>;
    get iconItems() {
        return this.__iconItems.get();
    }
    set iconItems(newValue: Array<IconItem>) {
        this.__iconItems.set(newValue);
    }
    render() {
        Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
        Flex.width(this.model.getWidth());
        Flex.backgroundColor(this.model.getBackgroundColor());
        Flex.height(this.model.getHeight());
        Row.create({ space: this.model.getMargin() });
        Row.width(this.model.getSize() * this.iconItems.length + this.model.getMargin() * (this.iconItems.length - 1));
        ForEach.create("2", this, ObservedObject.GetRawObject(this.iconItems), (item: IconItem, idx: number) => {
            If.create();
            if (idx == this.itemIndex) {
                If.branchId(0);
                Image.create(item.selected);
                Image.width(this.model.getSize());
                Image.height(this.model.getSize());
            }
            else {
                If.branchId(1);
                Image.create(item.normal);
                Image.width(this.model.getSize());
                Image.height(this.model.getSize());
            }
            If.pop();
        }, (item: IconItem) => JSON.stringify(item));
        ForEach.pop();
        Row.pop();
        Flex.pop();
    }
    itemIndexChange() {
        this.model.getChangeListener()(this.itemIndex);
    }
}
export default IconIndicator;
