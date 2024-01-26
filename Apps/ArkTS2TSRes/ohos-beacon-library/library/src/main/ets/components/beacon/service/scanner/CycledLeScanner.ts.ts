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
import ScanHelper from '../ScanHelper';
import BeaconManager from '../../BeaconManager';
import bluetooth from '@ohos.bluetooth';
import CycledLeScanCallback from './CycledLeScanCallback';
import process from '@ohos.process';
export default abstract class CycledLeScanner {
    private static readonly TAG: string = "CycledLeScanner";
    public mScanHelper: ScanHelper;
    private mLastScanCycleStartTime: number = 0;
    private mLastScanCycleEndTime: number = 0;
    protected mNextScanCycleStartTime: number = 0;
    private mScanCycleStopTime: number = 0;
    // This is the last time this class actually commanded the OS
    // to start scanning.
    private mCurrentScanStartTime: number = 0;
    private mLongScanForcingEnabled: boolean = false;
    private mScanning: boolean;
    protected mScanningPaused: boolean;
    private mScanCyclerStarted: boolean = false;
    private mScanningEnabled: boolean = false;
    private mScanPeriod: number = 1100;
    private mDeferScanIfNeeded: boolean;
    private mScanningLeftOn: boolean = false;
    protected mBetweenScanPeriod: number;
    protected mCycledLeScanCallback: CycledLeScanCallback;
    protected mBackgroundFlag: boolean = false;
    protected mRestartNeeded: boolean = false;
    /**
         * Flag indicating device hardware supports detecting multiple identical packets per scan.
         * <p>
         * Restarting scanning (stopping and immediately restarting) is necessary on many older
         * devices like the Nexus 4 and Moto G because once they detect a distinct BLE packet in a scan,
         * subsequent detections do not get a scan callback. Stopping scanning and restarting clears
         * this out, allowing subsequent detection of identical advertisements. On most newer device,
         * this is not necessary, and multiple callbacks are given for identical packets detected in
         * a single scan.
         * <p>
         * This is declared {@code volatile} because it may be set by a background scan thread while
         * we are in a method on the main thread which will end up checking it. Using this modifier
         * ensures that when we read the flag we'll always see the most recently written value. This is
         * also true for background scan threads which may be running concurrently.
         */
    private mDistinctPacketsDetectedPerScan: boolean = false;
    private readonly MIN_SCAN_CYCLE_MILLIS: number = 6000;
    protected constructor(scanPeriod: number, betweenScanPeriod: number, backgroundFlag: boolean, cycledLeScanCallback: CycledLeScanCallback) {
        this.mScanPeriod = scanPeriod;
        this.mBetweenScanPeriod = betweenScanPeriod;
        this.mCycledLeScanCallback = cycledLeScanCallback;
        this.mBackgroundFlag = backgroundFlag;
    }
    public setScanPeriods(scanPeriod: number, betweenScanPeriod: number, backgroundFlag: boolean): void {
        console.debug("CycledLeScanner", "Set scan periods called with %s, %s Background mode must have changed.", scanPeriod, betweenScanPeriod);
        if (this.mBackgroundFlag != backgroundFlag) {
            this.mRestartNeeded = true;
        }
        this.mBackgroundFlag = backgroundFlag;
        this.mScanPeriod = scanPeriod;
        this.mBetweenScanPeriod = betweenScanPeriod;
        if (this.mBackgroundFlag) {
            console.debug("CycledLeScanner", "We are in the background.  Setting wakeup alarm");
            this.setWakeUpAlarm();
        }
        else {
            console.debug("CycledLeScanner", "We are not in the background.  Cancelling wakeup alarm");
            this.cancelWakeUpAlarm();
        }
        let now: number = process.uptime() * 1000;
        if (this.mNextScanCycleStartTime > now) {
            // We are waiting to start scanning.  We may need to adjust the next start time
            // only do an adjustment if we need to make it happen sooner.  Otherwise, it will
            // take effect on the next cycle.
            let proposedNextScanStartTime: number = (this.mLastScanCycleEndTime + betweenScanPeriod);
            if (proposedNextScanStartTime < this.mNextScanCycleStartTime) {
                this.mNextScanCycleStartTime = proposedNextScanStartTime;
                console.debug("CycledLeScanner", "Adjusted nextScanStartTime to be %s", new Date(this.mNextScanCycleStartTime - process.uptime() * 1000 + new Date().getTime()));
            }
        }
        if (this.mScanCycleStopTime > now) {
            // we are waiting to stop scanning.  We may need to adjust the stop time
            // only do an adjustment if we need to make it happen sooner.  Otherwise, it will
            // take effect on the next cycle.
            let proposedScanStopTime: number = (this.mLastScanCycleStartTime + scanPeriod);
            if (proposedScanStopTime < this.mScanCycleStopTime) {
                this.mScanCycleStopTime = proposedScanStopTime;
                console.debug("CycledLeScanner", "Adjusted scanStopTime to be %s", this.mScanCycleStopTime);
            }
        }
    }
    public start(scanHelper: ScanHelper): void {
        console.debug("CycledLeScanner", "start called");
        this.mScanHelper = scanHelper;
        this.mScanningEnabled = true;
        if (!this.mScanCyclerStarted) {
            this.scanLeDevice(true);
        }
        else {
            console.debug("CycledLeScanner", "scanning already started");
        }
    }
    public stop(): void {
        console.debug("CycledLeScanner", "stop called");
        this.mScanningEnabled = false;
        if (this.mScanCyclerStarted) {
            this.scanLeDevice(false);
            // If we have left scanning on between scan periods, now is the time to shut it off.
            if (this.mScanningLeftOn) {
                console.debug("CycledLeScanner", "Stopping scanning previously left on.");
                this.mScanningLeftOn = false;
                console.debug("CycledLeScanner", "stopping bluetooth le scan");
                this.finishScan();
            }
        }
        else {
            console.debug("CycledLeScanner", "scanning already stopped");
        }
    }
    public getDistinctPacketsDetectedPerScan(): boolean {
        return this.mDistinctPacketsDetectedPerScan;
    }
    public setDistinctPacketsDetectedPerScan(detected: boolean): void {
        this.mDistinctPacketsDetectedPerScan = detected;
    }
    public destroy(): void {
        console.debug("CycledLeScanner", "Destroying");
        // Remove any postDelayed Runnables queued for the next scan cycle
        this.cleanupCancelAlarmOnUserSwitch();
    }
    protected abstract stopScan(): void;
    protected abstract deferScanIfNeeded(): boolean;
    protected abstract startScan(scanHelper: ScanHelper): void;
    public getBlueState(): number {
        if (BeaconManager.MOCK_DEVICE) {
            return 2;
        }
        return bluetooth.getState();
    }
    protected scanLeDevice(enable: boolean): void {
        this.mScanCyclerStarted = true;
        if (this.mScanningEnabled && enable) {
            if (this.deferScanIfNeeded()) {
                return;
            }
            console.debug("CycledLeScanner", "starting a new scan cycle");
            if (!this.mScanning || this.mScanningPaused || this.mRestartNeeded) {
                this.mScanning = true;
                this.mScanningPaused = false;
                this.startScan(this.mScanHelper);
                this.mLastScanCycleStartTime = process.uptime() * 1000;
                this.mScanCycleStopTime = process.uptime() * 1000 + this.mScanPeriod;
                this.scheduleScanCycleStop();
                console.debug("CycledLeScanner", "Scan started");
            }
        }
        else {
            console.debug("CycledLeScanner", "disabling scan");
            this.mScanning = false;
            this.mScanCyclerStarted = false;
            this.stopScan();
            this.mCurrentScanStartTime = 0;
            this.mLastScanCycleEndTime = process.uptime() * 1000;
            // Clear any queued schedule tasks as we're done scanning
            // This must be mHandler not mScanHandler.  mHandler is what does the scanning work.
            // If this is set to mScanHandler, then this can prevent a scan stop.
            this.finishScanCycle();
        }
    }
    protected scheduleScanCycleStop(): void {
        // Stops scanning after a pre-defined scan period.
        let millisecondsUntilStop: number = this.mScanCycleStopTime - process.uptime() * 1000;
        if (this.mScanningEnabled && millisecondsUntilStop > 0) {
            console.debug("CycledLeScanner", "Waiting to stop scan cycle for another " + millisecondsUntilStop + " milliseconds");
            if (this.mBackgroundFlag) {
                this.setWakeUpAlarm();
            }
            setTimeout(() => {
                this.scheduleScanCycleStop();
            }, millisecondsUntilStop > 1000 ? 1000 : millisecondsUntilStop);
        }
        else {
            this.finishScanCycle();
        }
    }
    protected abstract finishScan(): void;
    private finishScanCycle(): void {
        console.debug("CycledLeScanner", "Done with scan cycle");
        let blueState: number;
        let stateOn: number;
        if (BeaconManager.MOCK_DEVICE) {
            blueState = 2;
            stateOn = 2;
        }
        else {
            blueState = bluetooth.getState().valueOf();
            stateOn = 2;
        }
        this.mCycledLeScanCallback.onCycleEnd(this.mScanHelper);
        if (this.mScanning) {
            if (blueState == stateOn) {
                if (!this.mDistinctPacketsDetectedPerScan ||
                    this.mBetweenScanPeriod != 0) {
                    let now: number = process.uptime() * 1000;
                    if (this.mBetweenScanPeriod + this.mScanPeriod < this.MIN_SCAN_CYCLE_MILLIS &&
                        now - this.mLastScanCycleStartTime < this.MIN_SCAN_CYCLE_MILLIS) {
                        console.debug("CycledLeScanner", "Not stopping scan because we" +
                            " keep scanning for a minimum of 6 seconds at a time. " +
                            "We will stop in " + (this.MIN_SCAN_CYCLE_MILLIS - (now - this.mLastScanCycleStartTime)) + " millisconds.");
                        this.mScanningLeftOn = true;
                    }
                    else {
                        console.debug("CycledLeScanner", "stopping bluetooth le scan");
                        this.finishScan();
                        this.mScanningLeftOn = false;
                    }
                }
                else {
                    console.debug("CycledLeScanner", "Not stopping scanning.  Device capable of multiple indistinct detections per scan.");
                    this.mScanningLeftOn = true;
                }
                this.mLastScanCycleEndTime = process.uptime() * 1000;
            }
            else {
                console.debug("CycledLeScanner", "Bluetooth is disabled.  Cannot scan for beacons.");
                this.mRestartNeeded = true;
            }
            this.mNextScanCycleStartTime = this.getNextScanStartTime();
            if (this.mScanningEnabled) {
                this.scanLeDevice(true);
            }
        }
        if (!this.mScanningEnabled) {
            console.debug("CycledLeScanner", "Scanning disabled. ");
            this.mScanCyclerStarted = false;
        }
    }
    // In case we go into deep sleep, we will set up a wakeup alarm when in the background to kickoff
    // off the scan cycle again
    protected setWakeUpAlarm(): void {
        //        // wake up time will be the maximum of 5 minutes, the scan period, the between scan period
        //        let milliseconds:number = 1000 * 60 * 5; /* five minutes */
        //        if (milliseconds < this.mBetweenScanPeriod) {
        //            milliseconds = this.mBetweenScanPeriod;
        //        }
        //        if (milliseconds < this.mScanPeriod) {
        //            milliseconds = this.mScanPeriod;
        //        }
        //        AlarmManager alarmManager = (AlarmManager) mContext.getSystemService(Context.ALARM_SERVICE);
        //        alarmManager.set(AlarmManager.ELAPSED_REALTIME_WAKEUP, SystemClock.elapsedRealtime() + milliseconds, getWakeUpOperation());
        //        LogManager.d(TAG, "Set a wakeup alarm to go off in %s ms: %s", milliseconds, getWakeUpOperation());
        this.cancelAlarmOnUserSwitch();
    }
    // Added to prevent crash on switching users.  See #876
    protected cancelAlarmOnUserSwitch(): void {
        //        if (mCancelAlarmOnUserSwitchBroadcastReceiver == null) {
        //            IntentFilter filter = new IntentFilter();
        //            filter.addAction( Intent.ACTION_USER_BACKGROUND );
        //            filter.addAction( Intent.ACTION_USER_FOREGROUND );
        //
        //            mCancelAlarmOnUserSwitchBroadcastReceiver = new BroadcastReceiver() {
        //                @Override
        //                public void onReceive(Context context, Intent intent) {
        //                    LogManager.w(TAG, "User switch detected.  Cancelling alarm to prevent potential crash.");
        //                    cancelWakeUpAlarm();
        //                }
        //            };
        //            mContext.registerReceiver(mCancelAlarmOnUserSwitchBroadcastReceiver, filter);
        //        }
    }
    protected cleanupCancelAlarmOnUserSwitch(): void {
        //        if (this.mCancelAlarmOnUserSwitchBroadcastReceiver != null) {
        //            try {
        //                mContext.unregisterReceiver(mCancelAlarmOnUserSwitchBroadcastReceiver);
        //            }
        //            catch (IllegalArgumentException e) {} // thrown if OS does not think it was registered
        //            mCancelAlarmOnUserSwitchBroadcastReceiver = null;
        //        }
    }
    protected cancelWakeUpAlarm(): void {
        console.debug("CycledLeScanner", "cancel wakeup alarm: %s");
        // We actually don't cancel the wakup alarm... we just reschedule for a long time in the
        // future.  This is to get around a limit on 500 alarms you can start per app on Samsung
        // devices
    }
    private getNextScanStartTime(): number {
        // Because many apps may use this library on the same device, we want to try to synchronize
        // scanning as much as possible in order to save battery.  Therefore, we will set the scan
        // intervals to be on a predictable interval using a modulus of the system time.  This may
        // cause scans to start a little earlier than otherwise, but it should be acceptable.
        // This way, if multiple apps on the device are using the default scan periods, then they
        // will all be doing scans at the same time, thereby saving battery when none are scanning.
        // This, of course, won't help at all if people set custom scan periods.  But since most
        // people accept the defaults, this will likely have a positive effect.
        if (this.mBetweenScanPeriod == 0) {
            return process.uptime() * 1000;
        }
        let fullScanCycle: number = this.mScanPeriod + this.mBetweenScanPeriod;
        let normalizedBetweenScanPeriod: number = this.mBetweenScanPeriod - (process.uptime() * 1000 % fullScanCycle);
        console.debug("CycledLeScanner", "Normalizing between scan period from %s to %s", this.mBetweenScanPeriod, normalizedBetweenScanPeriod);
        return process.uptime() * 1000 + normalizedBetweenScanPeriod;
    }
}
