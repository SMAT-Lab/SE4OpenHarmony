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
export default class TextUtils {
    public static isEmpty(text: string): boolean {
        return text == null || text == undefined || text.length == 0;
    }
    public static toCharArray(text: string): Array<string> {
        let arr: string[] = new Array(text.length);
        for (let i = 0; i < text.length; i++) {
            arr[i] = text.charAt(i);
        }
        return arr;
    }
    public static equalsIgnoreCase(s1: string, s2: string): boolean {
        return s1.toLowerCase() == s2.toLowerCase();
    }
    public static compareToIgnoreCase(s1: string, s2: string): number {
        let n1 = s1.length;
        let n2 = s2.length;
        let min = Math.min(n1, n2);
        for (let i = 0; i < min; i++) {
            let c1 = s1.charAt(i);
            let c2 = s2.charAt(i);
            if (c1 != c2) {
                c1 = c1.toUpperCase();
                c2 = c2.toUpperCase();
                if (c1 != c2) {
                    return c1.charCodeAt(0) - c2.charCodeAt(0);
                }
            }
        }
        return n1 - n2;
    }
}
