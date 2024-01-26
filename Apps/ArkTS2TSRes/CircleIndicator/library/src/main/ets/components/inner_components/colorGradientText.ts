interface ColorGradientText_Params {
    index?: number;
    indicatorOffset?: number;
    itemIndex?: number;
    model?: MagicScrollTabsModel;
    method?: ColorGradientText.Method;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "colorGradientText_" + ++__generate__Id;
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
class ColorGradientText extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.index = 0;
        this.__indicatorOffset = new ObservedPropertySimple(0, this, "indicatorOffset");
        this.__itemIndex = new SynchedPropertySimpleTwoWay(params.itemIndex, this, "itemIndex");
        this.__model = new ObservedPropertyObject(new MagicScrollTabsModel(null), this, "model");
        this.__method = new ObservedPropertyObject(new ColorGradientText.Method(), this, "method");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ColorGradientText_Params) {
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
        this.__indicatorOffset.aboutToBeDeleted();
        this.__itemIndex.aboutToBeDeleted();
        this.__model.aboutToBeDeleted();
        this.__method.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private index: number;
    private __indicatorOffset: ObservedPropertySimple<number>;
    get indicatorOffset() {
        return this.__indicatorOffset.get();
    }
    set indicatorOffset(newValue: number) {
        this.__indicatorOffset.set(newValue);
    }
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
    private __method: ObservedPropertyObject<ColorGradientText.Method>;
    get method() {
        return this.__method.get();
    }
    set method(newValue: ColorGradientText.Method) {
        this.__method.set(newValue);
    }
    render() {
        Text.create(this.model.getTitles()[this.index]);
        Text.fontSize(this.method.comFontSize(ObservedObject.GetRawObject(this.model), this.index, this.itemIndex, this.indicatorOffset));
        Text.fontColor(this.method.comFontColor(ObservedObject.GetRawObject(this.model), this.index, this.itemIndex, this.indicatorOffset));
        Text.pop();
    }
}
namespace ColorGradientText {
    export class Method {
        comFontColor(model: MagicScrollTabsModel, index: number, itemIndex: number, indicatorOffset: number): number | string {
            let offset = indicatorOffset / model.getViewWidth();
            let textColor = model.getUnselectedTextColor();
            let selectedTextColor = model.getSelectedTextColor();
            let titles = model.getTitles();
            if (index == itemIndex) {
                if ((itemIndex > 0 && offset > 0) || (itemIndex < titles.length - 1 && offset < 0)) {
                    return this.comHalfFontColor(textColor, selectedTextColor, Math.abs(offset));
                }
                return selectedTextColor;
            }
            else if (itemIndex > 0 && index == itemIndex - 1 && offset > 0) {
                return this.comHalfFontColor(textColor, selectedTextColor, 1 - Math.abs(offset));
            }
            else if (itemIndex < titles.length - 1 && index == itemIndex + 1 && offset < 0) {
                return this.comHalfFontColor(textColor, selectedTextColor, 1 - Math.abs(offset));
            }
            return textColor;
        }
        comFontSize(model: MagicScrollTabsModel, index: number, itemIndex: number, indicatorOffset: number): number {
            let offset = indicatorOffset / model.getViewWidth();
            let textSize = model.getUnselectedTextSize();
            let selectedTextSize = model.getSelectedTextSize();
            let titles = model.getTitles();
            if (selectedTextSize) {
                if (index == itemIndex) {
                    if ((itemIndex > 0 && offset > 0) || (itemIndex < titles.length - 1 && offset < 0)) {
                        return Math.abs(offset) * textSize + (1 - Math.abs(offset)) * selectedTextSize;
                    }
                    return selectedTextSize;
                }
                else if (itemIndex > 0 && index == itemIndex - 1 && offset > 0) {
                    return Math.abs(offset) * selectedTextSize + (1 - Math.abs(offset)) * textSize;
                }
                else if (itemIndex < titles.length - 1 && index == itemIndex + 1 && offset < 0) {
                    return Math.abs(offset) * selectedTextSize + (1 - Math.abs(offset)) * textSize;
                }
            }
            return textSize;
        }
        comHalfFontColor(textColor: string | number, selectedTextColor: string | number, offset: number): number | string {
            if (typeof selectedTextColor == "string") {
                selectedTextColor = selectedTextColor.substring(1);
                if (selectedTextColor.length == 6) {
                    selectedTextColor = "ff" + selectedTextColor;
                }
                selectedTextColor = Number.parseInt("0x" + selectedTextColor);
            }
            else if (selectedTextColor < 0x01000000) {
                selectedTextColor += 0xff000000;
            }
            if (typeof textColor == "string") {
                textColor = textColor.substring(1);
                if (textColor.length == 6) {
                    textColor = "ff" + textColor;
                }
                textColor = Number.parseInt("0x" + textColor);
            }
            else if (textColor < 0x01000000) {
                textColor += 0xff000000;
            }
            let halfFontColor = 0x0;
            for (let i = 0x0; i < 0x4; i++) {
                halfFontColor +=
                    Math.floor(Math.floor(selectedTextColor % (0x1 * (0x100 ** (i + 0x1))) / (0x1 * (0x100 ** i)))
                        * (1 - offset) + Math.floor(textColor % (0x1 * (0x100 ** (i + 0x1))) / (0x1 * (0x100 ** i))) * offset)
                        * (0x100 ** i);
            }
            let halfColor = halfFontColor.toString(16);
            while (halfColor.length < 8) {
                halfColor = "0" + halfColor;
            }
            return "#" + halfColor;
        }
    }
}
export default ColorGradientText;
