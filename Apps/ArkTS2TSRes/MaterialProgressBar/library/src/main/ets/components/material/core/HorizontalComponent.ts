interface HorizontalComponent_Params {
    progressBar?: HorizontalPath;
    bgBar?: HorizontalPath;
    secondBar?: HorizontalPath;
    mWidth?: number;
    mHeight?: number;
    strokeWidth?;
    progressMax?: number;
    bgColor?: ResourceColor;
    color?: ResourceColor;
    progress?: number;
    secondColor?: ResourceColor;
    secondProgress?: number;
    mOffset?: number;
    bgPathCmd?: string;
    progressPathCmd?: string;
    secondProgressPathCmd?: string;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "HorizontalComponent_" + ++__generate__Id;
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
import { HorizontalPath } from './HorizontalPath';
export class HorizontalComponent extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.progressBar = new HorizontalPath();
        this.bgBar = new HorizontalPath();
        this.secondBar = new HorizontalPath();
        this.mWidth = 0;
        this.mHeight = 0;
        this.strokeWidth = 6;
        this.progressMax = 100;
        this.bgColor = 0;
        this.color = '#007DFF';
        this.__progress = new SynchedPropertySimpleOneWay(params.progress, this, "progress");
        this.secondColor = 0;
        this.__secondProgress = new SynchedPropertySimpleOneWay(params.secondProgress, this, "secondProgress");
        this.__mOffset = new SynchedPropertySimpleOneWay(params.mOffset, this, "mOffset");
        this.__bgPathCmd = new ObservedPropertySimple('', this, "bgPathCmd");
        this.__progressPathCmd = new ObservedPropertySimple('', this, "progressPathCmd");
        this.__secondProgressPathCmd = new ObservedPropertySimple('', this, "secondProgressPathCmd");
        this.updateWithValueParams(params);
        this.declareWatch("progress", this.watchProgress);
    }
    updateWithValueParams(params: HorizontalComponent_Params) {
        if (params.progressBar !== undefined) {
            this.progressBar = params.progressBar;
        }
        if (params.bgBar !== undefined) {
            this.bgBar = params.bgBar;
        }
        if (params.secondBar !== undefined) {
            this.secondBar = params.secondBar;
        }
        if (params.mWidth !== undefined) {
            this.mWidth = params.mWidth;
        }
        if (params.mHeight !== undefined) {
            this.mHeight = params.mHeight;
        }
        if (params.strokeWidth !== undefined) {
            this.strokeWidth = params.strokeWidth;
        }
        if (params.progressMax !== undefined) {
            this.progressMax = params.progressMax;
        }
        if (params.bgColor !== undefined) {
            this.bgColor = params.bgColor;
        }
        if (params.color !== undefined) {
            this.color = params.color;
        }
        this.progress = params.progress;
        if (params.secondColor !== undefined) {
            this.secondColor = params.secondColor;
        }
        this.secondProgress = params.secondProgress;
        this.mOffset = params.mOffset;
        if (params.bgPathCmd !== undefined) {
            this.bgPathCmd = params.bgPathCmd;
        }
        if (params.progressPathCmd !== undefined) {
            this.progressPathCmd = params.progressPathCmd;
        }
        if (params.secondProgressPathCmd !== undefined) {
            this.secondProgressPathCmd = params.secondProgressPathCmd;
        }
    }
    aboutToBeDeleted() {
        this.__progress.aboutToBeDeleted();
        this.__secondProgress.aboutToBeDeleted();
        this.__mOffset.aboutToBeDeleted();
        this.__bgPathCmd.aboutToBeDeleted();
        this.__progressPathCmd.aboutToBeDeleted();
        this.__secondProgressPathCmd.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id());
    }
    private progressBar: HorizontalPath;
    private bgBar: HorizontalPath;
    private secondBar: HorizontalPath;
    private mWidth: number;
    private mHeight: number;
    private strokeWidth;
    private progressMax: number;
    private bgColor: ResourceColor;
    private color: ResourceColor; //0x029789
    private __progress: SynchedPropertySimpleOneWay<number>;
    get progress() {
        return this.__progress.get();
    }
    set progress(newValue: number) {
        this.__progress.set(newValue);
    }
    private secondColor: ResourceColor;
    private __secondProgress: SynchedPropertySimpleOneWay<number>;
    get secondProgress() {
        return this.__secondProgress.get();
    }
    set secondProgress(newValue: number) {
        this.__secondProgress.set(newValue);
    }
    private __mOffset: SynchedPropertySimpleOneWay<number>;
    get mOffset() {
        return this.__mOffset.get();
    }
    set mOffset(newValue: number) {
        this.__mOffset.set(newValue);
    }
    private __bgPathCmd: ObservedPropertySimple<string>;
    get bgPathCmd() {
        return this.__bgPathCmd.get();
    }
    set bgPathCmd(newValue: string) {
        this.__bgPathCmd.set(newValue);
    }
    private __progressPathCmd: ObservedPropertySimple<string>;
    get progressPathCmd() {
        return this.__progressPathCmd.get();
    }
    set progressPathCmd(newValue: string) {
        this.__progressPathCmd.set(newValue);
    }
    private __secondProgressPathCmd: ObservedPropertySimple<string>;
    get secondProgressPathCmd() {
        return this.__secondProgressPathCmd.get();
    }
    set secondProgressPathCmd(newValue: string) {
        this.__secondProgressPathCmd.set(newValue);
    }
    aboutToAppear() {
        this.mWidth = (this.progressMax);
        this.mHeight = (this.strokeWidth);
        this.progressBar = new HorizontalPath()
            .setMaxProgress(this.progressMax)
            .setBarColor(this.color)
            .setProgress(this.progress);
        this.progressPathCmd = this.progressBar.getPathCmd(this.mWidth);
        if (this.bgColor) {
            this.bgBar = new HorizontalPath()
                .setMaxProgress(this.progressMax)
                .setBarColor(this.color)
                .setProgress(this.progressMax);
            this.bgPathCmd = this.bgBar.getPathCmd(this.mWidth);
        }
        if (this.secondColor) {
            this.secondBar = new HorizontalPath()
                .setMaxProgress(this.progressMax)
                .setBarColor(this.color)
                .setProgress(this.secondProgress);
            this.secondProgressPathCmd = this.secondBar.getPathCmd(this.mWidth);
        }
    }
    watchProgress() {
        this.progressBar.setOffset(this.mOffset);
        this.progressBar.setProgress(this.progress);
        this.progressPathCmd = this.progressBar.getPathCmd(this.mWidth);
    }
    render() {
        Shape.create();
        Shape.width("100%");
        Shape.height(this.mHeight);
        Shape.onAreaChange((oldValue: Area, newValue: Area) => {
            if ((oldValue.width != newValue.width || oldValue.height != newValue.height)) {
                this.progressBar.update();
                this.progressPathCmd = this.progressBar.getPathCmd(this.mWidth);
                if (this.bgColor) {
                    this.bgBar.update();
                    this.bgPathCmd = this.bgBar.getPathCmd(this.mWidth);
                }
                if (this.secondColor) {
                    this.secondBar.update();
                    this.secondProgressPathCmd = this.secondBar.getPathCmd(this.mWidth);
                }
            }
        });
        If.create();
        if (this.bgColor) {
            If.branchId(0);
            Path.create();
            Path.commands(this.bgPathCmd);
            Path.stroke(this.bgColor);
            Path.strokeWidth(this.strokeWidth);
        }
        If.pop();
        If.create();
        if (this.secondColor) {
            If.branchId(0);
            Path.create();
            Path.commands(this.secondProgressPathCmd);
            Path.stroke(this.secondColor);
            Path.strokeWidth(this.strokeWidth);
        }
        If.pop();
        Path.create();
        Path.commands(this.progressPathCmd);
        Path.stroke(this.color);
        Path.strokeWidth(this.strokeWidth);
        Shape.pop();
    }
}
