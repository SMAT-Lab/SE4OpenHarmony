/*
Copyright (c) 2022 Huawei Device Co., Ltd.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import LeicaMakernoteDirectory from './LeicaMakernoteDirectory';
import TagDescriptor from '../../TagDescriptor';
class LeicaMakernoteDescriptor extends TagDescriptor<LeicaMakernoteDirectory> {
    constructor(directory: LeicaMakernoteDirectory) {
        super(directory);
    }
    public getDescription(tagType: number): string {
        switch (tagType) {
            case LeicaMakernoteDirectory.TAG_QUALITY:
                return this.getQualityDescription();
            case LeicaMakernoteDirectory.TAG_USER_PROFILE:
                return this.getUserProfileDescription();
            //    case LeicaMakernoteDirectory.TAG_SERIAL:
            //      return this.getSerialNumberDescription();
            case LeicaMakernoteDirectory.TAG_WHITE_BALANCE:
                return this.getWhiteBalanceDescription();
            case LeicaMakernoteDirectory.TAG_EXTERNAL_SENSOR_BRIGHTNESS_VALUE:
                return this.getExternalSensorBrightnessValueDescription();
            case LeicaMakernoteDirectory.TAG_MEASURED_LV:
                return this.getMeasuredLvDescription();
            case LeicaMakernoteDirectory.TAG_APPROXIMATE_F_NUMBER:
                return this.getApproximateFNumberDescription();
            case LeicaMakernoteDirectory.TAG_CAMERA_TEMPERATURE:
                return this.getCameraTemperatureDescription();
            case LeicaMakernoteDirectory.TAG_WB_RED_LEVEL:
            case LeicaMakernoteDirectory.TAG_WB_BLUE_LEVEL:
            case LeicaMakernoteDirectory.TAG_WB_GREEN_LEVEL:
                return this.getSimpleRational(tagType);
            default:
                return super.getDescription(tagType);
        }
    }
    private getCameraTemperatureDescription(): string {
        return this.getFormattedInt(LeicaMakernoteDirectory.TAG_CAMERA_TEMPERATURE, "%d C");
    }
    private getApproximateFNumberDescription(): string {
        return this.getSimpleRational(LeicaMakernoteDirectory.TAG_APPROXIMATE_F_NUMBER);
    }
    private getMeasuredLvDescription(): string {
        return this.getSimpleRational(LeicaMakernoteDirectory.TAG_MEASURED_LV);
    }
    private getExternalSensorBrightnessValueDescription(): string {
        return this.getSimpleRational(LeicaMakernoteDirectory.TAG_EXTERNAL_SENSOR_BRIGHTNESS_VALUE);
    }
    private getWhiteBalanceDescription(): string {
        return this.getIndexedDescription(LeicaMakernoteDirectory.TAG_WHITE_BALANCE, "Auto or Manual", "Daylight", "Fluorescent", "Tungsten", "Flash", "Cloudy", "Shadow");
    }
    private getUserProfileDescription(): string {
        return this.getIndexedDescription(LeicaMakernoteDirectory.TAG_QUALITY, 1, "User Profile 1", "User Profile 2", "User Profile 3", "User Profile 0 (Dynamic)");
    }
    private getQualityDescription(): string {
        return this.getIndexedDescription(LeicaMakernoteDirectory.TAG_QUALITY, 1, "Fine", "Basic");
    }
}
export default LeicaMakernoteDescriptor;
