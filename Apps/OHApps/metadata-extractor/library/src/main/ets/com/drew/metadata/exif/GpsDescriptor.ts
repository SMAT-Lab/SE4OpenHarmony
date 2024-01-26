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

import Rational from '../../lang/Rational';
import GeoLocation from '../../lang/GeoLocation';
import GpsDirectory from './GpsDirectory';
import TagDescriptor from '../TagDescriptor';

class GpsDescriptor extends TagDescriptor<GpsDirectory> {
  constructor(directory: GpsDirectory) {
    super(directory);
  }

  public getDescription(tagType: number): string
  {
    switch (tagType) {
      case GpsDirectory.TAG_VERSION_ID:
        return this.getGpsVersionIdDescription();
      case GpsDirectory.TAG_ALTITUDE:
        return this.getGpsAltitudeDescription();
      case GpsDirectory.TAG_ALTITUDE_REF:
        return this.getGpsAltitudeRefDescription();
      case GpsDirectory.TAG_STATUS:
        return this.getGpsStatusDescription();
      case GpsDirectory.TAG_MEASURE_MODE:
        return this.getGpsMeasureModeDescription();
      case GpsDirectory.TAG_DOP:
        return this.getGpsDopDescription();
      case GpsDirectory.TAG_SPEED_REF:
        return this.getGpsSpeedRefDescription();
      case GpsDirectory.TAG_SPEED:
        return this.getGpsSpeedDescription();
      case GpsDirectory.TAG_TRACK_REF:
      case GpsDirectory.TAG_IMG_DIRECTION_REF:
      case GpsDirectory.TAG_DEST_BEARING_REF:
        return this.getGpsDirectionReferenceDescription(tagType);
      case GpsDirectory.TAG_TRACK:
      case GpsDirectory.TAG_IMG_DIRECTION:
      case GpsDirectory.TAG_DEST_BEARING:
        return this.getGpsDirectionDescription(tagType);
      case GpsDirectory.TAG_DEST_LATITUDE:
        return this.getGpsDestLatitudeDescription();
      case GpsDirectory.TAG_DEST_LONGITUDE:
        return this.getGpsDestLongitudeDescription();
      case GpsDirectory.TAG_DEST_DISTANCE_REF:
        return this.getGpsDestinationReferenceDescription();
      case GpsDirectory.TAG_DEST_DISTANCE:
        return this.getGpsDestDistanceDescription();
      case GpsDirectory.TAG_TIME_STAMP:
        return this.getGpsTimeStampDescription();
      case GpsDirectory.TAG_LONGITUDE:
      // three rational numbers -- displayed in HH"MM"SS.ss
        return this.getGpsLongitudeDescription();
      case GpsDirectory.TAG_LATITUDE:
      // three rational numbers -- displayed in HH"MM"SS.ss
        return this.getGpsLatitudeDescription();
      case GpsDirectory.TAG_PROCESSING_METHOD:
        return this.getGpsProcessingMethodDescription();
      case GpsDirectory.TAG_AREA_INFORMATION:
        return this.getGpsAreaInformationDescription();
      case GpsDirectory.TAG_DIFFERENTIAL:
        return this.getGpsDifferentialDescription();
      case GpsDirectory.TAG_H_POSITIONING_ERROR:
        return this.getGpsHPositioningErrorDescription();
      default:
        return this.getDescription(tagType);
    }
  }

  private getGpsVersionIdDescription() {
    return this.getVersionBytesDescription(GpsDirectory.TAG_VERSION_ID, 1);
  }

  public getGpsLatitudeDescription() {
    let location: GeoLocation = this._directory.getGeoLocation();
    return location == null ? null : GeoLocation.decimalToDegreesMinutesSecondsString(location.getLatitude());
  }

  public getGpsLongitudeDescription() {
    let location: GeoLocation = this._directory.getGeoLocation();
    return location == null ? null : GeoLocation.decimalToDegreesMinutesSecondsString(location.getLongitude());
  }

  public getGpsTimeStampDescription() {
    // time in hour, min, sec
    let timeComponents: Rational[] = this._directory.getRationalArray(GpsDirectory.TAG_TIME_STAMP);
    //        DecimalFormat df = new DecimalFormat("00.000");

    return timeComponents == null ? null : "%02d:%02d:%s UTC".replace(/%02d/, timeComponents[0].numberValue()
      .toString())
                                             .replace(/%02d/, timeComponents[1].numberValue().toString())
                                             .replace(/%s/, timeComponents[2].numberValue().toFixed(3))
    //        return timeComponents == null
    //            ? null
    //            : String.format("%02d:%02d:%s UTC",
    //                timeComponents[0].intValue(),
    //                timeComponents[1].intValue(),
    //                df.format(timeComponents[2].doubleValue()));
  }

  public getGpsDestLatitudeDescription() {
    return this.getGeoLocationDimension(GpsDirectory.TAG_DEST_LATITUDE, GpsDirectory.TAG_DEST_LATITUDE_REF, "S");
  }

  public getGpsDestLongitudeDescription() {
    return this.getGeoLocationDimension(GpsDirectory.TAG_DEST_LONGITUDE, GpsDirectory.TAG_DEST_LONGITUDE_REF, "W");
  }

  private getGeoLocationDimension(tagValue: number, tagRef: number, positiveRef: string) {
    let values: Rational[] = this._directory.getRationalArray(tagValue);
    let ref = this._directory.getString(tagRef);

    if (values == null || values.length != 3 || ref == null)
    return null;

    let dec = GeoLocation.degreesMinutesSecondsToDecimal(
      values[0], values[1], values[2], ref.toLocaleUpperCase() == positiveRef.toString());

    return dec == null ? null : GeoLocation.decimalToDegreesMinutesSecondsString(dec);
  }

  public getGpsDestinationReferenceDescription(): string
  {
    let value = this._directory.getString(GpsDirectory.TAG_DEST_DISTANCE_REF);
    if (value == null)
    return null;
    let distanceRef = value.trim();
    if ("K" == distanceRef.toLocaleUpperCase()) {
      return "kilometers";
    } else if ("M" == distanceRef.toLocaleUpperCase()) {
      return "miles";
    } else if ("N" == distanceRef.toLocaleUpperCase()) {
      return "knots";
    } else {
      return "Unknown (" + distanceRef + ")";
    }
  }

  public getGpsDestDistanceDescription() {
    let value: Rational = this._directory.getRational(GpsDirectory.TAG_DEST_DISTANCE);
    if (value == null)
    return null;
    let unit = this.getGpsDestinationReferenceDescription();
    return "%s %s".replace(/%s/, value.numberValue().toFixed(2))
      .replace(/%s/, unit == null ? "unit" : unit.toLowerCase());
    //        return String.format("%s %s",
    //            new DecimalFormat("0.##").format(value.doubleValue()),
    //            unit == null ? "unit" : unit.toLowerCase());
  }

  public getGpsDirectionDescription(tagType: number) {
    let angle: Rational = this._directory.getRational(tagType);
    // provide a decimal version of rational numbers in the description, to avoid strings like "35334/199 degrees"
    let value = angle != null
      ? angle.numberValue().toFixed(2)
      : this._directory.getString(tagType);
    return value == null || value.trim().length == 0 ? null : value.trim() + " degrees";
  }

  public getGpsDirectionReferenceDescription(tagType: number) {
    let value = this._directory.getString(tagType);
    if (value == null)
    return null;
    let gpsDistRef = value.trim();
    if ("T" == gpsDistRef.toLocaleUpperCase()) {
      return "True direction";
    } else if ("M" == gpsDistRef.toLocaleUpperCase()) {
      return "Magnetic direction";
    } else {
      return "Unknown (" + gpsDistRef + ")";
    }
  }

  public getGpsDopDescription(): string
  {
    let value: Rational = this._directory.getRational(GpsDirectory.TAG_DOP);
    return value == null ? null : value.numberValue().toFixed(2);
  }

  public getGpsSpeedRefDescription(): string
  {
    let value = this._directory.getString(GpsDirectory.TAG_SPEED_REF);
    if (value == null)
    return null;
    let gpsSpeedRef = value.trim();
    if ("K" == gpsSpeedRef.toLocaleUpperCase()) {
      return "km/h";
    } else if ("M" == gpsSpeedRef.toLocaleUpperCase()) {
      return "mph";
    } else if ("N" == gpsSpeedRef.toLocaleUpperCase()) {
      return "knots";
    } else {
      return "Unknown (" + gpsSpeedRef + ")";
    }
  }

  public getGpsSpeedDescription() {
    let value: Rational = this._directory.getRational(GpsDirectory.TAG_SPEED);
    if (value == null)
    return null;
    let unit = this.getGpsSpeedRefDescription();
    return "%s %s".replace(/%s/, value.numberValue().toFixed(2))
      .replace(/%s/, unit == null ? "unit" : unit.toLowerCase())
    //        return String.format("%s %s",
    //            new DecimalFormat("0.##").format(value.doubleValue()),
    //            unit == null ? "unit" : unit.toLowerCase());
  }

  public getGpsMeasureModeDescription(): string
  {
    let value = this._directory.getString(GpsDirectory.TAG_MEASURE_MODE);
    if (value == null)
    return null;
    let gpsSpeedMeasureMode = value.trim();
    if ("2" == gpsSpeedMeasureMode.toLocaleUpperCase()) {
      return "2-dimensional measurement";
    } else if ("3" == gpsSpeedMeasureMode.toLocaleUpperCase()) {
      return "3-dimensional measurement";
    } else {
      return "Unknown (" + gpsSpeedMeasureMode + ")";
    }
  }

  public getGpsStatusDescription(): string
  {
    let value = this._directory.getString(GpsDirectory.TAG_STATUS);
    if (value == null)
    return null;
    let gpsStatus = value.trim();
    if ("A" == gpsStatus.toLocaleUpperCase()) {
      return "Active (Measurement in progress)";
    } else if ("V" == gpsStatus.toLocaleUpperCase()) {
      return "Void (Measurement Interoperability)";
    } else {
      return "Unknown (" + gpsStatus + ")";
    }
  }

  public getGpsAltitudeRefDescription() {
    return this.getIndexedDescription(GpsDirectory.TAG_ALTITUDE_REF, null, "Sea level", "Below sea level");
  }

  public getGpsAltitudeDescription() {
    let value: Rational = this._directory.getRational(GpsDirectory.TAG_ALTITUDE);
    return value == null ? null : value.numberValue().toFixed(2) + " metres";
  }

  public getGpsProcessingMethodDescription() {
    return this.getEncodedTextDescription(GpsDirectory.TAG_PROCESSING_METHOD);
  }

  public getGpsAreaInformationDescription() {
    return this.getEncodedTextDescription(GpsDirectory.TAG_AREA_INFORMATION);
  }

  public getGpsDifferentialDescription() {
    return this.getIndexedDescription(GpsDirectory.TAG_DIFFERENTIAL, null, "No Correction", "Differential Corrected");
  }

  public getGpsHPositioningErrorDescription() {
    let value: Rational = this._directory.getRational(GpsDirectory.TAG_H_POSITIONING_ERROR);
    return value == null ? null : value.numberValue().toFixed(2) + " metres";
  }

  public getDegreesMinutesSecondsDescription() {
    let location: GeoLocation = this._directory.getGeoLocation();
    return location == null ? null : location.toDMSString();
  }
}

export default GpsDescriptor
