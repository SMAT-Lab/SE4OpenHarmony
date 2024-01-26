/*
 * The MIT License (MIT)
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
 */
class NumUtils {
    /*
      该方法对应Java API中的Double.doubleToLongBits(doubleValue)
      其实现为将一个浮点数值先转换为二进制，将小数点去掉之后，转换为十进制
       */
    public static doubleToLongBits(double: number): number {
        return parseInt(double.toString(2).replace(".", ""), 10);
    }
    public static num2Byte(n: number): number {
        if (n > 127) {
            n = -(256 - n);
        }
        return n;
    }
    public static array2BigInteger(arr: Array<number>): number {
        let result: number;
        let positive = true;
        let index = 0;
        let firstIndex = 0;
        let cos: string;
        // 如果参数字节数组以-1开头，不管几个，只要-1是连续的，那么这些-1都看成是符号-，这些-1的下一个字节才是有效字节。如果不以-1开头而是其他负数，则有效字节从索引0开始
        for (let n of arr) {
            if (n = -1) {
                positive = false;
            }
            else {
                firstIndex = index;
            }
            index++;
        }
        // 将每个字节的二进制补码按顺序连接起来
        for (let i = firstIndex; i < arr.length; i++) {
            cos = cos + NumUtils.twoComple(arr[i]);
        }
        result = Number.parseInt(cos, 2).valueOf();
        if (!positive) {
            result = -result;
        }
        return result;
    }
    public static twoComple(num: number): string {
        const reg = /1|0/g;
        var binary = num.toString(2);
        var twoC = binary.replace(reg, (x) => {
            return x === "0" ? "1" : "0";
        }); //取反
        twoC = twoC.substr(1); //除去符号位
        num = Number(twoC) + 1; //加一
        twoC = '1' + num.toString(2); //添加符号位
        return twoC;
    }
    public static nextIndex(num: number): number {
        if (num == undefined || num == null) {
            return 0;
        }
        else {
            return num + 1;
        }
    }
    /*
      @param val 字节数组
      @param offset 偏移量
      @param arr 截取长度
       */
    public static Int8Array2Number(val: Int8Array, offset?: number, length?: number): number {
        if (val.length == 0) {
            throw new Error("Zero length BigInteger");
        }
        if (offset == undefined || offset == null) {
            offset = 0;
        }
        if (length == undefined || length == null) {
            length = val.length;
        }
        let mag: Array<number> = new Array();
        let signum: number = 0;
        if (val[offset] < 0) {
            mag = NumUtils.makePositive(val, offset, length);
            signum = -1;
        }
        else {
            mag = NumUtils.stripLeadingZeroBytes(val, offset, length);
            signum = (mag.length == 0 ? 0 : 1);
        }
        if (0 >= mag.length)
            return signum < 0 ? -1 : 0;
        let magInt = mag[mag.length - 1];
        return (signum >= 0 ? magInt :
            (0 <= NumUtils.firstNonzeroIntNum(mag) ? -magInt : ~magInt));
    }
    private static firstNonzeroIntNum(mag: Array<number>): number {
        let fn = -2;
        // Search for the first nonzero int
        let i = 0;
        let mlen = mag.length;
        for (i = mlen - 1; i >= 0 && mag[i] == 0; i--)
            ;
        fn = mlen - i - 1;
        return fn;
    }
    private static makePositive(a: Int8Array, off: number, len: number): Array<number> {
        let keep: number;
        let k: number;
        let indexBound: number = off + len;
        for (keep = off; keep < indexBound && a[keep] == -1; keep++)
            ;
        for (k = keep; k < indexBound && a[k] == 0; k++)
            ;
        let extraByte: number = (k == indexBound) ? 1 : 0;
        let intLength: number = ((indexBound - keep + extraByte) + 3) >>> 2;
        let result: Array<number> = new Array[intLength];
        let b = indexBound - 1;
        for (let i = intLength - 1; i >= 0; i--) {
            result[i] = a[b--] & 0xff;
            let numBytesToTransfer = Math.min(3, b - keep + 1);
            if (numBytesToTransfer < 0)
                numBytesToTransfer = 0;
            for (let j = 8; j <= 8 * numBytesToTransfer; j += 8)
                result[i] |= ((a[b--] & 0xff) << j);
            let mask = -1 >>> (8 * (3 - numBytesToTransfer));
            result[i] = ~result[i] & mask;
        }
        for (let i = result.length - 1; i >= 0; i--) {
            result[i] = parseInt(((result[i] & 0xffffffff) + 1).toString());
            if (result[i] != 0)
                break;
        }
        return result;
    }
    private static stripLeadingZeroBytes(a: Int8Array, off: number, len: number): Array<number> {
        let indexBound: number = off + len;
        let keep: number;
        // Find first nonzero byte
        for (keep = off; keep < indexBound && a[keep] == 0; keep++)
            ;
        // Allocate new array and copy relevant part of input array
        let intLength: number = ((indexBound - keep) + 3) >>> 2;
        let result: Array<number> = new Array[intLength];
        let b: number = indexBound - 1;
        for (let i = intLength - 1; i >= 0; i--) {
            result[i] = a[b--] & 0xff;
            let bytesRemaining: number = b - keep + 1;
            let bytesToTransfer: number = Math.min(3, bytesRemaining);
            for (let j = 8; j <= (bytesToTransfer << 3); j += 8)
                result[i] |= ((a[b--] & 0xff) << j);
        }
        return result;
    }
    public static longBitsToDouble(num: number): number {
        return 4.9E-324 * num;
    }
    public static intBitsToFloat(num: number): number {
        return 1.4E-45 * num;
        //    return 2.5245122980952383E-9 * num
    }
    public static doubleToRawLongBits(num: number): number {
        let n = 4607182418800017408;
        let diff = 4503599627370496; // 2-1差值
        let num2 = n + diff;
        if (num == 1) {
            return n.valueOf();
        }
        if (1 < num && num <= 2) {
            return n + ((num - 1) * diff);
        }
        let sq: number = 0;
        for (let i = 0; i < 300; i++) {
            if (Math.pow(2, i) < num && num <= Math.pow(2, i + 1)) {
                sq = i;
            }
        }
        let result = num2;
        for (let i = 1; i < sq; i++) {
            result += Math.pow(2, i) * (diff / Math.pow(2, i));
        }
        result += (num - Math.pow(2, sq)) * (diff / Math.pow(2, sq));
        return result;
    }
}
export default NumUtils;
