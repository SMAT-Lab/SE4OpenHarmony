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
import rescale from "ml-array-rescale"

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

    it('should_return_a_rescaled_array1', 0, () => {
      expect(rescale([0, 2])).assertDeepEquals([0, 1]);
    })
    it('should_return_a_rescaled_array2', 0, () => {
      expect(rescale([0, 1])).assertDeepEquals([0, 1]);
    })
    it('should_return_a_rescaled_array3', 0, () => {
      expect(rescale([0, 1, 2])).assertDeepEquals([0, 0.5, 1]);
    })
    it('should_throw_min_max', 0, () => {
      try{
        rescale([1, 1])
      }catch(e){
        expect(e.message).assertEqual('minimum and maximum input values are equal\. Cannot rescale a constant array')
      }
    })
    it('should_fill_he_provided_output', 0, () => {
      const array = [0, 1, 2, 3, 4];
      const output: number[] = new Array(5);
      rescale(array, { output });
      expect(output).assertDeepEquals([0, 0.25, 0.5, 0.75, 1]);
      expect(array).assertDeepEquals([0, 1, 2, 3, 4]);
    })
    it('should_work_in_place', 0, () => {
      const array = [0, 1, 2, 3, 4];
      rescale(array, { output: array });
      expect(array).assertDeepEquals([0, 0.25, 0.5, 0.75, 1]);
    })
    it('should_work_with_custom_min_max_1', 0, () => {
      let typedArray = new Uint16Array(3);
      typedArray[0] = 1;
      typedArray[1] = 2;
      typedArray[2] = 3;
      expect(rescale(typedArray, { min: -1, max: 1 })).assertDeepEquals([-1, 0, 1]);
    })
    it('should_work_with_custom_min_max_2', 0, () => {
      expect(rescale([0, 1, 2], { min: -1, max: 1 })).assertDeepEquals([-1, 0, 1]);
    })
    it('should_work_with_custom_min_max_3', 0, () => {
      expect(rescale([0, 1, 2], { min: 0.5 })).assertDeepEquals([0.5, 0.75, 1]);
    })
    it('should_work_with_custom_min_max_4', 0, () => {
      expect(rescale([0, 1, 2], { max: 0.5 })).assertDeepEquals([0, 0.25, 0.5]);
    })
    it('should_work_with_custom_min_max_5', 0, () => {
      expect(rescale([0, 1, 2], { min: 50, max: 100 })).assertDeepEquals([
        50,
        75,
        100,
      ]);
    })
    it('should_work_with_custom_min_max_6', 0, () => {
      expect(rescale([-25, 0, 25, 50, 75], { min: -50, max: 0 })).assertDeepEquals([
        -50,
        -37.5,
        -25,
        -12.5,
        0,
      ]);
    })

    it('should_throw_on_bad_inputs', 0, () => {
      try{
        rescale([])
      }catch(e){
        expect(e.message).assertEqual('input must not be empty');
      }
      try{
        rescale([0, 1, 2], { min: 2 })
      }catch(e){
        expect(e.message).assertEqual('min option must be smaller than max option');
      }
      try{
        rescale([0, 1, 2], { max: -1 })
      }catch(e){
        expect(e.message).assertEqual('min option must be smaller than max option');
      }
      try{
        rescale([0, 1, 2], { min: 2, max: 0 })
      }catch(e){
        expect(e.message).assertEqual('min option must be smaller than max option');
      }
      try{
        rescale([0, 1, 2], { min: 1, max: 1 })
      }catch(e){
        expect(e.message).assertEqual('min option must be smaller than max option');
      }
      try{
        rescale([], { min: 0, max: 1 })
      }catch(e){
        expect(e.message).assertEqual('input must not be empty');
      }
    })
    it('should_work_with_current_min_max_1', 0, () => {
      expect(rescale([0, 1, 2], { min: 1, autoMinMax: true })).assertDeepEquals([
        1,
        1.5,
        2,
      ]);
    })
    it('should_work_with_current_min_max_2', 0, () => {
      expect(rescale([0, 1, 2], { max: 3, autoMinMax: true })).assertDeepEquals([
        0,
        1.5,
        3,
      ]);
    })
  })
}