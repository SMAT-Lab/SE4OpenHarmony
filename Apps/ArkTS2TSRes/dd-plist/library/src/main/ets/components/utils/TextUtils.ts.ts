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
export default class TextUtils {
    public static isEmpty(text: string): boolean {
        return text == null || text == undefined || text.length == 0;
    }
    public static toCharArray(text: string): Array<string> {
        let arr: string[] = new Array(text.length);
        for (let i = 0; i < text.length; i++) {
            arr[i] = text.charAt(i);
        }
        return arr;
    }
    public static equalsIgnoreCase(s1: string, s2: string): boolean {
        return s1.toLowerCase() == s2.toLowerCase();
    }
    public static compareToIgnoreCase(s1: string, s2: string): number {
        let n1 = s1.length;
        let n2 = s2.length;
        let min = Math.min(n1, n2);
        for (let i = 0; i < min; i++) {
            let c1 = s1.charAt(i);
            let c2 = s2.charAt(i);
            if (c1 != c2) {
                c1 = c1.toUpperCase();
                c2 = c2.toUpperCase();
                if (c1 != c2) {
                    return c1.charCodeAt(0) - c2.charCodeAt(0);
                }
            }
        }
        return n1 - n2;
    }
    public static hashCode(str: string) {
        var hash = 0;
        if (!this.isEmpty(str)) {
            for (var i = 0; i < str.length; i++) {
                hash = hash * 31 + str.charCodeAt(i);
                hash = this.intValue(hash);
            }
        }
        return hash;
    }
    public static intValue(num): number {
        var MAX_VALUE = 0x7fffffff;
        var MIN_VALUE = -0x80000000;
        if (num > MAX_VALUE || num < MIN_VALUE) {
            return num &= 0xFFFFFFFF;
        }
        return num;
    }
    public static contains(str: string, searchStr: string | RegExp): boolean {
        return str.search(searchStr) == -1 ? false : true;
    }
    public static string2BytesForASCIIEncoding(s: string): Int8Array {
        let arr: Array<string> = TextUtils.toCharArray(s);
        let tempArr: Array<number> = new Array();
        for (let str of arr) {
            let r = str.charCodeAt(0);
            tempArr.push(r);
        }
        let result: Int8Array = new Int8Array(tempArr.length);
        result.set(tempArr);
        return result;
    }
}
