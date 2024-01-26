let __generate__Id: number = 0;
function generateId(): string {
    return "ResponseTest.test_" + ++__generate__Id;
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
import { beforeAll, describe, expect, it } from '@ohos/hypium';
import httpclient, { Cache, Request, Response } from '@ohos/httpclient';
export default function ResponseTest() {
    let response: Response;
    describe('ResponseTest', () => {
        beforeAll(async () => {
            // Presets an action, which is performed only once before all test cases of the test suite start.
            // This API supports only one parameter: preset action function.
            let request = new httpclient.Request.Builder()
                .get("http://hshapp.ncn.com.cn/wisdom3/config/config.do")
                .addHeader("Content-Type", "application/json")
                .build();
            let httpClient = new httpclient.HttpClient.Builder().setConnectTimeout(10000).build();
            await httpClient.newCall(request).execute().then((result) => {
                response = result;
            });
        });
        it('showResponse_getRequest', 0, () => {
            let isnull = response.request == null ? true : false;
            expect(isnull).assertEqual(false);
        });
        it('showResponse_getProtocol', 0, () => {
            expect(response.getProtocol()).assertEqual("http/1.1");
        });
        it('showResponse_getCode', 0, () => {
            expect(response.getCode()).assertEqual(200);
        });
        it('showResponse_isSuccessful', 0, () => {
            expect(response.isSuccessful()).assertEqual(true);
        });
        it('showResponse_getHeader', 0, () => {
            let isnull = response.getHeader() == null ? true : false;
            expect(isnull).assertEqual(false);
        });
        it('showResponse_getBody', 0, () => {
            let isnull = response.getBody() == null ? true : false;
            expect(isnull).assertEqual(false);
        });
        it('showResponse_isRedirect', 0, () => {
            expect(response.isRedirect()).assertEqual(false);
        });
        it('showResponse_getNetWorkResponse', 0, () => {
            let isnull = response.getNetWorkResponse() == null ? true : false;
            expect(isnull).assertEqual(true);
        });
        it('showResponse_getCacheResponse', 0, () => {
            let isnull = response.getCacheResponse() == null ? true : false;
            expect(isnull).assertEqual(true);
        });
        it('showResponse_getPriorResponse', 0, () => {
            let isnull = response.request == null ? true : false;
            expect(isnull).assertEqual(false);
        });
        it('showResponse_getCacheControl', 0, () => {
            let isnull = response.getCacheControl() == null ? true : false;
            expect(isnull).assertEqual(false);
        });
        it('showResponse_getSentRequestAtMillis', 0, () => {
            let isnull = response.getSentRequestAtMillis() == 0 ? true : false;
            expect(isnull).assertEqual(false);
        });
        it('showResponse_getReceivedResponseAtMillis', 0, () => {
            let isnull = response.getReceivedResponseAtMillis() == 0 ? true : false;
            expect(isnull).assertEqual(false);
        });
        it('showResponse_newBuilder', 0, () => {
            let isnull = response.newBuilder() == null ? true : false;
            expect(isnull).assertEqual(false);
        });
    });
}
