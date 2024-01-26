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
import Measurement from './Measurement';
import BeaconManager from '../BeaconManager';
import process from '@ohos.process';
export default class RunningAverageRssiFilter implements RssiFilter {
    private static readonly TAG: string = "RunningAverageRssiFilter";
    public static readonly DEFAULT_SAMPLE_EXPIRATION_MILLISECONDS: number = 20000; /* 20 seconds */
    private static sampleExpirationMilliseconds: number = 20000;
    private mMeasurements: Array<Measurement> = new Array<Measurement>();
    public constructor() {
    }
    public addMeasurement(rssi: number): void {
        var measurement: Measurement = new Measurement();
        measurement.rssi = rssi;
        measurement.timestamp = process.uptime() * 1000;
        this.mMeasurements.push(measurement);
    }
    public noMeasurementsAvailable(): boolean {
        return this.mMeasurements.length == 0;
    }
    public getMeasurementCount(): number {
        return this.mMeasurements.length;
    }
    public calculateRssi(): number {
        this.refreshMeasurements();
        var size: number = this.mMeasurements.length;
        var startIndex: number = 0;
        var endIndex: number = size - 1;
        if (size > 2) {
            startIndex = size / 10 + 1;
            endIndex = size - size / 10 - 2;
        }
        var sum: number = 0;
        for (var i: number = startIndex; i <= endIndex; i++) {
            sum += this.mMeasurements[i].rssi;
        }
        let runningAverage: number = sum / (endIndex - startIndex + 1);
        console.info("RunningAverageRssiFilter", "Running average mRssi based on %s measurements: %s", size, runningAverage);
        return runningAverage;
    }
    private refreshMeasurements(): void {
        var newMeasurements: Array<Measurement> = new Array<Measurement>();
        this.mMeasurements.forEach((measurement) => {
            if (BeaconManager.MOCK_DEVICE) {
                newMeasurements.push(measurement);
            }
            else {
                if (process.uptime() * 1000 - measurement.timestamp < RunningAverageRssiFilter.sampleExpirationMilliseconds) {
                    newMeasurements.push(measurement);
                }
            }
        });
        this.mMeasurements = newMeasurements;
    }
    public static setSampleExpirationMilliseconds(newSampleExpirationMilliseconds: number): void {
        RunningAverageRssiFilter.sampleExpirationMilliseconds = newSampleExpirationMilliseconds;
    }
    public static getSampleExpirationMilliseconds(): number {
        return RunningAverageRssiFilter.sampleExpirationMilliseconds;
    }
}
