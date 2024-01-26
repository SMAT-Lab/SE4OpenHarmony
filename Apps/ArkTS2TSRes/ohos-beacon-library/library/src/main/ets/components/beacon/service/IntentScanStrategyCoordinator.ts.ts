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
import ScanHelper from './ScanHelper';
import ScanState from './ScanState';
import Beacon from '../Beacon';
import BeaconManager from '../BeaconManager';
import ModelSpecificDistanceCalculator from '../distance/ModelSpecificDistanceCalculator';
import ExtraDataBeaconTracker from './ExtraDataBeaconTracker';
import Region from '../Region';
import ScanResult from './ScanResult';
export default class IntentScanStrategyCoordinator {
    private scanHelper: ScanHelper;
    private scanState: ScanState;
    private initialized: boolean = false;
    private started: boolean = false;
    private longScanForcingEnabled: boolean = false;
    private lastCycleEnd: number = 0;
    private strategyFailureDetectionCount: number = 0;
    private lastStrategyFailureDetectionCount: number = 0;
    private disableOnFailure: boolean = false;
    public ensureInitialized(): void {
        if (!this.initialized) {
            this.initialized = true;
            this.scanHelper = new ScanHelper();
            if (Beacon.getDistanceCalculator() == null) {
                var defaultDistanceCalculator = new ModelSpecificDistanceCalculator(BeaconManager.getDistanceModelUpdateUrl());
                Beacon.setDistanceCalculator(defaultDistanceCalculator);
            }
            this.reinitialize();
        }
    }
    public reinitialize(): void {
        if (!this.initialized) {
            this.ensureInitialized(); // this will call reinitialize
            return;
        }
        //        var newScanState = ScanState.restore();
        var newScanState;
        if (newScanState == null) {
            newScanState = new ScanState();
        }
        this.scanState = newScanState;
        this.scanState.setLastScanStartTimeMillis(new Date().getTime());
        this.scanHelper.setMonitoringStatus(this.scanState.getMonitoringStatus());
        this.scanHelper.setRangedRegionState(this.scanState.getRangedRegionState());
        this.scanHelper.setBeaconParsers(this.scanState.getBeaconParsers());
        this.scanHelper.setExtraDataBeaconTracker(this.scanState.getExtraBeaconDataTracker());
    }
    public applySettings(): void {
        this.scanState.applyChanges(BeaconManager.getInstanceForApplication());
        this.reinitialize();
    }
    public start(): void {
        this.started = true;
        this.ensureInitialized();
        var beaconManager = BeaconManager.getInstanceForApplication();
        this.scanHelper.setExtraDataBeaconTracker(new ExtraDataBeaconTracker());
        //        beaconManager.setScannerInSameProcess(true)
        this.longScanForcingEnabled = true;
        this.scanHelper.reloadParsers();
        console.debug("ExtraDataBeaconTracker", "starting background scan");
        var regions = new Set<Region>();
        var wildcardRegions = new Set<Region>();
        beaconManager.getRangedRegions().forEach((region, key, set) => {
            if (region.getIdentifiers().length == 0) {
                wildcardRegions.add(region);
            }
            else {
                regions.add(region);
            }
        });
        for (let region of beaconManager.getRangedRegions()) {
            if (region.getIdentifiers().length == 0) {
                wildcardRegions.add(region);
            }
            else {
                regions.add(region);
            }
        }
        if (wildcardRegions.size > 0) {
            if (regions.size > 0) {
                console.warn("IntentScanStrategyCoordinator", "Wildcard regions are being used for beacon ranging or monitoring.  The wildcard regions are ignored with intent scan strategy active.");
            }
            else {
                regions = wildcardRegions;
            }
        }
        this.lastCycleEnd = new Date().getTime();
    }
    public stop(): void {
        this.ensureInitialized();
        console.warn("IntentScanStrategyCoordinator", "stopping background scan");
        this.started = false;
    }
    public restartBackgroundScan(): void {
        this.ensureInitialized();
        console.debug("IntentScanStrategyCoordinator", "restarting background scan");
    }
    public processScanResults(scanResults: Array<ScanResult>): void {
        this.ensureInitialized();
        for (let scanResult of scanResults) {
            if (scanResult != null) {
                this.scanHelper.processScanResult(scanResult.device, scanResult.rssi, scanResult.scanRecord, new Date().getTime());
            }
        }
        let now: number = new Date().getTime();
        let beaconManager = BeaconManager.getInstanceForApplication();
        var scanPeriod = beaconManager.getScanPeriod();
        if (now - this.lastCycleEnd > scanPeriod) {
            console.debug("IntentScanStrategyCoordinator", "End of scan cycle");
            this.lastCycleEnd = now;
            this.scanHelper.getCycledLeScanCallback().onCycleEnd(this.scanHelper);
        }
    }
    public performPeriodicProcessing(): void {
        this.processScanResults(new Array<ScanResult>());
    }
}
