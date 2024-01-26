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
import { describe, it, expect } from '@ohos/hypium'
import JmesPath from 'jmespath';

let startTime: number;

export default function jmespathAPI() {
  describe('jmespathAPITest', () => {
    it('jmesPath_search_interface_performance_test', 0, () => {
      startTime = new Date().getTime();
      console.info("jmesPath_search_interface_performance_test startTime:" + startTime)
      hasSimCardCallbackPerfTest(0);
    });
  });
}

function hasSimCardCallbackPerfTest(index: number) {
  JmesPath.search(JSON.parse(`{"a": {
      "b": {
        "c": [
          {"d": [0, [1, 2]]},
          {"d": [3, 4]}
        ]
      }
    }}`), 'a.b.c[0].d[1][0]')

  if (index < 2000) {
    hasSimCardCallbackPerfTest(index + 1)
  } else {
    let endTime = new Date().getTime()
    console.info("jmesPath_search_interface_performance_test endTime:" + endTime)
    let averageTime = ((endTime - startTime) * 1000) / 2000;
    console.info("jmesPath_search_interface_performance_test averageTime:" + averageTime + "μs")
    expect(averageTime < 500).assertTrue();
  }
}




