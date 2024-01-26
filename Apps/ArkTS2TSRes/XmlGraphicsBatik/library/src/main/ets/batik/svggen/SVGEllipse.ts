let __generate__Id: number = 0;
function generateId(): string {
    return "SVGEllipse_" + ++__generate__Id;
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
export class SVGEllipse {
    private _cx: number = 0;
    private _cy: number = 0;
    private _rx: number = 0;
    private _ry: number = 0;
    private _ellipseResultObj: Record<string, string | number> = {};
    /**
     * 获取椭圆中心点x坐标
     */
    public getCX(): number {
        return this._cx;
    }
    /**
     * 设置椭圆中心点x坐标
     * @param newCX x坐标值
     */
    public setCX(newCX: number): void {
        this._cx = newCX;
        this._ellipseResultObj['cx'] = newCX;
    }
    /**
     * 获取椭圆中心点y坐标
     */
    public getCY(): number {
        return this._cy;
    }
    /**
     * 设置椭圆中心点y坐标
     * @param newCY y坐标值
     */
    public setCY(newCY: number): void {
        this._cy = newCY;
        this._ellipseResultObj['cy'] = newCY;
    }
    /**
     * 获取椭圆X半径
     */
    public getRX(): number {
        return this._rx;
    }
    /**
     * 设置椭圆X半径
     * @param newRX 椭圆X半径
     */
    public setRX(newRX: number): void {
        this._rx = newRX;
        this._ellipseResultObj['rx'] = newRX;
    }
    /**
     * 获取椭圆y半径
     */
    public getRY(): number {
        return this._ry;
    }
    /**
     * 获取椭圆y半径
     * @param newRY 椭圆y半径
     */
    public setRY(newRY: number): void {
        this._ry = newRY;
        this._ellipseResultObj['ry'] = newRY;
    }
    /**
     * 添加共通属性
     * @param key 主键
     * @param value 值
     */
    public addAttribute(key: string, value: string): void {
        this._ellipseResultObj[key] = value;
    }
    public toObj(): object {
        return this._ellipseResultObj;
    }
}
