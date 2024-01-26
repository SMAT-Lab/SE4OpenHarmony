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

/*
 * 单元测试框架数据驱动能力从hypium 1.0.2版本开始支持
 * 数据参数传递 : 为指定测试套、测试用例传递测试输入数据参数
 * 压力测试 : 为指定测试套、测试用例设置执行次数
 * ① .test.js|ets文件同目录创建data.json数据文件,如下数据
 *
 * {
 * "suites": [{
 *   "describe": ["paramExampleTest"],
 *   "stress": 4,
 *   "params": {
 *     "suiteParams1": "suiteParams001",
 *     "suiteParams2": "suiteParams002"
 *   },
 *   "items": [{
 *     "it": "testDataDriverAsync"
 *   },
 *     {
 *       "it": "testDataDriverParam",
 *       "stress": 2,
 *       "params":[
 *         {
 *           "ts1": "ts1",
 *           "ts2": "ts2"
 *         }
 *       ]
 *     }]
 * }]
 * }
 * 配置参数说明：
 * "suite"	测试套配置
 * "items"	测试用例配置
 * "describe"	测试套名称
 * "it"	测试用例名称
 * "params"	测试套 / 测试用例 可传入使用的参数
 * "stress"	测试套 / 测试用例 指定执行次数
 * ② 在TestAbility目录下app.js|ets文件中导入data.json，并在Hypium.hypiumTest() 方法执行前，设置参数数据
 * Hypium.setData(data);
 * Hypium.hypiumTest(abilityDelegator, abilityDelegatorArguments, testsuite)
 *
 * 指导文档
 * https://gitee.com/openharmony/testfwk_arkxtest#%E6%95%B0%E6%8D%AE%E9%A9%B1%E5%8A%A8
 */

import {describe, it, expect, TestType} from '@ohos/hypium';

export default function paramExampleTest() {
  describe('paramExampleTest', () => {

    /**
     * @tc.number:paramExampleTest_001
     * @tc.name: testDataDriverAsync
     * @tc.type: 0 || TestType.FUNCTION || Size.SMALLTEST || Level.LEVEL0
     * @tc.desc: 检测delegator.startAbility接口打开指定Ability对象
     * @tc.done 异步用例执行完成回调函数
     * @tc.suitParam 使用数据传递功能给测试套传递的参数对象, suitParam对象参考传递数据对象
     */
    it('testDataDriverAsync', TestType.FUNCTION, async (done: Function, suitParam: SuitParam) => {
      let suitParam1 = suitParam.suiteParams1;
      let suitParam2 = suitParam.suiteParams2;
      expect(suitParam1).assertEqual("suiteParams001");
      expect(suitParam2).assertEqual("suiteParams002");
      done();
    });

    /**
     * @tc.number:paramExampleTest_002
    * @tc.name: testDataDriverParam
     * @tc.type: 0 || TestType.FUNCTION || Size.SMALLTEST || Level.LEVEL0
     * @tc.desc: 检测delegator.startAbility接口打开指定Ability对象
     * @tc.done 异步用例执行完成回调函数
     * @tc.suitParam 使用数据传递功能给测试用例传递的参数对象, suitParam对象参考传递数据对象
     */
    it('testDataDriverParam', TestType.FUNCTION, async (done: Function, suitParam: SuitParam) => {
      let suitParam1 = suitParam.suiteParams1;
      let suitParam2 = suitParam.suiteParams2;
      let spParam1 = suitParam.ts1;
      let spParam2 = suitParam.ts2;
      expect(suitParam1).assertEqual("suiteParams001");
      expect(suitParam2).assertEqual("suiteParams002");
      expect(spParam1).assertEqual("ts1");
      expect(spParam2).assertEqual("ts2");
      done();
    });
  });
}
interface SuitParam {
  suiteParams1: string,
  suiteParams2: string,
  ts1: string,
  ts2: string,
}