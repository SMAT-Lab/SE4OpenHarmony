/**
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * */

import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import minimist from 'minimist'

export default function abilityTest() {
  describe('ActsAbilityTest', ()=> {
    // Defines a test suite. Two parameters are supported: test suite name and test suite function.
    beforeAll(()=> {
      // Presets an action, which is performed only once before all test cases of the test suite start.
      // This API supports only one parameter: preset action function.
    })
    beforeEach(()=> {
      // Presets an action, which is performed before each unit test case starts.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: preset action function.
    })
    afterEach(()=> {
      // Presets a clear action, which is performed after each unit test case ends.
      // The number of execution times is the same as the number of test cases defined by **it**.
      // This API supports only one parameter: clear action function.
    })
    afterAll(()=> {
      // Presets a clear action, which is performed after all test cases of the test suite end.
      // This API supports only one parameter: clear action function.
    })
    it('flag_boolean_true_only_affects_double_hyphen_arguments_without_equals_signs',0, ()=> {
      let argv:ESObject = minimist(['moo', '--honk', 'cow', '-p', '55', '--tacos=good'], {
        boolean: true,string:'_'
      });

      expect(argv).assertDeepEquals({
        honk: true,
        tacos: 'good',
        p: 55,
        _: ['moo', 'cow']
      });
      expect(typeof argv.honk).assertEqual('boolean');
    });

    it('flag_boolean_true_default_all_args_to_boolean',0, ()=> {
      let argv:ESObject = minimist(['moo', '--honk', 'cow'], {
        boolean: true, string: "_"
      });

      expect(argv).assertDeepEquals({
        honk: true,
        _: ['moo', 'cow']
      });

      expect(typeof argv.honk).assertEqual('boolean');
    });

    it('flag_boolean_default_false',0, ()=> {
      let argv:ESObject = minimist(['moo'], {
        boolean: ['t', 'verbose'],string:"_",
        default: { verbose: false, t: false }
      });

      expect(argv).assertDeepEquals({
        verbose: false,
        t: false,
        _: ['moo']
      });

      expect(typeof argv.verbose).assertEqual('boolean');
      expect(typeof argv.t).assertEqual('boolean');
    });

    it('boolean_groups',0, ()=> {
      let argv :ESObject= minimist([ '-x', '-z', 'one', 'two', 'three' ], {
        boolean: ['x','y','z'],string:"_"
      });

      expect(argv).assertDeepEquals({
        x : true,
        y : false,
        z : true,
        _ : [ 'one', 'two', 'three' ]
      });

      expect(typeof argv.x).assertEqual('boolean');
      expect(typeof argv.y).assertEqual('boolean');
      expect(typeof argv.z).assertEqual('boolean');
    });
  })
}