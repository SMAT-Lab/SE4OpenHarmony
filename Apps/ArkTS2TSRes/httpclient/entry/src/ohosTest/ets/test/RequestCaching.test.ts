let __generate__Id: number = 0;
function generateId(): string {
    return "RequestCaching.test_" + ++__generate__Id;
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
import { beforeAll, describe, expect, it, TestType } from '@ohos/hypium';
import { Cache, CacheControl, Dns, HttpClient, Logger, Request, Response, StringUtil, TimeUnit, Utils, X509TrustManager } from '@ohos/httpclient';
import base64 from 'base64-js';
import certFramework from '@ohos.security.cert';
import { Utils as GetCAUtils } from "../../../main/ets/utils/Utils";
import { GlobalContext } from '../testability/GlobalContext';
import connection from '@ohos.net.connection';
const TAG: string = "request_caching_test_customCertificate_Unidirectional";
const BASE_COUNT: number = 2000;
const BASELINE_HASSIMECASR = 500; // hasSimCard 性能基线
async function execute(httpClientForHttp: HttpClient, request: Request, index: number, name: string) {
    let startTime = new Date().getTime();
    await httpClientForHttp
        .newCall(request)
        .checkCertificate(new SslCertificateManager())
        .execute()
        .then(async (result: Response) => {
        if (index < BASE_COUNT) {
            execute(httpClientForHttp, request, (index + 1), name);
        }
        else {
            let endTime = new Date().getTime();
            let averageTime = (endTime - startTime) * 1000 / BASE_COUNT;
            Logger.info(name + '----Time required------>' + averageTime + 'μs');
            expect(averageTime < BASELINE_HASSIMECASR).assertTrue();
        }
    });
}
export default function RequestCachingTest() {
    let httpClientForHttps: HttpClient;
    let httpClientForHttp: HttpClient;
    let caFile: string;
    // forceCache
    describe('RequestCachingForceCacheTestHttps', () => {
        beforeAll(async () => {
            let caPem = "noPassword/ca.pem";
            let context = GlobalContext.getContext().getValue("testcontt") as Context;
            let hereCacheDir = context.cacheDir;
            let cache = new Cache.Cache(hereCacheDir, 10 * 1024 * 1024, context);
            httpClientForHttps = new HttpClient
                .Builder()
                .dns(new CustomDnsForHttps())
                .cache(cache)
                .setConnectTimeout(10000, TimeUnit.SECONDS)
                .setReadTimeout(10000, TimeUnit.SECONDS)
                .build();
            caFile = await new GetCAUtils().getCA(caPem, context);
        });
        /**
         * 以maxAge为例
         * forceCache执行用例
         * 执行第一次网络查询
         * 后面走缓存
         */
        // 第一次执行
        it('forceCache0_execute_https', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/max/age')
                .cacheControl(CacheControl.FORCE_CACHE())
                .ca([caFile])
                .build();
            let result: Response = await httpClientForHttps
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> forceCache-one-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(200);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> forceCache-one-----end-----');
            }
        });
        // 第二次执行
        it('forceCache1_execute_https', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/max/age')
                .cacheControl(CacheControl.FORCE_CACHE())
                .ca([caFile])
                .build();
            let result: Response = await httpClientForHttps
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> forceCache-two-----start-----');
                expect(result.getNetWorkResponse()).assertEqual(undefined);
                expect(result.getCacheResponse().responseCode).assertEqual(200);
                Logger.info('RequestCaching -> forceCache-two-----end-----');
            }
        });
    });
    // etag
    describe('RequestCachingEtagTestHttps', () => {
        beforeAll(async () => {
            let caPem = "noPassword/ca.pem";
            let context = GlobalContext.getContext().getValue("testcontt") as Context;
            let hereCacheDir = context.cacheDir;
            let cache = new Cache.Cache(hereCacheDir, 10 * 1024 * 1024, context);
            httpClientForHttps = new HttpClient
                .Builder()
                .dns(new CustomDnsForHttps())
                .cache(cache)
                .setConnectTimeout(10000, TimeUnit.SECONDS)
                .setReadTimeout(10000, TimeUnit.SECONDS)
                .build();
            caFile = await new GetCAUtils().getCA(caPem, context);
        });
        /**
         * e/tag执行用例
         * 执行第一次网络查询
         * 执行第二次返回304，走缓存
         * 改变etag值
         * 执行第三次网络查询
         * 执行第四次返回304，走缓存
         */
        // etag执行第一次，网络查询
        it('etag0_execute_https', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/e/tag')
                .ca([caFile])
                .build();
            let result: Response = await httpClientForHttps
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> etag-one-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(200);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> etag-one-----end-----');
            }
        });
        // etag执行第二次，走缓存
        it('etag1_execute_https', 0, async () => {
            // etag执行第二次
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/e/tag')
                .ca([caFile])
                .build();
            let result: Response = await httpClientForHttps
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                // 第二次返回304，走缓存
                Logger.info('RequestCaching -> etag-two-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(304);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> etag-two-----end-----');
            }
        });
        // 改变etag的值
        it('etag2_execute_https', 0, async () => {
            // 改变etag值
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/e/tag/change')
                .ca([caFile])
                .build();
            await httpClientForHttps
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
        });
        // 第三次查询etag，走网络
        it('etag3_execute_https', 0, async () => {
            // etag执行第三次
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/e/tag')
                .ca([caFile])
                .build();
            let result: Response = await httpClientForHttps
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> etag-three-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(200);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> etag-three-----end-----');
            }
        });
        // 第四次查询etag，走缓存
        it('etag4_execute_https', 0, async () => {
            // etag执行第四次
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/e/tag')
                .ca([caFile])
                .build();
            let result: Response = await httpClientForHttps
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                // 第四次次返回304，走缓存
                Logger.info('RequestCaching -> etag-four-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(304);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> etag-four-----end-----');
            }
        });
    });
    // expires
    describe('RequestCachingExpiresTestHttps', () => {
        beforeAll(async () => {
            let caPem = "noPassword/ca.pem";
            let context = GlobalContext.getContext().getValue("testcontt") as Context;
            let hereCacheDir = context.cacheDir;
            let cache = new Cache.Cache(hereCacheDir, 10 * 1024 * 1024, context);
            httpClientForHttps = new HttpClient
                .Builder()
                .dns(new CustomDnsForHttps())
                .cache(cache)
                .setConnectTimeout(10000, TimeUnit.SECONDS)
                .setReadTimeout(10000, TimeUnit.SECONDS)
                .build();
            caFile = await new GetCAUtils().getCA(caPem, context);
        });
        /**
         * expires执行用例
         * 执行第一次网络查询
         * 执行第二次走缓存
         * 等待6s之后，缓存失效
         * 执行第三次走网络查询
         * 执行第四次走网络查询
         */
        // expires执行第一次，走网络
        it('expires0_execute_https', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/expires')
                .ca([caFile])
                .build();
            let result: Response = await httpClientForHttps
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> expires-one-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(200);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> expires-one-----end-----');
            }
        });
        // expires执行第二次, 走缓存
        it('expires1_execute_https', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/expires')
                .ca([caFile])
                .build();
            let result: Response = await httpClientForHttps
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (request) {
                Logger.info('RequestCaching -> expires-two-----start-----');
                expect(result.getNetWorkResponse()).assertEqual(undefined);
                expect(result.getCacheResponse().responseCode).assertEqual(200);
                Logger.info('RequestCaching -> expires-two-----end-----');
            }
            // 延迟7s
            it('expires2_execute_https', 0, async () => {
                let nowTime = (new Date()).getTime();
                let endTime = (new Date()).getTime();
                while (endTime - nowTime < 7000) {
                    endTime = (new Date()).getTime();
                }
            });
            // 执行第三次，走网络
            it('expires3_execute_https', 0, async () => {
                let request: Request = new Request.Builder()
                    .get()
                    .url('https://1.94.37.200:8080/cache/expires')
                    .ca([caFile])
                    .build();
                let result: Response = await httpClientForHttps
                    .newCall(request)
                    .checkCertificate(new SslCertificateManager())
                    .execute();
                if (result) {
                    Logger.info('RequestCaching -> expires-three-----start-----');
                    expect(result.getNetWorkResponse().responseCode).assertEqual(200);
                    expect(result.responseCode).assertEqual(200);
                    Logger.info('RequestCaching -> expires-three-----end-----');
                }
            });
            // 执行第四次，走缓存
            it('expires4_execute_https', 0, async () => {
                let request: Request = new Request.Builder()
                    .get()
                    .url('https://1.94.37.200:8080/cache/expires')
                    .ca([caFile])
                    .build();
                let result: Response = await httpClientForHttps
                    .newCall(request)
                    .checkCertificate(new SslCertificateManager())
                    .execute();
                if (result) {
                    Logger.info('RequestCaching -> expires-four-----start-----');
                    expect(result.getNetWorkResponse()).assertEqual(undefined);
                    expect(result.getCacheResponse().responseCode).assertEqual(200);
                    Logger.info('RequestCaching -> expires-four-----end-----');
                }
            });
        });
    });
    // immutable
    describe('RequestCachingImmutableTestHttps', () => {
        beforeAll(async () => {
            let caPem = "noPassword/ca.pem";
            let context = GlobalContext.getContext().getValue("testcontt") as Context;
            let hereCacheDir = context.cacheDir;
            let cache = new Cache.Cache(hereCacheDir, 10 * 1024 * 1024, context);
            httpClientForHttps = new HttpClient
                .Builder()
                .dns(new CustomDnsForHttps())
                .cache(cache)
                .setConnectTimeout(10000, TimeUnit.SECONDS)
                .setReadTimeout(10000, TimeUnit.SECONDS)
                .build();
            caFile = await new GetCAUtils().getCA(caPem, context);
        });
        /**
         * immutable执行用例
         * 执行第一次网络查询
         * 后面执行走缓存
         */
        // immutable执行第一次，网络查询
        it('immutable0_execute_https', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/immutable')
                .ca([caFile])
                .build();
            let result: Response = await httpClientForHttps
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> immutable-one-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(200);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> immutable-one-----end-----');
            }
        });
        // immutable执行第二次，缓存
        it('immutable2_execute_https', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/immutable')
                .ca([caFile])
                .build();
            let result: Response = await httpClientForHttps
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> immutable-two-----start-----');
                expect(result.getNetWorkResponse()).assertEqual(undefined);
                expect(result.getCacheResponse().responseCode).assertEqual(200);
                Logger.info('RequestCaching -> immutable-two-----end-----');
            }
        });
    });
    // lastModified
    describe('RequestCachingLastModifiedTestHttps', () => {
        beforeAll(async () => {
            let caPem = "noPassword/ca.pem";
            let context = GlobalContext.getContext().getValue("testcontt") as Context;
            let hereCacheDir = context.cacheDir;
            let cache = new Cache.Cache(hereCacheDir, 10 * 1024 * 1024, context);
            httpClientForHttps = new HttpClient
                .Builder()
                .dns(new CustomDnsForHttps())
                .cache(cache)
                .setConnectTimeout(10000, TimeUnit.SECONDS)
                .setReadTimeout(10000, TimeUnit.SECONDS)
                .build();
            caFile = await new GetCAUtils().getCA(caPem, context);
        });
        /**
         * lastModified执行用例
         * 执行第一次网络查询
         * 执行第二次走缓存
         * 修改，改变last_modified值
         * 执行第三次网络查询
         * 执行第四次走缓存
         */
        // lastModified执行第一次，网络查询
        it('lastModified0_execute_https', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/last/modified')
                .ca([caFile])
                .build();
            let result: Response = await httpClientForHttps
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> lastModified-one-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(200);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> lastModified-one-----end-----');
            }
        });
        // lastModified执行第二次，缓存
        it('lastModified1_execute_https', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/last/modified')
                .ca([caFile])
                .build();
            let result: Response = await httpClientForHttps
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> lastModified-two-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(304);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> lastModified-two-----end-----');
            }
        });
        // 修改lastModified的值
        it('lastModified2_execute_https', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/last/modified/change')
                .ca([caFile])
                .build();
            await httpClientForHttps
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
        });
        // lastModified执行第三次，网络
        it('lastModified3_execute_https', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/last/modified')
                .ca([caFile])
                .build();
            let result: Response = await httpClientForHttps
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> lastModified-three-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(200);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> lastModified-three-----end-----');
            }
        });
        // lastModified执行第四次，缓存
        it('lastModified4_execute_https', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/last/modified')
                .ca([caFile])
                .build();
            let result: Response = await httpClientForHttps
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> lastModified-four-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(304);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> lastModified-four-----end-----');
            }
        });
    });
    // maxAge
    describe('RequestCachingMaxAgeTestHttps', () => {
        beforeAll(async () => {
            let caPem = "noPassword/ca.pem";
            let context = GlobalContext.getContext().getValue("testcontt") as Context;
            let hereCacheDir = context.cacheDir;
            let cache = new Cache.Cache(hereCacheDir, 10 * 1024 * 1024, context);
            httpClientForHttps = new HttpClient
                .Builder()
                .dns(new CustomDnsForHttps())
                .cache(cache)
                .setConnectTimeout(10000, TimeUnit.SECONDS)
                .setReadTimeout(10000, TimeUnit.SECONDS)
                .build();
            caFile = await new GetCAUtils().getCA(caPem, context);
        });
        /**
         * maxAge执行用例
         * 执行第一次网络查询
         * 执行第二次走缓存
         */
        // maxAge第一次执行，网络
        it('maxAge0_execute_https', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/max/age')
                .addHeader("Cache-Control", "max-age=3")
                .ca([caFile])
                .build();
            let result: Response = await httpClientForHttps
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> maxAge-one-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(200);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> maxAge-one-----end-----');
            }
        });
        // maxAge第二次执行，缓存
        it('maxAge1_execute_https', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/max/age')
                .addHeader("Cache-Control", "max-age=3")
                .ca([caFile])
                .build();
            let result: Response = await httpClientForHttps
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> maxAge-two-----start-----');
                expect(result.getNetWorkResponse()).assertEqual(undefined);
                expect(result.getCacheResponse().responseCode).assertEqual(200);
                Logger.info('RequestCaching -> maxAge-two-----end-----');
            }
        });
    });
    // noCache
    describe('RequestCachingNoCacheTestHttps', () => {
        beforeAll(async () => {
            let caPem = "noPassword/ca.pem";
            let context = GlobalContext.getContext().getValue("testcontt") as Context;
            let hereCacheDir = context.cacheDir;
            let cache = new Cache.Cache(hereCacheDir, 10 * 1024 * 1024, context);
            httpClientForHttps = new HttpClient
                .Builder()
                .dns(new CustomDnsForHttps())
                .cache(cache)
                .setConnectTimeout(10000, TimeUnit.SECONDS)
                .setReadTimeout(10000, TimeUnit.SECONDS)
                .build();
            caFile = await new GetCAUtils().getCA(caPem, context);
        });
        /**
         * noCache执行用例
         * 每次执行都走网络查询
         */
        // 执行第一次
        it('noCache0_execute_https', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/no/cache')
                .addHeader("Cache-Control", "no-cache")
                .ca([caFile])
                .build();
            let result: Response = await httpClientForHttps
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> noCache-one-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(200);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> noCache-one-----end-----');
            }
        });
        // 执行第二次
        it('noCache1_execute_https', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/no/cache')
                .addHeader("Cache-Control", "no-cache")
                .ca([caFile])
                .build();
            let result: Response = await httpClientForHttps
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> noCache-two-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(200);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> noCache-two-----end-----');
            }
        });
    });
    // forceNetwork
    describe('RequestCachingForceNetworkTestHttps', () => {
        beforeAll(async () => {
            let caPem = "noPassword/ca.pem";
            let context = GlobalContext.getContext().getValue("testcontt") as Context;
            let hereCacheDir = context.cacheDir;
            let cache = new Cache.Cache(hereCacheDir, 10 * 1024 * 1024, context);
            httpClientForHttps = new HttpClient
                .Builder()
                .dns(new CustomDnsForHttps())
                .cache(cache)
                .setConnectTimeout(10000, TimeUnit.SECONDS)
                .setReadTimeout(10000, TimeUnit.SECONDS)
                .build();
            caFile = await new GetCAUtils().getCA(caPem, context);
        });
        /**
         * forceNetwork执行用例
         * 每次执行都走网络查询
         */
        // 执行第一次
        it('forceNetwork0_execute_https', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/max/age')
                .cacheControl(CacheControl.FORCE_NETWORK())
                .ca([caFile])
                .build();
            let result: Response = await httpClientForHttps
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> forceNetwork-one-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(200);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> forceNetwork-one-----end-----');
            }
        });
        // 执行第二次
        it('forceNetwork1_execute_https', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/max/age')
                .cacheControl(CacheControl.FORCE_NETWORK())
                .ca([caFile])
                .build();
            let result: Response = await httpClientForHttps
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> forceNetwork-two-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(200);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> forceNetwork-two-----end-----');
            }
        });
    });
    // forceCache
    describe('RequestCachingForceCacheTestHttp', () => {
        beforeAll(async () => {
            let context = GlobalContext.getContext().getValue("testcontt") as Context;
            let hereCacheDir = context.cacheDir;
            let cache = new Cache.Cache(hereCacheDir, 10 * 1024 * 1024, context);
            httpClientForHttp = new HttpClient
                .Builder()
                .dns(new CustomDnsForHttp())
                .cache(cache)
                .setConnectTimeout(10000, TimeUnit.SECONDS)
                .setReadTimeout(10000, TimeUnit.SECONDS)
                .build();
        });
        /**
         * 以maxAge为例
         * forceCache执行用例
         * 执行第一次网络查询
         * 后面走缓存
         */
        // 第一次执行
        it('forceCache0_execute_http', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('http://1.94.37.200:7070/cache/max/age')
                .cacheControl(CacheControl.FORCE_CACHE())
                .build();
            let result: Response = await httpClientForHttp
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> forceCache-one-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(200);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> forceCache-one-----end-----');
            }
        });
        // 第二次执行
        it('forceCache1_execute_http', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('http://1.94.37.200:7070/cache/max/age')
                .cacheControl(CacheControl.FORCE_CACHE())
                .build();
            let result: Response = await httpClientForHttp
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> forceCache-two-----start-----');
                expect(result.getNetWorkResponse()).assertEqual(undefined);
                expect(result.getCacheResponse().responseCode).assertEqual(200);
                Logger.info('RequestCaching -> forceCache-two-----end-----');
            }
        });
    });
    // etag
    describe('RequestCachingEtagTestHttp', () => {
        beforeAll(async () => {
            let context = GlobalContext.getContext().getValue("testcontt") as Context;
            let hereCacheDir = context.cacheDir;
            let cache = new Cache.Cache(hereCacheDir, 10 * 1024 * 1024, context);
            httpClientForHttp = new HttpClient
                .Builder()
                .dns(new CustomDnsForHttp())
                .cache(cache)
                .setConnectTimeout(10000, TimeUnit.SECONDS)
                .setReadTimeout(10000, TimeUnit.SECONDS)
                .build();
        });
        /**
         * e/tag执行用例
         * 执行第一次网络查询
         * 执行第二次返回304，走缓存
         * 改变etag值
         * 执行第三次网络查询
         * 执行第四次返回304，走缓存
         */
        // etag执行第一次，网络查询
        it('etag0_execute_http', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('http://1.94.37.200:7070/cache/e/tag')
                .build();
            let result: Response = await httpClientForHttp
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (request) {
                Logger.info('RequestCaching -> etag-one-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(200);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> etag-one-----end-----');
            }
        });
        // etag执行第二次，走缓存
        it('etag1_execute_http', 0, async () => {
            // etag执行第二次
            let request: Request = new Request.Builder()
                .get()
                .url('http://1.94.37.200:7070/cache/e/tag')
                .build();
            let result: Response = await httpClientForHttp
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                // 第二次返回304，走缓存
                Logger.info('RequestCaching -> etag-two-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(304);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> etag-two-----end-----');
            }
        });
        // 改变etag的值
        it('etag2_execute_http', 0, async () => {
            // 改变etag值
            let request: Request = new Request.Builder()
                .get()
                .url('http://1.94.37.200:7070/cache/e/tag/change')
                .build();
            await httpClientForHttp
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
        });
        // 第三次查询etag，走网络
        it('etag3_execute_http', 0, async () => {
            // etag执行第三次
            let request: Request = new Request.Builder()
                .get()
                .url('http://1.94.37.200:7070/cache/e/tag')
                .build();
            let result: Response = await httpClientForHttp
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> etag-three-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(200);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> etag-three-----end-----');
            }
        });
        // 第四次查询etag，走缓存
        it('etag4_execute_http', 0, async () => {
            // etag执行第四次
            let request: Request = new Request.Builder()
                .get()
                .url('http://1.94.37.200:7070/cache/e/tag')
                .build();
            let result: Response = await httpClientForHttp
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                // 第四次次返回304，走缓存
                Logger.info('RequestCaching -> etag-four-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(304);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> etag-four-----end-----');
            }
        });
    });
    // expires
    describe('RequestCachingExpiresTestHttp', () => {
        beforeAll(async () => {
            let context = GlobalContext.getContext().getValue("testcontt") as Context;
            let hereCacheDir = context.cacheDir;
            let cache = new Cache.Cache(hereCacheDir, 10 * 1024 * 1024, context);
            httpClientForHttp = new HttpClient
                .Builder()
                .dns(new CustomDnsForHttp())
                .cache(cache)
                .setConnectTimeout(10000, TimeUnit.SECONDS)
                .setReadTimeout(10000, TimeUnit.SECONDS)
                .build();
        });
        /**
         * expires执行用例
         * 执行第一次网络查询
         * 执行第二次走缓存
         * 等待7s之后，缓存失效
         * 执行第三次走网络查询
         * 执行第四次走网络查询
         */
        // expires执行第一次，走网络
        it('expires0_execute_http', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('http://1.94.37.200:7070/cache/expires')
                .build();
            let result: Response = await httpClientForHttp
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> expires-one-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(200);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> expires-one-----end-----');
            }
        });
        // expires执行第二次, 走缓存
        it('expires1_execute_http', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('http://1.94.37.200:7070/cache/expires')
                .build();
            let result: Response = await httpClientForHttp
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> expires-two-----start-----');
                expect(result.getNetWorkResponse()).assertEqual(undefined);
                expect(result.getCacheResponse().responseCode).assertEqual(200);
                Logger.info('RequestCaching -> expires-two-----end-----');
            }
        });
        // 延迟7s
        it('expires2_execute_https', 0, async () => {
            let nowTime = (new Date()).getTime();
            let endTime = (new Date()).getTime();
            while (endTime - nowTime < 7000) {
                endTime = (new Date()).getTime();
            }
        });
        // 执行第三次，走网络
        it('expires3_execute_http', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('http://1.94.37.200:7070/cache/expires')
                .build();
            let result: Response = await httpClientForHttp
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> expires-three-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(200);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> expires-three-----end-----');
            }
        });
        // 执行第四次，走缓存
        it('expires4_execute_http', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('http://1.94.37.200:7070/cache/expires')
                .build();
            let result: Response = await httpClientForHttp
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> expires-four-----start-----');
                expect(result.getNetWorkResponse()).assertEqual(undefined);
                expect(result.getCacheResponse().responseCode).assertEqual(200);
                Logger.info('RequestCaching -> expires-four-----end-----');
            }
        });
    });
    // immutable
    describe('RequestCachingImmutableTestHttp', () => {
        beforeAll(async () => {
            let context = GlobalContext.getContext().getValue("testcontt") as Context;
            let hereCacheDir = context.cacheDir;
            let cache = new Cache.Cache(hereCacheDir, 10 * 1024 * 1024, context);
            httpClientForHttp = new HttpClient
                .Builder()
                .dns(new CustomDnsForHttp())
                .cache(cache)
                .setConnectTimeout(10000, TimeUnit.SECONDS)
                .setReadTimeout(10000, TimeUnit.SECONDS)
                .build();
        });
        /**
         * immutable执行用例
         * 执行第一次网络查询
         * 后面执行走缓存
         */
        // immutable执行第一次，网络查询
        it('immutable0_execute_http', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('http://1.94.37.200:7070/cache/immutable')
                .build();
            let result: Response = await httpClientForHttp
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> immutable-one-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(200);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> immutable-one-----end-----');
            }
        });
        // immutable执行第二次，缓存
        it('immutable2_execute_http', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('http://1.94.37.200:7070/cache/immutable')
                .build();
            let result: Response = await httpClientForHttp
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> immutable-two-----start-----');
                expect(result.getNetWorkResponse()).assertEqual(undefined);
                expect(result.getCacheResponse().responseCode).assertEqual(200);
                Logger.info('RequestCaching -> immutable-two-----end-----');
            }
        });
    });
    // lastModified
    describe('RequestCachingLastModifiedTestHttp', () => {
        beforeAll(async () => {
            let context = GlobalContext.getContext().getValue("testcontt") as Context;
            let hereCacheDir = context.cacheDir;
            let cache = new Cache.Cache(hereCacheDir, 10 * 1024 * 1024, context);
            httpClientForHttp = new HttpClient
                .Builder()
                .dns(new CustomDnsForHttp())
                .cache(cache)
                .setConnectTimeout(10000, TimeUnit.SECONDS)
                .setReadTimeout(10000, TimeUnit.SECONDS)
                .build();
        });
        /**
         * lastModified执行用例
         * 执行第一次网络查询
         * 执行第二次走缓存
         * 修改，改变last_modified值
         * 执行第三次网络查询
         * 执行第四次走缓存
         */
        // lastModified执行第一次，网络查询
        it('lastModified0_execute_http', 0, async () => {
            // lastModified执行第一次
            let request: Request = new Request.Builder()
                .get()
                .url('http://1.94.37.200:7070/cache/last/modified')
                .build();
            let result: Response = await httpClientForHttp
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (request) {
                Logger.info('RequestCaching -> lastModified-one-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(200);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> lastModified-one-----end-----');
            }
        });
        // lastModified执行第二次，缓存
        it('lastModified1_execute_http', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('http://1.94.37.200:7070/cache/last/modified')
                .build();
            let result: Response = await httpClientForHttp
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> lastModified-two-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(304);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> lastModified-two-----end-----');
            }
        });
        // 修改lastModified的值
        it('lastModified2_execute_http', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('http://1.94.37.200:7070/cache/last/modified/change')
                .build();
            await httpClientForHttp
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
        });
        // lastModified执行第三次，网络
        it('lastModified3_execute_http', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('http://1.94.37.200:7070/cache/last/modified')
                .build();
            let result: Response = await httpClientForHttp
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> lastModified-three-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(200);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> lastModified-three-----end-----');
            }
        });
        // lastModified执行第四次，缓存
        it('lastModified4_execute_http', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('http://1.94.37.200:7070/cache/last/modified')
                .build();
            let result: Response = await httpClientForHttp
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> lastModified-four-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(304);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> lastModified-four-----end-----');
            }
        });
    });
    // maxAge
    describe('RequestCachingMaxAgeTestHttp', () => {
        beforeAll(async () => {
            let context = GlobalContext.getContext().getValue("testcontt") as Context;
            let hereCacheDir = context.cacheDir;
            let cache = new Cache.Cache(hereCacheDir, 10 * 1024 * 1024, context);
            httpClientForHttp = new HttpClient
                .Builder()
                .dns(new CustomDnsForHttp())
                .cache(cache)
                .setConnectTimeout(10000, TimeUnit.SECONDS)
                .setReadTimeout(10000, TimeUnit.SECONDS)
                .build();
        });
        /**
         * maxAge执行用例
         * 执行第一次网络查询
         * 执行第二次走缓存
         */
        // maxAge第一次执行，网络
        it('maxAge0_execute_http', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('http://1.94.37.200:7070/cache/max/age')
                .addHeader("Cache-Control", "max-age=3")
                .build();
            let result: Response = await httpClientForHttp
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> maxAge-one-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(200);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> maxAge-one-----end-----');
            }
        });
        // maxAge第二次执行，缓存
        it('maxAge1_execute_http', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('http://1.94.37.200:7070/cache/max/age')
                .addHeader("Cache-Control", "max-age=3")
                .build();
            let result: Response = await httpClientForHttp
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> maxAge-two-----start-----');
                expect(result.getNetWorkResponse()).assertEqual(undefined);
                expect(result.getCacheResponse().responseCode).assertEqual(200);
                Logger.info('RequestCaching -> maxAge-two-----end-----');
            }
        });
    });
    // noCache
    describe('RequestCachingNoCacheTestHttp', () => {
        beforeAll(async () => {
            let context = GlobalContext.getContext().getValue("testcontt") as Context;
            let hereCacheDir = context.cacheDir;
            let cache = new Cache.Cache(hereCacheDir, 10 * 1024 * 1024, context);
            httpClientForHttp = new HttpClient
                .Builder()
                .dns(new CustomDnsForHttp())
                .cache(cache)
                .setConnectTimeout(10000, TimeUnit.SECONDS)
                .setReadTimeout(10000, TimeUnit.SECONDS)
                .build();
        });
        /**
         * noCache执行用例
         * 每次执行都走网络查询
         */
        // 执行第一次
        it('noCache0_execute_http', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('http://1.94.37.200:7070/cache/no/cache')
                .addHeader("Cache-Control", "no-cache")
                .build();
            let result: Response = await httpClientForHttp
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> noCache-one-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(200);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> noCache-one-----end-----');
            }
        });
        // 执行第二次
        it('noCache1_execute_http', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('http://1.94.37.200:7070/cache/no/cache')
                .addHeader("Cache-Control", "no-cache")
                .build();
            let result: Response = await httpClientForHttp
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (request) {
                Logger.info('RequestCaching -> noCache-two-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(200);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> noCache-two-----end-----');
            }
        });
    });
    // forceNetwork
    describe('RequestCachingForceNetworkTestHttp', () => {
        beforeAll(async () => {
            let context = GlobalContext.getContext().getValue("testcontt") as Context;
            let hereCacheDir = context.cacheDir;
            let cache = new Cache.Cache(hereCacheDir, 10 * 1024 * 1024, context);
            httpClientForHttp = new HttpClient
                .Builder()
                .dns(new CustomDnsForHttp())
                .cache(cache)
                .setConnectTimeout(10000, TimeUnit.SECONDS)
                .setReadTimeout(10000, TimeUnit.SECONDS)
                .build();
        });
        /**
         * forceNetwork执行用例
         * 每次执行都走网络查询
         */
        // 执行第一次
        it('forceNetwork0_execute_http', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('http://1.94.37.200:7070/cache/max/age')
                .cacheControl(CacheControl.FORCE_NETWORK())
                .build();
            let result: Response = await httpClientForHttp
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (result) {
                Logger.info('RequestCaching -> forceNetwork-one-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(200);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> forceNetwork-one-----end-----');
            }
        });
        // 执行第二次
        it('forceNetwork1_execute_http', 0, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('http://1.94.37.200:7070/cache/max/age')
                .cacheControl(CacheControl.FORCE_NETWORK())
                .build();
            let result: Response = await httpClientForHttp
                .newCall(request)
                .checkCertificate(new SslCertificateManager())
                .execute();
            if (request) {
                Logger.info('RequestCaching -> forceNetwork-two-----start-----');
                expect(result.getNetWorkResponse().responseCode).assertEqual(200);
                expect(result.responseCode).assertEqual(200);
                Logger.info('RequestCaching -> forceNetwork-two-----end-----');
            }
        });
    });
    // forceCache
    describe('RequestCachingForceCacheTestHttpsPerformance', () => {
        beforeAll(async () => {
            let caPem = "noPassword/ca.pem";
            let context = GlobalContext.getContext().getValue("testcontt") as Context;
            let hereCacheDir = context.cacheDir;
            let cache = new Cache.Cache(hereCacheDir, 10 * 1024 * 1024, context);
            httpClientForHttps = new HttpClient
                .Builder()
                .dns(new CustomDnsForHttps())
                .cache(cache)
                .setConnectTimeout(10000, TimeUnit.SECONDS)
                .setReadTimeout(10000, TimeUnit.SECONDS)
                .build();
            caFile = await new GetCAUtils().getCA(caPem, context);
        });
        it('forceCache0_execute_https_performance', TestType.PERFORMANCE, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/max/age')
                .cacheControl(CacheControl.FORCE_CACHE())
                .ca([caFile])
                .build();
            await execute(httpClientForHttps, request, 0, 'forceCache');
        });
    });
    // etag
    describe('RequestCachingEtagTestHttpsPerformance', () => {
        beforeAll(async () => {
            let caPem = "noPassword/ca.pem";
            let context = GlobalContext.getContext().getValue("testcontt") as Context;
            let hereCacheDir = context.cacheDir;
            let cache = new Cache.Cache(hereCacheDir, 10 * 1024 * 1024, context);
            httpClientForHttps = new HttpClient
                .Builder()
                .dns(new CustomDnsForHttps())
                .cache(cache)
                .setConnectTimeout(10000, TimeUnit.SECONDS)
                .setReadTimeout(10000, TimeUnit.SECONDS)
                .build();
            caFile = await new GetCAUtils().getCA(caPem, context);
        });
        it('etag0_execute_https_performance', TestType.PERFORMANCE, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/e/tag')
                .ca([caFile])
                .build();
            await execute(httpClientForHttps, request, 0, 'etag');
        });
    });
    // expires
    describe('RequestCachingExpiresTestHttpsPerformance', () => {
        beforeAll(async () => {
            let caPem = "noPassword/ca.pem";
            let context = GlobalContext.getContext().getValue("testcontt") as Context;
            let hereCacheDir = context.cacheDir;
            let cache = new Cache.Cache(hereCacheDir, 10 * 1024 * 1024, context);
            httpClientForHttps = new HttpClient
                .Builder()
                .dns(new CustomDnsForHttps())
                .cache(cache)
                .setConnectTimeout(10000, TimeUnit.SECONDS)
                .setReadTimeout(10000, TimeUnit.SECONDS)
                .build();
            caFile = await new GetCAUtils().getCA(caPem, context);
        });
        it('expires0_execute_https_performance', TestType.PERFORMANCE, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/expires')
                .ca([caFile])
                .build();
            await execute(httpClientForHttps, request, 0, 'expires');
        });
    });
    // immutable
    describe('RequestCachingImmutableTestHttpsPerformance', () => {
        beforeAll(async () => {
            let caPem = "noPassword/ca.pem";
            let context = GlobalContext.getContext().getValue("testcontt") as Context;
            let hereCacheDir = context.cacheDir;
            let cache = new Cache.Cache(hereCacheDir, 10 * 1024 * 1024, context);
            httpClientForHttps = new HttpClient
                .Builder()
                .dns(new CustomDnsForHttps())
                .cache(cache)
                .setConnectTimeout(10000, TimeUnit.SECONDS)
                .setReadTimeout(10000, TimeUnit.SECONDS)
                .build();
            caFile = await new GetCAUtils().getCA(caPem, context);
        });
        it('immutable0_execute_https_performance', TestType.PERFORMANCE, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/immutable')
                .ca([caFile])
                .build();
            await execute(httpClientForHttps, request, 0, 'immutable');
        });
    });
    // lastModified
    describe('RequestCachingLastModifiedTestHttpsPerformance', () => {
        beforeAll(async () => {
            let caPem = "noPassword/ca.pem";
            let context = GlobalContext.getContext().getValue("testcontt") as Context;
            let hereCacheDir = context.cacheDir;
            let cache = new Cache.Cache(hereCacheDir, 10 * 1024 * 1024, context);
            httpClientForHttps = new HttpClient
                .Builder()
                .dns(new CustomDnsForHttps())
                .cache(cache)
                .setConnectTimeout(10000, TimeUnit.SECONDS)
                .setReadTimeout(10000, TimeUnit.SECONDS)
                .build();
            caFile = await new GetCAUtils().getCA(caPem, context);
        });
        it('lastModified0_execute_https_performance', TestType.PERFORMANCE, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/last/modified')
                .ca([caFile])
                .build();
            await execute(httpClientForHttps, request, 0, 'lastModified');
        });
    });
    // maxAge
    describe('RequestCachingMaxAgeTestHttpsPerformance', () => {
        beforeAll(async () => {
            let caPem = "noPassword/ca.pem";
            let context = GlobalContext.getContext().getValue("testcontt") as Context;
            let hereCacheDir = context.cacheDir;
            let cache = new Cache.Cache(hereCacheDir, 10 * 1024 * 1024, context);
            httpClientForHttps = new HttpClient
                .Builder()
                .dns(new CustomDnsForHttps())
                .cache(cache)
                .setConnectTimeout(10000, TimeUnit.SECONDS)
                .setReadTimeout(10000, TimeUnit.SECONDS)
                .build();
            caFile = await new GetCAUtils().getCA(caPem, context);
        });
        it('maxAge0_execute_https_performance', TestType.PERFORMANCE, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/max/age')
                .addHeader("Cache-Control", "max-age=3")
                .ca([caFile])
                .build();
            await execute(httpClientForHttps, request, 0, 'maxAge');
        });
    });
    // noCache
    describe('RequestCachingNoCacheTestHttpsPerformance', () => {
        beforeAll(async () => {
            let caPem = "noPassword/ca.pem";
            let context = GlobalContext.getContext().getValue("testcontt") as Context;
            let hereCacheDir = context.cacheDir;
            let cache = new Cache.Cache(hereCacheDir, 10 * 1024 * 1024, context);
            httpClientForHttps = new HttpClient
                .Builder()
                .dns(new CustomDnsForHttps())
                .cache(cache)
                .setConnectTimeout(10000, TimeUnit.SECONDS)
                .setReadTimeout(10000, TimeUnit.SECONDS)
                .build();
            caFile = await new GetCAUtils().getCA(caPem, context);
        });
        it('noCache0_execute_https_performance', TestType.PERFORMANCE, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/no/cache')
                .addHeader("Cache-Control", "no-cache")
                .ca([caFile])
                .build();
            await execute(httpClientForHttps, request, 0, 'noCache');
        });
    });
    // forceNetwork
    describe('RequestCachingForceNetworkTestHttpsPerformance', () => {
        beforeAll(async () => {
            let caPem = "noPassword/ca.pem";
            let context = GlobalContext.getContext().getValue("testcontt") as Context;
            let hereCacheDir = context.cacheDir;
            let cache = new Cache.Cache(hereCacheDir, 10 * 1024 * 1024, context);
            httpClientForHttps = new HttpClient
                .Builder()
                .dns(new CustomDnsForHttps())
                .cache(cache)
                .setConnectTimeout(10000, TimeUnit.SECONDS)
                .setReadTimeout(10000, TimeUnit.SECONDS)
                .build();
            caFile = await new GetCAUtils().getCA(caPem, context);
        });
        it('forceNetwork0_execute_https_performance', TestType.PERFORMANCE, async () => {
            let request: Request = new Request.Builder()
                .get()
                .url('https://1.94.37.200:8080/cache/max/age')
                .cacheControl(CacheControl.FORCE_NETWORK())
                .ca([caFile])
                .build();
            await execute(httpClientForHttps, request, 0, 'forceNetwork');
        });
    });
}
export class CustomDnsForHttps implements Dns {
    async lookup(hostname: string): Promise<Array<connection.NetAddress>> {
        console.info('DNSTEST CustomDns begin here');
        return await new Promise((resolve, reject) => {
            let netAddress: Array<connection.NetAddress> = [{ 'address': '1.94.37.200', 'family': 1, 'port': 8080 }];
            resolve(netAddress);
        });
    }
}
export class CustomDnsForHttp implements Dns {
    async lookup(hostname: string): Promise<Array<connection.NetAddress>> {
        console.info('DNSTEST CustomDns begin here');
        return await new Promise((resolve, reject) => {
            let netAddress: Array<connection.NetAddress> = [{ 'address': '1.94.37.200', 'family': 1, 'port': 7070 }];
            resolve(netAddress);
        });
    }
}
export class SslCertificateManager implements X509TrustManager {
    // 校验服务器证书
    checkServerTrusted(X509Certificate: certFramework.X509Cert): void {
        Logger.info(TAG, 'Get Server Trusted X509Certificate');
        // 时间校验成功的设置值
        let currentDayTime = StringUtil.getCurrentDayTime();
        let date = currentDayTime + 'Z';
        try {
            X509Certificate.checkValidityWithDate(date); // 检查X509证书有效期
            console.error('checkValidityWithDate success');
        }
        catch (error) {
            console.error('checkValidityWithDate failed, errCode: ' + error.code + ', errMsg: ' + error.message);
            error.message = 'checkValidityWithDate failed, errCode: ' + error.code + ', errMsg: ' + error.message;
            throw new Error(error);
        }
    }
    // 校验客户端证书
    checkClientTrusted(X509Certificate: certFramework.X509Cert): void {
        Logger.info(TAG, 'Get Client Trusted X509Certificate');
        let encoded = X509Certificate.getEncoded(); // 获取X509证书序列化数据
        Logger.info(TAG, 'encoded: ', JSON.stringify(encoded));
        let publicKey = X509Certificate.getPublicKey(); // 获取X509证书公钥
        Logger.info(TAG, 'publicKey: ', JSON.stringify(publicKey));
        let version = X509Certificate.getVersion(); // 获取X509证书版本
        Logger.info(TAG, 'version: ', JSON.stringify(version));
        let serialNumber = X509Certificate.getCertSerialNumber(); //获取X509证书序列号
        Logger.info(TAG, 'serialNumber: ', serialNumber);
        let issuerName = X509Certificate.getIssuerName(); // 获取X509证书颁发者名称
        Logger.info(TAG, 'issuerName: ', Utils.uint8ArrayToString(issuerName.data));
        let subjectName = X509Certificate.getSubjectName(); // 获取X509证书主体名称
        Logger.info(TAG, 'subjectName: ', Utils.uint8ArrayToString(subjectName.data));
        let notBeforeTime = X509Certificate.getNotBeforeTime(); // 获取X509证书有效期起始时间
        Logger.info(TAG, 'notBeforeTime: ', notBeforeTime);
        let notAfterTime = X509Certificate.getNotAfterTime(); // 获取X509证书有效期截止时间
        Logger.info(TAG, 'notAfterTime: ', notAfterTime);
        let signature = X509Certificate.getSignature(); // 获取X509证书签名数据
        Logger.info(TAG, 'signature: ', Utils.uint8ArrayToString(signature.data));
        let signatureAlgName = X509Certificate.getSignatureAlgName(); // 获取X509证书签名算法名称
        Logger.info(TAG, 'signatureAlgName: ', signatureAlgName);
        let signatureAlgOid = X509Certificate.getSignatureAlgOid(); // 获取X509证书签名算法的对象标志符OID(Object Identifier)
        Logger.info(TAG, 'signatureAlgOid: ', signatureAlgOid);
        let signatureAlgParams = X509Certificate.getSignatureAlgParams(); // 获取X509证书签名算法参数
        Logger.info(TAG, 'signatureAlgParams: ', Utils.uint8ArrayToString(signatureAlgParams.data));
        let keyUsage = X509Certificate.getKeyUsage(); // 获取X509证书秘钥用途
        Logger.info(TAG, 'keyUsage: ', Utils.uint8ArrayToString(keyUsage.data));
        let extKeyUsage = X509Certificate.getExtKeyUsage(); //获取X509证书扩展秘钥用途
        Logger.info(TAG, 'extKeyUsage: ', JSON.stringify(extKeyUsage));
        let basicConstraints = X509Certificate.getBasicConstraints(); // 获取X509证书基本约束
        Logger.info(TAG, 'basicConstraints: ', JSON.stringify(basicConstraints));
        let subjectAltNames = X509Certificate.getSubjectAltNames(); // 获取X509证书主体可选名称
        Logger.info(TAG, 'subjectAltNames: ', JSON.stringify(subjectAltNames));
        let issuerAltNames = X509Certificate.getIssuerAltNames(); // 获取X509证书颁发者可选名称
        Logger.info(TAG, 'issuerAltNames: ', JSON.stringify(issuerAltNames));
        let tbs = X509Certificate.getItem(certFramework.CertItemType.CERT_ITEM_TYPE_TBS).data; // 获取X509证书TBS(to be signed)
        Logger.info(TAG, 'tbs: ', base64.fromByteArray(tbs));
        let pubKey = X509Certificate.getItem(certFramework.CertItemType.CERT_ITEM_TYPE_PUBLIC_KEY); // 获取X509证书公钥.
        Logger.info(TAG, 'pubKey: ', base64.fromByteArray(pubKey.data));
        let extensions = X509Certificate.getItem(certFramework.CertItemType.CERT_ITEM_TYPE_EXTENSIONS).data;
        Logger.info(TAG, 'extensions: ', base64.fromByteArray(extensions));
    }
}
