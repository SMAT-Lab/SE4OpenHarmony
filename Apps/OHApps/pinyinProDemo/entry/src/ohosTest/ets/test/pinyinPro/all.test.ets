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

export default function allTest() {
  describe('all', () => {
    it('all_test_all', 0, () => {
      const result = pinyin('汉语拼音', {
        type: 'all',
      });
      expect(result).assertDeepEquals([
        {
          origin: '汉',
          pinyin: 'hàn',
          initial: 'h',
          final: 'àn',
          first: 'h',
          finalHead: '',
          finalBody: 'à',
          finalTail: 'n',
          num: 4,
          isZh: true,
        },
        {
          origin: '语',
          pinyin: 'yǔ',
          initial: 'y',
          final: 'ǔ',
          first: 'y',
          finalHead: '',
          finalBody: 'ǔ',
          finalTail: '',
          num: 3,
          isZh: true,
        },
        {
          origin: '拼',
          pinyin: 'pīn',
          initial: 'p',
          final: 'īn',
          first: 'p',
          finalHead: '',
          finalBody: 'ī',
          finalTail: 'n',
          num: 1,
          isZh: true,
        },
        {
          origin: '音',
          pinyin: 'yīn',
          initial: 'y',
          final: 'īn',
          first: 'y',
          finalHead: '',
          finalBody: 'ī',
          finalTail: 'n',
          num: 1,
          isZh: true,
        },
      ]);
    });

    it('all_test_all_with_nonZh', 0, () => {
      const result = pinyin('汉a𧒽音', {
        type: 'all',
      });
      expect(result).assertDeepEquals([
        {
          origin: '汉',
          pinyin: 'hàn',
          initial: 'h',
          final: 'àn',
          first: 'h',
          finalHead: '',
          finalBody: 'à',
          finalTail: 'n',
          num: 4,
          isZh: true,
        },
        {
          origin: 'a',
          pinyin: '',
          initial: '',
          final: '',
          first: '',
          finalHead: '',
          finalBody: '',
          finalTail: '',
          num: 0,
          isZh: false,
        },
        {
          origin: '𧒽',
          pinyin: '',
          initial: '',
          final: '',
          first: '',
          finalHead: '',
          finalBody: '',
          finalTail: '',
          num: 0,
          isZh: false,
        },
        {
          origin: '音',
          pinyin: 'yīn',
          initial: 'y',
          final: 'īn',
          first: 'y',
          finalHead: '',
          finalBody: 'ī',
          finalTail: 'n',
          num: 1,
          isZh: true,
        },
      ]);
    });

    it('all_test_all_removeNonZh', 0, () => {
      const result = pinyin('汉a𧒽音', {
        type: 'all',
        nonZh: 'removed',
      });
      expect(result).assertDeepEquals([
        {
          origin: '汉',
          pinyin: 'hàn',
          initial: 'h',
          final: 'àn',
          first: 'h',
          finalHead: '',
          finalBody: 'à',
          finalTail: 'n',
          num: 4,
          isZh: true,
        },
        {
          origin: '音',
          pinyin: 'yīn',
          initial: 'y',
          final: 'īn',
          first: 'y',
          finalHead: '',
          finalBody: 'ī',
          finalTail: 'n',
          num: 1,
          isZh: true,
        },
      ]);
    });

    it('all_test_all_consecutive_nonZh', 0, () => {
      const result = pinyin('汉a𧒽音', {
        type: 'all',
        nonZh: 'consecutive',
      });
      expect(result).assertDeepEquals([
        {
          origin: '汉',
          pinyin: 'hàn',
          initial: 'h',
          final: 'àn',
          first: 'h',
          finalHead: '',
          finalBody: 'à',
          finalTail: 'n',
          num: 4,
          isZh: true,
        },
        {
          origin: 'a𧒽',
          pinyin: '',
          initial: '',
          final: '',
          first: '',
          finalHead: '',
          finalBody: '',
          finalTail: '',
          num: 0,
          isZh: false,
        },
        {
          origin: '音',
          pinyin: 'yīn',
          initial: 'y',
          final: 'īn',
          first: 'y',
          finalHead: '',
          finalBody: 'ī',
          finalTail: 'n',
          num: 1,
          isZh: true,
        },
      ]);
    });
  });
}
