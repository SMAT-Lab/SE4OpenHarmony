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
import ScanData from './ScanData';
import HexUtil from '../../utils/HexUtil';
import ScanHelper from '../ScanHelper';
import ble from '@ohos.bluetooth.ble';
import access from '@ohos.bluetooth.access';
import { BusinessError } from '@ohos.base';
import CycledLeScanner from './CycledLeScanner';
import BeaconManager from '../../BeaconManager';
import DetectionTracker from '../DetectionTracker';
import CycledLeScanCallback from './CycledLeScanCallback';
import process from '@ohos.process';
class CycledLeScannerForLollipop extends CycledLeScanner {
    private readonly BACKGROUND_L_SCAN_DETECTION_PERIOD_MILLIS: number = 10000;
    private mBackgroundLScanStartTime: number = 0;
    private mBackgroundLScanFirstDetectionTime: number = 0;
    private mMainScanCycleActive: boolean = false;
    private scanHelper: ScanHelper;
    public constructor(scanPeriod: number, betweenScanPeriod: number, backgroundFlag: boolean, cycledLeScanCallback: CycledLeScanCallback) {
        super(scanPeriod, betweenScanPeriod, backgroundFlag, cycledLeScanCallback);
    }
    protected stopScan(): void {
        this.postStopLeScan();
    }
    protected deferScanIfNeeded(): boolean {
        // This method is called to see if it is time to start a scan
        let millisecondsUntilStart: number = super.mNextScanCycleStartTime - process.uptime() * 1000;
        let deferScan: boolean = millisecondsUntilStart > 0;
        let scanActiveBefore: boolean = this.mMainScanCycleActive;
        this.mMainScanCycleActive = !deferScan;
        if (deferScan) {
            let secsSinceLastDetection: number = process.uptime() * 1000 -
                DetectionTracker.getInstance().getLastDetectionTime();
            if (scanActiveBefore) {
                if (secsSinceLastDetection > this.BACKGROUND_L_SCAN_DETECTION_PERIOD_MILLIS) {
                    this.mBackgroundLScanStartTime = process.uptime() * 1000;
                    this.mBackgroundLScanFirstDetectionTime = 0;
                    console.debug("CycledLeScannerForLollipop", "This is  L. Preparing to do a filtered scan for the background.");
                    if (super.mBetweenScanPeriod > 6000) {
                        this.startScan(this.scanHelper);
                    }
                    else {
                        console.debug("CycledLeScannerForLollipop", "Suppressing scan between cycles because the between scan cycle is too short.");
                    }
                }
                else {
                    console.debug("CycledLeScannerForLollipop", "we last saw a beacon only %s "
                        + "ago, so we will not keep scanning in background.", secsSinceLastDetection);
                }
            }
            if (this.mBackgroundLScanStartTime > 0) {
                // if we are in here, we have detected beacons recently in a background L scan
                if (DetectionTracker.getInstance().getLastDetectionTime() > this.mBackgroundLScanStartTime) {
                    if (this.mBackgroundLScanFirstDetectionTime == 0) {
                        this.mBackgroundLScanFirstDetectionTime = DetectionTracker.getInstance().getLastDetectionTime();
                    }
                    if (process.uptime() * 1000 - this.mBackgroundLScanFirstDetectionTime
                        >= this.BACKGROUND_L_SCAN_DETECTION_PERIOD_MILLIS) {
                        // if we are in here, it has been more than 10 seconds since we detected
                        // a beacon in background L scanning mode.  We need to stop scanning
                        // so we do not drain battery
                        console.debug("CycledLeScannerForLollipop", "We've been detecting for a bit.  Stopping background scanning");
                        this.stopScan();
                        this.mBackgroundLScanStartTime = 0;
                    }
                    else {
                        // report the results up the chain
                        console.debug("CycledLeScannerForLollipop", "Delivering background scanning results");
                        this.scanHelper.mCycledLeScanCallback.onCycleEnd(this.scanHelper);
                    }
                }
            }
            console.debug("CycledLeScannerForLollipop", "Waiting to start full Bluetooth scan for another %s milliseconds", millisecondsUntilStart);
            // Don't actually wait until the next scan time -- only wait up to 1 second.  This
            // allows us to start scanning sooner if a consumer enters the foreground and expects
            // results more quickly.
            setTimeout(() => {
                super.scanLeDevice(true);
            }, millisecondsUntilStart > 1000 ? 1000 : millisecondsUntilStart);
        }
        else {
            if (this.mBackgroundLScanStartTime > 0) {
                this.stopScan();
                this.mBackgroundLScanStartTime = 0;
            }
        }
        return deferScan;
    }
    protected startScan(scanHelper: ScanHelper): void {
        this.scanHelper = scanHelper;
        if (!this.isBluetoothOn()) {
            console.debug("CycledLeScannerForLollipop", "Not starting scan because bluetooth is off");
            return;
        }
        let settings = null;
        if (!this.mMainScanCycleActive) {
            settings = {
                interval: 50,
                dutyMode: ble.ScanDuty.SCAN_MODE_LOW_POWER,
                matchMode: ble.MatchMode.MATCH_MODE_AGGRESSIVE,
            };
        }
        else {
            console.debug("CycledLeScannerForLollipop", "starting a scan in SCAN_MODE_LOW_LATENCY");
            settings = {
                interval: 50,
                dutyMode: ble.ScanDuty.SCAN_MODE_LOW_POWER,
                matchMode: ble.MatchMode.MATCH_MODE_AGGRESSIVE,
            };
        }
        if (settings != null) {
            this.postStartLeScan(null, settings);
        }
    }
    public stop(): void {
        super.stop();
        console.debug("CycledLeScannerForLollipop", "unregistering SamsungScreenOffReceiver as we stop the cycled scanner");
    }
    protected finishScan(): void {
        console.debug("CycledLeScannerForLollipop", "Stopping scan");
        this.stopScan();
        super.mScanningPaused = true;
    }
    private postStartLeScan(filters: Array<any>, settings: object): void {
        if (BeaconManager.MOCK_DEVICE) {
            let scanDataArray: Array<ScanData> = new Array();
            let hexStr1 = '02011a1aff1801beac2f234454cf6d4a0fadf2f4911ba9ffa600010002c5000000';
            let bytesToProcess1: ArrayBuffer = new ArrayBuffer(hexStr1.length / 2);
            let int8a1 = new Int8Array(bytesToProcess1);
            int8a1.set(HexUtil.hexStringToBytes(hexStr1));
            let hexStr2 = '02011a1bff1801beac2f234454cf6d4a0fadf2f4911ba9ffa600010002c509';
            let bytesToProcess2: ArrayBuffer = new ArrayBuffer(hexStr2.length / 2);
            let int8a2 = new Int8Array(bytesToProcess2);
            int8a2.set(HexUtil.hexStringToBytes(hexStr2));
            let hexStr3 = '0201061bffaabbbeace2c56db5dffb48d2b060d0f5a71096e000010004c50000000000000000000000000000000000000000000000000000000000000000';
            let bytesToProcess3: ArrayBuffer = new ArrayBuffer(hexStr3.length / 2);
            let int8a3 = new Int8Array(bytesToProcess3);
            int8a3.set(HexUtil.hexStringToBytes(hexStr3));
            scanDataArray.push(new ScanData("32:15:00:19:42:F6", -53, bytesToProcess1, new Date().getTime()));
            scanDataArray.push(new ScanData("32:15:00:19:42:F7", -54, bytesToProcess2, new Date().getTime()));
            scanDataArray.push(new ScanData("32:15:00:19:42:F8", -55, bytesToProcess3, new Date().getTime()));
            for (let scanData of scanDataArray) {
                this.scanHelper.mCycledLeScanCallback.onLeScan(this.scanHelper, scanData.deviceId, scanData.rssi, scanData.scanRecord, scanData.timestampMs);
            }
        }
        else {
            ble.on('BLEDeviceFind', (data) => {
                data.forEach((item, index) => {
                    this.scanHelper.mCycledLeScanCallback.onLeScan(this.scanHelper, item.deviceId, item.rssi, item.data, new Date().getTime());
                });
            });
        }
        ble.startBLEScan(filters, settings);
    }
    private postStopLeScan(): void {
        if (!this.isBluetoothOn()) {
            console.debug("CycledLeScannerForLollipop", "Not stopping scan because bluetooth is off");
            return;
        }
        ble.stopBLEScan();
        ble.off('BLEDeviceFind', () => {
            super.mCycledLeScanCallback.onCycleEnd(this.scanHelper);
        });
    }
    public getBlueState(): number {
        if (BeaconManager.MOCK_DEVICE) {
            return 2;
        }
        try {
            return access.getState();
        }
        catch (err) {
            console.error('CycledLeScannerForLollipop errCode: ' + (err as BusinessError).code + ', errMessage: ' + (err as BusinessError).message);
        }
        return 0;
    }
    private isBluetoothOn(): boolean {
        if (BeaconManager.MOCK_DEVICE) {
            return true;
        }
        var result = this.getBlueState();
        if (result == 2) {
            return true;
        }
        return false;
    }
}
export default CycledLeScannerForLollipop;
