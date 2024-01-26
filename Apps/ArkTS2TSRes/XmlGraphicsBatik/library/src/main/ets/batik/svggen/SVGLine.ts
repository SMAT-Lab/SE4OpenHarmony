let __generate__Id: number = 0;
function generateId(): string {
    return "SVGLine_" + ++__generate__Id;
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
export class SVGLine {
    private _x1: number = 0;
    private _y1: number = 0;
    private _x2: number = 0;
    private _y2: number = 0;
    private _lineResultObj: Record<string, string | number> = {};
    ;
    /**
    * 获取起始点X坐标
    */
    public getX1(): number {
        return this._x1;
    }
    /**
     * 设置起始点X坐标
     * @param newX1 起始点X坐标
     */
    public setX1(newX1: number): void {
        this._x1 = newX1;
        this._lineResultObj['x1'] = newX1;
    }
    /**
     * 获取起始点Y坐标
     */
    public getY1(): number {
        return this._y1;
    }
    /**
     * 设置起始点Y坐标
     * @param newY1 起始点Y坐标
     */
    public setY1(newY1: number): void {
        this._y1 = newY1;
        this._lineResultObj['y1'] = newY1;
    }
    /**
      * 获取结束点X坐标
      */
    public getX2(): number {
        return this._x2;
    }
    /**
     * 设置结束点X坐标
     * @param newX2 结束点X坐标
     */
    public setX2(newX2: number): void {
        this._x2 = newX2;
        this._lineResultObj['x2'] = newX2;
    }
    /**
     * 获取结束点Y坐标
     */
    public getY2(): number {
        return this._y2;
    }
    /**
     * 设置结束点Y坐标
     * @param newY2 结束点Y坐标
     */
    public setY2(newY2: number): void {
        this._y1 = newY2;
        this._lineResultObj['y2'] = newY2;
    }
    public addAttribute(key: string, value: string): void {
        this._lineResultObj[key] = value;
    }
    public toObj(): object {
        return this._lineResultObj;
    }
}
