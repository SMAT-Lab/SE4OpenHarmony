let __generate__Id: number = 0;
function generateId(): string {
    return "List.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import abilityTest from './Ability.test';
import allTest from './pinyinPro/all.test';
import basicTest from './pinyinPro/basic.test';
import convertTest from './pinyinPro/convert.test';
import customConfigTest from './pinyinPro/custom.test';
import doubleUnicodeTest from './pinyinPro/double-unicode.test';
import finalTest from './pinyinPro/final.test';
import getNumOfToneTest from './pinyinPro/get-num-of-tone.test';
import getPinyinTest from './pinyinPro/get-pinyin.test';
import htmlTest from './pinyinPro/html.test';
import matchTest from './pinyinPro/match.test';
import multipleTest from './pinyinPro/multiple.test';
import nonZhTest from './pinyinPro/nonZh.test';
import toneTypeTest from './pinyinPro/pattern-mix-tone-type.test';
import patternTest from './pinyinPro/pattern.test';
import pinyinFnTest from './pinyinPro/pinyin-fn.test';
import polyphonicTest from './pinyinPro/polyphonic.test';
import removeNonZhTest from './pinyinPro/remove-non-zh.test';
import separatorTest from './pinyinPro/separator.test';
import surnameTest from './pinyinPro/surname.test';
import patternToneTypeTest from './pinyinPro/tone-type.test';
import vTest from './pinyinPro/v.test';
export default function testsuite() {
    abilityTest();
    allTest();
    basicTest();
    convertTest();
    customConfigTest();
    doubleUnicodeTest();
    finalTest();
    getNumOfToneTest();
    getPinyinTest();
    htmlTest();
    matchTest();
    multipleTest();
    nonZhTest();
    patternTest();
    toneTypeTest();
    pinyinFnTest();
    polyphonicTest();
    removeNonZhTest();
    separatorTest();
    surnameTest();
    patternToneTypeTest();
    vTest();
}
