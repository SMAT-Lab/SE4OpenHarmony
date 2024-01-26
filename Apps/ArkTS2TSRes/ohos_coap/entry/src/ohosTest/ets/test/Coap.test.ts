let __generate__Id: number = 0;
function generateId(): string {
    return "Coap.test_" + ++__generate__Id;
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
import hilog from '@ohos.hilog';
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from '@ohos/hypium';
import { CoapClient, CoapRequestMethod, CoapRequestType, CoapResponseCode, ContentFormat } from '@ohos/coap';
export default function abilityTest() {
    describe('coapTest', () => {
        it('coapGetTest', 0, () => {
            CoapClient.setNativeLogOpen(true);
            let coapClient = new CoapClient();
            coapClient.setRepeatCount(1);
            coapClient.setObsSecond(1);
            coapClient.setPort(5683);
            //由于coap测试需要服务端，所以这里设置一个错误的url,测试url错误是否能正常返回,正确的时coap://开始的
            let coapGet = coapClient.request("coap:host/time", CoapRequestMethod.GET, CoapRequestType.COAP_MESSAGE_CON);
            coapGet.then((data) => {
                if (data.code == CoapResponseCode.SUCCESS) {
                    console.log("libcoap get message:" + data.message[0]);
                }
                else {
                    console.log("libcoap get code:" + data.code);
                    console.log("libcoap get error message:" + data.message);
                    expect(data.code).assertEqual(CoapResponseCode.URL_ERROR);
                }
            });
        });
        it('coapPostTest', 0, () => {
            CoapClient.setNativeLogOpen(true);
            let coapClient = new CoapClient();
            coapClient.setFormat(ContentFormat.PLAIN);
            //payload test
            coapClient.setPayload("payload test");
            coapClient.setWaitSecond(3);
            //由于coap测试需要服务端，所以这里设置一个错误的url,测试url错误是否能正常返回,正确的时coap://开始的
            let coapPut = coapClient.request("coap:host/time", CoapRequestMethod.POST, CoapRequestType.COAP_MESSAGE_CON);
            coapPut.then((data) => {
                if (data.code == CoapResponseCode.SUCCESS) {
                    console.log("libcoap post message:" + data.message[0]);
                }
                else {
                    console.log("libcoap post code:" + data.code);
                    console.log("libcoap post error message:" + data.message);
                    expect(data.code).assertEqual(CoapResponseCode.URL_ERROR);
                }
            });
        });
        it('coapPutTest', 0, () => {
            CoapClient.setNativeLogOpen(true);
            let coapClient = new CoapClient();
            coapClient.setFormat(ContentFormat.PLAIN);
            //payload test
            coapClient.setPayload("payload test");
            coapClient.setWaitSecond(3);
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
        });
    });
}
