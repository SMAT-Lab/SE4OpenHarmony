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
import naturalSort from "javascript-natural-sort"

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
    it('naturalSort1', 0, () => {
      let result: string = ['10',9,2,'1','4'].sort(naturalSort).toString();
      expect(result).assertEqual('1,2,4,9,10')
    })
    it('naturalSort2', 0, () => {
      let result: string = ['10.0401',10.022,10.042,'10.021999'].sort(naturalSort).toString();
      expect(result).assertEqual('10.021999,10.022,10.0401,10.042')
    })
    it('naturalSort3', 0, () => {
      let result: string = ['1.528535047e5','1.528535047e7','1.528535047e3'].sort(naturalSort).toString();
      expect(result).assertEqual('1.528535047e3,1.528535047e5,1.528535047e7')
    })
    it('naturalSort4', 0, () => {
      let result: string = ['192.168.0.100','192.168.0.1','192.168.1.1'].sort(naturalSort).toString();
      expect(result).assertEqual('192.168.0.1,192.168.0.100,192.168.1.1')
    })
    it('naturalSort5', 0, () => {
      let result: string = ['car.mov','01alpha.sgi','001alpha.sgi','my.string_41299.tif'].sort(naturalSort).toString();
      expect(result).assertEqual('001alpha.sgi,01alpha.sgi,car.mov,my.string_41299.tif')
    })
    it('naturalSort6', 0, () => {
      let result: string = ['10/12/2008','10/11/2008','10/11/2007','10/12/2007'].sort(naturalSort).toString();
      expect(result).assertEqual('10/11/2007,10/12/2007,10/11/2008,10/12/2008')
    })
    it('naturalSort7', 0, () => {
      let result: string = ['$10002.00','$10001.02','$10001.01'].sort(naturalSort).toString();
      expect(result).assertEqual('$10001.01,$10001.02,$10002.00')
    })
    it('naturalSort8', 0, () => {
      let result: string = ['1 Title - The Big Lebowski','1 Title - Gattaca','1 Title - Last Picture Show'].sort(naturalSort).toString();
      expect(result).assertEqual('1 Title - Gattaca,1 Title - Last Picture Show,1 Title - The Big Lebowski')
    })
    it('naturalSort9', 0, () => {
      naturalSort.insensitive = true;
      let result: string = ['a', 'B'].sort(naturalSort).toString();
      expect(result).assertEqual('a,B')
    })
  })
}