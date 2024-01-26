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

import Rational from './Rational';

class GeoLocation {
  private readonly _latitude: number;
  private readonly _longitude: number;

  /**
   * Instantiates a new instance of {@link GeoLocation}.
   *
   * @param latitude the latitude, in degrees
   * @param longitude the longitude, in degrees
   */
  constructor(latitude: number, longitude: number) {
    this._latitude = latitude;
    this._longitude = longitude;
  }

  /**
   * @return the latitudinal angle of this location, in degrees.
   */
  public getLatitude(): number
  {
    return this._latitude;
  }

  /**
   * @return the longitudinal angle of this location, in degrees.
   */
  public getLongitude(): number
  {
    return this._longitude;
  }

  /**
   * @return true, if both latitude and longitude are equal to zero
   */
  public isZero(): boolean
  {
    return this._latitude == 0 && this._longitude == 0;
  }

  /**
   * Converts a decimal degree angle into its corresponding DMS (degrees-minutes-seconds) representation as a string,
   * of format: {@code -1° 23' 4.56"}
   */
  public static decimalToDegreesMinutesSecondsString(decimal: number): string
  {
    let dms: number[] = this.decimalToDegreesMinutesSeconds(decimal);
    return "%s\u00B0 %s' %s\"".replace(/%s/, dms[0].toFixed(2).toString())
      .replace(/%s/, dms[1].toFixed(2).toString())
      .replace(/%s/, dms[2].toFixed(2).toString())
    //        DecimalFormat format = new DecimalFormat("0.##");
    //        return String.format("%s\u00B0 %s' %s\"", format.format(dms[0]), format.format(dms[1]), format.format(dms[2]));

  }

  /**
   * Converts a decimal degree angle into its corresponding DMS (degrees-minutes-seconds) component values, as
   * a double array.
   */
  public static decimalToDegreesMinutesSeconds(decimal: number): number[]
  {
    let d: number = Math.round(decimal);
    let m: number = Math.abs((decimal % 1) * 60);
    let s: number = (m % 1) * 60;
    return [d, m, s];
  }

  /**
   * Converts DMS (degrees-minutes-seconds) rational values, as given in {@link com.drew.metadata.exif.GpsDirectory},
   * into a single value in degrees, as a double.
   */
  public static degreesMinutesSecondsToDecimal(degs: Rational, mins: Rational, secs: Rational, isNegative: boolean): number
  {
    let decimal = Math.abs(degs.numberValue())
    + mins.numberValue() / 60.0
    + secs.numberValue() / 3600.0;

    if (decimal == undefined)
    return null;

    if (isNegative)
    decimal *= -1;

    return decimal;
  }

  public equals(o: Object): boolean
  {
    if (this == o) return true;
    if (o == null) return false;
    if (!(o instanceof GeoLocation)) return false
    if (o._latitude != this._latitude) return false;
    if (o._longitude != this._longitude) return false;
    return true;
  }

  public hashCode(): number
  {
    let result;
    let temp;
    temp = this._latitude != +0.0 ? this._latitude : 0;
    result = temp ^ (temp >>> 32);
    temp = this._longitude != +0.0 ? this._longitude : 0;
    result = 31 * result + (temp ^ (temp >>> 32));
    return result;
  }

  /**
   * @return a string representation of this location, of format: {@code 1.23, 4.56}
   */

  public toString(): string
  {
    return this._latitude + ", " + this._longitude;
  }

  /**
   * @return a string representation of this location, of format: {@code -1° 23' 4.56", 54° 32' 1.92"}
   */
  public toDMSString(): string
  {
    return GeoLocation.decimalToDegreesMinutesSecondsString(this._latitude) + ", " + GeoLocation.decimalToDegreesMinutesSecondsString(this._longitude);
  }
}

export default GeoLocation
