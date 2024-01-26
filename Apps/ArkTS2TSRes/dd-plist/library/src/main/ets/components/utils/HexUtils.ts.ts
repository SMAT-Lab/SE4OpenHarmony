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
import TextUtils from './TextUtils';
type char = string;
type byte = number;
export default class HexUtil {
    private static readonly DIGITS_LOWER: char[] = ['0', '1', '2', '3', '4', '5',
        '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    private static readonly DIGITS_UPPER: char[] = ['0', '1', '2', '3', '4', '5',
        '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    public static encodeHex(data: Int8Array, toLowerCase: boolean = true): char[] {
        return HexUtil.encodeHexInner(data, toLowerCase ? HexUtil.DIGITS_LOWER : HexUtil.DIGITS_UPPER);
    }
    protected static encodeHexInner(data: Int8Array, toDigits: char[]): char[] {
        if (!data)
            return null;
        let l: number = data.length;
        let out: char[] = new Array(l << 1);
        for (let i = 0, j = 0; i < l; i++) {
            out[j++] = toDigits[(0xF0 & data[i]) >>> 4];
            out[j++] = toDigits[0x0F & data[i]];
        }
        return out;
    }
    private static byteToString(data: char[]): string {
        let str = '';
        for (let i = 0; i < data.length; i++) {
            str += data[i];
        }
        return str;
    }
    public static encodeHexStr(data: Int8Array, toLowerCase: boolean = true): string {
        return HexUtil.encodeHexStrInner(data, toLowerCase ? HexUtil.DIGITS_LOWER : HexUtil.DIGITS_UPPER);
    }
    protected static encodeHexStrInner(data: Int8Array, toDigits: char[]): string {
        return HexUtil.byteToString(HexUtil.encodeHexInner(data, toDigits));
    }
    public static formatHexString(data: Int8Array, addSpace: boolean = false): string {
        if (!data || data.length < 1)
            return null;
        let sb: string = '';
        for (let i: number = 0; i < data.length; i++) {
            let hex: String = (data[i] & 0xFF).toString(16);
            if (hex.length == 1) {
                hex = '0' + hex;
            }
            sb = sb + hex;
            if (addSpace)
                sb = sb + " ";
        }
        return sb;
    }
    public static decodeHex(data: char[]): byte[] {
        let len: number = data.length;
        if ((len & 0x01) != 0) {
            throw new Error("Odd number of characters.");
        }
        let out: byte[] = new Array(len >> 1);
        // two characters form the hex value.
        for (let i: number = 0, j = 0; j < len; i++) {
            let f: number = HexUtil.toDigit(data[j], j) << 4;
            j++;
            f = f | HexUtil.toDigit(data[j], j);
            j++;
            out[i] = (f & 0xFF);
        }
        return out;
    }
    protected static toDigit(ch: char, index: number): number {
        let digit: number = HexUtil.charToByte(ch.toUpperCase()); //Character.digit(ch, 16);
        if (digit == -1) {
            throw new Error("Illegal hexadecimal character " + ch
                + " at index " + index);
        }
        return digit;
    }
    public static hexStringToBytes(hexString: string): Int8Array {
        if (TextUtils.isEmpty(hexString)) {
            return null;
        }
        hexString = hexString.trim();
        hexString = hexString.toUpperCase();
        let length: number = hexString.length / 2;
        let hexChars: char[] = TextUtils.toCharArray(hexString);
        let d: byte[] = new Array(length);
        for (let i = 0; i < length; i++) {
            let pos = i * 2;
            d[i] = (HexUtil.charToByte(hexChars[pos]) << 4 | HexUtil.charToByte(hexChars[pos + 1]));
        }
        return new Int8Array(d);
    }
    public static charToByte(c: char): byte {
        return "0123456789ABCDEF".indexOf(c);
    }
    public static extractData(data: Int8Array, position: number): String {
        return HexUtil.formatHexString(new Int8Array([data[position]]));
    }
}
