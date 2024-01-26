let __generate__Id: number = 0;
function generateId(): string {
    return "Proxy.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { HttpClient, Request, Response, TimeUnit, Proxy, Type } from '@ohos/httpclient';
export default function ProxyTest() {
    describe('ProxyTest', () => {
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
        it('assertEqual', 0, async () => {
            // Defines a test case. This API supports three parameters: test case name, filter parameter, and test case function.
            let a = 'test';
            let client: HttpClient = new HttpClient
                .Builder()
                .setProxy(new Proxy(Type.HTTP, '1.94.37.200', 6443))
                .setConnectTimeout(10, TimeUnit.SECONDS)
                .setReadTimeout(10, TimeUnit.SECONDS)
                .build();
            let request: Request = new Request.Builder()
                .url('http://publicobject.com/helloworld.txt')
                .method('GET')
                .build();
            await client.newCall(request).execute().then((result) => {
                expect(result.responseCode.toString()).assertEqual('200');
            });
            // Defines a variety of assertion methods, which are used to declare expected boolean conditions.
        });
    });
}
