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
import QuickTimeDictionary from './QuickTimeDictionary';
import QuickTimeDirectory from './QuickTimeDirectory';
import Rational from '../../lang/Rational';
import TagDescriptor from '../TagDescriptor';
export default class QuickTimeDescriptor extends TagDescriptor<QuickTimeDirectory> {
    public constructor(directory: QuickTimeDirectory) {
        super(directory);
    }
    public getDescription(tagType: number): string {
        switch (tagType) {
            case QuickTimeDirectory.TAG_MAJOR_BRAND:
                return this.getMajorBrandDescription();
            case QuickTimeDirectory.TAG_COMPATIBLE_BRANDS:
                return this.getCompatibleBrandsDescription();
            case QuickTimeDirectory.TAG_DURATION_SECONDS:
                return this.getDurationDescription();
            default:
                return super.getDescription(tagType);
        }
    }
    private getMajorBrandDescription(): string {
        let value: Int8Array = this._directory.getByteArray(QuickTimeDirectory.TAG_MAJOR_BRAND);
        if (value == null)
            return null;
        return QuickTimeDictionary.lookup(QuickTimeDirectory.TAG_MAJOR_BRAND, value.toString());
    }
    private getCompatibleBrandsDescription(): string {
        let values: Array<string> = this._directory.getStringArray(QuickTimeDirectory.TAG_COMPATIBLE_BRANDS);
        if (values == null)
            return null;
        let compatibleBrandsValues: Set<string> = new Set<string>();
        for (let value in values) {
            let compatibleBrandsValue: string = QuickTimeDictionary.lookup(QuickTimeDirectory.TAG_MAJOR_BRAND, value);
            compatibleBrandsValues.add(compatibleBrandsValue == null ? value : compatibleBrandsValue);
        }
        return Array.from(compatibleBrandsValues).toString();
    }
    private getDurationDescription(): string {
        let duration: Rational = this._directory.getRational(QuickTimeDirectory.TAG_DURATION_SECONDS);
        if (duration == null)
            return null;
        let value: number = duration.numberValue();
        let hours: number = parseInt(String(value / (Math.pow(60, 2))).split('.')[0]);
        let hoursStr: string = String(value / (Math.pow(60, 2))).split('.')[0];
        if (hoursStr != null && hoursStr.length == 1) {
            hoursStr = '0' + hoursStr;
        }
        let minutes: number = parseInt(String(value / (Math.pow(60, 1)) - (hours * 60)).split('.')[0]);
        let minutesStr: string = String(value / (Math.pow(60, 1)) - (hours * 60)).split('.')[0];
        if (minutesStr != null && minutesStr.length == 1) {
            minutesStr = '0' + minutesStr;
        }
        let seconds: number = Math.ceil(value / (Math.pow(60, 0)) - (minutes * 60));
        let secondsStr: string = String(Math.ceil(value / (Math.pow(60, 0)) - (minutes * 60))).split('.')[0];
        if (secondsStr != null && secondsStr.length == 1) {
            secondsStr = '0' + secondsStr;
        }
        let time: string = hoursStr + ':' + minutesStr + ":" + secondsStr;
        return time;
    }
}
