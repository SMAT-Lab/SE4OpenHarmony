let __generate__Id: number = 0;
function generateId(): string {
    return "AMF.test_" + ++__generate__Id;
}
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
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import AMF, { Spec, ByteArray } from 'amf-convert';
import Deserializer from 'amf-convert/dist/lib/amf/deserializer';
import DeserializationException from 'amf-convert/dist/lib/exception/deserialization';
import Serialization from 'amf-convert/dist/lib/exception/serialization';
import NotSupportedException from 'amf-convert/dist/lib/exception/not-supported';
import { getAMFDesSerUndefined, getAMFDesSerNull, getAMFDesSerFalse, getAMFDesSerTrue, getClassMapping, getClassMappingSer, getDeserializationException } from './amf';
export interface Same {
    same: (src: Object, dst: Object) => void;
    plan: (info: Object) => void;
}
export default function AMFTest() {
    describe('AMFTest', () => {
        // Defines a test suite. Two parameters are supported: test suite name and test suite function.
        beforeAll(() => {
            // Presets an action, which is performed only once before all test cases of the test suite start.
            // This API supports only one parameter: preset action function.
        });
        beforeEach(() => {
            // Presets an action, which is performed before each unit test case starts.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: preset action function.
        });
        afterEach(() => {
            // Presets a clear action, which is performed after each unit test case ends.
            // The number of execution times is the same as the number of test cases defined by **it**.
            // This API supports only one parameter: clear action function.
        });
        afterAll(() => {
            // Presets a clear action, which is performed after all test cases of the test suite end.
            // This API supports only one parameter: clear action function.
        });
        it('undefined', 1, () => {
            expect(getAMFDesSerUndefined()).assertEqual(undefined);
        });
        it('null', 1, () => {
            expect(getAMFDesSerNull()).assertEqual(null);
        });
        it('false', 1, () => {
            expect(getAMFDesSerFalse()).assertEqual(false);
        });
        it('true', 1, () => {
            expect(getAMFDesSerTrue()).assertEqual(true);
        });
        it('int', 1, () => {
            let samples = [5, 100, -100, 100878, -199, Spec.MIN_INT, Spec.MAX_INT, -109876983];
            for (let i = 0; i < samples.length; i++) {
                let sample: Object = samples[i];
                let data: Object = AMF.serialize(sample, true, Spec.AMF3_INT);
                expect(AMF.deserialize(data)).assertEqual(sample);
            }
            try {
                AMF.serialize(((Spec.MAX_INT + 1) as Object), true, Spec.AMF3_INT);
            }
            catch (e) {
                expect(e.name).assertContain('SerializationException');
            }
        });
        it('double', 1, () => {
            let samples = [-10, 0.3767574, Spec.MIN_INT, Spec.MAX_INT, Math.PI, Number.MAX_VALUE, Number.MIN_VALUE, 102.145];
            for (let i = 0; i < samples.length; i++) {
                let sample: Object = samples[i];
                expect(AMF.deserialize(AMF.serialize(sample, true, Spec.AMF3_DOUBLE), Spec.AMF3_DOUBLE)).assertEqual(sample);
            }
        });
        it('string', 1, () => {
            let bigString = '';
            for (let i = 0; i < (Math.random() * 9999999) + 100000; i++) {
                bigString += String.fromCharCode(Math.round(Math.random() * 91) + 65);
            }
            let samples = ['hello!', '', '.', 'i ❤ π', bigString];
            for (let i = 0; i < samples.length; i++) {
                let sample: Object = samples[i];
                expect(AMF.deserialize(AMF.serialize(sample, true, Spec.AMF3_STRING))).assertEqual(sample);
            }
        });
        it('date', 1, () => {
            let samples = [new Date(), new Date(2011, 3, 9), new Date(1843, 1, 9), new Date(254, 1, 9), new Date(2040, 5, 12)];
            for (let i = 0; i < samples.length; i++) {
                let sample: Object = samples[i];
                let data: Object = AMF.deserialize(AMF.serialize(sample, true, Spec.AMF3_DATE));
                expect(JSON.stringify(data)).assertEqual(JSON.stringify(sample));
            }
        });
        it('array', 1, () => {
            let sparse = [1, 2];
            sparse[5] = 9;
            let samples = [
                [1, 2, 3],
                [12.345, "hello", false, ['hi', 1234]],
                [true, false, null, "<h1>Hi</h1>"],
                sparse
            ];
            for (let i = 0; i < samples.length; i++) {
                let sample: Object = samples[i];
                expect(JSON.stringify(AMF.deserialize(AMF.serialize(sample, true, Spec.AMF3_ARRAY), Spec.AMF3_ARRAY)))
                    .assertEqual(JSON.stringify(sample));
            }
        });
        it('object', 1, () => {
            let ref = [1, 2, 3];
            interface A1 {
                hello: string;
            }
            interface A2 {
                array: Array<Object>;
                reference: Array<number>;
            }
            interface A3 {
                nesting: string;
                yeah: boolean;
                ref: Array<number>;
            }
            let a1: A1 = { hello: "Bob!" };
            let a3: A3 = { nesting: "of objects", yeah: true, ref: ref };
            let a2: A2 = {
                array: [99, 100, 101, a3],
                reference: ref
            };
            let samples = [
                a1,
                a2
            ];
            for (let i = 0; i < samples.length; i++) {
                let sample: Object = samples[i];
                let data: Object = AMF.serialize(sample, true, Spec.AMF3_OBJECT);
                expect(AMF.deserialize(data, Spec.AMF3_OBJECT)).assertDeepEquals(sample);
            }
        });
        it('bytearray', 1, () => {
            let simple = new ByteArray.default('656566');
            let data = AMF.deserialize(AMF.serialize(simple, true, Spec.AMF3_BYTE_ARRAY));
            expect(JSON.stringify(data)).assertEqual(JSON.stringify(simple));
            // create a bytearray with serialize AMF data, serialize the bytearray, deserialize the bytearray and then deserialize the AMF data
            // #meta
            interface Obj {
                it: string;
            }
            let obj: Obj = { it: "works!" };
            let amf: Object = new ByteArray.default(AMF.serialize(obj, true, Spec.AMF3_OBJECT));
            let serialized: Object = AMF.serialize(amf, true, Spec.AMF3_BYTE_ARRAY);
            let deserialized: Object = AMF.deserialize(serialized, Spec.AMF3_BYTE_ARRAY);
            expect(JSON.stringify(AMF.deserialize(deserialized, Spec.AMF3_OBJECT))).assertEqual(JSON.stringify(obj));
        });
        it('NotSupportedException', 1, () => {
            try {
                AMF.stringify(() => { });
            }
            catch (e) {
                expect(e.name).assertContain('NotSupportedException');
            }
        });
        it('DeserializationException', 1, () => {
            expect(getDeserializationException()).assertContain('DeserializationException');
        });
    });
}
