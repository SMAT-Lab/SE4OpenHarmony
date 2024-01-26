let __generate__Id: number = 0;
function generateId(): string {
    return "SpecialDanmaku_" + ++__generate__Id;
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
import { BaseDanmaku } from '../model/BaseDanmaku';
import { IDisplayer } from '../model/IDisplayer';
import { AlphaValue } from '../model/AlphaValue';
export class ScaleFactor {
    flag: number = 0;
    scaleX: number = 0;
    scaleY: number = 0;
    width: number = 0;
    height: number = 0;
    constructor(width: number, height: number, scaleX: number, scaleY: number) {
        this.update(width, height, scaleX, scaleY);
    }
    public update(width: number, height: number, scaleX: number, scaleY: number) {
        if (this.scaleX == scaleX || this.scaleY == scaleY) {
            this.flag++;
        }
        this.width = width;
        this.height = height;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
    }
    public isUpdated(flag: number, width: number, height: number): boolean {
        return this.flag != flag && (this.width != width || this.height != height);
    }
}
export class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    public getDistance(p: Point): number {
        let _x: number = Math.abs(this.x - p.x);
        let _y: number = Math.abs(this.y - p.y);
        return Math.sqrt(_x * _x + _y * _y);
    }
}
export class LinePath {
    pBegin: Point | any;
    pEnd: Point | any;
    public duration: number = 0;
    public beginTime: number = 0;
    public endTime: number = 0;
    delatX: number = 0;
    deltaY: number = 0;
    public setPoints(pBegin: Point, pEnd: Point) {
        this.pBegin = pBegin;
        this.pEnd = pEnd;
        this.delatX = pEnd.x - pBegin.x;
        this.deltaY = pEnd.y - pBegin.y;
    }
    public getDistance(): number {
        return this.pEnd.getDistance(this.pBegin);
    }
    public getBeginPoint(): number[] {
        return [this.pBegin.x, this.pBegin.y];
    }
    public getEndPoint(): number[] {
        return [this.pEnd.x, this.pEnd.y];
    }
}
export class SpecialDanmaku extends BaseDanmaku {
    public beginX: number = 0;
    public beginY: number = 0;
    public endX: number = 0;
    public endY: number = 0;
    public deltaX: number = 0;
    public deltaY: number = 0;
    public translationDuration: number = 0;
    public translationStartDelay: number = 0;
    private mScaleFactor: ScaleFactor | any;
    private mScaleFactorChangedFlag: number = 0;
    private mCurrentWidth: number = 0;
    private mCurrentHeight: number = 0;
    /**
       * Linear.easeIn or Quadratic.easeOut
       */
    public isQuadraticEaseOut = false;
    public beginAlpha: number = 0;
    public endAlpha: number = 0;
    public deltaAlpha: number = 0;
    public alphaDuration: number = 0;
    public rotateX: number = 0;
    public rotateZ: number = 0;
    public pivotX: number = 0;
    public pivotY: number = 0;
    private currStateValues = new Array<number>(4);
    public linePaths: LinePath[] | any;
    public measure(displayer: IDisplayer, fromWorkerThread: boolean) {
        super.measure(displayer, fromWorkerThread);
        if (this.mCurrentWidth == 0 || this.mCurrentHeight == 0) {
            this.mCurrentWidth = displayer.getWidth();
            this.mCurrentHeight = displayer.getHeight();
        }
    }
    public layout(displayer: IDisplayer, x: number, y: number) {
        this.getRectAtTime(displayer, this.mTimer.currMillisecond);
    }
    public getRectAtTime(displayer: IDisplayer, currTime: number): number[] | any {
        if (!this.isMeasured()) {
            return null;
        }
        if (this.mScaleFactor.isUpdated(this.mScaleFactorChangedFlag, this.mCurrentWidth, this.mCurrentHeight)) {
            let scaleX: number = this.mScaleFactor.scaleX;
            let scaleY: number = this.mScaleFactor.scaleY;
            this.setTranslationData(this.beginX * scaleX, this.beginY * scaleY, this.endX * scaleX, this.endY * scaleY, this.translationDuration, this.translationStartDelay);
            if (this.linePaths != null && this.linePaths.length > 0) {
                let length: number = this.linePaths.length;
                let points: number[][] = new Array<number[]>(length + 1).fill(new Array<number>(2).fill(0));
                for (let j: number = 0; j < length; j++) {
                    points[j] = this.linePaths[j].getBeginPoint();
                    points[j + 1] = this.linePaths[j].getEndPoint();
                }
                for (let i: number = 0; i < points.length; i++) {
                    points[i][0] *= scaleX;
                    points[i][1] *= scaleY;
                }
                this.setLinePathData(points);
            }
            this.mScaleFactorChangedFlag = this.mScaleFactor.flag;
            this.mCurrentWidth = this.mScaleFactor.width;
            this.mCurrentHeight = this.mScaleFactor.height;
        }
        let deltaTime: number = currTime - this.getActualTime();
        // calculate alpha
        if (this.alphaDuration > 0 && this.deltaAlpha != 0) {
            if (deltaTime >= this.alphaDuration) {
                this.alpha = this.endAlpha;
            }
            else {
                let alphaProgress: number = deltaTime / this.alphaDuration;
                let vectorAlpha: number = Math.floor(this.deltaAlpha * alphaProgress);
                this.alpha = this.beginAlpha + vectorAlpha;
            }
        }
        // calculate x y
        let currX: number = this.beginX;
        let currY: number = this.beginY;
        let dtime: number = deltaTime - this.translationStartDelay;
        if (this.translationDuration > 0 && dtime >= 0 && dtime <= this.translationDuration) {
            let tranalationProgress: number = 0;
            if (this.linePaths != null) {
                let currentLinePath: LinePath | any = null;
                this.linePaths.forEach((line: any) => {
                    if (dtime >= line.beginTime && dtime < line.endTime) {
                        currentLinePath = line;
                    }
                    else {
                        currX = line.pEnd.x;
                        currY = line.pEnd.y;
                    }
                });
                if (currentLinePath != null) {
                    let deltaX: number = currentLinePath.delatX;
                    let deltaY: number = currentLinePath.deltaY;
                    tranalationProgress = (deltaTime - currentLinePath.beginTime) / currentLinePath.duration;
                    let beginX: number = currentLinePath.pBegin.x;
                    let beginY: number = currentLinePath.pBegin.y;
                    if (deltaX != 0) {
                        let vectorX: number = deltaX * tranalationProgress;
                        currX = beginX + vectorX;
                    }
                    if (deltaY != 0) {
                        let vectorY: number = deltaY * tranalationProgress;
                        currY = beginY + vectorY;
                    }
                }
            }
            else {
                tranalationProgress = this.isQuadraticEaseOut ? SpecialDanmaku.getQuadEaseOutProgress(dtime, this.translationDuration) : dtime / this.translationDuration;
                if (this.deltaX != 0) {
                    let vectorX: number = this.deltaX * tranalationProgress;
                    currX = this.beginX + vectorX;
                }
                if (this.deltaY != 0) {
                    let vectorY: number = this.deltaY * tranalationProgress;
                    currY = this.beginY + vectorY;
                }
            }
        }
        else if (dtime > this.translationDuration) {
            currX = this.endX;
            currY = this.endY;
        }
        this.currStateValues[0] = currX;
        this.currStateValues[1] = currY;
        this.currStateValues[2] = currX + this.paintWidth;
        this.currStateValues[3] = currY + this.paintHeight;
        this.setVisibility(!this.isOutside());
        return this.currStateValues;
    }
    private static getQuadEaseOutProgress(ctime: number, duration: number): number {
        //            Math.easeOutQuad = function (t, b, c, d) {
        //                t /= d;
        //                return -c * t*(t-2) + b;
        //            };
        let t: number = ctime;
        //        float b = 0f;
        let c: number = 1.0;
        let d: number = duration;
        return -c * (t /= d) * (t - 2); // + b;
    }
    public getLeft(): number {
        return this.currStateValues[0];
    }
    public getTop(): number {
        return this.currStateValues[1];
    }
    public getRight(): number {
        return this.currStateValues[2];
    }
    public getBottom(): number {
        return this.currStateValues[3];
    }
    public getType(): number {
        return BaseDanmaku.TYPE_SPECIAL;
    }
    public setTranslationData(beginX: number, beginY: number, endX: number, endY: number, translationDuration: number, translationStartDelay: number) {
        this.beginX = beginX;
        this.beginY = beginY;
        this.endX = endX;
        this.endY = endY;
        this.deltaX = endX - beginX;
        this.deltaY = endY - beginY;
        this.translationDuration = translationDuration;
        this.translationStartDelay = translationStartDelay;
    }
    public setAlphaData(beginAlpha: number, endAlpha: number, alphaDuration: number) {
        this.beginAlpha = beginAlpha;
        this.endAlpha = endAlpha;
        this.deltaAlpha = endAlpha - beginAlpha;
        this.alphaDuration = alphaDuration;
        if (beginAlpha != AlphaValue.MAX) {
            this.alpha = beginAlpha;
        }
    }
    public setLinePathData(points: number[][]) {
        if (points != null) {
            let length: number = points.length;
            let linePath: LinePath | any;
            this.beginX = points[0][0];
            this.beginY = points[0][1];
            this.endX = points[length - 1][0];
            this.endY = points[length - 1][1];
            if (points.length > 1) {
                this.linePaths = linePath[points.length - 1];
                for (let i = 0; i < this.linePaths.length; i++) {
                    this.linePaths[i] = new LinePath();
                    this.linePaths[i].setPoints(new Point(points[i][0], points[i][1]), new Point(points[i + 1][0], points[i + 1][1]));
                }
                let totalDistance: number = 0;
                this.linePaths.forEach((line: any) => {
                    totalDistance += line.getDistance();
                });
                let lastLine: LinePath | any = null;
                this.linePaths.forEach((line: any) => {
                    line.duration = Math.floor((line.getDistance() / totalDistance) * this.translationDuration);
                    line.beginTime = (lastLine == null ? 0 : lastLine.endTime);
                    line.endTime = line.beginTime + line.duration;
                    lastLine = line;
                });
            }
        }
    }
    public setScaleFactor(scaleFactor: ScaleFactor) {
        this.mScaleFactor = scaleFactor;
        this.mScaleFactorChangedFlag = scaleFactor.flag;
    }
}
