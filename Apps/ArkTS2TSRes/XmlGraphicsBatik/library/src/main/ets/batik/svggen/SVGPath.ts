let __generate__Id: number = 0;
function generateId(): string {
    return "SVGPath_" + ++__generate__Id;
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
import { PathOrders } from "../util/ObjOrArrayUtil";
export class SVGPath {
    private _pathLength: number = 0;
    private _d: string[] = new Array();
    private _pathResultObj: Record<string, string | number | string[]> = {};
    /**
     * 获取路径长度
     */
    public getPathLength(): number {
        return this._pathLength;
    }
    /**
     * 设置路径长度
     * @param newPathLength 路径长度
     */
    public setPathLength(newPathLength: number): void {
        this._pathLength = newPathLength;
        this._pathResultObj['pathLength'] = newPathLength;
    }
    /**
     * 获取路径长度
     */
    public getD(): string[] {
        return this._d;
    }
    /**
     * 设置路径长度
     * @param newPathLength 路径长度
     */
    public setD(newD: string[]): void {
        this._d = newD;
        this._pathResultObj['d'] = newD;
    }
    /**
     * 添加顶点
     * @param x 顶点的X坐标
     * @param y 顶点的Y坐标
     */
    public addPoints(order: string, x?: number, y?: number): void {
        let index = PathOrders.indexOf(order);
        if (index === -1) {
            return;
        }
        let point = '';
        if (order === 'z' || order === 'Z') {
            point = order = ' ';
        }
        else if (x === undefined) {
            x = 0;
        }
        else if (y === undefined) {
            y = 0;
        }
        if (order && x !== undefined && y !== undefined) {
            point = order + ' ' + x + ',' + y + ' ';
        }
        this._d.push(point);
    }
    /**
     * 添加不带命令的坐标点
     * @param x 要运动到的点的x 坐标
     * @param y 要运动到的点的y 坐标
     */
    public addPointsWithoutOrder(x: number, y: number): void {
        if (x === undefined) {
            x = 0;
        }
        if (y === undefined) {
            y = 0;
        }
        this._d.push(x + ',' + y);
    }
    public addAttribute(key: string, value: string): void {
        this._pathResultObj[key] = value;
    }
    public toObj(): object {
        let dWithoutComma = this._d.join(' ');
        this._pathResultObj['d'] = dWithoutComma;
        return this._pathResultObj;
    }
}
