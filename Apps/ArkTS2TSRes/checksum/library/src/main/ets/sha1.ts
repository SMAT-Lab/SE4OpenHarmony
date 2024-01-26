let __generate__Id: number = 0;
function generateId(): string {
    return "sha1_" + ++__generate__Id;
}
/**
 *  MIT License
 *
 *  Copyright (c) 2021 Huawei Device Co., Ltd.
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
export default class sha1 {
    hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase */
    chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode */
    hex_sha1(s: string): string {
        return this.binb2hex(this.core_sha1(this.AlignSHA1(s)));
    }
    core_sha1(blockArray: number[]) {
        let x: number[] = blockArray; // append padding
        let w: number[] = Array(80);
        let a: number = 1732584193;
        let b: number = -271733879;
        let c: number = -1732584194;
        let d: number = 271733878;
        let e: number = -1009589776;
        for (let i = 0; i < x.length; i += 16) // 每次处理512位 16*32
         {
            let olda: number = a;
            let oldb: number = b;
            let oldc: number = c;
            let oldd: number = d;
            let olde: number = e;
            for (let j = 0; j < 80; j++) // 对每个512位进行80步操作
             {
                if (j < 16)
                    w[j] = x[i + j];
                else
                    w[j] = this.rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
                let t = this.safe_add(this.safe_add(this.rol(a, 5), this.sha1_ft(j, b, c, d)), this.safe_add(this.safe_add(e, w[j]), this.sha1_kt(j)));
                e = d;
                d = c;
                c = this.rol(b, 30);
                b = a;
                a = t;
            }
            a = this.safe_add(a, olda);
            b = this.safe_add(b, oldb);
            c = this.safe_add(c, oldc);
            d = this.safe_add(d, oldd);
            e = this.safe_add(e, olde);
        }
        return new Array(a, b, c, d, e);
    }
    /*
       *
       * Perform the appropriate triplet combination function for the current
       * iteration
       *
       * 返回对应F函数的值
       *
       */
    sha1_ft(t: number, b: number, c: number, d: number) {
        if (t < 20)
            return (b & c) | ((~b) & d);
        if (t < 40)
            return b ^ c ^ d;
        if (t < 60)
            return (b & c) | (b & d) | (c & d);
        return b ^ c ^ d; // t<80
    }
    /*
       *
       * Determine the appropriate additive constant for the current iteration
       *
       * 返回对应的Kt值
       *
       */
    sha1_kt(t: number) {
        return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
    }
    /*
       *
       * Add integers, wrapping at 2^32. This uses 16-bit operations internally
       *
       * to work around bugs in some JS interpreters.
       *
       * 将32位数拆成高16位和低16位分别进行相加，从而实现 MOD 2^32 的加法
       *
       */
    safe_add(x: number, y: number) {
        let lsw = (x & 0xFFFF) + (y & 0xFFFF);
        let msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }
    /*
       *
       * Bitwise rotate a 32-bit number to the left.
       *
       * 32位二进制数循环左移
       *
       */
    rol(num: number, cnt: number) {
        return (num << cnt) | (num >>> (32 - cnt));
    }
    /*
       *
       * The standard SHA1 needs the input string to fit into a block
       *
       * This function align the input string to meet the requirement
       *
       */
    AlignSHA1(str: string): number[] {
        let nblk: number = ((str.length + 8) >> 6) + 1, blks: number[] = new Array(nblk * 16);
        for (let i = 0; i < nblk * 16; i++)
            blks[i] = 0;
        for (let i = 0; i < str.length; i++) {
            blks[i >> 2] |= str.charCodeAt(i) << (24 - (i & 3) * 8);
            blks[i >> 2] |= 0x80 << (24 - (i & 3) * 8);
            blks[nblk * 16 - 1] = str.length * 8;
        }
        return blks;
    }
    /*
       *
       * Convert an array of big-endian words to a hex string.
       *
       */
    binb2hex(binarray: number[]): string {
        let hex_tab = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        let str = "";
        for (let i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
                hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
        }
        return str;
    }
}
