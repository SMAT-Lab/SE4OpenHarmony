let __generate__Id: number = 0;
function generateId(): string {
    return "List.test_" + ++__generate__Id;
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
import CacheTest from './CacheTest.test';
import RequestTest from './RequestTest.test';
import HttpClientTest from './HttpClientTest.test';
import ResponseTest from './ResponseTest.test';
import ResponseDataTypeTest from './ResponseDataTypeTest.test';
import PriorityQueueTest from './PriorityRequestTest.test';
import GzipTest from './GzipTest.test';
import EventListenerTest from './EventListenerTest.test';
import CertificatePinnerTest from './CertPinnerTest.test';
import CustomCertificateTest from './CustomCertificateTest.test';
import RequestCaching from './RequestCaching.test';
import Proxy from './Proxy.test';
import ProxyAPITest from './ProxyAPITest.test';
export default function testsuite() {
    ResponseTest();
    CacheTest();
    RequestTest();
    HttpClientTest();
    ResponseDataTypeTest();
    PriorityQueueTest();
    GzipTest();
    EventListenerTest();
    CertificatePinnerTest();
    CustomCertificateTest();
    RequestCaching();
    Proxy();
    ProxyAPITest();
}
