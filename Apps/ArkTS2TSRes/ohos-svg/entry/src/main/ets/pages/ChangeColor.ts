interface ChangeColor_Params {
    model1?: SVGImageView.SVGImageViewModel;
    red?: string;
    green?: string;
    clickCount?;
    stroke_width?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "ChangeColor_" + ++__generate__Id;
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
export class ChangeColor extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__model1 = new ObservedPropertyObject(new SVGImageView.SVGImageViewModel(), this, "model1");
        this.red = '#fd0505';
        this.green = '#00583b';
        this.clickCount = 1;
        this.stroke_width = 15;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: ChangeColor_Params) {
        if (params.model1 !== undefined) {
            this.model1 = params.model1;
        }
        if (params.red !== undefined) {
            this.red = params.red;
        }
        if (params.green !== undefined) {
            this.green = params.green;
        }
        if (params.clickCount !== undefined) {
            this.clickCount = params.clickCount;
        }
        if (params.stroke_width !== undefined) {
            this.stroke_width = params.stroke_width;
        }
    }
    aboutToBeDeleted() {
        this.__model1.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __model1: ObservedPropertyObject<SVGImageView.SVGImageViewModel>;
    get model1() {
        return this.__model1.get();
    }
    set model1(newValue: SVGImageView.SVGImageViewModel) {
        this.__model1.set(newValue);
    }
    private red: string;
    private green: string;
    private clickCount;
    private stroke_width: number;
    aboutToAppear() {
        this.model1.setImageRawfile('line.svg');
    }
    render() {
        Stack.create({ alignContent: Alignment.Top });
        Stack.height("100%");
        Stack.width('100%');
        Text.create("Tap either image to change its colours");
        Text.fontSize(14);
        Text.fontColor("#333333");
        Text.pop();
        Button.createWithLabel("点击变色");
        Button.fontSize(24);
        Button.position({ x: 50, y: 50 });
        Button.onClick(() => {
            console.info("songy  click...........");
            this.clickCount++;
            if (this.clickCount % 2 == 0) {
                this.model1.setCSS("#doodle { stroke: " + this.red + "; stroke-width: " + this.stroke_width + "; }");
            }
            else {
                this.model1.setCSS("#doodle { stroke: " + this.green + "; stroke-width: " + this.stroke_width + "; }");
            }
        });
        Button.pop();
        Stack.create();
        Stack.scale({ x: 0.7, y: 0.7 });
        Stack.height("100%");
        Stack.pop();
        Stack.pop();
    }
}
loadDocument(new ChangeColor("1", undefined, {}));
