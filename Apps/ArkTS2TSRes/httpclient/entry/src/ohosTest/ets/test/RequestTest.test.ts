let __generate__Id: number = 0;
function generateId(): string {
    return "RequestTest.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@ohos/hypium';
import httpclient, { Request } from '@ohos/httpclient';
const TAG: string = "[XTS_RequestTest]";
export default function RequestTest() {
    let cookieJar: any = new httpclient.CookieJar();
    let request: Request;
    describe('RequestTest', () => {
        beforeAll(() => {
            request = new httpclient.Request.Builder()
                .get("http://hshapp.ncn.com.cn/wisdom3/config/config.do")
                .addHeader("Content-Type", "application/json")
                .body("Test")
                .setCookieJar(cookieJar)
                .params("testKey1", "testValue1")
                .params("testKey2", "testValue2")
                .followRedirects(true)
                .build();
        });
        it('showHttpRequestHAddHeader', 0, () => {
            console.log(TAG + "addHeader ： " + JSON.stringify(request.headers));
            expect(request.headers).assertDeepEquals({
                "Content-Type": "application/json"
            });
        });
        it('showHttpRequestHAddHeaderBody', 0, () => {
            console.log(TAG + "body ： " + JSON.stringify(request.body));
            expect(JSON.stringify(request.body)).assertContain("Test");
        });
        it('showHttpRequestMethod', 0, () => {
            console.log(TAG + "method ： " + JSON.stringify(request.method));
            expect(request.method).assertEqual("GET");
        });
        it('showHttpRequestUrl', 0, () => {
            console.log(TAG + "url ： " + JSON.stringify(request.url));
            expect(JSON.stringify(request.url)).assertContain("http://hshapp.ncn.com.cn/wisdom3/config/config.do");
        });
        it('showHttpRequest_followRedirects', 0, () => {
            console.log(TAG + "followRedirects ： " + JSON.stringify(request.followRedirects));
            expect(request.followRedirects).assertEqual(true);
        });
        it('showHttpRequest_retryOnConnectionFailure', 0, () => {
            console.log(TAG + "retryOnConnectionFailure ： " + JSON.stringify(request.retryOnConnectionFailure));
            expect(request.retryOnConnectionFailure).assertEqual(true);
        });
        it('showHttpRequest_retryMaxLimit', 0, () => {
            console.log(TAG + "retryMaxLimit ： " + JSON.stringify(request.retryMaxLimit));
            expect(request.retryMaxLimit).assertEqual(20);
        });
        it('showHttpRequest_retryConnectionCount', 0, () => {
            console.log(TAG + "retryConnectionCount ： " + JSON.stringify(request.retryConnectionCount));
            expect(request.retryConnectionCount).assertEqual(1);
        });
        it('showHttpRequest_redirectMaxLimit', 0, () => {
            console.log(TAG + "redirectMaxLimit ： " + JSON.stringify(request.redirectMaxLimit));
            expect(request.redirectMaxLimit).assertEqual(20);
        });
        it('showHttpRequest_redirectionCount', 0, () => {
            console.log(TAG + "redirectionCount ： " + JSON.stringify(request.redirectionCount));
            expect(request.redirectionCount).assertEqual(1);
        });
        it('showHttpRequest_cookieJar', 0, () => {
            console.log(TAG + "cookieJar ： " + JSON.stringify(request.cookieJar));
            expect(request.cookieJar).assertEqual(cookieJar);
        });
        it('showHttpRequest_newBuilder', 0, () => {
            let builder = request.newBuilder() == null ? false : true;
            expect(builder).assertEqual(true);
        });
    });
}
