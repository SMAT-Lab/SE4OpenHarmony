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
import { TinyEmitter } from "tiny-emitter";
import  emitter  from "tiny-emitter/instance";

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
    it('emitter_on_1', 0, () => {
      let mEmitter: TinyEmitter = new TinyEmitter();
      mEmitter.on('some-event', (arg1: string, arg2: string, arg3: string) => {
        expect(arg1).assertEqual('arg1 value')
        expect(arg2).assertEqual('arg2 value')
        expect(arg3).assertEqual('arg3 value')
      });
      mEmitter.emit('some-event', 'arg1 value', 'arg2 value', 'arg3 value');
    })

    it('emitter_on_2', 0, () => {
      emitter.on('some-event', (arg1: string, arg2: string, arg3: string) => {
        expect(arg1).assertEqual('arg1 value')
        expect(arg2).assertEqual('arg2 value')
        expect(arg3).assertEqual('arg3 value')
      });
      emitter.emit('some-event', 'arg1 value', 'arg2 value', 'arg3 value');
    })

    it('emitter_off_1', 0, () => {
      let count = 0;
      let mEmitter: TinyEmitter = new TinyEmitter();
      mEmitter.on('some-event', (arg1: string, arg2: string, arg3: string) => {
        count++;
      });
      mEmitter.off('some-event')
      mEmitter.emit('some-event', 'arg1 value', 'arg2 value', 'arg3 value');
      mEmitter.emit('some-event', 'arg1 value', 'arg2 value', 'arg3 value');
      setTimeout(()=>{
        expect(count).assertEqual(0)
      }, 10)
    })
    it('emitter_off_2', 0, () => {
      let count = 0;
      emitter.on('some-event', (arg1: string, arg2: string, arg3: string) => {
        count++;
      });
      emitter.off('some-event')
      emitter.emit('some-event', 'arg1 value', 'arg2 value', 'arg3 value');
      emitter.emit('some-event', 'arg1 value', 'arg2 value', 'arg3 value');
      setTimeout(()=>{
        expect(count).assertEqual(0)
      }, 10)
    })

    it('emitter_once_1', 0, () => {
      let count = 0;
      let mEmitter: TinyEmitter = new TinyEmitter();
      mEmitter.once('some-event', (arg1: string, arg2: string, arg3: string) => {
        expect(arg1).assertEqual('arg1 value')
        expect(arg2).assertEqual('arg2 value')
        expect(arg3).assertEqual('arg3 value')
        count++;
      });
      mEmitter.emit('some-event', 'arg1 value', 'arg2 value', 'arg3 value');
      mEmitter.emit('some-event', 'arg1 value 1', 'arg2 value 2', 'arg3 value 3');
      setTimeout(()=>{
        expect(count).assertEqual(1)
      }, 50)
    })

    it('emitter_once_2', 0, () => {
      let count = 0;
      emitter.once('some-event-1', (arg1: string, arg2: string, arg3: string) => {
        expect(arg1).assertEqual('arg1 value')
        expect(arg2).assertEqual('arg2 value')
        expect(arg3).assertEqual('arg3 value')
        count++;
      });
      emitter.emit('some-event-1', 'arg1 value', 'arg2 value', 'arg3 value');
      emitter.emit('some-event-1', 'arg1 value 1', 'arg2 value 2', 'arg3 value 3');
      setTimeout(()=>{
        expect(count).assertEqual(1)
      }, 50)
    })
  })
}