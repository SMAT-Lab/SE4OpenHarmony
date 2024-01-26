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
import util from '@ohos.util';
class ArrayUtils {
    public static isEmpty(arr: any): boolean {
        return arr == null || arr == undefined || arr.length == 0;
    }
    public static hashCode(a: Int8Array): number {
        if (a == null) {
            return 0;
        }
        let result = 1;
        for (let element of a) {
            result = 31 * result + element;
        }
        return result;
    }
    /*
      <p>将字节数组转成指定编码格式的字符串</p>
        @param bytes 字节数组
        @param encoding 编码格式
        @param startIndex 起始位置（下标）
        @param endIndex 结束位置（下标）
       */
    public static array2String(bytes: Array<number>, encoding: string, startIndex?: number, endIndex?: number): string {
        if (startIndex == null || startIndex == undefined) {
            startIndex = 0;
        }
        if (endIndex == null || endIndex == undefined) {
            endIndex = bytes.length;
        }
        let decoder = new util.TextDecoder(encoding);
        let arrBuf: ArrayBuffer = new ArrayBuffer(bytes.length / 2);
        let uint8Array = new Uint8Array(arrBuf, startIndex, endIndex);
        uint8Array.set(bytes);
        return decoder.decode(uint8Array);
    }
    public static UniCodeUintOrInt8Array2String(bytes: Uint8Array | Int8Array, startIndex?: number, endIndex?: number): string {
        if (startIndex == null || startIndex == undefined) {
            startIndex = 0;
        }
        if (endIndex == null || endIndex == undefined) {
            endIndex = bytes.length;
        }
        let dataString = '';
        for (let i = startIndex; i < endIndex; i++) {
            dataString += String.fromCharCode(bytes[i]);
        }
        return dataString;
    }
    public static Int8Array2String(bytes: Int8Array, encoding: string, startIndex?: number, endIndex?: number): string {
        if (startIndex == null || startIndex == undefined) {
            startIndex = 0;
        }
        if (endIndex == null || endIndex == undefined) {
            endIndex = bytes.byteLength;
        }
        let decoder = new util.TextDecoder(encoding);
        let uint8Array = new Uint8Array(bytes.buffer, startIndex, endIndex);
        return decoder.decode(uint8Array);
    }
    public static arrayBuffer2String(bytes: ArrayBuffer, encoding: string, startIndex?: number, endIndex?: number): string {
        if (startIndex == null || startIndex == undefined) {
            startIndex = 0;
        }
        if (endIndex == null || endIndex == undefined) {
            endIndex = bytes.byteLength;
        }
        let decoder = new util.TextDecoder(encoding);
        let uint8Array = new Uint8Array(bytes, startIndex, endIndex);
        return decoder.decode(uint8Array);
    }
    public static string2Array(s: string): Array<string> {
        let arr: Array<string> = new Array();
        for (let i = 0; i < s.length; i++) {
            arr.push(s.charAt(i));
        }
        return arr;
    }
    public static equals(arr1: Array<any>, arr2: Array<any>): boolean {
        let map: Map<string, string> = new Map();
        for (let [key, value] of map.entries()) {
        }
        if (arr1 == null || arr2 == null) {
            throw new Error('array is empty');
        }
        else if (arr1.length != arr2.length) {
            return false;
        }
        else {
            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i] != arr2[i]) {
                    return false;
                }
            }
        }
        return true;
    }
    public static uint8Arr2Int8Arr(arr: Uint8Array): Int8Array {
        let int8: Int8Array = new Int8Array(arr.byteLength);
        let array: Array<number> = new Array();
        for (let n of arr) {
            if (n > 127) {
                n = -(256 - n);
            }
            array.push(n);
        }
        int8.set(array);
        return int8;
    }
}
export default ArrayUtils;
