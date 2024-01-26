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
import Region from '../Region';
import Callback from './Callback';
import RegionMonitoringState from './RegionMonitoringState';
import MonitoringData from './MonitoringData';
import Beacon from '../Beacon';
export default class MonitoringStatus {
    private static sInstance: MonitoringStatus;
    private static readonly MAX_REGIONS_FOR_STATUS_PRESERVATION: number = 50;
    private readonly MAX_STATUS_PRESERVATION_FILE_AGE_TO_RESTORE_SECS: number = 60 * 15;
    private static readonly TAG: string = "MonitoringStatus";
    public static readonly STATUS_PRESERVATION_FILE_NAME: string = "org.altbeacon.beacon.service.monitoring_status_state";
    private mRegionsStatesMap: Map<Region, RegionMonitoringState>;
    private mStatePreservationIsOn: boolean = true;
    public static getInstanceForApplication(): MonitoringStatus {
        var instance: MonitoringStatus = this.sInstance;
        if (instance == null) {
            this.sInstance = instance = new MonitoringStatus();
        }
        return instance;
    }
    public addRegion(region: Region, callback: Callback): void {
        this.addLocalRegion(region, callback);
    }
    public removeRegion(region: Region): void {
        this.removeLocalRegion(region);
    }
    public regions(): Set<Region> {
        let result: Set<Region> = new Set();
        for (let key of this.getRegionsStateMap().keys()) {
            result.add(key);
        }
        return result;
    }
    public regionsCount(): number {
        return this.regions().size;
    }
    public stateOf(region: Region): RegionMonitoringState {
        return this.getRegionsStateMap().get(region);
    }
    public updateNewlyOutside(): void {
        this.regions().forEach((region, region2, set) => {
            let state: RegionMonitoringState = this.stateOf(region);
            if (state.markOutsideIfExpired()) {
                console.debug("MonitoringStatus", "found a monitor that expired: %s", region);
                state.getCallback().call("monitoringData", new MonitoringData(state.getInside(), region).toBundle());
            }
        });
    }
    public insideAnyRegion(): boolean {
        this.regions().forEach((region, value2, map) => {
            let state: RegionMonitoringState = this.stateOf(region);
            if (state != null && state.getInside() == true) {
                return true;
            }
        });
        return false;
    }
    public updateNewlyInsideInRegionsContaining(beacon: Beacon): void {
        let matchingRegions: Array<Region> = this.regionsMatchingTo(beacon);
        var needsMonitoringStateSaving: boolean = false;
        matchingRegions.forEach((region, index, array) => {
            let state: RegionMonitoringState = this.getRegionsStateMap().get(region);
            if (state != null && state.markInside()) {
                needsMonitoringStateSaving = true;
                state.getCallback().call("monitoringData", new MonitoringData(state.getInside(), region).toBundle());
            }
        });
    }
    private getRegionsStateMap(): Map<Region, RegionMonitoringState> {
        if (this.mRegionsStatesMap == null) {
            this.restoreOrInitializeMonitoringStatus();
        }
        return this.mRegionsStatesMap;
        let region2 = this.mRegionsStatesMap.keys().next();
    }
    private restoreOrInitializeMonitoringStatus(): void {
        let millisSinceLastMonitor: number = new Date().getTime() - this.getLastMonitoringStatusUpdateTime();
        this.mRegionsStatesMap = new Map();
        if (!this.mStatePreservationIsOn) {
            console.debug("MonitoringStatus", "Not restoring monitoring state because persistence is disabled");
        }
        else if (millisSinceLastMonitor > this.MAX_STATUS_PRESERVATION_FILE_AGE_TO_RESTORE_SECS * 1000) {
            console.debug("MonitoringStatus", "Not restoring monitoring state because it was recorded too many milliseconds ago: " + millisSinceLastMonitor);
        }
        else {
            console.debug("MonitoringStatus", "Done restoring monitoring status");
        }
    }
    private regionsMatchingTo(beacon: Beacon): Array<Region> {
        var matched: Array<Region> = new Array<Region>();
        this.regions().forEach((region, value2, map) => {
            if (region.matchesBeacon(beacon)) {
                matched.push(region);
            }
            else {
                console.debug("MonitoringStatus", "This region (%s) does not match beacon: %s", region, beacon);
            }
        });
        return matched;
    }
    protected getLastMonitoringStatusUpdateTime(): number {
        return new Date().getTime();
    }
    /**
       * Client applications should not call directly.  Call BeaconManager#setRegionStatePeristenceEnabled
       */
    public stopStatusPreservation(): void {
        this.mStatePreservationIsOn = false;
    }
    /**
       * Client applications should not call directly.  Call BeaconManager#setRegionStatePeristenceEnabled
       */
    public startStatusPreservation(): void {
        if (!this.mStatePreservationIsOn) {
            this.mStatePreservationIsOn = true;
        }
    }
    public isStatePreservationOn(): boolean {
        return this.mStatePreservationIsOn;
    }
    public clear(): void {
        this.getRegionsStateMap().clear();
    }
    public updateLocalState(region: Region, state: number): void {
        let internalState: RegionMonitoringState = this.getRegionsStateMap().get(region);
        if (internalState == null) {
            internalState = this.addLocalRegion(region, new Callback(null));
        }
        if (state != null) {
            if (state == 0) {
                internalState.markOutside();
            }
            if (state == 1) {
                internalState.markInside();
            }
        }
    }
    public removeLocalRegion(region: Region): void {
        for (let exsitRegion of this.getRegionsStateMap().keys()) {
            if (exsitRegion.equals(region)) {
                this.getRegionsStateMap().delete(exsitRegion);
            }
        }
    }
    private addLocalRegion(region: Region, callback: Callback): RegionMonitoringState {
        if (this.getRegionsStateMap().has(region)) {
            // if the region definition hasn't changed, becasue if it has, we need to clear state
            // otherwise a region with the same uniqueId can never be changed
            for (let existingRegion of this.getRegionsStateMap().keys()) {
                if (existingRegion.equals(region)) {
                    if (existingRegion.hasSameIdentifiers(region)) {
                        return this.getRegionsStateMap().get(existingRegion);
                    }
                    else {
                        console.debug("MonitoringStatus", "Replacing region with unique identifier " + region.getUniqueId());
                        console.debug("MonitoringStatus", "Old definition: " + existingRegion);
                        console.debug("MonitoringStatus", "New definition: " + region);
                        console.debug("MonitoringStatus", "clearing state");
                        this.getRegionsStateMap().delete(region);
                        return null;
                    }
                }
            }
        }
        var monitoringState: RegionMonitoringState = new RegionMonitoringState(callback);
        this.getRegionsStateMap().set(region, monitoringState);
        return monitoringState;
    }
}
