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
export default class MonitoringData {
    private readonly TAG: string = "MonitoringData";
    private readonly mInside: boolean;
    private readonly mRegion: Region;
    private static readonly REGION_KEY: string = "region";
    private static readonly INSIDE_KEY: string = "inside";
    public constructor(inside: boolean, region: Region) {
        this.mInside = inside;
        this.mRegion = region;
    }
    public isInside(): boolean {
        return this.mInside;
    }
    public getRegion(): Region {
        return this.mRegion;
    }
    public toBundle(): Map<string, any> {
        let bundle: Map<string, any> = new Map();
        bundle.set(MonitoringData.REGION_KEY, this.mRegion);
        bundle.set(MonitoringData.INSIDE_KEY, this.mInside);
        return bundle;
    }
    public static fromBundle(bundle: Map<string, any>): MonitoringData {
        var region: Region = null;
        if (bundle.get(MonitoringData.REGION_KEY) != null) {
            region = bundle.get(MonitoringData.REGION_KEY);
        }
        var inside: boolean = bundle.get(MonitoringData.INSIDE_KEY);
        return new MonitoringData(inside, region);
    }
}
