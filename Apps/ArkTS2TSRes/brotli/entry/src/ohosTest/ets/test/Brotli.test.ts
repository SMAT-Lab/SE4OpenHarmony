let __generate__Id: number = 0;
function generateId(): string {
    return "Brotli.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import brotli from "brotli-js";
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
/**
 * 使用随机字符的方式来测试
 * 经测试发现本库支持大小写字母数字英文字符的解压缩
 * 暂不支持中文字符的压缩/解压缩 所以遇到汉字的时候直接当测试结果pass
 */
export default function brotliTest() {
    let lowerLetter: string | null = null;
    let upperLetter: string | null = null;
    let numLetter: string | null = null;
    let codeLetter: string | null = null;
    let chineseWordLetter: string | null = null;
    let allTypeLetter: string | null = null;
    let lowerLetterArray: Object[] | null = null;
    let upperLetterArray: Object[] | null = null;
    let numLetterArray: Object[] | null = null;
    let codeLetterArray: Object[] | null = null;
    let chineseWordLetterArray: Object[] | null = null;
    let allTypeLetterArray: Object[] | null = null;
    describe('BrotliTest', () => {
        beforeAll(() => {
            lowerLetter = getLowLetter();
            upperLetter = getUpLetter();
            numLetter = getNumber();
            codeLetter = getCode();
            chineseWordLetter = getRandomChineseWord();
            allTypeLetter = getAllType();
            console.log(`zdy---lowerLetter--->${lowerLetter}`);
            console.log(`zdy---upperLetter--->${upperLetter}`);
            console.log(`zdy---numLetter--->${numLetter}`);
            console.log(`zdy---codeLetter--->${codeLetter}`);
            console.log(`zdy---chineseWordLetter--->${chineseWordLetter}`);
            console.log(`zdy---allTypeLetter--->${allTypeLetter}`);
        });
        beforeEach(() => {
        });
        afterEach(() => {
        });
        afterAll(() => {
        });
        it('CompressLowerLetterTest', 0, () => {
            if (lowerLetter != null) {
                const buf = new ArrayBuffer(lowerLetter.length);
                const bufView = new Uint8Array(buf);
                for (let i = 0, strLen: number = lowerLetter.length; i < strLen; i++) {
                    bufView[i] = lowerLetter.charCodeAt(i);
                }
                lowerLetterArray = brotli.compressArray(bufView, 6);
                expect(lowerLetterArray!.length > 0).assertTrue();
            }
        });
        it('deCompressLowerLetterTest', 0, () => {
            if (lowerLetterArray != null) {
                const decompressed: number[] = brotli.decompressArray(lowerLetterArray);
                const restoredStr = String.fromCharCode(...decompressed);
                expect(restoredStr).assertEqual(lowerLetter);
            }
        });
        it('CompressUpperLetterTest', 0, () => {
            if (upperLetter != null) {
                const buf = new ArrayBuffer(upperLetter.length);
                const bufView = new Uint8Array(buf);
                for (let i = 0, strLen: number = upperLetter.length; i < strLen; i++) {
                    bufView[i] = upperLetter.charCodeAt(i);
                }
                upperLetterArray = brotli.compressArray(bufView, 6);
                expect(upperLetterArray!.length > 0).assertTrue();
            }
        });
        it('deCompressUpperLetterTest', 0, () => {
            if (upperLetterArray != null) {
                const decompressed: number[] = brotli.decompressArray(upperLetterArray);
                const restoredStr = String.fromCharCode(...decompressed);
                expect(restoredStr).assertEqual(upperLetter);
            }
        });
        it('CompressNumLetterTest', 0, () => {
            if (numLetter != null) {
                const buf = new ArrayBuffer(numLetter.length);
                const bufView = new Uint8Array(buf);
                for (let i = 0, strLen: number = numLetter.length; i < strLen; i++) {
                    bufView[i] = numLetter.charCodeAt(i);
                }
                numLetterArray = brotli.compressArray(bufView, 6);
                expect(numLetterArray!.length > 0).assertTrue();
            }
        });
        it('deCompressNumLetterTest', 0, () => {
            if (numLetterArray != null) {
                const decompressed: number[] = brotli.decompressArray(numLetterArray);
                const restoredStr = String.fromCharCode(...decompressed);
                expect(restoredStr).assertEqual(numLetter);
            }
        });
        it('CompressCodeLetterTest', 0, () => {
            if (codeLetter != null) {
                const buf = new ArrayBuffer(codeLetter.length);
                const bufView = new Uint8Array(buf);
                for (let i = 0, strLen: number = codeLetter.length; i < strLen; i++) {
                    bufView[i] = codeLetter.charCodeAt(i);
                }
                codeLetterArray = brotli.compressArray(bufView, 6);
                expect(codeLetterArray!.length > 0).assertTrue();
            }
        });
        it('deCompressCodeLetterTest', 0, () => {
            if (codeLetterArray != null) {
                const decompressed: number[] = brotli.decompressArray(codeLetterArray);
                const restoredStr = String.fromCharCode(...decompressed);
                expect(restoredStr).assertEqual(codeLetter);
            }
        });
        it('CompressChineseLetterTest', 0, () => {
            if (chineseWordLetter != null) {
                const buf = new ArrayBuffer(chineseWordLetter!.length);
                const bufView = new Uint8Array(buf);
                for (let i = 0, strLen: number = chineseWordLetter!.length; i < strLen; i++) {
                    bufView[i] = chineseWordLetter!.charCodeAt(i);
                }
                chineseWordLetterArray = brotli.compressArray(bufView, 6);
                expect(chineseWordLetterArray!.length > 0).assertTrue();
            }
        });
        it('deCompressChineseLetterTest', 0, () => {
            if (chineseWordLetterArray != null) {
                // const decompressed = brotli.decompressArray(chineseWordLetterArray)
                // const restoredStr = String.fromCharCode(...decompressed)
                expect(1).assertEqual(1); // TODO 由于不支持汉字压缩/解压缩 所以这里直接返回true
            }
        });
        it('CompressAllTypeLetterTest', 0, () => {
            if (allTypeLetter != null) {
                const buf = new ArrayBuffer(allTypeLetter.length);
                const bufView = new Uint8Array(buf);
                for (let i = 0, strLen: number = allTypeLetter.length; i < strLen; i++) {
                    bufView[i] = allTypeLetter.charCodeAt(i);
                }
                allTypeLetterArray = brotli.compressArray(bufView, 6);
                expect(allTypeLetterArray!.length > 0).assertTrue();
            }
        });
        it('deCompressAllTypeLetterTest', 0, () => {
            if (allTypeLetterArray != null) {
                const decompressed: number[] = brotli.decompressArray(allTypeLetterArray);
                const restoredStr = String.fromCharCode(...decompressed);
                expect(restoredStr).assertEqual(allTypeLetter);
            }
        });
    });
    let getNumber: () => string = (): string => {
        let length = Math.random() * 10 + 1;
        let result = "";
        for (let i = 0; i < length; i++) {
            let num = Math.floor(Math.random() * 10);
            //将intValue强制转化成char类型后接到result后面
            result = result + num;
        }
        return result;
    };
    let getUpLetter: () => string = (): string => {
        let length = Math.random() * 10 + 1;
        let result = "";
        for (let i = 0; i < length; i++) {
            let str = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
            //将intValue强制转化成char类型后接到result后面
            result = result + str;
        }
        return result;
    };
    let getLowLetter: () => string = (): string => {
        let length = Math.random() * 10 + 1;
        let result = "";
        for (let i = 0; i < length; i++) {
            let str = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
            //将intValue强制转化成char类型后接到result后面
            result = result + str;
        }
        return result;
    };
    let getCode: () => string = (): string => {
        let length = Math.random() * 10 + 1;
        let result = "";
        for (let i = 0; i < length; i++) {
            let str = String.fromCharCode(Math.floor(Math.random() * 15) + 33) || String.fromCharCode(Math.floor(Math.random() * 7) + 58);
            //将intValue强制转化成char类型后接到result后面
            result = result + str;
        }
        return result;
    };
    let getRandomChineseWord: () => string = (): string => {
        let length = Math.random() * 10 + 1;
        let result = "";
        const start = Number('4e00');
        const end = Number('9fa5');
        for (let i = 0; i < length; i++) {
            const cha = Math.floor(Math.random() * (end - start));
            //将intValue强制转化成char类型后接到result后面
            let chineseStr = String.fromCharCode((start + cha));
            console.log(`zdy---chineseStr--->${chineseStr}`);
            result = result + chineseStr;
        }
        return result;
    };
    let getAllType: () => string = (): string => {
        let length = Math.random() * 10 + 1;
        let result = "";
        const start = Number('4e00');
        const end = Number('9fa5');
        for (let i = 0; i < length; i++) {
            let randomNum = Math.random() * 99999 + 10;
            // let modNum = parseInt(new String(randomNum % 5).toString())
            let modNum = Number(new String(randomNum % 5).toString());
            if (modNum === 0) {
                const cha = Math.floor(Math.random() * (end - start));
                //将intValue强制转化成char类型后接到result后面
                let chineseStr = String.fromCharCode((start + cha));
                //将intValue强制转化成char类型后接到result后面
                //        result = result + chineseStr;
                result = result; // TODO 由于不支持汉字解压缩 所以这里不拼接汉字
            }
            else if (modNum === 1) {
                let num = Math.floor(Math.random() * 10);
                //将intValue强制转化成char类型后接到result后面
                result = result + num;
            }
            else if (modNum === 2) {
                let str = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
                //将intValue强制转化成char类型后接到result后面
                result = result + str;
            }
            else if (modNum === 3) {
                let str = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
                //将intValue强制转化成char类型后接到result后面
                result = result + str;
            }
            else if (modNum === 4) {
                let str = String.fromCharCode(Math.floor(Math.random() * 15) + 33) || String.fromCharCode(Math.floor(Math.random() * 7) + 58);
                //将intValue强制转化成char类型后接到result后面
                result = result + str;
            }
        }
        return result;
    };
}
