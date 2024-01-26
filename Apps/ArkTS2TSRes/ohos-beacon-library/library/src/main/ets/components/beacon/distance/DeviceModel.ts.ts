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
import deviceInfo from '@ohos.deviceInfo';
class DeviceModel {
    private static readonly TAG: string = "DeviceModel";
    mVersion: string;
    mBuildNumber: string;
    mManufacturer: string;
    public constructor(version: string, buildNumber: string, manufacturer: string) {
        this.mVersion = version;
        this.mBuildNumber = buildNumber;
        this.mManufacturer = manufacturer;
    }
    public static forThisDevice(): DeviceModel {
        return new DeviceModel(deviceInfo.displayVersion, deviceInfo.marketName, deviceInfo.manufacture);
    }
    public getVersion(): string {
        return this.mVersion;
    }
    public setVersion(mVersion: string): void {
        this.mVersion = mVersion;
    }
    public getBuildNumber(): string {
        return this.mBuildNumber;
    }
    public getManufacturer(): string {
        return this.mManufacturer;
    }
    public setBuildNumber(mBuildNumber: string): void {
        this.mBuildNumber = mBuildNumber;
    }
    public setManufacturer(mManufacturer: string): void {
        this.mManufacturer = mManufacturer;
    }
    /**
       * Calculates a qualitative match score between two different device models for the
       * purposes of how likely they are to have similar Bluetooth signal level responses
       * @param otherModel
       * @return match quality, higher numbers are a better match
       */
    public matchScore(otherModel: DeviceModel): number {
        let score: number = 0;
        if (this.mManufacturer == otherModel.mManufacturer) {
            score = 1;
        }
        if (score == 1 && this.mBuildNumber == otherModel.mBuildNumber) {
            score = 2;
        }
        if (score == 2 && this.mVersion == otherModel.mVersion) {
            score = 3;
        }
        return score;
    }
    public toString(): string {
        return "" + this.mManufacturer + ";" + this.mBuildNumber + ";" + this.mVersion;
    }
}
export default DeviceModel;
