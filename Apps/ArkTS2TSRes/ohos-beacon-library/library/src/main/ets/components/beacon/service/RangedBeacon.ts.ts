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
import ArmaRssiFilter from './ArmaRssiFilter';
import BeaconManager from '../BeaconManager';
import process from '@ohos.process';
import RssiFilter from './RssiFilter';
import Beacon from '../Beacon';
import RunningAverageRssiFilter from './RunningAverageRssiFilter';
export default class RangedBeacon {
    private static readonly TAG: string = "RangedBeacon";
    public static readonly DEFAULT_MAX_TRACKING_AGE: number = 5000; /* 5 Seconds */
    public static maxTrackingAge: number = 5000; /* 5 Seconds */
    //kept here for backward compatibility
    public static readonly DEFAULT_SAMPLE_EXPIRATION_MILLISECONDS: number = 20000; /* 20 seconds */
    private static sampleExpirationMilliseconds: number = 20000;
    private mTracked: boolean = true;
    protected lastTrackedTimeMillis: number = 0;
    private mBeacon: Beacon;
    protected mFilter: RssiFilter = null;
    private packetCount: number = 0;
    private firstCycleDetectionTimestamp: number = 0;
    private lastCycleDetectionTimestamp: number = 0;
    public constructor(beacon: Beacon) {
        this.updateBeacon(beacon);
    }
    public updateBeacon(beacon: Beacon): void {
        this.packetCount += 1;
        this.mBeacon = beacon;
        if (this.firstCycleDetectionTimestamp == 0) {
            this.firstCycleDetectionTimestamp = beacon.getFirstCycleDetectionTimestamp();
        }
        this.lastCycleDetectionTimestamp = beacon.getLastCycleDetectionTimestamp();
        this.addMeasurement(this.mBeacon.getRssi());
    }
    public isTracked(): boolean {
        return this.mTracked;
    }
    public setTracked(tracked: boolean): void {
        this.mTracked = tracked;
    }
    public getBeacon(): Beacon {
        return this.mBeacon;
    }
    // Done at the end of each cycle before data are sent to the client
    public commitMeasurements(): void {
        if (!this.getFilter().noMeasurementsAvailable()) {
            var runningAverage: number = this.getFilter().calculateRssi();
            this.mBeacon.setRunningAverageRssi(runningAverage);
            this.mBeacon.setRssiMeasurementCount(this.getFilter().getMeasurementCount());
            console.debug("RangedBeacon", "calculated new runningAverageRssi: %s", runningAverage);
        }
        else {
            console.debug("RangedBeacon", "No measurements available to calculate running average");
        }
        this.mBeacon.setPacketCount(this.packetCount);
        this.mBeacon.setFirstCycleDetectionTimestamp(this.firstCycleDetectionTimestamp);
        this.mBeacon.setLastCycleDetectionTimestamp(this.lastCycleDetectionTimestamp);
        this.packetCount = 0;
        this.firstCycleDetectionTimestamp = 0;
        this.lastCycleDetectionTimestamp = 0;
    }
    public addMeasurement(rssi: number): void {
        if (rssi != 127) {
            this.mTracked = true;
            this.lastTrackedTimeMillis = process.uptime() * 1000;
            this.getFilter().addMeasurement(rssi);
        }
    }
    //kept here for backward compatibility
    public static setSampleExpirationMilliseconds(milliseconds: number): void {
        this.sampleExpirationMilliseconds = milliseconds;
        RunningAverageRssiFilter.setSampleExpirationMilliseconds(this.sampleExpirationMilliseconds);
    }
    public static setMaxTrackinAge(maxTrackinAge: number): void {
        this.maxTrackingAge = maxTrackinAge;
    }
    public noMeasurementsAvailable(): boolean {
        return this.getFilter().noMeasurementsAvailable();
    }
    public getTrackingAge(): number {
        return process.uptime() * 1000 - this.lastTrackedTimeMillis;
    }
    public isExpired(): boolean {
        return this.getTrackingAge() > RangedBeacon.maxTrackingAge;
    }
    private getFilter(): RssiFilter {
        if (this.mFilter == null) {
            //set RSSI filter
            if (BeaconManager.getRssiFilterImplClass() == "ArmaRssiFilter") {
                this.mFilter = new ArmaRssiFilter();
            }
            else {
                this.mFilter = new RunningAverageRssiFilter();
            }
        }
        return this.mFilter;
    }
    public setFilter(rssiFilter: RssiFilter) {
        this.mFilter = rssiFilter;
    }
    public getRssiFilter(): RssiFilter {
        return this.mFilter;
    }
}
