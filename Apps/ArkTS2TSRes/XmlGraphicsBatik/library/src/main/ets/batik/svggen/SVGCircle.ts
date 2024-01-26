let __generate__Id: number = 0;
function generateId(): string {
    return "SVGCircle_" + ++__generate__Id;
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
export class SVGCircle {
    private _cx: number = 0;
    private _cy: number = 0;
    private _r: number = 0;
    private _circleResultObj: Record<string, number | string> = {};
    /**
     * 获取圆心x坐标
     */
    public getCX(): number {
        return this._cx;
    }
    /**
     * 设置圆心x坐标
     * @param newCX 圆心x坐标值
     */
    public setCX(newCX: number): void {
        this._cx = newCX;
        this._circleResultObj['cx'] = newCX;
    }
    /**
     * 获取圆心y坐标
     */
    public getCY(): number {
        return this._cy;
    }
    /**
     * 设置圆心y坐标
     * @param newCY 圆心y坐标值
     */
    public setCY(newCY: number): void {
        this._cy = newCY;
        this._circleResultObj['cy'] = newCY;
    }
    /**
     * 获取圆半径
     */
    public getR(): number {
        return this._r;
    }
    /**
     * 设置圆半径
     * @param newR 矩形宽度
     */
    public setR(newR: number): void {
        this._r = newR;
        this._circleResultObj['r'] = newR;
    }
    public addAttribute(key: string, value: string): void {
        this._circleResultObj[key] = value;
    }
    public toObj(): object {
        return this._circleResultObj;
    }
}
