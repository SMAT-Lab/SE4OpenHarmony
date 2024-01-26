let __generate__Id: number = 0;
function generateId(): string {
    return "ColorGradient_" + ++__generate__Id;
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
export class ColorGradient {
    color1: string | ResourceColor;
    color2: string | ResourceColor;
    count: number;
    colorArray: Array<string> = [];
    constructor(color1: string | ResourceColor, color2: string | ResourceColor, count: number) {
        this.color1 = color1;
        this.color2 = color2;
        this.count = count;
        this.colorArray = this.gradientColors(color1, color2, count, 2.2);
    }
    getColor1(): string | ResourceColor {
        return this.color1;
    }
    getColor2(): string | ResourceColor {
        return this.color2;
    }
    getCount(): number {
        return this.count;
    }
    getColorByFraction(index: number): string {
        if (index > this.count) {
            index = this.count;
        }
        if (index < 0) {
            index = 0;
        }
        return this.colorArray[index];
    }
    private parseColor(hexStr: string) {
        return hexStr.length === 4 ? hexStr.substr(1).split('').map((s: string) => {
            return 0x11 * Number.parseInt(s, 16);
        }) : [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map((s: string) => {
            return Number.parseInt(s, 16);
        });
    }
    private pad(s: string) {
        return (s.length === 1) ? '0' + s : s;
    }
    private gradientColors(start: any, end: any, steps: number, gamma: number) {
        let i: number, j: number, ms: number, me: number, output: Array<string> = [], so: Array<string> = [];
        gamma = gamma || 1;
        let normalize = (channel: number) => {
            return Math.pow(channel / 255, gamma);
        };
        start = this.parseColor(start).map(normalize);
        end = this.parseColor(end).map(normalize);
        for (i = 0; i < steps; i++) {
            ms = i / (steps - 1);
            me = 1 - ms;
            for (j = 0; j < 3; j++) {
                so[j] = this.pad(Math.round(Math.pow(start[j] * me + end[j] * ms, 1 / gamma) * 255).toString(16));
            }
            output.push('#' + so.join(''));
        }
        return output;
    }
}
