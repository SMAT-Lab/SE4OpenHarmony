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
import SettingsData from './SettingsData';
import Callback from './Callback';
import BeaconLocalBroadcastProcessor from '../BeaconLocalBroadcastProcessor';
import Beacon from '../Beacon';
import DistanceCalculator from '../distance/DistanceCalculator';
import ModelSpecificDistanceCalculator from '../distance/ModelSpecificDistanceCalculator';
import BeaconManager from '../BeaconManager';
import ExtraDataBeaconTracker from './ExtraDataBeaconTracker';
import BeaconParser from '../BeaconParser';
import RangeState from './RangeState';
import MonitoringStatus from './MonitoringStatus';
import ScanHelper from './ScanHelper';
import Region from '../Region';
import { Message } from '../utils/Handler';
import StartRMData from './StartRMData';
export default class BeaconService {
    public static readonly TAG: string = "BeaconService";
    private mScanHelper: ScanHelper;
    private mBeaconNotificationProcessor: BeaconLocalBroadcastProcessor;
    public static readonly MSG_START_RANGING: number = 2;
    public static readonly MSG_STOP_RANGING: number = 3;
    public static readonly MSG_START_MONITORING: number = 4;
    public static readonly MSG_STOP_MONITORING: number = 5;
    public static readonly MSG_SET_SCAN_PERIODS: number = 6;
    public static readonly MSG_SYNC_SETTINGS: number = 7;
    protected static sInstance: BeaconService = null;
    public static getBeaconServiceInstance(): BeaconService {
        if (this.sInstance == null) {
            this.sInstance = new BeaconService();
        }
        return this.sInstance;
    }
    private constructor() {
        this.onCreate();
    }
    public onCreate(): void {
        this.mScanHelper = new ScanHelper();
        if (this.mScanHelper.getCycledScanner() == null) {
            this.mScanHelper.createCycledLeScanner(false);
        }
        this.mScanHelper.setMonitoringStatus(MonitoringStatus.getInstanceForApplication());
        this.mScanHelper.setRangedRegionState(new Map<Region, RangeState>());
        this.mScanHelper.setBeaconParsers(new Set<BeaconParser>());
        this.mScanHelper.setExtraDataBeaconTracker(new ExtraDataBeaconTracker(true));
        this.mScanHelper.reloadParsers();
        let defaultDistanceCalculator: DistanceCalculator = new ModelSpecificDistanceCalculator(BeaconManager.getDistanceModelUpdateUrl());
        Beacon.setDistanceCalculator(defaultDistanceCalculator);
    }
    public setSimulatedScanData(scanData: Array<Beacon>) {
        this.mScanHelper.setSimulatedScanData(scanData);
    }
    public onDestroy(): void {
        console.error(BeaconService.TAG, "onDestroy()");
        if (this.mBeaconNotificationProcessor != null) {
            this.mBeaconNotificationProcessor.unregister();
        }
        console.log(BeaconService.TAG, "onDestroy called.  stopping scanning");
        if (this.mScanHelper.getCycledScanner() != null) {
            this.mScanHelper.getCycledScanner().stop();
            this.mScanHelper.getCycledScanner().destroy();
        }
    }
    public startRangingBeaconsInRegion(region: Region, callback: Callback): void {
        if (this.mScanHelper.getRangedRegionState().has(region)) {
            console.log(BeaconService.TAG, "Already ranging that region -- will replace existing region.");
            // Need to explicitly remove because only value is updated for equals keys.
            this.mScanHelper.getRangedRegionState().delete(region);
        }
        this.mScanHelper.getRangedRegionState().set(region, new RangeState(callback));
        console.debug(BeaconService.TAG, "Currently ranging %s regions.", this.mScanHelper.getRangedRegionState().size);
        if (this.mScanHelper.getCycledScanner() != null) {
            this.mScanHelper.getCycledScanner().start(this.mScanHelper);
        }
    }
    public stopRangingBeaconsInRegion(region: Region): void {
        let rangedRegionCount: number;
        for (let exsitRegion of this.mScanHelper.getRangedRegionState().keys()) {
            if (exsitRegion.equals(region)) {
                this.mScanHelper.getRangedRegionState().delete(exsitRegion);
            }
        }
        rangedRegionCount = this.mScanHelper.getRangedRegionState().size;
        console.debug(BeaconService.TAG, "Currently ranging %s regions.", this.mScanHelper.getRangedRegionState().size);
        if (rangedRegionCount == 0 && this.mScanHelper.getMonitoringStatus().regionsCount() == 0) {
            if (this.mScanHelper.getCycledScanner() != null) {
                this.mScanHelper.getCycledScanner().stop();
            }
        }
    }
    public setScanPeriods(scanPeriod: number, betweenScanPeriod: number, backgroundFlag: boolean): void {
        if (this.mScanHelper.getCycledScanner() != null) {
            this.mScanHelper.getCycledScanner().setScanPeriods(scanPeriod, betweenScanPeriod, backgroundFlag);
        }
    }
    public startMonitoringBeaconsInRegion(region: Region, callback: Callback): void {
        console.debug(BeaconService.TAG, "startMonitoring called");
        this.mScanHelper.getMonitoringStatus().addRegion(region, callback);
        console.debug(BeaconService.TAG, "Currently monitoring %s regions.", this.mScanHelper.getMonitoringStatus()
            .regionsCount());
        if (this.mScanHelper.getCycledScanner() != null) {
            this.mScanHelper.getCycledScanner().start(this.mScanHelper);
        }
    }
    public stopMonitoringBeaconsInRegion(region: Region): void {
        console.debug(BeaconService.TAG, "stopMonitoring called");
        this.mScanHelper.getMonitoringStatus().removeRegion(region);
        console.debug(BeaconService.TAG, "Currently monitoring %s regions.", this.mScanHelper.getMonitoringStatus()
            .regionsCount());
        if (this.mScanHelper.getMonitoringStatus().regionsCount() == 0 &&
            this.mScanHelper.getRangedRegionState().size == 0) {
            if (this.mScanHelper.getCycledScanner() != null) {
                this.mScanHelper.getCycledScanner().stop();
            }
        }
    }
    public reloadParsers(): void {
        this.mScanHelper.reloadParsers();
    }
    public handleMessage(msg: Message): void {
        if (BeaconService.sInstance != null) {
            let startRMData: StartRMData = StartRMData.fromBundle(msg.getData());
            if (startRMData != null) {
                switch (msg.what) {
                    case BeaconService.MSG_START_RANGING:
                        console.log("start ranging received");
                        BeaconService.getBeaconServiceInstance()
                            .setScanPeriods(startRMData.getScanPeriod(), startRMData.getBetweenScanPeriod(), startRMData.getBackgroundFlag());
                        BeaconService.getBeaconServiceInstance()
                            .startRangingBeaconsInRegion(startRMData.getRegionData(), new Callback(startRMData.getCallbackPackageName()));
                        break;
                    case BeaconService.MSG_STOP_RANGING:
                        console.log("stop ranging received");
                        BeaconService.getBeaconServiceInstance()
                            .setScanPeriods(startRMData.getScanPeriod(), startRMData.getBetweenScanPeriod(), startRMData.getBackgroundFlag());
                        BeaconService.getBeaconServiceInstance().stopRangingBeaconsInRegion(startRMData.getRegionData());
                        break;
                    case BeaconService.MSG_START_MONITORING:
                        console.log("start monitoring received");
                        BeaconService.getBeaconServiceInstance()
                            .setScanPeriods(startRMData.getScanPeriod(), startRMData.getBetweenScanPeriod(), startRMData.getBackgroundFlag());
                        BeaconService.getBeaconServiceInstance()
                            .startMonitoringBeaconsInRegion(startRMData.getRegionData(), new Callback(startRMData.getCallbackPackageName()));
                        break;
                    case BeaconService.MSG_STOP_MONITORING:
                        console.log("stop monitoring received");
                        BeaconService.getBeaconServiceInstance()
                            .setScanPeriods(startRMData.getScanPeriod(), startRMData.getBetweenScanPeriod(), startRMData.getBackgroundFlag());
                        BeaconService.getBeaconServiceInstance().stopMonitoringBeaconsInRegion(startRMData.getRegionData());
                        break;
                    case BeaconService.MSG_SET_SCAN_PERIODS:
                        console.log("set scan intervals received");
                        BeaconService.getBeaconServiceInstance()
                            .setScanPeriods(startRMData.getScanPeriod(), startRMData.getBetweenScanPeriod(), startRMData.getBackgroundFlag());
                        break;
                }
            }
            else if (msg.what == BeaconService.MSG_SYNC_SETTINGS) {
                console.log("Received settings update from other process");
                let settingsData: SettingsData = SettingsData.fromBundle(msg.getData());
                if (settingsData != null) {
                    settingsData.apply();
                }
                else {
                    console.log("Settings data missing");
                }
            }
            else {
                console.log("Received unknown message from other process : " + msg.what);
            }
        }
    }
}
