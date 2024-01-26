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
import DateUtils from '../../lang/DateUtils';
import Rational from '../../lang/Rational';
import GeoLocation from '../../lang/GeoLocation';
import GpsDescriptor from './GpsDescriptor';
import ExifDirectoryBase from './ExifDirectoryBase';
class GpsDirectory extends ExifDirectoryBase {
    /** GPS tag version GPSVersionID 0 0 BYTE 4 */
    public static readonly TAG_VERSION_ID = 0x0000;
    /** North or South Latitude GPSLatitudeRef 1 1 ASCII 2 */
    public static readonly TAG_LATITUDE_REF = 0x0001;
    /** Latitude GPSLatitude 2 2 RATIONAL 3 */
    public static readonly TAG_LATITUDE = 0x0002;
    /** East or West Longitude GPSLongitudeRef 3 3 ASCII 2 */
    public static readonly TAG_LONGITUDE_REF = 0x0003;
    /** Longitude GPSLongitude 4 4 RATIONAL 3 */
    public static readonly TAG_LONGITUDE = 0x0004;
    /** Altitude reference GPSAltitudeRef 5 5 BYTE 1 */
    public static readonly TAG_ALTITUDE_REF = 0x0005;
    /** Altitude GPSAltitude 6 6 RATIONAL 1 */
    public static readonly TAG_ALTITUDE = 0x0006;
    /** GPS time (atomic clock) GPSTimeStamp 7 7 RATIONAL 3 */
    public static readonly TAG_TIME_STAMP = 0x0007;
    /** GPS satellites used for measurement GPSSatellites 8 8 ASCII Any */
    public static readonly TAG_SATELLITES = 0x0008;
    /** GPS receiver status GPSStatus 9 9 ASCII 2 */
    public static readonly TAG_STATUS = 0x0009;
    /** GPS measurement mode GPSMeasureMode 10 A ASCII 2 */
    public static readonly TAG_MEASURE_MODE = 0x000A;
    /** Measurement precision GPSDOP 11 B RATIONAL 1 */
    public static readonly TAG_DOP = 0x000B;
    /** Speed unit GPSSpeedRef 12 C ASCII 2 */
    public static readonly TAG_SPEED_REF = 0x000C;
    /** Speed of GPS receiver GPSSpeed 13 D RATIONAL 1 */
    public static readonly TAG_SPEED = 0x000D;
    /** Reference for direction of movement GPSTrackRef 14 E ASCII 2 */
    public static readonly TAG_TRACK_REF = 0x000E;
    /** Direction of movement GPSTrack 15 F RATIONAL 1 */
    public static readonly TAG_TRACK = 0x000F;
    /** Reference for direction of image GPSImgDirectionRef 16 10 ASCII 2 */
    public static readonly TAG_IMG_DIRECTION_REF = 0x0010;
    /** Direction of image GPSImgDirection 17 11 RATIONAL 1 */
    public static readonly TAG_IMG_DIRECTION = 0x0011;
    /** Geodetic survey data used GPSMapDatum 18 12 ASCII Any */
    public static readonly TAG_MAP_DATUM = 0x0012;
    /** Reference for latitude of destination GPSDestLatitudeRef 19 13 ASCII 2 */
    public static readonly TAG_DEST_LATITUDE_REF = 0x0013;
    /** Latitude of destination GPSDestLatitude 20 14 RATIONAL 3 */
    public static readonly TAG_DEST_LATITUDE = 0x0014;
    /** Reference for longitude of destination GPSDestLongitudeRef 21 15 ASCII 2 */
    public static readonly TAG_DEST_LONGITUDE_REF = 0x0015;
    /** Longitude of destination GPSDestLongitude 22 16 RATIONAL 3 */
    public static readonly TAG_DEST_LONGITUDE = 0x0016;
    /** Reference for bearing of destination GPSDestBearingRef 23 17 ASCII 2 */
    public static readonly TAG_DEST_BEARING_REF = 0x0017;
    /** Bearing of destination GPSDestBearing 24 18 RATIONAL 1 */
    public static readonly TAG_DEST_BEARING = 0x0018;
    /** Reference for distance to destination GPSDestDistanceRef 25 19 ASCII 2 */
    public static readonly TAG_DEST_DISTANCE_REF = 0x0019;
    /** Distance to destination GPSDestDistance 26 1A RATIONAL 1 */
    public static readonly TAG_DEST_DISTANCE = 0x001A;
    /** Name of the method used for location finding GPSProcessingMethod 27 1B UNDEFINED Any */
    public static readonly TAG_PROCESSING_METHOD = 0x001B;
    /** Name of the GPS area GPSAreaInformation 28 1C UNDEFINED Any */
    public static readonly TAG_AREA_INFORMATION = 0x001C;
    /** Date and time GPSDateStamp 29 1D ASCII 11 */
    public static readonly TAG_DATE_STAMP = 0x001D;
    /** Whether differential correction is applied GPSDifferential 30 1E SHORT 1 */
    public static readonly TAG_DIFFERENTIAL = 0x001E;
    /** Horizontal positioning errors GPSHPositioningError 31 1F RATIONAL 1 */
    public static readonly TAG_H_POSITIONING_ERROR = 0x001F;
    private static readonly _tagNameMap: Map<number, string> = ExifDirectoryBase.addExifTagNames(new Map<number, string>([
        [GpsDirectory.TAG_VERSION_ID, "GPS Version ID"],
        [GpsDirectory.TAG_LATITUDE_REF, "GPS Latitude Ref"],
        [GpsDirectory.TAG_LATITUDE, "GPS Latitude"],
        [GpsDirectory.TAG_LONGITUDE_REF, "GPS Longitude Ref"],
        [GpsDirectory.TAG_LONGITUDE, "GPS Longitude"],
        [GpsDirectory.TAG_ALTITUDE_REF, "GPS Altitude Ref"],
        [GpsDirectory.TAG_ALTITUDE, "GPS Altitude"],
        [GpsDirectory.TAG_TIME_STAMP, "GPS Time-Stamp"],
        [GpsDirectory.TAG_SATELLITES, "GPS Satellites"],
        [GpsDirectory.TAG_STATUS, "GPS Status"],
        [GpsDirectory.TAG_MEASURE_MODE, "GPS Measure Mode"],
        [GpsDirectory.TAG_DOP, "GPS DOP"],
        [GpsDirectory.TAG_SPEED_REF, "GPS Speed Ref"],
        [GpsDirectory.TAG_SPEED, "GPS Speed"],
        [GpsDirectory.TAG_TRACK_REF, "GPS Track Ref"],
        [GpsDirectory.TAG_TRACK, "GPS Track"],
        [GpsDirectory.TAG_IMG_DIRECTION_REF, "GPS Img Direction Ref"],
        [GpsDirectory.TAG_IMG_DIRECTION, "GPS Img Direction"],
        [GpsDirectory.TAG_MAP_DATUM, "GPS Map Datum"],
        [GpsDirectory.TAG_DEST_LATITUDE_REF, "GPS Dest Latitude Ref"],
        [GpsDirectory.TAG_DEST_LATITUDE, "GPS Dest Latitude"],
        [GpsDirectory.TAG_DEST_LONGITUDE_REF, "GPS Dest Longitude Ref"],
        [GpsDirectory.TAG_DEST_LONGITUDE, "GPS Dest Longitude"],
        [GpsDirectory.TAG_DEST_BEARING_REF, "GPS Dest Bearing Ref"],
        [GpsDirectory.TAG_DEST_BEARING, "GPS Dest Bearing"],
        [GpsDirectory.TAG_DEST_DISTANCE_REF, "GPS Dest Distance Ref"],
        [GpsDirectory.TAG_DEST_DISTANCE, "GPS Dest Distance"],
        [GpsDirectory.TAG_PROCESSING_METHOD, "GPS Processing Method"],
        [GpsDirectory.TAG_AREA_INFORMATION, "GPS Area Information"],
        [GpsDirectory.TAG_DATE_STAMP, "GPS Date Stamp"],
        [GpsDirectory.TAG_DIFFERENTIAL, "GPS Differential"],
        [GpsDirectory.TAG_H_POSITIONING_ERROR, "GPS Horizontal Positioning Error"]
    ]));
    constructor() {
        super();
        this.setDescriptor(new GpsDescriptor(this));
    }
    public getName(): string {
        return "GPS";
    }
    protected getTagNameMap(): Map<number, string> {
        return GpsDirectory._tagNameMap;
    }
    /**
     * Parses various tags in an attempt to obtain a single object representing the latitude and longitude
     * at which this image was captured.
     *
     * @return The geographical location of this image, if possible, otherwise null
     */
    public getGeoLocation(): GeoLocation {
        let latitudes: Rational[] = this.getRationalArray(GpsDirectory.TAG_LATITUDE);
        let longitudes: Rational[] = this.getRationalArray(GpsDirectory.TAG_LONGITUDE);
        let latitudeRef = this.getString(GpsDirectory.TAG_LATITUDE_REF);
        let longitudeRef = this.getString(GpsDirectory.TAG_LONGITUDE_REF);
        // Make sure we have the required values
        if (latitudes == null || latitudes.length != 3)
            return null;
        if (longitudes == null || longitudes.length != 3)
            return null;
        if (latitudeRef == null || longitudeRef == null)
            return null;
        let lat = GeoLocation.degreesMinutesSecondsToDecimal(latitudes[0], latitudes[1], latitudes[2], latitudeRef.toLocaleUpperCase() == "S");
        let lon = GeoLocation.degreesMinutesSecondsToDecimal(longitudes[0], longitudes[1], longitudes[2], longitudeRef.toLocaleUpperCase() == "W");
        // This can return null, in cases where the conversion was not possible
        if (lat == null || lon == null)
            return null;
        return new GeoLocation(lat, lon);
    }
    /**
     * Parses the date stamp tag and the time stamp tag to obtain a single Date object representing the
     * date and time when this image was captured.
     *
     * @return A Date object representing when this image was captured, if possible, otherwise null
     */
    public getGpsDate(): string {
        let date = this.getString(GpsDirectory.TAG_DATE_STAMP);
        let timeComponents: Rational[] = this.getRationalArray(GpsDirectory.TAG_TIME_STAMP);
        // Make sure we have the required values
        if (date == null)
            return null;
        if (timeComponents == null || timeComponents.length != 3)
            return null;
        //        let dateTime = String.format(Locale.US, "%s %02d:%02d:%02.3f UTC",
        //            date, timeComponents[0].intValue(), timeComponents[1].intValue(), timeComponents[2].doubleValue());
        let dateTime = "%s %02d:%02d:%02.3f UTC".replace(/%s/, date)
            .replace(/%02d/, timeComponents[0].numberValue().toFixed())
            .replace(/%02d/, timeComponents[1].numberValue().toFixed())
            .replace(/%02.3f/, timeComponents[2].numberValue().toFixed());
        try {
            return DateUtils.dateFormat(dateTime, "yyyy:MM:dd HH:mm:ss.f q");
            //            DateFormat parser = new SimpleDateFormat("yyyy:MM:dd HH:mm:ss.S z");
            //            return parser.parse(dateTime);
        }
        catch (e) {
            return null;
        }
    }
}
export default GpsDirectory;
