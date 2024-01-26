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

export default function nonZhTest() {

  describe('nonZh', () => {
    it('nonZh_init',0, () => {
      const result1 = pinyin('我very喜欢你');
      expect(result1).assertEqual('wǒ v e r y xǐ huān nǐ');
    });

    it('nonZh_spaced',0, () => {
      const result2 = pinyin('我very喜欢你', {
        nonZh: 'spaced'
      });
      expect(result2).assertEqual('wǒ v e r y xǐ huān nǐ');
    });

    it('nonZh_consecutive',0, () => {
      const result3 = pinyin('我very喜欢你', {
        nonZh: 'consecutive'
      });
      expect(result3).assertEqual('wǒ very xǐ huān nǐ');
    });

    it('nonZh_removed',0, () => {
      const result4 = pinyin('我very喜欢你', {
        nonZh: 'removed'
      });
      expect(result4).assertEqual('wǒ xǐ huān nǐ');
    });

    it('nonZh_hapace',0, () => {
      const result4 = pinyin('喜 欢');
      expect(result4).assertEqual('xǐ   huān');
    });

    it('nonZh_haspace',0, () => {
      const result4 = pinyin('喜 欢', {
        type: 'array'
      });
      expect(result4).assertDeepEquals(['xǐ', ' ', 'huān']);
    });

    it('nonZh_haspa',0, () => {
      const result4 = pinyin('一丁点儿\n');
      expect(result4).assertDeepEquals('yī dīng diǎn er \n');
    });
  });
}
