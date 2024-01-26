let __generate__Id: number = 0;
function generateId(): string {
    return "JsSha1.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2021 Huawei Device Co., Ltd.
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
// @ts-ignore
import sha1 from 'js-sha1';
export default function jsSha1Test() {
    describe('JsSha1Test', function () {
        beforeAll(function () {
        });
        beforeEach(function () {
        });
        afterEach(function () {
        });
        afterAll(function () {
        });
        it('EmptyStringTest', 0, function () {
            let result = sha1('');
            expect(result).assertEqual('da39a3ee5e6b4b0d3255bfef95601890afd80709');
        });
        it('LetterTest', 0, function () {
            let result = sha1('The quick brown fox jumps over the lazy dog');
            expect(result).assertEqual('2fd4e1c67a2d28fced849ee1bb76e7391b93eb12');
        });
        it('LetterPunctuationTest', 0, function () {
            let result = sha1('The quick brown fox jumps over the lazy dog.');
            expect(result).assertEqual('408d94384216f890ff7a0c3528e8bed1e0b01621');
        });
        it('ChineseLettersTest', 0, function () {
            let result = sha1('中文');
            expect(result).assertEqual('7be2d2d20c106eee0836c9bc2b939890a78e8fb3');
        });
        it('EmptyArrayTest', 0, function () {
            let result = sha1([]);
            expect(result).assertEqual('da39a3ee5e6b4b0d3255bfef95601890afd80709');
        });
        it('EmptyUin8ArrayTest', 0, function () {
            let result = sha1(new Uint8Array([]));
            expect(result).assertEqual('da39a3ee5e6b4b0d3255bfef95601890afd80709');
        });
        it('HexTest', 0, function () {
            let result = sha1.hex('');
            expect(result).assertEqual('da39a3ee5e6b4b0d3255bfef95601890afd80709');
        });
        it('ArrayTest', 0, function () {
            let arr = [218, 57, 163, 238, 94, 107, 75, 13, 50, 85, 191, 239, 149, 96, 24, 144, 175, 216, 7, 9];
            let result = sha1.array('') as Array<number>;
            let matchResult = matchArry(arr, result);
            expect(matchResult).assertTrue();
        });
        it('DigestTest', 0, function () {
            let arr = [218, 57, 163, 238, 94, 107, 75, 13, 50, 85, 191, 239, 149, 96, 24, 144, 175, 216, 7, 9];
            let result = sha1.digest('');
            let matchResult = matchArry(arr, result);
            expect(matchResult).assertTrue();
        });
        it('ArrayBufferTest', 0, function () {
            let result = sha1.arrayBuffer('');
            let type = '';
            if (result instanceof ArrayBuffer) {
                type = 'ArrayBuffer';
            }
            expect(type).assertEqual('ArrayBuffer');
        });
        it('StringTest', 0, function () {
            let result = sha1('13579ABCDEabcde,./；‘【');
            expect(result).assertEqual('33c87d9da1d745679003dee486fad3a8169f3862');
        });
        it('UppercaseLowerCaseLetterTest', 0, function () {
            let result = sha1('THE quick brown FOX jumps over 123 lazy dog');
            expect(result).assertEqual('c59942070e96a123532e4b381de17af0136949a1');
        });
        it('AlltypeTest', 0, function () {
            let result = sha1('al25scAKF86.;*/【】！@#￥%你還得法國德國256');
            expect(result).assertEqual('30c49442129b32047842a7501d73e738a89b17c5');
        });
        it('SimplifiedAndTraditionalChineseTest', 0, function () {
            let result = sha1('中文简体繁體測試');
            expect(result).assertEqual('3352ea0b083302e43d0c0fc58ac993ae18e43d39');
        });
        it('NotEmptyArrayTest', 0, function () {
            let result = sha1([1, 2, 3, 4]);
            expect(result).assertEqual('12dada1fff4d4787ade3333147202c3b443e376f');
        });
        it('StringUint8ArrayTest', 0, function () {
            let result = sha1(new Uint8Array([1, 2, 3, 4]));
            expect(result).assertEqual('12dada1fff4d4787ade3333147202c3b443e376f');
        });
        it('CompareWithCryptoJS_HexTest', 0, function () {
            var obj = sha1.create();
            obj.update('Message to hash');
            let result1 = obj.hex();
            var result2 = sha1.hex('Message to hash');
            expect(result1.toString()).assertEqual('ad8b1ef19620cf94a1c0c9d6c87e7d1b2bca2584');
            expect(result2.toString()).assertEqual('ad8b1ef19620cf94a1c0c9d6c87e7d1b2bca2584');
        });
    });
    function matchArry(arr1: Array<any>, arr2: Array<any>): boolean {
        if (arr1.length == arr2.length) {
            for (var i = 0; i < arr1.length; i++) {
                if (arr1[i] != arr2[i]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
}
