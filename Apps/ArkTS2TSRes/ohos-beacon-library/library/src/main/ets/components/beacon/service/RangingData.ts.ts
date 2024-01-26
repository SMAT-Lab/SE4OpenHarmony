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
import Beacon from '../Beacon';
export default class RangingData {
    private readonly mBeacons: Set<Beacon>;
    private readonly mRegion: Region;
    private static readonly REGION_KEY: string = "region";
    private static readonly BEACONS_KEY: string = "beacons";
    public constructor(beacons: Set<Beacon>, region: Region) {
        this.mBeacons = beacons;
        this.mRegion = region;
    }
    public getBeacons(): Set<Beacon> {
        return this.mBeacons;
    }
    public getRegion(): Region {
        return this.mRegion;
    }
    public toBundle(): Map<string, any> {
        let bundle: Map<string, any> = new Map();
        bundle.set(RangingData.REGION_KEY, this.mRegion);
        var serializableBeacons: Array<Beacon> = new Array();
        this.mBeacons.forEach((beacon) => {
            serializableBeacons.push(beacon);
        });
        bundle.set(RangingData.BEACONS_KEY, serializableBeacons);
        return bundle;
    }
    public static fromBundle(bundle: Map<string, any>): RangingData {
        var region: Region = null;
        var beacons: Set<Beacon> = new Set();
        if (bundle.get(RangingData.BEACONS_KEY) != null) {
            beacons = bundle.get(RangingData.BEACONS_KEY);
        }
        if (bundle.get(RangingData.REGION_KEY) != null) {
            region = bundle.get(RangingData.REGION_KEY);
        }
        return new RangingData(beacons, region);
    }
}
