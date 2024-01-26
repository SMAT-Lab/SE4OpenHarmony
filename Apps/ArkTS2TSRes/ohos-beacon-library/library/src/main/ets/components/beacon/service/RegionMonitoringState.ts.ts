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
import BeaconManager from '../BeaconManager';
import Callback from './Callback';
import process from '@ohos.process';
export default class RegionMonitoringState {
    private static readonly TAG: string = "RegionMonitoringState";
    private inside: boolean = false;
    private lastSeenTime: number = 0;
    private callback: Callback;
    public constructor(c: Callback) {
        this.callback = c;
    }
    public getCallback(): Callback {
        return this.callback;
    }
    // returns true if it is newly inside
    public markInside(): boolean {
        this.lastSeenTime = process.uptime() * 1000;
        if (!this.inside) {
            this.inside = true;
            return true;
        }
        return false;
    }
    public markOutside(): void {
        this.inside = false;
        this.lastSeenTime = 0;
    }
    public markOutsideIfExpired(): boolean {
        if (this.inside) {
            if (this.lastSeenTime > 0 && process.uptime() * 1000 - this.lastSeenTime > BeaconManager.getRegionExitPeriod()) {
                console.debug("RegionMonitoringState", "We are newly outside the region because the lastSeenTime of %s "
                    + "was %s seconds ago, and that is over the expiration duration "
                    + "of %s", this.lastSeenTime, process.uptime() * 1000 - this.lastSeenTime, BeaconManager.getRegionExitPeriod());
                this.markOutside();
                return true;
            }
        }
        return false;
    }
    public getInside(): boolean {
        return this.inside;
    }
}
