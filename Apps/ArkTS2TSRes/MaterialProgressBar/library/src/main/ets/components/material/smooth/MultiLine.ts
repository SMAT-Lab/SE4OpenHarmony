interface MultiLine_Params {
    speed?: number;
    strokeWidth?: number;
    separatorLength?: number;
    sectionsCount?: number;
    reversed?: boolean;
    colors?: Color[];
    pathCmd?: MLine[];
    pathCmdStr?: string[];
    mWidth?: number;
    mHeight?: number;
    colorIndex?: number;
    isStop?: boolean;
    curve?: Curve;
    curves?: ICurve;
    currentIndex?: number;
    currentOffset?: number;
    offsetMax?: number;
    offsetStep?: number;
    isPocket?: boolean;
    isGradients?: boolean;
    pathStrList?: Array<MLinePath>;
    intervalId?: number;
}
let __generate__Id: number = 0;
function generateId(): string {
    return "MultiLine_" + ++__generate__Id;
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
import CurvesFactor from '@ohos.curves';
export class MultiLine extends View {
    constructor(compilerAssignedUniqueChildId, parent, params, localStorage) {
        super(compilerAssignedUniqueChildId, parent, localStorage);
        this.__speed = new SynchedPropertySimpleOneWay(params.speed, this, "speed");
        this.__strokeWidth = new SynchedPropertySimpleOneWay(params.strokeWidth, this, "strokeWidth");
        this.__separatorLength = new SynchedPropertySimpleOneWay(params.separatorLength, this, "separatorLength");
        this.__sectionsCount = new SynchedPropertySimpleOneWay(params.sectionsCount, this, "sectionsCount");
        this.__reversed = new SynchedPropertySimpleOneWay(params.reversed, this, "reversed");
        this.colors = [0x3E802F, 0xF4B400, 0x427FED, 0xB23424];
        this.__pathCmd = new ObservedPropertyObject(new Array<MLine>(), this, "pathCmd");
        this.__pathCmdStr = new ObservedPropertyObject([], this, "pathCmdStr");
        this.mWidth = lpx2px(720);
        this.mHeight = 10;
        this.colorIndex = 0;
        this.__isStop = new SynchedPropertySimpleOneWay(params.isStop, this, "isStop");
        this.__curve = new SynchedPropertySimpleTwoWay(params.curve, this, "curve");
        this.curves = CurvesFactor.initCurve(this.curve);
        this.currentIndex = 0;
        this.currentOffset = 0;
        this.offsetMax = 1;
        this.offsetStep = 0.01;
        this.isPocket = false;
        this.__isGradients = new SynchedPropertySimpleOneWay(params.isGradients, this, "isGradients");
        this.__pathStrList = new ObservedPropertyObject([], this, "pathStrList");
        this.intervalId = 0;
        this.updateWithValueParams(params);
        this.declareWatch("sectionsCount", this.watchSectionsCount);
        this.declareWatch("isStop", this.watchSectionsCount);
        this.declareWatch("curve", this.watchCurve);
    }
    updateWithValueParams(params: MultiLine_Params) {
        this.speed = params.speed;
        this.strokeWidth = params.strokeWidth;
        this.separatorLength = params.separatorLength;
        this.sectionsCount = params.sectionsCount;
        this.reversed = params.reversed;
        if (params.colors !== undefined) {
            this.colors = params.colors;
        }
        if (params.pathCmd !== undefined) {
            this.pathCmd = params.pathCmd;
        }
        if (params.pathCmdStr !== undefined) {
            this.pathCmdStr = params.pathCmdStr;
        }
        if (params.mWidth !== undefined) {
            this.mWidth = params.mWidth;
        }
        if (params.mHeight !== undefined) {
            this.mHeight = params.mHeight;
        }
        if (params.colorIndex !== undefined) {
            this.colorIndex = params.colorIndex;
        }
        this.isStop = params.isStop;
        if (params.curves !== undefined) {
            this.curves = params.curves;
        }
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.currentOffset !== undefined) {
            this.currentOffset = params.currentOffset;
        }
        if (params.offsetMax !== undefined) {
            this.offsetMax = params.offsetMax;
        }
        if (params.offsetStep !== undefined) {
            this.offsetStep = params.offsetStep;
        }
        if (params.isPocket !== undefined) {
            this.isPocket = params.isPocket;
        }
        this.isGradients = params.isGradients;
        if (params.pathStrList !== undefined) {
            this.pathStrList = params.pathStrList;
        }
        if (params.intervalId !== undefined) {
            this.intervalId = params.intervalId;
        }
    }
    aboutToBeDeleted() {
        this.__speed.aboutToBeDeleted();
        this.__strokeWidth.aboutToBeDeleted();
        this.__separatorLength.aboutToBeDeleted();
        this.__sectionsCount.aboutToBeDeleted();
        this.__reversed.aboutToBeDeleted();
        this.__pathCmd.aboutToBeDeleted();
        this.__pathCmdStr.aboutToBeDeleted();
        this.__isStop.aboutToBeDeleted();
        this.__curve.aboutToBeDeleted();
        this.__isGradients.aboutToBeDeleted();
        this.__pathStrList.aboutToBeDeleted();
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
    private __reversed: SynchedPropertySimpleOneWay<boolean>;
    get reversed() {
        return this.__reversed.get();
    }
    set reversed(newValue: boolean) {
        this.__reversed.set(newValue);
    }
    private colors: Color[]; //绿黄蓝红
    private __pathCmd: ObservedPropertyObject<MLine[]>;
    get pathCmd() {
        return this.__pathCmd.get();
    }
    set pathCmd(newValue: MLine[]) {
        this.__pathCmd.set(newValue);
    }
    private __pathCmdStr: ObservedPropertyObject<string[]>;
    get pathCmdStr() {
        return this.__pathCmdStr.get();
    }
    set pathCmdStr(newValue: string[]) {
        this.__pathCmdStr.set(newValue);
    }
    protected mWidth: number;
    private mHeight: number;
    private colorIndex: number;
    private __isStop: SynchedPropertySimpleOneWay<boolean>;
    get isStop() {
        return this.__isStop.get();
    }
    set isStop(newValue: boolean) {
        this.__isStop.set(newValue);
    }
    private __curve: SynchedPropertySimpleTwoWay<Curve>;
    get curve() {
        return this.__curve.get();
    }
    set curve(newValue: Curve) {
        this.__curve.set(newValue);
    }
    private curves: ICurve; // 创建对应曲线
    private currentIndex: number;
    private currentOffset: number;
    private offsetMax: number;
    private readonly offsetStep: number;
    private isPocket: boolean;
    private __isGradients: SynchedPropertySimpleOneWay<boolean>;
    get isGradients() {
        return this.__isGradients.get();
    }
    set isGradients(newValue: boolean) {
        this.__isGradients.set(newValue);
    }
    private __pathStrList: ObservedPropertyObject<Array<MLinePath>>;
    get pathStrList() {
        return this.__pathStrList.get();
    }
    set pathStrList(newValue: Array<MLinePath>) {
        this.__pathStrList.set(newValue);
    }
    private intervalId: number;
    aboutToAppear() {
        try {
            this.curves = CurvesFactor.initCurve(this.curve);
            console.warn(`----> aboutToAppear CurvesFactor ${this.curve} ${this.curves}`);
        }
        catch (err) {
            console.warn(`----> aboutToAppear err:${err.message} -> ${err.toString()}`);
        }
        if (!this.mHeight) {
            this.mHeight = this.strokeWidth;
        }
        this.pathCmd = new Array<MLine>();
        this.initPath();
        this.intervalId = setInterval(() => {
            this.updateLine();
            this.pathStrList = this.getPathStr();
        }, 30);
    }
    aboutToDisappear() {
        clearInterval(this.intervalId);
    }
    private initPath() {
        let size = this.sectionsCount;
        let lineSize = Math.round(this.mWidth / size);
        for (let k = 0; k <= size; k++) {
            let start = k * lineSize;
            let line = new MLine(this.separatorLength / 2)
                .set(start, lineSize)
                .setColor(this.getRandomColor());
            this.pathCmd.push(line);
        }
    }
    private watchCurve(name: string): void {
        console.warn('watchCurve:' + name);
        this.curves = CurvesFactor.initCurve(this.curve);
    }
    private watchSectionsCount(name: string): void {
        console.warn('watchSectionsCount:' + name);
        console.warn('watchSectionsCount:' + this.isStop);
        this.pathCmd = [];
        this.initPath();
    }
    private updateLine() {
        let offset = this.offsetStep * this.speed;
        this.offsetMax = 1 / this.sectionsCount;
        this.currentOffset += offset;
        if (Math.abs(this.currentOffset) >= this.offsetMax) {
            this.currentIndex = ++this.currentIndex % this.sectionsCount;
            this.currentOffset = 0;
            let line = new MLine(this.separatorLength)
                .set(this.reversed ? this.mWidth : 0, 1)
                .setColor(this.getRandomColor());
            line.isEmpty = this.isStop;
            this.pathCmd.unshift(line); // 头部添加元素
            this.pathCmd.pop(); // 删除末尾元素
        }
        let size = this.pathCmd.length;
        let stepSections = 1 / this.sectionsCount;
        for (let k = 0; k < size; k++) {
            let line = this.pathCmd[k];
            if (line.isEmpty) {
                continue;
            }
            try {
                let xOffset = stepSections * k + this.currentOffset; //当前
                let prev = Math.max(0, xOffset - stepSections); //前一个
                let ratioSectionWidth = Math.abs(this.curves.interpolate(prev) - this.curves.interpolate(Math.min(xOffset, 1)));
                let sectionWidth = Math.round(this.mWidth * ratioSectionWidth); //实际宽度
                let x = 0;
                if (k == 0) {
                    x = -this.separatorLength;
                }
                else {
                    x = Math.round(this.mWidth * this.curves.interpolate(Math.min(xOffset, 1)));
                    x -= sectionWidth;
                }
                if (this.reversed) {
                    x = this.mWidth - sectionWidth - x - this.separatorLength;
                }
                line.set(x, sectionWidth);
            }
            catch (err) {
                console.warn(`---->curves.interpolate curves:${this.curves} err:${err.message} -> ${err.toString()} `);
            }
        }
    }
    private getRandomColor(): Color {
        let size = this.colors.length;
        if (this.isPocket) {
            this.colorIndex = ++this.colorIndex % (size * size);
            let pocketIndex = Math.floor(this.colorIndex / size); //向下舍入到最接近的整数
            return this.colors[pocketIndex];
        }
        else {
            this.colorIndex = ++this.colorIndex % size;
            return this.colors[this.colorIndex];
        }
    }
    private getPathStr() {
        this.pathCmdStr = [];
        for (let k = 0; k < this.pathCmd.length; k++) {
            let line = this.pathCmd[k];
            this.pathCmdStr.push(line.getCmdPath());
        }
        return this.pathCmd.map((item, index) => {
            let mLinePath: MLinePath = {
                color: item.color,
                nextColor: this.pathCmd[(index + 1) % this.pathCmd.length].color,
                x: item.start + item.space,
                width: Math.max(0, item.length - item.space)
            };
            return mLinePath;
        });
    }
    private isShowPocket(): boolean {
        if (this.isPocket) {
            for (let k = 0; k < this.pathCmd.length; k++) {
                let line = this.pathCmd[k];
                if (line.isEmpty) {
                    return true;
                }
            }
        }
        return false;
    }
    render() {
        Stack.create({ alignContent: Alignment.TopStart });
        Stack.width(px2vp(this.mWidth));
        Stack.height(this.mHeight);
        If.create();
        if (this.isShowPocket()) {
            If.branchId(0);
            ForEach.create("2", this, ObservedObject.GetRawObject(this.colors.map<PocketPath>((item: Color, index: number) => {
                let size = this.sectionsCount;
                let lineSize = Math.round(this.mWidth / size);
                let start = index * lineSize;
                let line: MLine = new MLine(this.separatorLength / 2);
                line.set(start, lineSize);
                let pocketPath: PocketPath = {
                    color: item,
                    x: line.start + line.space,
                    width: Math.max(1, line.length - line.space),
                    str: line.getCmdPath()
                };
                return pocketPath;
            })), (item: PocketPath) => {
                Rect.create();
                Rect.width(px2vp(item.width));
                Rect.height(this.strokeWidth);
                Rect.offset({ x: px2vp(item.x), y: 0 });
                Rect.fill(item.color);
            }, (item: PocketPath) => item.str);
            ForEach.pop();
        }
        If.pop();
        ForEach.create("3", this, ObservedObject.GetRawObject(this.pathStrList), (item: MLinePath) => {
            If.create();
            if (this.isGradients) {
                If.branchId(0);
                Rect.create();
                Rect.width(px2vp(item.width));
                Rect.height(this.strokeWidth);
                Rect.offset({ x: px2vp(item.x), y: 0 });
                Rect.fill('none');
                Rect.linearGradient({
                    angle: 90,
                    colors: [[item.color, 0.3], [item.nextColor, 0.6]]
                });
            }
            else {
                If.branchId(1);
                Rect.create();
                Rect.width(px2vp(item.width));
                Rect.height(this.strokeWidth);
                Rect.offset({ x: px2vp(item.x), y: 0 });
                Rect.fill(item.color);
            }
            If.pop();
        }, (item: MLinePath) => JSON.stringify(item));
        ForEach.pop();
        Stack.pop();
    }
}
interface PocketPath {
    color: Color;
    x: number;
    width: number;
    str: string;
}
interface MLinePath {
    color: Color;
    nextColor: Color;
    x: number;
    width: number;
}
class MLine {
    start: number = 0;
    end: number = 0;
    color: Color = 0;
    length: number = 0;
    space: number = 0;
    isEmpty: boolean = false;
    public constructor(space: number) {
        this.space = Math.floor(space);
    }
    public set(start: number, length: number): MLine {
        this.start = start;
        this.length = length;
        this.end = start + length;
        return this;
    }
    public setColor(color: Color): MLine {
        this.color = color;
        return this;
    }
    public offset(offset: number): MLine {
        this.start += offset;
        this.end = this.start + this.length;
        return this;
    }
    public getCmdPath(): string {
        if (this.isEmpty) {
            return '';
        }
        else {
            return `M${this.start + this.space} 0 l${Math.max(1, this.length - this.space)} 0`;
        }
    }
    public toString(): string {
        return `{ (${this.start} , ${this.end}) ${this.color}}`;
    }
}
