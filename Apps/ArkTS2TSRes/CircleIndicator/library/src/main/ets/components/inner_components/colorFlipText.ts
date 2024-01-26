interface ColorFlipText_Params {
    index?: number;
    itemIndex?: number;
    indicatorOffset?: number;
    model?: MagicScrollTabsModel;
    method?: ColorFlipText.Method;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "colorFlipText_" + ++__generate__Id;
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
class ColorFlipText extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.index = 0;
        this.__itemIndex = new SynchedPropertySimpleTwoWay(params.itemIndex, this, "itemIndex");
        this.__indicatorOffset = new ObservedPropertySimple(0, this, "indicatorOffset");
        this.__model = new ObservedPropertyObject(new MagicScrollTabsModel(null), this, "model");
        this.__method = new ObservedPropertyObject(new ColorFlipText.Method(), this, "method");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ColorFlipText_Params) {
        if (params.index !== undefined) {
            this.index = params.index;
        }
        if (params.indicatorOffset !== undefined) {
            this.indicatorOffset = params.indicatorOffset;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.method !== undefined) {
            this.method = params.method;
        }
    }
    aboutToBeDeleted() {
        this.__itemIndex.aboutToBeDeleted();
        this.__indicatorOffset.aboutToBeDeleted();
        this.__model.aboutToBeDeleted();
        this.__method.aboutToBeDeleted();
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
    private __indicatorOffset: ObservedPropertySimple<number>;
    get indicatorOffset() {
        return this.__indicatorOffset.get();
    }
    set indicatorOffset(newValue: number) {
        this.__indicatorOffset.set(newValue);
    }
    private __model: ObservedPropertyObject<MagicScrollTabsModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: MagicScrollTabsModel) {
        this.__model.set(newValue);
    }
    private __method: ObservedPropertyObject<ColorFlipText.Method>;
    get method() {
        return this.__method.get();
    }
    set method(newValue: ColorFlipText.Method) {
        this.__method.set(newValue);
    }
    render() {
        Text.create(this.model.getTitles()[this.index]);
        Text.fontSize(this.method.comFontSize(ObservedObject.GetRawObject(this.model), this.index, this.itemIndex, this.indicatorOffset));
        Text.fontColor(this.method.comFontColor(ObservedObject.GetRawObject(this.model), this.index, this.itemIndex, this.indicatorOffset));
        Text.pop();
    }
}
namespace ColorFlipText {
    export class Method {
        comFontColor(model: MagicScrollTabsModel, index: number, itemIndex: number, indicatorOffset: number): ResourceColor {
            let offset = indicatorOffset / model.getViewWidth();
            let textColor = model.getUnselectedTextColor();
            let selectedTextColor = model.getSelectedTextColor();
            let titles = model.getTitles();
            if (index == itemIndex
                && !((itemIndex > 0 && offset > 0.5)
                    || (itemIndex < titles.length - 1 && offset < -0.5))) {
                return selectedTextColor;
            }
            else if (itemIndex > 0 && index == itemIndex - 1 && offset > 0.5) {
                return selectedTextColor;
            }
            else if (itemIndex < titles.length - 1 && index == itemIndex + 1 && offset < -0.5) {
                return selectedTextColor;
            }
            return textColor;
        }
        comFontSize(model: MagicScrollTabsModel, index: number, itemIndex: number, indicatorOffset: number): number {
            let offset = indicatorOffset / model.getViewWidth();
            let textSize = model.getUnselectedTextSize();
            let selectedTextSize = model.getSelectedTextSize();
            let titles = model.getTitles();
            if (selectedTextSize) {
                if (index == itemIndex
                    && !((itemIndex > 0 && offset > 0.5)
                        || (itemIndex < titles.length - 1 && offset < -0.5))) {
                    return selectedTextSize;
                }
                else if (itemIndex > 0 && index == itemIndex - 1 && offset > 0.5) {
                    return selectedTextSize;
                }
                else if (itemIndex < titles.length - 1 && index == itemIndex + 1 && offset < -0.5) {
                    return selectedTextSize;
                }
            }
            return textSize;
        }
    }
}
export default ColorFlipText;
