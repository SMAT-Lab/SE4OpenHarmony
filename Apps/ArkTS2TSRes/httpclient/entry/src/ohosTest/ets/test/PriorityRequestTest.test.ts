let __generate__Id: number = 0;
function generateId(): string {
    return "PriorityRequestTest.test_" + ++__generate__Id;
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
import { HttpClient, Logger, Request, Response, TimeUnit } from '@ohos/httpclient';
import { BusinessError } from '@ohos.base';
export default function PriorityQueueTest() {
    let client: HttpClient;
    const HTTP_COUNT = 1000;
    const HTTP_ENQUEUE_COUNT = 10;
    const HTTP_BASELINE = 4000;
    describe('PriorityQueueTest', () => {
        beforeAll((done: Function) => {
            client = new HttpClient.Builder()
                .setConnectTimeout(5, TimeUnit.SECONDS)
                .setReadTimeout(5, TimeUnit.SECONDS)
                .setWriteTimeout(5, TimeUnit.SECONDS)
                .build();
            for (let i = 1; i < 501; i++) {
                let request: Request = new Request.Builder()
                    .url('http://hshapp.ncn.com.cn/wisdom3/config/config.do')
                    .get()
                    .setPriority(0)
                    .build();
                client.newCall(request).enqueue((result: Response) => {
                    Logger.info('request result is ' + result);
                }, (err: BusinessError) => {
                    Logger.info('request error is ' + err);
                });
            }
            done();
        });
        it('createLowerPriorityRequest', 0, () => {
            let request: Request = new Request.Builder()
                .url('http://hshapp.ncn.com.cn/wisdom3/config/config.do')
                .get()
                .setPriority(-1)
                .build();
            client.newCall(request).enqueue((result: Response) => {
                Logger.info('request result is ' + result);
            }, (err: BusinessError) => {
                Logger.info('request error is ' + err);
            });
            expect(request.priority).assertEqual(0);
        });
        it('createPriorityRequest', 0, () => {
            let request: Request = new Request.Builder()
                .url('http://hshapp.ncn.com.cn/wisdom3/config/config.do')
                .get()
                .setPriority(10)
                .build();
            client.newCall(request).enqueue((result: Response) => {
                Logger.info('request result is ' + result);
            }, (err: BusinessError) => {
                Logger.info('request error is ' + err);
            });
            let firstCallPriority: number = client.dispatcher.getFirstReadyCallPriority();
            expect(firstCallPriority).assertEqual(10);
        });
        it('createHigherPriorityRequest', 0, () => {
            let request: Request = new Request.Builder()
                .url('http://hshapp.ncn.com.cn/wisdom3/config/config.do')
                .get()
                .setPriority(1001)
                .build();
            client.newCall(request).enqueue((result: Response) => {
                Logger.info('request result is ' + result);
            }, (err: BusinessError) => {
                Logger.info('request error is ' + err);
            });
            let firstCallPriority: number = client.dispatcher.getFirstReadyCallPriority();
            expect(request.priority).assertEqual(1000);
            expect(firstCallPriority).assertEqual(1000);
        });
        it('enqueuePriorityTest', 0, async (done: Function) => {
            let clientA = new HttpClient.Builder()
                .setConnectTimeout(5, TimeUnit.SECONDS)
                .setReadTimeout(5, TimeUnit.SECONDS)
                .setWriteTimeout(5, TimeUnit.SECONDS)
                .build();
            let request: Request = new Request.Builder()
                .url('http://hshapp.ncn.com.cn/wisdom3/config/config.do')
                .get()
                .setPriority(10)
                .build();
            clientA.dispatcher.setMaxRequestCount(2000);
            let startTime = new Date().getTime();
            Logger.info('PriorityQueueTest enqueueTest startTime ' + startTime);
            let performanceTest: (index: number) => void = async (index) => {
                clientA.newCall(request).enqueue((result: Response) => {
                    if (index < HTTP_ENQUEUE_COUNT) {
                        performanceTest(index + 1);
                    }
                    else {
                        let endTime = new Date().getTime();
                        Logger.info('PriorityQueueTest enqueuePriorityTest endTime ' + endTime);
                        let averageTime = (endTime - startTime) / HTTP_ENQUEUE_COUNT;
                        Logger.info('PriorityQueueTest enqueuePriorityTest averageTime ' + averageTime + "ms");
                        expect(averageTime < HTTP_BASELINE).assertTrue();
                        done();
                    }
                }, (error: BusinessError) => {
                    Logger.info('PriorityQueueTest enqueuePriorityTest error : ' + error.message);
                    expect(error.message).assertEqual('error');
                });
            };
            performanceTest(0);
        });
        it('enqueueTest', 0, (done: Function) => {
            let clientA = new HttpClient.Builder()
                .setConnectTimeout(5, TimeUnit.SECONDS)
                .setReadTimeout(5, TimeUnit.SECONDS)
                .setWriteTimeout(5, TimeUnit.SECONDS)
                .build();
            let request: Request = new Request.Builder()
                .url('http://hshapp.ncn.com.cn/wisdom3/config/config.do')
                .get()
                .build();
            clientA.dispatcher.setMaxRequestCount(2000);
            let startTime = new Date().getTime();
            Logger.info('PriorityQueueTest enqueueTest startTime ' + startTime);
            let performanceTest: (index: number) => void = async (index) => {
                clientA.newCall(request).enqueue((result: Response) => {
                    if (index < HTTP_ENQUEUE_COUNT) {
                        performanceTest(index + 1);
                    }
                    else {
                        let endTime = new Date().getTime();
                        Logger.info('PriorityQueueTest enqueueTest endTime ' + endTime);
                        let averageTime = (endTime - startTime) / HTTP_ENQUEUE_COUNT;
                        Logger.info('PriorityQueueTest enqueueTest averageTime ' + averageTime + "ms");
                        expect(averageTime < HTTP_BASELINE).assertTrue();
                        done();
                    }
                }, (error: BusinessError) => {
                    Logger.info('PriorityQueueTest enqueueTest error : ' + error.message);
                    expect(error.message).assertEqual('error');
                });
            };
            performanceTest(0);
        });
        it('executedPriorityTest', 0, () => {
            let startTime = new Date().getTime();
            Logger.info('PriorityQueueTest enqueueTest startTime ' + startTime);
            for (let i = 0; i < HTTP_COUNT; i++) {
                let request: Request = new Request.Builder()
                    .url('http://hshapp.ncn.com.cn/wisdom3/config/config.do')
                    .get()
                    .setPriority(10)
                    .build();
                client.newCall(request).executed();
            }
            let endTime = new Date().getTime();
            Logger.info('PriorityQueueTest enqueueTest endTime ' + endTime);
            let averageTime = (endTime - startTime) / HTTP_COUNT;
            Logger.info('PriorityQueueTest executedPriorityTest result ' + averageTime + "ms");
            expect(averageTime < HTTP_BASELINE).assertTrue();
        });
        it('executedTest', 0, () => {
            let startTime = new Date().getTime();
            Logger.info('PriorityQueueTest enqueueTest startTime ' + startTime);
            for (let i = 0; i < HTTP_COUNT; i++) {
                let request: Request = new Request.Builder()
                    .url('http://hshapp.ncn.com.cn/wisdom3/config/config.do')
                    .get()
                    .build();
                client.newCall(request).executed();
            }
            let endTime = new Date().getTime();
            Logger.info('PriorityQueueTest enqueueTest endTime ' + endTime);
            let averageTime = (endTime - startTime) / HTTP_COUNT;
            Logger.info('PriorityQueueTest executedTest result ' + averageTime + "ms");
            expect(averageTime < HTTP_BASELINE).assertTrue();
        });
    });
}
