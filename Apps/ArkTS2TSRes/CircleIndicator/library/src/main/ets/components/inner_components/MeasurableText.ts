interface MeasurableText_Params {
    scroller?: Scroller;
    model?: MeasurableText.Model;
    text?: string;
    measured?: boolean;
    textWidth?: number;
    textHeight?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MeasurableText_" + ++__generate__Id;
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
import { evaluateTextHeight } from '../../utils/UiUtil';
class MeasurableText extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.scroller = new Scroller();
        this.__model = new ObservedPropertyObject(new MeasurableText.Model(), this, "model");
        this.__text = new SynchedPropertySimpleOneWay(params.text, this, "text");
        this.measured = false;
        this.__textWidth = new ObservedPropertySimple(0, this, "textWidth");
        this.__textHeight = new ObservedPropertySimple(0, this, "textHeight");
        this.updateWithValueParams(params);
        this.declareWatch("model", this.onTextChange);
        this.declareWatch("text", this.onTextChange);
    }
    updateWithValueParams(params: MeasurableText_Params) {
        if (params.scroller !== undefined) {
            this.scroller = params.scroller;
        }
        if (params.model !== undefined) {
            this.model = params.model;
        }
        this.text = params.text;
        if (params.measured !== undefined) {
            this.measured = params.measured;
        }
        if (params.textWidth !== undefined) {
            this.textWidth = params.textWidth;
        }
        if (params.textHeight !== undefined) {
            this.textHeight = params.textHeight;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        this.__text.aboutToBeDeleted();
        this.__textWidth.aboutToBeDeleted();
        this.__textHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private scroller: Scroller;
    private __model: ObservedPropertyObject<MeasurableText.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: MeasurableText.Model) {
        this.__model.set(newValue);
    }
    private __text: SynchedPropertySimpleOneWay<string>;
    get text() {
        return this.__text.get();
    }
    set text(newValue: string) {
        this.__text.set(newValue);
    }
    private measured: boolean;
    private __textWidth: ObservedPropertySimple<number>;
    get textWidth() {
        return this.__textWidth.get();
    }
    set textWidth(newValue: number) {
        this.__textWidth.set(newValue);
    }
    private __textHeight: ObservedPropertySimple<number>;
    get textHeight() {
        return this.__textHeight.get();
    }
    set textHeight(newValue: number) {
        this.__textHeight.set(newValue);
    }
    render() {
        Stack.create();
        Stack.enabled(false);
        Scroll.create(this.scroller);
        Scroll.enabled(false);
        Scroll.scrollable(ScrollDirection.Horizontal);
        Scroll.height(evaluateTextHeight(this.model.getFontSize()));
        Scroll.width(this.textWidth);
        Scroll.backgroundColor(this.model.getBackgroundColor());
        Scroll.onScroll((xOffset: number, yOffset: number) => {
            if (!this.measured) {
                this.scroller.scrollTo({
                    xOffset: '100%', yOffset: 0
                });
            }
        });
        Scroll.onScrollEnd(() => {
            if (this.textWidth !== this.scroller.currentOffset().xOffset) {
                this.textWidth = this.scroller.currentOffset().xOffset;
                this.measured = true;
                if (this.model.getMeasuredListener() !== undefined) {
                    this.model.getMeasuredListener()(this.model.key, this.textWidth, evaluateTextHeight(this.model.getFontSize()));
                }
            }
        });
        Scroll.scrollBar(BarState.Off);
        Row.create();
        Flex.create();
        Flex.width("100%");
        Flex.height("100%");
        Flex.pop();
        Stack.create();
        Text.create(this.text);
        Text.fontSize(this.model.getFontSize());
        Text.fontWeight(this.model.getFontWeight());
        Text.fontColor(this.model.getTextColor());
        Text.fontFamily(this.model.getFontFamily());
        Text.opacity(this.model.getCenterOffset());
        Text.pop();
        Text.create(this.text);
        Text.fontSize(this.model.getFontSize());
        Text.fontWeight(this.model.getFontWeight());
        Text.fontColor(this.model.getSelectedColor());
        Text.fontFamily(this.model.getFontFamily());
        Text.opacity(1 - this.model.getCenterOffset());
        Text.pop();
        Stack.pop();
        Row.pop();
        Scroll.pop();
        Stack.pop();
    }
    onTextChange() {
        this.scroller.scrollTo({
            xOffset: 360, yOffset: 0, //xOffset设为100%只有第一次有效，之后只能设一个极大坐标来滑到新的终点
        });
    }
}
namespace MeasurableText {
    export class Model {
        fontSize: number = 15;
        fontWeight: FontWeight = FontWeight.Normal;
        textColor: ResourceColor = 0xff000000;
        selectedColor: ResourceColor = 0xff000000;
        backgroundColor: ResourceColor = "#00ffffff";
        fontFamily: string = "sans-serif";
        centerOffset: number = 0;
        measuredListener: (key: any, width: number, height: number) => void = (key: any, width: number, height: number) => { };
        key: any = undefined;
        setFontSize(fontSize: number): Model {
            this.fontSize = fontSize;
            return this;
        }
        getFontSize(): number {
            return this.fontSize;
        }
        setFontWeight(fontWeight: FontWeight): Model {
            this.fontWeight = fontWeight;
            return this;
        }
        getFontWeight(): FontWeight {
            return this.fontWeight;
        }
        setTextColor(textColor: ResourceColor): Model {
            this.textColor = textColor;
            return this;
        }
        getTextColor(): ResourceColor {
            return this.textColor;
        }
        setSelectedColor(selectedColor: ResourceColor): Model {
            this.selectedColor = selectedColor;
            return this;
        }
        getSelectedColor(): ResourceColor {
            return this.selectedColor;
        }
        setBackgroundColor(backgroundColor: ResourceColor): Model {
            this.backgroundColor = backgroundColor;
            return this;
        }
        getBackgroundColor(): ResourceColor {
            return this.backgroundColor;
        }
        setFontFamily(fontFamily: string): Model {
            this.fontFamily = fontFamily;
            return this;
        }
        getFontFamily(): string {
            return this.fontFamily;
        }
        setCenterOffset(centerOffset: number): Model {
            this.centerOffset = Math.max(Math.min(centerOffset, 1), 0);
            return this;
        }
        getCenterOffset() {
            return this.centerOffset;
        }
        setMeasuredListener(measuredListener: (key: any, width: number, height: number) => void, key: any): Model {
            this.measuredListener = measuredListener;
            this.key = key;
            return this;
        }
        getMeasuredListener(): (key: any, width: number, height: number) => void {
            return this.measuredListener;
        }
    }
}
export default MeasurableText;
