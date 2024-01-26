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
import Region from './Region';
interface MonitorNotifier {
    /**
     * Indicates the device is inside the Region of beacons
     */
    INSIDE: number; // In an interface, properties cannot be assigned directly, please note that the default value should be 1 when used
    /**
     * Indicates the device is outside the Region of beacons
     */
    OUTSIDE: number; // In an interface, properties cannot be assigned directly, please note that the default value should be 0 when used
    /**
     * Called when at least one beacon in a <code>Region</code> is visible.
     * @param region a Region that defines the criteria of beacons to look for
     */
    didEnterRegion(region: Region): void;
    /**
     * Called when no beacons in a <code>Region</code> are visible.
     * @param region a Region that defines the criteria of beacons to look for
     */
    didExitRegion(region: Region): void;
    /**
     * Called with a state value of MonitorNotifier.INSIDE when at least one beacon in a <code>Region</code> is visible.
     * Called with a state value of MonitorNotifier.OUTSIDE when no beacons in a <code>Region</code> are visible.
     * @param state either MonitorNotifier.INSIDE or MonitorNotifier.OUTSIDE
     * @param region a Region that defines the criteria of beacons to look for
     */
    didDetermineStateForRegion(state: number, region: Region): void;
}
export default MonitorNotifier;
