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
import DeviceAttribute from './distance/DeviceAttritube';
import DeviceModelList from './distance/DeviceModelList';
import IntentScanStrategyCoordinator from './service/IntentScanStrategyCoordinator';
import AltBeaconParser from './AltBeaconParser';
import BeaconParser from './BeaconParser';
import RangeNotifier from './RangeNotifier';
import MonitorNotifier from './MonitorNotifier';
import MonitoringStatus from './service/MonitoringStatus';
import SettingsData from './service/SettingsData';
import StartRMData from './service/StartRMData';
import BeaconService from './service/BeaconService';
import { Message } from './utils/Handler';
import Region from './Region';
import { NonBeaconLeScanCallback } from './service/scanner/NonBeaconLeScanCallback';
class BeaconManager {
    public static readonly DEFAULT_FOREGROUND_SCAN_PERIOD: number = 1100;
    public static readonly DEFAULT_FOREGROUND_BETWEEN_SCAN_PERIOD: number = 0;
    protected static distanceModelUpdateUrl: string = "xxx/xxx-distance.json";
    public static readonly MOCK_DEVICE = false;
    protected static sInstance: BeaconManager = null;
    private scanPeriod: number = 1100;
    private betweenScanPeriod: number = 0;
    private beaconParsers: Array<BeaconParser> = [];
    protected monitorNotifiers: Set<MonitorNotifier> = new Set();
    protected rangeNotifiers: Set<RangeNotifier> = new Set();
    private mNonBeaconLeScanCallback: NonBeaconLeScanCallback;
    protected dataRequestNotifier: RangeNotifier = null;
    protected static rssiFilterImplClass: string = "RunningAverageRssiFilter";
    public static sExitRegionPeriod: number = 10000;
    private mIntentScanStrategyCoordinator: IntentScanStrategyCoordinator = null;
    private rangedRegions: Set<Region> = new Set();
    public static getInstanceForApplication(): BeaconManager {
        if (this.sInstance == null) {
            this.sInstance = new BeaconManager();
        }
        return this.sInstance;
    }
    protected constructor() {
        this.beaconParsers.push(new AltBeaconParser());
    }
    public getBeaconParsers(): Array<BeaconParser> {
        return this.beaconParsers;
    }
    public clearBeaconParsers() {
        this.beaconParsers = new Array();
    }
    public startMonitoring(region: Region): void {
        this.applyChangesToServices(BeaconService.MSG_START_MONITORING, region);
    }
    private applyChangesToServices(msgType: number, region: Region): void {
        let msg: Message = new Message(null, msgType, null);
        msg.what = msgType;
        if (msgType == BeaconService.MSG_SET_SCAN_PERIODS) {
            msg.setData(new StartRMData(null, null, this.getScanPeriod(), this.getBetweenScanPeriod(), null).toBundle());
        }
        else if (msgType == BeaconService.MSG_SYNC_SETTINGS) {
            msg.setData(new SettingsData().toBundle());
        }
        else {
            msg.setData(new StartRMData(region, this.callbackPackageName(), this.getScanPeriod(), this.getBetweenScanPeriod(), null).toBundle());
        }
        BeaconService.getBeaconServiceInstance().handleMessage(msg);
    }
    public getScanPeriod(): number {
        return this.scanPeriod;
    }
    public getBetweenScanPeriod(): number {
        return this.betweenScanPeriod;
    }
    private callbackPackageName(): string {
        return 'beaconLibrary';
    }
    public getMonitoringNotifiers(): Set<MonitorNotifier> {
        return this.monitorNotifiers;
    }
    public addMonitorNotifier(notifier: MonitorNotifier): void {
        //noinspection ConstantConditions
        if (notifier != null) {
            this.monitorNotifiers.add(notifier);
        }
    }
    public static getDistanceModelUpdateUrl(): string {
        return this.distanceModelUpdateUrl;
    }
    public static setDistanceModelUpdateUrl(url: string): void {
        //        warnIfScannerNotInSameProcess();
        this.distanceModelUpdateUrl = url;
    }
    public setNonBeaconLeScanCallback(callback: NonBeaconLeScanCallback): void {
        this.mNonBeaconLeScanCallback = callback;
    }
    public getNonBeaconLeScanCallback(): NonBeaconLeScanCallback {
        return this.mNonBeaconLeScanCallback;
    }
    public setDataRequestNotifier(notifier: RangeNotifier): void {
        this.dataRequestNotifier = notifier;
    }
    public getDataRequestNotifier(): RangeNotifier {
        return this.dataRequestNotifier;
    }
    public getRangingNotifiers(): Set<RangeNotifier> {
        return this.rangeNotifiers;
    }
    public addRangeNotifier(notifier: RangeNotifier): void {
        //noinspection ConstantConditions
        if (notifier != null) {
            this.rangeNotifiers.add(notifier);
        }
    }
    public setRangeNotifier(notifier: RangeNotifier): void {
        this.rangeNotifiers.clear();
        if (null != notifier) {
            this.addRangeNotifier(notifier);
        }
    }
    public startRangingBeacons(region: Region): void {
        this.rangedRegions.delete(region);
        this.rangedRegions.add(region);
        this.applyChangesToServices(BeaconService.MSG_START_RANGING, region);
    }
    public static useArmaRssiFilter(): void {
        BeaconManager.rssiFilterImplClass = "ArmaRssiFilter";
    }
    public static getRssiFilterImplClass(): string {
        return BeaconManager.rssiFilterImplClass;
    }
    public static setRegionExitPeriod(redionExitPeriod: number): void {
        this.sExitRegionPeriod = redionExitPeriod;
        if (BeaconManager.sInstance != null) {
            BeaconManager.sInstance.applySettings();
        }
    }
    public static getRegionExitPeriod(): number {
        return this.sExitRegionPeriod;
    }
    public applySettings(): void {
        this.syncSettingsToService();
    }
    protected syncSettingsToService(): void {
        if (this.mIntentScanStrategyCoordinator != null) {
            this.mIntentScanStrategyCoordinator.applySettings();
            return;
        }
        this.applyChangesToServices(BeaconService.MSG_SYNC_SETTINGS, null);
    }
    public getRangedRegions(): Set<Region> {
        return this.rangedRegions;
    }
    public stopMonitoring(region: Region): void {
        this.applyChangesToServices(BeaconService.MSG_STOP_MONITORING, region);
    }
    public getMonitoredRegions(): Set<Region> {
        return MonitoringStatus.getInstanceForApplication().regions();
    }
    public stopRangingBeacons(region: Region): void {
        this.rangedRegions.delete(region);
        this.applyChangesToServices(BeaconService.MSG_STOP_RANGING, region);
        //    this.autoUnbindIfNeeded();
    }
    public addDeviceModel(coefficient1: number, coefficient2: number, coefficient3: number, version: string, buildNumber: string, manufacturer: string, defaultModel: boolean): void {
        let device: DeviceAttribute = new DeviceAttribute(coefficient1, coefficient2, coefficient3, version, buildNumber, manufacturer, defaultModel);
        DeviceModelList.addModel(device);
    }
}
export default BeaconManager;
