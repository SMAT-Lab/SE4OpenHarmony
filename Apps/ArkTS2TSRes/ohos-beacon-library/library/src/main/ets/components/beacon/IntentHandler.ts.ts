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
import MonitoringStatus from './service/MonitoringStatus';
import Region from './Region';
import MonitorNotifier from './MonitorNotifier';
import Beacon from './Beacon';
import RangeNotifier from './RangeNotifier';
import BeaconManager from './BeaconManager';
import RangingData from './service/RangingData';
import MonitoringData from './service/MonitoringData';
class IntentHandler {
    private static readonly TAG: string = "IntentHandler";
    public convertIntentsToCallbacks(intent: Map<string, any>): void {
        let monitoringData: MonitoringData = null;
        let rangingData: RangingData = null;
        if (intent != null) {
            if (intent.get("monitoringData") != null) {
                monitoringData = MonitoringData.fromBundle(intent.get("monitoringData"));
            }
            if (intent.get("rangingData") != null) {
                rangingData = RangingData.fromBundle(intent.get("rangingData"));
            }
        }
        if (rangingData != null) {
            console.log(IntentHandler.TAG, "got ranging data" + JSON.stringify(rangingData));
            if (rangingData.getBeacons() == null) {
                console.warn(IntentHandler.TAG, "Ranging data has a null beacons collection");
            }
            let notifiers: Set<RangeNotifier> = BeaconManager.getInstanceForApplication().getRangingNotifiers();
            let beacons: Set<Beacon> = rangingData.getBeacons();
            if (notifiers != null) {
                for (let notifier of notifiers) {
                    notifier.didRangeBeaconsInRegion(beacons, rangingData.getRegion());
                }
            }
            else {
                console.log(IntentHandler.TAG, "but ranging notifier is null, so we're dropping it.");
            }
            let dataNotifier: RangeNotifier = BeaconManager.getInstanceForApplication().getDataRequestNotifier();
            if (dataNotifier != null) {
                dataNotifier.didRangeBeaconsInRegion(beacons, rangingData.getRegion());
            }
        }
        if (monitoringData != null) {
            console.log(IntentHandler.TAG, "got monitoring data");
            let notifiers: Set<MonitorNotifier> = BeaconManager.getInstanceForApplication().getMonitoringNotifiers();
            let region: Region = monitoringData.getRegion();
            let state: number = monitoringData.isInside() ? 1 : 0;
            if (notifiers != null) {
                for (let notifier of notifiers) {
                    console.log(IntentHandler.TAG, "Calling monitoring notifier: %s", notifier);
                    notifier.didDetermineStateForRegion(state, region);
                    // In case the beacon scanner is running in a separate process, the monitoring
                    // status in this process  will not have been updated yet as a result of this
                    // region state change.  We make a call here to keep it in sync.
                    MonitoringStatus.getInstanceForApplication().updateLocalState(region, state);
                    if (monitoringData.isInside()) {
                        notifier.didEnterRegion(monitoringData.getRegion());
                    }
                    else {
                        notifier.didExitRegion(monitoringData.getRegion());
                    }
                }
            }
        }
    }
}
export default IntentHandler;
