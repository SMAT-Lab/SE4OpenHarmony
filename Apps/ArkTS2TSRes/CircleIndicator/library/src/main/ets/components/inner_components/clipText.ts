interface ClipText_Params {
    index?: number;
    itemIndex?: number;
    indicatorOffset?: number;
    model?: MagicScrollTabsModel;
    method?: ClipText.Method;
    rect?: RectAttribute;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "clipText_" + ++__generate__Id;
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
class ClipText extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.index = 0;
        this.__itemIndex = new SynchedPropertySimpleTwoWay(params.itemIndex, this, "itemIndex");
        this.__indicatorOffset = new ObservedPropertySimple(0, this, "indicatorOffset");
        this.__model = new ObservedPropertyObject(new MagicScrollTabsModel(null), this, "model");
        this.__method = new ObservedPropertyObject(new ClipText.Method(), this, "method");
        this.__rect = new ObservedPropertyObject(new Rect({
            width: "0%",
            height: "100%"
        }), this, "rect");
        this.updateWithValueParams(params);
        this.declareWatch("itemIndex", this.rectChange);
        this.declareWatch("indicatorOffset", this.rectChange);
        this.declareWatch("model", this.rectChange);
    }
    updateWithValueParams(params: ClipText_Params) {
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
        if (params.rect !== undefined) {
            this.rect = params.rect;
        }
    }
    aboutToBeDeleted() {
        this.__itemIndex.aboutToBeDeleted();
        this.__indicatorOffset.aboutToBeDeleted();
        this.__model.aboutToBeDeleted();
        this.__method.aboutToBeDeleted();
        this.__rect.aboutToBeDeleted();
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
    private __method: ObservedPropertyObject<ClipText.Method>;
    get method() {
        return this.__method.get();
    }
    set method(newValue: ClipText.Method) {
        this.__method.set(newValue);
    }
    private __rect: ObservedPropertyObject<RectAttribute>;
    get rect() {
        return this.__rect.get();
    }
    set rect(newValue: RectAttribute) {
        this.__rect.set(newValue);
    }
    rectChange() {
        this.rect = new Rect({
            width: this.method.clipFontWidth(this.model, this.index, this.itemIndex, false, this.indicatorOffset),
            height: "100%"
        });
    }
    render() {
        Stack.create();
        Text.create(this.model.getTitles()[this.index]);
        Text.fontSize(this.index == this.itemIndex ? (this.model.getSelectedTextSize() ? this.model.getSelectedTextSize() : this.model.getUnselectedTextSize()) : this.model.getUnselectedTextSize());
        Text.fontColor(this.method.clipFontColor(ObservedObject.GetRawObject(this.model), this.index, this.itemIndex, true, this.indicatorOffset));
        Text.pop();
        Text.create(this.model.getTitles()[this.index]);
        Text.fontSize(this.index == this.itemIndex ? (this.model.getSelectedTextSize() ? this.model.getSelectedTextSize() : this.model.getUnselectedTextSize()) : this.model.getUnselectedTextSize());
        Text.fontColor(this.method.clipFontColor(ObservedObject.GetRawObject(this.model), this.index, this.itemIndex, true, this.indicatorOffset));
        Text.clip(ObservedObject.GetRawObject(this.rect));
        Text.pop();
        Stack.pop();
    }
}
namespace ClipText {
    export class Method {
        clipFontColor(model: MagicScrollTabsModel, index: number, itemIndex: number, isBack: boolean, indicatorOffset: number): ResourceColor {
            let offset = indicatorOffset;
            let titles = model.getTitles();
            let textColor = model.getUnselectedTextColor();
            let selectedTextColor = model.getSelectedTextColor();
            if (index == itemIndex) {
                if (isBack) {
                    if (itemIndex <= titles.length - 1 && offset <= 0) {
                        return selectedTextColor;
                    }
                }
                else {
                    if (itemIndex <= titles.length - 1 && offset <= 0) {
                        return textColor;
                    }
                    return selectedTextColor;
                }
            }
            else if (itemIndex > 0 && index == itemIndex - 1 && offset > 0 && isBack) {
                return selectedTextColor;
            }
            else if (itemIndex < titles.length - 1 && index == itemIndex + 1 && offset < 0 && !isBack) {
                return selectedTextColor;
            }
            return textColor;
        }
        clipFontWidth(model: MagicScrollTabsModel, index: number, itemIndex: number, isBack: boolean, indicatorOffset: number): string {
            let offset = indicatorOffset / model.getViewWidth();
            let titles = model.getTitles();
            if (index == itemIndex && !isBack) {
                if (itemIndex < titles.length - 1 && offset < 0) {
                    return -offset * 100 + "%";
                }
                else if (itemIndex > 0 && offset > 0) {
                    return (1 - offset) * 100 + "%";
                }
            }
            else if (itemIndex > 0 && index == itemIndex - 1 && offset > 0 && !isBack) {
                if (itemIndex > 0 && offset > 0) {
                    return (1 - offset) * 100 + "%";
                }
            }
            else if (itemIndex < titles.length - 1 && index == itemIndex + 1 && offset < 0 && !isBack) {
                return -offset * 100 + "%";
            }
            return "100%";
        }
    }
}
export default ClipText;
