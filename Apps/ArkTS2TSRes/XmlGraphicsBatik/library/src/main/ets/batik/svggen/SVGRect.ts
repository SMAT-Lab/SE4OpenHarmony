let __generate__Id: number = 0;
function generateId(): string {
    return "SVGRect_" + ++__generate__Id;
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
export class SVGRect {
    private _x: number = 0;
    private _y: number = 0;
    private _width: number = 0;
    private _height: number = 0;
    private _rx: number = 0;
    private _ry: number = 0;
    private _rectResultObj: Record<string, string | number> = {};
    /**
     * 获取x坐标
     */
    public getX(): number {
        return this._x;
    }
    /**
     * 设置x坐标
     * @param newX x坐标值
     */
    public setX(newX: number): void {
        this._x = newX;
        this._rectResultObj['x'] = newX;
    }
    /**
     * 获取y坐标
     */
    public getY(): number {
        return this._y;
    }
    /**
     * 设置y坐标
     * @param newY y坐标值
     */
    public setY(newY: number): void {
        this._y = newY;
        this._rectResultObj['y'] = newY;
    }
    /**
     * 获取矩形宽度
     */
    public getWidth(): number {
        return this._width;
    }
    /**
     * 设置宽度
     * @param newWidth 矩形宽度
     */
    public setWidth(newWidth: number): void {
        this._width = newWidth;
        this._rectResultObj['width'] = newWidth;
    }
    /**
     * 获取矩形高度
     */
    public getHeight(): number {
        return this._height;
    }
    public setHeight(newHeight: number): void {
        this._height = newHeight;
        this._rectResultObj['height'] = newHeight;
    }
    public getRX(): number {
        return this._rx;
    }
    public setRX(newRX: number): void {
        this._rx = newRX;
        this._rectResultObj['rx'] = newRX;
    }
    public getRY(): number {
        return this._ry;
    }
    public setRY(newRY: number): void {
        this._ry = newRY;
        this._rectResultObj['ry'] = newRY;
    }
    public addAttribute(key: string, value: string): void {
        this._rectResultObj[key] = value;
    }
    public toObj(): object {
        return this._rectResultObj;
    }
}
