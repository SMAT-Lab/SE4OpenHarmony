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
export default class StartRMData {
    public static readonly SCAN_PERIOD_KEY: string = "scanPeriod";
    public static readonly BETWEEN_SCAN_PERIOD_KEY: string = "betweenScanPeriod";
    public static readonly BACKGROUND_FLAG_KEY: string = "backgroundFlag";
    public static readonly CALLBACK_PACKAGE_NAME_KEY: string = "callbackPackageName";
    public static readonly REGION_KEY: string = "region";
    private mRegion: Region;
    private mScanPeriod: number;
    private mBetweenScanPeriod: number;
    private mBackgroundFlag: boolean;
    private mCallbackPackageName: string;
    public constructor(region?: Region, callbackPackageName?: string, scanPeriod?: number, betweenScanPeriod?: number, backgroundFlag?: boolean) {
        this.mScanPeriod = scanPeriod;
        this.mBetweenScanPeriod = betweenScanPeriod;
        this.mRegion = region;
        this.mCallbackPackageName = callbackPackageName;
        this.mBackgroundFlag = backgroundFlag;
    }
    public getScanPeriod(): number {
        return this.mScanPeriod;
    }
    public getBetweenScanPeriod(): number {
        return this.mBetweenScanPeriod;
    }
    public getRegionData(): Region {
        return this.mRegion;
    }
    public getCallbackPackageName(): string {
        return this.mCallbackPackageName;
    }
    public getBackgroundFlag(): boolean {
        return this.mBackgroundFlag;
    }
    public toBundle(): Map<string, any> {
        var bundle: Map<string, any> = new Map();
        bundle.set(StartRMData.SCAN_PERIOD_KEY, this.mScanPeriod);
        bundle.set(StartRMData.BETWEEN_SCAN_PERIOD_KEY, this.mBetweenScanPeriod);
        bundle.set(StartRMData.BACKGROUND_FLAG_KEY, this.mBackgroundFlag);
        bundle.set(StartRMData.CALLBACK_PACKAGE_NAME_KEY, this.mCallbackPackageName);
        if (this.mRegion != null) {
            bundle.set(StartRMData.REGION_KEY, this.mRegion);
        }
        return bundle;
    }
    public static fromBundle(bundle: Map<string, any>): StartRMData {
        var valid: boolean = false;
        var data: StartRMData = new StartRMData();
        if (bundle.has(StartRMData.REGION_KEY)) {
            data.mRegion = bundle.get(StartRMData.REGION_KEY);
            valid = true;
        }
        if (bundle.has(StartRMData.SCAN_PERIOD_KEY)) {
            data.mScanPeriod = bundle.get(StartRMData.SCAN_PERIOD_KEY);
            valid = true;
        }
        if (bundle.has(StartRMData.BETWEEN_SCAN_PERIOD_KEY)) {
            data.mBetweenScanPeriod = bundle.get(StartRMData.BETWEEN_SCAN_PERIOD_KEY);
        }
        if (bundle.has(StartRMData.BACKGROUND_FLAG_KEY)) {
            data.mBackgroundFlag = bundle.get(StartRMData.BACKGROUND_FLAG_KEY);
        }
        if (bundle.has(StartRMData.CALLBACK_PACKAGE_NAME_KEY)) {
            data.mCallbackPackageName = bundle.get(StartRMData.CALLBACK_PACKAGE_NAME_KEY);
        }
        if (valid) {
            return data;
        }
        else {
            return null;
        }
    }
}
