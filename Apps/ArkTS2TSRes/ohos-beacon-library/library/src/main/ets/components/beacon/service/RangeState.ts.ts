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
import Beacon from '../Beacon';
import RangedBeacon from './RangedBeacon';
export default class RangeState {
    private static readonly TAG: string = "RangeState";
    private mCallback: Callback;
    private mRangedBeacons: Map<Beacon, RangedBeacon> = new Map();
    private sUseTrackingCache: boolean = false;
    public constructor(c: Callback) {
        this.mCallback = c;
    }
    public getCallback(): Callback {
        return this.mCallback;
    }
    public addBeacon(beacon: Beacon): void {
        let rangedBeacon: RangedBeacon = this.mRangedBeacons.get(beacon);
        if (rangedBeacon != null) {
            console.debug("RangeState", "adding %s to existing range for: %s", JSON.stringify(beacon), JSON.stringify(rangedBeacon));
            rangedBeacon.updateBeacon(beacon);
        }
        else {
            console.debug("RangeState", "adding %s to new rangedBeaco", JSON.stringify(beacon));
            this.mRangedBeacons.set(beacon, new RangedBeacon(beacon));
        }
    }
    public count(): number {
        return this.mRangedBeacons.size;
    }
    // returns a list of beacons that are tracked, and then removes any from the list that should not
    // be there for the next cycle
    public finalizeBeacons(): Set<Beacon> {
        var newRangedBeacons: Map<Beacon, RangedBeacon> = new Map();
        var finalizedBeacons: Set<Beacon> = new Set();
        this.mRangedBeacons.forEach((rangedBeacon, beacon, map) => {
            if (rangedBeacon != null) {
                if (rangedBeacon.isTracked()) {
                    rangedBeacon.commitMeasurements(); // calculates accuracy
                    if (!rangedBeacon.noMeasurementsAvailable()) {
                        finalizedBeacons.add(rangedBeacon.getBeacon());
                    }
                }
                // If we still have useful measurements, keep it around but mark it as not
                // tracked anymore so we don't pass it on as visible unless it is seen again
                if (!rangedBeacon.noMeasurementsAvailable() == true) {
                    //if TrackingCache is enabled, allow beacon to not receive
                    //measurements for a certain amount of time
                    if (!this.sUseTrackingCache || rangedBeacon.isExpired())
                        rangedBeacon.setTracked(false);
                    newRangedBeacons.set(beacon, rangedBeacon);
                }
                else {
                    console.debug("RangeState", "Dumping beacon from RangeState because it has no recent measurements.");
                }
            }
        });
        this.mRangedBeacons = newRangedBeacons;
        return finalizedBeacons;
    }
    public setUseTrackingCache(useTrackingCache: boolean): void {
        this.sUseTrackingCache = useTrackingCache;
    }
    public getUseTrackingCache(): boolean {
        return this.sUseTrackingCache;
    }
}
