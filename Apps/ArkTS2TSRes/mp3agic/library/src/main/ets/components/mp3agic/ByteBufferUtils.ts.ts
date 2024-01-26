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
import { BufferTools } from "./BufferTools";
export class ByteBufferUtils {
    public static extractNullTerminatedString(bytes: number[], position?: number): string {
        let nullPos = 0;
        let startNum = 0;
        if (position) {
            startNum = position;
        }
        for (let i = startNum; i < bytes.length; i++) {
            if (bytes[i] == 0) {
                nullPos = i;
                break;
            }
        }
        let s = BufferTools.byteBufferToString(bytes, 0, bytes.length);
        s = s.substring(startNum, nullPos);
        return s;
    }
    // 源码jar抽取的方法
    public static getInt(b3: number, b2: number, b1: number, b0: number): number {
        return (((b3) << 24) |
            ((b2 & 0xff) << 16) |
            ((b1 & 0xff) << 8) |
            ((b0 & 0xff)));
    }
}
