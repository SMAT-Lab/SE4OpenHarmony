let __generate__Id: number = 0;
function generateId(): string {
    return "CustomCertificateTest.test_" + ++__generate__Id;
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
import { HttpClient, Logger, Request, Response, TimeUnit, Dns, X509TrustManager, StringUtil, Utils } from '@ohos/httpclient';
import { BusinessError } from '@ohos.base';
import connection from '@ohos.net.connection';
import certFramework from '@ohos.security.cert';
let localIssuerName: certFramework.DataBlob;
export default function CustomCertificateTest() {
    const HTTP_COUNT = 2;
    describe('CustomCertificateTest', () => {
        beforeAll(async () => {
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
        let certDataTest = '-----BEGIN CERTIFICATE-----\n' +
            'MIIGZTCCBM2gAwIBAgIQRAmVIveVm5Efg6+RrvQFIjANBgkqhkiG9w0BAQwFADBZ\n' +
            'MQswCQYDVQQGEwJDTjElMCMGA1UEChMcVHJ1c3RBc2lhIFRlY2hub2xvZ2llcywg\n' +
            'SW5jLjEjMCEGA1UEAxMaVHJ1c3RBc2lhIFJTQSBEViBUTFMgQ0EgRzIwHhcNMjMw\n' +
            'NjI5MDAwMDAwWhcNMjQwNjI4MjM1OTU5WjAYMRYwFAYDVQQDEw1hcGkueHlnZW5n\n' +
            'LmNuMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqScfOEx2dMCCZ0H7\n' +
            '8+M+tPqrCXX/BtadN11Kw/v98uQiHRhXAVtshE+XVxyobFgKuEmEm1d97Cyh2wXH\n' +
            'QimAMdvDtVBUlKDv564rqPYe1ytSZwOn1kr53aryY38Hq6OSqByZCzWpE6Llo5hV\n' +
            'E+D8+iY7M6E49Z8/eBObmwYaky1NrJ8uCHj4HJJU4kn7x5SSodb2N65NZwjJRshg\n' +
            'iQKjDXuA3mR01PR4CXWOqoD7JM9v+v5MKP7KH+mp6ZHgoktFaqVvJh+Y3dLx47yK\n' +
            'qZnqvbiCfWAf2KNJ8IX9EQpv4H8BUy1soJZO9nasgb0IsAkqILjBsO+o8B9G0Ngj\n' +
            'emigPwIDAQABo4IC6DCCAuQwHwYDVR0jBBgwFoAUXzp8ERB+DGdxYdyLo7UAA2f1\n' +
            'VxwwHQYDVR0OBBYEFPGFw+AaGuH4xt/q8yQVvSlNbgyLMA4GA1UdDwEB/wQEAwIF\n' +
            'oDAMBgNVHRMBAf8EAjAAMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjBJ\n' +
            'BgNVHSAEQjBAMDQGCysGAQQBsjEBAgIxMCUwIwYIKwYBBQUHAgEWF2h0dHBzOi8v\n' +
            'c2VjdGlnby5jb20vQ1BTMAgGBmeBDAECATB9BggrBgEFBQcBAQRxMG8wQgYIKwYB\n' +
            'BQUHMAKGNmh0dHA6Ly9jcnQudHJ1c3QtcHJvdmlkZXIuY24vVHJ1c3RBc2lhUlNB\n' +
            'RFZUTFNDQUcyLmNydDApBggrBgEFBQcwAYYdaHR0cDovL29jc3AudHJ1c3QtcHJv\n' +
            'dmlkZXIuY24wGAYDVR0RBBEwD4INYXBpLnh5Z2VuZy5jbjCCAX8GCisGAQQB1nkC\n' +
            'BAIEggFvBIIBawFpAHcAdv+IPwq2+5VRwmHM9Ye6NLSkzbsp3GhCCp/mZ0xaOnQA\n' +
            'AAGJB45YoAAABAMASDBGAiEAj8mpSTbhAn/zfnqyFSPLvveWbnvEYEcgCRUVe1PV\n' +
            's7ECIQDZe+7ADH7FC8+ldqujRCkoH7idao3leaNaAd48uUY5TAB2ANq2v2s/tbYi\n' +
            'n5vCu1xr6HCRcWy7UYSFNL2kPTBI1/urAAABiQeOWP0AAAQDAEcwRQIhAK7GbJWT\n' +
            'dIH2KNDmywNOalpdDXs560TftfaLt75H5CXMAiArxcyQCb+XS+Yhir+sOcF3l9p+\n' +
            'WqEUtJek6DpVJU3haQB2AO7N0GTV2xrOxVy3nbTNE6Iyh0Z8vOzew1FIWUZxH7Wb\n' +
            'AAABiQeOWMUAAAQDAEcwRQIhAO/qb+cpHXAiUCpgehNNjVpU+bJ054BBrAn1hxzs\n' +
            'vf6OAiA6dQTOoK3C3MPibbKmMCYhKJVpmn9ziwpBGCptBWgFeDANBgkqhkiG9w0B\n' +
            'AQwFAAOCAYEAiMKn62NZEhZ05LBUFTqPwUbcam8qxLnRXyWNfQaJ5MMVTe6eYmMt\n' +
            'xExRxIaMclx8RpSHn04ZjhR8wDCcA2DWJrd933R7Y8J6PAgQiaklIDoK+OaCbpb/\n' +
            'Er8ahxBpn63tGS2ofZyhgirSfMyLNIbYMilF9Ca8K3tDVRf/QEtYgNK3h58d1RHq\n' +
            '9W2BkXizxhWUiZ+yeXeoe+74eRfbYSbHy8X0eWiZSB+WmnDaiuM80+F4SqNWHhaq\n' +
            'b797PDLGr3L379QSUtuFarJQw99ntWCeb6iFh2xAOwRiHk7TjLtU95g1HgWuJkek\n' +
            'EFzT6J50Kl1EEsxOT99B7bJLPK2MW7GrPglB652z6Vm2jlfwtnDkWqMuSFUolAXo\n' +
            'Fw53CTzxtzU2BQ7F4Wy0/zfkw+M6/kBp6ZNKgYtMPaCltcLiALdu1qLjzRqxiRAZ\n' +
            'xNsfU6HvcZlpxQnOVk+WvShkb5J2wBk2T739/CJoq5Eulg97iKYH1zPBssD59Dhl\n' +
            'fQsqefH/c5ZR\n' +
            '-----END CERTIFICATE-----\n';
        let encodingBlob: certFramework.EncodingBlob = {
            data: Utils.stringToUint8Array(certDataTest),
            encodingFormat: certFramework.EncodingFormat.FORMAT_PEM
        };
        certFramework.createX509Cert(encodingBlob, (error, x509Cert) => {
            if (error != null) {
                console.error('createX509Cert failed, errCode: ' + error.code + ', errMsg: ' + error.message);
            }
            else {
                console.log('createX509Cert success');
                localIssuerName = x509Cert.getIssuerName();
            }
        });
        let client: HttpClient = new HttpClient.Builder()
            .dns(new CustomDns())
            .setConnectTimeout(1000, TimeUnit.SECONDS)
            .setReadTimeout(1000, TimeUnit.SECONDS)
            .build();
        /**
         * 自定义证书校验，校验服务器端时间在有效期内
         */
        it('CustomCertificateTestDateSuccess', 0, async () => {
            Logger.info('CustomCertificateTest_Success -> begin');
            let request: Request = new Request.Builder()
                .url('https://api.xygeng.cn/one')
                .method('GET')
                .ca([certData])
                .build();
            await client.newCall(request)
                .checkCertificate(new SslCertificateManagerSuccess())
                .execute().then((result: Response) => {
                Logger.info('CustomCertificateTest_Success -> getBody : ' + result.getBody());
                expect(result.getCode().toString()).assertEqual('200');
                expect(result.getBody()).assertContain('tag');
            }, (error: BusinessError) => {
                Logger.info('CustomCertificateTest_Success -> Error : ' + error.message);
                expect(error.message).assertEqual('error');
            });
            Logger.info('CustomCertificateTest_Success -> end');
        });
        /**
         * 自定义证书校验，校验服务器端时间过期
         */
        it('CustomCertificateTestDateFail', 0, async () => {
            Logger.info('CustomCertificateTest_Fail -> begin');
            let request: Request = new Request.Builder()
                .url('https://api.xygeng.cn/one')
                .method('GET')
                .ca([certData])
                .build();
            await client.newCall(request)
                .checkCertificate(new SslCertificateManagerFail())
                .execute().then((result: Response) => {
                Logger.info('CustomCertificateTest_Fail -> getBody : ' + result.getBody());
            }, (error: BusinessError) => {
                Logger.info('CustomCertificateTest_Fail -> Error : ' + error.message);
                expect(error.message).assertEqual('check server certificate fail');
                expect(error.name).assertContain('checkValidityWithDate failed');
            });
            Logger.info('CustomCertificateTest_Fail -> end : ');
        });
        /**
         * 自定义证书校验，校验issuerName
         */
        it('CustomCertificateTestIssuerNameSuccess', 0, async () => {
            Logger.info('CustomCertificateTest_issuerName_Success -> begin');
            let request: Request = new Request.Builder()
                .url('https://api.xygeng.cn/one')
                .method('GET')
                .ca([certData])
                .build();
            await client.newCall(request)
                .checkCertificate(new SslCertificateManagerIssuerNameSuccess())
                .execute().then((result: Response) => {
                Logger.info('CustomCertificateTest_issuerName_Success -> getBody : ' + result.getBody());
                expect(result.getCode().toString()).assertEqual('200');
                expect(result.getBody()).assertContain('tag');
            }, (error: BusinessError) => {
                Logger.info('CustomCertificateTest_issuerName_Success -> Error : ' + error.message);
                expect(error.message).assertEqual('error');
            });
            Logger.info('CustomCertificateTest_issuerName_Success -> end');
        });
        it('CustomCertificateTestIssuerNameFail', 0, async () => {
            Logger.info('CustomCertificateTest_issuerName_Fail -> begin');
            let request: Request = new Request.Builder()
                .url('https://api.xygeng.cn/one')
                .method('GET')
                .ca([certData])
                .build();
            await client.newCall(request)
                .checkCertificate(new SslCertificateManagerIssuerNameFail())
                .execute().then((result: Response) => {
                Logger.info('CustomCertificateTest_issuerName_Fail -> getBody : ' + result.getBody());
            }, (error: BusinessError) => {
                Logger.info('CustomCertificateTest_issuerName_Fail -> Error : ' + error.message);
                expect(error.message).assertEqual('check server certificate fail');
                expect(error.name).assertContain('checkValidity issuerName failed');
            });
            Logger.info('CustomCertificateTest_issuerName_Fail -> end');
        });
        it('PerformanceTest_enqueue', 0, async (done: Function) => {
            Logger.info('PerformanceTest_enqueue -> begin');
            let clientA: HttpClient = new HttpClient.Builder()
                .dns(new CustomDns())
                .setConnectTimeout(1000, TimeUnit.SECONDS)
                .setReadTimeout(1000, TimeUnit.SECONDS)
                .build();
            let request: Request = new Request.Builder()
                .url('https://api.xygeng.cn/one')
                .method('GET')
                .ca([certData])
                .build();
            clientA.dispatcher.setMaxRequestCount(2000);
            let startTime = new Date().getTime();
            Logger.info('PerformanceTest_enqueue  -> PerformanceTest startTime ' + startTime);
            let performanceTest: (index: number) => void = async (index) => {
                clientA.newCall(request)
                    .checkCertificate(new SslCertificateManagerSuccess())
                    .enqueue((result: Response) => {
                    if (index < HTTP_COUNT) {
                        performanceTest(index + 1);
                    }
                    else {
                        expect(result.getCode().toString()).assertEqual('200');
                        expect(result.getBody()).assertContain('tag');
                        let endTime = new Date().getTime();
                        Logger.info('PerformanceTest_enqueue -> PerformanceTest endTime ' + endTime);
                        let averageTime = (endTime - startTime) / HTTP_COUNT;
                        Logger.info('PerformanceTest_enqueue -> PerformanceTest averageTime ' + averageTime);
                        expect(averageTime < 1000).assertTrue();
                        done();
                    }
                }, (error: BusinessError) => {
                    Logger.info('PerformanceTest_enqueue -> Error : ' + error.message);
                    expect(error.message).assertEqual('error');
                });
            };
            performanceTest(0);
            Logger.info('PerformanceTest_enqueue -> end');
        });
        it('PerformanceTest_execute', 0, async () => {
            Logger.info('PerformanceTest_execute -> begin');
            let startTime = new Date().getTime();
            Logger.info('PerformanceTest_execute  -> PerformanceTest startTime ' + startTime);
            let request: Request = new Request.Builder()
                .url('https://api.xygeng.cn/one')
                .method('GET')
                .ca([certData])
                .build();
            client.dispatcher.setMaxRequestCount(2000);
            for (let i = 0; i < HTTP_COUNT; i++) {
                await client.newCall(request)
                    .checkCertificate(new SslCertificateManagerIssuerNameSuccess())
                    .execute().then((result: Response) => {
                    Logger.info('PerformanceTest_execute -> getBody : ' + result.getBody());
                    expect(result.getCode().toString()).assertEqual('200');
                    expect(result.getBody()).assertContain('tag');
                }, (error: BusinessError) => {
                    Logger.info('PerformanceTest_execute -> Error : ' + error.message);
                    expect(error.message).assertEqual('error');
                });
            }
            let endTime = new Date().getTime();
            Logger.info('PerformanceTest_execute -> PerformanceTest endTime ' + endTime);
            let averageTime = (endTime - startTime) / HTTP_COUNT;
            Logger.info('PerformanceTest_execute -> PerformanceTest averageTime ' + averageTime);
            expect(averageTime < 1000).assertTrue();
            Logger.info('PerformanceTest_execute -> end');
        });
    });
}
export class CustomDns implements Dns {
    async lookup(hostname: string): Promise<Array<connection.NetAddress>> {
        return await new Promise((resolve, reject) => {
            let netAddress: Array<connection.NetAddress> = [{ 'address': '124.71.114.249', 'family': 1, 'port': 443 }];
            resolve(netAddress);
        });
    }
}
export class SslCertificateManagerSuccess implements X509TrustManager {
    checkClientTrusted(X509Certificate: certFramework.X509Cert): void {
    }
    checkServerTrusted(X509Certificate: certFramework.X509Cert): void {
        let currentDayTime = StringUtil.getCurrentDayTime();
        let date = currentDayTime + 'Z';
        let checkDate = false;
        try {
            X509Certificate.checkValidityWithDate(date);
            checkDate = true;
            console.info('checkValidityWithDate success');
            expect(checkDate).assertEqual(true);
        }
        catch (error) {
            console.error('checkValidityWithDate failed, errCode: ' + error.code + ', errMsg: ' + error.message);
            error.message = 'checkValidityWithDate failed, errCode: ' + error.code + ', errMsg: ' + error.message;
            throw new Error(error);
        }
    }
}
export class SslCertificateManagerFail implements X509TrustManager {
    checkClientTrusted(X509Certificate: certFramework.X509Cert): void {
    }
    checkServerTrusted(X509Certificate: certFramework.X509Cert): void {
        let date = '201001000001Z';
        let checkDate = false;
        try {
            X509Certificate.checkValidityWithDate(date);
            console.info('checkValidityWithDate success');
        }
        catch (error) {
            console.error('checkValidityWithDate failed, errCode: ' + error.code + ', errMsg: ' + error.message);
            error.message = 'checkValidityWithDate failed, errCode: ' + error.code + ', errMsg: ' + error.message;
            expect(checkDate).assertEqual(false);
            throw new Error(error);
        }
    }
}
export class SslCertificateManagerIssuerNameSuccess implements X509TrustManager {
    checkClientTrusted(X509Certificate: certFramework.X509Cert): void {
    }
    checkServerTrusted(X509Certificate: certFramework.X509Cert): void {
        let issuerName = X509Certificate.getIssuerName();
        Logger.info('issuerName: ', Utils.uint8ArrayToString(issuerName.data));
        expect(Utils.uint8ArrayToString(issuerName.data)).assertEqual(Utils.uint8ArrayToString(localIssuerName.data));
        if (Utils.uint8ArrayToString(issuerName.data) == Utils.uint8ArrayToString(localIssuerName.data)) {
            Logger.info('checkValidity issuerName success');
        }
        else {
            throw new Error('checkValidity issuerName failed');
        }
    }
}
export class SslCertificateManagerIssuerNameFail implements X509TrustManager {
    checkClientTrusted(X509Certificate: certFramework.X509Cert): void {
    }
    checkServerTrusted(X509Certificate: certFramework.X509Cert): void {
        let issuerName = X509Certificate.getIssuerName();
        Logger.info('issuerName: ', Utils.uint8ArrayToString(issuerName.data));
        expect(Utils.uint8ArrayToString(issuerName.data)).assertEqual(Utils.uint8ArrayToString(localIssuerName.data));
        if (Utils.uint8ArrayToString(issuerName.data) == '/C=CN/O=TrustAsia Technologies, Inc./CN=TrustAsia RSA DV TLS CA G2') {
            Logger.info('checkValidity issuerName success');
        }
        else {
            throw new Error('checkValidity issuerName failed');
        }
    }
}
