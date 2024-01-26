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
import util from '@ohos.util';
/**
 * @author Drew Noakes https://drewnoakes.com
 */
class StringValue {
    private _bytes: Int8Array;
    private readonly _charset: string;
    public constructor(bytes: Int8Array, charset: string) {
        this._bytes = bytes;
        this._charset = charset;
    }
    public getBytes(): Int8Array {
        return this._bytes;
    }
    public getCharset(): string {
        return this._charset;
    }
    public toString(charset?: any): string {
        if (charset == null) {
            return StringValue.Int8Array2String(this._bytes, this._charset);
        }
        else {
            return StringValue.Int8Array2String(this._bytes, charset);
        }
    }
    public static Int8Array2String(bytes: Int8Array, encoding: string, startIndex?: number, endIndex?: number): string {
        if (startIndex == null || startIndex == undefined) {
            startIndex = 0;
        }
        if (endIndex == null || endIndex == undefined) {
            endIndex = bytes.length;
        }
        try {
            let decoder = new util.TextDecoder(encoding);
            let arrBuf: ArrayBuffer = new ArrayBuffer(endIndex - startIndex);
            arrBuf = bytes.slice(startIndex, endIndex);
            let uint8Array = new Uint8Array(arrBuf);
            return decoder.decode(uint8Array);
        }
        catch (error) {
            return '';
        }
    }
    public static string2Int8Array(str: string): Int8Array {
        let encoder = new util.TextEncoder();
        let uint8 = encoder.encode(str);
        let arr: Array<number> = new Array();
        for (let r of uint8) {
            if (r > 127) {
                r = -(256 - r);
            }
            arr.push(r);
        }
        let int8 = new Int8Array(arr.length);
        int8.set(arr);
        return int8;
    }
}
export default StringValue;
