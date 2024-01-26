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
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import md5 from 'js-md5'

export default function abilityTest() {
  describe('ActsAbilityTest', () => {
    // Defines a test suite. Two parameters are supported: test suite name and test suite function.
    beforeAll(() => {
      // Presets an action, which is performed only once before all test cases of the test suite start.
      // This API supports only one parameter: preset action function.
    })
    beforeEach(() => {
      // Presets an action, which is performed before each unit test case starts.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: preset action function.
    })
    afterEach(() => {
      // Presets a clear action, which is performed after each unit test case ends.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: clear action function.
    })
    afterAll(() => {
      // Presets a clear action, which is performed after all test cases of the test suite end.
      // This API supports only one parameter: clear action function.
    })
    it('md5',0, () => {

      let t1: string = md5('中文'); // a7bac2239fcdcb3a067903d8077c4a07

      expect(t1).assertEqual('a7bac2239fcdcb3a067903d8077c4a07')

      // It also supports byte `Array`, `Uint8Array`, `ArrayBuffer`
      let t2: string =  md5([]); // d41d8cd98f00b204e9800998ecf8427e
      expect(t2).assertEqual('d41d8cd98f00b204e9800998ecf8427e')

      let t3: string = md5(new Uint8Array([])); // d41d8cd98f00b204e9800998ecf8427e
      expect(t3).assertEqual('d41d8cd98f00b204e9800998ecf8427e')

      // Different output
      let t4: string = md5(''); // d41d8cd98f00b204e9800998ecf8427e
      expect(t4).assertEqual('d41d8cd98f00b204e9800998ecf8427e')
    })
    it('md5.hex',0, () => {
      let t4: string =  md5.hex(''); // d41d8cd98f00b204e9800998ecf8427e
      expect(t4).assertEqual('d41d8cd98f00b204e9800998ecf8427e')
    })
    it('md5.array',0, () => {
      let t4: string =  md5.array('') +""; // [212, 29, 140, 217, 143, 0, 178, 4, 233, 128, 9, 152, 236, 248, 66, 126]
      expect(t4).assertEqual('212,29,140,217,143,0,178,4,233,128,9,152,236,248,66,126')
    })
    it('md5.digest',0, () => {
      let t4: string =  md5.digest('') +""; // [212, 29, 140, 217, 143, 0, 178, 4, 233, 128, 9, 152, 236, 248, 66, 126]
      expect(t4).assertEqual('212,29,140,217,143,0,178,4,233,128,9,152,236,248,66,126')
    })
    it('md5.base64',0, () => {
      let t4: string = md5.base64(''); // 1B2M2Y8AsgTpgAmY7PhCfg==
      expect(t4).assertEqual('1B2M2Y8AsgTpgAmY7PhCfg==')
    })


  })
}