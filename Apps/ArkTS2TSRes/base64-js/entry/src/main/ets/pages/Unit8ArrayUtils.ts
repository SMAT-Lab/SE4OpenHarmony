let __generate__Id: number = 0;
function generateId(): string {
    return "Unit8ArrayUtils_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
export class Unit8ArrayUtils {
    public static Uint8ArrayToString(array: Uint8Array): string {
        let out: string = '';
        let i: number = 0;
        let len: number = 0;
        let c: number = -1;
        let char2: number = -1;
        let char3: number = -1;
        let tempAry: Uint8Array = array;
        len = tempAry.length;
        i = 0;
        while (i < len) {
            c = tempAry[i++];
            switch (c >> 4) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    // 0xxxxxxx
                    out += String.fromCharCode(c);
                    break;
                case 12:
                case 13:
                    // 110x xxxx   10xx xxxx
                    char2 = tempAry[i++];
                    out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                    break;
                case 14:
                    // 1110 xxxx  10xx xxxx  10xx xxxx
                    char2 = tempAry[i++];
                    char3 = tempAry[i++];
                    out += String.fromCharCode(((c & 0x0F) << 12) |
                        ((char2 & 0x3F) << 6) |
                        ((char3 & 0x3F) << 0));
                    break;
            }
        }
        return out;
    }
    public static stringToUint8Array(string: string) {
        let pos = 0;
        const len = string.length;
        const out = [];
        let at = 0; // output position
        let tlen = Math.max(32, len + (len >> 1) + 7); // 1.5x size
        let target = new Uint8Array((tlen >> 3) << 3); // ... but at 8 byte offset
        while (pos < len) {
            let value = string.charCodeAt(pos++);
            if (value >= 0xd800 && value <= 0xdbff) {
                // high surrogate
                if (pos < len) {
                    const extra = string.charCodeAt(pos);
                    if ((extra & 0xfc00) === 0xdc00) {
                        ++pos;
                        value = ((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000;
                    }
                }
                if (value >= 0xd800 && value <= 0xdbff) {
                    continue; // drop lone surrogate
                }
            }
            // expand the buffer if we couldn't write 4 bytes
            if (at + 4 > target.length) {
                tlen += 8; // minimum extra
                tlen *= (1.0 + (pos / string.length) * 2); // take 2x the remaining
                tlen = (tlen >> 3) << 3; // 8 byte offset
                const update = new Uint8Array(tlen);
                update.set(target);
                target = update;
            }
            if ((value & 0xffffff80) === 0) { // 1-byte
                target[at++] = value; // ASCII
                continue;
            }
            else if ((value & 0xfffff800) === 0) { // 2-byte
                target[at++] = ((value >> 6) & 0x1f) | 0xc0;
            }
            else if ((value & 0xffff0000) === 0) { // 3-byte
                target[at++] = ((value >> 12) & 0x0f) | 0xe0;
                target[at++] = ((value >> 6) & 0x3f) | 0x80;
            }
            else if ((value & 0xffe00000) === 0) { // 4-byte
                target[at++] = ((value >> 18) & 0x07) | 0xf0;
                target[at++] = ((value >> 12) & 0x3f) | 0x80;
                target[at++] = ((value >> 6) & 0x3f) | 0x80;
            }
            else {
                continue;
            }
            target[at++] = (value & 0x3f) | 0x80;
        }
        return target.subarray(0, at);
    }
}
