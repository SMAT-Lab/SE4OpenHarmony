interface CircularComponent_Params {
    progress?: number;
    circularBar?: CircularPath;
    progressPathCmd?: string;
    bgPathCmd?: string;
    bgColor?: ResourceColor;
    color?: ResourceColor;
    mWidth?: number;
    mHeight?: number;
    progressMax?: number;
    radius?;
    strokeWidth?: number;
    secondColor?: ResourceColor;
    secondProgressPathCmd?: string;
    secondCircularBar?: CircularPath;
    angle?: number;
    secondProgress?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "CircularComponent_" + ++__generate__Id;
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
import { CircularPath } from './CircularPath';
export class CircularComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__progress = new SynchedPropertySimpleOneWay(params.progress, this, "progress");
        this.circularBar = new CircularPath();
        this.__progressPathCmd = new ObservedPropertySimple('', this, "progressPathCmd");
        this.__bgPathCmd = new ObservedPropertySimple('', this, "bgPathCmd");
        this.bgColor = 0;
        this.color = '#007DFF';
        this.mWidth = 0;
        this.mHeight = 0;
        this.progressMax = 100;
        this.radius = 45;
        this.__strokeWidth = new SynchedPropertySimpleOneWay(params.strokeWidth, this, "strokeWidth");
        this.secondColor = 0;
        this.__secondProgressPathCmd = new ObservedPropertySimple('', this, "secondProgressPathCmd");
        this.secondCircularBar = new CircularPath();
        this.__angle = new SynchedPropertySimpleOneWay(params.angle, this, "angle");
        this.__secondProgress = new SynchedPropertySimpleOneWay(params.secondProgress, this, "secondProgress");
        this.updateWithValueParams(params);
        this.declareWatch("progress", this.watchProgress);
    }
    updateWithValueParams(params: CircularComponent_Params) {
        this.progress = params.progress;
        if (params.circularBar !== undefined) {
            this.circularBar = params.circularBar;
        }
        if (params.progressPathCmd !== undefined) {
            this.progressPathCmd = params.progressPathCmd;
        }
        if (params.bgPathCmd !== undefined) {
            this.bgPathCmd = params.bgPathCmd;
        }
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
        if (params.color !== undefined) {
            this.color = params.color;
        }
        if (params.mWidth !== undefined) {
            this.mWidth = params.mWidth;
        }
        if (params.mHeight !== undefined) {
            this.mHeight = params.mHeight;
        }
        if (params.progressMax !== undefined) {
            this.progressMax = params.progressMax;
        }
        if (params.radius !== undefined) {
            this.radius = params.radius;
        }
        this.strokeWidth = params.strokeWidth;
        if (params.secondColor !== undefined) {
            this.secondColor = params.secondColor;
        }
        if (params.secondProgressPathCmd !== undefined) {
            this.secondProgressPathCmd = params.secondProgressPathCmd;
        }
        if (params.secondCircularBar !== undefined) {
            this.secondCircularBar = params.secondCircularBar;
        }
        this.angle = params.angle;
        this.secondProgress = params.secondProgress;
    }
    aboutToBeDeleted() {
        this.__progress.aboutToBeDeleted();
        this.__progressPathCmd.aboutToBeDeleted();
        this.__bgPathCmd.aboutToBeDeleted();
        this.__strokeWidth.aboutToBeDeleted();
        this.__secondProgressPathCmd.aboutToBeDeleted();
        this.__angle.aboutToBeDeleted();
        this.__secondProgress.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private __progress: SynchedPropertySimpleOneWay<number>;
    get progress() {
        return this.__progress.get();
    }
    set progress(newValue: number) {
        this.__progress.set(newValue);
    }
    private circularBar: CircularPath;
    private __progressPathCmd: ObservedPropertySimple<string>;
    get progressPathCmd() {
        return this.__progressPathCmd.get();
    }
    set progressPathCmd(newValue: string) {
        this.__progressPathCmd.set(newValue);
    }
    private __bgPathCmd: ObservedPropertySimple<string>;
    get bgPathCmd() {
        return this.__bgPathCmd.get();
    }
    set bgPathCmd(newValue: string) {
        this.__bgPathCmd.set(newValue);
    }
    private bgColor: ResourceColor;
    private color: ResourceColor; //0x029789;
    private mWidth: number;
    private mHeight: number;
    private progressMax: number;
    private radius;
    private __strokeWidth: SynchedPropertySimpleOneWay<number>;
    get strokeWidth() {
        return this.__strokeWidth.get();
    }
    set strokeWidth(newValue: number) {
        this.__strokeWidth.set(newValue);
    }
    private secondColor: ResourceColor;
    private __secondProgressPathCmd: ObservedPropertySimple<string>;
    get secondProgressPathCmd() {
        return this.__secondProgressPathCmd.get();
    }
    set secondProgressPathCmd(newValue: string) {
        this.__secondProgressPathCmd.set(newValue);
    }
    private secondCircularBar: CircularPath;
    private __angle: SynchedPropertySimpleOneWay<number>;
    get angle() {
        return this.__angle.get();
    }
    set angle(newValue: number) {
        this.__angle.set(newValue);
    }
    private __secondProgress: SynchedPropertySimpleOneWay<number>;
    get secondProgress() {
        return this.__secondProgress.get();
    }
    set secondProgress(newValue: number) {
        this.__secondProgress.set(newValue);
    }
    aboutToAppear() {
        this.mWidth = this.mHeight = (this.radius + this.strokeWidth);
        this.circularBar = new CircularPath()
            .setStrokeWidth(this.strokeWidth)
            .setRadius(this.radius)
            .setMaxProgress(this.progressMax)
            .setProgress(this.progress)
            .setColor(this.color)
            .setAngle(this.angle);
        this.progressPathCmd = this.circularBar.getPathCmd();
        if (this.secondColor) {
            this.secondCircularBar = new CircularPath()
                .setStrokeWidth(this.strokeWidth)
                .setRadius(this.radius)
                .setMaxProgress(this.progressMax)
                .setProgress(this.secondProgress)
                .setColor(this.secondColor)
                .setAngle(this.angle);
            this.secondProgressPathCmd = this.secondCircularBar.getPathCmd();
        }
        if (this.bgColor) {
            this.bgPathCmd = new CircularPath()
                .setStrokeWidth(this.strokeWidth).setRadius(this.radius)
                .setProgress(100).getPathCmd();
        }
    }
    watchProgress(name: string) {
        this.circularBar.setProgress(this.progress)
            .setAngle(this.angle);
        this.progressPathCmd = this.circularBar.getPathCmd();
        if (this.secondColor) {
            this.secondCircularBar.setProgress(this.secondProgress)
                .setAngle(this.angle);
            this.secondProgressPathCmd = this.secondCircularBar.getPathCmd();
        }
    }
    render() {
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.width(this.mWidth);
        Stack.height(this.mHeight);
        If.create();
        if (this.bgColor) {
            If.branchId(0);
            Path.create();
            Path.commands(this.bgPathCmd);
            Path.stroke(this.bgColor);
            Path.strokeWidth(this.strokeWidth);
            Path.fillOpacity(0);
            Path.strokeLineCap(LineCapStyle.Round);
        }
        If.pop();
        If.create();
        if (this.secondColor) {
            If.branchId(0);
            Path.create();
            Path.commands(this.secondProgressPathCmd);
            Path.stroke(this.secondColor);
            Path.strokeWidth(this.strokeWidth);
            Path.fillOpacity(0);
            Path.strokeLineCap(LineCapStyle.Round);
        }
        If.pop();
        Path.create();
        Path.commands(this.progressPathCmd);
        Path.stroke(this.color);
        Path.strokeWidth(this.strokeWidth);
        Path.fillOpacity(0);
        Path.strokeLineCap(LineCapStyle.Round);
        Stack.pop();
    }
}
