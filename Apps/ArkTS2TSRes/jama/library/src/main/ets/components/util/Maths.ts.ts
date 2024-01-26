/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
/* Generated from Java with JSweet 2.0.0 - http://www.jsweet.org */
export class Maths {
    /**
     * sqrt(a^2 + b^2) without under/overflow.
     * @param {number} a
     * @param {number} b
     * @return {number}
     */
    public static hypot(a: number, b: number): number {
        let r: number;
        if (Math.abs(a) > Math.abs(b)) {
            r = b / a;
            r = Math.abs(a) * Math.sqrt(1 + r * r);
        }
        else if (b !== 0) {
            r = a / b;
            r = Math.abs(b) * Math.sqrt(1 + r * r);
        }
        else {
            r = 0.0;
        }
        return r;
    }
}
Maths["__class"] = "Jama.util.Maths";
