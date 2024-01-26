interface AnotherSample_Params {
    model?: SVGImageView.SVGImageViewModel;
    red?: string;
    orange?: string;
    clickCount?;
    stroke_width?: number;
    stroke_color?;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "AnotherSample_" + ++__generate__Id;
}
/**
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
import { SVGImageView } from '@ohos/svg';
export class AnotherSample extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model = new ObservedPropertyObject(new SVGImageView.SVGImageViewModel(), this, "model");
        this.red = '#fd0505';
        this.orange = '#ffecda';
        this.clickCount = 1;
        this.stroke_width = 15;
        this.stroke_color = '#ffffff';
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: AnotherSample_Params) {
        if (params.model !== undefined) {
            this.model = params.model;
        }
        if (params.red !== undefined) {
            this.red = params.red;
        }
        if (params.orange !== undefined) {
            this.orange = params.orange;
        }
        if (params.clickCount !== undefined) {
            this.clickCount = params.clickCount;
        }
        if (params.stroke_width !== undefined) {
            this.stroke_width = params.stroke_width;
        }
        if (params.stroke_color !== undefined) {
            this.stroke_color = params.stroke_color;
        }
    }
    aboutToBeDeleted() {
        this.__model.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model: ObservedPropertyObject<SVGImageView.SVGImageViewModel>;
    get model() {
        return this.__model.get();
    }
    set model(newValue: SVGImageView.SVGImageViewModel) {
        this.__model.set(newValue);
    }
    private red: string;
    private orange: string;
    private clickCount;
    private stroke_width: number;
    private stroke_color;
    aboutToAppear() {
        this.model.setImageRawfile('peach.svg');
    }
    render() {
        Stack.create({ alignContent: Alignment.Top });
        Stack.height("100%");
        Stack.padding({ top: 40 });
        Stack.margin({ bottom: 20 });
        Text.create("Another  line drawing example.\nTap to restart line.");
        Text.fontSize(14);
        Text.fontColor("#333333");
        Text.pop();
        Stack.create();
        Stack.scale({ x: 0.6, y: 0.6 });
        Stack.onClick(() => {
            this.clickCount++;
            if (this.clickCount % 2 == 0) {
                this.model.setCSS(".peach { stroke: " + this.red + "; stroke-width: " + this.stroke_width + "; fill:" + this.red + "; }");
            }
            else {
                this.model.setCSS(".peach { stroke: " + this.stroke_color + "; stroke-width: " + this.stroke_width + "; fill:" + this.orange + "; }");
            }
        });
        Stack.pop();
        Stack.pop();
    }
}
loadDocument(new AnotherSample("1", undefined, {}));
