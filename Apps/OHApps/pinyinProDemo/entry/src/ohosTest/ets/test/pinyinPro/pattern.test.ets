/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import { pinyin } from 'pinyin-pro'

export default function patternTest() {
  describe('pattern', () => {
    it('pattern_num', 0,() => {
      const result = pinyin('汉语拼音', {
        pattern: 'num'
      });
      expect(result).assertEqual('4 3 1 1');
    });

    it('pattern_numray', 0,() => {
      const result = pinyin('汉语拼音', {
        pattern: 'num', type: 'array'
      });
      expect(result).assertDeepEquals(['4', '3', '1', '1']);
    });

    it('pattern_final', 0,() => {
      const result = pinyin('汉语拼音', {
        pattern: 'final'
      });
      expect(result).assertEqual('àn ǔ īn īn');
    });

    it('pattern_finalarray', 0,() => {
      const result = pinyin('汉语拼音', {
        pattern: 'final', type: 'array'
      });
      expect(result).assertDeepEquals(['àn', 'ǔ', 'īn', 'īn']);
    });

    it('pattern_initial', 0,() => {
      const result = pinyin('汉语拼音', {
        pattern: 'initial'
      });
      expect(result).assertEqual('h y p y');
    });

    it('pattern_initialarray', 0,() => {
      const result = pinyin('汉语拼音', {
        pattern: 'initial', type: 'array'
      });
      expect(result).assertDeepEquals(['h', 'y', 'p', 'y']);
    });

    it('pattern_numall', 0,() => {
      const resultNumStr = pinyin('赵钱孙李吧', {
        pattern: 'num'
      });
      expect(resultNumStr).assertEqual('4 2 1 3 0');
    });

    it('pattern_numarray', 0,() => {
      const resultNumArr = pinyin('赵钱孙李吧', {
        pattern: 'num',
        type: 'array',
      });
      expect(resultNumArr).assertDeepEquals(['4', '2', '1', '3', '0']);
    });

    it('pattern_initialall', 0,() => {
      const resultInitial = pinyin('赵钱孙李吧', {
        pattern: 'initial',
      });
      expect(resultInitial).assertEqual('zh q s l b');
    });

    it('pattern_finalall', 0,() => {
      const resultFinal = pinyin('赵钱孙李吧', {
        pattern: 'final',
      });
      expect(resultFinal).assertEqual('ào ián ūn ǐ a');
    });

    it('pattern_firstall', 0,() => {
      const resultFirst = pinyin('赵钱孙李额', {
        pattern: 'first',
      });
      expect(resultFirst).assertEqual('z q s l é');
    });

    it('pattern_firstallnone', 0,() => {
      const resultFirstNone = pinyin('赵钱孙李额', {
        pattern: 'first',
        toneType: 'none',
      });
      expect(resultFirstNone).assertEqual('z q s l e');
    });
  });
}
