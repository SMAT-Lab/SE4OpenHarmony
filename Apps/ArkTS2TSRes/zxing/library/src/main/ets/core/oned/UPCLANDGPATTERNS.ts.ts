/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
export default class UPCLAndGPatterns {
    public static L_AND_G_PATTERNS: Int32Array[];
    public static L_PATTERNS: Int32Array[] = [
        Int32Array.from([3, 2, 1, 1]),
        Int32Array.from([2, 2, 2, 1]),
        Int32Array.from([2, 1, 2, 2]),
        Int32Array.from([1, 4, 1, 1]),
        Int32Array.from([1, 1, 3, 2]),
        Int32Array.from([1, 2, 3, 1]),
        Int32Array.from([1, 1, 1, 4]),
        Int32Array.from([1, 3, 1, 2]),
        Int32Array.from([1, 2, 1, 3]),
        Int32Array.from([3, 1, 1, 2]), // 9
    ];
    static init() {
        UPCLAndGPatterns.L_AND_G_PATTERNS = UPCLAndGPatterns.L_PATTERNS.map(arr => Int32Array.from(arr));
        for (let i = 10; i < 20; i++) {
            let widths = UPCLAndGPatterns.L_PATTERNS[i - 10];
            let reversedWidths = new Int32Array(widths.length);
            for (let j = 0; j < widths.length; j++) {
                reversedWidths[j] = widths[widths.length - j - 1];
            }
            UPCLAndGPatterns.L_AND_G_PATTERNS[i] = reversedWidths;
        }
    }
}
UPCLAndGPatterns.init();
