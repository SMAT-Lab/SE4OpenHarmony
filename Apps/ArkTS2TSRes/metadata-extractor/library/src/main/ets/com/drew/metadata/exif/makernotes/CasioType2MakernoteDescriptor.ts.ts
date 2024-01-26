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
import TagDescriptor from '../../TagDescriptor';
import CasioType2MakernoteDirectory from './CasioType2MakernoteDirectory';
export default class CasioType2MakernoteDescriptor extends TagDescriptor<CasioType2MakernoteDirectory> {
    public constructor(directory: CasioType2MakernoteDirectory) {
        super(directory);
    }
    public getDescription(tagType: number): string {
        switch (tagType) {
            case CasioType2MakernoteDirectory.TAG_THUMBNAIL_DIMENSIONS:
                return this.getThumbnailDimensionsDescription();
            case CasioType2MakernoteDirectory.TAG_THUMBNAIL_SIZE:
                return this.getThumbnailSizeDescription();
            case CasioType2MakernoteDirectory.TAG_THUMBNAIL_OFFSET:
                return this.getThumbnailOffsetDescription();
            case CasioType2MakernoteDirectory.TAG_QUALITY_MODE:
                return this.getQualityModeDescription();
            case CasioType2MakernoteDirectory.TAG_IMAGE_SIZE:
                return this.getImageSizeDescription();
            case CasioType2MakernoteDirectory.TAG_FOCUS_MODE_1:
                return this.getFocusMode1Description();
            case CasioType2MakernoteDirectory.TAG_ISO_SENSITIVITY:
                return this.getIsoSensitivityDescription();
            case CasioType2MakernoteDirectory.TAG_WHITE_BALANCE_1:
                return this.getWhiteBalance1Description();
            case CasioType2MakernoteDirectory.TAG_FOCAL_LENGTH:
                return this.getFocalLengthDescription();
            case CasioType2MakernoteDirectory.TAG_SATURATION:
                return this.getSaturationDescription();
            case CasioType2MakernoteDirectory.TAG_CONTRAST:
                return this.getContrastDescription();
            case CasioType2MakernoteDirectory.TAG_SHARPNESS:
                return this.getSharpnessDescription();
            case CasioType2MakernoteDirectory.TAG_PREVIEW_THUMBNAIL:
                return this.getCasioPreviewThumbnailDescription();
            case CasioType2MakernoteDirectory.TAG_WHITE_BALANCE_BIAS:
                return this.getWhiteBalanceBiasDescription();
            case CasioType2MakernoteDirectory.TAG_WHITE_BALANCE_2:
                return this.getWhiteBalance2Description();
            case CasioType2MakernoteDirectory.TAG_OBJECT_DISTANCE:
                return this.getObjectDistanceDescription();
            case CasioType2MakernoteDirectory.TAG_FLASH_DISTANCE:
                return this.getFlashDistanceDescription();
            case CasioType2MakernoteDirectory.TAG_RECORD_MODE:
                return this.getRecordModeDescription();
            case CasioType2MakernoteDirectory.TAG_SELF_TIMER:
                return this.getSelfTimerDescription();
            case CasioType2MakernoteDirectory.TAG_QUALITY:
                return this.getQualityDescription();
            case CasioType2MakernoteDirectory.TAG_FOCUS_MODE_2:
                return this.getFocusMode2Description();
            case CasioType2MakernoteDirectory.TAG_TIME_ZONE:
                return this.getTimeZoneDescription();
            case CasioType2MakernoteDirectory.TAG_CCD_ISO_SENSITIVITY:
                return this.getCcdIsoSensitivityDescription();
            case CasioType2MakernoteDirectory.TAG_COLOUR_MODE:
                return this.getColourModeDescription();
            case CasioType2MakernoteDirectory.TAG_ENHANCEMENT:
                return this.getEnhancementDescription();
            case CasioType2MakernoteDirectory.TAG_FILTER:
                return this.getFilterDescription();
            default:
                return super.getDescription(tagType);
        }
    }
    public getFilterDescription(): string {
        return this.getIndexedDescription(CasioType2MakernoteDirectory.TAG_FILTER, "Off");
    }
    public getEnhancementDescription(): string {
        return this.getIndexedDescription(CasioType2MakernoteDirectory.TAG_ENHANCEMENT, "Off");
    }
    public getColourModeDescription(): string {
        return this.getIndexedDescription(CasioType2MakernoteDirectory.TAG_COLOUR_MODE, "Off");
    }
    public getCcdIsoSensitivityDescription(): string {
        return this.getIndexedDescription(CasioType2MakernoteDirectory.TAG_CCD_ISO_SENSITIVITY, "Off", "On");
    }
    public getTimeZoneDescription(): string {
        return this._directory.getString(CasioType2MakernoteDirectory.TAG_TIME_ZONE);
    }
    public getFocusMode2Description(): string {
        let value: number = this._directory.getInteger(CasioType2MakernoteDirectory.TAG_FOCUS_MODE_2);
        switch (value) {
            case 1: return "Fixation";
            case 6: return "Multi-Area Focus";
            default:
                return "Unknown (" + value + ")";
        }
    }
    public getQualityDescription(): string {
        return this.getIndexedDescription(CasioType2MakernoteDirectory.TAG_QUALITY, 3, "Fine");
    }
    public getSelfTimerDescription(): string {
        return this.getIndexedDescription(CasioType2MakernoteDirectory.TAG_SELF_TIMER, 1, "Off");
    }
    public getRecordModeDescription(): string {
        return this.getIndexedDescription(CasioType2MakernoteDirectory.TAG_RECORD_MODE, 2, "Normal");
    }
    public getFlashDistanceDescription(): string {
        return this.getIndexedDescription(CasioType2MakernoteDirectory.TAG_FLASH_DISTANCE, "Off");
    }
    public getObjectDistanceDescription(): string {
        let value: number = this._directory.getInteger(CasioType2MakernoteDirectory.TAG_OBJECT_DISTANCE);
        return value + " mm";
    }
    public getWhiteBalance2Description(): string {
        let value: number = this._directory.getInteger(CasioType2MakernoteDirectory.TAG_WHITE_BALANCE_2);
        switch (value) {
            case 0: return "Manual";
            case 1: return "Auto"; // unsure about this
            case 4: return "Flash"; // unsure about this
            case 12: return "Flash";
            default:
                return "Unknown (" + value + ")";
        }
    }
    public getWhiteBalanceBiasDescription(): string {
        return this._directory.getString(CasioType2MakernoteDirectory.TAG_WHITE_BALANCE_BIAS);
    }
    public getCasioPreviewThumbnailDescription(): string {
        let bytes: Int8Array = this._directory.getByteArray(CasioType2MakernoteDirectory.TAG_PREVIEW_THUMBNAIL);
        if (bytes == null)
            return null;
        return "<" + bytes.length + " bytes of image data>";
    }
    public getSharpnessDescription(): string {
        return this.getIndexedDescription(CasioType2MakernoteDirectory.TAG_SHARPNESS, "-1", "Normal", "+1");
    }
    public getContrastDescription(): string {
        return this.getIndexedDescription(CasioType2MakernoteDirectory.TAG_CONTRAST, "-1", "Normal", "+1");
    }
    public getSaturationDescription(): string {
        return this.getIndexedDescription(CasioType2MakernoteDirectory.TAG_SATURATION, "-1", "Normal", "+1");
    }
    public getFocalLengthDescription(): string {
        let value: number = this._directory.getDoubleObject(CasioType2MakernoteDirectory.TAG_FOCAL_LENGTH);
        return TagDescriptor.getFocalLengthDescription(value / 10);
    }
    public getWhiteBalance1Description(): string {
        return this.getIndexedDescription(CasioType2MakernoteDirectory.TAG_WHITE_BALANCE_1, "Auto", "Daylight", "Shade", "Tungsten", "Florescent", "Manual");
    }
    public getIsoSensitivityDescription(): string {
        let value: number = this._directory.getInteger(CasioType2MakernoteDirectory.TAG_ISO_SENSITIVITY);
        switch (value) {
            case 3: return "50";
            case 4: return "64";
            case 6: return "100";
            case 9: return "200";
            default:
                return "Unknown (" + value + ")";
        }
    }
    public getFocusMode1Description(): string {
        return this.getIndexedDescription(CasioType2MakernoteDirectory.TAG_FOCUS_MODE_1, "Normal", "Macro");
    }
    public getImageSizeDescription(): string {
        let value: number = this._directory.getInteger(CasioType2MakernoteDirectory.TAG_IMAGE_SIZE);
        switch (value) {
            case 0: return "640 x 480 pixels";
            case 4: return "1600 x 1200 pixels";
            case 5: return "2048 x 1536 pixels";
            case 20: return "2288 x 1712 pixels";
            case 21: return "2592 x 1944 pixels";
            case 22: return "2304 x 1728 pixels";
            case 36: return "3008 x 2008 pixels";
            default: return "Unknown (" + value + ")";
        }
    }
    public getQualityModeDescription(): string {
        return this.getIndexedDescription(CasioType2MakernoteDirectory.TAG_QUALITY_MODE, 1, "Fine", "Super Fine");
    }
    public getThumbnailOffsetDescription(): string {
        return this._directory.getString(CasioType2MakernoteDirectory.TAG_THUMBNAIL_OFFSET);
    }
    public getThumbnailSizeDescription(): string {
        let value: number = this._directory.getInteger(CasioType2MakernoteDirectory.TAG_THUMBNAIL_SIZE);
        return value + " bytes";
    }
    public getThumbnailDimensionsDescription(): string {
        let dimensions: Uint8Array = this._directory.getIntArray(CasioType2MakernoteDirectory.TAG_THUMBNAIL_DIMENSIONS);
        if (dimensions == null || dimensions.length != 2)
            return this._directory.getString(CasioType2MakernoteDirectory.TAG_THUMBNAIL_DIMENSIONS);
        return dimensions[0] + " x " + dimensions[1] + " pixels";
    }
}
