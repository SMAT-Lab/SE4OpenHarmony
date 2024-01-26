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

export default function doubleUnicodeTest() {
  describe('doubleUnicode', () => {
    it('double_unicode_base',0, () => {
      const result1 = pinyin('𧒽');
      expect(result1).assertEqual('𧒽');
    });

    it('double_unicode_with_pinyin',0, () => {
      const result2 = pinyin('𧒽测试');
      expect(result2).assertEqual('𧒽 cè shì');
    });

    it('double_unicode_dpdp',0, () => {
      const result3 = pinyin('𧒽测试𧒽测试', {});
      expect(result3).assertEqual('𧒽 cè shì 𧒽 cè shì');
    });

    it('double_unicode_dp_consecutive',0, () => {
      const result4 = pinyin('𧒽测试', {
        nonZh: 'consecutive'
      });
      expect(result4).assertEqual('𧒽 cè shì');
    });

    it('double_unicode_dpdpdp_consecutive',0, () => {
      const result5 = pinyin('测试a𧒽𧒽a测试a𧒽𧒽a测试', {
        nonZh: 'consecutive',
      });
      expect(result5).assertEqual('cè shì a𧒽𧒽a cè shì a𧒽𧒽a cè shì');
    });
  });
}