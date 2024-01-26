/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  describe,
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
  it,
  expect
} from '@ohos/hypium'

import {
  lazyInjectNamedFunction,
  lazyInjectTaggedFunction,
  lazyMultiInjectFunction,
  lazyInjectFunction,
  Sword,
  Shuriken
} from './inject'
export default function injectTest() {

  describe('InjectTest', () => {
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

    it("Should_support_named_constraints",0, () => {

      let warrior1 = lazyInjectNamedFunction();
      expect(warrior1.primaryWeapon instanceof Sword).assertTrue();
      expect(warrior1.secondaryWeapon instanceof Shuriken).assertTrue();

    });


    it("Should_support_tagged_constraints",0, () => {

      let warrior1 = lazyInjectTaggedFunction();
      expect(warrior1.primaryWeapon instanceof Sword).assertTrue();
      expect(warrior1.secondaryWeapon instanceof Shuriken).assertTrue();

    });

    it("Should_support_multi_injections",0, () => {

      let warrior1 = lazyMultiInjectFunction();
      expect(warrior1.weapons[0] instanceof Sword).assertTrue();
      expect(warrior1.weapons[1] instanceof Shuriken).assertTrue();

    });

    it("Should_NOT_break_the_property_setter",0, () => {

      let warrior1 = lazyInjectFunction();
      expect(warrior1.weapon instanceof Sword).assertTrue();
      warrior1.weapon = new Shuriken();
      expect(warrior1.weapon instanceof Shuriken).assertTrue();
      let warrior2 = lazyInjectFunction();
      warrior2.weapon = new Shuriken();
      expect(warrior2.weapon instanceof Shuriken).assertTrue();
    });
  })
}