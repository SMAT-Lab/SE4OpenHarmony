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
import Beacon from './Beacon';
interface RangeNotifier {
    /**
       * Called once per second to give an estimate of the mDistance to visible beacons
       * @param beacons a collection of <code>Beacon<code> objects that have been seen in the past second
       * @param region the <code>Region</code> object that defines the criteria for the ranged beacons
       */
    didRangeBeaconsInRegion(beacons: Set<Beacon>, region: Region): void;
}
export default RangeNotifier;
