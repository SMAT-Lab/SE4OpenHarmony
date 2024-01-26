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
import Beacon from '../Beacon';
import MonitoringStatus from './MonitoringStatus';
import BeaconService from './BeaconService';
import BeaconManager from '../BeaconManager';
import BeaconParser from '../BeaconParser';
export default class SettingsData {
    private static readonly SETTINGS_DATA_KEY: string = "SettingsData";
    mBeaconParsers: Array<BeaconParser>;
    mRegionStatePersistenceEnabled: boolean;
    mRegionExitPeriod: number;
    mUseTrackingCache: boolean;
    mHardwareEqualityEnforced: boolean;
    public toBundle(): Map<string, any> {
        var bundle: Map<string, any> = new Map();
        bundle.set(SettingsData.SETTINGS_DATA_KEY, this);
        return bundle;
    }
    public static fromBundle(bundle: Map<string, any>): SettingsData {
        var settingsData: SettingsData = null;
        if (bundle.get(SettingsData.SETTINGS_DATA_KEY) != null) {
            settingsData = bundle.get(SettingsData.SETTINGS_DATA_KEY);
        }
        return settingsData;
    }
    public apply(): void {
        console.log("Applying settings changes to scanner in other process");
        let beaconManager: BeaconManager = BeaconManager.getInstanceForApplication();
        let beaconParsers: Array<BeaconParser> = beaconManager.getBeaconParsers();
        let beaconParsersChanged: boolean = false;
        if (beaconParsers.length == this.mBeaconParsers.length) {
            for (let i: number = 0; i < beaconParsers.length; i++) {
                if (!beaconParsers[i].equals(this.mBeaconParsers[i])) {
                    console.debug("Beacon parsers have changed to: " + this.mBeaconParsers[i].getLayout());
                    beaconParsersChanged = true;
                    break;
                }
            }
        }
        else {
            beaconParsersChanged = true;
            console.debug("Beacon parsers have been added or removed.");
        }
        if (beaconParsersChanged) {
            console.debug("Updating beacon parsers");
            beaconManager.clearBeaconParsers();
            for (let beaconParser of this.mBeaconParsers) {
                beaconManager.getBeaconParsers().push(beaconParser);
            }
            BeaconService.getBeaconServiceInstance().reloadParsers();
        }
        else {
            console.debug("Beacon parsers unchanged.");
        }
        let monitoringStatus: MonitoringStatus = MonitoringStatus.getInstanceForApplication();
        if (monitoringStatus.isStatePreservationOn() &&
            !this.mRegionStatePersistenceEnabled) {
            monitoringStatus.stopStatusPreservation();
        }
        else if (!monitoringStatus.isStatePreservationOn() &&
            this.mRegionStatePersistenceEnabled) {
            monitoringStatus.startStatusPreservation();
        }
        BeaconManager.setRegionExitPeriod(this.mRegionExitPeriod);
        Beacon.setHardwareEqualityEnforced(this.mHardwareEqualityEnforced);
    }
}
