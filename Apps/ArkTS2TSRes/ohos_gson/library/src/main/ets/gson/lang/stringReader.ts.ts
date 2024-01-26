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
export class StringReader {
    private str: Array<string>;
    private length: number;
    private next: number = 0;
    private mark: number = 0;
    constructor(s: string) {
        this.str = s.split("");
        this.length = s.length;
    }
    private ensureOpen() {
        if (this.str === null || this.str === undefined) {
            throw new Error('Steam closed');
        }
    }
    public read(): number | string {
        this.ensureOpen();
        return this.next >= this.length ? -1 : this.str[this.next];
    }
    public readBufferOption(cbuf: Array<string>, off: number, len: number): StringReaderOption {
        let option = new StringReaderOption();
        let orglen = cbuf.length;
        this.ensureOpen();
        if (off >= 0 && off <= cbuf.length && len >= 0 && off + len <= cbuf.length && off + len >= 0) {
            if (len === 0) {
                option.buffer = [];
                option.n = 0;
                return option;
            }
            else if (this.next >= this.length) {
                option.buffer = [];
                option.n = -1;
                return option;
            }
            else {
                let n = Math.min(this.length - this.next, len);
                if (off > 0) {
                    option.buffer = cbuf.slice(0, off).concat(this.str.slice(this.next, this.next + n));
                    if (option.buffer.length < orglen) {
                        option.buffer = option.buffer.concat(cbuf.slice(orglen - option.buffer.length, orglen));
                    }
                }
                else {
                    option.buffer = this.str.slice(this.next, this.next + n);
                    if (option.buffer.length < orglen) {
                        option.buffer = option.buffer.concat(cbuf.slice(orglen - option.buffer.length, orglen));
                    }
                }
                option.n = n;
                this.next += n;
                return option;
            }
        }
        else {
            throw new Error("IndexOutOfBoundsException");
        }
    }
    public readBuffer(cbuf: Array<string>, off: number, len: number): number {
        this.ensureOpen();
        if (off >= 0 && off <= cbuf.length && len >= 0 && off + len <= cbuf.length && off + len >= 0) {
            if (len === 0) {
                return 0;
            }
            else if (this.next >= this.length) {
                return -1;
            }
            else {
                let n = Math.min(this.length - this.next, len);
                for (let i = 0; i < n; i++) {
                    cbuf[off + i] = this.str[i + this.next];
                }
                this.next += n;
                return n;
            }
        }
        else {
            throw new Error("IndexOutOfBoundsException");
        }
    }
    public close(): void {
        this.str = null;
    }
}
export class StringReaderOption {
    public n: number;
    public buffer: Array<string>;
}
