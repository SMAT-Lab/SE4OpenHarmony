let __generate__Id: number = 0;
function generateId(): string {
    return "CircularPath_" + ++__generate__Id;
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
import { ProgressBar } from './ProgressBar';
export class CircularPath implements ProgressBar {
    private startPoint: number[] = new Array<number>();
    private endPoint: number[] = [0, 0];
    private angle: number = 0; //角度
    private offsetAngle: number = 0; //角度
    private radius: number = (100); //半径
    private strokeWidth: number = (5); //线宽
    private pathCmd: string = '';
    progress: number = 0;
    color: ResourceColor = 0;
    maxProgress: number = 100;
    private isReset: boolean = true;
    setAngle(angle: number): CircularPath {
        this.offsetAngle = angle;
        return this;
    }
    getAngle(): number {
        return this.offsetAngle;
    }
    setColor(color: ResourceColor): CircularPath {
        this.color = color;
        return this;
    }
    getColor(): ResourceColor {
        return this.color;
    }
    public setProgress(progress: number): CircularPath {
        this.progress = Math.max(0, Math.min(this.maxProgress, progress));
        this.update();
        return this;
    }
    public getProgress(): number {
        return this.progress;
    }
    setMaxProgress(max: number): CircularPath {
        this.maxProgress = max;
        return this;
    }
    getMaxProgress(): number {
        return this.maxProgress;
    }
    public setRadius(radius: number): CircularPath {
        //    this.radius = vp2px(radius);
        this.radius = (radius);
        return this;
    }
    public setStrokeWidth(strokeWidth: number): CircularPath {
        this.strokeWidth = (strokeWidth);
        //    this.strokeWidth = vp2px(strokeWidth);
        return this;
    }
    public getStrokeWidth(): number {
        return this.strokeWidth;
    }
    public getPathCmd(): string {
        return this.pathCmd;
    }
    public reset() {
        this.isReset = true;
    }
    private point2Str(point: number[]) {
        if (!point || point.length < 2) {
            return '';
        }
        return point[0] + ' ' + point[1];
    }
    private update() {
        if (this.isReset) {
            this.isReset = false;
        }
        this.startPoint = this.calculation(this.offsetAngle);
        this.angle = 360 * this.progress / this.maxProgress;
        let angle = this.angle == 360 ? 359 : this.angle;
        let endP = this.calculation(angle + this.offsetAngle);
        let close = this.progress == this.maxProgress ? 'Z' : '';
        // 大/小角度弧标志  0为小角度
        let angleFlag = this.angle >= 180 ? 1 : 0;
        this.pathCmd = `M${this.point2Str(this.startPoint)} A${this.radius} ${this.radius} 0 ${angleFlag} 1 ${this.point2Str(endP)} ${close}`;
        this.endPoint = endP;
    }
    private calculation(angle: number): number[] {
        // 计算弧度
        let radian = angle * Math.PI / 180;
        let circleRadius = this.radius + (this.strokeWidth / 2);
        let endX = circleRadius + (this.radius * Math.sin(radian)) + this.strokeWidth;
        let endY = circleRadius - (this.radius * Math.cos(radian)) + this.strokeWidth;
        // 控制起点终点无限接近时正常画圆
        if ((circleRadius - 1) < endX && endX < circleRadius && (circleRadius - endX) < 0.01) {
            endX = circleRadius - 0.01;
        }
        return [endX, endY];
    }
}
