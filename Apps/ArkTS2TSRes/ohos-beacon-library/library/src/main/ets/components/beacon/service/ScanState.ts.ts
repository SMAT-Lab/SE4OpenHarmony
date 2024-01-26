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
import Callback from './Callback';
import BeaconManager from '../BeaconManager';
import RangeState from './RangeState';
import Region from '../Region';
import BeaconParser from '../BeaconParser';
import MonitoringStatus from './MonitoringStatus';
import ExtraDataBeaconTracker from './ExtraDataBeaconTracker';
export default class ScanState {
    private static readonly TAG: string = "ScanState";
    public MIN_SCAN_JOB_INTERVAL_MILLIS: number = 300000; //  5 minutes
    private mRangedRegionState: Map<Region, RangeState> = new Map();
    private mMonitoringStatus: MonitoringStatus;
    private mBeaconParsers: Set<BeaconParser> = new Set<BeaconParser>();
    private mExtraBeaconDataTracker: ExtraDataBeaconTracker = new ExtraDataBeaconTracker(true);
    private mForegroundBetweenScanPeriod: number;
    private mBackgroundBetweenScanPeriod: number;
    private mForegroundScanPeriod: number;
    private mBackgroundScanPeriod: number;
    private mBackgroundMode: boolean;
    private mLastScanStartTimeMillis: number = 0;
    public getBackgroundMode(): boolean {
        return this.mBackgroundMode;
    }
    public setBackgroundMode(backgroundMode: boolean): void {
        this.mBackgroundMode = backgroundMode;
    }
    public getBackgroundBetweenScanPeriod(): number {
        return this.mBackgroundBetweenScanPeriod;
    }
    public setBackgroundBetweenScanPeriod(backgroundBetweenScanPeriod: number): void {
        this.mBackgroundBetweenScanPeriod = backgroundBetweenScanPeriod;
    }
    public getBackgroundScanPeriod(): number {
        return this.mBackgroundScanPeriod;
    }
    public setBackgroundScanPeriod(backgroundScanPeriod: number): void {
        this.mBackgroundScanPeriod = backgroundScanPeriod;
    }
    public getForegroundBetweenScanPeriod(): number {
        return this.mForegroundBetweenScanPeriod;
    }
    public setForegroundBetweenScanPeriod(foregroundBetweenScanPeriod: number): void {
        this.mForegroundBetweenScanPeriod = foregroundBetweenScanPeriod;
    }
    public getForegroundScanPeriod(): number {
        return this.mForegroundScanPeriod;
    }
    public setForegroundScanPeriod(foregroundScanPeriod: number): void {
        this.mForegroundScanPeriod = foregroundScanPeriod;
    }
    public constructor() {
    }
    public getMonitoringStatus(): MonitoringStatus {
        return this.mMonitoringStatus;
    }
    public setMonitoringStatus(monitoringStatus: MonitoringStatus): void {
        this.mMonitoringStatus = monitoringStatus;
    }
    public getRangedRegionState(): Map<Region, RangeState> {
        return this.mRangedRegionState;
    }
    public setRangedRegionState(rangedRegionState: Map<Region, RangeState>): void {
        this.mRangedRegionState = rangedRegionState;
    }
    public getExtraBeaconDataTracker(): ExtraDataBeaconTracker {
        return this.mExtraBeaconDataTracker;
    }
    public setExtraBeaconDataTracker(extraDataBeaconTracker: ExtraDataBeaconTracker): void {
        this.mExtraBeaconDataTracker = extraDataBeaconTracker;
    }
    public getBeaconParsers(): Set<BeaconParser> {
        return this.mBeaconParsers;
    }
    public setBeaconParsers(beaconParsers: Set<BeaconParser>): void {
        this.mBeaconParsers = beaconParsers;
    }
    public getLastScanStartTimeMillis(): number {
        return this.mLastScanStartTimeMillis;
    }
    public setLastScanStartTimeMillis(time: number): void {
        this.mLastScanStartTimeMillis = time;
    }
    public getScanJobIntervalMillis(): number {
        var cyclePeriodMillis: number;
        if (this.getBackgroundMode()) {
            cyclePeriodMillis = this.getBackgroundScanPeriod() + this.getBackgroundBetweenScanPeriod();
        }
        else {
            cyclePeriodMillis = this.getForegroundScanPeriod() + this.getForegroundBetweenScanPeriod();
        }
        var scanJobIntervalMillis: number = this.MIN_SCAN_JOB_INTERVAL_MILLIS;
        if (cyclePeriodMillis > this.MIN_SCAN_JOB_INTERVAL_MILLIS) {
            scanJobIntervalMillis = cyclePeriodMillis;
        }
        return scanJobIntervalMillis;
    }
    public getScanJobRuntimeMillis(): number {
        var scanPeriodMillis: number;
        console.debug("ScanState", "ScanState says background mode for ScanJob is " + this.getBackgroundMode());
        if (this.getBackgroundMode()) {
            scanPeriodMillis = this.getBackgroundScanPeriod();
        }
        else {
            scanPeriodMillis = this.getForegroundScanPeriod();
        }
        if (!this.getBackgroundMode()) {
            // if we are in the foreground, we keep the scan job going for the minimum interval
            if (scanPeriodMillis < this.MIN_SCAN_JOB_INTERVAL_MILLIS) {
                return this.MIN_SCAN_JOB_INTERVAL_MILLIS;
            }
        }
        return scanPeriodMillis;
    }
    public applyChanges(beaconManager: BeaconManager): void {
        let tempBeaconParsers: Set<BeaconParser>;
        for (let beaconParser of beaconManager.getBeaconParsers()) {
            tempBeaconParsers.add(beaconParser);
        }
        this.mBeaconParsers = tempBeaconParsers;
        this.mForegroundScanPeriod = beaconManager.getScanPeriod();
        this.mForegroundBetweenScanPeriod = beaconManager.getBetweenScanPeriod();
        let existingMonitoredRegions: Set<Region> = this.mMonitoringStatus.regions();
        let existingRangedRegions: Set<Region> = new Set();
        for (let region of this.mRangedRegionState.keys()) {
            existingRangedRegions.add(region);
        }
        let newMonitoredRegions: Set<Region> = beaconManager.getMonitoredRegions();
        let newRangedRegions: Set<Region> = beaconManager.getRangedRegions();
        console.debug(ScanState.TAG, "ranged regions: old=" + existingRangedRegions.size + " new=" + newRangedRegions.size);
        console.debug(ScanState.TAG, "monitored regions: old=" + existingMonitoredRegions.size + " new=" + newMonitoredRegions.size);
        for (let newRangedRegion of newRangedRegions) {
            if (!existingRangedRegions.has(newRangedRegion)) {
                console.debug(ScanState.TAG, "Starting ranging region: " + newRangedRegion);
                this.mRangedRegionState.set(newRangedRegion, new RangeState(new Callback('ScanState')));
            }
        }
        for (let existingRangedRegion of existingRangedRegions) {
            if (!newRangedRegions.has(existingRangedRegion)) {
                console.debug(ScanState.TAG, "Stopping ranging region: " + existingRangedRegion);
                this.mRangedRegionState.delete(existingRangedRegion);
            }
        }
        console.debug(ScanState.TAG, "Updated state with " + newRangedRegions.size + " ranging regions and " + newMonitoredRegions.size + " monitoring regions.");
    }
}
