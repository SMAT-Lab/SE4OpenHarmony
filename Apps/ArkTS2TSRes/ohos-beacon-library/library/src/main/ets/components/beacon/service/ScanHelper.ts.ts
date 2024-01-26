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
import CycledLeScanner from './scanner/CycledLeScanner';
import CycledLeScannerForLollipop from './scanner/CycledLeScannerForLollipop';
import BeaconManager from '../BeaconManager';
import MonitoringStatus from './MonitoringStatus';
import Region from '../Region';
import RangeState from './RangeState';
import ExtraDataBeaconTracker from './ExtraDataBeaconTracker';
import Beacon from '../Beacon';
import DistinctPacketDetector from './scanner/DistinctPacketDetector';
import { NonBeaconLeScanCallback } from './scanner/NonBeaconLeScanCallback';
import Stats from './Stats';
import BeaconParser from '../BeaconParser';
import CycledLeScanCallback from './scanner/CycledLeScanCallback';
import RangingData from './RangingData';
export default class ScanHelper {
    private static readonly TAG: string = "ScanHelper";
    private mBeaconManager: BeaconManager;
    private mCycledScanner: CycledLeScanner;
    private mMonitoringStatus: MonitoringStatus;
    private mRangedRegionState: Map<Region, RangeState> = new Map<Region, RangeState>();
    private mDistinctPacketDetector: DistinctPacketDetector = new DistinctPacketDetector();
    private mExtraDataBeaconTracker: ExtraDataBeaconTracker = new ExtraDataBeaconTracker(false);
    private mBeaconParsers: Set<BeaconParser> = new Set<BeaconParser>();
    private mSimulatedScanData: Array<Beacon> = null;
    constructor() {
        console.debug("ScanHelper", "new ScanHelper");
        this.mBeaconManager = BeaconManager.getInstanceForApplication();
    }
    public getCycledScanner(): CycledLeScanner {
        return this.mCycledScanner;
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
        console.debug("ScanHelper", "rangeRegionState updated with %d regions", rangedRegionState.size);
        this.mRangedRegionState.clear();
        rangedRegionState.forEach((rangeState, region, map) => {
            this.mRangedRegionState.set(region, rangeState);
        });
    }
    public setExtraDataBeaconTracker(extraDataBeaconTracker: ExtraDataBeaconTracker): void {
        this.mExtraDataBeaconTracker = extraDataBeaconTracker;
    }
    public setBeaconParsers(beaconParsers: Set<BeaconParser>): void {
        this.mBeaconParsers = beaconParsers;
    }
    public setSimulatedScanData(simulatedScanData: Array<Beacon>): void {
        this.mSimulatedScanData = simulatedScanData;
    }
    public createCycledLeScanner(backgroundMode: boolean): void {
        this.mCycledScanner = new CycledLeScannerForLollipop(BeaconManager.DEFAULT_FOREGROUND_SCAN_PERIOD, BeaconManager.DEFAULT_FOREGROUND_BETWEEN_SCAN_PERIOD, backgroundMode, this.mCycledLeScanCallback);
    }
    public processScanResult(deviceId: string, rssi: number, scanRecord: ArrayBuffer, timestampMs: number): void {
        this.LocalProcessScanResult(deviceId, rssi, scanRecord, timestampMs);
    }
    public reloadParsers(): void {
        var newBeaconParsers: Array<BeaconParser> = new Array();
        //flatMap all beacon parsers
        var matchBeaconsByServiceUUID: boolean = true;
        newBeaconParsers = this.mBeaconManager.getBeaconParsers();
        this.mBeaconManager.getBeaconParsers().forEach((beaconParser) => {
            if (beaconParser.getExtraDataParsers().length > 0) {
                matchBeaconsByServiceUUID = false;
                newBeaconParsers.concat(beaconParser.getExtraDataParsers());
            }
        });
        var tempSet: Set<BeaconParser> = new Set();
        for (let value of newBeaconParsers) {
            tempSet.add(value);
        }
        this.mBeaconParsers = tempSet;
        //initialize the extra data beacon tracker
        this.mExtraDataBeaconTracker = new ExtraDataBeaconTracker(matchBeaconsByServiceUUID);
    }
    public mCycledLeScanCallback: CycledLeScanCallback = {
        onLeScan(scanHelper: ScanHelper, device: string, rssi: number, scanRecord: ArrayBuffer, timestampMs: number): void {
            scanHelper.processScanResult(device, rssi, scanRecord, timestampMs);
        },
        onCycleEnd(scanHelper: ScanHelper): void {
            scanHelper.mDistinctPacketDetector.clearDetections();
            scanHelper.mMonitoringStatus.updateNewlyOutside();
            scanHelper.processRangeData();
        }
    };
    public setCycledLeScanCallback(cycledLeScanCallback: CycledLeScanCallback): void {
        this.mCycledLeScanCallback = cycledLeScanCallback;
    }
    public getCycledLeScanCallback(): CycledLeScanCallback {
        return this.mCycledLeScanCallback;
    }
    private processRangeData(): void {
        console.debug("ScanHelper", "processRangeData" + JSON.stringify(this.mRangedRegionState));
        this.mRangedRegionState.forEach((rangeState, region, map) => {
            //      let  rangeState:RangeState = this.mRangedRegionState.get(region);
            rangeState.getCallback().call("rangingData", new RangingData(rangeState.finalizeBeacons(), region).toBundle());
        });
    }
    /**
       * Helper for processing BLE beacons. This has been extracted from {@link ScanHelper.ScanProcessor} to
       * support simulated scan data for test and debug environments.
       * <p>
       * Processing beacons is a frequent and expensive operation. It should not be run on the main
       * thread to avoid UI contention.
       */
    private processBeaconFromScan(beacon: Beacon): void {
        if (Stats.getInstance().isEnabled()) {
            Stats.getInstance().log(beacon);
        }
        console.debug("ScanHelper", "beacon detected :" + beacon.toString());
        beacon = this.mExtraDataBeaconTracker.track(beacon);
        // If this is a Gatt beacon that should be ignored, it will be set to null as a result of
        // the above
        if (beacon == null) {
            console.debug("ScanHelper", "not processing detections for GATT extra data beacon");
        }
        else {
            this.mMonitoringStatus.updateNewlyInsideInRegionsContaining(beacon);
            let matchedRegions: Array<Region>;
            let rangeRegion: Array<Region> = new Array();
            for (let key of this.mRangedRegionState.keys()) {
                rangeRegion.push(key);
            }
            matchedRegions = this.matchingRegions(beacon, rangeRegion);
            for (let region of matchedRegions) {
                console.debug("ScanHelper", "matches ranging region: %s", region);
                let rangeState: RangeState = this.mRangedRegionState.get(region);
                if (rangeState != null) {
                    rangeState.addBeacon(beacon);
                }
            }
        }
    }
    public anyBeaconsDetectedThisCycle(): boolean {
        this.mRangedRegionState.forEach((rangeState, key, map) => {
            if (rangeState.count() > 0) {
                return true;
            }
        });
        return this.mMonitoringStatus.insideAnyRegion();
    }
    private matchingRegions(beacon: Beacon, regions: Array<Region>): Array<Region> {
        var matched: Array<Region> = new Array();
        console.debug("ScanHelper", "matchingRegions:" + JSON.stringify(regions));
        console.debug("ScanHelper", "matchingRegions beacon:" + JSON.stringify(beacon));
        regions.forEach((region) => {
            // Need to check if region is null in case it was removed from the collection by
            // another thread during iteration
            console.debug("ScanHelper", "matchingRegions match:" + region.matchesBeacon(beacon));
            if (region != null) {
                if (region.matchesBeacon(beacon)) {
                    matched.push(region);
                }
                else {
                    console.debug("ScanHelper", "This region (%s) does not match beacon: %s", region, beacon);
                }
            }
        });
        return matched;
    }
    private LocalProcessScanResult(deviceId: string, rssi: number, scanRecord: ArrayBuffer, timestampMs: number): void {
        let beacon: Beacon = null;
        for (let parser of this.mBeaconParsers) {
            console.debug("ScanHelper LocalProcessScanResult deviceId:" + deviceId);
            console.debug("ScanHelper LocalProcessScanResult rssi:" + rssi);
            console.debug("ScanHelper LocalProcessScanResult scanRecord:" + JSON.stringify(scanRecord));
            console.debug("ScanHelper LocalProcessScanResult timestampMs:" + timestampMs);
            beacon = parser.fromScanData(scanRecord, rssi, deviceId, timestampMs);
            console.debug("ScanHelper LocalProcessScanResult:" + JSON.stringify(beacon));
            if (beacon != null) {
                break;
            }
        }
        if (beacon != null) {
            this.processBeaconFromScan(beacon);
        }
        else {
            let mNonBeaconLeScanCallback: NonBeaconLeScanCallback = this.mBeaconManager.getNonBeaconLeScanCallback();
            if (mNonBeaconLeScanCallback != null) {
                mNonBeaconLeScanCallback.onNonBeaconLeScan(deviceId, rssi, scanRecord);
            }
        }
        return null;
    }
}
