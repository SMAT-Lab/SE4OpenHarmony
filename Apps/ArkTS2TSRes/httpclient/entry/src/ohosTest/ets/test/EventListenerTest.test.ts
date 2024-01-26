let __generate__Id: number = 0;
function generateId(): string {
    return "EventListenerTest.test_" + ++__generate__Id;
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
import { beforeAll, beforeEach, describe, expect, it, TestType } from '@ohos/hypium';
import { EventListener, HttpClient, IOException, Logger, Request, RequestBody, Response, HttpCall } from '@ohos/httpclient';
import { BusinessError } from '@ohos.base';
let eventListenerLists = new Map<string, string>();
export default function EventListenerTest() {
    let requestTestOne: Request;
    let requestTestTwo: Request;
    describe('EventListenerTest', () => {
        beforeAll((done: Function) => {
            let URLOne: string = 'http://jsonplaceholder.typicode.com/posts';
            let URLTwo: string = 'http://sfgdgfd.typicode.com/posts';
            requestTestOne = new Request.Builder().get(URLOne).build();
            requestTestTwo = new Request.Builder().get(URLTwo).build();
            done();
        });
        it('eventListenerGetSuccess', 0, () => {
            let httpClient = new HttpClient.Builder().addEventListener(new HttpEventListener()).build();
            httpClient.newCall(requestTestOne).execute().then((result) => { }).catch((error: BusinessError) => { });
            expect(eventListenerLists.has('callStart')).assertTrue(true);
            setTimeout(() => {
                expect(eventListenerLists.has('requestHeadersStart')).assertTrue(true);
                expect(eventListenerLists.has('requestHeadersEnd')).assertTrue(true);
                expect(eventListenerLists.has('responseHeadersStart')).assertTrue(true);
                expect(eventListenerLists.has('responseBodyStart')).assertTrue(true);
                expect(eventListenerLists.has('responseHeadersEnd')).assertTrue(true);
                expect(eventListenerLists.has('responseBodyEnd')).assertTrue(true);
                expect(eventListenerLists.has('callEnd')).assertTrue(true);
            }, 3000);
        });
        it('eventListenerGetFailed', 0, () => {
            let httpClient = new HttpClient.Builder().addEventListener(new HttpEventListener()).build();
            httpClient.newCall(requestTestTwo).execute().then((result) => { }).catch((error: BusinessError) => { });
            expect(eventListenerLists.has('callStart')).assertTrue(true);
            setTimeout(() => {
                expect(eventListenerLists.has('requestHeadersStart')).assertTrue(true);
                expect(eventListenerLists.has('requestHeadersEnd')).assertTrue(true);
                expect(eventListenerLists.has('responseFailed')).assertTrue(true);
                expect(eventListenerLists.has('callFailed')).assertTrue(true);
            }, 3000);
        });
        it('eventListenerPostSuccess', 0, () => {
            let httpClient = new HttpClient.Builder().addEventListener(new HttpEventListener()).build();
            httpClient.newCall(requestTestOne).execute().then((result) => { }).catch((error: BusinessError) => { });
            expect(eventListenerLists.has('callStart')).assertTrue(true);
            setTimeout(() => {
                expect(eventListenerLists.has('requestHeadersStart')).assertTrue(true);
                expect(eventListenerLists.has('requestBodyStart')).assertTrue(true);
                expect(eventListenerLists.has('requestHeadersEnd')).assertTrue(true);
                expect(eventListenerLists.has('requestBodyEnd')).assertTrue(true);
                expect(eventListenerLists.has('responseHeadersStart')).assertTrue(true);
                expect(eventListenerLists.has('responseBodyStart')).assertTrue(true);
                expect(eventListenerLists.has('responseHeadersEnd')).assertTrue(true);
                expect(eventListenerLists.has('responseBodyEnd')).assertTrue(true);
                expect(eventListenerLists.has('callEnd')).assertTrue(true);
            }, 3000);
        });
        it('eventListenerPostFailed', 0, () => {
            let httpClient = new HttpClient.Builder().addEventListener(new HttpEventListener()).build();
            httpClient.newCall(requestTestTwo).execute().then((result) => { }).catch((error: BusinessError) => { });
            expect(eventListenerLists.has('callStart')).assertTrue(true);
            setTimeout(() => {
                expect(eventListenerLists.has('requestHeadersStart')).assertTrue(true);
                expect(eventListenerLists.has('requestBodyStart')).assertTrue(true);
                expect(eventListenerLists.has('requestHeadersEnd')).assertTrue(true);
                expect(eventListenerLists.has('requestBodyEnd')).assertTrue(true);
                expect(eventListenerLists.has('responseFailed')).assertTrue(true);
                expect(eventListenerLists.has('callFailed')).assertTrue(true);
            }, 3000);
        });
        it("eventListenerEnqueue", TestType.PERFORMANCE, () => {
            let startTime = new Date().getTime();
            let httpClient = new HttpClient.Builder().addEventListener(new HttpEventListener()).build();
            for (let i = 0; i < 2000; i++) {
                httpClient.newCall(requestTestOne).enqueue((result: Response) => {
                    expect(result.getCode().toString()).assertEqual('200');
                }, (error: BusinessError) => {
                    expect(error.message).assertEqual('error');
                });
            }
            let endTime = new Date().getTime();
            Logger.info('PerformanceTest_enqueue -> PerformanceTest endTime ' + endTime);
            let averageTime = ((endTime - startTime) * 1000) / 100;
            Logger.info('PerformanceTest_enqueue -> PerformanceTest averageTime ' + averageTime);
            Logger.info('PerformanceTest_enqueue -> end');
        });
        it("eventListenerAwait", TestType.PERFORMANCE, () => {
            let startTime = new Date().getTime();
            let httpClient = new HttpClient.Builder().addEventListener(new HttpEventListener()).build();
            for (let i = 0; i < 2000; i++) {
                httpClient.newCall(requestTestOne).execute().then((result: Response) => {
                    Logger.info('PerformanceTest_execute -> getBody : ' + result.getBody());
                    expect(result.getCode().toString()).assertEqual('200');
                }, (error: BusinessError) => {
                    Logger.info('PerformanceTest_execute -> Error : ' + error.message);
                    expect(error.message).assertEqual('error');
                });
            }
            let endTime = new Date().getTime();
            Logger.info('PerformanceTest_execute -> PerformanceTest endTime ' + endTime);
            let averageTime = ((endTime - startTime) * 1000) / 100;
            Logger.info('PerformanceTest_execute -> PerformanceTest averageTime ' + averageTime);
            Logger.info('PerformanceTest_execute -> end');
        });
    });
    beforeEach(() => {
        eventListenerLists.clear();
    });
}
class HttpEventListener extends EventListener {
    protected startTime: number = 0;
    logWithTime(message: string) {
        const nosTime: number = new Date().getTime();
        if (message == 'callStart') {
            this.startTime = nosTime;
        }
        const elapsedTime: number = (nosTime - this.startTime) / 1000;
        Logger.info('自定义EventListener' + elapsedTime + ' ' + message);
        eventListenerLists.set(message, message);
    }
    callStart(call: HttpCall) {
        this.logWithTime('callStart');
    }
    ;
    dnsStart(call: HttpCall, domainName: string) {
        this.logWithTime('dnsStart');
    }
    ;
    dnsEnd(call: HttpCall, domainName: string, inetAddressList: [
    ]) {
        this.logWithTime('dnsEnd');
    }
    ;
    connectStart(call: HttpCall) {
        this.logWithTime('connectStart');
    }
    ;
    secureConnectStart(call: HttpCall) {
        this.logWithTime('secureConnectStart');
    }
    ;
    secureConnectEnd(call: HttpCall) {
        this.logWithTime('secureConnectEnd');
    }
    ;
    connectEnd(call: HttpCall) {
        this.logWithTime('connectEnd');
    }
    ;
    connectFailed(call: HttpCall) {
        this.logWithTime('connectFailed');
    }
    connectionAcquired(call: HttpCall) {
        this.logWithTime('connectionAcquired');
    }
    connectionReleased(call: HttpCall) {
        this.logWithTime('connectionReleased');
    }
    requestHeadersStart(call: HttpCall) {
        this.logWithTime('requestHeadersStart');
    }
    requestHeadersEnd(call: HttpCall, request: Request) {
        this.logWithTime('requestHeadersEnd');
    }
    requestBodyStart(call: HttpCall) {
        this.logWithTime('requestBodyStart');
    }
    requestBodyEnd(call: HttpCall, request: Request) {
        this.logWithTime('requestBodyEnd');
    }
    requestFailed(call: HttpCall, ioe: IOException) {
        this.logWithTime('requestFailed');
    }
    responseHeadersStart(call: HttpCall) {
        this.logWithTime('responseHeadersStart');
    }
    responseHeadersEnd(call: HttpCall, response: Response) {
        this.logWithTime('responseHeadersEnd');
    }
    responseBodyStart(call: HttpCall) {
        this.logWithTime('responseBodyStart');
    }
    responseBodyEnd(call: HttpCall, response: Response) {
        this.logWithTime('responseBodyEnd');
    }
    responseFailed(call: HttpCall, ioe: IOException) {
        this.logWithTime('responseFailed');
    }
    callEnd(call: HttpCall) {
        this.logWithTime('callEnd');
    }
    callFailed(call: HttpCall, ioe: IOException) {
        this.logWithTime('callFailed');
    }
}
