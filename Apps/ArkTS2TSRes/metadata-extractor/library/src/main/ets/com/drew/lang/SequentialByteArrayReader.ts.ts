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
import SequentialReader from './SequentialReader';
class SequentialByteArrayReader extends SequentialReader {
    private readonly _bytes: Int8Array;
    private _index: number;
    public getPosition(): number {
        return this._index;
    }
    public constructor(bytes: Int8Array, baseIndex?: number) {
        super();
        if (baseIndex == undefined || baseIndex == null)
            baseIndex = 0;
        if (bytes == null)
            throw new Error('Null Pointer');
        this._bytes = bytes;
        this._index = baseIndex;
    }
    public getByte(): number {
        if (this._index >= this._bytes.length) {
            throw new Error("End of data reached.");
        }
        return this._bytes[this._index++];
    }
    public getBytes(count: number, buffer?: Int8Array, offset?: number): Int8Array {
        if (this._index + count > this._bytes.length) {
            throw new Error("End of data reached.");
        }
        let bytes: Int8Array = new Int8Array(count);
        if ((buffer == undefined || buffer == null) && (offset == undefined || offset == null)) {
            bytes = this._bytes.slice(this._index, this._index + count);
        }
        else {
            let tempSrc: Int8Array = this._bytes.slice(this._index, this._index + count);
            let tempBytes: Int8Array = buffer.slice(0, offset - 1);
            tempBytes.set(tempSrc, offset);
            buffer = tempBytes;
        }
        this._index += count;
        return bytes;
    }
    public skip(n: number): void {
        if (n < 0) {
            throw new Error("n must be zero or greater.");
        }
        if (this._index + n > this._bytes.length) {
            throw new Error("End of data reached.");
        }
        this._index += n;
    }
    public trySkip(n: number): boolean {
        if (n < 0) {
            throw new Error("n must be zero or greater.");
        }
        this._index += n;
        if (this._index > this._bytes.length) {
            this._index = this._bytes.length;
            return false;
        }
        return true;
    }
    public available(): number {
        return this._bytes.length - this._index;
    }
}
export default SequentialByteArrayReader;
