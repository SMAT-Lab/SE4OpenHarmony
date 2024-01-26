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
export class Utils {
    static inetAton(a: string) {
        var d = a.split('.');
        return ((((((+d[0]) * 256) + (+d[1])) * 256) + (+d[2])) * 256) + (+d[3]);
    }
    ;
    static inetNtoa(n: number) {
        var d = (n % 256).toString();
        for (var i = 3; i > 0; i--) {
            n = Math.floor(n / 256);
            d = n % 256 + '.' + d;
        }
        return d;
    }
    ;
    static bufferCompare(a, b) {
        if (typeof a.equals === 'function') {
            return a.equals(b);
        }
        if (a.length !== b.length) {
            return false;
        }
        for (var i = 0; i < a.length; i++) {
            if (a[i] !== b[i])
                return false;
        }
        return true;
    }
    ;
    static buffer2String(buffer: ArrayBuffer): string {
        let dataView = new DataView(buffer);
        let str = '';
        for (let i = 0; i < dataView.byteLength; ++i) {
            str += String.fromCharCode(dataView.getUint8(i));
        }
        console.log(" str = " + str);
        return str;
    }
}
