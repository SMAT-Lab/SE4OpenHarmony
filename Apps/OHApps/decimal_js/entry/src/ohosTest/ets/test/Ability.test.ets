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
import Decimal from "decimal.js"

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
      let c = new Decimal("99.3");
      let r = c.add(3);
      expect(r.toString()).assertEqual('102.3')
    })

    it('div', 0, () => {
      let c = new Decimal("99.3");
      let r = c.div(4);
      expect(r.toString()).assertEqual('24.825')
    })

    it('sub', 0, () => {
      let c = new Decimal("99.3");
      let r = c.sub(33);
      expect(r.toString()).assertEqual('66.3')
    })

    it('mul', 0, () => {
      let c = new Decimal("99.3");
      let r = c.mul(2);
      expect(r.toString()).assertEqual('198.6')
    })

    it('pow', 0, () => {
      let c = new Decimal("3.3");
      let r = c.pow(2);
      expect(r.toString()).assertEqual('10.89')
    })

    it('abs', 0, () => {
      let c = new Decimal("-3.3");
      let r = c.abs();
      expect(r.toString()).assertEqual('3.3')
    })

    it('sin', 0, () => {
      let c = new Decimal("45");
      let r = c.sin();
      expect(r.toString()).assertEqual('0.85090352453411842486')
    })

    it('cos', 0, () => {
      let c = new Decimal("0");
      let r = c.cos();
      expect(r.toString()).assertEqual('1')
    })

    it('tan', 0, () => {
      let c = new Decimal("0");
      let r = c.tan();
      expect(r.toString()).assertEqual('0')
    })

    it('acos', 0, () => {
      let c = new Decimal("1");
      let r = c.acos();
      expect(r.toString()).assertEqual('0')
    })

    it('floor', 0, () => {
      let c = new Decimal("45.6");
      let r = c.floor();
      expect(r.toString()).assertEqual('45')
    })

    it('ceil', 0, () => {
      let c = new Decimal("45.62");
      let r = c.ceil();
      expect(r.toString()).assertEqual('46')
    })

    it('round', 0, () => {
      let c = new Decimal("45.62");
      let r = c.round();
      expect(r.toString()).assertEqual('46')
    })

    it('toBinary', 0, () => {
      let c = new Decimal("427.9375");
      let r = c.toBinary();
      expect(r.toString()).assertEqual('0b110101011.1111')
    })

    it('toExponential', 0, () => {
      let c = new Decimal(255.5);
      let r = c.toExponential(5);
      expect(r.toString()).assertEqual('2.55500e+2')
    })

    it('toFixed', 0, () => {
      let c = new Decimal("255.5");
      let r = c.toFixed(5);
      expect(r.toString()).assertEqual('255.50000')
    })

    it('toPrecision', 0, () => {
      let c = new Decimal("255.5");
      let r = c.toPrecision(5);
      expect(r.toString()).assertEqual('255.50')
    })

    it('toFraction', 0, () => {
      let c = new Decimal("3.1415929204");
      let r = c.toFraction();
      expect(JSON.stringify(r)).assertEqual('["7853982301","2500000000"]')
    })

    it('isZero', 0, () => {
      let c = new Decimal("45.6");
      let r = c.isZero();
      expect(r.toString()).assertEqual('false')
    })
  })
}