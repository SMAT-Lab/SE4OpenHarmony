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

import { describe, it, expect, TestType } from '@ohos/hypium';
import { BusinessError } from '@ohos.base';
import  Logger from '../../util/Logger'
const TAG = "CallBack_Test";
const BUNDLE = "CallBack_"
function testFun(callBack: Function) {
  callBack();
}
export default function callBackExampleTest() {
  describe('callBackExampleTest', () => {

    /**
     * @tc.number:CallBack_001
     * @tc.name: CallBack_Test_001
     * @tc.type: 0 || TestType.FUNCTION || Size.SMALLTEST || Level.LEVEL0
     * @tc.desc: callback方法回调测试示例
     */
    it("CallBack_Test_001",TestType.FUNCTION, async (done: Function) => {
      Logger.info(TAG, BUNDLE + "Test_001 start")
      // 异步回调函数中断言，需要使用 try catch 包含断言
      testFun(() =>{
        try {
          // callBack 中执行断言
          expect(true).assertTrue();
        } catch (e) {
        } finally {
          Logger.info(TAG, BUNDLE + "Test_001 end")
          done();
        }
      })
    })
  })
}