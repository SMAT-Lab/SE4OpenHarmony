let __generate__Id: number = 0;
function generateId(): string {
    return "ColorUtil_" + ++__generate__Id;
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
export class ColorUtil {
    static colorHex(color: string): string {
        // RGB颜色值的正则
        let reg: RegExp = new RegExp("/^(rgb|RGB|argb|ARGB)/");
        if (reg.test(color)) {
            console.info('if enter');
            let strHex = "#";
            // 把RGB的3个数值变成数组
            let reg2: RegExp = new RegExp("/(?:\(|\)|rgb|RGB|argb|ARGB)*/", "g");
            let colorArr = color.replace(reg2, "").split(",");
            console.info('colorHex enter colorArr is ' + colorArr);
            // 转成16进制
            for (let i = 0; i < colorArr.length; i++) {
                let hex = Number(colorArr[i]).toString(16).toUpperCase();
                if (hex.length === 1) {
                    hex = "0" + hex;
                }
                strHex += hex;
            }
            return strHex;
        }
        else {
            console.info('else enter');
            return String(color);
        }
    }
    static colorRgb(color: string): number[] | null {
        let reg: RegExp = new RegExp("/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/");
        // 把颜色值变成小写
        color = color.toLowerCase();
        if (reg.test(color)) {
            // 如果只有三位的值，需变成六位，如：#fff => #ffffff
            if (color.length === 4) {
                let colorNew = "#";
                for (let i = 1; i < 4; i += 1) {
                    colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
                }
                color = colorNew;
            }
            // 处理六位的颜色值，转为RGB
            let colorChange: number[] = [];
            for (let i = 1; i < 7; i += 2) {
                colorChange.push(Number.parseInt("0x" + color.slice(i, i + 2)));
            }
            console.info('colorChange is ' + colorChange[0] + '、' + colorChange[1] + '、' + colorChange[2]);
            return colorChange;
        }
        else {
            return null;
        }
    }
    static colorArgb(color: string): number[] | null {
        let reg: RegExp = new RegExp("/^#([0-9a-fA-f]{8})$/");
        // 把颜色值变成小写
        color = color.toLowerCase();
        if (reg.test(color)) {
            // 转为ARGB
            let colorChange: number[] = [];
            for (let i = 1; i < 9; i += 2) {
                colorChange.push(Number.parseInt("0x" + color.slice(i, i + 2)));
            }
            console.info('colorChange is ' + colorChange[0] + '、' + colorChange[1] + '、' + colorChange[2] + '、' + colorChange[3]);
            return colorChange;
        }
        else {
            return null;
        }
    }
    static isColorDark(hexColor: string, showAlpha: boolean): boolean {
        console.info('MaterialDialog isColorDark enter hexColor is ' + hexColor);
        let threshold = 0.5;
        if (hexColor === '#00000000') {
            return false;
        }
        let colorArray: number[] | null = showAlpha ? ColorUtil.colorArgb(hexColor) : ColorUtil.colorRgb(hexColor);
        if (colorArray !== null) {
            if (colorArray.length === 3) {
                let darkness = 1 - (0.299 * colorArray[0] + 0.587 * colorArray[1] + 0.114 * colorArray[2]) / 255;
                return darkness >= threshold;
            }
            if (colorArray.length === 4) {
                let darkness = 1 - (0.299 * colorArray[1] + 0.587 * colorArray[2] + 0.114 * colorArray[3]) / 255;
                return darkness >= threshold;
            }
        }
        return false;
    }
}
