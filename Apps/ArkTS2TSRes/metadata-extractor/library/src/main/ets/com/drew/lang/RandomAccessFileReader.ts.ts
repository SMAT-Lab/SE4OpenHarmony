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
import fileio from '@ohos.fileio';
import RandomAccessReader from './RandomAccessReader';
class RandomAccessFileReader extends RandomAccessReader {
    public static readonly MAX_VALUE = 0x7fffffff;
    private readonly _filePath: string;
    private readonly _length: number;
    private _currentIndex: number;
    private bufArray: Int8Array = new Int8Array(4096);
    private readonly _baseOffset: number;
    public constructor(filePath: string, baseOffset?: number) {
        super();
        if (filePath == null) {
            throw new Error('Null Pointer Exception');
        }
        if (baseOffset == null || baseOffset == undefined) {
            baseOffset = 0;
        }
        this._filePath = filePath;
        this._baseOffset = baseOffset;
        this._length = this.getFileLength(filePath);
    }
    public toUnshiftedOffset(localOffset: number): number {
        return localOffset + this._baseOffset;
    }
    public getLength(): number {
        return this._length;
    }
    public getByte(index: number): number {
        if (index != this._currentIndex)
            this.seek(index);
        let b: number = this.bufArray[index];
        if (b < 0)
            throw new Error("Unexpected end of file encountered.");
        this._currentIndex++;
        return b;
    }
    public getBytes(index: number, count: number): Int8Array {
        this.validateIndex(index, count);
        if (index != this._currentIndex)
            this.seek(index);
        let bytes: Int8Array = new Int8Array(count);
        let endIndex: number = index + count;
        if (endIndex > this.bufArray.length) {
            endIndex = this.bufArray.length;
            bytes = new Int8Array(endIndex - index);
        }
        bytes = this.bufArray.slice(index, endIndex);
        this._currentIndex += bytes.length;
        if (bytes.length != count)
            throw new Error("Unexpected end of file encountered.");
        return bytes;
    }
    private seek(index: number): void {
        if (index == this._currentIndex)
            return;
        //    this._file.seek(index);
        this._currentIndex = index;
    }
    protected isValidIndex(index: number, bytesRequested: number): boolean {
        return bytesRequested >= 0
            && index >= 0
            && index + bytesRequested - 1 < this._length;
    }
    protected validateIndex(index: number, bytesRequested: number): void {
        if (!this.isValidIndex(index, bytesRequested)) {
            if (index < 0) {
                throw new Error("Attempt to read from buffer using a negative index (%d)".replace(/%d/, index.toString()));
            }
            if (bytesRequested < 0) {
                throw new Error("Number of requested bytes cannot be negative (%d)".replace(/%d/, bytesRequested.toString()));
            }
            if (index + bytesRequested - 1 > RandomAccessFileReader.MAX_VALUE) {
                throw new Error("Number of requested bytes summed with starting index exceed maximum range of signed 32 bit integers (requested index: %d, requested count: %d)"
                    .replace(/%d/, index.toString()).replace(/%d/, bytesRequested.toString()));
            }
            throw new Error("Attempt to read from beyond end of underlying data source (requested index: %d, requested count: %d, max index: %d)"
                .replace(/%d/, index.toString())
                .replace(/%d/, bytesRequested.toString())
                .replace(/%d/, (this._length - 1).toString()));
        }
    }
    private getFileLength(filePath: string): number {
        let fd = fileio.openSync(filePath, 0o2);
        let nread: number = fileio.readSync(fd, this.bufArray);
        this.bufArray = this.bufArray.slice(0, nread);
        return nread;
    }
}
export default RandomAccessFileReader;
