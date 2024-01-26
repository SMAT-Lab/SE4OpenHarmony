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
import { decode } from "@msgpack/msgpack";
import ieee754 from "./ieee754/ieee754";
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import { floatSPECS } from './stdlib/StdlibData';

const FLOAT32_TYPE = 0xca;
const FLOAT64_TYPE = 0xcb;

export default function CodecFloatTest() {
  describe('CodecFloatTest', () => {
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
         let float32 = (str: string,callback: Function) => {
           callback();
         }
        float32('float_32',() => {
          for (const pair of Object.entries(floatSPECS)) {
            let name = pair[0]
            let value = pair[1]
            it(`decodes_${name}_${value}_`,0, () => {

              const buf = new Uint8Array(4);
              ieee754.write(buf, value, 0, false, 23, 4);
              const expected: number = ieee754.read(buf, 0, false, 23, 4);

              let startTime1 = new Date().getTime();
              assert.strictEqual(decode<undefined>([FLOAT32_TYPE, ...buf]), expected, "matched sign");
              assert.notDeepStrictEqual(decode<undefined>([FLOAT32_TYPE, ...buf]), -(expected), "unmatched sign");
              let endTime1 = new Date().getTime();
              let averageTime1 = ((endTime1 - startTime1) * 1000) / 2;
              console.log(`msgpack-javascript:decodes_${name}_${value}_ averageTime = ${averageTime1}`)

            });
          }

          it(`decodes_NaN`,0, () => {
            const buf = new Uint8Array(4);
            ieee754.write(buf, Number.NaN, 0, false, 23, 4);
            const expected: number = ieee754.read(buf, 0, false, 23, 4);

            let startTime1 = new Date().getTime();
            assert.deepStrictEqual(decode<undefined>([FLOAT32_TYPE, ...buf]), expected, "matched sign");
            let endTime1 = new Date().getTime();
            let averageTime1 = ((endTime1 - startTime1) * 1000) / 1;
            console.log(`msgpack-javascript:decodes_NaN averageTime = ${averageTime1}`)
          });
        })


    let float64 = (str: string,callback: Function) => {
      callback();
    }
    float64('float_64', () => {
      for (const pair of Object.entries(floatSPECS)) {
        let name = pair[0]
        let value = pair[1]
        it(`decodes_${name}_${value}_`,0, () => {
          const buf = new Uint8Array(8);
          ieee754.write(buf, value, 0, false, 52, 8);
          const expected: number = ieee754.read(buf, 0, false, 52, 8);
          let startTime1 = new Date().getTime();
          assert.strictEqual(decode<undefined>([FLOAT64_TYPE, ...buf]), expected, "matched sign");
          assert.notDeepStrictEqual(decode<undefined>([FLOAT64_TYPE, ...buf]), -(expected), "unmatched sign");
          let endTime1 = new Date().getTime();
          let averageTime1 = ((endTime1 - startTime1) * 1000) / 2;
          console.log(`msgpack-javascript:decodes_${name}_${value}_ averageTime = ${averageTime1}`)
        });
      }

      it(`decodes_NaN`,0, () => {
        const buf = new Uint8Array(8);
        ieee754.write(buf, Number.NaN, 0, false, 52, 8);
        const expected: number = ieee754.read(buf, 0, false, 52, 8);
        let startTime1 = new Date().getTime();
        assert.deepStrictEqual(decode<undefined>([FLOAT64_TYPE, ...buf]), expected, "matched sign");
        let endTime1 = new Date().getTime();
        let averageTime1 = ((endTime1 - startTime1) * 1000) / 1;
        console.log(`msgpack-javascript:decodes_NaN averageTime = ${averageTime1}`)
      });
    })


  })
}





