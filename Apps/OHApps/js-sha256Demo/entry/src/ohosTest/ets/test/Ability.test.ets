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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import { sha256, sha224 } from 'js-sha256';

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

    it('sha256',0, () => {

      let s1 = sha256(''); // e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
      let s2 = sha256('The quick brown fox jumps over the lazy dog'); // d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592
      let s3 = sha256('The quick brown fox jumps over the lazy dog.'); // ef537f25c895bfa782526529a9b63d97aa631564d5d789c2b765448c8635fb6c
      expect(s1).assertEqual('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855')
      expect(s2).assertEqual('d7a8fbb307d7809469ca9abcb0082e4f8d5651e46d3cdb762d02d0bf37c9e592')
      expect(s3).assertEqual('ef537f25c895bfa782526529a9b63d97aa631564d5d789c2b765448c8635fb6c')


      // It also supports UTF-8 encoding
      let s4 = sha256('中文'); // 72726d8818f693066ceb69afa364218b692e62ea92b385782363780f47529c21
      expect(s4).assertEqual('72726d8818f693066ceb69afa364218b692e62ea92b385782363780f47529c21')

      // It also supports byte `Array`, `Uint8Array`, `ArrayBuffer` input
      let s5 = sha256([]); // e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
      let s6 = sha256(new Uint8Array([211, 212])); // 182889f925ae4e5cc37118ded6ed87f7bdc7cab5ec5e78faef2e50048999473f
      expect(s5).assertEqual('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855')
      expect(s6).assertEqual('182889f925ae4e5cc37118ded6ed87f7bdc7cab5ec5e78faef2e50048999473f')
    })
    it('sha224',0, () => {
      let s1 = sha224(''); // d14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f
      let s2 = sha224('The quick brown fox jumps over the lazy dog'); // 730e109bd7a8a32b1cb9d9a09aa2325d2430587ddbc0c38bad911525
      let s3 = sha224('The quick brown fox jumps over the lazy dog.'); // 619cba8e8e05826e9b8c519c0a5c68f4fb653e8a3d8aa04bb2c8cd4c
      let s4 = sha224('中文'); // dfbab71afdf54388af4d55f8bd3de8c9b15e0eb916bf9125f4a959d4

      expect(s1).assertEqual('d14a028c2a3a2bc9476102bb288234c415a2b01f828ea62ac5b3e42f')
      expect(s2).assertEqual('730e109bd7a8a32b1cb9d9a09aa2325d2430587ddbc0c38bad911525')
      expect(s3).assertEqual('619cba8e8e05826e9b8c519c0a5c68f4fb653e8a3d8aa04bb2c8cd4c')
      expect(s4).assertEqual('dfbab71afdf54388af4d55f8bd3de8c9b15e0eb916bf9125f4a959d4')
    })
    it('ha256.hex',0, () => {
      let s1 = sha256.hex(''); // e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
      expect(s1).assertEqual('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855')
    })
    it('sha256.array',0, () => {
      let expected:string = '227,176,196,66,152,252,28,20,154,251,244,200,153,111,185,36,39,174,65,228,100,155,147,76,164,149,153,27,120,82,184,85'
      let s1 = sha256.array('')+""; // [227, 176, 196, 66, 152, 252, 28, 20, 154, 251, 244, 200, 153, 111, 185, 36, 39, 174, 65, 228, 100, 155, 147, 76, 164, 149, 153, 27, 120, 82, 184, 85]

      expect(s1).assertEqual(expected)
    })
    it('sha256.digest',0, () => {
      let expected:string = '227,176,196,66,152,252,28,20,154,251,244,200,153,111,185,36,39,174,65,228,100,155,147,76,164,149,153,27,120,82,184,85'
      let s1 = sha256.digest('')+""; // [227, 176, 196, 66, 152, 252, 28, 20, 154, 251, 244, 200, 153, 111, 185, 36, 39, 174, 65, 228, 100, 155, 147, 76, 164, 149, 153, 27, 120, 82, 184, 85]

      expect(s1).assertEqual(expected)
    })



  })
}