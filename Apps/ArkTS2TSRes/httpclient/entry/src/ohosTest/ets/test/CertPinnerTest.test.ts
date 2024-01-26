let __generate__Id: number = 0;
function generateId(): string {
    return "CertPinnerTest.test_" + ++__generate__Id;
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
import { Dns, HttpClient, Request, Response, TimeUnit, CertificatePinnerBuilder, Logger } from '@ohos/httpclient';
import connection from '@ohos.net.connection';
import { BusinessError } from '@ohos.base';
const TAG: string = "[XTS_RequestTest]";
export class CustomDns implements Dns {
    async lookup(hostname: string): Promise<Array<connection.NetAddress>> {
        console.info('DNSTEST CustomDns begin here');
        return await new Promise((resolve, reject) => {
            let netAddress: Array<connection.NetAddress> = [{ 'address': '1.94.37.200', 'family': 1, 'port': 8080 }];
            ;
            resolve(netAddress);
        });
    }
    ;
}
export default function CertificatePinnerTest() {
    let client: HttpClient;
    let request: Request;
    let stringToUint8Array = (str: string): Uint8Array => {
        let arr: Array<number> = [];
        for (let i = 0, j = str.length; i < j; i++) {
            arr.push(str.charCodeAt(i));
        }
        return new Uint8Array(arr);
    };
    // const context: Context = getContext();
    let caPin: string = `-----BEGIN CERTIFICATE-----
MIIDnzCCAocCFHAhH9y8rKhbaIgTZpaOTBA3tBncMA0GCSqGSIb3DQEBCwUAMIGL
MQswCQYDVQQGEwJDTjESMBAGA1UECAwJR3VhbmdEb25nMREwDwYDVQQHDAhTaGVu
WmhlbjEUMBIGA1UECgwLT3Blbkhhcm1vbnkxFDASBgNVBAsMC09wZW5IYXJtb255
MQswCQYDVQQDDAJDQTEcMBoGCSqGSIb3DQEJARYNNjY2NjY2QHFxLmNvbTAeFw0y
MzExMTYwMTIyNThaFw0zMzExMTMwMTIyNThaMIGLMQswCQYDVQQGEwJDTjESMBAG
A1UECAwJR3VhbmdEb25nMREwDwYDVQQHDAhTaGVuWmhlbjEUMBIGA1UECgwLT3Bl
bkhhcm1vbnkxFDASBgNVBAsMC09wZW5IYXJtb255MQswCQYDVQQDDAJDQTEcMBoG
CSqGSIb3DQEJARYNNjY2NjY2QHFxLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEP
ADCCAQoCggEBAMO0uEXZfkag4UyyvgDjO8ee8Id1bhrr4bg8mLoiBNdvgpAKTSoU
euMzwiXaP2N/KN5EvFw9NDoU46p2ePpHEcWh74bM/VWo3sWGvO+4wbX4ZFj2ap2U
lXKtTBf8riOYyQCzjHq+1bBj1zjcIQaAaAgg8+RUsv4ktWS80QF8+kav6Obm96xy
2lZyRVqCv8NmfaossKGvmfx3KCVXLS5/ckpjdNaclzJcOz8oG8fmd2rMmlmvwEEq
idsSKBfJGm/TLq/uS2d0Yzi2RwJPgydN24PXUPXcYuWmxmp473ughM8ld8Jz6YSU
dzrsCBNu5xLSmGQ+F297kcj+h0utluTyvG0CAwEAATANBgkqhkiG9w0BAQsFAAOC
AQEAaCfmNobYsM1vELF8z1NuNhsdLk9GZ/X/c3j7rSzkmEOKCDF2/v1Ges95/tpE
1nnX+OvK5DCjNNMINZsu9QX2awiipKFKRXBRwXuZ4AriVr1YGhZt3PpMUtWpV8eV
RKDbfFP8uDv1+as9yzEJBPdAhLD3/WJmjt6RODp1iBcRRhM521SoNfApbGp5rVx+
C2jWplM8E6tskgKCBWTQ9mKnoEuWCBzkh6YzZew0ZSO2RHQ7LZ8ZMhSzYqxKsacz
OAxY8WQKvRghh3Y5r++ptyS4vdJFFCU9LhdazlZhGEaB3TX+iav+u1Z8xRyruYSh
fmDO5eH54+ryK/UucYQEvdRtUA==
-----END CERTIFICATE-----`;
    describe('CertificatePinnerTest', () => {
        beforeAll(async () => {
            client = new HttpClient
                .Builder()
                .dns(new CustomDns())
                .setConnectTimeout(3, TimeUnit.SECONDS)
                .setReadTimeout(3, TimeUnit.SECONDS)
                .build();
            request = new Request.Builder()
                .url('https://1.94.37.200:8080/user/getUserByUuid?userUuid=1')
                .method('GET')
                .ca([stringToUint8Array(caPin)])
                .build();
        });
        /**
         * 设置一对hostname与指纹，校验成功
         */
        it('showCertificatePinningSuccess_oneAdd_oneHost', 0, async () => {
            const certificatePinner = new CertificatePinnerBuilder()
                .add('1.94.37.200', 'sha1/f58c753eff28a6c9847775c4bc90f023b44dfd41')
                .build();
            client.newCall(request)
                .setCertificatePinner(certificatePinner)
                .enqueue((res: Response) => {
                Logger.info("证书锁定---success---" + JSON.stringify(JSON.parse(JSON.stringify(res)), null, 4));
                expect(JSON.stringify(JSON.parse(JSON.stringify(res)).responseCode)).assertContain('200');
            }, (err: BusinessError) => {
                Logger.info("证书锁定---failed--- ", JSON.stringify(err));
                expect(JSON.stringify(err.code)).assertContain('');
            });
        });
        /**
         * 设置一对hostname与指纹，校验失败
         */
        it('showCertificatePinningFail_oneAdd_oneHost', 0, async () => {
            const certificatePinner = new CertificatePinnerBuilder()
                .add('1.94.37.200', 'sha1/f58c753eff28a6c9847775c4bc90f023b44dfd4')
                .build();
            client.newCall(request)
                .setCertificatePinner(certificatePinner)
                .enqueue((res: Response) => {
                Logger.info("证书锁定---success---" + JSON.stringify(JSON.parse(JSON.stringify(res)), null, 4));
                expect(JSON.stringify(JSON.parse(JSON.stringify(res)).responseCode)).assertContain('');
            }, (err: BusinessError) => {
                Logger.info("证书锁定---failed--- ", JSON.stringify(err));
                expect(JSON.stringify(err.code)).assertContain('666666');
            });
        });
        /**
         * 设置多对hostname与指纹,校验成功
         */
        it('showCertificatePinningSuccess_Adds_Hosts', 0, async () => {
            const certificatePinner = new CertificatePinnerBuilder()
                .add('1.94.37.200', 'sha1/f58c753eff28a6c9847775c4bc90f023b44dfd41')
                .add('*.1.94.37.200', 'sha1/f58c753eff28a6c9847775c4bc90f023b44dfd4')
                .add('1.94.37.200', 'sha1/f58c753eff28a6c9847775cc90f023b44dfd4')
                .build();
            client.newCall(request)
                .setCertificatePinner(certificatePinner)
                .enqueue((res: Response) => {
                Logger.info("证书锁定---success---" + JSON.stringify(JSON.parse(JSON.stringify(res)), null, 4));
                expect(JSON.stringify(JSON.parse(JSON.stringify(res)).responseCode)).assertContain('200');
            }, (err: BusinessError) => {
                Logger.info("证书锁定---failed--- ", JSON.stringify(err));
                expect(JSON.stringify(err.code)).assertContain('');
            });
        });
        /**
         * 设置多对hostname与指纹，校验失败
         */
        it('showCertificatePinningFail_Adds_Hosts', 0, async () => {
            const certificatePinner = new CertificatePinnerBuilder()
                .add('1.94.37.200', 'sha256/f58c753eff28a6c9847775c4bc90f3b44dfd4')
                .add('*.1.94.37.200', 'sha1/f58c753eff28a6c9847775c4bc90f023b44dfd4')
                .add('1.94.37.200', 'sha1/f58c753eff28a6c9847775cc90f023b44dfd4')
                .build();
            client.newCall(request)
                .setCertificatePinner(certificatePinner)
                .enqueue((res: Response) => {
                Logger.info("证书锁定---success---" + JSON.stringify(JSON.parse(JSON.stringify(res)), null, 4));
                expect(JSON.stringify(JSON.parse(JSON.stringify(res)).responseCode)).assertContain('');
            }, (err: BusinessError) => {
                Logger.info("证书锁定---failed--- ", JSON.stringify(err));
                expect(JSON.stringify(err.code)).assertContain('666666');
            });
        });
    });
}
