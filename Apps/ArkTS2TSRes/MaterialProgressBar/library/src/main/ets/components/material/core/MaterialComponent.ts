interface MaterialComponent_Params {
    progress?: number;
    angle?: number;
    style?: MaterialProgressStyle;
    indeterminateAngle?: boolean;
    indeterminate?: boolean;
    radius?: number;
    color?: ResourceColor;
    secondColor?: ResourceColor;
    secondProgress?: number;
    bgColor?: ResourceColor;
    strokeWidth?: number;
    mOffset?: number;
    intervalId?: number;
    isAddProgress?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MaterialComponent_" + ++__generate__Id;
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
import { CircularComponent } from './CircularComponent';
import { HorizontalComponent } from './HorizontalComponent';
import { MaterialProgressStyle } from '../MaterialProgressStyle';
export class MaterialComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__progress = new ObservedPropertySimple(30, this, "progress");
        this.__angle = new ObservedPropertySimple(10, this, "angle");
        this.style = MaterialProgressStyle.MaterialHorizontal;
        this.indeterminateAngle = false;
        this.indeterminate = false;
        this.__radius = new ObservedPropertySimple(50, this, "radius");
        this.color = '#007DFF';
        this.secondColor = 0;
        this.__secondProgress = new ObservedPropertySimple(0, this, "secondProgress");
        this.bgColor = 0;
        this.__strokeWidth = new ObservedPropertySimple(8, this, "strokeWidth");
        this.__mOffset = new ObservedPropertySimple(0, this, "mOffset");
        this.intervalId = 0;
        this.isAddProgress = true;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MaterialComponent_Params) {
        if (params.progress !== undefined) {
            this.progress = params.progress;
        }
        if (params.angle !== undefined) {
            this.angle = params.angle;
        }
        if (params.style !== undefined) {
            this.style = params.style;
        }
        if (params.indeterminateAngle !== undefined) {
            this.indeterminateAngle = params.indeterminateAngle;
        }
        if (params.indeterminate !== undefined) {
            this.indeterminate = params.indeterminate;
        }
        if (params.radius !== undefined) {
            this.radius = params.radius;
        }
        if (params.color !== undefined) {
            this.color = params.color;
        }
        if (params.secondColor !== undefined) {
            this.secondColor = params.secondColor;
        }
        if (params.secondProgress !== undefined) {
            this.secondProgress = params.secondProgress;
        }
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
        if (params.strokeWidth !== undefined) {
            this.strokeWidth = params.strokeWidth;
        }
        if (params.mOffset !== undefined) {
            this.mOffset = params.mOffset;
        }
        if (params.intervalId !== undefined) {
            this.intervalId = params.intervalId;
        }
        if (params.isAddProgress !== undefined) {
            this.isAddProgress = params.isAddProgress;
        }
    }
    aboutToBeDeleted() {
        this.__progress.aboutToBeDeleted();
        this.__angle.aboutToBeDeleted();
        this.__radius.aboutToBeDeleted();
        this.__secondProgress.aboutToBeDeleted();
        this.__strokeWidth.aboutToBeDeleted();
        this.__mOffset.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __progress: ObservedPropertySimple<number>;
    get progress() {
        return this.__progress.get();
    }
    set progress(newValue: number) {
        this.__progress.set(newValue);
    }
    private __angle: ObservedPropertySimple<number>;
    get angle() {
        return this.__angle.get();
    }
    set angle(newValue: number) {
        this.__angle.set(newValue);
    }
    private style: MaterialProgressStyle;
    private indeterminateAngle: boolean;
    private indeterminate: boolean;
    private __radius: ObservedPropertySimple<number>;
    get radius() {
        return this.__radius.get();
    }
    set radius(newValue: number) {
        this.__radius.set(newValue);
    }
    private color: ResourceColor; //0x029789
    private secondColor: ResourceColor;
    private __secondProgress: ObservedPropertySimple<number>;
    get secondProgress() {
        return this.__secondProgress.get();
    }
    set secondProgress(newValue: number) {
        this.__secondProgress.set(newValue);
    }
    private bgColor: ResourceColor;
    private __strokeWidth: ObservedPropertySimple<number>;
    get strokeWidth() {
        return this.__strokeWidth.get();
    }
    set strokeWidth(newValue: number) {
        this.__strokeWidth.set(newValue);
    }
    private __mOffset: ObservedPropertySimple<number>;
    get mOffset() {
        return this.__mOffset.get();
    }
    set mOffset(newValue: number) {
        this.__mOffset.set(newValue);
    }
    private intervalId: number;
    private isAddProgress: boolean;
    aboutToAppear() {
        if (this.indeterminate || this.indeterminateAngle) {
            this.intervalId = setInterval(() => {
                if (this.style == MaterialProgressStyle.MaterialCircular) {
                    this.updateCircular();
                }
                else {
                    this.updateHorizontal();
                }
            }, 30);
        }
    }
    aboutToDisappear() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
    private updateHorizontal() {
        if (this.mOffset < 1000) {
            this.mOffset += 20;
            this.progress += 4;
        }
        else {
            this.mOffset = 0;
            this.progress = 0;
        }
    }
    private updateCircular() {
        if (this.indeterminateAngle) {
            this.angle = (this.angle + 5) % 360;
            if (this.indeterminate) {
                if (this.isAddProgress) {
                    this.progress = Math.min(100, this.progress + 2);
                }
                else {
                    this.progress = Math.max(0, (this.progress - 20));
                }
                if (this.progress == 100 || this.progress == 0) {
                    this.isAddProgress = !this.isAddProgress;
                }
            }
        }
        else {
            if (this.indeterminate) {
                this.progress = (this.progress + 2) % 100;
            }
        }
    }
    render() {
        If.create();
        if (this.indeterminateAngle) {
            If.branchId(0);
            If.create();
            if (this.style == MaterialProgressStyle.MaterialCircular) {
                If.branchId(0);
                Stack.create();
                Stack.width(this.radius * 2 + 4);
                Stack.height(this.radius * 2 + 4);
                let earlierCreatedChild_2: CircularComponent = (this && this.findChildById) ? this.findChildById("2") as CircularComponent : undefined;
                if (earlierCreatedChild_2 == undefined) {
                    View.create(new CircularComponent("2", this, {
                        progress: this.progress,
                        secondProgress: this.secondProgress,
                        color: this.color,
                        secondColor: this.secondColor,
                        bgColor: this.bgColor,
                        radius: this.radius,
                        strokeWidth: this.strokeWidth,
                        angle: this.angle
                    }));
                }
                else {
                    earlierCreatedChild_2.updateWithValueParams({
                        progress: this.progress,
                        secondProgress: this.secondProgress,
                        color: this.color,
                        secondColor: this.secondColor,
                        bgColor: this.bgColor,
                        radius: this.radius,
                        strokeWidth: this.strokeWidth,
                        angle: this.angle
                    });
                    View.create(earlierCreatedChild_2);
                }
                Stack.pop();
            }
            else if (this.style == MaterialProgressStyle.MaterialHorizontal) {
                If.branchId(1);
                Stack.create();
                let earlierCreatedChild_3: HorizontalComponent = (this && this.findChildById) ? this.findChildById("3") as HorizontalComponent : undefined;
                if (earlierCreatedChild_3 == undefined) {
                    View.create(new HorizontalComponent("3", this, {
                        mOffset: this.mOffset,
                        progress: this.progress,
                        secondProgress: this.secondProgress,
                        color: this.color,
                        secondColor: this.secondColor,
                        bgColor: this.bgColor,
                        strokeWidth: this.strokeWidth
                    }));
                }
                else {
                    earlierCreatedChild_3.updateWithValueParams({
                        mOffset: this.mOffset,
                        progress: this.progress,
                        secondProgress: this.secondProgress,
                        color: this.color,
                        secondColor: this.secondColor,
                        bgColor: this.bgColor,
                        strokeWidth: this.strokeWidth
                    });
                    View.create(earlierCreatedChild_3);
                }
                Stack.pop();
            }
            If.pop();
        }
        else {
            If.branchId(1);
            Stack.create();
            If.create();
            if (this.style == MaterialProgressStyle.MaterialCircular) {
                If.branchId(0);
                let earlierCreatedChild_4: CircularComponent = (this && this.findChildById) ? this.findChildById("4") as CircularComponent : undefined;
                if (earlierCreatedChild_4 == undefined) {
                    View.create(new CircularComponent("4", this, {
                        progress: this.progress,
                        secondProgress: this.secondProgress,
                        color: this.color,
                        secondColor: this.secondColor,
                        bgColor: this.bgColor,
                        radius: this.radius,
                        strokeWidth: this.strokeWidth,
                        angle: 0
                    }));
                }
                else {
                    earlierCreatedChild_4.updateWithValueParams({
                        progress: this.progress,
                        secondProgress: this.secondProgress,
                        color: this.color,
                        secondColor: this.secondColor,
                        bgColor: this.bgColor,
                        radius: this.radius,
                        strokeWidth: this.strokeWidth,
                        angle: 0
                    });
                    View.create(earlierCreatedChild_4);
                }
            }
            else if (this.style == MaterialProgressStyle.MaterialHorizontal) {
                If.branchId(1);
                let earlierCreatedChild_5: HorizontalComponent = (this && this.findChildById) ? this.findChildById("5") as HorizontalComponent : undefined;
                if (earlierCreatedChild_5 == undefined) {
                    View.create(new HorizontalComponent("5", this, {
                        progress: this.progress,
                        secondProgress: this.secondProgress,
                        color: this.color,
                        secondColor: this.secondColor,
                        bgColor: this.bgColor,
                        strokeWidth: this.strokeWidth,
                        mOffset: 0
                    }));
                }
                else {
                    earlierCreatedChild_5.updateWithValueParams({
                        progress: this.progress,
                        secondProgress: this.secondProgress,
                        color: this.color,
                        secondColor: this.secondColor,
                        bgColor: this.bgColor,
                        strokeWidth: this.strokeWidth,
                        mOffset: 0
                    });
                    View.create(earlierCreatedChild_5);
                }
            }
            If.pop();
            Stack.pop();
        }
        If.pop();
    }
}
