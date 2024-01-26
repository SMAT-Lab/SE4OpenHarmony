let __generate__Id: number = 0;
function generateId(): string {
    return "SVGPolygonAndPolyLine_" + ++__generate__Id;
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
export class SVGPolygonAndPolyLine {
    private _points: number[] = new Array();
    private _resultObj: Record<string, string | number[]> = {};
    /**
    * 获取所有点坐标
    */
    public getPoints(): number[] {
        return this._points;
    }
    /**
     * 设置顶点坐标
     * @param newPoints 顶点坐标集合
     */
    public setPoints(newPoints: number[]): void {
        this._points = newPoints;
        this._resultObj['points'] = newPoints;
    }
    /**
     * 添加顶点
     * @param x 顶点的X坐标
     * @param y 顶点的Y坐标
     */
    public addPoints(x: number, y: number): void {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }
        this._points.push(x);
        this._points.push(y);
    }
    public addAttribute(key: string, value: string): void {
        this._resultObj[key] = value;
    }
    public toObj(): object {
        if (this._points.length % 2 === 1) {
            this._points.splice(this._points.length - 1);
        }
        let pointsArray = this._points.join(' ');
        this._resultObj['points'] = pointsArray;
        return this._resultObj;
    }
}
