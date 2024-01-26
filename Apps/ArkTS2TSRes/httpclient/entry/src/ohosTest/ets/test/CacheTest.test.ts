let __generate__Id: number = 0;
function generateId(): string {
    return "CacheTest.test_" + ++__generate__Id;
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
import httpclient, { Cache, HttpClient, NetAuthenticator, Request, Response } from '@ohos/httpclient';
import { GlobalContext } from '../testability/GlobalContext';
import hilog from '@ohos.hilog';
function LOG_SHOW_INFO(value: string) {
    const TAG: string = "[XTS_CacheTest]";
    hilog.info(0x0000, TAG, '%{public}s', value);
}
export default function CacheTest() {
    let CacheClient: HttpClient;
    let cacheObject: Cache.Cache;
    let hereCacheDir: string;
    let context: Context;
    describe('CacheTest', () => {
        beforeAll((done: Function) => {
            context = GlobalContext.getContext().getValue("testcontt") as Context;
            hereCacheDir = context.cacheDir;
            LOG_SHOW_INFO(" context : " + hereCacheDir);
            done();
        });
        it('showCacheKeyValue', 0, () => {
            cacheObject = new httpclient.Cache.Cache(hereCacheDir, 1024 * 1, context);
            let standardKey = "4b217e04ba52215f3a6b64d28f6729c6";
            let md5Key = cacheObject.key("http://publicobject.com/helloworld.txt");
            LOG_SHOW_INFO("md5Key : " + md5Key);
            expect(standardKey).assertContain(md5Key);
        });
        it('showCacheSizeValue', 0, () => {
            cacheObject = new httpclient.Cache.Cache(hereCacheDir, 1024 * 1, context);
            let size = cacheObject.size();
            expect(0).assertEqual(size);
        });
        it('showCacheMaxSizeValue', 0, () => {
            cacheObject = new httpclient.Cache.Cache(hereCacheDir, 1024 * 1, context);
            let maxsize = cacheObject.maxSize();
            expect(1024).assertEqual(maxsize);
        });
        it('showCacheDirectoryValue', 0, () => {
            cacheObject = new httpclient.Cache.Cache(hereCacheDir, 1024 * 1, context);
            let path = cacheObject.directory();
            expect("/data/storage/el2/base/haps/entry_test/cache").assertEqual(path);
        });
        it('showCacheGetMethodValue', 0, async () => {
            cacheObject = new httpclient.Cache.Cache(hereCacheDir, 1024 * 1, context);
            CacheClient = new httpclient.HttpClient.Builder().cache(cacheObject).setConnectTimeout(10000).build();
            let request1 = new httpclient.Request.Builder()
                .get()
                .url('http://publicobject.com/helloworld.txt')
                .build();
            await CacheClient.newCall(request1).execute().then((result) => {
                setTimeout(() => {
                    expect("\\  .ooo.  //").assertContain(cacheObject.get(request1).getBody());
                }, 4000);
            });
        });
        it('showCacheCallRemoveMethodValue', 0, async () => {
            cacheObject = new httpclient.Cache.Cache(hereCacheDir, 1024 * 1, context);
            CacheClient = new httpclient.HttpClient.Builder().cache(cacheObject).setConnectTimeout(10000).build();
            let request1 = new httpclient.Request.Builder()
                .get()
                .url('http://publicobject.com/helloworld.txt')
                .build();
            await CacheClient.newCall(request1).execute().then((result) => {
                setTimeout(() => {
                    cacheObject.remove(request1);
                }, 2000);
                setTimeout(() => {
                    expect(cacheObject.get(request1).getBody()).assertNull();
                }, 4000);
            });
        });
        it('showCacheCallDeleteMethodValue', 0, async () => {
            cacheObject = new httpclient.Cache.Cache(hereCacheDir, 1024 * 1, context);
            CacheClient = new httpclient.HttpClient.Builder().cache(cacheObject).setConnectTimeout(10000).build();
            let request1 = new httpclient.Request.Builder()
                .get()
                .url('http://publicobject.com/helloworld.txt')
                .build();
            await CacheClient.newCall(request1).execute().then((result) => {
                setTimeout(() => {
                    cacheObject.delete();
                }, 2000);
                setTimeout(() => {
                    expect(cacheObject.get(request1).getBody()).assertNull();
                }, 4000);
            });
        });
        it('showCacheCallUpdateMethodValue', 0, async () => {
            let oldResponse: Response;
            let newResponse: Response;
            cacheObject = new httpclient.Cache.Cache(hereCacheDir, 1024 * 1, context);
            CacheClient = new httpclient.HttpClient.Builder().cache(cacheObject).setConnectTimeout(10000).build();
            let request = new httpclient.Request.Builder()
                .get()
                .url('http://hshapp.ncn.com.cn/wisdom3/config/config.do')
                .build();
            await CacheClient.newCall(request).execute().then((data) => {
                oldResponse = data;
                oldResponse.setBody("AAAAAA");
                newResponse = oldResponse;
                cacheObject.update(oldResponse, newResponse);
                expect(cacheObject.get(request).getBody()).assertEqual("AAAAAA");
            });
        });
    });
}
