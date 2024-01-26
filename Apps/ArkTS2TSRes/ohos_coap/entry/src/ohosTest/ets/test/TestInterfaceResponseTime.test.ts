let __generate__Id: number = 0;
function generateId(): string {
    return "TestInterfaceResponseTime.test_" + ++__generate__Id;
}
/**
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, TestType } from '@ohos/hypium';
import { CoapClient, CoapRequestMethod, CoapRequestType, CoapResponseCode, ContentFormat } from '@ohos/coap';
export default function telephonyPerfJsunit() {
    describe("telephonyPerfJsunit", () => {
        const BASE_COUNT = 2000;
        const BASELINE_CREATEHTTP = 500;
        it("setPort", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_setPort startTime:" + startTime);
            let coapClient = new CoapClient();
            coapClient.setRepeatCount(1);
            coapClient.setObsSecond(1);
            for (let index = 0; index < BASE_COUNT; index++) {
                coapClient.setPort(5683);
            }
            let endTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_setPort endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Telephony_Http_CreateHttp_Perf_0100_setPort averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("setFormat", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_setFormat startTime:" + startTime);
            let coapClient = new CoapClient();
            for (let index = 0; index < BASE_COUNT; index++) {
                coapClient.setFormat(ContentFormat.PLAIN);
            }
            let endTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_setFormat endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Telephony_Http_CreateHttp_Perf_0100_setFormat averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("request", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_request startTime:" + startTime);
            let coapClient = new CoapClient();
            coapClient.setFormat(ContentFormat.PLAIN);
            //payload test
            coapClient.setPayload("payload test");
            coapClient.setWaitSecond(3);
            for (let index = 0; index < BASE_COUNT; index++) {
                //由于coap测试需要服务端，所以这里设置一个错误的url,测试url错误是否能正常返回,正确的时coap://开始的
                let coapPut = coapClient.request("coap:host/time", CoapRequestMethod.PUT, CoapRequestType.COAP_MESSAGE_CON);
                coapPut.then((data) => {
                    if (data.code == CoapResponseCode.SUCCESS) {
                        console.log("libcoap put message:" + data.message[0]);
                    }
                    else {
                        console.log("libcoap put code:" + data.code);
                        console.log("libcoap put error message:" + data.message);
                        expect(data.code).assertEqual(CoapResponseCode.URL_ERROR);
                    }
                });
            }
            let endTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_request endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Telephony_Http_CreateHttp_Perf_0100_request averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("setWaitSecond", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_setWaitSecond startTime:" + startTime);
            let coapClient = new CoapClient();
            for (let index = 0; index < BASE_COUNT; index++) {
                coapClient.setWaitSecond(3);
            }
            let endTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_setWaitSecond endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Telephony_Http_CreateHttp_Perf_0100_setWaitSecond averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("setObsSecond", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_setObsSecond startTime:" + startTime);
            let coapClient = new CoapClient();
            for (let index = 0; index < BASE_COUNT; index++) {
                coapClient.setObsSecond(1);
            }
            let endTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_setObsSecond endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Telephony_Http_CreateHttp_Perf_0100_setObsSecond averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("setRepeatCount", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_setRepeatCount startTime:" + startTime);
            let coapClient = new CoapClient();
            for (let index = 0; index < BASE_COUNT; index++) {
                coapClient.setRepeatCount(1);
            }
            let endTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_setRepeatCount endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Telephony_Http_CreateHttp_Perf_0100_setRepeatCount averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("setPayload", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_setPayload startTime:" + startTime);
            let coapClient = new CoapClient();
            for (let index = 0; index < BASE_COUNT; index++) {
                coapClient.setPayload("payload test");
            }
            let endTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_setPayload endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Telephony_Http_CreateHttp_Perf_0100_setPayload averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        it("setNativeLogOpen", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_setNativeLogOpen startTime:" + startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                CoapClient.setNativeLogOpen(true);
            }
            let endTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_setNativeLogOpen endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Telephony_Http_CreateHttp_Perf_0100_setNativeLogOpen averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
    });
}
