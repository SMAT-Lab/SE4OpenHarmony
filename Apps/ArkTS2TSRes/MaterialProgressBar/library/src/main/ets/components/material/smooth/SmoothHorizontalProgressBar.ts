interface SmoothHorizontalProgressBar_Params {
    speed?: number;
    strokeWidth?: number;
    separatorLength?: number;
    sectionsCount?: number;
    isReversed?: boolean;
    isMirror?: boolean;
    isGradients?: boolean;
    colors?: Color[];
    mWidth?: number;
    mHeight?: number;
    isStop?: boolean;
    curve?: Curve;
    isPocket?: boolean;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SmoothHorizontalProgressBar_" + ++__generate__Id;
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
import { MultiLine } from './MultiLine';
export class SmoothHorizontalProgressBar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__speed = new SynchedPropertySimpleOneWay(params.speed, this, "speed");
        this.__strokeWidth = new SynchedPropertySimpleOneWay(params.strokeWidth, this, "strokeWidth");
        this.__separatorLength = new SynchedPropertySimpleOneWay(params.separatorLength, this, "separatorLength");
        this.__sectionsCount = new SynchedPropertySimpleOneWay(params.sectionsCount, this, "sectionsCount");
        this.__isReversed = new SynchedPropertySimpleOneWay(params.isReversed, this, "isReversed");
        this.__isMirror = new SynchedPropertySimpleOneWay(params.isMirror, this, "isMirror");
        this.__isGradients = new SynchedPropertySimpleOneWay(params.isGradients, this, "isGradients");
        this.colors = [0x3e802f, 0xb23424, 0x427fed, 0xf4b400];
        this.mWidth = lpx2px(720);
        this.mHeight = 10;
        this.__isStop = new SynchedPropertySimpleOneWay(params.isStop, this, "isStop");
        this.__curve = new SynchedPropertySimpleOneWay(params.curve, this, "curve");
        this.isPocket = false;
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: SmoothHorizontalProgressBar_Params) {
        this.speed = params.speed;
        this.strokeWidth = params.strokeWidth;
        this.separatorLength = params.separatorLength;
        this.sectionsCount = params.sectionsCount;
        this.isReversed = params.isReversed;
        this.isMirror = params.isMirror;
        this.isGradients = params.isGradients;
        if (params.colors !== undefined) {
            this.colors = params.colors;
        }
        if (params.mWidth !== undefined) {
            this.mWidth = params.mWidth;
        }
        if (params.mHeight !== undefined) {
            this.mHeight = params.mHeight;
        }
        this.isStop = params.isStop;
        this.curve = params.curve;
        if (params.isPocket !== undefined) {
            this.isPocket = params.isPocket;
        }
    }
    aboutToBeDeleted() {
        this.__speed.aboutToBeDeleted();
        this.__strokeWidth.aboutToBeDeleted();
        this.__separatorLength.aboutToBeDeleted();
        this.__sectionsCount.aboutToBeDeleted();
        this.__isReversed.aboutToBeDeleted();
        this.__isMirror.aboutToBeDeleted();
        this.__isGradients.aboutToBeDeleted();
        this.__isStop.aboutToBeDeleted();
        this.__curve.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __speed: SynchedPropertySimpleOneWay<number>;
    get speed() {
        return this.__speed.get();
    }
    set speed(newValue: number) {
        this.__speed.set(newValue);
    }
    private __strokeWidth: SynchedPropertySimpleOneWay<number>;
    get strokeWidth() {
        return this.__strokeWidth.get();
    }
    set strokeWidth(newValue: number) {
        this.__strokeWidth.set(newValue);
    }
    private __separatorLength: SynchedPropertySimpleOneWay<number>; //间距
    get separatorLength() {
        return this.__separatorLength.get();
    }
    set separatorLength(newValue: number) {
        this.__separatorLength.set(newValue);
    }
    private __sectionsCount: SynchedPropertySimpleOneWay<number>; //线段数量
    get sectionsCount() {
        return this.__sectionsCount.get();
    }
    set sectionsCount(newValue: number) {
        this.__sectionsCount.set(newValue);
    }
    private __isReversed: SynchedPropertySimpleOneWay<boolean>; // 反转
    get isReversed() {
        return this.__isReversed.get();
    }
    set isReversed(newValue: boolean) {
        this.__isReversed.set(newValue);
    }
    private __isMirror: SynchedPropertySimpleOneWay<boolean>; // 镜像
    get isMirror() {
        return this.__isMirror.get();
    }
    set isMirror(newValue: boolean) {
        this.__isMirror.set(newValue);
    }
    private __isGradients: SynchedPropertySimpleOneWay<boolean>; // 渐变色
    get isGradients() {
        return this.__isGradients.get();
    }
    set isGradients(newValue: boolean) {
        this.__isGradients.set(newValue);
    }
    private colors: Color[]; //绿红蓝黄
    private mWidth: number;
    private mHeight: number;
    private __isStop: SynchedPropertySimpleOneWay<boolean>;
    get isStop() {
        return this.__isStop.get();
    }
    set isStop(newValue: boolean) {
        this.__isStop.set(newValue);
    }
    private __curve: SynchedPropertySimpleOneWay<Curve>;
    get curve() {
        return this.__curve.get();
    }
    set curve(newValue: Curve) {
        this.__curve.set(newValue);
    }
    private isPocket: boolean;
    aboutToAppear() {
        if (!this.height) {
            this.mHeight = this.strokeWidth;
        }
    }
    buildLine(parent = null) {
        let earlierCreatedChild_2: MultiLine = ((parent ? parent : this) && (parent ? parent : this).findChildById) ? (parent ? parent : this).findChildById(generateId()) as MultiLine : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new MultiLine("SmoothHorizontalProgressBar_" + __generate__Id, parent ? parent : this, {
                mWidth: this.mWidth,
                strokeWidth: this.strokeWidth,
                separatorLength: this.separatorLength,
                sectionsCount: Math.round(this.sectionsCount),
                speed: this.speed,
                reversed: this.isReversed,
                isStop: this.isStop,
                curve: this.__curve,
                colors: this.colors,
                isPocket: this.isPocket,
                isGradients: this.isGradients,
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                mWidth: this.mWidth,
                strokeWidth: this.strokeWidth,
                separatorLength: this.separatorLength,
                sectionsCount: Math.round(this.sectionsCount),
                speed: this.speed,
                reversed: this.isReversed,
                isStop: this.isStop,
                colors: this.colors,
                isPocket: this.isPocket,
                isGradients: this.isGradients
            });
            View.create(earlierCreatedChild_2);
        }
    }
    buildMultiLine(parent = null) {
        let earlierCreatedChild_3: MultiLine = ((parent ? parent : this) && (parent ? parent : this).findChildById) ? (parent ? parent : this).findChildById(generateId()) as MultiLine : undefined;
        if (earlierCreatedChild_3 == undefined) {
            View.create(new MultiLine("SmoothHorizontalProgressBar_" + __generate__Id, parent ? parent : this, {
                isStop: this.isStop,
                mWidth: this.mWidth / 2,
                strokeWidth: this.strokeWidth,
                separatorLength: this.separatorLength,
                sectionsCount: Math.round(this.sectionsCount),
                speed: this.speed,
                reversed: this.isReversed,
                curve: this.__curve,
                colors: this.colors,
                isPocket: this.isPocket,
                isGradients: this.isGradients,
            }));
        }
        else {
            earlierCreatedChild_3.updateWithValueParams({
                isStop: this.isStop,
                mWidth: this.mWidth / 2,
                strokeWidth: this.strokeWidth,
                separatorLength: this.separatorLength,
                sectionsCount: Math.round(this.sectionsCount),
                speed: this.speed,
                reversed: this.isReversed,
                colors: this.colors,
                isPocket: this.isPocket,
                isGradients: this.isGradients
            });
            View.create(earlierCreatedChild_3);
        }
        let earlierCreatedChild_4: MultiLine = ((parent ? parent : this) && (parent ? parent : this).findChildById) ? (parent ? parent : this).findChildById(generateId()) as MultiLine : undefined;
        if (earlierCreatedChild_4 == undefined) {
            View.create(new MultiLine("SmoothHorizontalProgressBar_" + __generate__Id, parent ? parent : this, {
                isStop: this.isStop,
                mWidth: this.mWidth / 2,
                strokeWidth: this.strokeWidth,
                separatorLength: this.separatorLength,
                sectionsCount: Math.round(this.sectionsCount),
                speed: this.speed,
                reversed: !this.isReversed,
                curve: this.__curve,
                colors: this.colors,
                isPocket: this.isPocket,
                isGradients: this.isGradients,
            }));
        }
        else {
            earlierCreatedChild_4.updateWithValueParams({
                isStop: this.isStop,
                mWidth: this.mWidth / 2,
                strokeWidth: this.strokeWidth,
                separatorLength: this.separatorLength,
                sectionsCount: Math.round(this.sectionsCount),
                speed: this.speed,
                reversed: !this.isReversed,
                colors: this.colors,
                isPocket: this.isPocket,
                isGradients: this.isGradients
            });
            View.create(earlierCreatedChild_4);
        }
    }
    render() {
        Row.create({ space: 0 });
        Row.width(px2vp(this.mWidth));
        Row.height(this.mHeight);
        If.create();
        if (this.isMirror) {
            If.branchId(0);
            let earlierCreatedChild_5: MultiLine = (this && this.findChildById) ? this.findChildById("5") as MultiLine : undefined;
            if (earlierCreatedChild_5 == undefined) {
                View.create(new MultiLine("5", this, {
                    isStop: this.isStop,
                    mWidth: this.mWidth / 2,
                    strokeWidth: this.strokeWidth,
                    separatorLength: this.separatorLength,
                    sectionsCount: Math.round(this.sectionsCount),
                    speed: this.speed,
                    reversed: this.isReversed,
                    curve: this.__curve,
                    colors: this.colors,
                    isPocket: this.isPocket,
                    isGradients: this.isGradients,
                }));
            }
            else {
                earlierCreatedChild_5.updateWithValueParams({
                    isStop: this.isStop,
                    mWidth: this.mWidth / 2,
                    strokeWidth: this.strokeWidth,
                    separatorLength: this.separatorLength,
                    sectionsCount: Math.round(this.sectionsCount),
                    speed: this.speed,
                    reversed: this.isReversed,
                    colors: this.colors,
                    isPocket: this.isPocket,
                    isGradients: this.isGradients
                });
                View.create(earlierCreatedChild_5);
            }
            let earlierCreatedChild_6: MultiLine = (this && this.findChildById) ? this.findChildById("6") as MultiLine : undefined;
            if (earlierCreatedChild_6 == undefined) {
                View.create(new MultiLine("6", this, {
                    isStop: this.isStop,
                    mWidth: this.mWidth / 2,
                    strokeWidth: this.strokeWidth,
                    separatorLength: this.separatorLength,
                    sectionsCount: Math.round(this.sectionsCount),
                    speed: this.speed,
                    reversed: !this.isReversed,
                    curve: this.__curve,
                    colors: this.colors,
                    isPocket: this.isPocket,
                    isGradients: this.isGradients,
                }));
            }
            else {
                earlierCreatedChild_6.updateWithValueParams({
                    isStop: this.isStop,
                    mWidth: this.mWidth / 2,
                    strokeWidth: this.strokeWidth,
                    separatorLength: this.separatorLength,
                    sectionsCount: Math.round(this.sectionsCount),
                    speed: this.speed,
                    reversed: !this.isReversed,
                    colors: this.colors,
                    isPocket: this.isPocket,
                    isGradients: this.isGradients
                });
                View.create(earlierCreatedChild_6);
            }
        }
        else {
            If.branchId(1);
            let earlierCreatedChild_7: MultiLine = (this && this.findChildById) ? this.findChildById("7") as MultiLine : undefined;
            if (earlierCreatedChild_7 == undefined) {
                View.create(new MultiLine("7", this, {
                    mWidth: this.mWidth,
                    strokeWidth: this.strokeWidth,
                    separatorLength: this.separatorLength,
                    sectionsCount: Math.round(this.sectionsCount),
                    speed: this.speed,
                    reversed: this.isReversed,
                    isStop: this.isStop,
                    curve: this.__curve,
                    colors: this.colors,
                    isPocket: this.isPocket,
                    isGradients: this.isGradients,
                }));
            }
            else {
                earlierCreatedChild_7.updateWithValueParams({
                    mWidth: this.mWidth,
                    strokeWidth: this.strokeWidth,
                    separatorLength: this.separatorLength,
                    sectionsCount: Math.round(this.sectionsCount),
                    speed: this.speed,
                    reversed: this.isReversed,
                    isStop: this.isStop,
                    colors: this.colors,
                    isPocket: this.isPocket,
                    isGradients: this.isGradients
                });
                View.create(earlierCreatedChild_7);
            }
        }
        If.pop();
        Row.pop();
    }
}
