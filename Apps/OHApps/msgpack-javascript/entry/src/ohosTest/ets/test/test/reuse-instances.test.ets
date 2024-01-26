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
import { Encoder, Decoder, decode } from "@msgpack/msgpack";
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium'
import { data1, data2, reuseobject } from "./stdlib/StdlibData"
import ReuseInstances from "../test/stdlib/ReuseInstances";

export default function reuseInstancesTest() {
  describe('reuseInstancesTest', () => {
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

    const N = 10;
    assert.context("encode() and decodeSync()", () => {
      it("runs_multiple_times1", 0, () => {
        for (let i = 0; i < N; i++) {
          let startTime1 = new Date().getTime();
          let endTime1 = new Date().getTime();
          let averageTime1 = ((endTime1 - startTime1) * 1000) / 2;
          console.log(`msgpack-javascript:runs_multiple_times#${i} averageTime = ${averageTime1}`)
          assert.deepStrictEqual(ReuseInstances.runsMultipleTimes1(), reuseobject, `#${i}`);
        }
      });
    });

    assert.context("encode() and decodeAsync()", () => {
      it("runs_multiple_times2", 0, async () => {
        for (let i = 0; i < N; i++) {
          let startTime1 = new Date().getTime();
          let endTime1 = new Date().getTime();
          let averageTime1 = ((endTime1 - startTime1) * 1000) / 2;
          console.log(`msgpack-javascript:runs_multiple_times#${i} averageTime = ${averageTime1}`)
          assert.deepStrictEqual(await ReuseInstances.runsMultipleTimes2(), reuseobject, `#${i}`);
        }
      });
    });

    assert.context("encode() and decodeStream()", () => {
      it("runs_multiple_times3", 0, async () => {
        for (let i = 0; i < N; i++) {
          const a: Array<Object> = [];
          await ReuseInstances.runsMultipleTimes3Or4(a,3)
          let startTime1 = new Date().getTime();
          let endTime1 = new Date().getTime();
          let averageTime1 = ((endTime1 - startTime1) * 1000) / 2;
          console.log(`msgpack-javascript:runs_multiple_times#${i} averageTime = ${averageTime1}`)
          assert.deepStrictEqual(a, [reuseobject], `#${i}`);

        }
      });
    });

    assert.context("encode() and decodeArrayStream()", () => {
      it("runs_multiple_times4", 0, async () => {
        for (let i = 0; i < N; i++) {
          const a: Array<Object> = [];
          await ReuseInstances.runsMultipleTimes3Or4(a, 4)
          let startTime1 = new Date().getTime();
          let endTime1 = new Date().getTime();
          let averageTime1 = ((endTime1 - startTime1) * 1000) / 2;
          console.log(`msgpack-javascript:runs_multiple_times#${i} averageTime = ${averageTime1}`)
          assert.deepStrictEqual(a, [[reuseobject]], `#${i}`);
        }
      });

      assert.context("regression #212", () => {
        it("runs_multiple_times5", 0, () => {
          const encoder = new Encoder<undefined>();
          const decoder = new Decoder<undefined>();

          const arr = [data1, data2];
          const enc = arr.map<Array<Object>>((x) => [x, encoder.encode(x)]);

          enc.forEach((pair) => {
            let orig = pair[0]
            let acc = pair[1]
            let startTime1 = new Date().getTime();


            let endTime1 = new Date().getTime();
            let averageTime1 = ((endTime1 - startTime1) * 1000) / 1;
            console.log(`msgpack-javascript:regression #212 runs_multiple_times#${orig} #${acc} averageTime = ${averageTime1}`)

            assert.deepStrictEqual(decoder.decode(acc), orig);

          });
        });
      });

      assert.context("Encoder#encodeSharedRef()", () => {
        it("returns_the_shared_reference", 0, () => {
          const encoder = new Encoder<undefined>();
          let startTime1 = new Date().getTime();
          const a = encoder.encodeSharedRef(true);
          const b = encoder.encodeSharedRef(false);
          let endTime1 = new Date().getTime();
          let averageTime1 = ((endTime1 - startTime1) * 1000) / 2;
          console.log(`msgpack-javascript:returns_the_shared_reference averageTime = ${averageTime1}`)

          assert.deepStrictEqual(decode<undefined>(a), decode<undefined>(b)); // yes, this is the expected behavior
          assert.deepStrictEqual(a.buffer, b.buffer);
        });
      });
    });
  })


}






