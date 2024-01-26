let __generate__Id: number = 0;
function generateId(): string {
    return "ResponseDataTypeTest.test_" + ++__generate__Id;
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
import { describe, beforeAll, it, expect } from '@ohos/hypium';
import { HttpClient, Logger, Request, Response, TimeUnit, HttpDataType } from '@ohos/httpclient';
import { BusinessError } from '@ohos.base';
export default function ResponseDataTypeTest() {
    describe('ResponseDataTypeTest', () => {
        beforeAll(async () => {
            // Presets an action, which is performed only once before all test cases of the test suite start.
            // This API supports only one parameter: preset action function.
        });
        let certData = '-----BEGIN CERTIFICATE-----\n' +
            'MIIEMjCCAxqgAwIBAgIBATANBgkqhkiG9w0BAQUFADB7MQswCQYDVQQGEwJHQjEb\n' +
            'MBkGA1UECAwSR3JlYXRlciBNYW5jaGVzdGVyMRAwDgYDVQQHDAdTYWxmb3JkMRow\n' +
            'GAYDVQQKDBFDb21vZG8gQ0EgTGltaXRlZDEhMB8GA1UEAwwYQUFBIENlcnRpZmlj\n' +
            'YXRlIFNlcnZpY2VzMB4XDTA0MDEwMTAwMDAwMFoXDTI4MTIzMTIzNTk1OVowezEL\n' +
            'MAkGA1UEBhMCR0IxGzAZBgNVBAgMEkdyZWF0ZXIgTWFuY2hlc3RlcjEQMA4GA1UE\n' +
            'BwwHU2FsZm9yZDEaMBgGA1UECgwRQ29tb2RvIENBIExpbWl0ZWQxITAfBgNVBAMM\n' +
            'GEFBQSBDZXJ0aWZpY2F0ZSBTZXJ2aWNlczCCASIwDQYJKoZIhvcNAQEBBQADggEP\n' +
            'ADCCAQoCggEBAL5AnfRu4ep2hxxNRUSOvkbIgwadwSr+GB+O5AL686tdUIoWMQua\n' +
            'BtDFcCLNSS1UY8y2bmhGC1Pqy0wkwLxyTurxFa70VJoSCsN6sjNg4tqJVfMiWPPe\n' +
            '3M/vg4aijJRPn2jymJBGhCfHdr/jzDUsi14HZGWCwEiwqJH5YZ92IFCokcdmtet4\n' +
            'YgNW8IoaE+oxox6gmf049vYnMlhvB/VruPsUK6+3qszWY19zjNoFmag4qMsXeDZR\n' +
            'rOme9Hg6jc8P2ULimAyrL58OAd7vn5lJ8S3frHRNG5i1R8XlKdH5kBjHYpy+g8cm\n' +
            'ez6KJcfA3Z3mNWgQIJ2P2N7Sw4ScDV7oL8kCAwEAAaOBwDCBvTAdBgNVHQ4EFgQU\n' +
            'oBEKIz6W8Qfs4q8p74Klf9AwpLQwDgYDVR0PAQH/BAQDAgEGMA8GA1UdEwEB/wQF\n' +
            'MAMBAf8wewYDVR0fBHQwcjA4oDagNIYyaHR0cDovL2NybC5jb21vZG9jYS5jb20v\n' +
            'QUFBQ2VydGlmaWNhdGVTZXJ2aWNlcy5jcmwwNqA0oDKGMGh0dHA6Ly9jcmwuY29t\n' +
            'b2RvLm5ldC9BQUFDZXJ0aWZpY2F0ZVNlcnZpY2VzLmNybDANBgkqhkiG9w0BAQUF\n' +
            'AAOCAQEACFb8AvCb6P+k+tZ7xkSAzk/ExfYAWMymtrwUSWgEdujm7l3sAg9g1o1Q\n' +
            'GE8mTgHj5rCl7r+8dFRBv/38ErjHT1r0iWAFf2C3BUrz9vHCv8S5dIa2LX1rzNLz\n' +
            'Rt0vxuBqw8M0Ayx9lt1awg6nCpnBBYurDC/zXDrPbDdVCYfeU0BsWO/8tqtlbgT2\n' +
            'G9w84FoVxp7Z8VlIMCFlA2zs6SFz7JsDoeA3raAVGI/6ugLOpyypEBMs1OUIJqsi\n' +
            'l2D4kF501KKaU73yqWjgom7C12yxow+ev+to51byrvLjKzg6CYG1a4XXvi3tPxq3\n' +
            'smPi9WIsgtRqAEFQ8TmDn5XpNpaYbg==\n' +
            '-----END CERTIFICATE-----\n';
        let client: HttpClient = new HttpClient.Builder()
            .setConnectTimeout(1000, TimeUnit.SECONDS)
            .setReadTimeout(1000, TimeUnit.SECONDS)
            .setWriteTimeout(1000, TimeUnit.SECONDS)
            .build();
        const BASE_COUNT = 2000; // 循环次数：测试普通接口性能
        const BASELINE_REQUEST = 2000; // 性能基线
        /**
         * 未设置响应的数据类型
         */
        it('ResponseDataType_HttpDataType_NoType', 0, async () => {
            Logger.info('ResponseDataType -> NoType : ' + 'it start');
            let dataType = 'String';
            let request = new Request.Builder()
                .get('https://api.xygeng.cn/one')
                .ca([certData])
                .build();
            await client.newCall(request).execute().then((result: Response) => {
                Logger.info('ResponseDataType -> getBody : ' + result.getBody());
                expect(result.getRequest().httpDataType).assertNull();
                expect(result.getBody()).assertInstanceOf(dataType);
            }, (error: BusinessError) => {
                Logger.error('ResponseDataType -> Error : ' + error.message);
                expect(error.message).assertEqual('error');
            });
            Logger.info('ResponseDataType -> NoType : ' + 'it  end');
        });
        /**
         * 设置即将响应数据类型为STRING
         */
        it('ResponseDataType_HttpDataType_STRING', 0, async () => {
            let dataType = 'String';
            Logger.info('ResponseDataType -> STRING : ' + 'it start');
            let request = new Request.Builder()
                .get('https://api.xygeng.cn/one')
                .ca([certData])
                .setHttpDataType(HttpDataType.STRING)
                .build();
            await client.newCall(request).execute().then((result: Response) => {
                Logger.info('ResponseDataType -> getBody : ' + result.getBody());
                expect(result.getRequest().httpDataType).assertEqual(HttpDataType.STRING);
                expect(result.getBody()).assertInstanceOf(dataType);
            }, (error: BusinessError) => {
                Logger.error('ResponseDataType -> Error : ' + error.message);
                expect(error.message).assertEqual('error');
            });
            Logger.info('ResponseDataType -> STRING : ' + 'it  end');
        });
        /**
         * 设置即将响应数据类型为OBJECT
         */
        it('ResponseDataType_HttpDataType_OBJECT', 0, async () => {
            Logger.info('ResponseDataType -> OBJECT : ' + 'it start');
            let dataType = 'object';
            let request = new Request.Builder()
                .get('https://api.xygeng.cn/one')
                .ca([certData])
                .setHttpDataType(HttpDataType.OBJECT)
                .build();
            await client.newCall(request).execute().then((result: Response) => {
                Logger.info('ResponseDataType -> getBody : ' + result.getBody());
                expect(result.getRequest().httpDataType).assertEqual(HttpDataType.OBJECT);
                expect(typeof JSON.parse(result.getBody().toString())).assertEqual(dataType);
            }, (error: BusinessError) => {
                Logger.error('ResponseDataType -> Error : ' + error.message);
                expect(error.message).assertEqual('error');
            });
            Logger.info('ResponseDataType -> OBJECT : ' + 'it end');
        });
        /**
         * 设置即将响应数据类型为ARRAY_BUFFER
         */
        it('ResponseDataType_HttpDataType_ARRAY_BUFFER', 0, async () => {
            Logger.info('ResponseDataType -> ARRAY_BUFFER : ' + 'it start');
            let dataType = 'ArrayBuffer';
            let request = new Request.Builder()
                .get('https://api.xygeng.cn/one')
                .ca([certData])
                .setHttpDataType(HttpDataType.ARRAY_BUFFER)
                .build();
            await client.newCall(request).execute().then((result: Response) => {
                Logger.info('ResponseDataType -> getBody : ' + result.getBody());
                expect(result.getRequest().httpDataType).assertEqual(HttpDataType.ARRAY_BUFFER);
                expect(result.getBody()).assertInstanceOf(dataType);
            }, (error: BusinessError) => {
                Logger.error('ResponseDataType -> Error : ' + error.message);
                expect(error.message).assertEqual('error');
            });
            Logger.info('ResponseDataType -> ARRAY_BUFFER : ' + 'it end');
        });
        /**
         * 未设置响应的数据类型_接口性能测试
         */
        it('ResponseDataType_HttpDataType_NoType_Test', 0, async () => {
            Logger.info('ResponseDataType -> NoType_Test : ' + 'it start');
            let dataType = 'String';
            let startTime = new Date().getTime();
            Logger.info('ResponseDataType -> NoType_Test startTime ' + startTime);
            for (let i = 0; i < BASE_COUNT; i++) {
                let request = new Request.Builder()
                    .get('https://api.xygeng.cn/one')
                    .ca([certData])
                    .addHeader('Content-Type', 'application/json')
                    .build();
                client.newCall(request).execute().then((result: Response) => {
                    expect(result.getRequest().httpDataType).assertNull();
                    expect(result.getBody()).assertInstanceOf(dataType);
                }, (error: BusinessError) => {
                    expect(error.message).assertEqual('error');
                    Logger.error('ResponseDataType -> Error : ' + error.message);
                });
            }
            let endTime = new Date().getTime();
            Logger.info('ResponseDataType -> NoType_Test endTime ' + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            Logger.info('ResponseDataType -> NoType_Test averageTime ' + averageTime);
            expect(averageTime < BASELINE_REQUEST).assertTrue();
        });
        /**
         * 设置即将响应数据类型为STRING_接口性能测试
         */
        it('ResponseDataType_HttpDataType_STRING_Test', 0, async () => {
            Logger.info('ResponseDataType -> STRING_Test : ' + 'it start');
            let dataType = 'String';
            let startTime = new Date().getTime();
            Logger.info('ResponseDataType -> STRING_Test startTime ' + startTime);
            for (let i = 0; i < BASE_COUNT; i++) {
                let request = new Request.Builder()
                    .get('https://api.xygeng.cn/one')
                    .ca([certData])
                    .setHttpDataType(HttpDataType.STRING)
                    .build();
                client.newCall(request).execute().then((result: Response) => {
                    expect(result.getRequest().httpDataType).assertNull();
                    expect(result.getBody()).assertInstanceOf(dataType);
                }, (error: BusinessError) => {
                    expect(error.message).assertEqual('error');
                    Logger.error('ResponseDataType -> Error : ' + error.message);
                });
            }
            let endTime = new Date().getTime();
            Logger.info('ResponseDataType -> STRING_Test endTime ' + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            Logger.info('ResponseDataType -> STRING_Test averageTime ' + averageTime);
            expect(averageTime < BASELINE_REQUEST).assertTrue();
        });
    });
}
