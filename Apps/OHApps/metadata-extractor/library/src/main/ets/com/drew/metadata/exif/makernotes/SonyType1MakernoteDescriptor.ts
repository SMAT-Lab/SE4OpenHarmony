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

import SonyType1MakernoteDirectory from './SonyType1MakernoteDirectory';
import TagDescriptor from '../../TagDescriptor';
import util from '@ohos.util';

/**
 * Provides human-readable string representations of tag values stored in a {@link SonyType1MakernoteDirectory}.
 */
class SonyType1MakernoteDescriptor extends TagDescriptor<SonyType1MakernoteDirectory> {
  public constructor(directory: SonyType1MakernoteDirectory) {
    super(directory);
  }

  public getDescription(tagType: number): string
  {
    switch (tagType) {
      case SonyType1MakernoteDirectory.TAG_IMAGE_QUALITY:
        return this.getImageQualityDescription();
      case SonyType1MakernoteDirectory.TAG_FLASH_EXPOSURE_COMP:
        return this.getFlashExposureCompensationDescription();
      case SonyType1MakernoteDirectory.TAG_TELECONVERTER:
        return this.getTeleconverterDescription();
      case SonyType1MakernoteDirectory.TAG_WHITE_BALANCE:
        return this.getWhiteBalanceDescription();
      case SonyType1MakernoteDirectory.TAG_COLOR_TEMPERATURE:
        return this.getColorTemperatureDescription();
      case SonyType1MakernoteDirectory.TAG_SCENE_MODE:
        return this.getSceneModeDescription();
      case SonyType1MakernoteDirectory.TAG_ZONE_MATCHING:
        return this.getZoneMatchingDescription();
      case SonyType1MakernoteDirectory.TAG_DYNAMIC_RANGE_OPTIMISER:
        return this.getDynamicRangeOptimizerDescription();
      case SonyType1MakernoteDirectory.TAG_IMAGE_STABILISATION:
        return this.getImageStabilizationDescription();
    // Unfortunately it seems that there is no definite mapping between a lens ID and a lens model
    // http://gvsoft.homedns.org/exif/makernote-sony-type1.html#0xb027
    //            case SonyType1MakernoteDirectory.TAG_LENS_ID:
    //                return this.getLensIDDescription();
      case SonyType1MakernoteDirectory.TAG_COLOR_MODE:
        return this.getColorModeDescription();
      case SonyType1MakernoteDirectory.TAG_MACRO:
        return this.getMacroDescription();
      case SonyType1MakernoteDirectory.TAG_EXPOSURE_MODE:
        return this.getExposureModeDescription();
      case SonyType1MakernoteDirectory.TAG_JPEG_QUALITY:
        return this.getJpegQualityDescription();
      case SonyType1MakernoteDirectory.TAG_ANTI_BLUR:
        return this.getAntiBlurDescription();
      case SonyType1MakernoteDirectory.TAG_LONG_EXPOSURE_NOISE_REDUCTION_OR_FOCUS_MODE:
        return this.getLongExposureNoiseReductionDescription();
      case SonyType1MakernoteDirectory.TAG_HIGH_ISO_NOISE_REDUCTION:
        return this.getHighIsoNoiseReductionDescription();
      case SonyType1MakernoteDirectory.TAG_PICTURE_EFFECT:
        return this.getPictureEffectDescription();
      case SonyType1MakernoteDirectory.TAG_SOFT_SKIN_EFFECT:
        return this.getSoftSkinEffectDescription();
      case SonyType1MakernoteDirectory.TAG_VIGNETTING_CORRECTION:
        return this.getVignettingCorrectionDescription();
      case SonyType1MakernoteDirectory.TAG_LATERAL_CHROMATIC_ABERRATION:
        return this.getLateralChromaticAberrationDescription();
      case SonyType1MakernoteDirectory.TAG_DISTORTION_CORRECTION:
        return this.getDistortionCorrectionDescription();
      case SonyType1MakernoteDirectory.TAG_AUTO_PORTRAIT_FRAMED:
        return this.getAutoPortraitFramedDescription();
      case SonyType1MakernoteDirectory.TAG_FOCUS_MODE:
        return this.getFocusModeDescription();
      case SonyType1MakernoteDirectory.TAG_AF_POINT_SELECTED:
        return this.getAFPointSelectedDescription();
      case SonyType1MakernoteDirectory.TAG_SONY_MODEL_ID:
        return this.getSonyModelIdDescription();
      case SonyType1MakernoteDirectory.TAG_AF_MODE:
        return this.getAFModeDescription();
      case SonyType1MakernoteDirectory.TAG_AF_ILLUMINATOR:
        return this.getAFIlluminatorDescription();
      case SonyType1MakernoteDirectory.TAG_FLASH_LEVEL:
        return this.getFlashLevelDescription();
      case SonyType1MakernoteDirectory.TAG_RELEASE_MODE:
        return this.getReleaseModeDescription();
      case SonyType1MakernoteDirectory.TAG_SEQUENCE_NUMBER:
        return this.getSequenceNumberDescription();
      default:
        return super.getDescription(tagType);
    }
  }

  public getImageQualityDescription(): string
  {
    return this.getIndexedDescription(SonyType1MakernoteDirectory.TAG_IMAGE_QUALITY,
      "RAW",
      "Super Fine",
      "Fine",
      "Standard",
      "Economy",
      "Extra Fine",
      "RAW + JPEG",
      "Compressed RAW",
      "Compressed RAW + JPEG");
  }

  public getFlashExposureCompensationDescription(): string
  {
    return this.getFormattedInt(SonyType1MakernoteDirectory.TAG_FLASH_EXPOSURE_COMP, "%d EV");
  }

  public getTeleconverterDescription(): string
  {
    let value: number = this._directory.getInteger(SonyType1MakernoteDirectory.TAG_TELECONVERTER);
    if (value == null)
    return null;
    switch (value) {
      case 0x00:
        return "None";
      case 0x48:
        return "Minolta/Sony AF 2x APO (D)";
      case 0x50:
        return "Minolta AF 2x APO II";
      case 0x60:
        return "Minolta AF 2x APO";
      case 0x88:
        return "Minolta/Sony AF 1.4x APO (D)";
      case 0x90:
        return "Minolta AF 1.4x APO II";
      case 0xa0:
        return "Minolta AF 1.4x APO";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getWhiteBalanceDescription(): string
  {
    let value: number = this._directory.getInteger(SonyType1MakernoteDirectory.TAG_WHITE_BALANCE);
    if (value == null)
    return null;
    switch (value) {
      case 0x00:
        return "Auto";
      case 0x01:
        return "Color Temperature/Color Filter";
      case 0x10:
        return "Daylight";
      case 0x20:
        return "Cloudy";
      case 0x30:
        return "Shade";
      case 0x40:
        return "Tungsten";
      case 0x50:
        return "Flash";
      case 0x60:
        return "Fluorescent";
      case 0x70:
        return "Custom";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getColorTemperatureDescription(): string
  {
    let value: number = this._directory.getInteger(SonyType1MakernoteDirectory.TAG_COLOR_TEMPERATURE);
    if (value == null)
    return null;
    if (value == 0)
    return "Auto";
    let kelvin: number = ((value & 0x00FF0000) >> 8) | ((value & 0xFF000000) >> 24);
    return util.printf("%d K", kelvin);
  }

  public getZoneMatchingDescription(): string
  {
    return this.getIndexedDescription(SonyType1MakernoteDirectory.TAG_ZONE_MATCHING,
      "ISO Setting Used", "High Key", "Low Key");
  }

  public getDynamicRangeOptimizerDescription(): string
  {
    let value: number = this._directory.getInteger(SonyType1MakernoteDirectory.TAG_DYNAMIC_RANGE_OPTIMISER);
    if (value == null)
    return null;
    switch (value) {
      case 0:
        return "Off";
      case 1:
        return "Standard";
      case 2:
        return "Advanced Auto";
      case 3:
        return "Auto";
      case 8:
        return "Advanced LV1";
      case 9:
        return "Advanced LV2";
      case 10:
        return "Advanced LV3";
      case 11:
        return "Advanced LV4";
      case 12:
        return "Advanced LV5";
      case 16:
        return "LV1";
      case 17:
        return "LV2";
      case 18:
        return "LV3";
      case 19:
        return "LV4";
      case 20:
        return "LV5";
      default:
        return util.printf("Unknown (%d)", value);
    }
  }

  public getImageStabilizationDescription(): string
  {
    let value: number = this._directory.getInteger(SonyType1MakernoteDirectory.TAG_IMAGE_STABILISATION);
    if (value == null)
    return null;
    switch (value) {
      case 0:
        return "Off";
      case 1:
        return "On";
      default:
        return "N/A";
    }
  }

  public getColorModeDescription(): string
  {
    let value: number = this._directory.getInteger(SonyType1MakernoteDirectory.TAG_COLOR_MODE);
    if (value == null)
    return null;
    switch (value) {
      case 0:
        return "Standard";
      case 1:
        return "Vivid";
      case 2:
        return "Portrait";
      case 3:
        return "Landscape";
      case 4:
        return "Sunset";
      case 5:
        return "Night Portrait";
      case 6:
        return "Black & White";
      case 7:
        return "Adobe RGB";
      case 12:
      case 100:
        return "Neutral";
      case 13:
      case 101:
        return "Clear";
      case 14:
      case 102:
        return "Deep";
      case 15:
      case 103:
        return "Light";
      case 16:
        return "Autumn";
      case 17:
        return "Sepia";
      case 104:
        return "Night View";
      case 105:
        return "Autumn Leaves";
      default:
        return util.printf("Unknown (%d)", value);
    }
  }

  public getMacroDescription(): string
  {
    let value: number = this._directory.getInteger(SonyType1MakernoteDirectory.TAG_MACRO);
    if (value == null)
    return null;
    switch (value) {
      case 0:
        return "Off";
      case 1:
        return "On";
      case 2:
        return "Magnifying Glass/Super Macro";
      case 0xFFFF:
        return "N/A";
      default:
        return util.printf("Unknown (%d)", value);
    }
  }

  public getExposureModeDescription(): string
  {
    let value: number = this._directory.getInteger(SonyType1MakernoteDirectory.TAG_EXPOSURE_MODE);
    if (value == null)
    return null;
    switch (value) {
      case 0:
        return "Program";
      case 1:
        return "Portrait";
      case 2:
        return "Beach";
      case 3:
        return "Sports";
      case 4:
        return "Snow";
      case 5:
        return "Landscape";
      case 6:
        return "Auto";
      case 7:
        return "Aperture Priority";
      case 8:
        return "Shutter Priority";
      case 9:
        return "Night Scene / Twilight";
      case 10:
        return "Hi-Speed Shutter";
      case 11:
        return "Twilight Portrait";
      case 12:
        return "Soft Snap/Portrait";
      case 13:
        return "Fireworks";
      case 14:
        return "Smile Shutter";
      case 15:
        return "Manual";
      case 18:
        return "High Sensitivity";
      case 19:
        return "Macro";
      case 20:
        return "Advanced Sports Shooting";
      case 29:
        return "Underwater";
      case 33:
        return "Food";
      case 34:
        return "Panorama";
      case 35:
        return "Handheld Night Shot";
      case 36:
        return "Anti Motion Blur";
      case 37:
        return "Pet";
      case 38:
        return "Backlight Correction HDR";
      case 39:
        return "Superior Auto";
      case 40:
        return "Background Defocus";
      case 41:
        return "Soft Skin";
      case 42:
        return "3D Image";
      case 0xFFFF:
        return "N/A";
      default:
        return util.printf("Unknown (%d)", value);
    }
  }

  public getJpegQualityDescription(): string
  {
    let value: number = this._directory.getInteger(SonyType1MakernoteDirectory.TAG_JPEG_QUALITY);
    if (value == null)
    return null;
    switch (value) {
      case 0:
        return "Normal";
      case 1:
        return "Fine";
      case 2:
        return "Extra Fine";
      case 0xFFFF:
        return "N/A";
      default:
        return util.printf("Unknown (%d)", value);
    }
  }

  public getAntiBlurDescription(): string
  {
    let value: number = this._directory.getInteger(SonyType1MakernoteDirectory.TAG_ANTI_BLUR);
    if (value == null)
    return null;
    switch (value) {
      case 0:
        return "Off";
      case 1:
        return "On (Continuous)";
      case 2:
        return "On (Shooting)";
      case 0xFFFF:
        return "N/A";
      default:
        return util.printf("Unknown (%d)", value);
    }
  }

  public getLongExposureNoiseReductionDescription(): string
  {
    let value: number = this._directory.getInteger(SonyType1MakernoteDirectory.TAG_LONG_EXPOSURE_NOISE_REDUCTION_OR_FOCUS_MODE);
    if (value == null)
    return null;
    switch (value) {
      case 0:
        return "Off";
      case 1:
        return "On";
      case 0xFFFF:
        return "N/A";
      default:
        return util.printf("Unknown (%d)", value);
    }
  }

  public getHighIsoNoiseReductionDescription(): string
  {
    let value: number = this._directory.getInteger(SonyType1MakernoteDirectory.TAG_HIGH_ISO_NOISE_REDUCTION);
    if (value == null)
    return null;
    switch (value) {
      case 0:
        return "Off";
      case 1:
        return "On";
      case 2:
        return "Normal";
      case 3:
        return "High";
      case 0x100:
        return "Auto";
      case 0xffff:
        return "N/A";
      default:
        return util.printf("Unknown (%d)", value);
    }
  }

  public getPictureEffectDescription(): string
  {
    let value: number = this._directory.getInteger(SonyType1MakernoteDirectory.TAG_PICTURE_EFFECT);
    if (value == null)
    return null;
    switch (value) {
      case 0:
        return "Off";
      case 1:
        return "Toy Camera";
      case 2:
        return "Pop Color";
      case 3:
        return "Posterization";
      case 4:
        return "Posterization B/W";
      case 5:
        return "Retro Photo";
      case 6:
        return "Soft High Key";
      case 7:
        return "Partial Color (red)";
      case 8:
        return "Partial Color (green)";
      case 9:
        return "Partial Color (blue)";
      case 10:
        return "Partial Color (yellow)";
      case 13:
        return "High Contrast Monochrome";
      case 16:
        return "Toy Camera (normal)";
      case 17:
        return "Toy Camera (cool)";
      case 18:
        return "Toy Camera (warm)";
      case 19:
        return "Toy Camera (green)";
      case 20:
        return "Toy Camera (magenta)";
      case 32:
        return "Soft Focus (low)";
      case 33:
        return "Soft Focus";
      case 34:
        return "Soft Focus (high)";
      case 48:
        return "Miniature (auto)";
      case 49:
        return "Miniature (top)";
      case 50:
        return "Miniature (middle horizontal)";
      case 51:
        return "Miniature (bottom)";
      case 52:
        return "Miniature (left)";
      case 53:
        return "Miniature (middle vertical)";
      case 54:
        return "Miniature (right)";
      case 64:
        return "HDR Painting (low)";
      case 65:
        return "HDR Painting";
      case 66:
        return "HDR Painting (high)";
      case 80:
        return "Rich-tone Monochrome";
      case 97:
        return "Water Color";
      case 98:
        return "Water Color 2";
      case 112:
        return "Illustration (low)";
      case 113:
        return "Illustration";
      case 114:
        return "Illustration (high)";
      default:
        return util.printf("Unknown (%d)", value);
    }
  }

  public getSoftSkinEffectDescription(): string
  {
    return this.getIndexedDescription(SonyType1MakernoteDirectory.TAG_SOFT_SKIN_EFFECT, "Off", "Low", "Mid", "High");
  }

  public getVignettingCorrectionDescription(): string
  {
    let value: number = this._directory.getInteger(SonyType1MakernoteDirectory.TAG_VIGNETTING_CORRECTION);
    if (value == null)
    return null;
    switch (value) {
      case 0:
        return "Off";
      case 2:
        return "Auto";
      case 0xffffffff:
        return "N/A";
      default:
        return util.printf("Unknown (%d)", value);
    }
  }

  public getLateralChromaticAberrationDescription(): string
  {
    let value: number = this._directory.getInteger(SonyType1MakernoteDirectory.TAG_LATERAL_CHROMATIC_ABERRATION);
    if (value == null)
    return null;
    switch (value) {
      case 0:
        return "Off";
      case 2:
        return "Auto";
      case 0xffffffff:
        return "N/A";
      default:
        return util.printf("Unknown (%d)", value);
    }
  }

  public getDistortionCorrectionDescription(): string
  {
    let value: number = this._directory.getInteger(SonyType1MakernoteDirectory.TAG_DISTORTION_CORRECTION);
    if (value == null)
    return null;
    switch (value) {
      case 0:
        return "Off";
      case 2:
        return "Auto";
      case 0xffffffff:
        return "N/A";
      default:
        return util.printf("Unknown (%d)", value);
    }
  }

  public getAutoPortraitFramedDescription(): string
  {
    return this.getIndexedDescription(SonyType1MakernoteDirectory.TAG_AUTO_PORTRAIT_FRAMED, "No", "Yes");
  }

  public getFocusModeDescription(): string
  {
    return this.getIndexedDescription(SonyType1MakernoteDirectory.TAG_FOCUS_MODE,
      "Manual", null, "AF-A", "AF-C", "AF-S", null, "DMF", "AF-D");
  }

  public getAFPointSelectedDescription(): string
  {
    return this.getIndexedDescription(SonyType1MakernoteDirectory.TAG_AF_POINT_SELECTED,
      "Auto", // 0
      "Center", // 1
      "Top", // 2
      "Upper-right", // 3
      "Right", // 4
      "Lower-right", // 5
      "Bottom", // 6
      "Lower-left", // 7
      "Left", // 8
      "Upper-left	  	", // 9
      "Far Right", // 10
      "Far Left", // 11
      "Upper-middle", // 12
      "Near Right", // 13
      "Lower-middle", // 14
      "Near Left", // 15
      "Upper Far Right", // 16
      "Lower Far Right", // 17
      "Lower Far Left", // 18
      "Upper Far Left" // 19
    );
  }

  public getSonyModelIdDescription(): string
  {
    let value: number = this._directory.getInteger(SonyType1MakernoteDirectory.TAG_SONY_MODEL_ID);

    if (value == null)
    return null;

    switch (value) {
      case 2:
        return "DSC-R1";
      case 256:
        return "DSLR-A100";
      case 257:
        return "DSLR-A900";
      case 258:
        return "DSLR-A700";
      case 259:
        return "DSLR-A200";
      case 260:
        return "DSLR-A350";
      case 261:
        return "DSLR-A300";
      case 262:
        return "DSLR-A900 (APS-C mode)";
      case 263:
        return "DSLR-A380/A390";
      case 264:
        return "DSLR-A330";
      case 265:
        return "DSLR-A230";
      case 266:
        return "DSLR-A290";
      case 269:
        return "DSLR-A850";
      case 270:
        return "DSLR-A850 (APS-C mode)";
      case 273:
        return "DSLR-A550";
      case 274:
        return "DSLR-A500";
      case 275:
        return "DSLR-A450";
      case 278:
        return "NEX-5";
      case 279:
        return "NEX-3";
      case 280:
        return "SLT-A33";
      case 281:
        return "SLT-A55V";
      case 282:
        return "DSLR-A560";
      case 283:
        return "DSLR-A580";
      case 284:
        return "NEX-C3";
      case 285:
        return "SLT-A35";
      case 286:
        return "SLT-A65V";
      case 287:
        return "SLT-A77V";
      case 288:
        return "NEX-5N";
      case 289:
        return "NEX-7";
      case 290:
        return "NEX-VG20E";
      case 291:
        return "SLT-A37";
      case 292:
        return "SLT-A57";
      case 293:
        return "NEX-F3";
      case 294:
        return "SLT-A99V";
      case 295:
        return "NEX-6";
      case 296:
        return "NEX-5R";
      case 297:
        return "DSC-RX100";
      case 298:
        return "DSC-RX1";
      case 299:
        return "NEX - VG900";
      case 300:
        return "NEX - VG30E";
      case 302:
        return "ILCE - 3000 / ILCE - 3500";
      case 303:
        return "SLT - A58";
      case 305:
        return "NEX - 3N";
      case 306:
        return "ILCE-7";
      case 307:
        return "NEX-5T";
      case 308:
        return "DSC-RX100M2";
      case 309:
        return "DSC-RX10";
      case 310:
        return "DSC-RX1R";
      case 311:
        return "ILCE-7R";
      case 312:
        return "ILCE-6000";
      case 313:
        return "ILCE-5000";
      case 317:
        return "DSC-RX100M3";
      case 318:
        return "ILCE-7S";
      case 319:
        return "ILCA-77M2";
      case 339:
        return "ILCE-5100";
      case 340:
        return "ILCE-7M2";
      case 341:
        return "DSC-RX100M4";
      case 342:
        return "DSC-RX10M2";
      case 344:
        return "DSC-RX1RM2";
      case 346:
        return "ILCE-QX1";
      case 347:
        return "ILCE-7RM2";
      case 350:
        return "ILCE-7SM2";
      case 353:
        return "ILCA-68";
      case 354:
        return "ILCA-99M2";
      case 355:
        return "DSC-RX10M3";
      case 356:
        return "DSC-RX100M5";
      case 357:
        return "ILCE-6300";
      case 358:
        return "ILCE-9";
      case 360:
        return "ILCE-6500";
      case 362:
        return "ILCE-7RM3";
      case 363:
        return "ILCE-7M3";
      case 364:
        return "DSC-RX0";
      case 365:
        return "DSC-RX10M4";
      case 366:
        return "DSC-RX100M6";
      case 367:
        return "DSC-HX99";
      case 369:
        return "DSC-RX100M5A";
      case 371:
        return "ILCE-6400";
      case 372:
        return "DSC-RX0M2";
      case 374:
        return "DSC-RX100M7";
      case 375:
        return "ILCE-7RM4";
      case 376:
        return "ILCE-9M2";
      case 378:
        return "ILCE-6600";
      case 379:
        return "ILCE-6100";
      case 380:
        return "ZV-1";
      case 381:
        return "ILCE-7C";
      case 383:
        return "ILCE-7SM3";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getSceneModeDescription(): string
  {
    let value: number = this._directory.getInteger(SonyType1MakernoteDirectory.TAG_SCENE_MODE);

    if (value == null)
    return null;

    switch (value) {
      case 0:
        return "Standard";
      case 1:
        return "Portrait";
      case 2:
        return "Text";
      case 3:
        return "Night Scene";
      case 4:
        return "Sunset";
      case 5:
        return "Sports";
      case 6:
        return "Landscape";
      case 7:
        return "Night Portrait";
      case 8:
        return "Macro";
      case 9:
        return "Super Macro";
      case 16:
        return "Auto";
      case 17:
        return "Night View/Portrait";
      case 18:
        return "Sweep Panorama";
      case 19:
        return "Handheld Night Shot";
      case 20:
        return "Anti Motion Blur";
      case 21:
        return "Cont. Priority AE";
      case 22:
        return "Auto+";
      case 23:
        return "3D Sweep Panorama";
      case 24:
        return "Superior Auto";
      case 25:
        return "High Sensitivity";
      case 26:
        return "Fireworks";
      case 27:
        return "Food";
      case 28:
        return "Pet";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getAFModeDescription(): string
  {
    let value: number = this._directory.getInteger(SonyType1MakernoteDirectory.TAG_AF_MODE);

    if (value == null)
    return null;

    switch (value) {
      case 0:
        return "Default";
      case 1:
        return "Multi";
      case 2:
        return "Center";
      case 3:
        return "Spot";
      case 4:
        return "Flexible Spot";
      case 6:
        return "Touch";
      case 14:
        return "Manual Focus";
      case 15:
        return "Face Detected";
      case 0xffff:
        return "n/a";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getAFIlluminatorDescription(): string
  {
    let value: number = this._directory.getInteger(SonyType1MakernoteDirectory.TAG_AF_ILLUMINATOR);

    if (value == null)
    return null;

    switch (value) {
      case 0:
        return "Off";
      case 1:
        return "Auto";
      case 0xffff:
        return "n/a";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getFlashLevelDescription(): string
  {
    let value: number = this._directory.getInteger(SonyType1MakernoteDirectory.TAG_FLASH_LEVEL);

    if (value == null)
    return null;

    switch (value) {
      case -32768:
        return "Low";
      case -3:
        return "-3/3";
      case -2:
        return "-2/3";
      case -1:
        return "-1/3";
      case 0:
        return "Normal";
      case 1:
        return "+1/3";
      case 2:
        return "+2/3";
      case 3:
        return "+3/3";
      case 128:
        return "n/a";
      case 32767:
        return "High";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getReleaseModeDescription(): string
  {
    let value: number = this._directory.getInteger(SonyType1MakernoteDirectory.TAG_RELEASE_MODE);

    if (value == null)
    return null;

    switch (value) {
      case 0:
        return "Normal";
      case 2:
        return "Continuous";
      case 5:
        return "Exposure Bracketing";
      case 6:
        return "White Balance Bracketing";
      case 65535:
        return "n/a";
      default:
        return "Unknown (" + value + ")";
    }
  }

  public getSequenceNumberDescription(): string
  {
    let value: number = this._directory.getInteger(SonyType1MakernoteDirectory.TAG_RELEASE_MODE);

    if (value == null)
    return null;

    switch (value) {
      case 0:
        return "Single";
      case 65535:
        return "n/a";
      default:
        return value.toString();
    }
  }
}

export default SonyType1MakernoteDescriptor