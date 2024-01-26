interface SmoothCircularProgressBar_Params {
    progress?: number;
    barColor?: Color;
    barColors?: Color[];
    barColorsIndex?: number;
    strokeWidth?: number;
    radius?: number;
    spinSpeed?: number;
    angle?: number;
    progressStart?: boolean;
    progressVisible?: Visibility;
    curve?: Curve;
    curves?: ICurve;
    curveTime?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "SmoothCircularProgressBar_" + ++__generate__Id;
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
import { CircularComponent } from '../core/CircularComponent';
import CurvesFactor from '@ohos.curves';
export class SmoothCircularProgressBar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__progress = new ObservedPropertySimple(0, this, "progress");
        this.__barColor = new ObservedPropertySimple(0x3e802f, this, "barColor");
        this.barColors = [0x3e802f, 0xf4b400, 0x427fed, 0xb23424];
        this.barColorsIndex = 0;
        this.__strokeWidth = new SynchedPropertySimpleOneWay(params.strokeWidth, this, "strokeWidth");
        this.__radius = new ObservedPropertySimple(20, this, "radius");
        this.spinSpeed = 1;
        this.__angle = new ObservedPropertySimple(10, this, "angle");
        this.__progressStart = new SynchedPropertySimpleOneWay(params.progressStart, this, "progressStart");
        this.__progressVisible = new ObservedPropertySimple(Visibility.Visible, this, "progressVisible");
        this.__curve = new SynchedPropertySimpleOneWay(params.curve, this, "curve");
        this.curves = CurvesFactor.initCurve(this.curve);
        this.curveTime = 0.0;
        this.updateWithValueParams(params);
        this.declareWatch("curve", this.watchCurve);
    }
    updateWithValueParams(params: SmoothCircularProgressBar_Params) {
        if (params.progress !== undefined) {
            this.progress = params.progress;
        }
        if (params.barColor !== undefined) {
            this.barColor = params.barColor;
        }
        if (params.barColors !== undefined) {
            this.barColors = params.barColors;
        }
        if (params.barColorsIndex !== undefined) {
            this.barColorsIndex = params.barColorsIndex;
        }
        this.strokeWidth = params.strokeWidth;
        if (params.radius !== undefined) {
            this.radius = params.radius;
        }
        if (params.spinSpeed !== undefined) {
            this.spinSpeed = params.spinSpeed;
        }
        if (params.angle !== undefined) {
            this.angle = params.angle;
        }
        this.progressStart = params.progressStart;
        if (params.progressVisible !== undefined) {
            this.progressVisible = params.progressVisible;
        }
        this.curve = params.curve;
        if (params.curves !== undefined) {
            this.curves = params.curves;
        }
        if (params.curveTime !== undefined) {
            this.curveTime = params.curveTime;
        }
    }
    aboutToBeDeleted() {
        this.__progress.aboutToBeDeleted();
        this.__barColor.aboutToBeDeleted();
        this.__strokeWidth.aboutToBeDeleted();
        this.__radius.aboutToBeDeleted();
        this.__angle.aboutToBeDeleted();
        this.__progressStart.aboutToBeDeleted();
        this.__progressVisible.aboutToBeDeleted();
        this.__curve.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __progress: ObservedPropertySimple<number>; //默认从0进度值开始
    get progress() {
        return this.__progress.get();
    }
    set progress(newValue: number) {
        this.__progress.set(newValue);
    }
    private __barColor: ObservedPropertySimple<Color>; //进度条默认为绿颜色
    get barColor() {
        return this.__barColor.get();
    }
    set barColor(newValue: Color) {
        this.__barColor.set(newValue);
    }
    private barColors: Color[]; //绿黄蓝红
    private barColorsIndex: number; //颜色组下标
    private __strokeWidth: SynchedPropertySimpleOneWay<number>; //默认宽度 介于0~12
    get strokeWidth() {
        return this.__strokeWidth.get();
    }
    set strokeWidth(newValue: number) {
        this.__strokeWidth.set(newValue);
    }
    private __radius: ObservedPropertySimple<number>; //默认半径
    get radius() {
        return this.__radius.get();
    }
    set radius(newValue: number) {
        this.__radius.set(newValue);
    }
    private spinSpeed: number; //默认速度
    private __angle: ObservedPropertySimple<number>; //默认角度
    get angle() {
        return this.__angle.get();
    }
    set angle(newValue: number) {
        this.__angle.set(newValue);
    }
    private __progressStart: SynchedPropertySimpleOneWay<boolean>; //进度条运动的开始或结束，true表示开始，false表示结束
    get progressStart() {
        return this.__progressStart.get();
    }
    set progressStart(newValue: boolean) {
        this.__progressStart.set(newValue);
    }
    private __progressVisible: ObservedPropertySimple<Visibility>; //显隐控制
    get progressVisible() {
        return this.__progressVisible.get();
    }
    set progressVisible(newValue: Visibility) {
        this.__progressVisible.set(newValue);
    }
    private __curve: SynchedPropertySimpleOneWay<Curve>;
    get curve() {
        return this.__curve.get();
    }
    set curve(newValue: Curve) {
        this.__curve.set(newValue);
    }
    private curves: ICurve; //创建对应曲线
    private curveTime: number;
    private watchCurve() {
        try {
            this.curves = CurvesFactor.initCurve(this.curve);
        }
        catch (err) {
            console.warn(`----> watchCurve err:${err.message} -> ${err.toString()}`);
        }
    }
    private updateCurve() {
        this.curveTime += 0.01 * this.spinSpeed;
        if (this.curveTime > 1) {
            this.curveTime = 0;
            setTimeout(() => {
                this.barColor = this.getRandomColor();
            }, 100);
            this.progress = 0;
        }
        try {
            let tmp = Math.min(1, this.curveTime);
            this.progress = this.curves.interpolate(tmp) * 100;
        }
        catch (err) {
            console.warn(`---->curves.interpolate err ${JSON.stringify(err.message)}`);
        }
    }
    aboutToAppear() {
        try {
            this.curves = CurvesFactor.initCurve(this.curve);
            console.warn(`----> aboutToAppear CurvesFactor ${this.curve} ${this.curves}`);
        }
        catch (err) {
            console.warn(`----> aboutToAppear err:${err.message} -> ${err.toString()}`);
        }
        setInterval(() => {
            //显隐控制
            if (this.progressStart == false) {
                this.progressVisible = Visibility.Hidden;
            }
            else {
                this.progressVisible = Visibility.Visible;
            }
            this.updateCurve();
            this.angle = (this.angle + this.spinSpeed * 2) % 360;
        }, 10);
    }
    //获取随机颜色
    private getRandomColor(): Color {
        ++this.barColorsIndex;
        let index = this.barColorsIndex % this.barColors.length;
        if (this.barColorsIndex >= this.barColors.length) {
            this.barColorsIndex = 0;
        }
        return this.barColors[index];
    }
    render() {
        Stack.create();
        Stack.width(60);
        Stack.height(60);
        Stack.visibility(this.progressVisible);
        let earlierCreatedChild_2: CircularComponent = (this && this.findChildById) ? this.findChildById("2") as CircularComponent : undefined;
        if (earlierCreatedChild_2 == undefined) {
            View.create(new CircularComponent("2", this, {
                progress: this.progress,
                color: this.barColor,
                strokeWidth: this.strokeWidth,
                radius: this.radius,
                angle: this.angle,
                secondProgress: 0
            }));
        }
        else {
            earlierCreatedChild_2.updateWithValueParams({
                progress: this.progress,
                color: this.barColor,
                strokeWidth: this.strokeWidth,
                radius: this.radius,
                angle: this.angle,
                secondProgress: 0
            });
            View.create(earlierCreatedChild_2);
        }
        Stack.pop();
    }
}
