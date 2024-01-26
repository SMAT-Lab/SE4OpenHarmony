/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { Complex } from "complex.js"

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

    it('add', 0, () => {
      let c = new Complex("99.3");
      let r = c.add(3, 2);
      expect(r.toString()).assertEqual('102.3 + 2i')
    })

    it('div', 0, () => {
      let c = new Complex("99.3");
      let r = c.div(4.9);
      expect(r.toString()).assertEqual('20.265306122448976')
    })

    it('sub', 0, () => {
      let c = new Complex("99.3");
      let r = c.sub(3, 2);
      expect(r.toString()).assertEqual('96.3 - 2i')
    })

    it('mul', 0, () => {
      let c = new Complex("99.3");
      let r = c.mul({re: 3, im: 9});
      expect(r.toString()).assertEqual('297.9 + 893.6999999999999i')
    })

    it('pow', 0, () => {
      let c = new Complex("3.3");
      let r = c.pow(1, 2);
      expect(r.toString()).assertEqual('-2.406126186779613 + 2.2584412264421223i')
    })

    it('sqrt', 0, () => {
      let c = new Complex("9");
      let r = c.sqrt();
      expect(r.toString()).assertEqual('3')
    })


    it('abs', 0, () => {
      let c = new Complex("-3.3");
      let r = c.abs();
      expect(r.toString()).assertEqual('3.3')
    })

    it('sin', 0, () => {
      let c = new Complex("45");
      let r = c.sin();
      expect(r.toString()).assertEqual('0.8509035245341184')
    })

    it('cos', 0, () => {
      let c = new Complex("0");
      let r = c.cos();
      expect(r.toString()).assertEqual('1')
    })

    it('tan', 0, () => {
      let c = new Complex("0");
      let r = c.tan();
      expect(r.toString()).assertEqual('0')
    })

    it('sec', 0, () => {
      let c = new Complex("0");
      let r = c.sec();
      expect(r.toString()).assertEqual('1')
    })

    it('csc', 0, () => {
      let c = new Complex("45");
      let r = c.csc();
      expect(r.toString()).assertEqual('1.175221363135749')
    })

    it('cot', 0, () => {
      let c = new Complex("45");
      let r = c.cot();
      expect(r.toString()).assertEqual('0.617369623783555')
    })

    it('acos', 0, () => {
      let c = new Complex("45");
      let r = c.acos();
      expect(r.toString()).assertEqual('4.499686190671499i')
    })

     it('floor', 0, () => {
      let c = new Complex("45.6");
      let r = c.floor(0);
       expect(r.toString()).assertEqual('45')
    })

    it('ceil', 0, () => {
      let c = new Complex("45.62");
      let r = c.ceil(1);
      expect(r.toString()).assertEqual('45.7')
    })

    it('round', 0, () => {
      let c = new Complex("45.62");
      let r = c.round(1);
      expect(r.toString()).assertEqual('45.6')
    })

    it('clone', 0, () => {
      let c = new Complex("45.6");
      let r = c.clone();
      expect(r.toString()).assertEqual('45.6')
    })

    it('isZero', 0, () => {
      let c = new Complex("45.6");
      let r = c.isZero();
      expect(r.toString()).assertEqual('false')
    })
  })
}