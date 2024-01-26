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
import { afterAll, afterEach, beforeAll, beforeEach, describe,expect,it} from '@ohos/hypium'
import jsonBig from 'json-bigint'
import { jsonBigTpye} from '../../../main/ets/pages/index.ts'
export default function Bigint_test(){
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
    describe("Bigint_test", ()=>{
        let  input = '{"big":9223372036854775807,"small":123}';
        it("Should_show_classic_JSON_parse_lacks_bigint_support",0, ()=>{
            let obj:Record<string, string>= JSON.parse(input);
            expect(obj.small.toString()).assertEqual("123");
            expect(obj.big.toString()).not().assertDeepEquals("9223372036854775807");//不一致
            let  output = JSON.stringify(obj);
            expect(output).not().assertDeepEquals(input);
        });
        it("Should_show_JSONbig_does_support_bigint_parse_stringify_roundtrip", 0,()=>{
            let bigInt:jsonBigTpye = jsonBig();
            let obj: string  = bigInt.parse(input);
            expect(obj.small.toString()).assertEqual("123");
            expect(obj.big.toString()).assertEqual("9223372036854775807");//一致
            let output:string = bigInt.stringify(obj.big);
            expect(output.toString()).assertEqual(obj.big.toString());
        });
    });

}

