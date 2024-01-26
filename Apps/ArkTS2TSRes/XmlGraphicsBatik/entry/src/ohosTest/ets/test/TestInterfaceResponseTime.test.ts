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
import { SVGCircle, SVGDeclares, SVGEllipse, SVGLine, SVGManager, SVGPath, SVGPolygonAndPolyLine, SVGRect, SVGRoot, SVGSpecifiedFormat, SVGXMLChecker, XMLConstants } from '@ohos/XmlGraphicsBatik';
export default function telephonyPerfJsunit() {
    describe("telephonyPerfJsunit", () => {
        const BASE_COUNT = 2000;
        const HTTP_COUNT = 2;
        const BASELINE_HASSIMECASR = 500;
        const BASELINE_CREATEHTTP = 500;
        const BASELINE_REQUEST = 2500;
        const BASELINE_DESTROY = 30;
        //SVGCircle
        it("SVGCircle", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_SVGCircle startTime:" + startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                let circle: SVGCircle = new SVGCircle();
            }
            let endTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_SVGCircle endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Telephony_Http_CreateHttp_Perf_0100_SVGCircle averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        //SVGDeclares
        it("SVGDeclares", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_SVGDeclares startTime:" + startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                let declares: SVGDeclares = new SVGDeclares();
            }
            let endTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_SVGDeclares endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Telephony_Http_CreateHttp_Perf_0100_SVGDeclares averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        //SVGEllipse
        it("SVGEllipse", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_SVGEllipse startTime:" + startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                let ellipse: SVGEllipse = new SVGEllipse();
            }
            let endTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_SVGEllipse endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Telephony_Http_CreateHttp_Perf_0100_SVGEllipse averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        //SVGLine
        it("SVGLine", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_SVGLine startTime:" + startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                let line: SVGLine = new SVGLine();
            }
            let endTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_SVGLine endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Telephony_Http_CreateHttp_Perf_0100_SVGLine averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        //SVGManager
        it("SVGManager", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_SVGManager startTime:" + startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                SVGManager.getInstance();
            }
            let endTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_SVGManager endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Telephony_Http_CreateHttp_Perf_0100_SVGManager averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        //SVGPath
        it("SVGPath", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_SVGPath startTime:" + startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                let path: SVGPath = new SVGPath();
            }
            let endTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_SVGPath endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Telephony_Http_CreateHttp_Perf_0100_SVGPath averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        //SVGPolygonAndPolyLine
        it("SVGPolygonAndPolyLine", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_SVGPolygonAndPolyLine startTime:" + startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                let polygon: SVGPolygonAndPolyLine = new SVGPolygonAndPolyLine();
            }
            let endTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_SVGPolygonAndPolyLine endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Telephony_Http_CreateHttp_Perf_0100_SVGPolygonAndPolyLine averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        //SVGRect
        it("SVGRect", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_SVGRect startTime:" + startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                let rect: SVGRect = new SVGRect();
            }
            let endTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_SVGRect endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Telephony_Http_CreateHttp_Perf_0100_SVGRect averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
        //SVGRoot
        it("SVGRoot", TestType.PERFORMANCE, async (done: Function) => {
            let startTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_SVGRoot startTime:" + startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                let root: SVGRoot = new SVGRoot();
            }
            let endTime = new Date().getTime();
            console.log("Telephony_Http_CreateHttp_Perf_0100_SVGRoot endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.log("Telephony_Http_CreateHttp_Perf_0100_SVGRoot averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
            done();
        });
    });
}
