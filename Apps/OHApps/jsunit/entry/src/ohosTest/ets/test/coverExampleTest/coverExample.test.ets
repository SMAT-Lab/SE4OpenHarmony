/*
* Copyright (c) 2023 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License")
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

/**
 * arkXtest框架目前最多支持俩层测试套嵌套功能
 * 支持版本 since 1.0.6 版本
 */

import { describe, it, expect, TestType } from '@ohos/hypium';

export default function coverExampleTest() {
  describe('coverExampleTest', () => {

    /**
     * @tc.number:coverExampleTest_01
     * @tc.name: coverExampleTest_01
     * @tc.type: 0 || TestType.FUNCTION || Size.SMALLTEST || Level.LEVEL0
     * @tc.desc: 检验actualvalue是否是true
     * @tc.version since1.0.0
     */
    it('coverExampleTest_01', TestType.FUNCTION, () => {
      expect(true).assertTrue();
    });
    describe("coverExampleTest_inner", () => {
      /**
       * @tc.number:coverExampleTest_inner_01
       * @tc.name: coverExampleTestInner_01
       * @tc.type: 0 || TestType.FUNCTION || Size.SMALLTEST || Level.LEVEL0
       * @tc.desc: 检验actualvalue是否是true
       * @tc.version since1.0.0
       */
      it('coverExampleTestInner_01', TestType.FUNCTION, () => {
        expect(true).assertTrue();
      });
    })
  })
}