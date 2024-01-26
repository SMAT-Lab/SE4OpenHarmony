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
import { KodakMakernoteDirectory } from './KodakMakernoteDirectory';
import TagDescriptor from '../../TagDescriptor';
export class KodakMakernoteDescriptor extends TagDescriptor<KodakMakernoteDirectory> {
    constructor(directory: KodakMakernoteDirectory) {
        super(directory);
    }
    public getDescription(tagType: number) {
        switch (tagType) {
            case KodakMakernoteDirectory.TAG_QUALITY:
                return this.getQualityDescription();
            case KodakMakernoteDirectory.TAG_BURST_MODE:
                return this.getBurstModeDescription();
            case KodakMakernoteDirectory.TAG_SHUTTER_MODE:
                return this.getShutterModeDescription();
            case KodakMakernoteDirectory.TAG_FOCUS_MODE:
                return this.getFocusModeDescription();
            case KodakMakernoteDirectory.TAG_WHITE_BALANCE:
                return this.getWhiteBalanceDescription();
            case KodakMakernoteDirectory.TAG_FLASH_MODE:
                return this.getFlashModeDescription();
            case KodakMakernoteDirectory.TAG_FLASH_FIRED:
                return this.getFlashFiredDescription();
            case KodakMakernoteDirectory.TAG_COLOR_MODE:
                return this.getColorModeDescription();
            case KodakMakernoteDirectory.TAG_SHARPNESS:
                return this.getSharpnessDescription();
            default:
                return super.getDescription(tagType);
        }
    }
    public getSharpnessDescription(): string {
        return this.getIndexedDescription(KodakMakernoteDirectory.TAG_SHARPNESS, "Normal");
    }
    public getColorModeDescription(): string {
        let value = this._directory.getInteger(KodakMakernoteDirectory.TAG_COLOR_MODE);
        if (value == null)
            return null;
        switch (value) {
            case 0x001:
            case 0x2000:
                return "B&W";
            case 0x002:
            case 0x4000:
                return "Sepia";
            case 0x003:
                return "B&W Yellow Filter";
            case 0x004:
                return "B&W Red Filter";
            case 0x020:
                return "Saturated Color";
            case 0x040:
            case 0x200:
                return "Neutral Color";
            case 0x100:
                return "Saturated Color";
            default:
                return "Unknown (" + value + ")";
        }
    }
    public getFlashFiredDescription(): string {
        return this.getIndexedDescription(KodakMakernoteDirectory.TAG_FLASH_FIRED, "No", "Yes");
    }
    public getFlashModeDescription(): string {
        let value = this._directory.getInteger(KodakMakernoteDirectory.TAG_FLASH_MODE);
        if (value == null)
            return null;
        switch (value) {
            case 0x00:
                return "Auto";
            case 0x10:
            case 0x01:
                return "Fill Flash";
            case 0x20:
            case 0x02:
                return "Off";
            case 0x40:
            case 0x03:
                return "Red Eye";
            default:
                return "Unknown (" + value + ")";
        }
    }
    public getWhiteBalanceDescription(): string {
        return this.getIndexedDescription(KodakMakernoteDirectory.TAG_WHITE_BALANCE, "Auto", "Flash", "Tungsten", "Daylight");
    }
    public getFocusModeDescription(): string {
        return this.getIndexedDescription(KodakMakernoteDirectory.TAG_FOCUS_MODE, "Normal", null, "Macro");
    }
    public getShutterModeDescription(): string {
        let value = this._directory.getInteger(KodakMakernoteDirectory.TAG_SHUTTER_MODE);
        if (value == null)
            return null;
        switch (value) {
            case 0:
                return "Auto";
            case 8:
                return "Aperture Priority";
            case 32:
                return "Manual";
            default:
                return "Unknown (" + value + ")";
        }
    }
    public getBurstModeDescription(): string {
        return this.getIndexedDescription(KodakMakernoteDirectory.TAG_BURST_MODE, "Off", "On");
    }
    public getQualityDescription(): string {
        return this.getIndexedDescription(KodakMakernoteDirectory.TAG_QUALITY, 1, "Fine", "Normal");
    }
}
