interface MaterialProgressBar_Params {
    style?: number;
    modelBuild?: MaterialProgress.MaterialModel;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MaterialProgressBar_" + ++__generate__Id;
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
import { MaterialComponent } from './core/MaterialComponent';
import { MaterialProgressStyle } from './MaterialProgressStyle';
import { SmoothCircularProgressBar } from './smooth/SmoothCircularProgressBar';
import { SmoothHorizontalProgressBar } from './smooth/SmoothHorizontalProgressBar';
export class MaterialProgressBar extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__style = new ObservedPropertySimple(MaterialProgressStyle.MaterialCircular, this, "style");
        this.modelBuild = new MaterialProgress.MaterialModel();
        this.updateWithValueParams(params);
    }
    updateWithValueParams(params: MaterialProgressBar_Params) {
        if (params.style !== undefined) {
            this.style = params.style;
        }
        if (params.modelBuild !== undefined) {
            this.modelBuild = params.modelBuild;
        }
    }
    aboutToBeDeleted() {
        this.__style.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __style: ObservedPropertySimple<number>;
    get style() {
        return this.__style.get();
    }
    set style(newValue: number) {
        this.__style.set(newValue);
    }
    private modelBuild: MaterialProgress.MaterialModel;
    aboutToAppear() {
        this.modelBuild.isReversed = this.modelBuild.isReversed ? this.modelBuild.isReversed : false;
        this.modelBuild.isMirror = this.modelBuild.isMirror ? this.modelBuild.isMirror : false;
        this.modelBuild.isGradients = this.modelBuild.isGradients ? this.modelBuild.isGradients : false;
        this.modelBuild.isStop = this.modelBuild.isStop ? this.modelBuild.isStop : false;
        this.modelBuild.style = this.style ? this.style : MaterialProgressStyle.MaterialCircular;
        //
    }
    onPageShow() {
    }
    render() {
        If.create();
        if (this.modelBuild) {
            If.branchId(0);
            If.create();
            if (this.style == MaterialProgressStyle.MaterialCircular) {
                If.branchId(0);
                let earlierCreatedChild_2: MaterialComponent = (this && this.findChildById) ? this.findChildById("2") as MaterialComponent : undefined;
                if (earlierCreatedChild_2 == undefined) {
                    View.create(new MaterialComponent("2", this, this.modelBuild));
                }
                else {
                    earlierCreatedChild_2.updateWithValueParams({});
                    View.create(earlierCreatedChild_2);
                }
            }
            else if (this.style == MaterialProgressStyle.MaterialHorizontal) {
                If.branchId(1);
                let earlierCreatedChild_3: MaterialComponent = (this && this.findChildById) ? this.findChildById("3") as MaterialComponent : undefined;
                if (earlierCreatedChild_3 == undefined) {
                    View.create(new MaterialComponent("3", this, this.modelBuild));
                }
                else {
                    earlierCreatedChild_3.updateWithValueParams({});
                    View.create(earlierCreatedChild_3);
                }
            }
            else if (this.style == MaterialProgressStyle.SmoothCircular) {
                If.branchId(2);
                let earlierCreatedChild_4: SmoothCircularProgressBar = (this && this.findChildById) ? this.findChildById("4") as SmoothCircularProgressBar : undefined;
                if (earlierCreatedChild_4 == undefined) {
                    View.create(new SmoothCircularProgressBar("4", this, this.modelBuild));
                }
                else {
                    earlierCreatedChild_4.updateWithValueParams({});
                    View.create(earlierCreatedChild_4);
                }
            }
            else if (this.style == MaterialProgressStyle.SmoothHorizontal) {
                If.branchId(3);
                let earlierCreatedChild_5: SmoothHorizontalProgressBar = (this && this.findChildById) ? this.findChildById("5") as SmoothHorizontalProgressBar : undefined;
                if (earlierCreatedChild_5 == undefined) {
                    View.create(new SmoothHorizontalProgressBar("5", this, this.modelBuild));
                }
                else {
                    earlierCreatedChild_5.updateWithValueParams({});
                    View.create(earlierCreatedChild_5);
                }
            }
            else {
                If.branchId(4);
                Text.create('undefined');
                Text.fontSize(30);
                Text.pop();
            }
            If.pop();
        }
        If.pop();
    }
}
export namespace MaterialProgress {
    export class MaterialModel {
        isReversed?: boolean = false;
        isMirror?: boolean = false;
        isGradients?: boolean = false;
        isStop?: boolean = false;
        progress?: number = 30;
        angle?: number = 10;
        style?: MaterialProgressStyle = MaterialProgressStyle.MaterialHorizontal;
        indeterminateAngle?: boolean = false;
        indeterminate?: boolean = false;
        radius?: number = 50;
        color?: ResourceColor = '#007DFF'; //0x029789
        secondColor?: ResourceColor = 0;
        secondProgress?: number = 0;
        bgColor?: ResourceColor = 0;
        strokeWidth?: number = 8;
        isPocket?: boolean = false;
        colors?: Color[];
        speed?: number;
        separatorLength?: number;
        sectionsCount?: number;
        curve?: Curve;
        setSecondColor?(secondColor: Color): MaterialModel {
            this.secondColor = secondColor;
            return this;
        }
        getSecondColor?(): ResourceColor {
            return !!this.secondColor ? this.secondColor : 0;
        }
        setBgColor?(bgColor: ResourceColor): MaterialModel {
            this.bgColor = bgColor;
            return this;
        }
        getBgColor?(): ResourceColor {
            return !!this.bgColor ? this.bgColor : 0;
        }
        setShowProgressBackground?(isShow: boolean): MaterialModel {
            if (isShow) {
                this.bgColor = 0xd0d0d0;
            }
            else {
                this.bgColor = 0;
            }
            return this;
        }
        getShowProgressBackground?(): boolean {
            return this.bgColor == null;
        }
        setColor?(color: ResourceColor): MaterialModel {
            this.color = color;
            return this;
        }
        getColor?(): ResourceColor {
            return !!this.color ? this.color : 0;
        }
        setIndeterminate?(indeterminate: boolean): MaterialModel {
            this.indeterminate = indeterminate;
            return this;
        }
        getIndeterminate?(): boolean {
            if (this.indeterminate !== undefined) {
                return this.indeterminate;
            }
            return false;
        }
        setIndeterminateAngle?(indeterminateAngle: boolean): MaterialModel {
            this.indeterminateAngle = indeterminateAngle;
            return this;
        }
        getIndeterminateAngle?(): boolean {
            if (this.indeterminateAngle !== undefined) {
                return this.indeterminateAngle;
            }
            return false;
        }
        setStyle?(style: MaterialProgressStyle): MaterialModel {
            this.style = style;
            return this;
        }
        getStyle?(): MaterialProgressStyle {
            return !!this.style ? this.style : 0;
        }
        setProgress?(progress: number): MaterialModel {
            this.progress = progress;
            return this;
        }
        getProgress?(): number {
            return !!this.progress ? this.progress : 0;
        }
        setAngle?(angle: number): MaterialModel {
            this.angle = angle;
            return this;
        }
        getAngle?(): number {
            return !!this.angle ? this.angle : 0;
        }
        setRadius?(radius: number): MaterialModel {
            this.radius = radius;
            return this;
        }
        getRadius?(): number {
            return !!this.radius ? this.radius : 0;
        }
        setSecondProgress?(secondProgress: number): MaterialModel {
            this.secondProgress = secondProgress;
            return this;
        }
        getSecondProgress?(): number {
            return !!this.secondProgress ? this.secondProgress : 0;
        }
        setStrokeWidth?(strokeWidth: number): MaterialModel {
            this.strokeWidth = strokeWidth;
            return this;
        }
        getStrokeWidth?(): number {
            return !!this.strokeWidth ? this.strokeWidth : 0;
        }
    }
}
