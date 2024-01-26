/*
Copyright (c) 2022 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
export class Iso2022Converter {
    private static ISO_8859_1 = "ISO-8859-1";
    private static UTF_8 = "UTF-8";
    private static LATIN_CAPITAL_A = 0x41;
    private static DOT = 0xe280a2;
    private static LATIN_CAPITAL_G = 0x47;
    private static PERCENT_SIGN = 0x25;
    private static DOT_SIGN = 0x2E;
    private static ESC = 0x1B;
    public static convertISO2022CharsetToJavaCharset(bytes: number[]): string {
        if (bytes.length > 2 && bytes[0] == Iso2022Converter.ESC && bytes[1] == Iso2022Converter.PERCENT_SIGN && bytes[2] == Iso2022Converter.LATIN_CAPITAL_G)
            return Iso2022Converter.UTF_8;
        if (bytes.length > 2 && bytes[0] == Iso2022Converter.ESC && bytes[1] == Iso2022Converter.DOT_SIGN && bytes[2] == Iso2022Converter.LATIN_CAPITAL_A)
            return Iso2022Converter.ISO_8859_1;
        if (bytes.length > 3 && bytes[0] == Iso2022Converter.ESC && (bytes[3] & 0xFF | ((bytes[2] & 0xFF) << 8) | ((bytes[1] & 0xFF) << 16)) == Iso2022Converter.DOT && bytes[4] == Iso2022Converter.LATIN_CAPITAL_A)
            return Iso2022Converter.ISO_8859_1;
        return null;
    }
    static guessCharSet(bytes: number[]): string {
        let encodings = [Iso2022Converter.UTF_8, Iso2022Converter.ISO_8859_1];
        for (var index = 0; index < encodings.length; index++) {
            try {
                return this.byteToString(bytes);
            }
            catch (e) {
                // fall through...
            }
        }
        return null;
    }
    constructor() {
    }
    static byteToString(arr) {
        if (typeof arr === 'string') {
            return arr;
        }
        var str = '', _arr = arr;
        for (var i = 0; i < _arr.length; i++) {
            var one = _arr[i].toString(2), v = one.match(/^1+?(?=0)/);
            if (v && one.length == 8) {
                var bytesLength = v[0].length;
                var store = _arr[i].toString(2).slice(7 - bytesLength);
                for (var st = 1; st < bytesLength; st++) {
                    store += _arr[st + i].toString(2).slice(2);
                }
                str += String.fromCharCode(parseInt(store, 2));
                i += bytesLength - 1;
            }
            else {
                str += String.fromCharCode(_arr[i]);
            }
        }
        return str;
    }
}
