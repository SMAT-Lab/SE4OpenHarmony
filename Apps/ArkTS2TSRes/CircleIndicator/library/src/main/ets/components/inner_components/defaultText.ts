interface DefaultText_Params {
    index?: number;
    itemIndex?: number;
    model?: MagicScrollTabsModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "defaultText_" + ++__generate__Id;
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
import { MagicScrollTabsModel } from "../../models/MagicScrollTabsModel";
class DefaultText extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.index = 0;
        this.__itemIndex = new SynchedPropertySimpleTwoWay(params.itemIndex, this, "itemIndex");
        this.__model = new ObservedPropertyObject(new MagicScrollTabsModel(null), this, "model");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: DefaultText_Params) {
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
    }
    aboutToBeDeleted() {
        this.__itemIndex.aboutToBeDeleted();
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private index: number;
    private __itemIndex: SynchedPropertySimpleTwoWay<number>;
    get itemIndex() {
        return this.__itemIndex.get();
    }
    set itemIndex(newValue: number) {
        this.__itemIndex.set(newValue);
    }
    private __model: ObservedPropertyObject<MagicScrollTabsModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: MagicScrollTabsModel) {
        this.__model.set(newValue);
    }
    render() {
        Text.create(this.model.getTitles()[this.index]);
        Text.fontSize(this.index == this.itemIndex ? (this.model.getSelectedTextSize() ? this.model.getSelectedTextSize() : this.model.getUnselectedTextSize()) : this.model.getUnselectedTextSize());
        Text.fontColor(this.index == this.itemIndex ? this.model.getSelectedTextColor() : this.model.getUnselectedTextColor());
        Text.pop();
    }
}
export default DefaultText;
