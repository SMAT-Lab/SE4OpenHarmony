let __generate__Id: number = 0;
function generateId(): string {
    return "SpeedCalculator.test_" + ++__generate__Id;
}
/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
import { describe, beforeAll, beforeEach, afterEach, afterAll, it, expect } from "@ohos/hypium";
import { SpeedCalculator } from '@ohos/okdownload';
let speedCalculator: SpeedCalculator;
export default function testSpeedCalculator() {
    describe("speed_calculator_test", () => {
        it('speed_calculator_test_001', 0, () => {
            speedCalculator = new SpeedCalculator();
            expect(speedCalculator != null).assertTrue();
        });
        it('speed_calculator_test_002', 0, () => {
            expect(speedCalculator.nowMillis() != null).assertTrue();
        });
        it('speed_calculator_test_003', 0, () => {
            speedCalculator.downloading(10);
            expect(speedCalculator.getInstantBytesPerSecondAndFlush() > 0).assertTrue();
        });
        it('speed_calculator_test_004', 0, () => {
            speedCalculator.downloading(10);
            expect(speedCalculator.getInstantBytesPerSecondAndFlush() != null).assertTrue();
        });
        it('speed_calculator_test_005', 0, () => {
            speedCalculator.downloading(10);
            expect(speedCalculator.getInstantBytesPerSecondAndFlush()).assertInstanceOf('Number');
        });
        it('speed_calculator_test_006', 0, () => {
            expect(speedCalculator.getBytesPerSecondAndFlush() > 0).assertTrue();
        });
        it('speed_calculator_test_007', 0, () => {
            expect(speedCalculator.getBytesPerSecondAndFlush() < 0).not().assertTrue();
        });
        it('speed_calculator_test_08', 0, () => {
            expect(speedCalculator.getBytesPerSecondAndFlush() != null).assertTrue();
        });
        it('speed_calculator_test_09', 0, () => {
            expect(speedCalculator.getBytesPerSecondAndFlush()).assertInstanceOf('Number');
        });
        it('speed_calculator_test_010', 0, () => {
            expect(speedCalculator.getBytesPerSecondFromBegin() > 0).assertTrue();
        });
        it('speed_calculator_test_011', 0, () => {
            expect(speedCalculator.getBytesPerSecondFromBegin() < 0).not().assertTrue();
        });
        it('speed_calculator_test_012', 0, () => {
            expect(speedCalculator.getBytesPerSecondFromBegin() != null).assertTrue();
        });
        it('speed_calculator_test_013', 0, () => {
            expect(speedCalculator.getBytesPerSecondFromBegin()).assertInstanceOf('Number');
        });
        it('speed_calculator_test_014', 0, () => {
            expect(speedCalculator.instantSpeed() != null).assertTrue();
        });
        it('speed_calculator_test_015', 0, () => {
            expect(speedCalculator.instantSpeed()).assertInstanceOf('String');
        });
        it('speed_calculator_test_016', 0, () => {
            expect(speedCalculator.speed() != null).assertTrue();
        });
        it('speed_calculator_test_017', 0, () => {
            expect(speedCalculator.speed()).assertInstanceOf('String');
        });
        it('speed_calculator_test_018', 0, () => {
            expect(speedCalculator.lastSpeed() != null).assertTrue();
        });
        it('speed_calculator_test_019', 0, () => {
            expect(speedCalculator.lastSpeed()).assertInstanceOf('String');
        });
        it('speed_calculator_test_020', 0, () => {
            expect(speedCalculator.getInstantSpeedDurationMillis() > 0).assertTrue();
        });
        it('speed_calculator_test_021', 0, () => {
            expect(speedCalculator.getInstantSpeedDurationMillis() < 0).not().assertTrue();
        });
        it('speed_calculator_test_022', 0, () => {
            expect(speedCalculator.getInstantSpeedDurationMillis() != null).assertTrue();
        });
        it('speed_calculator_test_023', 0, () => {
            expect(speedCalculator.getInstantSpeedDurationMillis()).assertInstanceOf('Number');
        });
        it('speed_calculator_test_024', 0, () => {
            expect(speedCalculator.getSpeedWithBinaryAndFlush() != null).assertTrue();
        });
        it('speed_calculator_test_025', 0, () => {
            expect(speedCalculator.getSpeedWithBinaryAndFlush()).assertInstanceOf('String');
        });
        it('speed_calculator_test_026', 0, () => {
            expect(speedCalculator.getSpeedWithSIAndFlush() != null).assertTrue();
        });
        it('speed_calculator_test_027', 0, () => {
            expect(speedCalculator.getSpeedWithSIAndFlush()).assertInstanceOf('String');
        });
        it('speed_calculator_test_028', 0, () => {
            expect(speedCalculator.averageSpeed() != null).assertTrue();
        });
        it('speed_calculator_test_029', 0, () => {
            expect(speedCalculator.averageSpeed()).assertInstanceOf('String');
        });
        it('speed_calculator_test_030', 0, () => {
            expect(speedCalculator.speedFromBegin() != null).assertTrue();
        });
        it('speed_calculator_test_031', 0, () => {
            expect(speedCalculator.speedFromBegin()).assertInstanceOf('String');
        });
    });
}
