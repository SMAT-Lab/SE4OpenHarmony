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
import { SubsamplingScaleImageView } from '@ohos/subsampling-scale-image-view';
export default function telephonyPerfJsunit() {
    describe("telephonyPerfJsunit", () => {
        const BASE_COUNT = 2000;
        const HTTP_COUNT = 2;
        const BASELINE_HASSIMECASR = 500;
        const BASELINE_CREATEHTTP = 500;
        const BASELINE_REQUEST = 2500;
        const BASELINE_DESTROY = 30;
        it("Telephony_Http_CreateHttp_one_1000", 0, () => {
            let startTime = new Date().getTime();
            console.info("Telephony_Http_CreateHttp_perf_0100 startTime:" + startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                let model: SubsamplingScaleImageView.Model = new SubsamplingScaleImageView.Model();
                model.setImage($r('app.media.icon'));
            }
            let endTime = new Date().getTime();
            console.info("Telephony_Http_CreateHttp_one_0100_endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.info("Telephony_Http_CreateHttp_one_0100_averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
        });
        it("Telephony_Http_CreateHttp_one_2000", 0, () => {
            let startTime = new Date().getTime();
            console.info("Telephony_Http_CreateHttp_perf_0100 startTime:" + startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                let model: SubsamplingScaleImageView.Model = new SubsamplingScaleImageView.Model();
                model.setZoomEnabled(false);
            }
            let endTime = new Date().getTime();
            console.info("Telephony_Http_CreateHttp_one_2000_endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.info("Telephony_Http_CreateHttp_one_2000_averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
        });
        it("Telephony_Http_CreateHttp_one_3000", 0, () => {
            let startTime = new Date().getTime();
            console.info("Telephony_Http_CreateHttp_perf_0100 startTime:" + startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                let model: SubsamplingScaleImageView.Model = new SubsamplingScaleImageView.Model();
                model.setPanEnabled(false);
            }
            let endTime = new Date().getTime();
            console.info("Telephony_Http_CreateHttp_one_3000_endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.info("Telephony_Http_CreateHttp_one_3000_averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
        });
        it("Telephony_Http_CreateHttp_one_4000", 0, () => {
            let startTime = new Date().getTime();
            console.info("Telephony_Http_CreateHttp_perf_0100 startTime:" + startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                let model: SubsamplingScaleImageView.Model = new SubsamplingScaleImageView.Model();
                model.setMaxScale(0);
            }
            let endTime = new Date().getTime();
            console.info("Telephony_Http_CreateHttp_one_4000_endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.info("Telephony_Http_CreateHttp_one_4000_averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
        });
        it("Telephony_Http_CreateHttp_one_5000", 0, () => {
            let startTime = new Date().getTime();
            console.info("Telephony_Http_CreateHttp_perf_0100 startTime:" + startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                let model: SubsamplingScaleImageView.Model = new SubsamplingScaleImageView.Model();
                model.setOrientation(0);
            }
            let endTime = new Date().getTime();
            console.info("Telephony_Http_CreateHttp_one_5000_endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.info("Telephony_Http_CreateHttp_one_5000_averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
        });
        it("Telephony_Http_CreateHttp_one_6000", 0, () => {
            let startTime = new Date().getTime();
            console.info("Telephony_Http_CreateHttp_perf_0100 startTime:" + startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                let model: SubsamplingScaleImageView.Model = new SubsamplingScaleImageView.Model();
                model.getSWidth();
                model.getSHeight();
            }
            let endTime = new Date().getTime();
            console.info("Telephony_Http_CreateHttp_one_6000_endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.info("Telephony_Http_CreateHttp_one_6000_averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
        });
        it("Telephony_Http_CreateHttp_one_7000", 0, () => {
            let startTime = new Date().getTime();
            console.info("Telephony_Http_CreateHttp_perf_0100 startTime:" + startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                let model: SubsamplingScaleImageView.Model = new SubsamplingScaleImageView.Model();
                model.setSingleTapListener({ onSingleTapConfirmed: (event: ClickEvent): void => { } });
            }
            let endTime = new Date().getTime();
            console.info("Telephony_Http_CreateHttp_one_7000_endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.info("Telephony_Http_CreateHttp_one_7000_averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
        });
        it("Telephony_Http_CreateHttp_one_8000", 0, () => {
            let startTime = new Date().getTime();
            console.info("Telephony_Http_CreateHttp_perf_0100 startTime:" + startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                let model: SubsamplingScaleImageView.Model = new SubsamplingScaleImageView.Model();
                model.setLongPressListener({ onLongPress: (event: GestureEvent): void => { } });
            }
            let endTime = new Date().getTime();
            console.info("Telephony_Http_CreateHttp_one_8000_endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.info("Telephony_Http_CreateHttp_one_8000_averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
        });
        it("Telephony_Http_CreateHttp_one_9000", 0, () => {
            let startTime = new Date().getTime();
            console.info("Telephony_Http_CreateHttp_perf_0100 startTime:" + startTime);
            for (let index = 0; index < BASE_COUNT; index++) {
                let model: SubsamplingScaleImageView.Model = new SubsamplingScaleImageView.Model();
                model.setDoubleTapListener({ onDoubleTap: (event: GestureEvent): void => { } });
            }
            let endTime = new Date().getTime();
            console.info("Telephony_Http_CreateHttp_one_9000_endTime:" + endTime);
            let averageTime = ((endTime - startTime) * 1000) / BASE_COUNT;
            console.info("Telephony_Http_CreateHttp_one_9000_averageTime:" + averageTime + "μs");
            expect(averageTime < BASELINE_CREATEHTTP).assertTrue();
        });
    });
}
