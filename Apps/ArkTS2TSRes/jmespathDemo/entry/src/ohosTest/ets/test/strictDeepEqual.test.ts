let __generate__Id: number = 0;
function generateId(): string {
    return "strictDeepEqual.test_" + ++__generate__Id;
}
/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
import { describe, it, expect } from '@ohos/hypium';
import JmesPath from 'jmespath';
export default function strictDeepEqual() {
    describe('strictDeepEqualTest', () => {
        it('shouldCompareScalars', 0, () => {
            expect(JmesPath.strictDeepEqual('a', 'a')).assertEqual(true);
        });
        it('shouldBeFalseForDifferentTypes', 0, () => {
            expect(JmesPath.strictDeepEqual('a', 2)).assertEqual(false);
        });
        it('shouldBeFalseForArraysOfDifferentLengths', 0, () => {
            expect(JmesPath.strictDeepEqual([0, 1], [1, 2, 3])).assertEqual(false);
        });
        it('shouldBeTrueForIdenticalArrays', 0, () => {
            expect(JmesPath.strictDeepEqual([0, 1], [0, 1])).assertEqual(true);
        });
        it('shouldBeTrueForNestedArrays', 0, () => {
            expect(JmesPath.strictDeepEqual([[0, 1], [2, 3]], [[0, 1], [2, 3]])).assertEqual(true);
        });
        it('shouldBeTrueForNestedArraysOfStrings', 0, () => {
            expect(JmesPath.strictDeepEqual([["a", "b"], ["c", "d"]], [["a", "b"], ["c", "d"]])).assertEqual(true);
        });
        it('shouldBeFalseForDifferentArraysOfTheSameLength', 0, () => {
            expect(JmesPath.strictDeepEqual([0, 1], [1, 2])).assertEqual(false);
        });
        it('shouldHandleObjectLiterals', 0, () => {
            expect(JmesPath.strictDeepEqual({
                a: 1, b: 2
            }, {
                a: 1, b: 2
            })).assertEqual(true);
        });
        it('shouldHandleKeysInFirstNotInSecond', 0, () => {
            expect(JmesPath.strictDeepEqual({
                a: 1, b: 2
            }, {
                a: 1
            })).assertEqual(false);
        });
        it('shouldHandleKeysInSecondNotInFirst', 0, () => {
            expect(JmesPath.strictDeepEqual({
                a: 1
            }, {
                a: 1, b: 2
            })).assertEqual(false);
        });
        it('shouldHandleNestedObjects', 0, () => {
            expect(JmesPath.strictDeepEqual({
                a: {
                    b: [1, 2]
                }
            }, {
                a: {
                    b: [1, 2]
                }
            })).assertEqual(true);
        });
        it('shouldHandleNestedObjectsThatAreNotEqual', 0, () => {
            expect(JmesPath.strictDeepEqual({
                a: {
                    b: [1, 2]
                }
            }, {
                a: {
                    b: [1, 4]
                }
            })).assertEqual(false);
        });
    });
}
