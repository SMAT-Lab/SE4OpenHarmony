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
import { afterAll, afterEach, beforeAll, beforeEach, describe,expect,it, TestType} from '@ohos/hypium'
import jsonBig from 'json-bigint'
import { jsonBigTpye} from '../../../main/ets/pages/index.ts'
export default function telephonyPerfJsunit() {
  describe("jsonBigint_interface_time", ()=> {
    const BASE_COUNT = 2000 // 循环次数：测试普通接口性能
    const BASELINE_JSONBIGINT = 0.5  //普通接口基数  ms
    it("json_bigint_interface_time", TestType.PERFORMANCE,  () => {
      let startTime = new Date().getTime()
      console.info("json_bigint_interface_time startTime:" + startTime)
      for (let index = 0; index < BASE_COUNT; index++) {
        jsonBig()
      }
      let endTime = new Date().getTime()
      console.info("json_bigint_interface_time endTime:" + endTime)
      let averageTime = (endTime - startTime) / BASE_COUNT
      console.info("mode--- json_bigint_interface_time averageTime:" + averageTime + "ms")
      expect(averageTime < BASELINE_JSONBIGINT).assertTrue();
    });
    it("parse_interface_time", TestType.PERFORMANCE,  () => {
      let startTime = new Date().getTime()
      let input = '{"a":123456789012345678901234567890}'
      let bigint:jsonBigTpye = jsonBig();
      console.info("parse_interface_time startTime:" + startTime)
      for (let index = 0; index < BASE_COUNT; index++) {
        bigint.parse(input);
      }
      let endTime = new Date().getTime()
      console.info("parse_interface_time endTime:" + endTime)
      let averageTime = (endTime - startTime) / BASE_COUNT
      console.info("mode--- parse_interface_time averageTime:" + averageTime + "ms")
      expect(averageTime < BASELINE_JSONBIGINT).assertTrue();
    });
    it("stringify_interface_time", TestType.PERFORMANCE,  () => {
      let startTime = new Date().getTime()
      let bigint:jsonBigTpye = jsonBig();
      let input = '{"a":123456789012345678901234567890}'
      let inputValue:string = bigint.stringify(input)
      console.info("stringify_interface_time startTime:" + startTime)
      for (let index = 0; index < BASE_COUNT; index++) {
        bigint.stringify(inputValue);
      }
      let endTime = new Date().getTime()
      console.info("stringify_interface_time endTime:" + endTime)
      let averageTime = (endTime - startTime) / BASE_COUNT
      console.info("mode--- stringify_interface_time averageTime:" + averageTime + "ms")
      expect(averageTime < BASELINE_JSONBIGINT).assertTrue();
    });
})
}

