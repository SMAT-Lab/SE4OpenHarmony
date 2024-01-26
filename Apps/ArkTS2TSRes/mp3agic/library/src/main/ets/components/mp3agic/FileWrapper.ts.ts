/**
 *  MIT License
 *
 *  Copyright (c) 2023 Huawei Device Co., Ltd.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */
import fileio from '@ohos.fileio';
import { IOException } from './IOException';
export class FileWrapper {
    public static DEFAULT_BUFFER_LENGTH: number = 65536;
    path: string;
    length: number;
    lastModified: number;
    constructor(path: string) {
        this.path = path;
        this.initFileWrapper();
    }
    private initFileWrapper(): void {
        try {
            fileio.accessSync(this.path);
            let fd = fileio.openSync(this.path, 0o2);
            let buf = new ArrayBuffer(FileWrapper.DEFAULT_BUFFER_LENGTH);
            this.length = fileio.readSync(fd, buf);
        }
        catch (error) {
            throw new IOException();
        }
    }
    public getFilename(): string {
        return this.path;
    }
    public getLength(): number {
        return this.length;
    }
}
