/* Copyright 2022 Unionman Technology Co., Ltd.
 *
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
 *
 */
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import { Driver, ON } from '@ohos.UiTest';
import AbilityDelegatorRegistry from '@ohos.app.ability.abilityDelegatorRegistry';
import i2c_ctl from '@ohos.i2cnapi'
import pwm_ctl from '@ohos.pwmnapi'

export default function abilityTest() {
  const BUNDLE = "com.sample.i2cpwmdemo"
  const TAG = "i2cpwmdemo"
  const DOMAIN = 0xF811
  let data:i2c_ctl.TemHum;
  describe('ActsAbilityTest',  () => {
    let driver = Driver.create();
    let delegator = AbilityDelegatorRegistry.getAbilityDelegator();
    // Defines a test suite. Two parameters are supported: test suite name and test suite function.
    beforeAll(async () => {
      data = await i2c_ctl.getDataAsync();
      // Presets an action, which is performed only once before all test cases of the test suite start.
      // This API supports only one parameter: preset action function.
    })
    beforeEach(()=> {
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
    /**
     * @tc.number    : checkI2cTemperature_0
     * @tc.name      : checkI2cTemperature
     * @tc.desc      : check i2c temperature valid
     */
    it('checkI2cTemperature',0,async  () => {
      //测试i2c获取的温度值是否合法
      hilog.info(DOMAIN, TAG, '%{public}s', 'checkI2cTemperature_0 test begin');
      try {
        expect(data.temperatureC).assertLarger(0)
        expect(data.temperatureC).assertLess(40)
      }catch (e){
        hilog.error(DOMAIN,TAG,"throw error! error code:%{public}d error info:%{public}s",e.code,e.message);
        expect().assertFail();
      }

      hilog.info(DOMAIN, TAG, '%{public}s', 'checkI2cTemperature_0 test end');

    })
    /**
     * @tc.number    : checkI2cHumidity_0
     * @tc.name      : checkI2cHumidity
     * @tc.desc      : check i2c humidity valid
     */
    it('checkI2cHumidity',0,async  () => {
      //测试i2c获取的湿度值是否合法
      hilog.info(DOMAIN, TAG, '%{public}s', 'checkI2cHumidity_0 test begin');
      try {
        expect(data.humidity).assertLarger(30)
        expect(data.humidity).assertLess(80)
      }catch (e){
        hilog.error(DOMAIN,TAG,"throw error! error code:%{public}d error info:%{public}s",e.code,e.message);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', 'checkI2cHumidity_0 test end');
    })
    /**
     * @tc.number    : checkPwm_0
     * @tc.name      : checkPwm
     * @tc.desc      : check Pwm work
     */
    it('checkPwm',0,async  () => {
      //测试pwm是否正常工作
      hilog.info(DOMAIN, TAG, '%{public}s', 'checkPwm_0 test begin');
      try {
        await pwm_ctl.setAngleAsync(60)
      }catch (e){
        hilog.error(DOMAIN,TAG,"throw error! error code:%{public}d error info:%{public}s",e.code,e.message);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, '%{public}s', 'checkPwm_0 test end');
    })
  })
}