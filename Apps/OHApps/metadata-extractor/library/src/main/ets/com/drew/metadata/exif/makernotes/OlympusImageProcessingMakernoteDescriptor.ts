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

import TagDescriptor from '../../TagDescriptor'
import OlympusImageProcessingMakernoteDirectory from './OlympusImageProcessingMakernoteDirectory'

/**
 * Provides human-readable String representations of tag values stored in a {@link OlympusImageProcessingMakernoteDirectory}.
 * <p>
 * Some Description functions converted from Exiftool version 10.33 created by Phil Harvey
 */

class OlympusImageProcessingMakernoteDescriptor extends TagDescriptor<OlympusImageProcessingMakernoteDirectory> {
  constructor(directory: OlympusImageProcessingMakernoteDirectory) {
    super(directory);
  }

  public getDescription(tagType: number): string {
    switch (tagType) {
      case OlympusImageProcessingMakernoteDirectory.TagImageProcessingVersion:
        return this.getImageProcessingVersionDescription();
      case OlympusImageProcessingMakernoteDirectory.TagColorMatrix:
        return this.getColorMatrixDescription();
      case OlympusImageProcessingMakernoteDirectory.TagNoiseReduction2:
        return this.getNoiseReduction2Description();
      case OlympusImageProcessingMakernoteDirectory.TagDistortionCorrection2:
        return this.getDistortionCorrection2Description();
      case OlympusImageProcessingMakernoteDirectory.TagShadingCompensation2:
        return this.getShadingCompensation2Description();
      case OlympusImageProcessingMakernoteDirectory.TagMultipleExposureMode:
        return this.getMultipleExposureModeDescription();
      case OlympusImageProcessingMakernoteDirectory.TagAspectRatio:
        return this.getAspectRatioDescription();
      case OlympusImageProcessingMakernoteDirectory.TagKeystoneCompensation:
        return this.getKeystoneCompensationDescription();
      case OlympusImageProcessingMakernoteDirectory.TagKeystoneDirection:
        return this.getKeystoneDirectionDescription();
      default:
        return super.getDescription(tagType);
    }
  }

  public getImageProcessingVersionDescription(): string {
    return this.getVersionBytesDescription(OlympusImageProcessingMakernoteDirectory.TagImageProcessingVersion, 4);
  }

  public getColorMatrixDescription(): string {
    let obj = this._directory.getIntArray(OlympusImageProcessingMakernoteDirectory.TagColorMatrix);
    if (obj == null)
      return null;

    let sb: string = '';
    for (let i = 0; i < obj.length; i++) {
      if (i != 0)
        sb.concat(" ");
      sb.concat(obj[i]);
    }
    return sb.toString();
  }

  public getNoiseReduction2Description(): string {
    let value = this._directory.getInteger(OlympusImageProcessingMakernoteDirectory.TagNoiseReduction2);
    if (value == null)
      return null;

    if (value == 0)
      return "(none)";

    let sb: string = '';
    let v = value.shortValue();

    if (( v       & 1) != 0) sb.concat("Noise Reduction, ");
    if (((v >> 1) & 1) != 0) sb.concat("Noise Filter, ");
    if (((v >> 2) & 1) != 0) sb.concat("Noise Filter (ISO Boost), ");

    return sb.substring(0, sb.length - 2);
  }

  public getDistortionCorrection2Description(): string {
    return this.getIndexedDescription(OlympusImageProcessingMakernoteDirectory.TagDistortionCorrection2, "Off", "On");
  }

  public getShadingCompensation2Description(): string {
    return this.getIndexedDescription(OlympusImageProcessingMakernoteDirectory.TagShadingCompensation2, "Off", "On");
  }

  public getMultipleExposureModeDescription(): string {
    let values = this._directory.getIntArray(OlympusImageProcessingMakernoteDirectory.TagMultipleExposureMode);
    if (values == null)
    {
      // check if it's only one value long also
      let value = this._directory.getInteger(OlympusImageProcessingMakernoteDirectory.TagMultipleExposureMode);
      if(value == null)
        return null;

      values = new Array<number>();
      values[0] = value;
    }

    if (values.length == 0)
      return null;

    let sb: string = '';

    switch (values[0])
    {
      case 0:
        sb.concat("Off");
        break;
      case 2:
        sb.concat("On (2 frames)");
        break;
      case 3:
        sb.concat("On (3 frames)");
        break;
      default:
        sb.concat("Unknown (").concat(values[0]).concat(")");
        break;
    }

    if (values.length > 1)
      sb.concat("; ").concat(values[1]);

    return sb.toString();
  }

  public getAspectRatioDescription(): string {
    let values = this._directory.getByteArray(OlympusImageProcessingMakernoteDirectory.TagAspectRatio);
    if (values == null || values.length < 2)
      return null;

    let join = parseInt(values[0].toString()).toString() + " " + parseInt(values[1].toString()).toString();

    let ret;
    if(join == "1 1")
      ret = "4:3";
    else if(join == "1 4")
      ret = "1:1";
    else if(join == "2 1")
      ret = "3:2 (RAW)";
    else if(join == "2 2")
      ret = "3:2";
    else if(join == "3 1")
      ret = "16:9 (RAW)";
    else if(join == "3 3")
      ret = "16:9";
    else if(join == "4 1")
      ret = "1:1 (RAW)";
    else if(join == "4 4")
      ret = "6:6";
    else if(join == "5 5")
      ret = "5:4";
    else if(join == "6 6")
      ret = "7:6";
    else if(join == "7 7")
      ret = "6:5";
    else if(join == "8 8")
      ret = "7:5";
    else if(join == "9 1")
      ret = "3:4 (RAW)";
    else if(join == "9 9")
      ret = "3:4";
    else
      ret = "Unknown (" + join + ")";

    return ret;
  }

  public getKeystoneCompensationDescription(): string {
    let values = this._directory.getByteArray(OlympusImageProcessingMakernoteDirectory.TagKeystoneCompensation);
    if (values == null || values.length < 2)
      return null;

    let join = parseInt(values[0].toString()).toString() + " " + parseInt(values[1].toString()).toString();

    let ret;
    if(join == "0 0")
      ret = "Off";
    else if(join == "0 1")
      ret = "On";
    else
      ret = "Unknown (" + join + ")";

    return ret;
  }

  public getKeystoneDirectionDescription(): string {
    return this.getIndexedDescription(OlympusImageProcessingMakernoteDirectory.TagKeystoneDirection, "Vertical", "Horizontal");
    }
}

export default OlympusImageProcessingMakernoteDescriptor