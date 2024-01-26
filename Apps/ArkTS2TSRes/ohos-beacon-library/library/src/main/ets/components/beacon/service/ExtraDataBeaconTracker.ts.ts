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
/**
 * Keeps track of beacons that have ever been seen and
 * merges them together depending on configured beacon parsers
 */
export default class ExtraDataBeaconTracker {
    private static readonly TAG: string = "BeaconTracker";
    /**
       * This is a lookup table to find tracked beacons by the calculated beacon key
       */
    private readonly mBeaconsByKey: Map<string, Map<number, Beacon>> = new Map();
    private matchBeaconsByServiceUUID: boolean;
    public constructor(matchBeaconsByServiceUUID?: boolean) {
        if (matchBeaconsByServiceUUID == null) {
            matchBeaconsByServiceUUID = true;
        }
        this.matchBeaconsByServiceUUID = matchBeaconsByServiceUUID;
    }
    /**
       * Tracks a beacon. For Gatt-based beacons, returns a merged copy of fields from multiple
       * frames. Returns null when passed a Gatt-based beacon that has is only extra beacon data.
       */
    public track(beacon: Beacon): Beacon {
        var trackedBeacon: Beacon = null;
        if (beacon.isMultiFrameBeacon() || beacon.getServiceUuid() != -1) {
            trackedBeacon = this.trackGattBeacon(beacon);
        }
        else {
            trackedBeacon = beacon;
        }
        return trackedBeacon;
    }
    /**
       * The following code is for dealing with merging data fields in beacons
       */
    private trackGattBeacon(beacon: Beacon): Beacon {
        if (beacon.isExtraBeaconData()) {
            this.updateTrackedBeacons(beacon);
            return null;
        }
        let key: string = this.getBeaconKey(beacon);
        let matchingTrackedBeacons: Map<number, Beacon> = this.mBeaconsByKey.get(key);
        if (null == matchingTrackedBeacons) {
            matchingTrackedBeacons = new Map();
        }
        else {
            matchingTrackedBeacons.forEach((trackedBeacon, key, map) => {
                beacon.setExtraDataFields(trackedBeacon.getExtraDataFields());
            });
        }
        matchingTrackedBeacons.set(beacon.getBeaconCode(beacon), beacon);
        this.mBeaconsByKey.set(key, matchingTrackedBeacons);
        return beacon;
    }
    private updateTrackedBeacons(beacon: Beacon): void {
        let matchingTrackedBeacons: Map<number, Beacon> = this.mBeaconsByKey.get(this.getBeaconKey(beacon));
        if (null != matchingTrackedBeacons) {
            matchingTrackedBeacons.forEach((matchingTrackedBeacon, key, map) => {
                matchingTrackedBeacon.setRssi(beacon.getRssi());
                matchingTrackedBeacon.setExtraDataFields(beacon.getDataFields());
            });
        }
    }
    private getBeaconKey(beacon: Beacon): string {
        if (this.matchBeaconsByServiceUUID) {
            return beacon.getBluetoothAddress() + beacon.getServiceUuid();
        }
        else {
            return beacon.getBluetoothAddress();
        }
    }
}
