interface AutofitTextView_Params {
    model?: AutofitTextView.Model;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AutofitTextView_" + ++__generate__Id;
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
import { TypedValue } from './TypedValue';
class AutofitTextView extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new SynchedPropertyObjectTwoWay(params.model, this, "model");
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AutofitTextView_Params) {
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: SynchedPropertySimpleOneWay<AutofitTextView.Model>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: AutofitTextView.Model) {
        this.__model.set(newValue);
    }
    render() {
        Text.create(this.model.content);
        Text.fontSize(this.model.textSize);
        Text.minFontSize(this.model.minTextSize);
        Text.maxFontSize(this.model.maxTextSize);
        Text.maxLines(this.model.maxLines);
        Text.textAlign(TextAlign.Center);
        Text.backgroundColor(this.model.backgroundColor);
        Text.width(this.model.width);
        Text.textOverflow({ overflow: this.model.overFlow });
        Text.pop();
    }
}
namespace AutofitTextView {
    export class Model {
        textSize: any = 20;
        minTextSize: any = 10;
        maxTextSize: any = 40;
        maxLines: number = 1;
        content: string = '';
        width: string = '100%';
        isEnabled: boolean = true;
        precision: number = 10;
        mMaxTextSize: number = 40;
        mMinTextSize: number = 20;
        backgroundColor: number = 0XFFFFFF;
        overFlow: TextOverflow = TextOverflow.Clip;
        setTextSize(size: number, unit?: number): Model {
            if (unit == undefined) {
                this.textSize = size;
            }
            else if (unit == TypedValue.COMPLEX_UNIT_PX) {
                this.textSize = size + 'px';
            }
            else if (unit == TypedValue.COMPLEX_UNIT_FP) {
                this.textSize = size + 'fp';
            }
            return this;
        }
        setMaxLines(lines: number): Model {
            this.maxLines = lines;
            return this;
        }
        setBackgroundColor(color: number): Model {
            this.backgroundColor = color;
            return this;
        }
        setTextOverflow(flow: number): Model {
            this.overFlow = flow;
            return this;
        }
        setText(text: string): Model {
            this.content = text;
            return this;
        }
        setWidth(width: string): Model {
            this.width = width;
            return this;
        }
        public isSizeToFit(): boolean {
            return this.isEnabled;
        }
        public setSizeToFit(sizeToFit: boolean): Model {
            this.isEnabled = sizeToFit;
            return this;
        }
        public getMaxTextSize(): number {
            return this.mMaxTextSize;
        }
        public setMaxTextSize(maxSize: number, unit?: number): Model {
            this.mMaxTextSize = maxSize;
            if (unit == undefined) {
                this.maxTextSize = maxSize;
            }
            else if (unit == TypedValue.COMPLEX_UNIT_PX) {
                this.maxTextSize = maxSize + 'px';
            }
            else if (unit == TypedValue.COMPLEX_UNIT_FP) {
                this.maxTextSize = maxSize + 'fp';
            }
            return this;
        }
        public getMinTextSize(): number {
            return this.mMinTextSize;
        }
        public setMinTextSize(minSize: number, unit?: number): Model {
            this.mMinTextSize = minSize;
            if (unit == undefined) {
                this.minTextSize = minSize;
            }
            else if (unit == TypedValue.COMPLEX_UNIT_PX) {
                this.minTextSize = minSize + 'px';
            }
            else if (unit == TypedValue.COMPLEX_UNIT_FP) {
                this.minTextSize = minSize + 'fp';
            }
            return this;
        }
        public getPrecision(): number {
            return this.precision;
        }
        public setPrecision(precision: number): Model {
            this.precision = precision;
            return this;
        }
        public onTextSizeChange(textSize: number, oldTextSize: number): void {
            // do nothing
        }
    }
}
export { AutofitTextView };
