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
import PanasonicMakernoteDirectory from './PanasonicMakernoteDirectory';
import TagDescriptor from '../../TagDescriptor';
import ByteArrayReader from '../../../lang/ByteArrayReader';
import Charsets from '../../../lang/Charsets';
import RandomAccessReader from '../../../lang/RandomAccessReader';
import Age from '../../Age';
import Face from '../../Face';
/**
 * Provides human-readable string representations of tag values stored in a {@link PanasonicMakernoteDirectory}.
 * <p>
 * Some information about this makernote taken from here:
 */
class PanasonicMakernoteDescriptor extends TagDescriptor<PanasonicMakernoteDirectory> {
    constructor(directory: PanasonicMakernoteDirectory) {
        super(directory);
    }
    public getDescription(tagType: number): string {
        switch (tagType) {
            case PanasonicMakernoteDirectory.TAG_QUALITY_MODE:
                return this.getQualityModeDescription();
            case PanasonicMakernoteDirectory.TAG_FIRMWARE_VERSION:
                return this.getVersionDescription();
            case PanasonicMakernoteDirectory.TAG_WHITE_BALANCE:
                return this.getWhiteBalanceDescription();
            case PanasonicMakernoteDirectory.TAG_FOCUS_MODE:
                return this.getFocusModeDescription();
            case PanasonicMakernoteDirectory.TAG_AF_AREA_MODE:
                return this.getAfAreaModeDescription();
            case PanasonicMakernoteDirectory.TAG_IMAGE_STABILIZATION:
                return this.getImageStabilizationDescription();
            case PanasonicMakernoteDirectory.TAG_MACRO_MODE:
                return this.getMacroModeDescription();
            case PanasonicMakernoteDirectory.TAG_RECORD_MODE:
                return this.getRecordModeDescription();
            case PanasonicMakernoteDirectory.TAG_AUDIO:
                return this.getAudioDescription();
            case PanasonicMakernoteDirectory.TAG_UNKNOWN_DATA_DUMP:
                return this.getUnknownDataDumpDescription();
            case PanasonicMakernoteDirectory.TAG_COLOR_EFFECT:
                return this.getColorEffectDescription();
            case PanasonicMakernoteDirectory.TAG_UPTIME:
                return this.getUptimeDescription();
            case PanasonicMakernoteDirectory.TAG_BURST_MODE:
                return this.getBurstModeDescription();
            case PanasonicMakernoteDirectory.TAG_CONTRAST_MODE:
                return this.getContrastModeDescription();
            case PanasonicMakernoteDirectory.TAG_NOISE_REDUCTION:
                return this.getNoiseReductionDescription();
            case PanasonicMakernoteDirectory.TAG_SELF_TIMER:
                return this.getSelfTimerDescription();
            case PanasonicMakernoteDirectory.TAG_ROTATION:
                return this.getRotationDescription();
            case PanasonicMakernoteDirectory.TAG_AF_ASSIST_LAMP:
                return this.getAfAssistLampDescription();
            case PanasonicMakernoteDirectory.TAG_COLOR_MODE:
                return this.getColorModeDescription();
            case PanasonicMakernoteDirectory.TAG_OPTICAL_ZOOM_MODE:
                return this.getOpticalZoomModeDescription();
            case PanasonicMakernoteDirectory.TAG_CONVERSION_LENS:
                return this.getConversionLensDescription();
            case PanasonicMakernoteDirectory.TAG_CONTRAST:
                return this.getContrastDescription();
            case PanasonicMakernoteDirectory.TAG_WORLD_TIME_LOCATION:
                return this.getWorldTimeLocationDescription();
            case PanasonicMakernoteDirectory.TAG_ADVANCED_SCENE_MODE:
                return this.getAdvancedSceneModeDescription();
            case PanasonicMakernoteDirectory.TAG_FACE_DETECTION_INFO:
                return this.getDetectedFacesDescription();
            case PanasonicMakernoteDirectory.TAG_TRANSFORM:
                return this.getTransformDescription();
            case PanasonicMakernoteDirectory.TAG_TRANSFORM_1:
                return this.getTransform1Description();
            case PanasonicMakernoteDirectory.TAG_INTELLIGENT_EXPOSURE:
                return this.getIntelligentExposureDescription();
            case PanasonicMakernoteDirectory.TAG_FLASH_WARNING:
                return this.getFlashWarningDescription();
            case PanasonicMakernoteDirectory.TAG_COUNTRY:
                return this.getCountryDescription();
            case PanasonicMakernoteDirectory.TAG_STATE:
                return this.getStateDescription();
            case PanasonicMakernoteDirectory.TAG_CITY:
                return this.getCityDescription();
            case PanasonicMakernoteDirectory.TAG_LANDMARK:
                return this.getLandmarkDescription();
            case PanasonicMakernoteDirectory.TAG_INTELLIGENT_RESOLUTION:
                return this.getIntelligentResolutionDescription();
            case PanasonicMakernoteDirectory.TAG_FACE_RECOGNITION_INFO:
                return this.getRecognizedFacesDescription();
            case PanasonicMakernoteDirectory.TAG_SCENE_MODE:
                return this.getSceneModeDescription();
            case PanasonicMakernoteDirectory.TAG_FLASH_FIRED:
                return this.getFlashFiredDescription();
            case PanasonicMakernoteDirectory.TAG_TEXT_STAMP:
                return this.getTextStampDescription();
            case PanasonicMakernoteDirectory.TAG_TEXT_STAMP_1:
                return this.getTextStamp1Description();
            case PanasonicMakernoteDirectory.TAG_TEXT_STAMP_2:
                return this.getTextStamp2Description();
            case PanasonicMakernoteDirectory.TAG_TEXT_STAMP_3:
                return this.getTextStamp3Description();
            case PanasonicMakernoteDirectory.TAG_MAKERNOTE_VERSION:
                return this.getMakernoteVersionDescription();
            case PanasonicMakernoteDirectory.TAG_EXIF_VERSION:
                return this.getExifVersionDescription();
            case PanasonicMakernoteDirectory.TAG_INTERNAL_SERIAL_NUMBER:
                return this.getInternalSerialNumberDescription();
            case PanasonicMakernoteDirectory.TAG_TITLE:
                return this.getTitleDescription();
            case PanasonicMakernoteDirectory.TAG_BRACKET_SETTINGS:
                return this.getBracketSettingsDescription();
            case PanasonicMakernoteDirectory.TAG_FLASH_CURTAIN:
                return this.getFlashCurtainDescription();
            case PanasonicMakernoteDirectory.TAG_LONG_EXPOSURE_NOISE_REDUCTION:
                return this.getLongExposureNoiseReductionDescription();
            case PanasonicMakernoteDirectory.TAG_BABY_NAME:
                return this.getBabyNameDescription();
            case PanasonicMakernoteDirectory.TAG_LOCATION:
                return this.getLocationDescription();
            case PanasonicMakernoteDirectory.TAG_LENS_FIRMWARE_VERSION:
                return this.getLensFirmwareVersionDescription();
            case PanasonicMakernoteDirectory.TAG_INTELLIGENT_D_RANGE:
                return this.getIntelligentDRangeDescription();
            case PanasonicMakernoteDirectory.TAG_CLEAR_RETOUCH:
                return this.getClearRetouchDescription();
            case PanasonicMakernoteDirectory.TAG_PHOTO_STYLE:
                return this.getPhotoStyleDescription();
            case PanasonicMakernoteDirectory.TAG_SHADING_COMPENSATION:
                return this.getShadingCompensationDescription();
            case PanasonicMakernoteDirectory.TAG_ACCELEROMETER_Z:
                return this.getAccelerometerZDescription();
            case PanasonicMakernoteDirectory.TAG_ACCELEROMETER_X:
                return this.getAccelerometerXDescription();
            case PanasonicMakernoteDirectory.TAG_ACCELEROMETER_Y:
                return this.getAccelerometerYDescription();
            case PanasonicMakernoteDirectory.TAG_CAMERA_ORIENTATION:
                return this.getCameraOrientationDescription();
            case PanasonicMakernoteDirectory.TAG_ROLL_ANGLE:
                return this.getRollAngleDescription();
            case PanasonicMakernoteDirectory.TAG_PITCH_ANGLE:
                return this.getPitchAngleDescription();
            case PanasonicMakernoteDirectory.TAG_SWEEP_PANORAMA_DIRECTION:
                return this.getSweepPanoramaDirectionDescription();
            case PanasonicMakernoteDirectory.TAG_TIMER_RECORDING:
                return this.getTimerRecordingDescription();
            case PanasonicMakernoteDirectory.TAG_HDR:
                return this.getHDRDescription();
            case PanasonicMakernoteDirectory.TAG_SHUTTER_TYPE:
                return this.getShutterTypeDescription();
            case PanasonicMakernoteDirectory.TAG_TOUCH_AE:
                return this.getTouchAeDescription();
            case PanasonicMakernoteDirectory.TAG_BABY_AGE:
                return this.getBabyAgeDescription();
            case PanasonicMakernoteDirectory.TAG_BABY_AGE_1:
                return this.getBabyAge1Description();
            default:
                return super.getDescription(tagType);
        }
    }
    public getTextStampDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_TEXT_STAMP, 1, "Off", "On");
    }
    public getTextStamp1Description(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_TEXT_STAMP_1, 1, "Off", "On");
    }
    public getTextStamp2Description(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_TEXT_STAMP_2, 1, "Off", "On");
    }
    public getTextStamp3Description(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_TEXT_STAMP_3, 1, "Off", "On");
    }
    public getMacroModeDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_MACRO_MODE, 1, "Off", "On");
    }
    public getFlashFiredDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_FLASH_FIRED, 1, "Off", "On");
    }
    public getImageStabilizationDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_IMAGE_STABILIZATION, 2, "On, Mode 1", "Off", "On, Mode 2");
    }
    public getAudioDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_AUDIO, 1, "Off", "On");
    }
    public getTransformDescription(): string {
        return this.getTransformDescription1(PanasonicMakernoteDirectory.TAG_TRANSFORM);
    }
    public getTransform1Description(): string {
        return this.getTransformDescription1(PanasonicMakernoteDirectory.TAG_TRANSFORM_1);
    }
    private getTransformDescription1(tag: number): string {
        let values = this._directory.getByteArray(tag);
        if (values == null)
            return null;
        let reader: RandomAccessReader = new ByteArrayReader(values);
        try {
            let val1 = reader.getUInt16(0);
            let val2 = reader.getUInt16(2);
            if (val1 == -1 && val2 == 1)
                return "Slim Low";
            if (val1 == -3 && val2 == 2)
                return "Slim High";
            if (val1 == 0 && val2 == 0)
                return "Off";
            if (val1 == 1 && val2 == 1)
                return "Stretch Low";
            if (val1 == 3 && val2 == 2)
                return "Stretch High";
            return "Unknown (" + val1 + " " + val2 + ")";
        }
        catch (e) {
            return null;
        }
    }
    public getIntelligentExposureDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_INTELLIGENT_EXPOSURE, "Off", "Low", "Standard", "High");
    }
    public getFlashWarningDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_FLASH_WARNING, "No", "Yes (Flash required but disabled)");
    }
    private static trim(s: string): string {
        return s == null ? null : s.trim();
    }
    public getCountryDescription(): string {
        return PanasonicMakernoteDescriptor.trim(this.getStringFromBytes(PanasonicMakernoteDirectory.TAG_COUNTRY, Charsets.UTF_8));
    }
    public getStateDescription(): string {
        return PanasonicMakernoteDescriptor.trim(this.getStringFromBytes(PanasonicMakernoteDirectory.TAG_STATE, Charsets.UTF_8));
    }
    public getCityDescription(): string {
        return PanasonicMakernoteDescriptor.trim(this.getStringFromBytes(PanasonicMakernoteDirectory.TAG_CITY, Charsets.UTF_8));
    }
    public getLandmarkDescription(): string {
        return PanasonicMakernoteDescriptor.trim(this.getStringFromBytes(PanasonicMakernoteDirectory.TAG_LANDMARK, Charsets.UTF_8));
    }
    public getTitleDescription(): string {
        return PanasonicMakernoteDescriptor.trim(this.getStringFromBytes(PanasonicMakernoteDirectory.TAG_TITLE, Charsets.UTF_8));
    }
    public getBracketSettingsDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_BRACKET_SETTINGS, "No Bracket", "3 Images, Sequence 0/-/+", "3 Images, Sequence -/0/+", "5 Images, Sequence 0/-/+", "5 Images, Sequence -/0/+", "7 Images, Sequence 0/-/+", "7 Images, Sequence -/0/+");
    }
    public getFlashCurtainDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_FLASH_CURTAIN, "n/a", "1st", "2nd");
    }
    public getLongExposureNoiseReductionDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_LONG_EXPOSURE_NOISE_REDUCTION, 1, "Off", "On");
    }
    public getLensFirmwareVersionDescription(): string {
        // lens version has 4 parts separated by periods
        let bytes = this._directory.getByteArray(PanasonicMakernoteDirectory.TAG_LENS_FIRMWARE_VERSION);
        if (bytes == null)
            return null;
        let sb: string = '';
        for (let i = 0; i < bytes.length; i++) {
            sb.concat(bytes[i].toString());
            if (i < bytes.length - 1)
                sb.concat(".");
        }
        return sb.toString();
        //return string.Join(".", bytes.Select(b => b.ToString()).ToArray());
    }
    public getIntelligentDRangeDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_INTELLIGENT_D_RANGE, "Off", "Low", "Standard", "High");
    }
    public getClearRetouchDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_CLEAR_RETOUCH, "Off", "On");
    }
    public getPhotoStyleDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_PHOTO_STYLE, "Auto", "Standard or Custom", "Vivid", "Natural", "Monochrome", "Scenery", "Portrait");
    }
    public getShadingCompensationDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_SHADING_COMPENSATION, "Off", "On");
    }
    public getAccelerometerZDescription(): string {
        let value = this._directory.getInteger(PanasonicMakernoteDirectory.TAG_ACCELEROMETER_Z);
        if (value == null)
            return null;
        // positive is acceleration upwards
        return value.shortValue().valueOf();
    }
    public getAccelerometerXDescription(): string {
        let value = this._directory.getInteger(PanasonicMakernoteDirectory.TAG_ACCELEROMETER_X);
        if (value == null)
            return null;
        // positive is acceleration to the left
        return value.shortValue().valueOf();
    }
    public getAccelerometerYDescription(): string {
        let value = this._directory.getInteger(PanasonicMakernoteDirectory.TAG_ACCELEROMETER_Y);
        if (value == null)
            return null;
        // positive is acceleration backwards
        return value.shortValue().valueOf();
    }
    public getCameraOrientationDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_CAMERA_ORIENTATION, "Normal", "Rotate CW", "Rotate 180", "Rotate CCW", "Tilt Upwards", "Tile Downwards");
    }
    public getRollAngleDescription(): string {
        let value = this._directory.getInteger(PanasonicMakernoteDirectory.TAG_ROLL_ANGLE);
        if (value == null)
            return null;
        // converted to degrees of clockwise camera rotation
        return (value.shortValue() / 10.0).toFixed(4);
    }
    public getPitchAngleDescription(): string {
        let value = this._directory.getInteger(PanasonicMakernoteDirectory.TAG_PITCH_ANGLE);
        if (value == null)
            return null;
        // converted to degrees of upward camera tilt
        return (-value.shortValue() / 10.0).toFixed(4);
    }
    public getSweepPanoramaDirectionDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_SWEEP_PANORAMA_DIRECTION, "Off", "Left to Right", "Right to Left", "Top to Bottom", "Bottom to Top");
    }
    public getTimerRecordingDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_TIMER_RECORDING, "Off", "Time Lapse", "Stop-motion Animation");
    }
    public getHDRDescription(): string {
        let value = this._directory.getInteger(PanasonicMakernoteDirectory.TAG_HDR);
        if (value == null)
            return null;
        switch (value) {
            case 0:
                return "Off";
            case 100:
                return "1 EV";
            case 200:
                return "2 EV";
            case 300:
                return "3 EV";
            case 32868:
                return "1 EV (Auto)";
            case 32968:
                return "2 EV (Auto)";
            case 33068:
                return "3 EV (Auto)";
            default:
                return "Unknown (" + parseInt(value).toString() + ")";
        }
    }
    public getShutterTypeDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_SHUTTER_TYPE, "Mechanical", "Electronic", "Hybrid");
    }
    public getTouchAeDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_TOUCH_AE, "Off", "On");
    }
    public getBabyNameDescription(): string {
        return PanasonicMakernoteDescriptor.trim(this.getStringFromBytes(PanasonicMakernoteDirectory.TAG_BABY_NAME, Charsets.UTF_8));
    }
    public getLocationDescription(): string {
        return PanasonicMakernoteDescriptor.trim(this.getStringFromBytes(PanasonicMakernoteDirectory.TAG_LOCATION, Charsets.UTF_8));
    }
    public getIntelligentResolutionDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_INTELLIGENT_RESOLUTION, "Off", null, "Auto", "On");
    }
    public getContrastDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_CONTRAST, "Normal");
    }
    public getWorldTimeLocationDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_WORLD_TIME_LOCATION, 1, "Home", "Destination");
    }
    public getAdvancedSceneModeDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_ADVANCED_SCENE_MODE, 1, "Normal", "Outdoor/Illuminations/Flower/HDR Art", "Indoor/Architecture/Objects/HDR B&W", "Creative", "Auto", null, "Expressive", "Retro", "Pure", "Elegant", null, "Monochrome", "Dynamic Art", "Silhouette");
    }
    public getUnknownDataDumpDescription(): string {
        return this.getByteLengthDescription(PanasonicMakernoteDirectory.TAG_UNKNOWN_DATA_DUMP);
    }
    public getColorEffectDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_COLOR_EFFECT, 1, "Off", "Warm", "Cool", "Black & White", "Sepia");
    }
    public getUptimeDescription(): string {
        let value = this._directory.getInteger(PanasonicMakernoteDirectory.TAG_UPTIME);
        if (value == null)
            return null;
        return value / 100 + " s";
    }
    public getBurstModeDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_BURST_MODE, "Off", null, "On", "Indefinite", "Unlimited");
    }
    public getContrastModeDescription(): string {
        let value = this._directory.getInteger(PanasonicMakernoteDirectory.TAG_CONTRAST_MODE);
        if (value == null)
            return null;
        switch (value) {
            case 0x0: return "Normal";
            case 0x1: return "Low";
            case 0x2: return "High";
            case 0x6: return "Medium Low";
            case 0x7: return "Medium High";
            case 0x100: return "Low";
            case 0x110: return "Normal";
            case 0x120: return "High";
            default:
                return "Unknown (" + value + ")";
        }
    }
    public getNoiseReductionDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_NOISE_REDUCTION, "Standard (0)", "Low (-1)", "High (+1)", "Lowest (-2)", "Highest (+2)");
    }
    public getSelfTimerDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_SELF_TIMER, 1, "Off", "10 s", "2 s");
    }
    public getRotationDescription(): string {
        let value = this._directory.getInteger(PanasonicMakernoteDirectory.TAG_ROTATION);
        if (value == null)
            return null;
        switch (value) {
            case 1: return "Horizontal";
            case 3: return "Rotate 180";
            case 6: return "Rotate 90 CW";
            case 8: return "Rotate 270 CW";
            default:
                return "Unknown (" + value + ")";
        }
    }
    public getAfAssistLampDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_AF_ASSIST_LAMP, 1, "Fired", "Enabled but not used", "Disabled but required", "Disabled and not required");
    }
    public getColorModeDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_COLOR_MODE, "Normal", "Natural", "Vivid");
    }
    public getOpticalZoomModeDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_OPTICAL_ZOOM_MODE, 1, "Standard", "Extended");
    }
    public getConversionLensDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_CONVERSION_LENS, 1, "Off", "Wide", "Telephoto", "Macro");
    }
    public getDetectedFacesDescription(): string {
        return this.buildFacesDescription(this._directory.getDetectedFaces());
    }
    public getRecognizedFacesDescription(): string {
        return this.buildFacesDescription(this._directory.getRecognizedFaces());
    }
    private buildFacesDescription(faces: Face[]): string {
        if (faces == null)
            return null;
        var result: string = '';
        for (let i = 0; i < faces.length; i++)
            result.concat("Face ").concat((i + 1).toString()).concat(": ").concat(faces[i].toString()).concat("\n");
        return result.length > 0 ? result.substring(0, result.length - 1) : null;
    }
    private static _sceneModes: Array<string> = [
        "Normal",
        "Portrait",
        "Scenery",
        "Sports",
        "Night Portrait",
        "Program",
        "Aperture Priority",
        "Shutter Priority",
        "Macro",
        "Spot",
        "Manual",
        "Movie Preview",
        "Panning",
        "Simple",
        "Color Effects",
        "Self Portrait",
        "Economy",
        "Fireworks",
        "Party",
        "Snow",
        "Night Scenery",
        "Food",
        "Baby",
        "Soft Skin",
        "Candlelight",
        "Starry Night",
        "High Sensitivity",
        "Panorama Assist",
        "Underwater",
        "Beach",
        "Aerial Photo",
        "Sunset",
        "Pet",
        "Intelligent ISO",
        "Clipboard",
        "High Speed Continuous Shooting",
        "Intelligent Auto",
        null,
        "Multi-aspect",
        null,
        "Transform",
        "Flash Burst",
        "Pin Hole",
        "Film Grain",
        "My Color",
        "Photo Frame",
        null,
        null,
        null,
        null,
        "HDR"
    ];
    public getRecordModeDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_RECORD_MODE, 1, PanasonicMakernoteDescriptor._sceneModes.toString());
    }
    public getSceneModeDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_SCENE_MODE, 1, PanasonicMakernoteDescriptor._sceneModes.toString());
    }
    public getFocusModeDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_FOCUS_MODE, 1, "Auto", "Manual", null, "Auto, Focus Button", "Auto, Continuous");
    }
    public getAfAreaModeDescription(): string {
        let value = this._directory.getIntArray(PanasonicMakernoteDirectory.TAG_AF_AREA_MODE);
        if (value == null || value.length < 2)
            return null;
        switch (value[0]) {
            case 0:
                switch (value[1]) {
                    case 1: return "Spot Mode On";
                    case 16: return "Spot Mode Off";
                    default: return "Unknown (" + value[0] + " " + value[1] + ")";
                }
            case 1:
                switch (value[1]) {
                    case 0: return "Spot Focusing";
                    case 1: return "5-area";
                    default: return "Unknown (" + value[0] + " " + value[1] + ")";
                }
            case 16:
                switch (value[1]) {
                    case 0: return "1-area";
                    case 16: return "1-area (high speed)";
                    default: return "Unknown (" + value[0] + " " + value[1] + ")";
                }
            case 32:
                switch (value[1]) {
                    case 0: return "Auto or Face Detect";
                    case 1: return "3-area (left)";
                    case 2: return "3-area (center)";
                    case 3: return "3-area (right)";
                    default: return "Unknown (" + value[0] + " " + value[1] + ")";
                }
            case 64: return "Face Detect";
            default: return "Unknown (" + value[0] + " " + value[1] + ")";
        }
    }
    public getQualityModeDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_QUALITY_MODE, 2, "High", // 2
        "Normal", null, null, "Very High", "Raw", null, "Motion Picture" // 9
        );
    }
    public getVersionDescription(): string {
        return this.getVersionBytesDescription(PanasonicMakernoteDirectory.TAG_FIRMWARE_VERSION, 2);
    }
    public getMakernoteVersionDescription(): string {
        return this.getVersionBytesDescription(PanasonicMakernoteDirectory.TAG_MAKERNOTE_VERSION, 2);
    }
    public getExifVersionDescription(): string {
        return this.getVersionBytesDescription(PanasonicMakernoteDirectory.TAG_EXIF_VERSION, 2);
    }
    public getInternalSerialNumberDescription(): string {
        return this.get7BitStringFromBytes(PanasonicMakernoteDirectory.TAG_INTERNAL_SERIAL_NUMBER);
    }
    public getWhiteBalanceDescription(): string {
        return this.getIndexedDescription(PanasonicMakernoteDirectory.TAG_WHITE_BALANCE, 1, "Auto", // 1
        "Daylight", "Cloudy", "Incandescent", "Manual", null, null, "Flash", null, "Black & White", // 10
        "Manual", "Shade" // 12
        );
    }
    public getBabyAgeDescription(): string {
        let age: Age = this._directory.getAge(PanasonicMakernoteDirectory.TAG_BABY_AGE);
        return age == null ? null : age.toFriendlyString();
    }
    public getBabyAge1Description(): string {
        let age: Age = this._directory.getAge(PanasonicMakernoteDirectory.TAG_BABY_AGE_1);
        return age == null ? null : age.toFriendlyString();
    }
}
export default PanasonicMakernoteDescriptor;
