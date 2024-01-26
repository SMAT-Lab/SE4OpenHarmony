/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
 */
import assert from "./assert2hypium";
import { setInt64, getInt64, getUint64, setUint64 } from "@msgpack/msgpack/dist/utils/int";
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import { INT64SPECS } from './stdlib/StdlibData';


export default function CodecIntTest() {
  describe('CodecIntTest', () => {
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


    assert.context("int_64", () => {
      for (const name of Object.keys(INT64SPECS)) {
        const value = INT64SPECS[name]!;

        it(`sets_and_gets_${value}_${value < 0 ? "-" : ""}0x${Math.abs(value).toString(16)}_`,0, () => {
          let startTime1 = new Date().getTime();
          const b = new Uint8Array(8);
          const view = new DataView(b.buffer);
          setInt64(view, 0, value);
          assert.deepStrictEqual(getInt64(view, 0), value);
          let endTime1 = new Date().getTime();
          let averageTime1 = ((endTime1 - startTime1) * 1000) / 2;
          console.log(`msgpack-javascript:sets_and_gets_${value}_${value < 0 ? "-" : ""}0x${Math.abs(value).toString(16)}_ averageTime = ${averageTime1}`)
        });
      }
    });

    assert.context("uint_64", () => {
      it(`sets_and_gets_0`,0, () => {
        let startTime1 = new Date().getTime();
        const b = new Uint8Array(8);
        const view = new DataView(b.buffer);
        setUint64(view, 0, 0);
        assert.deepStrictEqual(getUint64(view, 0), 0);
        let endTime1 = new Date().getTime();
        let averageTime1 = ((endTime1 - startTime1) * 1000) / 2;
        console.log(`msgpack-javascript:sets_and_gets_0 averageTime = ${averageTime1}`)
      });

      it(`sets_and_gets_MAX_SAFE_INTEGER`,0, () => {
        let startTime1 = new Date().getTime();
        const b = new Uint8Array(8);
        const view = new DataView(b.buffer);
        setUint64(view, 0, Number.MAX_SAFE_INTEGER);
        assert.deepStrictEqual(getUint64(view, 0), Number.MAX_SAFE_INTEGER);
        let endTime1 = new Date().getTime();
        let averageTime1 = ((endTime1 - startTime1) * 1000) / 2;
        console.log(`msgpack-javascript:sets_and_gets_MAX_SAFE_INTEGER averageTime = ${averageTime1}`)
      });
    });

  })
}


