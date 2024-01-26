/*
 * Copyright (c) 2023 Unionman Technology Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import { GpioName, Dir, Val, Gpio } from "@ohos.gpio_ctl"

export default function abilityTest() {
  const BUNDLE = "com.um.gpiohdfapp"
  const TAG = "gpiohdfapp"
  const DOMAIN = 0xF811
  const GPIOS: GpioName[] = [GpioName.GPIO_01, GpioName.GPIO_02, GpioName.GPIO_03, GpioName.GPIO_04, GpioName.GPIO_05, GpioName.GPIO_06, GpioName.GPIO_07, GpioName.GPIO_08, GpioName.GPIO_09, GpioName.GPIO_10, GpioName.GPIO_11, GpioName.GPIO_12, GpioName.GPIO_13, GpioName.GPIO_14, GpioName.GPIO_15, GpioName.GPIO_16]
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
    /**
     * @tc.number    : checkGpioWrite_01
     * @tc.name      : checkGpioWrite
     * @tc.desc      : test gpio write height
     */
    it('checkGpioWrite_01', 0, (done: Function) => {
      hilog.info(DOMAIN, TAG, 'checkGpioWrite_01 start');
      try {
        for (let i = 0;i < 16; i++) {
          let gpio = new Gpio(GPIOS[i], Dir.output);
          gpio.write(Val.height);
        }
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, "throw error!error code:%{public}d error message:%{public}s", err.code, err.message);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, 'checkGpioWrite_01 end');
    })
    /**
     * @tc.number    : checkGpioRead_01
     * @tc.name      : checkGpioRead
     * @tc.desc      : test gpio read
     */
    it('checkGpioRead_01', 0, (done: Function) => {
      try {
        for (let i = 0;i < 16; i++) {
          let gpio = new Gpio(GPIOS[i], Dir.output);
          let value = gpio.read();
          expect(value).assertEqual(Val.height);
        }
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, "throw error!error code:%{public}d error message:%{public}s", err.code, err.message);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, 'checkGpioRead_01 end');
    })
    /**
     * @tc.number    : checkGpioWrite_02
     * @tc.name      : checkGpioWrite
     * @tc.desc      : test gpio write low
     */
    it('checkGpioWrite_02', 0, (done: Function) => {
      hilog.info(DOMAIN, TAG, 'checkGpioWrite_02 start');
      try {
        for (let i = 0;i < 16; i++) {
          let gpio = new Gpio(GPIOS[i], Dir.output);
          gpio.write(Val.low);
        }
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, "throw error!error code:%{public}d error message:%{public}s", err.code, err.message);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, 'checkGpioWrite_02 end');
    })
    /**
     * @tc.number    : checkGpioRead_02
     * @tc.name      : checkGpioRead
     * @tc.desc      : test gpio read
     */
    it('checkGpioRead_02', 0, (done: Function) => {
      hilog.info(DOMAIN, TAG, 'checkGpioRead_02 start');
      try {
        for (let i = 0;i < 16; i++) {
          let gpio = new Gpio(GPIOS[i], Dir.output);
          let value = gpio.read();
          expect(value).assertEqual(Val.low);
        }
        done();
      } catch (err) {
        hilog.error(DOMAIN, TAG, "throw error!error code:%{public}d error message:%{public}s", err.code, err.message);
        expect().assertFail();
      }
      hilog.info(DOMAIN, TAG, 'checkGpioRead_02 end');
    })
  })
}