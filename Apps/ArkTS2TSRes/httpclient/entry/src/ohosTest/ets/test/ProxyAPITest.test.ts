let __generate__Id: number = 0;
function generateId(): string {
    return "ProxyAPITest.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { describe, it, expect } from '@ohos/hypium';
import { HttpClient, Proxy, Type } from '@ohos/httpclient';
let startTime = 0;
const BASE_CONST = 2000;
const port = 6443;
const host = '1.94.37.200';
export default function searchAPI() {
    describe('searchAPITest', () => {
        it('jmesPath_search_interface_performance_test', 0, () => {
            startTime = new Date().getTime(); // 毫秒值
            console.info("jmesPath_search_interface_performance_test startTime:" + startTime);
            hasSimCardCallbackPerfTest(0);
        });
    });
}
function hasSimCardCallbackPerfTest(index: number) {
    let client: HttpClient = new HttpClient
        .Builder()
        .setProxy(new Proxy(Type.HTTP, host, port))
        .build();
    if (index < BASE_CONST) {
        hasSimCardCallbackPerfTest(index + 1);
    }
    else {
        let endTime = new Date().getTime();
        console.info("jmesPath_search_interface_performance_test endTime:" + endTime);
        let averageTime = ((endTime - startTime) * 1000) / BASE_CONST; // 总时长*1000拿到微妙值，再去计算接口平均时长
        console.info("jmesPath_search_interface_performance_test averageTime:" + averageTime + "μs");
        expect(averageTime < 500).assertTrue();
    }
}
