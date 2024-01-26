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
import RssiFilter from './RssiFilter';
/**
 * This filter calculates its rssi on base of an auto regressive moving average (ARMA)
 * It needs only the current value to do this; the general formula is  n(t) = n(t-1) - c * (n(t-1) - n(t))
 * where c is a coefficient, that denotes the smoothness - the lower the value, the smoother the average
 * Note: a smoother average needs longer to "settle down"
 * Note: For signals, that change rather frequently (say, 1Hz or faster) and tend to vary more a recommended
 *       value would be 0,1 (that means the actual value is changed by 10% of the difference between the
 *       actual measurement and the actual average)
 *       For signals at lower rates (10Hz) a value of 0.25 to 0.5 would be appropriate
 */
export default class ArmaRssiFilter implements RssiFilter {
    private static DEFAULT_ARMA_SPEED: number = 0.1; //How likely is it that the RSSI value changes?
    //Note: the more unlikely, the higher can that value be
    //      also, the lower the (expected) sending frequency,
    //      the higher should that value be
    private TAG: string = "ArmaRssiFilter";
    //initially set to min value
    private armaMeasurement: number;
    private armaSpeed: number = 0.1;
    private isInitialized: boolean = false;
    public constructor() {
        this.armaSpeed = ArmaRssiFilter.DEFAULT_ARMA_SPEED;
    }
    public addMeasurement(rssi: number): void {
        console.info(this.TAG, "adding rssi: %s", rssi);
        //use first measurement as initialization
        if (!this.isInitialized) {
            this.armaMeasurement = rssi;
            this.isInitialized = true;
        }
        ;
        this.armaMeasurement = (this.armaMeasurement - this.armaSpeed * (this.armaMeasurement - rssi)).valueOf();
        console.info(this.TAG, "armaMeasurement: %s", this.armaMeasurement);
    }
    public getMeasurementCount(): number {
        return 0;
    }
    public noMeasurementsAvailable(): boolean {
        return false;
    }
    public calculateRssi(): number {
        return this.armaMeasurement;
    }
    public static setDEFAULT_ARMA_SPEED(default_arma_speed: number): void {
        this.DEFAULT_ARMA_SPEED = default_arma_speed;
    }
}
