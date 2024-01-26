/*
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
import DistanceCalculator from './DistanceCalculator';
class CurveFittedDistanceCalculator implements DistanceCalculator {
    public static readonly TAG: string = "CurveFittedDistanceCalculator";
    private mCoefficient1: number;
    private mCoefficient2: number;
    private mCoefficient3: number;
    /**
         * Construct a calculator with coefficients specific for the device's signal vs. distance
         *
         * @param coefficient1
         * @param coefficient2
         * @param coefficient3
         */
    public constructor(coefficient1: number, coefficient2: number, coefficient3: number) {
        this.mCoefficient1 = coefficient1;
        this.mCoefficient2 = coefficient2;
        this.mCoefficient3 = coefficient3;
    }
    /**
         * Calculated the estimated distance in meters to the beacon based on a reference rssi at 1m
         * and the known actual rssi at the current location
         *
         * @param txPower
         * @param rssi
         * @return estimated distance
         */
    public calculateDistance(txPower: number, rssi: number): number {
        if (rssi == 0) {
            return -1.0; // if we cannot determine accuracy, return -1.
        }
        let ratio: number = rssi * 1.0 / txPower;
        let distance: number;
        if (ratio < 1.0) {
            distance = Math.pow(ratio, 10);
        }
        else {
            distance = (this.mCoefficient1) * Math.pow(ratio, this.mCoefficient2) + this.mCoefficient3;
        }
        return distance;
    }
}
export default CurveFittedDistanceCalculator;
