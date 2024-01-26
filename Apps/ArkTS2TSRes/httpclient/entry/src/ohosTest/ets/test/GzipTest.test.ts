let __generate__Id: number = 0;
function generateId(): string {
    return "GzipTest.test_" + ++__generate__Id;
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
import { HttpClient, Logger, Request, RequestBody, Response } from '@ohos/httpclient';
import { BusinessError } from '@ohos.base';
export default function GzipTest() {
    let requestTestOne: Request;
    let requestTestTwo: Request;
    let requestBody: RequestBody;
    describe('GzipTest', () => {
        beforeAll((done: Function) => {
            let URL: string = 'https://1.94.37.200:7070/gzip';
            requestBody = RequestBody.create('your data');
            requestTestOne = new Request.Builder()
                .url(URL + '/getGzipData')
                .get()
                .build();
            requestTestTwo = new Request.Builder()
                .url(URL + '/compressedRequest')
                .post(requestBody)
                .addHeader('Accept-Encoding', 'gzip')
                .addHeader('Content-Type', 'application/octet-stream')
                .build();
            done();
        });
        it('unGzipRespNotNull', 0, () => {
            let httpClient = new HttpClient.Builder().setConnectTimeout(10000).build();
            httpClient.newCall(requestTestOne).enqueue((result: Response) => {
                expect(result.result).assertNull();
                expect(result.result).assertContain('This the data to be compressed');
            }, (error: BusinessError) => {
                Logger.info('Request Error!');
            });
        });
        it('gzipRespNotNull', 0, () => {
            let httpClient = new HttpClient.Builder().setConnectTimeout(10000).build();
            httpClient.newCall(requestTestTwo).enqueue((result: Response) => {
                expect(result.result).assertNull();
                expect(result.result).assertContain('成功，是Gzip压缩数据');
            }, (error: BusinessError) => {
                Logger.info('Request Error!');
            });
        });
    });
}
