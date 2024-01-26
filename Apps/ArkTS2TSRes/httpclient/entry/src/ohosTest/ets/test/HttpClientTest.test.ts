let __generate__Id: number = 0;
function generateId(): string {
    return "HttpClientTest.test_" + ++__generate__Id;
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
import httpclient, { Cache, Chain, Credentials, Interceptor, NetAuthenticator, Request, Response } from '@ohos/httpclient';
import hilog from '@ohos.hilog';
import { GlobalContext } from '../testability/GlobalContext';
function LOG_SHOW_INFO(value: string) {
    const TAG: string = "[XTS_HttpClientTest]";
    hilog.info(0x0000, TAG, '%{public}s', value);
}
export default function HttpClientTest() {
    let request: Request;
    let globalThisCacheDir: string;
    let context: Context;
    describe('HttpClientTest', () => {
        beforeAll(() => {
            context = GlobalContext.getContext().getValue("testcontt") as Context;
            globalThisCacheDir = context.cacheDir;
            LOG_SHOW_INFO(" context : " + globalThisCacheDir);
            request = new httpclient.Request.Builder()
                .get()
                .url('http://publicobject.com/helloworld.txt')
                .build();
        });
        it('showHttpClient_newCall', 0, () => {
            let httpClient = new httpclient.HttpClient.Builder().setConnectTimeout(10000).build();
            let isNull = httpClient.newCall(request) == null ? true : false;
            expect(isNull).assertEqual(false);
        });
        it("showHttpClient_dispatcher", 0, () => {
            let httpClient = new httpclient.HttpClient.Builder().setConnectTimeout(10000).build();
            let dispatcher: any = httpClient.dispatcher;
            expect(dispatcher.maxRequests).assertEqual(64);
        });
        it("showHttpClient_interceptors", 0, () => {
            class MyInterceptor implements Interceptor {
                intercept(chain: Chain): Promise<Response> {
                    chain = chain;
                    const request = chain.requestI();
                    const response = chain.proceedI(request);
                    return response;
                }
            }
            let httpClient = new httpclient.HttpClient.Builder().addInterceptor(new MyInterceptor())
                .setConnectTimeout(10000)
                .build();
            httpClient.newCall(request).execute();
            let dispatcher = httpClient.interceptors;
            expect(dispatcher.length).assertEqual(1);
        });
        it("showHttpClient_authenticator", 0, () => {
            let auth: NetAuthenticator = new NetAuthenticator('jesse', 'password1');
            auth.setCredentials(Credentials.basic(auth.userName, auth.password));
            let httpClient = new httpclient.HttpClient.Builder().authenticator(auth).setConnectTimeout(10000).build();
            httpClient.newCall(request).execute();
            let authenticator: any = httpClient.authenticator;
            expect(authenticator.userName).assertEqual("jesse");
        });
        it("showHttpClient_cache", 0, () => {
            let myCache = new httpclient.Cache.Cache(globalThisCacheDir, 1024 * 1, context);
            let httpClient = new httpclient.HttpClient.Builder().cache(myCache).setConnectTimeout(10000).build();
            httpClient.newCall(request).execute();
            let cache = httpClient.cache as Cache.Cache;
            expect(cache.maxSize()).assertEqual(1024);
        });
        it("showHttpClient_connectionTimeout", 0, () => {
            let httpClient = new httpclient.HttpClient.Builder().setConnectTimeout(10000).build();
            httpClient.newCall(request).execute();
            let connectionTime: any = httpClient.connectionTimeout;
            expect(connectionTime).assertEqual(10000);
        });
        it("showHttpClient_readTimeout", 0, () => {
            let httpClient = new httpclient.HttpClient.Builder().setConnectTimeout(10000).build();
            let readTime: any = httpClient.readTimeout;
            expect(readTime).assertEqual(10000);
        });
        it("showHttpClient_writeTimeout", 0, () => {
            let httpClient = new httpclient.HttpClient.Builder().setWriteTimeout(20, httpclient.TimeUnit.SECONDS)
                .setConnectTimeout(10000)
                .build();
            httpClient.newCall(request).execute();
            let writeTime: any = httpClient.writeTimeout;
            expect(writeTime).assertEqual(20000);
        });
        it("showHttpClient_Builder", 0, () => {
            let Builder = new httpclient.HttpClient.Builder() == null ? true : false;
            expect(Builder).assertEqual(false);
        });
    });
}
