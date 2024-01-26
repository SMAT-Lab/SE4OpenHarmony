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

export default function surnameTest() {
  describe('surname', () => {
    it('surname_multiplesurname1', 0,() => {
      const result = pinyin('万俟', {
        mode: 'surname'
      });
      expect(result).assertEqual('mò qí');
    });

    it('surname_multiplsurname2', 0,() => {
      const result = pinyin('我叫令狐冲', {
        mode: 'surname'
      });
      expect(result).assertEqual('wǒ jiào líng hú chōng');
    });

    it('surname_multiplesurname3', 0,() => {
      const result = pinyin('曾令狐冲', {
        mode: 'surname'
      });
      expect(result).assertEqual('zēng líng hú chōng');
    });

    it('surname_multiplesurname4', 0,() => {
      const result = pinyin('我叫区中青', {
        mode: 'surname'
      });
      expect(result).assertEqual('wǒ jiào ōu zhōng qīng');
    });

    it('surname_multipleurname5', 0,() => {
      const result = pinyin('我叫覃晓旭', {
        mode: 'surname'
      });
      expect(result).assertEqual('wǒ jiào qín xiǎo xù');
    });

    it('surname_multiplername6', 0,() => {
      const result = pinyin('我叫朴岁植', {
        mode: 'surname'
      });
      expect(result).assertEqual('wǒ jiào piáo suì zhí');
    });
  });
}
